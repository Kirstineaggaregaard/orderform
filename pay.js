"use strict";
document.addEventListener("DOMContentLoaded", start);

const ccn = document.querySelector("#ccn");
const cardHolder = document.querySelector("#cardholder");
const ed = document.querySelector("#ed");
const cvv = document.querySelector("#cvv");

function start() {
  console.log("start");
  // let vCardholder = cardHolder.nodeValue;
  // if (vCardholder == "") {
  //   alert("name must be filled out");
  //   return false;
  // }
}

function validateForm() {
  console.log("validate now");
  console.log("i have been validated");

  // ccn.addEventListener("input", function (event) {
  //   if (ccn.validity.typeMismatch) {
  //     ccn.setCustomValidity("I am expecting an e-mail address!");
  //   } else {
  //     ccn.setCustomValidity("Enter card number here");
  //   }
}
