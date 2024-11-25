import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Button, Input, DatePicker, Modal, InputNumber, message, Checkbox, Select, Upload, Spin, Tooltip } from 'antd';
import IAntdUpload from '../../../../models/iAntdUpload';
import { ComboGrid, GridColumn, DataGrid, TextBox, LinkButton } from 'rc-easyui';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {NumericFormat} from 'react-number-format';
import moment from 'moment';
import dayjs from 'dayjs';
import {  EditOutlined, SaveOutlined, CloseOutlined, SearchOutlined, WarningOutlined, FileImageOutlined, } from '@ant-design/icons';

import { receiptVm } from '../../../../models/receipt';
import cateBranch from '../../../../models/cateBranch';
import cateStore from '../../../../models/cateStore';
import cateCounterparty from '../../../../models/cateCounterparty';
import cateCounterpartyGroup from '../../../../models/cateCounterpartyGroup';
// import QUYCACH_HH from '../../../models/QUYCACH_HH';
import cateSteelType from '../../../../models/cateSteelType';
import cateStandard from '../../../../models/cateStandard';
import cateProductionBatchNo from '../../../../models/cateProductionBatchNo';
import cateGalvanizedOrganization from '../../../../models/cateGalvanizedOrganization';
import steelDefectDetail from '../../../../models/steelDefectDetail';
import inventoryDetail from '../../../../models/productions/inventoryDetail';
import receiptRequest from '../../../../models/request/receiptRequest';
import { receiptDetailVm } from '../../../../models/receiptDetail';
import receiptImei from '../../../../models/receiptImei';
// import TONKHONL_CHITIET from '../../../models/sanxuat/TONKHONL_CHITIET';

import CBUseremployeeID from '../../../../components/CBUserAdmintrator/index';
import LoginUtils from '../../../../utils/loginUtils';

import ReceiptService from '../../../../services/receiptService';
import CateStoreService from '../../../../services/cateStoreService';
import CateProductService from '../../../../services/cateProductService';
import CateCounterpartyService from '../../../../services/cateCounterpartyService';
import CateBranchService from '../../../../services/cateBranchService';
import CateSteelTypeService from '../../../../services/cateSteelTypeService';
import CateStandardService from '../../../../services/cateStandardService';
import CateProductionBatchNoService from '../../../../services/cateProductionBatchNoService';
import CateGalvanizedOrganizationService from '../../../../services/cateGalvanizedOrganizationService';
import MediaController from '../../../../services/mediaUploadService';

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
const mediaController = new MediaController();

