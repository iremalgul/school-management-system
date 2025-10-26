using Microsoft.EntityFrameworkCore;
using SchoolManagement;
using SchoolManagement.Context;
using SchoolManagement.Services.Impls;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string ApiCorsPolicy = "_apiCorsPolicy";
builder.Services.AddCors(options => options.AddPolicy(ApiCorsPolicy, builder =>
{
    builder.WithOrigins("*")
    //.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader();
    //.AllowCredentials();
}));


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SchoolContext>(option =>
    option.UseSqlServer(connectionString));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<ICourseService, CourseService>();
builder.Services.AddTransient<ITeacherService, TeacherService>();
builder.Services.AddTransient<IStudentService, StudentService>();
builder.Services.AddTransient<IDepartmentService, DepartmentService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IExamService, ExamService>();
builder.Services.AddTransient<IStudentExamService, StudentExamService>();
builder.Services.AddTransient<ISignalRService, SignalRService>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddSignalR().AddJsonProtocol(options =>
{
    options.PayloadSerializerOptions.PropertyNamingPolicy = null;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(ApiCorsPolicy);
app.UseHttpsRedirection();

app.UseAuthorization();
app.MapHub<SchoolHub>("school-hub");

app.MapControllers();

app.Run();
