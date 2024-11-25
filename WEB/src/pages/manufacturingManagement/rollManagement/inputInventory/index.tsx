import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Button, Radio, Input, DatePicker, Modal, InputNumber, message, Checkbox, Select, Tabs, Spin, Upload, Tooltip } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
import IAntdUpload from '../../../../models/iAntdUpload';
import { ComboGrid, GridColumn, DataGrid, TextBox, LinkButton } from 'rc-easyui';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import dayjs from 'dayjs';

import ReactToPrint from 'react-to-print';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, SearchOutlined, VerticalAlignBottomOutlined, WarningOutlined, PrinterOutlined, FileImageOutlined } from '@ant-design/icons';

import { receiptVm } from '../../../../models/receipt'
import cateBranch from '../../../../models/cateBranch';
import cateStore from '../../../../models/cateStore';
import cateCounterparty from '../../../../models/cateCounterparty';
import cateCounterpartyGroup from '../../../../models/cateCounterpartyGroup';
// import QUYCACH_HH from '../../../models/QUYCACH_HH';
import { cateProductVm } from '../../../../models/cateProduct';
import cateSteelType from '../../../../models/cateSteelType';
import cateWidth from '../../../../models/cateWidth';
import cateThickness from '../../../../models/cateThickness';
import cateStandard from '../../../../models/cateStandard';
import cateProductionBatchNo from '../../../../models/cateProductionBatchNo';
import cateGalvanizedOrganization from '../../../../models/cateGalvanizedOrganization';
import receiptRequest from '../../../../models/request/receiptRequest';
import { receiptDetailVm } from '../../../../models/receiptDetail';
import receiptImei from '../../../../models/receiptImei';
import inventoryDetail from '../../../../models/productions/inventoryDetail';
import steelDefectDetail from '../../../../models/steelDefectDetail';

import { APIStatus } from '../../../../configs/APIConfig';
import CBUserAdmintrator from '../../../../components/CBUserAdmintrator/index';
import LoginUtils from '../../../../utils/loginUtils';
// import MoneyUtils from '../../../utils/MoneyUtils';

import ReceiptService from '../../../../services/receiptService';
// import NhapXuamonthIDHoaService from '../../../services/NhapXuamonthIDHoaService';
import CateStoreService from '../../../../services/cateStoreService';
import CateProductService from '../../../../services/cateProductService';
import CateCounterpartyService from '../../../../services/cateCounterpartyService';
import CateBranchService from '../../../../services/cateBranchService';
import CateThicknessService from '../../../../services/cateThicknessService';
import CateWidthService from '../../../../services/cateWidthService';
import CateSteelTypeService from '../../../../services/cateSteelTypeService';
import CateStandardService from '../../../../services/cateStandardService';
import CateProductionBatchNoService from '../../../../services/cateProductionBatchNoService';
import CateGalvanizedOrganizationService from '../../../../services/cateGalvanizedOrganizationService';
import MediaService from '../../../../services/mediaUploadService';

import PrintReceipt from './printReceipt';
import './NhapNLCuon.scss';
import { UploadFile } from 'antd/lib/upload/interface';
import { ShowModal } from '../../../../components/common/index';
import errorModalProps from '../../components/errorModal/index';

const receiptService = new ReceiptService();
// const nhapXuamonthIDHoaService = new NhapXuamonthIDHoaService();
const cateStoreService = new CateStoreService();
const cateProductService = new CateProductService();
const cateCounterpartyService = new CateCounterpartyService();
const cateBranchService = new CateBranchService();
const cateThicknessService = new CateThicknessService();
const cateWidthService = new CateWidthService();
const cateSteelTypeService = new CateSteelTypeService();
const cateStandardService = new CateStandardService();
const cateProductionBatchNoService = new CateProductionBatchNoService();
const cateGalvanizedOrganizationService = new CateGalvanizedOrganizationService();
const mediaService = new MediaService();

