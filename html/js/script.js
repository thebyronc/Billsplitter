$(document).ready(function() {
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

  $('#getAll').click(function() {
    $.ajax({
      url: "http://localhost:4567/receipts",
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        for (i = 0 ; i < response.length; i++ ){
            $('#allReceipts').append(`<p>Receipt ID: ${response[i].id}, Receipt Name: ${response[i].receiptName}</p>`);
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  });

  $("#addReceipt").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    alert(name);
    var receipt = {
      "receiptName": name
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:4567/receipts/new",
      data: JSON.stringify(receipt),
      dataType: "json",
      success: function(data){alert("added");},
      failure: function(errMsg) {
          alert(errMsg);
      }
    });
  });


});
