(function() {
  'use strict';

  angular
    .module('fullmenu', [])
    .controller('FullMenuController', FullMenuController);

  FullMenuController.$inject = ['$scope', '$rootScope', '$location', 'structureService'];

  function FullMenuController($scope, $rootScope, $location, structureService) {
    // Register upper level modules
    structureService.registerModule($location, $scope, 'fullmenu');

    $scope.showBack = false;

    if(structureService.getMenuItems().indexOf($location.$$path) === -1 && $rootScope.current != 'fullmenu'){
      $scope.showBack = true;
    }
    $scope.goBack = function() {
      window.history.back()
    };

    var moduleScope = $scope.fullmenu;
    var moduleConfig = $scope.fullmenu.modulescope;

    $scope.showFullMenu = function() {
      moduleScope.shown = moduleScope.shown ? false : true;
    }

    moduleScope.modules = getModules();

    function getModules() {
      var modules = [];

      function processChild(url, index) {
        url = url.replace('#', '');

        structureService.getModule(url).then(function(module) {
          var backgroundImage = moduleConfig.backgroundImages[index];
          var backgroundColor = moduleConfig.backgroundColors[index];

          modules.push({
            text: module.name,
            icon: module.icon,
            url: '#' + url,
            backgroundColor: (backgroundColor) ? backgroundColor : '',
            backgroundImage: (backgroundImage) ? backgroundImage : ''
          });
        });
      }

      angular.forEach(moduleConfig.menuItems, processChild);

      return modules;
    }
  }

}());
