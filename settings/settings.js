chrome.storage.local.get('settings', ({settings}) => {
    const div = document.getElementsByClassName('reply')[0];
    settings.forEach(setting => {
        const replyDiv = div.cloneNode(true);
        replyDiv.children[0].value = setting;
        addEventListeners(replyDiv);
        document.getElementById('button-group').appendChild(replyDiv);
    });
    div.remove();
});

document.getElementById('add').children[0].addEventListener('click', () => {
    const replyDiv = document.getElementsByClassName('reply')[0].cloneNode(true);
    replyDiv.children[0].value = '';
    addEventListeners(replyDiv);
    document.getElementById('button-group').appendChild(replyDiv);
});

document.getElementById('save').addEventListener('click', () => {
    const inputs = document.querySelectorAll('.reply input');
    chrome.storage.local.set({settings: Array.from(inputs).map(input => input.value)});
});

function addEventListeners(div) {
    div.children[1].addEventListener('click', () => {
        if (document.querySelectorAll('.reply input').length === 1) {
            return;
        }
        return div.remove();
    })
}
