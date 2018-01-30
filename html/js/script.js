var getAllReceipts = function() {
  $('#allReceipts').html('');
  $.ajax({
    url: "http://localhost:4567/receipts",
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      for (i = 0 ; i < response.length; i++ ){
          $('#allReceipts').prepend(`<li class="list-group-item">ID:${response[i].id} Receipt Name: ${response[i].receiptName} </li>`);
      }
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.")
    }
  });
}

$(document).ready(function() {
  getAllReceipts();

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



  $("#addReceipt").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var receipt = {
      "receiptName": name
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:4567/receipts/new",
      data: JSON.stringify(receipt),
      dataType: "json",
      success: function(){},
      failure: function(errMsg) {
        console.log("Error adding receipt: " + errMsg);
      }
    });
    getAllReceipts();
  });


});
