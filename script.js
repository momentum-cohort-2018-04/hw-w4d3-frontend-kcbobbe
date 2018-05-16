import request from 'superagent'

let NOTES = []


function apiUrl (fragment) {
  return `https://notes-api.glitch.me/api/${fragment}`
}

document.getElementById('add-note-form').addEventListener('submit', function (event) {
  event.preventDefault()
  const title = document.getElementById('title').value
  const note = document.getElementById('note').value
  console.log(title)

  request
    .post(apiUrl('notes'))
    .auth('kcbobbe', 'password123')
    .send({
      title: title,
      text: note
    })
    .then(response => {
      document.getElementById('add-note-form').reset()
      // // document.getElementById('add-book-form').classList.add('hidden')
      // // document.getElementById('add-note-button').classList.remove('hidden')
      // NOTES.push(response.body)
      // document.getElementById('posted-notes').innerText=(response.title)

      // updateAllBooks(NOTES)
    })
    // .catch((err) => {
    //   console.error(err)
    // })
})

function getData() {
  request.get('https://notes-api.glitch.me/api/notes')
    .auth('kcbobbe', 'password123')
    .then(function (result) {
      for (var i = 0; i < (result.body.notes.length); i++) {
        NOTES.push(
          `<div class = "note-container">
          <h2>${result.body.notes[i].title}</h2>
          <div class = "note-text">${result.body.notes[i].text}</div>
          </div>`)
      }
      document.getElementById('posted-notes').innerHTML = NOTES
    })
}

getData()