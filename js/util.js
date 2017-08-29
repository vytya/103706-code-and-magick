'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    // Check is escape button pressed
    isEscEvent: function (event, action) {
      if (event.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    // Check is enter button pressed
    isEnterEvent: function (event, action) {
      if (event.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    // Check for hidden class is on block & remove it form block if it exist
    removeHiddenClass: function (selector) {
      var hiddenBlock = document.querySelector(selector);

      if (hiddenBlock !== null && hiddenBlock.classList.contains('hidden')) {
        hiddenBlock.classList.remove('hidden');
      }
    },

    // Random function with min & max from array
    getRandomElementFromArray: function (array) {
      var randomElement = Math.floor(Math.random() * array.length);

      return array[randomElement];
    },

    // Fill block with data
    fillTextData: function (selector, value) {
      selector.textContent = value;
    },

    fillElement: function(element, color) {
      element.style.fill = color;
    },

    changeElementBackground: function(element, color) {
      element.style.backgroundColor = color;
    },

    // Fill hidden input data
    fillHiddenInput: function (selector, data) {
      var element = document.querySelector(selector);

      element.setAttribute('value', data);
    }
  };

})();
