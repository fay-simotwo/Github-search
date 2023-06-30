// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Selecting the form element with the class "user-form"
    var form = document.querySelector('.user-form');
    
    // Getting the search input element by its ID
    var searchInput = document.getElementById("search");
    
    // Getting the result container element by its ID
    var resultContainer = document.getElementById('results');
    
    // Getting the suggestions container element by its ID
    var suggestionsContainer = document.getElementById('suggestions');
    
    // Getting the user not found popup element by its ID
    var userNotFoundPopup = document.getElementById('user-not-found');
  
    // Adding a submit event listener to the form
    form.addEventListener('submit', function(e) {
      // Preventing the default form submission behavior
      e.preventDefault();
      
      // Trimming the search input value and storing it in the "search" variable
      var search = searchInput.value.trim();
      
      // Clearing the result container and suggestions container
      resultContainer.innerHTML = "";
      suggestionsContainer.innerHTML = "";
      
      // Removing the "show" class from the user not found popup
      userNotFoundPopup.classList.remove('show');
      
      // Fetching the user data from the GitHub API based on the search input
      fetch("https://api.github.com/users/" + search, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
        .then((response) => {
          // Checking the response status for user not found (404) or other errors
          if (response.status === 404) {
            // Adding the "show" class to display the user not found popup
            userNotFoundPopup.classList.add('show');
            throw new Error("User not found");
          } else if (!response.ok) {
            throw new Error("Error fetching data");
          }
          return response.json();
        })
        .then((data) => {
          // Logging the fetched user data
          console.log(data);
  
          // Extracting the avatar URL, username, and repository link from the data
          var avatarUrl = data.avatar_url;
          var username = data.login;
          var repoLink = data.html_url;
  
          // Creating and appending the avatar image to the result container
          if (avatarUrl) {
            var avatarImg = document.createElement('img');
            avatarImg.setAttribute('src', avatarUrl);
            avatarImg.setAttribute('alt', 'Avatar');
            avatarImg.classList.add('avatar-img');
            resultContainer.appendChild(avatarImg);
          } else {
            resultContainer.textContent = "Avatar not found";
          }
  
          // Creating and appending the username element to the result container
          var usernameElement = document.createElement('p');
          usernameElement.textContent = "Username: " + username;
          resultContainer.appendChild(usernameElement);
  
          // Creating and appending the repository link element to the result container
          var repoLinkElement = document.createElement('p');
          var link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', repoLink);
          link.textContent = "Repository Link";
          repoLinkElement.appendChild(link);
          resultContainer.appendChild(repoLinkElement);
        })
        .catch((error) => {
          // Handling any errors that occurred during the fetching process
          console.log(error);
          resultContainer.textContent = "Error: " + error.message;
        });
    });
  
    // Adding an input event listener to the search input
    searchInput.addEventListener('input', function() {
      // Trimming the search input value and storing it in the "search" variable
      var search = searchInput.value.trim();
      
//       // Clearing the suggestions container
//       suggestionsContainer.innerHTML = "";
  
//       // Checking if the search input has a length greater than 0
//       if (search.length > 0) {
//         // Fetching the user suggestions from the GitHub API based on the search input
//         fetch("https://api.github.com/search/users?q=" + search, {
//           headers: {
//             Accept: "application/vnd.github.v3+json"
//           }
//         })
//           .then((response) => {
//             // Checking the response status for errors
//             if (!response.ok) {
//               throw new Error("Error fetching suggestions");
//             }
//             return response.json();
//           })
//           .then((data) => {
//             // Logging the fetched user suggestions data
//             console.log(data);
            
//             // Extracting the users from the data
//             var users = data.items;
            
//             // Iterating over the users and creating suggestion elements
//             users.forEach(function(user) {
//               var suggestion = document.createElement('div');
//               suggestion.textContent = user.login;
//               suggestion.classList.add('suggestion');
//               suggestion.addEventListener('click', function() {
//                 // Setting the search input value to the clicked suggestion
//                 searchInput.value = user.login;
//                 // Triggering a form submit event
//                 form.dispatchEvent(new Event('submit'));
//               });
//               suggestionsContainer.appendChild(suggestion);
//             });
//           })
//           .catch((error) => {
//             // Handling any errors that occurred during the fetching process
//             console.log(error);
//           });
//       }
//     });
//   });
  