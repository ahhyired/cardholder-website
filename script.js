document.getElementById('uploadBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const fileNameInput = document.getElementById('fileName');
    const file = fileInput.files[0];
    const name = fileNameInput.value;

    if (file && name) {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('name', name);

        const response = await fetch('https://cool-wave-0cef.ddominicyspon.workers.dev/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Photo uploaded successfully!');
            loadPhotos();
        } else {
            alert('Failed to upload photo.');
        }
    } else {
        alert('Please select a file and enter a name.');
    }
});

async function loadPhotos() {
    const response = await fetch('https://cool-wave-0cef.ddominicyspon.workers.dev/photos');
    const photos = await response.json();

    const photoContainer = document.getElementById('photoContainer');
    photoContainer.innerHTML = '';

    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photoItem';
        photoItem.innerHTML = `
            <img src="${photo.url}" alt="${photo.name}">
            <p>${photo.name}</p>
        `;
        photoContainer.appendChild(photoItem);
    });
}

loadPhotos();
