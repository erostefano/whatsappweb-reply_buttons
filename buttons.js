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
        button.addEventListener('click', () => {
            buttonGroup.style.visibility = toggleButtonGroup(buttonGroup.style.visibility);
            // TODO: send text!
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
    buttonGroupToggle.src = chrome.runtime.getURL('img/robot64.png');
    buttonGroupToggle.style.height = '1.5rem';
    buttonGroupToggle.style.margin = 'auto 0.5rem';
    buttonGroupToggle.style.cursor = 'pointer';
    buttonGroupToggle.setAttribute('id', 'button-group-toggle');
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
