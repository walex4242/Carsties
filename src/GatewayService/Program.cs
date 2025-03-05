using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
.LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["IdentityServiceUrl"];
    options.RequireHttpsMetadata = false;
    // options.TokenValidationParameters.ValidateAudience = false;
    // options.TokenValidationParameters.NameClaimType = "username";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,  // ✅ Ensure issuer validation is enabled
        ValidIssuer = builder.Configuration["IssuerUri"],  // ✅ Explicitly set valid issuer
        ValidateAudience = false,
        NameClaimType = "username"
    };
});

var app = builder.Build();

app.MapReverseProxy();

app.UseAuthentication();
app.UseAuthorization();

app.Run();
