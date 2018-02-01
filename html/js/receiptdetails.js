$(document).ready(function() {
  var getAllUsers = function() {
    $.ajax({
      url: "http://localhost:4567/users",
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $("#userOptions").html("");
        response.forEach(function(user) {
          $("#userOptions").append(`<option value="${user.id}">${user.name}</option>`);
        });
      },
      error: function() {
        console.log("Get all user Error");
      }
    });
  }

 $("#addItem").submit(function(event) {
     event.preventDefault();
     var tax = localStorage.getItem("salestax");
     var floatTax = parseFloat(tax);
     var receiptId = localStorage.getItem("receiptId");
     var name = $("#itemName").val();
     var cost = parseFloat($("#itemCost").val());
     var split = 1;
     var userId = parseInt($("#userOptions").val());
     var item = {
       "itemName": name,
       "cost": cost * (1+floatTax),
       "userId": userId,
       "receiptId": receiptId
     };
     for (i = 0; i < split; i++) {
       $.ajax({
         type: "POST",
         url: "http://localhost:4567/receipts/" + receiptId + "/items/new",
         data: JSON.stringify(item),
         dataType: "json",
         success: function(){
           console.log("Success adding: " + item);
         },
         failure: function(errMsg) {
           console.log("Error adding receipt: " + errMsg);
         }
       });

       runningTotal();
       calculateItemCostByUser();
     }
     getAllItems();
     $("#addItem")[0].reset();
   });


  var runningTotal = function() {
      var receiptId = localStorage.getItem("receiptId");
      $.ajax({
        url: "http://localhost:4567/receipts/" + receiptId + "/items",
        type: 'GET',
        data: {
          format: 'json'
        },
        success: function(response) {
          var totalCost = 0;
          for (i = 0 ; i < response.length; i++ ){
             totalCost += response[i].cost;
          }
          $("#runningTotal").text("$" + totalCost);
        },
        error: function() {
          alert("Get all item Error");
        }
      });

    }
  var updateItem = function(itemId, userId) {

    var receiptId = localStorage.getItem("receiptId");
    var name = $("#itemName").val();
    var cost = parseFloat($("#itemCost").val());
    var split = parseInt($("#itemSplit").val());
    var item = {
      "userId": userId
    };
    for (i = 0; i < split; i++) {
      $.ajax({
        type: "POST",
        url: "http://localhost:4567/receipts/" + receiptId + "/items/" + itemId + "/new",
        data: JSON.stringify(item),
        dataType: "json",
        success: function(){
          console.log("Success updating Item User: " + item);
          getAllItems();
        },
        failure: function(errMsg) {
          console.log("Error adding receipt: " + errMsg);
        }
      });
    }
  }

  var getAllItems = function() {
    $('#allItems').html('');
    var receiptId = localStorage.getItem("receiptId");
    $.ajax({
      url: "http://localhost:4567/receipts/" + receiptId + "/items",
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        for (i = 0 ; i < response.length; i++ ){
            $('#allItems').prepend(`
              <li class="list-group-item items">
              <div class="row">
                <div class="col-md-6">
                  <div><span class="receiptItem">ITEM:</span> ${response[i].itemName}</div>
                  <div><span class="receiptItem">COST:</span> $${response[i].cost}</div>
                </div>
                <div class="col-md-6">
                  <div><span class="receiptItem">ASSIGNED TO:</span> <span class="user${response[i].userId}"></span></div>
                  <div><span class="receiptItem">ACTIONS:</span> </div>
                </div>
              </div>


              </li>
              `);
        }
        getAllUsers();
        getUserById();
      },
      error: function() {
        alert("Get all item Error");
      }
    });
  }
  var getUserIds = function() {
    var receiptId = localStorage.getItem("receiptId");
    var exportUsers = [];
    $.ajax({
      url: "http://localhost:4567/users",
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        var allUsers = [];

        for (i = 0 ; i < response.length; i++ ){
            allUsers.push(`${response[i].id}`);
            console.log(`${response[i].id} ${response[i].name}`);
        }
        console.log("allUsers Array:" + allUsers);
        localStorage.setItem("allUsers", allUsers);
      },
      error: function() {
        alert("Get all items by user Error");
      }
    });
  }

  var calculateItemCostByUser = function() {
    var receiptId = localStorage.getItem("receiptId");
    getUserIds();
    var getUserId = localStorage.getItem("allUsers");

    console.log("before for loop: "+getUserId);
    $.ajax({
      url: "http://localhost:4567/receipts/" + receiptId + "/items",
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {

        var costPerUser = [];
        for(i = 0; i < response.length; i++){
          for(userIndex = 0; userIndex < getUserId.length; userIndex++){
            costPerUser[i] = 0;
            if(`${response[i].userId}` ===  getUserId[userIndex]) {
              var itemCost = `${response[i].cost}`;
              costPerUser[userIndex] += parseInt(itemCost);
              console.log("Each User Array Total: " + costPerUser[userIndex] + " Int Added: "+ `${response[i].cost}`);
            }
          }
        }
        $(".userTotals").html("");
        for(i = 0; i<getUserId.length; i++){

          if(costPerUser[i] > 0) {
            $(".userTotals").append(
              '<li class="list-group-item"><span class="badge">$' +costPerUser[i]+ '</span>' +
              '<span class="user'+getUserId[i]+'"></span></li>');
          }
        }
      },
      error: function () {
      }
    });
}


  var getUserById = function() {
    $.ajax({
      url: "http://localhost:4567/users",
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        response.forEach(function(user) {
          $(`.user${user.id}`).text(`${user.name}`);
        });
      },
      error: function() {
        console.log("Get all user Error");
      }
    });
  }

  getAllItems();
  runningTotal();
  calculateItemCostByUser();
});
