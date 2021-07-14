// add stylesheet
const style = document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href', chrome.runtime.getURL('style.css'));
document.head.appendChild(style);

// create buttonGroup
const buttonGroup = document.createElement('div');
buttonGroup.classList.add('button-group');

// create buttons
let button = document.createElement('button');
button.classList.add('reply-button');
button.innerHTML = 'Order accept';
button.title = 'Accepted order Accepted order Accepted order Accepted order Accepted orderAccepted order';

buttonGroup.appendChild(button);

document.body.appendChild(buttonGroup);
