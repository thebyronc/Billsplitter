var getAllUsers = function() {
    $('#allUsers').html('');
    $.ajax({
        url: "http://localhost:4567/users",
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(response) {
            response.forEach(function(user) {
                $('#allUsers').prepend(`<li class="list-group-item"><span class="userName">USER:</span> ${response[i].name} <br> <span class="userName">EMAIL:</span> ${response[i].email} <br><span class="userName">ID:</span> ${response[i].id}<span class="deleteId">Delete Id: <a href="#" onclick="currentUser(${response[i].id})"> Delete User</a></span></li>`);
            });
        },
        error: function(){
            $('#errors').text("There was an error processing your request. Please try again.")
    }
  });
}

var clearAll = function() {
    $('#allUsers').html('');
    $.ajax({
        url: "http://localhost:4567/users",
        type: 'GET',
        data: {
            format: 'json'
        },
    });
}
var deleteUser = function() {
    $('#currentUser').html('');// Need to connect this to table
    $.ajax({
        url: "http://localhost:4567/users/:userId/delete",
        type: 'GET',
        date: {
        format: 'json'
        },
    });
    }

$(document).ready(function() {
    getAllUsers();
    deleteUser();

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
        });
        getAllUsers();
    });

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
    });

    $("#currentUser").click(function(event) {
    event.preventDefault();
    var id = $("userId").val();
    var personId = {
    "id" : id
    };
    $.ajax({
        type: "GET",
        url: "http://localhost:4567/users/:userId/delete",
        data: JSON.stringify(),
        dataType: "json",
        success: function(){},
        failure: function(errMsg){
            console.log("Error can't delete");
        }
        });
        getAllUsers();
    });

    var getUserById = function() {
        $.ajax({
          url: "http://localhost:4567/users",
          type: 'GET',
          data: {
            format: 'json'
          },
          success: function(response) {
            response.forEach(function(user) {
              $(`#user${user.id}`).text(`${user.name}`);
            });
          },
          error: function() {
            console.log("Get all user Error");
          }
        });
        };
        })

















