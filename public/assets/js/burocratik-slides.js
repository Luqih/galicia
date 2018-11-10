/*! --------------------------------------------------------------------
JAVASCRIPT "Burocratik's slideshows"

* @Version:    1.0.0 - 2015
* @author:     Burocratik (alexandre gomes - @alexrgomes)
* @email:      alex@burocratik.com, hello@burocratik.com
* @website:    http://www.burocratik.com
* @preserve
-----------------------------------------------------------------------*/

/* -----------------------------------------------------------------------
1. If I have autoplay > use timeout = i need a unique name for timeout
2. still dont have kill working
-----------------------------------------------------------------------*/

;( function(defaults, $, window, document, undefined) {
    'use strict';

    $.extend({
        // Function to change the default properties of the plugin
        // Usage: jQuery.pluginSetup({property:'Custom value'});
        // animateSpriteIMGSetup : function(options) {
        //     return $.extend(defaults, options);
        // }
    }).fn.extend({
        // Usage: jQuery(selector).pluginName({property:'value'});
        buro_slideshows: function(options) {
            options = $.extend({}, defaults, options);

            return $(this).each(function() {
                //** PLUGIN LOGIC
                var $el = $(this);
                var $slide_nav = $el.find(".slideshow-nav");
                var $slide_btn = $el.find(".slideshow-nav-btn");
                var $slide_btn_arrow = $el.find(".slideshow-arrow-btn");
                var $slide_btn_arrow_wrapper = $el.find(".slideshow-arrows-wrapper");
                var $slide = $el.find(".slideshow-slide");
                var $slideExtra = $el.find(".slideshow-slide-extra");
                var $slideWrapper = $el.find(".slideshow-slide-wrapper");
                var nT_slides = $el.find(".slideshow-slide").size();

                // ** only one slide
                if (nT_slides <= 1) {
                    $slide_nav.velocity("fadeOut", {
                        duration: 100
                    });
                    $slide_btn_arrow_wrapper.velocity("fadeOut", {
                        duration: 100
                    });
                    return;
                }

                // ** which slideshow
                switch (options.slidetype) {
                    case "moveUpScaleDown":
                        var functionToCall = window["slideshow_moveUpScaleDown"];
                        break;
                    case "headerHome":
                        var functionToCall = window["slideshow_header"];
                        break;
                    case "slideDownUpFade":
                        var functionToCall = window["slideshow_slideDownUpFade"];
                        break;
                    case "slidePicsCities":
                        var functionToCall = window["slideshow_slidePicsCities"];
                        break;
                    case "justLoopCSS":
                        slideshow_justLoopCSS(true, $slide, nT_slides, options.autoplay_time, options.autoplay_uniqueName );
                        break;
                    default:
                        var functionToCall = window["slideshow_moveUpScaleDown"];
                }


                // ** data-number construction
                buro_slideshows_data_number($el, nT_slides);

                // ** data-height construction
                if (options.slide_height) {
                  buro_slideshows_data_height($el, nT_slides);
                  var startHeight = $el.find(".slideshow-slide.on").attr("data-slideshow-height");
                  $slideWrapper.height(startHeight);
                }

                // ** =CLICK NAV **
                $slide_btn.on("click", function(event) {
                    startAutoplay(false, false);
                    var $btn = $(this);
                    var index_this = $btn.attr("data-slideshow-n");
                    var index_on = $el.find(".slideshow-nav-btn.on").attr("data-slideshow-n");

                    $slide_btn.removeClass("on");
                    $btn.addClass("on");

                    if (index_this >= index_on) {
                        functionToCall($slide, $slideExtra, "next", index_this, index_on);
                    } else {
                        functionToCall($slide, $slideExtra, "prev", index_this, index_on);
                    }
                    // **EXCEPTIONS DELETE IN OTHER PROJECTS
                    clockAnalog(true);
                    //
                    return false;
                })

                // ** =ARROWS **
                if (options.nav_arrows) {
                    $slide_btn_arrow.on("click", function(event) {
                        var $btn = $(this);
                        var index_on = $el.find(".slideshow-nav-btn.on").attr("data-slideshow-n");

                        var index_on_Number = Number(index_on);
                        var index_this = index_on_Number;

                        if ( $btn.hasClass("rgt") ) {
                          index_this = index_on_Number + 1;
                          if ( index_on_Number == nT_slides ) index_this=1;
                          functionToCall($slide, $slideExtra, $el, "next", index_this, index_on);
                        }else{
                          index_this = index_on_Number - 1;
                          if ( index_on_Number == 1 ) index_this=nT_slides;
                          functionToCall($slide, $slideExtra, $el, "prev", index_this, index_on);
                        }

                        $slide_btn.removeClass("on");
                        $el.find(".slideshow-nav-btn[data-slideshow-n='"+index_this+"']").addClass("on");
                        //if i have page numbers
                        $el.find(".page-n").text(index_this);

                        return false;
                    })
                }

                // ** =AUTOPLAY **
                if (options.autoplay) {
                    if ( options.autoplay_onlyLoop ) return;

                    if (!options.autoplay_type) {
                        startAutoplay(options.autoplay, false);
                        return;
                    } else {
                        switch (options.autoplay_type) {
                            case "translateX":
                                var functionNavToCall = window["slideshow_navAutoplayTranslateX"];
                                break;
                            default:
                                var functionNavToCall = window["slideshow_navAutoplayTranslateX"];
                        } //end switch
                    } //end if
                    startAutoplay(options.autoplay, options.autoplay_type);
                } // end Autoplay

                function startAutoplay(yes, anim) {
                    if (!yes) {
                        $.doTimeout(options.autoplay_uniqueName);
                        $slide_btn.find(".time").hide();
                        return false;
                    }

                    var indexLoop = 1;
                    var $btnCurrent = $slide_btn.filter("[data-slideshow-n=" + indexLoop + "]");

                    if (anim) {
                        var $animTime = $btnCurrent.find(".time");
                        functionNavToCall($animTime, options.autoplay_time);
                    }

                    $.doTimeout(options.autoplay_uniqueName, options.autoplay_time, function() {
                        indexLoop++;
                        var index_this = indexLoop;
                        var index_on = indexLoop - 1;
                        if (indexLoop > nT_slides) {
                            index_this = 1;
                            index_on = nT_slides;
                            indexLoop = 1;
                        }
                        //nav
                        var $btnCurrent = $slide_btn.filter("[data-slideshow-n=" + index_this + "]");
                        $slide_btn.removeClass("on");
                        $btnCurrent.addClass("on");
                        //autoplay animation
                        if (anim) {
                            var $animTime = $btnCurrent.find(".time");
                            functionNavToCall($animTime, options.autoplay_time);
                        }
                        //slides
                        functionToCall($slide, $slideExtra, "next", index_this, index_on);
                        return true;
                    }) //end time out
                } //end slideshowSTART

                // ** =CONSTRUCT data-slide-number
                function buro_slideshows_data_number($this, nT_slides) {
                    var $slide_btn = $this.find(".slideshow-nav-btn");
                    var $slide = $this.find(".slideshow-slide");
                    var $slide_extra = $this.find(".slideshow-slide-extra");
                    var i = 1;
                    var j = 1;
                    var k = 1;

                    $slide_btn.each(function() {
                        var $this = $(this);
                        $this.attr("data-slideshow-n", i);
                        i++;
                    })

                    $slide.each(function() {
                        var $this = $(this);
                        $this.attr("data-slideshow-n", j);
                        j++;
                    })

                    $slide_extra.each(function() {
                        var $this = $(this);
                        $this.attr("data-slideshow-n", k);
                        k++;
                    })
                } // endburo_slideshows_data_number

                // ** =CONSTRUCT data-slide-height
                function buro_slideshows_data_height($this, nT_slides) {
                    var $slide = $this.find(".slideshow-slide");
                    var i = 1;

                    $slide.each(function() {
                        var $this = $(this);
                        var this_height = $this.height();
                        $this.attr("data-slideshow-height", this_height);
                    })

                } // endburo_slideshows_data_number

                //CONDITONS COLLED BY METHODS
                if (options.destroy) {
                    //slideshow_justLoopCSS(false, $slide,  nT_slides, options.autoplay_time, options.autoplay_uniqueName )
                    // $el.doTimeout("animation");
                    // $el.attr("style","");
                }
                //END PLUGIN LOGIC (return each)
            });
        },
        destroy: function(options) {

            var $el = $(this);
            $el.buro_slideshows({
                destroy: true
            });
            return $.extend(defaults, options);
        }
    });
} )({
    slidetype: "moveUpScaleDown",
    slide_height: false,
    nav_arrows: false,
    autoplay: false,
    autoplay_time: 0,
    autoplay_type: null,
    autoplay_uniqueName: null,
    autoplay_onlyLoop: false,
    destroy: false
}, jQuery, window, document);

