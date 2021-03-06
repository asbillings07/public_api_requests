/***
Public-Api-Requests
by Aaron Billings
*/

const gallery = document.getElementById("gallery");
const searchdiv = document.querySelector(".search-container");
const body = document.querySelector("body");
const cardDiv = document.getElementsByClassName("card");
const headTextContainer = document.querySelector(".header-text-container");
let modalDivs;

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

function setGalleryInfo(people) {
  people.map((person, index) => {
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
  </div>
  
  `;
    cardDiv.addEventListener("click", () => {
      createModal(people, index);
    });
  });
}

// creates Modal for each person
function createModal(people, index) {
  const person = people[index];
  const modalContainerDiv = document.createElement("div");
  modalContainerDiv.className = "modal-container";
  gallery.append(modalContainerDiv);
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
                        <p class="modal-text cap">${person.location.street}., ${
    person.location.state
  }, ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${date.toLocaleDateString(
                          "en-US"
                        )}</p>
                    </div>
                    <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">
                      Prev
                    </button>
                    <button type="button" id="modal-next" class="modal-next btn">
                      Next
                    </button>
                    </div>
                    </div>
                    `;

  // closes modal when open
  const CloseModalbutton = document.getElementById("modal-close-btn");
  CloseModalbutton.addEventListener("click", () => {
    modalContainerDiv.remove();
  });
  const nextButton = document.getElementById("modal-next");
  const prevButton = document.getElementById("modal-prev");

  if (index < people.length - 1) {
    nextButton.addEventListener("click", e => {
      modalContainerDiv.remove();
      createModal(people, index + 1);
    });
  } else {
    nextButton.disabled = true;
  }
  if (index > 0) {
    prevButton.addEventListener("click", e => {
      modalContainerDiv.remove();
      createModal(people, index - 1);
      nextButton.disabled = false;
    });
  } else if (index === 0) {
    prevButton.disabled = true;
  }
}

// searches for person
function searchEmployee(cards, field) {
  cards.filter(card => {
    const person = card.querySelector("#name").innerHTML;
    console.log(person);
    if (person.toLowerCase().indexOf(field.value.toLowerCase()) > -1) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
    if (person.toLowerCase().indexOf(field.value.toLowerCase()) === -1) {
      headTextContainer.innerHTML = "";
    } else {
      headTextContainer.innerHTML =
        "<h1>AWESOME STARTUP EMPLOYEE DIRECTORY</h1>";
    }
  });
}

searchdiv.innerHTML = `
  <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search and press enter...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-submit");
searchInput.focus();

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// search on click
searchButton.addEventListener("click", e => {
  e.preventDefault();
  searchEmployee([...cardDiv], searchInput);
});
// search on keyup
searchInput.addEventListener("onkeyup", e => {
  console.log(e.target);
  searchEmployee([...cardDiv], searchInput);
});
