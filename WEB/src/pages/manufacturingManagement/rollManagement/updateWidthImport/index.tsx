import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Button, Input, DatePicker, Modal, InputNumber, message, Checkbox, Select, Upload, Spin, Tooltip } from 'antd';
import IAntdUpload from '../../../../models/iAntdUpload';
import { ComboGrid, GridColumn, DataGrid, TextBox, NumberBox } from 'rc-easyui';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {NumericFormat} from 'react-number-format';
import moment from 'moment';
import dayjs from 'dayjs';

import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, SearchOutlined, VerticalAlignBottomOutlined, WarningOutlined, PrinterOutlined, FileImageOutlined, UserOutlined } from '@ant-design/icons';

import { receiptVm } from '../../../../models/receipt';
import cateBranch from '../../../../models/cateBranch';
import cateStore from '../../../../models/cateStore';
import cateCounterparty from '../../../../models/cateCounterparty';
import cateCounterpartyGroup from '../../../../models/cateCounterpartyGroup';
// import QUYCACH_HH from '../../../../models/QUYCACH_HH';
import cateSteelType from '../../../../models/cateSteelType';
import cateStandard from '../../../../models/cateStandard';
import cateProductionBatchNo from '../../../../models/cateProductionBatchNo';
import cateGalvanizedOrganization from '../../../../models/cateGalvanizedOrganization';
import cateWidth from '../../../../models/cateWidth';
import cateThickness from '../../../../models/cateThickness'
import steelDefectDetail from '../../../../models/steelDefectDetail';
import employee from '../../../../models/employee';

import receiptRequest from '../../../../models/request/receiptRequest';
import { receiptDetailVm } from '../../../../models/receiptDetail';
import receiptImei from '../../../../models/receiptImei';
import inventoryDetail from '../../../../models/productions/inventoryDetail';

import CBUserAdmintrator from '../../../../components/CBUserAdmintrator/index';
import LoginUtils from '../../../../utils/loginUtils';

import ReceiptService from '../../../../services/receiptService';
import CateStoreService from '../../../../services/cateStoreService';
import CateThicknessService from '../../../../services/cateThicknessService';
import CateWidthService from '../../../../services/cateWidthService';
import CateBranchService from '../../../../services/cateBranchService';
import CateCounterpartyService from '../../../../services/cateCounterpartyService';
import CateSteelTypeService from '../../../../services/cateSteelTypeService';
import CateStandardService from '../../../../services/cateStandardService';
import CateProductionBatchNoService from '../../../../services/cateProductionBatchNoService';
import CateGalvanizedOrganizationService from '../../../../services/cateGalvanizedOrganizationService';
import MediaUploadService from '../../../../services/mediaUploadService';

import '../inputInventory/NhapNLCuon.scss';
import { UploadFile } from 'antd/lib/upload/interface';
import { ShowModal } from '../../../../components/common/index';
import errorModalProps from '../../components/errorModal/index';

import { APIStatus } from '../../../../configs/APIConfig';

const receiptService = new ReceiptService();
const cateStoreService = new CateStoreService();
const cateCounterpartyService = new CateCounterpartyService();
const cateBranchService = new CateBranchService();
const cateSteelTypeService = new CateSteelTypeService();
const cateStandardService = new CateStandardService();
const cateProductionBatchNoService = new CateProductionBatchNoService();
const cateGalvanizedOrganizationService = new CateGalvanizedOrganizationService();
const mediaController = new MediaUploadService();
const chieuDayController = new CateThicknessService();
const cateWidthService = new CateWidthService();

