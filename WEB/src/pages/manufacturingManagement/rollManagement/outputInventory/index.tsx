import React, { Fragment, useState, useEffect, useRef, Key } from 'react';
import { Button, Input, DatePicker, Modal, InputNumber, message, Checkbox, Select, Tabs, Spin, Table, Tooltip } from 'antd';
import { ComboGrid, GridColumn, DataGrid, TextBox, LinkButton } from 'rc-easyui';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, SearchOutlined, VerticalAlignBottomOutlined, WarningOutlined, PrinterOutlined, FileImageOutlined, RightOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import dayjs from 'dayjs';
import type { TableRowSelection } from "antd/es/table/interface";

import { receiptVm } from '../../../../models/receipt';
import cateBranch from '../../../../models/cateBranch';
import cateStore from '../../../../models/cateStore';
import cateCounterparty from '../../../../models/cateCounterparty';
// import QUYCACH_HH from '../../../../models/QUYCACH_HH';
import { cateProductVm } from '../../../../models/cateProduct';
import employee from '../../../../models/employee';
import receiptRequest from '../../../../models/request/receiptRequest';
import { receiptDetailVm } from '../../../../models/receiptDetail';
import cateProductionPlan from '../../../../models/cateProductionPlan';
import receiptImei from '../../../../models/receiptImei';
import inventoryDetail from '../../../../models/productions/inventoryDetail';

import cateGalvanizedOrganization from '../../../../models/cateGalvanizedOrganization';
import cateSteelType from '../../../../models/cateSteelType';
import cateWidth from '../../../../models/cateWidth';
import cateThickness from '../../../../models/cateThickness';

import { APIStatus } from '../../../../configs/APIConfig';
// import CBUserQuanTri from '../../../../components/CBUerQuantri/CBUserQuanTri';
import LoginUtils from '../../../../utils/loginUtils';

import steelDefectDetail from '../../../../models/steelDefectDetail';
import errorModalProps from '../../components/errorModal/index';
import { ShowModal } from '../../../../components/common/index';
import cateProductionSubForm from '../../../../pages/cateProductionPlan/subForm';

import ReceiptService from '../../../../services/receiptService';
// import NhapXuatCateProductService from '../../../../services/NhapXuatCateProductService';
import CateStoreService from '../../../../services/cateStoreService';
import CateProductService from '../../../../services/cateProductService';
import CateCounterpartyService from '../../../../services/cateCounterpartyService';
import CateBranchService from '../../../../services/cateBranchService';
import CateProductionPlanService from '../../../../services/cateProductionPlanService';
import CateThicknessService from '../../../../services/cateThicknessService';
import CateWidthService from '../../../../services/cateWidthService';
import CateSteelTypeService from '../../../../services/cateSteelTypeService';
import CateGalvanizedOrganizationService from '../../../../services/cateGalvanizedOrganizationService';
import ReactToPrint from 'react-to-print';
import PrintReceiptPlan from './printReceiptPlan';
import TaskDeliveryAppService from '../../../../services/taskDeliveryAppService';
import EmployeeService from '../../../../services/employeeService';
import BeginningInventoryService from '../../../../services/beginningInventoryService';
import productImei from '../../../../models/productImei';

const receiptService = new ReceiptService();
const beginningInventoryService = new BeginningInventoryService();

// const nhapXuatCateProductService = new NhapXuatCateProductService();
const cateStoreService = new CateStoreService();
const cateProductService = new CateProductService();
const cateCounterpartyService = new CateCounterpartyService();
const cateBranchService = new CateBranchService();
const cateProductionPlanService = new CateProductionPlanService();
const cateThicknessService = new CateThicknessService();
const cateWidthService = new CateWidthService();
const cateSteelTypeService = new CateSteelTypeService();
const taskDeliveryAppService = new TaskDeliveryAppService();
const employeeService = new EmployeeService();
const cateGalvanizedOrganizationService = new CateGalvanizedOrganizationService();

