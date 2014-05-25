$(document).ready(function () {
    var b = $("#checkin"),
        c = $("#checkout"),
        d = $("#standardCheckin"),
        e = $("#standardCheckout");

    $("#TopDestinations .deals").hide();
    $("#TopDestinations .deals:first").show();
    $("#TopDestinations li:first .downArrowIcon").show();
    $("#TopDestinations li:first .rightArrowIcon").hide();
    $("#TopDestinations .titleDestination").click(function () {
        $("#TopDestinations .deals").slideUp("slow");

        $(this).parents().next("ul").slideDown("slow");

        $("#TopDestinations li .downArrowIcon").hide();
        $("#TopDestinations li .rightArrowIcon").show();

        $(this).find(".downArrowIcon").show();
        $(this).find(".rightArrowIcon").hide();

        return !1;
    });
    $("#Content ul#TodaysTopDeals li ul.deals li, #Content ul#TopDestinations li ul.deals li").hover(function() {
        $(this).addClass("highlight");
    }, function() {
        $(this).removeClass("highlight");
    });

    var a = "{checkbox} " + i18n.no_dates,
        a = a.replace("{checkbox}", '<input id="dateless" type="checkbox">');

    $("#check-in-out").append('<div class="dateless"><label for="dateless">' + a + "</label></div>");
    $("#SearchBoxForm").trigger("inputAdded");
    $("#dateless").change(function(a) {
        $.each([b, c], function() {
            this.datepicker(a.target.checked ? "disable" : "enable");

            d.val(a.target.checked ? "" : b.val());
            e.val(a.target.checked ? "" : c.val());

            var f = this.data("date");

            this.data("date", this.datepicker("getDate"));
            this.datepicker("setDate", f);
            this.change();
        });
    });
});