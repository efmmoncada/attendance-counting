var studentArray = []
var requestURL = '/submit-form'
var request = new XMLHttpRequest()

var submitButton = document.getElementById('submit-button')
// seperates input by newlines and stores into an array.
submitButton.addEventListener('click', function () {
  var date = document.getElementsByClassName('date')[0].value
  var idArray = document.querySelector('textarea').value.replace(/\n+$/, "").split('\n') // gets rid of trailing newlines
  var data = {
    date: date,
    absentStudents: idArray
  }
  request.open('POST', requestURL)
  var requestBody = JSON.stringify(data)
  request.setRequestHeader('Content-Type', 'application/json')
  request.addEventListener('load', function (event) {
    if (event.target.status !== 200) {
      var message = 'There was an error submitting this form'
    } else {
      location.href = '/success.html' // gives confirmation that submission was recieved.
    }
  })
  request.send(requestBody)
})
