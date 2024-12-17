using CryptoMeter.Shared;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CryptoMeter.Data
{
    public class APICryptoMeterContext : IdentityDbContext
    {
        public APICryptoMeterContext(DbContextOptions options): base(options){}

        public DbSet<UserCryptoRelation> UserCryptoRelations { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserCryptoRelation>()
                .HasKey(od => new { od.UserId, od.CryptoId });
        }
    }
}
