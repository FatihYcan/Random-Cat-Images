const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");
const body = document.getElementById("body");

loadingDiv.style.display = "block";
containerDiv.style.display = "none";

const timeOut = setTimeout(() => {
  loadingDiv.style.display = "none";
  containerDiv.style.display = "block";
  body.style.backgroundColor = "#17A2B8";
}, 3000);

const saat = setInterval(() => {
  tarih.innerText = new Date().toLocaleString();
}, 1000);

fetch("https://api.thecatapi.com/v1/images/search?limit=10")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Hata: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => cat(data))
  .catch((error) => catError(error));

const cat = (i) => {
  cardDiv.innerHTML = "";
  i.forEach((i) => {
    cardDiv.innerHTML += `<img src="${i.url}" width="300px" height="300px"  alt="" />`;
  });
};

btn.addEventListener("click", () => {
  cardDiv.innerHTML = `<img src="./img/loading.gif" alt="" />`;
  body.style.backgroundColor = "";
  fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Hata: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      cardDiv.innerHTML = "";
      body.style.backgroundColor = "#17A2B8";
      cat(data);
    })
    .catch((error) => {
      cardDiv.innerHTML = "";
      body.style.backgroundColor = "#17A2B8";
      catError(error);
    });
});

const catError = (error) => {
  cardDiv.innerHTML = `<img src="./img/error.gif" alt="" />`;
};
