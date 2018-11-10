/*! -------------------------------------------------------------------------------------------
JAVASCRIPT main engine!

* @Version:    1.0 - 2015
* @author:     Burocratik (alexandre gomes - @alexrgomes)
* @email:      alex@burocratik.com, hello@burocratik.com
* @website:    http://www.burocratik.com
* @preserve
NOTES:
:: js-no-ajax class on body (nao pode ser no html) > take it off with js as soon I work with ajax
:: js-no-ajax = did refresh
:: body.js-byrefresh= when i start by direct link (refresh) do no show content before loading
:: #loading-page.js-loading-page = i need separate byrefresh of this when I have js off
:: js-loading-page = can be used if I need a global style only when I am loading content
:: mobile = tag html is via js, tag body is via php (can't be on html tag or is deleted), also used for IE<=10
:: _global_allowNavigate = do not allow multiple cliks to load ajax (arrow, keys, click)
:: js-no-transPage = when I want a domain link with no transition ajax animation
--------------------------------------------------------------------------------------------*/
$(document).ready(function() {
  //** outdatedbrowser.com (B the first to be call or in older browsers IE6,7 will have weird js erros )
    outdatedBrowser({
        bgColor: '#f25648',
        color: '#fff',
        lowerThan: 'boxShadow',
        languagePath: ''
    })
    //** MODERNIZR not supporter properties (backgroundcliptext, object-fit, cssclipPath )
    Modernizr.addTest('backgroundcliptext', function() {
        var div = document.createElement('div');
        div.style.cssText = Modernizr._prefixes.join('background-clip:text;');
        return !!div.style.cssText.replace(/\s/g, '').length;
    });

    Modernizr.addTest('object-fit', !!Modernizr.prefixed('objectFit') );

   !function(e){for(var t,n,i,r=[{name:"svg",value:"url(#test)"},{name:"inset",value:"inset(10px 20px 30px 40px)"},{name:"circle",value:"circle(60px at center)"},{name:"ellipse",value:"ellipse(50% 50% at 50% 50%)"},{name:"polygon",value:"polygon(50% 0%, 0% 100%, 100% 100%)"}],p=0;p<r.length;p++)t=r[p].name,n=r[p].value,e.addTest("cssclippath"+t,function(){if("CSS"in window&&"supports"in window.CSS){for(var t=0;t<e._prefixes.length;t++)if(i=e._prefixes[t]+"clip-path",window.CSS.supports(i,n))return!0;return!1}return e.testStyles("#modernizr { "+e._prefixes.join("clip-path:"+n+"; ")+" }",function(t){var n=getComputedStyle(t),i=n.clipPath;if(!i||"none"==i){i=!1;for(var r=0;r<e._domPrefixes.length;r++)if(test=e._domPrefixes[r]+"ClipPath",n[test]&&"none"!==n[test]){i=!0;break}}return e.testProp("clipPath")&&i})})}(Modernizr);
    /////////////////////////
}); //END LOAD DOCUMENT


/********************************************************************************************
 **                                                                                       **
      =LOADING PAGES, SECTIONS - =transitions between pages, =ajax
 **                                                                                       **
*********************************************************************************************/
//** MAIN LOAD
function loadPages(newContent, pageTransition) {
    var $currentPage = $(".page-main.page-current"),
        $nextContent = $(".page-main.page-next"); // can't be global

    $("html,body").addClass("fixed-all");
    $_body.removeClass('js-no-ajax'); // I am using =ajax
    $_body.addClass("js-loading-page"); // loading by ajax (removed onStartPage())


} //////end function main load content

function clearPagesAfterloading(delay) {
    var $currentPage = $(".page-main.page-current"),
        $nextContent = $(".page-main.page-next"); // can't be global
} //end function


/********************************************************************************************
 **                                                                                       **
     =START EACH PAGE - refresh or ajax
 **                                                                                       **
*********************************************************************************************/
function onStartPageWhenRefresh(byRefresh) {
    if (byRefresh) {
        // :BUG CHROME: even wit this is not scrolling top is some section, needed hack after preloading with animate
        window.scrollTo(0, 0);
        $("html,body").scrollTop(0);
        //
        $("html,body").addClass("fixed-all");
        $_loadingPage.addClass('js-loading-page');
        $_body.removeClass("js-byrefresh");

        if ($('.page-current .sign-in').length || $('.page-current .sign-up').length || $('.page-current .page-404').length || $('.page-current .subscribe').length || $('.page-current .success').length) {
            $_body.addClass("no-footer");
        }

        $_toPreload.imagesLoaded(function($images, $proper, $broken) {
            var fPreload = $(this).imagesLoaded();
            fPreload.always(function() {

                $("html,body").animate({
                    scrollTop: 0
                }, 100); // :BUG CHROME: 100ms is arbitrary
                $_toPreload.remove();

                // if browser does not suport object-fit: cover
                if ( $_html.hasClass("no-object-fit") )  {
                    var $element = $(".page-current .element-cover");
                    resizeLikeCover($element);
                }

                /////
                $_loadingPage.velocity({
                    opacity: 0
                }, 600, function() {
                    $("html,body").removeClass("fixed-all");
                    $_loadingPage.removeClass('js-loading-page').hide();
                    onStartPage();
                })
            }) //end always
        }) //end preload images
    //for history: When your page loads, it might have a non-null state object and the page will receive an onload event, but no popstate event.
      forPopstate=true;
    } else {
        onStartPage();
    }
} //////end function

/*-------------------------------------------------------------------------------------------
    =STARTPAGE - EACH PAGE - call of functions and events
--------------------------------------------------------------------------------------------*/
function onStartPage() {
    var do_home,
        do_pricing,
        do_signin,
        do_signup,
        do_careers,
        do_features,
        do_subscribe,
        do_404;

    // ** =ALLOW user load other pages
    _global_allowNavigate = true;

    // ** =REMOVE classes of loading (if needed)
    $("html,body").removeClass("fixed-all");
    $_body.removeClass("js-loading-page");

    // ** =MAIN NAV on =SECTION NAME (not on body because i have more classes, home is always exception)
    var whereIam = $(".page-current .page-toload").attr("data-url");
    mainNavigation_activeLinks(whereIam);

    // ** =HOME
    ($(".page-current .home").length) ? do_home = true : do_home = false;
    homePage(do_home);

    // ** =PRICING
    ($(".page-current .pricing").length) ? do_pricing = true : do_pricing = false;
    pricingPage(do_pricing);

    // ** =SIGN IN
    ($(".page-current .sign-in").length) ? do_signin = true : do_signin = false;
    signinPage(do_signin);

    // ** =SIGN UP
    ($(".page-current .sign-up").length) ? do_signup = true : do_signup = false;
    signupPage(do_signup);

    // ** =CARRERS
    ($(".page-current .careers").length) ? do_careers = true : do_careers = false;
    careersPage(do_careers);

    // ** =FEATURES
    ($(".page-current .features").length) ? do_features = true : do_features = false;
    featuresPage(do_features);

     // ** =SUBSCRIBE
    ($(".page-current .subscribe").length) ? do_subscribe = true : do_subscribe = false;
    subscribePage(do_subscribe);

     // ** =404
    ($(".page-current .page-404").length) ? do_404 = true : do_404 = false;
    errorPage(do_404);

    // ** =URL com ancoras onload
    var hasHash = window.location.hash;
    if ( hasHash != "") {
      var $toGoHere = $(""+hasHash+"")
        $.doTimeout(100, function() {
            if ( $(".page-current .home").length ) {
              // Homepage exception
              $(".side-nav-features a[href="+hasHash+"]").click();
            } else{
              if(hasHash == "#privacy" || hasHash == "#terms")
                goTo( $toGoHere, 1000, [0.7,0,0.3,1], -60);
              else
                goTo( $toGoHere, 1000, [0.7,0,0.3,1], 0);
            }

        });
      //
    }

    // ** =scrolling events
    whenScrolling(true);

    // ** =Slideshow Slick
    slideshow_slick();

    // ** =HoverAnim function for links
    hoverInOut();

    // ** =js-btn-goto for mobile
    pageGotoforMobile();

    //Newsletter Form
    newsletterForm();

    // ** =RESIZE ELEMENTS LIKE BACKGROUND COVER (browser does not support object-fit: cover)
    if ( $_html.hasClass("no-object-fit") )  {
        var $element = $(".page-current .element-cover");
        resizeLikeCover($element);
    }

} //////end function StartPage

/** *******************************************************************************************
     =HOME
*********************************************************************************************/
function homePage(do_home) {
    if (!do_home) {
        $_body.removeClass('home');
        $_window.off('scroll.home');
        vTourFeatures = null;
        return false;
    }
    $_body.addClass('home');
    $_window.on('scroll.home', $.debounce(5, rAF_homeNavSec) );
    goAnimCSS();


    var $btnPlay_header = $(".header-grid-home .btn-play"),
        $btnPlay_big_header = $(".header-grid-home .btn-play-big"),
        $group_hover= $(".header-home-screen1, .header-home-screen2"),
        $browser = $(".header-grid-home .main-pic"),
        $iphone = $(".header-grid-home .iphone"),
        $triger_hover_btn = $(".header-home-screen1 .btn-play-big-wrapper"),
        $homeForm = $(".form-signup-home");


    $homeForm.find("input").blur(function() {
      var $this = $(this);
      var defeito = this.defaultValue;

      if (!$this.hasClass('required')) return;
      check($this, defeito, 0);
    });
    $homeForm.find("input").focus(function() {
      var $this = $(this);
      $this.removeClass('erro');
    });

    $homeForm.on("submit", function(event){

      if (validateForm($homeForm) ) {
        //Submit Form everything seems ok...
        console.log("Submit Form everything seems ok...");
      }
      else
        event.preventDefault();
    });

//** =HEADER ANIMATION
    $(".header-main").addClass("start");

    $.doTimeout(1700, function(){
        // only 1st time a enter the page no over on the header
        $(".home-start-bg").hide();
    })

    $btnPlay_header.click(function(){
        if (Modernizr.mq('(min-width: 1024px)')) {
          homeHeaderAnimation();
          $group_hover.removeClass("hover");
          return false;
        } else {
          var linkExternal = window.open($(this).attr("href"));
          return linkExternal.closed;
        }
    })

    $triger_hover_btn.mouseenter(function(event){
      $group_hover.addClass("hover");
      $btnPlay_big_header.css("visibility","visible");
    })
    $triger_hover_btn.mouseleave(function(){
      $group_hover.removeClass("hover");
    })

    $btnPlay_header.mouseenter(function(event){
      $group_hover.addClass("hover");
      $btnPlay_big_header.css("visibility","hidden");
    })
    $btnPlay_header.mouseleave(function(){
      $group_hover.removeClass("hover");
      $btnPlay_big_header.css("visibility","hidden");
    })

    $btnPlay_big_header.click(function(){
        $btnPlay_header.click();
        return false;
    })

    //slideshow icons
    if ( !$_html.hasClass("no-csstransforms3d") ) {
      $(".slideshow-txtLoop-slide").buro_slideshows({
          slidetype: "justLoopCSS",
          autoplay: true,
          autoplay_time: 2000,
          autoplay_uniqueName: "slideshow-txtLoop",
          autoplay_onlyLoop: true,
          min_width: true,
          min_height: false,
          destroy: false
      })
    }


//** =SIDE NAVIGATION (scroll dependent)
    var $blockTrig = $(".js-sideNav"),
        $sideNavHome = $(".side-nav-home");
    var $f1 = $("#tour-print"),
        $f5 = $("#tour-resharing"),
        yIniB = $f1.offset().top,
        yEndB = $f5.offset().top,
        hIniB = verge.rectangle($f1).height,
        hEndB = verge.rectangle($f5).height;
    var positionYini = yIniB - _globalHalfViewportH,
        positionYend = yEndB - _globalHalfViewportH + hEndB;

    function rAF_homeNavSec() {
        window.requestAnimationFrame(f_rAF_homeNavSec);
    }

    function f_rAF_homeNavSec() {
        var scrollVal = verge.scrollY();

        // ON-OFF links on side nav
        $blockTrig.each( function(i) {
            var $this=$(this);

            if( verge.inY($this, -_globalHalfViewportH ) && verge.inY($this, _globalViewportH ) ) {
              var $where = $this.attr("id");
              if ( $where == "tour-print") {
                var $obgNav = $("#nav-tour-print"),
                    $obgNavIMG = $("#nav-tour-print img");
                if( $obgNav.hasClass("on") ) return;
                homeNavSecHelper($obgNav, $obgNavIMG)
              }

              if ( $where == "tour-tracking") {
                var $obgNav = $("#nav-tour-tracking"),
                    $obgNavIMG = $("#nav-tour-tracking img");
                if( $obgNav.hasClass("on") ) return;
                homeNavSecHelper($obgNav, $obgNavIMG)
              }

              if ( $where == "tour-timebox") {
                var $obgNav = $("#nav-tour-timebox"),
                    $obgNavIMG = $("#nav-tour-timebox img");
                if( $obgNav.hasClass("on") ) return;
                homeNavSecHelper($obgNav, $obgNavIMG)
              }

              if ( $where == "tour-geolocation") {
                var $obgNav = $("#nav-tour-geolocation"),
                    $obgNavIMG = $("#nav-tour-geolocation img");
                if( $obgNav.hasClass("on") ) return;
                homeNavSecHelper($obgNav, $obgNavIMG)
              }

              if ( $where == "tour-resharing") {
                var $obgNav = $("#nav-tour-resharing"),
                    $obgNavIMG = $("#nav-tour-resharing img");
                if( $obgNav.hasClass("on") ) return;
                homeNavSecHelper($obgNav, $obgNavIMG)
              }
            } //end if verge
        })//end each function

        //show hide nav
        if( scrollVal > positionYini && scrollVal < positionYend ) {
           $sideNavHome.addClass("on");
            return false;
        } else{
           $sideNavHome.removeClass("on");
        }

    } //end function scroll

    function homeNavSecHelper($obgNav, $obgNavIMG) {
        sideNavLinks_removeON();
        $sideNavLinks.removeClass("on");
        replageIMGsrc($obgNavIMG, ".png", ".gif");
        $obgNav.addClass("on");
    }

//** =SIDE NAVIGATION BTNS
    var $sideNavLinks = $(".side-nav-features a");

    $sideNavLinks.click(function(){
        var $this = $(this),
            thisHref = $this.attr("href"),
            $whereTo = $(""+thisHref+""),
            whereToH = $whereTo.innerHeight(),
            $img = $sideNavLinks.find('img');

        if ( $this.hasClass("on") ) return false;
        sideNavLinks_removeON();
        $sideNavLinks.removeClass("on");
        $this.addClass("on");

        yoff = Math.round( (_globalViewportH - whereToH) /2 );
        goTo($whereTo, 800, [0.7,0,0.3,1], -yoff);

        return false;
    })//end click

  $sideNavLinks.hover(function() {
    var $this = $(this);
    if ( $this.hasClass("on") ) return;
    var $img = $this.find('img'),
        typeBF = ".png",
        typeAF = ".gif";
    replageIMGsrc ($img, typeBF, typeAF);

  }, function() {
    var $this = $(this);
    if ( $this.hasClass("on") ) return;
    var $img = $this.find('img'),
        typeAF = ".png",
        typeBF = ".gif";
    replageIMGsrc ($img, typeBF, typeAF);
  });

  function sideNavLinks_removeON() {
    $sideNavLinks.each(function(){
        var $this = $(this);
        if ( $this.hasClass("on") ) {
          var $img = $this.find('img');
          replageIMGsrc ($img, ".gif", ".png");
        }
    })
  }

}/////end function HOMEPAGE()

