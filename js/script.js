var options = {
    chart: {
        type: 'area',
        toolbar: {
            tools: {
                selection: true,
                zoom: `<i class="fi fi-rr-search tw-text-white tw-text-lg"></i>`,
                zoomin: `<i class="fi fi-rr-add tw-text-white tw-text-xl"></i>`,
                zoomout: `<i class="fi fi-rr-minus-circle tw-text-white tw-text-xl"></i>`,
                pan: `<i class="fi fi-rr-hand-paper tw-text-white tw-text-2xl"></i>`,
                reset: `<i class="fi fi-rr-home tw-text-white tw-text-lg"></i>`,
                download: `<i class="fi fi-rr-menu-burger tw-text-white tw-text-xl"></i>`,
                
            }
        }
    },
    stroke: {
        curve: 'smooth',
    },
    series: [{
        name: 'sales',
        data: [null, null, null, 0, 30, 35, 50, 37, 78, 92, 63, 125]
    }],
    xaxis: {
        categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028],
        labels: {
            rotate: -45,
            rotateAlways: true,
            style: {
                colors: 'white',
                fontSize: '14px',
            }
        }
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                colors: 'white',
                fontSize: '14px',
            }
        }
    },
    row: {
        colors: ['#FF642C']
    },
    colors: ['#FF642C'],
    responsive: [{
        breakpoint: 320,
        options: {
            chart: {
                type: 'area'
            },
            stroke: {
                curve: 'smooth',
            },
            series: [{
                name: 'sales',
                data: [null, null, null, 0, 30, 35, 50, 37, 78, 92, 63, 125]
            }],
            xaxis: {
                categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028]
            },
        },
    }]
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();

function toAboutSection() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}

function toChatBot() {
    window.location.href = '/html/chatbot.html';
}

function toCode() {
    window.location.href = '/html/code.html';
}

function toDesigner() {
    window.location.href = '/html/designer.html';
}

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

(function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "6zq8gAMpoJWnicWiv",
    });
})();

var email = document.getElementById('email');
var phone = document.getElementById('phone');
var city = document.getElementById('city');
var comment = document.getElementById('comment');

comment.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

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