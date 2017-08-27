'use strict';

(function () {
  // Open / hide setup
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupSubmit = document.querySelector('.setup-submit');
  var setup = document.querySelector('.setup');

  var dialogHandle = setup.querySelector('.setup-user-pic');
  var dialogLeftOffset;
  var dialotTopOffset;

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

    dialotTopOffset = setup.offsetTop;
    dialogLeftOffset = setup.offsetLeft;

    document.addEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', onPopupEnterPress);

  // Close
  var closePopup = function () {
    setup.classList.add('hidden');

    setup.style.top = dialotTopOffset + 'px';
    setup.style.left = dialogLeftOffset + 'px';
  };

  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', onPopupEnterPress);

  setupSubmit.addEventListener('click', closePopup);
  setupSubmit.addEventListener('keydown', onPopupEnterPress);

  dialogHandle.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
