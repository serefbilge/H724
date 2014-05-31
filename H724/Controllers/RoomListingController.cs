using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using H724.Models;

namespace H724.Controllers
{
    public class RoomListingController : BaseController
    {
        public ActionResult RoomSearch()
        {
            ViewBag.SearchType = SearchType.RoomSearch;

            return View();
        }

        public ActionResult RoomSearch2()
        {
            ViewBag.SearchType = SearchType.RoomSearch;

            return View();
        }

        public ActionResult RoomSearch3()
        {
            ViewBag.SearchType = SearchType.RoomSearch;

            return View();
        }

        [ChildActionOnly]
        public ActionResult ChangeSearch(SearchType searchType)
        {
            ViewBag.SearchType = searchType;
            return PartialView("_ChangeSearch");
        }
    }
}
