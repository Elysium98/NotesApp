using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotesApi.Models;
using NotesApi.Services;

namespace NotesApi.Controllers
{
    [ApiController]
    [Route(template:"[controller]")]
    public class NotesController: ControllerBase
    {
        /// <summary>
        /// Test if note controller works
        /// </summary>
        /// <returns></returns>

        private INoteCollectionService _noteCollectionService;

        public NotesController(INoteCollectionService noteCollectionService)
        {
            _noteCollectionService = noteCollectionService;
        }

        /// <summary>
        /// Gets all notes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            List<Note> notes = await _noteCollectionService.GetAll();
            if (notes.Count == 0)
            {
                return NoContent();
            }
            return Ok(notes);
        }


        /// <summary>
        /// Gets a note with a certain id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetNoteById")]
        public async Task<IActionResult> GetNoteById(Guid id)
        {
            Note foundNote = await _noteCollectionService.Get(id);
            if (foundNote == null)
            {
                return NotFound();
            }
            return Ok(foundNote);
        }

        /// <summary>
        /// Gets all notes from the owner with the specified id
        /// </summary>
        /// <param name="ownerId"></param>
        /// <returns></returns>
        [HttpGet("owner/{ownerId}")]
        public async Task<IActionResult> GetNotesByOwnerId(Guid ownerId)
        {
            List<Note> filtered = await _noteCollectionService.GetNotesByOwnerId(ownerId);
            if (filtered.Count == 0)
            {
                return NoContent();
            }
            return Ok(filtered);
        }

        /// <summary>
        /// Update the note
        /// </summary>
        /// <param name="id"></param>
        /// <param name="note"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(Guid id, [FromBody] Note note)
        {
            if (note == null)
            {
                return BadRequest();
            }
            if (!await _noteCollectionService.Update(id, note))
            {
                return NotFound();
            }
            return Ok();
        }

        /// <summary>
        /// Delete the note
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            if (!await _noteCollectionService.Delete(id))
            {
                return NotFound();
            }
            return Ok();
        }


        /// <summary>
        /// Add a note
        /// </summary>
        /// <param name="note"></param>
        /// <returns></returns>
        [HttpPost()]
        public async Task<IActionResult> CreateNotes([FromBody] Note note)
        {
            if (note == null)
            {
                return BadRequest("Note cannot be null");
            }
            await _noteCollectionService.Create(note);

            return Ok(note);
        }
    }




}

