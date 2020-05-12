const noteContainer = $('#Note-container');
refreshNotes();

/**
 * Get all of the notes from the database and display them.
 */
function refreshNotes() {
  $.get('/api/note')
    .done((data) => {
      noteContainer.html('');
      data.forEach((note) => appendNote(note));
    })
    .fail((err) => {
      console.error(err);
      noteContainer.html(
        `<h4 class="text-danger">Failed to load notes from database:<br/>${err.responseText}</h4>`
      );
    });
}

/**
 * Append a note to the container.
 * @param {any} note not to be displayed
 */
function appendNote(note) {
  noteContainer.append(
    `<div class="Note col-sm-6 col-md-4">
      <div class="card mb-3">
        <div class="card-header">
          <h3 class="Note-title card-title m-1">${note.title}</h3>
        </div>
        <div class="Note-body card-body">
          <p>${note.body}</p>
        </div>
      </div>
    </div>`
  );
}
