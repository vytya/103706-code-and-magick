'use strict';

(function () {
  var URL = 'https://1510.dump.academy/code-and-magick/data';
  var xhr = new XMLHttpRequest();

  window.backend = {
    load: function (onLoad, onError) {
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {

    }
  }
}());
