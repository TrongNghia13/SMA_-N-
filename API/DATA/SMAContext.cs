
using Microsoft.EntityFrameworkCore;

namespace DATA;

public class SMAContext : DbContext
{
    public SMAContext(DbContextOptions<SMAContext> options) : base(options) { }

    #region DBSet
    public virtual DbSet<User> User { get; set; }
    public virtual DbSet<OrganizationUnit> OrganizationUnit { get; set; }
    public virtual DbSet<OrganizationUnitType> OrganizationUnitType { get; set; }
    public virtual DbSet<Employee> Employee { get; set; }
    //public virtual DbSet<RefJobTitle> RefJobTitle { get; set; }
    public virtual DbSet<Branch> Branch { get; set; }
    public virtual DbSet<UserBranch> UserBranch { get; set; }
    public virtual DbSet<Role> Role { get; set; }
    public virtual DbSet<UserRole> UserRole { get; set; }
    public virtual DbSet<Menu> Menu { get; set; }
    public virtual DbSet<RoleMenu> RoleMenu { get; set; }
    public virtual DbSet<MainMenu> MainMenu { get; set; }
    public virtual DbSet<CateThickness> CateThickness { get; set; }
    public virtual DbSet<CateSteelType> CateCoating { get; set; }
    public virtual DbSet<CateStandard> CateStandard { get; set; }
    public virtual DbSet<CateCoatingFacility> CateCoatingFacility { get; set; }
    public virtual DbSet<CateCounterparty> CateCounterparties { get; set; } = null!;
    public virtual DbSet<CateCounterpartyGroup> CateCounterpartyGroups { get; set; } = null!;
    public virtual DbSet<CateCounterpartyType> CateCounterpartyTypes { get; set; } = null!;
    public virtual DbSet<CateProductType> CateProductTypes { get; set; } = null!;
    //CateJobTitle
    public virtual DbSet<CateJobTitle> CateJobTitles { get; set; } = null!;
    //CateStoreType
    public virtual DbSet<CateStoreType> CateStoreTypes { get; set; } = null!;
    //CateStore
    public virtual DbSet<CateStore> CateStores { get; set; } = null!;
    //CateWidth
    public virtual DbSet<CateWidth> CateWidths { get; set; } = null!;
    public virtual DbSet<CateGalvanizedOrganization> CateGalvanizedOrganizations { get; set; } = null!;
    public virtual DbSet<CateProductionBatchNo> CateProductionBatchNos { get; set; } = null!;
    //CateManufacturingProcess
    public virtual DbSet<CateManufacturingProcess> CateManufacturingProcesses { get; set; } = null!;
    //CateWorkProcess

    public virtual DbSet<WorkProcess> WorkProcesses { get; set; } = null!;
    //CateMonth
    public virtual DbSet<CateMonth> CateMonths { get; set; } = null!;
    //CateBusiness
    public virtual DbSet<CateBusiness> CateBusinesses { get; set; } = null!;
    //UserRoleMobile

