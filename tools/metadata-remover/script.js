const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const imagesGrid = document.getElementById('images');

dropArea.addEventListener('click', () => fileInput.click());

dropArea.addEventListener('dragover', e => {
    e.preventDefault();
    dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('hover');
});

dropArea.addEventListener('drop', e => {
    e.preventDefault();
    dropArea.classList.remove('hover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob);

                    const card = document.createElement('div');
                    card.className = 'image-card';

                    const imageEl = document.createElement('img');
                    imageEl.src = url;

                    const button = document.createElement('button');
                    button.textContent = 'Download clean image';
                    button.onclick = () => {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `clean_${file.name}`;
                        a.click();
                    };

                    card.appendChild(imageEl);
                    card.appendChild(button);
                    imagesGrid.appendChild(card);
                }, 'image/png');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}
