'use strict';

(function () {
  var xhr = new XMLHttpRequest();

  window.backend = {
    load: function (onLoad, onError) {
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        console.log(xhr);
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

      xhr.open('GET', 'https://1510.dump.academy/code-and-magick/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
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

      xhr.open('POST', 'https://1510.dump.academy/code-and-magick');
      xhr.send(data);
    }
  }
}());
