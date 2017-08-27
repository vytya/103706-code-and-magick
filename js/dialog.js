'use strict';

(function () {
  // Open / hide setup
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupSubmit = document.querySelector('.setup-submit');
  var setup = document.querySelector('.setup');

  var onPopupEscPress = function (event) {
    window.util.isEscEvent(event, function () {
      setup.classList.add('hidden');
    });
  };

  var onPopupEnterPress = function (event) {
    window.util.isEnterEvent(event, function () {
      if (setup.classList.contains('hidden')) {
        setup.classList.remove('hidden');
      } else {
        setup.classList.add('hidden');
      }
    });
  };

  // Open
  var openPopup = function () {
    setup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', onPopupEnterPress);

  // Close
  var closePopup = function () {
    setup.classList.add('hidden');
  };

  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', onPopupEnterPress);

  setupSubmit.addEventListener('click', closePopup);
  setupSubmit.addEventListener('keydown', onPopupEnterPress);
})();
