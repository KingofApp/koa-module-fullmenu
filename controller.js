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
      var tempUrl = angular.copy($rootScope.backUrl);
      if (tempUrl.length - 2 > -1) {
        $rootScope.backUrl.pop();
        $location.path(tempUrl[tempUrl.length - 2]);
      }
    };

    var moduleScope = $scope.fullmenu;
    var moduleConfig = $scope.fullmenu.modulescope;

    $scope.showFullMenu = function() {
      moduleScope.shown = moduleScope.shown ? false : true;
    }
    $rootScope.currentIndex = -1;

    moduleScope.modules = getModules();

    function getModules() {
      var modules = [];

      function processChild(value, index) {

        if( $location.path() === value.path ){
          $rootScope.currentIndex = index;
        }

        structureService.getModule(value.path).then(function(module) {
          var color = (value.bgColor) ? '#' + value.bgColor.replace('#','') : '';
          modules.push({
            text: module.name,
            icon: module.icon,
            url: '#' + value.path,
            backgroundImage: value.bgImage,
            backgroundColor: color
          });
        });
      }

      angular.forEach(moduleConfig.menuItems, processChild);

      return modules;
    }
  }

}());
