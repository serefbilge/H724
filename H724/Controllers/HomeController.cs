using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Script.Serialization;
using H724.Models;
using H724._Helpers;
using Newtonsoft.Json;

namespace H724.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult SetCulture(string culture)
        {
            // Validate input
            culture = CultureHelper.GetImplementedCulture(culture);

            // Save culture in a cookie
            var cookie = Request.Cookies["_culture"];
            if (cookie != null)
                cookie.Value = culture; // update cookie value
            else
                cookie = new HttpCookie("_culture") { Value = culture, Expires = DateTime.Now.AddYears(1) };

            Response.Cookies.Add(cookie);

            return RedirectForNewCulture();
        }

        public ActionResult RedirectForNewCulture()
        {
            if (Request.UrlReferrer == null) RedirectToAction("Index", "Home");

            // Split the url to url + query string
            var fullUrl = Request.UrlReferrer.ToString();
            var questionMarkIndex = fullUrl.IndexOf('?');
            string queryString = null;
            var url = fullUrl;

            if (questionMarkIndex != -1) // There is a QueryString
            {
                url = fullUrl.Substring(0, questionMarkIndex);
                queryString = fullUrl.Substring(questionMarkIndex + 1);
            }

            // Arranges
            var request = new HttpRequest(null, url, queryString);
            var response = new HttpResponse(new StringWriter());
            var httpContext = new HttpContext(request, response);

            var routeData = RouteTable.Routes.GetRouteData(new HttpContextWrapper(httpContext));
            if (routeData == null) RedirectToAction("Index", "Home");

            // Extract the data    
            var values = routeData.Values;
            var controllerName = values["controller"];
            var actionName = values["action"];
            var id = values["id"];
            var title = values["title"];
            //var areaName = values["area"];

            return RedirectToAction(actionName.ToString(), controllerName.ToString(), new { id, title });
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult IndexB()
        {
            return View();
        }

        public ActionResult EanIndex()
        {
            //var userIpAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            //if (string.IsNullOrEmpty(userIpAddress)) userIpAddress = Request.ServerVariables["REMOTE_ADDR"];

            var hotelIds = new List<string> { "105804", "201252", "106230" };
            var hotelSummaries = GetHotelSummaries(hotelIds);

            return View(hotelSummaries);
        }

        public ActionResult NewHome()
        {
            return View();
        }

        public ActionResult VenereHome()
        {
            return View();
        }

        public ActionResult HouseTripHome()
        {
            return View();
        }
        public ActionResult Details()
        {
            return RedirectToAction("Room", "Details");
        }

        #region Helpers
        private static string GetUriForHotelSummary(string hotelId)
        {
            const string service = "http://dev.api.ean.com/ean-services/rs/hotel/";
            const string version = "v3/";
            const string method = "list/";
            const string otherElemntsStr = "&cid=55505&minorRev=[26]&locale=en_US&currencyCode=USD"; //"&customerUserAgent=[xxx]&customerIpAddress=[xxx]&locale=en_US&currencyCode=USD";
            const string apiKey = "rs3m6mzwdz2sxuxtmsqtup8r";
            const string secret = "ubks2axK";
            var sig = (apiKey + secret + (Int32)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds).MD5GenerateHash();
            var apiUri = service + version + method + "?apiKey=" + apiKey + "&sig=" + sig + otherElemntsStr + "&hotelIdList=" + hotelId;

            return apiUri;
        }
        private static HotelSummary GetHotelSummary(string hotelId, HttpClient client = null)
        {
            ResponseWrapper result;
            var apiUri = GetUriForHotelSummary(hotelId);

            if (client == null)
            {
                using (client = new HttpClient())
                {
                    var response = client.GetAsync(apiUri).Result;
                    result = response.Content.ReadAsAsync<ResponseWrapper>().Result;
                }
            }
            else
            {
                var response = client.GetAsync(apiUri).Result;
                result = response.Content.ReadAsAsync<ResponseWrapper>().Result;
            }

            return result != null ? result.HotelListResponse.HotelList.HotelSummary : null;
        }
        private static List<HotelSummary> GetHotelSummaries(IEnumerable<string> hotelIds)
        {
            var summaries = new List<HotelSummary>();

            using (var client = new HttpClient())
            {
                summaries.AddRange(hotelIds.Select(id => GetHotelSummary(id, client) ?? new HotelSummary {HotelId = id}));

                return summaries;
            }
        }
        #endregion
    }
}