function replageIMGsrc($img, typeBF, typeAF) {
    var aux = $img.attr("src"),
        aux2 =  aux.replace(typeBF, typeAF);

    $img.attr("src", aux2);
}

//** =HEADER ANIMATION LOOP
function homeHeaderAnimation() {
    var $screen1 = $(".header-home-screen1"),
        $screen2 = $(".header-home-screen2"),
        $screen3 = $(".header-home-screen3"),
        $screen4 = $(".header-home-screen4"),
        $screen5 = $(".header-home-screen5"),
        $screen6 = $(".header-home-screen6"),
        $screen7 = $(".header-home-screen7"),
        $screens = $(".header-grid-home");
    var $clickGeo = $(".protect.geo"),
        $unshare = $screen6.find(".unshare"),
        $iphone6 = $screen6.find(".iphone"),
        $blur6 = $screen6.find(".blur");
    //reset
    $screens.attr("style", "");
    $screens.find(".animate-sprite").attr("style", "");
    //
    $screen1.addClass("goAnim");
    $screen2.addClass("goAnim");

    // screen 2
    $.doTimeout(1200, function(){
        hide_homeHeaderAnimation($screen1);
        $screen1.find(".btn-play, .btn-play-big").addClass("clicked");
    })

    $.doTimeout(3300, function(){
      var $image = $screen2.find(".animate-sprite");
      $image.animateSpriteIMG({
            widthFrame: 251,
            heightFrame: 323,
            totalFrames: 30,
            totalRow: 3,
            totalColumn: 10,
            speed: 25,
            loop: false
      })
    })
    $.doTimeout(4400, function(){
      $screen2.addClass("exit");
    })

    // screen 3
    $.doTimeout(5200, function(){
        $screen3.addClass("goAnim");
    })
    $.doTimeout(6550, function(){
        $clickGeo.addClass("on");
        hide_homeHeaderAnimation($screen2);
    })

    $.doTimeout(7400, function(){
      $screen3.addClass("exit");
      $screen4.addClass("goAnim");
    })

    // screen 4
    $.doTimeout(8000, function(){
      $clickGeo.removeClass("on");
      hide_homeHeaderAnimation($screen3);
    })
    $.doTimeout(9200, function(){
      var $image = $screen4.find(".animate-sprite");
      $image.animateSpriteIMG({
            widthFrame: 256,
            heightFrame: 52,
            totalFrames: 90,
            totalRow: 6,
            totalColumn: 15,
            speed: 25,
            loop: false,
            stopLastFrame: true
      })
    })
    var $btn = $screen4.find(".btn");
    $.doTimeout(12000, function(){
        $btn.addClass("on");
    })
    $.doTimeout(12300, function(){
        $btn.removeClass("on");
        $screen4.addClass("exit");
    })

    // screen 5
    $.doTimeout(13100, function(){
      $screen5.addClass("goAnim");
      $screen5.find(".location").addClass("on");
      hide_homeHeaderAnimation($screen4);
    })

    $screen5.find(".location").addClass("on");
    $.doTimeout(14800, function(){
      $screen5.find(".balls").addClass("on");
      var $image = $screen5.find(".animate-sprite");
      $image.animateSpriteIMG({
            widthFrame: 149,
            heightFrame: 139,
            totalFrames: 63,
            totalRow: 20,
            totalColumn: 20,
            speed: 30,
            loop: false,
            stopLastFrame: true
      })
    })

    $.doTimeout(17000, function(){
      $screen5.find(".location").removeClass("on");
    })

    $.doTimeout(18900, function(){
      $screen5.addClass("exit");
    })

    // screen 6
    $.doTimeout(19900, function(){
      $screen6.addClass("goAnim");
      $screen5.find(".balls").removeClass("on");
      hide_homeHeaderAnimation($screen5);
    })

    $.doTimeout(21700, function(){
      var $image = $screen6.find(".animate-sprite");
      $image.animateSpriteIMG({
            widthFrame: 218,
            heightFrame: 72,
            totalFrames: 62,
            totalRow: 5,
            totalColumn: 15,
            speed: 30,
            loop: false,
            stopLastFrame: true
      })
    })

    $.doTimeout(23900, function(){
       $unshare.addClass("exit");
    })

    $.doTimeout(24900, function(){
        $unshare.removeClass("exit").hide();
        $iphone6.addClass("go");
    })

    $.doTimeout(27800, function(){
        $screen6.addClass("exit");
    })

    // screen 7
    $.doTimeout(29200, function(){
        $screen7.addClass("goAnim");
        $unshare.attr("style","");
        $iphone6.removeClass("go");
        hide_homeHeaderAnimation($screen6);
    })

    $.doTimeout(33300, function(){
      goTo( $(".block-form"), 1000, [0.7,0,0.3,1], 0);
      $screen7.addClass("exit");
    })
    $.doTimeout(34000, function(){
        hide_homeHeaderAnimation($screen7);
    })
    // screen 1
    $.doTimeout(34500, function(){
        $(".home .header-main").removeClass("start");
        $screens.attr("style","");
    })
    $.doTimeout(34800, function(){
        $(".home .header-main").addClass("start");
    })

}/////end homeHeaderAnimation()

function hide_homeHeaderAnimation($element) {
  $element.css({
    "z-index": "-1",
    "visibility": "hidden"
  })
  $element.removeClass("goAnim exit");
}//end function

//** =HOME ANIMATION STRAT on viewport
function home_hand(){
  $.doTimeout(2200, function(){
    var $image = $(".picto-track-control .animate-sprite");
    $image.animateSpriteIMG({
          widthFrame: 147,
          heightFrame: 146,
          totalFrames: 17,
          totalRow: 1,
          totalColumn: 17,
          speed: 20,
          loop: false,
          stopLastFrame: true
    })
  })
}//end function

function home_timebox(){
  $.doTimeout(600, function(){
    var $image = $(".tour-timebox-days .animate-sprite");
    $image.animateSpriteIMG({
          widthFrame: 159,
          heightFrame: 189,
          totalFrames: 34,
          totalRow: 3,
          totalColumn: 15,
          speed: 30,
          loop: false,
          stopLastFrame: true
    })
  })
  $.doTimeout(800, function(){
    var $image = $(".tour-timebox-hours .animate-sprite");
    $image.animateSpriteIMG({
          widthFrame: 159,
          heightFrame: 189,
          totalFrames: 41,
          totalRow: 3,
          totalColumn: 15,
          speed: 30,
          loop: false,
          stopLastFrame: true
    })
  })
  $.doTimeout(1200, function(){
    var $image = $(".tour-timebox-min .animate-sprite");
    $image.animateSpriteIMG({
          widthFrame: 159,
          heightFrame: 189,
          totalFrames: 45,
          totalRow: 3,
          totalColumn: 15,
          speed: 31,
          loop: false,
          stopLastFrame: true
    })
  })
}//end function

function home_geolocation(){
  $.doTimeout(1600, function(){
    var $image = $(".tour-geolocation-anim .animate-sprite");
    $image.animateSpriteIMG({
          widthFrame: 106,
          heightFrame: 106,
          totalFrames: 59,
          totalRow: 4,
          totalColumn: 15,
          speed: 29,
          loop: false,
          stopLastFrame: true
    })
  })
}//end function


