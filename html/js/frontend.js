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
                $('#allUsers').prepend(`<li class="list-group-item"><span class="userName">USER:</span> ${response[i].name} <br> <span class="userName">ID:</span> ${response[i].id} </li>`);
            }
        },
        error: function(){
            $('#errors').text("There was an error processing your request. Please try again.")
        }
  });
}

$(document).ready(function() {
    getAllUsers();


//    var max_fields      = 10; //maximum input boxes allowed
//    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
//    var add_button      = $(".add_field_button"); //Add button ID
//    var wrapperInfo = '<div><h3>Name:</h3><input type="text" class="form-control input-md" name="name" id="name"><h3>Email:</h3><input type="text" class = "form-control input-md" name="email" id="email"><button type="submit">Submit</button></><a href="#" class="remove_field">Remove</a></br>';
//
//    var x = 1; //initlal text box count
//    $(add_button).click(function(e){ //on add input button click
//        e.preventDefault();
//        if(x < max_fields){ //max input box allowed
//            x++; //text box increment
//            $(wrapper).append(wrapperInfo); //add input box
//        }
//    });
//
//    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
//        e.preventDefault(); $(this).parent('div').remove(); x--;
//    })

    $("#addUser").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    alert(name);
    var email = $("#email").val();
    alert(email);
    var person = {
    "name" : name,
    "person" : person
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:4567/users/new",
        data: JSON.stringify(person),
        dataType: "json",
        success: function(data){alert("person added");},
        failure: function(errMsg){
            alert(errMsg);
        }
     });
    });

     $("form.input_fields_wraps").submit(function(event){
        event.preventDefault()
        var name = $("input#name").val();
        var name = $("input#email").val();
        var person = { "name": name , "email": email };
            $.ajax({
                type: "POST",
                url: "http://localhost:4567/users/new",
                data: JSON.stringify(person),
                dataType: "json",
                success: function(data){alert("user added!");},
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
      });

  });










