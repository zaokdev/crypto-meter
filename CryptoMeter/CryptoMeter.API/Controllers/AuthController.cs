using CryptoMeter.Data;
using CryptoMeter.Shared.Auth;
using CryptoMeter.Shared.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Text.Encodings.Web;
using System.Text;
using MimeKit.Cryptography;
using CryptoMeter.API.Configuration;
using CryptoMeter.Shared;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Prng;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using CryptoMeter.Shared.Common;

namespace CryptoMeter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly APICryptoMeterContext _context;
        private readonly IEmailSender _emailSender;
        private readonly JwtConfig _jwtConfig;
        private readonly TokenValidationParameters _tokenValidationParameters;

        public AuthController(UserManager<IdentityUser> userManager,
            APICryptoMeterContext context,
            IEmailSender emailSender,
            IOptions<JwtConfig> jwtConfig,
            TokenValidationParameters tokenValidationParameters)
        {
            _context = context;
            _userManager = userManager;
            _emailSender = emailSender;
            _jwtConfig = jwtConfig.Value;
            _tokenValidationParameters = tokenValidationParameters;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDTO request)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Parameters");

            //Verificar que no haya un usuario con ese correo ya registrado
            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null) return BadRequest(new AuthResult() {
            Errors = new List<string>() { 
            "Email already used, try to log in"
            }
            });

            //Creamos el usuario
            var newUser = new IdentityUser()
            {
                Email = request.Email,
                UserName = request.Username,
                EmailConfirmed = false
            };

            var creatingUser = await _userManager.CreateAsync(newUser,request.Password);
            if (!creatingUser.Succeeded)
            {

                var errorsList = new List<string>();

                foreach(var err in creatingUser.Errors)
                {
                    errorsList.Add(err.Description);
                }
                return BadRequest(new AuthResult()
                {
                    Errors = errorsList
                });
            }

            await sendVerificationEmail(newUser);
            return Ok(new AuthResult()
            {
                Result = true,
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid Parameters");

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser == null) return BadRequest("User does not exist");

            if (!existingUser.EmailConfirmed) return BadRequest("Email needs to be verified");

            var checkUserAndPassword = await _userManager.CheckPasswordAsync(existingUser, request.Password);

            if (!checkUserAndPassword)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>
                    {
                        "Wrong Password"
                    }
                });
            }

            var token = GenerateToken(existingUser);
            return Ok(token);
        }

        private async Task<AuthResult> GenerateToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(_jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new ClaimsIdentity(new[]
               {
                   new Claim("Id",user.Id),
                   new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                   new Claim(JwtRegisteredClaimNames.Email, user.Email),
                   new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                   //Identificador único, previene que sea reusado
                   new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    //Significa issued at, identifica la hora y día que fue emitido el token
                    new Claim(JwtRegisteredClaimNames.Iat,DateTime.Now.ToUniversalTime().ToString()),

               }
               )),
                Expires = DateTime.UtcNow.Add(_jwtConfig.ExpiryTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var accessToken = jwtTokenHandler.WriteToken(token);

            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                Token = RandomGenerator.GenerateRandomString(32),
                AddedDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(6),
                IsRevoked = false,
                IsUsed = false,
                UserId = user.Id
            };
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
            return new AuthResult
            {
                Token = accessToken,
                RefreshToken = refreshToken.Token

            };
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return BadRequest();

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));

            var result = await _userManager.ConfirmEmailAsync(user, code);
            var status = result.Succeeded ? "Thank you for confirming your email." : "There has been an error confirming your email.";
            return Ok(status);
        }


        private async Task sendVerificationEmail(IdentityUser newUser)
        {
            var verificationCode = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            verificationCode = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(verificationCode));

            //example: https://localhost:7277/api/auth/verifyemail?userId=exampleuser&code=examplecode
            var callbackUrl = $"{Request.Scheme}://{Request.Host}{Url.Action("ConfirmEmail", controller: "Auth", new { userId = newUser.Id, code = verificationCode })}";
            var actionUrl = Url.Action("ConfirmEmail", "Auth", new { userId = newUser.Id, code = verificationCode });

            var emailBody = $@"<div style=""background-color:#334155; color: white; height: 400px; "">
<div style=""background-color:#0f172a; border-radius: 0 0 10px 10px; height: 60px;display:flex; align-items:center; justify-content: center;"">
  <span style=""font-family:Arial; font-size:2rem; font-weight:bold;"">CryptoMeter</span>
</div>
  <p style=""margin: 15px; font-family: Arial;"">Please verify your email by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}' style=""color: #a5b4fc"">Clicking Here</a>.</p>
</div>";
            await _emailSender.SendEmailAsync(newUser.Email, "Confirm your email", emailBody);

        }
    }
}