/** *******************************************************************************************
     =PRICING
*********************************************************************************************/
function pricingPage(do_pricing) {
  if (!do_pricing) {
    $_window.off("resize.pricingPage");
    $_window.off("scroll.pricingPage");
    return false;
  }
  else {
    $_window.on('resize.pricingPage', $.debounce(10, pricing_resizeEvents));
    $_window.on('scroll.pricingPage', $.debounce(10, pricing_scrollEvents));
  }

  //** =HEADER ANIMATION
  $(".block-price-tables").addClass("js-start");
  $(".header-main").addClass("js-start");

  var $respTitle = $(".accordion-question"),
      $navAcordion = $(".nav-accordion > div"),
      $navAcordionList = $(".nav-accordion ul li a"),
      $contentAcordion = $(".content-accordion"),
      $contentAcordionLists = $(".content-accordion > div"),
      $king = $(".good-causes-king"),
      $footer = $('footer'),
      $priceCurrencySwitch = $(".price-currency-switch span"),
      $listPriceHeader = $(".list-pricing .list-pricing-header"),
      $contactForm = $(".contact-form"),
      $contactFormInputs = $(".contact-form input"),
      $contactFormTextarea = $(".contact-form textarea"),
      $formResponse = $(".form-response"),
      $contactBtn = $(".js-contact-us"),
      $contactBtnClose = $(".modal-close-container"),
      $modalBg = $("#modal-bg"),
      $listTestemonials = $(".list-testemonial"),
      $blockTestemonials = $(".block-testemonials"),
      $currencyPriceList = $(".currency-price"),
      $currencyPrice = $(".currency-price li"),
      $odometerFree = $(".odometer-free"),
      $odometerStandard = $(".odometer-standard"),
      $odometerPlus = $(".odometer-plus"),
      duration_height = 0,
      $odometerValues = new Object();


  startModal();

  getOdometerVals();

  //slideshow icons
  if ( !$_html.hasClass("no-csstransforms3d") ) {
    $(".slideshow-txtLoop-slide").buro_slideshows({
        slidetype: "justLoopCSS",
        autoplay: true,
        autoplay_time: 2000,
        autoplay_uniqueName: "slideshow-txtLoop",
        autoplay_onlyLoop: true,
        min_width: true,
        min_height: false,
        destroy: false
    })
  }

  if($_html.hasClass("ios") && $_html.hasClass("safari")){
      $listPriceHeader.addClass("on");
      $listPriceHeader.find("em").css("margin-left", "30px");

      $priceCurrencySwitch.on("click", function(){
        if($(this).hasClass("on")) return;

        $odometerStandard.addClass("hide-value");
        $odometerPlus.addClass("hide-value");

        $priceCurrencySwitch.toggleClass("on");
        getOdometerVals();

        var standard_aux = $odometerValues.standard;
        var plus_aux =$odometerValues.plus;

        standard_aux = standard_aux.split(".");
        plus_aux = plus_aux.split(".");

        $.doTimeout(300, function(){
          $odometerStandard.html(standard_aux[0] + "<sub class='sub'>." + standard_aux[1] );
          $odometerPlus.html(plus_aux[0] + "<sub class='sub'>." + plus_aux[1] );
        });

        $.doTimeout(300, function(){
          $odometerStandard.removeClass("hide-value");
          $odometerPlus.removeClass("hide-value");
        });
      });

      $currencyPrice.on("click", function(){
        var $this = $(this);
        var array = [];
        if( $this.hasClass("on") ) return;

        $odometerStandard.addClass("hide-value");
        $odometerPlus.addClass("hide-value");

        var $priceCurrencySwitchOn = $(".price-currency-switch span.on");

        $currencyPrice.toggleClass("on");

        getOdometerVals();

        var standard_aux = $odometerValues.standard;
        var plus_aux =$odometerValues.plus;

        standard_aux = standard_aux.split(".");
        plus_aux = plus_aux.split(".");

        $.doTimeout(300, function(){
          $odometerStandard.html(standard_aux[0] + "<sub class='sub'>." + standard_aux[1] );
          $odometerPlus.html(plus_aux[0] + "<sub class='sub'>." + plus_aux[1] );
        });
        $.doTimeout(300, function(){
          $odometerStandard.removeClass("hide-value");
          $odometerPlus.removeClass("hide-value");
        });
      });
  }
  else {

    /*Odometer - Initialization*/
    var odometerFree = $odometerFree[0];
    odometerFree = new Odometer({
      el: odometerFree,
      value: $odometerValues.free,
      duration: 1000,
      format: '( ddd).dd'
    });

    var odometerStandard = $odometerStandard[0];
    odometerStandard = new Odometer({
      el: odometerStandard,
      value: $odometerValues.standard,
      duration: 1000,
      format: '( ddd).dd'
    });

    var odometerPlus = $odometerPlus[0];
    odometerPlus = new Odometer({
      el: odometerPlus,
      value: $odometerValues.plus,
      duration: 1000,
      format: '(  ddd).dd'
    });

    $.doTimeout(200, function(){
      $listPriceHeader.addClass("on");
    });

    $priceCurrencySwitch.on("click", function(){
      if($(this).hasClass("on")) return;

      $priceCurrencySwitch.toggleClass("on");
      getOdometerVals();

      odometerFree.update($odometerValues.free);
      odometerStandard.update($odometerValues.standard);
      odometerPlus.update($odometerValues.plus);

    });

    $currencyPrice.on("click", function(){
      var $this = $(this);
      var array = [];
      if( $this.hasClass("on") ) return;

      var $priceCurrencySwitchOn = $(".price-currency-switch span.on");

      $currencyPrice.toggleClass("on");
      getOdometerVals();

      odometerFree.update($odometerValues.free);
      odometerStandard.update($odometerValues.standard);
      odometerPlus.update($odometerValues.plus);

    });
    /*Odometer - END*/
  }

  var QA_controller = new ScrollMagic.Controller();

  QA_scene = new ScrollMagic.Scene({triggerElement: ".faq1", triggerHook: "onLeave", duration: pricing_getQAheight })
    .setPin(".nav-accordion > div")
    .addTo(QA_controller)
    .offset(-160);

    $blockTestemonials.hover(function(){
      $(".slideshow-slick").slick("slickPause");

    }, function(){
       $(".slideshow-slick").slick("slickPlay");

    });

   $navAcordionList.on("click", function(){
      var nav_id = $(this).attr("id");
      nav_id = nav_id.replace('-nav','');
      $("#" + nav_id).addClass("active");
    });

  /*If layout is small disable scrollmagic*/
  if($_window.width() <= 1024) {
    QA_scene.enabled(false);
  }
  if($_html.hasClass("mobile") ) {
    QA_scene.enabled(false);
    QA_scene.destroy(true);
  }

  $navAcordionList.each(function(){
    var nav_id = $(this).attr("id"),
        element_id = nav_id;
        element_id = element_id.replace('-nav',''),
        $elem = $("." + element_id);

    if( verge.inY($king, 200) ) {
      $king.addClass("go-anim");
    }
  });

  $respTitle.click(function(){
      var $this = $(this),
          $respMain = $this.parents("li"),
          $respQuestionIcon = $this.children(".icon-circle-plus"),
          $respAnswer = $this.siblings(".accordion-answer");

      if (!$respMain.hasClass("active")) {
        $respMain.addClass("active");
        $respQuestionIcon.addClass("on");
        $respAnswer
          .velocity("slideDown", {
            duration: 200,
            complete: function() {
              pricing_getQAheight($respAnswer);
            }
          });
      } else {
        $respMain.removeClass("active");
        $respQuestionIcon.removeClass("on");
        $respAnswer
          .velocity("slideUp", {
            duration: 200,
            complete: function() {
              pricing_getQAheight($respAnswer);
            }
          });
      }
  });

  if( verge.inY($elem, 200) ) {
    $navAcordionList.removeClass("on")

      //$("#" + nav_id).addClass("on");
  }

  if( verge.inY($king, -500) ) {
    $king.addClass("go-anim");
  }

  /** =Pricing specific functions **/

  function getOdometerVals() {

    $priceCurrencySwitch.each(function(){
      var $this = $(this);

      if($this.hasClass("month-switch") && $this.hasClass("on")) {

        $currencyPrice.each(function(){
          var $this = $(this);

          if( $this.hasClass("price-dollar") && $this.hasClass("on") ){
            $odometerValues.free = $odometerFree.attr("data-mensal-dollar");
            $odometerValues.standard = $odometerStandard.attr("data-mensal-dollar");
            $odometerValues.plus = $odometerPlus.attr("data-mensal-dollar");
          }
          else if( $this.hasClass("price-euro") && $this.hasClass("on") ) {
            $odometerValues.free = $odometerFree.attr("data-mensal-euro");
            $odometerValues.standard = $odometerStandard.attr("data-mensal-euro");
            $odometerValues.plus = $odometerPlus.attr("data-mensal-euro");
          }
        });
      }
      else if($this.hasClass("year-switch") && $this.hasClass("on")) {

        $currencyPrice.each(function(){
          var $this = $(this);

          if( $this.hasClass("price-dollar") && $this.hasClass("on") ){
            $odometerValues.free = $odometerFree.attr("data-anual-dollar");
            $odometerValues.standard = $odometerStandard.attr("data-anual-dollar");
            $odometerValues.plus = $odometerPlus.attr("data-anual-dollar");
          }
          else if( $this.hasClass("price-euro") && $this.hasClass("on") ){
            $odometerValues.free = $odometerFree.attr("data-anual-euro");
            $odometerValues.standard = $odometerStandard.attr("data-anual-euro");
            $odometerValues.plus = $odometerPlus.attr("data-anual-euro");
          }
        });
      }
    });

    if(!$_html.hasClass("ios") && !$_html.hasClass("safari")){
      $odometerValues.free = 1 + $odometerValues.free;
      $odometerFree.addClass("hide-first-digit");
      $odometerValues.standard = 1 + $odometerValues.standard;
      $odometerStandard.addClass("hide-first-digit");
      $odometerValues.plus = 1 + $odometerValues.plus;
      $odometerPlus.addClass("hide-first-digit");
    }
  }

  /*ContactUs Modal*/
  $contactFormTextarea.on("keyup change", function(){
    var $this = $(this);
    if($this.val() != 0){
      $this.parent("p").addClass("input-filled");
    }
  });

  $contactFormInputs.on("keyup change", function(){
    $contactFormInputs.each(function(){
      var $this = $(this);
      if($this.val() != 0){
        $this.parent("p").addClass("input-filled");
      }
    });
  });

  $contactFormInputs.blur(function() {
    var $this = $(this);
    var defeito = this.defaultValue;

    if( $this.val() == 0 ) {
      $this.parent("p").removeClass('input-filled');
    }

    if (!$this.hasClass('required')) return;
    check($this, defeito, 0);

    /*Validation error messages*/
    /*NOTE: Input mus have an id*/
    /*ARGS: $input and $container -> <ul> */
    validateErrorMessages( $this, $formResponse );

    /* Check if all form inputs are valid */
    if( checkFormInputsValid($contactFormInputs) ){
      $contactForm.addClass("checked").removeClass("unchecked");
    }
    else if( !checkFormInputsValid($contactFormInputs) ){
      $contactForm.addClass("unchecked").removeClass("checked");
    }

  });
  $contactFormInputs.focus(function() {
    var $this = $(this);
    var defeito = this.defaultValue;

    $this.parent("p").addClass('input-filled');
  });

  $contactForm.on("submit", function(event){
     if( !validateForm($contactForm) ) {
      event.preventDefault();
     }
  });

  /** =Pricing specific functions **/
  function pricing_getQAListheight() {
    var height = $($navAcordion.find("a.on").attr("data-go")).height();

    return height + 160;
  }


  function pricing_getQAheight() {
    if( $_window.width() < 1024 )
      duration_height = 0;
    else
      duration_height = $(".content-accordion > div:last-child").position().top - 160;
    return duration_height;
  }

  function pricing_scrollEvents() {

    $navAcordionList.each(function(){
    var nav_id = $(this).attr("id"),
        element_id = nav_id;
        element_id = element_id.replace('-nav',''),
        $elem = $("." + element_id);

        var scrollTop     = $_window.scrollTop(),
        elementOffset = $elem.offset().top,
        distance      = (elementOffset - scrollTop);

        if(distance < 160 && distance > 0){
          $navAcordionList.removeClass("on");
          $("#" + nav_id).addClass("on");
        }
    });

    if( verge.inViewport($(".block-testemonials"), 100) && !$(".slick-slider").hasClass("playing") ) {
      $(".slick-slider").addClass("playing").slick('slickPlay');
    }

    if( verge.inY($king, -500) ) {
      $king.addClass("go-anim");
    }
  }

  function pricing_resizeEvents() {
    if( $_window.width() <= 1024 && QA_scene.enabled() ){
      QA_scene.enabled(false);
    }
    else if( $_window.width() > 1024 && !QA_scene.enabled() ){
      QA_scene.enabled(true);
    }
  }
}

/** *******************************************************************************************
     =CAREERS
*********************************************************************************************/
function careersPage(do_careers) {
  if (!do_careers) {
    $_window.off("resize.careersPage");
    $_window.off("scroll.careersPage");
    return false;
  }
  else {
    $_window.on('resize.careersPage', $.debounce(10, careers_resizeEvents));
    $_window.on('scroll.careersPage', $.debounce(20, careers_scrollEvents));
  }

    var $navAcordion = $(".nav-accordion > div"),
        $navAcordionList = $(".nav-accordion ul li a"),
        $contentAcordion = $(".content-accordion"),
        $contentAcordionLists = $(".content-accordion > div"),
        $blockOurHeroes = $(".block-our-heroes"),
        $blockQuitter = $(".block-quitter"),
        $kingHair = $(".animate-sprite-hair"),
        $kingMouth = $(".animate-sprite-mouth"),
        $kingEyes = $(".animate-sprite-eyes"),
        $quivyLeftMoustache = $(".animate-sprite-left-moustache"),
        $quivyRightMoustache = $(".animate-sprite-right-moustache"),
        $quivyTail = $(".animate-sprite-tail"),
        duration_height = 0;

  /*ScrollMagic - Fix QA menu on top*/
  var QA_controller = new ScrollMagic.Controller();

  QA_scene = new ScrollMagic.Scene({triggerElement: ".amsterdam", triggerHook: "onLeave", duration: careers_getQAheight })
    .setPin(".nav-accordion > div")
    .addTo(QA_controller)
    .offset(-160);

  /*ScrollMagic - Atach new controllers for each QA list menu to activate/deactivate the menu item*/
  $navAcordionList.each(function(){
    var nav_id = $(this).attr("id"),
        element_id = nav_id;
        element_id = element_id.replace('-nav','');

    var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: $("." + element_id).height() }});
    new ScrollMagic.Scene({triggerElement: "." + element_id, triggerHook: "onLeave"})
      .setClassToggle("#" + nav_id, "on") // add class toggle
      .addTo(controller)
      .offset(-160);
  });

   /*If layout is small disable scrollmagic*/
  if($_window.width() <= 1024) {
    QA_scene.enabled(false);
  }
  if($_html.hasClass("mobile") ) {
    QA_scene.enabled(false);
    QA_scene.destroy(true);
  }


  /* INTERVAL - Clear after animation finished*/
  var cicle_owl = setInterval(function(){
    var $image_1 = $blockQuitter.find(".animate-sprite-1");
    var $image_2 = $blockQuitter.find(".animate-sprite-2");
    $.doTimeout(1500, function(){
      $blockQuitter.find(".owl-wrapper").removeClass("goAnim-2").addClass("goAnim-1");

      $image_1.animateSpriteIMG({
        widthFrame: 161,
        heightFrame: 142,
        totalFrames: 12,
        totalRow: 3,
        totalColumn: 5,
        speed: 30,
        loop: false,
        stopLastFrame: true
      });

      $.doTimeout(1500, function(){
        $blockQuitter.find(".owl-wrapper").removeClass("goAnim-1").addClass("goAnim-2");
        $image_2.animateSpriteIMG({
          widthFrame: 161,
          heightFrame: 142,
          totalFrames: 25,
          totalRow: 3,
          totalColumn: 10,
          speed: 30,
          loop: false,
          stopLastFrame: true
        });
      });
    });
  },4000);

  $blockOurHeroes.find(".careers-king").addClass("go-anim");
  $blockOurHeroes.find(".careers-quivy").addClass("go-anim");

  $kingHair.animateSpriteIMG({
    widthFrame: 115,
    heightFrame: 66,
    totalFrames: 40,
    totalRow: 3,
    totalColumn: 15,
    speed: 60,
    loop: true,
    stopLastFrame: true
  });

  var cicle_king = setInterval(function(){

    $kingMouth.animateSpriteIMG({
      widthFrame: 36,
      heightFrame: 19,
      totalFrames: 40,
      totalRow: 3,
      totalColumn: 15,
      speed: 30,
      loop: false,
      stopLastFrame: true
    });
    $kingEyes.animateSpriteIMG({
      widthFrame: 90,
      heightFrame: 36,
      totalFrames: 75,
      totalRow: 5,
      totalColumn: 15,
      speed: 60,
      loop: false,
      stopLastFrame: true
    });
  }, 8000);

  $quivyLeftMoustache.animateSpriteIMG({
    widthFrame: 50,
    heightFrame: 39,
    totalFrames: 74,
    totalRow: 5,
    totalColumn: 15,
    speed: 60,
    loop: true,
    stopLastFrame: true
  });
  $quivyRightMoustache.animateSpriteIMG({
    widthFrame: 50,
    heightFrame: 39,
    totalFrames: 74,
    totalRow: 5,
    totalColumn: 15,
    speed: 60,
    loop: true,
    stopLastFrame: true
  });
  $quivyTail.animateSpriteIMG({
    widthFrame: 115,
    heightFrame: 71,
    totalFrames: 66,
    totalRow: 5,
    totalColumn: 15,
    speed: 60,
    loop: true,
    stopLastFrame: true
  });



  /** =Careers specific functions **/
  function careers_getQAheight() {

    if( $_window.width() < 1024 )
      duration_height = 0;
    else
      duration_height = $(".content-accordion > div:last-child").position().top - 160;

    return duration_height;
  }

  function careers_scrollEvents() {

  }

  function careers_resizeEvents() {
    if( $_window.width() <= 1024 && QA_scene.enabled() ){
      QA_scene.enabled(false);
    }
    else if( $_window.width() > 1024 && !QA_scene.enabled() ){
      QA_scene.enabled(true);
    }
  }
}

