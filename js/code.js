//DOM Elementes needed for this to work
var chatBox = document.getElementById('displayMessages');
var chatInput = document.getElementById('userInput');
var sendButton = document.getElementById('sendButton');
//Checks if screen width is more than 481 px
if (window.innerWidth < 481) {
    chatBox.innerHTML = '<h1 class="text-center display-4">Please use a larger screen to view the chatbot.</h1>'
}
//API Key
var apiKey = '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';
var chatHistory = '';

//Get Response from AI Model
async function getResponse(userMessage) {
    //API URL
    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    var aiResponseMessage = chatBox.lastElementChild;
    //Get Chat History
    if (chatHistory === '') {
        chatHistory += ' User: ' + userMessage;
        userMessage = chatHistory;
    } else if (chatHistory !== '') {
        chatHistory += ' User: ' + userMessage;
        userMessage = chatHistory;
    }
    //Request Options for the URL fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'llama3-70b-8192',
            messages: [{ role: 'system', content: 'EXTREMLY IMPORTANT Always put code inside of the following "```". Only answer the last question the user asks. When the first message is sent dont tell the user that the message was cut off that was intentional on the server side. No notes the user shouldnt know there is a chat history. You are also a very helpful Coder, Programmer, Developer. You have the most knowledge in Computer Science and Programming Languages. Reply with emojis if you can.' }, { role: 'user', content: userMessage }],
            temperature: 1,
            top_p: 1,
            stream: false,
            max_tokens: 2048
        })
    };
    //Fetch response from AI
    await fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            var aiResponse = data.choices[0].message.content;
            var regex = /```([\s\S]*?)```/g;
            aiResponse = aiResponse.replace(regex, function (match, p1) {
                p1 = p1.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<div class="div"><div class="copy-container"><button id="copy-content" onclick="copyCode()"><i class="fi fi-rr-clipboard" ></i> Copy! </button></div><pre><code id="code-content">${p1}</code></pre></div>`
            });
            //Typing effect
            function typeEffect(element, text, speed) {
                element.textContent = "";
                const typingCursor = document.createElement("span");
                typingCursor.classList.add("typing-cursor");
                element.appendChild(typingCursor);

                let i = 0;
                function type() {
                    if (i < text.length) {
                        element.innerHTML = text.substring(0, i + 1);
                        i++;
                        setTimeout(type, speed);
                        chatBox.scrollTop = chatBox.scrollHeight;
                    } else {
                        element.removeChild(typingCursor);
                    }
                }
                type();
            }
            let speed = 5;
            if (aiResponse.length > 250) {
                speed = 15;
            } else if (aiResponse.length > 100) {
                speed = 7;
            }
            const text = aiResponse;
            typeEffect(aiResponseMessage, text, speed);
            chatHistory += ' Assistant: ' + aiResponseMessage.innerHTML;
            chatBox.scrollTop = chatBox.scrollHeight;
        }).catch(() => {
            //Catch errors and display error message
            aiResponseMessage.textContent = 'Oops! Something went wrong. Try again later!';
            Swal.fire({
                title: "Error!",
                customClass: {
                    title: 'black'
                },
                text: "Do you want to continue",
                icon: 'error',
                iconColor: '#FF642C',
                color: 'black',
                confirmButtonText: 'OK',
                confirmButtonColor: '#FF642C',
                timer: 5000,
                timerProgressBar: true
            })
        })
}

//Event Listener for send Button
sendButton.addEventListener('click', function () {
    var userInput = chatInput.value;
    if (userInput === '') {
        return;
    }
    chatBox.innerHTML += `<div class="message-user">${userInput}</div>`;
    chatBox.innerHTML += `<div class="message-ai">...</div>`;

    //Call the function
    getResponse(userInput)
    chatInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
})
//Event listener for Enter key pressed
chatInput.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        var userInput = chatInput.value;
        if (userInput === '') {
            return;
        }
        chatBox.innerHTML += `<div class="message-user">${userInput}</div>`;
        chatBox.innerHTML += `<div class="message-ai">...</div>`;

        //Call the function
        getResponse(userInput)
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
})

//Function to copy code from the AI Generated Code
function copyCode() {
    var codeContent = document.getElementById('code-content');
    window.navigator.clipboard.writeText(codeContent.innerHTML);
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        title: "Copied!",
        customClass: {
            title: 'black'
        },
        icon: 'success',
        iconColor: '#FF642C',
        color: 'black',
    })
}

