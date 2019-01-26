/* eslint-disable no-console */
'use strict';
/* global $ */
// search for github user handle
// trigger api call
// repos associated with handle rendered on page
// wipe between searches

// https://api.github.com/users/:username/repos

const baseURL = 'https://api.github.com/users/';



function handleSubmit() {
  $('.js-search-form').on('submit', function(e) {
    e.preventDefault();
    let userInput = getUsernameInput();
    callAPI(userInput);
  });
}

function getUsernameInput() {
  $('.js-input').val();
}

function callAPI(username) {
  const params = [
    username
  ];

  let searchUserURI = `${baseURL}${params.username}/repos`;

  fetch(searchUserURI)
    .then(function (response) {
      if (response.ok) { 
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJSON => displayResults(responseJSON));

}

// function formatURI(params) {

// }

function displayResults(responseJSON) {
  console.log(responseJSON);
  let resultsHTML = generateHTML(responseJSON);
  $('.js-results').html(resultsHTML);
}

function generateHTML() {
  return `
  <ul>
    <li>
  </ul><br>`;
}

function handleSearchUserRepo() {
  handleSubmit();
}

handleSearchUserRepo();