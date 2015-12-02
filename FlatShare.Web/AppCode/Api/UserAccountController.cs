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
    public class UserAccountController : ApiController
    {
        private FlatShareEntities db = new FlatShareEntities();

        // GET api/UserAccount
        public IQueryable<UserAccount> GetUserAccount()
        {
            return db.UserAccount.Where(u => u.LogicalDelete != true);
        }

        // GET api/UserAccount/5
        [ResponseType(typeof(UserAccount))]
        public IHttpActionResult GetUserAccount(int id)
        {
            UserAccount useraccount = db.UserAccount.Find(id);
            if (useraccount == null)
            {
                return NotFound();
            }

            return Ok(useraccount);
        }

        // PUT api/UserAccount/5
        [HttpPost]
        public IHttpActionResult PutUserAccount(UserAccount useraccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            useraccount.LastUpdatedDate = DateTime.Now;
            db.Entry(useraccount).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccountExists(useraccount.RowID))
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

        [HttpPost]
        public IHttpActionResult PostUserAccount(UserAccount useraccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            useraccount.LastUpdatedDate = DateTime.Now;
            db.UserAccount.Add(useraccount);
            db.SaveChanges();

            return Ok(useraccount);
        }

        [HttpDelete]
        public IHttpActionResult DeleteUserAccount(int id)
        {
            UserAccount useraccount = db.UserAccount.Find(id);
            if (useraccount == null)
            {
                return NotFound();
            }
            useraccount.LastUpdatedDate = DateTime.Now;
            useraccount.LogicalDelete = true;
            db.Entry(useraccount).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(useraccount);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserAccountExists(int id)
        {
            return db.UserAccount.Count(e => e.RowID == id) > 0;
        }
    }
}