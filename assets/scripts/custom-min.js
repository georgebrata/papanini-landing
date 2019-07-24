function getLocation(t) {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(geoSuccess, function(e) {
        t ? geoClickedError(e) : geoOnLoadError(e)
    }) : console.log("Geolocation is not supported.")
}
function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function new_map(e) {
    // var
    var t = e.find(".marker"),
        i = {
            zoom: 16,
            mapTypeControl: !1,
            center: new google.maps.LatLng(0, 0),
            styles: [{
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{
                    saturation: 36
                }, {
                    color: "#333333"
                }, {
                    lightness: 40
                }]
            }, {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#ffffff"
                }, {
                    lightness: 16
                }]
            }, {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#fefefe"
                }, {
                    lightness: 20
                }]
            }, {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#fefefe"
                }, {
                    lightness: 17
                }, {
                    weight: 1.2
                }]
            }, {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }, {
                    lightness: 20
                }]
            }, {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }, {
                    lightness: 21
                }]
            }, {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#dedede"
                }, {
                    lightness: 21
                }, {
                    visibility: "off"
                }]
            }, {
                featureType: "poi.park",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 17
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 29
                }, {
                    weight: .2
                }]
            }, {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 18
                }]
            }, {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 16
                }]
            }, {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#f2f2f2"
                }, {
                    lightness: 19
                }]
            }, {
                featureType: "transit.station.rail",
                elementType: "labels.text",
                stylers: [{
                    visibility: "on"
                }]
            }, {
                featureType: "transit.station.rail",
                elementType: "labels.text.fill",
                stylers: [{
                    visibility: "on"
                }]
            }, {
                featureType: "transit.station.rail",
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "on"
                }]
            }, {
                featureType: "transit.station.rail",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "on"
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#e9e9e9"
                }, {
                    lightness: 17
                }]
            }],
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        o = new google.maps.Map(e[0], i);
    // vars
    // return
    // add a markers reference
    return o.markers = [],
        // add markers
        t.each(function() {
            add_marker($(this), o)
        }),
        // center map
        center_map(o), o
}
/*
 *  add_marker
 *
 *  This function will add a marker to the selected Google Map
 *
 *  @type	function
 *  @date	8/11/2013
 *  @since	4.3.0
 *
 *  @param	$marker (jQuery element)
 *  @param	map (Google Map object)
 *  @return	n/a
 */
function add_marker(e, t) {
    // var
    var i = new google.maps.LatLng(e.attr("data-lat"), e.attr("data-lng")),
        o = e.attr("data-url"),
        s = null,
        n = null,
        r = window.location.origin + "/wp-content/themes/franco_manca-2018-theme/img/";
    e.hasClass("red-f") && (s = r + "fm-pin.png", n = new google.maps.Size(34, 63), e.hasClass("local_info_map") ? (markerType = "local_info_site", zIndex = 999) : markerType = "all_sites"), e.hasClass("black-f") && (s = r + "fm-pin-black.png", n = new google.maps.Size(34, 63), markerType = "black-f"), e.hasClass("one") && (s = r + "fm-pin-1.png", n = new google.maps.Size(34, 63), markerType = "one"), e.hasClass("two") && (s = r + "fm-pin-2.png", n = new google.maps.Size(34, 63), markerType = "two"), e.hasClass("three") && (s = r + "fm-pin-3.png", n = new google.maps.Size(34, 63), markerType = "three"), e.hasClass("myloc") && (s = r + "fm-pin-myloc.png", n = new google.maps.Size(18, 18), markerType = "myloc");
    var a = {
            url: s, // url
            scaledSize: n
        },
        l = new google.maps.Marker({
            position: i,
            icon: a,
            url: o,
            map: t,
            markerType: markerType,
            zIndex: "local_info_site" === markerType ? zIndex : void 0
        });
    // create marker
    // if marker contains HTML, add it to an infoWindow
    if (
        // add to array
        t.markers.push(l), e.html()) {
        // create info window
        var d = new google.maps.InfoWindow({
            content: e.html()
        });
        // show info window when marker is clicked
        google.maps.event.addListener(l, "click", function() {
            l.url && (window.location.href = l.url)
        }), google.maps.event.addListener(l, "mouseover", function() {
            d.open(t, l)
        }), google.maps.event.addListener(l, "mouseout", function() {
            d.close()
        })
    }
}
/*
 *  center_map
 *
 *  This function will center the map, showing all markers attached to this map
 *
 *  @type	function
 *  @date	8/11/2013
 *  @since	4.3.0
 *
 *  @param	map (Google Map object)
 *  @return	n/a
 */
function center_map(e) {
    // vars
    var o = new google.maps.LatLngBounds;
    // loop through all markers and create bounds
    $.each(e.markers, function(e, t) {
            var i = new google.maps.LatLng(t.position.lat(), t.position.lng());
            o.extend(i)
        }),
        // only 1 marker?
        1 == e.markers.length ? (
            // set center of map
            e.setCenter(o.getCenter()), e.setZoom(16)) :
        // fit to bounds
        "local_info_site" === e.markers[0].markerType ? (e.setCenter(e.markers[0].getPosition()), e.setZoom(13)) : "all_sites" === e.markers[0].markerType ? (e.setZoom(10), e.setCenter({
            lat: 51.4977578,
            lng: -.1435168
        })) : e.fitBounds(o)
} // ajax
function getGeoHomepagePromo(e, t) {
    $.ajax({
        url: my_ajax_object.ajax_url,
        dataType: "html",
        type: "POST",
        data: {
            action: "get_home_geo_promo",
            lat: e,
            lng: t,
            is_ajax: !0
        },
        success: function(e) {
            $(".geo_homepage_promo").html(e)
        }
    })
}

function loadMorePosts(e) {
    $.ajax({
        url: my_ajax_object.ajax_url,
        dataType: "html",
        type: "POST",
        data: {
            action: "load_more_posts",
            blogPage: e,
            is_ajax: !0
        },
        success: function(e) {
            $(".load_more_blog_posts a").removeClass("loading").text("Load more"), $(".more_posts_load_area").append(e)
        }
    })
}

function getMyLocal(e, t) {
    $(".local_info").length && $.ajax({
        url: my_ajax_object.ajax_url,
        dataType: "html",
        type: "POST",
        data: {
            action: "get_my_local", // name of function in modules/ajax-functions.php
            lat: e,
            lng: t,
            is_ajax: !0
        },
        success: function(e) {
            $(".local_info").html(e), map = new_map($(".local_info .acf-map"))
        }
    })
}

function searchGeoFooter(e) {
    $.ajax({
        url: my_ajax_object.ajax_url,
        dataType: "html",
        type: "POST",
        data: {
            action: "search_geo_footer",
            address: e,
            is_ajax: !0
        },
        success: function(e) {
            $('.geo_footer .search_locations input[type="submit"]').val("Search"), $(".geo_footer").addClass("expanded_two"), $(".geo_footer .search_locations_results").show().html(e), $(".geo_footer .nearby").hide()
        }
    })
}

function getGeoFooter(e, t) {
    $.ajax({
        url: my_ajax_object.ajax_url,
        dataType: "html",
        type: "POST",
        data: {
            action: "get_geo_footer", // name of function in modules/ajax-functions.php
            lat: e,
            lng: t,
            is_ajax: !0
        },
        success: function(e) {
            $(".geo_footer .locations").html(e), $(".geo_footer .search_locations").hide(), $(".geo_footer .search_locations_results").hide(), $(".geo_footer .nearby").hide()
        },
        error: function(e) {
            console.log(e)
        }
    })
}
var geoClickedError = function(e) {
        var t;
        switch (e.code) {
            case 1:
                //alert('geo has been disabled, please re enable in your browser settings')
                $(".geo_error").addClass("show");
                break
        }
    },
    geoOnLoadError = function(e) {
        console.log(e)
    },
    geoSuccess = function(e) {
        $.cookie("fmanca_lat", e.coords.latitude), $.cookie("fmanca_lng", e.coords.longitude), getGeoFooter(e.coords.latitude, e.coords.longitude), getMyLocal(e.coords.latitude, e.coords.longitude), getGeoHomepagePromo(e.coords.latitude, e.coords.longitude)
    },
    objectFitImages = function() {
        "use strict";

        function s(e, t) {
            return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + e + "' height='" + t + "'%3E%3C/svg%3E"
        }

        function o(e) {
            if (e.srcset && !i && window.picturefill) {
                var t = window.picturefill._;
                e[t.ns] && e[t.ns].evaled || t.fillImg(e, {
                    reselect: !0
                }), e[t.ns].curSrc || (e[t.ns].supported = !1, t.fillImg(e, {
                    reselect: !0
                })), e.currentSrc = e[t.ns].curSrc || e.src
            }
        }

        function n(e) {
            for (var t, i = getComputedStyle(e).fontFamily, o = {}; null !== (t = p.exec(i));) o[t[1]] = t[2];
            return o
        }

        function r(e, t, i) {
            var o = s(t || 1, i || 0);
            f.call(e, "src") !== o && v.call(e, "src", o)
        }

        function a(e, t) {
            e.naturalWidth ? t(e) : setTimeout(a, 100, e, t)
        }

        function l(t) {
            var e = n(t),
                i = t[u];
            if (e["object-fit"] = e["object-fit"] || "fill", !i.img) {
                if ("fill" === e["object-fit"]) return;
                if (!i.skipTest && h && !e["object-position"]) return
            }
            if (!i.img) {
                i.img = new Image(t.width, t.height), i.img.srcset = f.call(t, "data-ofi-srcset") || t.srcset, i.img.src = f.call(t, "data-ofi-src") || t.src, v.call(t, "data-ofi-src", t.src), t.srcset && v.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height), t.srcset && (t.srcset = "");
                try {
                    d(t)
                } catch (t) {
                    window.console && console.warn("https://bit.ly/ofi-old-browser")
                }
            }
            o(i.img), t.style.backgroundImage = 'url("' + (i.img.currentSrc || i.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = e["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(e["object-fit"]) ? a(i.img, function() {
                i.img.naturalWidth > t.width || i.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto"
            }) : t.style.backgroundSize = e["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), a(i.img, function(e) {
                r(t, e.naturalWidth, e.naturalHeight)
            })
        }

        function d(i) {
            var t = {
                get: function(e) {
                    return i[u].img[e || "src"]
                },
                set: function(e, t) {
                    return i[u].img[t || "src"] = e, v.call(i, "data-ofi-" + t, e), l(i), e
                }
            };
            Object.defineProperty(i, "src", t), Object.defineProperty(i, "currentSrc", {
                get: function() {
                    return t.get("currentSrc")
                }
            }), Object.defineProperty(i, "srcset", {
                get: function() {
                    return t.get("srcset")
                },
                set: function(e) {
                    return t.set(e, "srcset")
                }
            })
        }

        function c(e, t) {
            var i = !y && !e;
            if (t = t || {}, e = e || "img", m && !t.skipTest || !g) return !1;
            "img" === e ? e = document.getElementsByTagName("img") : "string" == typeof e ? e = document.querySelectorAll(e) : "length" in e || (e = [e]);
            for (var o = 0; o < e.length; o++) e[o][u] = e[o][u] || {
                skipTest: t.skipTest
            }, l(e[o]);
            i && (document.body.addEventListener("load", function(e) {
                "IMG" === e.target.tagName && c(e.target, {
                    skipTest: t.skipTest
                })
            }, !0), y = !0, e = "img"), t.watchMQ && window.addEventListener("resize", c.bind(null, e, {
                skipTest: t.skipTest
            }))
        }
        var u = "bfred-it:object-fit-images",
            p = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
            e = "undefined" == typeof Image ? {
                style: {
                    "object-position": 1
                }
            } : new Image,
            h = "object-fit" in e.style,
            m = "object-position" in e.style,
            g = "background-size" in e.style,
            i = "string" == typeof e.currentSrc,
            f = e.getAttribute,
            v = e.setAttribute,
            y = !1;
        return c.supportsObjectFit = h, c.supportsObjectPosition = m,
            function() {
                function i(e, t) {
                    return e[u] && e[u].img && ("src" === t || "srcset" === t) ? e[u].img : e
                }
                m || (HTMLImageElement.prototype.getAttribute = function(e) {
                    return f.call(i(this, e), e)
                }, HTMLImageElement.prototype.setAttribute = function(e, t) {
                    return v.call(i(this, e), e, String(t))
                })
            }(), c
    }();