/** *******************************************************************************************
     =FEATURES
*********************************************************************************************/
function featuresPage(do_features) {
  if (!do_features) {
    return false;
  }
  else {
  }

  //** =HEADER ANIMATION
  $(".header-main").addClass("js-start");

}
/** *******************************************************************************************
     =SIGN IN
*********************************************************************************************/
function signinPage(do_signin) {
  if (!do_signin) {

    return false;
  }
  else {
  }

  var $submitButton = $(".js-sign-in-submit"),
      $signinWrapper = $(".sign-in-wrapper"),
      $form = $(".sign-in-form"),
      $signInBox = $(".sign-in-box")
      $formInputs = $(".sign-in-form input:not([type='submit'])"),
      $signinPassword = $(".sign-in-password"),
      $formResponse = $(".form-response"),
      $iconLoading = $(".icon-loading");

  if(!$_html.hasClass("mobile"))
    $formInputs[0].focus();

  $formInputs.on("keyup", function(){
    $submitButton.removeClass("unchecked").addClass("checked");
  });

  $formInputs.blur(function() {
    var $this = $(this);
    var defeito = $this.defaultValue;
    if (!$this.hasClass('required') || $this.val() == '' )
      return;

    check($this, defeito, 0);

    if ($this.hasClass('erro')){
      $signInBox.addClass("shake");
      $form.addClass("unchecked");
    }
    else
      $form.removeClass("unchecked").addClass("checked");

    $.doTimeout(1000, function() {
      $signInBox.removeClass("shake");
    });

   /*Validation error messages*/
    if($this.hasClass("erro") && ( $this.hasClass("sign-in-email") || $this.hasClass("password") ) ){
      if( $this.hasClass("sign-in-email") ){
        $formResponse.find(".email-error-msg").addClass("on");
        $formResponse.find(".email-error-msg-2").removeClass("on");
      }
      if( $this.hasClass("password") ) $formResponse.find(".password-error-msg").addClass("on");

      if( !$formResponse.hasClass("js-on") )
        $formResponse.velocity("slideDown", {
          duration: 200,
          complete: function() {
            $formResponse.addClass("js-on");
          }
        });
    }
    if( !$this.hasClass("erro") && ( $this.hasClass("sign-in-email") || $this.hasClass("password") ) ){
      if( $this.hasClass("sign-in-email") ) $formResponse.find(".email-error-msg").removeClass("on");
      if( $this.hasClass("password") ) $formResponse.find(".password-error-msg").removeClass("on");

      $formResponse.velocity("slideUp", {
        duration: 200,
        complete: function() {
          $formResponse.removeClass("js-on");
        }
      });
    }

  });

  $formInputs.focus(function() {
    var $this = $(this);
    $this.removeClass('erro');
  });

  $form.on("submit", function(event){
    event.preventDefault();
    var $this = $form.find(".sign-in-email"),
          defeito = $this.defaultValue;

    if($form.hasClass("unchecked")){

      //If second step fetch the password input
      if($signinWrapper.hasClass("anim-step-2"))
        $this = $form.find(".sign-in-password");

      check($this, defeito, 0);

      if ($this.hasClass('erro')){
        $signInBox.addClass("shake");
        $form.addClass("unchecked");
      }
      else
        $form.removeClass("unchecked").addClass("checked");

      $.doTimeout(1000, function() {
        $signInBox.removeClass("shake");
      });

      /*Validation error messages*/
      if($this.hasClass("erro") && ( $this.hasClass("sign-in-email") || $this.hasClass("password") ) ){
        if( $this.hasClass("sign-in-email") ) $formResponse.find(".email-error-msg").addClass("on");
        if( $this.hasClass("password") ) $formResponse.find(".password-error-msg").addClass("on");

        if( !$formResponse.hasClass("js-on") )
          $formResponse.velocity("slideDown", {
            duration: 200,
            complete: function() {
              $formResponse.addClass("js-on");

            }
          });
      }
    }

    //First Step Check
    if( $signinWrapper.hasClass("anim-step-1") && $form.hasClass("checked")){
       $iconLoading.addClass("on");
      //AJAX request to validate email - simulate response with dotimeout
      $.doTimeout(500, function() {
        $iconLoading.removeClass("on");
        //Demo error mail
        if($form.find(".sign-in-email").val() != "buro@quiver.com"){
          $signInBox.addClass("shake");
          $form.find(".sign-in-email").addClass("erro");
          $form.addClass("unchecked").removeClass("checked");
          $.doTimeout(1000, function() {
            $signInBox.removeClass("shake");
          });

          $formResponse.find(".email-error-msg-2").addClass("on");
          $formResponse.find(".email-error-msg").removeClass("on");
          if( !$formResponse.hasClass("js-on") )
            $formResponse.velocity("slideDown", {
              duration: 200,
              complete: function() {
                $formResponse.addClass("js-on");
              }
            });
        }
        else {
          console.log("correct email");
          $form.find(".sign-in-email").removeClass("erro");
          $formResponse.find(".email-error-msg-2").removeClass("on");
          $formResponse.velocity("slideUp", {
            duration: 200,
            complete: function() {
              $formResponse.removeClass("js-on");
            }
          });

          if( !$this.hasClass("erro") && ( $this.hasClass("sign-in-email") ) ){
          $formResponse.find(".email-error-msg").removeClass("on");

          $formResponse.velocity("slideUp", {
            duration: 200,
            complete: function() {
              $formResponse.removeClass("js-on");
            }
          });
        }
          //Simulating server response time
           $.doTimeout(500, function() {
            $signinWrapper.addClass("anim-step-2").removeClass("anim-step-1");
            $signinPassword.focus();
            $submitButton.children("span").text("Enter");
            $form.addClass("unchecked").removeClass("checked");
          });
        }
      });
    }

    //Second Step Check
    if( $signinWrapper.hasClass("anim-step-2") && $form.hasClass("checked")){
      //AJAX request to validate password
      $iconLoading.addClass("on");
      $.doTimeout(500, function() {
        $iconLoading.removeClass("on");
        //Demo error password
        if($form.find(".sign-in-password").val() != "buro"){
          $formResponse.find(".password-error-msg").addClass("on");

          $signInBox.addClass("shake");
          $form.addClass("unchecked").removeClass("checked");

          $.doTimeout(1000, function() {
            $signInBox.removeClass("shake");
          });

          if( !$formResponse.hasClass("js-on") )
            $formResponse.velocity("slideDown", {
              duration: 200,
              complete: function() {
                $formResponse.addClass("js-on");
              }
            });
        }
        else {
          console.log("correct password");
          $formResponse.find(".password-error-msg").removeClass("on");
          $formResponse.velocity("slideUp", {
            duration: 200,
            complete: function() {
              $formResponse.removeClass("js-on");
            }
          });
        }
      });
    }
  });
}

/** *******************************************************************************************
     =SIGN UP
*********************************************************************************************/
function signupPage(do_signup) {
  if (!do_signup) {

    return false;
  }
  else {
  }

  var $form = $(".sign-up-form"),
      $signupWrapper = $(".sign-up-wrapper"),
      $signupKing = $(".sign-up-wrapper .sign-up-king"),
      $formInputs = $(".sign-up-form input:not([type='submit'])"),
      $password = $(".password"),
      $passwordConfirmation = $(".sign-up-password-confirmation"),
      $passwordStrength = $(".password-strength"),
      $formResponse = $(".form-response");


  if(!$_html.hasClass("mobile"))
    $formInputs[0].focus();

  $signupWrapper.addClass("goAnim");

  /*Validations*/
  $formInputs.on("keyup change", function(){
    $formInputs.each(function(){
      var $this = $(this);
      if($this.val() != 0){
        $this.parent("p").addClass("input-filled");
      }
    });
  });

  $formInputs.blur(function() {
    var $this = $(this);
    var defeito = this.defaultValue;

    //kingPassword("open");
    if( $this.val() == 0 ) {
      $this.parent("p").removeClass('input-filled');
    }
    if (!$this.hasClass('required')) return;

    check($this, defeito, 0);

    /*Special function to compare 2 passwords - Note: needs to be checked after check function */
    if($this.hasClass("password-confirm"))
      validatePasswords($form, $this);

    /* Check if all form inputs are valid */
    if( checkFormInputsValid($formInputs) ){
		
         $form.addClass("checked").removeClass("unchecked");
     
    }
    else if( !checkFormInputsValid($formInputs) ){
      $form.addClass("unchecked").removeClass("checked");
    }

    /*Validation error messages*/
    /*NOTE: Input mus have an id*/
    /*ARGS: $input and $container -> <ul> */
    validateErrorMessages( $this, $formResponse );
  });

  $formInputs.focus(function() {
    var $this = $(this);

    $this.removeClass('erro');
    $this.parent().removeClass('erro');
    $this.parent("p").addClass('input-filled');

    if($this.siblings(".password-strength").length > 0){
      $this.siblings(".password-strength").addClass("on");
    }
    if($this.hasClass("password") || $this.hasClass("password-confirm")){
      kingPassword("close");
    }
    else {
      kingPassword("open");
    }
  });

  $password.on("keyup change", function(event) {
    var $this = $(this),
        keyCode = event.keyCode || event.which;

    if($this.next(".password-strength").length < 0) return;
    if(keyCode == 9) return;

    strengthMeter($this, $passwordStrength);

  });

  /*NOTE: On ajax request add class sending to form, preventing several submit atempts*/
 

    /** =Sign Up specific functions **/

    function kingPassword(action) {
      if(action == 'open'){
        if($signupWrapper.hasClass("js-open-eyes") ) return;
        $signupWrapper.addClass("js-open-eyes");
        $signupKing.find(".head").removeClass("close").addClass("open");
        $signupKing.find(".eyes-container").removeClass("close").addClass("open");

        var $image = $signupKing.find(".animate-sprite-open");
        $image.animateSpriteIMG({
              widthFrame: 89,
              heightFrame: 80,
              totalFrames: 6,
              totalRow: 1,
              totalColumn: 6,
              speed: 30,
              loop: false,
              stopLastFrame: true
        });
        $.doTimeout(500, function(){
          $signupKing.find(".animate-sprite-open").removeClass('active').attr("style","");
          $signupKing.find(".animate-sprite-close").addClass("active").attr("style","");
        });
      }
      else if(action == 'close'){
        if( !$signupWrapper.hasClass("js-open-eyes") ) return;
        $signupWrapper.removeClass("js-open-eyes");
        $signupKing.find(".head").addClass("close").removeClass("open");
        $signupKing.find(".eyes-container").addClass("close").removeClass("open");

        var $image = $(".animate-sprite-close");

        $image.animateSpriteIMG({
              widthFrame: 89,
              heightFrame: 80,
              totalFrames: 6,
              totalRow: 1,
              totalColumn: 6,
              speed: 30,
              loop: false,
              stopLastFrame: true
        });

        $.doTimeout(500, function(){
          $signupKing.find(".animate-sprite-open").addClass('active').attr("style","");
          $signupKing.find(".animate-sprite-close").removeClass("active").attr("style","");
        });
      }
      else {
        return false;
      }
    }
}

