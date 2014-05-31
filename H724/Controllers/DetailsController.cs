using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using H724.Models;

namespace H724.Controllers
{
    public class DetailsController : Controller
    {
        //
        // GET: /Details/

        public ActionResult Room()
        {
            ViewBag.SearchType = SearchType.RoomSearch;

            return View();
        }

        public ActionResult Spa()
        {
            ViewBag.SearchType = SearchType.SpaSearch;

            return View();
        }

        public ActionResult Restaurant(string id)
        {
            ViewBag.SearchType = SearchType.RestaurantSearch;
            ViewBag.RestaurantId = id ?? "124"; 

            return View();
        }

        public ActionResult Pool()
        {
            ViewBag.SearchType = SearchType.PoolSearch;

            return View();
        }

        public ActionResult Event()
        {
            ViewBag.SearchType = SearchType.EventSearch;

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