/*-----------------------------------------------------------------------
 =buro_slideshows > =NAVIGATION animation autoplay
-----------------------------------------------------------------------*/
function slideshow_navAutoplayTranslateX($element, time) {
    $element.velocity({
        translateX: [0, "-100%"]
    }, {
        easing: "linear",
        duration: time - 1,
        complete: function() {
            $(this).velocity({
                translateX: "-100%"
            }, 0)
        }
    })
}


/*-----------------------------------------------------------------------
 =buro_slideshows > =moveUpScaleDown
-----------------------------------------------------------------------*/
function slideshow_moveUpScaleDown($slide, $slideExtra, direction, index_this, index_on) {
    var $nextSlide = $slide.filter("[data-slideshow-n=" + index_this + "]");
    var $prevSlide = $slide.filter("[data-slideshow-n=" + index_on + "]");

    $nextSlide.addClass("on");
    $prevSlide.removeClass("on");

    if (direction == "next") {
        $nextSlide.velocity("slideshow_moveUpScaleDown.translateUp", 1200, function() {
            $nextSlide.find(".zoom").addClass("go-out");
        });
        $prevSlide.velocity("slideshow_moveUpScaleDown.scaleDown", 1210, function() {
            $prevSlide.find(".zoom").removeClass("go-in go-out go-in-start");
        });
    } else {
        $nextSlide.velocity({
            scale: .8,
            translateY: 0
        }, 0)
            .find(".zoom").addClass("go-in-start");
        $nextSlide.velocity("slideshow_moveUpScaleDown.scaleUp", 1000, function() {
            $nextSlide.find(".zoom").addClass("go-in");
        });
        $prevSlide.velocity("slideshow_moveUpScaleDown.translateDown", 1100, function() {
            $prevSlide.find(".zoom").removeClass("go-in go-out go-in-start");
        });
    }

} // end slideshow moveUpScaleDown

