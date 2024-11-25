// const URL_ENDPOINT = 'https://apisma.cuahangkinhdoanh.com/api';
const URL_ENDPOINT = 'https://localhost:7145/api';

const URL_ENDPOINT_ROOT = process.env.REACT_APP_API_ROOT;
const APIURL = {
    LOGIN: URL_ENDPOINT + '/Login',
    REFESH_TOKEN: URL_ENDPOINT + '/Account/RefreshToken',

    Media_UPLOAD: URL_ENDPOINT + '/Media/Upload',
    Media_UPLOAD_GET: URL_ENDPOINT + '/Media/GetFile?file=',

    MENU_BY_USER_LOGIN: URL_ENDPOINT + '/MainMenu/GetListMenuByUserId/',

    LOGIN_LIST_ERP: URL_ENDPOINT + '/Account/ListERPByUserName',
    LOGIN_LIST_DONVI_UD: URL_ENDPOINT + '/Account/ListDonViUD',

    COMMON_IPINFO: URL_ENDPOINT + '/Common/GetIPInfo',
    STATISTICAL_HISTORY_MONTH: URL_ENDPOINT + '/Receipt/GetStatisticalMonth',
    STATISTICAL_BYDATE: URL_ENDPOINT + '/Receipt/GetStatisticalByDate',

    /* DM_DONVIUD */
    BRANCH_LIST: URL_ENDPOINT + '/Branch/GetAll',
    CATE_BRANCH_GETBYID: URL_ENDPOINT + '/Branch/GetById/',
    CATE_BRANCH_DELETE: URL_ENDPOINT + '/Branch/Delete/',
    CATE_BRANCH_UPDATE: URL_ENDPOINT + '/Branch/Update',
    CATE_BRANCH_CREATE: URL_ENDPOINT + '/Branch',
    DM_DONVIUD_GET_OF_USERLOGIN: URL_ENDPOINT + '/DonViUD/GetDonviUDOfUserLogin',
    DM_DONVIUD_GET_BY_USERLOGIN: URL_ENDPOINT + '/DonViUD/GetDonviUDByUserLogin',
    /* QuyenHT - PERMISSIONSSYSTEM */
    PERMISSIONSSYSTEM_LIST: URL_ENDPOINT + '/PermissionsSystem/GetAll',
    QUYENHT_GETBYID: URL_ENDPOINT + '/QuyenHT/GetById',
    QUYENHT_MANAGER: URL_ENDPOINT + '/QuyenHT/Manager',
    QUYENHT_DELETE: URL_ENDPOINT + '/QuyenHT/Delete',
    /* Role */
    ROLES_LIST: URL_ENDPOINT + '/Role/GetAll',
    ROLES_GETBYID: URL_ENDPOINT + '/Role/',
    ROLES_CREATE: URL_ENDPOINT + '/Role',
    ROLES_UPDATE: URL_ENDPOINT + '/Role/Update/',
    ROLES_MANAGER: URL_ENDPOINT + '/Role/Manager',
    ROLES_DELETE: URL_ENDPOINT + '/Role/',
    /* Role Menu */
    ROLES_MENU_LIST: URL_ENDPOINT + '/Role/RoleMenuList',
    ROLES_MENU_TREE_LIST: URL_ENDPOINT + '/Role/TreeMenuByRole',
    ROLES_MENU_GETTREEBYID: URL_ENDPOINT + '/RoleMenu/GetListMenuByRoleId/',
    ROLES_MENU_MANAGER: URL_ENDPOINT + '/Role/RoleMenuManager',
    ROLES_MENU_MANAGER_BY_LIST: URL_ENDPOINT + '/RoleMenu/RoleMenuManagerByList',
    ROLES_MENU_DELETE: URL_ENDPOINT + '/Role/RoleMenuDelete',
    /* Role Report */
    ROLES_REPORT_TREE_LIST: URL_ENDPOINT + '/RoleReport/TreeReportByRole/',
    ROLES_REPORT_MANAGER_BY_LIST: URL_ENDPOINT + '/RoleReport/RoleReportManagerByList',
    /* Role App*/
    ROLES_APP_TREE_LIST: URL_ENDPOINT + '/RoleApp/TreeAppByRole/',
    ROLES_APP_MANAGER_BY_LIST: URL_ENDPOINT + '/RoleApp/RoleAppManagerByList',

    /* Users */
    USERS_LIST_QUANTRI: URL_ENDPOINT + '/User/ListUserQuanTri',
    USERS_GET_LIST: URL_ENDPOINT + '/User/GetAll',
    USERS_GETMANAGERBYID: URL_ENDPOINT + '/User/GetManagerById/',
    USERS_MANAGER: URL_ENDPOINT + '/User/Manager',
    USERS_DELETE: URL_ENDPOINT + '/User/Delete',
    USERS_UPDATE_PASS: URL_ENDPOINT + '/Login/ChangePassword',
    USERS_UPDATE_ROLE: URL_ENDPOINT + '/Login/ChangePassword',
    USERS_INFORMATION_GETLISTUSERMOBILEBYBRANCHID: URL_ENDPOINT + '/User/GetListUserUseMobileByBranchID/',

    /* Main Menu */
    MAIN_MENU_LIST: URL_ENDPOINT + '/MainMenu/GetAll',
    MAIN_MENU_GETBYID: URL_ENDPOINT + '/MainMenu/GetByID/',
    MAIN_MENU_CREATE: URL_ENDPOINT + '/MainMenu/Create',
    MAIN_MENU_UPDATE: URL_ENDPOINT + '/MainMenu/Update/',
    MAIN_MENU_DELETE: URL_ENDPOINT + '/MainMenu/Delete/',
    /* Menu */
    MENU_LIST: URL_ENDPOINT + '/Menu/ListMenu',
    MENU_GETBYID: URL_ENDPOINT + '/Menu/GetMenuById/',
    MENU_GETLISTBYMAINMENUID: URL_ENDPOINT + '/Menu/GetListMenuByMainMenuId/',
    MENU_CREATE: URL_ENDPOINT + '/Menu',
    MENU_UPDATE: URL_ENDPOINT + '/Menu/Update/',
    MENU_DELETE: URL_ENDPOINT + '/Menu/Delete/',
    /*DM_PHANCAP - OrganizationUnitType*/
    ORUNITYPE_LIST: URL_ENDPOINT + '/OrganizationUnitType/GetAll',
    ORUNITYPE_LISTTREE: URL_ENDPOINT + '/OrganizationUnitType/GetDataShowTreeSelect',
    DM_PHANCAP_GETBYID: URL_ENDPOINT + '/PhanCap/GetByID',
    DM_PHANCAP_MANAGER: URL_ENDPOINT + '/PhanCap/Manager',
    DM_PHANCAP_DELETE: URL_ENDPOINT + '/PhanCap/Delete',
    /*DM_CHUCDANH*/
    CATE_JOBTTILE_LIST: URL_ENDPOINT + '/CateJobTitle/GetAll',
    CATE_JOBTTILE_GETBYID: URL_ENDPOINT + '/CateJobTitle/GetById/',
    CATE_JOBTTILE_CREATE: URL_ENDPOINT + '/CateJobTitle',
    CATE_JOBTTILE_UPDATE: URL_ENDPOINT + '/CateJobTitle/Update/',
    CATE_JOBTTILE_DELETE: URL_ENDPOINT + '/CateJobTitle/Delete/',
    /*DM_DONVI - OrganizationUnit*/
    ORUNIT_TREEGRID: URL_ENDPOINT + '/OrganizationUnit/GetDataShowTreeGrid',
    ORUNIT_TREESELECT: URL_ENDPOINT + '/OrganizationUnit/GetDataShowTreeSelect',
    ORUNIT_GETBYID: URL_ENDPOINT + '/OrganizationUnit/GetById/',
    ORUNIT_CREATE: URL_ENDPOINT + '/OrganizationUnit/Create',
    ORUNIT_UPDATE: URL_ENDPOINT + '/OrganizationUnit/Update/',

    ORUNIT_DELETE: URL_ENDPOINT + '/OrganizationUnit/Delete/',
    /*DM_NHANVIEN*/   /*Employee*/
    EMPLOYEE_LISTALL: URL_ENDPOINT + '/Employee/GetAll',
    EMPLOYEE_GETBYID: URL_ENDPOINT + '/Employee/GetById/',
    EMPLOYEE_GETBYCODE: URL_ENDPOINT + '/NhanVien/GetByMaSoNV',
    EMPLOYEE_CREATE: URL_ENDPOINT + '/Employee',
    EMPLOYEE_UPDATE: URL_ENDPOINT + '/Employee/Update/',
    EMPLOYEE_DELETE: URL_ENDPOINT + '/Employee/Delete/',
    EMPLOYEE_LIST: URL_ENDPOINT + '/Employee/GetListEmployee',

    /*DM_NHOMHANGHOA*/ /* Cate Product Type*/
    CATE_PRODUCTTYPE_TREEGRID: URL_ENDPOINT + '/CateProductType/GetTreeGrid',
    DM_NHOMHANGHOA_TREESELECT: URL_ENDPOINT + '/CateProductType/GetDataShowTreeSelect',
    CATE_PRODUCTTYPE_GETBYID: URL_ENDPOINT + '/CateProductType/GetById/',
    CATE_PRODUCTTYPE_CREATE: URL_ENDPOINT + '/CateProductType',
    CATE_PRODUCTTYPE_UPDATE: URL_ENDPOINT + '/CateProductType/Update/',
    CATE_PRODUCTTYPE_DELETE: URL_ENDPOINT + '/CateProductType/Delete/',
    /*DM_HANGHOA*/ /* Cate Product */
    CATE_PRODUCT_LIST: URL_ENDPOINT + '/CateProduct/GetListCateProduct',
    DM_HANGHOA_GET: URL_ENDPOINT + '/CateProduct/GetById/',
    CATE_PRODUCT_DELETE: URL_ENDPOINT + '/CateProduct/Delete/',
    CATE_PRODUCT_CREATE: URL_ENDPOINT + '/CateProduct',
    CATE_PRODUCT_UPDATE: URL_ENDPOINT + '/CateProduct/Update/',

    CATE_PRODUCT_GETAUTO: URL_ENDPOINT + '/CateProduct/GetAutoProductID',
    QUYCACH_HH_LIST: URL_ENDPOINT + '/DMHangHoa/ListQuyCach',
    /*Cate Store*/
    CATE_STORE_GETLIST: URL_ENDPOINT + '/CateStore/GetAll',
    LOAI_KHO_LIST: URL_ENDPOINT + '/CateStoreType/GetAll',
    CATE_STORETYPE_GET: URL_ENDPOINT + '/CateStoreType/GetById/',
    LOAI_KHO_DELETE: URL_ENDPOINT + '/CateStoreType/Delete/',
    CATE_STORETYPE_CREATE: URL_ENDPOINT + '/CateStoreType',
    CATE_STORETYPE_UPDATE: URL_ENDPOINT + '/CateStoreType/Update/',
    LOAI_KHO_UPDATE: URL_ENDPOINT + '/CateStoreType/Update/',
    KHO_LIST: URL_ENDPOINT + '/CateStore/GetAll',
    KHO_LIST_MANAGER: URL_ENDPOINT + '/Kho/ListKhoManager',
    KHO_ALL_LIST: URL_ENDPOINT + '/Kho/ListAllKho',
    CATE_STORE_GET: URL_ENDPOINT + '/CateStore/GetById/',
    KHO_DELETE: URL_ENDPOINT + '/CateStore/Delete/',
    CATE_STORE_CREATE: URL_ENDPOINT + '/CateStore',
    CATE_STORE_UPDATE: URL_ENDPOINT + '/CateStore/Update/',

    CATE_STORE_GETLISTBYTYPEBRANCH: URL_ENDPOINT + '/CateStore/GetStoreByTypeBranch', //typeId & brandId
    /*LOAI DOI TAC*/
    DM_LOAI_DOITAC_LIST: URL_ENDPOINT + '/DoiTac/ListLoaiDT',
    DM_LOAI_DOITAC_GET: URL_ENDPOINT + '/DoiTac/GetLoaiDTByMa',
    DM_LOAI_DOITAC_MANAGER: URL_ENDPOINT + '/DoiTac/ManagerLoaiDT',
    DM_LOAI_DOITAC_DELETE: URL_ENDPOINT + '/DoiTac/DeleteLoaiDT',
    /*Cate Counterparty group*/
    /*NHOM DOI TAC*/
    CATE_COUNTERPARYGROUP_LIST_TREEGRID_BY_TYPE: URL_ENDPOINT + '/CateCounterpartyGroup/GetListTreeGridCounterGroup/',
    CATE_COUNTERPARYGROUP_GETLIST: URL_ENDPOINT + '/CateCounterpartyGroup/GetListCounterPartyGroup/',
    CATE_COUNTERPARYGROUP_CREATE: URL_ENDPOINT + '/CateCounterpartyGroup',
    CATE_COUNTERPARYGROUP_DELETE: URL_ENDPOINT + '/CateCounterpartyGroup/Delete/',

    DM_NHOM_DOITAC_LIST: URL_ENDPOINT + '/DoiTac/ListNhomDT',
    CATE_COUNTERPARYGROUP_GETBYID: URL_ENDPOINT + '/CateCounterpartyGroup/GetById/',
    DM_NHOM_DOITAC_MANAGER: URL_ENDPOINT + '/DoiTac/ManagerNhomDT',
    DM_NHOM_DOITAC_DELETE: URL_ENDPOINT + '/DoiTac/DeleteNhomDT',
    /*Cate Counterparty*/
    DM_DOITAC_LIST: URL_ENDPOINT + '/DoiTac/ListDoiTacByNhomLoai',
    CATE_COUNTERPARY_GET: URL_ENDPOINT + '/CateCounterparty/GetById/',
    CATE_COUNTERPARY_CREATE: URL_ENDPOINT + '/CateCounterparty',
    CATE_COUNTERPARY_DELETE: URL_ENDPOINT + '/CateCounterparty/Delete/',

    DM_DOITAC_MANAGER: URL_ENDPOINT + '/DoiTac/ManagerDoiTac',
    DM_DOITAC_DELETE: URL_ENDPOINT + '/DoiTac/DeleteDoiTac',
    CATE_COUNTERPARY_GETLISTVENDORBYGI: URL_ENDPOINT + '/CateCounterparty/GetVendorByGroupId/',
    CATE_COUNTERPARY_GETLISTBYTYAGR: URL_ENDPOINT + '/CateCounterparty/GetListCouterByTypeAndGroup/',

    /*Cate CounterpartyType*/
    CATE_COUNTERPARTYTYPE_LIST: URL_ENDPOINT + '/CateCounterpartyType/GetAll',

    /*NHAP XUAT HANG HOA*/
    NHAP_XUAT_HANG_KT_KHOA_SO: URL_ENDPOINT + '/NhapXuatHangHoa/KT_KHOA_SO',
    NHAP_XUAT_HANG_KT_THANH_TOAN: URL_ENDPOINT + '/NhapXuatHangHoa/KT_THANH_TOAN',
    NHAP_XUAT_HANG_LIST: URL_ENDPOINT + '/NhapXuatHangHoa/ListNXHH',
    NHAP_XUAT_HANG_LIST_CT_NXHH: URL_ENDPOINT + '/NhapXuatHangHoa/ListCTNXHH',
    NHAP_XUAT_HANG_GETSOCT: URL_ENDPOINT + '/NhapXuatHangHoa/GetSoCT',
    NHAP_XUAT_HANG_GETSOTONHH: URL_ENDPOINT + '/NhapXuatHangHoa/GetTonKhoHH',
    NHAP_XUAT_HANG_GETCHITIET_SOTONHH: URL_ENDPOINT + '/NhapXuatHangHoa/ListChiTietTonKhoHH',
    NHAP_XUAT_HANG_GET_SOTONHH_CHITIET_INFO: URL_ENDPOINT + '/NhapXuatHangHoa/GetTonHHInfo',
    NHAP_XUAT_HANG_NXHH_DEL: URL_ENDPOINT + '/NhapXuatHangHoa/NXHH_DEL',
    NHAPHANG_NXHH_INS: URL_ENDPOINT + '/NhapXuatHangHoa/SP_NXHH_NHAP',
    XUATHANG_NXHH_INS: URL_ENDPOINT + '/NhapXuatHangHoa/SP_NXHH_XUAT',
    NHAP_XUAT_HANG_NXHH_DUYET: URL_ENDPOINT + '/NhapXuatHangHoa/DUYET_NXHH',
    NHAP_XUAT_HANG_CANCEL_DUYET_NXHH: URL_ENDPOINT + '/NhapXuatHangHoa/CANCEL_DUYET_NXHH',
    NHAP_XUAT_HANG_LIST_CHIVANCHUYEN: URL_ENDPOINT + '/NhapXuatHangHoa/ListNXHH_ChiVanChuyen',
    NHAP_XUAT_HANG_KHAC_LIST: URL_ENDPOINT + '/NhapXuatHangHoa/ListNXHH_Khac',
    NHAPHANG_NXHH_KHAC_INS: URL_ENDPOINT + '/NhapXuatHangHoa/SP_NXHH_NHAP_KHAC',
    XUATHANG_NXHH_KHAC_INS: URL_ENDPOINT + '/NhapXuatHangHoa/SP_NXHH_XUAT_KHAC',
    /* LOG NHAP XUAT HANG HOA */
    LOG_NHAP_XUAT_HANG_LIST: URL_ENDPOINT + '/LogNXHH/LogNXHHList',
    LOG_NEW_NHAP_XUAT_HANG_GETBYID: URL_ENDPOINT + '/LogNXHH/GetLogNewNXHHById',
    LOG_OLD_NHAP_XUAT_HANG_GETBYID: URL_ENDPOINT + '/LogNXHH/GetLogOldNXHHById',
    LOG_NEW_NHAP_XUAT_HANG_LIST_CT_NXHH: URL_ENDPOINT + '/LogNXHH/ListLogNewCTNXHH',
    LOG_OLD_NHAP_XUAT_HANG_LIST_CT_NXHH: URL_ENDPOINT + '/LogNXHH/ListLogOldCTNXHH',
    /* DM_CHIPHI */
    CHIPHI_LIST: URL_ENDPOINT + '/ChiPhi/GetList',
    CHIPHI_GETBYMA: URL_ENDPOINT + '/ChiPhi/GetByMa',
    CHIPHI_MANAGER: URL_ENDPOINT + '/ChiPhi/Manager',
    CHIPHI_DELETE: URL_ENDPOINT + '/ChiPhi/Delete',
    /* DM_CHIEUDAY */
    Thickness_LIST: URL_ENDPOINT + '/CateThickness/GetAll',
    Thickness_GETBYMA: URL_ENDPOINT + '/CateThickness/GetByMa',
    CATE_THICKNESS_CREATE: URL_ENDPOINT + '/CateThickness',
    CATE_THICKNESS_UPDATE: URL_ENDPOINT + '/CateThickness/Update',
    CATE_THICKNESS_DELETE: URL_ENDPOINT + '/CateThickness/Delete/',
    /* DM_KHONL */
    CATEWIDTH_LIST: URL_ENDPOINT + '/CateWidth/GetAll',
    CATEWIDTH_GETBYID: URL_ENDPOINT + '/CateWidth/GetById/',
    CATEWIDTH_UPDATE: URL_ENDPOINT + '/CateWidth/Update',
    CATEWIDTH_DELETE: URL_ENDPOINT + '/CateWidth/Delete/',
    CATEWIDTH_CREATE: URL_ENDPOINT + '/CateWidth',
    CATE_WIDTH_GETLISTBYTYPE: URL_ENDPOINT + '/CateWidth/GetWidthByType/',

    KHONL_LIST: URL_ENDPOINT + '/KhoNL/ListKhoNLByLoai',
    KHONL_GETBYID: URL_ENDPOINT + '/KhoNL/GetByID',
    KHONL_MANAGER: URL_ENDPOINT + '/KhoNL/Manager',
    KHONL_DELETE: URL_ENDPOINT + '/KhoNL/Delete',
    /* FORM_NHOMDT */
    FORM_NHOMDT_LIST: URL_ENDPOINT + '/MenuNhomDT/MenuNhomDTList',
    FORM_NHOMDT_TREE_LIST: URL_ENDPOINT + '/MenuNhomDT/TreeNhomDTByMenu',
    FORM_NHOMDT_GETBYID: URL_ENDPOINT + '/MenuNhomDT/MenuNhomDTGetById',
    FORM_NHOMDT_MANAGER: URL_ENDPOINT + '/MenuNhomDT/MenuNhomDTManager',
    FORM_NHOMDT_MANAGER_BY_LIST: URL_ENDPOINT + '/MenuNhomDT/MenuNhomDTManagerByList',
    FORM_NHOMDT_DELETE: URL_ENDPOINT + '/MenuNhomDT/MenuNhomDTDelete',
    /* FORM_NHOMHH */
    FORM_NHOMHH_LIST: URL_ENDPOINT + '/MenuNhomHH/MenuNhomHHList',
    FORM_NHOMHH_TREE_LIST: URL_ENDPOINT + '/MenuNhomHH/TreeNhomHHByMenu',
    FORM_NHOMHH_GETBYID: URL_ENDPOINT + '/MenuNhomHH/MenuNhomHHGetById',
    FORM_NHOMHH_MANAGER: URL_ENDPOINT + '/MenuNhomHH/MenuNhomHHManager',
    FORM_NHOMHH_MANAGER_BY_LIST: URL_ENDPOINT + '/MenuNhomHH/MenuNhomHHManagerByList',
    FORM_NHOMHH_DELETE: URL_ENDPOINT + '/MenuNhomHH/MenuNhomHHDelete',
    /* Cate Production Plan */
    LOSX_LIST: URL_ENDPOINT + '/LoSX/GetList',
    CateProductionPlan_GetListById: URL_ENDPOINT + '/CateProductionPlan/GetListPlanByBranchId/',
    CATE_PRODUCTION_PLAN_LIST: URL_ENDPOINT + '/CatePlanType/GetAll',
    CATE_PRODUCTION_PLAN_GETMAKH: URL_ENDPOINT + '/LoSX/GetMaKH',
    CATE_PRODUCTION_PLAN_GET_PLAN_NO: URL_ENDPOINT + '/CateProductionPlan/GetPlanNo/',
    LOSX_GETBYMA: URL_ENDPOINT + '/LoSX/GetByMa',
    CATE_PRODUCTION_PLAN_CREATE: URL_ENDPOINT + '/CateProductionPlan',
    CATE_PRODUCTION_PLAN_UPDATE: URL_ENDPOINT + '/CateProductionPlan/Update',
    CATE_PRODUCTION_PLAN_DELETE: URL_ENDPOINT + '/CateProductionPlan/Delete/',
    LOSX_MANAGER: URL_ENDPOINT + '/LoSX/Manager',
    LOSX_LIST_NXNL: URL_ENDPOINT + '/LoSX/GetListForNhapXuatNL',
    CATE_PRODUCTION_PLAN_GETLISTBYBRANCHID: URL_ENDPOINT + '/CateProductionPlan/GetListPlanNotFinishByBranchId/',
    /* DM_NVUTC */
    NVUTC_LIST_REQUEST: URL_ENDPOINT + '/Nvutc/ListNVUTC_ByRequset',
    NVUTC_LIST: URL_ENDPOINT + '/Nvutc/GetList',
    NVUTC_GETBYID: URL_ENDPOINT + '/Nvutc/GetByMa',
    NVUTC_MANAGER: URL_ENDPOINT + '/Nvutc/Manager',
    NVUTC_DELETE: URL_ENDPOINT + '/Nvutc/Delete',
    /*THU CHI*/
    THU_CHI_KT_KHOA_SO: URL_ENDPOINT + '/ThuChi/KT_KHOA_SO',
    THU_CHI_GETSOCT: URL_ENDPOINT + '/ThuChi/GetSoCT',
    THU_CHI_LIST: URL_ENDPOINT + '/ThuChi/ListThuChi',
    THU_CHI_DEL: URL_ENDPOINT + '/ThuChi/SP_THUCHI_DEL',
    THU_CHI_INS_UPD: URL_ENDPOINT + '/ThuChi/SP_THUCHI_INS_UPD',
    CHIVANCHUYEN_GETSOCT: URL_ENDPOINT + '/ThuChi/GetSoCTChiVanChuyen',
    LIST_CHIVANCHUYEN: URL_ENDPOINT + '/ThuChi/ListChiVanChuyen',
    THU_CHI_DEL_CHIVANCHUYEN: URL_ENDPOINT + '/ThuChi/SP_THUCHI_DEL_CHIVANCHUYEN',
    THU_CHI_INS_UPD_CHIVANCHUYEN: URL_ENDPOINT + '/ThuChi/SP_THUCHI_INS_UPDTAE_CHIVANCHUYEN',
    THUCHI_GETBY_CTLQ: URL_ENDPOINT + '/ThuChi/GetThuChiByCTLQ',
    /* MO SO */
    CATE_MONTH_LIST: URL_ENDPOINT + '/CateMonth/GetAll',
    CATE_MONTH_GETBYID: URL_ENDPOINT + '/CateMonth/GetById/',
    CATE_MONTH_UPDATE: URL_ENDPOINT + '/CateMonth/UpdateMonth',
    CATE_MONTH_DELETE: URL_ENDPOINT + '/CateMonth/Delete/',
    CATE_MONTH_CREATE: URL_ENDPOINT + '/CateMonth',
    CATE_MONTH_CHECKISOPEN: URL_ENDPOINT + '/CateMonth/CheckMonthIsOpen/',
    /* KHOA SO */
    KHOASO_LIST: URL_ENDPOINT + '/KhoaSo/List',
    KHOASO_GETBYID: URL_ENDPOINT + '/KhoaSo/GetById',
    KHOASO_MANAGER: URL_ENDPOINT + '/KhoaSo/Manager',
    KHOASO_DELETE: URL_ENDPOINT + '/KhoaSo/Delete',
    /*PS TT NO*/
    PS_TT_NO_KT_KHOA_SO: URL_ENDPOINT + '/PSTTNO/KT_KHOA_SO',
    PS_TT_NO_GETSOCT: URL_ENDPOINT + '/PSTTNO/GetSoCT',
    /*DM_NVUNO*/
    DM_NVUNO_LIST: URL_ENDPOINT + '/DM_NVUNO/List',
    DM_NVUNO_LIST_REQUEST: URL_ENDPOINT + '/DM_NVUNO/ListByRequest',
    DM_NVUNO_LIST_BY_LOAI: URL_ENDPOINT + '/DM_NVUNO/ListByLoai',
    /*DM_NVUNO*/
    DM_NVUNX_LIST: URL_ENDPOINT + '/DM_NVUNX/List',
    DM_NVUNX_LIST_BY_NHXXH_KHAC: URL_ENDPOINT + '/DM_NVUNX/ListByNXHHKhac',
    /*PS NO*/
    PSNO_LIST: URL_ENDPOINT + '/PSTTNO/ListPhatSinhNo',
    PSNO_DATRA_GET: URL_ENDPOINT + '/PSTTNO/SP_PSNO_DATRA_GET',
    PSNO_DEL: URL_ENDPOINT + '/PSTTNO/SP_PSNO_DEL',
    PSNO_INS_UPD: URL_ENDPOINT + '/PSTTNO/SP_PSNO_INS_UPD',
    /*TTNO*/
    TTNO_LIST: URL_ENDPOINT + '/PSTTNO/ListThanhToanNo',
    TTNO_NO_TON_LIST: URL_ENDPOINT + '/PSTTNO/SP_NOTON_GET',
    TTNO_CTTT_GET_LIST: URL_ENDPOINT + '/PSTTNO/SP_CTTT_GET',
    TTNO_DEL: URL_ENDPOINT + '/PSTTNO/SP_TTNO_DEL',
    TTNO_INS_UPD: URL_ENDPOINT + '/PSTTNO/SP_TTNO_INS_UPD',
    TTNO_SP_TTNO_KIEMTRA_XOA: URL_ENDPOINT + '/PSTTNO/SP_TTNO_KIEMTRA_XOA',
    /* NHOM_RP */
    NHOM_RP_LIST: URL_ENDPOINT + '/Report/ListNhomRP',
    NHOM_RP_GETBYID: URL_ENDPOINT + '/Report/GetNhomRPByID',
    NHOM_RP_MANAGER: URL_ENDPOINT + '/Report/ManagerNhomRP',
    NHOM_RP_DELETE: URL_ENDPOINT + '/Report/DeleteNhomRP',
    /* BAO_CAO */
    REPORT_LIST: URL_ENDPOINT + '/Report/ListReport',
    REPORT_GETBYID: URL_ENDPOINT + '/Report/GetReportByID',
    REPORT_MANAGER: URL_ENDPOINT + '/Report/ManagerReport',
    REPORT_DELETE: URL_ENDPOINT + '/Report/DeleteReport',
    /* TIEUDETRAI_RP */
    REPORTLEFTHEADLINE_RP_LIST: URL_ENDPOINT + '/ReportLeftHeadline',
    REPORTLEFTHEADLINE_RP_GETBYID: URL_ENDPOINT + '/Report/GetTieuDeTraiRPByID',
    REPORTLEFTHEADLINE_RP_MANAGER: URL_ENDPOINT + '/Report/ManagerTieuDeTraiRP',
    REPORTLEFTHEADLINE_RP_DELETE: URL_ENDPOINT + '/Report/DeleteTieuDeTraiRP',
    /* THAMSO_RP */
    THAMSO_RP_LIST: URL_ENDPOINT + '/Report/ListThamSoRP',
    /* LOAI_TSORP */
    LOAI_TSORP_LIST: URL_ENDPOINT + '/Report/ListLoaiTSRP',
    /* BAO CAO REPORT */
    BAOCAO_KT_KHOA_SO: URL_ENDPOINT + '/Report/KT_KHOA_SO',
    BAOCAO_SP_RP_INFO: URL_ENDPOINT + '/Report/GetReportInfo',
    BAOCAO_SP_RP_DYNAMIC: URL_ENDPOINT + '/Report/SP_RP_DYNAMIC',
    BAOCAO_SP_TRACUU_TONHH: URL_ENDPOINT + '/TraCuu/SP_TRACUU_TONHH',
    /*NHAP XUAT NGUYEN LIEU*/    /*Receipt*/
    NHAP_XUAT_NL_KT_KHOA_SO: URL_ENDPOINT + '/NhapXuatNguyenLieu/KT_KHOA_SO',
    RECEIPT_SEARCH_LIST: URL_ENDPOINT + '/Receipt/SearchListReceipt',
    NHAP_XUAT_NL_LIST_CT_NXNL: URL_ENDPOINT + '/NhapXuatNguyenLieu/ListCTNXNL',
    RECEIPT_DETAIL_GETLIST_A_REIMEI: URL_ENDPOINT + '/ReceiptDetail/GetReceiptDetailFull/',
    RECEIPT_GETRECEIPTNO: URL_ENDPOINT + '/Receipt/GetReceiptNoOfReceipt',
    RECEIPT_DELETE: URL_ENDPOINT + '/Receipt/Delete/',
    NHAP_XUAT_NL_DEL: URL_ENDPOINT + '/NhapXuatNguyenLieu/NXNL_DEL',
    NHAP_XUAT_NL_INS_UPDATE: URL_ENDPOINT + '/NhapXuatNguyenLieu/SP_NXNL_NHAP_INS_UPDATE',
    RECEIPT_UPDATE: URL_ENDPOINT + '/InputInventory/Update',
    NHAP_XUAT_NL_INS_UPDATE_BAN: URL_ENDPOINT + '/NhapXuatNguyenLieu/SP_NXNL_XUAT_INS_UPDATE_BAN',
    NHAP_XUAT_NL_SP_TONKHONL_CHITIET_GET: URL_ENDPOINT + '/NhapXuatNguyenLieu/ListChiTietTonKhoNL',
    SP_NXNL_XUAT_INS_UPDATE: URL_ENDPOINT + '/NhapXuatNguyenLieu/SP_NXNL_XUAT_INS_UPDATE',
    SP_GET_IMEI_NXNL_QUETMA_APP: URL_ENDPOINT + '/NhapXuatNguyenLieu/SP_GET_IMEI_NXNL_QUETMA_APP',
    NXNL_UPDATE_TRANGTHAI: URL_ENDPOINT + '/NhapXuatNguyenLieu/NXNL_UPDATE_TRANGTHAI',
    NXNL_UPDATE_LOI: URL_ENDPOINT + '/NhapXuatNguyenLieu/NXNL_UPDATE_LOI',
    UPDATE_STEELDEFECT: URL_ENDPOINT + '/InputInventory/UpdateSteelDefect',
    NXNL_UPDATE_CANXE: URL_ENDPOINT + '/NhapXuatNguyenLieu/NXNL_UPDATE_CANXE',
    ROLE_TRUCK_SCALE: URL_ENDPOINT + '/InputInventory/RollTruckScale',
    SP_NXNL_NHAP_CATDOI: URL_ENDPOINT + '/NhapXuatNguyenLieu/SP_NXNL_NHAP_CATDOI',
    SP_NXNL_XUAT_CATDOI: URL_ENDPOINT + '/NhapXuatNguyenLieu/SP_NXNL_XUAT_CATDOI',
    NXNL_UPDATE_NHAP_KHAU: URL_ENDPOINT + '/NhapXuatNguyenLieu/NXNL_UPDATE_NHAP_KHAU',
    SP_NXNL_NHAP_PHU_LIEU_CUON_NHAP_KHAU: URL_ENDPOINT + '/NhapXuatNguyenLieu/SP_NXNL_NHAP_PHU_LIEU_CUON_NHAP_KHAU',

    /* LAP KE HOACH SX */
    KH_SX_SP_SOCT_GET_LAPKH: URL_ENDPOINT + '/LapKeHoachSX/SP_SOCT_GET_LAPKH',
    PLAN_NO_GET: URL_ENDPOINT + '/PlanManufacturing/GetPlanNo/',
    KH_SX_SP_KEHOACH_CUON_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_KEHOACH_CUON_GET',
    GET_PLAN_ROLL: URL_ENDPOINT + '/PlanManufacturing/GetPlanRoll/',
    KH_SX_SP_TONXUAT_NL_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_TONXUAT_NL_GET',
    SP_INSTOCK_MATERIAL_GET: URL_ENDPOINT + '/PlanManufacturing/GetInStockMaterial/',
    KH_SX_SP_LAPKH_CUON_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_LAPKH_CUON_GET',
    PLANNING_ROll_GET: URL_ENDPOINT + '/PlanManufacturing/GetByPlanProductionId/',
    KH_SX_SP_KH_CUON_VAO_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_KH_CUON_VAO_GET',
    GET_PLANDETAILINPUT: URL_ENDPOINT + '/PlanDetailInput/GetByManuafacturingId/',
    KH_SX_SP_KH_CUON_RA_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_KH_CUON_RA_GET',
    GET_PLANDETAILOUTPUT: URL_ENDPOINT + '/PlanDetailOutput/GetById/',
    KH_SX_SP_KH_CUON_RA_GET_BY_IDKH: URL_ENDPOINT + '/LapKeHoachSX/SP_KH_CUON_RA_GET_BY_IDKH',
    GET_PLANDETAILOUTPUT_BY_PLANMANUID: URL_ENDPOINT + '/PlanDetailOutput/GetByManuFactuaringId/',
    LAP_KEHOACHSX_INS_UPD: URL_ENDPOINT + '/LapKeHoachSX/LAP_KEHOACHSX_INS_UPD',
    PLAN_MANUAFACTURING_INS_UPD: URL_ENDPOINT + '/PlanManufacturing',
    SP_KEHOACH_SX_DEL: URL_ENDPOINT + '/LapKeHoachSX/SP_KEHOACH_SX_DEL',
    PLAN_MANUAFACTURING_DEL: URL_ENDPOINT + '/PlanManufacturing/Delete/',
    SP_TONBANG_CHUA_SX_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_TONBANG_CHUA_SX_GET',
    SP_RP_CT_KEHOACH_BANG: URL_ENDPOINT + '/LapKeHoachSX/SP_RP_CT_KEHOACH_BANG',
    SP_TONNL_CHUA_SX_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_TONNL_CHUA_SX_GET',
    INVENTORY_MATERIAL_NOT_MANUAFACTURING_GET: URL_ENDPOINT + '/PlanManufacturing/GetInventoryMaterialNotManuafacturing/',
    SP_NXNL_IMEI_UPD_CANSX: URL_ENDPOINT + '/LapKeHoachSX/SP_NXNL_IMEI_UPD_CANSX',
    SCALE_PRODUCT_UPD: URL_ENDPOINT + '/PlanManufacturing/ScaleProduct',
    KH_SX_SP_KEHOACH_CUON_SX_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_KEHOACH_CUON_SX_GET',
    KH_SX_SP_KEHOACH_CUON_CANSX_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_KEHOACH_CUON_CANSX_GET',
    PLAN_ROLL_MANUAFACTURING_SCALE_ROLL_GET: URL_ENDPOINT + '/PlanManufacturing/GetPlanScaleRollManuafacturing/',
    KH_SX_SP_KIEMTRA_CUON_DA_SX: URL_ENDPOINT + '/LapKeHoachSX/SP_KIEMTRA_CUON_DA_SX',
    KH_SX_SP_KEHOACH_CUON_CATDOI_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_KEHOACH_CUON_CATDOI_GET',
    KH_SX_SP_CHITIET_CUON_CATDOI_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_CHITIET_CUON_CATDOI_GET',
    KH_SX_SP_KEHOACH_BANG_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_KEHOACH_BANG_GET',
    KH_SX_SP_TONPL_CHUA_NHAPKHO_GET: URL_ENDPOINT + '/LapKeHoachSX/SP_TONPL_CHUA_NHAPKHO_GET',
    INVENTORY_NOT_MATERIAL_INPUT_GET: URL_ENDPOINT + '/PlanManufacturing/GetInventoryMaterialNotMaterialInput/',



    /*KET SO*/
    KET_SO_KT_KHOA_SO: URL_ENDPOINT + '/KetSo/KT_KHOA_SO',
    KET_SO_GETSOCT: URL_ENDPOINT + '/KetSo/GetSoCT',
    KET_SO_LIST: URL_ENDPOINT + '/KetSo/ListKetSo',
    KET_SO_DEL: URL_ENDPOINT + '/KetSo/SP_KETSO_DEL',
    KET_SO_INS_UPD: URL_ENDPOINT + '/KetSo/SP_KETSO_INS_UPD',
    /*SỐ LIỆU*/
    KT_MO_SO: URL_ENDPOINT + '/SoLieu/KT_MO_SO',
    SP_CAPNHAT_KHOHH: URL_ENDPOINT + '/SoLieu/SP_CAPNHAT_KHOHH',
    CHECK_STATUS_CAPNHAT_KHOHH: URL_ENDPOINT + '/SoLieu/CHECK_STATUS_CAPNHAT_KHOHH',
    SP_KIEMKHO_HH: URL_ENDPOINT + '/SoLieu/SP_KIEMKHO_HH',
    SP_CHUYENKHO_HH: URL_ENDPOINT + '/SoLieu/SP_CHUYENKHO_HH',
    /*LOG_TIME*/
    LOG_STATUS_LIST: URL_ENDPOINT + '/LogTime/LogStatusList',
    ADDUP_LOG_STATUS: URL_ENDPOINT + '/LogTime/AddUpLogStatus',
    ADDUP_LOG_FORM: URL_ENDPOINT + '/LogTime/AddUpLogForm',
    LOG_FORM_LISTBYLOGINID: URL_ENDPOINT + '/LogTime/ListByLoginId',

    /* DM_LOISP */ /* CateSteelDefect */
    CATE_STEELDEFECT_GETLISTBYMETERIAL: URL_ENDPOINT + '/CateSteelDefect/GetListDefectByMarterialType/',
    CATE_STEEL_DEFECT_DELETE: URL_ENDPOINT + '/CateSteelDefect/Delete/',
    CATE_STEEL_DEFECT_CREATE: URL_ENDPOINT + '/CateSteelDefect',
    CATE_STEEL_DEFECT_UPDATE: URL_ENDPOINT + '/CateSteelDefect/Update',
    CATE_STEEL_DEFECT_GET_BYID: URL_ENDPOINT + '/CateSteelDefect/GetById/',
    CATE_STEELDEFECT_LIST: URL_ENDPOINT + '/CateSteelDefect/GetAllListDefect',
    LOAISP_INS_UPD: URL_ENDPOINT + '/LoiSP/Manager',
    LOAISP_GET_BYID: URL_ENDPOINT + '/LoiSP/GetById',
    LOAISP_LIST: URL_ENDPOINT + '/LoiSP/GetById',
    /* DM_LOISP */

    /* Cate GalvanizedOrganization */
    CateGalvanizedOrganization_LIST: URL_ENDPOINT + '/CateGalvanizedOrganization/GetAll',
    CateGalvanizedOrganization_GETBYID: URL_ENDPOINT + '/CateGalvanizedOrganization/GetById/',
    CateGalvanizedOrganization_CREATE: URL_ENDPOINT + '/CateGalvanizedOrganization',
    CateGalvanizedOrganization_UPDATE: URL_ENDPOINT + '/CateGalvanizedOrganization/Update',
    CateGalvanizedOrganization_DELETE: URL_ENDPOINT + '/CateGalvanizedOrganization/Delete/',

    /* DM_TIEUCHUAN */
    CATE_STANDARD_LIST: URL_ENDPOINT + '/CateStandard/GetAll',
    CATE_STANDARD_GetById: URL_ENDPOINT + '/CateStandard/GetById/',
    CATE_STANDARD_UPDATE: URL_ENDPOINT + '/CateStandard/Update',
    CATE_STANDARD_CREATE: URL_ENDPOINT + '/CateStandard',
    CATE_STANDARD_MANAGER: URL_ENDPOINT + '/TieuChuanNL/Manager',
    CATE_STANDARD_DELETE: URL_ENDPOINT + '/CateStandard/Delete/',
    /* DM_SOLO */
    CATE_PRODUCTIONBATCHNO_LIST: URL_ENDPOINT + '/CateProductionBatchNo/GetAll',
    CATE_PRODUCTIONBATCHNO_GetById: URL_ENDPOINT + '/CateProductionBatchNo/GetById/',
    CATE_PRODUCTIONBATCHNO_UPDATE: URL_ENDPOINT + '/CateProductionBatchNo/Update',
    CATE_PRODUCTIONBATCHNO_CREATE: URL_ENDPOINT + '/CateProductionBatchNo',
    CATE_PRODUCTIONBATCHNO_MANAGER: URL_ENDPOINT + '/SOLO/Manager',
    CATE_PRODUCTIONBATCHNO_DELETE: URL_ENDPOINT + '/CateProductionBatchNo/Delete/',

    /* DM_LOAINL */
    CATE_STEELTYPE_LIST: URL_ENDPOINT + '/CateSteelType/GetAll',
    CATE_STEELTYPE_GetById: URL_ENDPOINT + '/CateSteelType/GetById/',
    CATE_STEELTYPE_UPDATE: URL_ENDPOINT + '/CateSteelType/Update',
    CATE_STEELTYPE_CREATE: URL_ENDPOINT + '/CateSteelType',
    CATE_STEELTYPE_MANAGER: URL_ENDPOINT + '/LoaiNL/Manager',
    CATE_STEELTYPE_DELETE: URL_ENDPOINT + '/CateSteelType/Delete/',

    /* TaskDeliveryApp */
    TASKAPP_GETLISTBYBRANCHID: URL_ENDPOINT + '/TaskDeliverApp/GetListTaskDeliverAppByBranchId/',
    TASKAPP_CREATE: URL_ENDPOINT + '/TaskDeliverApp',
    TASKAPP_UPDATE: URL_ENDPOINT + '/TaskDeliverApp/Update/',
    TASKAPP_DELETE: URL_ENDPOINT + '/TaskDeliverApp/Delete/',
    TASKAPP_GETRECEIPTNOBYPLANTYE: URL_ENDPOINT + '/TaskDeliverApp/GetReceiptNoTaskApp/',
    TASKAPP_GETLISTPRODUCTIMEIBYPLANID: URL_ENDPOINT + '/TaskDeliverApp/GetListProductImeiByPlanId',
    /* BeginningInventory */
    BEGINING_INVENTORY_GETLISTIMEI: URL_ENDPOINT + '/BeginningInventory/GetImeiInventoryMaterial',
    BEGINING_INVENTORY_GETQUANTITY: URL_ENDPOINT + '/BeginningInventory/GetInventoryMaterial',

}
export enum APIStatus {
    ERROR = 0,
    SUCCESS = 200,
    NOT_FOUND = 201,
    UNAUTHORIZED = 401,
    TOKEN_EXPIRED = -401,
    INTERNET_ERROR = 500,
    EXPORT_HH_OUT_TOTAL = 4040,
    BAD_REQUEST = 400
}

export interface APIDataResponse<T> {
    status: number,
    message: string,
    data: Array<T>
}
export interface APIDataResponse<T> {
    status: number,
    success: boolean,
    message: string,
    data: Array<T>
}
export interface APIDataResponseSingle<T> {
    status: number,
    success: boolean,
    message: string,
    data: T
}

export interface APIDataResponseInfo<T> {
    status: number,
    message: string,
    success: boolean,
    data: {
        info: any
        result: Array<T>
    }
}

export default APIURL;