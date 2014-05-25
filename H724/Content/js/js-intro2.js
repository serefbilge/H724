//------------------------------
//Picker
//------------------------------
jQuery(function () {
    jQuery("#datepicker").datepicker();
    jQuery("#datepicker2").datepicker();
    jQuery("#datepicker3").datepicker();
    jQuery("#datepicker4").datepicker();
    jQuery("#datepicker5").datepicker();
    jQuery("#datepicker6").datepicker();
    jQuery("#datepicker7").datepicker();
    jQuery("#datepicker8").datepicker();
    jQuery("#datepicker9").datepicker();
    jQuery("#datepicker10").datepicker();
});

//------------------------------
//Custom Select
//------------------------------
jQuery(document).ready(function () {
    jQuery('.mySelectBoxClass').customSelect();
    /* -OR- set a custom class name for the stylable element */
    //jQuery('.customSelect2').customSelect({customClass:'customSelect2'});
});

function mySelectUpdate() {
    setTimeout(function () {
        $('.mySelectBoxClass').trigger('update');
        $('.customSelect2').trigger('update');
    }, 500);
}

$(window).resize(function () {
    mySelectUpdate();
});

//------------------------------
//Nicescroll
//------------------------------
jQuery(document).ready(function () {

    var nice = jQuery("html").niceScroll({
        cursorcolor: "#ccc",
        background: "#fff",
        cursorborder: "0px solid #fff",
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        //cursorwidth:"15px",
        cursorborderradius: "0px",
        cursoropacitymin: 0,
        cursoropacitymax: 0.7,
        boxzoom: true,
        autohidemode: false
    });

    jQuery("#air").niceScroll();
    jQuery("#hotel").niceScroll();
    jQuery("#car").niceScroll();
    jQuery("#vacations").niceScroll();

    jQuery('html').addClass('no-overflow-y');
});

//------------------------------
//Add rooms
//------------------------------
function addroom(ths) {
    var cur = $(ths).closest('div.room');
    var nxt = cur.next('div.room');

    if (nxt.length > 0) {
        nxt.removeClass('none').addClass('block');
        cur.find('div.addroom').removeClass('block').addClass('none');
    }
}
function removeroom(ths) {
    var cur = $(ths).closest('div.room');
    var prev = cur.prev('div.room');

    cur.removeClass('block').addClass('none');
    prev.find('div.addroom').removeClass('none').addClass('block');
}

