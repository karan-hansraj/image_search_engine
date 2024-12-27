let input = document.querySelector(".search-box input");
let searchBtn = document.querySelector(".btn button");
let images = document.querySelector(".images");
let moreButton = document.querySelector("#load");

const API_KEY = `lXEwEMzaOBKAQObwL_xqmMHAxwS_PXfWWIqtv3AvcAE`;
let page = 1;
let keyword = "";

function download(url) {
  console.log(url);
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => {
      alert("Failed download");
    });
}

async function getResponse() {
  keyword = input.value;

  let url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}%3E&client_id=${API_KEY}&per_page=12`;
  let response = await fetch(url);

  let data = await response.json();
  let results = data.results;
  if (page == 1) {
    images.innerHTML = "";
  }
  moreButton.style.display = "block";

  //   console.log(results);
  results.map((result) => {
    let li = document.createElement("li");
    li.classList.add("image");
    let html = `<img src="${result.preview_photos[0].urls.small}" alt="img" class="photo"> 
    <div class="details">
                <div class="user">
                    <img src="/img/camera.svg" alt="img">
                <span>${result.title}</span>
                </div>
                <div class="download" onclick=download("${result.preview_photos[0].urls.small}")>
                    <img src="/img/download.svg" alt="">
                </div>
            </div>`;
    li.innerHTML = html;
    images.appendChild(li);
  });

  //   console.log(data);
}
input.addEventListener("keyup", (e) => {
  page = 1;
  if (e.key == "Enter") {
    getResponse();
  }
});

searchBtn.addEventListener("click", () => {
  page = 1;
  getResponse();
});

moreButton.addEventListener("click", () => {
  page++;
  getResponse();
});
