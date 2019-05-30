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
const cards = document.querySelectorAll(".card");
const modalArr = [];

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
  searchPerson(data);
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
// searches people
function searchPerson(people) {
  searchdiv.innerHTML = `
  <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-submit");

  searchButton.addEventListener("click", e => {
    e.preventDefault();
    people.filter(person => {
      const search = person.name;
      if (
        search.first.includes(searchInput.value) ||
        search.last.includes(searchInput.value)
      ) {
        console.log(person);
        createModal(person);
      } else {
        alert(
          "Person not found, please type in more letters of name and try your search again"
        );
      }
    });
  });
}

/*
create all the cards in that loop and append them to the gallery.  Also, inside the loop, you can push the results of the API call into a global storage array.  Then completely outside of your API call, you can create a single modal appended to the body element in the HTML, but without the user-specific info.

And then back inside the loop in your API call, you can add a click handler to the cards that gets the gets the index of the card that was clicked, which is used to grab the correct info out of the storage arrays, which is used to populate the modal with the relevant info.

So basically, what this does is gives a single modal that shows when a card is clicked, and hides when the close modal button is clicked.  And each time the modal is opened, it is updated to have the correct user info.
 */
