(function(){
  'use string';

  angular.module('ShoppingListCheckOff', [])
  //.controller('ShoppingListCheckOffController',ShoppingListCheckOffController);
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService)


  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
    toBuyList.removeItem = function(itemIndex){
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.itemsBought = ShoppingListCheckOffService.getItemsBought();
    boughtList.addItemBought = function(item){
      ShoppingListCheckOffService.addItemBought(item);
    }
  };

  function ShoppingListCheckOffService(){
    var service = this;

    // List of to buy items
    var itemsToBuy = ["10 backs of cookies","1 PC Gamer","10 puppies","1 nazi dildo","Daft Punk Disc"];

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.removeItem = function (itemIndex) {
      item = itemsToBuy[itemIndex];
      itemsToBuy.splice(itemIndex, 1);
      itemsBought.push(item);

    };

    var itemsBought = [];

    // List of bought items
    service.getItemsBought = function(){
      return itemsBought;
    };

    //service.addItemBought = function(item){
      //itemsBought.push(item);
    //};

  };
})();
