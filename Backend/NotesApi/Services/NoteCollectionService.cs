using MongoDB.Driver;
using NotesApi.Models;
using NotesApi.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace NotesApi.Services
{

    public class NoteCollectionService : INoteCollectionService
    {
        private readonly IMongoCollection<Note> _notes;
        public NoteCollectionService(IMongoDBSettings settings)
        {
            MongoClient client = new MongoClient(settings.ConnectionString);
            IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
            _notes = database.GetCollection<Note>(settings.NoteCollectionName);

        }

    
        //public async Task<bool> DeleteByIdAndOwnerId(Guid id, Guid ownerId)
        //{
        //    DeleteResult result = await _notes.DeleteOneAsync(note => note.Id == id && note.OwnerId == ownerId);
        //    if (!result.IsAcknowledged && result.DeletedCount == 0)
        //    {
        //        return false;
        //    }
        //    return true;
        //}

        //public async Task<List<Note>> GetNotesByOwnerId(Guid ownerId)
        //{
        //    return (await _notes.FindAsync(note => note.OwnerId == ownerId)).ToList();
        //}

       
        //public async Task<bool> UpdateByIdAndOwnerId(Guid id, Guid ownerId, Note note)
        //{
        //    note.Id = id;
        //    note.OwnerId = ownerId;
        //    ReplaceOneResult result = await _notes.ReplaceOneAsync(item => item.Id == id && item.OwnerId == ownerId, note);
        //    if (!result.IsAcknowledged && result.ModifiedCount == 0)
        //    {
        //        return false;
        //    }
        //    return true;
        //}
        //}

     
        public async Task<bool> Create(Note note)
        {
            await _notes.InsertOneAsync(note);
            return true;
        }


        public async Task<Note> Get(Guid id)
        {
            return (await _notes.FindAsync(note => note.Id == id)).FirstOrDefault();
        }
        public async Task<List<Note>> GetNotesByOwnerId(Guid ownerId)
        {
            return (await _notes.FindAsync(note => note.OwnerId == ownerId)).ToList();
        }



        public async Task<bool> Update(Guid id, Note note)
        {
            note.Id = id;
            var result = await _notes.ReplaceOneAsync(note => note.Id == id, note);
            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                await _notes.InsertOneAsync(note);
                return false;
            }

            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            var result = await _notes.DeleteOneAsync(note => note.Id == id);
            if (!result.IsAcknowledged && result.DeletedCount == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<List<Note>> GetAll()
        {
            var result = await _notes.FindAsync(filter => true);
            return result.ToList();
        }


        //public List<Note> GetNotesByOwnerId(Guid ownerId)
        //{
        //    if (ownerId != null)
        //        return _notes.FindAll(item => item.OwnerId == ownerId);
        //    else
        //        return null;
        //}

        //public bool Update(Guid id, Note note)
        //{
        //    Note existingNote = _notes.FirstOrDefault(item => item.Id == id);

        //    if (existingNote == null)
        //    {
        //        _notes.Add(note);
        //        return false;
        //    }

        //    note.Id = id;
        //    int noteToBeUpdatedIndex = _notes.FindIndex(item => item.Id == id);
        //    _notes[noteToBeUpdatedIndex] = note;
        //    return true;
        //}

    }
}


