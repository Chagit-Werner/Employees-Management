using Mng.Data;

using System.Text.Json.Serialization;
using Mng.Core.Repositories;
using Mng.Core.Services;

using Mng.Data.Repositories;
using Mng.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Mng.API.Configuration;
using Mng.Core;
using Mng.API.Mapping;
using Microsoft.EntityFrameworkCore.Storage;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.ConfigureServices();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(opt => opt.AddPolicy("MyPolicy", policy =>
{
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
})
);
builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Mng_ConnectionString"));
}
       );
builder.Services.AddAutoMapper(typeof(ApiMapping));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("MyPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