const { confirm } = Modal;
const { TabPane } = Tabs;
const { Option } = Select;
const OutputRollInventory: React.FC = () => {

    const workProcessID = 'XB.06';
    const materialType = 'C';
    const businessID = 'X12';
    // const storeID = 'K21';

    const menuKey = 'outputInventory';
    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.UserName;
    const branchId = userLoginInfo.BranchId;
    // const isquantri = userLoginInfo.userinfo.isquantri == true ? true : false;
    //const iskiemsoatnoibo = userLoginInfo.userinfo.iskiemsoatnoibo == true ? true : false;

    const eleEmty: React.ReactInstance = new EmptyComponent({});
    const refhieuPrint = useRef<any>(eleEmty);

    const rf_noi_sx = useRef<any>(null);
    const rf_kh_sx = useRef<any>(null);

    const rf_employeeCode = useRef<any>(null);
    const rf_receiptContent = useRef<any>(null);

    const rf_hanghoa_receiptVm = useRef<any>(null);
    const rf_quantity_receiptVm = useRef<any>(null);
    const rf_tongkg1_receiptVm = useRef<any>(null);
    const rf_description_receiptVm = useRef<any>(null);
    const rf_button_add_receiptVm = useRef<any>(null);


    const rf_weight_receiptVm = useRef<any>(null);

    const rf_DataGrid_imei_receiptVm = useRef<any>(null);

    const dateFormat = 'DD/MM/YYYY';
    const [cateMonthInfo, setCateMonthInfo] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [tabActive, setTabActive] = useState('nhap_receiptVm_cuon');
    const [tabCT_DS_TON_Active, setTabCT_DS_TON_Active] = useState('tab_chi_tiet_hang_hoa');
    const [isViewUser, setIsViewUser] = useState(false);
    const [branchInfo, setbranchInfo] = useState((() => {
        let dataInit: cateBranch = {} as any;
        return dataInit;
    }));
    const [modelUserRequest, setModelUserRequest] = useState('');
    const [modelRequest, setModelRequest] = useState((() => {
        let dataInit = {
            branchID: userLoginInfo.BranchId,
            receiptNo: '',
            frdate: new Date(),
            todate: new Date(),
            counterpartyID: "",
            materialType: materialType,
            businessID: businessID,
            employeeID: ''
        };
        return dataInit;
    }));
    const [filterRequestDSTON, setFilterRequestDSTON] = useState({ steelType: '', width: '', thickness: '', galvanizedOrganization: '' });
    const dataReceiptVmInit = {
        receiptID: 0,
        branchID: branchId,
        monthID: '',
        receiptDate: new Date(),
        receiptType: 'X',
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
        // steelPrice: 0,
        workProcessID: workProcessID
    }

    const [instockDetailRequest, setInstockDetailRequest] = useState((() => {
        let dataInit = {
            materialType: materialType,
            storeTypeID: '02',
            productID: 'CUON',
            branchID: branchId,
            monthID: moment(new Date()).format("YYYYMM")
        };
        return dataInit;
    }));

    const [optionReceipt, setOptionReceipt] = useState((() => {
        let dataInit = { receiptID: 0, receiptNo: '', isupdatectreceiptVm: false, counterreceiptVm: 0, isEditing: false, isSubmit: false };
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
            productID: 'CUON',
            calculationUnit: '',
            quantity: 0,
            unitPrice: 0,
            totalAmount: 0,
            scaleNo: '',
            scaleEmployee: '',
            scaleDate: new Date(),
            weight: 0,
            totalWeight1: 0,
            totalWeight2: 0,
            totalWeight3: 0,
            isImei: true,
            description: '',
            // createDate: new Date(),
            productTypeID: '',
            productName: '',
            vuotton: false,
            index: -1
        };
        return dataInit;
    }));

    const [dataInputReceiptDetail, setDataInputReceiptDetail] = useState((() => {
        let dataInit: receiptImei = {
            receiptImeiID: 0,
            receiptID: 0,
            receiptDetailID: 0,
            productID: 'CUON',
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
            // createdDate: ''
        };
        return dataInit;
    }));

    const [selectNLKHOTargetKeys, setSelectNLKHOTargetKeys] = useState(Array<string>());
    const [selectXuatKHOTargetKeys, setSelectXuatKHOTargetKeys] = useState(Array<string>());

    const [dataLstReceiptDetail, setDataLstReceiptDetail] = useState((() => {
        let dataInit: Array<receiptDetailVm> = [] as any;
        return dataInit;
    }));

    const [dataShowTONNL, setShowDataTONNL] = useState(Array<receiptImei>());
    const [dataInstock, setDataTONNL] = useState(Array<receiptImei>());
    const [dataSelectTONNL, setDataSelectTONNL] = useState(Array<receiptImei>());

    const [dataReceiptImei, setDataReceiptImeiAPI] = useState((() => {
        let dataInit: Array<receiptImei> = [] as any;
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

    const [counterPartySearchModel, setCounterPartySearchModel] = useState((() => {
        let dataInit: Array<cateCounterparty> = [] as any;
        return dataInit;
    }));

    const [lstCateProductionPlanModel, setLstCateProductionPlanModel] = useState((() => {
        let dataInit: Array<cateProductionPlan> = [] as any;
        return dataInit;
    }));

    const [employeeModel, setEmployeeModel] = useState((() => {
        let dataInit: Array<employee> = [] as any;
        return dataInit;
    }));

    const [cateProductVmModel, setCateProductVmModel] = useState((() => {
        let dataInit: Array<cateProductVm> = [] as any;
        return dataInit;
    }));

    const [optionInstockImei, setOptionInstockImei] = useState((() => {
        let dataInit = { productName: '', totalQuantity: 0, lstInstockImei: Array<receiptImei>() };
        return dataInit;
    }));

    const [dataSteelType, setDataSteelType] = useState((() => {
        let dataInit: Array<cateSteelType> = [] as any;
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

    useEffect(() => {
        const controller = new AbortController();
        async function GetData() {

            await CheckMonthIsOpen(modelRequest.todate);
            await GetBrandUserLogin();
            await SearchListReceipt(modelRequest);

            await GetDataStore();

            await GetDataCateCounterparty();
            await GetDataProductionPlan();

            await GetListCateProduct();
            await GetListEmployee();

            await GetImeiInventoryMaterial();

            await GetCateGalvanizedOrganization();
            await GetSteelType();
            await GetCateWidth();
            await GetCateThickness();

            setLoadingPage(false);

        };
        GetData();
        return () => {
            controller.abort();
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
        setbranchInfo(getDdata.data);
    }

    const GetDataStore = async () => {
        var getDdata = await cateStoreService.GetListStoreByTypeBranchId('02', branchId);
        setDataStore(getDdata.data);
    }

    const GetDataCateCounterparty = async (counterpartyGroup = 'CTY') => {
        var getDdata = await cateCounterpartyService.GetListGetVendorByGroupId(counterpartyGroup);
        setCateCounterparty(getDdata.data);
        if (counterPartySearchModel && counterPartySearchModel.length <= 0) {
            setCounterPartySearchModel(getDdata.data);
        }
    }

    const GetDataProductionPlan = async () => {
        var getDdata = await cateProductionPlanService.GetListPlanNotFinishByBranchId(branchId);
        getDdata.data = getDdata.data.filter((p: cateProductionPlan) => p.planTypeID === 'KHXB');
        setLstCateProductionPlanModel(getDdata.data);
    }

    const GetListEmployee = async () => {
        var getDdata = await employeeService.GetListEmployee();
        setEmployeeModel(getDdata.data);
    }

    const GetListCateProduct = async () => {
        var getDdata = await cateProductService.GetListCateProduct({ productID: '', productName: '', productTypeID: '', menukey: menuKey });
        setCateProductVmModel(getDdata.data);
    }

    const GetSteelType = async () => {
        var getDdata = await cateSteelTypeService.GetList();
        setDataSteelType(getDdata.data);
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

    const GetImeiInventoryMaterial = async (dataFilter?: any) => {
        const _instockDetailRequest = dataFilter == null || dataFilter === undefined ? { ...instockDetailRequest } : dataFilter;
        var data = await beginningInventoryService.GetImeiInventoryMaterial(_instockDetailRequest);
        setDataTONNL(data.data);
        setShowDataTONNL(data.data);
        console.log("GetImeiInventoryMaterial", data.data);

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
            businessID: businessID,
            receiptNo: '',
            todate: ngay,
            counterpartyID: '',
            employeeID: ''
        });

        var counterpartyID = '', tennhacc = '', counterpartyAddress = '', counterpartyGroup = '', employeeCode = '';

        let _instockDetailRequest = { ...instockDetailRequest };
        _instockDetailRequest.monthID = month;
        // _instockDetailRequest.storeID = storeID;
        setInstockDetailRequest({ ...instockDetailRequest, monthID: month });
        await GetImeiInventoryMaterial(_instockDetailRequest);

        setDataSelectTONNL([]);
        setSelectXuatKHOTargetKeys([]);

        setDataReceiptVm({
            ...dataReceiptVm,
            receiptID: 0,
            // sophieu: data.data.sophieu,
            receiptNo: data.data,
            monthID: month,
            // storeID: storeID,
            // storeIDc: storeID,
            counterpartyID: counterpartyID,
            counterpartyName: tennhacc,
            counterpartyAddress: counterpartyAddress,
            counterpartyGroup: counterpartyGroup,
            employeeCode: employeeCode,
            standard: '',
            productionBatchNo: '',
            steelType: '',
            galvanizedOrganization: '',
            // steelPrice: 0,
            workProcessID: workProcessID
        });

    }


    const onChangeReceiptDate = async (date: any, dateString: string) => {
        setModelRequest({ ...modelRequest, frdate: date, todate: date });
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
        setDataReceiptVm({ ...dataReceiptVm, storeID: value, storeIDc: value, createdBy: userName });
    }

    const onChangecateCounterparty = (value: any, option: any) => {
        var nhacungcap = cateCounterparty.find((element) => {
            return element.counterpartyID === value;
        });
        var nhacungcapItem = nhacungcap || { counterpartyName: '', counterpartyAddress: '' };
        const kyhieu = option.props['data-kyhieu'];
        setDataReceiptVm({ ...dataReceiptVm, counterpartyID: value, counterpartyName: nhacungcapItem.counterpartyName, counterpartyAddress: nhacungcapItem.counterpartyAddress, kyhieu: kyhieu });
        if (rf_kh_sx.current) {
            rf_kh_sx.current.focus();
        }
    }

    const onChangeProductionPlan = (value: any, option: any) => {
        const receiptContent = `Xuất sản xuất - ${option.props.title}`;
        setDataReceiptVm({ ...dataReceiptVm, productionPlanID: value, receiptContent: receiptContent });
        if (rf_employeeCode.current) {
            rf_employeeCode.current.focus();
        }
    }

    const onChangeEmployee = async (value: any, option: any) => {
        setDataReceiptVm({ ...dataReceiptVm, employeeCode: value || '' });
        if (rf_receiptContent.current) {
            rf_receiptContent.current.focus();
        }
    }

    const handleFilterNhanVien = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const onSelectReceiptDetail = async (value: any, option: any) => {

        var hanghoa = cateProductVmModel.find((element) => {
            return element.productID === value;
        });
        var hanghoaItem = hanghoa || { ma: '', calculationUnit: '', productName: '', productTypeID: '' };

        var calculationUnit = '';
        // var specificationHH = await cateProductService.GetListQuyCach(value);
        // setDataQuyCachHH(specificationHH.data);
        // if (specificationHH.data.length > 0) {
        //     if (specificationHH.data) {
        //         calculationUnit = specificationHH.data[0].specification;
        //     }
        // }
        // else {
        //     calculationUnit = hanghoaItem.calculationUnit;
        // }

        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, productID: value, calculationUnit: calculationUnit, productName: hanghoaItem.productName, productTypeID: hanghoaItem.productTypeID });

        var ngatct = moment(dataReceiptVm.receiptDate, 'YYYY/MM/DD');
        var month = ngatct.format('YYYYMM');
        //const widthhanghoa = dataReceiptVm.storeID !== '' ? dataReceiptVm.storeID : (dataStore.length > 0 ? dataStore[0].storeID : '');
        const monthID = dataReceiptVm.monthID !== '' ? dataReceiptVm.monthID : month;

        var itemInstockInfo = await beginningInventoryService.GetImeiInventoryMaterial({ materialType: 'C', branchID: branchId, storeTypeID: '02', productID: value, monthID: monthID });
        const totalQuantity = itemInstockInfo.data.length;
        setOptionInstockImei({ ...optionInstockImei, productName: hanghoaItem.productName, totalQuantity: totalQuantity, lstInstockImei: itemInstockInfo.data });

        if (rf_quantity_receiptVm.current) {
            rf_quantity_receiptVm.current.focus();
            rf_quantity_receiptVm.current.select();
        }
    }

    const onSelectQuyCachHangHoaCTNXHH = async (value: any, option: any) => {
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, calculationUnit: value });
    }

    const onChangeQuantityReceiptDetail = (value: any) => {
        const floatValue = value.floatValue || 0;
        const totalAmount = ((floatValue || 0) * dataInputReceiptDetailVm.unitPrice);
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, quantity: floatValue, totalAmount: totalAmount });
    }

    const onChangeDescriptionReceiptDetail = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, description: value });

        let _dataLstReceiptDetail = Object.assign(Array<receiptDetailVm>(), dataLstReceiptDetail);
        if (_dataLstReceiptDetail && _dataLstReceiptDetail.length > 0) {
            _dataLstReceiptDetail[0].description = value;
            setDataLstReceiptDetail(_dataLstReceiptDetail);
        }

    }

    const onChangereceiptTab = (activeKey: string) => {
        setTabActive(activeKey);
    }

    const onChangeCHITIET_DSTON_receiptTab = (activeKey: string) => {
        setTabCT_DS_TON_Active(activeKey);
    }

    // const FormatSokg = (weight: string) => {
    //     if (weight.length < 5) {
    //         var _weight = '';
    //         for (var i = 1; i <= (5 - weight.length); i++) {
    //             _weight += '0';
    //         }
    //         return _weight + weight;
    //     }
    //     return weight;
    // }

    const onChangeSteelType = (value: any) => {
        setFilterRequestDSTON({ ...filterRequestDSTON, steelType: value === undefined ? '' : value });
    }

    const onChangeWidth = (value: any) => {
        setFilterRequestDSTON({ ...filterRequestDSTON, width: value === undefined ? '' : value });
    }


    const onChangeThickness = (value: any) => {
        setFilterRequestDSTON({ ...filterRequestDSTON, thickness: value === undefined ? '' : value });
    }

    const onChangeGalvanizedOrganization = (value: any) => {
        setFilterRequestDSTON({ ...filterRequestDSTON, galvanizedOrganization: value === undefined ? '' : value });
    }

    const filterDataImei = (e: any) => {
        let dataFilter = [...dataInstock].filter((p: receiptImei) =>
            (p.steelType === filterRequestDSTON.steelType || filterRequestDSTON.steelType === '')
            && (p.thickness === filterRequestDSTON.thickness || filterRequestDSTON.thickness === '')
            && (p.width === filterRequestDSTON.width || filterRequestDSTON.width === '')
            && (p.galvanizedOrganization === filterRequestDSTON.galvanizedOrganization || filterRequestDSTON.galvanizedOrganization === ''));
        setShowDataTONNL(dataFilter);
    }

    const SetDataChiTietOutputRollInventory = async (datas: Array<receiptImei>) => {
        let dataImeis = Array<receiptImei>();
        let keyImeis = [];
        let sumSoluong = 0;
        let sumweight = 0, sumweight2 = 0, sumweight3 = 0;
        if (datas) {
            datas.forEach((element: receiptImei, index: number) => {
                sumSoluong += 1;
                sumweight += element.weight1;
                sumweight2 += element.weight2;
                sumweight3 += element.weight3;
                keyImeis.push(element.key);
                dataImeis.push({
                    receiptImeiID: element.receiptImeiID,
                    receiptID: element.receiptID,
                    receiptDetailID: element.receiptDetailID,
                    productID: element.productID,
                    quantity: 1,
                    standard: element.standard,
                    steelType: element.steelType,
                    vendor: element.vendor,
                    productionBatchNo: element.productionBatchNo,
                    galvanizedOrganization: element.galvanizedOrganization,
                    steelPrice: element.steelPrice,
                    width: element.width,
                    thickness: element.thickness,
                    weight: element.weight,
                    imei: element.imei,
                    specification: element.specification,
                    description: element.description,
                    sortOrder: index + 1,
                    parentID: element.receiptImeiID,
                    weight1: element.weight1,
                    weight2: element.weight2,
                    weight3: element.weight3,
                    image: '',
                    image2: '',
                    image3: '',
                    receiptDate: element.receiptDate,
                    ten_lnl: '',
                    workProcessID: workProcessID,
                    listSteelDefectDetails: element.listSteelDefectDetails,
                    createdBy: userName,
                });
            });
        }
        setDataReceiptImeiAPI([]);
        setTimeout(() => {
            setDataReceiptImeiAPI(dataImeis);
        }, 300);

        let _dataLstReceiptDetail = Array<receiptDetailVm>();
        _dataLstReceiptDetail.push({
            receiptDetailID: dataInputReceiptDetailVm.receiptDetailID,
            receiptID: dataInputReceiptDetailVm.receiptID,
            productID: dataInputReceiptDetailVm.productID,
            calculationUnit: dataInputReceiptDetailVm.calculationUnit,
            quantity: sumSoluong,
            unitPrice: 0,
            totalAmount: 0,
            scaleNo: '',
            scaleDate: new Date(),
            weight: sumweight,
            totalWeight1: sumweight,
            totalWeight2: sumweight2,
            totalWeight3: sumweight3,
            isImei: true,
            description: dataInputReceiptDetailVm.description,
            // createDate: new Date(),
            productTypeID: '',
            productName: '',
            vuotton: false,
            index: 1,
        });
        setDataLstReceiptDetail(_dataLstReceiptDetail);

        dataInputReceiptDetailVm.quantity = sumSoluong;
        dataInputReceiptDetailVm.weight = sumweight;
        dataInputReceiptDetailVm.totalWeight1 = sumweight;
        dataInputReceiptDetailVm.totalWeight2 = sumweight2;
        dataInputReceiptDetailVm.totalWeight3 = sumweight3;
        setDataInputReceiptDetailVm(dataInputReceiptDetailVm);

    }

    const addReceipt = async (e: any) => {

        if (cateMonthInfo == false) {
            message.error('Ngày ' + moment(dataReceiptVm.receiptDate).format(dateFormat) + ' đã khóa sổ');
            return false;
        }
        else {

            setTabCT_DS_TON_Active('tab_danh_sach_ton_hang_hoa');

            setTabActive('nhap_receiptVm_cuon');

            setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: dataReceiptVmInit, receiptID: -1 });

            setDataLstReceiptDetail([]);
            setDataReceiptImeiAPI([]);

            await GetReceiptNo(dataReceiptVm.receiptDate);

            if (cateProductVmModel && cateProductVmModel.length > 0) {
                onSelectReceiptDetail(cateProductVmModel[0].productID, '');
            }
            const hanghoa = [...cateProductVmModel][0];

            setDataInputReceiptDetailVm({
                ...dataInputReceiptDetailVm,
                receiptDetailID: 0,
                receiptID: 0,
                productID: '',
                calculationUnit: '',
                quantity: 0,
                unitPrice: 0,
                totalAmount: 0,
                weight: 0,
                totalWeight1: 0,
                totalWeight2: 0,
                totalWeight3: 0,
                isImei: true,
                description: '',
                // createDate: new Date(),
                productTypeID: '',
                productName: '',
                vuotton: false,
                index: -1
            });
            setDataInputReceiptDetail({
                ...dataInputReceiptDetail,
                receiptImeiID: 0,
                receiptID: 0,
                receiptDetailID: 0,
                productID: 'CUON',
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

            setOptionInstockImei({
                ...optionInstockImei,
                productName: '',
                totalQuantity: 0,
                lstInstockImei: Array<receiptImei>()
            });

        }

        setOptionReceipt({ ...optionReceipt, isupdatectreceiptVm: false, isEditing: true });

        if (rf_noi_sx.current) {
            rf_noi_sx.current.focus();
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
            setOptionReceipt(prevState => ({ ...prevState, isupdatereceiptVmhh: false, isEditing: true }));

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
                    OnDeletedreceipt(e);
                },
                onCancel() { },
            });
        }
    }

    const OnDeletedreceipt = async (e: any) => {
        var reDelete = await receiptService.DeleteReceipt(optionReceipt.receiptID);;
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
                case 'description':

                    break;
                default:
                    break;
            }
        }
    }

    const onSelectReceipt = async (selection: receiptVm, dataInit?: Array<receiptVm>) => {

        if (optionReceipt.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: dataReceiptVmInit, receiptID: -1 });
        }
        else {
            setLoadingPage(true);
            setTabCT_DS_TON_Active('tab_chi_tiet_hang_hoa');
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

            var lstCTNXandIMEI = await receiptService.GetListReDetail_AND_ReIMEI(selection.receiptID);
            if (lstCTNXandIMEI) {

                var lstCT = lstCTNXandIMEI.data.listReceiptDetails as Array<receiptDetailVm>;
                var lstimei = lstCTNXandIMEI.data.listReceiptImeis as Array<receiptImei>;

                setDataLstReceiptDetail(lstCT);
                setDataInputReceiptDetailVm(lstCT[0]);
                if (lstimei && lstimei.length > 0) {
                    receiptVmItem.standard = lstimei[0].standard;
                    receiptVmItem.steelType = lstimei[0].steelType;
                    receiptVmItem.productionBatchNo = lstimei[0].productionBatchNo;
                    receiptVmItem.galvanizedOrganization = lstimei[0].galvanizedOrganization;
                    receiptVmItem.steelPrice = lstimei[0].steelPrice;
                }
                setDataReceiptImeiAPI(lstimei);
                lstimei.forEach(item => {
                    item.key = item.receiptImeiID + item.imei;
                });
                setDataSelectTONNL(lstimei);

                var itemInstockInfo = await beginningInventoryService.GetImeiInventoryMaterial({ materialType: 'C', productID: lstCT[0].productID, monthID: receiptVmItem.monthID, storeTypeID: '02', branchID: branchId });
                const totalQuantity = itemInstockInfo.data.reduce((quantity: number, obj: receiptImei) => {
                    return quantity + obj.quantity;
                }, 0);
                setOptionInstockImei({ ...optionInstockImei, productName: lstCT[0].productName, totalQuantity: totalQuantity, lstInstockImei: itemInstockInfo.data });

            }

            setDataReceiptVm(receiptVmItem);

            setOptionReceipt(prevState => ({
                ...prevState,
                counterreceiptVm: 0,
                isEditing: false,
                isSubmit: false,
                receiptID: selection.receiptID,
                receiptNo: selection.receiptNo
            }));

            let _instockDetailRequest = { ...instockDetailRequest };
            _instockDetailRequest.monthID = receiptVmItem.monthID;
            // _instockDetailRequest.storeID = receiptVmItem.storeID;
            setInstockDetailRequest({ ...instockDetailRequest, monthID: receiptVmItem.monthID });
            await GetImeiInventoryMaterial(_instockDetailRequest);
            await CheckMonthIsOpen(receiptVmItem.receiptDate);
            setDataInputReceiptDetail({
                ...dataInputReceiptDetail,
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
            message.error('Vui lòng chọn nơi sản xuất');
            return false;
        }
        if (dataReceiptVm.productionPlanID === '') {
            message.error('Vui lòng chọn kế hoạch xuất ');
            return false;
        }
        if (dataLstReceiptDetail.length <= 0) {
            message.error('Vui lòng nhập chi tiết nguyên liệu');
            return false;
        }
        setOptionReceipt({ ...optionReceipt, isSubmit: true });
        dataLstReceiptDetail[0].productID = "CUON";
        dataLstReceiptDetail[0].calculationUnit = "Cuộn";
        dataReceiptVm.createdBy = userName;
        var data = await receiptService.UpdateReceipt(dataReceiptVm, dataLstReceiptDetail, dataReceiptImei);
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionReceipt({ ...optionReceipt, isSubmit: false });
        }
        else {
            message.success('Xuất nguyên liệu cuộn thành công');
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

    const cancelReceipt = async (e: any, receiptDate?: Date) => {

        if (dataReceiptVm.receiptID > 0 && optionReceipt.isEditing) {

            var itemreceipt = dataLstReceiptVm.lstReceipt.find((element) => {
                return element.receiptID === dataReceiptVm.receiptID;
            }) || dataReceiptVmInit;

            if (itemreceipt) {

                itemreceipt.receiptDate = new Date(itemreceipt.receiptDate);
                setDataReceiptVm(itemreceipt);
                setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: itemreceipt });

                var lstCTNXandIMEI = await receiptService.GetListReDetail_AND_ReIMEI(itemreceipt.receiptID);
                if (lstCTNXandIMEI) {

                    var lstCT = lstCTNXandIMEI.data.listReceiptDetails as Array<receiptDetailVm>;
                    var lstimei = lstCTNXandIMEI.data.listReceiptImeis as Array<receiptImei>;

                    setDataLstReceiptDetail(lstCT);
                    setDataReceiptImeiAPI(lstimei);

                }

                setOptionReceipt(prevState => ({
                    ...prevState,
                    counterreceiptVm: 0,
                    isEditing: false,
                    isSubmit: false,
                    receiptID: itemreceipt.receiptID,
                    receiptNo: itemreceipt.receiptNo
                }));

            }
        }
        else {

            setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: dataReceiptVmInit, receiptID: -1 });
            setOptionReceipt({ ...optionReceipt, receiptID: 0, receiptNo: '', counterreceiptVm: 0, isEditing: false, isSubmit: false });

            var _receiptDate = moment(receiptDate || dataReceiptVm.receiptDate, 'YYYY/MM/DD');
            var _month = _receiptDate.format('YYYYMM');

            setDataReceiptVm({
                ...dataReceiptVm,
                receiptID: 0,
                branchID: branchId,
                monthID: '',
                receiptDate: receiptDate || dataReceiptVm.receiptDate,
                receiptType: 'X',
                materialType: materialType,
                receiptNo: '',
                sophieu: '',
                sohd: '',
                licensePlate: '',
                businessID: businessID,
                // storeID: storeId,
                // storeIDc: storeID,
                counterpartyID: '',
                productionPlanID: '',
                employeeCode: '',
                receiptContent: '',
                httt: 'TM',
                // steelPrice: 0,
                ctlq: 0,
                chkhau: 0,
                thue: 0,
                isPrintBarCode: false,
                createdBy: userName,
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
            setDataReceiptImeiAPI([]);

            setDataInputReceiptDetailVm({
                ...dataInputReceiptDetailVm,
                receiptDetailID: 0,
                receiptID: 0,
                productID: '',
                calculationUnit: '',
                quantity: 0,
                unitPrice: 0,
                totalAmount: 0,
                weight: 0,
                totalWeight1: 0,
                totalWeight2: 0,
                totalWeight3: 0,
                isImei: true,
                description: '',
                // createDate: new Date(),
                productTypeID: '',
                productName: '',
                vuotton: false,
                index: -1
            });
            setDataInputReceiptDetail({
                ...dataInputReceiptDetail,
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

            setOptionInstockImei({
                ...optionInstockImei,
                productName: '',
                totalQuantity: 0,
                lstInstockImei: Array<receiptImei>()
            });

            setShowDataTONNL([]);
            setDataTONNL([]);
            setDataSelectTONNL([]);
            setSelectNLKHOTargetKeys([]);
            setSelectXuatKHOTargetKeys([]);

        }

    }

    const onChangeSearchFrDate = async (date: any, dateString: string) => {
        setModelRequest({ ...modelRequest, frdate: date });
    }

    const onChangeSearchToDate = async (date: any, dateString: string) => {
        setModelRequest({ ...modelRequest, todate: date });
    }

    const onchangeDoiTacSearch = (value: any) => {
        setModelRequest({ ...modelRequest, counterpartyID: value });
    }

    const handleFilterDoiTacSearch = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const onchangereceiptNoSearch = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModelRequest({ ...modelRequest, receiptNo: value });
    }

    const onSearchLoaiNL = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const onSearchKho = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const onSearchDay = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const Seachreceipt = async (e: any) => {
        e.preventDefault();
        await SearchListReceipt(modelRequest);
    }

    const onSelectChangeNLKHO = (selectedRowKeys: any) => {
        setSelectNLKHOTargetKeys(selectedRowKeys);
    }

    const onSelectChangeXuatKHO = (selectedRowKeys: any) => {
        setSelectXuatKHOTargetKeys(selectedRowKeys);
    }

    const moveImeiToXuat = async () => {

        let dataSelected = [...dataInstock].filter((p: receiptImei) => selectNLKHOTargetKeys.includes(p.receiptImeiID.toString()) == true);
        var newArray = [...dataSelectTONNL].concat(dataSelected);
        setDataSelectTONNL(newArray);
        await SetDataChiTietOutputRollInventory(newArray);
        let dataFuther = [...dataShowTONNL].filter((p: receiptImei) => selectNLKHOTargetKeys.includes(p.receiptImeiID.toString()) == false);
        setShowDataTONNL(dataFuther);
        setSelectNLKHOTargetKeys([]);
    }

    const backImeiToKHo = async () => {

        let dataSelected = [...dataSelectTONNL].filter((p: receiptImei) => selectXuatKHOTargetKeys.includes(p.receiptImeiID.toString()) == true);
        let dataFuther = [...dataSelectTONNL].filter((p: receiptImei) => selectXuatKHOTargetKeys.includes(p.receiptImeiID.toString()) == false);
        setDataSelectTONNL(dataFuther);
        var newArray = dataShowTONNL.concat(dataSelected);
        setShowDataTONNL(newArray);
        await SetDataChiTietOutputRollInventory(dataFuther);
        setSelectXuatKHOTargetKeys([]);
    }

    const getBarCodeQuetMaApp = async (productionPlanID: string, _dataShowTONNL: any, _dataSelectTONNL: any) => {
        setLoadingPage(true);
        var data = await taskDeliveryAppService.GetListProductImeiByPlanId(productionPlanID);
        if (data.data !== null && data.data.length > 0) {
            if (dataInstock.length > 0) {

                let dataSelected = _dataShowTONNL.filter((p: productImei) => data.data.find((model: { imei: string; }) => model.imei == p.imei));
                let dataFuther = _dataShowTONNL.filter((p: productImei) => data.data.find((model: { imei: string; }) => model.imei == p.imei) == undefined);
                setShowDataTONNL(dataFuther);
                const _dataSelectTONNLUnion = _dataSelectTONNL.concat(dataSelected);
                setDataSelectTONNL(_dataSelectTONNLUnion);
                await SetDataChiTietOutputRollInventory(_dataSelectTONNLUnion);

                setSelectNLKHOTargetKeys([]);
                setSelectXuatKHOTargetKeys([]);

                message.success(`Đã nhập thành công ${dataSelected.length}/${data.data.length}`);

                setLoadingPage(false);

            }
            else {
                message.success(`Đã nhập thành công 0/${data.data.length}`);
                setLoadingPage(false);
            }
        }
        else {
            setLoadingPage(false);
        }
    }

    const showEditLoiCuon = (e: any, listSteelDefectDetails?: steelDefectDetail[], description?: string, indexRow?: number) => {
        e.preventDefault();
        ShowModal({
            dvId: 'dgAddUpLoiCuon',
            component: errorModalProps,
            dataProps: { steelType: materialType, listSteelDefectDetails: listSteelDefectDetails, description: description, indexRow: indexRow, callBackChoose: callBackChooseLoi }
        });
    }

    const callBackChooseLoi = (listSteelDefectDetails: steelDefectDetail[], description: string, indexRow: number) => {
        if (indexRow > -1) {
            var datas = [...dataReceiptImei];
            datas[indexRow].listSteelDefectDetails = listSteelDefectDetails;
            datas[indexRow].description = description;
            setDataReceiptImeiAPI([]);
            setTimeout(() => {
                setDataReceiptImeiAPI(datas);
                rf_DataGrid_imei_receiptVm.current.cancelEdit();
            }, 300);
        } else {
            var datas = [...dataReceiptImei];
            datas.forEach(item => {
                item.listSteelDefectDetails = listSteelDefectDetails;
                item.description = description
            });
            setDataReceiptImeiAPI([]);
            setTimeout(() => {
                setDataReceiptImeiAPI(datas);
                rf_DataGrid_imei_receiptVm.current.cancelEdit();
            }, 300);
        }
    }

    const AddProductionPlan = (e: any) => {
        e.preventDefault();
        ShowModal({
            dvId: 'dgAddProductionPlan', //dgAddKHSX
            component: cateProductionSubForm,
            dataProps: { steelType: 'KHXB', callBack: callBackAddProductionPlan }
        });
    }

    const callBackAddProductionPlan = async (value: string, title: string) => {
        await GetDataProductionPlan();
        const receiptContent = `Xuất sản xuất - ${title}`;
        setDataReceiptVm({ ...dataReceiptVm, productionPlanID: value, receiptContent: receiptContent });
        if (rf_employeeCode.current) {
            rf_employeeCode.current.focus();
        }
    }
    const rowSelection: TableRowSelection<receiptImei> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        }
    };
    return (
        <Fragment>
            <Spin spinning={loadingPage}>
                <div className="page-pannel">
                    <div className="page-pannel-left page-pannel-left-25">
                        <div className="pannel-left-body-not-header">
                            <div className="fl-lef w-90">
                                <div className="fl-lef w-50">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        disabled={optionReceipt.isEditing}
                                        value={dayjs(modelRequest.frdate)}
                                        format={dateFormat}
                                        onChange={onChangeSearchFrDate}
                                    />
                                </div>
                                <div className="fl-lef w-50">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        disabled={optionReceipt.isEditing}
                                        value={dayjs(modelRequest.todate)}
                                        format={dateFormat}
                                        onChange={onChangeSearchToDate}
                                    />
                                </div>
                            </div>
                            <div className="fl-lef w-10 text-center">
                                <Button disabled={optionReceipt.isEditing} type="primary" icon={<SearchOutlined />} onClick={e => Seachreceipt(e)}></Button>
                            </div>
                            <div className="clearfix h-5"></div>
                            <div className="fl-lef w-45">
                                <Select
                                    value={modelRequest.counterpartyID}
                                    className="input-text-upercase"
                                    disabled={optionReceipt.isEditing}
                                    style={{ width: '100%' }}
                                    size="small"
                                    allowClear
                                    showSearch
                                    placeholder="Đối tác"
                                    optionFilterProp="children"
                                    optionLabelProp="value"
                                    onChange={onchangeDoiTacSearch}
                                    filterOption={handleFilterDoiTacSearch}
                                >
                                    {counterPartySearchModel && counterPartySearchModel.map(d => (
                                        <Option title={d.counterpartyName} key={d.counterpartyID} value={d.counterpartyID}>
                                            <span>{d.counterpartyID} - {d.counterpartyName}</span>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="fl-lef w-45">
                                <Input
                                    size="small"
                                    placeholder="Số ct"
                                    disabled={optionReceipt.isEditing}
                                    value={modelRequest.receiptNo} onChange={onchangereceiptNoSearch} />
                            </div>
                            <div className="clearfix h-5"></div>
                            <DataGrid
                                disabled={optionReceipt.isEditing}
                                data={dataLstReceiptVm.lstReceipt}
                                style={{ height: (window.innerHeight - 190) }}
                                onSelectionChange={onSelectReceipt}
                                selection={dataSelectReceipt.receiptVm}
                                selectionMode="single">
                                <GridColumn title="Số CT" field="receiptNo" width="20%" />
                                <GridColumn title="Nơi SX" field="counterpartyName" width="65%" />
                                <GridColumn title="Số lượng" field="quantity" width="15%" align="right"
                                    header={() => <span>Số lượng</span>}
                                    render={({ row }: any) => (
                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid text-red w-100" thousandSeparator={true} value={row.quantity} type='tel' />
                                    )}
                                />
                            </DataGrid>
                        </div>
                        <div className="pannel-left-footer">
                            <div className="inline-bolck w-60">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    <b>Tổng Cộng: </b>
                                </div>
                                <div className="inline-bolck mr-right-5 input-control  input-bg-special">
                                    <b>
                                        <NumericFormat
                                            readOnly
                                            className="ant-input-number-input input-text-right text-red w-100"
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
                    <div className="page-pannel-right page-pannel-right-75">
                        <div className="pannel-right-body">
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số CT
                                </div>
                                <div className="inline-bolck input-control">
                                    <Input size="small" disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)} readOnly name="receiptNo" value={dataReceiptVm.receiptNo} onChange={handleChangeInput} />
                                </div>
                            </div>
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5 ">
                                    Ngày CT
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <DatePicker size="small" disabled={optionReceipt.isEditing} onChange={onChangeReceiptDate} value={dayjs(dataReceiptVm.receiptDate)} defaultValue={dayjs(dataReceiptVm.receiptDate)} format={dateFormat} />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Kho
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.storeID}
                                        placeholder="Chọn width hàng"
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
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Nghiệp Vụ
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Input size="small" disabled={true} value={`${dataReceiptVm.businessID}${(dataReceiptVm.businessName ? `- ${dataReceiptVm.businessName}` : '')}`} />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Nơi SX
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        ref={rf_noi_sx}
                                        showAction={['focus']}
                                        className="input-text-upercase"
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.counterpartyID}
                                        placeholder="Chọn nơi sản xuất"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangecateCounterparty}
                                    >
                                        {cateCounterparty && cateCounterparty.map(d => (
                                            <Option title={(d.counterpartyID + '-' + d.counterpartyName)} data-kyhieu={d.counterpartyType} key={d.counterpartyID} value={d.counterpartyID}>
                                                <span>{d.counterpartyID} - {d.counterpartyName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    KH SX
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        ref={rf_kh_sx}
                                        showAction={['focus']}
                                        className="input-text-upercase"
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        size="small"
                                        style={{ width: '90%' }}
                                        showSearch
                                        value={dataReceiptVm.productionPlanID}
                                        placeholder="Chọn khách hàng sản xuất"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangeProductionPlan}
                                    >
                                        {lstCateProductionPlanModel && lstCateProductionPlanModel.map(d => (
                                            <Option title={(d.productionPlanID + '-' + d.planName)} data-ten={d.planName} key={d.productionPlanID} value={d.productionPlanID}>
                                                <span>{d.productionPlanID} - {d.planName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                    <Button className="button" disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)} type="primary" icon={<PlusOutlined />} size="small" style={{ marginLeft: 5 }}
                                        onClick={e => AddProductionPlan(e)}
                                    ></Button>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Nhân viên
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        ref={rf_employeeCode}
                                        showAction={['focus']}
                                        className="input-text-upercase"
                                        allowClear={true}
                                        disabled={!optionReceipt.isEditing}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.employeeCode}
                                        placeholder="Chọn nhân viên trực ca"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangeEmployee}
                                        filterOption={handleFilterNhanVien}
                                        getPopupContainer={(trigger: any) => trigger.parentNode}
                                    >
                                        {employeeModel && employeeModel.map(d => (
                                            <Option title={(d.employeeCode + '-' + d.fullName)} key={d.employeeCode} value={d.employeeCode}>
                                                <span>{d.employeeCode} - {d.fullName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Nội dung
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Input size="small" disabled={!optionReceipt.isEditing} name="receiptContent" value={dataReceiptVm.receiptContent} onChange={handleChangeInput} />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <Tabs className='custom-tab-control' tabPosition='top' defaultActiveKey={tabCT_DS_TON_Active} activeKey={tabCT_DS_TON_Active} onChange={onChangeCHITIET_DSTON_receiptTab}>
                                <TabPane tab='Chi tiết hàng' key='tab_chi_tiet_hang_hoa'>
                                    <div className="tool-bar-cthh" style={{ marginBottom: 2, marginTop: 15 }}>
                                        <div className="inline-bolck w-16 mr-1">
                                            <div id="inputHangHoa">
                                                <Select
                                                    className="select-hanghoa-input input-text-upercase"
                                                    ref={rf_hanghoa_receiptVm}
                                                    disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0) || tabActive === 'nhap_receiptVm_chitiet_cuon'}
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    value={dataInputReceiptDetailVm.productID}
                                                    placeholder="Chọn hàng hóa"
                                                    optionLabelProp="value"
                                                    showAction={["focus"]}
                                                    filterOption={false}
                                                    onChange={onSelectReceiptDetail}
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
                                        <div className="inline-bolck w-13 mr-1">
                                           
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <div className="ant-input-number-sm ant-input-number ant-input-number-disabled">
                                                <NumericFormat
                                                    readOnly
                                                    getInputRef={rf_tongkg1_receiptVm}
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    min={0}
                                                    value={dataInputReceiptDetailVm.weight}
                                                    name="weight"
                                                    onKeyDown={handleKeyDownInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <div className="ant-input-number-sm ant-input-number ant-input-number-disabled">
                                                <NumericFormat
                                                    readOnly={true}
                                                    getInputRef={rf_quantity_receiptVm}
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    value={dataInputReceiptDetailVm.quantity}
                                                    name="quantity"
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <div className="ant-input-number-sm ant-input-number ant-input-number-disabled">
                                                <NumericFormat
                                                    readOnly={true}
                                                    getInputRef={rf_quantity_receiptVm}
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    value={dataInputReceiptDetailVm.totalWeight1}
                                                    name="totalWeight1"
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <div className="ant-input-number-sm ant-input-number ant-input-number-disabled">
                                                <NumericFormat
                                                    readOnly={true}
                                                    getInputRef={rf_quantity_receiptVm}
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    value={dataInputReceiptDetailVm.totalWeight2}
                                                    name="totalWeight2"
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <div className="ant-input-number-sm ant-input-number ant-input-number-disabled">
                                                <NumericFormat
                                                    readOnly={true}
                                                    getInputRef={rf_quantity_receiptVm}
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    value={dataInputReceiptDetailVm.totalWeight3}
                                                    name="totalWeight3"
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-bolck w-30 mr-1">
                                            <Input
                                                ref={rf_description_receiptVm}
                                                size="small"
                                                disabled={!optionReceipt.isEditing || (tabActive === 'nhap_receiptVm_chitiet_cuon' && dataReceiptVm.receiptID <= 0)}
                                                value={dataInputReceiptDetailVm.description}
                                                name="description"
                                                onKeyDown={handleKeyDownInput}
                                                onChange={onChangeDescriptionReceiptDetail}
                                            />
                                        </div>
                                    </div>
                                    <div className="hanghoaInputNXNL">
                                        <DataGrid
                                            ref={rf_DataGrid_imei_receiptVm}
                                            disabled={!optionReceipt.isEditing || dataInputReceiptDetailVm.quantity <= 0}
                                            data={dataReceiptImei}
                                            style={{ height: (window.innerHeight - 500) }}
                                        >
                                            <GridColumn title="STT" key="sortOrder" field="sortOrder" width="5%" />
                                            <GridColumn title="Imei" key="imei" field="imei" width="25%" align="left" />
                                            <GridColumn title="Số kg 1" field="weight1" key="weight1" width="7%" align="right"
                                                header={() => <span>Số kg 1</span>}
                                                editable={false}
                                                render={({ row }: any) => (
                                                    <div className='bg_weight_1'>
                                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid w-100" thousandSeparator={true} value={row.weight1} />
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="Số kg 2" field="weight2" key="weight2" width="7%" align="right"
                                                header={() => <span>Số kg 2</span>}
                                                editable={false}
                                                render={({ row }: any) => (
                                                    <div className='bg_weight_2'>
                                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid w-100" thousandSeparator={true} value={row.weight2} />
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="Số kg 3" field="weight3" key="weight3" width="7%" align="right"
                                                header={() => <span>Số kg 3</span>}
                                                editable={false}
                                                render={({ row }: any) => (
                                                    <div className='bg_weight_3'>
                                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid w-100" thousandSeparator={true} value={row.weight3} />
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="Ghi chú" key="description" field="description" width="15%" align="left"
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
                                                            <Button size="small" shape="circle" onClick={(e: any) => showEditLoiCuon(e, row.listSteelDefectDetails, row.description, row.sortOrder - 1)}>...</Button>
                                                        </div>
                                                    </>
                                                )}
                                            />
                                        </DataGrid>
                                        <div className="clearfix h-3"></div>
                                        <div className="totalQuantity-info text-right">
                                            <div className="inline-bolck mr-right-5">
                                                Tồn
                                            </div>
                                            <div className="inline-bolck mr-1">
                                                <Input size="small" disabled={!optionReceipt.isEditing} readOnly value={optionInstockImei.productName} />
                                            </div>
                                            <div className="inline-bolck mr-1">
                                                <div className="ant-input-number-sm ant-input-number">
                                                    <InputNumber className="ant-input-number-input" disabled={!optionReceipt.isEditing} value={optionInstockImei.totalQuantity} />
                                                </div>
                                            </div>
                                            <div className="inline-bolck mr-1 mr-top-5 w-100">
                                                <div className="small-combobox-easyui">
                                                    <ComboGrid
                                                        panelStyle={{ width: 650 }}
                                                        valueField="receiptDetailID"
                                                        textField="receiptNo"
                                                        data={optionInstockImei.lstInstockImei}
                                                    >
                                                        <GridColumn field="receiptDate" title="Ngày" width="15%" align="left"
                                                            header={() => <span>Ngày</span>}
                                                            render={({ row }: any) => (
                                                                <span>{moment(row.receiptDate).format(dateFormat)}</span>
                                                            )}
                                                        />
                                                        <GridColumn field="receiptNo" title="Số CT" width="10%" align="left"> </GridColumn>
                                                        <GridColumn field="imei" title="Imei" align="left" width="55%"> </GridColumn>
                                                    </ComboGrid>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Danh sách tồn" key='tab_danh_sach_ton_hang_hoa'>
                                    <div className="">
                                        <div className="fl-lef w-22">
                                            <div className="lable-cotrol inline-bolck mr-right-5">
                                                Loại NL
                                            </div>
                                            <div className="inline-bolck mr-right-5 input-control">
                                                <Select
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    allowClear
                                                    placeholder="Chọn loại nguyên liệu"
                                                    optionFilterProp="children"
                                                    optionLabelProp="title"
                                                    onChange={onChangeSteelType}
                                                    filterOption={onSearchLoaiNL}
                                                    getPopupContainer={(trigger: any) => trigger.parentNode}
                                                    disabled={!optionReceipt.isEditing}
                                                >
                                                    {dataSteelType && dataSteelType.map(d => (
                                                        <Option title={d.steelTypeName} key={d.steelTypeID} value={d.steelTypeID}>
                                                            <span>{d.steelTypeID} - {d.steelTypeName}</span>
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="fl-lef w-22">
                                            <div className="lable-cotrol inline-bolck mr-right-5">
                                                Khổ
                                            </div>
                                            <div className="inline-bolck mr-right-5 input-control">
                                                <Select
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    allowClear
                                                    placeholder="Chọn loại khổ"
                                                    optionFilterProp="children"
                                                    optionLabelProp="title"
                                                    onChange={onChangeWidth}
                                                    filterOption={onSearchKho}
                                                    getPopupContainer={(trigger: any) => trigger.parentNode}
                                                    disabled={!optionReceipt.isEditing}
                                                >
                                                    {dataWidth && dataWidth.map(d => (
                                                        <Option title={d.widthName} key={d.widthID} value={d.widthID}>
                                                            <span>{d.widthID} - {d.widthName}</span>
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="fl-lef w-22">
                                            <div className="lable-cotrol inline-bolck mr-right-5">
                                                Dày
                                            </div>
                                            <div className="inline-bolck mr-right-5 input-control">
                                                <Select
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    allowClear
                                                    placeholder="Chọn dày"
                                                    optionFilterProp="children"
                                                    optionLabelProp="title"
                                                    onChange={onChangeThickness}
                                                    filterOption={onSearchDay}
                                                    getPopupContainer={(trigger: any) => trigger.parentNode}
                                                    disabled={!optionReceipt.isEditing}
                                                >
                                                    {dataCateThickness && dataCateThickness.map(d => (
                                                        <Option title={d.thicknessName} key={d.thicknessID} value={d.thicknessID}>
                                                            <span>{d.thicknessID} - {d.thicknessName}</span>
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="fl-lef w-22">
                                            <div className="lable-cotrol inline-bolck mr-right-5">
                                                Đơn vị mạ
                                            </div>
                                            <div className="inline-bolck mr-right-5 input-control">
                                                <Select
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    allowClear
                                                    placeholder="Chọn đơn vị mạ"
                                                    optionFilterProp="children"
                                                    optionLabelProp="title"
                                                    onChange={onChangeGalvanizedOrganization}
                                                    filterOption={onSearchDay}
                                                    getPopupContainer={(trigger: any) => trigger.parentNode}
                                                    disabled={!optionReceipt.isEditing}
                                                >
                                                    {dataCateGalvanizedOrganization && dataCateGalvanizedOrganization.map(d => (
                                                        <Option title={d.galvanizedOrganizationName} key={d.galvanizedOrganizationID} value={d.galvanizedOrganizationID}>
                                                            <span>{d.galvanizedOrganizationID} - {d.galvanizedOrganizationName}</span>
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="fl-lef w-10">
                                            <Button className="button" type="primary" icon={<PlusOutlined />} size="small"
                                                onClick={e => filterDataImei(e)} style={{ marginTop: 2 }}>Lọc</Button>
                                        </div>
                                        <div className="clearfix h-10"></div>
                                    </div>

                                    <div className="fl-lef w-48">
                                        <div style={{ height: (window.innerHeight - 445) }}>
                                            <Table
                                                rowSelection={
                                                    {
                                                        getCheckboxProps: (record: receiptImei) => ({
                                                            disabled: record.weight2 <= 0 || record.weight2 == null,
                                                            key: record.key
                                                        }),
                                                        selectedRowKeys: selectNLKHOTargetKeys,
                                                        onChange: onSelectChangeNLKHO,
                                                        columnWidth: '8%',
                                                        type: 'checkbox',
                                                    }
                                                }
                                                columns={[
                                                    {
                                                        title: `IMEI`,
                                                        dataIndex: 'imei',
                                                        render: (text, row, index) => <span>{row.imei}</span>,
                                                        width: '65%'
                                                    },
                                                    {
                                                        title: `Số kg2`,
                                                        dataIndex: 'weight2',
                                                        render: (text, row, index) => <div className='bg_weight_2'>
                                                            <NumericFormat readOnly className="ant-input-number-input input-text-right-grid w-100" thousandSeparator={true} value={row.weight2} type='tel' />
                                                        </div>,
                                                        width: '15%'
                                                    },
                                                ]}
                                                dataSource={dataShowTONNL}
                                                pagination={false}
                                                scroll={{ x: 0, y: window.innerHeight - 480 }}
                                            />
                                        </div>
                                        <div className="inline-bolck w-50">
                                            <div className="lable-cotrol inline-bolck mr-right-5">
                                                <b>Tổng Cộng: </b>
                                            </div>
                                            <div className="inline-bolck mr-right-5 input-control  input-bg-special">
                                                <b>
                                                    <NumericFormat
                                                        readOnly
                                                        className="ant-input-number-input input-text-right text-red w-100"
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        disabled={true}
                                                        value={dataShowTONNL.length} />
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fl-lef w-4">
                                        <div className="h-10"></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <Tooltip title='Lấy dữ liệu từ yêu cầu trên điện thoại' color='blue'>
                                                <Button
                                                    size="small"
                                                    disabled={!(optionReceipt.isEditing && dataReceiptVm.productionPlanID !== '')}
                                                    type="primary" icon={<QrcodeOutlined />}
                                                    onClick={() => getBarCodeQuetMaApp(dataReceiptVm.productionPlanID, dataShowTONNL, dataSelectTONNL)}
                                                />
                                            </Tooltip>

                                        </div>
                                        <div className="h-10"></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <Button
                                                size="small"
                                                disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && selectNLKHOTargetKeys.length <= 0)}
                                                type="primary" icon={<RightOutlined />}
                                                onClick={moveImeiToXuat}
                                            />
                                        </div>
                                        <div className="h-10"></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <Button
                                                size="small"
                                                disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && selectXuatKHOTargetKeys.length <= 0)}
                                                type="primary" icon={<LeftOutlined />}
                                                onClick={backImeiToKHo}
                                            />
                                        </div>
                                    </div>
                                    <div className="fl-lef w-48">
                                        <div style={{ height: (window.innerHeight - 445) }}>
                                            <Table 
                                                rowClassName={(record, index) => ''}
                                                rowSelection={{
                                                    type: 'checkbox',
                                                    selectedRowKeys: selectXuatKHOTargetKeys,
                                                    onChange: onSelectChangeXuatKHO,
                                                    columnWidth: '8%',
                                                    getCheckboxProps: (record: receiptImei) => ({
                                                        disabled: record.weight2 <= 0 || record.weight2 == null,
                                                        key: record.key
                                                    }),
                                                }}
                                                columns={[
                                                    {
                                                        title: `IMEI`,
                                                        dataIndex: 'imei',
                                                        render: (text, row, index) => <span>{row.imei}</span>,
                                                        width: '65%'
                                                    },
                                                    {
                                                        title: `Số kg2`,
                                                        dataIndex: 'weight2',
                                                        render: (text, row, index) => <div className='bg_weight_2'>
                                                            <NumericFormat readOnly className="ant-input-number-input input-text-right-grid w-100" thousandSeparator={true} value={row.weight2} />
                                                        </div>,
                                                        width: '15%'
                                                    },
                                                ]}
                                                dataSource={dataSelectTONNL}
                                                pagination={false}
                                                scroll={{ x: 0, y: window.innerHeight - 480 }}
                                                
                                            />
                                        </div>
                                        <div className="inline-bolck w-50">
                                            <div className="lable-cotrol inline-bolck mr-right-5">
                                                <b>Tổng Cộng: </b>
                                            </div>
                                            <div className="inline-bolck mr-right-5 input-control  input-bg-special">
                                                <b>
                                                    <NumericFormat
                                                        readOnly
                                                        className="ant-input-number-input input-text-right text-red w-100"
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        disabled={true}
                                                        value={dataSelectTONNL.length} />
                                                </b>
                                            </div>
                                        </div>
                                    </div>

                                </TabPane>
                            </Tabs>
                        </div>
                        <div className="clearfix h-50"></div>
                        <div className="pannel-right-footer">
                            {optionReceipt.isEditing ?
                                <div className="inline-bolck">
                                    <Button className="button" loading={optionReceipt.isSubmit} type="primary" icon={<SaveOutlined />} size="small"
                                        onClick={e => saveReceipt(e)}
                                    >Lưu</Button>
                                    <Button className="button" disabled={optionReceipt.isSubmit} type="primary" icon={<CloseOutlined />} size="small"
                                        onClick={e => cancelReceipt(e)}
                                        danger
                                    >Hủy</Button>
                                </div>
                                :
                                <div className="inline-bolck">
                                    <Fragment>
                                        <Button className="button" type="primary" icon={<PlusOutlined />} size="small"
                                            onClick={e => addReceipt(e)}>Thêm</Button>
                                        <Button className="button" type="primary" icon={<EditOutlined />} size="small"
                                            onClick={e => EditReceipt(e)}>Sửa</Button>
                                        <Button className="button" type="primary" icon={<CloseOutlined />} size="small"
                                            onClick={e => DeleteReceipt(e)} danger>Xóa</Button >

                                    </Fragment>
                                </div>
                            }

                            {
                                dataReceiptVm.receiptID > 0 ?
                                    <div className="inline-bolck">
                                        <ReactToPrint
                                            trigger={() => <Button className="button" disabled={optionReceipt.isSubmit} type="primary" icon={<PrinterOutlined />} size="small">In Phiếu</Button>}
                                            content={() => refhieuPrint.current ? refhieuPrint.current : eleEmty}
                                            pageStyle="@page { size: 21cm 29.7cm ; } @media print { body { -webkit-print-color-adjust: exact; } }"
                                        />
                                    </div>
                                    :
                                    <div className="inline-bolck"></div>
                            }

                        </div>
                        <div style={{ display: "none" }}>
                            <div ref={refhieuPrint}>
                                <div className="inline-bolck w-100 print-area">
                                    <PrintReceiptPlan branchInfo={branchInfo} dataReceiptVm={dataReceiptVm} dataReceiptDetail={(dataLstReceiptDetail.length > 0 ? dataLstReceiptDetail[0] : dataInputReceiptDetailVm)} dataLstIMEI={dataReceiptImei} />
                                </div>
                            </div>
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

export default OutputRollInventory;