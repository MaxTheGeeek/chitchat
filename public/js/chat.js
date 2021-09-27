// Options
const username = document.getElementById('myUsername').innerHTML;
const room = document.getElementById('myRoom').innerHTML;

socket = io({ query: `username=${username}` });

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const callBtn = document.querySelector('#call-btn');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;

const locationMessageTemplate = document.querySelector(
  '#location-message-template'
).innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;
const chitchatTitle = document.querySelector('#chitchat-title').innerHTML;

// Auto scrolling
const autoscroll = () => {
  // new message element
  const $newMessage = $messages.lastElementChild;

  //new message height
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  //visible height
  const visibleHeight = $messages.offsetHeight;

  //height of message box
  const containerHeight = $messages.scrollHeight;

  //how much scrolled
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on('message', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    userId: message.userId,
    selfDisplay:
      message.username === username ? 'displayBlock my-msg' : 'desplayNone',
    otherDisplay:
      message.username !== username ? 'displayBlock' : 'desplayNone',
    createdAt: moment(message.createdAt).format('h:mm a'),
  });

  console.log(html);
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('call', (data) => {
  console.log(data);
  window.open('http://localhost:3000/' + data.roomId, '_blank');
});

socket.on('userCount', function (data) {
  console.log(data.userCount);
});

socket.on('roomData', ({ room, users }) => {
  console.log(users);
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.querySelector('.sidebar-box').innerHTML = html;
});

socket.on('locationMessage', (message) => {
  console.log(message);
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    selfDisplay:
      message.username === username ? 'displayBlock my-msg ' : 'desplayNone',
    otherDisplay:
      message.username !== username ? 'displayBlock' : 'desplayNone',
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;

  //if message box in empty
  if (message === '') {
    return $messageFormButton.removeAttribute('disabled');
  }

  //else
  socket.emit('sendMessage', message, (error) => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
    $messages.insertAdjacentHTML('beforeend', 'delivered');

    // console.log('Message delivered!');
  });
});

callBtn.addEventListener('click', () => {
  socket.emit('callRequest');
});

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      'sendLocation',
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $sendLocationButton.removeAttribute('disabled');
        console.log('Location shared!');
      }
    );
  });
});

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});

// console.log(users)
// let onlineUsersList = ""
// for (let i = 0; i < users.length; i++) {
//   onlineUsersList += `
//     <li class="userList font-weight-bold">
//     <img src="img/avatar-2.jpg" alt="avatar" />
//      ${users[i].username}
//     <span class="badge badge-success badge-pill">online</span>
//   </li>
//   `
// };

// console.log(onlineUsersList)
// document.querySelector('#onlineUsers').innerHTML = onlineUsersList;
