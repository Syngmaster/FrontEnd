$(document).ready(function () {
    $('#logonForm').on( "submit",function(event) {

        event.preventDefault();
        $("#login").hide();

        var o={};
        var a = $('#logonForm').serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var fd =JSON.stringify(o);
        console.log(fd);
        $.ajax
        ({
            type: "POST",
            url: "/login",
            contentType: 'application/json',
            data: fd,
            success: function (success) {

                console.log(success);

                configureButtons(true);
                document.getElementById("loggedUser").hidden = false;
                document.getElementById("loggedUser").innerText = "Hello, " + success.userEmail;
            }, error: function (error) {
                alert(error.status + " User " + error.statusText);
            }
        });



    });
    $('#registerForm').on( "submit",function(event) {

        event.preventDefault();
        $("#register").hide();
        var o={};
        var a = $('#registerForm').serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var fd =JSON.stringify(o);
        console.log(fd);
        $.ajax
        ({
            type: "POST",
            url: "/register",
            contentType: 'application/json',
            data: fd,
            success: function () {

                alert("Thanks!");
            }, error: function (error) {
                alert(error.status + " User " + error.statusText);
            }
        });

    });
    $('#newProductForm').on( "submit",function(event) {
        event.preventDefault();
        $("#newProduct").hide();
        var o={};

        let a = $('#newProductForm').serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var fd =JSON.stringify(o);
        console.log("Data ->" + fd);
        $.ajax
        ({
            type: "POST",
            url: "/newProduct",
            contentType: 'application/json',
            data: fd,
            success: function (data) {
                // $('#logonmessage').html(data);
                getProducts();
            }
        });

    });
    getProducts();
    $("#my-account").hide()
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}