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
          $('#allReceipts').prepend(`<li class="list-group-item"><span class="receiptItem">RESTAURANT:</span> ${response[i].receiptName} <br> <span class="receiptItem">ID:</span> ${response[i].id} Test: <a href="#" onclick="viewReceiptById(${response[i].id})"> View Receipt by id</a> </li>`);
      }
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.")
    }
  });
}

var viewReceiptById = function(id) {
  var output = id;
  localStorage.setItem("receiptId", id);
  var OpenWindow = window.open(`receipt-details.html#${output}`, "_self", '');
  OpenWindow.dataFromParent = output; // dataFromParent is a variable in child.html
  OpenWindow.init();
};

var clearAll = function() {
    $('#allReceipts').html('');
    $.ajax({
      url: "http://localhost:4567/receipts/deleteAll",
      type: "POST",
      data: {
      format: 'json'
      },
      success: function(response) {
        for (i=0 ; i < response.length; i++ ) {
            $('#allReceipts').prepend(`<li class="list-group-item"><span class="receiptItem">RESTAURANT:</span>${response[i].receiptName}<br><span class="receiptItem">ID:</span> ${response[i].id} Test: <a href="#" onclick="viewReceiptById(${response[i].id})"> View Receipt by id</a> </li>`);
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
      dataType: "json"
    });
    getAllReceipts();
    $("#addReceipt")[0].reset();
  });

  // $("clearReceipts").click(function(event) {
  // event.preventDefault();
  //   $.ajax({
  //         type: "POST",
  //         url: "http://localhost:4567/receipts/deleteAll",
  //         data: JSON.stringify(),
  //         dataType: "json",
  //         success: function(){},
  //         failure: function(errMsg){
  //             console.log("Error adding receipt" + errMsg);
  //         }
  //     });
  //     clearAll();
  //     })
  //
  //
  //     });
  // })

});
