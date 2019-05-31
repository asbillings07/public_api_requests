/***
 * Get and display 12 random users
With information provided from The Random User Generator API, send a single request to the API, and use the response data to display 12 users, along with some basic information for each:
Image
First and Last Name
Email
City or location
Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
*/

const gallery = document.getElementById("gallery");
const searchdiv = document.querySelector(".search-container");
const body = document.querySelector("body");
const cardDiv = document.getElementsByClassName("card");
const cardInfo = document.getElementsByClassName("card-info-container");
const textContainer = document.querySelector(".header-text-container");
// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

function fetchData(url) {
  return fetch(url) // returns a promise
    .then(checkStatus)
    .then(res => res.json()) // parse data into JSON
    .then(data => data.results.map(data => data))
    .catch(err => console.log(Error("looks like there was a problem", err))); // handle error
}

fetchData("https://randomuser.me/api/?results=12&nat=us").then(setGalleryInfo);

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
  // checks the response from the promise
  if (response.ok) {
    return Promise.resolve(response); // if promise is fullfilled
  } else {
    return Promise.reject(new Error(response.statusText)); // if promise is rejected
  }
}

function setGalleryInfo(data) {
  data.map(person => {
    const cardDiv = document.createElement("div");

    cardDiv.className = "card";

    gallery.append(cardDiv);
    cardDiv.innerHTML = `<div class="card-img-container">
      <img class="card-img" src="${person.picture.large}" alt="">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${person.name.first} ${
      person.name.last
    }</h3>
      <p class="card-text">${person.email}</p>
      <p class="card-text cap">${person.location.city}, ${
      person.location.state
    }</p>
  </div>`;

    cardDiv.addEventListener("click", () => {
      createModal(person);
    });
  });
}

// creates Modal for each person
function createModal(person) {
  const modalContainerDiv = document.createElement("div");
  modalContainerDiv.className = "modal-container";
  body.append(modalContainerDiv);
  const date = new Date(person.dob.date);
  modalContainerDiv.innerHTML = `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${person.picture.large}
                          
                        " alt="profile picture">
                        <h3 id="name" class="modal-name cap"> ${
                          person.name.first
                        } ${person.name.last}</h3>
                        <p class="modal-text">${person.email}</p>
                        <p class="modal-text cap">${person.location.city}</p>
                        <hr>
                        <p class="modal-text">${person.phone}</p>
                        <p class="modal-text">${person.location.street}., ${
    person.location.state
  }, ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${date.toLocaleDateString(
                          "en-US"
                        )}</p>
                    </div>`;
  modalContainerDiv.style.display = "";
  const modalbutton = document.getElementById("modal-close-btn");
  modalbutton.addEventListener("click", () => {
    modalContainerDiv.remove();
  });
}
// searches for person
function searchEmployee(cards, field) {
  cards.filter(card => {
    const person = card.querySelector("#name").textContent;

    if (person.includes(field.value.toLowerCase())) {
      card.style.display = "";
    } else {
      card.style.display = "none";
      textContainer.innerHTML = `<h3>Sorry No Employee Matches Found, please try again</h3>`;
    }

    if (field.value === "") {
      card.style.display = "";
      textContainer.innerHTML = `<h3>AWESOME STARTUP EMPLOYEE DIRECTORY
      </h3>`;
    }
  });
}

searchdiv.innerHTML = `
  <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-submit");

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
searchButton.addEventListener("click", e => {
  e.preventDefault();
  searchEmployee([...cardDiv], searchInput);
});

searchInput.addEventListener("click", () => {
  searchEmployee([...cardDiv], searchInput);
});

function resetField() {
  if (searchInput.value === "") {
  }
}