jQuery(document).ready(function(e) {
    objectFitImages()
});
var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "Other", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown"
    },
    searchString: function(e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t].string;
            if (this.versionSearchString = e[t].subString, -1 !== i.indexOf(e[t].subString)) return e[t].identity
        }
    },
    searchVersion: function(e) {
        var t = e.indexOf(this.versionSearchString);
        if (-1 !== t) {
            var i = e.indexOf("rv:");
            return "Trident" === this.versionSearchString && -1 !== i ? parseFloat(e.substring(i + 3)) : parseFloat(e.substring(t + this.versionSearchString.length + 1))
        }
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Edge",
        identity: "MS Edge"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer"
    }, {
        string: navigator.userAgent,
        subString: "Trident",
        identity: "Explorer"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.userAgent,
        subString: "Opera",
        identity: "Opera"
    }, {
        string: navigator.userAgent,
        subString: "OPR",
        identity: "Opera"
    }, {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "Safari",
        identity: "Safari"
    }]
};
BrowserDetect.init();
var version = BrowserDetect.version.toString();
jQuery(document).ready(function(e) {
        ("Explorer" === BrowserDetect.browser || "MS Edge" === BrowserDetect.browser && -1 !== version.indexOf("15")) && e("body").addClass("ie-edge")
    }), // scroll fade in
    jQuery(document).ready(function(a) {
        function e() {
            var e = a(".anim-el"),
                s = 100,
                t = i.height(),
                n = i.scrollTop(),
                r = n + t;
            a.each(e, function() {
                var e = a(this),
                    t = e.outerHeight(),
                    i = e.offset().top,
                    o;
                n <= i + t && i <= r && (e.hasClass("in-view") || (e.addClass("in-view").css("animation-delay", s + "ms"), s += 100))
            })
        }
        var i = a(window);
        i.on("scroll resize", e), i.trigger("scroll")
    }), jQuery(document).ready(function(e) {
        e(document).on("scroll", function() {
            100 < e(document).scrollTop() ? e(".header_wrap").addClass("shrink") : e(".header_wrap").removeClass("shrink")
        })
    }),
    function e(t, i) {
        "object" == typeof exports && "object" == typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define([], i) : "object" == typeof exports ? exports.Cleave = i() : t.Cleave = i()
    }(this, function() { /******/
        return function(i) {
                /******/ // The require function
                /******/
                function o(e) {
                    /******/ // Check if module is in cache
                    /******/
                    if (s[e])
                    /******/
                        return s[e].exports;
                    /******/ // Create a new module (and put it into the cache)
                    /******/
                    var t = s[e] = {
                        /******/
                        exports: {},
                        /******/
                        id: e,
                        /******/
                        loaded: !1
                            /******/
                    };
                    /******/ // Execute the module function
                    /******/
                    /******/ // Return the exports of the module
                    /******/
                    return i[e].call(t.exports, t, t.exports, o),
                        /******/ // Flag the module as loaded
                        /******/
                        t.loaded = !0, t.exports;
                    /******/
                }
                /******/ // expose the modules object (__webpack_modules__)
                /******/ // webpackBootstrap
                /******/ // The module cache
                /******/
                var s = {};
                /******/ // Load entry module and return exports
                /******/
                return o.m = i,
                    /******/ // expose the module cache
                    /******/
                    o.c = s,
                    /******/ // __webpack_public_path__
                    /******/
                    o.p = "", o(0);
                /******/
            }
            /************************************************************************/
            /******/
            ([
                /* 0 */
                /***/
                function(t, e, i) {
                    /* WEBPACK VAR INJECTION */
                    (function(e) {
                        "use strict";
                        /**
                         * Construct a new Cleave instance by passing the configuration object
                         *
                         * @param {String | HTMLElement} element
                         * @param {Object} opts
                         */
                        var r = function(e, t) {
                            var i = this;
                            if (i.element = "string" == typeof e ? document.querySelector(e) : void 0 !== e.length && 0 < e.length ? e[0] : e, !i.element) throw new Error("[cleave.js] Please check the element");
                            t.initValue = i.element.value, i.properties = r.DefaultProperties.assign({}, t), i.init()
                        };
                        r.prototype = {
                                init: function() {
                                    var e = this,
                                        t = e.properties;
                                    // no need to use this lib
                                    t.numeral || t.phone || t.creditCard || t.date || 0 !== t.blocksLength || t.prefix ? (t.maxLength = r.Util.getMaxLength(t.blocks), e.isAndroid = r.Util.isAndroid(), e.lastInputValue = "", e.onChangeListener = e.onChange.bind(e), e.onKeyDownListener = e.onKeyDown.bind(e), e.onFocusListener = e.onFocus.bind(e), e.onCutListener = e.onCut.bind(e), e.onCopyListener = e.onCopy.bind(e), e.element.addEventListener("input", e.onChangeListener), e.element.addEventListener("keydown", e.onKeyDownListener), e.element.addEventListener("focus", e.onFocusListener), e.element.addEventListener("cut", e.onCutListener), e.element.addEventListener("copy", e.onCopyListener), e.initPhoneFormatter(), e.initDateFormatter(), e.initNumeralFormatter(),
                                        // avoid touch input field if value is null
                                        // otherwise Firefox will add red box-shadow for <input required />
                                        (t.initValue || t.prefix && !t.noImmediatePrefix) && e.onInput(t.initValue)) : e.onInput(t.initValue)
                                },
                                initNumeralFormatter: function() {
                                    var e, t = this.properties;
                                    t.numeral && (t.numeralFormatter = new r.NumeralFormatter(t.numeralDecimalMark, t.numeralIntegerScale, t.numeralDecimalScale, t.numeralThousandsGroupStyle, t.numeralPositiveOnly, t.stripLeadingZeroes, t.delimiter))
                                },
                                initDateFormatter: function() {
                                    var e, t = this.properties;
                                    t.date && (t.dateFormatter = new r.DateFormatter(t.datePattern), t.blocks = t.dateFormatter.getBlocks(), t.blocksLength = t.blocks.length, t.maxLength = r.Util.getMaxLength(t.blocks))
                                },
                                initPhoneFormatter: function() {
                                    var e, t = this.properties;
                                    if (t.phone)
                                    // Cleave.AsYouTypeFormatter should be provided by
                                    // external google closure lib
                                        try {
                                        t.phoneFormatter = new r.PhoneFormatter(new t.root.Cleave.AsYouTypeFormatter(t.phoneRegionCode), t.delimiter)
                                    } catch (e) {
                                        throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib")
                                    }
                                },
                                onKeyDown: function(e) {
                                    var t = this,
                                        i = t.properties,
                                        o = e.which || e.keyCode,
                                        s = r.Util,
                                        n = t.element.value;
                                    s.isAndroidBackspaceKeydown(t.lastInputValue, n) && (o = 8), t.lastInputValue = n,
                                        // hit backspace when last character is delimiter
                                        8 === o && s.isDelimiter(n.slice(-i.delimiterLength), i.delimiter, i.delimiters) ? i.backspace = !0 : i.backspace = !1
                                },
                                onChange: function() {
                                    this.onInput(this.element.value)
                                },
                                onFocus: function() {
                                    var e = this,
                                        t = e.properties;
                                    r.Util.fixPrefixCursor(e.element, t.prefix, t.delimiter, t.delimiters)
                                },
                                onCut: function(e) {
                                    this.copyClipboardData(e), this.onInput("")
                                },
                                onCopy: function(e) {
                                    this.copyClipboardData(e)
                                },
                                copyClipboardData: function(e) {
                                    var t = this,
                                        i = t.properties,
                                        o = r.Util,
                                        s = t.element.value,
                                        n = "";
                                    n = i.copyDelimiter ? s : o.stripDelimiters(s, i.delimiter, i.delimiters);
                                    try {
                                        e.clipboardData ? e.clipboardData.setData("Text", n) : window.clipboardData.setData("Text", n), e.preventDefault()
                                    } catch (e) {
                                        //  empty
                                    }
                                },
                                onInput: function(e) {
                                    var t = this,
                                        i = t.properties,
                                        o = r.Util;
                                    // case 1: delete one more character "4"
                                    // 1234*| -> hit backspace -> 123|
                                    // case 2: last character is not delimiter which is:
                                    // 12|34* -> hit backspace -> 1|34*
                                    // note: no need to apply this for numeral mode
                                    // phone formatter
                                    return i.numeral || !i.backspace || o.isDelimiter(e.slice(-i.delimiterLength), i.delimiter, i.delimiters) || (e = o.headStr(e, e.length - i.delimiterLength)), i.phone ? (!i.prefix || i.noImmediatePrefix && !e.length ? i.result = i.phoneFormatter.format(e) : i.result = i.prefix + i.phoneFormatter.format(e).slice(i.prefix.length), void t.updateValueState()) :
                                        // numeral formatter
                                        i.numeral ? (!i.prefix || i.noImmediatePrefix && !e.length ? i.result = i.numeralFormatter.format(e) : i.result = i.prefix + i.numeralFormatter.format(e), void t.updateValueState()) : (
                                            // prefix
                                            // date
                                            i.date && (e = i.dateFormatter.getValidatedDate(e)),
                                            // strip delimiters
                                            e = o.stripDelimiters(e, i.delimiter, i.delimiters),
                                            // strip prefix
                                            e = o.getPrefixStrippedValue(e, i.prefix, i.prefixLength, i.result),
                                            // strip non-numeric characters
                                            e = i.numericOnly ? o.strip(e, /[^\d]/g) : e,
                                            // convert case
                                            e = i.uppercase ? e.toUpperCase() : e, e = i.lowercase ? e.toLowerCase() : e, !i.prefix || i.noImmediatePrefix && !e.length || (e = i.prefix + e, 0 !== i.blocksLength) ? (
                                                // update credit card props
                                                i.creditCard && t.updateCreditCardPropsByValue(e),
                                                // strip over length characters
                                                e = o.headStr(e, i.maxLength),
                                                // apply blocks
                                                i.result = o.getFormattedValue(e, i.blocks, i.blocksLength, i.delimiter, i.delimiters, i.delimiterLazyShow)) : i.result = e, void t.updateValueState())
                                },
                                updateCreditCardPropsByValue: function(e) {
                                    var t = this,
                                        i = t.properties,
                                        o = r.Util,
                                        s;
                                    // At least one of the first 4 characters has changed
                                    o.headStr(i.result, 4) !== o.headStr(e, 4) && (s = r.CreditCardDetector.getInfo(e, i.creditCardStrictMode), i.blocks = s.blocks, i.blocksLength = i.blocks.length, i.maxLength = o.getMaxLength(i.blocks),
                                        // credit card type changed
                                        i.creditCardType !== s.type && (i.creditCardType = s.type, i.onCreditCardTypeChanged.call(t, i.creditCardType)))
                                },
                                updateValueState: function() {
                                    var e = this,
                                        t = r.Util,
                                        i = e.properties;
                                    if (e.element) {
                                        var o = e.element.selectionEnd,
                                            s = e.element.value,
                                            n = i.result;
                                        o = t.getNextCursorPosition(o, s, n, i.delimiter, i.delimiters),
                                            // fix Android browser type="text" input field
                                            // cursor not jumping issue
                                            e.isAndroid ? window.setTimeout(function() {
                                                e.element.value = n, t.setSelection(e.element, o, i.document, !1), e.callOnValueChanged()
                                            }, 1) : (e.element.value = n, t.setSelection(e.element, o, i.document, !1), e.callOnValueChanged())
                                    }
                                },
                                callOnValueChanged: function() {
                                    var e = this,
                                        t = e.properties;
                                    t.onValueChanged.call(e, {
                                        target: {
                                            value: t.result,
                                            rawValue: e.getRawValue()
                                        }
                                    })
                                },
                                setPhoneRegionCode: function(e) {
                                    var t = this,
                                        i;
                                    t.properties.phoneRegionCode = e, t.initPhoneFormatter(), t.onChange()
                                },
                                setRawValue: function(e) {
                                    var t = this,
                                        i = t.properties;
                                    e = null != e ? e.toString() : "", i.numeral && (e = e.replace(".", i.numeralDecimalMark)), i.backspace = !1, t.element.value = e, t.onInput(e)
                                },
                                getRawValue: function() {
                                    var e = this,
                                        t = e.properties,
                                        i = r.Util,
                                        o = e.element.value;
                                    return t.rawValueTrimPrefix && (o = i.getPrefixStrippedValue(o, t.prefix, t.prefixLength, t.result)), o = t.numeral ? t.numeralFormatter.getRawValue(o) : i.stripDelimiters(o, t.delimiter, t.delimiters)
                                },
                                getISOFormatDate: function() {
                                    var e, t = this.properties;
                                    return t.date ? t.dateFormatter.getISOFormatDate() : ""
                                },
                                getFormattedValue: function() {
                                    return this.element.value
                                },
                                destroy: function() {
                                    var e = this;
                                    e.element.removeEventListener("input", e.onChangeListener), e.element.removeEventListener("keydown", e.onKeyDownListener), e.element.removeEventListener("focus", e.onFocusListener), e.element.removeEventListener("cut", e.onCutListener), e.element.removeEventListener("copy", e.onCopyListener)
                                },
                                toString: function() {
                                    return "[Cleave Object]"
                                }
                            }, r.NumeralFormatter = i(1), r.DateFormatter = i(2), r.PhoneFormatter = i(3), r.CreditCardDetector = i(4), r.Util = i(5), r.DefaultProperties = i(6),
                            // for angular directive
                            ("object" == typeof e && e ? e : window).Cleave = r,
                            // CommonJS
                            t.exports = r
                    }).call(e, function() {
                            return this
                        }())
                        /***/
                },
                /* 1 */
                /***/
                function(e, t) {
                    "use strict";
                    var l = function(e, t, i, o, s, n, r) {
                        var a = this;
                        a.numeralDecimalMark = e || ".", a.numeralIntegerScale = 0 < t ? t : 0, a.numeralDecimalScale = 0 <= i ? i : 2, a.numeralThousandsGroupStyle = o || l.groupStyle.thousand, a.numeralPositiveOnly = !!s, a.stripLeadingZeroes = !1 !== n, a.delimiter = r || "" === r ? r : ",", a.delimiterRE = r ? new RegExp("\\" + r, "g") : ""
                    };
                    l.groupStyle = {
                        thousand: "thousand",
                        lakh: "lakh",
                        wan: "wan",
                        none: "none"
                    }, l.prototype = {
                        getRawValue: function(e) {
                            return e.replace(this.delimiterRE, "").replace(this.numeralDecimalMark, ".")
                        },
                        format: function(e) {
                            var t = this,
                                i, o, s = "";
                            // strip alphabet letters
                            switch (e = e.replace(/[A-Za-z]/g, "").replace(t.numeralDecimalMark, "M").replace(/[^\dM-]/g, "").replace(/^\-/, "N").replace(/\-/g, "").replace("N", t.numeralPositiveOnly ? "" : "-").replace("M", t.numeralDecimalMark),
                                // strip any leading zeros
                                t.stripLeadingZeroes && (e = e.replace(/^(-)?0+(?=\d)/, "$1")), 0 <= (o = e).indexOf(t.numeralDecimalMark) && (o = (i = e.split(t.numeralDecimalMark))[0], s = t.numeralDecimalMark + i[1].slice(0, t.numeralDecimalScale)), 0 < t.numeralIntegerScale && (o = o.slice(0, t.numeralIntegerScale + ("-" === e.slice(0, 1) ? 1 : 0))), t.numeralThousandsGroupStyle) {
                                case l.groupStyle.lakh:
                                    o = o.replace(/(\d)(?=(\d\d)+\d$)/g, "$1" + t.delimiter);
                                    break;
                                case l.groupStyle.wan:
                                    o = o.replace(/(\d)(?=(\d{4})+$)/g, "$1" + t.delimiter);
                                    break;
                                case l.groupStyle.thousand:
                                    o = o.replace(/(\d)(?=(\d{3})+$)/g, "$1" + t.delimiter);
                                    break
                            }
                            return o.toString() + (0 < t.numeralDecimalScale ? s.toString() : "")
                        }
                    }, e.exports = l
                },
                /* 2 */
                /***/
                function(e, t) {
                    "use strict";
                    var i = function(e) {
                        var t = this;
                        t.date = [], t.blocks = [], t.datePattern = e, t.initBlocks()
                    };
                    i.prototype = {
                        initBlocks: function() {
                            var t = this;
                            t.datePattern.forEach(function(e) {
                                "Y" === e ? t.blocks.push(4) : t.blocks.push(2)
                            })
                        },
                        getISOFormatDate: function() {
                            var e = this,
                                t = e.date;
                            return t[2] ? t[2] + "-" + e.addLeadingZero(t[1]) + "-" + e.addLeadingZero(t[0]) : ""
                        },
                        getBlocks: function() {
                            return this.blocks
                        },
                        getValidatedDate: function(n) {
                            var r = this,
                                a = "";
                            return n = n.replace(/[^\d]/g, ""), r.blocks.forEach(function(e, t) {
                                if (0 < n.length) {
                                    var i = n.slice(0, e),
                                        o = i.slice(0, 1),
                                        s = n.slice(e);
                                    switch (r.datePattern[t]) {
                                        case "d":
                                            "00" === i ? i = "01" : 3 < parseInt(o, 10) ? i = "0" + o : 31 < parseInt(i, 10) && (i = "31");
                                            break;
                                        case "m":
                                            "00" === i ? i = "01" : 1 < parseInt(o, 10) ? i = "0" + o : 12 < parseInt(i, 10) && (i = "12");
                                            break
                                    }
                                    a += i,
                                        // update remaining string
                                        n = s
                                }
                            }), this.getFixedDateString(a)
                        },
                        getFixedDateString: function(e) {
                            var i = this,
                                t = i.datePattern,
                                o = [],
                                s = 0,
                                n = 0,
                                r = 0,
                                a = 0,
                                l = 0,
                                d = 0,
                                c, u, p, h = !1;
                            // mm-dd || dd-mm
                            return 4 === e.length && "y" !== t[0].toLowerCase() && "y" !== t[1].toLowerCase() && (l = 2 - (a = "d" === t[0] ? 0 : 2), c = parseInt(e.slice(a, a + 2), 10), u = parseInt(e.slice(l, l + 2), 10), o = this.getFixedDate(c, u, 0)),
                                // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
                                8 === e.length && (t.forEach(function(e, t) {
                                    switch (e) {
                                        case "d":
                                            s = t;
                                            break;
                                        case "m":
                                            n = t;
                                            break;
                                        default:
                                            r = t;
                                            break
                                    }
                                }), d = 2 * r, a = s <= r ? 2 * s : 2 * s + 2, l = n <= r ? 2 * n : 2 * n + 2, c = parseInt(e.slice(a, a + 2), 10), u = parseInt(e.slice(l, l + 2), 10), p = parseInt(e.slice(d, d + 4), 10), h = 4 === e.slice(d, d + 4).length, o = this.getFixedDate(c, u, p)), 0 === (i.date = o).length ? e : t.reduce(function(e, t) {
                                    switch (t) {
                                        case "d":
                                            return e + i.addLeadingZero(o[0]);
                                        case "m":
                                            return e + i.addLeadingZero(o[1]);
                                        default:
                                            return e + (h ? i.addLeadingZeroForYear(o[2]) : "")
                                    }
                                }, "")
                        },
                        getFixedDate: function(e, t, i) {
                            return e = Math.min(e, 31), t = Math.min(t, 12), i = parseInt(i || 0, 10), (t < 7 && t % 2 == 0 || 8 < t && t % 2 == 1) && (e = Math.min(e, 2 === t ? this.isLeapYear(i) ? 29 : 28 : 30)), [e, t, i]
                        },
                        isLeapYear: function(e) {
                            return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
                        },
                        addLeadingZero: function(e) {
                            return (e < 10 ? "0" : "") + e
                        },
                        addLeadingZeroForYear: function(e) {
                            return (e < 10 ? "000" : e < 100 ? "00" : e < 1e3 ? "0" : "") + e
                        }
                    }, e.exports = i
                },
                /* 3 */
                /***/
                function(e, t) {
                    "use strict";
                    var i = function(e, t) {
                        var i = this;
                        i.delimiter = t || "" === t ? t : " ", i.delimiterRE = t ? new RegExp("\\" + t, "g") : "", i.formatter = e
                    };
                    i.prototype = {
                        setFormatter: function(e) {
                            this.formatter = e
                        },
                        format: function(e) {
                            var t = this;
                            t.formatter.clear();
                            for (var i = "", o, s = !1, n = 0, r = (
                                    // strip delimiter
                                    e = (
                                        // only keep number and +
                                        e = e.replace(/[^\d+]/g, "")).replace(t.delimiterRE, "")).length; n < r; n++) o = t.formatter.inputDigit(e.charAt(n)),
                                // has ()- or space inside
                                /[\s()-]/g.test(o) ? (i = o, s = !0) : s || (i = o);
                            // strip ()
                            // e.g. US: 7161234567 returns (716) 123-4567
                            // replace library delimiter with user customized delimiter
                            return i = (i = i.replace(/[()]/g, "")).replace(/[\s-]/g, t.delimiter)
                        }
                    }, e.exports = i
                },
                /* 4 */
                /***/
                function(e, t) {
                    "use strict";
                    var r = {
                        blocks: {
                            uatp: [4, 5, 6],
                            amex: [4, 6, 5],
                            diners: [4, 6, 4],
                            discover: [4, 4, 4, 4],
                            mastercard: [4, 4, 4, 4],
                            dankort: [4, 4, 4, 4],
                            instapayment: [4, 4, 4, 4],
                            jcb15: [4, 6, 5],
                            jcb: [4, 4, 4, 4],
                            maestro: [4, 4, 4, 4],
                            visa: [4, 4, 4, 4],
                            mir: [4, 4, 4, 4],
                            unionPay: [4, 4, 4, 4],
                            general: [4, 4, 4, 4],
                            generalStrict: [4, 4, 4, 7]
                        },
                        re: {
                            // starts with 1; 15 digits, not starts with 1800 (jcb card)
                            uatp: /^(?!1800)1\d{0,14}/,
                            // starts with 34/37; 15 digits
                            amex: /^3[47]\d{0,13}/,
                            // starts with 6011/65/644-649; 16 digits
                            discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
                            // starts with 300-305/309 or 36/38/39; 14 digits
                            diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
                            // starts with 51-55/2221â€“2720; 16 digits
                            mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
                            // starts with 5019/4175/4571; 16 digits
                            dankort: /^(5019|4175|4571)\d{0,12}/,
                            // starts with 637-639; 16 digits
                            instapayment: /^63[7-9]\d{0,13}/,
                            // starts with 2131/1800; 15 digits
                            jcb15: /^(?:2131|1800)\d{0,11}/,
                            // starts with 2131/1800/35; 16 digits
                            jcb: /^(?:35\d{0,2})\d{0,12}/,
                            // starts with 50/56-58/6304/67; 16 digits
                            maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
                            // starts with 22; 16 digits
                            mir: /^220[0-4]\d{0,12}/,
                            // starts with 4; 16 digits
                            visa: /^4\d{0,15}/,
                            // starts with 62; 16 digits
                            unionPay: /^62\d{0,14}/
                        },
                        getInfo: function(e, t) {
                            var i = r.blocks,
                                o = r.re;
                            // Some credit card can have up to 19 digits number.
                            // Set strictMode to true will remove the 16 max-length restrain,
                            // however, I never found any website validate card number like
                            // this, hence probably you don't want to enable this option.
                            for (var s in t = !!t, o) {
                                var n;
                                if (o[s].test(e)) return {
                                    type: s,
                                    blocks: n = t ? i.generalStrict : i[s]
                                }
                            }
                            return {
                                type: "unknown",
                                blocks: t ? i.generalStrict : i.general
                            }
                        }
                    };
                    e.exports = r
                },
                /* 5 */
                /***/
                function(e, t) {
                    "use strict";
                    var i = {
                        noop: function() {},
                        strip: function(e, t) {
                            return e.replace(t, "")
                        },
                        isDelimiter: function(t, e, i) {
                            // single delimiter
                            return 0 === i.length ? t === e : i.some(function(e) {
                                if (t === e) return !0
                            });
                            // multiple delimiters
                        },
                        getDelimiterREByDelimiter: function(e) {
                            return new RegExp(e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g")
                        },
                        getNextCursorPosition: function(e, t, i, o, s) {
                            // If cursor was at the end of value, just place it back.
                            // Because new value could contain additional chars.
                            return t.length === e ? i.length : e + this.getPositionOffset(e, t, i, o, s)
                        },
                        getPositionOffset: function(e, t, i, o, s) {
                            var n, r, a;
                            return n = this.stripDelimiters(t.slice(0, e), o, s), r = this.stripDelimiters(i.slice(0, e), o, s), 0 !== (a = n.length - r.length) ? a / Math.abs(a) : 0
                        },
                        stripDelimiters: function(t, e, i) {
                            var o = this;
                            // single delimiter
                            if (0 !== i.length)
                            // multiple delimiters
                                return i.forEach(function(e) {
                                t = t.replace(o.getDelimiterREByDelimiter(e), "")
                            }), t;
                            var s = e ? o.getDelimiterREByDelimiter(e) : "";
                            return t.replace(s, "")
                        },
                        headStr: function(e, t) {
                            return e.slice(0, t)
                        },
                        getMaxLength: function(e) {
                            return e.reduce(function(e, t) {
                                return e + t
                            }, 0)
                        },
                        // strip value by prefix length
                        // for prefix: PRE
                        // (PRE123, 3) -> 123
                        // (PR123, 3) -> 23 this happens when user hits backspace in front of "PRE"
                        getPrefixStrippedValue: function(e, t, i, o) {
                            if (e.slice(0, i) !== t)
                            // Check whether if it is a deletion
                                if (e.length < o.length) e = e.length > i ? o : t;
                                else {
                                    var s = this.getFirstDiffIndex(t, e.slice(0, i));
                                    e = t + e.slice(s, s + 1) + e.slice(i + 1)
                                }
                            return e.slice(i)
                        },
                        getFirstDiffIndex: function(e, t) {
                            for (var i = 0; e.charAt(i) === t.charAt(i);)
                                if ("" === e.charAt(i++)) return -1;
                            return i
                        },
                        getFormattedValue: function(s, e, n, r, a, l) {
                            var d = "",
                                c = 0 < a.length,
                                u;
                            // no options, normal input
                            return 0 === n ? s : (e.forEach(function(e, t) {
                                if (0 < s.length) {
                                    var i = s.slice(0, e),
                                        o = s.slice(e);
                                    u = c ? a[l ? t - 1 : t] || u : r, l ? (0 < t && (d += u), d += i) : (d += i, i.length === e && t < n - 1 && (d += u)),
                                        // update remaining string
                                        s = o
                                }
                            }), d)
                        },
                        // move cursor to the end
                        // the first time user focuses on an input with prefix
                        fixPrefixCursor: function(e, t, i, o) {
                            if (e) {
                                var s = e.value,
                                    n = i || o[0] || " ";
                                if (e.setSelectionRange && t && !(t.length + n.length < s.length)) {
                                    var r = 2 * s.length;
                                    // set timeout to avoid blink
                                    setTimeout(function() {
                                        e.setSelectionRange(r, r)
                                    }, 1)
                                }
                            }
                        },
                        setSelection: function(e, t, i) {
                            if (e === i.activeElement && !(e && e.value.length <= t))
                                if (e.createTextRange) {
                                    var o = e.createTextRange();
                                    o.move("character", t), o.select()
                                } else try {
                                        e.setSelectionRange(t, t)
                                    } catch (e) {
                                        // eslint-disable-next-line
                                        console.warn("The input element type does not support selection")
                                    }
                                    // cursor is already in the end
                        },
                        isAndroid: function() {
                            return navigator && /android/i.test(navigator.userAgent)
                        },
                        // On Android chrome, the keyup and keydown events
                        // always return key code 229 as a composition that
                        // buffers the userâ€™s keystrokes
                        // see https://github.com/nosir/cleave.js/issues/147
                        isAndroidBackspaceKeydown: function(e, t) {
                            return !!(this.isAndroid() && e && t) && t === e.slice(0, -1)
                        }
                    };
                    e.exports = i
                },
                /* 6 */
                /***/
                function(t, e) {
                    /* WEBPACK VAR INJECTION */
                    (function(i) {
                        "use strict";
                        /**
                         * Props Assignment
                         *
                         * Separate this, so react module can share the usage
                         */
                        var e = {
                            // Maybe change to object-assign
                            // for now just keep it as simple
                            assign: function(e, t) {
                                return t = t || {},
                                    // credit card
                                    (e = e || {}).creditCard = !!t.creditCard, e.creditCardStrictMode = !!t.creditCardStrictMode, e.creditCardType = "", e.onCreditCardTypeChanged = t.onCreditCardTypeChanged || function() {},
                                    // phone
                                    e.phone = !!t.phone, e.phoneRegionCode = t.phoneRegionCode || "AU", e.phoneFormatter = {},
                                    // date
                                    e.date = !!t.date, e.datePattern = t.datePattern || ["d", "m", "Y"], e.dateFormatter = {},
                                    // numeral
                                    e.numeral = !!t.numeral, e.numeralIntegerScale = 0 < t.numeralIntegerScale ? t.numeralIntegerScale : 0, e.numeralDecimalScale = 0 <= t.numeralDecimalScale ? t.numeralDecimalScale : 2, e.numeralDecimalMark = t.numeralDecimalMark || ".", e.numeralThousandsGroupStyle = t.numeralThousandsGroupStyle || "thousand", e.numeralPositiveOnly = !!t.numeralPositiveOnly, e.stripLeadingZeroes = !1 !== t.stripLeadingZeroes,
                                    // others
                                    e.numericOnly = e.creditCard || e.date || !!t.numericOnly, e.uppercase = !!t.uppercase, e.lowercase = !!t.lowercase, e.prefix = e.creditCard || e.date ? "" : t.prefix || "", e.noImmediatePrefix = !!t.noImmediatePrefix, e.prefixLength = e.prefix.length, e.rawValueTrimPrefix = !!t.rawValueTrimPrefix, e.copyDelimiter = !!t.copyDelimiter, e.initValue = void 0 !== t.initValue && null !== t.initValue ? t.initValue.toString() : "", e.delimiter = t.delimiter || "" === t.delimiter ? t.delimiter : t.date ? "/" : t.numeral ? "," : (t.phone, " "), e.delimiterLength = e.delimiter.length, e.delimiterLazyShow = !!t.delimiterLazyShow, e.delimiters = t.delimiters || [], e.blocks = t.blocks || [], e.blocksLength = e.blocks.length, e.document = t.document || document, e.root = "object" == typeof i && i ? i : window, e.maxLength = 0, e.backspace = !1, e.result = "", e.onValueChanged = t.onValueChanged || function() {}, e
                            }
                        };
                        t.exports = e
                    }).call(e, function() {
                            return this
                        }())
                        /***/
                }
                /******/
            ])
    }),
    function(t, i) {
        "function" == typeof define && define.amd ? define(["jquery"], function(e) {
            return i(t, e)
        }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = i(t, require("jquery")) : t.lity = i(t, t.jQuery || t.Zepto)
    }("undefined" != typeof window ? window : this, function(e, u) {
        "use strict";

        function p(e) {
            var t = I();
            return F && e.length ? (e.one(F, t.resolve), setTimeout(t.resolve, 500)) : t.resolve(), t.promise()
        }

        function h(e, t, i) {
            if (1 === arguments.length) return u.extend({}, e);
            if ("string" == typeof t) {
                if (void 0 === i) return void 0 === e[t] ? null : e[t];
                e[t] = i
            } else u.extend(e, t);
            return this
        }

        function i(e) {
            for (var t = decodeURI(e.split("#")[0]).split("&"), i = {}, o, s = 0, n = t.length; s < n; s++) t[s] && (i[(o = t[s].split("="))[0]] = o[1]);
            return i
        }

        function o(e, t) {
            return e + (-1 < e.indexOf("?") ? "&" : "?") + u.param(t)
        }

        function s(e, t) {
            var i = e.indexOf("#");
            return -1 === i ? t : (0 < i && (e = e.substr(i)), t + e)
        }

        function r(e) {
            return u('<span class="lity-error"/>').append(e)
        }

        function t(e, t) {
            var i = t.opener() && t.opener().data("lity-desc") || "Image with no description",
                o = u('<img src="' + e + '" alt="' + i + '"/>'),
                s = I(),
                n = function() {
                    s.reject(r("Failed loading image"))
                };
            return o.on("load", function() {
                if (0 === this.naturalWidth) return n();
                s.resolve(o)
            }).on("error", n), s.promise()
        }

        function n(e, t) {
            var i, o, s;
            try {
                i = u(e)
            } catch (e) {
                return !1
            }
            return !!i.length && (o = u('<i style="display:none !important"/>'), s = i.hasClass("lity-hide"), t.element().one("lity:remove", function() {
                o.before(i).remove(), s && !i.closest(".lity-content").length && i.addClass("lity-hide")
            }), i.removeClass("lity-hide").after(o))
        }

        function a(e) {
            var t = z.exec(e);
            return !!t && m(s(e, o("https://www.youtube" + (t[2] || "") + ".com/embed/" + t[4], u.extend({
                autoplay: 1
            }, i(t[5] || "")))))
        }

        function l(e) {
            var t = M.exec(e);
            return !!t && m(s(e, o("https://player.vimeo.com/video/" + t[3], u.extend({
                autoplay: 1
            }, i(t[4] || "")))))
        }

        function d(e) {
            var t = W.exec(e);
            return !!t && (0 !== e.indexOf("http") && (e = "https:" + e), m(s(e, o("https://www.facebook.com/plugins/video.php?href=" + e, u.extend({
                autoplay: 1
            }, i(t[4] || ""))))))
        }

        function c(e) {
            var t = L.exec(e);
            return !!t && m(s(e, o("https://www.google." + t[3] + "/maps?" + t[6], {
                output: 0 < t[6].indexOf("layer=c") ? "svembed" : "embed"
            })))
        }

        function m(e) {
            return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + e + '"/></div>'
        }

        function g() {
            return x.documentElement.clientHeight ? x.documentElement.clientHeight : Math.round(S.height())
        }

        function f(e) {
            var t = $();
            t && (
                // ESC key
                27 === e.keyCode && t.options("esc") && t.close(),
                // TAB key
                9 === e.keyCode && v(e, t))
        }

        function v(e, t) {
            var i = t.element().find(_),
                o = i.index(x.activeElement);
            e.shiftKey && o <= 0 ? (i.get(i.length - 1).focus(), e.preventDefault()) : e.shiftKey || o !== i.length - 1 || (i.get(0).focus(), e.preventDefault())
        }

        function y() {
            u.each(A, function(e, t) {
                t.resize()
            })
        }

        function b(e) {
            1 === A.unshift(e) && (P.addClass("lity-active"), S.on({
                resize: y,
                keydown: f
            })), u("body > *").not(e.element()).addClass("lity-hidden").each(function() {
                var e = u(this);
                void 0 === e.data(j) && e.data(j, e.attr(D) || null)
            }).attr(D, "true")
        }

        function w(t) {
            var e;
            t.element().attr(D, "true"), 1 === A.length && (P.removeClass("lity-active"), S.off({
                resize: y,
                keydown: f
            })), (e = (A = u.grep(A, function(e) {
                return t !== e
            })).length ? A[0].element() : u(".lity-hidden")).removeClass("lity-hidden").each(function() {
                var e = u(this),
                    t = e.data(j);
                t ? e.attr(D, t) : e.removeAttr(D), e.removeData(j)
            })
        }

        function $() {
            return 0 === A.length ? null : A[0]
        }

        function k(i, o, s, e) {
            var n = "inline",
                r, a = u.extend({}, s);
            return e && a[e] ? (r = a[e](i, o), n = e) : (
                // Run inline and iframe handlers after all other handlers
                u.each(["inline", "iframe"], function(e, t) {
                    delete a[t], a[t] = s[t]
                }), u.each(a, function(e, t) {
                    // Handler might be "removed" by setting callback to null
                    return !t || (!(!t.test || t.test(i, o)) || (!1 !== (r = t(i, o)) ? (n = e, !1) : void 0))
                })), {
                handler: n,
                content: r || ""
            }
        }

        function C(e, t, i, o) {
            function s(e) {
                c = u(e).css("max-height", g() + "px"), d.find(".lity-loader").each(function() {
                    var e = u(this);
                    p(e).always(function() {
                        e.remove()
                    })
                }), d.removeClass("lity-loading").find(".lity-content").empty().append(c), a = !0, c.trigger("lity:ready", [n])
            }
            var n = this,
                r, a = !1,
                l = !1,
                d, c;
            t = u.extend({}, O, t), d = u(t.template),
                // -- API --
                n.element = function() {
                    return d
                }, n.opener = function() {
                    return i
                }, n.options = u.proxy(h, n, t), n.handlers = u.proxy(h, n, t.handlers), n.resize = function() {
                    a && !l && c.css("max-height", g() + "px").trigger("lity:resize", [n])
                }, n.close = function() {
                    if (a && !l) {
                        l = !0, w(n);
                        var e = I();
                        // We return focus only if the current focus is inside this instance
                        if (o && (x.activeElement === d[0] || u.contains(d[0], x.activeElement))) try {
                            o.focus()
                        } catch (e) {
                            // Ignore exceptions, eg. for SVG elements which can't be
                            // focused in IE11
                        }
                        return c.trigger("lity:close", [n]), d.removeClass("lity-opened").addClass("lity-closed"), p(c.add(d)).always(function() {
                            c.trigger("lity:remove", [n]), d.remove(), d = void 0, e.resolve()
                        }), e.promise()
                    }
                },
                // -- Initialization --
                r = k(e, n, t.handlers, t.handler), d.attr(D, "false").addClass("lity-loading lity-opened lity-" + r.handler).appendTo("body").focus().on("click", "[data-lity-close]", function(e) {
                    u(e.target).is("[data-lity-close]") && n.close()
                }).trigger("lity:open", [n]), b(n), u.when(r.content).always(s)
        }

        function T(e, t, i) {
            e.preventDefault ? (e.preventDefault(), e = (i = u(this)).data("lity-target") || i.attr("href") || i.attr("src")) : i = u(i);
            var o = new C(e, u.extend({}, i.data("lity-options") || i.data("lity"), t), i, x.activeElement);
            if (!e.preventDefault) return o
        }
        var x = e.document,
            S = u(e),
            I = u.Deferred,
            P = u("html"),
            A = [],
            D = "aria-hidden",
            j = "lity-" + D,
            _ = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
            O = {
                esc: !0,
                handler: null,
                handlers: {
                    image: t,
                    inline: n,
                    youtube: a,
                    vimeo: l,
                    googlemaps: c,
                    facebookvideo: d,
                    iframe: m
                },
                template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
            },
            E = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
            z = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
            M = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
            L = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
            W = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,
            F = function() {
                var e = x.createElement("div"),
                    t = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (var i in t)
                    if (void 0 !== e.style[i]) return t[i];
                return !1
            }();
        return t.test = function(e) {
            return E.test(e)
        }, T.version = "@VERSION", T.options = u.proxy(h, T, O), T.handlers = u.proxy(h, T, O.handlers), T.current = $, u(x).on("click.lity", "[data-lity]", T), T
    }),
    /*
         _ _      _       _
     ___| (_) ___| | __  (_)___
    / __| | |/ __| |/ /  | / __|
    \__ \ | | (__|   < _ | \__ \
    |___/_|_|\___|_|\_(_)/ |___/
                       |__/

     Version: 1.6.0
      Author: Ken Wheeler
     Website: http://kenwheeler.github.io
        Docs: http://kenwheeler.github.io/slick
        Repo: http://github.com/kenwheeler/slick
      Issues: http://github.com/kenwheeler/slick/issues

     */
    /* global window, document, define, jQuery, setInterval, clearInterval */
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(c) {
        "use strict";
        var a = window.Slick || {};
        (a = function() {
            function e(e, t) {
                var i = this,
                    o;
                i.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: c(e),
                        appendDots: c(e),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(e, t) {
                            return c('<button type="button" data-role="none" role="button" tabindex="0" />').text(t + 1)
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnFocus: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rows: 1,
                        rtl: !1,
                        slide: "",
                        slidesPerRow: 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        useTransform: !0,
                        variableWidth: !1,
                        vertical: !1,
                        verticalSwiping: !1,
                        waitForAnimate: !0,
                        zIndex: 1e3
                    }, i.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1
                    }, c.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.focussed = !1, i.interrupted = !1, i.hidden = "hidden", i.paused = !0, i.positionProp = null, i.respondTo = null, i.rowCount = 1, i.shouldClick = !0, i.$slider = c(e), i.$slidesCache = null, i.transformType = null, i.transitionType = null, i.visibilityChange = "visibilitychange", i.windowWidth = 0, i.windowTimer = null, o = c(e).data("slick") || {}, i.options = c.extend({}, i.defaults, t, o), i.currentSlide = i.options.initialSlide, i.originalSettings = i.options, void 0 !== document.mozHidden ? (i.hidden = "mozHidden", i.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (i.hidden = "webkitHidden", i.visibilityChange = "webkitvisibilitychange"), i.autoPlay = c.proxy(i.autoPlay, i), i.autoPlayClear = c.proxy(i.autoPlayClear, i), i.autoPlayIterator = c.proxy(i.autoPlayIterator, i), i.changeSlide = c.proxy(i.changeSlide, i), i.clickHandler = c.proxy(i.clickHandler, i), i.selectHandler = c.proxy(i.selectHandler, i), i.setPosition = c.proxy(i.setPosition, i), i.swipeHandler = c.proxy(i.swipeHandler, i), i.dragHandler = c.proxy(i.dragHandler, i), i.keyHandler = c.proxy(i.keyHandler, i), i.instanceUid = s++,
                    // A simple way to check for HTML strings
                    // Strict HTML recognition (must start with <)
                    // Extracted from jQuery v1.11 source
                    i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, i.registerBreakpoints(), i.init(!0)
            }
            var s = 0;
            return e
        }()).prototype.activateADA = function() {
            var e;
            this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, a.prototype.addSlide = a.prototype.slickAdd = function(e, t, i) {
            var o = this;
            if ("boolean" == typeof t) i = t, t = null;
            else if (t < 0 || t >= o.slideCount) return !1;
            o.unload(), "number" == typeof t ? 0 === t && 0 === o.$slides.length ? c(e).appendTo(o.$slideTrack) : i ? c(e).insertBefore(o.$slides.eq(t)) : c(e).insertAfter(o.$slides.eq(t)) : !0 === i ? c(e).prependTo(o.$slideTrack) : c(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(e, t) {
                c(t).attr("data-slick-index", e)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, a.prototype.animateHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({
                    height: t
                }, e.options.speed)
            }
        }, a.prototype.animateSlide = function(e, t) {
            var i = {},
                o = this;
            o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
                left: e
            }, o.options.speed, o.options.easing, t) : o.$slideTrack.animate({
                top: e
            }, o.options.speed, o.options.easing, t) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), c({
                animStart: o.currentLeft
            }).animate({
                animStart: e
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(e) {
                    e = Math.ceil(e), !1 === o.options.vertical ? i[o.animType] = "translate(" + e + "px, 0px)" : i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i)
                },
                complete: function() {
                    t && t.call()
                }
            })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(i), t && setTimeout(function() {
                o.disableTransition(), t.call()
            }, o.options.speed))
        }, a.prototype.getNavTarget = function() {
            var e = this,
                t = e.options.asNavFor;
            return t && null !== t && (t = c(t).not(e.$slider)), t
        }, a.prototype.asNavFor = function(t) {
            var e, i = this.getNavTarget();
            null !== i && "object" == typeof i && i.each(function() {
                var e = c(this).slick("getSlick");
                e.unslicked || e.slideHandler(t, !0)
            })
        }, a.prototype.applyTransition = function(e) {
            var t = this,
                i = {};
            !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
        }, a.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, a.prototype.autoPlayClear = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
        }, a.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
        }, a.prototype.buildArrows = function() {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = c(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = c(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, a.prototype.buildDots = function() {
            var e = this,
                t, i;
            if (!0 === e.options.dots && e.slideCount > e.options.slidesToShow) {
                for (e.$slider.addClass("slick-dotted"), i = c("<ul />").addClass(e.options.dotsClass), t = 0; t <= e.getDotCount(); t += 1) i.append(c("<li />").append(e.options.customPaging.call(this, e, t)));
                e.$dots = i.appendTo(e.options.appendDots), e.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, a.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                c(t).attr("data-slick-index", e).data("originalStyling", c(t).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? c('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), c("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, a.prototype.buildRows = function() {
            var e = this,
                t, i, o, s, n, r, a;
            if (s = document.createDocumentFragment(), r = e.$slider.children(), 1 < e.options.rows) {
                for (a = e.options.slidesPerRow * e.options.rows, n = Math.ceil(r.length / a), t = 0; t < n; t++) {
                    var l = document.createElement("div");
                    for (i = 0; i < e.options.rows; i++) {
                        var d = document.createElement("div");
                        for (o = 0; o < e.options.slidesPerRow; o++) {
                            var c = t * a + (i * e.options.slidesPerRow + o);
                            r.get(c) && d.appendChild(r.get(c))
                        }
                        l.appendChild(d)
                    }
                    s.appendChild(l)
                }
                e.$slider.empty().append(s), e.$slider.children().children().children().css({
                    width: 100 / e.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, a.prototype.checkResponsive = function(e, t) {
            var i = this,
                o, s, n, r = !1,
                a = i.$slider.width(),
                l = window.innerWidth || c(window).width();
            if ("window" === i.respondTo ? n = l : "slider" === i.respondTo ? n = a : "min" === i.respondTo && (n = Math.min(l, a)), i.options.responsive && i.options.responsive.length && null !== i.options.responsive) {
                for (o in s = null, i.breakpoints) i.breakpoints.hasOwnProperty(o) && (!1 === i.originalSettings.mobileFirst ? n < i.breakpoints[o] && (s = i.breakpoints[o]) : n > i.breakpoints[o] && (s = i.breakpoints[o]));
                null !== s ? null !== i.activeBreakpoint ? (s !== i.activeBreakpoint || t) && (i.activeBreakpoint = s, "unslick" === i.breakpointSettings[s] ? i.unslick(s) : (i.options = c.extend({}, i.originalSettings, i.breakpointSettings[s]), !0 === e && (i.currentSlide = i.options.initialSlide), i.refresh(e)), r = s) : (i.activeBreakpoint = s, "unslick" === i.breakpointSettings[s] ? i.unslick(s) : (i.options = c.extend({}, i.originalSettings, i.breakpointSettings[s]), !0 === e && (i.currentSlide = i.options.initialSlide), i.refresh(e)), r = s) : null !== i.activeBreakpoint && (i.activeBreakpoint = null, i.options = i.originalSettings, !0 === e && (i.currentSlide = i.options.initialSlide), i.refresh(e), r = s),
                    // only trigger breakpoints during an actual break. not on initialize.
                    e || !1 === r || i.$slider.trigger("breakpoint", [i, r])
            }
        }, a.prototype.changeSlide = function(e, t) {
            var i = this,
                o = c(e.currentTarget),
                s, n, r;
            // If target is a link, prevent default action.
            switch (o.is("a") && e.preventDefault(),
                // If target is not the <li> element (ie: a child), find the <li>.
                o.is("li") || (o = o.closest("li")), s = (r = i.slideCount % i.options.slidesToScroll != 0) ? 0 : (i.slideCount - i.currentSlide) % i.options.slidesToScroll, e.data.message) {
                case "previous":
                    n = 0 === s ? i.options.slidesToScroll : i.options.slidesToShow - s, i.slideCount > i.options.slidesToShow && i.slideHandler(i.currentSlide - n, !1, t);
                    break;
                case "next":
                    n = 0 === s ? i.options.slidesToScroll : s, i.slideCount > i.options.slidesToShow && i.slideHandler(i.currentSlide + n, !1, t);
                    break;
                case "index":
                    var a = 0 === e.data.index ? 0 : e.data.index || o.index() * i.options.slidesToScroll;
                    i.slideHandler(i.checkNavigable(a), !1, t), o.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, a.prototype.checkNavigable = function(e) {
            var t, i, o;
            if (o = 0, e > (i = this.getNavigableIndexes())[i.length - 1]) e = i[i.length - 1];
            else
                for (var s in i) {
                    if (e < i[s]) {
                        e = o;
                        break
                    }
                    o = i[s]
                }
            return e
        }, a.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && c("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", c.proxy(e.interrupt, e, !0)).off("mouseleave.slick", c.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), c(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().off("click.slick", e.selectHandler), c(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), c(window).off("resize.slick.slick-" + e.instanceUid, e.resize), c("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), c(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), c(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, a.prototype.cleanUpSlideEvents = function() {
            var e = this;
            e.$list.off("mouseenter.slick", c.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", c.proxy(e.interrupt, e, !1))
        }, a.prototype.cleanUpRows = function() {
            var e = this,
                t;
            1 < e.options.rows && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t))
        }, a.prototype.clickHandler = function(e) {
            var t;
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, a.prototype.destroy = function(e) {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), c(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                c(this).attr("style", c(this).data("originalStyling"))
            }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
        }, a.prototype.disableTransition = function(e) {
            var t = this,
                i = {};
            i[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
        }, a.prototype.fadeSlide = function(e, t) {
            var i = this;
            !1 === i.cssTransitions ? (i.$slides.eq(e).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(e).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), t && setTimeout(function() {
                i.disableTransition(e), t.call()
            }, i.options.speed))
        }, a.prototype.fadeSlideOut = function(e) {
            var t = this;
            !1 === t.cssTransitions ? t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, a.prototype.filterSlides = a.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
        }, a.prototype.focusHandler = function() {
            var i = this;
            i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(e) {
                e.stopImmediatePropagation();
                var t = c(this);
                setTimeout(function() {
                    i.options.pauseOnFocus && (i.focussed = t.is(":focus"), i.autoPlay())
                }, 0)
            })
        }, a.prototype.getCurrent = a.prototype.slickCurrentSlide = function() {
            var e;
            return this.currentSlide
        }, a.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                i = 0,
                o = 0;
            if (!0 === e.options.infinite)
                for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else if (!0 === e.options.centerMode) o = e.slideCount;
            else if (e.options.asNavFor)
                for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
            return o - 1
        }, a.prototype.getLeft = function(e) {
            var t = this,
                i, o, s = 0,
                n;
            return t.slideOffset = 0, o = t.$slides.first().outerHeight(!0), !0 === t.options.infinite ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, s = o * t.options.slidesToShow * -1), t.slideCount % t.options.slidesToScroll != 0 && e + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (s = e > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (e - t.slideCount)) * t.slideWidth * -1, (t.options.slidesToShow - (e - t.slideCount)) * o * -1) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, t.slideCount % t.options.slidesToScroll * o * -1))) : e + t.options.slidesToShow > t.slideCount && (t.slideOffset = (e + t.options.slidesToShow - t.slideCount) * t.slideWidth, s = (e + t.options.slidesToShow - t.slideCount) * o), t.slideCount <= t.options.slidesToShow && (s = t.slideOffset = 0), !0 === t.options.centerMode && !0 === t.options.infinite ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : !0 === t.options.centerMode && (t.slideOffset = 0, t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)), i = !1 === t.options.vertical ? e * t.slideWidth * -1 + t.slideOffset : e * o * -1 + s, !0 === t.options.variableWidth && (n = t.slideCount <= t.options.slidesToShow || !1 === t.options.infinite ? t.$slideTrack.children(".slick-slide").eq(e) : t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow), i = !0 === t.options.rtl ? n[0] ? -1 * (t.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === t.options.centerMode && (n = t.slideCount <= t.options.slidesToShow || !1 === t.options.infinite ? t.$slideTrack.children(".slick-slide").eq(e) : t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow + 1), i = !0 === t.options.rtl ? n[0] ? -1 * (t.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, i += (t.$list.width() - n.outerWidth()) / 2)), i
        }, a.prototype.getOption = a.prototype.slickGetOption = function(e) {
            var t;
            return this.options[e]
        }, a.prototype.getNavigableIndexes = function() {
            var e = this,
                t = 0,
                i = 0,
                o = [],
                s;
            for (s = !1 === e.options.infinite ? e.slideCount : (t = -1 * e.options.slidesToScroll, i = -1 * e.options.slidesToScroll, 2 * e.slideCount); t < s;) o.push(t), t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return o
        }, a.prototype.getSlick = function() {
            return this
        }, a.prototype.getSlideCount = function() {
            var i = this,
                e, o, s;
            return s = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each(function(e, t) {
                if (t.offsetLeft - s + c(t).outerWidth() / 2 > -1 * i.swipeLeft) return o = t, !1
            }), e = Math.abs(c(o).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
        }, a.prototype.goTo = a.prototype.slickGoTo = function(e, t) {
            var i;
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, a.prototype.init = function(e) {
            var t = this;
            c(t.$slider).hasClass("slick-initialized") || (c(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, a.prototype.initADA = function() {
            var t = this;
            t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(e) {
                c(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + t.instanceUid + e
                })
            }), null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(e) {
                c(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + t.instanceUid + e,
                    id: "slick-slide" + t.instanceUid + e
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
        }, a.prototype.initArrowEvents = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, a.prototype.initDotEvents = function() {
            var e = this;
            !0 === e.options.dots && e.slideCount > e.options.slidesToShow && c("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && c("li", e.$dots).on("mouseenter.slick", c.proxy(e.interrupt, e, !0)).on("mouseleave.slick", c.proxy(e.interrupt, e, !1))
        }, a.prototype.initSlideEvents = function() {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", c.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", c.proxy(e.interrupt, e, !1)))
        }, a.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), c(document).on(e.visibilityChange, c.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), c(window).on("orientationchange.slick.slick-" + e.instanceUid, c.proxy(e.orientationChange, e)), c(window).on("resize.slick.slick-" + e.instanceUid, c.proxy(e.resize, e)), c("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), c(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), c(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, a.prototype.initUI = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
        }, a.prototype.keyHandler = function(e) {
            var t = this;
            //Dont slide if the cursor is inside the form fields and arrow keys are pressed
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "next" : "previous"
                }
            }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "previous" : "next"
                }
            }))
        }, a.prototype.lazyLoad = function() {
            function e(e) {
                c("img[data-lazy]", e).each(function() {
                    var e = c(this),
                        t = c(this).attr("data-lazy"),
                        i = document.createElement("img");
                    i.onload = function() {
                        e.animate({
                            opacity: 0
                        }, 100, function() {
                            e.attr("src", t).animate({
                                opacity: 1
                            }, 200, function() {
                                e.removeAttr("data-lazy").removeClass("slick-loading")
                            }), o.$slider.trigger("lazyLoaded", [o, e, t])
                        })
                    }, i.onerror = function() {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), o.$slider.trigger("lazyLoadError", [o, e, t])
                    }, i.src = t
                })
            }
            var o = this,
                t, i, s, n;
            !0 === o.options.centerMode ? n = !0 === o.options.infinite ? (s = o.currentSlide + (o.options.slidesToShow / 2 + 1)) + o.options.slidesToShow + 2 : (s = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1)), o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide) : (s = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide, n = Math.ceil(s + o.options.slidesToShow), !0 === o.options.fade && (0 < s && s--, n <= o.slideCount && n++)), e(t = o.$slider.find(".slick-slide").slice(s, n)), o.slideCount <= o.options.slidesToShow ? e(i = o.$slider.find(".slick-slide")) : o.currentSlide >= o.slideCount - o.options.slidesToShow ? e(i = o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)) : 0 === o.currentSlide && e(i = o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow))
        }, a.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.$slideTrack.css({
                opacity: 1
            }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, a.prototype.next = a.prototype.slickNext = function() {
            var e;
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, a.prototype.orientationChange = function() {
            var e = this;
            e.checkResponsive(), e.setPosition()
        }, a.prototype.pause = a.prototype.slickPause = function() {
            var e = this;
            e.autoPlayClear(), e.paused = !0
        }, a.prototype.play = a.prototype.slickPlay = function() {
            var e = this;
            e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
        }, a.prototype.postSlide = function(e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && t.initADA())
        }, a.prototype.prev = a.prototype.slickPrev = function() {
            var e;
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, a.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, a.prototype.progressiveLazyLoad = function(e) {
            e = e || 1;
            var t = this,
                i = c("img[data-lazy]", t.$slider),
                o, s, n;
            i.length ? (o = i.first(), s = o.attr("data-lazy"), (n = document.createElement("img")).onload = function() {
                o.attr("src", s).removeAttr("data-lazy").removeClass("slick-loading"), !0 === t.options.adaptiveHeight && t.setPosition(), t.$slider.trigger("lazyLoaded", [t, o, s]), t.progressiveLazyLoad()
            }, n.onerror = function() {
                e < 3 ?
                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout(function() {
                        t.progressiveLazyLoad(e + 1)
                    }, 500) : (o.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), t.$slider.trigger("lazyLoadError", [t, o, s]), t.progressiveLazyLoad())
            }, n.src = s) : t.$slider.trigger("allImagesLoaded", [t])
        }, a.prototype.refresh = function(e) {
            var t = this,
                i, o;
            o = t.slideCount - t.options.slidesToShow,
                // in non-infinite sliders, we don't want to go past the
                // last visible index.
                !t.options.infinite && t.currentSlide > o && (t.currentSlide = o),
                // if less slides than to show, go to start.
                t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), i = t.currentSlide, t.destroy(!0), c.extend(t, t.initials, {
                    currentSlide: i
                }), t.init(), e || t.changeSlide({
                    data: {
                        message: "index",
                        index: i
                    }
                }, !1)
        }, a.prototype.registerBreakpoints = function() {
            var i = this,
                e, t, o, s = i.options.responsive || null;
            if ("array" === c.type(s) && s.length) {
                for (e in i.respondTo = i.options.respondTo || "window", s)
                    if (o = i.breakpoints.length - 1, t = s[e].breakpoint, s.hasOwnProperty(e)) {
                        // loop through the breakpoints and cut out any existing
                        // ones with the same breakpoint number, we don't want dupes.
                        for (; 0 <= o;) i.breakpoints[o] && i.breakpoints[o] === t && i.breakpoints.splice(o, 1), o--;
                        i.breakpoints.push(t), i.breakpointSettings[t] = s[e].settings
                    }
                i.breakpoints.sort(function(e, t) {
                    return i.options.mobileFirst ? e - t : t - e
                })
            }
        }, a.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, a.prototype.resize = function() {
            var e = this;
            c(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = c(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, a.prototype.removeSlide = a.prototype.slickRemove = function(e, t, i) {
            var o = this;
            if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : o.slideCount - 1 : !0 === t ? --e : e, o.slideCount < 1 || e < 0 || e > o.slideCount - 1) return !1;
            o.unload(), !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
        }, a.prototype.setCSS = function(e) {
            var t = this,
                i = {},
                o, s;
            !0 === t.options.rtl && (e = -e), o = "left" == t.positionProp ? Math.ceil(e) + "px" : "0px", s = "top" == t.positionProp ? Math.ceil(e) + "px" : "0px", i[t.positionProp] = e, !1 === t.transformsEnabled || (!(i = {}) === t.cssTransitions ? i[t.animType] = "translate(" + o + ", " + s + ")" : i[t.animType] = "translate3d(" + o + ", " + s + ", 0px)"), t.$slideTrack.css(i)
        }, a.prototype.setDimensions = function() {
            var e = this;
            !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, a.prototype.setFade = function() {
            var i = this,
                o;
            i.$slides.each(function(e, t) {
                o = i.slideWidth * e * -1, !0 === i.options.rtl ? c(t).css({
                    position: "relative",
                    right: o,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                }) : c(t).css({
                    position: "relative",
                    left: o,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                })
            }), i.$slides.eq(i.currentSlide).css({
                zIndex: i.options.zIndex - 1,
                opacity: 1
            })
        }, a.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", t)
            }
        }, a.prototype.setOption = a.prototype.slickSetOption = function(e, t, i) {
            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */
            var o = this,
                s, n, r, a, l = !1,
                d;
            if ("object" === c.type(e) ? (r = e, l = t, d = "multiple") : "string" === c.type(e) && (a = t, l = i, "responsive" === (r = e) && "array" === c.type(t) ? d = "responsive" : void 0 !== t && (d = "single")), "single" === d) o.options[r] = a;
            else if ("multiple" === d) c.each(r, function(e, t) {
                o.options[e] = t
            });
            else if ("responsive" === d)
                for (n in a)
                    if ("array" !== c.type(o.options.responsive)) o.options.responsive = [a[n]];
                    else {
                        // loop through the responsive object and splice out duplicates.
                        for (s = o.options.responsive.length - 1; 0 <= s;) o.options.responsive[s].breakpoint === a[n].breakpoint && o.options.responsive.splice(s, 1), s--;
                        o.options.responsive.push(a[n])
                    }
            l && (o.unload(), o.reinit())
        }, a.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
        }, a.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
        }, a.prototype.setSlideClasses = function(e) {
            var t = this,
                i, o, s, n;
            o = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), t.$slides.eq(e).addClass("slick-current"), !0 === t.options.centerMode ? (i = Math.floor(t.options.slidesToShow / 2), !0 === t.options.infinite && (i <= e && e <= t.slideCount - 1 - i ? t.$slides.slice(e - i, e + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = t.options.slidesToShow + e, o.slice(s - i + 1, s + i + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? o.eq(o.length - 1 - t.options.slidesToShow).addClass("slick-center") : e === t.slideCount - 1 && o.eq(t.options.slidesToShow).addClass("slick-center")), t.$slides.eq(e).addClass("slick-center")) : 0 <= e && e <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(e, e + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : o.length <= t.options.slidesToShow ? o.addClass("slick-active").attr("aria-hidden", "false") : (n = t.slideCount % t.options.slidesToShow, s = !0 === t.options.infinite ? t.options.slidesToShow + e : e, t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - e < t.options.slidesToShow ? o.slice(s - (t.options.slidesToShow - n), s + n).addClass("slick-active").attr("aria-hidden", "false") : o.slice(s, s + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === t.options.lazyLoad && t.lazyLoad()
        }, a.prototype.setupInfinite = function() {
            var e = this,
                t, i, o;
            if (!0 === e.options.fade && (e.options.centerMode = !1), !0 === e.options.infinite && !1 === e.options.fade && (i = null, e.slideCount > e.options.slidesToShow)) {
                for (o = !0 === e.options.centerMode ? e.options.slidesToShow + 1 : e.options.slidesToShow, t = e.slideCount; t > e.slideCount - o; t -= 1) i = t - 1, c(e.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned");
                for (t = 0; t < o; t += 1) i = t, c(e.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned");
                e.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    c(this).attr("id", "")
                })
            }
        }, a.prototype.interrupt = function(e) {
            var t = this;
            e || t.autoPlay(), t.interrupted = e
        }, a.prototype.selectHandler = function(e) {
            var t = this,
                i = c(e.target).is(".slick-slide") ? c(e.target) : c(e.target).parents(".slick-slide"),
                o = parseInt(i.attr("data-slick-index"));
            if (o || (o = 0), t.slideCount <= t.options.slidesToShow) return t.setSlideClasses(o), void t.asNavFor(o);
            t.slideHandler(o)
        }, a.prototype.slideHandler = function(e, t, i) {
            var o, s, n, r, a = null,
                l = this,
                d;
            if (t = t || !1, (!0 !== l.animating || !0 !== l.options.waitForAnimate) && !(!0 === l.options.fade && l.currentSlide === e || l.slideCount <= l.options.slidesToShow))
                if (!1 === t && l.asNavFor(e), o = e, a = l.getLeft(o), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, !1 === l.options.infinite && !1 === l.options.centerMode && (e < 0 || e > l.getDotCount() * l.options.slidesToScroll)) !1 === l.options.fade && (o = l.currentSlide, !0 !== i ? l.animateSlide(r, function() {
                    l.postSlide(o)
                }) : l.postSlide(o));
                else if (!1 === l.options.infinite && !0 === l.options.centerMode && (e < 0 || e > l.slideCount - l.options.slidesToScroll)) !1 === l.options.fade && (o = l.currentSlide, !0 !== i ? l.animateSlide(r, function() {
                l.postSlide(o)
            }) : l.postSlide(o));
            else {
                if (l.options.autoplay && clearInterval(l.autoPlayTimer), s = o < 0 ? l.slideCount % l.options.slidesToScroll != 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + o : o >= l.slideCount ? l.slideCount % l.options.slidesToScroll != 0 ? 0 : o - l.slideCount : o, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, s]), n = l.currentSlide, l.currentSlide = s, l.setSlideClasses(l.currentSlide), l.options.asNavFor && (d = (d = l.getNavTarget()).slick("getSlick")).slideCount <= d.options.slidesToShow && d.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), !0 === l.options.fade) return !0 !== i ? (l.fadeSlideOut(n), l.fadeSlide(s, function() {
                    l.postSlide(s)
                })) : l.postSlide(s), void l.animateHeight();
                !0 !== i ? l.animateSlide(a, function() {
                    l.postSlide(s)
                }) : l.postSlide(s)
            }
        }, a.prototype.startLoad = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, a.prototype.swipeDirection = function() {
            var e, t, i, o, s = this;
            return e = s.touchObject.startX - s.touchObject.curX, t = s.touchObject.startY - s.touchObject.curY, i = Math.atan2(t, e), (o = Math.round(180 * i / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && 0 <= o ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && 315 <= o ? !1 === s.options.rtl ? "left" : "right" : 135 <= o && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? 35 <= o && o <= 135 ? "down" : "up" : "vertical"
        }, a.prototype.swipeEnd = function(e) {
            var t = this,
                i, o;
            if (t.dragging = !1, t.interrupted = !1, t.shouldClick = !(10 < t.touchObject.swipeLength), void 0 === t.touchObject.curX) return !1;
            if (!0 === t.touchObject.edgeHit && t.$slider.trigger("edge", [t, t.swipeDirection()]), t.touchObject.swipeLength >= t.touchObject.minSwipe) {
                switch (o = t.swipeDirection()) {
                    case "left":
                    case "down":
                        i = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide + t.getSlideCount()) : t.currentSlide + t.getSlideCount(), t.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        i = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide - t.getSlideCount()) : t.currentSlide - t.getSlideCount(), t.currentDirection = 1;
                        break;
                    default:
                }
                "vertical" != o && (t.slideHandler(i), t.touchObject = {}, t.$slider.trigger("swipe", [t, o]))
            } else t.touchObject.startX !== t.touchObject.curX && (t.slideHandler(t.currentSlide), t.touchObject = {})
        }, a.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e);
                    break
            }
        }, a.prototype.swipeMove = function(e) {
            var t = this,
                i = !1,
                o, s, n, r, a;
            return a = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!t.dragging || a && 1 !== a.length) && (o = t.getLeft(t.currentSlide), t.touchObject.curX = void 0 !== a ? a[0].pageX : e.clientX, t.touchObject.curY = void 0 !== a ? a[0].pageY : e.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), !0 === t.options.verticalSwiping && (t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)))), "vertical" !== (s = t.swipeDirection()) ? (void 0 !== e.originalEvent && 4 < t.touchObject.swipeLength && e.preventDefault(), r = (!1 === t.options.rtl ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1), !0 === t.options.verticalSwiping && (r = t.touchObject.curY > t.touchObject.startY ? 1 : -1), n = t.touchObject.swipeLength, (t.touchObject.edgeHit = !1) === t.options.infinite && (0 === t.currentSlide && "right" === s || t.currentSlide >= t.getDotCount() && "left" === s) && (n = t.touchObject.swipeLength * t.options.edgeFriction, t.touchObject.edgeHit = !0), !1 === t.options.vertical ? t.swipeLeft = o + n * r : t.swipeLeft = o + n * (t.$list.height() / t.listWidth) * r, !0 === t.options.verticalSwiping && (t.swipeLeft = o + n * r), !0 !== t.options.fade && !1 !== t.options.touchMove && (!0 === t.animating ? (t.swipeLeft = null, !1) : void t.setCSS(t.swipeLeft))) : void 0)
        }, a.prototype.swipeStart = function(e) {
            var t = this,
                i;
            if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return !(t.touchObject = {});
            void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (i = e.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== i ? i.pageX : e.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== i ? i.pageY : e.clientY, t.dragging = !0
        }, a.prototype.unfilterSlides = a.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
        }, a.prototype.unload = function() {
            var e = this;
            c(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, a.prototype.unslick = function(e) {
            var t = this;
            t.$slider.trigger("unslick", [t, e]), t.destroy()
        }, a.prototype.updateArrows = function() {
            var e = this,
                t;
            t = Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, a.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, a.prototype.visibility = function() {
            var e = this;
            e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
        }, c.fn.slick = function(e) {
            var t = this,
                i = e,
                o = Array.prototype.slice.call(arguments, 1),
                s = t.length,
                n, r;
            for (n = 0; n < s; n++)
                if ("object" == typeof i || void 0 === i ? t[n].slick = new a(t[n], i) : r = t[n].slick[i].apply(t[n].slick, o), void 0 !== r) return r;
            return t
        }
    }); /*! npm.im/object-fit-images 3.2.4 */
var objectFitImages = function() {
    "use strict";

    function s(e, t) {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + e + "' height='" + t + "'%3E%3C/svg%3E"
    }

    function o(e) {
        if (e.srcset && !i && window.picturefill) {
            var t = window.picturefill._;
            // parse srcset with picturefill where currentSrc isn't available
            e[t.ns] && e[t.ns].evaled ||
                // force synchronous srcset parsing
                t.fillImg(e, {
                    reselect: !0
                }), e[t.ns].curSrc || (
                    // force picturefill to parse srcset
                    e[t.ns].supported = !1, t.fillImg(e, {
                        reselect: !0
                    })),
                // retrieve parsed currentSrc, if any
                e.currentSrc = e[t.ns].curSrc || e.src
        }
    }

    function n(e) {
        for (var t = getComputedStyle(e).fontFamily, i, o = {}; null !== (i = p.exec(t));) o[i[1]] = i[2];
        return o
    }

    function r(e, t, i) {
        // Default: fill width, no height
        var o = s(t || 1, i || 0);
        // Only set placeholder if it's different
        f.call(e, "src") !== o && v.call(e, "src", o)
    }

    function a(e, t) {
        // naturalWidth is only available when the image headers are loaded,
        // this loop will poll it every 100ms.
        e.naturalWidth ? t(e) : setTimeout(a, 100, e, t)
    }

    function l(t) {
        var e = n(t),
            i = t[u]; // default value
        // Avoid running where unnecessary, unless OFI had already done its deed
        if (e["object-fit"] = e["object-fit"] || "fill", !i.img) {
            // fill is the default behavior so no action is necessary
            if ("fill" === e["object-fit"]) return;
            // Where object-fit is supported and object-position isn't (Safari < 10)
            if (!i.skipTest && // unless user wants to apply regardless of browser support
                h && // if browser already supports object-fit
                !e["object-position"]) return
        }
        // keep a clone in memory while resetting the original to a blank
        if (!i.img) {
            i.img = new Image(t.width, t.height), i.img.srcset = f.call(t, "data-ofi-srcset") || t.srcset, i.img.src = f.call(t, "data-ofi-src") || t.src,
                // preserve for any future cloneNode calls
                // https://github.com/bfred-it/object-fit-images/issues/53
                v.call(t, "data-ofi-src", t.src), t.srcset && v.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height),
                // remove srcset because it overrides src
                t.srcset && (t.srcset = "");
            try {
                d(t)
            } catch (e) {
                window.console && console.warn("https://bit.ly/ofi-old-browser")
            }
        }
        o(i.img), t.style.backgroundImage = 'url("' + (i.img.currentSrc || i.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = e["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(e["object-fit"]) ? a(i.img, function() {
            i.img.naturalWidth > t.width || i.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto"
        }) : t.style.backgroundSize = e["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), a(i.img, function(e) {
            r(t, e.naturalWidth, e.naturalHeight)
        })
    }

    function d(o) {
        var t = {
            get: function e(t) {
                return o[u].img[t || "src"]
            },
            set: function e(t, i) {
                return o[u].img[i || "src"] = t, v.call(o, "data-ofi-" + i, t), // preserve for any future cloneNode
                    l(o), t
            }
        };
        Object.defineProperty(o, "src", t), Object.defineProperty(o, "currentSrc", {
            get: function() {
                return t.get("currentSrc")
            }
        }), Object.defineProperty(o, "srcset", {
            get: function() {
                return t.get("srcset")
            },
            set: function(e) {
                return t.set(e, "srcset")
            }
        })
    }

    function e() {
        function i(e, t) {
            return e[u] && e[u].img && ("src" === t || "srcset" === t) ? e[u].img : e
        }
        m || (HTMLImageElement.prototype.getAttribute = function(e) {
            return f.call(i(this, e), e)
        }, HTMLImageElement.prototype.setAttribute = function(e, t) {
            return v.call(i(this, e), e, String(t))
        })
    }

    function c(e, t) {
        var i = !y && !e;
        if (t = t || {}, e = e || "img", m && !t.skipTest || !g) return !1;
        // use imgs as a selector or just select all images
        "img" === e ? e = document.getElementsByTagName("img") : "string" == typeof e ? e = document.querySelectorAll(e) : "length" in e || (e = [e]);
        // apply fix to all
        for (var o = 0; o < e.length; o++) e[o][u] = e[o][u] || {
            skipTest: t.skipTest
        }, l(e[o]);
        i && (document.body.addEventListener("load", function(e) {
                "IMG" === e.target.tagName && c(e.target, {
                    skipTest: t.skipTest
                })
            }, !0), y = !0, e = "img"),
            // if requested, watch media queries for object-fit change
            t.watchMQ && window.addEventListener("resize", c.bind(null, e, {
                skipTest: t.skipTest
            }))
    }
    var u = "bfred-it:object-fit-images",
        p = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,
        t = "undefined" == typeof Image ? {
            style: {
                "object-position": 1
            }
        } : new Image,
        h = "object-fit" in t.style,
        m = "object-position" in t.style,
        g = "background-size" in t.style,
        i = "string" == typeof t.currentSrc,
        f = t.getAttribute,
        v = t.setAttribute,
        y = !1;
    return c.supportsObjectFit = h, c.supportsObjectPosition = m, e(), c
}();
/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */
/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */
"function" != typeof Object.create && (Object.create = function(e) {
        function t() {}
        return t.prototype = e, new t
    }),
    function(l, d, c) {
        var i = {
            init: function(e, t) {
                var i = this;
                i.$elem = l(t), i.options = l.extend({}, l.fn.owlCarousel.options, i.$elem.data(), e), i.userOptions = e, i.loadContent()
            },
            loadContent: function() {
                function e(e) {
                    var t, i = "";
                    if ("function" == typeof o.options.jsonSuccess) o.options.jsonSuccess.apply(this, [e]);
                    else {
                        for (t in e.owl) e.owl.hasOwnProperty(t) && (i += e.owl[t].item);
                        o.$elem.html(i)
                    }
                    o.logIn()
                }
                var o = this,
                    t;
                "function" == typeof o.options.beforeInit && o.options.beforeInit.apply(this, [o.$elem]), "string" == typeof o.options.jsonPath ? (t = o.options.jsonPath, l.getJSON(t, e)) : o.logIn()
            },
            logIn: function() {
                var e = this;
                e.$elem.data("owl-originalStyles", e.$elem.attr("style")), e.$elem.data("owl-originalClasses", e.$elem.attr("class")), e.$elem.css({
                    opacity: 0
                }), e.orignalItems = e.options.items, e.checkBrowser(), e.wrapperWidth = 0, e.checkVisible = null, e.setVars()
            },
            setVars: function() {
                var e = this;
                if (0 === e.$elem.children().length) return !1;
                e.baseClass(), e.eventTypes(), e.$userItems = e.$elem.children(), e.itemsAmount = e.$userItems.length, e.wrapItems(), e.$owlItems = e.$elem.find(".owl-item"), e.$owlWrapper = e.$elem.find(".owl-wrapper"), e.playDirection = "next", e.prevItem = 0, e.prevArr = [0], e.currentItem = 0, e.customEvents(), e.onStartup()
            },
            onStartup: function() {
                var e = this;
                e.updateItems(), e.calculateAll(), e.buildControls(), e.updateControls(), e.response(), e.moveEvents(), e.stopOnHover(), e.owlStatus(), !1 !== e.options.transitionStyle && e.transitionTypes(e.options.transitionStyle), !0 === e.options.autoPlay && (e.options.autoPlay = 5e3), e.play(), e.$elem.find(".owl-wrapper").css("display", "block"), e.$elem.is(":visible") ? e.$elem.css("opacity", 1) : e.watchVisibility(), e.onstartup = !1, e.eachMoveUpdate(), "function" == typeof e.options.afterInit && e.options.afterInit.apply(this, [e.$elem])
            },
            eachMoveUpdate: function() {
                var e = this;
                !0 === e.options.lazyLoad && e.lazyLoad(), !0 === e.options.autoHeight && e.autoHeight(), e.onVisibleItems(), "function" == typeof e.options.afterAction && e.options.afterAction.apply(this, [e.$elem])
            },
            updateVars: function() {
                var e = this;
                "function" == typeof e.options.beforeUpdate && e.options.beforeUpdate.apply(this, [e.$elem]), e.watchVisibility(), e.updateItems(), e.calculateAll(), e.updatePosition(), e.updateControls(), e.eachMoveUpdate(), "function" == typeof e.options.afterUpdate && e.options.afterUpdate.apply(this, [e.$elem])
            },
            reload: function() {
                var e = this;
                d.setTimeout(function() {
                    e.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var e = this;
                if (!1 !== e.$elem.is(":visible")) return !1;
                e.$elem.css({
                    opacity: 0
                }), d.clearInterval(e.autoPlayInterval), d.clearInterval(e.checkVisible), e.checkVisible = d.setInterval(function() {
                    e.$elem.is(":visible") && (e.reload(), e.$elem.animate({
                        opacity: 1
                    }, 200), d.clearInterval(e.checkVisible))
                }, 500)
            },
            wrapItems: function() {
                var e = this;
                e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), e.wrapperOuter = e.$elem.find(".owl-wrapper-outer"), e.$elem.css("display", "block")
            },
            baseClass: function() {
                var e = this,
                    t = e.$elem.hasClass(e.options.baseClass),
                    i = e.$elem.hasClass(e.options.theme);
                t || e.$elem.addClass(e.options.baseClass), i || e.$elem.addClass(e.options.theme)
            },
            updateItems: function() {
                var e = this,
                    t, i;
                if (!1 === e.options.responsive) return !1;
                if (!0 === e.options.singleItem) return e.options.items = e.orignalItems = 1, e.options.itemsCustom = !1, e.options.itemsDesktop = !1, e.options.itemsDesktopSmall = !1, e.options.itemsTablet = !1, e.options.itemsTabletSmall = !1, e.options.itemsMobile = !1;
                if ((t = l(e.options.responsiveBaseWidth).width()) > (e.options.itemsDesktop[0] || e.orignalItems) && (e.options.items = e.orignalItems), !1 !== e.options.itemsCustom)
                    for (
                        //Reorder array by screen size
                        e.options.itemsCustom.sort(function(e, t) {
                            return e[0] - t[0]
                        }), i = 0; i < e.options.itemsCustom.length; i += 1) e.options.itemsCustom[i][0] <= t && (e.options.items = e.options.itemsCustom[i][1]);
                else t <= e.options.itemsDesktop[0] && !1 !== e.options.itemsDesktop && (e.options.items = e.options.itemsDesktop[1]), t <= e.options.itemsDesktopSmall[0] && !1 !== e.options.itemsDesktopSmall && (e.options.items = e.options.itemsDesktopSmall[1]), t <= e.options.itemsTablet[0] && !1 !== e.options.itemsTablet && (e.options.items = e.options.itemsTablet[1]), t <= e.options.itemsTabletSmall[0] && !1 !== e.options.itemsTabletSmall && (e.options.items = e.options.itemsTabletSmall[1]), t <= e.options.itemsMobile[0] && !1 !== e.options.itemsMobile && (e.options.items = e.options.itemsMobile[1]);
                //if number of items is less than declared
                e.options.items > e.itemsAmount && !0 === e.options.itemsScaleUp && (e.options.items = e.itemsAmount)
            },
            response: function() {
                var e = this,
                    t, i;
                if (!0 !== e.options.responsive) return !1;
                i = l(d).width(), e.resizer = function() {
                    l(d).width() !== i && (!1 !== e.options.autoPlay && d.clearInterval(e.autoPlayInterval), d.clearTimeout(t), t = d.setTimeout(function() {
                        i = l(d).width(), e.updateVars()
                    }, e.options.responsiveRefreshRate))
                }, l(d).resize(e.resizer)
            },
            updatePosition: function() {
                var e = this;
                e.jumpTo(e.currentItem), !1 !== e.options.autoPlay && e.checkAp()
            },
            appendItemsSizes: function() {
                var i = this,
                    o = 0,
                    s = i.itemsAmount - i.options.items;
                i.$owlItems.each(function(e) {
                    var t = l(this);
                    t.css({
                        width: i.itemWidth
                    }).data("owl-item", Number(e)), e % i.options.items != 0 && e !== s || s < e || (o += 1), t.data("owl-roundPages", o)
                })
            },
            appendWrapperSizes: function() {
                var e = this,
                    t = e.$owlItems.length * e.itemWidth;
                e.$owlWrapper.css({
                    width: 2 * t,
                    left: 0
                }), e.appendItemsSizes()
            },
            calculateAll: function() {
                var e = this;
                e.calculateWidth(), e.appendWrapperSizes(), e.loops(), e.max()
            },
            calculateWidth: function() {
                var e = this;
                e.itemWidth = Math.round(e.$elem.width() / e.options.items)
            },
            max: function() {
                var e = this,
                    t = -1 * (e.itemsAmount * e.itemWidth - e.options.items * e.itemWidth);
                return e.options.items > e.itemsAmount ? (t = e.maximumItem = 0, e.maximumPixels = 0) : (e.maximumItem = e.itemsAmount - e.options.items, e.maximumPixels = t), t
            },
            min: function() {
                return 0
            },
            loops: function() {
                var e = this,
                    t = 0,
                    i = 0,
                    o, s, n;
                for (e.positionsInArray = [0], e.pagesInArray = [], o = 0; o < e.itemsAmount; o += 1) i += e.itemWidth, e.positionsInArray.push(-i), !0 === e.options.scrollPerPage && (n = (s = l(e.$owlItems[o])).data("owl-roundPages")) !== t && (e.pagesInArray[t] = e.positionsInArray[o], t = n)
            },
            buildControls: function() {
                var e = this;
                !0 !== e.options.navigation && !0 !== e.options.pagination || (e.owlControls = l('<div class="owl-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem)), !0 === e.options.pagination && e.buildPagination(), !0 === e.options.navigation && e.buildButtons()
            },
            buildButtons: function() {
                var t = this,
                    e = l('<div class="owl-buttons"/>');
                t.owlControls.append(e), t.buttonPrev = l("<div/>", {
                    class: "owl-prev",
                    html: t.options.navigationText[0] || ""
                }), t.buttonNext = l("<div/>", {
                    class: "owl-next",
                    html: t.options.navigationText[1] || ""
                }), e.append(t.buttonPrev).append(t.buttonNext), e.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(e) {
                    e.preventDefault()
                }), e.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(e) {
                    e.preventDefault(), l(this).hasClass("owl-next") ? t.next() : t.prev()
                })
            },
            buildPagination: function() {
                var t = this;
                t.paginationWrapper = l('<div class="owl-pagination"/>'), t.owlControls.append(t.paginationWrapper), t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(e) {
                    e.preventDefault(), Number(l(this).data("owl-page")) !== t.currentItem && t.goTo(Number(l(this).data("owl-page")), !0)
                })
            },
            updatePagination: function() {
                var e = this,
                    t, i, o, s, n, r;
                if (!1 === e.options.pagination) return !1;
                for (e.paginationWrapper.html(""), t = 0, i = e.itemsAmount - e.itemsAmount % e.options.items, s = 0; s < e.itemsAmount; s += 1) s % e.options.items == 0 && (t += 1, i === s && (o = e.itemsAmount - e.options.items), n = l("<div/>", {
                    class: "owl-page"
                }), r = l("<span></span>", {
                    text: !0 === e.options.paginationNumbers ? t : "",
                    class: !0 === e.options.paginationNumbers ? "owl-numbers" : ""
                }), n.append(r), n.data("owl-page", i === s ? o : s), n.data("owl-roundPages", t), e.paginationWrapper.append(n));
                e.checkPagination()
            },
            checkPagination: function() {
                var e = this;
                if (!1 === e.options.pagination) return !1;
                e.paginationWrapper.find(".owl-page").each(function() {
                    l(this).data("owl-roundPages") === l(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), l(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                var e = this;
                if (!1 === e.options.navigation) return !1;
                !1 === e.options.rewindNav && (0 === e.currentItem && 0 === e.maximumItem ? (e.buttonPrev.addClass("disabled"), e.buttonNext.addClass("disabled")) : 0 === e.currentItem && 0 !== e.maximumItem ? (e.buttonPrev.addClass("disabled"), e.buttonNext.removeClass("disabled")) : e.currentItem === e.maximumItem ? (e.buttonPrev.removeClass("disabled"), e.buttonNext.addClass("disabled")) : 0 !== e.currentItem && e.currentItem !== e.maximumItem && (e.buttonPrev.removeClass("disabled"), e.buttonNext.removeClass("disabled")))
            },
            updateControls: function() {
                var e = this;
                e.updatePagination(), e.checkNavigation(), e.owlControls && (e.options.items >= e.itemsAmount ? e.owlControls.hide() : e.owlControls.show())
            },
            destroyControls: function() {
                var e = this;
                e.owlControls && e.owlControls.remove()
            },
            next: function(e) {
                var t = this;
                if (t.isTransition) return !1;
                if (t.currentItem += !0 === t.options.scrollPerPage ? t.options.items : 1, t.currentItem > t.maximumItem + (!0 === t.options.scrollPerPage ? t.options.items - 1 : 0)) {
                    if (!0 !== t.options.rewindNav) return t.currentItem = t.maximumItem, !1;
                    t.currentItem = 0, e = "rewind"
                }
                t.goTo(t.currentItem, e)
            },
            prev: function(e) {
                var t = this;
                if (t.isTransition) return !1;
                if (!0 === t.options.scrollPerPage && 0 < t.currentItem && t.currentItem < t.options.items ? t.currentItem = 0 : t.currentItem -= !0 === t.options.scrollPerPage ? t.options.items : 1, t.currentItem < 0) {
                    if (!0 !== t.options.rewindNav) return t.currentItem = 0, !1;
                    t.currentItem = t.maximumItem, e = "rewind"
                }
                t.goTo(t.currentItem, e)
            },
            goTo: function(e, t, i) {
                var o = this,
                    s;
                return !o.isTransition && ("function" == typeof o.options.beforeMove && o.options.beforeMove.apply(this, [o.$elem]), e >= o.maximumItem ? e = o.maximumItem : e <= 0 && (e = 0), o.currentItem = o.owl.currentItem = e, !1 !== o.options.transitionStyle && "drag" !== i && 1 === o.options.items && !0 === o.browser.support3d ? (o.swapSpeed(0), !0 === o.browser.support3d ? o.transition3d(o.positionsInArray[e]) : o.css2slide(o.positionsInArray[e], 1), o.afterGo(), o.singleItemTransition(), !1) : (s = o.positionsInArray[e], !0 === o.browser.support3d ? (!(o.isCss3Finish = !1) === t ? (o.swapSpeed("paginationSpeed"), d.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.paginationSpeed)) : "rewind" === t ? (o.swapSpeed(o.options.rewindSpeed), d.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.rewindSpeed)) : (o.swapSpeed("slideSpeed"), d.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.slideSpeed)), o.transition3d(s)) : !0 === t ? o.css2slide(s, o.options.paginationSpeed) : "rewind" === t ? o.css2slide(s, o.options.rewindSpeed) : o.css2slide(s, o.options.slideSpeed), void o.afterGo()))
            },
            jumpTo: function(e) {
                var t = this;
                "function" == typeof t.options.beforeMove && t.options.beforeMove.apply(this, [t.$elem]), e >= t.maximumItem || -1 === e ? e = t.maximumItem : e <= 0 && (e = 0), t.swapSpeed(0), !0 === t.browser.support3d ? t.transition3d(t.positionsInArray[e]) : t.css2slide(t.positionsInArray[e], 1), t.currentItem = t.owl.currentItem = e, t.afterGo()
            },
            afterGo: function() {
                var e = this;
                e.prevArr.push(e.currentItem), e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2], e.prevArr.shift(0), e.prevItem !== e.currentItem && (e.checkPagination(), e.checkNavigation(), e.eachMoveUpdate(), !1 !== e.options.autoPlay && e.checkAp()), "function" == typeof e.options.afterMove && e.prevItem !== e.currentItem && e.options.afterMove.apply(this, [e.$elem])
            },
            stop: function() {
                var e = this;
                e.apStatus = "stop", d.clearInterval(e.autoPlayInterval)
            },
            checkAp: function() {
                var e = this;
                "stop" !== e.apStatus && e.play()
            },
            play: function() {
                var e = this;
                if (!(e.apStatus = "play") === e.options.autoPlay) return !1;
                d.clearInterval(e.autoPlayInterval), e.autoPlayInterval = d.setInterval(function() {
                    e.next(!0)
                }, e.options.autoPlay)
            },
            swapSpeed: function(e) {
                var t = this;
                "slideSpeed" === e ? t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed)) : "paginationSpeed" === e ? t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed)) : "string" != typeof e && t.$owlWrapper.css(t.addCssSpeed(e))
            },
            addCssSpeed: function(e) {
                return {
                    "-webkit-transition": "all " + e + "ms ease",
                    "-moz-transition": "all " + e + "ms ease",
                    "-o-transition": "all " + e + "ms ease",
                    transition: "all " + e + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(e) {
                return {
                    "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
                    transform: "translate3d(" + e + "px, 0px,0px)"
                }
            },
            transition3d: function(e) {
                var t = this;
                t.$owlWrapper.css(t.doTranslate(e))
            },
            css2move: function(e) {
                var t;
                this.$owlWrapper.css({
                    left: e
                })
            },
            css2slide: function(e, t) {
                var i = this;
                i.isCssFinish = !1, i.$owlWrapper.stop(!0, !0).animate({
                    left: e
                }, {
                    duration: t || i.options.slideSpeed,
                    complete: function() {
                        i.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var e = this,
                    t = "translate3d(0px, 0px, 0px)",
                    i = c.createElement("div"),
                    o, s, n, r;
                i.style.cssText = "  -moz-transform:" + t + "; -ms-transform:" + t + "; -o-transform:" + t + "; -webkit-transform:" + t + "; transform:" + t, o = /translate3d\(0px, 0px, 0px\)/g, n = null !== (s = i.style.cssText.match(o)) && 1 === s.length, r = "ontouchstart" in d || d.navigator.msMaxTouchPoints, e.browser = {
                    support3d: n,
                    isTouch: r
                }
            },
            moveEvents: function() {
                var e = this;
                !1 === e.options.mouseDrag && !1 === e.options.touchDrag || (e.gestures(), e.disabledEvents())
            },
            eventTypes: function() {
                var e = this,
                    t = ["s", "e", "x"];
                e.ev_types = {}, !0 === e.options.mouseDrag && !0 === e.options.touchDrag ? t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === e.options.mouseDrag && !0 === e.options.touchDrag ? t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === e.options.mouseDrag && !1 === e.options.touchDrag && (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), e.ev_types.start = t[0], e.ev_types.move = t[1], e.ev_types.end = t[2]
            },
            disabledEvents: function() {
                var e = this;
                e.$elem.on("dragstart.owl", function(e) {
                    e.preventDefault()
                }), e.$elem.on("mousedown.disableTextSelect", function(e) {
                    return l(e.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function s(e) {
                    if (void 0 !== e.touches) return {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    };
                    if (void 0 === e.touches) {
                        if (void 0 !== e.pageX) return {
                            x: e.pageX,
                            y: e.pageY
                        };
                        if (void 0 === e.pageX) return {
                            x: e.clientX,
                            y: e.clientY
                        }
                    }
                }

                function n(e) {
                    "on" === e ? (l(c).on(r.ev_types.move, t), l(c).on(r.ev_types.end, i)) : "off" === e && (l(c).off(r.ev_types.move), l(c).off(r.ev_types.end))
                }

                function e(e) {
                    var t = e.originalEvent || e || d.event,
                        i;
                    if (3 === t.which) return !1;
                    if (!(r.itemsAmount <= r.options.items)) {
                        if (!1 === r.isCssFinish && !r.options.dragBeforeAnimFinish) return !1;
                        if (!1 === r.isCss3Finish && !r.options.dragBeforeAnimFinish) return !1;
                        !1 !== r.options.autoPlay && d.clearInterval(r.autoPlayInterval), !0 === r.browser.isTouch || r.$owlWrapper.hasClass("grabbing") || r.$owlWrapper.addClass("grabbing"), r.newPosX = 0, r.newRelativeX = 0, l(this).css(r.removeTransition()), i = l(this).position(), a.relativePos = i.left, a.offsetX = s(t).x - i.left, a.offsetY = s(t).y - i.top, n("on"), a.sliding = !1, a.targetElement = t.target || t.srcElement
                    }
                }

                function t(e) {
                    var t = e.originalEvent || e || d.event,
                        i, o;
                    r.newPosX = s(t).x - a.offsetX, r.newPosY = s(t).y - a.offsetY, r.newRelativeX = r.newPosX - a.relativePos, "function" == typeof r.options.startDragging && !0 !== a.dragging && 0 !== r.newRelativeX && (a.dragging = !0, r.options.startDragging.apply(r, [r.$elem])), (8 < r.newRelativeX || r.newRelativeX < -8) && !0 === r.browser.isTouch && (void 0 !== t.preventDefault ? t.preventDefault() : t.returnValue = !1, a.sliding = !0), (10 < r.newPosY || r.newPosY < -10) && !1 === a.sliding && l(c).off("touchmove.owl"), i = function() {
                        return r.newRelativeX / 5
                    }, o = function() {
                        return r.maximumPixels + r.newRelativeX / 5
                    }, r.newPosX = Math.max(Math.min(r.newPosX, i()), o()), !0 === r.browser.support3d ? r.transition3d(r.newPosX) : r.css2move(r.newPosX)
                }

                function i(e) {
                    var t = e.originalEvent || e || d.event,
                        i, o, s;
                    t.target = t.target || t.srcElement, !(a.dragging = !1) !== r.browser.isTouch && r.$owlWrapper.removeClass("grabbing"), r.newRelativeX < 0 ? r.dragDirection = r.owl.dragDirection = "left" : r.dragDirection = r.owl.dragDirection = "right", 0 !== r.newRelativeX && (i = r.getNewPosition(), r.goTo(i, !1, "drag"), a.targetElement === t.target && !0 !== r.browser.isTouch && (l(t.target).on("click.disable", function(e) {
                        e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), l(e.target).off("click.disable")
                    }), s = (o = l._data(t.target, "events").click).pop(), o.splice(0, 0, s))), n("off")
                }
                /*jslint unparam: true*/
                var r = this,
                    a = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                r.isCssFinish = !0, r.$elem.on(r.ev_types.start, ".owl-wrapper", e)
            },
            getNewPosition: function() {
                var e = this,
                    t = e.closestItem();
                return t > e.maximumItem ? (e.currentItem = e.maximumItem, t = e.maximumItem) : 0 <= e.newPosX && (t = 0, e.currentItem = 0), t
            },
            closestItem: function() {
                var i = this,
                    o = !0 === i.options.scrollPerPage ? i.pagesInArray : i.positionsInArray,
                    s = i.newPosX,
                    n = null;
                return l.each(o, function(e, t) {
                    s - i.itemWidth / 20 > o[e + 1] && s - i.itemWidth / 20 < t && "left" === i.moveDirection() ? (n = t, !0 === i.options.scrollPerPage ? i.currentItem = l.inArray(n, i.positionsInArray) : i.currentItem = e) : s + i.itemWidth / 20 < t && s + i.itemWidth / 20 > (o[e + 1] || o[e] - i.itemWidth) && "right" === i.moveDirection() && (!0 === i.options.scrollPerPage ? (n = o[e + 1] || o[o.length - 1], i.currentItem = l.inArray(n, i.positionsInArray)) : (n = o[e + 1], i.currentItem = e + 1))
                }), i.currentItem
            },
            moveDirection: function() {
                var e = this,
                    t;
                return e.newRelativeX < 0 ? (t = "right", e.playDirection = "next") : (t = "left", e.playDirection = "prev"), t
            },
            customEvents: function() {
                /*jslint unparam: true*/
                var i = this;
                i.$elem.on("owl.next", function() {
                    i.next()
                }), i.$elem.on("owl.prev", function() {
                    i.prev()
                }), i.$elem.on("owl.play", function(e, t) {
                    i.options.autoPlay = t, i.play(), i.hoverStatus = "play"
                }), i.$elem.on("owl.stop", function() {
                    i.stop(), i.hoverStatus = "stop"
                }), i.$elem.on("owl.goTo", function(e, t) {
                    i.goTo(t)
                }), i.$elem.on("owl.jumpTo", function(e, t) {
                    i.jumpTo(t)
                })
            },
            stopOnHover: function() {
                var e = this;
                !0 === e.options.stopOnHover && !0 !== e.browser.isTouch && !1 !== e.options.autoPlay && (e.$elem.on("mouseover", function() {
                    e.stop()
                }), e.$elem.on("mouseout", function() {
                    "stop" !== e.hoverStatus && e.play()
                }))
            },
            lazyLoad: function() {
                var e = this,
                    t, i, o, s, n;
                if (!1 === e.options.lazyLoad) return !1;
                for (t = 0; t < e.itemsAmount; t += 1) "loaded" !== (i = l(e.$owlItems[t])).data("owl-loaded") && (o = i.data("owl-item"), "string" == typeof(s = i.find(".lazyOwl")).data("src") ? (void 0 === i.data("owl-loaded") && (s.hide(), i.addClass("loading").data("owl-loaded", "checked")), (n = !0 !== e.options.lazyFollow || o >= e.currentItem) && o < e.currentItem + e.options.items && s.length && e.lazyPreload(i, s)) : i.data("owl-loaded", "loaded"))
            },
            lazyPreload: function(e, t) {
                function i() {
                    e.data("owl-loaded", "loaded").removeClass("loading"), t.removeAttr("data-src"), "fade" === s.options.lazyEffect ? t.fadeIn(400) : t.show(), "function" == typeof s.options.afterLazyLoad && s.options.afterLazyLoad.apply(this, [s.$elem])
                }

                function o() {
                    n += 1, s.completeImg(t.get(0)) || !0 === r ? i() : n <= 100 ? //if image loads in less than 10 seconds 
                        d.setTimeout(o, 100) : i()
                }
                var s = this,
                    n = 0,
                    r;
                "DIV" === t.prop("tagName") ? (t.css("background-image", "url(" + t.data("src") + ")"), r = !0) : t[0].src = t.data("src"), o()
            },
            autoHeight: function() {
                function e() {
                    var e = l(i.$owlItems[i.currentItem]).height();
                    i.wrapperOuter.css("height", e + "px"), i.wrapperOuter.hasClass("autoHeight") || d.setTimeout(function() {
                        i.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }

                function t() {
                    s += 1, i.completeImg(o.get(0)) ? e() : s <= 100 ? //if image loads in less than 10 seconds 
                        d.setTimeout(t, 100) : i.wrapperOuter.css("height", "")
                }
                var i = this,
                    o = l(i.$owlItems[i.currentItem]).find("img"),
                    s;
                void 0 !== o.get(0) ? (s = 0, t()) : e()
            },
            completeImg: function(e) {
                var t;
                return !!e.complete && ("undefined" === (t = typeof e.naturalWidth) || 0 !== e.naturalWidth)
            },
            onVisibleItems: function() {
                var e = this,
                    t;
                for (!0 === e.options.addClassActive && e.$owlItems.removeClass("active"), e.visibleItems = [], t = e.currentItem; t < e.currentItem + e.options.items; t += 1) e.visibleItems.push(t), !0 === e.options.addClassActive && l(e.$owlItems[t]).addClass("active");
                e.owl.visibleItems = e.visibleItems
            },
            transitionTypes: function(e) {
                var t = this;
                //Currently available: "fade", "backSlide", "goDown", "fadeUp"
                t.outClass = "owl-" + e + "-out", t.inClass = "owl-" + e + "-in"
            },
            singleItemTransition: function() {
                function e(e) {
                    return {
                        position: "relative",
                        left: e + "px"
                    }
                }
                var t = this,
                    i = t.outClass,
                    o = t.inClass,
                    s = t.$owlItems.eq(t.currentItem),
                    n = t.$owlItems.eq(t.prevItem),
                    r = Math.abs(t.positionsInArray[t.currentItem]) + t.positionsInArray[t.prevItem],
                    a = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2,
                    l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                t.isTransition = !0, t.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": a + "px",
                    "-moz-perspective-origin": a + "px",
                    "perspective-origin": a + "px"
                }), n.css(e(r, 10)).addClass(i).on(l, function() {
                    t.endPrev = !0, n.off(l), t.clearTransStyle(n, i)
                }), s.addClass(o).on(l, function() {
                    t.endCurrent = !0, s.off(l), t.clearTransStyle(s, o)
                })
            },
            clearTransStyle: function(e, t) {
                var i = this;
                e.css({
                    position: "",
                    left: ""
                }).removeClass(t), i.endPrev && i.endCurrent && (i.$owlWrapper.removeClass("owl-origin"), i.endPrev = !1, i.endCurrent = !1, i.isTransition = !1)
            },
            owlStatus: function() {
                var e = this;
                e.owl = {
                    userOptions: e.userOptions,
                    baseElement: e.$elem,
                    userItems: e.$userItems,
                    owlItems: e.$owlItems,
                    currentItem: e.currentItem,
                    prevItem: e.prevItem,
                    visibleItems: e.visibleItems,
                    isTouch: e.browser.isTouch,
                    browser: e.browser,
                    dragDirection: e.dragDirection
                }
            },
            clearEvents: function() {
                var e = this;
                e.$elem.off(".owl owl mousedown.disableTextSelect"), l(c).off(".owl owl"), l(d).off("resize", e.resizer)
            },
            unWrap: function() {
                var e = this;
                0 !== e.$elem.children().length && (e.$owlWrapper.unwrap(), e.$userItems.unwrap().unwrap(), e.owlControls && e.owlControls.remove()), e.clearEvents(), e.$elem.attr("style", e.$elem.data("owl-originalStyles") || "").attr("class", e.$elem.data("owl-originalClasses"))
            },
            destroy: function() {
                var e = this;
                e.stop(), d.clearInterval(e.checkVisible), e.unWrap(), e.$elem.removeData()
            },
            reinit: function(e) {
                var t = this,
                    i = l.extend({}, t.userOptions, e);
                t.unWrap(), t.init(i, t.$elem)
            },
            addItem: function(e, t) {
                var i = this,
                    o;
                return !!e && (0 === i.$elem.children().length ? (i.$elem.append(e), i.setVars(), !1) : (i.unWrap(), (o = void 0 === t || -1 === t ? -1 : t) >= i.$userItems.length || -1 === o ? i.$userItems.eq(-1).after(e) : i.$userItems.eq(o).before(e), void i.setVars()))
            },
            removeItem: function(e) {
                var t = this,
                    i;
                if (0 === t.$elem.children().length) return !1;
                i = void 0 === e || -1 === e ? -1 : e, t.unWrap(), t.$userItems.eq(i).remove(), t.setVars()
            }
        };
        l.fn.owlCarousel = function(t) {
            return this.each(function() {
                if (!0 === l(this).data("owl-init")) return !1;
                l(this).data("owl-init", !0);
                var e = Object.create(i);
                e.init(t, this), l.data(this, "owlCarousel", e)
            })
        }, l.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: d,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document),
    /*! lightgallery - v1.2.22 - 2016-07-20
     * http://sachinchoolur.github.io/lightGallery/
     * Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
    function(v, y, o, e) {
        "use strict";

        function t(e, t) {
            // When using dynamic mode, ensure dynamicEl is an array
            if (
                // Current lightGallery element
                this.el = e,
                // Current jquery element
                this.$el = v(e),
                // lightGallery settings
                this.s = v.extend({}, i, t), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            // lightGallery modules
            return this.modules = {},
                // false when lightgallery complete first slide;
                this.lGalleryOn = !1, this.lgBusy = !1,
                // Timeout function for hiding controls;
                this.hideBartimeout = !1,
                // To determine browser supports for touch events;
                this.isTouch = "ontouchstart" in o.documentElement,
                // Disable hideControlOnEnd if sildeEndAnimation is true
                this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
                // Gallery items
                this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = v(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(v(this.s.selector)) : this.$items = this.$el.children(),
                // .lg-item
                this.$slide = "",
                // .lg-outer
                this.$outer = "", this.init(), this
        }
        var i = {
            mode: "lg-slide",
            // Ex : 'ease'
            cssEasing: "ease",
            //'for jquery animation'
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            // .lg-item || '.lg-sub-html'
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            /**
             * @desc number of preload slides
             * will exicute only after the current slide is fully loaded.
             *
             * @ex you clicked on 4th image and if preload = 1 then 3rd slide and 5th
             * slide will be loaded in the background after the 4th slide is fully loaded..
             * if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.. ... ...
             *
             */
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            // 0, 1
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1
        };
        t.prototype.init = function() {
                var e = this;
                // s.preload should not be more than $item.length
                e.s.preload > e.$items.length && (e.s.preload = e.$items.length);
                // if dynamic option is enabled execute immediately
                var t = y.location.hash;
                0 < t.indexOf("lg=" + this.s.galleryId) && (e.index = parseInt(t.split("&slide=")[1], 10), v("body").addClass("lg-from-hash"), v("body").hasClass("lg-on") || (setTimeout(function() {
                        e.build(e.index)
                    }), v("body").addClass("lg-on"))), e.s.dynamic ? (e.$el.trigger("onBeforeOpen.lg"), e.index = e.s.index || 0,
                        // prevent accidental double execution
                        v("body").hasClass("lg-on") || setTimeout(function() {
                            e.build(e.index), v("body").addClass("lg-on")
                        })) :
                    // Using different namespace for click because click event should not unbind if selector is same object('this')
                    e.$items.on("click.lgcustom", function(t) {
                        // For IE8
                        try {
                            t.preventDefault(), t.preventDefault()
                        } catch (e) {
                            t.returnValue = !1
                        }
                        e.$el.trigger("onBeforeOpen.lg"), e.index = e.s.index || e.$items.index(this),
                            // prevent accidental double execution
                            v("body").hasClass("lg-on") || (e.build(e.index), v("body").addClass("lg-on"))
                    })
            }, t.prototype.build = function(e) {
                var t = this;
                t.structure(),
                    // module constructor
                    v.each(v.fn.lightGallery.modules, function(e) {
                        t.modules[e] = new v.fn.lightGallery.modules[e](t.el)
                    }),
                    // initiate slide function
                    t.slide(e, !1, !1), t.s.keyPress && t.keyPress(), 1 < t.$items.length && (t.arrow(), setTimeout(function() {
                        t.enableDrag(), t.enableSwipe()
                    }, 50), t.s.mousewheel && t.mousewheel()), t.counter(), t.closeGallery(), t.$el.trigger("onAfterOpen.lg"),
                    // Hide controllers if mouse doesn't move for some period
                    t.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                        t.$outer.removeClass("lg-hide-items"), clearTimeout(t.hideBartimeout),
                            // Timeout will be cleared on each slide movement also
                            t.hideBartimeout = setTimeout(function() {
                                t.$outer.addClass("lg-hide-items")
                            }, t.s.hideBarsDelay)
                    })
            }, t.prototype.structure = function() {
                var e = "",
                    t = "",
                    i = 0,
                    o = "",
                    s, n = this;
                // Create gallery items
                for (v("body").append('<div class="lg-backdrop"></div>'), v(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), i = 0; i < this.$items.length; i++) e += '<div class="lg-item"></div>';
                // Create controlls
                if (this.s.controls && 1 < this.$items.length && (t = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (o = '<div class="lg-sub-html"></div>'), s = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + e + '</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>' + t + o + "</div></div>", v("body").append(s), this.$outer = v(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"),
                        // Set mode lg-slide if use left is true;
                        this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"),
                    // For fixed height gallery
                    n.setTop(), v(y).on("resize.lg orientationchange.lg", function() {
                        setTimeout(function() {
                            n.setTop()
                        }, 100)
                    }),
                    // add class lg-current to remove initial transition
                    this.$slide.eq(this.index).addClass("lg-current"),
                    // add Class for css support and transition mode
                    this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"),
                        // Set speed 0 because no animation will happen if browser doesn't support css3
                        this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && 1 < this.$items.length && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
                    var r = this.$outer.find(".lg-inner");
                    r.css("transition-timing-function", this.s.cssEasing), r.css("transition-duration", this.s.speed + "ms")
                }
                v(".lg-backdrop").addClass("in"), setTimeout(function() {
                        n.$outer.addClass("lg-visible")
                    }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'),
                    // Store the current scroll top value to scroll back after closing the gallery..
                    this.prevScrollTop = v(y).scrollTop()
            },
            // For fixed height gallery
            t.prototype.setTop = function() {
                if ("100%" !== this.s.height) {
                    var e = v(y).height(),
                        t = (e - parseInt(this.s.height, 10)) / 2,
                        i = this.$outer.find(".lg");
                    e >= parseInt(this.s.height, 10) ? i.css("top", t + "px") : i.css("top", "0px")
                }
            },
            // Find css3 support
            t.prototype.doCss = function() {
                // check for css animation support
                var e;
                return !! function() {
                    var e = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                        t = o.documentElement,
                        i = 0;
                    for (i = 0; i < e.length; i++)
                        if (e[i] in t.style) return !0
                }()
            },
            /**
             *  @desc Check the given src is video
             *  @param {String} src
             *  @return {Object} video type
             *  Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
             */
            t.prototype.isVideo = function(e, t) {
                var i;
                if (i = this.s.dynamic ? this.s.dynamicEl[t].html : this.$items.eq(t).attr("data-html"), !e && i) return {
                    html5: !0
                };
                var o = e.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                    s = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                    n = e.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                    r = e.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
                return o ? {
                    youtube: o
                } : s ? {
                    vimeo: s
                } : n ? {
                    dailymotion: n
                } : r ? {
                    vk: r
                } : void 0
            },
            /**
             *  @desc Create image counter
             *  Ex: 1/10
             */
            t.prototype.counter = function() {
                this.s.counter && v(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
            },
            /**
             *  @desc add sub-html into the slide
             *  @param {Number} index - index of the slide
             */
            t.prototype.addHtml = function(e) {
                var t = null,
                    i, o;
                if (this.s.dynamic ? this.s.dynamicEl[e].subHtmlUrl ? i = this.s.dynamicEl[e].subHtmlUrl : t = this.s.dynamicEl[e].subHtml : (o = this.$items.eq(e)).attr("data-sub-html-url") ? i = o.attr("data-sub-html-url") : (t = o.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !t && (t = o.attr("title") || o.find("img").first().attr("alt"))), !i)
                    if (null != t) {
                        // get first letter of subhtml
                        // if first letter starts with . or # get the html form the jQuery object
                        var s = t.substring(0, 1);
                        "." !== s && "#" !== s || (t = this.s.subHtmlSelectorRelative && !this.s.dynamic ? o.find(t).html() : v(t).html())
                    } else t = "";
                    ".lg-sub-html" === this.s.appendSubHtmlTo ? i ? this.$outer.find(this.s.appendSubHtmlTo).load(i) : this.$outer.find(this.s.appendSubHtmlTo).html(t) : i ? this.$slide.eq(e).load(i) : this.$slide.eq(e).append(t),
                    // Add lg-empty-html class if title doesn't exist
                    null != t && ("" === t ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [e])
            },
            /**
             *  @desc Preload slides
             *  @param {Number} index - index of the slide
             */
            t.prototype.preload = function(e) {
                var t = 1,
                    i = 1;
                for (t = 1; t <= this.s.preload && !(t >= this.$items.length - e); t++) this.loadContent(e + t, !1, 0);
                for (i = 1; i <= this.s.preload && !(e - i < 0); i++) this.loadContent(e - i, !1, 0)
            },
            /**
             *  @desc Load slide content into slide.
             *  @param {Number} index - index of the slide.
             *  @param {Boolean} rec - if true call loadcontent() function again.
             *  @param {Boolean} delay - delay for adding complete class. it is 0 except first time.
             */
            t.prototype.loadContent = function(t, e, i) {
                var o = this,
                    s = !1,
                    n, a, r, l, d, c, u = function(e) {
                        for (var t = [], i = [], o = 0; o < e.length; o++) {
                            var s = e[o].split(" ");
                            // Manage empty space
                            "" === s[0] && s.splice(0, 1), i.push(s[0]), t.push(s[1])
                        }
                        for (var n = v(y).width(), r = 0; r < t.length; r++)
                            if (parseInt(t[r], 10) > n) {
                                a = i[r];
                                break
                            }
                    };
                if (o.s.dynamic) {
                    var p;
                    if (o.s.dynamicEl[t].poster && (s = !0, r = o.s.dynamicEl[t].poster), c = o.s.dynamicEl[t].html, a = o.s.dynamicEl[t].src, o.s.dynamicEl[t].responsive) u(o.s.dynamicEl[t].responsive.split(","));
                    l = o.s.dynamicEl[t].srcset, d = o.s.dynamicEl[t].sizes
                } else {
                    var h;
                    if (o.$items.eq(t).attr("data-poster") && (s = !0, r = o.$items.eq(t).attr("data-poster")), c = o.$items.eq(t).attr("data-html"), a = o.$items.eq(t).attr("href") || o.$items.eq(t).attr("data-src"), o.$items.eq(t).attr("data-responsive")) u(o.$items.eq(t).attr("data-responsive").split(","));
                    l = o.$items.eq(t).attr("data-srcset"), d = o.$items.eq(t).attr("data-sizes")
                }
                //if (_src || _srcset || _sizes || _poster) {
                var m = !1;
                o.s.dynamic ? o.s.dynamicEl[t].iframe && (m = !0) : "true" === o.$items.eq(t).attr("data-iframe") && (m = !0);
                var g = o.isVideo(a, t);
                if (!o.$slide.eq(t).hasClass("lg-loaded")) {
                    if (m) o.$slide.eq(t).prepend('<div class="lg-video-cont" style="max-width:' + o.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + a + '"  allowfullscreen="true"></iframe></div></div>');
                    else if (s) {
                        var f = "";
                        f = g && g.youtube ? "lg-has-youtube" : g && g.vimeo ? "lg-has-vimeo" : "lg-has-html5", o.$slide.eq(t).prepend('<div class="lg-video-cont ' + f + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + r + '" /></div></div>')
                    } else g ? (o.$slide.eq(t).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), o.$el.trigger("hasVideo.lg", [t, a, c])) : o.$slide.eq(t).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + a + '" /></div>');
                    if (o.$el.trigger("onAferAppendSlide.lg", [t]), n = o.$slide.eq(t).find(".lg-object"), d && n.attr("sizes", d), l) {
                        n.attr("srcset", l);
                        try {
                            picturefill({
                                elements: [n[0]]
                            })
                        } catch (e) {
                            console.error("Make sure you have included Picturefill version 2")
                        }
                    }
                    ".lg-sub-html" !== this.s.appendSubHtmlTo && o.addHtml(t), o.$slide.eq(t).addClass("lg-loaded")
                }
                o.$slide.eq(t).find(".lg-object").on("load.lg error.lg", function() {
                        // For first time add some delay for displaying the start animation.
                        var e = 0;
                        // Do not change the delay value because it is required for zoom plugin.
                        // If gallery opened from direct url (hash) speed value should be 0
                        i && !v("body").hasClass("lg-from-hash") && (e = i), setTimeout(function() {
                            o.$slide.eq(t).addClass("lg-complete"), o.$el.trigger("onSlideItemLoad.lg", [t, i || 0])
                        }, e)
                    }),
                    // @todo check load state for html5 videos
                    g && g.html5 && !s && o.$slide.eq(t).addClass("lg-complete"), !0 === e && (o.$slide.eq(t).hasClass("lg-complete") ? o.preload(t) : o.$slide.eq(t).find(".lg-object").on("load.lg error.lg", function() {
                        o.preload(t)
                    }))
            },
            /**
                *   @desc slide function for lightgallery
                    ** Slide() gets call on start
                    ** ** Set lg.on true once slide() function gets called.
                    ** Call loadContent() on slide() function inside setTimeout
                    ** ** On first slide we do not want any animation like slide of fade
                    ** ** So on first slide( if lg.on if false that is first slide) loadContent() should start loading immediately
                    ** ** Else loadContent() should wait for the transition to complete.
                    ** ** So set timeout s.speed + 50
                <=> ** loadContent() will load slide content in to the particular slide
                    ** ** It has recursion (rec) parameter. if rec === true loadContent() will call preload() function.
                    ** ** preload will execute only when the previous slide is fully loaded (images iframe)
                    ** ** avoid simultaneous image load
                <=> ** Preload() will check for s.preload value and call loadContent() again accoring to preload value
                    ** loadContent()  <====> Preload();

                *   @param {Number} index - index of the slide
                *   @param {Boolean} fromTouch - true if slide function called via touch event or mouse drag
                *   @param {Boolean} fromThumb - true if slide function called via thumbnail click
                */
            t.prototype.slide = function(e, t, i) {
                var o = this.$outer.find(".lg-current").index(),
                    s = this;
                // Prevent if multiple call
                // Required for hsh plugin
                if (!s.lGalleryOn || o !== e) {
                    var n = this.$slide.length,
                        r = s.lGalleryOn ? this.s.speed : 0,
                        a = !1,
                        l = !1;
                    if (!s.lgBusy) {
                        var d;
                        if (this.s.download)(d = s.s.dynamic ? !1 !== s.s.dynamicEl[e].downloadUrl && (s.s.dynamicEl[e].downloadUrl || s.s.dynamicEl[e].src) : "false" !== s.$items.eq(e).attr("data-download-url") && (s.$items.eq(e).attr("data-download-url") || s.$items.eq(e).attr("href") || s.$items.eq(e).attr("data-src"))) ? (v("#lg-download").attr("href", d), s.$outer.removeClass("lg-hide-download")) : s.$outer.addClass("lg-hide-download");
                        if (this.$el.trigger("onBeforeSlide.lg", [o, e, t, i]), s.lgBusy = !0, clearTimeout(s.hideBartimeout),
                            // Add title if this.s.appendSubHtmlTo === lg-sub-html
                            ".lg-sub-html" === this.s.appendSubHtmlTo &&
                            // wait for slide animation to complete
                            setTimeout(function() {
                                s.addHtml(e)
                            }, r), this.arrowDisable(e), t) {
                            var c = e - 1,
                                u = e + 1;
                            0 === e && o === n - 1 ? (
                                // next slide
                                u = 0, c = n - 1) : e === n - 1 && 0 === o && (
                                // prev slide
                                u = 0, c = n - 1), this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"), s.$slide.eq(c).addClass("lg-prev-slide"), s.$slide.eq(u).addClass("lg-next-slide"), s.$slide.eq(e).addClass("lg-current")
                        } else
                        // remove all transitions
                            s.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), e < o ? (l = !0, 0 !== e || o !== n - 1 || i || (a = !(l = !1))) : o < e && (a = !0, e !== n - 1 || 0 !== o || i || (a = !(l = !0))), l ? (
                                //prevslide
                                this.$slide.eq(e).addClass("lg-prev-slide"), this.$slide.eq(o).addClass("lg-next-slide")) : a && (
                                // next slide
                                this.$slide.eq(e).addClass("lg-next-slide"), this.$slide.eq(o).addClass("lg-prev-slide")),
                            // give 50 ms for browser to add/remove class
                            setTimeout(function() {
                                s.$slide.removeClass("lg-current"),
                                    //_this.$slide.eq(_prevIndex).removeClass('lg-current');
                                    s.$slide.eq(e).addClass("lg-current"),
                                    // reset all transitions
                                    s.$outer.removeClass("lg-no-trans")
                            }, 50);
                        s.lGalleryOn ? (setTimeout(function() {
                            s.loadContent(e, !0, 0)
                        }, this.s.speed + 50), setTimeout(function() {
                            s.lgBusy = !1, s.$el.trigger("onAfterSlide.lg", [o, e, t, i])
                        }, this.s.speed)) : (s.loadContent(e, !0, s.s.backdropDuration), s.lgBusy = !1, s.$el.trigger("onAfterSlide.lg", [o, e, t, i])), s.lGalleryOn = !0, this.s.counter && v("#lg-counter-current").text(e + 1)
                    }
                }
            },
            /**
             *  @desc Go to next slide
             *  @param {Boolean} fromTouch - true if slide function called via touch event
             */
            t.prototype.goToNextSlide = function(e) {
                var t = this;
                t.lgBusy || (t.index + 1 < t.$slide.length ? (t.index++, t.$el.trigger("onBeforeNextSlide.lg", [t.index]), t.slide(t.index, e, !1)) : t.s.loop ? (t.index = 0, t.$el.trigger("onBeforeNextSlide.lg", [t.index]), t.slide(t.index, e, !1)) : t.s.slideEndAnimatoin && (t.$outer.addClass("lg-right-end"), setTimeout(function() {
                    t.$outer.removeClass("lg-right-end")
                }, 400)))
            },
            /**
             *  @desc Go to previous slide
             *  @param {Boolean} fromTouch - true if slide function called via touch event
             */
            t.prototype.goToPrevSlide = function(e) {
                var t = this;
                t.lgBusy || (0 < t.index ? (t.index--, t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]), t.slide(t.index, e, !1)) : t.s.loop ? (t.index = t.$items.length - 1, t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]), t.slide(t.index, e, !1)) : t.s.slideEndAnimatoin && (t.$outer.addClass("lg-left-end"), setTimeout(function() {
                    t.$outer.removeClass("lg-left-end")
                }, 400)))
            }, t.prototype.keyPress = function() {
                var t = this;
                1 < this.$items.length && v(y).on("keyup.lg", function(e) {
                    1 < t.$items.length && (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()), 39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()))
                }), v(y).on("keydown.lg", function(e) {
                    !0 === t.s.escKey && 27 === e.keyCode && (e.preventDefault(), t.$outer.hasClass("lg-thumb-open") ? t.$outer.removeClass("lg-thumb-open") : t.destroy())
                })
            }, t.prototype.arrow = function() {
                var e = this;
                this.$outer.find(".lg-prev").on("click.lg", function() {
                    e.goToPrevSlide()
                }), this.$outer.find(".lg-next").on("click.lg", function() {
                    e.goToNextSlide()
                })
            }, t.prototype.arrowDisable = function(e) {
                // Disable arrows if s.hideControlOnEnd is true
                !this.s.loop && this.s.hideControlOnEnd && (e + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), 0 < e ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
            }, t.prototype.setTranslate = function(e, t, i) {
                // jQuery supports Automatic CSS prefixing since jQuery 1.8.0
                this.s.useLeft ? e.css("left", t) : e.css({
                    transform: "translate3d(" + t + "px, " + i + "px, 0px)"
                })
            }, t.prototype.touchMove = function(e, t) {
                var i = t - e;
                15 < Math.abs(i) && (
                    // reset opacity and transition duration
                    this.$outer.addClass("lg-dragging"),
                    // move current slide
                    this.setTranslate(this.$slide.eq(this.index), i, 0),
                    // move next and prev slide with current slide
                    this.setTranslate(v(".lg-prev-slide"), -this.$slide.eq(this.index).width() + i, 0), this.setTranslate(v(".lg-next-slide"), this.$slide.eq(this.index).width() + i, 0))
            }, t.prototype.touchEnd = function(e) {
                var t = this;
                // keep slide animation for any mode while dragg/swipe
                "lg-slide" !== t.s.mode && t.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"),
                    // set transition duration
                    setTimeout(function() {
                        t.$outer.removeClass("lg-dragging"), e < 0 && Math.abs(e) > t.s.swipeThreshold ? t.goToNextSlide(!0) : 0 < e && Math.abs(e) > t.s.swipeThreshold ? t.goToPrevSlide(!0) : Math.abs(e) < 5 &&
                            // Trigger click if distance is less than 5 pix
                            t.$el.trigger("onSlideClick.lg"), t.$slide.removeAttr("style")
                    }),
                    // remove slide class once drag/swipe is completed if mode is not slide
                    setTimeout(function() {
                        t.$outer.hasClass("lg-dragging") || "lg-slide" === t.s.mode || t.$outer.removeClass("lg-slide")
                    }, t.s.speed + 100)
            }, t.prototype.enableSwipe = function() {
                var t = this,
                    i = 0,
                    o = 0,
                    s = !1;
                t.s.enableSwipe && t.isTouch && t.doCss() && (t.$slide.on("touchstart.lg", function(e) {
                    t.$outer.hasClass("lg-zoomed") || t.lgBusy || (e.preventDefault(), t.manageSwipeClass(), i = e.originalEvent.targetTouches[0].pageX)
                }), t.$slide.on("touchmove.lg", function(e) {
                    t.$outer.hasClass("lg-zoomed") || (e.preventDefault(), o = e.originalEvent.targetTouches[0].pageX, t.touchMove(i, o), s = !0)
                }), t.$slide.on("touchend.lg", function() {
                    t.$outer.hasClass("lg-zoomed") || (s ? (s = !1, t.touchEnd(o - i)) : t.$el.trigger("onSlideClick.lg"))
                }))
            }, t.prototype.enableDrag = function() {
                var t = this,
                    i = 0,
                    o = 0,
                    s = !1,
                    n = !1;
                t.s.enableDrag && !t.isTouch && t.doCss() && (t.$slide.on("mousedown.lg", function(e) {
                    // execute only on .lg-object
                    t.$outer.hasClass("lg-zoomed") || (v(e.target).hasClass("lg-object") || v(e.target).hasClass("lg-video-play")) && (e.preventDefault(), t.lgBusy || (t.manageSwipeClass(), i = e.pageX, s = !0,
                        // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                        t.$outer.scrollLeft += 1, t.$outer.scrollLeft -= 1,
                        // *
                        t.$outer.removeClass("lg-grab").addClass("lg-grabbing"), t.$el.trigger("onDragstart.lg")))
                }), v(y).on("mousemove.lg", function(e) {
                    s && (n = !0, o = e.pageX, t.touchMove(i, o), t.$el.trigger("onDragmove.lg"))
                }), v(y).on("mouseup.lg", function(e) {
                    n ? (n = !1, t.touchEnd(o - i), t.$el.trigger("onDragend.lg")) : (v(e.target).hasClass("lg-object") || v(e.target).hasClass("lg-video-play")) && t.$el.trigger("onSlideClick.lg"),
                        // Prevent execution on click
                        s && (s = !1, t.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
                }))
            }, t.prototype.manageSwipeClass = function() {
                var e = this.index + 1,
                    t = this.index - 1,
                    i = this.$slide.length;
                this.s.loop && (0 === this.index ? t = i - 1 : this.index === i - 1 && (e = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), -1 < t && this.$slide.eq(t).addClass("lg-prev-slide"), this.$slide.eq(e).addClass("lg-next-slide")
            }, t.prototype.mousewheel = function() {
                var t = this;
                t.$outer.on("mousewheel.lg", function(e) {
                    e.deltaY && (0 < e.deltaY ? t.goToPrevSlide() : t.goToNextSlide(), e.preventDefault())
                })
            }, t.prototype.closeGallery = function() {
                var t = this,
                    i = !1;
                this.$outer.find(".lg-close").on("click.lg", function() {
                    t.destroy()
                }), t.s.closable && (
                    // If you drag the slide and release outside gallery gets close on chrome
                    // for preventing this check mousedown and mouseup happened on .lg-item or lg-outer
                    t.$outer.on("mousedown.lg", function(e) {
                        i = !!(v(e.target).is(".lg-outer") || v(e.target).is(".lg-item ") || v(e.target).is(".lg-img-wrap"))
                    }), t.$outer.on("mouseup.lg", function(e) {
                        (v(e.target).is(".lg-outer") || v(e.target).is(".lg-item ") || v(e.target).is(".lg-img-wrap") && i) && (t.$outer.hasClass("lg-dragging") || t.destroy())
                    }))
            }, t.prototype.destroy = function(e) {
                var t = this;
                e || t.$el.trigger("onBeforeClose.lg"), v(y).scrollTop(t.prevScrollTop),
                    /**
                     * if d is false or undefined destroy will only close the gallery
                     * plugins instance remains with the element
                     *
                     * if d is true destroy will completely remove the plugin
                     */
                    e && (t.s.dynamic ||
                        // only when not using dynamic mode is $items a jquery collection
                        this.$items.off("click.lg click.lgcustom"), v.removeData(t.el, "lightGallery")),
                    // Unbind all events added by lightGallery
                    this.$el.off(".lg.tm"),
                    // Distroy all lightGallery modules
                    v.each(v.fn.lightGallery.modules, function(e) {
                        t.modules[e] && t.modules[e].destroy()
                    }), this.lGalleryOn = !1, clearTimeout(t.hideBartimeout), this.hideBartimeout = !1, v(y).off(".lg"), v("body").removeClass("lg-on lg-from-hash"), t.$outer && t.$outer.removeClass("lg-visible"), v(".lg-backdrop").removeClass("in"), setTimeout(function() {
                        t.$outer && t.$outer.remove(), v(".lg-backdrop").remove(), e || t.$el.trigger("onCloseAfter.lg")
                    }, t.s.backdropDuration + 50)
            }, v.fn.lightGallery = function(e) {
                return this.each(function() {
                    if (v.data(this, "lightGallery")) try {
                        v(this).data("lightGallery").init()
                    } catch (e) {
                        console.error("lightGallery has not initiated properly")
                    } else v.data(this, "lightGallery", new t(this, e))
                })
            }, v.fn.lightGallery.modules = {}
    }(jQuery, window, document),
    /**
     * Autoplay Plugin
     * @version 1.2.0
     * @author Sachin N - @sachinchoolur
     * @license MIT License (MIT)
     */
    function(i, e, t, o) {
        "use strict";
        var s = {
                autoplay: !1,
                pause: 5e3,
                progressBar: !0,
                fourceAutoplay: !1,
                autoplayControls: !0,
                appendAutoplayControlsTo: ".lg-toolbar"
            },
            n = function(e) {
                // Execute only if items are above 1
                return this.core = i(e).data("lightGallery"), this.$el = i(e), !(this.core.$items.length < 2) && (this.core.s = i.extend({}, s, this.core.s), this.interval = !1,
                    // Identify if slide happened from autoplay
                    this.fromAuto = !0,
                    // Identify if autoplay canceled from touch/drag
                    this.canceledOnTouch = !1,
                    // save fourceautoplay value
                    this.fourceAutoplayTemp = this.core.s.fourceAutoplay,
                    // do not allow progress bar if browser does not support css3 transitions
                    this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
            };
        /**
         * Creates the autoplay plugin.
         * @param {object} element - lightGallery element
         */
        n.prototype.init = function() {
                var e = this;
                // append autoplay controls
                e.core.s.autoplayControls && e.controls(),
                    // Create progress bar
                    e.core.s.progressBar && e.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'),
                    // set progress
                    e.progress(),
                    // Start autoplay
                    e.core.s.autoplay && e.startlAuto(),
                    // cancel interval on touchstart and dragstart
                    e.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() {
                        e.interval && (e.cancelAuto(), e.canceledOnTouch = !0)
                    }),
                    // restore autoplay if autoplay canceled from touchstart / dragstart
                    e.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {
                        !e.interval && e.canceledOnTouch && (e.startlAuto(), e.canceledOnTouch = !1)
                    })
            }, n.prototype.progress = function() {
                var e = this,
                    t, i;
                e.$el.on("onBeforeSlide.lg.tm", function() {
                    // start progress bar animation
                    e.core.s.progressBar && e.fromAuto && (t = e.core.$outer.find(".lg-progress-bar"), i = e.core.$outer.find(".lg-progress"), e.interval && (i.removeAttr("style"), t.removeClass("lg-start"), setTimeout(function() {
                            i.css("transition", "width " + (e.core.s.speed + e.core.s.pause) + "ms ease 0s"), t.addClass("lg-start")
                        }, 20))),
                        // Remove setinterval if slide is triggered manually and fourceautoplay is false
                        e.fromAuto || e.core.s.fourceAutoplay || e.cancelAuto(), e.fromAuto = !1
                })
            },
            // Manage autoplay via play/stop buttons
            n.prototype.controls = function() {
                var e = this,
                    t = '<span class="lg-autoplay-button lg-icon"></span>';
                // Append autoplay controls
                i(this.core.s.appendAutoplayControlsTo).append(t), e.core.$outer.find(".lg-autoplay-button").on("click.lg", function() {
                    i(e.core.$outer).hasClass("lg-show-autoplay") ? (e.cancelAuto(), e.core.s.fourceAutoplay = !1) : e.interval || (e.startlAuto(), e.core.s.fourceAutoplay = e.fourceAutoplayTemp)
                })
            },
            // Autostart gallery
            n.prototype.startlAuto = function() {
                var e = this;
                e.core.$outer.find(".lg-progress").css("transition", "width " + (e.core.s.speed + e.core.s.pause) + "ms ease 0s"), e.core.$outer.addClass("lg-show-autoplay"), e.core.$outer.find(".lg-progress-bar").addClass("lg-start"), e.interval = setInterval(function() {
                    e.core.index + 1 < e.core.$items.length ? e.core.index++ : e.core.index = 0, e.fromAuto = !0, e.core.slide(e.core.index, !1, !1)
                }, e.core.s.speed + e.core.s.pause)
            },
            // cancel Autostart
            n.prototype.cancelAuto = function() {
                clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
            }, n.prototype.destroy = function() {
                this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
            }, i.fn.lightGallery.modules.autoplay = n
    }(jQuery, window, document),
    function(t, e, i, o) {
        "use strict";
        var s = {
                fullScreen: !0
            },
            n = function(e) {
                // get lightGallery core plugin data
                return this.core = t(e).data("lightGallery"), this.$el = t(e),
                    // extend module defalut settings with lightGallery core settings
                    this.core.s = t.extend({}, s, this.core.s), this.init(), this
            };
        n.prototype.init = function() {
                var e = "";
                if (this.core.s.fullScreen) {
                    // check for fullscreen browser support
                    if (!(i.fullscreenEnabled || i.webkitFullscreenEnabled || i.mozFullScreenEnabled || i.msFullscreenEnabled)) return;
                    e = '<span class="lg-fullscreen lg-icon"></span>', this.core.$outer.find(".lg-toolbar").append(e), this.fullScreen()
                }
            }, n.prototype.requestFullscreen = function() {
                var e = i.documentElement;
                e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen()
            }, n.prototype.exitFullscreen = function() {
                i.exitFullscreen ? i.exitFullscreen() : i.msExitFullscreen ? i.msExitFullscreen() : i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen && i.webkitExitFullscreen()
            },
            // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
            n.prototype.fullScreen = function() {
                var e = this;
                t(i).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
                    e.core.$outer.toggleClass("lg-fullscreen-on")
                }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
                    i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement || i.msFullscreenElement ? e.exitFullscreen() : e.requestFullscreen()
                })
            }, n.prototype.destroy = function() {
                // exit from fullscreen if activated
                this.exitFullscreen(), t(i).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
            }, t.fn.lightGallery.modules.fullscreen = n
    }(jQuery, window, document),
    function(r, e, t, i) {
        "use strict";
        var o = {
                pager: !1
            },
            s = function(e) {
                return this.core = r(e).data("lightGallery"), this.$el = r(e), this.core.s = r.extend({}, o, this.core.s), this.core.s.pager && 1 < this.core.$items.length && this.init(), this
            };
        s.prototype.init = function() {
            var t = this,
                e = "",
                o, i, s;
            if (t.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), t.core.s.dynamic)
                for (var n = 0; n < t.core.s.dynamicEl.length; n++) e += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + t.core.s.dynamicEl[n].thumb + '" /></div></span>';
            else t.core.$items.each(function() {
                t.core.s.exThumbImage ? e += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + r(this).attr(t.core.s.exThumbImage) + '" /></div></span>' : e += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + r(this).find("img").attr("src") + '" /></div></span>'
            });
            (i = t.core.$outer.find(".lg-pager-outer")).html(e), (o = t.core.$outer.find(".lg-pager-cont")).on("click.lg touchend.lg", function() {
                var e = r(this);
                t.core.index = e.index(), t.core.slide(t.core.index, !1, !1)
            }), i.on("mouseover.lg", function() {
                clearTimeout(s), i.addClass("lg-pager-hover")
            }), i.on("mouseout.lg", function() {
                s = setTimeout(function() {
                    i.removeClass("lg-pager-hover")
                })
            }), t.core.$el.on("onBeforeSlide.lg.tm", function(e, t, i) {
                o.removeClass("lg-pager-active"), o.eq(i).addClass("lg-pager-active")
            })
        }, s.prototype.destroy = function() {}, r.fn.lightGallery.modules.pager = s
    }(jQuery, window, document),
    function(d, c, e, t) {
        "use strict";
        var i = {
                thumbnail: !0,
                animateThumb: !0,
                currentPagerPosition: "middle",
                thumbWidth: 100,
                thumbContHeight: 100,
                thumbMargin: 5,
                exThumbImage: !1,
                showThumbByDefault: !0,
                toogleThumb: !0,
                pullCaptionUp: !0,
                enableThumbDrag: !0,
                enableThumbSwipe: !0,
                swipeThreshold: 50,
                loadYoutubeThumbnail: !0,
                youtubeThumbSize: 1,
                loadVimeoThumbnail: !0,
                vimeoThumbSize: "thumbnail_small",
                loadDailymotionThumbnail: !0
            },
            o = function(e) {
                // get lightGallery core plugin data
                return this.core = d(e).data("lightGallery"),
                    // extend module default settings with lightGallery core settings
                    this.core.s = d.extend({}, i, this.core.s), this.$el = d(e), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index,
                    // Thumbnail animation value
                    this.left = 0, this.init(), this
            };
        o.prototype.init = function() {
                var e = this;
                this.core.s.thumbnail && 1 < this.core.$items.length && (this.core.s.showThumbByDefault && setTimeout(function() {
                    e.core.$outer.addClass("lg-thumb-open")
                }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb ? (this.core.s.enableThumbDrag && !this.core.isTouch && this.core.doCss() && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.core.isTouch && this.core.doCss() && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
            }, o.prototype.build = function() {
                function t(e, t, i) {
                    var o = r.core.isVideo(e, i) || {},
                        s, n = "";
                    o.youtube || o.vimeo || o.dailymotion ? o.youtube ? s = r.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + o.youtube[1] + "/" + r.core.s.youtubeThumbSize + ".jpg" : t : o.vimeo ? r.core.s.loadVimeoThumbnail ? (s = "//i.vimeocdn.com/video/error_" + l + ".jpg", n = o.vimeo[1]) : s = t : o.dailymotion && (s = r.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + o.dailymotion[1] : t) : s = t, a += '<div data-vimeo-id="' + n + '" class="lg-thumb-item" style="width:' + r.core.s.thumbWidth + "px; margin-right: " + r.core.s.thumbMargin + 'px"><img src="' + s + '" /></div>', n = ""
                }
                var r = this,
                    a = "",
                    l = "",
                    e, i = '<div class="lg-thumb-outer"><div class="lg-thumb group"></div></div>';
                switch (this.core.s.vimeoThumbSize) {
                    case "thumbnail_large":
                        l = "640";
                        break;
                    case "thumbnail_medium":
                        l = "200x150";
                        break;
                    case "thumbnail_small":
                        l = "100x75"
                }
                if (r.core.$outer.addClass("lg-has-thumb"), r.core.$outer.find(".lg").append(i), r.$thumbOuter = r.core.$outer.find(".lg-thumb-outer"), r.thumbOuterWidth = r.$thumbOuter.width(), r.core.s.animateThumb && r.core.$outer.find(".lg-thumb").css({
                        width: r.thumbTotalWidth + "px",
                        position: "relative"
                    }), this.core.s.animateThumb && r.$thumbOuter.css("height", r.core.s.thumbContHeight + "px"), r.core.s.dynamic)
                    for (var o = 0; o < r.core.s.dynamicEl.length; o++) t(r.core.s.dynamicEl[o].src, r.core.s.dynamicEl[o].thumb, o);
                else r.core.$items.each(function(e) {
                    r.core.s.exThumbImage ? t(d(this).attr("href") || d(this).attr("data-src"), d(this).attr(r.core.s.exThumbImage), e) : t(d(this).attr("href") || d(this).attr("data-src"), d(this).find("img").attr("src"), e)
                });
                r.core.$outer.find(".lg-thumb").html(a),
                    // Load vimeo thumbnails
                    (e = r.core.$outer.find(".lg-thumb-item")).each(function() {
                        var t = d(this),
                            e = t.attr("data-vimeo-id");
                        e && d.getJSON("//www.vimeo.com/api/v2/video/" + e + ".json?callback=?", {
                            format: "json"
                        }, function(e) {
                            t.find("img").attr("src", e[0][r.core.s.vimeoThumbSize])
                        })
                    }),
                    // manage active class for thumbnail
                    e.eq(r.core.index).addClass("active"), r.core.$el.on("onBeforeSlide.lg.tm", function() {
                        e.removeClass("active"), e.eq(r.core.index).addClass("active")
                    }), e.on("click.lg touchend.lg", function() {
                        var e = d(this);
                        setTimeout(function() {
                            // In IE9 and bellow touch does not support
                            // Go to slide if browser does not support css transitions
                            (r.thumbClickable && !r.core.lgBusy || !r.core.doCss()) && (r.core.index = e.index(), r.core.slide(r.core.index, !1, !0))
                        }, 50)
                    }), r.core.$el.on("onBeforeSlide.lg.tm", function() {
                        r.animateThumb(r.core.index)
                    }), d(c).on("resize.lg.thumb orientationchange.lg.thumb", function() {
                        setTimeout(function() {
                            r.animateThumb(r.core.index), r.thumbOuterWidth = r.$thumbOuter.width()
                        }, 200)
                    })
            }, o.prototype.setTranslate = function(e) {
                // jQuery supports Automatic CSS prefixing since jQuery 1.8.0
                this.core.$outer.find(".lg-thumb").css({
                    transform: "translate3d(-" + e + "px, 0px, 0px)"
                })
            }, o.prototype.animateThumb = function(e) {
                var t = this.core.$outer.find(".lg-thumb");
                if (this.core.s.animateThumb) {
                    var i;
                    switch (this.core.s.currentPagerPosition) {
                        case "left":
                            i = 0;
                            break;
                        case "middle":
                            i = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                            break;
                        case "right":
                            i = this.thumbOuterWidth - this.core.s.thumbWidth
                    }
                    this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * e - 1 - i, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (t.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || t.animate({
                        left: -this.left + "px"
                    }, this.core.s.speed)) : this.core.doCss() || t.css("left", -this.left + "px"), this.setTranslate(this.left)
                }
            },
            // Enable thumbnail dragging and swiping
            o.prototype.enableThumbDrag = function() {
                var t = this,
                    i = 0,
                    o = 0,
                    s = !1,
                    n = !1,
                    r = 0;
                t.$thumbOuter.addClass("lg-grab"), t.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(e) {
                    t.thumbTotalWidth > t.thumbOuterWidth && (
                        // execute only on .lg-object
                        e.preventDefault(), i = e.pageX, s = !0,
                        // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                        t.core.$outer.scrollLeft += 1, t.core.$outer.scrollLeft -= 1,
                        // *
                        t.thumbClickable = !1, t.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
                }), d(c).on("mousemove.lg.thumb", function(e) {
                    s && (r = t.left, n = !0, o = e.pageX, t.$thumbOuter.addClass("lg-dragging"), (r -= o - i) > t.thumbTotalWidth - t.thumbOuterWidth && (r = t.thumbTotalWidth - t.thumbOuterWidth), r < 0 && (r = 0),
                        // move current slide
                        t.setTranslate(r))
                }), d(c).on("mouseup.lg.thumb", function() {
                    n ? (n = !1, t.$thumbOuter.removeClass("lg-dragging"), t.left = r, Math.abs(o - i) < t.core.s.swipeThreshold && (t.thumbClickable = !0)) : t.thumbClickable = !0, s && (s = !1, t.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
                })
            }, o.prototype.enableThumbSwipe = function() {
                var t = this,
                    i = 0,
                    o = 0,
                    s = !1,
                    n = 0;
                t.core.$outer.find(".lg-thumb").on("touchstart.lg", function(e) {
                    t.thumbTotalWidth > t.thumbOuterWidth && (e.preventDefault(), i = e.originalEvent.targetTouches[0].pageX, t.thumbClickable = !1)
                }), t.core.$outer.find(".lg-thumb").on("touchmove.lg", function(e) {
                    t.thumbTotalWidth > t.thumbOuterWidth && (e.preventDefault(), o = e.originalEvent.targetTouches[0].pageX, s = !0, t.$thumbOuter.addClass("lg-dragging"), n = t.left, (n -= o - i) > t.thumbTotalWidth - t.thumbOuterWidth && (n = t.thumbTotalWidth - t.thumbOuterWidth), n < 0 && (n = 0),
                        // move current slide
                        t.setTranslate(n))
                }), t.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
                    t.thumbTotalWidth > t.thumbOuterWidth && s ? (s = !1, t.$thumbOuter.removeClass("lg-dragging"), Math.abs(o - i) < t.core.s.swipeThreshold && (t.thumbClickable = !0), t.left = n) : t.thumbClickable = !0
                })
            }, o.prototype.toogle = function() {
                var e = this;
                e.core.s.toogleThumb && (e.core.$outer.addClass("lg-can-toggle"), e.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), e.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
                    e.core.$outer.toggleClass("lg-thumb-open")
                }))
            }, o.prototype.thumbkeyPress = function() {
                var t = this;
                d(c).on("keydown.lg.thumb", function(e) {
                    38 === e.keyCode ? (e.preventDefault(), t.core.$outer.addClass("lg-thumb-open")) : 40 === e.keyCode && (e.preventDefault(), t.core.$outer.removeClass("lg-thumb-open"))
                })
            }, o.prototype.destroy = function() {
                this.core.s.thumbnail && 1 < this.core.$items.length && (d(c).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
            }, d.fn.lightGallery.modules.Thumbnail = o
    }(jQuery, window, document),
    function(p, e, t, i) {
        "use strict";
        var o = {
                videoMaxWidth: "855px",
                youtubePlayerParams: !1,
                vimeoPlayerParams: !1,
                dailymotionPlayerParams: !1,
                vkPlayerParams: !1,
                videojs: !1,
                videojsOptions: {}
            },
            s = function(e) {
                return this.core = p(e).data("lightGallery"), this.$el = p(e), this.core.s = p.extend({}, o, this.core.s), this.videoLoaded = !1, this.init(), this
            };
        s.prototype.init = function() {
            var u = this;
            // Event triggered when video url found without poster
            u.core.$el.on("hasVideo.lg.tm", function(e, t, i, o) {
                    if (u.core.$slide.eq(t).find(".lg-video").append(u.loadVideo(i, "lg-object", !0, t, o)), o)
                        if (u.core.s.videojs) try {
                            videojs(u.core.$slide.eq(t).find(".lg-html5").get(0), u.core.s.videojsOptions, function() {
                                u.videoLoaded || this.play()
                            })
                        } catch (e) {
                            console.error("Make sure you have included videojs")
                        } else u.core.$slide.eq(t).find(".lg-html5").get(0).play()
                }),
                // Set max width for video
                u.core.$el.on("onAferAppendSlide.lg.tm", function(e, t) {
                    u.core.$slide.eq(t).find(".lg-video-cont").css("max-width", u.core.s.videoMaxWidth), u.videoLoaded = !0
                });
            var t = function(i) {
                // check slide has poster
                if (i.find(".lg-object").hasClass("lg-has-poster") && i.find(".lg-object").is(":visible"))
                // check already video element present
                    if (i.hasClass("lg-has-video")) {
                    var e = i.find(".lg-youtube").get(0),
                        t = i.find(".lg-vimeo").get(0),
                        o = i.find(".lg-dailymotion").get(0),
                        s = i.find(".lg-html5").get(0);
                    if (e) e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    else if (t) try {
                            $f(t).api("play")
                        } catch (e) {
                            console.error("Make sure you have included froogaloop2 js")
                        } else if (o) o.contentWindow.postMessage("play", "*");
                        else if (s)
                        if (u.core.s.videojs) try {
                            videojs(s).play()
                        } catch (e) {
                            console.error("Make sure you have included videojs")
                        } else s.play();
                    i.addClass("lg-video-playing")
                } else {
                    var n, r;
                    i.addClass("lg-video-playing lg-has-video");
                    var a = function(e, t) {
                        if (i.find(".lg-video").append(u.loadVideo(e, "", !1, u.core.index, t)), t)
                            if (u.core.s.videojs) try {
                                videojs(u.core.$slide.eq(u.core.index).find(".lg-html5").get(0), u.core.s.videojsOptions, function() {
                                    this.play()
                                })
                            } catch (e) {
                                console.error("Make sure you have included videojs")
                            } else u.core.$slide.eq(u.core.index).find(".lg-html5").get(0).play()
                    };
                    u.core.s.dynamic ? a(n = u.core.s.dynamicEl[u.core.index].src, r = u.core.s.dynamicEl[u.core.index].html) : a(n = u.core.$items.eq(u.core.index).attr("href") || u.core.$items.eq(u.core.index).attr("data-src"), r = u.core.$items.eq(u.core.index).attr("data-html"));
                    var l = i.find(".lg-object");
                    i.find(".lg-video").append(l),
                        // @todo loading icon for html5 videos also
                        // for showing the loading indicator while loading video
                        i.find(".lg-video-object").hasClass("lg-html5") || (i.removeClass("lg-complete"), i.find(".lg-video-object").on("load.lg error.lg", function() {
                            i.addClass("lg-complete")
                        }))
                }
            };
            u.core.doCss() && 1 < u.core.$items.length && (u.core.s.enableSwipe && u.core.isTouch || u.core.s.enableDrag && !u.core.isTouch) ? u.core.$el.on("onSlideClick.lg.tm", function() {
                    var e = u.core.$slide.eq(u.core.index);
                    t(e)
                }) :
                // For IE 9 and bellow
                u.core.$slide.on("click.lg", function() {
                    t(p(this))
                }), u.core.$el.on("onBeforeSlide.lg.tm", function(e, t, i) {
                    var o = u.core.$slide.eq(t),
                        s = o.find(".lg-youtube").get(0),
                        n = o.find(".lg-vimeo").get(0),
                        r = o.find(".lg-dailymotion").get(0),
                        a = o.find(".lg-vk").get(0),
                        l = o.find(".lg-html5").get(0),
                        d;
                    if (s) s.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                    else if (n) try {
                            $f(n).api("pause")
                        } catch (e) {
                            console.error("Make sure you have included froogaloop2 js")
                        } else if (r) r.contentWindow.postMessage("pause", "*");
                        else if (l)
                        if (u.core.s.videojs) try {
                            videojs(l).pause()
                        } catch (e) {
                            console.error("Make sure you have included videojs")
                        } else l.pause();
                    a && p(a).attr("src", p(a).attr("src").replace("&autoplay", "&noplay")), d = u.core.s.dynamic ? u.core.s.dynamicEl[i].src : u.core.$items.eq(i).attr("href") || u.core.$items.eq(i).attr("data-src");
                    var c = u.core.isVideo(d, i) || {};
                    (c.youtube || c.vimeo || c.dailymotion || c.vk) && u.core.$outer.addClass("lg-hide-download");
                    //$videoSlide.addClass('lg-complete');
                }), u.core.$el.on("onAfterSlide.lg.tm", function(e, t) {
                    u.core.$slide.eq(t).removeClass("lg-video-playing")
                })
        }, s.prototype.loadVideo = function(e, t, i, o, s) {
            var n = "",
                r = 1,
                a = "",
                l = this.core.isVideo(e, o) || {};
            if (
                // Enable autoplay for first video if poster doesn't exist
                i && (r = this.videoLoaded ? 0 : 1), l.youtube) a = "?wmode=opaque&autoplay=" + r + "&enablejsapi=1", this.core.s.youtubePlayerParams && (a = a + "&" + p.param(this.core.s.youtubePlayerParams)), n = '<iframe class="lg-video-object lg-youtube ' + t + '" width="560" height="315" src="//www.youtube.com/embed/' + l.youtube[1] + a + '" frameborder="0" allowfullscreen></iframe>';
            else if (l.vimeo) a = "?autoplay=" + r + "&api=1", this.core.s.vimeoPlayerParams && (a = a + "&" + p.param(this.core.s.vimeoPlayerParams)), n = '<iframe class="lg-video-object lg-vimeo ' + t + '" width="560" height="315"  src="//player.vimeo.com/video/' + l.vimeo[1] + a + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            else if (l.dailymotion) a = "?wmode=opaque&autoplay=" + r + "&api=postMessage", this.core.s.dailymotionPlayerParams && (a = a + "&" + p.param(this.core.s.dailymotionPlayerParams)), n = '<iframe class="lg-video-object lg-dailymotion ' + t + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + l.dailymotion[1] + a + '" frameborder="0" allowfullscreen></iframe>';
            else if (l.html5) {
                var d = s.substring(0, 1);
                "." !== d && "#" !== d || (s = p(s).html()), n = s
            } else l.vk && (a = "&autoplay=" + r, this.core.s.vkPlayerParams && (a = a + "&" + p.param(this.core.s.vkPlayerParams)), n = '<iframe class="lg-video-object lg-vk ' + t + '" width="560" height="315" src="http://vk.com/video_ext.php?' + l.vk[1] + a + '" frameborder="0" allowfullscreen></iframe>');
            return n
        }, s.prototype.destroy = function() {
            this.videoLoaded = !1
        }, p.fn.lightGallery.modules.video = s
    }(jQuery, window, document),
    function(u, p, e, t) {
        "use strict";
        var i = {
                scale: 1,
                zoom: !0,
                actualSize: !0,
                enableZoomAfter: 300
            },
            o = function(e) {
                return this.core = u(e).data("lightGallery"), this.core.s = u.extend({}, i, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(),
                    // Store the zoomable timeout value just to clear it while closing
                    this.zoomabletimeout = !1,
                    // Set the initial value center
                    this.pageX = u(p).width() / 2, this.pageY = u(p).height() / 2 + u(p).scrollTop()), this
            };
        o.prototype.init = function() {
                var l = this,
                    e = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
                l.core.s.actualSize && (e += '<span id="lg-actual-size" class="lg-icon"></span>'), this.core.$outer.find(".lg-toolbar").append(e),
                    // Add zoomable class
                    l.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(e, t, i) {
                        // delay will be 0 except first time
                        var o = l.core.s.enableZoomAfter + i;
                        // set _speed value 0 if gallery opened from direct url and if it is first slide
                        u("body").hasClass("lg-from-hash") && i ?
                            // will execute only once
                            o = 0 :
                            // Remove lg-from-hash to enable starting animation.
                            u("body").removeClass("lg-from-hash"), l.zoomabletimeout = setTimeout(function() {
                                l.core.$slide.eq(t).addClass("lg-zoomable")
                            }, o + 30)
                    });
                var a = 1,
                    t = function(e) {
                        var t = l.core.$outer.find(".lg-current .lg-image"),
                            i, o, s = (u(p).width() - t.width()) / 2,
                            n = (u(p).height() - t.height()) / 2 + u(p).scrollTop(),
                            r = (e - 1) * (i = l.pageX - s),
                            a = (e - 1) * (o = l.pageY - n);
                        t.css("transform", "scale3d(" + e + ", " + e + ", 1)").attr("data-scale", e), t.parent().css({
                            left: -r + "px",
                            top: -a + "px"
                        }).attr("data-x", r).attr("data-y", a)
                    },
                    d = function() {
                        1 < a ? l.core.$outer.addClass("lg-zoomed") : l.resetZoom(), a < 1 && (a = 1), t(a)
                    },
                    o = function(e, t, i, o) {
                        var s = t.width(),
                            n, r;
                        n = l.core.s.dynamic ? l.core.s.dynamicEl[i].width || t[0].naturalWidth || s : l.core.$items.eq(i).attr("data-width") || t[0].naturalWidth || s, l.core.$outer.hasClass("lg-zoomed") ? a = 1 : s < n && (a = (r = n / s) || 2), l.pageY = o ? (l.pageX = u(p).width() / 2, u(p).height() / 2 + u(p).scrollTop()) : (l.pageX = e.pageX || e.originalEvent.targetTouches[0].pageX, e.pageY || e.originalEvent.targetTouches[0].pageY), d(), setTimeout(function() {
                            l.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                        }, 10)
                    },
                    s = !1;
                /**
                 * @desc Image zoom
                 * Translate the wrap and scale the image to get better user experience
                 *
                 * @param {String} scaleVal - Zoom decrement/increment value
                 */
                // event triggered after appending slide content
                l.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(e, t) {
                        // Get the current element
                        var i = l.core.$slide.eq(t).find(".lg-image");
                        i.on("dblclick", function(e) {
                            o(e, i, t)
                        }), i.on("touchstart", function(e) {
                            s ? (clearTimeout(s), s = null, o(e, i, t)) : s = setTimeout(function() {
                                s = null
                            }, 300), e.preventDefault()
                        })
                    }),
                    // Update zoom on resize and orientationchange
                    u(p).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
                        l.pageX = u(p).width() / 2, l.pageY = u(p).height() / 2 + u(p).scrollTop(), t(a)
                    }), u("#lg-zoom-out").on("click.lg", function() {
                        l.core.$outer.find(".lg-current .lg-image").length && (a -= l.core.s.scale, d())
                    }), u("#lg-zoom-in").on("click.lg", function() {
                        l.core.$outer.find(".lg-current .lg-image").length && (a += l.core.s.scale, d())
                    }), u("#lg-actual-size").on("click.lg", function(e) {
                        o(e, l.core.$slide.eq(l.core.index).find(".lg-image"), l.core.index, !0)
                    }),
                    // Reset zoom on slide change
                    l.core.$el.on("onBeforeSlide.lg.tm", function() {
                        a = 1, l.resetZoom()
                    }),
                    // Drag option after zoom
                    l.core.isTouch || l.zoomDrag(), l.core.isTouch && l.zoomSwipe()
            },
            // Reset zoom effect
            o.prototype.resetZoom = function() {
                this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"),
                    // Reset pagx pagy values to center
                    this.pageX = u(p).width() / 2, this.pageY = u(p).height() / 2 + u(p).scrollTop()
            }, o.prototype.zoomSwipe = function() {
                var s = this,
                    n = {},
                    r = {},
                    a = !1,
                    l = !1,
                    d = !1;
                s.core.$slide.on("touchstart.lg", function(e) {
                    if (s.core.$outer.hasClass("lg-zoomed")) {
                        var t = s.core.$slide.eq(s.core.index).find(".lg-object");
                        d = t.outerHeight() * t.attr("data-scale") > s.core.$outer.find(".lg").height(), ((l = t.outerWidth() * t.attr("data-scale") > s.core.$outer.find(".lg").width()) || d) && (e.preventDefault(), n = {
                            x: e.originalEvent.targetTouches[0].pageX,
                            y: e.originalEvent.targetTouches[0].pageY
                        })
                    }
                }), s.core.$slide.on("touchmove.lg", function(e) {
                    if (s.core.$outer.hasClass("lg-zoomed")) {
                        var t = s.core.$slide.eq(s.core.index).find(".lg-img-wrap"),
                            i, o;
                        e.preventDefault(), a = !0, r = {
                                x: e.originalEvent.targetTouches[0].pageX,
                                y: e.originalEvent.targetTouches[0].pageY
                            },
                            // reset opacity and transition duration
                            s.core.$outer.addClass("lg-zoom-dragging"), o = d ? -Math.abs(t.attr("data-y")) + (r.y - n.y) : -Math.abs(t.attr("data-y")), i = l ? -Math.abs(t.attr("data-x")) + (r.x - n.x) : -Math.abs(t.attr("data-x")), (15 < Math.abs(r.x - n.x) || 15 < Math.abs(r.y - n.y)) && t.css({
                                left: i + "px",
                                top: o + "px"
                            })
                    }
                }), s.core.$slide.on("touchend.lg", function() {
                    s.core.$outer.hasClass("lg-zoomed") && a && (a = !1, s.core.$outer.removeClass("lg-zoom-dragging"), s.touchendZoom(n, r, l, d))
                })
            }, o.prototype.zoomDrag = function() {
                var s = this,
                    n = {},
                    r = {},
                    a = !1,
                    l = !1,
                    d = !1,
                    c = !1;
                s.core.$slide.on("mousedown.lg.zoom", function(e) {
                    // execute only on .lg-object
                    var t = s.core.$slide.eq(s.core.index).find(".lg-object");
                    c = t.outerHeight() * t.attr("data-scale") > s.core.$outer.find(".lg").height(), d = t.outerWidth() * t.attr("data-scale") > s.core.$outer.find(".lg").width(), s.core.$outer.hasClass("lg-zoomed") && u(e.target).hasClass("lg-object") && (d || c) && (e.preventDefault(), n = {
                            x: e.pageX,
                            y: e.pageY
                        }, a = !0,
                        // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                        s.core.$outer.scrollLeft += 1, s.core.$outer.scrollLeft -= 1, s.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
                }), u(p).on("mousemove.lg.zoom", function(e) {
                    if (a) {
                        var t = s.core.$slide.eq(s.core.index).find(".lg-img-wrap"),
                            i, o;
                        l = !0, r = {
                                x: e.pageX,
                                y: e.pageY
                            },
                            // reset opacity and transition duration
                            s.core.$outer.addClass("lg-zoom-dragging"), o = c ? -Math.abs(t.attr("data-y")) + (r.y - n.y) : -Math.abs(t.attr("data-y")), i = d ? -Math.abs(t.attr("data-x")) + (r.x - n.x) : -Math.abs(t.attr("data-x")), t.css({
                                left: i + "px",
                                top: o + "px"
                            })
                    }
                }), u(p).on("mouseup.lg.zoom", function(e) {
                    a && (a = !1, s.core.$outer.removeClass("lg-zoom-dragging"),
                        // Fix for chrome mouse move on click
                        !l || n.x === r.x && n.y === r.y || (r = {
                            x: e.pageX,
                            y: e.pageY
                        }, s.touchendZoom(n, r, d, c)), l = !1), s.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                })
            }, o.prototype.touchendZoom = function(e, t, i, o) {
                var s = this,
                    n = s.core.$slide.eq(s.core.index).find(".lg-img-wrap"),
                    r = s.core.$slide.eq(s.core.index).find(".lg-object"),
                    a = -Math.abs(n.attr("data-x")) + (t.x - e.x),
                    l = -Math.abs(n.attr("data-y")) + (t.y - e.y),
                    d = (s.core.$outer.find(".lg").height() - r.outerHeight()) / 2,
                    c = Math.abs(r.outerHeight() * Math.abs(r.attr("data-scale")) - s.core.$outer.find(".lg").height() + d),
                    u = (s.core.$outer.find(".lg").width() - r.outerWidth()) / 2,
                    p = Math.abs(r.outerWidth() * Math.abs(r.attr("data-scale")) - s.core.$outer.find(".lg").width() + u);
                (15 < Math.abs(t.x - e.x) || 15 < Math.abs(t.y - e.y)) && (o && (l <= -c ? l = -c : -d <= l && (l = -d)), i && (a <= -p ? a = -p : -u <= a && (a = -u)), o ? n.attr("data-y", Math.abs(l)) : l = -Math.abs(n.attr("data-y")), i ? n.attr("data-x", Math.abs(a)) : a = -Math.abs(n.attr("data-x")), n.css({
                    left: a + "px",
                    top: l + "px"
                }))
            }, o.prototype.destroy = function() {
                var e = this;
                // Unbind all events added by lightGallery zoom plugin
                e.core.$el.off(".lg.zoom"), u(p).off(".lg.zoom"), e.core.$slide.off(".lg.zoom"), e.core.$el.off(".lg.tm.zoom"), e.resetZoom(), clearTimeout(e.zoomabletimeout), e.zoomabletimeout = !1
            }, u.fn.lightGallery.modules.zoom = o
    }(jQuery, window, document),
    function(i, s, e, t) {
        "use strict";
        var o = {
                hash: !0
            },
            n = function(e) {
                return this.core = i(e).data("lightGallery"), this.core.s = i.extend({}, o, this.core.s), this.core.s.hash && (this.oldHash = s.location.hash, this.init()), this
            };
        n.prototype.init = function() {
            var o = this,
                t;
            // Change hash value on after each slide transition
            o.core.$el.on("onAfterSlide.lg.tm", function(e, t, i) {
                    s.location.hash = "lg=" + o.core.s.galleryId + "&slide=" + i
                }),
                // Listen hash change and change the slide according to slide value
                i(s).on("hashchange.lg.hash", function() {
                    t = s.location.hash;
                    var e = parseInt(t.split("&slide=")[1], 10);
                    // it galleryId doesn't exist in the url close the gallery
                    - 1 < t.indexOf("lg=" + o.core.s.galleryId) ? o.core.slide(e, !1, !1) : o.core.lGalleryOn && o.core.destroy()
                })
        }, n.prototype.destroy = function() {
            this.core.s.hash && (
                // Reset to old hash value
                this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? s.location.hash = this.oldHash : history.pushState ? history.pushState("", e.title, s.location.pathname + s.location.search) : s.location.hash = "", this.core.$el.off(".lg.hash"))
        }, i.fn.lightGallery.modules.hash = n
    }(jQuery, window, document),
    /*!
     * jQuery Cookie Plugin v1.4.1
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2006, 2014 Klaus Hartl
     * Released under the MIT license
     */
    function(e) {
        "function" == typeof define && define.amd ?
            // AMD (Register as an anonymous module)
            define(["jquery"], e) : "object" == typeof exports ?
            // Node/CommonJS
            module.exports = e(require("jquery")) :
            // Browser globals
            e(jQuery)
    }(function(p) {
        function h(e) {
            return v.raw ? e : encodeURIComponent(e)
        }

        function m(e) {
            return v.raw ? e : decodeURIComponent(e)
        }

        function g(e) {
            return h(v.json ? JSON.stringify(e) : String(e))
        }

        function o(e) {
            0 === e.indexOf('"') && (
                // This is a quoted cookie as according to RFC2068, unescape...
                e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                // Replace server-side written pluses with spaces.
                // If we can't decode the cookie, ignore it, it's unusable.
                // If we can't parse the cookie, ignore it, it's unusable.
                return e = decodeURIComponent(e.replace(t, " ")), v.json ? JSON.parse(e) : e
            } catch (e) {}
        }

        function f(e, t) {
            var i = v.raw ? e : o(e);
            return p.isFunction(t) ? t(i) : i
        }
        var t = /\+/g,
            v = p.cookie = function(e, t, i) {
                // Write
                if (1 < arguments.length && !p.isFunction(t)) {
                    if ("number" == typeof(i = p.extend({}, v.defaults, i)).expires) {
                        var o = i.expires,
                            s = i.expires = new Date;
                        s.setMilliseconds(s.getMilliseconds() + 864e5 * o)
                    }
                    return document.cookie = [h(e), "=", g(t), i.expires ? "; expires=" + i.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
                        i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""
                    ].join("")
                }
                // Read
                for (var n = e ? void 0 : {},
                        // To prevent the for loop in the first place assign an empty array
                        // in case there are no cookies at all. Also prevents odd result when
                        // calling $.cookie().
                        r = document.cookie ? document.cookie.split("; ") : [], a = 0, l = r.length; a < l; a++) {
                    var d = r[a].split("="),
                        c = m(d.shift()),
                        u = d.join("=");
                    if (e === c) {
                        // If second argument (value) is a function it's a converter...
                        n = f(u, t);
                        break
                    }
                    // Prevent storing a cookie that we couldn't decode.
                    e || void 0 === (u = f(u)) || (n[c] = u)
                }
                return n
            };
        v.defaults = {}, p.removeCookie = function(e, t) {
            // Must not alter options, thus extending a fresh object...
            return p.cookie(e, "", p.extend({}, t, {
                expires: -1
            })), !p.cookie(e)
        }
    }),
    /*
    --------------------------------------------------------------------------------
        ____            __                __         
       / __ \________  / /___  ____ _____/ /__  _____
      / /_/ / ___/ _ \/ / __ \/ __ `/ __  / _ \/ ___/
     / ____/ /  /  __/ / /_/ / /_/ / /_/ /  __/ /    
    /_/   /_/   \___/_/\____/\__,_/\__,_/\___/_/     

    --------------------------------------------------------------------------------
    Preloader
    */
    $ = jQuery, $(window).load(function() {
        $(".preloader").addClass("fade_out"), $("body").removeClass("lock")
    }),
    /*
    --------------------------------------------------------------------------------
        __  __                        ____                             
       / / / /___  ____ ___  ___     / __ )____ _____  ____  ___  _____
      / /_/ / __ \/ __ `__ \/ _ \   / __  / __ `/ __ \/ __ \/ _ \/ ___/
     / __  / /_/ / / / / / /  __/  / /_/ / /_/ / / / / / / /  __/ /    
    /_/ /_/\____/_/ /_/ /_/\___/  /_____/\__,_/_/ /_/_/ /_/\___/_/     

    --------------------------------------------------------------------------------
    Home Banner
    */
    jQuery(document).ready(function(e) {
        // Owl 1
        e(".home-carousel-banner").owlCarousel({
            navigation: !1,
            slideSpeed: 300,
            pagination: !0,
            paginationSpeed: 400,
            autoPlay: 6e3,
            singleItem: !0
        });
        // Owl 2
        // $(".home_hero_carousel").owlCarousel({
        //     items: 1,
        //     nav: false,
        //     dots: true,
        //     loop: false,
        //     dotsSpeed: 400,
        //     autoplay: true,
        //     autoplayTimeout: 6000
        // });
        // LightSlider
        // $('home_hero_carousel').lightSlider({
        //     item: 1,
        //     loop: true,
        //     cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        //     controls: false,
        //     pager: true,
        //     auto: true,
        //     pause: 6000,
        //     slideMargin: 0
        // });
    }); // JS Awesomeness
