function toAboutSection() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}

function tryChat() {
    let tryChat = document.getElementById('tryChat');
    tryChat.addEventListener('click', function() {
        let randomNum = [1, 2, 3];
        let random = randomNum[Math.floor(Math.random() * randomNum.length)];
        if (random === 1) {
            window.location.href = '/html/chatbot.html';
        } else if (random === 2) {
            window.location.href = '/html/code.html';
        } else if (random === 3) {
            window.location.href = '/html/designer.html';
        }
    })
}