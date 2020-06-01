const endpoint = "https://kirchris.herokuapp.com/beertypes";
const endpoint2 = "https://frontend-8e4d.restdb.io/rest/pictures";
const endpoint3 = "https://frontend-8e4d.restdb.io/home/media";
const apiKey = "5e9961cb436377171a0c24cc";
const URL = "https://kirchris.herokuapp.com/";
const URL2 = "https://kirchris.herokuapp.com/order";
let time;
const allBeers = [];
let deletedBeers = [];
const Data = {
  name: "",
  amount: 0,
  selected: false,
};

window.addEventListener("DOMContentLoaded", start);

// window.addEventListener("load", (e) => {
//   document.querySelector("button").addEventListener("click", () => {
//     const Beer = {
//       name: beer.name,
//       amount: 1,
//     };
//     orders(Beer);
//   });
// });

function start() {
  document.querySelector(".basket_button").addEventListener("click", showBasket);
  document.querySelector(".order_button").addEventListener("click", post);
  document.querySelector(".buymore").addEventListener("click", buyMore);
  // document.querySelector("#addpic").addEventListener("click", () => {
  //   document.getElementById("picture").value = picture.value.substring(12);
  //   const pictureData = {
  //     picture: picture.value,
  //   };
  //   postPicture(pictureData);
  // });
  get();
}
function orders(beer) {
  // 1
  // find ud af om øllen findes i array'et
  const elementsIndex = allBeers.findIndex((element) => element.name == beer.name);
  console.log(elementsIndex);

  if (elementsIndex === -1) {
    // øllen findes ikke
    allBeers.push({
      name: beer.name,
      amount: 1,
    });
  } else {
    allBeers[elementsIndex].amount += 1;
  }
  console.log(allBeers);
}

function get() {
  document.querySelector("main").innerHTML = "";
  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charrset=utf-8",
    },
  })
    .then((e) => e.json())
    .then(showHeroes);
  //do stuff with the data
}

get();

function showHeroes(data) {
  if (data.length > 10) {
    data.length = 10;
  }
  data.forEach(showHero);
}

function showTheBasket(data2) {
  data2.forEach(showBasket);
}

function showHero(beer) {
  console.log(beer);
  const template = document.querySelector(".template_one").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector("main");
  copy.querySelector("article").dataset.id = beer._id;
  copy.querySelector("h2").textContent = beer.name;
  copy.querySelector(".overall").textContent = beer.description.overallImpression;
  copy.querySelector(".alc").textContent = beer.alc + "%vol";

  // IMAGE
  // if (beer.name == "Fairy Tale Ale") {
  //   copy.querySelector("img").src = "/beer1.png";
  // }

  // copy.querySelector(".content").dataset.icon = beer.name;

  // SKAL I POP-UP
  // copy.querySelector("p").textContent = beer.category;
  // copy.querySelector(".aroma").textContent = "Aroma: " + beer.description.aroma;
  // copy.querySelector(".appearance").textContent = "Appearance: " + beer.description.appearance;
  // copy.querySelector(".pour").textContent = "Puringspeed: " + beer.pouringSpeed;
  copy.querySelector("button").addEventListener("click", (event) => {
    orders(beer);
  });
  const ul = copy.querySelector("ul");
  parent.appendChild(copy);
}

function showBasket(beer) {
  document.querySelector("#menucard").classList.add("none");
  document.querySelector(".basketbut_con").classList.add("hidden");

  document.querySelector(".thecontainer").classList.remove(".thecontainer");
  document.querySelector(".thecontainer").classList.add(".smallercontainer");
  document.querySelector(".navigation").style.backgroundColor = "white";

  document.querySelector("#basket").style.display = "block";
  const dest = document.querySelector("#liste");
  const temp = document.querySelector(".template_two");
  dest.textContent = "";

  allBeers.forEach((order) => {
    console.log(order);
    const klon = temp.cloneNode(true).content;

    klon.querySelector(".beername").textContent = order.name;
    klon.querySelector(".amount").textContent = "x" + order.amount;
    klon.querySelector(".remove").addEventListener("click", () => {
      console.log("going to remove");
      removeBeer(order);
    });

    klon.querySelector(".tobasket").addEventListener("click", () => {
      console.log("wanna add one more");
      addBeer(order);
    });

    document.querySelector(".order_button").addEventListener("click", () => {
      console.log("wanna pay and see ID");

      time = setTimeout(fetchData, 10);
    });
    dest.appendChild(klon);
  });
}

function removeBeer(order) {
  console.log("removing beer");
  const elementsIndex = allBeers.findIndex((element) => element.name == order.name);
  allBeers[elementsIndex].amount -= 1;
  showBasket();
  // order.deleted = true;
}

function addBeer(order) {
  console.log("removing beer");
  const elementsIndex = allBeers.findIndex((element) => element.name == order.name);
  allBeers[elementsIndex].amount += 1;
  showBasket();
  // deletedBeers.push(order);
}

// function orders(beer) {
//   // 1
//   // find ud af om øllen findes i array'et
//   const elementsIndex = allBeers.findIndex((element) => element.name == beer.name);
//   console.log(elementsIndex);

//   if (elementsIndex === -1) {
//     // øllen findes ikke
//     allBeers.push({
//       name: beer.name,
//       amount: 1,
//     });
//   } else {
//     allBeers[elementsIndex].amount += 1;
//   }
//   console.log(allBeers);
// }

function buyMore() {
  document.querySelector("#menucard").classList.remove("none");
  document.querySelector(".basketbut_con").classList.remove("hidden");

  document.querySelector(".thecontainer").classList.add(".thecontainer");
  document.querySelector(".thecontainer").classList.remove(".smallercontainer");
  document.querySelector(".navigation").style.backgroundColor = "white";
}

function post() {
  const Data = allBeers;
  const postData = JSON.stringify(Data);
  fetch("https://kirchris.herokuapp.com/order", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((Data) => console.log(Data));
}

function fetchData() {
  fetch(URL)
    .then((res) => res.json())
    .then(showId);
}

function fetchOrders() {
  fetch(URL2)
    .then((res) => res.json())
    .then(showOrders);
}

function showId(data) {
  document.querySelector("#show_con").classList.remove("hidden");
  const people = data.queue;
  var last = people[people.length - 1];
  const uno = people[0];

  document.querySelector(".showit").textContent = "Dit ordre nummer er: " + last.id;
  document.querySelector(".infront").textContent = "Der er " + people.length + " personer foran dig";
}

function showOrders() {
  const order = order;
  console.log(order);
}
