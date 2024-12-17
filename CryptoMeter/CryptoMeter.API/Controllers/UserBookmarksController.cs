using CryptoMeter.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CryptoMeter.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserBookmarksController : ControllerBase
    {
        private readonly APICryptoMeterContext _context;

        public UserBookmarksController(APICryptoMeterContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IActionResult> Get()
        {
            var allRelations = await _context.UserCryptoRelations.ToListAsync();
            return Ok(allRelations);
        }

        [HttpGet("byUserId")]
        public async Task<IActionResult> GetById([FromQuery] string userId)
        {
            var UserBookmarks = await _context.UserCryptoRelations.Where(c => c.UserId == userId).Select(c => c.CryptoId).ToListAsync();
            return Ok(UserBookmarks);
        }
    }
}
