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
    fillData: function (node, selector, type, value) {
      if (type === 'text') {
        node.querySelector(selector).textContent = value;
      } else if (type === 'fill') {
        node.querySelector(selector).style.fill = value;
      } else if (type === 'background') {
        node.querySelector(selector).style.background = value;
      } else {
        throw new Error('parameter "fill" must be equal to "text", "fill" or "background"');
      }
    },

    // Fill hidden input data
    fillHiddenInput: function (selector, data) {
      var element = document.querySelector(selector);

      element.setAttribute('value', data);
    }
  };

})();
