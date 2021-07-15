// add stylesheet
const style = document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href', chrome.runtime.getURL('style.css'));
document.head.appendChild(style);

// create buttonGroup
const buttonGroup = document.createElement('div');
buttonGroup.classList.add('button-group');
buttonGroup.style.position = 'absolute';
buttonGroup.style.top = '6rem';
buttonGroup.style.left = '500px';
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
            buttonGroup.style.display = toggleButtonGroup(buttonGroup.style.display);
            // TODO: send text!
        });

        buttonGroup.appendChild(button);
    });
});

window.addEventListener('click', () => {
    if (document.getElementById('button-group-toggle')) {
        return;
    }

    let clip = document.querySelector('[data-testid="clip"]').parentElement.parentElement;

    if (!clip) {
        return;
    }

    let buttonGroupToggle = clip.cloneNode(true);
    buttonGroupToggle.setAttribute('id', 'button-group-toggle');
    buttonGroupToggle.addEventListener('click', () => {
        buttonGroup.style.display = toggleButtonGroup(buttonGroup.style.display);
    });

    clip.parentElement.appendChild(buttonGroupToggle);
});

function toggleButtonGroup(display) {
    return display !== 'flex'
        ? 'flex'
        : 'none';
}
