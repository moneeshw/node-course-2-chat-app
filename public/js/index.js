var socket = io();
socket.on('connect', function (){
    console.log('Connected to server');

    // socket.emit('createMessage',{
    //     from: 'Moneesh',
    //     message: 'Hello'
    // });
});

socket.on('newMessage', function (msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: msg.url,
        from: msg.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (e){
    e.preventDefault();

    var msgTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: msgTextbox.val()
    }, function () {
        msgTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geo location not support by your browser!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function (){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location!');
    });
});