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
    let clip = document.querySelector('[data-testid="clip"]').parentElement.parentElement;

    if (!clip) {
        return;
    }

    if (document.getElementById('button-group-toggle')) {
        return;
    }

    buttonGroup.style.top = (clip.getBoundingClientRect().top - buttonGroup.getBoundingClientRect().height - 16) + 'px';
    buttonGroup.style.left = (document.getElementById('side').getBoundingClientRect().right + 16) + 'px';

    let buttonGroupToggle = clip.cloneNode(true);
    buttonGroupToggle.setAttribute('id', 'button-group-toggle');
    buttonGroupToggle.addEventListener('click', () => {
        buttonGroup.style.visibility = toggleButtonGroup(buttonGroup.style.visibility);
    });

    clip.parentElement.appendChild(buttonGroupToggle);
});

function toggleButtonGroup(display) {
    return display !== 'visible'
        ? 'visible'
        : 'hidden';
}
