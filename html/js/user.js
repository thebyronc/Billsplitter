
var deleteById = function() {
    $('#allUsers').html('');
    $.ajax({
        url: "http://localhost:4567/users/:id/delete",
        type: 'GET',
        data: {
            format: 'json'
        },

    });
}


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
            $("#userOption").append(`<option value="${user.id}">${user.name}</option>`);
            });
        },
        error: function() {
        console.log("Get all user Error");
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
              $(`#user${id}`).text(`${user.name}`);
            });
          },
          error: function() {
            console.log("Get all user Error");
          }
        });
      }
  //change this to update by id
    $("#addUser").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var person = {
    "name" : name,
    "email" : email
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:4567/users/new",
        data: JSON.stringify(person),
        dataType: "json",
        success: function(){},
        failure: function(errMsg){
            console.log("Error adding User: " + errMsg);
        }
     });
     getAllUsers();
    });




    //change this to delete by id
    clearAll();
    $("#clearUsers").click(function(event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://localhost:4567/users/deleteAll",
        data: JSON.stringify(),
        dataType: "json",
        success: function(){},
        failure: function(errMsg){
            console.log("Error adding User:" + errMsg);
        }
    });
    clearAll();
    })


});