$.Velocity
    .RegisterEffect("slideshow_moveUpScaleDown.translateUp", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["0", "100%"]
            }, 1, {
                easing: [0.76, 0, 0.18, 1]
            }]
        ]
    });
$.Velocity
    .RegisterEffect("slideshow_moveUpScaleDown.translateDown", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["100%", "0"]
            }, 1, {
                easing: [0.76, 0, 0.18, 1]
            }]
        ]
    });

$.Velocity
    .RegisterEffect("slideshow_moveUpScaleDown.scaleDown", {
        defaultDuration: 1,
        calls: [
            [{
                scale: [".8", "1"]
            }, 1, {
                easing: [0.76, 0, 0.18, 1]
            }]
        ],
        reset: {
            scale: "1",
            translateY: "100%"
        }
    });

$.Velocity
    .RegisterEffect("slideshow_moveUpScaleDown.scaleUp", {
        defaultDuration: 100,
        calls: [
            [{
                scale: ["1", ".8"],
                translateY: "0"
            }, 1, {
                easing: [0.76, 0, 0.18, 1]
            }]
        ],
        reset: {
            scale: "1",
            translateY: "0"
        }
    });

/*-----------------------------------------------------------------------
 =buro_slideshows > =HEADER HomePage
-----------------------------------------------------------------------*/
function slideshow_header($slide, $slideExtra, direction, index_this, index_on) {
    var $nextSlide = $slide.filter("[data-slideshow-n=" + index_this + "]");
    var $prevSlide = $slide.filter("[data-slideshow-n=" + index_on + "]");
    var $nextSlideExtra = $slideExtra.filter("[data-slideshow-n=" + index_this + "]");
    var $prevSlideExtra = $slideExtra.filter("[data-slideshow-n=" + index_on + "]");

    $prevSlide.removeClass("on");
    $prevSlideExtra.removeClass("on");

    //if has video
    if ($prevSlide.find("video").length) {
        $prevSlide.find("video")[0].pause();
    }
    if ($nextSlide.find("video").length) {
        $nextSlide.find("video")[0].play();
    }

    if (direction == "next") {
        $nextSlide.css("z-index", "10");
        $prevSlide.css("z-index", "5");
        $nextSlide.velocity("slideshow_header.inUpScaleToDown", 1200);
        $prevSlide.velocity("slideshow_header.outUpScaleDown", 1300);
        $nextSlideExtra.find(".slide").velocity("slideshow_header.translateBottomCenter", 900);
        $prevSlideExtra.find(".slide").velocity("slideshow_header.translateCenterTop", 1000);
    } else {
        $nextSlide.css("z-index", "5");
        $prevSlide.css("z-index", "10");
        $nextSlide.velocity("slideshow_header.inUpScaleDown", 1200);
        $prevSlide.velocity("slideshow_header.outUpScaleToDown", 1300);
        $nextSlideExtra.find(".slide").velocity("slideshow_header.translateTopCenter", 900);
        $prevSlideExtra.find(".slide").velocity("slideshow_header.translateCenterBottom", 1000);
    }

} // end slideshow header


