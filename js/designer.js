const token = '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';
const userInput = document.getElementById('userInput');
const button = document.getElementById('generateButton');
var userHistory = '';

async function query(input) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ inputs: input }),
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
    document.getElementById(`image-1`).src = '../assets/loading.gif';
    var input = userInput.value;
    var counter = 0;
    userHistory += `User: ${input} (Prompt ${counter})`;
    debugger;
    query(userHistory).then((response) => {
        counter++;
        var objectURL = URL.createObjectURL(response);
        objectURL.toString();
        document.getElementById(`image-1`).src = objectURL;
        userInput.value = '';
    })
}
);

userInput.addEventListener('keypress', async (event) => {
    if (event.key == 'Enter') {
        document.getElementById(`image-1`).src = '../assets/loading.gif';
        var input = userInput.value;
        var counter = 0;
        userHistory += `User: ${input} (Prompt ${counter})`;
        debugger;
        query(userHistory).then((response) => {
            counter++;
            var objectURL = URL.createObjectURL(response);
            objectURL.toString();
            document.getElementById(`generated-image`).style.backgroundImage = `url(${objectURL})`;
            userInput.value = '';
        })
    }
});