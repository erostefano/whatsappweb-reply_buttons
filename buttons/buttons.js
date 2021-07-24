// add stylesheet
const style = document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href', chrome.runtime.getURL('buttons/buttons.css'));
document.head.appendChild(style);

window.addEventListener('click', () => {
    const clip = document.querySelector('[data-testid="clip"]').parentElement.parentElement;

    if (!clip) {
        return;
    }

    if (document.getElementById('button-group-toggle')) {
        return;
    }

    // create buttonGroupToggle
    const buttonGroupToggle = document.createElement('img');
    buttonGroupToggle.setAttribute('id', 'button-group-toggle');
    buttonGroupToggle.src = chrome.runtime.getURL('icons/robot64.png');
    buttonGroupToggle.addEventListener('click', () => {
        if (buttonGroupToggle.classList.contains('open')) {
            document.getElementById('button-group').remove();
            buttonGroupToggle.classList.remove('open');
        } else {
            buttonGroupToggle.classList.add('open');

            // create buttonGroup
            const buttonGroup = document.createElement('div');
            buttonGroup.setAttribute('id', 'button-group');
            document.body.appendChild(buttonGroup);

            // create buttons
            chrome.storage.local.get('settings', ({settings}) => {
                settings.forEach(setting => {
                    const button = document.createElement('button');
                    button.classList.add('reply-button');
                    button.innerHTML = setting;
                    button.title = setting;
                    button.addEventListener('click', event => {
                        const inputText = document.querySelectorAll(".copyable-text.selectable-text[contenteditable='true']")[1];
                        inputText.innerHTML = event.target.innerHTML;
                        inputText.dispatchEvent(new Event('input', {bubbles: true}));
                        const send = document.querySelector("[data-testid='send']").parentElement;
                        send.click();
                        buttonGroup.remove();
                        buttonGroupToggle.classList.remove('open');
                    });
                    buttonGroup.appendChild(button);
                });

                // position button-group
                buttonGroup.style.top = (clip.getBoundingClientRect().top - buttonGroup.getBoundingClientRect().height - 16) + 'px';
                buttonGroup.style.left = (document.getElementById('side').getBoundingClientRect().right + 16) + 'px';
            });
        }
    });
    clip.parentElement.parentElement.appendChild(buttonGroupToggle);
});
