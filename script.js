const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const message = document.getElementById("para");

const imageSources = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg",
];

let images = [];
let selectedImages = [];

// 🔄 Randomly shuffle images and duplicate one
function loadImages() {
  let randomImages = [...imageSources];
  let duplicateImage = randomImages[Math.floor(Math.random() * randomImages.length)];
  randomImages.push(duplicateImage);

  randomImages.sort(() => Math.random() - 0.5); // Shuffle the images

  imageContainer.innerHTML = ""; // Clear container
  images = [];

  randomImages.forEach((src, index) => {
    let img = document.createElement("img");
    img.src = src;
    img.dataset.index = index;
    img.addEventListener("click", selectImage);
    imageContainer.appendChild(img);
    images.push(img);
  });

  resetState();
}

// 🔘 Image selection logic
function selectImage(event) {
  const img = event.target;

  if (selectedImages.includes(img)) return; // Prevent double-clicking the same image

  img.classList.add("selected");
  selectedImages.push(img);

  resetButton.style.display = "block";

  if (selectedImages.length === 2) {
    verifyButton.style.display = "block";
  }
}

// 🔄 Reset Function
function resetState() {
  selectedImages = [];
  images.forEach(img => img.classList.remove("selected"));
  message.textContent = "";
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
}

// ✅ Verification Logic
function verifyImages() {
  if (selectedImages.length !== 2) return;

  verifyButton.style.display = "none";

  if (selectedImages[0].src === selectedImages[1].src) {
    message.textContent = "✅ You are a human. Congratulations!";
    message.style.color = "green";
  } else {
    message.textContent = "❌ We can't verify you as a human. You selected non-identical tiles.";
    message.style.color = "red";
  }
}

// 🟢 Event Listeners
resetButton.addEventListener("click", loadImages);
verifyButton.addEventListener("click", verifyImages);

// 🔄 Load images on page load
loadImages();

