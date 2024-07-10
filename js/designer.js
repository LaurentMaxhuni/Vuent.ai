//Private Token and Required DOM Elements
const token = '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';
var userInput = document.getElementById('userInput');
var button = document.getElementById('generateButton');
var userHistory = '';
//Request for Image
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
        //Save the response.blob() in result 
        const result = await response.blob();
        return result;
    } catch (error) {
        //Catch and siplay errors with the API Call
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
//Event listener for generate button
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
     //Call function
    await query(userHistory).then((response) => {
        displayImages.lastElementChild.remove();
        counter++;
        URL.revokeObjectURL(response);
         //Returned response to a URL Object
        var objectURL = URL.createObjectURL(response);
        objectURL.toString();
        image.src = objectURL;
        displayImages.appendChild(image);
        setTimeout(function () {
            //Delete URL Object after image source setting
            delete window.Blob
            window.URL.revokeObjectURL(objectURL);
        }, 1000)
        userInput.value = '';
    })
}
);
//Counter for prompts
var counter = 0;
//Event listener for enter key press
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
        //Call function
        await query(userHistory).then((response) => {
            displayImages.lastElementChild.remove();
            counter++;
            URL.revokeObjectURL(response);
            //Returned response to a URL Object
            var objectURL = URL.createObjectURL(response);
            objectURL.toString();
            image.src = objectURL;
            displayImages.appendChild(image);
            setTimeout(function () {
                //Delete URL Object after image source setting
                delete window.Blob
                window.URL.revokeObjectURL(objectURL);
            }, 1000)
            userInput.value = '';
        })
    }
});
