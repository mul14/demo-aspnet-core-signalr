// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {

    Cookies.set('user', 'mul14');
    
    let connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    let connectionPayment = new signalR.HubConnectionBuilder().withUrl("/paymentHub").build();

    connection.start().then(function() {
        console.log("Berhasil");

        $('#send').on('click', function (event) {
            event.preventDefault();

            let user = $('#user').val();
            let message = $('#message').val();

            connection.invoke("SendMessage", user, message)
                .then(data => {
                    console.log('Berhasil kirim data')
                }).catch(err => {
                return console.error(err.toString());
            })
        });

        connection.on("GotAMessage", function (user, message, time) {
            $('#chatbox').append('<li>' + time + ' : ' + user + ': ' + message + '</li>');
        });

    }).catch(function (err) {
        return console.error(err.toString());
    });

    connectionPayment.start().then(function() {
        $('#process').on('click', function (event) {
            event.preventDefault();

            let user = Cookies.get('user');
            let message = 'Melakukan pembayaran';

            connectionPayment.invoke("SendPayment", user, message)
                .then(data => {
                    console.log('Berhasil kirim data payment')
                }).catch(err => {
                return console.error(err.toString());
            })
        });

        connectionPayment.on("GotAPayment", function (user, message, time) {
            console.log("Masuk");
            let counter = $('#counter').text();
            counter = parseInt(counter) + 1;
            $('#counter').text(counter);
        });

    }).catch(function (err) {
        return console.error(err.toString());
    });

})