/** *******************************************************************************************
     =SUBSCRIBE
*********************************************************************************************/

function subscribePage( do_subscribe ) {
    if (!do_subscribe) {
      $_window.off('scroll.subscribePage');
      $_window.off('resize.subscribePage');
      return false;
    }
    else{
      $_window.on('scroll.subscribePage', $.debounce(10, subscribe_scrollEvents));
      $_window.on('scroll.subscribePage', $.debounce(10, subscribe_resizeEvents));
    }

    var $subscribeForm = $(".subscribe-form"),
        $subscribeFormInputs = $(".subscribe-form input"),
        $summaryBoxContainer = $(".summary-box-container"),
        $summaryBoxTotal = $(".summary-box-total"),
        $summaryBoxPrices = $(".summary-box-prices"),
        $subscribeFormResponse = $(".subscribe-form .form-response"),
        $passwordStrength = $(".password-strength"),
        $password = $(".password"),
        $inputClass = $('input.input-field'),
        inputContainer = 'p.input',
        inputRadioContainer = ".inputType-radio",
        $cardCheck = $(".card-check"),
        $cardNumberInput = $("#fieldCardNumber"),
        $checkBtnContainer = $(".check-btn-container"),
        $checkBtn = $(".check-btn"),
        $currencyPrice = $(".currency-price li"),
        $odometerBox = $(".odometer-box"),
        $odometerMensal = $(".odometer-mensal"),
        $odometerAnual = $(".odometer-anual"),
        $odometerTotal = $(".odometer-total"),
        $odometerCurrency = $(".odometer-currency span"),
        $odometerSubscription = $(".odometer-subscription span"),
        $discount = $(".discount"),
        $odometerFinal = $(".odometer-final"),
        $priceMonthContainer = $(".price-month-container"),
        $priceYearContainer = $(".price-year-container"),
        $odometerValues = new Object();

    //Start Modal
    startModal();

    //Check if need sticky box
    setStickBox();

    //Get Values for odometer changes
    getOdometerVals();

    if(!$_html.hasClass("ios") && !$_html.hasClass("safari")){
      $summaryBoxContainer.addClass("js-odometer");
      var odometerMensal = $odometerMensal[0];
      var odometerAnual = $odometerAnual[0];
      var odometerTotal = $odometerTotal[0];
      var odometerFinal = $odometerFinal[0];

      odometerMensal = new Odometer({
        el: odometerMensal,
        value: $odometerValues.mensal,
        duration: 1000,
        format: '( ddd).dd'
      });
      odometerAnual = new Odometer({
        el: odometerAnual,
        value: $odometerValues.anual,
        duration: 1000,
        format: '( ddd).dd'
      });
      odometerTotal = new Odometer({
        el: odometerTotal,
        value: $odometerValues.total,
        duration: 1000,
        format: '( ddd).dd'
      });
      odometerFinal = new Odometer({
        el: odometerFinal,
        value: $odometerValues.final,
        duration: 1000,
        format: '( ddd).dd'
      });
    }

    $priceMonthContainer.addClass("on");
    $priceYearContainer.addClass("on");
    $summaryBoxTotal.removeClass("hide-value");

    $currencyPrice.on("click", function(){
      var $this = $(this),
          array = [];

      if($this.hasClass("on")) return;
      $currencyPrice.toggleClass("on");
      getOdometerVals();
      $odometerCurrency.toggleClass("on");

      if(!$_html.hasClass("ios") && !$_html.hasClass("safari")){
        odometerMensal.update($odometerValues.mensal);
        odometerAnual.update($odometerValues.anual);
        odometerFinal.update($odometerValues.final);
        odometerTotal.update($odometerValues.total);
      }
      else {
        $odometerBox.addClass("hide-value");
        $summaryBoxTotal.addClass("hide-value");
        var aux_mensal = $odometerValues.mensal;
        var aux_anual = $odometerValues.anual;
        var aux_final = $odometerValues.final;
        var aux_total = $odometerValues.total;

        aux_mensal = aux_mensal.split(".");
        aux_anual = aux_anual.split(".");
        aux_final = aux_final.split(".");
        aux_total = aux_total.split(".");

        $.doTimeout(300, function(){
          $odometerMensal.html(aux_mensal[0] + "<sub class='sub'>." + aux_mensal[1] );
          $odometerAnual.html(aux_anual[0] + "<sub class='sub'>." + aux_anual[1] );
          $odometerFinal.html(aux_final[0] + "<sub class='sub'>." + aux_final[1]);
          $odometerTotal.html(aux_total[0] + "<sub class='sub'>." + aux_total[1]);
         });
      }

      $.doTimeout(300, function(){
        $odometerBox.removeClass("hide-value");
        $summaryBoxTotal.removeClass("hide-value");
      });
    });

    // Inputs label animation
    $inputClass.focus(function(){
        $(this).parent(inputContainer).addClass('input-filled');
    });

    $inputClass.blur(function(){
        if( !this.value ) {
            $(this).parent(inputContainer).removeClass('input-filled');
        }
    });

    // Radio check price
    $checkBtnContainer.on("click", function(){
      var $this = $(this),
          $btn = $this.find(".check-btn");

      if($btn.hasClass("on")) return;
      $checkBtn.toggleClass("on");

       if($this.find("input").attr("checked"))
            $this.find("input").prop( "checked", false );
        else
            $this.find("input").prop( "checked", true );

      $odometerFinal.addClass("hide-value");

      $odometerSubscription.toggleClass("on");
      getOdometerVals();



      if(!$_html.hasClass("ios") && !$_html.hasClass("safari")){
        odometerMensal.update($odometerValues.mensal);
        odometerAnual.update($odometerValues.anual);
        odometerFinal.update($odometerValues.final);
        odometerTotal.update($odometerValues.total);
      }
      else {
        $odometerFinal.addClass("hide-value");
        $odometerTotal.addClass("hide-value");

        var aux_final = $odometerValues.final;
        var aux_total = $odometerValues.total;

        aux_final = aux_final.split(".");
        aux_total = aux_total.split(".");

         $.doTimeout(300, function(){
          $odometerFinal.html(aux_final[0] + "<sub class='sub'>." + aux_final[1]);
          $odometerTotal.html(aux_total[0] + "<sub class='sub'>." + aux_total[1]);
        });
      }

        if($this.hasClass("check-month"))
          $(".promotion").fadeOut();
        else
          $(".promotion").fadeIn();

      $.doTimeout(300, function(){
        $odometerFinal.removeClass("hide-value");
      });
    });

  var $submitButton = $(".js-sign-in-submit"),
      $signinWrapper = $(".sign-in-wrapper"),
      $form = $(".sign-in-form"),
      $signInBox = $(".sign-in-box")
      $formInputs = $(".sign-in-form input:not([type='submit'])"),
      $signinPassword = $(".sign-in-password"),
      $signinFormResponse = $(".subscribe-modal .form-response"),
      $iconLoading = $(".icon-loading");

  if(!$_html.hasClass("mobile"))
    $formInputs[0].focus();

  $formInputs.on("keyup", function(){
    $submitButton.removeClass("unchecked").addClass("checked");
  });

  $formInputs.blur(function() {
    var $this = $(this);
    var defeito = $this.defaultValue;
    if (!$this.hasClass('required') || $this.val() == '' )
      return;

    check($this, defeito, 0);

    if ($this.hasClass('erro')){
      $signInBox.addClass("shake");
      $form.addClass("unchecked");
    }
    else
      $form.removeClass("unchecked").addClass("checked");

    $.doTimeout(1000, function() {
      $signInBox.removeClass("shake");
    });

   /*Validation error messages*/
    if($this.hasClass("erro") && ( $this.hasClass("sign-in-email") || $this.hasClass("password") ) ){

      if( $this.hasClass("sign-in-email") ){
        console.log("erro email");
        $signinFormResponse.find(".email-error-msg").addClass("on");
        $signinFormResponse.find(".email-error-msg-2").removeClass("on");
      }
      if( $this.hasClass("password") ){
        console.log("erro password");
        $signinFormResponse.find(".password-error-msg").addClass("on");
      }

      if( !$signinFormResponse.hasClass("js-on") )
        $signinFormResponse.velocity("slideDown", {
          duration: 200,
          complete: function() {
            $signinFormResponse.addClass("js-on");
          }
        });
    }
    if( !$this.hasClass("erro") && ( $this.hasClass("sign-in-email") || $this.hasClass("password") ) ){
      if( $this.hasClass("sign-in-email") ) $signinFormResponse.find(".email-error-msg").removeClass("on");
      if( $this.hasClass("password") ) $signinFormResponse.find(".password-error-msg").removeClass("on");

      $signinFormResponse.velocity("slideUp", {
        duration: 200,
        complete: function() {
          $signinFormResponse.removeClass("js-on");
        }
      });
    }

  });

  $formInputs.focus(function() {
    var $this = $(this);
    $this.removeClass('erro');
  });

  $form.on("submit", function(event){
    event.preventDefault();
    var $this = $form.find(".sign-in-email"),
          defeito = $this.defaultValue;

    if($form.hasClass("unchecked")){

      //If second step fetch the password input
      if($signinWrapper.hasClass("anim-step-2"))
        $this = $form.find(".sign-in-password");

      check($this, defeito, 0);

      if ($this.hasClass('erro')){
        $signInBox.addClass("shake");
        $form.addClass("unchecked");
      }
      else
        $form.removeClass("unchecked").addClass("checked");

      $.doTimeout(1000, function() {
        $signInBox.removeClass("shake");
      });

      /*Validation error messages*/
      if($this.hasClass("erro") && ( $this.hasClass("sign-in-email") || $this.hasClass("password") ) ){
        if( $this.hasClass("sign-in-email") ) $signinFormResponse.find(".email-error-msg").addClass("on");
        if( $this.hasClass("password") ) $signinFormResponse.find(".password-error-msg").addClass("on");

        if( !$signinFormResponse.hasClass("js-on") )
          $signinFormResponse.velocity("slideDown", {
            duration: 200,
            complete: function() {
              $signinFormResponse.addClass("js-on");
            }
          });
      }
    }

    //First Step Check
    if( $signinWrapper.hasClass("anim-step-1") && $form.hasClass("checked")){
       $iconLoading.addClass("on");
      //AJAX request to validate email - simulate response with dotimeout
      $.doTimeout(500, function() {
        $iconLoading.removeClass("on");
        //Demo error mail
        if($form.find(".sign-in-email").val() != "buro@quiver.com"){
          $signInBox.addClass("shake");
          $form.find(".sign-in-email").addClass("erro");
          $form.addClass("unchecked").removeClass("checked");
          $.doTimeout(1000, function() {
            $signInBox.removeClass("shake");
          });

          $signinFormResponse.find(".email-error-msg-2").addClass("on");
          $signinFormResponse.find(".email-error-msg").removeClass("on");
          if( !$signinFormResponse.hasClass("js-on") )
            $signinFormResponse.velocity("slideDown", {
              duration: 200,
              complete: function() {
                $signinFormResponse.addClass("js-on");
              }
            });
        }
        else {
          console.log("correct email");
          $form.find(".sign-in-email").removeClass("erro");
          $signinFormResponse.find(".email-error-msg-2").removeClass("on");
          $signinFormResponse.velocity("slideUp", {
            duration: 200,
            complete: function() {
              $signinFormResponse.removeClass("js-on");
            }
          });

          if( !$this.hasClass("erro") && ( $this.hasClass("sign-in-email") ) ){
          $signinFormResponse.find(".email-error-msg").removeClass("on");

          $signinFormResponse.velocity("slideUp", {
            duration: 200,
            complete: function() {
              $signinFormResponse.removeClass("js-on");
            }
          });
        }

          //Simulating server response time
           $.doTimeout(500, function() {
            $signinWrapper.addClass("anim-step-2").removeClass("anim-step-1");
            $signinPassword.focus();
            $submitButton.children("span").text("Enter");
            $form.addClass("unchecked").removeClass("checked");
          });
        }
      });
    }

    //Second Step Check
    if( $signinWrapper.hasClass("anim-step-2") && $form.hasClass("checked")){
      //AJAX request to validate password
      $iconLoading.addClass("on");
      $.doTimeout(500, function() {
        $iconLoading.removeClass("on");
        //Demo error password
        if($form.find(".sign-in-password").val() != "buro"){
          $signinFormResponse.find(".password-error-msg").addClass("on");

          $signInBox.addClass("shake");
          $form.addClass("unchecked").removeClass("checked");

          $.doTimeout(1000, function() {
            $signInBox.removeClass("shake");
          });

          if( !$signinFormResponse.hasClass("js-on") )
            $signinFormResponse.velocity("slideDown", {
              duration: 200,
              complete: function() {
                $signinFormResponse.addClass("js-on");
              }
            });
        }
        else {
          console.log("correct password");
          $signinFormResponse.find(".password-error-msg").removeClass("on");
          $signinFormResponse.velocity("slideUp", {
            duration: 200,
            complete: function() {
              $signinFormResponse.removeClass("js-on");
            }
          });
        }
      });
    }
  });

  $subscribeFormInputs.on("keyup change", function(){
    $subscribeFormInputs.each(function(){
      var $this = $(this);
      if($this.val() != 0){
        $this.parent("p").addClass("input-filled");
      }
    });
  });

  $subscribeForm.find("input").blur(function() {
    var $this = $(this);
    var defeito = this.defaultValue;
    var $checkBoxInput = $(".check-box.required");
    if (!$this.hasClass('required')) return;
    check($this, defeito, 0);

    if($this.hasClass("credit-card")){
      $cardNumberInput.validateCreditCard(function(result) {
        if(result.card_type == null )
          $cardNumberInput.addClass("erro");
      });
    }
    if($(this).parent("p").find(".password-strength").length > 0){
      $(this).parent("p").find(".password-strength").addClass("on");
    }

     /*Special function to compare 2 passwords - Note: needs to be checked after check function */
    if($this.hasClass("password-confirm"))
      validatePasswords($subscribeForm, $this);

      if( checkFormInputsValid($subscribeForm.find("input")) && $checkBoxInput.attr("checked") ){
        $subscribeForm.removeClass("unchecked").addClass("checked");
        $subscribeFormResponse.velocity("slideUp", {
          duration: 200,
          complete: function() {
            $subscribeFormResponse.removeClass("js-on");
          }
        });
      }
      else if( !checkFormInputsValid($subscribeForm.find("input")) && !$checkBoxInput.attr("checked") ){
        $subscribeForm.addClass("unchecked").removeClass("checked");
      }

    /*Validation error messages*/
    /*NOTE: Input mus have an id*/
    /*ARGS: $input and $container -> <ul> */
    validateErrorMessages( $this, $subscribeFormResponse );
  });

  $subscribeForm.find("input").focus(function() {
    var $this = $(this);
    var defeito = this.defaultValue;

    if($this.parent("p").find(".password-strength").length > 0){
      $this.parent("p").find(".password-strength").addClass("on");
    }
  });

  $password.on("keyup change", function(event) {
    var $this = $(this),
        keyCode = event.keyCode || event.which;

    if($this.next(".password-strength").length < 0) return;
    if(keyCode == 9) return;

    strengthMeter($this, $passwordStrength);
  });

    // Card number check
    $cardNumberInput.formatter({
      'pattern': '{{9999}}-{{9999}}-{{9999}}-{{9999}}'
    });

    $cardNumberInput.validateCreditCard(function(result) {
      if(result.card_type != null ){
        $cardCheck.find("li").removeClass("on");
        $("." + result.card_type.name).addClass("on");
      }
      else {
        $cardCheck.find("li").removeClass("on");
      }
    });

    // Checklists at bottom
    $(".subscribe .subscribe-form .checklists-container svg, .subscribe .subscribe-form .checklists-container label").on("click", function(){
        var $checkBox = $(this).parent(inputRadioContainer).find("input");
        $checkBox.focus();
        $(this).parent(inputRadioContainer).toggleClass("selected");
        if($checkBox.attr("checked"))
            $checkBox.prop( "checked", false );
        else
            $checkBox.prop( "checked", true );
        $checkBox.blur();
    });

  function getOdometerVals() {

    $currencyPrice.each(function(){
      var $this = $(this);

      if( $this.hasClass("price-euro") && $this.hasClass("on") ) {
        $odometerValues.anual = $odometerAnual.attr("data-anual-euro");
        $odometerValues.mensal = $odometerMensal.attr("data-mensal-euro");


        $checkBtnContainer.each(function(){
          var $this = $(this),
            $btn = $this.find(".check-btn");

          if($this.hasClass("check-year") && $btn.hasClass("on") ) {
            $odometerValues.total = $odometerTotal.attr("data-anual-euro");
            $odometerValues.final = $odometerAnual.attr("data-anual-euro");
          }
          else {
            $odometerValues.total = $odometerTotal.attr("data-mensal-euro");
            $odometerValues.final = $odometerMensal.attr("data-mensal-euro");
          }
        });

      }
      else {
        $odometerValues.anual = $odometerAnual.attr("data-anual-dollar");
        $odometerValues.mensal = $odometerMensal.attr("data-mensal-dollar");

        $checkBtnContainer.each(function(){
          var $this = $(this),
            $btn = $this.find(".check-btn");

          if($this.hasClass("check-year") && $btn.hasClass("on") ) {
            $odometerValues.total = $odometerTotal.attr("data-anual-dollar");
            $odometerValues.final = $odometerAnual.attr("data-anual-dollar");
          }
          else {
            $odometerValues.total = $odometerTotal.attr("data-mensal-dollar");
            $odometerValues.final = $odometerMensal.attr("data-mensal-dollar");
          }
        });
      }
    });

    if(!$_html.hasClass("ios") && !$_html.hasClass("safari")){
      // if( $odometerValues.mensal < 10 ){
      //   $odometerValues.mensal = 1 + $odometerValues.mensal;
      //   $odometerMensal.addClass("hide-first-digit");
      // }
      // else{
      //   $odometerMensal.removeClass("hide-first-digit");
      // }

      // if( $odometerValues.anual < 10 ){
      //   $odometerValues.anual = 1 + $odometerValues.anual;
      //   $odometerAnual.addClass("hide-first-digit");
      // }
      // else{
      //   $odometerAnual.removeClass("hide-first-digit");
      // }

      // if( $odometerValues.total < 10 ){
      //   $odometerValues.total = 1 + $odometerValues.total;
      //   $odometerTotal.addClass("hide-first-digit");
      // }
      // else{
      //   $odometerTotal.removeClass("hide-first-digit");
      // }
      // $odometerValues.final = 1 + $odometerValues.final;
      // $odometerFinal.addClass("hide-first-digit");

      $odometerValues.mensal = 1 + $odometerValues.mensal;
      $odometerMensal.addClass("hide-first-digit");

      $odometerValues.anual = 1 + $odometerValues.anual;
      $odometerAnual.addClass("hide-first-digit");

      $odometerValues.final = 1 + $odometerValues.final;
      $odometerFinal.addClass("hide-first-digit");

      $odometerValues.total = 1 + $odometerValues.total;
      $odometerTotal.addClass("hide-first-digit");
    }


  }

  /** =Subscribe specific functions **/
  function setStickBox() {
    var scrollTop = verge.scrollY(),
        elementOffset = $summaryBoxTotal.offset().top,
        distance = (elementOffset - scrollTop);

    if ( distance <= 20 ) {
      $summaryBoxContainer.addClass("stick-box");
    }

    if(verge.inY($summaryBoxPrices) )
        $summaryBoxContainer.removeClass("stick-box");
  }

  function subscribe_scrollEvents() {
    if($_window.width() < 900 ) return;

    setStickBox();
  }

  function subscribe_resizeEvents() {
    if($_window.width() < 900 )
      $summaryBoxContainer.removeClass("stick-box");
  }
}
/** *******************************************************************************************
     =404
*********************************************************************************************/

