'use strict';

(function () {
  window.colorizeElement = function (selector, array, fillFunction) {
    var randomArrayElement = window.util.getRandomElementFromArray(array);

    if (typeof fillFunction === 'function') {
      fillFunction(selector, randomArrayElement);
    }
  };
}());
