//fetch file names from server-side js
async function fetchImageFiles() { //fetching needs to be in async function
    const response = await fetch('/api/data'); //fetch data
    const data = await response.json(); //change to json format
    return data;
}

//function to display images using data fetched from server-side
async function displayImages() {
    const files = await fetchImageFiles(); //fetch file names
    console.log(files);
    const gallery = document.querySelector("#gallery"); //the whole container id
    files.map(file => {

        //prepare the values
        const id = file;
        const imagePath = "images/" + file;
        const image = document.createElement('img');

        //set the values in the attributes
        image.id = id;
        image.classList.add("image"); //css class
        image.classList.add("p-1");
        image.classList.add("m-0");
        image.src = imagePath;

        //add necessary attributes to make images act as modal button
        image.setAttribute('data-bs-toggle', 'modal');
        image.setAttribute('data-bs-target', '#exampleModal'); //use id of the modal to appear
        image.setAttribute('onclick', 'showImage("' + image.id + '")'); //pass the id as parameter

        //insert the images into the whole container
        gallery.appendChild(image);
    })
}
displayImages(); //call the function to run in the beginning

//function to show image in modal
function showImage(selectedId) {

    //prepare values
    const id = selectedId;
    const imagePath = "images/" + id;

    //set values to attributes
    const modalImage = document.createElement('img');
    modalImage.id = id;
    modalImage.classList.add("modalImage"); //css class
    modalImage.classList.add("mx-auto");
    modalImage.src = imagePath;

    //modal construting
    const modal = document.querySelector("#modal");
    //remove previous image inserted in the modal before inserting another
    while (modal.firstChild) { //till there is a child
        modal.removeChild(modal.firstChild); //remove that child
    }
    modal.appendChild(modalImage); //insert image in the modal

    //modal title to show in header
    const modalTitle = document.querySelector("#exampleModalLabel");
    const title = id.split(".");
    modalTitle.textContent = title.slice(0, -1);
}

//next image
async function nextImage() {
    const files = await fetchImageFiles(); //fetch file names

    const parent = document.querySelector("#modal");
    const children = parent.querySelectorAll('*'); //call all children of modal id element
    const currentImage = children[0].id; //take first child which is the only one in the array anyway here
    let nextImageIndex = files.indexOf(currentImage) + 1; //add 1 to it to get next index

    //if the current image is the last one in the array, go back to the first one
    if (nextImageIndex >= files.length) {
        nextImageIndex = 0;
    }

    const nextImage = files[nextImageIndex]; //get the value with index number
    showImage(nextImage); //call the function to change the current image in the modal
}

//previous image
async function previousImage() {
    const files = await fetchImageFiles(); //fetch file names

    const parent = document.querySelector("#modal");
    const children = parent.querySelectorAll('*'); //call all children of modal id element
    const currentImage = children[0].id; //take first child which is the only one in the array anyway here
    let previousImageIndex = files.indexOf(currentImage) - 1; //subtract 1 from it to get previous index

    //if the current image is the first one in the array, go to the last one
    if (previousImageIndex < 0) {
        previousImageIndex = files.length - 1;
    }

    const previousImage = files[previousImageIndex]; //get the value with index number
    showImage(previousImage); //call the function to change the current image in the modal
}

