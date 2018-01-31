var getAllItems = function() {
  $('#allReceipts').html('');
  var receiptId = localStorage.getItem("receiptId");
  $.ajax({
    url: "http://localhost:4567/receipts/" + receiptId + "/items",
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      for (i = 0 ; i < response.length; i++ ){
          $('#allReceipts').prepend(`<li class="list-group-item"><span class="receiptItem">Item:</span> ${response[i].itemName} <br> <span class="receiptItem">Cost:</span> ${response[i].cost} </li>`);
      }
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.")
    }
  });
}

$(document).ready(function() {
  getAllItems();

  $('#testClick').click(function() {
    // let restaurantId = $('#restaurantId').val();
    let receiptId = 1;
    let path = 'http://localhost:4567/receipts/' + receiptId;
    $('#location').val("");
    $.ajax({
      url: "http://localhost:4567/receipts/" + receiptId,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('.name').text(`Name of Receipt: ${response.name}`);
        $('.id').text(`Receipt Id: ${response.id}`);
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  });



  $("#addItem").submit(function(event) {
    event.preventDefault();
    var receiptId = localStorage.getItem("receiptId");
    var name = $("#itemName").val();
    var cost = $("#itemCost").val();
    var split = $("#itemSplit").val();
    var item = {
      "itemName": name,
      "cost": cost,
      "split": split,
      "receiptId": receiptId
    };
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
    getAllItems();
  });


});