$.Velocity
    .RegisterEffect("slideshow_header.inUpScaleToDown", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["0", "130%"],
                scale: ["1.05", "1.5"]
            }, 1, {
                easing: [0.76, 0, 0.175, 1]
            }]
        ]
    });
$.Velocity
    .RegisterEffect("slideshow_header.outUpScaleToDown", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["130%", "0"],
                scale: ["1.5", "1.05"]
            }, 1, {
                easing: [0.76, 0, 0.175, 1]
            }]
        ]
    });

$.Velocity
    .RegisterEffect("slideshow_header.outUpScaleDown", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["-50%", "0"],
                scale: ["1", "1.05"],
                opacity: [.4, 1]
            }, 1, {
                easing: [0.76, 0, 0.175, 1]
            }]
        ],
        reset: {
            translateY: "130%",
            scale: 1.5,
            opacity: 1
        }
    });
$.Velocity
    .RegisterEffect("slideshow_header.inUpScaleDown", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["0", "-50%"],
                scale: ["1.05", "1"],
                opacity: [1, .4]
            }, 1, {
                easing: [0.76, 0, 0.175, 1]
            }]
        ]
    });

$.Velocity
    .RegisterEffect("slideshow_header.translateBottomCenter", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["0", "105%"]
            }, 1, {
                delay: 200,
                easing: [0.76, 0, 0.18, 1]
            }]
        ]
    });
$.Velocity
    .RegisterEffect("slideshow_header.translateCenterBottom", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["105%", "0"]
            }, 1, {
                easing: [0.76, 0, 0.18, 1]
            }]
        ]
    });
$.Velocity
    .RegisterEffect("slideshow_header.translateCenterTop", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["-105%", "0"]
            }, 1, {
                easing: [0.76, 0, 0.18, 1]
            }]
        ]
    });
$.Velocity
    .RegisterEffect("slideshow_header.translateTopCenter", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: ["0", "-105%"]
            }, 1, {
                delay: 200,
                easing: [0.76, 0, 0.18, 1]
            }]
        ]
    });