const { Option } = Select;
const UpdateWidthImport: React.FC = () => {

    const workProcessID = 'XB.01';
    const menuKeyNhapNL = 'UpdateWidthImport';
    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.UserName;
    const branchId = userLoginInfo.BranchId;
    // const isemployeeID = userLoginInfo.userinfo.isemployeeID == true ? true : false;
    // const iskiemsoatnoibo = userLoginInfo.userinfo.iskiemsoatnoibo == true ? true : false;

    const rf_sohd = useRef<any>(null);
    const rf_vendor = useRef<any>(null);
    const rf_standard = useRef<any>(null);
    const rf_materialType = useRef<any>(null);
    const rf_productionBatchNo = useRef<any>(null);
    const rf_donvima = useRef<any>(null);
    const rf_employeeCode = useRef<any>(null);
    const rf_giamua = useRef<any>(null);
    const rf_receiptContent = useRef<any>(null);
    const rf_datagrid_imei_receiptVm = useRef<any>(null);

    const dateFormat = 'DD/MM/YYYY';

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileUpload, setfileUpload] = useState(Array<UploadFile>());
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [showUploadRowIndex, setShowUploadRowIndex] = useState(-1);

    const [cateMonthInfo, setCateMonthInfo] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [isViewUser, setIsViewUser] = useState(false);
    const [branchInfo, setBranchInfo] = useState((() => {
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
            counterpartyID: '',
            materialType: 'C',
            businessID: 'N11',
            employeeID: '',
            galvanizedOrganization: 'GI'
        };
        return dataInit;
    }));
    const dataReceiptVmInit = {
        receiptID: 0,
        branchID: userLoginInfo.BranchId,
        monthID: '',
        receiptDate: new Date(),
        receiptType: 'N',
        materialType: 'C',
        receiptNo: '',
        sophieu: '',
        sohd: '',
        licensePlate: '',
        businessID: 'N11',
        storeID: '',
        storeIDc: '',
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
        // steelPrice: '0',
        // licensePlate: '',
        workProcessID: workProcessID,
    }

    const [dataLstReceiptDetail, setDataLstReceiptDetail] = useState((() => {
        let dataInit: Array<receiptDetailVm> = [] as any;
        return dataInit;
    }));

    const [optionReceipt, setOptionReceipt] = useState((() => {
        let dataInit = { receiptID: 0, receiptNo: '', isupdatectreceiptVm: false, counterreceiptVm: 0, isEditing: false, isSubmit: false };
        return dataInit;
    }));

    const [dataLstReceiptVm, setLstDataReceiptVm] = useState({ loading: true, totalQuantity: 0, lstreceipt: Array<receiptVm>() });
    const [dataLstReceiptVmDefault, setLstDataReceiptVmDefault] = useState(Array<receiptVm>());

    const [dataReceiptVm, setDataReceiptVm] = useState((() => {
        let dataInit: receiptVm = dataReceiptVmInit
        return dataInit;
    }));

    const [dataSelectReceipt, setDataSelectReceipt] = useState((() => {
        let dataInit = { receiptVm: dataReceiptVmInit, receiptID: 0 }
        return dataInit;
    }));

    const [dataReceiptImei, setDataReceitImeiAPI] = useState((() => {
        let dataInit: Array<receiptImei> = [] as any;
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
            pl_diem: 0,
            pl_boc: 0,
            pl_giay: 0,
            pl_nhua: 0,
            workProcessID: workProcessID,
            createdBy: userName,
            createdDate: ''
        };
        return dataInit;
    }));

    const [spinningLoadCTBang, setSpinningLoadCTBang] = useState(false);
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
            index: -1
        };
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

    const [nhanVienModel, setNhanVienModel] = useState((() => {
        let dataInit: Array<employee> = [] as any;
        return dataInit;
    }));

    // const [dataQuyCachHH, setDataQuyCachHH] = useState((() => {
    //     let dataInit: Array<QUYCACH_HH> = [] as any;
    //     return dataInit;
    // }));

    const [cateSteelType, setCateSteelType] = useState((() => {
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
        let dataInit = { productName: '', tonhh: 0, lstCTTonHHH: Array<inventoryDetail>() };
        return dataInit;
    }));

    const [showCanXe, setShowCanXe] = useState(false);
    const [showCanXeLoading, setShowCanXeLoading] = useState(false);
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

    useEffect(() => {
        const controller = new AbortController();
        async function GetData() {

            await CheckMonthIsOpen(modelRequest.todate);
            await GetBrandUserLogin();
            await SearchListReceipt(modelRequest);

            await GetDataStore();

            await GetDataCateCounterparty();
            await GetDataCateCounterpartyGroup();

            await GetListNhanVien();

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
        setLstDataReceiptVm({ ...dataLstReceiptVm, loading: true, totalQuantity: totalQuantity, lstreceipt: getDdata.data });
        setLstDataReceiptVmDefault(getDdata.data);
        setTimeout(() => {
            if (callback) callback(getDdata.data);
        }, 300);

    }

    const GetBrandUserLogin = async () => {
        var getDdata = await cateBranchService.GetByID(userLoginInfo.BranchId);
        setBranchInfo(getDdata.data);
    }

    const GetDataStore = async () => {
        var getDdata = await cateStoreService.GetListStoreByTypeBranchId('02', userLoginInfo.BranchId);
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

    const GetListNhanVien = async () => {
        // var getDdata = await cateCounterpartyService.GetListDoiTac('NV', '');
        // setNhanVienModel(getDdata.data);
    }

    const GetSteelType = async () => {
        var getDdata = await cateSteelTypeService.GetList();
        setCateSteelType(getDdata.data);
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
        var getDdata = await chieuDayController.GetList();
        setDataCateThickness(getDdata.data);
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

        setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: receiptVmItem });
        setModelUserRequest(receiptVmItem.createdBy);
        setDataReceiptVm(receiptVmItem);

        let canxeInfo = Object.assign({}, modelCanXe);
        canxeInfo.licensePlate = receiptVmItem.licensePlate;

        setTimeout(async () => {
            var lstCTNXandIMEI = await receiptService.GetListReDetail_AND_ReIMEI(selection.receiptID);
            if (lstCTNXandIMEI) {

                var lstCT = lstCTNXandIMEI.data.listReceiptDetails as Array<receiptDetailVm>;
                var lstimei = lstCTNXandIMEI.data.listReceiptImeis as Array<receiptImei>;

                setDataLstReceiptDetail(lstCT);
                setDataInputReceiptDetailVm(lstCT[0]);

                canxeInfo.scaleNo = lstCT[0].scaleNo;
                canxeInfo.scaleDate = lstCT[0].scaleDate;
                canxeInfo.volumeGoods = lstCT[0].totalWeight2;
                canxeInfo.scaleEmployee = lstCT[0].scaleEmployee!;

                if (lstimei && lstimei.length > 0) {
                    receiptVmItem.standard = lstimei[0].standard;
                    receiptVmItem.steelType = lstimei[0].steelType;
                    receiptVmItem.productionBatchNo = lstimei[0].productionBatchNo;
                    receiptVmItem.galvanizedOrganization = lstimei[0].galvanizedOrganization;
                    receiptVmItem.steelPrice = lstimei[0].steelPrice!;
                }
                lstimei.forEach((item, index) => {
                    item.index = index;
                });
                setDataReceitImeiAPI(lstimei);

                // var itemTonHHInfo = await receiptService.ListChiTietTonKhoNL({ steelType: 'C', storeID: receiptVm.storeID, productID: lstCT[0].productID, monthID: receiptVm.monthID });
                // const totalSoluongTon = itemTonHHInfo.data.reduce((quantity, obj) => {
                //     return quantity + obj.quantity;
                // }, 0);
                // setOptionTONHH({ ...optionTONHH, productName: lstCT[0].productName, tonhh: totalSoluongTon, lstCTTonHHH: itemTonHHInfo.data });

                setModelCanXe(canxeInfo);

                setOptionReceipt(prevState => ({
                    ...prevState,
                    counterreceiptVm: 0,
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

    const Seachreceipt = async (e: any) => {
        e.preventDefault();
        await SearchListReceipt(modelRequest);
    }

    const getFooterData = (datas: any) => {
        let weight1 = 0;
        let weight2 = 0;
        let weight3 = 0;
        let pl_diem = 0;
        let pl_boc = 0;
        let pl_giay = 0;
        let pl_nhua = 0;

        datas.forEach((element: any) => {
            weight1 += parseInt(element.weight1);
            weight2 += parseInt(element.weight2);
            weight3 += parseInt(element.weight3);
            pl_diem += parseFloat(element.pl_diem);
            pl_boc += parseFloat(element.pl_boc);
            pl_giay += parseFloat(element.pl_giay);
            pl_nhua += parseFloat(element.pl_nhua);

        });
        return [
            {
                sortOrder: datas.length, imei: 'CUỘN',
                weight1: weight1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                weight2: weight2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                weight3: weight3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                pl_diem: pl_diem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                pl_boc: pl_boc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                pl_giay: pl_giay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                pl_nhua: pl_nhua.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }
        ]
    }

    const UpdateAllCT_Image_CTreceipt = (value: string, type: string, rowIndex: number) => {
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
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                setDataReceitImeiAPI(datas);
                rf_datagrid_imei_receiptVm.current.cancelEdit();
            }, 300);
        }
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
                url: dataHangHoang.image != '' && dataHangHoang.image != null ? mediaController.GetFile(dataHangHoang.image) : ''
            });

            listFile.push({
                uid: '-2',
                name: dataHangHoang.image2,
                status: 'done',
                url: dataHangHoang.image2 != '' && dataHangHoang.image2 != null ? mediaController.GetFile(dataHangHoang.image2) : ''
            });

            listFile.push({
                uid: '-3',
                name: dataHangHoang.image,
                status: 'done',
                url: dataHangHoang.image3 != '' && dataHangHoang.image3 != null ? mediaController.GetFile(dataHangHoang.image3) : ''
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
                    UpdateAllCT_Image_CTreceipt('', 'image' + (i <= 1 ? '' : (i - 1)), showUploadRowIndex);
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
        var data = await mediaController.Upload(formData);
        if (data.status === APIStatus.ERROR) {
            message.error('Can not upload file');
        }
        else {
            const filePath = data.data;
            var dataHangHoang = dataReceiptImei[showUploadRowIndex];
            var _fileUpload = [...fileUpload];
            if (dataHangHoang.image === "" || dataHangHoang.image === null) {
                _fileUpload[0].url = mediaController.GetFile(filePath);
                UpdateAllCT_Image_CTreceipt(filePath, 'image', showUploadRowIndex);
            }
            else if (dataHangHoang.image2 === "" || dataHangHoang.image2 === null) {
                _fileUpload[1].url = mediaController.GetFile(filePath);
                UpdateAllCT_Image_CTreceipt(filePath, 'image2', showUploadRowIndex);
            }
            else if (dataHangHoang.image3 == "" || dataHangHoang.image3 === null) {
                _fileUpload[2].url = mediaController.GetFile(filePath);
                UpdateAllCT_Image_CTreceipt(filePath, 'image3', showUploadRowIndex);
            }
            setTimeout(() => {
                setfileUpload(_fileUpload);
            }, 300);
        }
    }

    const showEditLoiCuon = (e: any, listSteelDefectDetails?: steelDefectDetail[], description?: string, indexRow?: number) => {
        e.preventDefault();
        ShowModal({
            dvId: 'dgAddUpLoiCuon',
            component: errorModalProps,
            dataProps: { steelType: 'C', listSteelDefectDetails: listSteelDefectDetails, description: description, indexRow: indexRow, callBackChoose: callBackChooseLoi }
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
                rf_datagrid_imei_receiptVm.current.cancelEdit();
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
                rf_datagrid_imei_receiptVm.current.cancelEdit();
            }, 300);
        }
    }

    const EditCuonNhapKhau = (e: any) => {

        if (optionReceipt.receiptID <= 0) {
            message.error('Vui lòng chọn thông tin cuộn để điều chỉnh cuộn nhập khẩu');
            return false;
        }
        setOptionReceipt(prevState => ({ ...prevState, isEditing: true }));

    }

    const CancelUpdate = (e: any) => {
        setOptionReceipt(prevState => ({ ...prevState, isEditing: false }));
    }

    const onUpdate = async (e: any) => {

        setOptionReceipt({ ...optionReceipt, isSubmit: true });
        var data = await receiptService.SP_NXNL_UPDATE_NHAP_KHAU(dataReceiptVm, dataLstReceiptDetail, dataReceiptImei);
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionReceipt({ ...optionReceipt, isSubmit: false });
        }
        else {
            await SearchListReceipt(modelRequest, function (datas: Array<receiptVm>) {
                var nxhhItem = datas.find((element) => {
                    return element.receiptID === dataReceiptVm.receiptID;
                });
                if (nxhhItem) {
                    onSelectReceipt(nxhhItem, datas);
                }
            });
            setOptionReceipt({ ...optionReceipt, isSubmit: false });
            message.success("Cập nhật cuộn nhập khẩu thành công");
        }
    }


    const handleKeyDownNhapCuonSXGhiChuGroup = (event: any, index: number) => {
        if (event.keyCode === 13) {
            if (rf_datagrid_imei_receiptVm.current) {
                rf_datagrid_imei_receiptVm.current.endEdit();
                let value = event.target.value;
                const _dataReceiptImei = [...dataReceiptImei];
                _dataReceiptImei[index].description = value;
                setDataReceitImeiAPI([]);
                setTimeout(() => {
                    rf_datagrid_imei_receiptVm.current.cancelEdit();
                    setDataReceitImeiAPI(_dataReceiptImei);
                    setSpinningLoadCTBang(false);
                }, 400);
            }
        }
    }

    const handleKeyDownInput_Sokg = async (e: any, name: string, index: number) => {
        if (e.key === 'Enter') {
            setSpinningLoadCTBang(true);
            let { value } = e.target;
            var weight = value.replace(/,/g, '');
            const _dataReceiptImei = [...dataReceiptImei];
            if (name == 'weight3' || name == 'pl_diem' || name == 'pl_boc' || name == 'pl_giay' || name == 'pl_nhua') {
                _dataReceiptImei[index][name] = weight;
            }
            setDataReceitImeiAPI([]);
            setTimeout(() => {
                rf_datagrid_imei_receiptVm.current.cancelEdit();
                setDataReceitImeiAPI(_dataReceiptImei);
                rf_datagrid_imei_receiptVm.current.scrollTo(_dataReceiptImei[index]);
                setSpinningLoadCTBang(false);
            }, 400);
        }
    }

    const handleOnBlurInput_Sokg = (e: any, name: string, index: number) => {
        setSpinningLoadCTBang(true);
        let { value } = e.target;
        var weight = value.replace(/,/g, '');
        const _dataReceiptImei = [...dataReceiptImei];
        if (name == 'weight3' || name == 'pl_diem' || name == 'pl_boc' || name == 'pl_giay' || name == 'pl_nhua') {
            _dataReceiptImei[index][name] = weight;
        }
        setDataReceitImeiAPI([]);
        setTimeout(() => {
            rf_datagrid_imei_receiptVm.current.cancelEdit();
            setDataReceitImeiAPI(_dataReceiptImei);
            rf_datagrid_imei_receiptVm.current.scrollTo(_dataReceiptImei[index]);
            setSpinningLoadCTBang(false);
        }, 400);
    }

    const onSelectKho_Inrow_CTNXHH = async (value: any, option: any, index: number) => {
        setSpinningLoadCTBang(true);
        const _dataReceiptImei = [...dataReceiptImei];
        _dataReceiptImei[index].width = value;
        setDataReceitImeiAPI([]);
        setTimeout(() => {
            rf_datagrid_imei_receiptVm.current.cancelEdit();
            setDataReceitImeiAPI(_dataReceiptImei);
            setDataInputReceiptImei({ ...dataInputReceiptImei, width: value });
            rf_datagrid_imei_receiptVm.current.scrollTo(_dataReceiptImei[index]);
            setSpinningLoadCTBang(false);
        }, 400);
    }

    const onSelectDay_Inrow_CTNXHH = async (value: any, option: any, index: number) => {
        setSpinningLoadCTBang(true);
        const _dataReceiptImei = [...dataReceiptImei];
        _dataReceiptImei[index].thickness = value;
        setDataReceitImeiAPI([]);
        setTimeout(() => {
            rf_datagrid_imei_receiptVm.current.cancelEdit();
            setDataReceitImeiAPI(_dataReceiptImei);
            setDataInputReceiptImei({ ...dataInputReceiptImei, thickness: value });
            rf_datagrid_imei_receiptVm.current.scrollTo(_dataReceiptImei[index]);
            setSpinningLoadCTBang(false);
        }, 400);
    }

    const UpdateAllCT_CTreceipt = (e: any, type: string) => {
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
            case 'weight3':
                if (dataInputReceiptImei.weight3 === 0 || dataInputReceiptImei.weight3 === null) {
                    message.error('Vui lòng nhập số kg 3');
                    isUpdate = false;
                }
                else {
                    datas.forEach(item => {
                        item.weight3 = dataInputReceiptImei.weight3;
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
                rf_datagrid_imei_receiptVm.current.cancelEdit();
                setSpinningLoadCTBang(false);
            }, 300);
        }
    }

    const onSelectKho_CT_CTNXHH = async (value: any, option: any) => {
        setDataInputReceiptImei({ ...dataInputReceiptImei, width: value });
    }

    const onSelectDay_CT_CTNXHH = async (value: any, option: any) => {
        setDataInputReceiptImei({ ...dataInputReceiptImei, thickness: value });
    }

    const onChangeSokg_CT_CTNXHH = (value: any) => {
        const floatValue = parseFloat(value.floatValue || 0);
        setDataInputReceiptImei({ ...dataInputReceiptImei, weight3: floatValue });
    }

    const FormatSokg = (weight: string) => {
        if (weight.length < 5) {
            var _weight = '';
            for (var i = 1; i <= (5 - weight.length); i++) {
                _weight += '0';
            }
            return _weight + weight;
        }
        return weight;
    }

    const getTotalSokgPL = (_data: any) => {

        let totalSokgPL_DIEM = 0, totalSokgPL_GIAY = 0, totalSokgPL_NHUA = 0, totalSokgPL_BOC = 0;
        const dataNLBangSXs = _data.filter((p:any) => p.isChecked === true);
        if (_data && _data.length > 0) {
            _data.forEach((element:any) => {
                totalSokgPL_DIEM += element.pl_diem;
                totalSokgPL_GIAY += element.pl_giay;
                totalSokgPL_BOC += element.pl_boc;
                totalSokgPL_NHUA += element.pl_nhua;
            });
        }

        return {
            totalSokgPL_DIEM,
            totalSokgPL_GIAY,
            totalSokgPL_NHUA,
            totalSokgPL_BOC
        }
    }

    const getSokg = (name: string, weightItems: any) => {
        let weight = 0;
        switch (name) {
            case 'PL_DIEM':
                weight = weightItems.totalSokgPL_DIEM ?? 0;
                break;
            case 'PL_GIAY':
                weight = weightItems.totalSokgPL_GIAY ?? 0;
                break;
            case 'PL_NHUA':
                weight = weightItems.totalSokgPL_NHUA ?? 0;
                break;
            case 'PL_BOC':
                weight = weightItems.totalSokgPL_BOC ?? 0;
                break;
        }

        return weight;
    }

    const NhapKhoPheLieu = async (e: any) => {

        if (optionReceipt.receiptID <= 0) {
            message.error('Vui lòng chọn thông tin cuộn để nhập width phế liệu');
            return false;
        }

        //setOptionReceipt({ ...optionReceipt, isSubmit: true });
        const _dataPheLieu = Object.assign({}, dataReceiptVm);

        let dateNow = new Date();
        let ngatct = moment(dateNow, 'YYYY/MM/DD');
        let month = ngatct.format('YYYYMM');

        _dataPheLieu.receiptID = 0;
        _dataPheLieu.businessID = 'N25';
        _dataPheLieu.storeID = 'K71';
        _dataPheLieu.storeIDc = 'K71';
        _dataPheLieu.materialType = 'C';
        _dataPheLieu.ctlq = optionReceipt.receiptID;
        _dataPheLieu.receiptDate = dateNow;
        _dataPheLieu.monthID = month;

        let hanghoareceipt = Array<any>();
        const _dataReceiptImei = Object.assign([], dataReceiptImei);
        const weightPLs = getTotalSokgPL(_dataReceiptImei);

        var pls = ['PL_DIEM', 'PL_GIAY', 'PL_NHUA', 'PL_BOC'];
        pls.forEach(item => {
            const weight = getSokg(item, weightPLs);
            hanghoareceipt.push({
                productID: item,
                calculationUnit: 'Kg',
                quantity: 1,
                unitPrice: 0,
                totalAmount: 0,
                scaleNo: '',
                totalWeight: weight,
                totalWeight1: weight,
                totalWeight2: 0,
                totalWeight3: 0,
                scaleDate: new Date()

            });
        });

        var dataPL = await receiptService.SP_NXNL_NHAP_PHU_LIEU_CUON_NHAP_KHAU(_dataPheLieu, hanghoareceipt, []);
        if (dataPL.status === APIStatus.ERROR) {
            message.error(dataPL.message);
            setOptionReceipt({ ...optionReceipt, isSubmit: false });
        }
        else {
            message.success('Nhập width phế liệu thành công');
            setOptionReceipt({ ...optionReceipt, isSubmit: false });
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
                                <Button disabled={false} type="primary" icon="search" onClick={e => Seachreceipt(e)}></Button>
                            </div>
                            <div className="clearfix h-5"></div>
                            <div className="fl-lef w-45">
                                <Select
                                    value={modelRequest.counterpartyID}
                                    className="input-text-upercase"
                                    disabled={false}
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
                                    disabled={false}
                                    value={modelRequest.receiptNo} onChange={onChangeReceiptNoSearch} />
                            </div>
                            <div className="clearfix h-5"></div>
                            <DataGrid
                                disabled={false}
                                data={dataLstReceiptVm.lstreceipt}
                                style={{ height: (window.innerHeight - 190) }}
                                onSelectionChange={onSelectReceipt}
                                selection={dataSelectReceipt.receiptVm}
                                selectionMode="single">
                                <GridColumn title="Số CT" field="receiptNo" width="15%" />
                                <GridColumn title="Tên NCC" field="counterpartyName" width="50%" />
                                <GridColumn title="Số lượng" field="quantity" width="15%" align="center"
                                    header={() => <span>Số lượng</span>}
                                    render={({ row }: any) => (
                                        <NumericFormat readOnly className="ant-input-number-input text-center" thousandSeparator={true} value={row.quantity} />
                                    )}
                                />
                            </DataGrid>
                        </div>
                        <div className="pannel-left-footer">
                            <div className="inline-bolck w-50" style={{ textAlign: 'left' }}>
                                <div className="inline-bolck" style={{ marginRight: 5 }}><UserOutlined type="user" style={{ fontSize: 18 }} /></div>
                                <div className="inline-bolck" style={{ marginRight: 5 }}>
                                    {/* {isemployeeID ?
                                        <Checkbox disabled={false} onChange={handleChangeCheckBoxSearchQuanTri}></Checkbox>
                                        :
                                        <div></div>
                                    } */}
                                        <Checkbox disabled={false} onChange={handleChangeCheckBoxSearchQuanTri}></Checkbox>

                                </div>
                                <div className="inline-bolck">
                                    <CBUserAdmintrator value={modelUserRequest} isEditing={false} OnChangeCBQuanTri={OnChangeCBQuanTri} />
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
                                    Số HĐ
                                </div>
                                <div className="inline-bolck input-control">
                                    <Input size="small" ref={rf_sohd} disabled={true} name="sohd" value={dataReceiptVm.sohd} />
                                </div>
                            </div>
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5 ">
                                    Ngày CT
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <DatePicker size="small" disabled={true} value={dayjs(dataReceiptVm.receiptDate)} defaultValue={dayjs(dataReceiptVm.receiptDate)} format={dateFormat} />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Kho
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        disabled={true}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.storeID}
                                        placeholder="Chọn width hàng"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                    >
                                        {dataStore && dataStore.map(d => (
                                            <Option title={d.storeName} key={d.storeID} value={d.storeID}>
                                                <span>{d.storeID} - {d.storeName}</span>
                                            </Option>
                                        ))}
                                    </Select>
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
                                    <Input size="small" disabled={true} value={`${dataReceiptVm.businessID}${(dataReceiptVm.businessName ? `- ${dataReceiptVm.businessName}` : '')}`} />
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
                                            <Option title={(d.counterpartyID + '-' + d.counterpartyName)} data-kyhieu={d.counterpartyType} key={d.counterpartyID} value={d.counterpartyID}>
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
                                        ref={rf_materialType}
                                        showAction={['focus']}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.steelType}
                                        placeholder="Chọn loại nguyên liệu"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                    >
                                        {cateSteelType && cateSteelType.map(d => (
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
                                        ref={rf_donvima}
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
                                                <span>{d.galvanizedOrganizationName}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-50">
                                {/* <div className="lable-cotrol inline-bolck mr-right-5">
                                    NV trực ca
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Select
                                        ref={rf_employeeCode}
                                        showAction={['focus']}
                                        className="input-text-upercase"
                                        allowClear={true}
                                        disabled={true}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={dataReceiptVm.employeeCode}
                                        placeholder="Chọn nhân viên trực ca"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        getPopupContainer={(trigger: any) => trigger.parentNode}
                                    >
                                        {nhanVienModel && nhanVienModel.map(d => (
                                            <Option title={(d.ma + '-' + d.ten)} key={d.ma} value={d.ma}>
                                                <span>{d.ma} - {d.ten}</span>
                                            </Option>
                                        ))}
                                    </Select>
                                </div> */}
                            </div>
                            <div className="fl-lef w-50">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Giá mua
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <div className="input-bg-special ant-input-number-sm ant-input-number ant-input-number-disabled">
                                        <NumericFormat
                                            className="ant-input-number-input input-text-right input-bg-special text-red"
                                            thousandSeparator={true}
                                            value={dataReceiptVm.steelPrice}
                                            getInputRef={rf_giamua}
                                            name="steelPrice"
                                            isAllowed={(values) => {
                                                const { floatValue } = values;
                                                return floatValue! > 0 && floatValue! <= 999999;
                                            }
                                        }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="fl-lef w-100">
                                <div className="lable-cotrol inline-bolck mr-right-5">
                                    Nội dung
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <Input size="small" ref={rf_receiptContent} disabled={true} name="receiptContent" value={dataReceiptVm.receiptContent} />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <section className="code-box-meta markdown">
                                <div className="code-box-title">Chi tiết nguyên liệu</div>
                                <div className="code-box-description">
                                    <div className="tool-bar-cthh" style={{ marginBottom: 2 }}>
                                        <div className="inline-bolck w-45"></div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <div className={optionReceipt.isEditing ? "ant-input-number-sm ant-input-number" : "ant-input-number-sm ant-input-number ant-input-number-disabled"}>
                                                <NumericFormat
                                                    readOnly={!optionReceipt.isEditing}
                                                    className="ant-input-number-input input-text-right"
                                                    thousandSeparator={true}
                                                    min={0}
                                                    value={dataInputReceiptImei.weight3}
                                                    name="weight3"
                                                    maxLength={6}
                                                    onValueChange={onChangeSokg_CT_CTNXHH}
                                                />

                                            </div>
                                        </div>
                                        <div className='inline-bolck w-3 mr-1 text-center'>
                                            <Button size="small" disabled={!optionReceipt.isEditing} type="primary" icon="vertical-align-bottom"
                                                onClick={e => UpdateAllCT_CTreceipt(e, 'weight3')}
                                            />
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <Select
                                                disabled={!optionReceipt.isEditing}
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
                                            <Button size="small" disabled={!optionReceipt.isEditing} type="primary" icon="vertical-align-bottom"
                                                onClick={e => UpdateAllCT_CTreceipt(e, 'width')}
                                            />
                                        </div>
                                        <div className="inline-bolck w-8 mr-1">
                                            <Select
                                                disabled={!optionReceipt.isEditing}
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
                                            <Button size="small" disabled={!optionReceipt.isEditing} type="primary" icon="vertical-align-bottom"
                                                onClick={e => UpdateAllCT_CTreceipt(e, 'thickness')}
                                            />
                                        </div>
                                        {/* <div className='inline-bolck w-20 mr-1 text-right'>
                                            <Button size="small" disabled={!optionReceipt.isEditing} type="primary" icon="warning"
                                                onClick={e => showEditLoiCuon(e, [], '', -1)}
                                            >
                                                Ghi chú lỗi
                                            </Button>
                                        </div> */}

                                    </div>
                                    <div className="hanghoaInputreceipt">
                                        <DataGrid
                                            ref={rf_datagrid_imei_receiptVm}
                                            disabled={true}
                                            data={dataReceiptImei}
                                            style={{ height: (window.innerHeight - 385) }}
                                            selectionMode={!optionReceipt.isEditing ? null : "single"}
                                            selection={dataSelectReceiptImei}
                                            clickToEdit={optionReceipt.isEditing}
                                            editMode="cell"
                                            showFooter
                                            footerData={getFooterData(dataReceiptImei)}
                                        >
                                            <GridColumn title="STT" key="sortOrder" field="sortOrder" width="3%" />
                                            <GridColumn title="Imei" key="imei" field="imei" width="20%" align="left" />
                                            <GridColumn title="Số kg 1" field="weight1" key="weight1" width="6%" align="right"
                                                header={() => <span>Số kg 1</span>}
                                                editable={false}
                                                render={({ row }: any) => (
                                                    <span>{row.weight1}</span>
                                                )}
                                            />
                                            <GridColumn title="Số kg 2" field="weight2" key="weight2" width="6%" align="right"
                                                header={() => <span>Số kg 2</span>}
                                                editable={false}
                                                render={({ row }: any) => (
                                                    <span>{row.weight2}</span>
                                                )}
                                            />
                                            <GridColumn title="Số kg 3" field="weight3" key="weight3" width="6%" align="right"
                                                header={() => <span>Số kg 3</span>}
                                                editable={true}
                                                render={({ row }: any) => (
                                                    <span>{row.weight3}</span>
                                                )}
                                                editor={({ row }: any) => (
                                                    <div className="ant-input-number-sm ant-input-number">
                                                        <NumericFormat
                                                            name={('imei-weight-' + row.sortOrder)}
                                                            className="ant-input-number-input input-text-right"
                                                            thousandSeparator={true}
                                                            isAllowed={(values) => {
                                                                const { floatValue } = values;
                                                                return floatValue! > 0;
                                                            }}
                                                            maxLength={6}
                                                            value={row.weight3}
                                                            onBlur={e => handleOnBlurInput_Sokg(e, 'weight3', (row.sortOrder - 1))}
                                                            onKeyDown={e => handleKeyDownInput_Sokg(e, 'weight3', (row.sortOrder - 1))}
                                                        />
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="Khổ" key="width" field="width" width="7%" align="left"
                                                editable={true}
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
                                                                <Option title={d.widthName} key={d.widthID} value={d.widthName}>
                                                                    {d.widthID}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="Dày" key="thickness" field="thickness" width="7%" align="left"
                                                editable={true}
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
                                            <GridColumn title="PL Diềm" field="pl_diem" key="pl_diem" width="5%" align="right"
                                                editable={true}
                                                render={({ row }: any) => (
                                                    <span>{row.pl_diem}</span>
                                                )}
                                                editor={({ row }: any) => (
                                                    <div className="ant-input-number-sm ant-input-number">
                                                        <NumericFormat
                                                            name={('imei-weight-' + row.sortOrder)}
                                                            className="ant-input-number-input input-text-right"
                                                            thousandSeparator={true}
                                                            isAllowed={(values) => {
                                                                const { floatValue } = values;
                                                                return floatValue! >= 0;
                                                            }}
                                                            maxLength={6}
                                                            value={row.pl_diem}
                                                            onBlur={e => handleOnBlurInput_Sokg(e, 'pl_diem', (row.sortOrder - 1))}
                                                            onKeyDown={e => handleKeyDownInput_Sokg(e, 'pl_diem', (row.sortOrder - 1))}
                                                        />
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="PL Bọc" field="pl_boc" key="pl_boc" width="5%" align="right"
                                                editable={true}
                                                render={({ row }: any) => (
                                                    <span>{row.pl_boc}</span>
                                                )}
                                                editor={({ row }: any) => (
                                                    <div className="ant-input-number-sm ant-input-number">
                                                        <NumericFormat
                                                            name={('imei-weight-' + row.sortOrder)}
                                                            className="ant-input-number-input input-text-right"
                                                            thousandSeparator={true}
                                                            isAllowed={(values) => {
                                                                const { floatValue } = values;
                                                                return floatValue! >= 0;
                                                            }}
                                                            maxLength={6}
                                                            value={row.pl_boc}
                                                            onBlur={e => handleOnBlurInput_Sokg(e, 'pl_boc', (row.sortOrder - 1))}
                                                            onKeyDown={e => handleKeyDownInput_Sokg(e, 'pl_boc', (row.sortOrder - 1))}
                                                        />
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="PL Giáy" field="pl_giay" key="pl_giay" width="5%" align="right"
                                                editable={true}
                                                render={({ row }: any) => (
                                                    <span>{row.pl_giay}</span>
                                                )}
                                                editor={({ row }: any) => (
                                                    <div className="ant-input-number-sm ant-input-number">
                                                        <NumericFormat
                                                            name={('imei-weight-' + row.sortOrder)}
                                                            className="ant-input-number-input input-text-right"
                                                            thousandSeparator={true}
                                                            isAllowed={(values) => {
                                                                const { floatValue } = values;
                                                                return floatValue! >= 0;
                                                            }}
                                                            maxLength={6}
                                                            value={row.pl_giay}
                                                            onBlur={e => handleOnBlurInput_Sokg(e, 'pl_giay', (row.sortOrder - 1))}
                                                            onKeyDown={e => handleKeyDownInput_Sokg(e, 'pl_giay', (row.sortOrder - 1))}
                                                        />
                                                    </div>
                                                )}
                                            />
                                            <GridColumn title="PL Nhựa" field="pl_nhua" key="pl_nhua" width="5%" align="right"
                                                editable={true}
                                                render={({ row }: any) => (
                                                    <span>{row.pl_nhua}</span>
                                                )}
                                                editor={({ row }: any) => (
                                                    <div className="ant-input-number-sm ant-input-number">
                                                        <NumericFormat
                                                            name={('imei-weight-' + row.sortOrder)}
                                                            className="ant-input-number-input input-text-right"
                                                            thousandSeparator={true}
                                                            isAllowed={(values) => {
                                                                const { floatValue } = values;
                                                                return floatValue! >= 0;
                                                            }}
                                                            maxLength={6}
                                                            value={row.pl_nhua}
                                                            onBlur={e => handleOnBlurInput_Sokg(e, 'pl_nhua', (row.sortOrder - 1))}
                                                            onKeyDown={e => handleKeyDownInput_Sokg(e, 'pl_nhua', (row.sortOrder - 1))}
                                                        />
                                                    </div>
                                                )}
                                            />
                                            {/* <GridColumn title="Ghi chú" key="description" field="description" width="10%" align="left"
                                                editable={true}
                                                render={({ row }: any) => (
                                                    <>
                                                        {
                                                            row.description
                                                        }
                                                    </>
                                                )}
                                                editor={({ row }) => (
                                                    <>
                                                        <div style={{ padding: "2px 5px" }}>
                                                            <div
                                                                className="fl-lef w-100"
                                                                data-rowindex={row.sortOrder}
                                                                onKeyDown={(event) => handleKeyDownNhapCuonSXGhiChuGroup(event, row.index)}
                                                            >
                                                                <TextBox value={row.description}></TextBox>
                                                            </div>
                                                            <div className="clearfix" style={{ height: 0 }}></div>
                                                        </div>
                                                    </>
                                                )}
                                            />
                                            <GridColumn title="Lỗi" key="loi" field="loi" width="10%" align="left"
                                                render={({ row }: any) => (
                                                    <>
                                                        <div className='inline-bolck w-80'>
                                                            {
                                                                row.listSteelDefectDetails && row.listSteelDefectDetails.map(p => {
                                                                    return <span>{p.tenloi}</span>
                                                                })
                                                            }
                                                        </div>
                                                        <div className='inline-bolck w-20 text-right'>
                                                            <Tooltip title={row.listSteelDefectDetails ? row.listSteelDefectDetails.map(p => p.tenloi).toString() : ''}>
                                                                <Button size="small" shape="circle" onClick={(e: any) => showEditLoiCuon(e, row.listSteelDefectDetails, row.description, row.sortOrder - 1)}>...</Button>
                                                            </Tooltip>
                                                        </div>
                                                    </>
                                                )}
                                            />
                                            <GridColumn key="upload" field="upload" width="5%" align="center"
                                                render={({ row }: any) => (
                                                    <div>
                                                        <Button size="small" shape="circle" icon="upload" onClick={(e: any) => showFormUploadFile(row.sortOrder - 1)} />
                                                    </div>
                                                )}
                                            /> */}
                                        </DataGrid>

                                        <div className="clearfix h-3"></div>
                                        <div className="tonhh-info">
                                            <div className="inline-bolck mr-right-5">
                                                Tồn
                                            </div>
                                            <div className="inline-bolck mr-1">
                                                <Input size="small" disabled={true} readOnly value={optionTONHH.productName} />
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
                        <div className="clearfix h-5"></div>
                        <div className="pannel-right-footer" style={{ padding: 30 }}>
                            {optionReceipt.isEditing ?
                                <div className="inline-bolck">
                                    <Button className="button" loading={optionReceipt.isSubmit} type="primary" icon="save" size="small"
                                        onClick={e => onUpdate(e)}
                                    >Lưu</Button>
                                    <Button className="button" disabled={optionReceipt.isSubmit} type="primary" icon="close" size="small"
                                        onClick={e => CancelUpdate(e)}
                                    danger>Hủy</Button>
                                </div>
                                :
                                <div className="inline-bolck">
                                    {/* {iskiemsoatnoibo == false ?
                                        <Fragment>
                                        <Button className="button" type="primary" icon="edit" size="small"
                                            onClick={e => EditCuonNhapKhau(e)}>Sửa Cuộn Nhập Khẩu</Button>
                                        <Button className="button" type="primary" icon="edit" size="small"
                                            onClick={e => NhapKhoPheLieu(e)}>Nhập width phế liệu</Button>
                                    </Fragment>
                                        :
                                        <div></div>
                                    } */}
                                    <Fragment>
                                        <Button className="button" type="primary" icon="edit" size="small"
                                            onClick={e => EditCuonNhapKhau(e)}>Sửa Cuộn Nhập Khẩu</Button>
                                        <Button className="button" type="primary" icon="edit" size="small"
                                            onClick={e => NhapKhoPheLieu(e)}>Nhập width phế liệu</Button>
                                    </Fragment>
                                </div>
                            }
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
            </Spin>
        </Fragment>
    )
}
export default UpdateWidthImport;