function errorPage(do_404) {
  if (!do_404) {
    return false;
  }
  var $wheels1 = $(".anim-sprite-wrapper-wheels1 img"),
      $wheels2 = $(".anim-sprite-wrapper-wheels2 img"),
      $cat = $(".anim-sprite-wrapper-cat img"),
      $team1 = $(".anim-sprite-wrapper-team1 img"),
      $team2 = $(".anim-sprite-wrapper-team2 img"),
      $team3 = $(".anim-sprite-wrapper-team3 img"),
      $team4 = $(".anim-sprite-wrapper-team4 img");

  $wheels1.animateSpriteIMG({
    widthFrame: 110,
    heightFrame: 214,
    totalFrames: 90,
    totalRow: 6,
    totalColumn: 15,
    speed: 30,
    loop: true,
    stopLastFrame: true
  });
  $wheels2.animateSpriteIMG({
    widthFrame: 80,
    heightFrame: 58,
    totalFrames: 90,
    totalRow: 6,
    totalColumn: 15,
    speed: 30,
    loop: true,
    stopLastFrame: true
  });
  $cat.animateSpriteIMG({
    widthFrame: 111,
    heightFrame: 175,
    totalFrames: 72,
    totalRow: 5,
    totalColumn: 15,
    speed: 30,
    loop: true,
    stopLastFrame: true
  });
  $team1.animateSpriteIMG({
    widthFrame: 125,
    heightFrame: 232,
    totalFrames: 85,
    totalRow: 6,
    totalColumn: 15,
    speed: 30,
    loop: true,
    stopLastFrame: true
  });
  $team2.animateSpriteIMG({
    widthFrame: 199,
    heightFrame: 167,
    totalFrames: 72,
    totalRow: 5,
    totalColumn: 15,
    speed: 30,
    loop: true,
    stopLastFrame: true
  });
  $team3.animateSpriteIMG({
    widthFrame: 112,
    heightFrame: 230,
    totalFrames: 105,
    totalRow: 7,
    totalColumn: 15,
    speed: 30,
    loop: true,
    stopLastFrame: true
  });
  $team4.animateSpriteIMG({
    widthFrame: 103,
    heightFrame: 204,
    totalFrames: 100,
    totalRow: 7,
    totalColumn: 15,
    speed: 30,
    loop: true,
    stopLastFrame: true
  });
}


function validateErrorMessages($this, $formResponse) {

  if( $this.hasClass("erro") && $this.attr("data-error-message") && $formResponse.find("." + $this.attr("id")).length <= 0 ){

  $formResponse.append("<li class='on " + $this.attr("id") + "'>" + $this.attr("data-error-message") + "</li>");
  if( !$formResponse.hasClass("js-on") )
    $formResponse.velocity("slideDown", {
      duration: 200,
      complete: function() {
        $formResponse.addClass("js-on");
      }
    });
  }
  else if(!$this.hasClass("erro")){
  $formResponse.find("." + $this.attr("id")).remove();
  }

  if( !$formResponse.find("li").hasClass("on") )
  $formResponse.velocity("slideUp", {
    duration: 200,
      complete: function() {
        $formResponse.removeClass("js-on");
    }
  });
}
function checkFormInputsValid($formInputs) {
  var checkForm = 0;

  $formInputs.each(function(){
    $this = $(this);

    if($this.hasClass("erro") ) {
      $this.removeClass("valid");
      checkForm += 1;
    }
    else{
      $this.addClass("valid");
    }
  });

  if(checkForm == 0)
    return true;
  else
    return false;

}

function strengthMeter($this, $passwordStrength){
    $passwordStrength.removeClass("strenght-lvl5 strenght-lvl4 strenght-lvl3 strenght-lvl2 strenght-lvl1");
    if( checkStrength($this.val()) == 5){
      $passwordStrength.addClass("strenght-lvl5");
    }
    else if( checkStrength($this.val()) == 4){
      $passwordStrength.addClass("strenght-lvl4");
    }
    else if( checkStrength($this.val()) == 3){
      $passwordStrength.addClass("strenght-lvl3");
    }
    else if( checkStrength($this.val()) == 2){
      $passwordStrength.addClass("strenght-lvl2");
    }
    else if( checkStrength($this.val()) == 1){
      $passwordStrength.addClass("strenght-lvl1");
    }
  }



/*******************************************************************************************
 **                                                                                       **
    =MAIN =NAVIGATION
 **                                                                                       **
*********************************************************************************************/
function mainNavigation() {
    var close = null;
    //MOBILE
    $_btn_nav_main.on("click touchstart", function(event) {
        event.stopImmediatePropagation();
        ($_body.hasClass("open-nav")) ? close = true : close = false;

        if(!close) {
           _yPositionMobileForNav=_globalWindowScrollY;
            $_body.css("top", -_globalWindowScrollY);
        }
        else {
          window.scroll(0,_yPositionMobileForNav);
        }

        $("html,body").toggleClass("open-nav");
        event.stopPropagation();
        event.preventDefault();
        return false;
    })

    // =LOGO =ID
    $_logo
          .mouseover(function(e) {
              $(this).doTimeout('logoOver', 200, function(){
                  $(this).addClass("hover");
              });
          })
          .mouseout(function() {
              $(this).doTimeout('logoOver', 0, function(){
                  $(this).removeClass("hover");
              });
    })//end logo over

  /*-------------------------------------------------------------------------------------------
  =onSCROLL for fix body position with nav open
  --------------------------------------------------------------------------------------------*/
  $_window.on('scroll', $.debounce(10, function(){
      _globalWindowScrollY=verge.scrollY(); //global scroll position
  }));

} // end function


