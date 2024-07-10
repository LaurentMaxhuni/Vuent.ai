//Scroll the about section into view
function toAboutSection() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}
//Send to chatbot
function toChatBot() {
    window.location.href = '/html/chatbot.html';
}
//Send to code chatbot
function toCode() {
    window.location.href = '/html/code.html';
}
//Send to designer 
function toDesigner() {
    window.location.href = '/html/designer.html';
}
//Send to a random chatbot
function tryChat() {
    let tryChat = document.getElementById('tryChat');
    tryChat.addEventListener('click', function () {
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

//EmailJS Initialization

(function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "6zq8gAMpoJWnicWiv",
    });
})();


//Required DOM Elements
var email = document.getElementById('email');
var phone = document.getElementById('phone');
var city = document.getElementById('city');
var comment = document.getElementById('comment');

comment.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});


//Validation
window.onload = function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        var errorMessage = '';

        if(!email.value) {
            errorMessage += 'Email is required! \n';
            validationCheck(errorMessage);
            email.style.borderColor = '#eb2d3a';
            email.addEventListener('input', function() {
                email.style.borderColor = '#dee2e6';
            })
        }

        if(!phone.value) {
            errorMessage += 'Phone is required! \n';
            validationCheck(errorMessage);
            phone.style.borderColor = '#eb2d3a';
            phone.addEventListener('input', function() {
                phone.style.borderColor = '#dee2e6';
            })
        }

        if(!city.value) {
            errorMessage += 'City is required! \n';
            validationCheck(errorMessage);
            city.style.borderColor = '#eb2d3a';
            city.addEventListener('input', function() {
                city.style.borderColor = '#dee2e6';
            })
        }

        if(!comment.value) {
            errorMessage += 'Comment is required!';
            validationCheck(errorMessage);
            comment.style.borderColor = '#eb2d3a';
            comment.addEventListener('input', function() {
                comment.style.borderColor = '#dee2e6';
            })
        }
        //Send email to user's email and Vuent.ai Email
        if(email.value && phone.value && city.value && comment.value) {
            const serviceID = 'service_5kvl66q';
            const templateID = 'template_qd20eyg';
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    email.value = '';
                    phone.value = '';
                    city.value = '';
                    comment.value = '';
                    Swal.fire({
                        title: "Success!",
                        customClass: {
                            title: 'black'
                        },
                        text: "Do you want to continue",
                        icon: 'success',
                        iconColor: '#FF642C',
                        color: 'black',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#FF642C',
                        timer: 5000,
                        timerProgressBar: true
                    })
                }, (error) => {
                    console.log('FAILED...', error);
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
                });
        }
        //Validation Check for user inputs
        function validationCheck(error) {
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
                icon: "error",
                iconColor: '#FF642C',
                color: 'black',
                title: error
            });
        }

        });
};