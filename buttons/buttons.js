// add stylesheet
const style = document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href', chrome.runtime.getURL('buttons/buttons.css'));
document.head.appendChild(style);

window.addEventListener('click', () => {
    const menuPlus = document.querySelector('[data-icon="attach-menu-plus"]').parentElement.parentElement;

    if (!menuPlus) {
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
                    if (!settings) {
                        const button = document.createElement('button');
                        button.classList.add('reply-button');
                        button.innerHTML = "no replies yet";
                        button.title = 'no replies yet';
                        button.addEventListener('click', () => {
                            buttonGroup.remove();
                            buttonGroupToggle.classList.remove('open');
                        });
                        buttonGroup.appendChild(button);
                    } else {
                        settings.forEach(setting => {
                            const button = document.createElement('button');
                            button.classList.add('reply-button');
                            button.innerHTML = setting;
                            button.title = setting;
                            button.addEventListener('click', event => {
                                const dataTransfer = new DataTransfer();
                                dataTransfer.setData('text', event.target.innerHTML);

                                const clipBoardEvent = new ClipboardEvent('paste', {
                                    clipboardData: dataTransfer,
                                    bubbles: true
                                });

                                const inputText = document.querySelector("[data-testid='conversation-compose-box-input']");
                                inputText.dispatchEvent(clipBoardEvent);

                                // wait for the button to be added to the dom
                                setTimeout(() => {
                                    inputText.dispatchEvent(new KeyboardEvent('keydown', {
                                        keyCode: 13,
                                    }))

                                    buttonGroup.remove();
                                    buttonGroupToggle.classList.remove('open');
                                }, 100)

                            });
                            buttonGroup.appendChild(button);
                        });
                    }

                    // position button-group
                    buttonGroup.style.top = (menuPlus.getBoundingClientRect().top - buttonGroup.getBoundingClientRect().height - 16) + 'px';
                    buttonGroup.style.left = (document.getElementById('side').getBoundingClientRect().right + 16) + 'px';
                }
            );
        }
    });
    menuPlus.parentElement.parentElement.appendChild(buttonGroupToggle);
});
