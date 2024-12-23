using CryptoMeter.API.Configuration;
using CryptoMeter.API.Services;
using CryptoMeter.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<APICryptoMeterContext>(options =>
options.UseSqlite(builder.Configuration.GetConnectionString("APICryptoMeterContext")));

//JWTConfig
builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JwtConfig"));

//SMTPSettings
builder.Services.Configure<SmtpConfig>(builder.Configuration.GetSection("SmtpSettings"));
builder.Services.AddSingleton<IEmailSender, EmailService>();

//Validation Parameters
var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtConfig:Secret").Value);

var validationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    //Debería ser TRUE ambos en producción
    ValidateIssuer = false,
    ValidateAudience = false,
    RequireExpirationTime = false,
    ValidateLifetime = true
};

//Inyectar JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(jwt =>
{
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = validationParameters;
});

//Agregar El IdentityUser
builder.Services.AddDefaultIdentity<IdentityUser>(options =>
//Para más fácil testeo
options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<APICryptoMeterContext>();

//Para usar en otro lado fuera de Program.cs
builder.Services.AddSingleton(validationParameters);

builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseCors("NuevaPolitica");
app.UseAuthorization();

app.MapControllers();

app.Run();
