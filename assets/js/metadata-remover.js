(() => {
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const imagesDiv = document.getElementById("images");

  if (!dropArea || !fileInput || !imagesDiv) return;

  dropArea.addEventListener("click", () => fileInput.click());

  dropArea.addEventListener("dragover", e => {
    e.preventDefault();
    dropArea.classList.add("is-hover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("is-hover");
  });

  dropArea.addEventListener("drop", e => {
    e.preventDefault();
    dropArea.classList.remove("is-hover");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    [...files].forEach(file => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);

          canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);

            const wrapper = document.createElement("div");
            const image = document.createElement("img");
            image.src = url;

            const btn = document.createElement("button");
            btn.textContent = "Download clean image";
            btn.onclick = () => {
              const a = document.createElement("a");
              a.href = url;
              a.download = `clean_${file.name}`;
              a.click();
              URL.revokeObjectURL(url);
            };

            wrapper.append(image, btn);
            imagesDiv.appendChild(wrapper);
          }, "image/png");
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
})();
