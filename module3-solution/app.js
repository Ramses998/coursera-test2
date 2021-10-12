(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com")
  .directive('foundItems',foundItems);

  function foundItems(){
    let ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: '$ctrl',
      bindToController: true
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){

    let $ctrl = this;
    $ctrl.searchTearm = "";
    $ctrl.found = [];
    $ctrl.isShowTable = false;
    $ctrl.isShowWarning = false;
    $ctrl.makeSearch = function(){

      if($ctrl.searchTearm == ""){
        $ctrl.isShowTable = false;
        $ctrl.isShowWarning = true;
      }else{
        $ctrl.isShowTable = false;
        $ctrl.found = [];
        let promise = MenuSearchService.getMatchedMenuItems();
        promise.then(function (response){

          var array = response.data.menu_items;
          var foundItemss = [];
          $ctrl.isShowTable = true;
          for(let x=0;x<array.length;x++){
            if(array[x].name.includes($ctrl.searchTearm)){
              foundItemss.push(array[x]);
            }
          }
          if(foundItemss.length>0){
            $ctrl.isShowTable = true;
            $ctrl.isShowWarning = false;
          }else{
            $ctrl.isShowTable = false;
            $ctrl.isShowWarning = true;
          }
          $ctrl.found = foundItemss;
        }).catch(function (error){
          console.log("Something went terribly wrong.");
        });
      }

    };

    $ctrl.removeItem = function(index) {
      $ctrl.found.splice(index,1);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http,ApiBasePath){
    var service = this;
    console.log("Estoy ejecutando MenuSearchService");
    service.getMatchedMenuItems = function(){
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;
    };
  }

})();
