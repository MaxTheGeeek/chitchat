const socket = io();

//Defining message elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $messages = document.querySelector('#messages');
//Location elements
const $locationButton = document.querySelector('#send-location');
const $currentLocation = document.querySelector('#current-location');
//Template elements
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;


socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message
    });
    $messages.insertAdjacentHTML('beforeend', html);

})

socket.on('locationMessage', (url) => {
    console.log(url);
    const html = Mustache.render(locationTemplate, {
        url,
    });
    $messages.insertAdjacentHTML('beforeend', html);
})

/* Get message from user and send it */
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Disable btn after sending first msg
    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (message) => {
        //Enable btn 
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        console.log(message);
    })


})


/* Get location from browser and send it */
$locationButton.addEventListener('click', () => {

    $locationButton.focus();
    if (!navigator.geolocation)
        return alert('Geolocation is not available.')

    //Disable
    $locationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation',
            {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            (message) => {
                //Enable
                $locationButton.removeAttribute('disabled');
                console.log(message);
            });

    })

})