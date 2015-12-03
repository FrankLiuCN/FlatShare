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
using Newtonsoft.Json;

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
            int total = (from o in db.Outlay
                         join p in db.PayItem on o.PayItemID equals p.RowID
                         //join s in db.PayUserShare on o.ShareID equals s.RowID
                         join u in db.UserAccount on o.PayUserID equals u.RowID
                         where o.LogicalDelete != true &&
                         (p.ItemName.Contains(filter) || o.Remark.Contains(filter)
                          || u.UserName.Contains(filter)
                         )
                         select o.RowID).Count();
            var outlays = (from o in db.Outlay
                           join p in db.PayItem on o.PayItemID equals p.RowID
                           join s in db.PayUserShare on o.ShareID equals s.RowID
                           join u in db.UserAccount on o.PayUserID equals u.RowID
                           where o.LogicalDelete != true &&
                           (p.ItemName.Contains(filter) || o.Remark.Contains(filter)
                           || u.UserName.Contains(filter)
                           )
                           orderby o.PayDate descending
                           select new
                           {
                               RowID = o.RowID,
                               PayItemID = o.PayItemID,
                               PayItemName = p.ItemName,
                               PayMoney = o.PayMoney,
                               PayUserID = o.PayUserID,
                               PayDate = o.PayDate,
                               ShareID = o.ShareID,
                               Remark = o.Remark,
                               PayUserName=u.UserName,
                               ShareUserID = s.ShareUserID,
                               ShareUserName = s.ShareUserName
                           }).Skip(skip * take).Take(take);
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

        public IHttpActionResult EditOutlay(Dictionary<string, object> obj)
        {
            Outlay outlay = JsonConvert.DeserializeObject<Outlay>(obj["outlay"].ToString());
            PayUserShare payUserShare = JsonConvert.DeserializeObject<PayUserShare>(obj["payUserShare"].ToString());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            PayUserShare share = db.PayUserShare.Where(s => s.ShareUserID == payUserShare.ShareUserID).SingleOrDefault();
            if (share == null)
            {
                db.PayUserShare.Add(payUserShare);
                db.SaveChanges();
                outlay.ShareID = payUserShare.RowID;
            }
            else
            {
                outlay.ShareID = share.RowID;
            }

            outlay.LastUpdatedDate = DateTime.Now;
            db.Entry(outlay).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OutlayExists(outlay.RowID))
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
        //public IHttpActionResult PostOutlay(PostOutlay postOutlay)
        public IHttpActionResult PostOutlay(Dictionary<string, object> obj)
        {
            Outlay outlay = JsonConvert.DeserializeObject<Outlay>(obj["outlay"].ToString());
            PayUserShare payUserShare = JsonConvert.DeserializeObject<PayUserShare>(obj["payUserShare"].ToString());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            PayUserShare share = db.PayUserShare.Where(s => s.ShareUserID == payUserShare.ShareUserID).SingleOrDefault();
            if (share == null)
            {
                db.PayUserShare.Add(payUserShare);
                db.SaveChanges();
                outlay.ShareID = payUserShare.RowID;
            }
            else
            {
                outlay.ShareID = share.RowID;
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
            outlay.LogicalDelete = true;
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