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
    public class PayItemController : ApiController
    {
        private FlatShareEntities db = new FlatShareEntities();

        // GET api/PayItem
        public IHttpActionResult GetPayItem(int take = 10, int skip = 0)
        {
            IQueryable<PayItem> items = db.PayItem.Where(p => p.LogicalDelete != true).OrderBy(p => p.RowID).Skip(skip * take).Take(take);
            int total = db.PayItem.Count();
            var result = new {
                total = total,
                PayItems=items
            };
            return Ok(result);
            //return db.PayItem.Where(p => p.LogicalDelete != true).OrderBy(p => p.RowID).Skip(skip * take).Take(take);
        }

        // GET api/PayItem/5
        [ResponseType(typeof(PayItem))]
        public IHttpActionResult GetPayItem(int id)
        {
            PayItem payitem = db.PayItem.Where(p => p.RowID == id && p.LogicalDelete != true).SingleOrDefault();
            if (payitem == null)
            {
                return NotFound();
            }

            return Ok(payitem);
        }

        // PUT api/PayItem/5
        public IHttpActionResult PutPayItem(int id, PayItem payitem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != payitem.RowID)
            {
                return BadRequest();
            }
            payitem.LastUpdatedDate = DateTime.Now;
            db.Entry(payitem).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayItemExists(id))
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

        // POST api/PayItem
        [ResponseType(typeof(PayItem))]
        public IHttpActionResult PostPayItem(PayItem payitem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            payitem.LastUpdatedDate = DateTime.Now;
            db.PayItem.Add(payitem);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = payitem.RowID }, payitem);
        }

        // DELETE api/PayItem/5
        [ResponseType(typeof(PayItem))]
        public IHttpActionResult DeletePayItem(int id)
        {
            PayItem payitem = db.PayItem.Find(id);
            if (payitem == null)
            {
                return NotFound();
            }
            payitem.LastUpdatedDate = DateTime.Now;
            payitem.LogicalDelete = true;
            db.PayItem.Add(payitem);
            db.Entry(payitem).State = EntityState.Modified;

            db.SaveChanges();

            return Ok(payitem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PayItemExists(int id)
        {
            return db.PayItem.Count(e => e.RowID == id) > 0;
        }
    }
}