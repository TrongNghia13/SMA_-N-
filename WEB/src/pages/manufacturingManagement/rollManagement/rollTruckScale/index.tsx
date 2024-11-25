import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Button, Input, DatePicker, Modal, InputNumber, message, Checkbox, Select, Tabs, Spin } from 'antd';
import { ComboGrid, GridColumn, DataGrid, TextBox, LinkButton } from 'rc-easyui';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';
import { EditOutlined, SaveOutlined, CloseOutlined, SearchOutlined, WarningOutlined, FileImageOutlined, UserAddOutlined, CaretUpOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { receiptVm } from '../../../../models/receipt';
import cateBranch from '../../../../models/cateBranch';
import cateStore from '../../../../models/cateStore';
import cateCounterparty from '../../../../models/cateCounterparty';
import cateCounterpartyGroup from '../../../../models/cateCounterpartyGroup';
// import QUYCACH_HH from '../../../../models/QUYCACH_HH';
import cateSteelType from '../../../../models/cateSteelType';
import cateStandard from '../../../../models/cateStandard';
import employee from '../../../../models/employee';
import cateProductionBatchNo from '../../../../models/cateProductionBatchNo';
import cateGalvanizedOrganization from '../../../../models/cateGalvanizedOrganization';
import truckScale from '../../../../models/truckScale';
import receiptRequest from '../../../../models/request/receiptRequest';
import { receiptDetailVm } from '../../../../models/receiptDetail';
import receiptImei from '../../../../models/receiptImei';
// import inventoryDetail from '../../../../models/sanxuat/inventoryDetail';

// import CBUserQuanTri from '../../../../components/CBUerQuantri/CBUserQuanTri';
import LoginUtils from '../../../../utils/loginUtils';

import steelDefectDetail from '../../../../models/steelDefectDetail';
import errorModalProps from '../../components/errorModal/index';
import { ShowModal } from '../../../../components/common/index';

import ReceiptService from '../../../../services/receiptService';
import CateStoreService from '../../../../services/cateStoreService';
import CateProductService from '../../../../services/cateProductService';
import EmployeeService from '../../../../services/employeeService';
import CateCounterpartyService from '../../../../services/cateCounterpartyService';

import CateBranchService from '../../../../services/cateBranchService';
import CateSteelTypeService from '../../../../services/cateSteelTypeService';
import CateStandardService from '../../../../services/cateStandardService';
import CateProductionBatchNoService from '../../../../services/cateProductionBatchNoService';
import CateGalvanizedOrganizationService from '../../../../services/cateGalvanizedOrganizationService';
import '../inputInventory/NhapNLCuon.scss';
import { APIStatus } from '../../../../configs/APIConfig';
import inventoryDetail from '../../../../models/productions/inventoryDetail';

const receiptService = new ReceiptService();
const cateStoreService = new CateStoreService();
const cateCounterpartyService = new CateCounterpartyService();
const cateBranchService = new CateBranchService();
const cateSteelTypeService = new CateSteelTypeService();
const cateStandardService = new CateStandardService();
const cateProductionBatchNoService = new CateProductionBatchNoService();
const cateGalvanizedOrganizationService = new CateGalvanizedOrganizationService();
const employeeService = new EmployeeService();



const { Option } = Select;
const RollTruckScale: React.FC = () => {

    const workProcessID = 'XB.04';
    const menuKeyNhapNL = 'rollTruckScale';
    const materialType = 'C';
    const businessID = 'N11';
    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.UserName;
    const branchId = userLoginInfo.BranchId
    // const isquantri = userLoginInfo.userinfo.isquantri == true ? true : false;
    // const iskiemsoatnoibo = userLoginInfo.userinfo.iskiemsoatnoibo == true ? true : false;

    const rf_sohd = useRef<any>(null);
    const rf_vendor = useRef<any>(null);
    const rf_standard = useRef<any>(null);
    const rf_steelType = useRef<any>(null);
    const rf_productionBatchNo = useRef<any>(null);
    const rf_galvanizedOrganization = useRef<any>(null);
    const rf_employeeID = useRef<any>(null);
    const rf_giamua = useRef<any>(null);
    const rf_receiptContent = useRef<any>(null);
    const rf_datagrid_imei_ctnx = useRef<any>(null);

    const dateFormat = 'DD/MM/YYYY';
    const [showModalBarcode, setShowModalBarcode] = useState(false);
    const [cateMonthInfo, setCateMonthInfo] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [isViewUser, setIsViewUser] = useState(false);
    const [donviUDUserLogin, setbranchInfo] = useState((() => {
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
        createdBy: '',
        // createdDate: new Date(),
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

    const [dataHangHoaNXNL, setDataHangHoaNXNL] = useState((() => {
        let dataInit: Array<receiptDetailVm> = [] as any;
        return dataInit;
    }));

    const [optionNXNL, setOptionNXNL] = useState((() => {
        let dataInit = { receiptID: 0, receiptNo: '', isupdatectreceiptVm: false, counterctnx: 0, isEditing: false, isSubmit: false };
        return dataInit;
    }));

    const [dataLstReceiptVm, setLstDataReceiptVm] = useState({ loading: true, totalQuantity: 0, lstNXNL: Array<receiptVm>() });
    const [dataLstReceiptVmDefault, setLstDataReceiptVmDefault] = useState(Array<receiptVm>());

    const [dataReceiptVm, setDataReceiptVm] = useState((() => {
        let dataInit: receiptVm = dataReceiptVmInit
        return dataInit;
    }));

    const [dataSelectNXNL, setDataSelectNXNL] = useState((() => {
        let dataInit = { ctnx: dataReceiptVmInit, idreceiptVm: 0 }
        return dataInit;
    }));

    const [dataChiTietHangHoaNXNL, setDataReceitImeiAPI] = useState((() => {
        let dataInit: Array<receiptImei> = [] as any;
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
            index: -1,
        };
        return dataInit;
    }));

    const [dataSelectReceiptImei, setdataSelectReceiptImei] = useState((() => {
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

    const [employeeModel, setEmployeeModel] = useState((() => {
        let dataInit: Array<employee> = [] as any;
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

    const [optionTONHH, setOptionTONHH] = useState((() => {
        let dataInit = { tenhh: '', tonhh: 0, lstCTTonHHH: Array<inventoryDetail>() };
        return dataInit;
    }));

    const [showCanXe, setShowCanXe] = useState(false);
    const [showCanXeLoading, setShowCanXeLoading] = useState(false);
    const [truckScaleModel, setTruckScaleModel] = useState((() => {
        let dataInit: truckScale = {
            receiptID: 0,
            scaleNo: '',
            licensePlate: '',
            scaleDate: new Date(),
            scaleEmployee: '',
            volumeGoods: 0,
            firstWeight: 0,
            secondWeight: 0
        };
        return dataInit;
    }));

    useEffect(() => {
        const controller = new AbortController();
        async function GetData() {

            await CheckMonthIsOpen(new Date());
            await GetBrandUserLogin();
            await SearchListReceipt(modelRequest);

            await GetDataStore();

            await GetDataCateCounterparty();
            await GetDataCateCounterpartyGroup();

            await GetListEmployee();

            await GetSteelType();
            await GetCateStandard();
            await GetCateProductionBatchNo();
            await GetCateGalvanizedOrganization();
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
        setLstDataReceiptVm({ ...dataLstReceiptVm, loading: true, totalQuantity: totalQuantity, lstNXNL: getDdata.data });
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

    const GetListEmployee = async () => {
        var getDdata = await employeeService.GetListEmployee();
        setEmployeeModel(getDdata.data);
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

    const onSelectReceipt = async (selection: receiptVm, dataInit?: Array<receiptVm>) => {

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

        await CheckMonthIsOpen(receiptVmItem.receiptDate);

        setDataSelectNXNL({ ...dataSelectNXNL, ctnx: receiptVmItem });
        // setModelUserRequest(receiptVmItem.qtri);
        setDataReceiptVm(receiptVmItem);

        let canxeInfo = Object.assign({}, truckScaleModel);
        canxeInfo.licensePlate = receiptVmItem.licensePlate;

        setTimeout(async () => {
            var lstCTNXandIMEI = await receiptService.GetListReDetail_AND_ReIMEI(selection.receiptID);
            if (lstCTNXandIMEI) {

                var lstCT = lstCTNXandIMEI.data.listReceiptDetails as Array<receiptDetailVm>;
                var lstimei = lstCTNXandIMEI.data.listReceiptImeis as Array<receiptImei>;

                const sumSokg1 = lstimei && lstimei.length > 0 ? lstimei.reduce((sum, current) => sum + current.weight1, 0) : 0;
                const sumSokg2 = lstimei && lstimei.length > 0 ? lstimei.reduce((sum, current) => sum + current.weight2, 0) : 0;
                if (lstCT && lstCT.length > 0) lstCT[0].totalWeight1 = sumSokg1;

                setDataHangHoaNXNL(lstCT);
                setDataInputReceiptDetailVm(lstCT[0]);

                const ngayCan = lstCT[0].scaleDate ? new Date(lstCT[0].scaleDate) : new Date();
                canxeInfo.scaleNo = lstCT[0].scaleNo;
                canxeInfo.scaleDate = ngayCan.getFullYear() == 1 ? new Date() : ngayCan;
                canxeInfo.volumeGoods = sumSokg2;
                canxeInfo.scaleEmployee = lstCT[0].scaleEmployee ?? "";

                if (lstimei && lstimei.length > 0) {
                    receiptVmItem.standard = lstimei[0].standard;
                    receiptVmItem.steelType = lstimei[0].steelType;
                    receiptVmItem.productionBatchNo = lstimei[0].productionBatchNo;
                    receiptVmItem.galvanizedOrganization = lstimei[0].galvanizedOrganization;
                    receiptVmItem.unitPrice = parseFloat(lstimei[0].steelPrice);

                }
                setDataReceitImeiAPI(lstimei);

                // var itemTonHHInfo = await ReceiptService.ListChiTietTonKhoNL({ loai: 'C', makho: receiptVm.makho, mahh: lstCT[0].mahh, thang: receiptVm.thang });
                // const totalSoluongTon = itemTonHHInfo.data.reduce((soluong, obj) => {
                //     return soluong + obj.soluong;
                // }, 0);
                // setOptionTONHH({ ...optionTONHH, tenhh: lstCT[0].productName, tonhh: totalSoluongTon, lstCTTonHHH: itemTonHHInfo.data });

                setTruckScaleModel(canxeInfo);

                setOptionNXNL(prevState => ({
                    ...prevState,
                    counterctnx: 0,
                    isEditing: false,
                    isSubmit: false,
                    receiptID: selection.receiptID,
                    receiptNo: selection.receiptNo
                }));
                setLoadingPage(false);
            }
        }, 1000);

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

    const handleFilterDoiTacSearch = (input: any, option: any) => {
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
    }

    const OnChangeCBQuanTri = (value: any) => {
        setModelUserRequest(value);
        if (isViewUser) {
        }
    }

    const SeachNXNL = async (e: any) => {
        e.preventDefault();
        await SearchListReceipt(modelRequest);
    }

    const getFooterData = (datas: any) => {
        // let weight1 = 0;
        // let weight2 = 0;
        // let weight3 = 0;
        // datas.forEach(element => {
        //     weight1 += parseInt(element.weight1);
        //     weight2 += parseInt(element.weight2);
        //     weight3 += parseInt(element.weight3);
        // });
        // return [
        //     { sortOrder: datas.length, imei: 'CUỘN', weight1: weight1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), weight2: weight2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), weight3: weight3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
        // ]
    }

    const ShowTruckScaleReceipt = async (e: any) => {
        setShowCanXe(true);
    }

    const handleChangeInput_TruckScale = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setTruckScaleModel({ ...truckScaleModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const onChangeScaleDate = async (date: any, dateString: string) => {
        setTruckScaleModel({ ...truckScaleModel, scaleDate: date });
    }

    const onChangeScaleEmployee = async (value: any, option: any) => {
        setTruckScaleModel({ ...truckScaleModel, scaleEmployee: value || '' });
    }

    const onChangeFirstWeight = (value: any) => {
        const floatValue = value.floatValue || 0;
        setTruckScaleModel({ ...truckScaleModel, firstWeight: floatValue, volumeGoods: floatValue - truckScaleModel.secondWeight });
    }
    const onChangeSecondWeight = (value: any) => {
        const floatValue = value.floatValue || 0;
        setTruckScaleModel({ ...truckScaleModel, secondWeight: floatValue, volumeGoods: truckScaleModel.firstWeight - floatValue });
    }
    const OnSaveTruckScale = async (e: any) => {

        e.preventDefault();

        if (truckScaleModel.scaleNo === null || truckScaleModel.scaleNo === '') {
            message.error('Vui lòng nhập số phiếu cân');
            return false;
        }

        if (truckScaleModel.licensePlate === null || truckScaleModel.licensePlate === '') {
            message.error('Vui lòng nhập số xe');
            return false;
        }

        if (truckScaleModel.scaleEmployee === null || truckScaleModel.scaleEmployee === '') {
            message.error('Vui lòng chọn người cân');
            return false;
        }

        if (truckScaleModel.volumeGoods <= 0) {
            message.error('Vui lòng nhập trọng lượng hoặc trọng lượng không được số âm');
            return false;
        }
        if (truckScaleModel.firstWeight <= 0) {
            message.error('Vui lòng nhập cân lần 1 hoặc cân lần 1 không được số âm');
            return false;
        } 
        if (truckScaleModel.secondWeight <= 0) {
            message.error('Vui lòng nhập cân lần 2 hoặc cân lần 2 không được số âm');
            return false;
        }
        setShowCanXeLoading(true);
        console.log(truckScaleModel.secondWeight, truckScaleModel.firstWeight);
        setDataReceiptVm({ ...dataReceiptVm, licensePlate: truckScaleModel.licensePlate});
        var hanghoaNXNL = Array<receiptDetailVm>();
        hanghoaNXNL.push(dataInputReceiptDetailVm);
        setDataHangHoaNXNL(hanghoaNXNL);

        setTimeout(async () => {
            dataHangHoaNXNL[0].scaleEmployee = truckScaleModel.scaleEmployee;
            dataHangHoaNXNL[0].firstWeight = truckScaleModel.firstWeight;
            dataHangHoaNXNL[0].secondWeight = truckScaleModel.secondWeight
            dataHangHoaNXNL[0].licensePlate = truckScaleModel.licensePlate;
            dataReceiptVm.licensePlate = truckScaleModel.licensePlate;
            dataHangHoaNXNL[0].scaleEmployee = truckScaleModel.scaleEmployee;
            dataHangHoaNXNL[0].scaleNo = truckScaleModel.scaleNo;
            dataHangHoaNXNL[0].scaleDate = truckScaleModel.scaleDate;
            dataHangHoaNXNL[0].totalWeight2 = truckScaleModel.volumeGoods;

            var data = await receiptService.SP_NXNL_UPDATE_CAN_XE(dataReceiptVm, dataHangHoaNXNL, dataChiTietHangHoaNXNL);
            if (data.status === APIStatus.ERROR) {
                message.error(data.message);
                setShowCanXeLoading(false);
            }
            else {

                // update trang thai can xe
                const data = {
                    receiptID: dataReceiptVm.receiptID,
                    congviec: workProcessID,
                    imeis: dataChiTietHangHoaNXNL.map(p => p.receiptImeiID)
                };
                await receiptService.UpdateWorkProcess(data);
                await SearchListReceipt(modelRequest, function (datas: Array<receiptVm>) {
                    var nxhhItem = datas.find((element) => {
                        return element.receiptID === dataReceiptVm.receiptID;
                    });
                    if (nxhhItem) {
                        onSelectReceipt(nxhhItem, datas);
                    }
                });

                setShowCanXe(false);
                setShowCanXeLoading(false);

                message.success("Cân xe thành công");
            }

        }, 1000);
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
    }

    const handleFilterSelect = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
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
                                        disabled={false}
                                        value={dayjs(modelRequest.frdate)}
                                        format={dateFormat}
                                        onChange={onChangeSearchFrDate}
                                    />
                                </div>
                                <div className="fl-lef w-50">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        disabled={false}
                                        value={dayjs(modelRequest.todate)}
                                        format={dateFormat}
                                        onChange={onChangeSearchToDate}
                                    />
                                </div>
                            </div>
                            <div className="fl-lef w-10 text-center">
                                <Button disabled={false} type="primary" icon={<SearchOutlined />} onClick={e => SeachNXNL(e)}></Button>
                            </div>
                            <div className="clearfix h-5"></div>
                            <div className="fl-lef w-60">
                                <Select
                                    value={modelRequest.counterpartyID == null || modelRequest.counterpartyID.length == 0 ? undefined : modelRequest.counterpartyID}
                                    className="input-text-upercase"
                                    disabled={false}
                                    style={{ width: '100%' }}
                                    size="small"
                                    allowClear
                                    showSearch
                                    placeholder="Đối tác"
                                    optionFilterProp="children"
                                    optionLabelProp="value"
                                    onChange={onchangeCounterPartySearch}
                                    filterOption={handleFilterDoiTacSearch}
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
                                    disabled={false}
                                    value={modelRequest.receiptNo} onChange={onChangeReceiptNoSearch} />
                            </div>
                            <div className="clearfix h-5"></div>
                            <DataGrid
                                disabled={false}
                                data={dataLstReceiptVm.lstNXNL}
                                style={{ height: (window.innerHeight - 190) }}
                                onSelectionChange={onSelectReceipt}
                                selection={dataSelectNXNL.ctnx}
                                selectionMode="single">
                                <GridColumn title="Số CT" field="receiptNo" width="15%" />
                                <GridColumn title="Tên NCC" field="counterpartyName" width="40%" />
                                <GridColumn title="Số lượng" field="quantity" width="25%" align="center"
                                />
                            </DataGrid>
                        </div>
                        <div className="pannel-left-footer">
                            <div className="inline-bolck w-50" style={{ textAlign: 'left' }}>
                                <div className="inline-bolck" style={{ marginRight: 5 }}><UserAddOutlined style={{ fontSize: 18 }} /></div>
                                <div className="inline-bolck" style={{ marginRight: 5 }}>
                                    {/* {isquantri ?
                                        <Checkbox disabled={false} onChange={handleChangeCheckBoxSearchQuanTri}></Checkbox>
                                        :
                                        <div></div>
                                    } */}
                                </div>
                                <div className="inline-bolck">
                                    {/* <CBUserQuanTri value={modelUserRequest} isEditing={false} OnChangeCBQuanTri={OnChangeCBQuanTri} /> */}
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
                                            disabled={false}
                                            value={dataLstReceiptVm.totalQuantity} />
                                    </b>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="page-pannel-right page-pannel-right-70">
                        <div className="pannel-right-body">
                        <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Kho
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        disabled={true}
                                        size="small"
                                        showAction={["focus"]}
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.storeID}
                                        placeholder="Chọn kho hàng"
                                        optionFilterProp="children"
                                        optionLabelProp="children"
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
                                    <DatePicker size="small" disabled={true}
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
                                    <Input size="small" disabled={true} readOnly name="receiptNo" value={dataReceiptVm.receiptNo} />
                                </div>
                            </div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số Xe
                                </div>
                                <div className="inline-bolck input-control">
                                    <Input size="small" disabled={true} name="licensePlate" value={dataReceiptVm.licensePlate} />
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
                                        disabled={true}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.counterpartyID}
                                        placeholder="Chọn nhà cung cấp"
                                        optionFilterProp="children"
                                        optionLabelProp="title"

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
                                    >
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
                                        disabled={true}
                                        ref={rf_standard}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.standard}
                                        placeholder="Chọn tiêu chuẩn"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
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
                                        disabled={true}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.steelType}
                                        placeholder="Chọn loại nguyên liệu"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
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
                                        disabled={true}
                                        ref={rf_productionBatchNo}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.productionBatchNo}
                                        placeholder="Chọn số lô"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
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
                                        disabled={true}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.galvanizedOrganization}
                                        placeholder="Chọn đơn vị mạ"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
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
                                    <Input size="small" ref={rf_receiptContent} disabled={true} name="receiptContent" value={dataReceiptVm.receiptContent} />
                                </div>
                            </div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Giá mua
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <div className={(true) ? "input-bg-special ant-input-number-sm ant-input-number ant-input-number-disabled" : "input-bg-special ant-input-number-sm ant-input-number"}>
                                        <NumericFormat
                                            className="ant-input-number-input input-text-right input-bg-special text-red w-100"
                                            thousandSeparator={true}
                                            value={dataReceiptVm.unitPrice}
                                            getInputRef={rf_giamua}
                                            name="unitPrice"
                                            min={1}
                                            max={999999}
                                            isAllowed={(values) => {
                                                const { floatValue } = values;
                                                return floatValue ? floatValue > 0 && floatValue <= 999999 : true;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <section className="code-box-meta markdown">
                                <div className="code-box-title">Chi tiết nguyên liệu</div>
                                <div className="code-box-description">
                                    <div className="hanghoaInputNXNL">
                                        <DataGrid
                                            ref={rf_datagrid_imei_ctnx}
                                            disabled={true}
                                            data={dataChiTietHangHoaNXNL}
                                            style={{ height: (window.innerHeight - 400) }}
                                            selectionMode={!optionNXNL.isEditing ? null : "single"}
                                            selection={dataSelectReceiptImei}
                                            clickToEdit
                                            editMode="cell"
                                            showFooter
                                            footerData={getFooterData(dataChiTietHangHoaNXNL)}
                                        >
                                            <GridColumn title="STT" key="sortOrder" field="sortOrder" width="5%" />
                                            <GridColumn title="Imei" key="imei" field="imei" width="25%" align="left" />
                                            <GridColumn title="Số kg 1" field="weight1" key="weight1" width="6%" align="right"
                                                header={() => <span>Số kg 1</span>}
                                                editable={false}
                                                render={({ row }: any) => (
                                                    <span>{row.weight1 ?? row.weight}</span>
                                                )}
                                            />
                                            <GridColumn title="Số kg 2" field="weight2" key="weight2" width="6%" align="right"
                                                header={() => <span>Số kg 2</span>}
                                                editable={false}
                                                render={({ row }: any) => (
                                                    <div className='bg_weight_2'>
                                                        {/* <NumericFormat 
                                                    readOnly 
                                                    className="ant-input-number-input input-text-right-grid w-100" 
                                                    thousandSeparator={true} 
                                                    value={row.weight2} 
                                                    type='text'
                                                    /> */}
                                                        <span>{row.weight2}</span>
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="Số kg 3" field="weight3" key="weight3" width="6%" align="right"
                                                header={() => <span>Số kg 3</span>}
                                                editable={false}
                                                render={({ row }: any) => (
                                                    <span>{row.weight3}</span>
                                                )}
                                            />
                                            <GridColumn title="Ghi chú" key="description" field="description" width="10%" align="left"
                                                render={({ row }: any) => (
                                                    <>
                                                        {row.description}
                                                    </>
                                                )}
                                            />
                                            <GridColumn title="Lỗi" key="loi" field="loi" width="18%" align="left"
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
                                        <div className="tonhh-info">
                                            <div className="inline-bolck mr-right-5">
                                                Tồn
                                            </div>
                                            <div className="inline-bolck mr-1">
                                                <Input size="small" disabled={true} readOnly value={optionTONHH.tenhh} />
                                            </div>
                                            <div className="inline-bolck mr-1">
                                                <div className="ant-input-number-sm ant-input-number">
                                                    <InputNumber className="ant-input-number-input" disabled={true} value={optionTONHH.tonhh} />
                                                </div>
                                            </div>
                                            <div className="inline-bolck mr-1 mr-top-5">
                                                <div className="small-combobox-easyui">
                                                    <ComboGrid
                                                        panelStyle={{ width: 400 }}
                                                        valueField="id"
                                                        textField="receiptNo"
                                                        data={optionTONHH.lstCTTonHHH}
                                                    >
                                                        <GridColumn field="receiptDate" title="Ngày" width="20%" align="left"
                                                            header={() => <span>Ngày</span>}
                                                            render={({ row }: any) => (
                                                                <span>{dayjs(row.receiptDate).format(dateFormat)}</span>
                                                            )}
                                                        />
                                                        <GridColumn field="receiptNo" title="Số CT" width="15%" align="left"> </GridColumn>
                                                        <GridColumn field="quycach" title="Quy cách" align="left" width="55%"> </GridColumn>
                                                        <GridColumn field="soluong" title="SL" align="right" width="10%"
                                                            header={() => <span>SL</span>}
                                                            render={({ row }: any) => (
                                                                <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.soluong} />
                                                            )}
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
                        <div className="pannel-right-footer">
                            {
                                dataReceiptVm.receiptID > 0 ?
                                    <div className="inline-bolck">
                                        <Button className="button" loading={optionNXNL.isSubmit} type="primary" icon={<CaretUpOutlined />} size="small"
                                            onClick={e => ShowTruckScaleReceipt(e)}
                                        >Cân Xe</Button>
                                    </div>
                                    :
                                    <div className="inline-bolck"></div>
                            }
                        </div>
                        <Modal
                            visible={showCanXe}
                            confirmLoading={showCanXeLoading}
                            title="Cân xe"
                            onOk={(e) => OnSaveTruckScale(e)}
                            onCancel={() => setShowCanXe(false)}
                        >
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số phiếu cân
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Input size="small" name="scaleNo" value={truckScaleModel.scaleNo} onChange={handleChangeInput_TruckScale} />
                                </div>
                            </div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số xe
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Input size="small" name="licensePlate" value={truckScaleModel.licensePlate} onChange={handleChangeInput_TruckScale} />
                                </div>
                            </div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Ngày cân
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <DatePicker
                                        format="DD/MM/YYYY HH:mm:ss"
                                        value={truckScaleModel.scaleDate != null && truckScaleModel.scaleDate != undefined ? dayjs(truckScaleModel.scaleDate) : dayjs(new Date())}
                                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                        onChange={onChangeScaleDate}
                                        allowClear={false}
                                    />
                                </div>
                            </div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Người cân
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        className="input-text-upercase"
                                        allowClear={true}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={truckScaleModel.scaleEmployee}
                                        placeholder="Chọn người cân"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangeScaleEmployee}
                                        filterOption={handleFilterSelect}
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
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số cân lần 1
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <div className="ant-input-number-sm ant-input-number">
                                        <NumericFormat
                                            className="ant-input-number-input input-text-right"
                                            thousandSeparator={true}
                                            min={0}
                                            max={999999}
                                            maxLength={8}
                                            minLength={1}
                                            value={truckScaleModel.firstWeight}
                                            onValueChange={onChangeFirstWeight}
                                            type='tel'
                                        /> KG
                                    </div>
                                </div>
                            </div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Số cân lần 2
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <div className="ant-input-number-sm ant-input-number">
                                        <NumericFormat
                                            className="ant-input-number-input input-text-right"
                                            thousandSeparator={true}
                                            min={0}
                                            max={999999}
                                            maxLength={8}
                                            minLength={1}
                                            value={truckScaleModel.secondWeight}
                                            onValueChange={onChangeSecondWeight}
                                            type='tel'
                                        /> KG
                                    </div>
                                </div>
                            </div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Trọng lượng
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <div className="ant-input-number-sm ant-input-number">
                                        <NumericFormat
                                            className="ant-input-number-input input-text-right"
                                            thousandSeparator={true}
                                            min={0}
                                            max={999999}
                                            maxLength={8}
                                            minLength={1}
                                            value={truckScaleModel.volumeGoods}
                                            disabled
                                            type='tel'
                                        /> KG
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix h-5"></div>
                        </Modal>
                    </div>
                </div>
            </Spin>
        </Fragment>
    )
}
export default RollTruckScale;