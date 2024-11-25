import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button, Select, Divider, message, Tooltip, Spin } from 'antd';
import moment from 'moment';
import Container from '../../components/container/index';
import { PDFExport } from '@progress/kendo-react-pdf';
import PerfectScrollbar from '../../components/scrollBar/index';
import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import ReactExport from "react-data-export";

import LoginUtils from '../../utils/loginUtils';
import ReportService from '../../services/reportService';
import CateStoreService from '../../services/cateStoreService';
import CateProductService from '../../services/cateProductService';
import CateBranchService from '../../services/cateBranchService';
import UserService from '../../services/userService';
import CateCounterpartyService from '../../services/cateCounterpartyService';
import enumTypeReport from '../../models/enumTypeReport';
import cateProductRequest from '../../models/request/cateProductRequest';
import cateBranch from '../../models/cateBranch';
import cateStore from '../../models/cateStore';
import treeData from '../../models/ui/treeData';
import { cateProductVm } from '../../models/cateProduct';
import report from '../../models/report';
import reportLeftHeadline from '../../models/reportLeftHeadline';
import cateCounterparty from '../../models/cateCounterparty';
import cateCounterpartyGroup from '../../models/cateCounterpartyGroup';

import PrintTemplate from './printTemplate';
import { FileExcelOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';

const DateBC = React.lazy(() => import('./controls/dateRp'));
const MonthBC = React.lazy(() => import('./controls/monthRp'));
const ComboBoxBC = React.lazy(() => import('./controls/comboBoxRp'));
const ComboBoxTreeBC = React.lazy(() => import('./controls/comboBoxTreeRp'));
const InputTextBC = React.lazy(() => import('./controls/inputTextRp'));

const _SP_BC_THNX = React.lazy(() => import('./formsReport/thnx'));
const _SP_BC_CT_NXHH = React.lazy(() => import('./formsReport/nxhh'));
const _SP_BC_CT_NXHH_TD = React.lazy(() => import('./formsReport/nxhhTd'));
const _SP_BC_TONKHO_HH = React.lazy(() => import('./formsReport/instockGoods'));

const reportService = new ReportService();
const cateStoreService = new CateStoreService();
const cateProductService = new CateProductService();
const cateBranchService = new CateBranchService();
const userService = new UserService();
const cateCounterpartyService = new CateCounterpartyService();

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const { Option } = Select;
const ReportPage: React.FC = () => {

    (window as any).html2canvas = html2canvas;

    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.userName;

    const eleEmty: React.ReactInstance = new EmptyComponent({});
    const ref_PDFExport = React.useRef<PDFExport>(null);
    const refBaoCaoPrint = React.useRef<any>(eleEmty);

    const [loadingPage, setLoadingPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isKhoaSo, setIsKhoaSo] = useState(1);

    const [dataBaoCao, setdataBaoCao] = useState((() => {
        let dataInit: Array<any> = [] as any;
        return dataInit;
    }));

    const [baocaoSelect, setBaoCaoSelect] = useState((() => {
        let dataInit: report = {
            isActive: false,
            reportID: 0,
            formKey: "",
            orientation: 0,
            paperSize: "",
            marginBottom: 0,
            marginRight: 0,
            marginLeft: 0,
            marginTop: 0,
            reportGroupID: 0,
            sortOrder: 0,
            isRightHeadline: false,
            leftHeadlineID: 0,
            reportName: "",
            reportGroupName: "",
            tsql: "",
            isLock: false
        };
        return dataInit;
    }));

    const [baocaoSelect_VIEW, setBaoCaoSelect_VIEW] = useState((() => {
        let dataInit: report = {
            isActive: false,
            reportID: 0,
            formKey: "",
            orientation: 0,
            paperSize: "",
            marginBottom: 0,
            marginRight: 0,
            marginLeft: 0,
            marginTop: 0,
            reportGroupID: 0,
            sortOrder: 0,
            isRightHeadline: false,
            leftHeadlineID: 0,
            reportName: "",
            reportGroupName: "",
            tsql: "",
            isLock: false
        };
        return dataInit;
    }));


    const [baocaoRequest, setBaoCaoRequest] = useState((() => {
        let dataInit = {} as any;
        return dataInit;
    }));

    const [baocaoRequest_VIEW, setBaoCaoRequest_VIEW] = useState((() => {
        let dataInit = {} as any;
        return dataInit;
    }));

    const [modelNhomBC, setModelNhomBC] = useState((() => {
        let dataInit: Array<any> = [] as any;
        return dataInit;
    }));


    const [modelBaoCao, setModelBaoCao] = useState((() => {
        let dataInit: Array<any> = [] as any;
        return dataInit;
    }));

    const [filterModelBaoCao, setFilterModelBaoCao] = useState((() => {
        let dataInit: Array<any> = [] as any;
        return dataInit;
    }));

    const [modelThamSoBaoCao, setModelThamSoBaoCao] = useState((() => {
        let dataInit: Array<any> = [] as any;
        return dataInit;
    }));

    const [filterModelThamSoBaoCao, setFilterModelThamSoBaoCao] = useState((() => {
        let dataInit: Array<any> = [] as any;
        return dataInit;
    }));

    const [branchInfo, setBranchInfo] = useState((() => {
        let dataInit: cateBranch = {} as any;
        return dataInit;
    }));

    const [dataKho, setDataKho] = useState((() => {
        let dataInit: Array<cateStore> = [] as any;
        return dataInit;
    }));

    const [dataNhomHH, setDataNhomHH] = useState((() => {
        let dataInit: Array<treeData> = [] as any;
        return dataInit;
    }));

    const [dataHH, setDataHH] = useState((() => {
        let dataInit: Array<cateProductVm> = [] as any;
        return dataInit;
    }));



    const [doiTacModel, setDoiTacModel] = useState((() => {
        let dataInit: Array<cateCounterparty> = [] as any;
        return dataInit;
    }));

    const [nhomDoiTac, setNhomDoiTac] = useState((() => {
        let dataInit: Array<cateCounterpartyGroup> = [] as any;
        return dataInit;
    }));

    const [dataNhanVien, setDataNhanVien] = useState((() => {
        let dataInit = [] as any;
        return dataInit;
    }));

    const [dataTDTBaoCao, setDataTDTBaoCao] = useState((() => {
        let dataInit: Array<reportLeftHeadline> = [] as any;
        return dataInit;
    }));

    useEffect(() => {
        async function GetData() {
            await GetBaoCaoInfo();
            await GetDonViUserLogin();
            await GetDataKho();
            await GettreeDataNhomHangHoa();
            await LoadDMHangHoa();
            await GetDataTDTBaoCao();
            await GetListNhanVien();
            await GetNhomDoiTac();
            await GetDataDoiTac();
            setLoadingPage(false);
        };
        GetData();
    }, []);

    const GetDonViUserLogin = async () => {
        var getDdata = await cateBranchService.GetOfUseLogin();
        setBranchInfo(getDdata.data);
    }

    const GetDataKho = async () => {
        var getDdata = await cateStoreService.GetListStore();
        setDataKho(getDdata.data);
    }

    const GetDataTDTBaoCao = async () => {
        var getDdata = await reportService.GetListLeftHeadlineRP();
        setDataTDTBaoCao(getDdata.data);
    }

    const GettreeDataNhomHangHoa = async () => {
        var getDdata = await cateProductService.GetListProductTypeTreeGridSelect();
        setDataNhomHH(getDdata.data);
    }

    const LoadDMHangHoa = async (searchOptions?: any, filters?: any, sorter?: any) => {
        searchOptions = searchOptions == undefined ? {} : searchOptions;
        var req: cateProductRequest = {} as any;
        req.productID = searchOptions.productID || '';
        req.productName = searchOptions.productName || '';
        req.productTypeID = (searchOptions.productTypeID || '') == 'ALL' ? '' : (searchOptions.productTypeID || '');
        req.pageindex = 0;
        req.pagesize = 0;
        req.total = 0;
        var dataHangHoa = await cateProductService.GetListCateProduct(req);
        setDataHH(dataHangHoa.data);
    }



    const GetNhomDoiTac = async () => {
        var getDdata = await cateCounterpartyService.GetListCounterPartyGroup('', false); // chưa test
        setNhomDoiTac(getDdata.data);
    }

    const GetDataDoiTac = async (nhomdt = '') => {
        var getDdata = await cateCounterpartyService.GetListGetVendorByGroupId(nhomdt);
        setDoiTacModel(getDdata.data);
    }

    const onChangeNhomHangHoa = async (value: any, node: any, extra: any) => {
        LoadDMHangHoa({ nhomhh: value });
    }

    const GetListNhanVien = async () => {
        // var getDdata = await userService.GetListQuanTri();
        // var _dataNhanViens = [] as any;
        // if (getDdata.data) {
        //     getDdata.data.forEach(element => {
        //         _dataNhanViens.push({
        //             ma: element.username,
        //             productName: element.productNamenhanvien
        //         })
        //     });
        // }
        // setDataNhanVien(_dataNhanViens);
    }

    const GetBaoCaoInfo = async () => {
        // var databaocao = await reportService.SP_BC_INFO();
        // setModelNhomBC(databaocao.data.nhombaocao);
        // setModelBaoCao(databaocao.data.baocao);
        // setModelThamSoBaoCao(databaocao.data.thamso);
    }

    const onChangeNhomBC = (value: any) => {
        const _modelBaoCao = modelBaoCao.map(ele => { return ele });
        const _FilterModelBaoCao = _modelBaoCao.filter(function (ele) {
            return ele.reportGroupID == value
        });
        setFilterModelBaoCao(_FilterModelBaoCao);
        setBaoCaoSelect_VIEW({
            isActive: false,
            reportID: 0,
            formKey: "",
            orientation: 0,
            paperSize: "",
            marginBottom: 0,
            marginRight: 0,
            marginLeft: 0,
            marginTop: 0,
            reportGroupID: 0,
            sortOrder: 0,
            isRightHeadline: false,
            leftHeadlineID: 0,
            reportName: "",
            reportGroupName: "",
            tsql: "",
            isLock: false
        });
        setFilterModelThamSoBaoCao([]);
        setIsKhoaSo(1);
    }

    const onChangeBC = (value: any) => {

        var _modelBaoCaoRequest = {} as any;

        const _modelThamSoBaoCao = modelThamSoBaoCao.map(ele => { return ele });
        const _filterModelThamSoBaoCao = _modelThamSoBaoCao.filter(function (ele) {
            return ele.reportID == value;
        });
        setFilterModelThamSoBaoCao(_filterModelThamSoBaoCao);
        setBaoCaoRequest(_modelBaoCaoRequest);
        const _modelSelectBaoCao = filterModelBaoCao.map(ele => { return ele });
        const __modelSelectBaoCao = _modelSelectBaoCao.filter(function (ele) {
            return ele.reportID == value;
        });
        setBaoCaoSelect(__modelSelectBaoCao[0]);
        if (_filterModelThamSoBaoCao) {
            _filterModelThamSoBaoCao.forEach(item => {
                if (item.paramname === 'loaibc') {
                    if (item.loaitso === enumTypeReport.CB_SORT_NHANVIEN
                        || item.loaitso === enumTypeReport.CB_SORT_BAOCAO_NO_DONG
                        || item.loaitso === enumTypeReport.CB_LOAI_NO_THUTRA
                        || item.loaitso === enumTypeReport.CB_SORT_PHIEU_NHANVIEN
                        || item.loaitso === enumTypeReport.CB_LOAIBC_DS_NHAPXUAT) {
                        _modelBaoCaoRequest.loaibc = '1';
                    }
                    else {
                        _modelBaoCaoRequest.loaibc = 'TH';
                    }
                }
                else if (item.paramname === 'tonam') {
                    _modelBaoCaoRequest.tonam = __modelSelectBaoCao[0].formKey === '_SP_BC_TONKHO_HH' ? '0' : '1';
                }
                else if (item.paramname === 'ngay') {
                    _modelBaoCaoRequest.ngay = moment(new Date()).format('DD/MM/YYYY');
                }
                else if (item.paramname === 'ngaybd') {
                    _modelBaoCaoRequest.ngaybd = moment(new Date()).format('DD/MM/YYYY');
                }
                else if (item.paramname === 'ngaykt') {
                    _modelBaoCaoRequest.ngaykt = moment(new Date()).format('DD/MM/YYYY');
                }
                else if (item.paramname === 'thang') {
                    _modelBaoCaoRequest.thang = moment(new Date()).format('YYYYMM');
                }
                else {
                    _modelBaoCaoRequest[item.paramname] = '';
                }
            });
        }
        setBaoCaoSelect_VIEW({
            isActive: false,
            reportID: 0,
            formKey: "",
            orientation: 0,
            paperSize: "",
            marginBottom: 0,
            marginRight: 0,
            marginLeft: 0,
            marginTop: 0,
            reportGroupID: 0,
            sortOrder: 0,
            isRightHeadline: false,
            leftHeadlineID: 0,
            reportName: "",
            reportGroupName: "",
            tsql: "",
            isLock: false
        });
        setIsKhoaSo(1);
    }

    const calllBackOnChange = (value: string, thamso: any) => {
        if (thamso.loaitso === enumTypeReport.CB_NHOMHANGHOA) {
            onChangeNhomHangHoa(value, null, null);
        }
        setBaoCaoRequest({ ...baocaoRequest, [thamso.paramname]: value });
    }

    const getControl = (item: any, index: any) => {
        var control = null;
        switch (item.loaitso) {
            case enumTypeReport.ComboBox:
                control = <ComboBoxBC thamsobc={item} data={[]} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.Date:
                control = <DateBC thamsobc={item} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.Text:
                control = <InputTextBC thamsobc={item} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.Month:
                control = <MonthBC thamsobc={item} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_DONVI:
                control = <ComboBoxBC thamsobc={item} data={[]} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_KHO:
                control = <ComboBoxBC thamsobc={item} data={dataKho} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_NHOMHANGHOA:
                control = <ComboBoxTreeBC thamsobc={item} data={dataNhomHH} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_HANGHOA:
                control = <ComboBoxBC thamsobc={item} data={dataHH} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_LOAIBC:
                let dataLoaiBC = [
                    { ma: 'TH', productName: 'Tổng Hợp' },
                    { ma: 'CT', productName: 'Chi Tiết' }
                ];
                control = <ComboBoxBC dfvalue='TH' thamsobc={item} data={dataLoaiBC} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_TONAM:
                const dataTonAmBC = [
                    { ma: '1', productName: ' >= 0 ' },
                    { ma: '-1', productName: ' < 0 ' }
                ];
                if (baocaoSelect.formKey === '_SP_BC_TONKHO_HH') {
                    dataTonAmBC.unshift({ ma: '0', productName: ' Tất cả ' });
                }
                control = <ComboBoxBC dfvalue={baocaoSelect.formKey === '_SP_BC_TONKHO_HH' ? '0' : '1'} thamsobc={item} data={dataTonAmBC} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_NHANVIEN:
                control = <ComboBoxBC thamsobc={item} data={dataNhanVien} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_SORT_NHANVIEN:
                let dataSortNhanVien = [
                    { ma: '1', productName: 'Theo trình tự' },
                    { ma: '2', productName: 'Theo nhân viên nhập' }
                ];
                control = <ComboBoxBC dfvalue='1' thamsobc={item} data={dataSortNhanVien} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_DOI_TUONG:
                control = <ComboBoxBC thamsobc={item} data={doiTacModel} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_SORT_BAOCAO_NO_DONG:
                let dataSortNoTonDong = [
                    { ma: '1', productName: 'Theo khách hàng' },
                    { ma: '2', productName: 'Theo nhân viên nhập' }
                ];
                control = <ComboBoxBC dfvalue='1' thamsobc={item} data={dataSortNoTonDong} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_SORT_PHIEU_NHANVIEN:
                let dataSortPhieuNV = [
                    { ma: '1', productName: 'Theo phiếu' },
                    { ma: '2', productName: 'Theo nhân viên' }
                ];
                control = <ComboBoxBC dfvalue='1' thamsobc={item} data={dataSortPhieuNV} onchange={calllBackOnChange} />;
                break;
            case enumTypeReport.CB_LOAIBC_DS_NHAPXUAT:
                let dataSortNhapXuat = [
                    { ma: '1', productName: 'Tồn ĐK' },
                    { ma: '2', productName: 'Nhập TK' },
                    { ma: '3', productName: 'Xuât TK' },
                    { ma: '4', productName: 'Tồn CK' }
                ];
                control = <ComboBoxBC dfvalue='1' thamsobc={item} data={dataSortNhapXuat} onchange={calllBackOnChange} />;
                break;
        }
        return control;
    }

    const getFromBaoCao = (name: string) => {
        switch (name) {
            case "_SP_BC_THNX":
                return <_SP_BC_THNX tdtBaoCao={getTDTraiBC_FRBaoCao()} kho={getKho_FRBaoCao()} option={baocaoRequest_VIEW} userName={userName} branchInfo={branchInfo} data={dataBaoCao} />
            case "_SP_BC_CT_NXHH":
                return <_SP_BC_CT_NXHH tdtBaoCao={getTDTraiBC_FRBaoCao()} kho={getKho_FRBaoCao()} option={baocaoRequest_VIEW} userName={userName} branchInfo={branchInfo} HangHoa={getHangHoa_FRBaoCao()} data={dataBaoCao} />
            case "_SP_BC_CT_NXHH_TD":
                return <_SP_BC_CT_NXHH_TD tdtBaoCao={getTDTraiBC_FRBaoCao()} kho={getKho_FRBaoCao()} option={baocaoRequest_VIEW} userName={userName} branchInfo={branchInfo} HangHoa={getHangHoa_FRBaoCao()} data={dataBaoCao} />
            case "_SP_BC_TONKHO_HH":
                return <_SP_BC_TONKHO_HH tdtBaoCao={getTDTraiBC_FRBaoCao()} kho={getKho_FRBaoCao()} option={baocaoRequest_VIEW} userName={userName} branchInfo={branchInfo} HangHoa={getHangHoa_FRBaoCao()} data={dataBaoCao} />
            default:
                return <div></div>
        }
    }

    const getKho_FRBaoCao = () => {
        if (baocaoRequest_VIEW.storeID) {
            const _ModelKho = dataKho.map(ele => { return ele });
            const _FilterKho = _ModelKho.filter(function (ele) {
                return ele.storeID == baocaoRequest_VIEW.storeID
            });
            if (_FilterKho) {
                return _FilterKho[0];
            }
            else {
                return {
                    storeID: '',
                    storeName: '',
                    storeTypeID: '',
                    branchID: '',
                    storeAddress: '',
                    storeKeeperName: '',
                    description: ''
                };
            }
        }
        else {
            return {
                storeID: '',
                storeName: '',
                storeTypeID: '',
                branchID: '',
                storeAddress: '',
                storeKeeperName: '',
                description: ''
            };
        }
    }

    const getHangHoa_FRBaoCao = () => {

        if (baocaoRequest_VIEW.productID) {
            const _ModeldataHH = dataHH.map(ele => { return ele });
            const _FilterHangHoa = _ModeldataHH.filter(function (ele) {
                return ele.productID == baocaoRequest_VIEW.productID
            });
            if (_FilterHangHoa) {
                return _FilterHangHoa[0];
            }
            else {
                return {
                    productID: '',
                    productName: '',
                    productTypeID: '',
                    productUnit: '',
                    specification: '',
                    stockMin: 0,
                    stockMax: 0,
                    description: '',
                    isUse: false,
                    productTypeName: ''
                };
            }
        }
        else {
            return {
                productID: '',
                productName: '',
                productTypeID: '',
                productUnit: '',
                specification: '',
                stockMin: 0,
                stockMax: 0,
                description: '',
                isUse: false,
                productTypeName: ''
            };
        }
    }

    const getTDTraiBC_FRBaoCao = () => {
        if (baocaoSelect_VIEW.leftHeadlineID > 0) {
            const _ModelTDTrai = dataTDTBaoCao.map(ele => { return ele });
            const _FilterTDTrai = _ModelTDTrai.filter(function (ele) {
                return ele.leftHeadlineId == baocaoSelect_VIEW.leftHeadlineID
            });
            if (_FilterTDTrai) {
                return _FilterTDTrai[0];
            }
            else {
                return {
                    leftHeadlineId: 0,
                    leftHeadlineName: '',
                    line1: '',
                    line2: '',
                    line3: ''
                };
            }
        }
        else {
            return {
                leftHeadlineId: 0,
                leftHeadlineName: '',
                line1: '',
                line2: '',
                line3: ''
            };
        }
    }

    const getNhanVien_FRBaoCao = () => {
        if (baocaoRequest_VIEW.qtri) {
            const _ModelNhanVien = [...dataNhanVien];
            const _FilterNhanVien = _ModelNhanVien.filter(function (ele) {
                return ele.ma == baocaoRequest_VIEW.qtri
            });
            if (_FilterNhanVien) {
                return _FilterNhanVien[0];
            }
            else {
                return {
                    ma: '',
                    productName: ''
                };
            }
        }
        else {
            return {
                ma: '',
                productName: ''
            };
        }
    }

    const GetBaoCao = async (e: any) => {
        setBaoCaoSelect_VIEW({ ...baocaoSelect_VIEW, formKey: '' });
        if (filterModelThamSoBaoCao && filterModelThamSoBaoCao.length > 0) {
            var isERROR = false, ischeckKhoaSo = false;
            var messageERROR = '', ngayct = new Date();
            for (var i = 0; i < filterModelThamSoBaoCao.length; i++) {
                var d = filterModelThamSoBaoCao[i];
                if (baocaoRequest[d.paramname] === undefined) {
                    baocaoRequest[d.paramname] = '';
                }
                if (d.paramname === 'ngay' || d.paramname === 'ngaykt' || d.paramname === 'thang') {
                    ischeckKhoaSo = true;
                    if (d.paramname === 'thang') {
                        ngayct = moment(baocaoRequest[d.paramname], 'YYYYMM').endOf("month").toDate();
                        console.log(ngayct);
                    }
                    else {
                        ngayct = moment(baocaoRequest[d.paramname], 'DD/MM/YYYY').toDate();
                    }
                }
                if (d.batbuoc) {
                    if (baocaoRequest[d.paramname] === '') {
                        isERROR = true;
                        messageERROR = 'Vui lòng chọn/nhập ' + d.productNametso;
                        break;
                    }
                }
            }
            if (isERROR) {
                message.error(messageERROR);
            }
            else {

                setLoading(true);
                if (ischeckKhoaSo && baocaoSelect.isLock) {
                    var isKhoaSo = await reportService.CheckKhoaSo(ngayct);
                    setIsKhoaSo(isKhoaSo.data);
                }
                else {
                    setIsKhoaSo(1);
                }
                
                // var dataBaoCao = await reportService.SP_BC_DYNAMIC({
                //     reportID: baocaoSelect.reportID,
                //     name: baocaoSelect.tsql,
                //     items: JSON.stringify(baocaoRequest)
                // });
                setTimeout(() => {
                    setBaoCaoRequest_VIEW(baocaoRequest);
                    setBaoCaoSelect_VIEW(baocaoSelect);

                   // setdataBaoCao(dataBaoCao.data);
                    setLoading(false);
                }, 1500);
            }
        }
    }

    const exportPDF = (e: any) => {
        if (ref_PDFExport.current) {
            setLoading(true);
            ref_PDFExport.current.save(exportPDFCallback);
        }
    }

    const exportPDFCallback = () => {
        setLoading(false);
    }

    const exportJsPDFLib = (toPdf: any) => {
        setLoading(true);
        toPdf();
    }

    const exportJsPDF = (baocaoItem: any) => {
        setLoading(true);
        var pdf = new jsPDF({
            orientation: (baocaoItem.orientation == 0 ? 'p' : 'l'),
            unit: 'mm',
            format: 'a4'
        });
        html2canvas(refBaoCaoPrint.current, {
            scale: 1,
            logging: true,
            scrollX: 0,
            scrollY: 0
        }).then(canvas => {
            //pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
            pdf.save(baocaoItem.formKey + "_" + moment(new Date()).format("DDMMYYYY-HHmss") + "_.pdf");
            setLoading(false);
        });
    }

    const CheckKhoaSo = async (ngayct: Date) => {
        var getDdata = await reportService.CheckKhoaSo(ngayct);
        setIsKhoaSo(getDdata.data);
    }


    return (
        <Fragment>
            <Spin spinning={loadingPage}>
                <div className="page-pannel">
                    <div className="page-pannel-left page-pannel-left-30">
                        <div className="pannel-left-header">
                            THÔNG TIN BÁO CÁO
                    </div>
                        <div className="pannel-left-body bg-e6e6e6" style={{ position: 'relative' }}>
                            <div className="p-5">

                                <Form.Item wrapperCol={{ span: 24 }}>
                                    <Select
                                        //showAction={["focus"]}
                                        style={{ width: '100%' }}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Nhóm Báo Cáo"
                                        filterOption={false}
                                        onChange={onChangeNhomBC}
                                    >
                                        {modelNhomBC && modelNhomBC.map(d => (
                                            <Option data-name={d.productName} value={d.reportGroupIDid} key={d.reportGroupIDid}>{d.productName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item wrapperCol={{ span: 24 }}>
                                    <Select
                                        //showAction={["focus"]}
                                        style={{ width: '100%' }}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Báo Cáo"
                                        filterOption={false}
                                        onChange={onChangeBC}
                                    >
                                        {filterModelBaoCao && filterModelBaoCao.map(d => (
                                            <Option data-name={d.reportName} value={d.reportID} key={d.reportID}>{d.reportName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Divider style={{ background: '#FFFFFF', marginTop: 10, marginBottom: 10 }} />
                                {filterModelThamSoBaoCao && filterModelThamSoBaoCao.map((item, index) =>
                                    item.getauto ?
                                        <div key={index}></div>
                                        :
                                        <Form.Item key={(baocaoSelect.formKey + item.productNametso)} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label={item.productNametso}>
                                            {getControl(item, index)}
                                        </Form.Item>
                                )}
                                <Divider style={{ background: '#FFFFFF', marginTop: 10, marginBottom: 10 }} />
                                <div className="text-center">
                                    {filterModelThamSoBaoCao && filterModelThamSoBaoCao.length > 0 ?
                                        <div className="inline-bolck">
                                            <Button loading={loading} className="button" type="primary" icon={<PlusOutlined/>} size="small" onClick={e => GetBaoCao(e)}>Xem Báo Cáo</Button>
                                        </div>
                                        :
                                        <div className="inline-bolck">
                                        </div>
                                    }
                                </div>
                                <div style={{ position: "absolute", bottom: 10, width: '100%' }}>
                                    <div className="text-center">
                                        {/* <Pdf
                                        targetRef={refBaoCaoPrint}
                                        filename={baocaoSelect_VIEW.formKey + "_" + moment(new Date()).format("DDMMYYYY-HHmss") + "_.pdf"}
                                        options={{
                                            orientation: (baocaoSelect.orientation == 0 ? 'p' : 'l'),
                                            unit: 'mm',
                                            format: 'a4'
                                        }}
                                        x={4}
                                        onComplete={() => {
                                            setLoading(false);
                                        }}>
                                        {({ toPdf }: any) => <Button className="button" shape="round" type="danger" icon="file-pdf" style={{ marginRight: 5 }} onClick={e => exportJsPDFLib(toPdf)}>PDF</Button>}
                                    </Pdf> */}
                                        {/* <Button className="button" shape="round" type="danger" icon="file-pdf" style={{ marginRight: 5 }} onClick={e => exportPDF(e)}>PDF</Button> */}
                                        {/* <Button className="button" shape="round" type="danger" icon="file-pdf" style={{ marginRight: 5 }} onClick={e => exportJsPDF(baocaoSelect_VIEW)}>PDF</Button> */}
                                        {
                                            isKhoaSo === 1 ?
                                                <ReactToPrint
                                                    trigger={() => <Button className="button" shape="round" type="primary" icon={<PrinterOutlined/>}>PRINT</Button>}
                                                    content={() => refBaoCaoPrint.current ? refBaoCaoPrint.current : eleEmty}
                                                    pageStyle={
                                                        baocaoSelect.orientation == 0 ?
                                                            "@page { size: 21cm 29.7cm; } @media print { body { -webkit-print-color-adjust: exact; } }"
                                                            :
                                                            "@page { size: 29.7cm 21cm; } @media print { body { -webkit-print-color-adjust: exact; } }"
                                                    }
                                                    onBeforePrint={() => {
                                                    }}
                                                />
                                                :
                                                <Tooltip placement="topLeft" title="Bạn không thể in, ngày/tháng bạn tìm kiếm chưa được khóa sổ.">
                                                    <Button className="button" shape="round" type="primary" icon={<PrinterOutlined/>} >PRINT</Button>
                                                </Tooltip>
                                        }
                                        {
                                            baocaoSelect.formKey === '_SP_BC_TONKHO_HH' && dataBaoCao.length > 0 ?
                                                <ExcelFile filename={baocaoSelect.formKey} element={<Button className="button" shape="round" type="primary" icon={<FileExcelOutlined/>} style={{ marginLeft: 5 }}>Excel</Button>}>
                                                    <ExcelSheet data={dataBaoCao} name={baocaoSelect.formKey}>
                                                        <ExcelColumn label="Mã hàng hóa" value="productID" />
                                                        <ExcelColumn label="Tên hàng hóa" value="productName" />
                                                        <ExcelColumn label="Đvt" value="productUnit" />
                                                        <ExcelColumn label="Số lượng" value="lgton" />
                                                        <ExcelColumn label="Đơn giá" value="dongia" />
                                                        <ExcelColumn label="Thành tiền" value="thanhtien" />
                                                        <ExcelColumn label="Ghi Chú" value="description" />
                                                    </ExcelSheet>
                                                </ExcelFile>
                                                :
                                                <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pannel-left-footer">
                        </div>
                    </div>
                    <div className="page-pannel-right page-pannel-right-60">
                        <div className="w-90 mr-auto">
                            <Container isLoading={loading}>
                                <div style={{ height: (window.innerHeight - 130), overflow: "auto", }}>
                                    <PerfectScrollbar>
                                        <PDFExport fileName={baocaoSelect_VIEW.formKey + "_" + moment(new Date()).format("DDMMYYYY-HHmss") + "_.pdf"}
                                            ref={ref_PDFExport}
                                            paperSize={baocaoSelect_VIEW.paperSize}
                                            landscape={baocaoSelect.orientation == 0 ? false : true}
                                            margin="0.5cm">
                                            <PrintTemplate pRef={refBaoCaoPrint} username={userName}>
                                                <div className="print-container">
                                                    {getFromBaoCao(baocaoSelect_VIEW.formKey)}
                                                </div>
                                            </PrintTemplate>
                                        </PDFExport>
                                    </PerfectScrollbar>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </Spin>
        </Fragment>
    )
}
class EmptyComponent extends React.Component {
    render() {
        return null;
    }
}
export default ReportPage;