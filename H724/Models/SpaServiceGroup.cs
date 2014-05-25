using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace H724.Models
{
    public class SpaServiceGroup:BaseEntity<int>
    {
        public string Name { get; set; }
        public IList<SpaService> Services { get; set; } 
    }
}