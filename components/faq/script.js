let acc = document.querySelectorAll('.accordion')

acc.forEach((a) => {
    a.addEventListener('click', () => {
        a.classList.toggle('active')
        let content = a.querySelector('.acc_content');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
})