using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace H724.Controllers
{
    public class SpaDetailsController : Controller
    {
        //
        // GET: /SpaDetails/

        public ActionResult SpaServices()
        {
            return PartialView();
        }
    }
}
