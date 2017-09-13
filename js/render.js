'use strict';

(function () {
  var WIZARD_NUMBER = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Render wizard func
  var renderWizardArtifacts = function (wizard) {
    return wizard.artifacts.map(function (it) {
      return it.name;
    }).join('<br />');
  };

  var renderWizard = function (wizard) {
    var wizardClonedTemplate = similarWizardTemplate.cloneNode(true);
    var wizardElement = wizardClonedTemplate.querySelector('.wizard');
    var clonedWizardName = wizardClonedTemplate.querySelector('.setup-similar-label');
    var clonedCoat = wizardClonedTemplate.querySelector('.wizard-coat');
    var clonedEyes = wizardClonedTemplate.querySelector('.wizard-eyes');

    window.util.fillTextData(clonedWizardName, wizard.name);
    window.colorizeElement(clonedCoat, wizard.colorCoat, window.util.fillElement);
    window.colorizeElement(clonedEyes, wizard.colorEyes, window.util.fillElement);

    window.popup(wizardElement, function () {
      return renderWizardArtifacts(wizard);
    });

    return wizardClonedTemplate;
  };

  var similarListElement = document.querySelector('.setup-similar-list');

  window.render = function (data) {
    similarListElement.innerHTML = '';

    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > WIZARD_NUMBER ? WIZARD_NUMBER : data.length;

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    // Add fragments to HTML
    similarListElement.appendChild(fragment);

    // Remove .hidden at .setup-similar
    window.util.removeHiddenClass('.setup-similar');
  };
})();
