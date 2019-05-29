/***
 * Get and display 12 random users
With information provided from The Random User Generator API, send a single request to the API, and use the response data to display 12 users, along with some basic information for each:
Image
First and Last Name
Email
City or location
Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
*/

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

const fetchData = url => {
  return fetch(url) // returns a promise
    .then(checkStatus)
    .then(res => res.json()) // parse data into JSON
    .catch(err => console.log(Error("looks like there was a problem", err))); // handle error
};
fetchData("https://randomuser.me/api/?results=12").then(data =>
  console.log(data)
);

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response); // if promise is fullfilled
  } else {
    return Promise.reject(new Error(response.statusText)); // if promise is rejected
  }
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// ------------------------------------------
//  POST DATA
// ------------------------------------------

/*
Create a modal window
When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
Image
Name
Email
City or location
Cell Number
Detailed Address, including street name and number, state or country, and post code.
Birthday
Make sure there’s a way to close the modal window
Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.

 */
