const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser');

var app = express()
var port = process.env.PORT || 3000

app.use(express.static('./frontend'))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'frontend', 'attendance.html'))
})

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'frontend', '404.html'))
})

function storeData(data) {
  var storedArray = JSON.parse(fs.readFileSync('./attendance.json'))
  var date = data.date
  var submittedArray = data.absentStudents
  var exists = false;

  for (var i = 0; i < submittedArray.length; i++) {
    for (var j = 0; j < storedArray.length; j++) {
      if (submittedArray[i] === storedArray[j].id) {
        storedArray[j].datesAbsent.push(date)
        exists = true
      }
    }
    if (exists) {
      exists = false
      continue
    }
    var student = {
      id: submittedArray[i],
      datesAbsent: [date]
    }
    storedArray.push(student)
  }
  fs.writeFileSync('./attendance.json', JSON.stringify(storedArray))
}

app.post('/submit-form', function (req, res) {
  if (req.body) {
    //console.log(req.body)
    storeData(req.body)
    res.status(200).send('Form submited successfully.')
  } else {
    res.status(400).send("Requests to this path must " +
      "contain a JSON body with a date and an array of ID numbers")
  }
})

app.post('/studentlookup/:id', (req, res) => {
  var queryID = req.params.id

  var studentArray  = JSON.parse(fs.readFileSync('./attendance.json'))
  for (var i = 0; i < studentArray.length; i++) {
    if (queryID === studentArray[i].id) {
      res.status(200).json(studentArray[i])
      return
    }
  }
  res.status(204).send()
  return
})

app.listen(port, function () {
  console.log("== Server initiated.\n== Listening on port:", port);
})
