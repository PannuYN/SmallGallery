// This code is not used. gallery_functions.js is used.
fetch('/api/data')
    .then(response => response.json())
    .then(files => {
        // Do something with the data from your server
        console.log(files);
        const gallery = document.querySelector("#gallery");
        files.map(file => {
            const imagePath = "images/" + file;
            const image = document.createElement('img');
            //image.style.width = "150px";
            //image.style.height = "150px";
            image.id = imagePath;
            image.classList.add("col-3");
            image.classList.add("image");
            image.classList.add("p-1");
            image.classList.add("m-0");
            image.src = imagePath;

            image.setAttribute('data-bs-toggle', 'modal');
            image.setAttribute('data-bs-target', '#exampleModal');
            image.setAttribute('onclick', 'showImage("' + imagePath + '")');
            gallery.appendChild(image);
        })

    });

function next() {
    fetch('/api/data')
        .then(response => response.json())
        .then(files => {
            // Do something with the data from your server
            console.log(files);
            

        });
}





