var viewReceiptById = function(id) {
  var output = id;
  localStorage.setItem("receiptId", id);
  var OpenWindow = window.open(`receipt-details.html#${output}`, "_self", '');
  OpenWindow.dataFromParent = output; // dataFromParent is a variable in child.html
  OpenWindow.init();
};
function goBack() {
    window.history.back();
}
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

 $("#addReceipt").submit(function(event) {
    event.preventDefault();
    let zip = $('#zip').val();
    $('#zip').val("");
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
    $.ajax({
    url: "https://rest.avatax.com/api/v2/taxrates/byaddress?postalCode=" + zip + "&country=US",
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic IDIwMDAwNjA0MzE6MTA5M0VEQkE0OTI3RTgxNQ==");
        },
    success: function(response) {
      $('#showSalesTax').text(`Sales Tax Is ${response.totalRate}`);
      getAllReceipts();
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.")
    }
    });

    $("#addReceipt")[0].reset();

  });

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
            $('#allReceipts').prepend(`
              <div class="w3-card-4">
              <header class="w3-container w3-light-grey">
                <h4>${response[i].receiptName}</h4>
              </header>
              <div class="w3-container info-bg">
                <p><span class="receiptItem">ID:${response[i].id} </span></p>
              </div>
              <button class="w3-button w3-block w3-dark-grey" href="#" onclick="viewReceiptById(${response[i].id})">+ View Details</button>
              </div>
            `);
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  }
//    $('#zipCode').click(function() {
//      let zip = $('#zipcode').val();
//      $('#zipcode').val("");
//      $.ajax({
//        url: `https://rest.avatax.com/api/v2/taxrates/byaddress?postalCode=${zip}`,
//        type: 'GET',
//        data: {
//          format: 'json'
//        },
//        success: function(response) {
//          $('.showSalesTax').text(`The humidity in ${city} is ${response.totalRate}`);
//        },
//        error: function() {
//          $('#errors').text("There was an error processing your request. Please try again.")
//        }
//      });
//    });

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
getAllReceipts();
});
