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