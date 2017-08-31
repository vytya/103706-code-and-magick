'use strict';

(function () {
  window.colorizeElement = function (selector, color, fillFunction) {
    var colorOfElement;

    if (typeof (color) === 'object') {
      colorOfElement = window.util.getRandomElementFromArray(color);
    } else {
      colorOfElement = color;
    }

    if (typeof fillFunction === 'function') {
      fillFunction(selector, colorOfElement);
    }
  };
}());
