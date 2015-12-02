using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FlatShare.Web.Models;

namespace FlatShare.Web.AppCode.Api
{
    public class OutlayController : ApiController
    {
        private FlatShareEntities db = new FlatShareEntities();

        // GET api/Outlay
        public IHttpActionResult GetOutlays(int take = 10, int skip = 0, string filter = "")
        {
            if (filter == null)
                filter = "";
            //IQueryable<Outlay> outlays = db.Outlay.Where(p => p.LogicalDelete != true && p.Remark.Contains(filter))
            //    .OrderBy(p => p.RowID).Skip(skip * take).Take(take);

            //int total = db.Outlay.Where(p => p.LogicalDelete != true &&
            //    p.Remark.Contains(filter)).Count();
            int total = (from o in db.Outlay
                         join p in db.PayItem on o.PayItemID equals p.RowID
                         where o.LogicalDelete != true &&
                         (p.ItemName.Contains(filter) || o.Remark.Contains(filter))
                         select new
                         {
                             RowID = o.RowID
                         }).Count();
            var lookup = (from u in db.UserAccount select u).ToDictionary(x => x.RowID.ToString(), x => x.LoginName);
            var outlays = (
                          from o in db.Outlay
                          join p in db.PayItem on o.PayItemID equals p.RowID
                          where o.LogicalDelete != true &&
                          (p.ItemName.Contains(filter) || o.Remark.Contains(filter))
                          orderby o.PayDate descending
                          select new
                          {
                              RowID = o.RowID,
                              PayItemID = o.PayItemID,
                              PayItemName = p.ItemName,
                              PayMoney = o.PayMoney,
                              PayDate = o.PayDate,
                              ShareID = o.ShareID,
                              Remark = o.Remark,
                              ShareName = string.Join(",", o.ShareID.Split(',').Where(x => lookup.ContainsKey(x)).Select(x => lookup[x]))
                          }).Skip(skip * take).Take(take);
            //var dd = string.Join(",",outlays[0].ShareID.Split(',').Where(x => lookup.ContainsKey(x)).Select(x => lookup[x]));
            var result = new
            {
                total = total,
                outlays = outlays
            };
            return Ok(result);
        }

        // GET api/Outlay/5
        [ResponseType(typeof(Outlay))]
        public IHttpActionResult GetOutlay(int id)
        {
            Outlay outlay = db.Outlay.Find(id);
            if (outlay == null)
            {
                return NotFound();
            }

            return Ok(outlay);
        }

        // PUT api/Outlay/5
        public IHttpActionResult PutOutlay(int id, Outlay outlay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != outlay.RowID)
            {
                return BadRequest();
            }
            outlay.LastUpdatedDate = DateTime.Now;
            db.Entry(outlay).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OutlayExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Outlay
        [ResponseType(typeof(Outlay))]
        public IHttpActionResult PostOutlay(Outlay outlay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            outlay.LastUpdatedDate = DateTime.Now;
            db.Outlay.Add(outlay);
            db.SaveChanges();

            return Ok(outlay);
        }

        // DELETE api/Outlay/5
        [ResponseType(typeof(Outlay))]
        public IHttpActionResult DeleteOutlay(int id)
        {
            Outlay outlay = db.Outlay.Find(id);
            if (outlay == null)
            {
                return NotFound();
            }
            outlay.LastUpdatedDate = DateTime.Now;
            db.Outlay.Remove(outlay);
            db.Entry(outlay).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OutlayExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(outlay);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OutlayExists(int id)
        {
            return db.Outlay.Count(e => e.RowID == id) > 0;
        }
    }
}