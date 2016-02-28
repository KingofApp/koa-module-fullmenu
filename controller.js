(function() {
  'use strict';

  angular
    .module('fullmenu', [])
    .controller('FullMenuController', FullMenuController);

  FullMenuController.$inject = ['$scope', '$rootScope', '$location', 'structureService'];

  function FullMenuController($scope, $rootScope, $location, structureService) {
    // Register upper level modules
    structureService.registerModule($location, $scope, 'fullmenu');

    var moduleScope = $scope.fullmenu;
    var moduleConfig = $scope.fullmenu.modulescope;

    $scope.showMenu = function() {
      moduleScope.shown = moduleScope.shown ? false : true;
    }

    moduleScope.modules = getModules();

    function getModules() {
      var modules = [];
      var children = structureService.getChildren(moduleConfig.path);

      function processChild(child, childUrl) {
        structureService.getModule(childUrl).then(function(module) {
          if (module.showOn.menu) {
            var xxx = {
              text: child.name,
              icon: moduleConfig.showicons ? child.icon : '',
              url: '#' + childUrl,
              class: child.name.replace(/[\/\s]+/gi, '-')
            }
            modules.push(xxx);
          }
        });
      }

      angular.forEach(children, processChild);

      return modules;
    }
  }

}());
