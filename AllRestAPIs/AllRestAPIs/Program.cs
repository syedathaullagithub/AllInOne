using AllRestAPIs.Data;
using Microsoft.EntityFrameworkCore;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<ApiContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // CORS: allow the frontend at localhost dev server and GitHub Pages
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowLocal5174", policy =>
            {
                policy.WithOrigins(
                    "http://localhost:5173",
                    "https://localhost:5173",
                    "http://localhost:5174", 
                    "https://localhost:5174",
                    "https://syedathaullagithub.github.io")
                      .AllowAnyHeader()
                      .AllowAnyMethod();
                // .AllowCredentials(); // uncomment if you need cookies/credentials
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Enable CORS early in the pipeline so it runs before any redirects
        app.UseCors("AllowLocal5174");

        // In non-development environments enable HTTPS redirection
        if (!app.Environment.IsDevelopment())
        {
            app.UseHttpsRedirection();
        }

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}