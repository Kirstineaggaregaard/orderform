// "https://frontendspring20-9cc3.restdb.io/media/5ecce0c99236d304001556c5?s=w";
const endpoint = "https://frontend-8e4d.restdb.io/";
// const endpoint2 = "https://frontendspring20-9cc3.restdb.io/media/5ecce0c99236d304001556c5?s=w";
const apiKey = "5e9961cb436377171a0c24cc";
let timeout;
let time;
const form = document.querySelector("form");

window.addEventListener("load", start);

function start() {
  window.scrollTo(0, 0);
  getPictures();
  removeLoader();
}

function removeLoader() {
  myVar = setTimeout(showPage, 2500);
}

function showPage() {
  document.querySelector(".preloader").style.display = "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  function addSuperhero(media) {
    const postData = JSON.stringify({
      header: form.elements.header.value,
      image: media,
    });
    fetch(endpoint + "rest/media", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": apiKey,
        "cache-control": "no-cache",
      },
      body: postData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showPicture(data);
      });
  }
  function uploadImage() {
    var input = document.querySelector('input[type="file"]');
    var data = new FormData();
    data.append("file", input.files[0]);
    //https://frontendspring20-9cc3.restdb.io/media/
    fetch(endpoint + "media/", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => addSuperhero(data._id));
  }
  uploadImage();
});

function getPictures() {
  //   document.querySelector("main").innerHTML = "";
  fetch(endpoint + "rest/pictures", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charrset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then(showPicture);
  //do stuff with the data
}

function showPicture(pictures) {
  console.log(pictures);
  const data = pictures;
  const data1 = data[1];
  console.log(data);
  console.log(data1);

  document.querySelector(".database_img").src = endpoint + "media/" + data1.picture;
  setTimeout(() => {
    changeImage(pictures);
  }, 4000);

  //   timeout = setTimeout(removePhoto(pictures), 8000);
  //   setInterval(changeImage(pictures), 30000);
}

function changeImage(pictures) {
  console.log("chaaaange");
  const data = pictures;
  datapic2 = data[0];

  document.querySelector(".database_img").src = endpoint + "media/" + datapic2.picture;

  setTimeout(() => {
    changeImage2(pictures);
  }, 4000);
}

function changeImage2(pictures) {
  console.log("chaaaange again");
  const data = pictures;
  datapic3 = data[2];

  document.querySelector(".database_img").src = endpoint + "media/" + datapic3.picture;
  setTimeout(() => {
    showPicture(pictures);
  }, 4000);
}
// function removePhoto(pictures) {
//   document.querySelector(".database_img").src = "";
//   changePhoto(pictures);
// }

// function changePhoto(pictures) {
//   console.log(pictures);
//   console.log("change");
//   const data = pictures;
//   const data2 = data[2];
//   document.querySelector(".database_img").src = endpoint + "media/" + data2.picture;
// }
