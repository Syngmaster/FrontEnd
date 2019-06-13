
// ------------------------  Get Products --------------------------


/**

   Get products button clicked

 */

function getProducts() {
    hideAll();
    $("#products").show();
    $("#cart").hide();
    $.ajax({
        dataType: "json",
        url: "/item",
        success: function (data) {
            displayProducts(data, "products");
        }
    });
}

function hideAll(){
    $("#my-account").hide();
    $("#newProduct").hide();
    $("#address_book").hide();
}

function configureButtons(loggedIn) {
    setAccountButtons(!loggedIn);
    setLoginButtons(loggedIn);
}

function setLoginButtons(hidden) {
    let login = $("#login_btn");
    let register = $("#register_btn");
    hidden === true ? login.hide() : login.show();
    hidden === true ? register.hide() : register.show();
}

function setAccountButtons(hidden) {
    let cart = $("#cart_btn");
    let orders = $("#orders_btn");
    let contacts = $("#address_btn");
    hidden === true ? cart.hide() : cart.show();
    hidden === true ? orders.hide() : orders.show();
    hidden === true ? contacts.hide() : contacts.show();

}

function getAddresses() {
    $("#addressForm").hide();
    $("#cart").hide();
    let addressBook = $("#address_book");

    if (addressBook.is(":hidden")) {
        addressBook.show();
        retrieveAddressesFromServer();
    } else {
        addressBook.hide();
    }
}

function retrieveAddressesFromServer() {
    $("#addresses").show();
    $.ajax({
        dataType: "json",
        url: "/address",
        success: function (data) {
            displayAddresses(data, "addresses");
        }, error: function (error) {
            alert(error.status + " User " + error.statusText);
        }
    });
}


function logOut() {
    users.pop();
    $("#logged").hide();
    $("#login").show();
    document.getElementById("logonForm").hidden = false;
}


function showNewProduct() {
    hideAll();
    $("#newProduct").show();
}

// -----------------  My Account ------------------------

/**

   My account button clicked

 */

function showMyAccount() {
    $("#products").hide();
    $("#login").hide();
    $("#register").hide();
    $("#my-account").show();
}

function showLogin() {
    $("#register").hide();
    $("#login").show();
}

function showRegister() {
    $("#login").hide();
    $("#register").show();
}

function getCart() {
    $("#login").hide();
    $("#register").hide();
    $("#addresses").hide();
    $("#addressForm").hide();
    $("#address_book").hide();


    let cartForm = $("#cart");

    if (cartForm.is(":hidden")) {
        cartForm.show();
    } else {
        cartForm.hide();
    }

    $.ajax({
        dataType: "json",
        url: "/cart",
        success: function (data) {
            displayCart(data, "cart");
        }, error: function (error) {
            alert(error.status + " User " + error.statusText);
        }
    });
}

function addNewAddress() {
    let addressForm = $("#addressForm");

    if (addressForm.is(":hidden")) {
        addressForm.show();
        $("#addresses").hide();
    } else {
        addressForm.hide();
        retrieveAddressesFromServer();
    }
}
