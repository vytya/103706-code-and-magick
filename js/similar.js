'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    }));
  };

  var onSuccessLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(onSuccessLoad, window.backend.onError);

  window.wizard = {
    onEyesChange: function (color) {
      eyesColor = color;
      window.debounce(updateWizards);
    },
    onCoatChange: function (color) {
      coatColor = color;
      window.debounce(updateWizards);
    }
  };
})();
