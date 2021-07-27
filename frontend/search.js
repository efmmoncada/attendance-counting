var request = new XMLHttpRequest();

// Get elements needed for processing searches.
var searchButton = document.getElementById('search-button')
var searchBox = document.getElementsByClassName('search-box')[0]

searchButton.addEventListener('click', (e) => {
  var userInput = searchBox.value.toString()

  if (Number(userInput) && (userInput.length == 6)) {
    request.open('POST', '/studentlookup/' + userInput)
    request.send()
    // send post to server with id lookup to /studentlookup/:id
    // get results and display in UI

    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        searchBox.classList.remove('invalid')
        var student = JSON.parse(this.responseText) // student contains obj with id and array
        var resultsContext = {
          id: student.id,
          total: student.datesAbsent.length,
          dates: student.datesAbsent
        }
        var resultsHTML = Handlebars.templates.results(resultsContext)
        var resultsContainer = document.querySelector('.results')
        resultsContainer.innerHTML = resultsHTML
        resultsContainer.classList.remove('hidden')
      }
      else if (this.readyState == 4 && this.status == 204) {
        searchBox.classList.remove('invalid')
        // handles a student with no absent dates
        alert('This student has not been absent')
      }
    }
    // handle no responce recived from server

  } else {
    // handle invalid ID input
    searchBox.classList.add('invalid')
  }

})

// Checks for "enter" key presses to trigger search
searchBox.addEventListener('keyup', (event) => {
   if (event.keyCode === 13) {
     event.preventDefault()
     searchButton.click()
   }
})
