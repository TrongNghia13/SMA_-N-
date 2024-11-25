import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Button, Input, DatePicker, Modal, InputNumber, message, Checkbox, Select, Spin, Tooltip } from 'antd';
import { ComboGrid, GridColumn, DataGrid, CheckBox, NumberBox } from 'rc-easyui';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import dayjs from 'dayjs';
import { PlusOutlined, SaveOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

import planDetailOutput from '../../../../models/planDetailOutput';
import { receiptVm } from '../../../../models/receipt';
import cateBranch from '../../../../models/cateBranch';
import cateStore from '../../../../models/cateStore';
import cateCounterparty from '../../../../models/cateCounterparty';
import { cateProductVm } from '../../../../models/cateProduct';

import receiptRequest from '../../../../models/request/receiptRequest';
import { receiptDetailVm } from '../../../../models/receiptDetail';
import cateProductionPlan from '../../../../models/cateProductionPlan';
import receiptImei from '../../../../models/receiptImei';
// import receiptImei from '../../../../models/sanxuat/receiptImei';
import steelDefectDetail from '../../../../models/steelDefectDetail';

import { APIStatus } from '../../../../configs/APIConfig';
// import CBUserQuanTri from '../../../../components/CBUerQuantri/CBUserQuanTri';
import LoginUtils from '../../../../utils/loginUtils';

import ReceiptService from '../../../../services/receiptService';
// import NhapXuatCateProductService from '../../../../services/NhapXuatCateProductService';
import CateStoreService from '../../../../services/cateStoreService';
import CreatePlanTapeService from '../../../../services/createPlanTapeService';
import CateCounterpartyService from '../../../../services/cateCounterpartyService';
import CateBranchService from '../../../../services/cateBranchService';
import CateProductionPlanService from '../../../../services/cateProductionPlanService';
import CateProductService from '../../../../services/cateProductService';
import BeginningInventoryService from '../../../../services/beginningInventoryService';
import { ShowModal } from '../../../../components/common/index';
import errorModalProps from '../../components/errorModal/index';
const receiptService = new ReceiptService();
// const nhapXuatCateProductService = new NhapXuatCateProductService();
const cateStoreService = new CateStoreService();
const cateCounterpartyService = new CateCounterpartyService();
const cateBranchService = new CateBranchService();
const cateProductionPlanService = new CateProductionPlanService();
const createPlanTapeService = new CreatePlanTapeService();
const cateProductService = new CateProductService();
const beginningInventoryService = new BeginningInventoryService();

const { confirm } = Modal;
const { Option } = Select;
const InputFormRoll: React.FC = () => {

    const workProcessID = "";
    const menuKey = 'InputFormRoll';
    const materialType = 'C';
    const businessID = 'N24';
    const storeID = '';

    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.UserName;
    const branchId = userLoginInfo.BranchId;
    //const isquantri = userLoginInfo.userinfo.isquantri == true ? true : false;
    //const iskiemsoatnoibo = userLoginInfo.userinfo.iskiemsoatnoibo == true ? true : false;

    const rf_noi_sx = useRef<any>(null);
    const rf_kh_sx = useRef<any>(null);

    const rf_employeeCode = useRef<any>(null);
    const rf_receiptContent = useRef<any>(null);

    const rf_datagrid_imei_ctnx = useRef<any>(null);

    const dateFormat = 'DD/MM/YYYY';
    const [cateMonthInfo, setCateMonthInfo] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [spinningLoadCTBang, setSpinningLoadCTBang] = useState(false);
    const [isViewUser, setIsViewUser] = useState(false);
    const [branchInfo, setBranchInfo] = useState((() => {
        let dataInit: cateBranch = {} as any;
        return dataInit;
    }));
    const [modelUserRequest, setModelUserRequest] = useState('');
    const [modelRequest, setModelRequest] = useState((() => {
        let dataInit = {
            branchID: branchId,
            receiptNo: '',
            frdate: new Date(),
            todate: new Date(),
            counterpartyID: '',
            materialType: materialType,
            businessID: businessID,
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
        licensePlate: '',
        businessID: businessID,
        storeID: storeID,
        storeIDc: storeID,
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
        // createDate: new Date(),
        //option
        // thuwidth: '',
        // kyhieuwidth: '',
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
        // steelPrice: 0,
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

    const [optionInstockImei, setOptionInstockImei] = useState((() => {
        let dataInit = { productName: '', totalQuantity: 0, lstInstockImei: Array<receiptImei>() };
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
            scaleEmployee: '',
            scaleDate: new Date(),
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
            index: 0
        };
        return dataInit;
    }));

    const [dataInputChiTietHangHoaNXNL, setDataInputChiTietHangHoaNXNL] = useState((() => {
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
            specification: '',
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

    const [dataSelectReceipt, setDataSelectReceipt] = useState((() => {
        let dataInit = { ctnx: dataReceiptVmInit, receiptID: 0 }
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

    const [cateProductionPlanModel, setCateProductionPlanModel] = useState((() => {
        let dataInit: Array<cateProductionPlan> = [] as any;
        return dataInit;
    }));

    const [cateProductVmModel, setCateProductVmModel] = useState((() => {
        let dataInit: Array<cateProductVm> = [] as any;
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
            await GetDataCateProductionPlan();

            //await GetListNhanVien();

            await GetListCateProduct();

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
        var getDdata = await cateBranchService.GetOfUseLogin();
        setBranchInfo(getDdata.data);
    }


    const GetDataStore = async () => {
        var getDdata = await cateStoreService.GetListStoreByTypeBranchId('07', branchId);
        setDataStore(getDdata.data);
    }

    const GetDataCateCounterparty = async (counterpartyGroup = 'CTY') => {
        var getDdata = await cateCounterpartyService.GetListGetVendorByGroupId(counterpartyGroup);
        setCateCounterparty(getDdata.data);
        if (counterPartySearchModel && counterPartySearchModel.length <= 0) {
            setCounterPartySearchModel(getDdata.data);
        }
    }

    const GetDataCateProductionPlan = async () => {
        var getDdata = await cateProductionPlanService.GetListPlanNotFinishByBranchId(branchId);
        getDdata.data = getDdata.data.filter((p: any) => p.planTypeID === 'KHXB');
        setCateProductionPlanModel(getDdata.data);
    }

    // const GetListNhanVien = async () => {
    //     var getDdata = await cateCounterpartyService.GetListDoiTac('NV', '');
    //     setNhanVienModel(getDdata.data);
    // }

    const GetListCateProduct = async () => {
        var getDdata = await cateProductService.GetListCateProduct({ productID: '', productName: '', productTypeID: '', menukey: menuKey });
        setCateProductVmModel(getDdata.data);
    }

    const loadTonXuatNL = async (productionPlanID: string) => {
        const data = await createPlanTapeService.INVENTORY_NOT_MATERIAL_INPUT_GET(materialType, encodeURIComponent(productionPlanID));
        setDataReceitImeiAPI(data.data);
        let weight = 0;
        if (data.data && data.data.length > 0) {
            data.data.forEach(item => {
                weight += parseFloat(item.weight);
            })
        }
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, quantity: data.data.length ?? 0, weight: weight, totalWeight1: weight });
    }

    const loadDataKHCuonRa = async (receiptDetailIDkh: number) => {
        const data = await createPlanTapeService.SP_KH_CUON_RA_GET(receiptDetailIDkh);
        return data.data;
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
            receiptNo: '',
            branchID: branchId,
            frdate: ngay,
            businessID: businessID,
            counterpartyID: "",
            employeeID: "",
            materialType: materialType,
            todate: ngay,
        });

        var counterpartyID = '', tennhacc = '', counterpartyAddress = '', counterpartyGroup = '', employeeCode = '';
        setDataReceiptVm({
            ...dataReceiptVm,
            receiptID: 0,
            sophieu: data.data,
            receiptNo: data.data,
            monthID: month,
            storeID: storeID,
            storeIDc: storeID,
            counterpartyID: counterpartyID,
            counterpartyName: tennhacc,
            counterpartyAddress: counterpartyAddress,
            counterpartyGroup: counterpartyGroup,
            employeeCode: employeeCode,
            standard: '',
            productionBatchNo: '',
            steelType: '',
            galvanizedOrganization: '',
            workProcessID: workProcessID,
            productionPlanID: '',
            receiptContent: ''
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
        CancelNXNL(null, date);
    }

    const onChangeStore = (value: any) => {
        setDataReceiptVm({ ...dataReceiptVm, storeID: value, storeIDc: value });
    }

    const onchangenoisanxuat = (value: any, option: any) => {
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

    const onChangeProductionPlan = async (value: any, option: any) => {
        setDataReceiptVm({ ...dataReceiptVm, productionPlanID: value });
        await loadTonXuatNL(value);
        if (rf_employeeCode.current) {
            rf_employeeCode.current.focus();
        }
    }

    // const onChangeNhanVien = async (value: any, option: any) => {
    //     setDataReceiptVm({ ...dataReceiptVm, employeeCode: value || '' });
    //     if (rf_receiptContent.current) {
    //         rf_receiptContent.current.focus();
    //     }
    // }

    const handleFilterNhanVien = (input: any, option: any) => {
        if (input) {
            return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }

    const onChangeGhiChuCTNXHH = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, description: value });
    }

    const AddNXNL = async (e: any) => {

        if (cateMonthInfo == false) {
            message.error('Ngày ' + moment(dataReceiptVm.receiptDate).format(dateFormat) + ' đã khóa sổ');
            return false;
        }
        setDataSelectReceipt({ ...dataSelectReceipt, ctnx: dataReceiptVmInit, receiptID: -1 });
        await GetReceiptNo(dataReceiptVm.receiptDate);
        setOptionReceipt({ ...optionReceipt, isupdatectreceiptVm: false, isEditing: true });
        setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, receiptDetailID: 0, quantity: 0, description: '', productID: 'PL-CUON', calculationUnit: 'Kg', productName: 'PL-CUON', weight: 0, totalWeight1: 0, productTypeID: '' });

        setDataReceitImeiAPI([]);

        if (rf_noi_sx.current) {
            rf_noi_sx.current.focus();
        }
    }

    const DeleteNXNL = async (e: any) => {

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
                    OnDeletedNXNL(e);
                },
                onCancel() { },
            });
        }
    }

    const OnDeletedNXNL = async (e: any) => {
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
            await CancelNXNL(e);
        }
    }

    const onSelectNXNL = async (selection: receiptVm, dataInit?: Array<receiptVm>) => {

        if (optionReceipt.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectReceipt({ ...dataSelectReceipt, ctnx: dataReceiptVmInit, receiptID: -1 });
        }
        else {
            setLoadingPage(true);
            var nxnl: receiptVm = dataReceiptVmInit;
            if (dataInit) {
                nxnl = dataInit.find((element) => {
                    return element.receiptID === selection.receiptID;
                }) || dataReceiptVmInit;
            }
            else {
                nxnl = dataLstReceiptVmDefault.find((element) => {
                    return element.receiptID === selection.receiptID;
                }) || dataReceiptVmInit;
            }
            if (nxnl) {
                nxnl.receiptDate = new Date(nxnl.receiptDate);
            }
            var receiptVmItem = nxnl || dataReceiptVmInit;

            await CheckMonthIsOpen(receiptVmItem.receiptDate);
            await loadTonXuatNL(receiptVmItem.productionPlanID);

            setDataSelectReceipt({ ...dataSelectReceipt, ctnx: receiptVmItem });
            setModelUserRequest(receiptVmItem.createdBy);

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
                    receiptVmItem.businessID = businessID;
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

                var itemInstockInfo = await beginningInventoryService.GetImeiInventoryMaterial({ materialType: materialType, branchID: branchId, storeTypeID: '07' ,productID: lstCT[0].productID, monthID: nxnl.monthID});
                const totalQuantity = itemInstockInfo.data.length;
                setOptionInstockImei({ ...optionInstockImei, productName: lstCT[0].productName, totalQuantity: totalQuantity, lstInstockImei: itemInstockInfo.data });

            }

            setDataReceiptVm(receiptVmItem);

            setOptionReceipt(prevState => ({
                ...prevState,
                counterctnx: 0,
                isEditing: false,
                isSubmit: false,
                receiptID: selection.receiptID,
                receiptNo: selection.receiptNo
            }));

            setDataInputChiTietHangHoaNXNL({
                ...dataInputChiTietHangHoaNXNL,
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

    const SaveNXNL = async (e: any) => {

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
            message.error('Vui lòng chọn kế hoạch sản xuất');
            return false;
        }

        if (dataReceiptImei.length <= 0) {
            message.error('Không có nguyên liệu cuộn từ lô sản xuất ' + dataReceiptVm.productionPlanID);
            return false;
        }

        let quantity = dataReceiptImei.length;

        setOptionReceipt({ ...optionReceipt, isSubmit: true });

        var hanghoaNXNL = Array<receiptDetailVm>();
        dataInputReceiptDetailVm.quantity = quantity;
        hanghoaNXNL.push(dataInputReceiptDetailVm);

        var data = await receiptService.RECEIPT_UPDATE(dataReceiptVm, hanghoaNXNL, dataReceiptImei);
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionReceipt({ ...optionReceipt, isSubmit: false });
        }
        else {
            message.success('nhập nguyên liệu cuộn từ sản xuất thành công');
            CancelNXNL(e);
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
                    onSelectNXNL(nxhhItem, datas);
                }
            });
        }
    }

    const CancelNXNL = async (e: any, receiptDate?: Date) => {

        if (dataReceiptVm.receiptID > 0 && optionReceipt.isEditing) {

            var itemNXNL = dataLstReceiptVm.lstReceipt.find((element) => {
                return element.receiptID === dataReceiptVm.receiptID;
            }) || dataReceiptVmInit;

            if (itemNXNL) {

                itemNXNL.receiptDate = new Date(itemNXNL.receiptDate);
                setDataReceiptVm(itemNXNL);
                setDataSelectReceipt({ ...dataSelectReceipt, ctnx: itemNXNL });

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

            setDataSelectReceipt({ ...dataSelectReceipt, ctnx: dataReceiptVmInit, receiptID: -1 });
            setOptionReceipt({ ...optionReceipt, receiptID: 0, receiptNo: '', counterctnx: 0, isEditing: false, isSubmit: false });

            var _receiptDate = moment(receiptDate || dataReceiptVm.receiptDate, 'YYYY/MM/DD');
            var _month = _receiptDate.format('YYYYMM');

            setDataReceiptVm({
                ...dataReceiptVm,
                receiptID: 0,
                branchID: branchId,
                monthID: _month,
                receiptDate: receiptDate || dataReceiptVm.receiptDate,
                receiptType: 'N',
                materialType: materialType,
                receiptNo: '',
                sophieu: '',
                sohd: '',
                licensePlate: '',
                businessID: businessID,
                storeID: storeID,
                storeIDc: storeID,
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
                // createDate: new Date(),
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
            setDataReceitImeiAPI([]);
            setDataInputReceiptDetailVm({ ...dataInputReceiptDetailVm, quantity: 0, weight: 0, totalWeight1: 0, description: '' });
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

    const handleChangeCheckBoxSearchQuanTri = async (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setIsViewUser(checked);
        // if (checked) {
        //     const _dataLstNXHH = dataLstNXHHDefault.filter(el => {
        //         return el.createdBy === modelUserRequest;
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
            //     return el.createdBy === value;
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

    const getFooterData = (datas: any) => {
        let weight = 0;
        datas.forEach((element: any ) => {
            weight += parseInt(element.weight);
        });
        return [
            { weight: weight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), description: 'kg' }
        ]
    }

    const showEditLoiBang = (e: any, listSteelDefectDetails?: steelDefectDetail[], description?: string, indexRow?: number) => {
        e.preventDefault();
        ShowModal({
            dvId: 'dgAddUpLoiCuon',
            component: errorModalProps,
            dataProps: { steelType: 'B', listSteelDefectDetails: listSteelDefectDetails, description: description, indexRow: indexRow, callBackChoose: callBackChooseLoi }
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
                item.description = description;
            });
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                setDataReceitImeiAPI(datas);
                rf_datagrid_imei_ctnx.current.cancelEdit();
            }, 300);
        }
    }

    const getTotalSLSokgPL = (_data: any) => {

        let totalSL = 0, totalSokg = 0;
        const dataNLBangSXs = _data.filter((p: any) => p.isChecked === true);
        if (dataNLBangSXs && dataNLBangSXs.length > 0) {
            dataNLBangSXs.forEach((element: any) => {
                if (element.childs && element.childs.length > 0) {
                    const plCuons = element.childs.filter((p: any) => p.productID == 'PL-CUON');
                    plCuons.forEach((item: any) => {
                        totalSokg += item.weightActual;
                    });
                    totalSL += plCuons.length;
                }
            });
        }

        return {
            sl: totalSL,
            weight: totalSokg
        }
    }


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
                                <Button disabled={optionReceipt.isEditing} type="primary" icon={<SearchOutlined/>} onClick={e => SeachNXNL(e)}></Button>
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
                                onSelectionChange={onSelectNXNL}
                                selection={dataSelectReceipt.ctnx}
                                selectionMode="single">
                                <GridColumn title="Số CT" field="receiptNo" width="20%" />
                                <GridColumn title="Nơi SX" field="counterpartyName" width="50%" />
                                <GridColumn title="Số lượng" field="quantity" width="15%" align="center"/>
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
                                        showAction={["focus"]}
                                        className="input-text-upercase"
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.counterpartyID}
                                        placeholder="Chọn nơi sản xuất"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onchangenoisanxuat}
                                    >
                                        {cateCounterparty && cateCounterparty.map(d => (
                                            <Option title={(d.counterpartyID + '-' + d.counterpartyName)} data-kyhieu={d.counterpartyID} key={d.counterpartyID} value={d.counterpartyID}>
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
                                        showAction={["focus"]}
                                        className="input-text-upercase"
                                        disabled={!optionReceipt.isEditing || (optionReceipt.isEditing && dataReceiptVm.receiptID > 0)}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.productionPlanID}
                                        placeholder="Chọn khách hàng sản xuất"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangeProductionPlan}
                                    >
                                        {cateProductionPlanModel && cateProductionPlanModel.map(d => (
                                            <Option title={(d.productionPlanID + '-' + d.planName)} key={d.productionPlanID} value={d.productionPlanID}>
                                                <span>{d.productionPlanID} - {d.planName }</span>
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
                            <div className="clearfix h-10"></div>
                            <div className="clearfix"></div>
                            <section className="code-box-meta markdown">
                                <div className="code-box-title">Chi tiết nguyên liệu</div>
                                <div className="code-box-description">
                                    <div className="tool-bar-cthh" style={{ marginBottom: 2 }}>
                                        <div className="inline-bolck w-15 mr-1">
                                            <div id="inputHangHoa">
                                                <Select
                                                    className="select-hanghoa-input input-text-upercase"
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
                                        <div className="inline-bolck w-13 mr-1">
                                            <div className={(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0) ? "ant-input-number-sm ant-input-number w-100" : "ant-input-number-sm ant-input-number ant-input-number-disabled w-100"}>
                                                <NumericFormat
                                                    readOnly={!(optionReceipt.isEditing && dataReceiptVm.receiptID <= 0)}
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    value={dataInputReceiptDetailVm.quantity}
                                                    name="quantity"
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-bolck w-70 mr-1">
                                            <Input
                                                size="small"
                                                disabled={!optionReceipt.isEditing}
                                                value={dataInputReceiptDetailVm.description}
                                                name="description"
                                                placeholder='ghi chú'
                                                onChange={onChangeGhiChuCTNXHH}
                                            />
                                        </div>
                                    </div>
                                    <div className="hanghoaInputNXNL">
                                        <Spin spinning={spinningLoadCTBang}>
                                            <DataGrid
                                                ref={rf_datagrid_imei_ctnx}
                                                disabled={!optionReceipt.isEditing || dataInputReceiptDetailVm.quantity <= 0}
                                                data={dataReceiptImei}
                                                style={{ height: (window.innerHeight - 400) }}
                                                selectionMode={!optionReceipt.isEditing ? null : "single"}
                                                clickToEdit
                                                editMode="cell"
                                                showFooter
                                                footerData={getFooterData(dataReceiptImei)}
                                            >
                                                <GridColumn title="STT" key="sortOrder" field="sortOrder" width="4%" />
                                                <GridColumn title="Loại" key="steelType" field="steelType" width="5%" align="left" />
                                                <GridColumn title="Ncc" key="vendor" field="vendor" width="5%" />
                                                <GridColumn title="T.Chuẩn" key="standard" field="standard" width="6%" />
                                                <GridColumn title="Số lô" key="productionBatchNo" field="productionBatchNo" width="5%" />
                                                <GridColumn title="ĐVMGC" key="galvanizedOrganization" field="galvanizedOrganization" width="6%" />
                                                <GridColumn title="Giá nhập" key="steelPrice" field="steelPrice" width="8%" />
                                                <GridColumn title="Khổ" key="width" field="width" width="10%" align="left" />
                                                <GridColumn title="Dày" key="thickness" field="thickness" width="10%" align="left" />
                                                <GridColumn title="Số kg" field="weight" key="weight" width="10%" align="right"
                                                    render={({ row }: any) => (
                                                        <div className='bg_weight'>
                                                            <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.weight} />
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
                                                                    row.listSteelDefectDetails && row.listSteelDefectDetails.map((p: any) => {
                                                                        return <span>{p.tenloi}</span>
                                                                    })
                                                                }
                                                            </div>
                                                            <div className='inline-bolck w-20 text-right'>
                                                                <Tooltip title={row.listSteelDefectDetails ? row.listSteelDefectDetails.map((p: any) => p.tenloi).toString() : ''}>
                                                                    <Button size="small" shape="circle" onClick={(e: any) => showEditLoiBang(e, row.listSteelDefectDetails, row.description, row.sortOrder - 1)}>...</Button>
                                                                </Tooltip>
                                                            </div>
                                                        </>
                                                    )}
                                                />
                                            </DataGrid>
                                        </Spin>
                                        <div className="clearfix h-3"></div>
                                        <div className="totalQuantity-info">
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
                                            <div className="inline-bolck mr-1 mr-top-5">
                                                <div className="small-combobox-easyui">
                                                    <ComboGrid
                                                        panelStyle={{ width: 400 }}
                                                        valueField="receiptDetailID"
                                                        textField="receiptNo"
                                                        data={optionInstockImei.lstInstockImei}
                                                    >
                                                        <GridColumn field="receiptDate" title="Ngày" width="20%" align="left"
                                                            header={() => <span>Ngày</span>}
                                                            render={({ row }: any) => (
                                                                <span>{moment(row.receiptDate).format(dateFormat)}</span>
                                                            )}
                                                        />
                                                        <GridColumn field="receiptNo" title="Số CT" width="15%" align="left"> </GridColumn>
                                                        <GridColumn field="specification" title="Quy cách" align="left" width="55%"> </GridColumn>
                                                        <GridColumn field="quantity" title="SL" align="right" width="10%"
                                                            header={() => <span>SL</span>}
                                                            render={({ row }: any) => (
                                                                <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.quantity} />
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
                        <div className="clearfix h-15"></div>
                        <div className="pannel-right-footer">
                            {optionReceipt.isEditing ?
                                <div className="inline-bolck">
                                    <Button className="button" loading={optionReceipt.isSubmit} type="primary" icon={<SaveOutlined />} size="small"
                                        onClick={e => SaveNXNL(e)}
                                    >Lưu</Button>
                                    <Button className="button" disabled={optionReceipt.isSubmit} type="primary" icon={<CloseOutlined />} size="small"
                                        onClick={e => CancelNXNL(e)}
                                        danger>Hủy</Button>
                                </div>
                                :
                                <div className="inline-bolck">
                                    <Fragment>
                                        <Button className="button" type="primary" icon={<PlusOutlined/>} size="small"
                                            onClick={e => AddNXNL(e)}>Thêm</Button>
                                        <Button className="button" type="primary" icon={<CloseOutlined />} size="small"
                                            onClick={e => DeleteNXNL(e)} danger>Xóa</Button>
                                    </Fragment>
                                </div>
                            }
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
export default InputFormRoll;