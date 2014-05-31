using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace H724.Controllers
{
    public class SearchController : Controller
    {
        [ChildActionOnly]
        public ActionResult RoomSearch()
        {
            return PartialView("_RoomSearch");
        }
        [ChildActionOnly]
        public ActionResult SpaSearch()
        {
            return PartialView("_SpaSearch");
        }
        [ChildActionOnly]
        public ActionResult RestaurantSearch()
        {
            return PartialView("_RestaurantSearch");
        }
        [ChildActionOnly]
        public ActionResult PoolSearch()
        {
            return PartialView("_PoolSearch");
        }
        [ChildActionOnly]
        public ActionResult EventSearch()
        {
            return PartialView("_EventSearch");
        }

    }
}
