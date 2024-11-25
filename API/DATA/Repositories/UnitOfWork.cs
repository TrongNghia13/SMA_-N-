using DATA.Infastructure;
using Microsoft.EntityFrameworkCore;
using Model.Models;


namespace DATA.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SMAContext _context;

        public UnitOfWork(SMAContext context)
        {
            _context = context;
        }

       
        private IRepository<T> CreateRepository<T>() where T : class
        {
            return new Repository<SMAContext, T>(_context);
        }
        private IRepository<T> GetRepository<T>(ref IRepository<T> repository) where T : class
        {
            if (repository == null)
            {
                repository = CreateRepository<T>();
            }
            return repository;
        }
     
        private IRepository<User> _userRepository;
        public IRepository<User> UserRepository => GetRepository(ref _userRepository);

        private IRepository<OrganizationUnit> _organizationUnitRepository;
        public IRepository<OrganizationUnit> OrganizationUnitRepository => GetRepository(ref _organizationUnitRepository);

        private IRepository<OrganizationUnitType> _organizationUnitTypeRepository;
        public IRepository<OrganizationUnitType> OrganizationUnitTypeRepository => GetRepository(ref _organizationUnitTypeRepository);

        private IRepository<Employee> _employeeRepository;
        public IRepository<Employee> EmployeeRepository => GetRepository(ref _employeeRepository);

        private IRepository<CateJobTitle> _cateJobTitleRepository;
        public IRepository<CateJobTitle> CateJobTitleRepository => GetRepository(ref _cateJobTitleRepository);

        private IRepository<Branch> _branchRepository;
        public IRepository<Branch> BranchRepository => GetRepository(ref _branchRepository);

        private IRepository<UserBranch> _userBranchRepository;
        public IRepository<UserBranch> UserBranchRepository => GetRepository(ref _userBranchRepository);

        private IRepository<Role> _roleRepository;
        public IRepository<Role> RoleRepository => GetRepository(ref _roleRepository);

        private IRepository<UserRole> _userRoleRepository;
        public IRepository<UserRole> UserRoleRepository => GetRepository(ref _userRoleRepository);

        private IRepository<Menu> _menuRepository;
        public IRepository<Menu> MenuRepository => GetRepository(ref _menuRepository);

        private IRepository<RoleMenu> _roleMenuRepository;
        public IRepository<RoleMenu> RoleMenuRepository => GetRepository(ref _roleMenuRepository);

        private IRepository<MainMenu> _mainMenuRepository;
        public IRepository<MainMenu> MainMenuRepository => GetRepository(ref _mainMenuRepository);

        private IRepository<CateThickness> _CateThicknessRepository;
        public IRepository<CateThickness> CateThicknessRepository => GetRepository(ref _CateThicknessRepository);

        private IRepository<CateStandard> _cateStandardRepository;
        public IRepository<CateStandard> CateStandardRepository => GetRepository(ref _cateStandardRepository);

        private IRepository<CateCoatingFacility> _cateCoatingFacilityRepository;
        public IRepository<CateCoatingFacility> CateCoatingFacilityRepository => GetRepository(ref _cateCoatingFacilityRepository);

        private IRepository<Image> _imageRepository;
        public IRepository<Image> ImageRepository => GetRepository(ref _imageRepository);

        private IRepository<CateCounterpartyType> _cateCounterpartyTypeRepository;
        public IRepository<CateCounterpartyType> CateCounterpartyTypeRepository => GetRepository(ref _cateCounterpartyTypeRepository);

        private IRepository<CateCounterpartyGroup> _cateCounterpartyGroupRepository;
        public IRepository<CateCounterpartyGroup> CateCounterpartyGroupRepository => GetRepository(ref _cateCounterpartyGroupRepository);

        private IRepository<CateCounterparty> _cateCounterpartyRepository;
        public IRepository<CateCounterparty> CateCounterpartyRepository => GetRepository(ref _cateCounterpartyRepository);

        private IRepository<CateProductType> _cateProductTypeRepository;
        public IRepository<CateProductType> CateProductTypeRepository => GetRepository(ref _cateProductTypeRepository);
        //CateStoreType
        private IRepository<CateStoreType> _cateStoreTypeRepository;
        public IRepository<CateStoreType> CateStoreTypeRepository => GetRepository(ref _cateStoreTypeRepository);
        //CateStore
        private IRepository<CateStore> _cateStoreRepository;
        public IRepository<CateStore> CateStoreRepository => GetRepository(ref _cateStoreRepository);
        //CateWidth
        private IRepository<CateWidth> _cateWidthRepository;
        public IRepository<CateWidth> CateWidthRepository => GetRepository(ref _cateWidthRepository);

        //CateGalvanizedOrganization
        private IRepository<CateGalvanizedOrganization> _cateGalvanizedOrganizationyRepository;
        public IRepository<CateGalvanizedOrganization> CateGalvanizedOrganizationRepository => GetRepository(ref _cateGalvanizedOrganizationyRepository);

        //cateProductionBatchNo
        private IRepository<CateProductionBatchNo> _cateProductionBatchNoRepository;
        public IRepository<CateProductionBatchNo> CateProductionBatchNoRepository => GetRepository(ref _cateProductionBatchNoRepository);
        //CateManufacturingProcess
        private IRepository<CateManufacturingProcess> _cateManufacturingProcessRepository;
        public IRepository<CateManufacturingProcess> CateManufacturingProcessRepository => GetRepository(ref _cateManufacturingProcessRepository);
        //WorkProcess
        private IRepository<WorkProcess> _workProcessRepository;
        public IRepository<WorkProcess> WorkProcessRepository => GetRepository(ref _workProcessRepository);
        //CateMonth
        private IRepository<CateMonth> _cateMonthRepository;
        public IRepository<CateMonth> CateMonthRepository => GetRepository(ref _cateMonthRepository);
        //CateBusiness
        private IRepository<CateBusiness> _cateBusinessRepository;
        public IRepository<CateBusiness> CateBusinessRepository => GetRepository(ref _cateBusinessRepository);
        //CateSteelType
        private IRepository<CateSteelType> _cateSteelTypeRepository;
        public IRepository<CateSteelType> CateSteelTypeRepository => GetRepository(ref _cateSteelTypeRepository);
        //UserRoleMobile
        private IRepository<UserRoleMobile> _userRoleMobileRepository;
        public IRepository<UserRoleMobile> UserRoleMobileRepository => GetRepository(ref _userRoleMobileRepository);
        //RoleMobile
        private IRepository<RoleApp> _roleAppRepository;
        public IRepository<RoleApp> RoleAppRepository => GetRepository(ref _roleAppRepository);
        //CateProduct
        private IRepository<CateProduct> _cateProductRepository;
        public IRepository<CateProduct> CateProductRepository => GetRepository(ref _cateProductRepository);
        //CateSteelDefect
        private IRepository<CateSteelDefect> _cateSteelDefectRepository;
        public IRepository<CateSteelDefect> CateSteelDefectRepository => GetRepository(ref _cateSteelDefectRepository);
        //CatePlanType
        private IRepository<CatePlanType> _catePlanTypeRepository;
        public IRepository<CatePlanType> CatePlanTypeRepository => GetRepository(ref _catePlanTypeRepository);
        //CateProductionPlan
        private IRepository<CateProductionPlan> _cateProductionPlanRepository;
        public IRepository<CateProductionPlan> CateProductionPlanRepository => GetRepository(ref _cateProductionPlanRepository);

        //MaterialExport
        private IRepository<MaterialExport> _materialExportRepository;
        public IRepository<MaterialExport> MaterialExportRepository => GetRepository(ref _materialExportRepository);
        //Receipt
        private IRepository<Receipt> _receiptRepository;
        public IRepository<Receipt> ReceiptRepository => GetRepository(ref _receiptRepository);
        //TruckScale
        private IRepository<TruckScale> _truckScaleRepository;
        public IRepository<TruckScale> TruckScaleRepository => GetRepository(ref _truckScaleRepository);
        //ReceiptDetail
        private IRepository<ReceiptDetail> _receiptDetailRepository;
        public IRepository<ReceiptDetail> ReceiptDetailRepository => GetRepository(ref _receiptDetailRepository);
        //ReceiptImei
        private IRepository<ReceiptImei> _receiptImeiRepository;
        public IRepository<ReceiptImei> ReceiptImeiRepository => GetRepository(ref _receiptImeiRepository);
        //SteelDefectDetail
        private IRepository<SteelDefectDetail> _steelDefectDetailRepository;
        public IRepository<SteelDefectDetail> SteelDefectDetailRepository => GetRepository(ref _steelDefectDetailRepository);
        //TracingProduct
        private IRepository<TracingProduct> _tracingProductRepository;
        public IRepository<TracingProduct> TracingProductRepository => GetRepository(ref _tracingProductRepository);
        //PlanManufacturing
        private IRepository<PlanManufacturing> _planManufacturingRepository;
        public IRepository<PlanManufacturing> PlanManufacturingRepository => GetRepository(ref _planManufacturingRepository);
        //CateReceiptNo
        private IRepository<CateReceiptNo> _cateReceiptNoRepository;
        public IRepository<CateReceiptNo> CateReceiptNoRepository => GetRepository(ref _cateReceiptNoRepository);
        //BeginningInventory
        private IRepository<BeginningInventory> _beginningInventoryRepository;
        public IRepository<BeginningInventory> BeginningInventoryRepository => GetRepository(ref _beginningInventoryRepository);
        //BeginningInventory
        private IRepository<DeliveryDetail> _deliveryDetailRepository;
        public IRepository<DeliveryDetail> DeliveryDetailRepository => GetRepository(ref _deliveryDetailRepository);
        //PlanDetailInput
        private IRepository<PlanDetailInput> _planDetailInputRepository;
        public IRepository<PlanDetailInput> PlanDetailInputRepository => GetRepository(ref _planDetailInputRepository);
        //PlanDetailOutput
        private IRepository<PlanDetailOutput> _planDetailOutputRepository;
        public IRepository<PlanDetailOutput> PlanDetailOutputRepository => GetRepository(ref _planDetailOutputRepository);
        //PlanDetailOutput
        private IRepository<RoleReport> _roleReportRepository;
        public IRepository<RoleReport> RoleReportRepository => GetRepository(ref _roleReportRepository);
        //ProductImei
        private IRepository<ProductImei> _productImeiRepository;
        public IRepository<ProductImei> ProductImeiRepository => GetRepository(ref _productImeiRepository);
        //MenuApp
        private IRepository<MenuApp> _menuAppRepository;
        public IRepository<MenuApp> MenuAppRepository => GetRepository(ref _menuAppRepository);
        //TaskDeliverApp
        private IRepository<TaskDeliverApp> _taskDeliverAppRepository;
        public IRepository<TaskDeliverApp> TaskDeliverAppRepository => GetRepository(ref _taskDeliverAppRepository);
        //TaskDeliverDetail
        private IRepository<TaskDeliverDetail> _taskDeliverDetailRepository;
        public IRepository<TaskDeliverDetail> TaskDeliverDetailRepository => GetRepository(ref _taskDeliverDetailRepository);
        //Report
        private IRepository<Report> _reportRepository;
        public IRepository<Report> ReportRepository => GetRepository(ref _reportRepository);
        //ReportParameter
        private IRepository<ReportParameter> _reportParameterRepository;
        public IRepository<ReportParameter> ReportParameterRepository => GetRepository(ref _reportParameterRepository);
        //ReportGroup
        private IRepository<ReportGroup> _reportGroupRepository;
        public IRepository<ReportGroup> ReportGroupRepository => GetRepository(ref _reportGroupRepository);
        //ReportLeftHeadline
        private IRepository<ReportLeftHeadline> _reportLeftHeadlineRepository;
        public IRepository<ReportLeftHeadline> ReportLeftHeadlineRepository => GetRepository(ref _reportLeftHeadlineRepository);

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
        public void Dispose()
        {
            _context.Dispose();
        }

        
    }
}

