function getHitokoto() {
  return fetch("https://v1.hitokoto.cn/?encode=text")
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
}

// 弹幕颜色配置
function getRandomColor() {
  const colors = [
    "#0F0F0F",
    "#1E1E1E",
    "#2D2D2D",
    "#3C3C3C",
    "#4B4B4B",
    "#5A5A5A",
    "#696969",
    "#787878",
    "#878787",
    "#969696",
  ];
  const colorIndex = Math.floor(Math.random() * colors.length);
  return colors[colorIndex];
}

let isDanmuRunning = false; // 控制弹幕是否运行

// 弹幕属性配置
function createDanmu() {
  if (!isDanmuRunning) {
    const parentDiv = document.getElementById("danmu");
    // 检查是否找到了父 div 元素
    if (parentDiv) {
      // 删除所有子元素
      while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
      }
    }
    return;
  } // 如果弹幕停止则不创建新的弹幕

  const danmu = document.createElement("div");
  getHitokoto().then((data) => {
    danmu.innerText = data; // 返回一句随机的一言
  });
  danmu.style.position = "absolute";
  danmu.style.left = "100%";
  danmu.style.top = Math.random() * 100 + "%";
  danmu.style.fontSize = Math.random() * 10 + 20 + "px";
  danmu.style.color = getRandomColor();
  document.getElementById("danmu").appendChild(danmu);
  animateDanmu(danmu);
}

// 弹幕速度配置
function animateDanmu(danmu) {
  let left = 100;
  const timer = setInterval(() => {
    left -= 0.5;
    danmu.style.left = left + "%";
    if (left <= -danmu.offsetWidth) {
      clearInterval(timer);
      danmu.parentNode.removeChild(danmu);
    }
  }, 20);
}

let timer;
timer = setInterval(createDanmu, 1000);

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // 窗口变成非当前窗口时的操作
    clearInterval(timer);
  } else {
    timer = setInterval(createDanmu, 1000);
    // 窗口重新变成当前窗口时的操作
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    isDanmuRunning = !isDanmuRunning; // 切换弹幕运行状态
    if (isDanmuRunning) {
      alert("弹幕已开启");
    } else {
      alert("弹幕已关闭");
    }
  }
});

setTimeout(createDanmu, 1000);

// clearInterval(timer);

//给页面元素赋值
document.querySelector(".name").innerText = "FreeL00P";
document.querySelector(".description").innerText = "恋恋不忘 念念不忘";
document.querySelector(".avatar img").src = "./src/tx.png";
const links = document.querySelector(".links"); //外链div
//外链数量
const imagesData = [
  {
    src: "./src/tencent-qq-8c2d8dc7.svg",
    alt: "QQ",
    href: "https://user.qzone.qq.com/1084472249",
  },
  {
    src: "./src/iconmonstr-github-1.svg",
    alt: "GitHub",
    href: "https://github.com/FreeL00P",
  },
  {
    src: "./src/outlook-e4c48930.svg",
    alt: "Email",
    href: "mailto:FreeL00P@tom.com",
  },
  {
    src: "./src/bilibili-1b0355a4.svg",
    alt: "Bilibili",
    href: "https://space.bilibili.com/284822327",
  },
];
//根据外链数量创建img标签添加到links下
for (let i = 0; i < imagesData.length; i++) {
  links.appendChild(document.createElement("img"));
}
const images = links.querySelectorAll("img");
for (let i = 0; i < images.length; i++) {
  images[i].src = imagesData[i].src;
  images[i].alt = imagesData[i].alt;
  images[i].style.width = "30px";
  if (imagesData[i].href) {
    //创建一个a标签
    const link = document.createElement("a");
    link.dataset.cate = imagesData[i].alt;
    link.href = imagesData[i].href;
    link.target = "_blank";
    images[i].parentNode.replaceChild(link, images[i]);
    link.appendChild(images[i]); //将img标签放入a标签
  }
}
const qq = links.querySelector('[data-cate="QQ"]');
qq.addEventListener("click", () => {
  alert("请加QQ 1084472249 ");
});
