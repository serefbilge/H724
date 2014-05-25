using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using H724._Helpers;

namespace H724.Models
{
    public class Hotel:BaseEntity<int>
    {
        public string HotelId { get; set; }
        public string Name { get; set; }
        public string AirportCode { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string StateProvince { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string LowRate { get; set; }
        public string HighRate { get; set; }
        public string MarketingLevel { get; set; }
        public string Confidence { get; set; }
        public string HotelModified { get; set; }
        public string PropertyType { get; set; }
        public string TimeZone { get; set; }
        public string GMTOffset { get; set; }
        public string YearPropertyOpened { get; set; }
        public string YearPropertyRenovated { get; set; }
        public string NativeCurrency { get; set; }
        public string NumberOfRooms { get; set; }
        public string NumberOfSuites { get; set; }
        public string NumberOfFloors { get; set; }
        public string CheckInTime { get; set; }
        public string CheckOutTime { get; set; }
        public string HasValetParking { get; set; }
        public string HasContinentalBreakfast { get; set; }
        public string HasInRoomMovies { get; set; }
        public string HasSauna { get; set; }
        public string HasWhirlpool { get; set; }
        public string HasVoiceMail { get; set; }
        public string Has24HourSecurity { get; set; }
        public string HasParkingGarage { get; set; }
        public string HasElectronicRoomKeys { get; set; }
        public string HasCoffeeTeaMaker { get; set; }
        public string HasSafe { get; set; }
        public string HasVideoCheckOut { get; set; }
        public string HasRestrictedAccess { get; set; }
        public string HasInteriorRoomEntrance { get; set; }
        public string HasExteriorRoomEntrance { get; set; }
        public string HasCombination { get; set; }
        public string HasFitnessFacility { get; set; }
        public string HasGameRoom { get; set; }
        public string HasTennisCourt { get; set; }
        public string HasGolfCourse { get; set; }
        public string HasInHouseDining { get; set; }
        public string HasInHouseBar { get; set; }
        public string HasHandicapAccessible { get; set; }
        public string HasChildrenAllowed { get; set; }
        public string HasPetsAllowed { get; set; }
        public string HasTVInRoom { get; set; }
        public string HasDataPorts { get; set; }
        public string HasMeetingRooms { get; set; }
        public string HasBusinessCenter { get; set; }
        public string HasDryCleaning { get; set; }
        public string HasIndoorPool { get; set; }
        public string HasOutdoorPool { get; set; }
        public string HasNonSmokingRooms { get; set; }
        public string HasAirportTransportation { get; set; }
        public string HasAirConditioning { get; set; }
        public string HasClothingIron { get; set; }
        public string HasWakeUpService { get; set; }
        public string HasMiniBarInRoom { get; set; }
        public string HasRoomService { get; set; }
        public string HasHairDryer { get; set; }
        public string HasCarRentDesk { get; set; }
        public string HasFamilyRooms { get; set; }
        public string HasKitchen { get; set; }
        public string HasMap { get; set; }
        public string PropertyDescription { get; set; }
        public string GDSChainCode { get; set; }
        public string GDSChaincodeName { get; set; }
        public string DestinationID { get; set; }
        public string DrivingDirections { get; set; }
        public string NearbyAttractions { get; set; }
    }

    public class HotelSummary : BaseEntity<int>
    {
        public string HotelId { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string City { get; set; }
        public string StateProvinceCode { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }
        public string AirportCode { get; set; }
        public string PropertyCategory { get; set; }
        public string HotelRating { get; set; }
        public string ConfidenceRating { get; set; }
        public string AmenityMask { get; set; }
        public string TripAdvisorRating { get; set; }
        public string LocationDescription { get; set; }
        public string ShortDescription { get; set; }
        public string HighRate { get; set; }
        public string LowRate { get; set; }
        public string RateCurrencyCode { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string ProximityDistance { get; set; }
        public string ProximityUnit { get; set; }
        public string HotelInDestination { get; set; }
        public string ThumbNailUrl { get; set; }
        public string DeepLink { get; set; }
    }

    public class HotelListResponse : Response
    {
        public HotelList HotelList { get; set; }
    }

    public class HotelList
    {
        public HotelSummary HotelSummary { get; set; }
    }
}