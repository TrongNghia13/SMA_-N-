using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using Model.Models;

namespace DATA.Infastructure
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User> UserRepository { get; }
        IRepository<OrganizationUnit> OrganizationUnitRepository { get; }
        IRepository<OrganizationUnitType> OrganizationUnitTypeRepository { get; }
        IRepository<Employee> EmployeeRepository { get; }
        IRepository<CateJobTitle> CateJobTitleRepository { get; }
        IRepository<Branch> BranchRepository { get; }
        IRepository<UserBranch> UserBranchRepository { get; }
        IRepository<Role> RoleRepository { get; }
        IRepository<UserRole> UserRoleRepository { get; }
        IRepository<Menu> MenuRepository { get; }
        IRepository<RoleMenu> RoleMenuRepository { get; }
        IRepository<MainMenu> MainMenuRepository { get; }
        IRepository<CateThickness> CateThicknessRepository { get; }
        IRepository<CateSteelType> CateSteelTypeRepository { get; }
        IRepository<CateStandard> CateStandardRepository { get; }
        IRepository<CateCoatingFacility> CateCoatingFacilityRepository { get; }
        IRepository<Image> ImageRepository { get; }
        IRepository<CateCounterpartyType> CateCounterpartyTypeRepository { get; }
        IRepository<CateCounterpartyGroup> CateCounterpartyGroupRepository { get; }
        IRepository<CateCounterparty> CateCounterpartyRepository { get; }
        IRepository<CateProductType> CateProductTypeRepository { get; }
        IRepository<CateStoreType> CateStoreTypeRepository { get; }
        IRepository<CateStore> CateStoreRepository { get; }
        IRepository<CateWidth> CateWidthRepository { get; }
        IRepository<CateGalvanizedOrganization> CateGalvanizedOrganizationRepository { get; }
        IRepository<CateProductionBatchNo> CateProductionBatchNoRepository { get; }
        IRepository<CateManufacturingProcess> CateManufacturingProcessRepository { get; }
        IRepository<WorkProcess> WorkProcessRepository { get; }
        IRepository<CateMonth> CateMonthRepository { get; }
        IRepository<CateBusiness> CateBusinessRepository { get; }
        IRepository<RoleApp> RoleAppRepository { get; }
        IRepository<UserRoleMobile> UserRoleMobileRepository { get; }
        IRepository<CateProduct> CateProductRepository { get; }
        IRepository<CateSteelDefect> CateSteelDefectRepository { get; }
        IRepository<CatePlanType> CatePlanTypeRepository { get; }
        IRepository<CateProductionPlan> CateProductionPlanRepository { get; }
        IRepository<MaterialExport> MaterialExportRepository { get; }
        IRepository<Receipt> ReceiptRepository { get; }
        IRepository<TruckScale> TruckScaleRepository { get; }
        IRepository<ReceiptDetail> ReceiptDetailRepository { get; }
        IRepository<ReceiptImei> ReceiptImeiRepository { get; }
        IRepository<SteelDefectDetail> SteelDefectDetailRepository { get; }
        IRepository<TracingProduct> TracingProductRepository { get; }
        IRepository<PlanManufacturing> PlanManufacturingRepository { get; }
        IRepository<CateReceiptNo> CateReceiptNoRepository { get; }
        IRepository<BeginningInventory> BeginningInventoryRepository { get; }
        IRepository<DeliveryDetail> DeliveryDetailRepository { get; }
        IRepository<PlanDetailInput> PlanDetailInputRepository { get; }
        IRepository<PlanDetailOutput> PlanDetailOutputRepository { get; }
        IRepository<RoleReport> RoleReportRepository { get; }
        IRepository<ProductImei> ProductImeiRepository { get; }
        IRepository<MenuApp> MenuAppRepository { get; }
        IRepository<TaskDeliverApp> TaskDeliverAppRepository { get; }
        IRepository<TaskDeliverDetail> TaskDeliverDetailRepository { get; }
        IRepository<Report> ReportRepository { get; }
        IRepository<ReportGroup> ReportGroupRepository { get; }
        IRepository<ReportLeftHeadline> ReportLeftHeadlineRepository { get; }
        IRepository<ReportParameter> ReportParameterRepository { get; }



        Task SaveChanges();
    }
}