/*-------------------------------------------------------------------------------------------
    =ON and OFF LINKS on MAIN NAV
--------------------------------------------------------------------------------------------*/
function mainNavigation_activeLinks(whereIam) { //call by on clik load sections
    var $mainLinks = $(".nav-main-list a");
    //section name for main nav (just needed when using ajax)
    $_nav_main.attr("class","")
    $_nav_main.addClass(whereIam);
    //links
    $mainLinks.removeClass("on");
    $mainLinks.each(function() {
        var $this = $(this);
        var urlMenu = $this.attr("data-url");
        if (whereIam == urlMenu) {
            $this.addClass("on");
            return;
        }
    });
} //end function


/*******************************************************************************************
 ****                                                                                   ****
    =DOCUMENT =READY =START Document ready
 ****                                                                                   ****
*********************************************************************************************/
$(document).ready(function() {
    //** =Global objects
    $_window = $(window),
    $_body = $("body"),
    $_html = $("html"),
    $_mainPage = $(".page-main"),
    $_nav_main = $("#nav-main"),
    $_btn_nav_main = $(".btn-nav-main-mobile"),
    $_currentPage = $(".page-main.page-current"),
    $_toPreload = $(".preload"),
    $_loadingPage = $("#loading-page"),
    $_animateGoAnim = $(".js-goAnim"),
    $_logo = $(".id-quiver");

    //** =Global variables
    calculateGlobalValues();
    _global_allowNavigate = false; //When loading do not allow clicks by user ( onStartPage revers to true)
  

     _globalWindowScrollY=verge.scrollY();
    _yPositionMobileForNav=0; // i need fixe body for mobile

    //** =START PAGES
    onStartPageWhenRefresh(true);
    mainNavigation();


    //Start Plugins
    FastClick.attach(document.body); //no 300ms tap delay!

  /** -----------------------------------------------------------------------------------------
  =LOAD SECTIONS - triger events =CLICK to LOAD PAGE
  body class="js-no-ajax ismobile" > inserida via php == no nosso caso a mobile
  --------------------------------------------------------------------------------------------*/
    var domainSite = window.location.host;
    var mainTitle = " | Quiver",
        homeTitle = $("h1 a").attr("data-title-home");
    _forPopstate = true;
    $_linkInternal = $('a[href*="'+domainSite+'"]');

    $(document).on('click', ' a[href*="' + domainSite + '"] ', function() {
        var $this = $(this);
        return true;
        // **ALLOW user load other pages only after page is loaded ( onStartPage )
        if (!_global_allowNavigate) return false;
        _global_allowNavigate = false;

        // exit and have normal click
        if ( $_body.hasClass('mobile') )  return true;
        if ($this.hasClass("modal") || $this.hasClass("js-no-transPage") ) return;

        //
        var thisHref = $this.attr('href'),
            thisTitle = $this.attr("data-title"),
            pageTransition = $this.attr("data-pageTrans"), // if not default is with fade or flip

            newContent = thisHref,
            forHistory = newContent,
            forTitle = thisTitle + mainTitle;

        //home page
        if (!thisTitle) {
            forTitle = homeTitle;
        }


        //for history
        if (_forPopstate) {
            history.pushState({}, forTitle, forHistory);
        }
        _forPopstate = true;

        // for title
        $('head title').html(forTitle);

        //ga('send', 'pageview', window.location.pathname); //analytics

        //TYPE OF TRANSITION

        return false;
    }); //end click

    /// HISTORY
    //  note: Chrome and Safari will fire a popstate event when the page loads but Firefox doesnt. When your page loads, it might have a non-null state object and the page will receive an onload event, but no popstate event. (window.history.state; on refresh page)
    if (window.addEventListener) {
        window.addEventListener('popstate', function(e) {
            if ($_html.hasClass('mobile')) return false;
            if (!e.state) {
                _forPopstate = true; return false;
            } // firefox vs webkit and safari trigers on
            _forPopstate = false;
            window.location = window.location; // reload page for this new adress!
            return false;
        });
    } //endif: does not excute for <= IE8


    /* -------------------------------------------------------------------------------------------
    =EVENTS DEFAULT BURO
    -------------------------------------------------------------------------------------------- */
    //OPEN NEW WINDOW
    $(document).on("click", "a[rel=external]", function(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        event.stopPropagation();
        var linkExterno = window.open($(this).attr("href"));
        return linkExterno.closed;
    })
    //PRINT
    $("a[rel=print]").click(function() {
        var imprimir = window.print();
        return false;
    })
    //E-MAIL: has classclass="email", e [-at-]
    $("a.email").each(function() {
        var mailReal = $(this).text().replace("[-at-]", "@");
        $(this).text(mailReal);
        $(this).attr("href", "mailto:" + mailReal);
    })
    //CLEAR FORMS
    $('input[type=text], input[type=email], input.text, input.email, textarea').each(function() {
        if (!$(this).hasClass("txtClear")) return;
        var defeito = this.defaultValue;
        $(this).focus(function() {
            if ($(this).val() == defeito) {
                $(this).val("")
            }
        });
        $(this).blur(function() {
            if ($(this).val() == "") {
                $(this).val(defeito)
            }
        });
    })
    //OPEN POPUP
    $(document).on("click", '.newWindow', function() {
        event.stopImmediatePropagation();
        event.preventDefault();
        event.stopPropagation();
        var newwindow = window.open($(this).attr('href'), '', 'height=480,width=560');
        if (window.focus) {
            newwindow.focus();
        }
        return false;
    })

    /*-------------------------------------------------------------------------------------------
    =KEYS and CLICK
    --------------------------------------------------------------------------------------------*/
    $(document).on("keydown", function(event) {
        switch (event.which) {
            case 40: //down
                //return false;
                break;
            case 38: //up
                // return false;
                break;
            case 39: //next
                // return false;
                break;
            case 37: //prev
                // return false;
                break;
            case 27: //close (esc)
              if($_window.width() < 900 )
                $_btn_nav_main.click();

              if($_body.hasClass("modal-open")){
                //Raise Event to close modal
                $(document).trigger('escClicked');

              }//break
            default:
                break;
        } //end switch
    }); //end keypress

    //
    $(".btn-switch").on("click", function(){
        var $this = $(this);
        $this.toggleClass("on");
        $this.parents("section").toggleClass("switch-on");
    })//end click
    /*-------------------------------------------------------------------------------------------
    =RESIZE on
    --------------------------------------------------------------------------------------------*/
    $_window.on('resize', $.debounce(500, function() {
        //** =recalculate global variables
        calculateGlobalValues();
        pageGotoforMobile();

        if ( $_html.hasClass("no-object-fit") )  {
            var $element = $(".page-current .element-cover");
            resizeLikeCover($element);
        }

        if ( $_body.hasClass("home") ) homePage(true);

    })) //end resize window

    /*-------------------------------------------------------------------------------------------
    =BG GRADIENTE MOVE
    --------------------------------------------------------------------------------------------*/
    moveGradient();

    function moveGradient() {
      var $moveGradArea = $(".bg-move"),
          $moveGrad = $(".bg-move-follow"),
          moveGradAreaW = $moveGradArea.width();
          moveGradAreaH = $moveGradArea.height();

      $moveGradArea.addClass("js-go");
      if ( $moveGradArea.hasClass("short") ) moveGradAreaH = 2*moveGradAreaH ;
      rAF_followBG($moveGrad, moveGradAreaW,moveGradAreaH);

      $moveGradArea
          .mouseenter(function() {
              followBG(true);
          })
          .mouseleave(function() {
              followBG(false);
         });
      } //end events

    function followBG(value) {
        if (!value) return false;
        var $moveGradArea = $(".bg-move"),
            $moveGrad = $(".bg-move-follow");

        //hack for wird html!
        if ( _globalViewportW > 1700 && $moveGradArea.hasClass("limit-w") ) {
          $moveGrad.velocity("fadeOut", { duration: 300 });
          return;
        }else {
          $moveGrad.velocity("fadeIn", { duration: 300 });
        }

        $moveGradArea.on('mousemove.movGrad', function(e){
            var offset = $(this).offset();
            var relativeX = (e.pageX - offset.left);
            var relativeY = (e.pageY - offset.top);
            window.requestAnimationFrame(function(){
                rAF_followBG($moveGrad, relativeX,relativeY);
            });
        } );
    }//end function

    function rAF_followBG($moveGrad, rX,rY){
        $moveGrad.velocity({
            translateX: rX,
            translateY: rY
        }, {
            duration: 1000,
            queue: false,
            delay: 100,
            easing: [.18,.81,.12,1]
        });
    }

    /////////////////////////
}); //END LOAD DOCUMENT



/*******************************************************************************************
 **                                                                                       **
    =GENERAL FUNCTIONS AND PLUGINGS CONTROL
 **                                                                                       **
*********************************************************************************************/
/** =Global page values */
function calculateGlobalValues() {
    _globalViewportW = verge.viewportW();
    _globalViewportH = verge.viewportH();
    _globalHalfViewportH = (_globalViewportH / 2).toFixed(0);
}

/** =Random integer between min (included) and max (excluded) */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/*-----------------------------------------------------------------------
 =ADJUST plugin js-btn-goto for MOBILE
-----------------------------------------------------------------------*/
function pageGotoforMobile() {
    if ( (Modernizr.mq('(max-width: 900px)')) ) {
        $(".js-btn-goto").attr("data-go-offset", "-80");
    }
}

/*-----------------------------------------------------------------------
 =SCROLLING EVENTS
-----------------------------------------------------------------------*/
function whenScrolling(kill) {
    if( !kill) {
        $_window.off('scroll.navMain', $.debounce(10, rAF_NavMain) );
        return;
    }else{
        $_window.on('scroll.navMain', $.debounce(10, rAF_NavMain) );
    };//end if
}//end when scrolling

//** =Header Main Show hide elements
function rAF_NavMain() {
    if ( $_body.hasClass("modal-open") ) return;
    window.requestAnimationFrame(f_rAF_NavMain);
}

function f_rAF_NavMain() {
    var scrollVal = verge.scrollY();
    //Hide header elements - event
    //Add mobile-fixed class for mobile menu interface
    ( scrollVal > 100  ) ? $_body.addClass("nav-hide") : $_body.removeClass("nav-hide ");
    ( scrollVal > 10  ) ? $_body.addClass("mobile-fixed") : $_body.removeClass("mobile-fixed");

}

/*-------------------------------------------------------------------------------------------
=ANIMATION BLOCK width css "goAnim"
--------------------------------------------------------------------------------------------*/
function goAnimCSS(){
   // if( $_body.hasClass('ismobile')) return;
    $_window.on("scroll.goanim", $.debounce(5, rAF_goAnimCSS_inViewport) );
}//end goAnimCSS

function rAF_goAnimCSS_inViewport() {
    window.requestAnimationFrame(goAnimCSS_inViewport);
}

function goAnimCSS_inViewport() {
    var scrollVal = verge.scrollY();

    $_animateGoAnim.each( function(i) {
      var $this=$(this);
      if( verge.inY($this, -_globalHalfViewportH ) ) {
        if ( $this.hasClass("goAnim") ) return;
        $this.addClass("goAnim");
        //
        if ($this.hasClass("js-track-hand") ) home_hand();
        if ($this.hasClass("js-tour-timebox") ) home_timebox();
        if ($this.hasClass("js-tour-geolocation") ) home_geolocation();
      }
    })//end each

}

/*-----------------------------------------------------------------------
 =FOOTER NEWSLETTER

-----------------------------------------------------------------------*/
function newsletterForm() {
  var $formNews = $(".form-newsl"),
      $formNewsInput = $(".form-newsl input");


  $formNewsInput.on("keyup change", function(){
    var $this = $(this);
    if($this.val() != 0){
      $this.parent("fieldset").addClass("input-filled");
    }
  });

  $formNewsInput.blur(function() {
    var $this = $(this);
    var defeito = this.defaultValue;

    if($this.val() == 0){
      $this.removeClass("input-filled");
      $this.parent("fieldset").removeClass("input-filled");
    }

    if (!$this.hasClass('required')) return;
    check($this, defeito, 0);
  });

  $formNewsInput.focus(function() {
    var $this = $(this);
    $this.removeClass('erro');
    $this.addClass("input-filled");
    $this.parent("fieldset").addClass("input-filled");
  });

  $formNews.on("submit", function(event){
    if (validateForm($formNews) ) {
      //Submit Form everything seems ok...
      console.log("Submit Form everything seems ok...");
    }
    else
      event.preventDefault();
  });
}
/*-----------------------------------------------------------------------
 =FORMS VALIDADTE
 NOTE: changed to giv error on element and not parent
-----------------------------------------------------------------------*/
function validateForm($form) {

    $form.find(".formMsg").hide();
    var error = 0;
    $form.find(".required").each(function() {
        var $this = $(this);
        var defeito = this.defaultValue;
        error = check($this, defeito, error);
    }) //end each

    if($form.find(".password-confirm").length > 0) {
      $form.find(".password-confirm").each(function(){
        var $psw = $(this);
        error += validatePasswords($form, $psw);
      });

    }

    if (error > 0) {
        return false;
    } else {
        return true;
    }
} //end validate form

