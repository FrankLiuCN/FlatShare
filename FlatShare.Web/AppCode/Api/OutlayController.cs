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
        public IQueryable<Outlay> GetOutlay()
        {
            return db.Outlay;
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

            db.Outlay.Add(outlay);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = outlay.RowID }, outlay);
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

            db.Outlay.Remove(outlay);
            db.SaveChanges();

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