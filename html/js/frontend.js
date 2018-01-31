var getAllUsers = function() {
    $('#allUsers').html('');
    $.ajax({
        url: "http://localhost:4567/users",
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(response) {
            for(i = 0; i < response.length; i++ ){
                $('#allUsers').prepend(`<li class="list-group-item"><span class="userName">USER:</span> ${response[i].name} <br> <span class="userName">EMAIL:</span> ${response[i].email} <br><span class="userName">ID:</span> ${response[i].id} </li>`);
            }
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


$(document).ready(function() {
    getAllUsers();

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














