
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
		    val = String(val);
		    len = len || 2;
		    while (val.length < len) val = "0" + val;
		    return val;
		};

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			    d: d,
			    dd: pad(d),
			    ddd: dF.i18n.dayNames[D],
			    dddd: dF.i18n.dayNames[D + 7],
			    m: m + 1,
			    mm: pad(m + 1),
			    mmm: dF.i18n.monthNames[m],
			    mmmm: dF.i18n.monthNames[m + 12],
			    yy: String(y).slice(2),
			    yyyy: y,
			    h: H % 12 || 12,
			    hh: pad(H % 12 || 12),
			    H: H,
			    HH: pad(H),
			    M: M,
			    MM: pad(M),
			    s: s,
			    ss: pad(s),
			    l: pad(L, 3),
			    L: pad(L > 99 ? Math.round(L / 10) : L),
			    t: H < 12 ? "a" : "p",
			    tt: H < 12 ? "am" : "pm",
			    T: H < 12 ? "A" : "P",
			    TT: H < 12 ? "AM" : "PM",
			    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};


//
angular.module('login')
    .controller('WeatherAppController', function ($scope, $http) {
        var weatherApp = this;
        weatherApp.activated = false;
        weatherApp.returninfo = '';

        weatherApp.timeInfo = new Date();
        weatherApp.formattedtimeinfo = '';
        weatherApp.imageLink = '';

        weatherApp.getInfo = function () {
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=stockholm,se&appid=a2d5f4110420d7f211e79d14ca53ec8c&units=metric',
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    weatherApp.returninfo = data;
                    weatherApp.timeInfo = new Date(data.dt * 1000);
                    weatherApp.timeInfo.setMinutes(weatherApp.timeInfo.getMinutes() - weatherApp.timeInfo.getTimezoneOffset());
                    weatherApp.formattedtimeinfo = weatherApp.timeInfo.format("mm-dd-yyyy HH:MM:ss");
                    weatherApp.imageLink = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
                    if (!weatherApp.activated) {
                        weatherApp.updateWeatherInfo();
                        weatherApp.activated = true;
                    }
                    $scope.$apply();
                }
            });
        };
        weatherApp.getInfo();
        weatherApp.getWindDirection = function (degrees) {
            var direction = 'undefined';
            if (degrees >= 337.5)
                direction = 'NNW';
            else if (degrees >= 315)
                direction = 'NW';
            else if (degrees >= 315)
                direction = 'WNW';
            else if (degrees >= 292.5)
                direction = 'W';
            else if (degrees >= 270)
                direction = 'NW';
            else if (degrees >= 247.5)
                direction = 'WSW';
            else if (degrees >= 225)
                direction = 'SW';
            else if (degrees >= 202.5)
                direction = 'SSW';
            else if (degrees >= 180)
                direction = 'S';
            else if (degrees >= 157.5)
                direction = 'SSE';
            else if (degrees >= 135)
                direction = 'SE';
            else if (degrees >= 112.5)
                direction = 'ESE';
            else if (degrees >= 90)
                direction = 'E';
            else if (degrees >= 67.5)
                direction = 'ENE';
            else if (degrees >= 45)
                direction = 'NE';
            else if (degrees >= 22.5)
                direction = 'NNE';
            else if (degrees >= 0)
                direction = 'N';
            return direction;
        };
        weatherApp.updateWeatherInfo = function () {
            setInterval(function () {
                weatherApp.getInfo();
            }, 600000);
        };

    }).directive('weatherapp', function () {
        return {
            restrict: 'E',
            template: '<div ng-controller="WeatherAppController as weatherApp" class="row">                                                                             ' +
 '   <div style="background: yellow; border-radius: 10px;" class="col-lg-6 col-md-12 col-sm-12 col-xs-12">                                                              ' +
 '       <div class="row">                                                                                                                                              ' +
 '           <div class="col-lg-8 col-md-6 col-xs-6">                                                                                                                   ' +
 '               <div style="padding: 20px;">                                                                                                                           ' +
 '                   <h1>{{weatherApp.returninfo.name}}, {{weatherApp.returninfo.sys.country}}</h1>                                                                     ' +
 '                   <p>{{weatherApp.returninfo.main.temp}} &ordm;C</p>                                                                                                 ' +
 '                   <p>wind speed: {{weatherApp.returninfo.wind.speed}} m/s {{weatherApp.getWindDirection(weatherApp.returninfo.wind.deg)}}</p>                        ' +
 '                   <p class="hidden-sm hidden-xs">Information compilation time: {{weatherApp.formattedtimeinfo}}</p>                                                  ' +
 '               </div>                                                                                                                                                 ' +
 '           </div>                                                                                                                                                     ' +
 '           <img class="col-lg-4 col-sm-6 col-xs-6" src="{{weatherApp.imageLink}}" title="{{weatherApp.returninfo.weather[0].description}}" />                         ' +
 '                                                                                                                                                                      ' +
 '       </div>                                                                                                                                                         ' +
 '   </div>                                                                                                                                                             ' +
 '</div>                                                                                                                                                               '
        }
    });
