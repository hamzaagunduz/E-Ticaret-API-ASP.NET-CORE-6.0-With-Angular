using ETicaretAPI.Application.Validators.Product;
using ETicaretAPI.Infrastructure.Filter;
using ETicaretAPI.Infrastructure;
using ETicaretAPI.Persistance;
using FluentValidation.AspNetCore;
using ETicaretAPI.Infrastructure.Services.Storage.Local;
using ETicaretAPI.Infrastructure.Enum;
using ETicaretAPI.Application;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Serilog;
using NpgsqlTypes;
using Serilog.Sinks.PostgreSQL;
using ETicaretAPI.API.Configurations.ColumnWriters;
using Serilog.Context;
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddPersistanceServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddApplicationServices();


builder.Services.AddControllers()
    .AddFluentValidation(config=>config.RegisterValidatorsFromAssemblyContaining<CreateProductValidator>());


builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();

})
    .AddFluentValidation(configuration => configuration.RegisterValidatorsFromAssemblyContaining<CreateProductValidator>())
    .ConfigureApiBehaviorOptions(options => options.SuppressModelStateInvalidFilter = true);


builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
    policy.WithOrigins("http://localhost:4200", "https://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials()
));

builder.Services.AddStorage(StorageType.Azure);


builder.Services.AddEndpointsApiExplorer();



Serilog.Core.Logger log = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log.txt")
    .WriteTo.PostgreSQL(builder.Configuration.GetConnectionString("PostgreSQL"), "logs",
        needAutoCreateTable: true,
        columnOptions: new Dictionary<string, ColumnWriterBase>
        {
            {"message", new RenderedMessageColumnWriter(NpgsqlDbType.Text)},
            {"message_template", new MessageTemplateColumnWriter(NpgsqlDbType.Text)},
            {"level", new LevelColumnWriter(true , NpgsqlDbType.Varchar)},
            {"time_stamp", new TimestampColumnWriter(NpgsqlDbType.Timestamp)},
            {"exception", new ExceptionColumnWriter(NpgsqlDbType.Text)},
            {"log_event", new LogEventSerializedColumnWriter(NpgsqlDbType.Json)},
            {"user_name", new UsernameColumnWriter()}
        })
    //.WriteTo.Seq(builder.Configuration["Seq:ServerURL"])
    .Enrich.FromLogContext()
    .MinimumLevel.Information()
    .CreateLogger();

builder.Host.UseSerilog(log);
builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Admin", options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateAudience = true, 
            ValidateIssuer = true,
            ValidateLifetime = true, 
            ValidateIssuerSigningKey = true, 

            ValidAudience = builder.Configuration["Token:Audience"],
            ValidIssuer = builder.Configuration["Token:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"])),
            LifetimeValidator = (notBefore, expires, securityToken, validationParameters) => expires != null ? expires > DateTime.UtcNow : false,

            NameClaimType = ClaimTypes.Name 
        };
    });

builder.Services.AddSwaggerGen();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


var app = builder.Build();
app.UseSerilogRequestLogging();//loglar
app.UseHttpLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseCors();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    var username = context.User?.Identity?.IsAuthenticated != null || true ? context.User.Identity.Name : null;
    LogContext.PushProperty("user_name", username);
    await next();
});

app.MapControllers();

app.Run();
