const replyDivs = document.querySelectorAll('.reply')
replyDivs.forEach(div => {
    let button = div.children[1];
    button.addEventListener('click', () => {
        div.remove();
    })
})

const addButton = document.getElementsByClassName('add')[0];
addButton.addEventListener('click', () => {
    const replyDiv = document.getElementsByClassName('reply')[0].cloneNode(true);
    replyDiv.children[0].value = '';
    replyDiv.children[1].addEventListener('click', () => {
        replyDiv.remove();
    })
    const buttonGroup = document.getElementById('button-group');
    buttonGroup.appendChild(replyDiv);
});