//------------------------------
//TABS
//------------------------------
// Wait until the DOM has loaded before querying the document
$(document).ready(function () {
    $('ul.tabs').each(function () {
        // For each set of tabs, we want to keep track of
        // which tab is active and it's associated content
        var $active, $content, $links = $(this).find('a');

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
        $active.addClass('active');
        $content = $($active.attr('href'));

        // Hide the remaining content
        $links.not($active).each(function () {
            $($(this).attr('href')).animate({ 'margin-left': -1000 }, { duration: 500, queue: false }).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function (e) {
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.animate({ 'margin-left': -1000 }, { duration: 500, queue: false });
            $content.animate({ 'opacity': 0 });
            //$content.hide();			

            // Update the variables with the new link and content
            $active = $(this);
            $content = $($(this).attr('href'));

            // Make the tab active.
            $active.addClass('active');
            setTimeout(function () {
                $content.animate({ 'opacity': 1 });
                $content.animate({ 'margin-left': 0 }, { duration: 500, queue: false }).show();
            }, 500);
            mySelectUpdate();

            // Prevent the anchor's default click action
            e.preventDefault();
        });
    });
});

//-----------------------------------
//INTRO INITIALISATION AND ANIMATIONS
//-----------------------------------
$(document).ready(function ($) {

    var $iw = $(window).innerWidth();
    var $ih = $(window).innerHeight();

    $('.loader').animate({ 'opacity': 1 }, { duration: 200, queue: false });
    $('.bluediv').css({ 'width': $iw + 'px', 'height': $ih + 'px' });

    //loader position
    $('.loader').css({ 'left': $iw / 2 - 50 + 'px', 'top': $ih / 2 - 50 + 'px' });
});

function showImage(imageNo) {
    $('img.tab').css({ 'opacity': 0 });

    var imgToShow = $('img.tab.t' + imageNo);
    var opacity = imgToShow.data('opac');

    imgToShow.css({ 'left': 0, 'bottom': 0 });
    imgToShow.css({ 'opacity': opacity });
}

function setImageSize(img) {
    var ev = $._data(img, 'events');
    var bounded = ev && ev.load;

    //console.log('Load function is ' + (bounded ? 'bounded' : 'unbounded'));

    if (!bounded)
         img.load(function () {
            var screenWidth = $(window).innerWidth();
            var screenHeight = $(window).innerHeight();

            var $sw = screenWidth < 768 ? screenWidth : parseFloat(screenWidth * 11 / 16).toFixed(0);
                $sw = parseFloat($sw) + 50.0;

            var $sh = parseFloat(screenHeight);

            var $iw = $(this).width();
            var $ih = $(this).height();

            var $wr = parseFloat($iw / $sw).toFixed(2);
            var $hr = parseFloat($ih / $sh).toFixed(2);

            // If photo is not little and not big enough, we don't need to resize
            if (($wr >= 1.0 && $hr >= 1.0) && ($wr <= 1.25 || $hr <= 1.25)) {
                //console.log('returned: photo is not big enough to resize, ( $wr: ' + $wr + ' - $hr: ' + $hr + ' )');
                return;
            }
          
            var $h, $w;
           
            if ($wr != 1.0 || $hr != 1.0) {
                var littleRatio = $wr < $hr ? $wr : $hr;

                $h = parseFloat(img.height() / littleRatio).toFixed(0);
                $w = parseFloat(img.width() / littleRatio).toFixed(0);

                $h = parseFloat($h) + 10.0;
                $w = parseFloat($w) + 10.0;
                
                img.height($h);
                img.width($w);
            }
            
             // Test //
            if (img.hasClass('t1')) {
                var str = 'photo 1 needs to be resized => ( $wr: ' + $wr + ' - $hr: ' + $hr + ' )';
                str += ' | after resize => image: ' + img.width() + ' - ' + img.height() + ' / screen(w ' + parseFloat(screenWidth * 11 / 16).toFixed(0) + '): ' + $sw + ' - ' + $sh;

                console.log(str);
            }
             
            img.css({ 'left': 0, 'bottom': 0 });
             
         }).each(function () { if (this.complete) $(this).load(); });
    else img.load();
}

$(function () {
    // Sets the initial active tab
    g.ActiveTabNo = 1;

    //PRELOAD IMAGES
    var images = [
		'Content/images/parisbg.jpg',
		'Content/images/icon-facebook.png',
		'Content/images/icon-twitter.png',
		'Content/images/icon-gplus.png',
		'Content/images/icon-youtube.png',
		'Content/images/select.png',
        'Content/images/intro/logo-intro.png',
        'Content/images/intro/tab1.jpg',
        'Content/images/intro/tab2.jpg',
        'Content/images/intro/tab3.jpg',
        'Content/images/intro/tab4.jpg',
        'Content/images/intro/tab5.jpg'
    ];
    
    $.preload(images, 1, function (last) {

        for (var i = 0; i < this.length; i++) {
            $('<img height="200" src="' + this[i] + '" alt="" class="none"/>').appendTo('body');
        }

        if (last) {
            //WHEN PRELOAD FINISHES START JAVASCRIPT
            $(document).ready(function ($) {

                function StartAnimation(setImage) {
                    var $screenwidth = $(window).innerWidth();

                    if ($screenwidth >= 768) {
                        setTimeout(function () {

                            var $iw = $(window).innerWidth();
                            var $ih = $(window).innerHeight();

                            //initialize divs
                            $('.bluediv').css({ 'opacity': 1 });
                            $('.whitediv').css({ 'opacity': 1 });
                            $('.bluediv').css({ 'width': $iw + 'px', 'height': $ih + 'px' });
                            // Þerafettin Bilge
                            $('.whitediv').css({ 'width': 11 * $iw / 16 + 'px', 'height': $ih + 'px', 'top': 0 + 'px' });
                            $('.loader').animate({ 'opacity': 1 }, { duration: 200, queue: false });

                            //reset positions
                            $('.logointro').css({ 'opacity': 0 });
                            $('.tabscontainer').css({ 'opacity': 0 });
                            $('.tabs').css({ 'opacity': 0 });
                            $('.social').css({ 'opacity': 0 });
                            $('.leaf').css({ 'opacity': 1, 'left': -220 + 'px' });
                            $('.b1,.b2,.b3,.b4,.b5').css({ 'opacity': 0 });
                            
                            setTimeout(function () {
                                $('.loader').animate({ 'opacity': 0 }, { duration: 200, queue: false });
                            }, 0);

                            setTimeout(function () {
                                // Þerafettin Bilge
                                $('.bluediv').animate({ 'width': 5 * $iw / 16 + 'px', 'height': $ih + 'px' }, { duration: 400, queue: false });
                                $('.bluediv').animate({ 'margin-left': 0 + 'px', 'margin-top': 0 + 'px' }, { duration: 200, queue: false });
                            }, 1000);

                            // Shows and animates image 1 (img.tab.t1)
                            changeAnimation(g.ActiveTabNo);
                            
                            // Logo Intro Animation
                            setTimeout(function () {
                                $('.logointro').animate({ 'opacity': 1 }, { duration: 400, queue: false });
                                $('.tabscontainer').animate({ 'opacity': 1 }, { duration: 400, queue: false });
                            }, 1500);
                            // Tabs and Social parts anmimation
                            setTimeout(function () {
                                $('.tabs').animate({ 'opacity': 1 }, { duration: 400, queue: false });
                                $('.social').animate({ 'opacity': 1 }, { duration: 200, queue: false });
                            }, 1500);

                            //boolets animation
                            setTimeout(function () { $('.b1').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3500);
                            setTimeout(function () { $('.b2').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3600);
                            setTimeout(function () { $('.b3').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3700);
                            setTimeout(function () { $('.b4').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3800);
                            setTimeout(function () { $('.b5').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3900);

                            setTimeout(function () {
                                $('#tab1').animate({ 'opacity': 1 }, { duration: 1000, queue: false });
                                mySelectUpdate();
                            }, 3000);

                        }, 2000);
                    }//endif
                    else {
                        setTimeout(function () {

                            var $iw = $(window).innerWidth();
                            var $ih = $(window).innerHeight();

                            //initialize divs
                            $('.bluediv').css({ 'opacity': 1 });
                            $('.whitediv').css({ 'opacity': 1 });
                            $('.bluediv').css({ 'width': $iw + 'px', 'height': $ih + 'px' });

                            $('.whitediv').css({ 'width': $iw - 70 + 'px', 'height': $ih + 'px', 'top': 0 + 'px' });
                            $('.loader').animate({ 'opacity': 1 }, { duration: 200, queue: false });
                            
                            //reset positions
                            $('.logointro').css({ 'opacity': 0 });
                            $('.tabscontainer').css({ 'opacity': 0 });
                            $('.tabs').css({ 'opacity': 0 });
                            $('.social').css({ 'opacity': 0 });
                            $('.leaf').css({ 'opacity': 1, 'left': -220 + 'px' });
                            $('.b1,.b2,.b3,.b4,.b5').css({ 'opacity': 0 });

                            //$('#tab1,#tab2,#tab3,#tab4,#tab5').css({ 'width': $iw - 70 - 20 + 'px' });

                            //loader position
                            $('.loader').css({ 'left': $iw / 2 - 50 + 'px', 'top': $ih / 2 - 50 + 'px' });

                            setTimeout(function () {
                                $('.loader').animate({ 'opacity': 0 }, { duration: 200, queue: false });
                            }, 0);

                            setTimeout(function () {
                                $('.bluediv').animate({ 'width': 70 + 'px', 'height': $ih + 'px' }, { duration: 400, queue: false });
                                $('.bluediv').animate({ 'margin-left': 0 + 'px', 'margin-top': 0 + 'px' }, { duration: 200, queue: false });
                            }, 1000);

                            // Shows and animates image 1 (img.tab.t1)
                            changeAnimation(g.ActiveTabNo);

                            //couple & bg animation
                            setTimeout(function () {
                                var $cw = $('.couple').width();
                                $('.couple').animate({ 'opacity': 1, 'left': -$cw / 5.6 + 'px' }, { duration: 4000, queue: false });
                                $('.leaf').animate({ 'opacity': 1, 'left': 0 + 'px' }, { duration: 4000, queue: false });

                                var img1 = $('img.tab.t1');
                                var pos = img1.position();

                                img1.animate({
                                    'left': (pos.left - 50) + 'px',
                                }, { duration: 4000, queue: false });

                            }, 1000);

                            setTimeout(function () {
                                $('.logointro').animate({ 'opacity': 1 }, { duration: 400, queue: false });
                                $('.tabscontainer').animate({ 'opacity': 1 }, { duration: 400, queue: false });
                            }, 1500);

                            setTimeout(function () {
                                $('.tabs').animate({ 'opacity': 1 }, { duration: 400, queue: false });
                                $('.social').animate({ 'opacity': 1 }, { duration: 200, queue: false });
                            }, 1500);

                            //boolets animation
                            setTimeout(function () { $('.b1').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3500);
                            setTimeout(function () { $('.b2').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3600);
                            setTimeout(function () { $('.b3').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3700);
                            setTimeout(function () { $('.b4').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3800);
                            setTimeout(function () { $('.b5').animate({ 'opacity': 1 }, { duration: 400, queue: false }); }, 3900);

                            setTimeout(function () {
                                $('#tab1').animate({ 'opacity': 1 }, { duration: 1000, queue: false });
                                mySelectUpdate();
                            }, 3000);

                        }, 2000);
                    }
                    
                    if (typeof setImage !== "undefined" && setImage == true) {
                        //var t = new Date();
                        //console.log('time => ' + t.getHours() + '.' + t.getMinutes() + '.' + t.getSeconds());
                        
                        $('img.tab').each(function () {
                            var img = $(this);

                            setImageSize(img);
                        });
                    }
                }//end start animation

                StartAnimation(true);

                //on resize start again
                $(window).resize(function () {
                    /**/
                    //if  device is touchscreen do not resize
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) != true) {
                        StartAnimation(true);
                    }

                    //StartAnimation();
                    mySelectUpdate();
                });

                // Listen for orientation changes
                window.addEventListener("orientationchange", function () {
                    // Announce the new orientation number
                    //alert(window.orientation);
                    var $orientation = window.orientation;
                    if ($orientation == -90) {
                        StartAnimation(true);
                    }
                    if ($orientation == 0) {
                        StartAnimation(true);
                    }
                }, false);
            });
            //END OF JAVASCRIPT
        }
    });
});

//------------------------------
//TAB CHANGES
//------------------------------
function changeAnimation(imageNo) {
    var img = $('img.tab.t' + imageNo);
    if (typeof img.data('animated') !== "undefined" && img.data('animated')) {
        console.log(img.data('animated'));
        return;
    }

    g.ActiveTabNo = imageNo;
    showImage(imageNo);
    
    var pos = img.position();
    img.animate({
        'left': (pos.left - 50) + 'px',
    }, { duration: 4000, queue: false });

    $('img.tab').removeData('animated');
    img.data('animated', 'true');
}
