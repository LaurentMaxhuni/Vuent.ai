var chatBox = document.getElementById('displayMessages');
var chatInput = document.getElementById('userInput');
var sendButton = document.getElementById('sendButton');

var apiKey = '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';
var chatHistory = '';
async function getResponse(userMessage) {
    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    var aiResponseMessage = chatBox.lastElementChild;
    if (chatHistory === '') {
        chatHistory += ' User: ' + userMessage;
        userMessage = chatHistory;
    } else if (chatHistory !== '') {
        chatHistory += ' User: ' + userMessage;
        userMessage = chatHistory;
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'mixtral-8x7b-32768',
            messages: [{ role: 'system', content: 'Only answer the last question the user asks. When the first message is sent dont tell the user that the message was cut off that was intentional on the server side. No notes the user shouldnt know there is a chat history. And reply with only your response and dont add any prefixes. Try to respond with emojis sometimes. ALWAYS FORMAT THE RESPONSE TO ITS CORRESPONDING TYPE.' }, { role: 'user', content: userMessage }],
            temperature: 1,
            top_p: 1,
            stream: false,
            max_tokens: 4096
        })
    };
    await fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            let aiResponse = data.choices[0].message.content;
            var regex = /```([\s\S]*?)```/g;
            aiResponse = aiResponse.replace(regex, function (match, p1) {
                p1 = p1.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return '<pre><code>' + p1 + '</code></pre>';
            });
            aiResponseMessage.innerHTML = aiResponse;
            chatHistory += ' Assistant: ' + aiResponseMessage.innerHTML;
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(() => {
            aiResponseMessage.innerHTML = 'Oops! Something went wrong. Try again later!';
            Swal.fire({
                title: "Error!",
                text: "Do you want to continue",
                icon: 'error',
                iconColor: 'black',
                color: 'black',
                confirmButtonText: 'OK',
                confirmButtonColor: 'black',
                timer: 5000,
                timerProgressBar: true
            })
        })
}

sendButton.addEventListener('click', function () {
    var userInput = chatInput.value;
    if (userInput === '') {
        return;
    }
    chatBox.innerHTML += `<div class="message-user">${userInput}</div>`;
    chatBox.innerHTML += `<div class="message-ai"><div class="sphere"></div></div>`;

    getResponse(userInput)
    chatInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
})

chatInput.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        var userInput = chatInput.value;
        if (userInput === '') {
            return;
        }
        chatBox.innerHTML += `<div class="message-user">${userInput}</div>`;
        chatBox.innerHTML += `<div class="message-ai"><div class="sphere"></div></div>`;

        getResponse(userInput)
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}) 