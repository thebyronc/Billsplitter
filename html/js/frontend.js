var viewUserById = function(id) {
  var output = id;
  localStorage.setItem("id", id);
  var OpenWindow = window.open(`userdetail.html#${output}`, "_self", '');
  OpenWindow.dataFromParent = output; // dataFromParent is a variable in child.html
  OpenWindow.init();
};

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
        dataType: "json"
        });

       getAllUsers();
       $("#addUser")[0].reset();
    });

    var getAllUsers = function() {
            $('#allUsers').html('');
            $.ajax({
                url: "http://localhost:4567/users",
                type: 'GET',
                data: {
                    format: 'json'
                },
                success: function(response) {
                    for (i = 0 ; i < response.length; i++ ){
                        $('#allUsers').prepend(`<li class="list-group-item"><span class="userName">USER:</span> ${response[i].name} <br> <span class="userName">EMAIL:</span> ${response[i].email} <br><span class="userName">ID:</span> ${response[i].id} <br> More details: <a href="#" onclick="viewUserById(${response[i].id})"> View User by id</a></span></li>`);
                    }
                },
                error: function(){
                    $('#errors').text("There was an error processing your request. Please try again.")
            }
          });
        }
    getAllUsers();

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
});



















