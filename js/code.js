var chatBox = document.getElementById('displayMessages');
var chatInput = document.getElementById('userInput');
var sendButton = document.getElementById('sendButton');

if (window.innerWidth < 481) {
    chatBox.innerHTML = '<h1 class="text-center display-4">Please use a larger screen to view the chatbot.</h1>'
}

var apiKey = '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';
var chatHistory = '';
function getResponse(userMessage) {
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
            model: 'llama3-70b-8192',
            messages: [{ role: 'system', content: 'Only answer the last question the user asks. When the first message is sent dont tell the user that the message was cut off that was intentional on the server side. No notes the user shouldnt know there is a chat history. You are also a very helpful Coder, Programmer, Developer. You have the most knowledge in Computer Science and Programming Languages. Reply with emojis if you can.' }, { role: 'user', content: userMessage }],
            temperature: 1,
            top_p: 1,
            stream: false,
            max_tokens: 2048
        })
    };
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            var aiResponse = data.choices[0].message.content;
            var regex = /```([\s\S]*?)```/g;
            aiResponse = aiResponse.replace(regex, function (match, p1) {
                p1 = p1.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<div class='divie'><pre><code>${p1}</code></pre></div>`
            });

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
            if(aiResponse.length > 250) {
                speed = 15;
            } else if (aiResponse.length > 100) {
                speed = 7;
            }
            const text = aiResponse;
            typeEffect(aiResponseMessage, text, speed);
            document.querySelector('pre').addEventListener('click', function() {
                navigator.clipboard.writeText(this.textContent);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    color: 'black',
                    iconColor: '#FF642C',
                    customClass: {
                        title: 'black',
                    },
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    iconColor: '#FF642C',
                    customClass: {
                        iconColor: 'orange',
                    },
                    title: "Copied!"
                })
            })
            // document.querySelector('.divie').addEventListener('mouseover', function() {
            //     this.style.cursor = 'pointer';
            //     this.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            //     this.addEventListener('click', function() {
            //         navigator.clipboard.writeText(this.textContent);
            //         const Toast = Swal.mixin({
            //             toast: true,
            //             position: "bottom-end",
            //             showConfirmButton: false,
            //             timer: 3000,
            //             timerProgressBar: true,
            //             color: 'black',
            //             iconColor: '#FF642C',
            //             customClass: {
            //                 title: 'black',
            //             },
            //             didOpen: (toast) => {
            //                 toast.onmouseenter = Swal.stopTimer;
            //                 toast.onmouseleave = Swal.resumeTimer;
            //             }
            //         });
            //         Toast.fire({
            //             icon: "success",
            //             iconColor: '#FF642C',
            //             customClass: {
            //                 iconColor: 'orange',
            //             },
            //             color: 'black',
            //             title: 'Copied!'
            //         });
            //     })
            // })
            aiResponseMessage.innerHTML = aiResponse;
            chatHistory += ' Assistant: ' + aiResponseMessage.innerHTML;
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(() => {
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

sendButton.addEventListener('click', function () {
    var userInput = chatInput.value;
    if (userInput === '') {
        return;
    }
    chatBox.innerHTML += `<div class="message-user">${userInput}</div>`;
    chatBox.innerHTML += `<div class="message-ai">...</div>`;

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
        chatBox.innerHTML += `<div class="message-ai">...</div>`;

        getResponse(userInput)
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
})