// "https://frontendspring20-9cc3.restdb.io/media/5ecce0c99236d304001556c5?s=w";
const endpoint = "https://frontend-8e4d.restdb.io/";
// const endpoint2 = "https://frontendspring20-9cc3.restdb.io/media/5ecce0c99236d304001556c5?s=w";
const apiKey = "5e9961cb436377171a0c24cc";
let timeout;
const form = document.querySelector("form");

document.querySelector("#sharecon > form > label:nth-child(2) > input[type=submit]:nth-child(2)").addEventListener("click", thanksForSharing);
document.querySelector(".closeshare").addEventListener("click", closeSharing);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  function addImage(media) {
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
      .then((data) => addImage(data._id));
  }
  uploadImage();
});

function thanksForSharing() {
  document.querySelector("#thanksforsharing").classList.remove("hidden");
}

function closeSharing() {
  window.location.href = "landingpage.html";
}
