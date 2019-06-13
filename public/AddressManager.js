$(document).ready(function () {

    $('#addressForm').on("submit", function (event) {

        event.preventDefault();
        $("#addressForm").hide();
        var o = {};
        var a = $('#addressForm').serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        let fd = JSON.stringify(o);
        console.log(fd);
        $.ajax
        ({
            type: "POST",
            url: "/address",
            contentType: 'application/json',
            data: fd,
            success: function () {

                alert("Address added successfully!");
                retrieveAddressesFromServer();
            }, error: function (error) {
                alert(error.status + " User " + error.statusText);
            }
        });

    });
});

function deleteAddress(addressUUID) {
    console.log(addressUUID);

    $.ajax
    ({
        type: "DELETE",
        url: "/address/" + addressUUID,
        contentType: 'application/json',
        success: function () {
            alert("Address deleted!");
            retrieveAddressesFromServer();
        }, error: function (error) {
            alert("Error deleting address" + error.status);
        }
    });
}