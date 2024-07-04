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

button.addEventListener('click', async () => {
    var displayImages = document.getElementById('displayImages');
    let loader = document.createElement('div');
    loader.className = 'loader';
    loader.id = 'loader';
    let image = document.createElement('img');
    image.classList.add('img-fluid');
    image.classList.add('generated-image');
    image.id = 'generated-image';
    if (displayImages.contains(loader)) {
        loader.remove();
    } else if (displayImages.contains(document.getElementById('generated-image'))) {
        document.getElementById('generated-image').remove();
        displayImages.appendChild(loader);
    } else if (displayImages.contains(loader) && displayImages.contains(document.getElementById('generated-image'))) {
        document.getElementById('generated-image').remove();
    } else {
        displayImages.appendChild(loader);
    }
    var input = userInput.value;
    var counter = 0;
    userHistory += `User: ${input} (Prompt ${counter})`;
    await query(userHistory).then((response) => {
        displayImages.lastElementChild.remove();
        counter++;
        URL.revokeObjectURL(response);
        var objectURL = URL.createObjectURL(response);
        objectURL.toString();
        image.src = objectURL;
        displayImages.appendChild(image);
        setTimeout(function () {
            delete window.Blob
            window.URL.revokeObjectURL(objectURL);
        }, 1000)
        userInput.value = '';
    })
}
);

var counter = 0;

userInput.addEventListener('keypress', async (event) => {
    if (event.key == 'Enter') {
        var displayImages = document.getElementById('displayImages');
        let loader = document.createElement('div');
        loader.className = 'loader';
        loader.id = 'loader';
        let image = document.createElement('img');
        image.classList.add('img-fluid');
        image.classList.add('generated-image');
        image.id = 'generated-image';
        debugger;
        if (displayImages.contains(loader)) {
            loader.remove();
        } else if (displayImages.contains(document.getElementById('generated-image'))) {
            document.getElementById('generated-image').remove();
            displayImages.appendChild(loader);
        } else if (displayImages.contains(loader) && displayImages.contains(document.getElementById('generated-image'))) {
            document.getElementById('generated-image').remove();
        } else {
            displayImages.appendChild(loader);
        }
        var input = userInput.value;
        var counter = 0;
        userHistory += `User: ${input} (Prompt ${counter})`;
        await query(userHistory).then((response) => {
            displayImages.lastElementChild.remove();
            counter++;
            URL.revokeObjectURL(response);
            var objectURL = URL.createObjectURL(response);
            objectURL.toString();
            image.src = objectURL;
            displayImages.appendChild(image);
            setTimeout(function () {
                delete window.Blob
                window.URL.revokeObjectURL(objectURL);
            }, 1000)
            userInput.value = '';
        })
    }
});