/*
-------------------------------------------
    ____           __          __
   /  _/___  _____/ /_  ______/ /__  _____
   / // __ \/ ___/ / / / / __  / _ \/ ___/
 _/ // / / / /__/ / /_/ / /_/ /  __(__  )
/___/_/ /_/\___/_/\__,_/\__,_/\___/____/

-------------------------------------------
*/
// Helpers
// @codekit-append "inc/_ajax.js";
// @codekit-append "../geo-footer/_geo-footer.js";
// @codekit-append "../search-form/_search-form.js";
// @codekit-prepend "inc/_geo.js";
// @codekit-prepend "inc/_object-fit.js";
// @codekit-prepend "inc/_maps.js";
// @codekit-prepend "inc/_browser-detect.js";
// @codekit-prepend "inc/_in-view.js";
// @codekit-prepend "inc/_sticky-header.js";
// @codekit-prepend "inc/_cleave.js";
// @codekit-prepend "inc/_lity.js";
// @codekit-prepend "inc/_slick.js";
// @codekit-prepend "inc/_ofi.js";
// Libs
// @codekit-prepend "../lib/owl/owl-one/js/_owl.js";
// @codekit-prepend "../lib/lightgallery/js/_lightgallery.js";
// @codekit-prepend "../lib/cookies/index.js";
// Frameworks
// @codekit-prepend "../inc/modules/preloader/js/_preloader.js";
// @codekit-prepend "../inc/modules/flexible-content/js/_flexible-content.js";
// @codekit-prepend "../inc/modules/home/js/_banners.js";
var map = null,
    blogPage = 1;
