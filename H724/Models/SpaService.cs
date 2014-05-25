using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace H724.Models
{
    public class SpaService
    {
        public SpaServiceGroup SpaServiceGroup { get; set; }
        public string Name { get; set; }
        public int DurationInMinute { get; set; }
        public double Price { get; set; }
    }
}