const { Option } = Select;
const UpdateSteelDefect: React.FC = () => {
    const workProcessID = "XB.02";
    const menuKeyNhapNL = 'rollSteelDefect';
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
    const rf_branchIDma = useRef<any>(null);
    const rf_employeeID = useRef<any>(null);
    const rf_giamua = useRef<any>(null);
    const rf_receiptContent = useRef<any>(null);
    const rf_datagrid_isImei_receiptVm = useRef<any>(null);

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
            branchID: branchId,
            receiptNo: '',
            frdate: new Date(),
            todate: new Date(),
            counterpartyID: '',
            materialType: 'C',
            businessID: 'N11',
            employeeID: ''
        };
        return dataInit;
    }));
    const dataReceiptVmInit = {
        receiptID: 0,
        branchID: '',
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
        //steelPrice: 0,
        workProcessID: workProcessID
    }

    const [dataReceiptDetail, setdataReceiptDetail] = useState((() => {
        let dataInit: Array<receiptDetailVm> = [] as any;
        return dataInit;
    }));

    const [optionNXNL, setOptionNXNL] = useState((() => {
        let dataInit = { receiptID: 0, receiptNo: '', isupdatereceiptVmnl: false, counterreceiptVm: 0, isEditing: false, isSubmit: false };
        return dataInit;
    }));

    const [dataLstNXNL, setLstdataReceiptVm] = useState({ loading: true, tongcong: 0, lstNXNL: Array<receiptVm>() });
    const [dataLstNXNLDefault, setLstdataReceiptVmDefault] = useState(Array<receiptVm>());

    const [dataReceiptVm, setdataReceiptVm] = useState((() => {
        let dataInit: receiptVm = dataReceiptVmInit
        return dataInit;
    }));

    const [dataSelectReceipt, setDataSelectReceipt] = useState((() => {
        let dataInit = { receiptVm: dataReceiptVmInit, receiptID: 0 }
        return dataInit;
    }));

    const [dataReceiptImei, setdataReceiptImei] = useState((() => {
        let dataInit: Array<receiptImei> = [] as any;
        return dataInit;
    }));

    const [dataInputHangHoaNXNL, setDataInputHangHoaNXNL] = useState((() => {
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
            // createDate: new Date(),
            productTypeID: '',
            productName: '',
            vuotton: false,
            index: -1
        };
        return dataInit;
    }));

    const [dataSelectChiTietHangHoaNXNL, setDataSelectChiTietHangHoaNXNL] = useState((() => {
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

    const [cateCounterpartyGroupModel, setCateCounterpartyGroup] = useState((() => {
        let dataInit: Array<cateCounterpartyGroup> = [] as any;
        return dataInit;
    }));

    const [counterPartySearchModel, setCounterPartySearchModel] = useState((() => {
        let dataInit: Array<cateCounterparty> = [] as any;
        return dataInit;
    }));

    const [employeeIDModel, setemployeeIDModel] = useState((() => {
        let dataInit: Array<cateCounterparty> = [] as any;
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

    const [dataCateProductionBatchNo, setdataCateProductionBatchNo] = useState((() => {
        let dataInit: Array<cateProductionBatchNo> = [] as any;
        return dataInit;
    }));

    const [dataCateGalvanizedOrganization, setDataCateGalvanizedOrganization] = useState((() => {
        let dataInit: Array<cateGalvanizedOrganization> = [] as any;
        return dataInit;
    }));

    const [optionTONHH, setOptionTONHH] = useState((() => {
        let dataInit = { productName: '', tonhh: 0, lstRDTonHHH: Array<inventoryDetail>() };
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

            await CheckKhoaSo(new Date());
            await GetBrandUserLogin();
            await SearchListReceipt(modelRequest);

            await GetDataStore();

            await GetDataCateCounterParty();
            await GetCateCounterpartyGroup();

            // await GetListemployeeID();

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

    const CheckKhoaSo = async (receiptDate: Date) => {
        var getDdata = await receiptService.CheckMonthIsOpen(dayjs(receiptDate).format("YYYYMM"));
        setCateMonthInfo(getDdata.data);
    }

    const SearchListReceipt = async (request: receiptRequest, callback?: any) => {
        var getDdata = await receiptService.SearchListReceipt(request);
        var tongcong = 0;
        if (getDdata.data !== undefined && getDdata.data != null) {
            var data = getDdata.data as Array<receiptVm>;
            data.forEach(ele => {
                tongcong += ele.quantity;
            });
        }
        setLstdataReceiptVm({ ...dataLstNXNL, loading: true, tongcong: tongcong, lstNXNL: getDdata.data });
        setLstdataReceiptVmDefault(getDdata.data);
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

    const GetDataCateCounterParty = async (counterpartyGroup = 'NVL') => {
        var getDdata = await cateCounterpartyService.GetListGetVendorByGroupId(counterpartyGroup);
        setCateCounterparty(getDdata.data);
        if (counterPartySearchModel && counterPartySearchModel.length <= 0) {
            setCounterPartySearchModel(getDdata.data);
        }
    }

    const GetCateCounterpartyGroup = async () => {
        var getDdata = await cateCounterpartyService.GetListCounterPartyGroup('CC', true);
        setCateCounterpartyGroup(getDdata.data);
    }

    // const GetListemployeeID = async () => {
    //     var getDdata = await cateCounterpartyService.GetListcounterpartyID('NV', '');
    //     setemployeeIDModel(getDdata.data);
    // }

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
        setdataCateProductionBatchNo(getDdata.data);
    }

    const GetCateGalvanizedOrganization = async () => {
        var getDdata = await cateGalvanizedOrganizationService.GetList();
        setDataCateGalvanizedOrganization(getDdata.data);
    }

    const onSelectReceipt = async (selection: receiptVm, dataInit?: Array<receiptVm>) => {

        setLoadingPage(true);

        var nxnl: receiptVm = dataReceiptVmInit;
        if (dataInit) {
            nxnl = dataInit.find((element) => {
                return element.receiptID === selection.receiptID;
            }) || dataReceiptVmInit;
        }
        else {
            nxnl = dataLstNXNLDefault.find((element) => {
                return element.receiptID === selection.receiptID;
            }) || dataReceiptVmInit;
        }
        if (nxnl) {
            nxnl.receiptDate = new Date(nxnl.receiptDate);
        }
        var nxnlItem = nxnl || dataReceiptVmInit;

        await CheckKhoaSo(nxnlItem.receiptDate);

        setDataSelectReceipt({ ...dataSelectReceipt, receiptVm: nxnlItem });
        setModelUserRequest(nxnlItem.createdBy);
        setdataReceiptVm(nxnlItem);

        let canxeInfo = Object.assign({}, modelCanXe);
        canxeInfo.licensePlate = nxnlItem.licensePlate;

        setTimeout(async () => {
            var lstreceiptVmandisImei = await receiptService.GetListReDetail_AND_ReIMEI(selection.receiptID);
            if (lstreceiptVmandisImei) {

                var lstRD = lstreceiptVmandisImei.data.listReceiptDetails as Array<receiptDetailVm>;
                var lstisImei = lstreceiptVmandisImei.data.listReceiptImeis as Array<receiptImei>;

                setdataReceiptDetail(lstRD);
                setDataInputHangHoaNXNL(lstRD[0]);

                canxeInfo.scaleNo = lstRD[0].scaleNo;
                canxeInfo.scaleDate = lstRD[0].scaleDate;
                canxeInfo.volumeGoods = lstRD[0].totalWeight2;
                canxeInfo.scaleEmployee = lstRD[0].scaleEmployee ?? "";

                if (lstisImei && lstisImei.length > 0) {
                    nxnlItem.standard = lstisImei[0].standard;
                    nxnlItem.steelType = lstisImei[0].steelType;
                    nxnlItem.productionBatchNo = lstisImei[0].productionBatchNo;
                    nxnlItem.galvanizedOrganization = lstisImei[0].galvanizedOrganization;
                    nxnlItem.steelPrice = lstisImei[0].steelPrice;
                }
                setdataReceiptImei(lstisImei);

                // var itemTonHHInfo = await receiptService.ListChiTietTonKhoNL({ steelType: 'C', storeID: nxnl.storeID, productID: lstRD[0].productID, thang: nxnl.thang });
                // const totalquantityTon = itemTonHHInfo.data.reduce((quantity, obj) => {
                //     return quantity + obj.quantity;
                // }, 0);
                // setOptionTONHH({ ...optionTONHH, productName: lstRD[0].productName, tonhh: totalquantityTon, lstRDTonHHH: itemTonHHInfo.data });

                setModelCanXe(canxeInfo);

                setOptionNXNL(prevState => ({
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

    const onchangecounterpartyIDSearch = (value: any) => {
        setModelRequest({ ...modelRequest, counterpartyID: value });
    }

    const handleFiltercounterpartyIDSearch = (input: any, option: any) => {
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

    const handleChangeCheckBoxSearchemployeeID = async (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setIsViewUser(checked);
    }

    const OnChangeCBemployeeID = (value: any) => {
        setModelUserRequest(value);
        if (isViewUser) {
        }
    }

    const SeachNXNL = async (e: any) => {
        e.preventDefault();
        await SearchListReceipt(modelRequest);
    }

    const getFooterData = (datas: any) => {
        // let sokg1 = 0;
        // let sokg2 = 0;
        // let sokg3 = 0;
        // datas.forEach(element => {
        //     sokg1 += parseInt(element.sokg1);
        //     sokg2 += parseInt(element.sokg2);
        //     sokg3 += parseInt(element.sokg3);
        // });
        // return [
        //     { stt: datas.length, isImei: 'CUỘN', sokg1: sokg1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), sokg2: sokg2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), sokg3: sokg3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
        // ]
    }

    const UpdateAlreceiptType_Image_receiptVmNL = (value: string, type: string, rowIndex: number) => {
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
            setdataReceiptImei([]);
            setTimeout(() => {
                setdataReceiptImei(datas);
                rf_datagrid_isImei_receiptVm.current.cancelEdit();
            }, 300);
        }
    }

    const showFormUploadFile = (stt: number) => {
        setfileUpload([]);
        setShowUploadRowIndex(stt);
        if (dataReceiptImei.length > 0) {
            var dataHangHoang = dataReceiptImei[stt];
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
                    UpdateAlreceiptType_Image_receiptVmNL('', 'image' + (i <= 1 ? '' : (i - 1)), showUploadRowIndex);
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
                UpdateAlreceiptType_Image_receiptVmNL(filePath, 'image', showUploadRowIndex);
            }
            else if (dataHangHoang.image2 === "" || dataHangHoang.image2 === null) {
                _fileUpload[1].url = mediaController.GetFile(filePath);
                UpdateAlreceiptType_Image_receiptVmNL(filePath, 'image2', showUploadRowIndex);
            }
            else if (dataHangHoang.image3 == "" || dataHangHoang.image3 === null) {
                _fileUpload[2].url = mediaController.GetFile(filePath);
                UpdateAlreceiptType_Image_receiptVmNL(filePath, 'image3', showUploadRowIndex);
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
            dataProps: { materialType: 'C', listSteelDefectDetails: listSteelDefectDetails, description: description, indexRow: indexRow, callBackChoose: callBackChooseLoi }
        });
    }

    const callBackChooseLoi = (listSteelDefectDetails: steelDefectDetail[], description: string, indexRow: number) => {
        console.log("indexRow",indexRow);
        if (indexRow > -1) {
            var datas = [...dataReceiptImei];
            datas[indexRow].listSteelDefectDetails = listSteelDefectDetails;
            datas[indexRow].description = description;
            setdataReceiptImei([]);
            setTimeout(() => {
                setdataReceiptImei(datas);
                rf_datagrid_isImei_receiptVm.current.cancelEdit();
            }, 300);
        } else {
            var datas = [...dataReceiptImei];
            datas.forEach(item => {
                item.listSteelDefectDetails = listSteelDefectDetails;
                item.description = description;
            });
            setdataReceiptImei([]);
            setTimeout(() => {
                setdataReceiptImei(datas);
                rf_datagrid_isImei_receiptVm.current.cancelEdit();
            }, 300);
        }
    }

    const EditLoi = (e: any) => {

        if (optionNXNL.receiptID <= 0) {
            message.error('Vui lòng chọn thông tin cuộn để sửa lỗi');
            return false;
        }
        setOptionNXNL(prevState => ({ ...prevState, isEditing: true }));

    }

    const CancelUpdateLoi = (e: any) => {
        setOptionNXNL(prevState => ({ ...prevState, isEditing: false }));
    }

    const onUpdateLoi = async (e: any) => {
        setOptionNXNL({ ...optionNXNL, isSubmit: true });
        var data = await receiptService.UpdateSteelDefect(dataReceiptVm, dataReceiptDetail, dataReceiptImei);
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionNXNL({ ...optionNXNL, isSubmit: false });
        }
        else {
            // update trang thai cap nhat loi
            const data = {
                receiptID: dataReceiptVm.receiptID,
                workProcessID: workProcessID,
                imei: dataReceiptImei.map(p => p.imei)
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
            setOptionNXNL({ ...optionNXNL, isSubmit: false });
            message.success("Cập nhật lỗi thành công");
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
                                        allowClear={false}
                                    />
                                </div>
                                <div className="fl-lef w-50">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        disabled={false}
                                        value={dayjs(modelRequest.todate)}
                                        format={dateFormat}
                                        onChange={onChangeSearchToDate}
                                        allowClear={false}

                                    />
                                </div>
                            </div>
                            <div className="fl-lef w-10 text-center">
                                <Button disabled={false} type="primary" icon={<SearchOutlined/>} onClick={e => SeachNXNL(e)}></Button>
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
                                    onChange={onchangecounterpartyIDSearch}
                                    filterOption={handleFiltercounterpartyIDSearch}
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
                                    size="small"
                                    className="input-text-upercase"
                                    placeholder="Số ct"
                                    disabled={false}
                                    value={modelRequest.receiptNo} onChange={onchangereceiptNoSearch} />
                            </div>
                            <div className="clearfix h-5"></div>
                            <DataGrid
                                disabled={false}
                                data={dataLstNXNL.lstNXNL}
                                style={{ height: (window.innerHeight - 190) }}
                                onSelectionChange={onSelectReceipt}
                                selection={dataSelectReceipt.receiptVm}
                                selectionMode="single">
                                <GridColumn title="Số CT" field="receiptNo" width="15%" />
                                <GridColumn title="Tên NCC" field="counterpartyName" width="50%" />
                                <GridColumn title="Số lượng" field="quantity" width="15%" align="center"
                                    // header={() => <span>Số lượng</span>}
                                    // render={({ row }: any) => (
                                    //     <NumericFormat readOnly 
                                    //     type='text'
                                    //     className="ant-input-number-input text-center" thousandSeparator={true} value={row.quantity} />
                                    // )}
                                />
                            </DataGrid>
                        </div>
                        <div className="pannel-left-footer">
                            {/* <div className="inline-bolck w-50" style={{ textAlign: 'left' }}>
                                <div className="inline-bolck" style={{ marginRight: 5 }}><Icon type="user" style={{ fontSize: 18 }} /></div>
                                <div className="inline-bolck" style={{ marginRight: 5 }}>
                                    {isemployeeID ?
                                        <Checkbox disabled={false} onChange={handleChangeCheckBoxSearchemployeeID}></Checkbox>
                                        :
                                        <div></div>
                                    }
                                </div>
                                <div className="inline-bolck">
                                    <CBUseremployeeID value={modelUserRequest} isEditing={false} OnChangeCBQuanTri={OnChangeCBemployeeID} />
                                </div>
                            </div> */}
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
                                            value={dataLstNXNL.tongcong} />
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
                                            value={dataReceiptVm.steelPrice}
                                            getInputRef={rf_giamua}
                                            name="steelPrice"
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
                            {/* end */}
                            <section className="code-box-meta markdown">
                                <div className="code-box-title">Chi tiết nguyên liệu</div>
                                <div className="code-box-description">
                                    <div className="tool-bar-cthh" style={{ marginBottom: 2 }}>
                                        <div className='inline-bolck w-100 mr-1 text-right'>
                                            <Button size="small" disabled={!optionNXNL.isEditing} type="primary" icon={<WarningOutlined/>}
                                                onClick={e => showEditLoiCuon(e, [], '', -1)}
                                            >
                                                Ghi chú lỗi
                                            </Button>
                                        </div>

                                    </div>
                                    <div className="hanghoaInputNXNL">
                                        <DataGrid
                                            ref={rf_datagrid_isImei_receiptVm}
                                            disabled={true}
                                            data={dataReceiptImei}
                                            style={{ height: (window.innerHeight - 385) }}
                                            selectionMode={!optionNXNL.isEditing ? null : "single"}
                                            selection={dataSelectChiTietHangHoaNXNL}
                                            clickToEdit
                                            editMode="cell"
                                            showFooter
                                            footerData={getFooterData(dataReceiptImei)}
                                        >
                                            <GridColumn title="STT" key="sortOrder" field="sortOrder" width="5%" />
                                            <GridColumn title="imei" key="imei" field="imei" width="25%" align="left" />
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
                                                    <span>{row.weight2}</span>
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
                                                        {
                                                            row.description
                                                        }
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
                                                        <Button size="small" shape="circle" icon={<FileImageOutlined/>}onClick={(e: any) => showFormUploadFile(row.sortOrder - 1)} />
                                                    </div>
                                                )}
                                            />
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
                        <div className="pannel-right-footer" style={{ padding:30}}>
                            {optionNXNL.isEditing ?
                                <div className="inline-bolck">
                                    <Button className="button" loading={optionNXNL.isSubmit} type="primary" icon={<SaveOutlined/>} size="small"
                                        onClick={e => onUpdateLoi(e)}
                                    >Lưu</Button>
                                    <Button className="button" disabled={optionNXNL.isSubmit} type="primary" icon={<CloseOutlined/>} size="small"
                                        onClick={e => CancelUpdateLoi(e)}
                                        danger
                                    >Hủy</Button>
                                </div>
                                :
                                <div className="inline-bolck">
                                    {/* {iskiemsoatnoibo == false ?
                                        <Fragment>
                                            <Button className="button" type="primary" icon="edit" size="small"
                                                onClick={e => EditLoi(e)}>Sửa Lỗi</Button>
                                        </Fragment>
                                        :
                                        <div></div>
                                    } */}
                                    <Fragment>
                                            <Button className="button" type="primary" icon={<EditOutlined/>} size="small"
                                                onClick={e => EditLoi(e)}>Sửa Lỗi</Button>
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
export default UpdateSteelDefect;