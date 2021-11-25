

const writeEvent = (text) => {
    // <ul> Element
    const parent = document.querySelector('#events')

    // <li> Element
    const el = document.createElement('li')
    el.innerHTML = text

    parent.appendChild(el);

}

const onFormSubmitted = (e) => {  //function accepts event
    e.preventDefault();
    const input = document.querySelector('#chat'); // # is required for ID, not for html elements
    const text = input.value;
    input.value = '';   
    
    //We have the text, now we send it
    sock.emit('message',text)
};

const sock = io("https://agile-brook-44005.herokuapp.com/");
/*
sock.on('message', (text) =>{
    writeEvent(text);
});*/
sock.on('message', writeEvent) 

const addButtonListeners = () => {
    ['rock', 'paper', 'scissors'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            sock.emit('turn', id)
        })
    })
};



//lets register the function
document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

addButtonListeners();