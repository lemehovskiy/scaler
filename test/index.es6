require("./sass/style.scss");

require("jquery");

require('../build/scaler.js');


$(document).ready(function () {


    $('.title').scaler({
        rules: [
            {
                viewport_from: 1600,
                viewport_to: 1400,
                scale_from: 1,
                scale_to: 0.5,
                sticky: false
            },
            {
                viewport_from: 1200,
                viewport_to: 1000,
                scale_from: 1,
                scale_to: 0.5,
                sticky: true
            }
        ]
    })


});