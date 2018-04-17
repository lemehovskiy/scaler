/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/scaler
 */

'use strict';

(function ($) {

    class Scaler {

        constructor(element, options) {

            let self = this;

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

        init() {

            let self = this;
            
            $(window).on('resize', function(){
                if (this.resizeTO) clearTimeout(this.resizeTO);
                this.resizeTO = setTimeout(function () {
                    $(this).trigger('resizeEnd.scaler');
                }, self.settings.resize_delay);
            })

            self.on_resize();

            $(window).on('resizeEnd.scaler', function () {
                self.on_resize();
            })

        }


        on_resize() {
            let self = this;

            let ww = $(window).width();

            let scale_val = 1;

            self.settings.rules.forEach(function (rule) {

                if (ww < rule.viewport_from && ww > rule.viewport_to) {

                    let viewport_distance = rule.viewport_from - rule.viewport_to;

                    let scale_distance = rule.scale_from - rule.scale_to;

                    scale_val = (scale_distance * ((ww - rule.viewport_to) / viewport_distance) + rule.scale_to);
                }

                else if (rule.sticky && ww < rule.viewport_to) {
                    scale_val = rule.scale_to;
                }

                else if (!rule.sticky && ww < rule.viewport_to) {
                    scale_val = rule.scale_from;
                }
            })

            self.set_scale(scale_val);
        }

        set_scale(val){
            let self = this;

            self.$element.css({
                '-webkit-transform': 'scale(' + val + ')',
                '-moz-transform': 'scale(' + val + ')',
                '-ms-transform': 'scale(' + val + ')',
                '-o-transform': 'scale(' + val + ')',
                'transform': 'scale(' + val + ')'
            });
        }
    }


    $.fn.scaler = function () {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].scaler = new Scaler($this[i], opt);
            else
                ret = $this[i].scaler[opt].apply($this[i].scaler, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };

})(jQuery);