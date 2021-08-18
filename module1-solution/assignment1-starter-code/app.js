(function(){
  'use string';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.message = "Lets see!";
    $scope.color = "black";
    $scope.checkList = function(){
      //var myElement = angular.element('#lunch-menu');
      var myElement = document.getElementById("lunch-menu").value
      console.log(myElement);
      if (!myElement.replace(/\s/g, '').length) {
        $scope.message= "Please enter data first";
        $scope.color = "red";
      }else{
        var array=myElement.split(',');
        if(array.length <4){
          console.log("Enjoy");
          $scope.message = "Enjoy";
        }else{
          console.log("Too much!");
          $scope.message = "Too much";
        }
        $scope.color = "green";
      }
    };

  };

})();
