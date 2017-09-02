'use strict';

(function () {
  // Open / hide setup
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setup = document.querySelector('.setup');
  var avatarUploadInput = setup.querySelector('input[name="avatar"]');
  var dialogHandle = setup.querySelector('.upload');
  var dialogLeftOffset;
  var dialotTopOffset;

  var onPopupEscPress = function (event) {
    window.util.isEscEvent(event, function () {
      setup.classList.add('hidden');
    });
  };

  var onPopupEnterPress = function (event) {
    window.util.isEnterEvent(event, function () {
      setup.classList.toggle('hidden');
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

  avatarUploadInput.addEventListener('click', function (event) {
    event.preventDefault();
  });
})();
