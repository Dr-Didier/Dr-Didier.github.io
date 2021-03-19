
$( document ).ready(function() {
    $.ajax({
        url: "http://localhost:3000/url",
        type: "GET",
        crossDomain: true,
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            alert(status);
        }
    });
});