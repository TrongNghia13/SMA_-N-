using DATA.Infastructure;
using CorePush.Apple;
using CorePush.Google;
using DATA.Repositories;
using DATA;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model.Models;
using Service.Implement;
using Service.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Helper.MappingProfile;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<SMAContext>().AddDefaultTokenProviders();

builder.Services.AddDbContext<SMAContext>(options => options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient<FcmSender>();
builder.Services.AddHttpClient<ApnSender>();

// Configure strongly typed settings objects
var appSettingsSection = builder.Configuration.GetSection("FcmNotification");
builder.Services.Configure<FcmNotificationSetting>(appSettingsSection);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Add AutoMapper

builder.Services.AddAutoMapper(typeof(BaseProfile));
builder.Services.AddTransient<INotificationService, NotificationService>();
//AddScoped
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IOrganizationUnit, OrganizationUnitService>();
builder.Services.AddScoped<IOrganizationUnitType, OrganizationUnitTypeService>();
builder.Services.AddScoped<IEmployee, EmployeeService>();
builder.Services.AddScoped<ICateJobTitleService, CateJobTitleService>();
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<IUserBranchService, UserBranchService>();
builder.Services.AddScoped<IRole, RoleService>();
builder.Services.AddScoped<IUserRole, UserRoleService>();
builder.Services.AddScoped<IMenu, MenuService>();
builder.Services.AddScoped<IRoleMenu, RoleMenuService>();
builder.Services.AddScoped<IMainMenu, MainMenuService>();
builder.Services.AddScoped<ICateThicknessService, CateThicknessService>();
builder.Services.AddScoped<ICateSteelTypeService, CateSteelTypeService>();
builder.Services.AddScoped<ICateStandardService, CateStandardService>();
builder.Services.AddScoped<ICateCoatingFacility, CateCoatingFacilityService>();
builder.Services.AddScoped<IImage, ImageService>();
builder.Services.AddScoped<ICateMonthService, CateMonthService>();
builder.Services.AddScoped<ICateCounterpartyTypeService, CateCounterpartyTypeService>();
builder.Services.AddScoped<ICateCounterpartyGroupService, CateCounterpartyGroupService>();
builder.Services.AddScoped<ICateCounterpartyService, CateCounterpartyService>();
builder.Services.AddScoped<ICateProductTypeService, CateProductTypeService>();
builder.Services.AddScoped<ICateStoreTypeService, CateStoreTypeService>();
builder.Services.AddScoped<ICateStoreService, CateStoreService>();
builder.Services.AddScoped<ICateWidthService, CateWidthService>();
builder.Services.AddScoped<ICateGalvanizedOrganizationService, CateGalvanizedOrganizationService>();
builder.Services.AddScoped<ICateProductionBatchNoService, CateProductionBatchNoService>();
builder.Services.AddScoped<IWorkProcessService, WorkProcessService>();
builder.Services.AddScoped<ICateManufacturingProcessService, CateManufacturingProcessService>();
builder.Services.AddScoped<ICateMonthService, CateMonthService>();
builder.Services.AddScoped<ICateBusinessService, CateBusinessService>();
builder.Services.AddScoped<IUserRoleMobileService, UserRoleMobileService>();
builder.Services.AddScoped<IRoleAppService, RoleAppService>();
builder.Services.AddScoped<ICateProduct, CateProductService>();
builder.Services.AddScoped<ICateSteelDefect, CateSteelDefectService>();
builder.Services.AddScoped<ICatePlanTypeService, CatePlanTypeService>();
builder.Services.AddScoped<ICateProductionPlanService, CateProductionPlanService>();
builder.Services.AddScoped<IMaterialExportService, MaterialExportService>();
builder.Services.AddScoped<IReceiptService, ReceiptService>();
builder.Services.AddScoped<ITruckScaleService, TruckScaleService>();
builder.Services.AddScoped<IReceiptDetailService, ReceiptDetailService>();
builder.Services.AddScoped<IReceiptImeiService, ReceiptImeiService>();
builder.Services.AddScoped<ISteelDefectDetailService, SteelDefectDetailService>();
builder.Services.AddScoped<ITracingProductService, TracingProductService>();
builder.Services.AddScoped<IPlanManufacturingSerivce, PlanManufacturingSerivce>();
builder.Services.AddScoped<ICateReceiptNoService, CateReceiptNoService>();
builder.Services.AddScoped<IBeginningInventoryService, BeginningInventoryService>();
builder.Services.AddScoped<IDeliveryDetailService, DeliveryDetailService>();
builder.Services.AddScoped<IPlanDetailInputService, PlanDetailInputService>();
builder.Services.AddScoped<IPlanDetailOutputService, PlanDetailOutputService>();
builder.Services.AddScoped<IRoleReportService, RoleReportService>();
builder.Services.AddScoped<IProductImeiService, ProductImeiService>();
builder.Services.AddScoped<IMenuAppService, MenuAppService>();
builder.Services.AddScoped<ITaskDeliverAppService, TaskDeliverAppService>();
builder.Services.AddScoped<ITaskDeliverDetailService, TaskDeliverDetailService>();
builder.Services.AddScoped<IInventoryService, InventoryService>();
builder.Services.AddScoped<IInventoryMaterial, InventoryMaterialService>();
builder.Services.AddScoped<IReportLeftHeadlineService, ReportLeftHeadlineService>();


//Add Configuration

builder.Services.Configure<JwtModel>(builder.Configuration.GetSection("Jwt"));


//JWTBearer
//https://www.infoworld.com/article/3669188/how-to-implement-jwt-authentication-in-aspnet-core-6.html
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
    x.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                context.Response.Headers.Add("Token-Expired", "true");
            }
            return Task.CompletedTask;
        }
    };
});


//Add CORS
//https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-7.0
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCors", policy =>
    {
        policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    });
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});


builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

//builder.Services.AddAuthorization();
var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

// https://code-maze.com/global-error-handling-aspnetcore/

//https://learn.microsoft.com/en-us/ef/core/querying/related-data/lazy

app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("MyCors");
app.MapControllers();
app.MapControllerRoute(
name: "default",
pattern: "{controller}/{action}/{id?}");

app.Run();