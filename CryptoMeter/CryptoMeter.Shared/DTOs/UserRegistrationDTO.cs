using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CryptoMeter.Shared.DTOs
{
    public class UserRegistrationDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email {  get; set; }
        [Required]
        public string Password { get; set; }
    }
}
