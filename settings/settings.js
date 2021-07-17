const textArea = document.getElementsByTagName('textarea')[0];

chrome.storage.local.get('settings', ({settings}) => {
    textArea.value = settings;
});

const save = document.getElementsByTagName('button')[0];

save.addEventListener('click', () => {
    chrome.storage.local.set({settings: textArea.value});
})
