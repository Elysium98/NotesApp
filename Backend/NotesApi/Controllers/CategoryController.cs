using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesApi.Controllers
{
    [ApiController]
    [Route(template: "[controller]")]
    public class CategoryController : Controller
    {
        /// <summary>
        /// Test if Category controller works
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpGet("category/{id}")]
        public IActionResult Get( string id)
        {
            return Ok($"Category controller works and id is {id}");
        }
    }
}
