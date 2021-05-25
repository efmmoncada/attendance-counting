var addStudentButton = document.getElementById('add-entry-button')
addStudentButton.addEventListener('click', function () {

  var entryHTML = Handlebars.templates.entry()

  var form = document.getElementsByClassName('form')[0]
  form.insertAdjacentHTML('beforeend', entryHTML)
})

var studentArray = []
var requestURL = '/submit-form'
var request = new XMLHttpRequest()

var submitButton = document.getElementById('submit-button')
submitButton.addEventListener('click', function () {
  var entryArray = document.getElementsByClassName('entry')
  var date = document.getElementsByClassName('date')[0].value
  for (var i = 0; i < entryArray.length; i++) {
    var student = {
      id: entryArray[i].children[0].children[0].value,
      firstName: entryArray[i].children[1].children[0].value,
      lastName: entryArray[i].children[2].children[0].value,
      dates: [date]
    }
    studentArray.push(student)
  }
  //var content = {studentArray} // do i need to put into an object?
  request.open('POST', requestURL)
  var requestBody = JSON.stringify(studentArray)
  request.setRequestHeader('Content-Type', 'application/json')
  request.addEventListener('load', function (event) {
    // do something here
    // tell user their submission was recived.
  })
  request.send(requestBody)

})
