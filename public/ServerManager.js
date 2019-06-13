var headers = [
    "Product Name", "Price", "Picture", "Quantity", "Buy Button"];
var Cartheaders = [
    "Product Name", "Price", "Picture", "delete", "Quantity","Total"];
var addressHeaders = ["Phone" , "Street", "City", "Country", ""];
var users = []
$(document).ready(function () {
    document.getElementById("loggedUser").hidden = true;
    document.getElementById("logged").hidden = true;
    configureButtons(false);
});

function myFunction(itemNo) {
    str = JSON.stringify(products[itemNo]);
    window.alert("You selected " + str);
}
function displayProducts(products, name) {
    var out = "<table border=1 width=100%>";
    var i;
    out += '<tr style="font-size: 20px;" >';
    for (i = 0; i < headers.length; i++) {
        out += '<th >' + headers[i] + '</th>';
    }
    out += "</tr>";
    for (i = 0; i < products.length; i++) {
        out += "<tr>";
        out += '<td>' + products[i].name + '</td>';
        out += '<td>' + products[i].price + '</td>';
        out += '<td> <img src="';
        out += "images/" + products[i].image + '" style="width:104px;height:100px;">';
        out += '<td>' + 'quantity <input type="text" value="1" name="';
        out += 'quantity' + i + '" id="quant' + i;
        out += '">' + '</td>';

        out += '<td> <button onclick="addToCart(' + "'"+ products[i].uuid + "'";
        out += ",'quant" + i + "')" + '">Buy</button></td>';
        out += "</tr>";
    }
    out += "</table>";
    document.getElementById(name).innerHTML = out;
}

function displayAddresses(addresses, name) {
    var out = "<table border=1 width=100%>";
    var i;
    out += '<tr style="font-size: 20px;" >';
    for (i = 0; i < addressHeaders.length; i++) {
        out += '<th >' + addressHeaders[i] + '</th>';
    }
    out += "</tr>";
    for (i = 0; i < addresses.length; i++) {
        out += "<tr>";
        out += '<td>' + addresses[i].phone + '</td>';
        out += '<td>' + addresses[i].street + '</td>';
        out += '<td>' + addresses[i].city + '</td>';
        out += '<td>' + addresses[i].country + '</td>';
        out += '<td> <button onclick="deleteAddress(' + "'" + addresses[i].uuid + "')" + '">Delete</button></td>';
        out += "</tr>";
    }
    out += "</table>";
    document.getElementById(name).innerHTML = out;
}

function displayCart(cart, name) {
    var out = "<h1> Shopping Cart</h1><table border=1 width=100%>";
    var i;
    out += '<tr style="font-size: 20px;" >';
    for (i = 0; i < Cartheaders.length; i++) {
        out += '<th >' + Cartheaders[i] + '</th>';
    }
    out += "</tr>";
    var total=0;
    for (i = 0; i < cart.length; i++) {
        out += "<tr>";
        out += '<td>' + cart[i].item.name + '</td>';
        out += '<td>' + cart[i].item.price + '</td>';
        out += '<td> <img src="';
        out += "images/" + cart[i].image + '" style="width:104px;height:100px;">';
        out += '<td> <button onclick="deleteCartItem(' + "'" + cart[i].item.uuid + "')" + '">Delete</button></td>';
        out += '<td>' + cart[i].quantity + '</td>';
        out += '<td>' + cart[i].item.price * cart[i].quantity + '</td>';
        out += "</tr>";
        total += cart[i].item.price * cart[i].quantity;
    }
    out += "</table>";
    out += "<br>";
    out += "<div style='width: 80%; float: left'></div>";
    out += "<div id='total'>Total: " +total + "</div>"; '<br>';
    out += '<button onclick="checkout()">Checkout</button><br>';
    out+='<div id="cartmessage"></div>';
    document.getElementById(name).innerHTML = out;
}

//displayProducts(productsData,"products");



function addToCart(itemId, fieldname) {
    var num = document.getElementById(fieldname).value;
    var dat = {
        itemId: itemId,
        qty : num
    };
    $.ajax
    ({
        type: "POST",
        url: "/cart",
        contentType: 'application/json',
        //json object to sent to the authentication url
        data: JSON.stringify(dat),
        success: function () {

            alert("Item has been added to your cart!");
        }
    });
}

function checkout() {

    $.post(
        "/checkout",
        {
        },
        function (data) {
            $('#cartmessage').html(data);
        }
    );
}

function deleteCartItem(itemId) {
    console.log("deleteCartItem " + itemId);

    $.ajax({

        type: "DELETE",
        url: "/cart/" + itemId,
        contentType: 'text/html',
        success: function () {
            alert("Item has been deleted from your cart");
            getCart();
        },
        error: function(request,msg,error) {
            console.log(error);
            console.log(msg);
        }
    });

}