/*-----------------------------------------------------------------------
 =buro_slideshows > =SlideDownUpText (home jobs/news)
-----------------------------------------------------------------------*/
function slideshow_slideDownUpText($slide, $slideExtra, direction, index_this, index_on) {
    var $nextSlide = $slide.filter("[data-slideshow-n=" + index_this + "]");
    var $prevSlide = $slide.filter("[data-slideshow-n=" + index_on + "]");
    var direction = "next";

    $nextSlide.addClass("on");
    $nextSlide.find(".info").velocity("transition.slideUpBigIn", {
        drag: true
    });
    $prevSlide.find(".info").velocity("transition.slideUpBigOut-primeIT", {
        drag: true,
        duration: 600,
        complete: function() {
            $prevSlide.removeClass("on")
        }
    });

} // end slideshow_slideDownUp
$.Velocity
    .RegisterEffect("transition.slideUpBigOut-primeIT", {
        defaultDuration: 800,
        calls: [
            [{
                opacity: [0, 1],
                translateY: -37,
                translateZ: 0
            }]
        ],
        reset: {
            translateY: 0
        }
    });

/*-----------------------------------------------------------------------
 =buro_slideshows > =just loop of on and off via classes and timeout
-----------------------------------------------------------------------*/
function slideshow_justLoopCSS ( playstop, $slide, nT_slides, autoplay_time, autoplay_uniqueName ) {
    if (!playstop) {
        $.doTimeout(autoplay_uniqueName);
        return false;
    }
    //if i need min-width for words not to be cut
    // var minwidth = 25;
    // $slide.each(function(){
    //     var $this = $(this);
    //     var aux = $this.width();
    //     if ( aux > minwidth ) minwidth = aux;
    // })
    //     $slide.parent().css("min-width", minwidth)
    //
    var indexLoop = 1;
    $.doTimeout(autoplay_uniqueName, autoplay_time, function() {
        indexLoop++;
        var index_this = indexLoop;
        var index_on = indexLoop - 1;
        if (indexLoop > nT_slides) {
            index_this = 1;
            index_on = nT_slides;
            indexLoop = 1;
        }
        $slide.filter("[data-slideshow-n=" + index_on + "]").addClass("out").removeClass("on");
        $slide.filter("[data-slideshow-n=" + index_this + "]").addClass("on").removeClass("out");

        return true;
    }) //end time out

} // end slideshow_justLoopCSS


/*-----------------------------------------------------------------------
 =buro_slideshows > =SlideDownUp ( home jobs/news)
-----------------------------------------------------------------------*/
function slideshow_slideDownUpFade($slide, $slideExtra, direction, index_this, index_on) {
    var $nextSlide = $slide.filter("[data-slideshow-n=" + index_this + "]");
    var $prevSlide = $slide.filter("[data-slideshow-n=" + index_on + "]");
    var direction = "next";

    var this_height = $nextSlide.attr("data-slideshow-height");
    $slide.parents(".slideshow-slide-wrapper").height(this_height);

    $nextSlide.addClass("on");
    $nextSlide.find(".slide").css("opacity", "0");
    $nextSlide.find(".slide").velocity("transition.slideUpBigIn", {
        drag: true,
        duration: 1000,
        delay: 150
    });
    $prevSlide.find(".slide").velocity("transition.slideUpBigOut-jobs", {
        drag: true,
        duration: 600,
        complete: function() {
            $prevSlide.removeClass("on")
        }
    });

} // end slideshow_slideDownUp
$.Velocity
    .RegisterEffect("transition.slideUpBigOut-jobs", {
        defaultDuration: 800,
        calls: [
            [{
                opacity: [0, 1],
                translateY: -37,
                translateZ: 0,
            }]
        ],
        reset: {
            translateY: 0
        }
    });

