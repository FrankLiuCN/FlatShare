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
using FlatShare.API.Models;

namespace FlatShare.API.Controllers
{
    public class PayItemController : ApiController
    {
        private FlatShareEntities db = new FlatShareEntities();

        // GET api/PayItem
        public IQueryable<PayItem> GetPayItem()
        {
            return db.PayItem;
        }

        // GET api/PayItem/5
        [ResponseType(typeof(PayItem))]
        public IHttpActionResult GetPayItem(int id)
        {
            PayItem payitem = db.PayItem.Find(id);
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

            db.PayItem.Remove(payitem);
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