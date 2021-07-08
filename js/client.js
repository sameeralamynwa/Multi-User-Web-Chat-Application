/*
    Connecting the server.
*/

const socket = io('http://localhost:8000');

/* 
    Getting the DOM variables in the respective JS variables. 
    The name should be same as that of index.html.
*/

const form = document.getElementById('send_container');
const messageInput = document.getElementById('message_input')
const messageContainer = document.querySelector(".container")

var audio = new Audio('ting.mp3');

/*
    Appending to the container the event informations.
*/
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}

/*
    Asking for a user's name using prompt and let the server know.
*/

const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name);

/*
    Letting the server know the name of the new user.
*/

socket.on('user-joined', name =>{
    if(name != null){
        append(`${name} has joined the chat`, 'right')
    }
})

/*
    Receiving the message from the server.
*/

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

/*
    Appending to the container the information about the users that left.
*/

socket.on('left', name =>{
    append(`${name} has left the chat`, 'right')
})

/*
    Sending the server a message if the form gets submitted successfully.
*/

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