/*-----------------------------------------------------------------------
 =buro_slideshows > =slide Pics with arrow (contacts page)
-----------------------------------------------------------------------*/
function slideshow_slidePicsCities($slide, $slideExtra, $el, direction, index_this, index_on) {
    var $nextSlide = $slide.filter("[data-slideshow-n=" + index_this + "]");
    var $prevSlide = $slide.filter("[data-slideshow-n=" + index_on + "]");

    $nextSlide.addClass("on");
    $prevSlide.removeClass("on");
    $nextSlide.css("z-index", "10");
    $prevSlide.css("z-index", "5");

    if ( index_this == 1 ) {
        $el.find(".slideshow-arrows.lft").removeClass("on");
    }else{
        $el.find(".slideshow-arrows.lft").addClass("on");
    }

    if (direction == "next") {
          $nextSlide.velocity("slideshow_slidePicsCities.inScaleDownToLeft", 1300);
          $prevSlide.velocity({
            translateX: 0
          }, 0)
          $prevSlide.velocity("slideshow_slidePicsCities.outScaleDownToLeft", {
              duration: 1400,
              delay: 0
          });
      } else {
          $nextSlide.velocity("slideshow_slidePicsCities.inScaleDownToRight", 1300);
          $prevSlide.velocity("slideshow_slidePicsCities.outScaleDownToRight", 1400);
      }

} // end slideshow_slidePicsCities

$.Velocity
    .RegisterEffect("slideshow_slidePicsCities.inScaleDownToLeft", {
        defaultDuration: 100,
        calls: [
            [{
                translateX: ["0", "120%"],
                translateZ: 0,
                scale: ["1", "1.4"],
            }, 1, {
                easing: [0.76, 0, 0.175, 1]
            }]
        ]
    });
$.Velocity
    .RegisterEffect("slideshow_slidePicsCities.outScaleDownToLeft", {
        defaultDuration: 100,
        calls: [
            [{
                translateX: ["-80%", "0"],
                translateZ: 0,
                opacity: [".3", "1"]
            }, 1, {
                easing: [0.76, 0, 0.175, 1]
            }]
        ],
            reset: {
                translateX: "130%",
                scale: "1.5",
                opacity: 1
            }
    });

$.Velocity
    .RegisterEffect("slideshow_slidePicsCities.inScaleDownToRight", {
        defaultDuration: 100,
        calls: [
            [{
                translateX: ["0", "-120%"],
                translateZ: 0,
                scale: ["1", "1.4"],
            }, 1, {
                easing: [0.76, 0, 0.175, 1]
            }]
        ]
    });
$.Velocity
    .RegisterEffect("slideshow_slidePicsCities.outScaleDownToRight", {
        defaultDuration: 100,
        calls: [
            [{
                translateX: ["80%", "0"],
                translateZ: 0,
                opacity: [".3", "1"]
            }, 1, {
                easing: [0.76, 0, 0.175, 1]
            }]
        ],
            reset: {
                translateX: "130%",
                scale: "1.4",
                opacity: 1
            }
    });

/*-----------------------------------------------------------------------
 =buro_slideshows > =slideDownUpTextOLD(> like txt in header home jobs/news)
-----------------------------------------------------------------------*/
function slideshow_slideDownUpTextOLD($slide, $slideExtra, direction, index_this, index_on) {
    var $nextSlide = $slide.filter("[data-slideshow-n=" + index_this + "]");
    var $prevSlide = $slide.filter("[data-slideshow-n=" + index_on + "]");
    var direction = "next";

    $nextSlide.addClass("on");
    $nextSlide.find(".slide").velocity("transition.slideDownCenterText", {
        drag: true,
        duration: 1000
    });
    $prevSlide.find(".slide").velocity("transition.slideCenterUpText", {
        drag: true,
        duration: 1000,
        complete: function() {
            $prevSlide.removeClass("on")
        }
    });

} // end slideshow_slideDownUp
$.Velocity
    .RegisterEffect("transition.slideDownCenterText", {
        defaultDuration: 800,
        calls: [
            [{
                translateY: ["0", "150%"],
                translateZ: 0
            }, 1, {
                easing: [0.76, 0, 0.18, 1]
            }]
        ]
    });

$.Velocity
    .RegisterEffect("transition.slideCenterUpText", {
        defaultDuration: 800,
        calls: [
            [{
                translateY: ["-150%", "0"],
                translateZ: 0
            }, 1, {
                easing: [0.76, 0, 0.18, 1]
            }]
        ],
        reset: {
            translateY: "150%"
        }
    });

