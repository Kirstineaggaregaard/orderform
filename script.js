const endpoint = "https://kirchrinew2.herokuapp.com/beertypes";
const endpoint2 = "https://frontend-8e4d.restdb.io/rest/pictures";
const endpoint3 = "https://frontend-8e4d.restdb.io/home/media";
const apiKey = "5e9961cb436377171a0c24cc";
const URL = "https://kirchrinew2.herokuapp.com/";
const URL2 = "https://kirchrinew2.herokuapp.com/order";
let time;
const allBeers = [];
const deletedBeers = [];
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
  fetchData();
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
    .then(showBeers);
  //do stuff with the data
}

get();

function showBeers(data) {
  if (data.length > 10) {
    data.length = 10;
  }
  data.forEach(showBeer);
}

function showTheBasket(data2) {
  data2.forEach(showBasket);
}

function showBeer(beer) {
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
  copy.querySelector(".clickpopup").addEventListener("click", () => {
    showPopup(beer);
  });

  copy.querySelector("button").addEventListener("click", (event) => {
    orders(beer);
  });
  const ul = copy.querySelector("ul");
  parent.appendChild(copy);
}

function showPopup(beer) {
  document.querySelector("#popup").classList.remove("none");
  document.querySelector("#menucard").classList.add("hidden");
  document.querySelector(".close").addEventListener("click", hidePopup);
  console.log(beer);
  const describe = beer.description;
  document.querySelector(".popname").textContent = beer.name;
  // document.querySelector(".popap").textContent = "APPERANCE: " + describe.appearance;
  document.querySelector(".popflavor").textContent = "FLAVOR: " + describe.flavor;
}

function hidePopup() {
  document.querySelector("#popup").classList.add("none");
  document.querySelector("#menucard").classList.remove("hidden");
}

function showBasket(beer) {
  document.querySelector("#scroll_container").classList.add("none");
  document.querySelector(".basketbut_con").classList.add("hidden");

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
    klon.querySelector(".orderprice").textContent = order.amount * 65 + " DKK";
    klon.querySelector(".remove").addEventListener("click", () => {
      console.log("going to remove");
      removeBeer(order);
      7;
    });

    klon.querySelector(".delete").addEventListener("click", () => {
      console.log("deleting beertype");
      deleteBeer(order);
    });

    klon.querySelector(".tobasket").addEventListener("click", () => {
      console.log("wanna add one more");
      addBeer(order);
    });

    var amountTotal = allBeers.reduce(function (prev, cur) {
      return prev + cur.amount;
    }, 0);

    console.log("total amount", amountTotal);
    document.querySelector(".totalprice").textContent = "Total amount " + amountTotal * 65 + " DKK";

    document.querySelector(".order_button").addEventListener("click", () => {
      console.log("wanna pay and see ID");

      // time = setTimeout(fetchData, 10);
    });
    dest.appendChild(klon);
  });
}

function removeBeer(order) {
  console.log("removing beer");
  console.log("orderamount" + order.amount);
  const elementsIndex = allBeers.findIndex((element) => element.name == order.name);
  console.log(elementsIndex);

  if (order.amount > 1) {
    allBeers[elementsIndex].amount -= 1;
  }

  // allBeers.forEach((order) => {
  //   console.log(order.amount);

  //   if ((order.amount = 0)) {
  //     deletedBeers.push(type);
  //   }
  // });

  const deleteOrder = allBeers.indexOf(order);
  // allBeers.splice(deleteOrder, 1);

  // if (allBeers[elementsIndex].amount < 0) {
  //   deletedBeers.push(allBeers[elementsIndex]);
  // }

  showBasket();
  // order.deleted = true;
}

function addBeer(order) {
  console.log("adding beer");
  const elementsIndex = allBeers.findIndex((element) => element.name == order.name);
  allBeers[elementsIndex].amount += 1;
  showBasket();
  // deletedBeers.push(order);
}

function deleteBeer(order) {
  deletedBeers.push(order);
  const deleteOrder = allBeers.indexOf(order);
  allBeers.splice(deleteOrder, 1);
  showBasket(allBeers);
}

function buyMore() {
  document.querySelector("#scroll_container").classList.remove("none");
  document.querySelector(".basketbut_con").classList.remove("hidden");
  document.querySelector("#basket").style.display = "none";

  document.querySelector(".thecontainer").classList.add(".thecontainer");
  document.querySelector(".thecontainer").classList.remove(".smallercontainer");
  document.querySelector(".navigation").style.backgroundColor = "white";
}

function post() {
  const Data = allBeers;
  const postData = JSON.stringify(Data);
  console.log(Data);
  fetch(URL2, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((Data) => showId(Data));
}

function fetchData() {
  fetch(URL).then((res) => res.json());
}

function fetchOrders() {
  fetch(URL2)
    .then((res) => res.json())
    .then(showOrders);
}

function showId(Data) {
  console.log(Data);
  console.log(Data.status);
  // const people = data.queue;
  // var last = people[people.length - 1];
  // // const uno = people[0];
  // if ((Data.status = 500)) {
  //   console.log(Data.message);
  if (Data.status == 200) {
    console.log("im added");
    showIt(Data);
  } else {
    errorFunction(Data);
  }

  // }

  // document.querySelector(".infront").textContent = "There are " + people.length + " people in front of you";
}

function showIt(Data) {
  console.log("wanna show");
  document.querySelector(".navigation").classList.add("none");
  document.querySelector("#show_con").classList.remove("hidden");
  document.querySelector("#basket").classList.add("hidden");
  document.querySelector(".showit").textContent = Data.id;
}

function errorFunction(Data) {
  document.querySelector(".not_serving").textContent = Data.message;
  document.querySelector("#notserving_con").classList.remove("none");
  document.querySelector(".ok").addEventListener("click", removeErrorPop);
  const removeHollaback = "Hollaback Lager";
  const removeElhefe = "El Hefe";
  const removeRow = "Row 26";
  const removeChildhood = "Ruined Childhood";
  const removeGithop = "Githop";
  const removeFairy = "Fairy Tale Ale";
  const removeHoppily = "Hoppily Ever After";
  const removeSleighride = "Sleighride";
  const removeSteam = "Steampunk";

  if (Data.message === "We are not serving: Hollaback Lager right now!") {
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeHollaback) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }
  if (Data.message === "We are not serving: El Hefe right now!") {
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeElhefe) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }
  if (Data.message === "We are not serving: Row 26 right now!") {
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeRow) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }

  if (Data.message === "We are not serving: Githop right now!") {
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeGithop) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }

  if (Data.message === "We are not serving: Ruined Childhood right now!") {
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeChildhood) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }

  if (Data.message === "We are not serving: Fairy Tale Ale right now!") {
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeFairy) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }

  if (Data.message === "We are not serving: Hollaback Lager right now!") {
    console.log("wanna slice hoppy");
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeHoppily) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }

  if (Data.message === "We are not serving: Steampunk right now!") {
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeSteam) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }

  if (Data.message === "We are not serving: Sleighride right now!") {
    allBeers.forEach((order) => {
      const deleteErrorOrder = allBeers.indexOf(order);
      if (order.name == removeSleighride) {
        deletedBeers.push(order);
        allBeers.splice(deleteErrorOrder, 1);
      }
    });
  }
  showBasket(allBeers);
}

function removeErrorPop() {
  document.querySelector("#notserving_con").classList.add("none");
}

function showOrders() {
  const order = order;
  console.log(order);
}
