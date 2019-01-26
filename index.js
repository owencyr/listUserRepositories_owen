/* eslint-disable no-console */
'use strict';
/* global $ */
// search for github user handle
// trigger api call
// repos associated with handle rendered on page
// wipe between searches

// https://api.github.com/users/:username/repos

const baseURL = 'https://api.github.com/users';

// a new line

function handleSubmit() {
  $('.js-search-form').on('submit', function(e) {
    e.preventDefault();
    let userInput = getUsernameInput();
    callAPI(userInput);
  });
}

function getUsernameInput() {
  let userInput = $('.js-input').val();
  console.log(`searching for  ${userInput}`);
  return userInput;
}

function callAPI(username) {
  
  let searchUserURI = `${baseURL}/${username}/repos`;

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
  let resultsHTML = formatResponse(responseJSON);
  $('.js-results').html(resultsHTML);
}

function formatResponse(responseJSON) {
  return responseJSON.map(item => generateHTML(item))
}

function generateHTML(result) {
  return `
  <ul>
    <li><h2>${result.name}</h2></li>
    <li><a href="${result.html_url}">${result.html_url}</li>
  </ul><br>`;
}

function handleSearchUserRepo() {
  handleSubmit();
}

handleSearchUserRepo();