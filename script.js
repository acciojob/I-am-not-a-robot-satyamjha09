document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById("image-container");
    const para = document.getElementById("para");
    const resetButton = document.getElementById("reset");
    const verifyButton = document.getElementById("verify");

    let images = [
        "https://picsum.photos/id/237/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/200/300?grayscale",
        "https://picsum.photos/200/300/",
        "https://picsum.photos/200/300.jpg"
    ];

    let selectedImages = [];

    function shuffleImages() {
        let randomIndex = Math.floor(Math.random() * images.length);
        let duplicateImage = images[randomIndex];
        let imagesWithDuplicate = [...images, duplicateImage];

        imagesWithDuplicate.sort(() => Math.random() - 0.5);
        return imagesWithDuplicate;
    }

    function displayImages() {
        let shuffledImages = shuffleImages();
        imageContainer.innerHTML = "";

        shuffledImages.forEach((src, index) => {
            let img = document.createElement("img");
            img.src = src;
            img.dataset.index = index;
            img.addEventListener("click", () => selectImage(img, src));
            imageContainer.appendChild(img);
        });
    }

    function selectImage(img, src) {
        if (selectedImages.length < 2 && !img.classList.contains("selected")) {
            img.classList.add("selected");
            selectedImages.push({ img, src });

            if (selectedImages.length === 1) {
                resetButton.style.display = "inline-block";
            }

            if (selectedImages.length === 2) {
                verifyButton.style.display = "inline-block";
            }
        }
    }

    function verifySelection() {
        if (selectedImages.length === 2) {
            if (selectedImages[0].src === selectedImages[1].src) {
                para.textContent = "✅ You are a human. Congratulations!";
            } else {
                para.textContent = "❌ We can't verify you as a human. You selected the non-identical tiles.";
            }

            verifyButton.style.display = "none";
        }
    }

    function resetGame() {
        selectedImages.forEach(({ img }) => img.classList.remove("selected"));
        selectedImages = [];
        para.textContent = "";
        resetButton.style.display = "none";
        verifyButton.style.display = "none";
    }

    resetButton.addEventListener("click", resetGame);
    verifyButton.addEventListener("click", verifySelection);

    displayImages();
});
