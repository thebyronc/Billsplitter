$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    var wrapperInfo = '<div><h3>Name:</h3><input type="text" class="form-control input-md" name="name" id="name"><h3>Email:</h3><input type="text" class = "form-control input-md" name="email" id="email"></><a href="#" class="remove_field">Remove</a></br><a href="#" class=".submit">Submit</a></div>';

    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append(wrapperInfo); //add input box
        }
    });

    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })


      $(wrapper).on("click", '.submit', function() {
      var name = $("input#name").val();
      var email = $("input#email").val();
//        var person = {
//          "name": name,
//          "email": email
//        };
        $.ajax({
          type: "POST",
          url: "http://localhost:4567/users/new",
          data: JSON.stringify(name, email),
          dataType: "json",
          success: function(data){alert(data);},
          failure: function(errMsg) {
              alert(errMsg);
          }
        });
      });
});

