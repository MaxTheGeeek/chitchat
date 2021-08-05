const socket = io();

socket.on('message', (message) => {
    console.log(message);
})

/* Get message from user and send it */
document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.msg.value;

    socket.emit('sendMessage', message)

})


/* Get location from browser and send it */
document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation)
        return alert('Geolocation is not available.')
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})