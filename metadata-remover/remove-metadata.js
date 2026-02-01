(() => {
  const dropArea = document.getElementById('dropArea');
  const fileInput = document.getElementById('fileInput');
  const imagesDiv = document.getElementById('images');
  const langToggle = document.getElementById('langToggle');

  if (!dropArea || !fileInput || !imagesDiv) return;

  const texts = {
    en: {
      title: 'Remove Image Metadata',
      drop: 'Drag & drop images here or click to select',
      download: 'Download clean',
      langToggle: 'ES'
    },
    es: {
      title: 'Eliminar metadata de fotos',
      drop: 'Arrastra y suelta imágenes aquí o haz clic para seleccionar',
      download: 'Descargar limpia',
      langToggle: 'EN'
    }
  };

  let lang = navigator.language.startsWith('es') ? 'es' : 'en';
  updateTexts();

  langToggle?.addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    updateTexts();
  });

  function updateTexts() {
    dropArea.textContent = texts[lang].drop;
    if (langToggle) langToggle.textContent = texts[lang].langToggle;
    imagesDiv.querySelectorAll('button').forEach(btn => {
      btn.textContent = texts[lang].download;
    });
  }

  dropArea.addEventListener('click', () => fileInput.click());

  dropArea.addEventListener('dragover', e => {
    e.preventDefault();
    dropArea.classList.add('is-hover');
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('is-hover');
  });

  dropArea.addEventListener('drop', e => {
    e.preventDefault();
    dropArea.classList.remove('is-hover');
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    [...files].forEach(file => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();

      reader.onload = e => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);

          canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);

            const container = document.createElement('div');
            container.className = 'tool-image';

            const imageEl = document.createElement('img');
            imageEl.src = url;

            const btn = document.createElement('button');
            btn.textContent = texts[lang].download;
            btn.addEventListener('click', () => {
              const a = document.createElement('a');
              a.href = url;
              a.download = `clean_${file.name}`;
              a.click();
              URL.revokeObjectURL(url);
            });

            container.append(imageEl, btn);
            imagesDiv.appendChild(container);
          }, 'image/png');
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }
})();
