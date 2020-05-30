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

  // console.log("orders");

  // let data = Object.create(Data);

  // data.selected = true;

  // if (data.selected === true) {
  //   beer.amount = +1;
  // } else {
  //   beer.name = beer.name;
  //   beer.amount = 1;
  // }

  // if (allBeers.filter((allBeers) => allBeers.name === "El Hefe")) {
  //   console.log();
  // }

  // const elementsIndex = this.state.allBeers.findIndex((element) => element.name == name);
  // let newArray = [...this.state.allBeers];

  // const hefe = allBeers.filter((allBeers) => allBeers.name === "El Hefe");
  // console.log(elementsIndex);

  // allBeers.filter(allBeers => allBeers.name === "El Hefe")

  // const clicked = allBeers.filter((beer) => {
  //   return beer.amount === 1;
  // });

  // const clickedName = clicked.some((amount) => {
  //   return amount.name === clickedBeer.name;
  // });

  // if (clickedBeer.amount === 1) {
  //   clickedBeer.amount = +1;
  // } else if (clickedName) {
  //   clickedBeer.amount = +1;
  // } else {
  //   const beer = {
  //     name: clickedBeer.name,
  //     amount: 1,
  //   };
  // }

  // allBeers.push(data);
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
  const dest = document.querySelector("#liste");
  const temp = document.querySelector(".template_two");
  dest.textContent = "";

  allBeers.forEach((order) => {
    const klon = temp.cloneNode(true).content;

    klon.querySelector(".beername").textContent = order.name;
    klon.querySelector(".amount").textContent = order.amount;
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
  // order.deleted = true;

  deletedBeers.push(order);

  const deleteOrder = allBeers.indexOf(order);
  allBeers.splice(deleteOrder, 1);
  showBasket(allBeers);
}

function addBeer(order) {
  console.log("removing beer");

  deletedBeers.push(order);

  const deleteOrder = allBeers.indexOf(order);
  allBeers.push(order);
  showBasket(allBeers);
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
