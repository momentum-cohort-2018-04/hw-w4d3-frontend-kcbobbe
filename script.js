import request from 'superagent'

let NOTES = []

function apiUrl (fragment) {
  return `https://notes-api.glitch.me/api/${fragment}`
}

function onClick(event) {
  event.preventDefault()
  console.log('click')
  const noteId = button.dataset.noteId
  console.log(noteID)
}

//  var buttons = document.querySelectorAll('.button-delete')
//   for(var i = 0; i>buttons.length; i++){
//     buttons[i].addEventListener('click', function(){ alert("Hello World!")}
//     )
//   }

// document.querySelectorAll('.button-delete').forEach(button => {
//   button.addEventListener('click', event => {
//     console.log('click')
//     const noteId = button.dataset.noteId
//     console.log(noteId);
//     clickToDelete(noteId)
//   })})

function clickToDelete(noteId) {
      request
        .delete(apiUrl(`notes/${noteId}`))
        .auth('kcbobbe', 'password123')
        .then(response => {
        NOTES = NOTES.filter(note => note._id !== noteId)
        getData()

        })
    }
  
// clickToDelete('J9eb8m6zt9ta2ybA')

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
    getData()
})

function getData() {
  request.get('https://notes-api.glitch.me/api/notes')
    .auth('kcbobbe', 'password123')
    .then(function (result) {
      for (var i = 0; i < (result.body.notes.length); i++) {
        console.log(result.body.notes[0]._id)
        NOTES.push(
          `<div class = "note-container">
          <h2>${(result.body.notes[i].title)}</h2>
          <div class = "note-text">${(result.body.notes[i].text)}</div>
          <button type="button" class="button-delete button-danger"data-note-id="${result.body.notes[i]._id}">Delete</button>
          </div>
          `)
        
      }
      document.getElementById('posted-notes').innerHTML = NOTES.join("")
      document.querySelectorAll('.button-delete').forEach(button => {
        button.addEventListener('click', event => {
        const noteId = button.dataset.noteId
        console.log('click')
        clickToDelete(noteId)
      }

    
)})
}
)}

// let buttons = document.querySelectorAll('button')
//  console.log(buttons)
// function sayhi(){
//   console.log('hi')
// }


// document.querySelectorAll('.button-delete').forEach(button => {
//       button.addEventListener('click', event => {
//         console.log('click')
//         const noteId = button.dataset.noteId
//         console.log(noteId);
//         // deleteNote(noteId)
//       })})  
// buttons[0].addEventListener('click', sayhi())
getData()





  

// function clickToDelete(noteId) {
//   note-container.querySelectorAll('.button-delete').forEach(button => {
//     button.addEventListener('click', event => {
//       console.log('click')
//       const noteId = button.dataset.noteId
//       console.log(noteId);
//       deleteNote(noteId)
      
//   })
//   })
// }


//   function deleteNote (noteId) {
//     request
//       .delete(apiUrl(`notes/${noteId}`))
//       .auth('kcbobbe', 'password123')
//       .then(response => {
//         NOTES = NOTES.filter(note => note._id !== noteId)
//         updateAllNotes(NOTES)
//       })
//   }


    // clickToDelete()