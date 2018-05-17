import request from 'superagent'

let NOTES = []

function apiUrl (fragment) {
  return `https://notes-api.glitch.me/api/${fragment}`
}

// this is the function that runs after delete button is clicked
function clickToDelete (noteId) {
  request
    .delete(apiUrl(`notes/${noteId}`))
    .auth('kcbobbe', 'password123')
    .then(response => {
      NOTES = NOTES.filter(note => note._id !== noteId)
      document.getElementById('posted-notes').innerHTML = NOTES.join('')
    })
}
// submitting notes
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
    })
    // .catch((err) => {
    //  console.error(err)
    // })
})

// getting notes data from the api
function getData () {
  request.get('https://notes-api.glitch.me/api/notes')
    .auth('kcbobbe', 'password123')
    .then(function (result) {
      for (var i = 0; i < (result.body.notes.length); i++) {
        console.log(result.body.notes[0]._id)
        NOTES.push(
          `<div class = "note-container">
          <h2 class = "note-title">${(result.body.notes[i].title)}</h2>
          <div class = "note-text">${(result.body.notes[i].text)}</div>
          <button type="button" class="button-delete button-danger"data-note-id="${result.body.notes[i]._id}">Delete</button>
          </div>
          `)
      }
      document.getElementById('posted-notes').innerHTML = NOTES.join('')
      // adding event listener here right after the buttons are created (not ideal?)
      document.querySelectorAll('.button-delete').forEach(button => {
        button.addEventListener('click', event => {
          const noteId = button.dataset.noteId
          console.log('click')
          clickToDelete(noteId)
        })
      })
    })
}

getData()