function resetForm($form) {
  var $formInputs = $form.find("input"),
      $formTextarea = $form.find("textarea"),
      $formResponse = $form.find(".form-response");

  $formResponse.find("li").remove();

  $formTextarea.each(function(){
    var $this = $(this);
    $this.removeClass("erro");
    $this.parent("p").removeClass("input-filled");
    $this.attr("value", "");
  });

  $formInputs.each(function(){
    var $this = $(this);
    $this.removeClass("erro");
    $this.parent("p").removeClass("input-filled");
    $this.attr("value","");
  });

  $formResponse.velocity("slideUp", {
    duration: 200,
    complete: function() {
      $formResponse.removeClass("js-on");
    }
  });
}
//function check inputs
function check($this, defeito, error) {
  var error = 0;
    //Is checkbox
    if ($this.hasClass("check-box")) {
        if (!validateCheckBox($this)) {
          error += 1;
        }
    } //end has min length

    //has min length
    if ($this.hasClass("min-length")) { // has min length
        if (!validateLength($this)) {
          error += 1;
        }
    } //end has min length

    //has exact length
    if ($this.hasClass("exact-length")) { // has min length
        if (!validateExactLength($this)) {
          error += 1;
        }
    } //end has min length

    //has exact length
    if ($this.hasClass("month-credit-card")) { // has min length

        if (!validateCreditCardMonth($this)) {
          error += 1;
        }
    } //end has min length

    //has exact length
    if ($this.hasClass("year-credit-card")) { // has min length
        if (!validateCreditCardYear($this)) {
          error += 1;
        }
    } //end has min length

    //is an email
    if ($this.hasClass("email")) { // is this an email
        if (!validateEmail($this)) {
          error += 1;
        }
    } //end if mail

    //is an phone
    if ($this.hasClass("phone")) { // is is an email
        if (!validatePhone($this)) {
          error += 1;
        }
    } //end if mail

    //is an birthdate
    if ($this.hasClass("birthdate")) { // is is a birthdate
        if (!validateBirthdate($this)) {
          error += 1;
        }
    } //end if birthdate

    //is an number
    if ($this.hasClass("number")) { // is is a birthdate
        if (!validateNumbers($this)) {
          error += 1;
        }
    } //end if number

    // //is an radio
    // if ($this.hasClass("select")) { // is is a select

    //     if (!validateSelect($this)) {
    //         error += 1;
    //         $this.parent().addClass("erro");
    //      return error;
    //     } else {
    //         $this.parent().removeClass("erro");
    //        return error;
    //     }
    // } //end if radio

    //is an captcha
    if ($this.hasClass("capa")) { // is is an email
        if ($this.val() == "" || $this.val() == defeito) {
            $this.parent().children("span").addClass("off");
            error += 1;
            $this.parent().addClass("erro");
            // return error;
        } else {
            $this.parent().children("span").removeClass("on");
            $this.parent().removeClass("erro");
            // return error;
        }
    } //end if mail

    //not empty field
    if ($this.val() == "" || $this.val() == defeito) {
      error += 1;
    }

    if(error > 0)
      $this.addClass("erro");
    else
      $this.removeClass("erro");
    return error;
} //end function

//equal passwords validation
function validatePasswords($form, $input) {
  var value = '',
      error = 0;

  //check if is input focus
  if($input.length > 0)
    $input.addClass("first-focus");

  //search for password confirm
  $form.find(".password-confirm").each(function() {
    var $this = $(this);

    if( $this.val() == '' && !$this.hasClass("required") ) error = 0;
    if( $this.val() == '' && $this.hasClass("required") ) error +=1;
    if( $this.hasClass("min-length") && !validateLength($this) ){
      error += 1;
    }

    if(value == '')
      value = $this.val();
    else
      if( value == $this.val() )
        if( error > 0)
          error -= 1;
        else
          error = 0;
      else
        error += 1;

    if($this.hasClass("first-focus")){
      if(error > 0)
        $this.addClass("erro");
      else
        $this.removeClass("erro");
    }
  });


  return error;
}

// minimum length
function validateCheckBox($this) {

    if($this.is(":checked"))
      return true;
    else
      return false;
}

// minimum length
function validateLength($this) {
    var a = $this.val(),
        length = $this.attr("data-length");

    if(a.length >= length)
      return true;
    else
      return false;
}

// minimum length
function validateExactLength($this) {
    var a = $this.val(),
        length = $this.attr("data-length");

    if(a.length == length)
      return true;
    else
      return false;
}

// month
function validateCreditCardMonth($this) {
    var a = $this.val();

    if(a <= 12)
      return true;
    else
      return false;
}

// year
function validateCreditCardYear($this) {
    var a = $this.val(),
        d = new Date();
        n = d.getFullYear();
        n = n.toString().substr(2);

    if(a >= n && n <= 99)
      return true;
    else
      return false;
}

//email validation
function validateEmail($this) {
    var a = $this.val();

    var filter = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/i);
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}
//Phone validation
function validatePhone($this) {
    var a = $this.val();
    var filter = /^[+]?[0-9 ]{6,}$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}
//Birthdate validation
function validateBirthdate($this) {
    var a = $this.val();
    var filter = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}
//Numbers validation
function validateNumbers($this) {
    var a = $this.val();
    var filter = /^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$/i;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}
//Radio validation
function validateSelect($this) {
    $this.each(function() {
        var a = $this.attr('checked');
        if (a == 'checked') {
            return true;
        } else {
            return false;
        }
    });
}

////ONLY TYPE NUMBERS and , .
function onlyNumber(event) {
    if (event.shiftKey) {
        event.preventDefault();
    }
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 188) {
    } else {
        if (event.keyCode < 95) {
            if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
            }
        } else {
            if (event.keyCode < 96 || event.keyCode > 105) {
                event.preventDefault();
            }
        }
    }
} //end function

//=check Password Strength
function checkStrength(password)
  {
    //initial strength
    var strength = 0;

    //length is ok, lets continue.

    //if length is 8 characters or more, increase strength value
    if (password.length >= 6) strength += 1

    //if password contains both lower and uppercase characters, increase strength value
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1

    //if it has numbers and characters, increase strength value
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1

    //if it has one special character, increase strength value
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1

    //if it has two special characters, increase strength value
    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1

    //now we have calculated strength value, we can return strength
    return strength;
  }


/* =Hover in/out animation*/
function hoverInOut() {
  $elems = $(".underline-anim");

  $elems.each(function(){
    var $this = $(this);

    $this.hover(function(){

    }, function(){
      if($this.hasClass("hover-out")) return;
      $this.addClass("hover-out");

      $.doTimeout(500, function(){
        $this.removeClass("hover-out ");
      });
    });

  });
}

/*******************************************************************************************
 **                                                                                       **
    =SLIDESHOWS PLUGIN SLICK
    only if i have more then 4 elements
 **                                                                                       **
*********************************************************************************************/
function slideshow_slick() {
  var $slideObg = $(".slideshow-slick");

  if ( !$slideObg .length)  return false;

  $slideObg.each(function() {
    var $this = $(this);

    if($this.hasClass("list-testemonials")){


      // On before slide change
      $this.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var $next = slick.$slides[nextSlide],
            $prev = slick.$slides[currentSlide],
            $image_current = $(this).find("[data-slick-index='" + currentSlide + "']").find("span"),
            $image = $(this).find("[data-slick-index='" + nextSlide + "']").find("span");


        if(currentSlide != nextSlide)
          $image_current.removeClass("on");

        if(nextSlide == 0 && currentSlide == slick.slideCount -1 ){
          //Looping right
          $this.addClass("right-anim").removeClass("left-anim");
          $image.addClass("on");
        }
        else if(nextSlide == slick.slideCount -1 && currentSlide == 0){
          //Looping left
          $this.addClass("left-anim").removeClass("right-anim");
          $image.addClass("on");
        }
        else{
          //Navigating
          if(currentSlide < nextSlide){
            $this.addClass("right-anim").removeClass("left-anim");
            $image.addClass("on");
          }
          if(currentSlide > nextSlide){
            $this.addClass("left-anim").removeClass("right-anim");
            $image.addClass("on");
          }
        }
        $.doTimeout(600, function(){
          $this.removeClass("left-anim right-anim");
        });

      });

      // $this.on('afterChange', function(event, slick, currentSlide){
      //   var $image = $this.find("[data-slick-index='" + currentSlide + "']").find("span");
      //   $image.addClass("on");
      // });

      $this.on('init', function(event, slick){
        var $image = $this.find(".slick-current").find("span");
        $image.addClass("on");
      });


    }

    $this.slick({
      centerMode: true,
      centerPadding: '260px',
      draggable : false,
      infinite: false,
      speed: 600,
      autoplay: false,
      autoplaySpeed: 4000,
      useCSS: true,
      cssEase: "cubic-bezier(0.76, 0, 0.18, 1)",
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            centerPadding: '200px',
          }
        },
        {
          breakpoint: 1120,
          settings: {
            centerPadding: '120px',
          }
        }
        ,
        {
          breakpoint: 1000,
          settings: {
            centerPadding: '0px',
          }
        }
      ]
    })//end plugin

    /* Events for next/prev on borders of slides*/
    $this.find(".prev-slide").on("click", function(){
      $this.slick("slickNext");
      $this.slick("slickPause");

    });
    $this.find(".next-slide").on("click", function(){
      $this.slick("slickPrev");
      $this.slick("slickPause");
    });

  })//end each

}//end function

/*******************************************************************************************
 **                                                                                       **
    =MODAL =LIGHTBOX
 **                                                                                       **
*********************************************************************************************/
function startModal() {
  var $modalBg = $("#modal-bg"),
      $modalWrapper = $("#modal-wrapper"),
      $modalContent = $("#modal-content"),
      $closeModal = $(".js-close-modal"),
      $openModal = $(".js-open-modal"),
      $lightbox = $("#lightbox");

  //CLICK -event open modal (todas as modais tem de ter esta classe para abrir)
  $openModal.on('click', function(event) {
    event.preventDefault();
     //animation contents
     $modalContent.velocity({
          scale: .7,
          opacity: 0
      }, 0);
      $modalBg.velocity({
        opacity: 0,
        complete: function(){
          $.doTimeout(100,function(){
            $("html,body").addClass("modal-open");
          });
        }
      }, 0);

    $modalContent
      .velocity({
        scale: [1, .7]
      }, {
        duration: 700,
        easing: [.02, .78, 0, .95],
        queue: false,
        delay: 50
      })
      .velocity({
        opacity: [1, 0],
      }, {
        duration: 200,
        easing: "ease"
    });

    $modalBg
      .velocity({
        opacity: [.8, 0]
      }, {
        duration: 1000,
        easing: "ease",
        complete: function(){
          if($modalWrapper.hasClass("subscribe-modal") || $modalWrapper.hasClass("pricing-modal"))
            if(!$_html.hasClass("mobile"))
              $modalWrapper.find("input")[0].focus();

          //Close Outside Lightbox
          $lightbox.on("clickoutside", function(event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            $closeModal.click();
          });
        }
    });

  });

  $(document).on("escClicked", function(){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    $closeModal.click();
  });

  //CLICK -event close modal (todas as modais tem de ter esta classe para abrir)
  $closeModal.on('click', function(event) {
    event.preventDefault();

    //Remove Event to close modal
    $lightbox.off("clickoutside");

    $modalContent
      .velocity({
          scale: [.9, 1]
      }, {
          duration: 700,
          easing: "ease",
          queue: false,
          delay: 50
      })
      .velocity({
          opacity: [0, 1],
      }, {
          duration: 500,
          easing: "ease"
      });

    $modalBg
      .velocity({
        opacity: [0, .8]
      }, {
        duration: 1000,
        easing: "ease",
        complete: function() {
          $modalWrapper.removeClass("js-on");
          $modalWrapper.scrollTop(0);
          $("html,body").removeClass("modal-open");
          if($modalWrapper.hasClass("pricing-modal")){
            var $pricingForm = $(".contact-form");
            resetForm($pricingForm);
          }
        }
      });
    return false;
  });



}