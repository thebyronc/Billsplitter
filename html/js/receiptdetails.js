$(document).ready(function() {
  var getAllUsers = function() {
    $.ajax({
      url: "http://localhost:4567/users",
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        response.forEach(function(user) {
          $(".userOptions").append(`<option value="${user.id})">${user.name}</option>`);
        });
      },
      error: function() {
        console.log("Get all user Error");
      }
    });
  }

  $("#addItem").submit(function(event) {
    event.preventDefault();
    var receiptId = localStorage.getItem("receiptId");
    var name = $("#itemName").val();
    var cost = parseFloat($("#itemCost").val());
    var split = parseInt($("#itemSplit").val());
    var item = {
      "itemName": name,
      "cost": cost/split,
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
          getAllItems();
        },
        failure: function(errMsg) {
          console.log("Error adding receipt: " + errMsg);
        }
      });
    }

    $("#addItem")[0].reset();
  });

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
              <li class="list-group-item">
                <span class="receiptItem">ITEM:</span> ${response[i].itemName}
                <span class="receiptItem">COST:</span> ${response[i].cost}
                <span class="receiptItem">| ASSIGNED TO:</span> ${response[i].userId}
                <form>
                <select class="userOptions" onchange="updateItem(${response[i].itemid}, value)">
                  <option value="${response[i].userId}"> ${response[i].userId} </option>
                </select>
                </form>
              </li>
              `);
        }
        getAllUsers();
      },
      error: function() {
        alert("Get all item Error");
      }
    });
  }

  var getUserById = function(userId) {
    $.ajax({
      url: "http://localhost:4567/users",
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        response.forEach(function(user) {
          $(".userOptions").append(`<option value="${user.id})">${user.name}</option>`);
        });
      },
      error: function() {
        console.log("Get all user Error");
      }
    });
  }


  var runningTotal = function() {
    event.preventDefault();
    var receiptId = localStorage.getItem("receiptId");
    var name = $("#itemName").val();
    var cost = parseFloat($("#itemCost").val());
    var split = parseInt($("#itemSplit").val());
    var total =0;
    var item = {
      "itemName": name,
      "cost": cost/split,
      "receiptId": receiptId
                };
    for (i = 0; i < item.length; i++) {
        cost += total;
    $.ajax({
              type: "POST",
              url: "http://localhost:4567/receipts/" + receiptId + "/items/new",
              data: JSON.stringify(item),
              dataType: "json",
              success: function(){},
              failure: function(errMsg) {
                console.log("Error adding receipt: " + errMsg);
              }
            });
        }
        document.getElementById("runningTotal").innerHTML(runningTotal);
    }



  getAllItems();

});
