using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace H724.Models
{
    public class Response
    {
        public string CustomerSessionId { get; set; }
        public int NumberOfRoomsRequested { get; set; }
        public bool MoreResultsAvailable { get; set; }
    }
}