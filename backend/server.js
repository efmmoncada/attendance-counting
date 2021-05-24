const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser');

var app = express()
var port = process.env.PORT || 3000

app.use(express.static('../frontend'))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, '..', 'frontend', 'attendance.html'))
})

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'frontend', '404.html'))
})

function storeData(data) {
  var storedArray = JSON.parse(fs.readFileSync('./attendance.json'))
  var submittedArray = data

  for (var i = 0; i < submittedArray.length; i++) {
    for (var j = 0; j < storedArray.length; j++) {
      if (submittedArray[i].id === storedArray[j].id) {
        storedArray[j].dates.push(submittedArray[i].dates[0])
      }
    }
    var student = submittedArray[i]
    fs.appendFileSync('./attendance.json', JSON.stringify(student))
  }

}

app.post('/submit-form', function (req, res) {
  if (req.body) {
    //console.log(req.body)
    storeData(req.body)
    //fs.writeFileSync('./attendance.json', JSON.stringify(req.body))
    res.status(200).send('Form submited successfully.')
  } else {
    res.status(400).send("Requests to this path must " +
      "contain a JSON body with an ID, first name" +
      "and last name.")
  }

})

app.listen(port, function () {
  console.log("== Server initiated.\n== Listening on port:", port);
})
