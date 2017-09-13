'use strict';

(function () {
  var OFFSET = 10;

  var popupElement = document.createElement('div');
  popupElement.classList.add('wizard-artifacts');
  popupElement.style.display = 'none';
  document.body.appendChild(popupElement);

  var onMouseMove = function (event) {
    popupElement.style.top = event.pageY + OFFSET + 'px';
    popupElement.style.left = event.pageX + OFFSET + 'px';
  };

  window.popup = function (target, callback) {
    var onMouseOut = function () {
      popupElement.style.display = 'none';
      target.removeEventListener('mousemove', onMouseMove);
      target.removeEventListener('mouseleave', onMouseOut);
    };

    target.addEventListener('mouseenter', function () {
      popupElement.innerHTML = callback();
      popupElement.style.display = 'block';
      target.addEventListener('mousemove', onMouseMove);
      target.addEventListener('mouseleave', onMouseOut);
    });
  };
})();
