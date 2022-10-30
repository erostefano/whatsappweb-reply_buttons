chrome.storage.local.get('settings', ({settings}) => {
    const template = document.getElementsByClassName('reply-row')[0];
    addEventListeners(template);
    settings.forEach(setting => {
        const replyRow = template.cloneNode(true);
        replyRow.children[0].children[0].value = setting;
        addEventListeners(replyRow);
        document.querySelector('main').appendChild(replyRow);
    });
    template.remove();
});

document.getElementById('add').addEventListener('click', () => {
    const replyRow = document.getElementsByClassName('reply-row')[0].cloneNode(true);
    replyRow.children[0].children[0].value = '';
    addEventListeners(replyRow);
    document.querySelector('main').appendChild(replyRow);
});

function addEventListeners(replyRow) {
    const reply = replyRow.children[0];
    const input = reply.children[0];
    input.addEventListener('focusout', () => {
        save();
        let saveMessage = replyRow.children[1];
        saveMessage.style.visibility = 'visible';
        setTimeout(() => {
            saveMessage.style.visibility = 'hidden';
        }, 500)
    });

    const removeButton = reply.children[1];
    removeButton.addEventListener('click', () => {
        if (document.querySelectorAll('.reply input').length === 1) {
            return;
        }
        replyRow.remove();
        save();
    });
}

function save() {
    const inputs = document.querySelectorAll('.reply input');
    chrome.storage.local.set({settings: Array.from(inputs).map(input => input.value)});
}
