//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FlatShare.Web.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UserAccount
    {
        public int RowID { get; set; }
        public string UserName { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }
        public string Telephone { get; set; }
        public string Remark { get; set; }
        public Nullable<bool> LogicalDelete { get; set; }
        public int LastUpdatedBy { get; set; }
        public System.DateTime LastUpdatedDate { get; set; }
    }
}