jQuery(document).ready(function(i) {
    i(function() {
        objectFitImages()
    });
    var t = i(".page-template-blog .total_pages").text();
    t <= blogPage && i(".load_more_blog_posts").hide(), i(".load_more_blog_posts").click(function(e) {
            e.preventDefault(), i(this).children("a").hasClass("loading") || (t <= ++blogPage && i(".load_more_blog_posts").hide(), i(this).children("a").addClass("loading").text("Loading"), loadMorePosts(blogPage))
        }),
        // Init maps
        i(".acf-map").each(function() {
            map = new_map(i(this))
        }),
        // $('.allergens_panel .clear_filters').click(function(){
        //   $('.allergens_panel .filter').removeClass('active');
        //   $('.menu_block .item:not([data-hover])').removeClass('cross');
        // });
        // $('.allergens_panel .filter').click(function(){
        //   $(this).toggleClass('active');
        //   $('.menu_block .item:not([data-hover])').removeClass('cross');
        //   var activeFilters = [];
        //   $('.allergens_panel .filter.active').each(function(){
        //     var data = $(this).data();
        //     for (var key in data) { activeFilters.push(key) }
        //   })
        //   $('.menu_block .item:not([data-hover])').each(function(){
        //     var data = $(this).data();
        //     for (var key in data) {
        //       if($.inArray(key, activeFilters) !== -1){
        //         $(this).addClass('cross');
        //       }
        //     }
        //   })
        // });
        i(".allergens_toggle").click(function(e) {
            e.preventDefault(), i(this).toggleClass("active"), i(this).hasClass("active") ? i(this).text("Hide allergens") : i(this).text("Show allergens"), i(".menu_block .item").toggleClass("show"), i(".allergens_panel").slideToggle(200, "swing")
        }), i(document).on("mouseover", ".allergens .item", function() {
            var e = i(this).data("hover");
            i(this).siblings(".info_hover").show().text(e)
        }), i(document).on("mouseout", ".allergens .item", function() {
            i(this).siblings(".info_hover").hide()
        }),
        // $('.allergens_panel input[type="checkbox"]').change(function(){
        //   $('.menu_block .item').toggleClass('show');
        // });
        i(".geo_error a").click(function() {
            i(".geo_error").removeClass("show")
        }),
        // Select all links with hashes
        i(document).on("click", ".smoothscroll", function(e) {
            e.preventDefault(), i("html, body").animate({
                scrollTop: i(i.attr(this, "href")).offset().top - 90
            }, 500)
        }),
        // Select all links with hashes
        i(document).on("click", ".smoothscroll-menu", function(e) {
            e.preventDefault(), i("html, body").animate({
                scrollTop: i(i.attr(this, "href")).offset().top - 180
            }, 500)
        }),
        //Legal tabs
        i(".tabs_wrapper .tab").click(function(e) {
            e.preventDefault(), i(this).siblings("ul.children").toggle();
            var t = i(this).attr("href");
            i(".tab").removeClass("active"), i(this).addClass("active"), i(this).parent("li").parent("ul").hasClass("children") && i(this).parent("li").parent("ul").siblings(".tab").addClass("active"), i(".tab_content_container .tab_content").hide(), i(".tab_content_container " + t).show()
        });
    var e = window.location.hash;
    if (e) {
        var o = i('.tabs_wrapper .tab[href="' + e + '"]');
        o.parent("li").parent("ul").hasClass("children") && o.parent("li").parent("ul").siblings(".tab").trigger("click"), o.trigger("click")
    } else i(".tabs_wrapper > .tabs_container > li:first-child > .tab").trigger("click");
    i("footer .list-wrap .hash a").click(function() {
            var e = this.hash,
                t = i('.tabs_wrapper .tab[href="' + e + '"]');
            t.parent("li").parent("ul").hasClass("children") && t.parent("li").parent("ul").siblings(".tab").trigger("click"), t.trigger("click"), i("html, body").animate({
                scrollTop: i(e).offset().top - 90
            }, 500)
        }),
        // Ask for location if cookie doesnt exist
        // if ($.cookie('fmanca_lat') === undefined){
        // getLocation(),
        // }
        // Get location on click
        i(".get_location").click(function() {
            i(".get_location").addClass("loading"), getLocation(!0)
        }),
        // Close cookie notification
        i(".cookie_notification a.close").click(function() {
            i.cookie("fmanca_cookie_notification", !0), i(".cookie_notification").hide()
        }), i(document).mouseup(function(e) {
            var t = i(".cookie_notification");
            t.is(e.target) || 0 !== t.has(e.target).length || (i.cookie("fmanca_cookie_notification", !0), i(".cookie_notification").hide())
        }), i(".burger, .mobile_close").click(function(e) {
            100 < i(document).scrollTop() ? i(".menu-mobile-container").toggleClass("shrunk-margin") : i(".menu-mobile-container").toggleClass("full-margin"), i(".header_wrap header").toggleClass("menu_closed"), i("#mobile_menu").toggleClass("open"), i(".mobile_close").toggleClass("show"), i(".burger").toggleClass("hide"), i("body").toggleClass("lock")
        })
        /*--------------------------------------*
          Cause safari doesnt know date à² _à² 
          ---------------------------------------*/
        , "date" != i('[type="date"]').prop("type") 
        /*--------------------------------------*
          Disbale Social Links on Feedback
          ---------------------------------------*/
    ;
    var s = i(".social_links");
    /*--------------------------------------*
      Prepend Ticket field
      ---------------------------------------*/
    if (i(".contact_form").length && (s.hide(), s.next(".divider").hide()), i("#ticket-id").length) var n = new Cleave("#ticket-id", {
        prefix: "3P47U",
        delimiter: "-",
        blocks: [5, 5, 4],
        uppercase: !0
    });
    /*--------------------------------------*
      SLick Venue
      ---------------------------------------*/
    i(".venue .thumb").slick()
}), jQuery(document).ready(function(i) {
    function e() {
        var e = i(this).scrollTop();
        // Make sure they scroll more than delta
        Math.abs(o - e) <= 44 || (o < e && n < e ? i(".geo_footer.minimized").removeClass("up").addClass("down") : e + i(window).height() < i(document).height() && i(".geo_footer.minimized").removeClass("down").addClass("up"), o = e)
    }
    // scroll behaviour
    var t;
    // Search
    i(".geo_footer").on("submit", ".search_locations", function(e) {
            e.preventDefault();
            var t = i(this).find('input[type="text"]').val();
            (t = t.trim()) && (i(this).children('input[type="submit"]').val("Searching"), searchGeoFooter(t))
        }),
        // expand
        i(".geo_footer .find_us").click(function(e) {
            e.preventDefault(), i(".geo_footer").addClass("expanded_one"), i(".geo_footer_overlay").addClass("show"), i(".header_wrap").addClass("behind"), void 0 === i.cookie("fmanca_lat") || (i(".geo_footer .closest").show(), i(".geo_footer .nearby").hide(), i(".geo_footer .search_locations").hide()), i(".geo_footer .search_locations_results").hide()
        }), i(".geo_footer").on("click", ".see_more", function(e) {
            e.preventDefault(), i(".geo_footer").addClass("expanded_two"), void 0 !== i.cookie("fmanca_lat") && (i(".geo_footer .search_locations").show(), i(".geo_footer .closest").hide(), i(".geo_footer .nearby").show())
        }), i(".geo_footer_overlay").click(function() {
            i(".header_wrap").removeClass("behind"), i(".geo_footer").removeClass("expanded_one expanded_two"), i(".geo_footer_overlay").removeClass("show")
        });
    var o = 0,
        s = 44,
        n = i(".header_wrap").outerHeight();
    i(window).scroll(function(e) {
        t = !0
    }), setInterval(function() {
        t && (e(), t = !1)
    }, 250)
}), jQuery(document).ready(function(i) {
    function o(e) {
        i.ajax({
            url: my_ajax_object.ajax_url,
            dataType: "html",
            type: "POST",
            data: {
                action: "search_form_results",
                address: e,
                is_ajax: !0
            },
            success: function(e) {
                i(".restaurant_search_results").addClass("show").html(e), i("html, body").animate({
                    scrollTop: i("#restaurant_search_results").offset().top - 90
                }, 500), i('.search_form form input[type="submit"]').val("Search"), map = new_map(i(".restaurant_search_results .acf-map"))
            }
        })
    }
    i(".search_form .expand_view_all").click(function(e) {
        e.preventDefault(), i(".restaurant_search_results").removeClass("show"), i(".restaurant_listing").toggleClass("show"), i(".restaurant_listing .map").hasClass("acf-map") || (i(".restaurant_listing .map").addClass("acf-map"), map = new_map(i(".restaurant_listing .acf-map")))
    }), i(".search_form form").submit(function(e) {
        e.preventDefault(), i(".restaurant_listing").removeClass("show");
        var t = i(this).find('input[type="text"]').val();
        (t = t.trim()) && (i(this).find('input[type="submit"]').val("Searching"), o(t))
    })
});