    public virtual DbSet<UserRoleMobile> UserRoleMobiles { get; set; } = null!;
    //RoleMobile
    public virtual DbSet<RoleApp> RoleApps { get; set; } = null!;
    //ProductImei
    public virtual DbSet<ProductImei> ProductImeis { get; set; } = null!;
    //MenuApp
    public virtual DbSet<MenuApp> MenuApps { get; set; } = null!;
    //TaskDeliverApp
    public virtual DbSet<TaskDeliverApp> TaskDeliverApps { get; set; } = null!;
    //TaskDeliverDetail
    public virtual DbSet<TaskDeliverDetail> TaskDeliverDetails { get; set; } = null!;
    //Report
    public virtual DbSet<Report> Reports { get; set; } = null!;
    //ReportGroup
    public virtual DbSet<ReportGroup> ReportGroups { get; set; } = null!;
    //ReportLeftHeadline
    public virtual DbSet<ReportLeftHeadline> ReportLeftHeadlines { get; set; } = null!;
    //ReportParameter
    public virtual DbSet<ReportParameter> ReportParameters { get; set; } = null!;
    #endregion

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.UserID).HasColumnName("UserID");
            entity.Property(e => e.DashBoardID).HasColumnName("DashBoardID");
            entity.Property(e => e.EmployeeID).HasColumnName("EmployeeID");
            entity.Property(e => e.IsAccessID).HasColumnName("IsAccessIP");
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PasswordRealTime).HasMaxLength(50);
            entity.Property(e => e.PublicID)
                .HasMaxLength(50)
                .HasColumnName("PublicIP");
            entity.Property(e => e.RefreshToken).HasMaxLength(100);
            entity.Property(e => e.UserName).HasMaxLength(50);
            entity.Property(e => e.RegistrationToken)
                .HasMaxLength(500);
        });


        modelBuilder.Entity<OrganizationUnit>(entity =>
        {
            entity.ToTable("OrganizationUnit");

            entity.Property(e => e.OrganizationUnitID).HasColumnName("OrganizationUnitID");

            entity.Property(e => e.CompanyOwnerName).HasMaxLength(50);

            entity.Property(e => e.OrganizationUnitName).HasMaxLength(100);

            entity.Property(e => e.OrganizationUnitTypeID).HasColumnName("OrganizationUnitTypeID");

            entity.Property(e => e.Phone).HasMaxLength(20);

            entity.HasOne(d => d.OrganizationUnitType)
                .WithMany(p => p.OrganizationUnits)
                .HasForeignKey(d => d.OrganizationUnitTypeID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_OrganizationUnit_OrganizationUnitType");
        });

        modelBuilder.Entity<OrganizationUnitType>(entity =>
        {
            entity.ToTable("OrganizationUnitType");

            entity.Property(e => e.OrganizationUnitTypeID).HasColumnName("OrganizationUnitTypeID");

            entity.Property(e => e.Description).HasMaxLength(500);

            entity.Property(e => e.OrganizationUnitTypeName).HasMaxLength(100);
        });

        modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");

                entity.Property(e => e.EmployeeID).HasColumnName("EmployeeID");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.EmployeeCode).HasMaxLength(10);

                entity.Property(e => e.EmployeeEmail).HasMaxLength(50);

                entity.Property(e => e.EmployeeImage).HasMaxLength(100);

                entity.Property(e => e.EmployeeTel).HasMaxLength(20);

                entity.Property(e => e.FullName).HasMaxLength(100);

                entity.Property(e => e.JobTitleID).HasColumnName("JobTitleID");

                entity.Property(e => e.OrganizationUnitID).HasColumnName("OrganizationUnitID");

                entity.HasOne(d => d.JobTitle)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.JobTitleID)
                    .HasConstraintName("FK_Employee_CateJobTitle");

                entity.HasOne(d => d.OrganizationUnit)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.OrganizationUnitID)
                    .HasConstraintName("FK_Employee_OrganizationUnit");
            });

        //modelBuilder.Entity<RefJobTitle>(entity =>
        //{
        //    entity.HasKey(e => e.JobTitleId);

        //    entity.ToTable("RefJobTitle");

        //    entity.Property(e => e.JobTitleId).HasColumnName("JobTitleID");
        //    entity.Property(e => e.JobTitleName).HasMaxLength(100);
        //});

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.RoleID).HasColumnName("RoleID");
            entity.Property(e => e.RoleComment).HasMaxLength(200);
            entity.Property(e => e.RoleName).HasMaxLength(100);
            entity.Property(e => e.RoleType).HasMaxLength(1);
        });

        modelBuilder.Entity<RoleMenu>(entity =>
        {
            entity.ToTable("RoleMenu");

            entity.Property(e => e.RoleMenuID).HasColumnName("RoleMenuID");
            entity.Property(e => e.MenuID).HasColumnName("MenuID");
            entity.Property(e => e.RoleID).HasColumnName("RoleID");

            entity.HasOne(d => d.Menu).WithMany(p => p.RoleMenus)
                .HasForeignKey(d => d.MenuID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_RoleMenu_Menu");

            entity.HasOne(d => d.Role).WithMany(p => p.RoleMenus)
                .HasForeignKey(d => d.RoleID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_RoleMenu_Role");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable("UserRole");

            entity.Property(e => e.UserRoleID).HasColumnName("UserRoleID");

            entity.Property(e => e.RoleID).HasColumnName("RoleID");

            entity.Property(e => e.UserID).HasColumnName("UserID");

            entity.HasOne(d => d.Role)
                .WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.RoleID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_UserRole_Role");

            entity.HasOne(d => d.User)
                .WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.UserID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_UserRole_User");
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.ToTable("Menu");

            entity.Property(e => e.MenuID).HasColumnName("MenuID");

            entity.Property(e => e.Icon).HasMaxLength(50);

            entity.Property(e => e.MainMenuId).HasColumnName("MainMenuID");

            entity.Property(e => e.MenuKey).HasMaxLength(50);

            entity.Property(e => e.MenuName).HasMaxLength(100);

            entity.HasOne(d => d.MainMenu)
                .WithMany(p => p.Menus)
                .HasForeignKey(d => d.MainMenuId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Menu_MainMenu");
        });

        modelBuilder.Entity<MainMenu>(entity =>
        {
            entity.ToTable("MainMenu");

            entity.Property(e => e.MainMenuID).HasColumnName("MainMenuID");

            entity.Property(e => e.Icon).HasMaxLength(50);

            entity.Property(e => e.MainMenuName).HasMaxLength(60);
        });

        modelBuilder.Entity<CateStandard>(entity =>
        {
            entity.ToTable("CateStandard");

            entity.HasKey(e => e.StandardID);

            entity.Property(e => e.StandardID)
                .HasColumnName("StandardId");

            entity.Property(e => e.StandardName)
                .HasMaxLength(255)
                .IsRequired();
        });

        modelBuilder.Entity<CateJobTitle>(entity =>
        {
            entity.HasKey(e => e.JobTitleID)
                .HasName("PK_CateJobTitle");

            entity.ToTable("CateJobTitle");

            entity.Property(e => e.JobTitleID).HasColumnName("JobTitleID");

            entity.Property(e => e.JobTitleName).HasMaxLength(100);
        });

        modelBuilder.Entity<CateCoatingFacility>(entity =>
        {
            entity.ToTable("CateCoatingFacility");

            entity.HasKey(e => e.CoatingFacilityId);

            entity.Property(e => e.CoatingFacilityId)
                .HasColumnName("CoatingFacilityId");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.isDelete)
                .IsRequired()
                .HasDefaultValue(false);
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.ToTable("Image");

            entity.Property(e => e.IsDelete).HasColumnName("isDelete");

            entity.Property(e => e.ItemId)
                .HasMaxLength(200)
                .IsFixedLength();

            entity.Property(e => e.Url)
                .HasMaxLength(200)
                .IsFixedLength();
        });
        modelBuilder.Entity<Branch>(entity =>
        {
            entity.ToTable("Branch");

            entity.Property(e => e.BranchID)
                .HasMaxLength(2)
                .HasColumnName("BranchID");

            entity.Property(e => e.BranchAddress).HasMaxLength(100);

            entity.Property(e => e.BranchBankAccount).HasMaxLength(50);

            entity.Property(e => e.BranchBankName).HasMaxLength(50);

            entity.Property(e => e.BranchCity).HasMaxLength(50);

            entity.Property(e => e.BranchLogo).HasMaxLength(500);

            entity.Property(e => e.BranchName).HasMaxLength(100);

            entity.Property(e => e.BranchTaxCode).HasMaxLength(50);

            entity.Property(e => e.BranchTel).HasMaxLength(50);

            entity.Property(e => e.BranchWebsite).HasMaxLength(50);

            entity.Property(e => e.ChiefOfAccountingName).HasMaxLength(50);

            entity.Property(e => e.DirectorName).HasMaxLength(50);

            entity.Property(e => e.DirectorTitle).HasMaxLength(50);

            entity.Property(e => e.OrganizationUnitTypeID).HasColumnName("OrganizationUnitTypeID");

            entity.Property(e => e.ReporterDate).HasMaxLength(50);

            entity.Property(e => e.StoreKeeperName).HasMaxLength(50);

            entity.HasOne(d => d.OrganizationUnitType)
                .WithMany(p => p.Branches)
                .HasForeignKey(d => d.OrganizationUnitTypeID)
                .HasConstraintName("FK_Branch_OrganizationUnitType");
        });


        modelBuilder.Entity<UserBranch>(entity =>
        {
            entity.ToTable("UserBranch");

            entity.Property(e => e.UserBranchID).HasColumnName("UserBranchID");

            entity.Property(e => e.BranchID)
                .HasMaxLength(2)
                .HasColumnName("BranchID");

            entity.Property(e => e.UserID).HasColumnName("UserID");

            entity.HasOne(d => d.Branch)
                .WithMany(p => p.UserBranches)
                .HasForeignKey(d => d.BranchID)
                .HasConstraintName("FK_UserBranch_Branch");

            entity.HasOne(d => d.User)
                .WithMany(p => p.UserBranches)
                .HasForeignKey(d => d.UserID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_UserBranch_User");
        });
        modelBuilder.Entity<CateCounterparty>(entity =>
        {
            entity.HasKey(e => e.CounterpartyID);

            entity.ToTable("CateCounterparty");

            entity.Property(e => e.CounterpartyID)
                .HasMaxLength(30)
                .HasColumnName("CounterpartyID");

            entity.Property(e => e.CounterpartyAddress).HasMaxLength(100);

            entity.Property(e => e.CounterpartyDescription).HasMaxLength(200);

            entity.Property(e => e.CounterpartyEmail).HasMaxLength(50);

            entity.Property(e => e.CounterpartyGroup).HasMaxLength(10);

            entity.Property(e => e.CounterpartyName).HasMaxLength(100);

            entity.Property(e => e.CounterpartyTaxCode).HasMaxLength(50);

            entity.Property(e => e.CounterpartyTel).HasMaxLength(50);

            entity.Property(e => e.CounterpartyType).HasMaxLength(2);

            entity.Property(e => e.CreateDate).HasColumnType("datetime");

            entity.HasOne(d => d.CounterpartyGroupNavigation)
                .WithMany(p => p.CateCounterparties)
                .HasForeignKey(d => d.CounterpartyGroup)
                .HasConstraintName("FK_CateCounterparty_CateCounterpartyGroup");

            entity.HasOne(d => d.CounterpartyTypeNavigation)
                .WithMany(p => p.CateCounterparties)
                .HasForeignKey(d => d.CounterpartyType)
                .HasConstraintName("FK_CateCounterparty_CateCounterpartyType");
        });

        modelBuilder.Entity<CateCounterpartyGroup>(entity =>
        {
            entity.HasKey(e => e.CounterpartyGroupID);

            entity.ToTable("CateCounterpartyGroup");

            entity.Property(e => e.CounterpartyGroupID)
                .HasMaxLength(10)
                .HasColumnName("CounterpartyGroupID");

            entity.Property(e => e.CounterpartyGroupName).HasMaxLength(100);

            entity.Property(e => e.CounterpartyType).HasMaxLength(2);

            entity.Property(e => e.IsAutoPutID).HasColumnName("IsAutoPutID");

            entity.HasOne(d => d.CounterpartyTypeNavigation)
                .WithMany(p => p.CateCounterpartyGroups)
                .HasForeignKey(d => d.CounterpartyType)
                .HasConstraintName("FK_CateCounterpartyGroup_CateCounterpartyType");
        });

        modelBuilder.Entity<CateCounterpartyType>(entity =>
        {
            entity.HasKey(e => e.CounterpartyTypeID);

            entity.ToTable("CateCounterpartyType");

            entity.Property(e => e.CounterpartyTypeID)
                .HasMaxLength(2)
                .HasColumnName("CounterpartyTypeID").IsFixedLength();

            entity.Property(e => e.CounterpartyTypeName).HasMaxLength(50);
        });

        modelBuilder.Entity<CateProductType>(entity =>
        {
            entity.HasKey(e => e.ProductTypeID)
                .HasName("PK_ProductType");

            entity.ToTable("CateProductType");

            entity.Property(e => e.ProductTypeID)
                .HasMaxLength(10)
                .HasColumnName("ProductTypeID");

            entity.Property(e => e.IsAutoPutID).HasColumnName("IsAutoPutID");

            entity.Property(e => e.ParentID)
                .HasMaxLength(9)
                .HasColumnName("ParentID");

            entity.Property(e => e.ProductTypeName).HasMaxLength(100);
        });
        //modelBuilder CateStoreType
        modelBuilder.Entity<CateStoreType>(entity =>
        {
            entity.HasKey(e => e.StoreTypeID);

            entity.ToTable("CateStoreType");

            entity.Property(e => e.StoreTypeID)
                .HasMaxLength(2)
                .HasColumnName("StoreTypeID");

            entity.Property(e => e.StoreTypeName).HasMaxLength(50);
        });
        //modelBuilder CateStore
        modelBuilder.Entity<CateStore>(entity =>
        {
            entity.HasKey(e => e.StoreID);

            entity.ToTable("CateStore");

            entity.Property(e => e.StoreID)
                .HasMaxLength(3)
                .HasColumnName("StoreID");

            entity.Property(e => e.BranchID)
                .HasMaxLength(2)
                .HasColumnName("BranchID");

            entity.Property(e => e.Description).HasMaxLength(100);

            entity.Property(e => e.Sign).HasMaxLength(10);

            entity.Property(e => e.StoreAddress).HasMaxLength(100);

            entity.Property(e => e.StoreKeeperName).HasMaxLength(50);

            entity.Property(e => e.StoreName).HasMaxLength(50);

            entity.Property(e => e.StoreTypeID)
                .HasMaxLength(2)
                .HasColumnName("StoreTypeID");

            entity.HasOne(d => d.Branch)
                .WithMany(p => p.CateStores)
                .HasForeignKey(d => d.BranchID)
                .HasConstraintName("FK_CateStore_Branch");

            entity.HasOne(d => d.StoreType)
                .WithMany(p => p.CateStores)
                .HasForeignKey(d => d.StoreTypeID)
                .HasConstraintName("FK_CateStore_CateStoreType");
        });

        modelBuilder.Entity<CateWidth>(entity =>
        {
            entity.HasKey(e => e.WidthID);

            entity.ToTable("CateWidth");

            entity.Property(e => e.WidthID)
                .HasMaxLength(10)
                .HasColumnName("WidthID");

            entity.Property(e => e.WidthName).HasMaxLength(50);

            entity.Property(e => e.WidthType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
        });
        modelBuilder.Entity<CateGalvanizedOrganization>(entity =>
        {
            entity.HasKey(e => e.GalvanizedOrganizationID);

            entity.ToTable("CateGalvanizedOrganization");

            entity.Property(e => e.GalvanizedOrganizationID)
                .HasMaxLength(2)
                .HasColumnName("GalvanizedOrganizationID");

            entity.Property(e => e.GalvanizedOrganizationName).HasMaxLength(50);
        });

        modelBuilder.Entity<CateProductionBatchNo>(entity =>
        {


            entity.HasKey(e => e.ProductionBatchNoID);
            entity.ToTable("CateProductionBatchNo");

            entity.Property(e => e.ProductionBatchNoID)
                .HasMaxLength(1)
                .HasColumnName("ProductionBatchNoID");

            entity.Property(e => e.ProductionBatchNoName).HasMaxLength(50);
        });
        //modelBuilder CateManufacturingProcess

        modelBuilder.Entity<CateManufacturingProcess>(entity =>
        {
            entity.HasKey(e => e.ManufacturingProcessID);

            entity.ToTable("CateManufacturingProcess");

            entity.Property(e => e.ManufacturingProcessID)
                .HasMaxLength(2)
                .HasColumnName("ManufacturingProcessID");

            entity.Property(e => e.ManufacturingProcessDescription).HasMaxLength(200);

            entity.Property(e => e.ManufacturingProcessName).HasMaxLength(50);
        });
        //modelBuilder WorkProcess
        modelBuilder.Entity<WorkProcess>(entity =>
        {
            entity.ToTable("WorkProcess");

            entity.Property(e => e.WorkProcessID)
                .HasMaxLength(5)
                .HasColumnName("WorkProcessID");

            entity.Property(e => e.IsMandatory).HasDefaultValueSql("((0))");

            entity.Property(e => e.ManufacturingProcessId)
                .HasMaxLength(2)
                .HasColumnName("ManufacturingProcessID");

            entity.Property(e => e.WorkDescription).HasMaxLength(200);

            entity.Property(e => e.WorkName).HasMaxLength(100);

            entity.HasOne(d => d.ManufacturingProcess)
                .WithMany(p => p.WorkProcesses)
                .HasForeignKey(d => d.ManufacturingProcessId)
                .HasConstraintName("FK_WorkProcess_CateManufacturingProcess");
        });
        //modelBuilder cateMonth
        modelBuilder.Entity<CateMonth>(entity =>
        {
            entity.HasKey(e => e.MonthID);

            entity.ToTable("CateMonth");

            entity.Property(e => e.MonthID)
                .HasMaxLength(6)
                .HasColumnName("MonthID");

            entity.Property(e => e.ExplainDetail).HasMaxLength(50);

            entity.Property(e => e.IsLock);


        });
        //modelBuilder CateBusiness
        modelBuilder.Entity<CateBusiness>(entity =>
        {
            entity.HasKey(e => e.BusinessID);

            entity.ToTable("CateBusiness");

            entity.Property(e => e.BusinessID)
                .HasMaxLength(3)
                .HasColumnName("BusinessID");

            entity.Property(e => e.BusinessName).HasMaxLength(50);

            entity.Property(e => e.BusinessType).HasMaxLength(2);
        });
        //modelBuilder CateSteelType

        modelBuilder.Entity<CateSteelType>(entity =>
        {
            entity.HasKey(e => e.SteelTypeID);

            entity.ToTable("CateSteelType");

            entity.Property(e => e.SteelTypeID)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("SteelTypeID")
                .IsFixedLength();

            entity.Property(e => e.SteelTypeName).HasMaxLength(50);
        });
        //modelBuilder CateThickness
        modelBuilder.Entity<CateThickness>(entity =>
        {
            entity.HasKey(e => e.ThicknessID);

            entity.ToTable("CateThickness");

            entity.Property(e => e.ThicknessID)
                .HasMaxLength(10)
                .HasColumnName("ThicknessID");

            entity.Property(e => e.ThicknessName).HasMaxLength(50);
        });
        //modelBuilder UserRoleMobile
        modelBuilder.Entity<UserRoleMobile>(entity =>
        {
            entity.HasKey(e => e.UraID);

            entity.ToTable("UserRoleMobile");

            entity.Property(e => e.RoleAppID).HasColumnName("ROLEAPPID");

            entity.Property(e => e.UraID).HasColumnName("URAID");

            entity.Property(e => e.UserID).HasColumnName("USERID");
           // entity.HasOne(d => d.RoleMobiles)
              // .WithMany(p => p.UserRoleMobiles)
              // .HasForeignKey(d => d.RoleAppID)
              // .HasConstraintName("FK_UserRoleMobile_RoleMobile");
        });
        //modelBuilder  RoleApp
        modelBuilder.Entity<RoleApp>(entity =>
        {
            entity.ToTable("RoleApp");

            entity.Property(e => e.RoleAppID).HasColumnName("RoleAppID");

            entity.Property(e => e.MenuAppID).HasColumnName("MenuAppID");

            entity.Property(e => e.RoleID).HasColumnName("RoleID");

            entity.HasOne(d => d.MenuApp)
                .WithMany(p => p.RoleApps)
                .HasForeignKey(d => d.MenuAppID)
                .HasConstraintName("FK_RoleApp_MenuApp");

            entity.HasOne(d => d.Role)
                .WithMany(p => p.RoleApps)
                .HasForeignKey(d => d.RoleID)
                .HasConstraintName("FK_RoleApp_Role");
        });

        //modelBuilder  CateProduct
        modelBuilder.Entity<CateProduct>(entity =>
        {
            entity.HasKey(e => e.ProductId)
                .HasName("PK_CateProduct_1");

            entity.ToTable("CateProduct");

            entity.Property(e => e.ProductId)
                .HasMaxLength(30)
                .HasColumnName("ProductID");

            entity.Property(e => e.Description).HasMaxLength(200);

            entity.Property(e => e.Image).HasMaxLength(100);

            entity.Property(e => e.ProductName).HasMaxLength(100);

            entity.Property(e => e.ProductTypeId)
                .HasMaxLength(10)
                .HasColumnName("ProductTypeID");

            entity.Property(e => e.ProductUnit).HasMaxLength(10);

            entity.Property(e => e.Specification).HasMaxLength(30);

            entity.HasOne(d => d.ProductType)
                .WithMany(p => p.CateProducts)
                .HasForeignKey(d => d.ProductTypeId)
                .HasConstraintName("FK_CateProduct_CateProductType");
        });

        //modelBuilder  CateSteelDefect
        modelBuilder.Entity<CateSteelDefect>(entity =>
        {
            entity.HasKey(e => e.SteelDefectID);

            entity.ToTable("CateSteelDefect");

            entity.Property(e => e.SteelDefectID).HasColumnName("SteelDefectID");

            entity.Property(e => e.DefectName).HasMaxLength(100);

            entity.Property(e => e.DefectType).HasMaxLength(10);

            entity.Property(e => e.Material).HasMaxLength(1);

            entity.Property(e => e.ParentID).HasColumnName("ParentID");
        });

        //modelBuilder CatePlanType
        modelBuilder.Entity<CatePlanType>(entity =>
        {
            entity.HasKey(e => e.PlanTypeID);

            entity.ToTable("CatePlanType");

            entity.Property(e => e.PlanTypeID)
                .HasMaxLength(4)
                .HasColumnName("PlanTypeID");

            entity.Property(e => e.PlanTypeName).HasMaxLength(50);
        });

        //modelBuilder CatePlanType
        modelBuilder.Entity<CateProductionPlan>(entity =>
        {
            entity.HasKey(e => e.ProductionPlanID);

            entity.ToTable("CateProductionPlan");

            entity.Property(e => e.ProductionPlanID)
                .HasMaxLength(20)
                .HasColumnName("ProductionPlanID");

            entity.Property(e => e.BranchID)
                .HasMaxLength(2)
                .HasColumnName("BranchID");

            entity.Property(e => e.PlanDate).HasColumnType("datetime");

            entity.Property(e => e.PlanDescription).HasMaxLength(200);

            entity.Property(e => e.PlanName).HasMaxLength(100);

            entity.Property(e => e.PlanNo).HasMaxLength(4);

            entity.Property(e => e.PlanTypeID)
                .HasMaxLength(4)
                .HasColumnName("PlanTypeID");

            entity.HasOne(d => d.PlanType)
                .WithMany(p => p.CateProductionPlans)
                .HasForeignKey(d => d.PlanTypeID)
                .HasConstraintName("FK_CateProductionPlan_CatePlanType");
        });
            //modelBuilder MaterialExport
            modelBuilder.Entity<MaterialExport>(entity =>
            {
                entity.ToTable("MaterialExport");

                entity.Property(e => e.MaterialExportID)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("MaterialExportID");

                entity.Property(e => e.ProductionPlanID)
                    .HasMaxLength(20)
                    .HasColumnName("ProductionPlanID");

                entity.Property(e => e.ReceiptID)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("ReceiptID");

                entity.HasOne(d => d.ProductionPlan)
                    .WithMany(p => p.MaterialExports)
                    .HasForeignKey(d => d.ProductionPlanID)
                    .HasConstraintName("FK_MaterialExport_CateProductionPlan");

                entity.HasOne(d => d.Receipt)
                    .WithMany(p => p.MaterialExports)
                    .HasForeignKey(d => d.ReceiptID)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_MaterialExport_Receipt");
            });

            //modelBuilder Receipt
            modelBuilder.Entity<Receipt>(entity =>
            {
                entity.ToTable("Receipt");

                entity.Property(e => e.ReceiptID)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ReceiptID");

                entity.Property(e => e.BranchID)
                    .HasMaxLength(2)
                    .HasColumnName("BranchID");

                entity.Property(e => e.BusinessID)
                    .HasMaxLength(3)
                    .HasColumnName("BusinessID");

                entity.Property(e => e.CounterpartyID)
                    .HasMaxLength(30)
                    .HasColumnName("CounterpartyID");

                entity.Property(e => e.CreatedBy).HasMaxLength(15);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EmployeeCode).HasColumnName("EmployeeCode");

                entity.Property(e => e.MaterialType)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.MonthID)
                    .HasMaxLength(6)
                    .HasColumnName("MonthID");

                entity.Property(e => e.ReceiptContent).HasMaxLength(100);

                entity.Property(e => e.ReceiptDate).HasColumnType("datetime");

                entity.Property(e => e.ReceiptNo).HasMaxLength(4);

                entity.Property(e => e.ReceiptType).HasMaxLength(1);

                entity.Property(e => e.StoreID)
                    .HasMaxLength(3)
                    .HasColumnName("StoreID");

                entity.HasOne(d => d.Business)
                    .WithMany(p => p.Receipts)
                    .HasForeignKey(d => d.BusinessID)
                    .HasConstraintName("FK_Receipt_CateBusiness");

                entity.HasOne(d => d.Counterparty)
                    .WithMany(p => p.Receipts)
                    .HasForeignKey(d => d.CounterpartyID)
                    .HasConstraintName("FK_Receipt_CateCounterparty");

                entity.HasOne(d => d.Month)
                    .WithMany(p => p.Receipts)
                    .HasForeignKey(d => d.MonthID)
                    .HasConstraintName("FK_Receipt_CateMonth");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Receipts)
                    .HasForeignKey(d => d.StoreID)
                    .HasConstraintName("FK_Receipt_CateStore");
            });

            //modelBuilder TruckScale
            modelBuilder.Entity<TruckScale>(entity =>
            {
                entity.ToTable("TruckScale");

                entity.Property(e => e.TruckScaleID)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TruckScaleID");

                entity.Property(e => e.ScaleEmployee)
                    .HasMaxLength(20)
                    .HasColumnName("ScaleEmployee");

                entity.Property(e => e.LicensePlate).HasMaxLength(10);

                entity.Property(e => e.ReceiptID)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("ReceiptID");

                entity.Property(e => e.ScaleDate).HasColumnType("smalldatetime");

                entity.Property(e => e.ScaleNo).HasMaxLength(20);

                entity.HasOne(d => d.Receipt)
                    .WithMany(p => p.TruckScales)
                    .HasForeignKey(d => d.ReceiptID)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_TruckScale_Receipt");
            });

            //modelBuilder ReceiptDetail
            modelBuilder.Entity<ReceiptDetail>(entity =>
            {
                entity.ToTable("ReceiptDetail");

                entity.Property(e => e.ReceiptDetailID)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ReceiptDetailID");

                entity.Property(e => e.CalculationUnit).HasMaxLength(10);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.ProductID)
                    .HasMaxLength(30)
                    .HasColumnName("ProductID");

                entity.Property(e => e.Quantity).HasColumnType("numeric(12, 1)");

                entity.Property(e => e.ReceiptID)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("ReceiptID");

                entity.Property(e => e.TotalAmount).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.TotalWeight1).HasColumnType("numeric(12, 1)");

                entity.Property(e => e.TotalWeight2).HasColumnType("numeric(12, 1)");

                entity.Property(e => e.TotalWeight3).HasColumnType("numeric(12, 1)");

                entity.Property(e => e.UnitPrice).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.Receipt)
                    .WithMany(p => p.ReceiptDetails)
                    .HasForeignKey(d => d.ReceiptID)
                    .HasConstraintName("FK_ReceiptDetail_Receipt");
            });
        //modelBuilder ReceiptImei
        modelBuilder.Entity<ReceiptImei>(entity =>
        {
            entity.ToTable("ReceiptImei");

            entity.Property(e => e.ReceiptImeiID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("ReceiptImeiID");

            entity.Property(e => e.Description).HasMaxLength(1000);

            entity.Property(e => e.GalvanizedOrganization).HasMaxLength(2);

            entity.Property(e => e.Imei).HasMaxLength(100);

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(1);

            entity.Property(e => e.ReceiptDetailID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ReceiptDetailID");

            entity.Property(e => e.ReceiptID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ReceiptID");

            entity.Property(e => e.Specification).HasMaxLength(100);

            entity.Property(e => e.Standard).HasMaxLength(4);

            entity.Property(e => e.SteelPrice).HasMaxLength(6);

            entity.Property(e => e.SteelType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Thickness).HasMaxLength(10);

            entity.Property(e => e.Vendor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Weight1).HasColumnType("numeric(12, 1)");
            entity.Property(e => e.Weight2).HasColumnType("numeric(12, 1)");
            entity.Property(e => e.Weight3).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Width).HasMaxLength(10);

            entity.HasOne(d => d.ReceiptDetail)
                .WithMany(p => p.ReceiptImeis)
                .HasForeignKey(d => d.ReceiptDetailID)
                .HasConstraintName("FK_ReceiptImei_ReceiptDetail");

            entity.HasOne(d => d.Receipt)
                .WithMany(p => p.ReceiptImeis)
                .HasForeignKey(d => d.ReceiptID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_ReceiptImei_Receipt");
        });



        //modelBuilder ReceiptDetail
        modelBuilder.Entity<ReceiptDetail>(entity =>
        {
            entity.ToTable("ReceiptDetail");

            entity.Property(e => e.ReceiptDetailID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("ReceiptDetailID");

            entity.Property(e => e.CalculationUnit).HasMaxLength(10);

            entity.Property(e => e.CreateDate).HasColumnType("datetime");

            entity.Property(e => e.Description).HasMaxLength(500);

            entity.Property(e => e.ProductID)
                .HasMaxLength(30)
                .HasColumnName("ProductID");

            entity.Property(e => e.Quantity).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.ReceiptID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ReceiptID");

            entity.Property(e => e.TotalAmount).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.TotalWeight1).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.TotalWeight2).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.TotalWeight3).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.UnitPrice).HasColumnType("numeric(12, 0)");

            entity.HasOne(d => d.Receipt)
                .WithMany(p => p.ReceiptDetails)
                .HasForeignKey(d => d.ReceiptID)
                .HasConstraintName("FK_ReceiptDetail_Receipt");
        });
        //modelBuilder ReceiptImei
        modelBuilder.Entity<ReceiptImei>(entity =>
        {
            entity.ToTable("ReceiptImei");

            entity.Property(e => e.ReceiptImeiID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("ReceiptImeiID");

            entity.Property(e => e.Description).HasMaxLength(1000);

            entity.Property(e => e.GalvanizedOrganization).HasMaxLength(2);

            entity.Property(e => e.Imei).HasMaxLength(100);

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(1);

            entity.Property(e => e.ReceiptDetailID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ReceiptDetailID");

            entity.Property(e => e.ReceiptID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ReceiptID");

            entity.Property(e => e.Specification).HasMaxLength(100);

            entity.Property(e => e.Standard).HasMaxLength(4);

            entity.Property(e => e.SteelPrice).HasMaxLength(6);

            entity.Property(e => e.SteelType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Thickness).HasMaxLength(10);

            entity.Property(e => e.Vendor)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Weight1).HasMaxLength(10);

            entity.Property(e => e.Width).HasMaxLength(10);

            entity.HasOne(d => d.ReceiptDetail)
                .WithMany(p => p.ReceiptImeis)
                .HasForeignKey(d => d.ReceiptDetailID)
                .HasConstraintName("FK_ReceiptImei_ReceiptDetail");

            entity.HasOne(d => d.Receipt)
                .WithMany(p => p.ReceiptImeis)
                .HasForeignKey(d => d.ReceiptID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_ReceiptImei_Receipt");
        });
        //modelBuilder SteelDefectDetail
        modelBuilder.Entity<SteelDefectDetail>(entity =>
        {
            entity.ToTable("SteelDefectDetail");

            entity.Property(e => e.SteelDefectDetailID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("SteelDefectDetailID");

            entity.Property(e => e.CreatedBy).HasMaxLength(20);

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.Property(e => e.Imei).HasMaxLength(1000);

            entity.Property(e => e.Main).HasColumnName("main");

            entity.Property(e => e.SteelDefectName).HasMaxLength(500);
        });
        //modelBuilder TracingProduct
        modelBuilder.Entity<TracingProduct>(entity =>
        {
            entity.ToTable("TracingProduct");

            entity.Property(e => e.TracingProductID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("TracingProductID");

            entity.Property(e => e.CreatedBy).HasMaxLength(15);

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.Property(e => e.GalvanizedOrganization).HasMaxLength(2);

            entity.Property(e => e.Imei).HasMaxLength(50);

            entity.Property(e => e.Note).HasMaxLength(100);

            entity.Property(e => e.ParentID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ParentID");

            entity.Property(e => e.ProductID)
                .HasMaxLength(30)
                .HasColumnName("ProductID");

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(1);

            entity.Property(e => e.Quantity).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.RelatedDocumentID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("RelatedDocumentID");

            entity.Property(e => e.Specification).HasMaxLength(50);

            entity.Property(e => e.Standard).HasMaxLength(4);

            entity.Property(e => e.SteelPrice).HasMaxLength(6);

            entity.Property(e => e.SteelType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Thickness).HasMaxLength(10);

            entity.Property(e => e.Vendor)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Weight1).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Weight2).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Weight3).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Width).HasMaxLength(10);

            entity.Property(e => e.WorkProcessID)
                .HasMaxLength(5)
                .HasColumnName("WorkProcessID");

            entity.HasOne(d => d.RelatedDocument)
                .WithMany(p => p.TracingProducts)
                .HasForeignKey(d => d.RelatedDocumentID)
                .HasConstraintName("FK_TracingProduct_PlanManufacturing");

            entity.HasOne(d => d.RelatedDocumentNavigation)
                .WithMany(p => p.TracingProducts)
                .HasForeignKey(d => d.RelatedDocumentID)
                .HasConstraintName("FK_TracingProduct_Receipt");

            entity.HasOne(d => d.WorkProcess)
                .WithMany(p => p.TracingProducts)
                .HasForeignKey(d => d.WorkProcessID)
                .HasConstraintName("FK_TracingProduct_WorkProcess");
        });
        //modelBuilder TracingProduct

        modelBuilder.Entity<PlanManufacturing>(entity =>
        {
            entity.ToTable("PlanManufacturing");

            entity.Property(e => e.PlanManufacturingID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("PlanManufacturingID");

            entity.Property(e => e.BranchID)
                .HasMaxLength(2)
                .HasColumnName("BranchID");

            entity.Property(e => e.CreatedBy).HasMaxLength(20);

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.Property(e => e.MaterialType).HasMaxLength(1);

            entity.Property(e => e.MonthID).HasMaxLength(6);

            entity.Property(e => e.PlanDate).HasColumnType("smalldatetime");

            entity.Property(e => e.PlanDescription).HasMaxLength(200);

            entity.Property(e => e.PlanNo).HasMaxLength(4);

            entity.Property(e => e.ProductionPlanID)
                .HasMaxLength(20)
                .HasColumnName("ProductionPlanID");

            entity.Property(e => e.TotalSource).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.TotalTarget).HasColumnType("numeric(12, 0)");

            entity.HasOne(d => d.ProductionPlan)
                .WithMany(p => p.PlanManufacturings)
                .HasForeignKey(d => d.ProductionPlanID)
                .HasConstraintName("FK_PlanManufacturing_CateProductionPlan");
        });
        //modelBuilder CateReceiptNo
        modelBuilder.Entity<CateReceiptNo>(entity =>
        {
            entity.HasKey(e=>e.ReceiptNo);

            entity.ToTable("CateReceiptNo");

            entity.Property(e => e.ReceiptNo)
                .HasMaxLength(4)
                .IsUnicode(false);
        });
        //modelBuilder BeginningInventory

        modelBuilder.Entity<BeginningInventory>(entity =>
        {
            entity.ToTable("BeginningInventory");

            entity.Property(e => e.BeginningInventoryID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("BeginningInventoryID");

            entity.Property(e => e.BeginDate).HasColumnType("datetime");

            entity.Property(e => e.BranchID)
                .HasMaxLength(2)
                .HasColumnName("BranchID");

            entity.Property(e => e.CreatedBy).HasMaxLength(20);

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.Property(e => e.Description).HasMaxLength(500);

            entity.Property(e => e.GalvanizedOrganization).HasMaxLength(1);

            entity.Property(e => e.Imei).HasMaxLength(50);

            entity.Property(e => e.MaterialType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.MonthID).HasMaxLength(6);

            entity.Property(e => e.ProductID)
                .HasMaxLength(30)
                .HasColumnName("ProductID");

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(1);

            entity.Property(e => e.Quantity).HasColumnType("numeric(10, 2)");

            entity.Property(e => e.ReceiptDate).HasColumnType("datetime");

            entity.Property(e => e.ReceiptNo).HasMaxLength(10);

            entity.Property(e => e.Specification).HasMaxLength(50);

            entity.Property(e => e.SteelPrice).HasMaxLength(6);

            entity.Property(e => e.Standard).HasMaxLength(4);

            entity.Property(e => e.SteelType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.StoreID)
                .HasMaxLength(3)
                .HasColumnName("StoreID");

            entity.Property(e => e.Thickness).HasMaxLength(10);

            entity.Property(e => e.TotalAmount).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.UnitPrice).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.Vendor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Weight).HasMaxLength(10);

            entity.Property(e => e.Width).HasMaxLength(10);
        });
        //modelBuilder DeliveryDetail

        modelBuilder.Entity<DeliveryDetail>(entity =>
        {
            entity.ToTable("DeliveryDetail");

            entity.Property(e => e.DeliveryDetailID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("DeliveryDetailID");

            entity.Property(e => e.InputID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("InputID");

            entity.Property(e => e.Month).HasMaxLength(6);

            entity.Property(e => e.OutputID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("OutputID");

            entity.Property(e => e.ProductID)
                .HasMaxLength(30)
                .HasColumnName("ProductID");

            entity.Property(e => e.Quantity).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.StoreID)
                .HasMaxLength(3)
                .HasColumnName("StoreID");

            entity.Property(e => e.TotalAmount).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.UnitPrice).HasColumnType("numeric(12, 0)");

            entity.HasOne(d => d.Input)
                .WithMany(p => p.DeliveryDetailInputs)
                .HasForeignKey(d => d.InputID)
                .HasConstraintName("FK_DeliveryDetail_ReceiptImei1");

            entity.HasOne(d => d.Output)
                .WithMany(p => p.DeliveryDetailOutputs)
                .HasForeignKey(d => d.OutputID)
                .HasConstraintName("FK_DeliveryDetail_ReceiptImei");

        });
        modelBuilder.Entity<ProductImei>(entity =>
        {
            entity.ToTable("ProductImei");

            entity.HasIndex(e => e.Imei, "IX_ProductImei")
                .IsUnique();

            entity.Property(e => e.ProductImeiID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("ProductImeiID");

            entity.Property(e => e.CreatedBy).HasMaxLength(15);

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.Property(e => e.GalvanizedOrganization).HasMaxLength(2);

            entity.Property(e => e.Image1).HasMaxLength(100);

            entity.Property(e => e.Image2).HasMaxLength(100);

            entity.Property(e => e.Image3).HasMaxLength(100);

            entity.Property(e => e.Image4).HasMaxLength(100);

            entity.Property(e => e.Imei).HasMaxLength(100);

            entity.Property(e => e.Note).HasMaxLength(500);

            entity.Property(e => e.ParentID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ParentID");

            entity.Property(e => e.ProductID)
                .HasMaxLength(30)
                .HasColumnName("ProductID");

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(1);

            entity.Property(e => e.Quantity).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.ReceiptImeiID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ReceiptImeiID");

            entity.Property(e => e.Specification).HasMaxLength(50);

            entity.Property(e => e.Standard).HasMaxLength(4);

            entity.Property(e => e.SteelPrice).HasMaxLength(6);

            entity.Property(e => e.SteelType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Thickness).HasMaxLength(10);

            entity.Property(e => e.Vendor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Weight1).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Weight2).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Weight3).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Width).HasMaxLength(10);

            entity.Property(e => e.WorkProcessID)
                .HasMaxLength(5)
                .HasColumnName("WorkProcessID");

            entity.HasOne(d => d.Product)
                .WithMany(p => p.ProductImeis)
                .HasForeignKey(d => d.ProductID)
                .HasConstraintName("FK_ProductImei_CateProduct");

            entity.HasOne(d => d.ReceiptImei)
                .WithMany(p => p.ProductImeis)
                .HasForeignKey(d => d.ReceiptImeiID)
                .HasConstraintName("FK_ProductImei_ReceiptImei");

            entity.HasOne(d => d.WorkProcess)
                .WithMany(p => p.ProductImeis)
                .HasForeignKey(d => d.WorkProcessID)
                .HasConstraintName("FK_ProductImei_WorkProcess");
        });
        //modelBuilder PlanDetailInput

        modelBuilder.Entity<PlanDetailInput>(entity =>
        {
            entity.ToTable("PlanDetailInput");

            entity.Property(e => e.PlanDetailInputID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("PlanDetailInputID");

            entity.Property(e => e.Description).HasMaxLength(200);

            entity.Property(e => e.GalvanizedOrganization).HasMaxLength(2);

            entity.Property(e => e.Imei).HasMaxLength(50);

            entity.Property(e => e.PlanManufacturingID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("PlanManufacturingID");

            entity.Property(e => e.ProductID)
                .HasMaxLength(30)
                .HasColumnName("ProductID");

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(1);

            entity.Property(e => e.Quantity).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.ReceiptDate).HasColumnType("smalldatetime");

            entity.Property(e => e.ReceiptImeiID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ReceiptImeiID");

            entity.Property(e => e.ReceiptNo).HasMaxLength(10);

            entity.Property(e => e.Specification).HasMaxLength(50);

            entity.Property(e => e.Standard).HasMaxLength(4);

            entity.Property(e => e.SteelPrice).HasMaxLength(6);

            entity.Property(e => e.SteelType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Thickness).HasMaxLength(10);

            entity.Property(e => e.Vendor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Weight).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.WeightActual).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Width).HasMaxLength(10);

            entity.HasOne(d => d.PlanManufacturing)
                .WithMany(p => p.PlanDetailInputs)
                .HasForeignKey(d => d.PlanManufacturingID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_PlanDetailInput_PlanManufacturing");

            entity.HasOne(d => d.ReceiptImei)
                .WithMany(p => p.PlanDetailInputs)
                .HasForeignKey(d => d.ReceiptImeiID)
                .HasConstraintName("FK_PlanDetailInput_ReceiptImei");
        });
        //modelBuilder PlanDetailOutput

        modelBuilder.Entity<PlanDetailOutput>(entity =>
        {
            entity.ToTable("PlanDetailOutput");

            entity.Property(e => e.PlanDetailOutputID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("PlanDetailOutputID");

            entity.Property(e => e.Description).HasMaxLength(100);

            entity.Property(e => e.GalvanizedOrganization).HasMaxLength(2);

            entity.Property(e => e.Imei).HasMaxLength(50);

            entity.Property(e => e.ParentID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ParentID");

            entity.Property(e => e.PlanDetailInputID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("PlanDetailInputID");

            entity.Property(e => e.PlanManufacturingID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("PlanManufacturingID");

            entity.Property(e => e.ProductID)
                .HasMaxLength(30)
                .HasColumnName("ProductID");

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(1);

            entity.Property(e => e.Quantity).HasColumnType("numeric(12, 0)");

            entity.Property(e => e.Specification).HasMaxLength(50);

            entity.Property(e => e.Standard).HasMaxLength(4);

            entity.Property(e => e.SteelPrice).HasMaxLength(6);

            entity.Property(e => e.SteelType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Thickness).HasMaxLength(10);

            entity.Property(e => e.Vendor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Weight).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.WeightActual).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Width).HasMaxLength(10);

            entity.HasOne(d => d.PlanDetailInput)
                .WithMany(p => p.PlanDetailOutputs)
                .HasForeignKey(d => d.PlanDetailInputID)
                .HasConstraintName("FK_PlanDetailOutput_PlanDetailInput");

            entity.HasOne(d => d.PlanManufacturing)
                .WithMany(p => p.PlanDetailOutputs)
                .HasForeignKey(d => d.PlanManufacturingID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_PlanDetailOutput_PlanManufacturing");
        });
        //modelBuilder RoleReport

        modelBuilder.Entity<RoleReport>(entity =>
        {
            entity.ToTable("RoleReport");

            entity.Property(e => e.RoleReportID).HasColumnName("RoleReportID");

            entity.Property(e => e.ReportID).HasColumnName("ReportID");

            entity.Property(e => e.RoleID).HasColumnName("RoleID");

            //entity.HasOne(d => d.Report)
            //    .WithMany(p => p.RoleReports)
            //    .HasForeignKey(d => d.ReportId)
            //    .OnDelete(DeleteBehavior.Cascade)
            //    .HasConstraintName("FK_RoleReport_Report");

            entity.HasOne(d => d.Role)
                .WithMany(p => p.RoleReports)
                .HasForeignKey(d => d.RoleID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_RoleReport_Role");
        });
        //modelBuilder  MenuApp
        modelBuilder.Entity<MenuApp>(entity =>
        {
            entity.ToTable("MenuApp");

            entity.Property(e => e.MenuAppID).HasColumnName("MenuAppID");

            entity.Property(e => e.MenuAppKey).HasMaxLength(50);

            entity.Property(e => e.MenuAppName).HasMaxLength(100);
        });
        //modelBuilder TaskDeliverApp
        modelBuilder.Entity<TaskDeliverApp>(entity =>
        {
            entity.ToTable("TaskDeliverApp");

            entity.Property(e => e.TaskDeliverAppID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("TaskDeliverAppID");
            entity.Property(e => e.ReceiptNo).HasMaxLength(4);

            entity.Property(e => e.CreatedBy).HasMaxLength(20);

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.Property(e => e.MaterialType).HasMaxLength(1);

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(2);

            entity.Property(e => e.ProductionPlanID)
                .HasMaxLength(20)
                .HasColumnName("ProductionPlanID");

            entity.Property(e => e.StoreID)
                .HasMaxLength(3)
                .HasColumnName("StoreID");
            entity.Property(e => e.Thickness).HasMaxLength(10);
            entity.Property(e => e.Width).HasMaxLength(10);

            entity.Property(e => e.TaskDate).HasColumnType("datetime");

            entity.Property(e => e.UserName).HasMaxLength(30);

            entity.Property(e => e.Vendor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsFixedLength();
        });
        //modelBuilder TaskDeliverDetail
        modelBuilder.Entity<TaskDeliverDetail>(entity =>
        {
            entity.ToTable("TaskDeliverDetail");

            entity.Property(e => e.TaskDeliverDetailID)
                .HasColumnType("numeric(18, 0)")
                .ValueGeneratedOnAdd()
                .HasColumnName("TaskDeliverDetailID");

            entity.Property(e => e.GalvanizedOrganization).HasMaxLength(2);

            entity.Property(e => e.Imei).HasMaxLength(50);

            entity.Property(e => e.Note).HasMaxLength(100);

            entity.Property(e => e.ProductionBatchNo).HasMaxLength(1);

            entity.Property(e => e.Specification).HasMaxLength(50);

            entity.Property(e => e.Standard).HasMaxLength(4);

            entity.Property(e => e.SteelPrice).HasMaxLength(6);

            entity.Property(e => e.SteelType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.TaskDeliverAppID)
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("TaskDeliverAppID");

            entity.Property(e => e.Thickness).HasMaxLength(10);

            entity.Property(e => e.Vendor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsFixedLength();

            entity.Property(e => e.Weight1).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Weight2).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Weight3).HasColumnType("numeric(12, 1)");

            entity.Property(e => e.Width).HasMaxLength(10);
            entity.Property(e => e.CreateBy).HasMaxLength(20);
            entity.Property(e => e.CreateDate).HasColumnType("datetime");


            entity.HasOne(d => d.TaskDeliverApp)
                .WithMany(p => p.TaskDeliverDetails)
                .HasForeignKey(d => d.TaskDeliverAppID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_TaskDeliverDetail_TaskDeliverApp");
        });
        //modelBuilder Report

        modelBuilder.Entity<Report>(entity =>
        {
            entity.ToTable("Report");

            entity.Property(e => e.ReportId).HasColumnName("ReportID");

            entity.Property(e => e.FormKey).HasMaxLength(50);

            entity.Property(e => e.LeftHeadlineId).HasColumnName("LeftHeadlineID");

            entity.Property(e => e.PaperSize).HasMaxLength(2);

            entity.Property(e => e.ReportGroupId).HasColumnName("ReportGroupID");

            entity.Property(e => e.ReportName).HasMaxLength(200);

            entity.HasOne(d => d.ReportGroup)
                .WithMany(p => p.Reports)
                .HasForeignKey(d => d.ReportGroupId)
                .HasConstraintName("FK_Report_ReportGroup");
        });
        //modelBuilder ReportGroup

        modelBuilder.Entity<ReportGroup>(entity =>
        {
            entity.ToTable("ReportGroup");

            entity.Property(e => e.ReportGroupId).HasColumnName("ReportGroupID");

            entity.Property(e => e.Description).HasMaxLength(500);

            entity.Property(e => e.ReportGroupName).HasMaxLength(200);
        });
        //modelBuilder ReportLeftHeadline

        modelBuilder.Entity<ReportLeftHeadline>(entity =>
        {
            entity.HasNoKey();

            entity.ToTable("ReportLeftHeadline");

            entity.Property(e => e.LeftHeadlineId).HasColumnName("LeftHeadlineID");

            entity.Property(e => e.LeftHeadlineName).HasMaxLength(100);

            entity.Property(e => e.Line1).HasMaxLength(100);

            entity.Property(e => e.Line2).HasMaxLength(100);

            entity.Property(e => e.Line3).HasMaxLength(100);
        });
        //modelBuilder ReportParameter

        modelBuilder.Entity<ReportParameter>(entity =>
        {
            entity.ToTable("ReportParameter");

            entity.Property(e => e.ReportParameterId).HasColumnName("ReportParameterID");

            entity.Property(e => e.ParamName).HasMaxLength(50);

            entity.Property(e => e.ReportId).HasColumnName("ReportID");

            entity.Property(e => e.ReportParameterName).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);

	}

	private void OnModelCreatingPartial(ModelBuilder modelBuilder)
	{		
	}
}


