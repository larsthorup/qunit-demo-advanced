/*global window, can, $*/
(function (window, can, $) {
    'use strict';

    window.Halloween = can.Control({
    },
    {
        init: function () {
            $('<div id="' + this.options.name + '"></div>').appendTo(this.element);
        }
    });
})(window, can, $);