const { confirm } = Modal;
const { Option } = Select;
const InputInventory: React.FC = () => {

    const workProcessID = 'XB.01';
    const materialType = 'C';
    const businessID = 'N11';

    const menuKeyNhapNL = 'Nhapnl_cuon';
    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.UserName;
    const branchId = userLoginInfo.BranchId;
    // const isquantri = userLoginInfo.userinfo.isquantri == true ? true : false;
    //const isquantri = true;

    // const iskiemsoatnoibo = userLoginInfo.userinfo.iskiemsoatnoibo == true ? true : false;
    // const iskiemsoatnoibo = true;

    const eleEmty: React.ReactInstance = new EmptyComponent({});
    const refKiemPhieuPrint = useRef<any>(eleEmty);
    const refBarcodePrint = useRef<any>(eleEmty);

    const rf_sohd = useRef<any>(null);
    const rf_vendor = useRef<any>(null);
    const rf_standard = useRef<any>(null);
    const rf_steelType = useRef<any>(null);
    const rf_productionBatchNo = useRef<any>(null);
    const rf_galvanizedOrganization = useRef<any>(null);
    const rf_employeeID = useRef<any>(null);
    const rf_giamua = useRef<any>(null);
    const rf_receiptContent = useRef<any>(null);

    const rf_hanghoa_ctnx = useRef<any>(null);
    const rf_soluong_ctnx = useRef<any>(null);
    const rf_description_ctnx = useRef<any>(null);
    const rf_button_add_ctnx = useRef<any>(null);

    const rf_kho_ctnx = useRef<any>(null);
    const rf_day_ctnx = useRef<any>(null);
    const rf_weight_ctnx = useRef<any>(null);

    const rf_datagrid_imei_ctnx = useRef<any>(null);

    const dateFormat = 'DD/MM/YYYY';
    const [showCanXe, setShowCanXe] = useState(false);
    const [showCanXeLoading, setShowCanXeLoading] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileUpload, setfileUpload] = useState(Array<UploadFile>());
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [showUploadRowIndex, setShowUploadRowIndex] = useState(-1);
    const [spinningLoadCTBang, setSpinningLoadCTBang] = useState(false);
    const [cateMonthInfo, setCateMonthInfo] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [tabActive, setTabActive] = useState('nhap_receiptVm_cuon');
    const [isViewUser, setIsViewUser] = useState(false);
    const [branchInfo, setBranchInfo] = useState((() => {
        let dataInit: cateBranch = {} as any;
        return dataInit;
    }));
    const [modelUserRequest, setModelUserRequest] = useState('');
    const [modelCanXe, setModelCanXe] = useState((() => {
        let dataInit = {
            scaleNo: '',
            licensePlate: '',
            scaleDate: new Date(),
            scaleEmployee: '',
            volumeGoods: 0
        };
        return dataInit;
    }));
    const [modelRequest, setModelRequest] = useState((() => {

        let dataInit = {
            branchID: userLoginInfo.BranchId,
            receiptNo: '',
            frdate: new Date(),
            todate: new Date(),
            counterpartyID: "",
            materialType: 'C',
            businessID: 'N11',
            employeeID: ''
        };
        return dataInit;
    }));
    const dataReceiptVmInit = {
        receiptID: 0,
        branchID: branchId,
        monthID: '',
        receiptDate: new Date(),
        receiptType: 'N',
        materialType: materialType,
        receiptNo: '',
        sophieu: '',
        sohd: '',
        businessID: businessID,
        storeID: "",
        storeIDc: "",
        counterpartyID: '',
        productionPlanID: '',
        employeeCode: '',
        receiptContent: '',
        httt: 'TM',
        unitPrice: 0,
        ctlq: 0,
        chkhau: 0,
        thue: 0,
        isPrintBarCode: false,
        createdBy: userName,
        //option
        // thukho: '',
        // kyhieukho: '',
        quantity: 0,
        tennv: '',
        counterpartyName: '',
        kyhieu: '',
        counterpartyType: '',
        counterpartyGroup: '',
        counterpartyAddress: '',
        standard: '',
        steelType: '',
        vendor: '',
        productionBatchNo: '',
        galvanizedOrganization: '',
        licensePlate: '',
        //steelPrice: 0,
        workProcessID: workProcessID
    }
    const [optionReceipt, setOptionReceipt] = useState((() => {
        let dataInit = { receiptID: 0, receiptNo: '', isupdatectreceiptVm: false, counterctnx: 0, isEditing: false, isSubmit: false };
        return dataInit;
    }));

    const [dataLstReceiptVm, setLstDataReceiptVm] = useState({ loading: true, totalQuantity: 0, lstReceipt: Array<receiptVm>() });
    const [dataLstReceiptVmDefault, setLstDataReceiptVmDefault] = useState(Array<receiptVm>());

    const [dataReceiptVm, setDataReceiptVm] = useState((() => {
        let dataInit: receiptVm = dataReceiptVmInit
        return dataInit;
    }));

    const [dataSelectReceipt, setDataSelectReceipt] = useState((() => {
        let dataInit = { receiptVm: dataReceiptVmInit, receiptID: 0 }
        return dataInit;
    }));

    const [dataInputReceiptDetailVm, setDataInputReceiptDetailVm] = useState((() => {
        let dataInit: receiptDetailVm = {
            receiptDetailID: 0,
            receiptID: 0,
            productID: '',
            calculationUnit: '',
            quantity: 0,
            unitPrice: 0,
            totalAmount: 0,
            scaleNo: '',
            scaleDate: new Date(),
            scaleEmployee: "",
            // employeeIDcan: '',
            // ngaygiocan: new Date(),
            weight: 0,
            totalWeight1: 0,
            totalWeight2: 0,
            totalWeight3: 0,
            isImei: true,
            description: '',
            createDate: new Date(),
            productTypeID: '',
            productName: '',
            vuotton: false,
            index: -1
        };
        return dataInit;
    }));

    const [dataInputReceiptImei, setDataInputReceiptImei] = useState((() => {
        let dataInit: receiptImei = {
            receiptImeiID: 0,
            receiptID: 0,
            receiptDetailID: 0,
            productID: '',
            quantity: 0,
            standard: '',
            steelType: '',
            vendor: '',
            productionBatchNo: '',
            galvanizedOrganization: '',
            steelPrice: '',
            width: '',
            thickness: '',
            weight: 0,
            imei: '',
            specification: businessID,
            description: '',
            sortOrder: 0,
            parentID: 0,
            weight1: 0,
            weight2: 0,
            weight3: 0,
            image: '',
            image2: '',
            image3: '',
            workProcessID: workProcessID,
            createdBy: userName,
            createdDate: ''
        };
        return dataInit;
    }));

    const [dataLstReceiptDetail, setDataLstReceiptDetail] = useState((() => {
        let dataInit: Array<receiptDetailVm> = [] as any;
        return dataInit;
    }));

    const [dataReceiptImei, setDataReceitImeiAPI] = useState((() => {
        let dataInit: Array<receiptImei> = [] as any;
        return dataInit;
    }));

    const [dataSelectReceiptImei, setDataSelectReceiptImei] = useState((() => {
        let dataInit: receiptImei = {} as any;
        return dataInit;
    }));

    const [dataStore, setDataStore] = useState((() => {
        let dataInit: Array<cateStore> = [] as any;
        return dataInit;
    }));

    const [cateCounterparty, setCateCounterparty] = useState((() => {
        let dataInit: Array<cateCounterparty> = [] as any;
        return dataInit;
    }));

    const [cateCounterpartyGroup, setCateCounterpartyGroup] = useState((() => {
        let dataInit: Array<cateCounterpartyGroup> = [] as any;
        return dataInit;
    }));

    const [counterPartySearchModel, setCounterPartySearchModel] = useState((() => {
        let dataInit: Array<cateCounterparty> = [] as any;
        return dataInit;
    }));

    // const [employeeIDModel, setemployeeIDModel] = useState((() => {
    //     let dataInit: Array<cateCounterparty> = [] as any;
    //     return dataInit;
    // }));

    const [cateProductVmModel, setCateProductVmModel] = useState((() => {
        let dataInit: Array<cateProductVm> = [] as any;
        return dataInit;
    }));

    // const [dataQuyCachHH, setDataQuyCachHH] = useState((() => {
    //     let dataInit: Array<QUYCACH_HH> = [] as any;
    //     return dataInit;
    // }));

    const [dataSteelType, setDataSteelType] = useState((() => {
        let dataInit: Array<cateSteelType> = [] as any;
        return dataInit;
    }));

    const [dataCateStandard, setDataCateStandard] = useState((() => {
        let dataInit: Array<cateStandard> = [] as any;
        return dataInit;
    }));

    const [dataCateProductionBatchNo, setDataCateProductionBatchNo] = useState((() => {
        let dataInit: Array<cateProductionBatchNo> = [] as any;
        return dataInit;
    }));

    const [dataCateGalvanizedOrganization, setDataCateGalvanizedOrganization] = useState((() => {
        let dataInit: Array<cateGalvanizedOrganization> = [] as any;
        return dataInit;
    }));

    const [dataWidth, setDataWidth] = useState((() => {
        let dataInit: Array<cateWidth> = [] as any;
        return dataInit;
    }));

    const [dataCateThickness, setDataCateThickness] = useState((() => {
        let dataInit: Array<cateThickness> = [] as any;
        return dataInit;
    }));

    const [optionTONHH, setOptionTONHH] = useState((() => {
        let dataInit = { productName: '', tonhh: 0, lstRDTonHHH: Array<inventoryDetail>() };
        return dataInit;
    }));

    useEffect(() => {
        const Service = new AbortController();
        async function GetData() {

            await CheckMonthIsOpen(modelRequest.todate);
            await GetBrandUserLogin();
            await SearchListReceipt(modelRequest);

            await GetDataStore();

            await GetDataCateCounterparty();
            await GetDataCateCounterpartyGroup();

            await GetListCateProduct();
            // await GetListemployeeID();

            await GetSteelType();
            await GetCateStandard();
            await GetCateProductionBatchNo();
            await GetCateGalvanizedOrganization();
            await GetCateWidth();
            await GetCateThickness();

            setLoadingPage(false);

        };
        GetData();
        return () => {
            Service.abort();
        }
    }, []);

    const CheckMonthIsOpen = async (receiptDate: Date) => {
        var getDdata = await receiptService.CheckMonthIsOpen(dayjs(receiptDate).format("YYYYMM"));
        setCateMonthInfo(getDdata.data);
    }

    const SearchListReceipt = async (request: receiptRequest, callback?: any) => {
        var getDdata = await receiptService.SearchListReceipt(request);
        var totalQuantity = 0;
        if (getDdata.data !== undefined && getDdata.data != null) {
            var data = getDdata.data as Array<receiptVm>;
            data.forEach(ele => {
                totalQuantity += ele.quantity;
            });
        }
        setLstDataReceiptVm({ ...dataLstReceiptVm, loading: true, totalQuantity: totalQuantity, lstReceipt: getDdata.data });
        setLstDataReceiptVmDefault(getDdata.data);
        setTimeout(() => {
            if (callback) callback(getDdata.data);
        }, 300);

    }

    const GetBrandUserLogin = async () => {
        var getDdata = await cateBranchService.GetByID(branchId);
        setBranchInfo(getDdata.data);
    }

    const GetDataStore = async () => {
        var getDdata = await cateStoreService.GetListStoreByTypeBranchId('02', branchId);
        setDataStore(getDdata.data);
    }

    const GetDataCateCounterparty = async (counterpartyGroup = 'NVL') => {
        var getDdata = await cateCounterpartyService.GetListGetVendorByGroupId(counterpartyGroup);
        setCateCounterparty(getDdata.data);
        if (counterPartySearchModel && counterPartySearchModel.length <= 0) {
            setCounterPartySearchModel(getDdata.data);
        }
    }

    const GetDataCateCounterpartyGroup = async () => {
        var getDdata = await cateCounterpartyService.GetListCounterPartyGroup('CC', true);
        setCateCounterpartyGroup(getDdata.data);
    }

    const GetListemployeeID = async () => {
        // var getDdata = await cateCounterpartyService.GetListDoiTac('NV', '');
        // setemployeeIDModel(getDdata.data);
    }

    const GetListCateProduct = async () => {
        var getDdata = await cateProductService.GetListCateProduct({ productID: '', productName: '', productTypeID: '', menukey: menuKeyNhapNL });
        setCateProductVmModel(getDdata.data);
    }

    const GetSteelType = async () => {
        var getDdata = await cateSteelTypeService.GetList();
        setDataSteelType(getDdata.data);
    }

    const GetCateStandard = async () => {
        var getDdata = await cateStandardService.GetList();
        setDataCateStandard(getDdata.data);
    }

    const GetCateProductionBatchNo = async () => {
        var getDdata = await cateProductionBatchNoService.GetList();
        setDataCateProductionBatchNo(getDdata.data);
    }

    const GetCateGalvanizedOrganization = async () => {
        var getDdata = await cateGalvanizedOrganizationService.GetList();
        setDataCateGalvanizedOrganization(getDdata.data);
    }

    const GetCateWidth = async () => {
        var getDdata = await cateWidthService.GetListCateWidthByType("C");
        setDataWidth(getDdata.data);
    }

    const GetCateThickness = async () => {
        var getDdata = await cateThicknessService.GetList();
        setDataCateThickness(getDdata.data);
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setDataReceiptVm({ ...dataReceiptVm, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const GetReceiptNo = async (ngay: Date) => {

        var ngatct = moment(ngay, 'YYYY/MM/DD');
        var month = ngatct.format('YYYYMM');
        var data = await receiptService.GetReceiptNoOfReceipt({
            branchID: branchId,
            frdate: ngay,
            materialType: 'C',
            businessID: 'N11',
            receiptNo: '',
            todate: ngay,
            counterpartyID: '',
            employeeID: ''
        });
        var counterpartyID = '', tennhacc = '', counterpartyAddress = '', counterpartyGroup = '', employeeCode = '';
        setDataReceiptVm({
            ...dataReceiptVm,
            receiptID: 0,
            // sophieu: data.data,
            receiptNo: data.data,
            monthID: month,
            // storeID: "",
            // storeIDc: "",
            counterpartyID: counterpartyID,
            counterpartyName: tennhacc,
            counterpartyAddress: counterpartyAddress,
            counterpartyGroup: counterpartyGroup,
            employeeCode: employeeCode,
            standard: '',
            productionBatchNo: '',
            steelType: '',
            galvanizedOrganization: '',
            //steelPrice: 0,
            workProcessID: workProcessID
        });

        if (rf_sohd.current) {
            rf_sohd.current.focus();
        }

    }


    const onChangeReceiptDate = async (date: any, dateString: string) => {
        setDataReceiptVm({ ...dataReceiptVm, receiptDate: date });
        // setModelRequest({ ...modelRequest, frdate: date, todate: date }); 
        await CheckMonthIsOpen(date);
        await SearchListReceipt({
            branchID: branchId,
            receiptNo: '',
            frdate: date,
            todate: date,
            counterpartyID: '',
            materialType: materialType,
            businessID: businessID,
            employeeID: ''
        });
        cancelReceipt(null, date);
    }

    const onChangeStore = (value: any) => {
        setDataReceiptVm({ ...dataReceiptVm, storeID: value, storeIDc: value });
    }

    const onChangecateCounterparty = (value: any, option: any) => {
        var nhacungcap = cateCounterparty.find((element) => {
            return element.counterpartyID === value;
        });
        var nhacungcapItem = nhacungcap || { counterpartyName: '', counterpartyAddress: '' };
        const kyhieu = option.props['data-kyhieu'];
        setDataReceiptVm({ ...dataReceiptVm, counterpartyID: value, counterpartyName: nhacungcapItem.counterpartyName, counterpartyAddress: nhacungcapItem.counterpartyAddress, kyhieu: kyhieu, counterpartyGroup: nhacungcap!.counterpartyGroup });
        if (rf_standard.current) {
            rf_standard.current.focus();
        }
    }

    const handleFilterNhaCC = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const onChangecateCounterpartyGroup = async (value: any, option: any) => {
        setDataReceiptVm({
            ...dataReceiptVm,
            counterpartyGroup: value,
            counterpartyID: '',
            counterpartyName: '',
            counterpartyAddress: '',
            kyhieu: ''
        });
        const captren = option.props['data-captren'];
        await GetDataCateCounterparty(value);
    }

    const onChangeSteelType = (value: any) => {
        setDataReceiptVm({ ...dataReceiptVm, steelType: value });
        UpdateGridCTIMEIByNXHH('steelType', value);
        if (rf_productionBatchNo.current) {
            rf_productionBatchNo.current.focus();
        }
    }

    const onChangeCateStandard = (value: any) => {
        setDataReceiptVm({ ...dataReceiptVm, standard: value });
        UpdateGridCTIMEIByNXHH('standard', value);
        if (rf_steelType.current) {
            rf_steelType.current.focus();
        }
    }

    const onChangeCateProductionBatchNo = (value: any) => {
        setDataReceiptVm({ ...dataReceiptVm, productionBatchNo: value });
        UpdateGridCTIMEIByNXHH('productionBatchNo', value);
        if (rf_galvanizedOrganization.current) {
            rf_galvanizedOrganization.current.focus();
        }
    }

    const onchangeDVMAGCNL = (value: any) => {
        setDataReceiptVm({ ...dataReceiptVm, galvanizedOrganization: value });
        UpdateGridCTIMEIByNXHH('galvanizedOrganization', value);
        if (rf_employeeID.current) {
            rf_employeeID.current.focus();
        }
    }

    const onChangeemployeeID = async (value: any, option: any) => {
        setDataReceiptVm({ ...dataReceiptVm, employeeCode: value || '' });
        if (rf_giamua.current) {
            rf_giamua.current.focus();
            rf_giamua.current.select();
        }
    }

    const onChangesteelPrice = (value: any) => {
        const floatValue = value.floatValue || 0;
        setDataReceiptVm({ ...dataReceiptVm, steelPrice: value.value });
        UpdateGridCTIMEIByNXHH('steelPrice', value.value);
    }

    const UpdateGridCTIMEIByNXHH = (field: string, value: any) => {
        var isUpdate = true;
        var datas = [...dataReceiptImei];
        if (datas.length > 0) {
            datas.forEach(item => {
                (item as any)[field] = value;
            });
            isUpdate = true;
        }
        if (isUpdate) {
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                setDataReceitImeiAPI(datas);
            }, 300);
        }
    }

    const handleFilteremployeeID = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const onSelectReceiptDetail = async (value: any) => {

        var hanghoa = cateProductVmModel.find((element) => {
            return element.productID === value;
        });
        var hanghoaItem = hanghoa || { ma: '', productUnit: '', productName: '', productTypeID: '' };

        var calculationUnit = '';
        // var quycachHH = await hangHoaService.GetListQuyCach(value);
        // setDataQuyCachHH(quycachHH.data);
        // if (quycachHH.data.length > 0) {
        //     if (quycachHH.data) {
        //         calculationUnit = quycachHH.data[0].quycach;
        //     }
        // }
        // else {

        // }
        calculationUnit = hanghoaItem.productUnit;
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, receiptDetailID: 0, quantity: 0, description: '', productID: value, calculationUnit: calculationUnit, productName: hanghoaItem.productName, productTypeID: hanghoaItem.productTypeID });

        var ngatct = moment(dataReceiptVm.receiptDate, 'YYYY/MM/DD');
        var month = ngatct.format('YYYYMM');

        const khohanghoa = dataReceiptVm.storeID !== '' ? dataReceiptVm.storeID : (dataStore.length > 0 ? dataStore[0].storeID : '');
        const monthID = dataReceiptVm.monthID !== '' ? dataReceiptVm.monthID : month;
        // var itemTonHHInfo = await ReceiptService.ListChiTietTonKhoNL({ steelType: materialType, storeID: khohanghoa, mahh: value, monthID: monthID });
        // const totalSoluongTon = itemTonHHInfo.data.reduce((soluong, obj) => {
        //     return soluong + obj.soluong;
        // }, 0);
        // setOptionTONHH({ ...optionTONHH, productName: hanghoaItem.ten, tonhh: totalSoluongTon, lstRDTonHHH: itemTonHHInfo.data });

    }

    const onChangeQuantityReceiptDetail = (value: any) => {
        const floatValue = value.floatValue || 0;
        const thanhtien = ((floatValue || 0) * dataInputReceiptDetailVm.unitPrice);
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, quantity: floatValue, totalAmount: thanhtien });
    }

    const onChangeDescriptionReceiptDetail = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, description: value });
        const _dataLstReceiptDetail = Object.assign(Array<receiptDetailVm>(), dataLstReceiptDetail);
        if (_dataLstReceiptDetail.length > 0) {
            _dataLstReceiptDetail[0].description = value;
            setDataLstReceiptDetail(_dataLstReceiptDetail);
        }
    }

    const onSelectTable_IMEI_CTNXHH = async (selection: receiptImei) => {
        setDataInputReceiptImei(selection);
        setDataSelectReceiptImei(selection);
    }

    const onSelectKho_CT_CTNXHH = async (value: any, option: any) => {
        setDataInputReceiptImei({ ...dataInputReceiptImei, width: value });
    }

    const onSelectDay_CT_CTNXHH = async (value: any, option: any) => {
        setDataInputReceiptImei({ ...dataInputReceiptImei, thickness: value });
    }

    const onChangeWeightReceiptImei = (value: any) => {
        const floatValue = (value.floatValue || 0);
        if(floatValue != null && floatValue > 0){
            setDataInputReceiptImei({ ...dataInputReceiptImei, weight1: floatValue });
        }
    }

    const onChangeGhiChu_CT_CTNXHH = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setDataInputReceiptImei({ ...dataInputReceiptImei, description: value });
    }

    const UpdateAlreceiptType_CTNXNL = (e: any, type: string) => {
        var isUpdate = true;
        var datas = [...dataReceiptImei];
        switch (type) {
            case 'steelType':
                if (dataInputReceiptImei.steelType === '' || dataInputReceiptImei.steelType === null) {
                    message.error('Vui lòng chọn loại nguyên liệu');
                    isUpdate = false;
                }
                else {
                    datas.forEach(item => {
                        item.steelType = dataInputReceiptImei.steelType;
                    });
                }
                break;
            case 'width':
                if (dataInputReceiptImei.width === '' || dataInputReceiptImei.width === null) {
                    message.error('Vui lòng chọn khổ nguyên liệu');
                    isUpdate = false;
                }
                else {
                    datas.forEach(item => {
                        item.width = dataInputReceiptImei.width;
                    });
                }
                break;
            case 'thickness':
                if (dataInputReceiptImei.thickness === '' || dataInputReceiptImei.thickness === null) {
                    message.error('Vui lòng chọn dày nguyên liệu');
                    isUpdate = false;
                }
                else {
                    datas.forEach(item => {
                        item.thickness = dataInputReceiptImei.thickness;
                    });
                }
                break;
            case 'weight1':
                if (dataInputReceiptImei.weight1 === 0 || dataInputReceiptImei.weight1 === null) {
                    message.error('Vui lòng nhập số kg');
                    isUpdate = false;
                }
                else {
                    datas.forEach(item => {
                        item.weight = dataInputReceiptImei.weight1;
                        item.weight1 = dataInputReceiptImei.weight1;
                    });
                }
                break;
            case 'description':
                datas.forEach(item => {
                    item.description = dataInputReceiptImei.description;
                });
                break;
        }
        if (isUpdate) {
            setSpinningLoadCTBang(true);
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                setDataReceitImeiAPI(datas);
                rf_datagrid_imei_ctnx.current.cancelEdit();
                setSpinningLoadCTBang(false);
            }, 300);
        }
    }

    const UpdateAlreceiptType_Image_CTNXNL = (value: string, type: string, rowIndex: number) => {
        var isUpdate = true;
        var datas = [...dataReceiptImei];
        switch (type) {
            case 'image':
                datas.forEach((item, index) => {
                    if (index === rowIndex) {
                        item.image = value;
                    }
                });
                break;
            case 'image2':
                datas.forEach((item, index) => {
                    if (index === rowIndex) {
                        item.image2 = value;
                    }
                });
                break;
            case 'image3':
                datas.forEach((item, index) => {
                    if (index === rowIndex) {
                        item.image3 = value;
                    }
                });
                break;
            default:
                isUpdate = false;
                break;
        }
        if (isUpdate) {
            setSpinningLoadCTBang(true);
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                setDataReceitImeiAPI(datas);
                setSpinningLoadCTBang(false);
                rf_datagrid_imei_ctnx.current.cancelEdit();
            }, 300);
        }
    }

    const AddReceiptDetailAndImei = (e: any) => {

        if (dataReceiptVm.counterpartyID === null || dataReceiptVm.counterpartyID === '') {
            message.error('Vui lòng chọn nhà cung cấp');
            return false;
        }

        if (dataReceiptVm.standard === null || dataReceiptVm.standard === '') {
            message.error('Vui lòng tiêu chuẩn');
            return false;
        }

        if (dataReceiptVm.steelType === null || dataReceiptVm.steelType === '') {
            message.error('Vui lòng loại nguyên liệu');
            return false;
        }

        if (dataReceiptVm.productionBatchNo === null || dataReceiptVm.productionBatchNo === '') {
            message.error('Vui lòng chọn số lô');
            return false;
        }

        if (dataReceiptVm.galvanizedOrganization === null || dataReceiptVm.galvanizedOrganization === '') {
            message.error('Vui lòng chọn đơn vị mạ');
            return false;
        }

        if (dataReceiptVm.steelPrice === null ||  dataReceiptVm.steelPrice == null || dataReceiptVm.steelPrice!.length <= 0 ) {
            message.error('Vui lòng nhập giá nhập');
            return false;
        }

        if (dataInputReceiptDetailVm.productID == '' || dataInputReceiptDetailVm.productID == null || dataInputReceiptDetailVm.productID == undefined) {
            message.error('Vui lòng chọn hàng hóa');
            if (rf_hanghoa_ctnx.current)
                rf_hanghoa_ctnx.current.focus();
            return false;
        }

        if (dataInputReceiptDetailVm.quantity <= 0) {
            message.error('Vui lòng nhập số lượng');
            if (rf_soluong_ctnx.current) {
                rf_soluong_ctnx.current.focus();
                rf_soluong_ctnx.current.select();
            }
            return false;
        }

        var lstReceiptDetail = Array<receiptDetailVm>();
        lstReceiptDetail.push(dataInputReceiptDetailVm);
        setDataLstReceiptDetail(lstReceiptDetail);

        if (dataInputReceiptDetailVm.receiptDetailID <= 0) {
            var chitietNhapXuat = [...dataReceiptImei];
            for (var i = (dataReceiptImei.length + 1); i <= dataInputReceiptDetailVm.quantity; i++) {
                chitietNhapXuat.push({
                    receiptImeiID: 0,
                    receiptID: 0,
                    receiptDetailID: 0,
                    productID: dataInputReceiptDetailVm.productID,
                    quantity: 1,
                    standard: dataReceiptVm.standard,
                    steelType: dataReceiptVm.steelType,
                    vendor: dataReceiptVm.counterpartyID,
                    productionBatchNo: dataReceiptVm.productionBatchNo,
                    galvanizedOrganization: dataReceiptVm.galvanizedOrganization,
                    steelPrice: dataReceiptVm.steelPrice ?? "",
                    thickness: '',
                    width: '',
                    weight: 0,
                    imei: '',
                    specification: '',
                    description: '',
                    sortOrder: i,
                    parentID: 0,
                    weight1: 0,
                    weight2: 0,
                    weight3: 0,
                    image: '',
                    image2: '',
                    image3: '',
                    workProcessID: workProcessID,
                    createdDate: new Date().toString(),
                    createdBy: userName
                })
            }
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                setDataReceitImeiAPI(chitietNhapXuat);
            }, 300);
        }
    }

    const formatsteelPrice = (value: string) => {
        if (value.length < 6) {
            var _steelPrice = '';
            for (var i = 1; i <= (6 - value.length); i++) {
                _steelPrice += '0';
            }
            return _steelPrice + value;
        }
        return value;
    }

    const addReceipt = async (e: any) => {
        let datePickupBackup = dataReceiptVm.receiptDate;
        setDataReceiptVm({ ...dataReceiptVmInit, receiptDate: datePickupBackup });
        if (cateMonthInfo == false) {
            message.error('Ngày ' + moment(dataReceiptVm.receiptDate).format(dateFormat) + ' đã khóa sổ');
            return false;
        }
        else {
            cancelReceipt(null, new Date());
            setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: dataReceiptVmInit, receiptID: -1 });
            await GetReceiptNo(dataReceiptVm.receiptDate);
            const hanghoa = [...cateProductVmModel][0];
            await onSelectReceiptDetail(hanghoa.productID);
            setOptionReceipt({ ...optionReceipt, isupdatectreceiptVm: false, isEditing: true });

            if (rf_vendor.current) {
                rf_vendor.current.focus();
            }
            setTimeout(() => {
                setDataReceitImeiAPI([]);
            }, 300);

        }

    }

    const EditReceipt = (e: any) => {

        if (cateMonthInfo == false) {
            message.error('Ngày ' + moment(dataReceiptVm.receiptDate).format(dateFormat) + ' đã khóa sổ');
            return false;
        }
        else {

            if (optionReceipt.receiptID <= 0) {
                message.error('Vui lòng chọn thông tin nhập xuất để sửa');
                return false;
            }
            setOptionReceipt(prevState => ({ ...prevState, isupdatectnxhh: false, isEditing: true }));

            if (rf_receiptContent.current) {
                rf_receiptContent.current.focus();
            }

        }

    }

    const DeleteReceipt = async (e: any) => {

        if (cateMonthInfo == false) {
            message.error('Ngày ' + moment(dataReceiptVm.receiptDate).format(dateFormat) + ' đã khóa sổ');
            return false;
        }
        else {

            if (optionReceipt.receiptID <= 0) {
                message.error('Vui lòng chọn thông tin nhập xuất để xóa');
                return false;
            }

            confirm({
                title: 'Xác nhận',
                content: 'Bạn có chắc muốn xóa số chứng từ: ' + optionReceipt.receiptNo + '?',
                onOk() {
                    OnDeletedReceipt(e);
                },
                onCancel() { },
            });
        }
    }

    const OnDeletedReceipt = async (e: any) => {
        var reDelete = await receiptService.DeleteReceipt(optionReceipt.receiptID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            await SearchListReceipt({
                branchID: branchId,
                receiptNo: '',
                frdate: modelRequest.frdate,
                todate: modelRequest.todate,
                counterpartyID: '',
                materialType: materialType,
                businessID: businessID,
                employeeID: ''
            });
            await cancelReceipt(e);
        }
    }

    const handleKeyDownInput = (e: any) => {
        if (e.key === 'Enter') {
            switch (e.currentTarget.name) {
                case 'steelPrice':
                    if (rf_receiptContent.current) {
                        rf_receiptContent.current.focus();
                    }
                    break;
                case 'receiptContent':
                    if (rf_soluong_ctnx.current) {
                        rf_soluong_ctnx.current.focus();
                        rf_soluong_ctnx.current.select();
                    }
                    break;
                case 'quantity':
                    if (rf_description_ctnx.current) {
                        rf_description_ctnx.current.focus();
                        rf_description_ctnx.current.select();
                    }
                    break;
                case 'description':
                    if (rf_button_add_ctnx.current) {
                        rf_button_add_ctnx.current.buttonNode.focus();
                    }
                    break;
                default:
                    break;
            }
        }
    }

    const handleKeyDownInput_Sokg = async (e: any, index: number) => {
        if (e.key === 'Enter') {
            setSpinningLoadCTBang(true);
            let { name, value } = e.target;
            var weight = value.replace(/,/g, '');
            if(weight > 0 ){
                const _dataReceiptImei = [...dataReceiptImei];
            _dataReceiptImei[index].weight1 = weight;
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                rf_datagrid_imei_ctnx.current.cancelEdit();
                setDataReceitImeiAPI(_dataReceiptImei);
                setDataInputReceiptImei({ ...dataInputReceiptImei, weight1: value });
                rf_datagrid_imei_ctnx.current.scrollTo(_dataReceiptImei[index]);
                setSpinningLoadCTBang(false);
            }, 400);
            }
            
        }
    }

    const handleOnBlurInput_Sokg = (e: any, index: number) => {
        setSpinningLoadCTBang(true);
        let { name, value } = e.target;
        var weight = value.replace(/,/g, '');
        const _dataReceiptImei = [...dataReceiptImei];
        _dataReceiptImei[index].weight = weight;
        setDataReceitImeiAPI([]);
        setTimeout(() => {
            rf_datagrid_imei_ctnx.current.cancelEdit();
            setDataReceitImeiAPI(_dataReceiptImei);
            setDataInputReceiptImei({ ...dataInputReceiptImei, weight: value });
            rf_datagrid_imei_ctnx.current.scrollTo(_dataReceiptImei[index]);
            setSpinningLoadCTBang(false);
        }, 400);
    }


    const onSelectKho_Inrow_CTNXHH = async (value: any, option: any, index: number) => {
        setSpinningLoadCTBang(true);
        const _dataReceiptImei = [...dataReceiptImei];
        _dataReceiptImei[index].width = value;
        setDataReceitImeiAPI([]);
        setTimeout(() => {
            rf_datagrid_imei_ctnx.current.cancelEdit();
            setDataReceitImeiAPI(_dataReceiptImei);
            setDataInputReceiptImei({ ...dataInputReceiptImei, width: value });
            rf_datagrid_imei_ctnx.current.scrollTo(_dataReceiptImei[index]);
            setSpinningLoadCTBang(false);
        }, 400);
    }

    const onSelectDay_Inrow_CTNXHH = async (value: any, option: any, index: number) => {
        setSpinningLoadCTBang(true);
        const _dataReceiptImei = [...dataReceiptImei];
        _dataReceiptImei[index].thickness = value;
        setDataReceitImeiAPI([]);
        setTimeout(() => {
            rf_datagrid_imei_ctnx.current.cancelEdit();
            setDataReceitImeiAPI(_dataReceiptImei);
            setDataInputReceiptImei({ ...dataInputReceiptImei, thickness: value });
            rf_datagrid_imei_ctnx.current.scrollTo(_dataReceiptImei[index]);
            setSpinningLoadCTBang(false);
        }, 400);
    }

    const onSelectReceipt = async (selection: receiptVm, dataInit?: Array<receiptVm>) => {

        if (optionReceipt.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: dataReceiptVmInit, receiptID: -1 });
        }
        else {
            setLoadingPage(true);
            var receiptVm: receiptVm = dataReceiptVmInit;
            if (dataInit) {
                receiptVm = dataInit.find((element) => {
                    return element.receiptID === selection.receiptID;
                }) || dataReceiptVmInit;
            }
            else {
                receiptVm = dataLstReceiptVmDefault.find((element) => {
                    return element.receiptID === selection.receiptID;
                }) || dataReceiptVmInit;
            }
            if (receiptVm) {
                receiptVm.receiptDate = new Date(receiptVm.receiptDate);
            }
            var receiptVmItem = receiptVm || dataReceiptVmInit;

            setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: receiptVmItem });
            // setModelUserRequest(receiptVmItem.qtri);

            var lstRDNXandIMEI = await receiptService.GetListReDetail_AND_ReIMEI(selection.receiptID);
            if (lstRDNXandIMEI) {
                var lstRD = lstRDNXandIMEI.data.listReceiptDetails as Array<receiptDetailVm>;
                var lstimei = lstRDNXandIMEI.data.listReceiptImeis as Array<receiptImei>;
                if (lstRD && lstRD.length > 0) {
                    for (var i = 0; i < lstRD.length; i++) {
                        lstRD[i].sortOrder = i + 1;
                    }
                }
                setDataLstReceiptDetail(lstRD);
                setDataInputReceiptDetailVm(lstRD[0]);
                if (lstimei && lstimei.length > 0) {
                    receiptVmItem.standard = lstimei[0].standard;
                    receiptVmItem.steelType = lstimei[0].steelType;
                    receiptVmItem.productionBatchNo = lstimei[0].productionBatchNo;
                    receiptVmItem.galvanizedOrganization = lstimei[0].galvanizedOrganization;
                    receiptVmItem.steelPrice = lstimei[0].steelPrice;
                    // receiptVmItem.receiptDate = lstRD[0].createDate;
                    receiptVmItem.businessID = "N11"
                } else {
                    receiptVmItem.standard = "Không có dữ liệu";
                    receiptVmItem.steelType = "Không có dữ liệu";
                    receiptVmItem.productionBatchNo = "Không có dữ liệu";
                    receiptVmItem.galvanizedOrganization = "Không có dữ liệu";
                    receiptVmItem.steelPrice = "Không có dữ liệu";
                    receiptVmItem.receiptDate = new Date();
                    receiptVmItem.businessID = "Không có dữ liệu";
                }
                setDataReceitImeiAPI(lstimei);

                // var itemTonHHInfo = await ReceiptService.ListChiTietTonKhoNL({ steelType: 'C', storeID: receiptVm.storeID, mahh: lstRD[0].mahh, monthID: receiptVm.monthID });
                // const totalSoluongTon = itemTonHHInfo.data.reduce((soluong, obj) => {
                //     return soluong + obj.soluong;
                // }, 0);
                // setOptionTONHH({ ...optionTONHH, productName: lstRD[0].productName, tonhh: totalSoluongTon, lstRDTonHHH: itemTonHHInfo.data });

                // var scaleDateXe = new Date(lstRD[0].ngaygiocan);
                // setModelCanXe({
                //     sophieucan: lstRD[0].sophieucan,
                //     licensePlate: receiptVmItem.licensePlate,
                //     scaleDate: scaleDateXe.getFullYear() === 1 ? new Date() : scaleDateXe,
                //     scaleEmployee: receiptVmItem.employeeID,
                //     volumeGoods: lstRD[0].volumeGoods2
                // });

            }

            setDataReceiptVm(receiptVmItem);

            await CheckMonthIsOpen(receiptVmItem.receiptDate);

            setOptionReceipt(prevState => ({
                ...prevState,
                counterctnx: 0,
                isEditing: false,
                isSubmit: false,
                receiptID: selection.receiptID,
                receiptNo: selection.receiptNo
            }));

            setDataInputReceiptImei({
                ...dataInputReceiptImei,
                receiptImeiID: 0,
                receiptID: 0,
                receiptDetailID: 0,
                productID: '',
                quantity: 0,
                vendor: '',
                steelType: '',
                width: '',
                thickness: '',
                weight: 0,
                imei: '',
                specification: '',
                description: '',
                sortOrder: 0,
                parentID: 0,
                weight1: 0,
                weight2: 0,
                weight3: 0
            });
            setLoadingPage(false);
        }

    }

    const saveReceipt = async (e: any) => {

        e.preventDefault();

        if (dataReceiptVm.storeID === '') {
            message.error('Vui lòng chọn kho hàng');
            return false;
        }
        if (dataReceiptVm.counterpartyID === '') {
            message.error('Vui lòng chọn nhà cung cấp');
            return false;
        }

        if (dataLstReceiptDetail.length <= 0) {
            message.error('Vui lòng nhập chi tiết nguyên liệu');
            return false;
        }
        setOptionReceipt({ ...optionReceipt, isSubmit: true });
        let totalWeight1 = 0;
        for (var i = 0; i < dataReceiptImei.length; i++) {
            totalWeight1 += dataReceiptImei[i].weight1;
        }
        dataLstReceiptDetail[0].totalWeight1 = totalWeight1;
        dataLstReceiptDetail[0].unitPrice = parseFloat(dataReceiptVm.steelPrice ?? "0");
        dataLstReceiptDetail[0].totalAmount = dataLstReceiptDetail[0].quantity * dataLstReceiptDetail[0].unitPrice;
        var data = await receiptService.UpdateReceipt(dataReceiptVm, dataLstReceiptDetail, dataReceiptImei);
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionReceipt({ ...optionReceipt, isSubmit: false });
        }
        else {
            message.success('Nhập nguyên liệu thành công');
            //setTabActive('nhap_receiptVm_cuon');
            cancelReceipt(e);
            await SearchListReceipt({
                branchID: branchId,
                receiptNo: '',
                frdate: modelRequest.frdate,
                todate: modelRequest.todate,
                counterpartyID: '',
                materialType: materialType,
                businessID: businessID,
                employeeID: ''
            }, function (datas: Array<receiptVm>) {
                var nxhhItem = datas.find((element) => {
                    return element.receiptID === data.data;
                });
                if (nxhhItem) {
                    onSelectReceipt(nxhhItem, datas);
                }
            });
        }
    }

    const ShowTruckScaleReceipt = async (e: any) => {
        setShowCanXe(true);
    }

    const cancelReceipt = async (e: any, receiptDate?: Date) => {

        if (dataReceiptVm.receiptID > 0 && optionReceipt.isEditing) {

            var itemNXNL = dataLstReceiptVm.lstReceipt.find((element) => {
                return element.receiptID === dataReceiptVm.receiptID;
            }) || dataReceiptVmInit;

            if (itemNXNL) {

                itemNXNL.receiptDate = new Date(itemNXNL.receiptDate);
                setDataReceiptVm(itemNXNL);
                setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: itemNXNL });

                var lstRDNXandIMEI = await receiptService.GetListReDetail_AND_ReIMEI(itemNXNL.receiptID);
                if (lstRDNXandIMEI) {

                    var lstRD = lstRDNXandIMEI.data.ctreceiptVms as Array<receiptDetailVm>;
                    var lstimei = lstRDNXandIMEI.data.ctnxn_imeils as Array<receiptImei>;

                    setDataLstReceiptDetail(lstRD);
                    setDataReceitImeiAPI(lstimei);

                }

                setOptionReceipt(prevState => ({
                    ...prevState,
                    counterctnx: 0,
                    isEditing: false,
                    isSubmit: false,
                    receiptID: itemNXNL.receiptID,
                    receiptNo: itemNXNL.receiptNo
                }));

            }
        }
        else {

            setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: dataReceiptVmInit, receiptID: -1 });
            setOptionReceipt({ ...optionReceipt, receiptID: 0, receiptNo: '', counterctnx: 0, isEditing: false, isSubmit: false });

            var _receiptDate = moment(receiptDate || dataReceiptVm.receiptDate, 'YYYY/MM/DD');
            var _month = _receiptDate.format('YYYYMM');

            setDataReceiptVm({
                ...dataReceiptVm,
                receiptID: 0,
                branchID: branchId,
                monthID: '',
                receiptDate: receiptDate || dataReceiptVm.receiptDate,
                receiptType: 'N',
                materialType: materialType,
                receiptNo: '',
                sophieu: '',
                sohd: '',
                licensePlate: '',
                businessID: businessID,
                // storeID: "",
                // storeIDc: "",
                counterpartyID: '',
                productionPlanID: '',
                employeeCode: '',
                receiptContent: '',
                httt: 'TM',
                unitPrice: 0,
                ctlq: 0,
                chkhau: 0,
                thue: 0,
                isPrintBarCode: false,
                createdBy: userName,
                createdDate: new Date(),
                //option
                quantity: 0,
                tennv: '',
                counterpartyName: '',
                kyhieu: '',
                counterpartyType: '',
                counterpartyGroup: '',
                counterpartyAddress: '',
                workProcessID: workProcessID
            });

            setDataLstReceiptDetail([]);
            setDataReceitImeiAPI([]);

            setDataInputReceiptDetailVm({
                ...dataInputReceiptDetailVm,
                receiptDetailID: 0,
                receiptID: 0,
                productID: '',
                calculationUnit: '',
                quantity: 0,
                totalAmount: 0,
                unitPrice: 0,
                weight: 0,
                totalWeight1: 0,
                totalWeight2: 0,
                totalWeight3: 0,
                isImei: true,
                description: '',
                createDate: new Date(),
                productTypeID: '',
                productName: '',
                vuotton: false,
                index: -1
            });
            setDataInputReceiptImei({
                ...dataInputReceiptImei,
                receiptImeiID: 0,
                receiptID: 0,
                receiptDetailID: 0,
                productID: '',
                quantity: 0,
                vendor: '',
                steelType: '',
                width: '',
                thickness: '',
                weight: 0,
                imei: '',
                specification: '',
                description: '',
                sortOrder: 0,
                parentID: 0,
                weight1: 0,
                weight2: 0,
                weight3: 0
            });

            setOptionTONHH({
                ...optionTONHH,
                productName: '',
                tonhh: 0,
                lstRDTonHHH: Array<inventoryDetail>()
            });
        }

    }

    const onChangeSearchFrDate = async (date: any, dateString: string) => {
        setModelRequest({ ...modelRequest, frdate: date });
    }

    const onChangeSearchToDate = async (date: any, dateString: string) => {
        setModelRequest({ ...modelRequest, todate: date });
    }

    const onchangeCounterPartySearch = (value: any) => {
        setModelRequest({ ...modelRequest, counterpartyID: value });
    }

    const handleFilterCounterPartySearch = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const onChangeReceiptNoSearch = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModelRequest({ ...modelRequest, receiptNo: value });
    }

    const handleChangeCheckBoxSearchQuanTri = async (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setIsViewUser(checked);
        // if (checked) {
        //     const _dataLstNXHH = dataLstNXHHDefault.filter(el => {
        //         return el.qtri === modelUserRequest;
        //     });
        //     var totalQuantity = 0;
        //     _dataLstNXHH.forEach(ele => {
        //         totalQuantity += ele.totalQuantity;
        //     });
        //     setLstDataNXHH({ ...dataLstNXHH, totalQuantity: totalQuantity, lstNXHH: _dataLstNXHH });
        // }
        // else {
        //     await GetListNXHH(modelRequest);
        // }
    }

    const OnChangeCBQuanTri = (value: any) => {
        setModelUserRequest(value);
        if (isViewUser) {
            // const _dataLstNXHH = dataLstNXHHDefault.filter(el => {
            //     return el.qtri === value;
            // });
            // var totalQuantity = 0;
            // _dataLstNXHH.forEach(ele => {
            //     totalQuantity += ele.totalQuantity;
            // });
            // setLstDataNXHH({ ...dataLstNXHH, totalQuantity: totalQuantity, lstNXHH: _dataLstNXHH });
        }
    }

    const SeachNXNL = async (e: any) => {
        e.preventDefault();
        await SearchListReceipt(modelRequest);
    }


    const showFormUploadFile = (sortOrder: number) => {
        setfileUpload([]);
        setShowUploadRowIndex(sortOrder);
        if (dataReceiptImei.length > 0) {
            var dataHangHoang = dataReceiptImei[sortOrder];
            var listFile = [] as any;

            listFile.push({
                uid: '-1',
                name: dataHangHoang.image,
                status: 'done',
                url: dataHangHoang.image != '' && dataHangHoang.image != null ? mediaService.GetFile(dataHangHoang.image) : ''
            });

            listFile.push({
                uid: '-2',
                name: dataHangHoang.image2,
                status: 'done',
                url: dataHangHoang.image2 != '' && dataHangHoang.image2 != null ? mediaService.GetFile(dataHangHoang.image2) : ''
            });

            listFile.push({
                uid: '-3',
                name: dataHangHoang.image,
                status: 'done',
                url: dataHangHoang.image3 != '' && dataHangHoang.image3 != null ? mediaService.GetFile(dataHangHoang.image3) : ''
            });

            setTimeout(() => {
                setfileUpload(listFile);
            }, 300);
        }
        setShowUploadFile(true);
    }

    const uploadButton = (
        <div>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const handleFilePreview = async (file: any) => {
        setPreviewVisible(true);
        setPreviewImage(file.url)
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt1M = (file.size / 1024 / 1024) < 1;
        if (!isLt1M) {
            message.error('Kích thước Logo phải nhỏ hơn 1MB');
        }
        return isJpgOrPng && isLt1M;
    }

    const handleChangeUpload = ({ fileList }: any) => {
        if (fileList.length < 3) {
            var _fileUpload = [...fileUpload];
            var i = 1;
            while (i < 4) {
                var _hasExsitsUid = hasExsitsUid(fileList, ('-' + i));
                if (!_hasExsitsUid) {
                    _fileUpload[i - 1].url = '';
                    UpdateAlreceiptType_Image_CTNXNL('', 'image' + (i <= 1 ? '' : (i - 1)), showUploadRowIndex);
                }
                i++;
            }
            setTimeout(() => {
                setfileUpload(_fileUpload);
            }, 300);

        }
        return;
    };

    const hasExsitsUid = (fileList: Array<UploadFile>, uid: string) => {
        var _hasExsitsUid = false;
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            if (file.uid === uid) {
                _hasExsitsUid = true;
                break;
            }
        }
        return _hasExsitsUid;
    }

    const checkShowUploadButton = (listFiles: Array<UploadFile>) => {
        var isShowUploadButton = false;
        for (var i = 0; i < listFiles.length; i++) {
            var file = listFiles[i];
            if (file.url === '') {
                isShowUploadButton = true;
                break;
            }
        }
        return isShowUploadButton;
    }

    const handleUplaod = async (option: object) => {
        const ops = option as IAntdUpload;
        var formData = new FormData();
        formData.append("file", ops.file);
        var data = await mediaService.Upload(formData);
        if (data.status === APIStatus.ERROR) {
            message.error('Can not upload file');
        }
        else {
            const filePath = data.data;
            var dataHangHoang = dataReceiptImei[showUploadRowIndex];
            var _fileUpload = [...fileUpload];
            if (dataHangHoang.image === "" || dataHangHoang.image === null) {
                _fileUpload[0].url = mediaService.GetFile(filePath);
                UpdateAlreceiptType_Image_CTNXNL(filePath, 'image', showUploadRowIndex);
            }
            else if (dataHangHoang.image2 === "" || dataHangHoang.image2 === null) {
                _fileUpload[1].url = mediaService.GetFile(filePath);
                UpdateAlreceiptType_Image_CTNXNL(filePath, 'image2', showUploadRowIndex);
            }
            else if (dataHangHoang.image3 == "" || dataHangHoang.image3 === null) {
                _fileUpload[2].url = mediaService.GetFile(filePath);
                UpdateAlreceiptType_Image_CTNXNL(filePath, 'image3', showUploadRowIndex);
            }
            setTimeout(() => {
                setfileUpload(_fileUpload);
            }, 300);
        }
    }

    const getFooterData = (datas: any) => {
        // let weight = 0;
        // datas.forEach(element => {
        //     weight += parseInt(element.weight);
        // });
        // return [
        //     { weight: weight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), description: 'kg' }
        // ]
    }

    const showEditLoiCuon = (e: any, listSteelDefectDetails?: steelDefectDetail[], description?: string, indexRow?: number) => {
        e.preventDefault();
        ShowModal({
            dvId: 'dgAddUpLoiCuon',
            component: errorModalProps,
            dataProps: { materialType: 'C', listSteelDefectDetails: listSteelDefectDetails, description: description, indexRow: indexRow, callBackChoose: callBackChooseLoi }
        });
    }

    const callBackChooseLoi = (listSteelDefectDetails: steelDefectDetail[], description: string, indexRow: number) => {
        if (indexRow > -1) {
            var datas = [...dataReceiptImei];
            datas[indexRow].listSteelDefectDetails = listSteelDefectDetails;
            datas[indexRow].description = description;
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                setDataReceitImeiAPI(datas);
                rf_datagrid_imei_ctnx.current.cancelEdit();
            }, 300);
        } else {
            var datas = [...dataReceiptImei];
            datas.forEach(item => {
                item.listSteelDefectDetails = listSteelDefectDetails;
                item.description = description
            });
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                setDataReceitImeiAPI(datas);
                rf_datagrid_imei_ctnx.current.cancelEdit();
            }, 300);
        }
    }

    return (
        <Fragment>
            <Spin spinning={loadingPage}>
                <div className="page-pannel">
                    <div className="page-pannel-left page-pannel-left-30">
                        <div className="pannel-left-body-not-header">
                            <div className="fl-lef w-90">
                                <div className="fl-lef w-50">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        disabled={optionReceipt.isEditing}
                                        value={dayjs(modelRequest.frdate)}
                                        format={dateFormat}
                                        onChange={onChangeSearchFrDate}
                                        allowClear={false}
                                    />
                                </div>
                                <div className="fl-lef w-50">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        disabled={optionReceipt.isEditing}
                                        value={dayjs(modelRequest.todate)}
                                        format={dateFormat}
                                        onChange={onChangeSearchToDate}
                                        allowClear={false}

                                    />
                                </div>
                            </div>
                            <div className="fl-lef w-10 text-center">
                                <Button disabled={optionReceipt.isEditing} type="primary" icon={<SearchOutlined />} onClick={e => SeachNXNL(e)}></Button>
                            </div>
                            <div className="clearfix h-5"></div>
                            <div className="fl-lef w-60">
                                <Select
                                    value={modelRequest.counterpartyID == null || modelRequest.counterpartyID.length == 0 ? undefined : modelRequest.counterpartyID}
                                    className="input-text-upercase"
                                    disabled={optionReceipt.isEditing}
                                    style={{ width: '100%' }}
                                    size="small"
                                    allowClear
                                    showSearch
                                    placeholder="Đối tác"
                                    optionFilterProp="children"
                                    optionLabelProp="value"
                                    onChange={onchangeCounterPartySearch}
                                    filterOption={handleFilterCounterPartySearch}
                                >
                                    {counterPartySearchModel && counterPartySearchModel.map(d => (
                                        <Option title={d.counterpartyName} key={d.counterpartyID} value={d.counterpartyID}>
                                            <span>{d.counterpartyID} - {d.counterpartyName}</span>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="fl-lef w-30">
                                <Input
                                    className="input-text-upercase"
                                    size="small"
                                    placeholder="Số ct"
                                    disabled={optionReceipt.isEditing}
                                    value={modelRequest.receiptNo} onChange={onChangeReceiptNoSearch} />
                            </div>
                            <div className="clearfix h-5"></div>
                            <DataGrid
                                disabled={optionReceipt.isEditing}
                                data={dataLstReceiptVm.lstReceipt}
                                style={{ height: (window.innerHeight - 190) }}
                                onSelectionChange={onSelectReceipt}
                                selection={dataSelectReceipt.receiptVm}
                                selectionMode="single">
                                <GridColumn title="Số CT" field="receiptNo" width="15%" />
                                <GridColumn title="Tên NCC" field="counterpartyName" width="40%" />
                                <GridColumn title="Số lượng" field="quantity" width="25%" align="center"
                                />
                            </DataGrid>
                        </div>
                        <div className="pannel-left-footer">
                            <div className="inline-bolck w-50" style={{ textAlign: 'left' }}>
                                <div className="inline-bolck" style={{ marginRight: 5 }}><Icon type="user" style={{ fontSize: 18 }} /></div>
                                <div className="inline-bolck" style={{ marginRight: 5 }}>
                                    {/* {isquantri ?
                                        <Checkbox disabled={optionReceipt.isEditing} onChange={handleChangeCheckBoxSearchQuanTri}></Checkbox>
                                        :
                                        <div></div>
                                    } */}
                                    <Checkbox disabled={optionReceipt.isEditing} onChange={handleChangeCheckBoxSearchQuanTri}></Checkbox>
                                </div>
                                <div className="inline-bolck">
                                    <CBUserAdmintrator value={modelUserRequest} isEditing={optionReceipt.isEditing} OnChangeCBQuanTri={OnChangeCBQuanTri} />
                                </div>
                            </div>
                            <div className="inline-bolck w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    <b>Tổng Cộng: </b>
                                </div>
                                <div className="inline-bolck mr-right-5 input-control  input-bg-special">
                                    <b>
                                        <NumericFormat
                                            readOnly
                                            className="ant-input-number-input input-text-right text-red"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            disabled={!optionReceipt.isEditing}
                                            value={dataLstReceiptVm.totalQuantity} />
                                    </b>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="page-pannel-right page-pannel-right-70">
                    <div className="pannel-right-body">
                        {/* Start */}
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Kho
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        size="small"
                                        showAction={["focus"]}
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.storeID}
                                        placeholder="Chọn kho hàng"
                                        optionFilterProp="children"
                                        optionLabelProp="children"
                                        onChange={onChangeStore}
                                    >
                                        {dataStore && dataStore.map(d => (
                                            <Option title={d.storeName} key={d.storeID} value={d.storeID}>
                                                <span>{d.storeID} - {d.storeName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5 ">
                                    Ngày CT
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <DatePicker size="small" disabled={optionReceipt.isEditing}
                                        onChange={onChangeReceiptDate}
                                        value={dayjs(dataReceiptVm.receiptDate)}
                                        defaultValue={dayjs(dataReceiptVm.receiptDate)}
                                        format={dateFormat}
                                        allowClear={false}
                                    />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số CT
                                </div>
                                <div className="inline-bolck input-control">
                                    <Input size="small" disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)} readOnly name="receiptNo" value={dataReceiptVm.receiptNo} onChange={handleChangeInput} />
                                </div>
                            </div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số Xe
                                </div>
                                <div className="inline-bolck input-control">
                                    <Input size="small" disabled={!optionReceipt.isEditing} name="licensePlate" value={dataReceiptVm.licensePlate} onChange={handleChangeInput} />
                                </div>
                            </div>
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Nghiệp Vụ
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Input size="small" disabled={true}
                                        value={`${dataReceiptVm.businessID}${(dataReceiptVm.businessName ? `- ${dataReceiptVm.businessName}` : '')}`}
                                    />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Mã CC
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        ref={rf_vendor}
                                        showAction={['focus']}
                                        className="input-text-upercase"
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.counterpartyID}
                                        placeholder="Chọn nhà cung cấp"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangecateCounterparty}
                                        filterOption={handleFilterNhaCC}
                                    >
                                        {cateCounterparty && cateCounterparty.map(d => (
                                            <Option title={(d.counterpartyID + '-' + d.counterpartyName)} data-kyhieu={d.counterpartyID} key={d.counterpartyID} value={d.counterpartyID}>
                                                <span>{d.counterpartyID} - {d.counterpartyName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Nhóm CC
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        className="input-text-upercase"
                                        disabled={true}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.counterpartyGroup}
                                        placeholder="Chọn nhóm nhà cung cấp"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangecateCounterpartyGroup}
                                    >
                                        {cateCounterpartyGroup && cateCounterpartyGroup.map(d => (
                                            <Option data-captren={d.isChild} title={(d.counterpartyGroupID + '-' + d.counterpartyGroupName)} key={d.counterpartyGroupID} value={d.counterpartyGroupID}>
                                                <span>{d.counterpartyGroupID} - {d.counterpartyGroupName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Tiêu chuẩn
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        ref={rf_standard}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.standard}
                                        placeholder="Chọn tiêu chuẩn"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangeCateStandard}
                                    >
                                        {dataCateStandard && dataCateStandard.map(d => (
                                            <Option title={d.standardName} key={d.standardID} value={d.standardID}>
                                                <span>{d.standardName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Loại NL
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        ref={rf_steelType}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.steelType}
                                        placeholder="Chọn loại nguyên liệu"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangeSteelType}
                                    >
                                        {dataSteelType && dataSteelType.map(d => (
                                            <Option title={d.steelTypeName} key={d.steelTypeID} value={d.steelTypeID}>
                                                <span>{d.steelTypeID} - {d.steelTypeName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số lô
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        ref={rf_productionBatchNo}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.productionBatchNo}
                                        placeholder="Chọn số lô"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangeCateProductionBatchNo}
                                    >
                                        {dataCateProductionBatchNo && dataCateProductionBatchNo.map(d => (
                                            <Option title={d.productionBatchNoName} key={d.productionBatchNoID} value={d.productionBatchNoID}>
                                                <span>{d.productionBatchNoName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="fl-lef w-25">

                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Đơn vị mạ
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        ref={rf_galvanizedOrganization}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.galvanizedOrganization}
                                        placeholder="Chọn đơn vị mạ"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onchangeDVMAGCNL}
                                    >
                                        {dataCateGalvanizedOrganization && dataCateGalvanizedOrganization.map(d => (
                                            <Option title={d.galvanizedOrganizationName} key={d.galvanizedOrganizationID} value={d.galvanizedOrganizationID}>
                                                <span>{d.galvanizedOrganizationID}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-75">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Nội dung
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Input size="small" onKeyDown={handleKeyDownInput} ref={rf_receiptContent} disabled={!optionReceipt.isEditing} name="receiptContent" value={dataReceiptVm.receiptContent} onChange={handleChangeInput} />
                                </div>
                            </div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Giá mua
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <div className={(!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)) ? "input-bg-special ant-input-number-sm ant-input-number ant-input-number-disabled" : "input-bg-special ant-input-number-sm ant-input-number"}>
                                        <NumericFormat
                                            className="ant-input-number-input input-text-right input-bg-special text-red w-100"
                                            onKeyDown={handleKeyDownInput}
                                            thousandSeparator={true}
                                            value={dataReceiptVm.steelPrice}
                                            getInputRef={rf_giamua}
                                            name="steelPrice"
                                            min={1}
                                            max={999999}
                                            isAllowed={(values) => {
                                                const { floatValue } = values;
                                                return floatValue ? floatValue > 0 && floatValue <= 999999 : true;
                                            }}
                                            onValueChange={onChangesteelPrice}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        {/* End */}


                            <section className="code-box-meta markdown">
                                <div className="code-box-title">Chi tiết nguyên liệu</div>
                                <div className="code-box-description">
                                    <div className="tool-bar-cthh" style={{ marginBottom: 2 }}>
                                        <div className="inline-bolck w-10 mr-1">
                                            <div id="inpumonthIDHoa">
                                                <Select
                                                    className="select-hanghoa-input input-text-upercase"
                                                    ref={rf_hanghoa_ctnx}
                                                    disabled={true}
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    value={dataInputReceiptDetailVm.productID}
                                                    placeholder="Chọn hàng hóa"
                                                    optionLabelProp="value"
                                                    showAction={["focus"]}
                                                    filterOption={false}
                                                    getPopupContainer={(trigger: any) => trigger.parentNode}
                                                    notFoundContent={null}
                                                >
                                                    {cateProductVmModel && cateProductVmModel.map(d => (
                                                        <Option key={d.productID} value={d.productID} title={d.productID}>
                                                            <div style={{ width: 200 }}>
                                                                <span>{d.productID} - {d.productName}</span>
                                                            </div>
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="inline-bolck w-6 mr-1">
                                            <div className={(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0) ? "ant-input-number-sm ant-input-number" : "ant-input-number-sm ant-input-number ant-input-number-disabled"}>
                                                <NumericFormat
                                                    readOnly={!(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0)}
                                                    getInputRef={rf_soluong_ctnx}
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    value={dataInputReceiptDetailVm.quantity}
                                                    name="quantity"
                                                    placeholder='Số lượng'
                                                    min={1}
                                                    max={50}
                                                    isAllowed={(values) => {
                                                        const { floatValue } = values;
                                                        return floatValue ? floatValue > 0 && floatValue <= 50 : true;
                                                    }}
                                                    onKeyDown={handleKeyDownInput}
                                                    onValueChange={onChangeQuantityReceiptDetail}
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-bolck w-18 mr-1">
                                            <Input
                                                ref={rf_description_ctnx}
                                                size="small"
                                                disabled={!optionReceipt.isEditing}
                                                value={dataInputReceiptDetailVm.description}
                                                name="description"
                                                placeholder='ghi chú'
                                                onKeyDown={handleKeyDownInput}
                                                onChange={onChangeDescriptionReceiptDetail}
                                            />
                                        </div>
                                        <div className="inline-bolck w-3 mr-1 text-center">
                                            <Button
                                                ref={rf_button_add_ctnx}
                                                size="small"
                                                disabled={!optionReceipt.isEditing || dataInputReceiptDetailVm.receiptDetailID > 0}
                                                type="primary" icon={<PlusOutlined />}
                                                onClick={e => AddReceiptDetailAndImei(e)}
                                                danger
                                            />
                                        </div>

                                        <div className="inline-bolck w-8 mr-1">
                                            <Select
                                                ref={rf_kho_ctnx}
                                                disabled={!optionReceipt.isEditing || (dataReceiptImei != null && dataReceiptImei.length <= 0) || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                                size="small"
                                                style={{ width: '100%' }}
                                                showSearch
                                                value={dataInputReceiptImei.width}
                                                placeholder="Chọn khổ"
                                                optionFilterProp="children"
                                                optionLabelProp="title"
                                                autoFocus={true}
                                                getPopupContainer={(trigger: any) => trigger.parentNode}
                                                onChange={onSelectKho_CT_CTNXHH}
                                            >
                                                {dataWidth && dataWidth.map(d => (
                                                    <Option title={d.widthName} key={d.widthID} value={d.widthID}>
                                                        {d.widthName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="inline-bolck w-3 mr-1 text-center">
                                            <Button size="small" disabled={!optionReceipt.isEditing || (dataReceiptImei != null && dataReceiptImei.length <= 0) || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)} type="primary" icon={<VerticalAlignBottomOutlined />}
                                                onClick={e => UpdateAlreceiptType_CTNXNL(e, 'width')}
                                            />
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <Select
                                                ref={rf_day_ctnx}
                                                disabled={!optionReceipt.isEditing || (dataReceiptImei != null && dataReceiptImei.length <= 0) || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                                size="small"
                                                style={{ width: '100%' }}
                                                showSearch
                                                value={dataInputReceiptImei.thickness}
                                                placeholder="Chọn dày"
                                                optionFilterProp="children"
                                                optionLabelProp="title"
                                                autoFocus={true}
                                                getPopupContainer={(trigger: any) => trigger.parentNode}
                                                onChange={onSelectDay_CT_CTNXHH}
                                            >
                                                {dataCateThickness && dataCateThickness.map(d => (
                                                    <Option title={d.thicknessName} key={d.thicknessID} value={d.thicknessID}>
                                                        {d.thicknessName}
                                                    </Option>
                                                ))}
                                            </Select>

                                        </div>
                                        <div className='inline-bolck w-3 mr-1 text-center'>
                                            <Button size="small" disabled={!optionReceipt.isEditing || (dataReceiptImei != null && dataReceiptImei.length <= 0) || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)} type="primary" icon={<VerticalAlignBottomOutlined />}
                                                onClick={e => UpdateAlreceiptType_CTNXNL(e, 'thickness')}
                                            />
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <div className={(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0) || (dataReceiptImei != null && dataReceiptImei.length <= 0) ? "ant-input-number-sm ant-input-number" : "ant-input-number-sm ant-input-number ant-input-number-disabled"}>
                                                <NumericFormat
                                                    readOnly={!(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0)}
                                                    getInputRef={rf_weight_ctnx}
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    min={1}
                                                    value={dataInputReceiptImei.weight1}
                                                    name="weight1"
                                                    max={999999}
                                                    type='text'
                                                    isAllowed={(values) => {
                                                        const { floatValue } = values;
                                                        return floatValue ? floatValue > 0 && floatValue <= 999999 : true;
                                                    }}
                                                    onValueChange={onChangeWeightReceiptImei}
                                                />

                                            </div>
                                        </div>
                                        <div className='inline-bolck w-3 mr-1 text-center'>
                                            <Button size="small" disabled={!optionReceipt.isEditing || (dataReceiptImei != null && dataReceiptImei.length <= 0) || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)} type="primary" icon={<VerticalAlignBottomOutlined />}
                                                onClick={e => UpdateAlreceiptType_CTNXNL(e, 'weight1')}
                                            />
                                        </div>
                                        <div className='inline-bolck w-25 mr-1 text-center'>
                                            <Button className='w-100' size="small" disabled={!optionReceipt.isEditing || dataReceiptImei != null && dataReceiptImei.length <= 0} type="primary" icon={<WarningOutlined />}
                                                onClick={e => showEditLoiCuon(e, [], '', -1)}
                                            >
                                                Ghi chú lỗi
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="hanghoaInputNXNL">
                                        <Spin spinning={spinningLoadCTBang}>
                                            <DataGrid
                                                ref={rf_datagrid_imei_ctnx}
                                                disabled={!optionReceipt.isEditing || dataInputReceiptDetailVm.quantity <= 0}
                                                data={dataReceiptImei}
                                                style={{ height: (window.innerHeight - 385) }}
                                                selectionMode={!optionReceipt.isEditing ? null : "single"}
                                                selection={dataSelectReceiptImei}
                                                onSelectionChange={onSelectTable_IMEI_CTNXHH}
                                                clickToEdit
                                                editMode="cell"
                                                showFooter
                                                footerData={getFooterData(dataReceiptImei)}
                                            >
                                                <GridColumn title="STT" key="sortOrder" field="sortOrder" width="4%" />
                                                <GridColumn title="Loại" key="steelType" field="steelType" width="5%" align="left" />
                                                <GridColumn title="NCC" key="vendor" field="vendor" width="5%" />
                                                <GridColumn title="T.Chuẩn" key="standard" field="standard" width="6%" />
                                                <GridColumn title="Số lô" key="productionBatchNo" field="productionBatchNo" width="5%" />
                                                <GridColumn title="ĐVMGC" key="galvanizedOrganization" field="galvanizedOrganization" width="6%" />
                                                <GridColumn title="Giá nhập" key="steelPrice" field="steelPrice" width="8%" />
                                                <GridColumn title="Khổ" key="width" field="width" width="10%" align="left"
                                                    editable={(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0)}
                                                    editor={({ row }: any) => (
                                                        <div>
                                                            <Select
                                                                size="small"
                                                                style={{ width: '100%' }}
                                                                showSearch
                                                                placeholder="Chọn khổ"
                                                                optionFilterProp="children"
                                                                optionLabelProp="title"
                                                                autoFocus={true}
                                                                value={row.width}
                                                                onChange={(value: any, option: any) => onSelectKho_Inrow_CTNXHH(value, option, (row.sortOrder - 1))}
                                                            >
                                                                {dataWidth && dataWidth.map(d => (
                                                                    <Option title={d.widthName} key={d.widthID} value={d.widthID}>
                                                                        {d.widthName}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                    )}
                                                />
                                                <GridColumn title="Dày" key="thickness" field="thickness" width="10%" align="left"
                                                    editable={(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0)}
                                                    editor={({ row }: any) => (
                                                        <div>
                                                            <Select
                                                                size="small"
                                                                style={{ width: '100%' }}
                                                                showSearch
                                                                placeholder="Chọn dày"
                                                                optionFilterProp="children"
                                                                optionLabelProp="title"
                                                                autoFocus={true}
                                                                value={row.thickness}
                                                                onChange={(value: any, option: any) => onSelectDay_Inrow_CTNXHH(value, option, (row.sortOrder - 1))}
                                                            >
                                                                {dataCateThickness && dataCateThickness.map(d => (
                                                                    <Option title={d.thicknessName} key={d.thicknessID} value={d.thicknessName}>
                                                                        {d.thicknessName}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                    )}
                                                />
                                                <GridColumn title="Số kg" field="weight1" key="weight1" width="10%" align="right"
                                                    header={() => <span>Số kg</span>}
                                                    editable={(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0)}
                                                    editor={({ row }: any) => (
                                                        <div className="ant-input-number-sm ant-input-number w-100">
                                                            <NumericFormat
                                                                name={('imei-weight-' + row.sortOrder)}
                                                                className="ant-input-number-input input-text-right w-100"
                                                                thousandSeparator={true}
                                                                isAllowed={(values) => {
                                                                    const { floatValue } = values;
                                                                    return floatValue ? floatValue > 0 && floatValue <= 999999 : true;
                                                                }}
                                                                minLength={1}
                                                                min={1}
                                                                max={999999}
                                                                value={row.weight1 ?? row.weight}
                                                                onBlur={e => handleOnBlurInput_Sokg(e, (row.sortOrder - 1))}
                                                                onKeyDown={e => handleKeyDownInput_Sokg(e, (row.sortOrder - 1))}
                                                            />
                                                        </div>
                                                    )}
                                                    render={({ row }: any) => (
                                                        <div className='bg_weight'>
                                                            <NumericFormat
                                                                readOnly
                                                                className="ant-input-number-input input-text-right-grid w-100"
                                                                thousandSeparator={true}
                                                                displayType={'text'}
                                                                value={row.weight1 ?? row.weight} />
                                                        </div>
                                                    )}
                                                />
                                                <GridColumn title="ghi chú" key="description" field="description" width="15%" align="left"
                                                    render={({ row }: any) => (
                                                        <>
                                                            {row.description}
                                                        </>
                                                    )}
                                                />
                                                <GridColumn title="Lỗi" key="loi" field="loi" width="15%" align="left"
                                                    render={({ row }: any) => (
                                                        <>
                                                            <div className='inline-bolck w-80'>
                                                                {
                                                                    row.listSteelDefectDetails && row.listSteelDefectDetails.map((p: steelDefectDetail) => {
                                                                        return <span>{p.steelDefectName}</span>
                                                                    })
                                                                }
                                                            </div>
                                                            <div className='inline-bolck w-20 text-right'>
                                                                <Tooltip title={row.listSteelDefectDetails ? row.listSteelDefectDetails.map((p: steelDefectDetail) => p.steelDefectName).toString() : ''}>
                                                                    <Button size="small" shape="circle" onClick={(e: any) => showEditLoiCuon(e, row.listSteelDefectDetails, row.description, row.sortOrder - 1)}>...</Button>
                                                                </Tooltip>
                                                            </div>
                                                        </>
                                                    )}
                                                />
                                                <GridColumn key="upload" field="upload" width="5%" align="center"
                                                    render={({ row }: any) => (
                                                        <div>
                                                            <Button size="small" shape="circle" icon={<FileImageOutlined />} onClick={(e: any) => showFormUploadFile(row.sortOrder - 1)} />
                                                        </div>
                                                    )}
                                                />
                                            </DataGrid>
                                        </Spin>
                                        <div className="clearfix h-3"></div>
                                        <div className="tonhh-info">
                                            <div className="inline-bolck mr-right-5">
                                                Tồn
                                            </div>
                                            <div className="inline-bolck mr-1">
                                                <Input size="small" disabled={!optionReceipt.isEditing} readOnly value={optionTONHH.productName} />
                                            </div>
                                            <div className="inline-bolck mr-1">
                                                <div className="ant-input-number-sm ant-input-number">
                                                    <InputNumber className="ant-input-number-input" disabled={!optionReceipt.isEditing} value={optionTONHH.tonhh} />
                                                </div>
                                            </div>
                                            <div className="inline-bolck mr-1 mr-top-5">
                                                <div className="small-combobox-easyui">
                                                    <ComboGrid
                                                        panelStyle={{ width: 400 }}
                                                        valueField="id"
                                                        textField="receiptNo"
                                                        data={optionTONHH.lstRDTonHHH}
                                                    >
                                                        <GridColumn field="receiptDate" title="Ngày" width="20%" align="left"
                                                            header={() => <span>Ngày</span>}
                                                            render={({ row }: any) => (
                                                                <span>{moment(row.receiptDate).format(dateFormat)}</span>
                                                            )}
                                                        />
                                                        <GridColumn field="receiptNo" title="Số CT" width="15%" align="left"> </GridColumn>
                                                        <GridColumn field="quycach" title="Quy cách" align="left" width="55%"> </GridColumn>
                                                        <GridColumn field="soluong" title="SL" align="right" width="10%"
                                                        // header={() => <span>SL</span>}
                                                        // render={({ row }: any) => (
                                                        //     <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.soluong} />
                                                        // )}
                                                        />
                                                    </ComboGrid>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="clearfix h-5"></div>
                        <div className="pannel-right-footer" style={{ padding: 30 }}>
                            {optionReceipt.isEditing ?
                                <div className="inline-bolck">
                                    <Button className="button" loading={optionReceipt.isSubmit} type="primary" icon={<SaveOutlined />} size="small"
                                        onClick={e => saveReceipt(e)}
                                    >Lưu</Button>
                                    <Button className="button" disabled={optionReceipt.isSubmit} type="primary" icon={<CloseOutlined />} size="small"
                                        onClick={e => cancelReceipt(e)}
                                        danger>Hủy</Button>
                                </div>
                                :
                                <div className="inline-bolck">
                                    {/* {iskiemsoatnoibo == false ?
                                        <Fragment>
                                            <Button className="button" type="primary" icon="plus" size="small"
                                                onClick={e => addReceipt(e)}>Thêm</Button>
                                            <Button className="button" type="primary" icon="edit" size="small"
                                                onClick={e => EditReceipt(e)}>Sửa</Button>
                                            <Button className="button" type="primary" icon="close" size="small"
                                                onClick={e => DeleteReceipt(e)} danger>Xóa</Button>
                                        </Fragment>
                                        :
                                        <div></div>
                                    } */}
                                    <Fragment>
                                        <Button className="button" type="primary" icon={<PlusOutlined />} size="small"
                                            onClick={e => addReceipt(e)}>Thêm</Button>
                                        <Button className="button" type="primary" icon={<EditOutlined />} size="small"
                                            onClick={e => EditReceipt(e)}>Sửa</Button>
                                        <Button className="button" type="primary" icon={<CloseOutlined />} size="small"
                                            onClick={e => DeleteReceipt(e)} danger>Xóa</Button>
                                    </Fragment>
                                </div>
                            }
                            {
                                dataReceiptVm.receiptID > 0 ?
                                    <div className="inline-bolck">
                                        <ReactToPrint
                                            trigger={() => <Button className="button" disabled={optionReceipt.isSubmit} type="primary" icon={<PrinterOutlined />} size="small">In Phiếu</Button>}
                                            content={() => refKiemPhieuPrint.current ? refKiemPhieuPrint.current : eleEmty}
                                            pageStyle="@page { size: 21cm 29.7cm ; } @media print { body { -webkit-print-color-adjust: exact; } }"
                                        />
                                    </div>
                                    :
                                    <div className="inline-bolck"></div>
                            }
                            <div style={{ display: "none" }}>
                                <div ref={refKiemPhieuPrint}>
                                    <div className="inline-bolck w-100 print-area">
                                        <PrintReceipt branchInfo={branchInfo} dataReceiptVm={dataReceiptVm} dataReceiptDetail={((dataLstReceiptDetail != null && dataLstReceiptDetail.length > 0) ? dataLstReceiptDetail[0] : dataInputReceiptDetailVm)} dataLstIMEI={dataReceiptImei ?? []} />
                                    </div>
                                </div>
                            </div>
                            <Modal
                                title="Upload File"
                                visible={showUploadFile}
                                onOk={() => setShowUploadFile(false)}
                                onCancel={() => setShowUploadFile(false)}
                            >
                                <Upload
                                    action=""
                                    listType="picture-card"
                                    fileList={fileUpload}
                                    onPreview={handleFilePreview}
                                    customRequest={handleUplaod}
                                    onChange={handleChangeUpload}
                                    beforeUpload={beforeUpload}
                                >
                                    {checkShowUploadButton(fileUpload) ? uploadButton : null}
                                </Upload>
                            </Modal>
                            <Modal
                                visible={previewVisible}
                                title="Pre view"
                                footer={null}
                                onOk={() => setPreviewVisible(false)}
                                onCancel={() => setPreviewVisible(false)}
                            >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
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
export default InputInventory;

