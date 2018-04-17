/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/scaler
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var Scaler = function () {
        function Scaler(element, options) {
            _classCallCheck(this, Scaler);

            var self = this;

            //extend by function call
            self.settings = $.extend(true, {
                resize_delay: 300
            }, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('scaler');
            self.settings = $.extend(true, self.settings, self.data_options);

            self.init();
        }

        _createClass(Scaler, [{
            key: 'init',
            value: function init() {

                var self = this;

                $(window).on('resize', function () {
                    if (this.resizeTO) clearTimeout(this.resizeTO);
                    this.resizeTO = setTimeout(function () {
                        $(this).trigger('resizeEnd.scaler');
                    }, self.settings.resize_delay);
                });

                self.on_resize();

                $(window).on('resizeEnd.scaler', function () {
                    self.on_resize();
                });
            }
        }, {
            key: 'on_resize',
            value: function on_resize() {
                var self = this;

                var ww = $(window).width();

                var scale_val = 1;

                self.settings.rules.forEach(function (rule) {

                    if (ww < rule.viewport_from && ww > rule.viewport_to) {

                        var viewport_distance = rule.viewport_from - rule.viewport_to;

                        var scale_distance = rule.scale_from - rule.scale_to;

                        scale_val = scale_distance * ((ww - rule.viewport_to) / viewport_distance) + rule.scale_to;
                    } else if (rule.sticky && ww < rule.viewport_to) {
                        scale_val = rule.scale_to;
                    } else if (!rule.sticky && ww < rule.viewport_to) {
                        scale_val = rule.scale_from;
                    }
                });

                self.set_scale(scale_val);
            }
        }, {
            key: 'set_scale',
            value: function set_scale(val) {
                var self = this;

                self.$element.css({
                    '-webkit-transform': 'scale(' + val + ')',
                    '-moz-transform': 'scale(' + val + ')',
                    '-ms-transform': 'scale(' + val + ')',
                    '-o-transform': 'scale(' + val + ')',
                    'transform': 'scale(' + val + ')'
                });
            }
        }]);

        return Scaler;
    }();

    $.fn.scaler = function () {
        var $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i = void 0,
            ret = void 0;
        for (i = 0; i < length; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].scaler = new Scaler($this[i], opt);else ret = $this[i].scaler[opt].apply($this[i].scaler, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };
})(jQuery);

/***/ })
/******/ ]);