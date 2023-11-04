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

const folderPath = "./imgs/"; // 你的文件夹路径

function readImages() {
  fetch(folderPath)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data, "text/html");
      const links = Array.from(htmlDoc.querySelectorAll("a"));

      links.forEach((link) => {
        const fileName = link.getAttribute("href");
        if (fileName && fileName.endsWith(".jpg")) {
          imagePaths.push(fileName);
        }
      });

      showImage(currentIndex);
    })
    .catch((error) => console.error("Error fetching images:", error));
}
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
    showImage(currentIndex);
  } else if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    showImage(currentIndex);
  }
});

readImages();