// add stylesheet
const style = document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href', chrome.runtime.getURL('style.css'));
document.head.appendChild(style);

// create buttonGroup
const buttonGroup = document.createElement('div');
buttonGroup.classList.add('button-group');
document.body.appendChild(buttonGroup);

// create buttons
chrome.storage.local.get('settings', ({settings}) => {
    const buttonSettings = JSON.parse(settings);
    buttonSettings.forEach(setting => {
        const button = document.createElement('button');
        button.classList.add('reply-button');
        button.innerHTML = setting;
        button.title = setting;
        button.addEventListener('click', event => {
            buttonGroup.style.visibility = toggleButtonGroup(buttonGroup.style.visibility);
            const inputText = document.querySelectorAll(".copyable-text.selectable-text[contenteditable='true']")[1];
            inputText.innerHTML = event.target.innerHTML;
            inputText.dispatchEvent(new Event('input', {bubbles: true}));
            const send = document.querySelector("[data-testid='send']").parentElement;
            send.click();
        });
        buttonGroup.appendChild(button);
    });
});

window.addEventListener('click', () => {
    const clip = document.querySelector('[data-testid="clip"]').parentElement.parentElement;

    if (!clip) {
        return;
    }

    if (document.getElementById('button-group-toggle')) {
        return;
    }

    // position buttonGroup
    buttonGroup.style.top = (clip.getBoundingClientRect().top - buttonGroup.getBoundingClientRect().height - 16) + 'px';
    buttonGroup.style.left = (document.getElementById('side').getBoundingClientRect().right + 16) + 'px';

    // create buttonGroupToggle
    const buttonGroupToggle = document.createElement('img');
    buttonGroupToggle.setAttribute('id', 'button-group-toggle');
    buttonGroupToggle.src = chrome.runtime.getURL('img/robot64.png');
    buttonGroupToggle.addEventListener('click', () => {
        buttonGroup.style.visibility = toggleButtonGroup(buttonGroup.style.visibility);
    });
    clip.parentElement.parentElement.appendChild(buttonGroupToggle);
});

function toggleButtonGroup(display) {
    return display !== 'visible'
        ? 'visible'
        : 'hidden';
}
