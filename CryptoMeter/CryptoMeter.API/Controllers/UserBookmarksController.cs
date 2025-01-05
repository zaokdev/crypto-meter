using CryptoMeter.Data;
using CryptoMeter.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<IdentityUser> _userManager;


        public UserBookmarksController(APICryptoMeterContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
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

        [HttpPost]
        public async Task<IActionResult> AddBookmark([FromQuery] string userId, int cryptoId)
        {
            var UserExists = await _userManager.FindByIdAsync(userId);

            if (UserExists == null) {
                return BadRequest("User does not exists");
            }

            var relationAlreadyExists = await _context.UserCryptoRelations.FirstOrDefaultAsync(c => c.UserId == userId && c.CryptoId == cryptoId);

            if (relationAlreadyExists != null)
            {
                return BadRequest("Already bookmarked. Delete it first.");
            }

            var newRelation = new UserCryptoRelation() {
                UserId = userId,
                CryptoId = cryptoId

            };
            await _context.UserCryptoRelations.AddAsync(newRelation);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBookmark([FromQuery] string userId, int cryptoId)
        {
            var UserExists = await _userManager.FindByIdAsync(userId);

            if (UserExists == null)
            {
                return BadRequest("User does not exists.");
            }

            var relationAlreadyExists = await _context.UserCryptoRelations.FirstOrDefaultAsync(c => c.UserId == userId && c.CryptoId == cryptoId);

            if(relationAlreadyExists == null)
            {
                return BadRequest("User does not have this bookmark.");
            }

            _context.UserCryptoRelations.Remove(relationAlreadyExists);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
