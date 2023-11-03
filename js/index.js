const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentIndex = 0;
let imagePaths = [];

// Function to display an image
function showImage(index) {
  const img = new Image();
  img.src = imagePaths[index];
  console.log(imagePaths[index]);
  document.body.style.backgroundImage = "url('" + imagePaths[index] + "')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
}

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
  showImage(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imagePaths.length;
  showImage(currentIndex);
});

function readImages() {
  const folderPath = "./imgs/"; // Replace with your folder path
  getImagesInDirectory(folderPath);
  showImage(currentIndex);
}
const folderPath = "./imgs/"; // Replace with your folder path
function getImagesInDirectory(folderPath) {
  for (let i = 1; i <= 78; i++) {
    const fileName = folderPath + `${i}.jpg`;
    imagePaths.push(fileName);
  }
  return imagePaths;
}

readImages();
