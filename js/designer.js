const token = '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';
var userInput = document.getElementById('userInput');
var button = document.getElementById('generateButton');
var userHistory = '';

async function query(input) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({ inputs: input + ' prompy' }),
            }
        );

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error("Error querying the API:", error);
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
    }
}

button.addEventListener('click', () => {
    document.getElementById(`generated-image`).src = '../assets/loading.gif';
    var input = userInput.value;
    var counter = 0;
    userHistory += `User: ${input} (Prompt ${counter})`;
    if(counter == 3) {
        userHistory = null;
    }
    query(userHistory).then((response) => {
        counter++;
        URL.revokeObjectURL(response);
        var objectURL = URL.createObjectURL(response);
        objectURL.toString();
        document.getElementById(`generated-image`).src = objectURL;
        setTimeout(function() {
            delete window.Blob
            window.URL.revokeObjectURL(objectURL);
        }, 1000)
        userInput.value = '';
    })
}
);

var counter = 0;

userInput.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        document.getElementById(`generated-image`).src = '../assets/loading.gif';
        debugger;
        var input = userInput.value;
        userHistory += `User: ${input} (Prompt ${counter})`;
        if(counter == 3) {
            counter = 0;
        }
        query(userHistory).then((response) => {
            counter++;
            URL.revokeObjectURL(response);
            var objectURL = URL.createObjectURL(response);
            objectURL.toString();
            document.getElementById(`generated-image`).src = objectURL;
            setTimeout(function() {
                delete window.Blob
                window.URL.revokeObjectURL(objectURL);
            }, 1000)
            userInput.value = '';
        })
    }
});
