const { nanoid } = require('nanoid');
const notes = require('./notes.js');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.type('application/json');
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.type('application/json');
  response.code(500);

  return response;
}

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const note = notes.filter((n) => n.id === id)[0];

  if(note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
}

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = notes.findIndex((note) => note.id === id);

  const { title, tags, body } = request.payload;

  if(index !== -1) {
    notes[index].title = title;
    notes[index].tags = tags;
    notes[index].body = body;
    notes[index].updatedAt = new Date().toISOString();

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  })
  response.code(404);
  return response;
}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  // const indexAfter = notes.findIndex((note) => note.id === id);

  if(index !== -1){
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.status(404);
  return response;
}

module.exports = { 
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};