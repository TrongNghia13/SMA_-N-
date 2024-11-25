import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Button, Spin, Input, Tabs, message, Modal, Checkbox, Form, DatePicker } from 'antd';
import { GridColumn, DataGrid, NumberBox } from 'rc-easyui';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import CommonUtil from '../../../../utils/commonUtil';
import ReactToPrint from 'react-to-print';
import dayjs from 'dayjs';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, SearchOutlined, VerticalAlignBottomOutlined, WarningOutlined, PrinterOutlined, FileImageOutlined } from '@ant-design/icons';

import LoginUtils from '../../../../utils/loginUtils';
import cateBranch from '../../../../models/cateBranch';
import createPlanRollVm, { createPlanCutRollVm, createPlanRollVmPrintVm } from '../../../../models/productions/createPlanRollVm';
import receiptImei from '../../../../models/receiptImei';
import planManufacturing from '../../../../models/planManufacturing';
import planDetailInput from '../../../../models/planDetailInput';
import planDetailOutput from '../../../../models/planDetailOutput';
import { LAPKEHOACH_MANAGE_Vm } from "../../../../models/productions/createPlanRollVm";
import steelDefectDetail from '../../../../models/steelDefectDetail';
import errorModalProps from '../../components/errorModal/index';
import CateBranchService from '../../../../services/cateBranchService';
import CreatePlanTapeService from '../../../../services/createPlanTapeService';
import ReceiptService from '../../../../services/receiptService';
import { APIStatus } from '../../../../configs/APIConfig';
import CreatePlanPrint from './createPlanPrint';
import moment, { Moment } from "moment";
import { ShowModal } from '../../../../components/common/index';

const dateFormat = 'DD/MM/YYYY';

const { confirm } = Modal;
const { TabPane } = Tabs;
const CreatePlanRollToTape: React.FC = () => {

    const eleEmty: React.ReactInstance = new EmptyComponent({});

    const gridLapKeHoachInputNummer = useRef(null);
    const refLapKeHoachPrint = useRef<any>(eleEmty);

    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.username;
    const branchId = userLoginInfo.BranchId;

    const cateBranchService = new CateBranchService();
    const lapKeHoachSXController = new CreatePlanTapeService();
    const receiptService = new ReceiptService();
    const [loadingPage, setLoadingPage] = useState(true);

    const [cateMonthInfo, setCateMonthInfo] = useState(false);
    const [tabActiveCTKHSX, settabActiveCTKHSX] = useState('tab_ctplanManufacturingVm');
    const [tabActiveKHSX, settabActiveKHSX] = useState('tab_danhsachplanManufacturingVm');
    const [fillterIsKetReal, setFillterIsKetReal] = useState(1);

    const [optionLKHSX, setOptionLKHSX] = useState((() => {
        let dataInit = { planManufacturingID: 0, isEditing: false };
        return dataInit;
    }));

    const [donviUDUserLogin, setDonviUDUserLogin] = useState((() => {
        let dataInit: cateBranch = {} as any;
        return dataInit;
    }));

    const [createPlanRollVmModel, setcreatePlanRollVmModel] = useState([] as Array<createPlanRollVm>);
    const [createPlanRollVmPrintVmModel, setcreatePlanRollVmPrintVmModel] = useState([] as Array<createPlanRollVmPrintVm>);

    const [receiptImeiModel, setreceiptImeiModel] = useState([] as Array<receiptImei>);
    const [planManufacturingModel, setplanManufacturingModel] = useState([] as Array<planManufacturing>);
    const [planDetailInputModel, setplanDetailInputModel] = useState([] as Array<planDetailInput>);
    const [planDetailOutputModel, setplanDetailOutputModel] = useState([] as Array<planDetailOutput>);

    const [selectreceiptImeiModel, setSelectreceiptImeiModel] = useState({} as receiptImei);
    const [selectcreatePlanRollVm, setSelectcreatePlanRollVm] = useState({} as createPlanRollVm);
    const [selectplanManufacturingModel, setSelectplanManufacturingModel] = useState({} as planManufacturing);
    const [selectplanDetailInputModel, setSelectplanDetailInputModel] = useState({} as planDetailInput);

    const [clickToEdittLKH, setClickToEdittLKH] = useState(false);
    const [numberLKHChititet, setNumberLKHChititet] = useState(Array<number>());
    const [currentSLInput, setCurrentSLInput] = useState(0);
    const [lapKeHoachBangChiTietModel, setLapKeHoachBangChiTietModel] = useState(
        []
    );
    const [imeiDetailSelectXeModel, setDetailImeiSelectXeModel] = useState(Array<planDetailOutput>());
    const [
        currentLapKeHoachBangChiTietModel,
        setCurentLapKeHoachBangChiTietModel,
    ] = useState({} as any);

    const [LAPKEHOACH_MANAGE_Vm_MODEL, setLAPKEHOACH_MANAGE_Vm_MODEL] = useState({
        planManufacturingVm: {
            planManufacturingID: 0,
            planNo: "",
            planDate: new Date(),
            branchID: branchId,
            materialType: "C",
            productionPlanID: '',
            planDescription: "",
            totalSource: 0,
            totalTarget: 0,
            listPlanDetailInputs: [],
            createdBy: userName
        },
    } as LAPKEHOACH_MANAGE_Vm);

    let setAll = (obj: any, val: any) => Object.keys(obj).forEach((k) => (obj[k] = val));

    useEffect(() => {

        async function getData() {
            await CheckMonthIsOpen(new Date());
            await GetBrandUserLogin();
            await loadkeHoachCuon(fillterIsKetReal);
            setLoadingPage(false);
        }

        getData();

    }, []);

    const CheckMonthIsOpen = async (planDate: Date) => {
        var getDdata = await receiptService.CheckMonthIsOpen(dayjs(planDate).format("YYYYMM"));
        setCateMonthInfo(getDdata.data);
    }

    const GetSoCT = async (ngay: Date) => {
        var ngatct = moment(ngay, "YYYY/MM/DD");
        var month = ngatct.format("YYYYMM");
        var data = await lapKeHoachSXController.GetPlanNo(branchId, "C", month);
        setLAPKEHOACH_MANAGE_Vm_MODEL({
            ...LAPKEHOACH_MANAGE_Vm_MODEL,
            planManufacturingVm: {
                ...LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm,
                planManufacturingID: 0,
                planDate: ngay,
                planNo: data.data,
                productionPlanID: selectcreatePlanRollVm.productionPlanID
            },
        });
    };

    const GetBrandUserLogin = async () => {
        var getDdata = await cateBranchService.GetByID(branchId);
        setDonviUDUserLogin(getDdata.data);
    }

    const resetData = async (isKetReal: number = 0) => {
        setLoadingPage(true);
        await loadkeHoachCuon(isKetReal);
        setLoadingPage(false);
    }

    const resetDataDelete = async (isKetReal: number = 0) => {
        setLoadingPage(true);
        await loadkeHoachCuon(isKetReal);
        setLoadingPage(false);
    }

    const loadkeHoachCuon = async (isKetReal: number, defaultLKHId?: number) => {
        const data = await lapKeHoachSXController.GET_PLAN_ROLL(isKetReal, branchId);
        setcreatePlanRollVmModel(data.data);
        if (selectcreatePlanRollVm && selectcreatePlanRollVm.productionPlanID && selectcreatePlanRollVm.productionPlanID !== null && selectcreatePlanRollVm.productionPlanID !== '') {
            const ItemDefault = data.data.filter(p => p.productionPlanID === selectcreatePlanRollVm.productionPlanID)[0];
            if (ItemDefault) {
                await onSelectLapKeHoach(ItemDefault, defaultLKHId);
            } else {
                setSelectcreatePlanRollVm({} as createPlanRollVm);
                setSelectreceiptImeiModel({} as receiptImei);
                setplanManufacturingModel([]);
                setreceiptImeiModel([]);
                setplanDetailInputModel([]);
                setplanDetailOutputModel([]);
            }
        } else {
            setSelectreceiptImeiModel({} as receiptImei);
            setplanManufacturingModel([]);
            setreceiptImeiModel([]);
            setplanDetailInputModel([]);
            setplanDetailOutputModel([]);
        }
    }

    const loadLapKeHoachPrint = async (productionPlanID: string) => {
        // const data = await lapKeHoachSXController.SP_BC_CT_KEHOACH_BANG(productionPlanID);
        // let indexCol = 0;
        // if (data.data) {
        //     data.data.forEach(item => {
        //         item.ShowInfo = item.sortOrder === 1;
        //         item.indexCol = item.sortOrder === 1 ? (indexCol++ + 1) : 0;
        //     });
        // }
        // setcreatePlanRollVmPrintVmModel(data.data);
    }

    const loadTonXuatNL = async (productionPlanID: string) => {
        const data = await lapKeHoachSXController.SP_INSTOCK_MATERIAL_GET(encodeURIComponent(productionPlanID));
        setreceiptImeiModel(data.data);
    }

    const loadDaLapKeHoachCuon = async (productionPlanID: string, defaultLKHId?: number) => {

        const data = await lapKeHoachSXController.PLANNING_ROll_GET(encodeURIComponent(productionPlanID));
        setplanManufacturingModel(data.data);
        if (defaultLKHId) {
            const ItemDefault = data.data.filter(p => p.planManufacturingID === defaultLKHId)[0];
            await onSelectKeHoachSX(ItemDefault);
        }
        else {
            if (data.data && data.data.length > 0) {
                await onSelectKeHoachSX(data.data[0]);
            }
            else {
                setSelectplanManufacturingModel({} as planManufacturing);
                setLAPKEHOACH_MANAGE_Vm_MODEL({
                    ...LAPKEHOACH_MANAGE_Vm_MODEL,
                    planManufacturingVm: {
                        ...LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm,
                        planDate: new Date(),
                        planNo: '',
                        planDescription: ''
                    },
                });
                setplanDetailInputModel([]);
                setplanDetailOutputModel([]);
            }
        }
    }

    const loadDataKHCuonVao = async (planManufacturingID: number) => {
        const data = await lapKeHoachSXController.SP_KH_CUON_VAO_GET(planManufacturingID);
        setplanDetailInputModel(data.data);
        setplanDetailOutputModel([]);
        return data.data;
    }

    const loadDataKHCuonRa = async (planManufacturingID: number) => {
        const data = await lapKeHoachSXController.SP_KH_CUON_RA_GET(planManufacturingID);
        setplanDetailOutputModel(data.data);
    }

    const loadDataKHCuonRaByKeHoachh = async (planManufacturingID: number, dataVao: planDetailInput[]) => {
        const dataAllKeHoachRa = await lapKeHoachSXController.SP_KH_CUON_RA_GET_BY_IDKH(planManufacturingID);
        if (dataAllKeHoachRa.data) {
            dataAllKeHoachRa.data.forEach(item => {
                item.sortOrder = dataVao.find(p => p.planDetailInputID === item.planDetailInputID)?.sortOrder;
            });
        }
        setDetailImeiSelectXeModel(dataAllKeHoachRa.data);
    }

    const onSelectLapKeHoach = async (selection: createPlanRollVm, defaultLKHId?: number) => {
        setLoadingPage(true);
        setSelectcreatePlanRollVm(selection);
        await loadTonXuatNL(selection.productionPlanID);
        await loadDaLapKeHoachCuon(selection.productionPlanID, defaultLKHId);
        await loadLapKeHoachPrint(selection.productionPlanID);
        setSelectreceiptImeiModel({} as receiptImei);
        setLoadingPage(false);
    }

    const onSelectKeHoachSX = async (selection: planManufacturing) => {
        setLoadingPage(true);
        setSelectplanManufacturingModel(selection);
        const dataKHRa = await loadDataKHCuonVao(selection.planManufacturingID);
        await loadDataKHCuonRaByKeHoachh(selection.planManufacturingID, dataKHRa);
        setLAPKEHOACH_MANAGE_Vm_MODEL({
            ...LAPKEHOACH_MANAGE_Vm_MODEL,
            planManufacturingVm: {
                ...LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm,
                planManufacturingID: selection.planManufacturingID,
                planDate: new Date(selection.planDate),
                planNo: selection.planNo,
                planDescription: selection.planDescription
            },
        });
        setLoadingPage(false);
    }

    const onSelectCTKHVao = async (selection?: planDetailInput) => {
        console.log(selection);
        if (!optionLKHSX.isEditing && selection != null) {
            setLoadingPage(true);
            setSelectplanDetailInputModel(selection);
            await loadDataKHCuonRa(selection.planDetailInputID);
            setLoadingPage(false);
        } else {
            await onSelectImeiSelectXeModel(selection);
        }
    }

    const onChangeKHSX = (activeKey: string) => {
        settabActiveKHSX(activeKey);
    }

    const onChangeCTKHSX = (activeKey: string) => {
        settabActiveCTKHSX(activeKey);
    }

    const deleteLKHBang = (e: any) => {
        if (selectplanManufacturingModel && selectplanManufacturingModel.planManufacturingID && selectplanManufacturingModel.planManufacturingID > 0) {
            e.preventDefault();
            confirm({
                title: 'Xác nhận',
                content: 'Bạn có chắc muốn xóa lập kế hoạch: ' + selectplanManufacturingModel.productionPlanID + '?',
                onOk() {
                    onDeleteLKHBang(e);
                },
                onCancel() { },
            });
        }
        else {
            message.error('Vui lòng chọn kế hoạch sản xuất để xóa!')
        }
    }

    const onDeleteLKHBang = async (e: any) => {
        setLoadingPage(true);
        var reDelete = await lapKeHoachSXController.SP_planManufacturing_DEL(selectplanManufacturingModel.planManufacturingID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
            setLoadingPage(false);
        }
        else {
            resetDataDelete(fillterIsKetReal);
        }
    }

    const OnSetFillterIsKetReal = (e: any) => {
        const isKetReal = e.target.checked ? 1 : 0;
        setFillterIsKetReal(isKetReal);
        resetData(isKetReal);
    }

    const handleKeyDownSoluongLKH = (event: any) => {
        if (event.keyCode === 13) {
            if (gridLapKeHoachInputNummer.current) {
                // gridLapKeHoachInputNummer.current.endEdit();
                let rowIndex = parseInt(
                    event.currentTarget.getAttribute("data-rowindex")
                );
                let quantity = parseInt(event.target.value);
                if (quantity <= 1) {
                    message.error('Vui lòng nhập số bằng lớn hơn 1')
                    return false;
                }
                var cloneImeis = [...receiptImeiModel];
                cloneImeis.forEach((item) => {
                    item.quantity = item.sortOrder === rowIndex ? quantity : item.quantity;
                });
                setreceiptImeiModel(cloneImeis);
                setCurrentSLInput(quantity);
                onEditEndInputLKH(rowIndex, quantity);
                setClickToEdittLKH(false);
            }
        }
    };

    const onEditEndInputLKH = (Rowindex: any, quantity: number) => {
        const _lapKeHoachBangChiTietModel = [...lapKeHoachBangChiTietModel];
        // const findRowByIndex = _lapKeHoachBangChiTietModel.findIndex(
        //     (item) => item.sortOrder === Rowindex
        // );
        const row = receiptImeiModel.filter((p) => p.sortOrder === Rowindex)[0];
        const rowEdit = row as any;
        rowEdit.quantity = quantity;
        rowEdit["bient"] = 2;
        rowEdit["bienp"] = 2;
        rowEdit["widthReal"] = rowEdit.width;
        const khluongOnBang = Math.floor((parseInt(rowEdit.width) - 4) / quantity);
        let _totalTemp = 0;
        let arraySL = [];
        for (var i = 1; i <= quantity; i++) {
            rowEdit[`bang${i}`] = khluongOnBang;
            _totalTemp += khluongOnBang;
            arraySL.push(i);
        }
        if (_totalTemp + 4 != parseInt(rowEdit.width)) {
            rowEdit[`bang${1}`] =
                parseInt(rowEdit[`bang${quantity}`]) +
                (parseInt(rowEdit.width) - (_totalTemp + 4));
        }
        setNumberLKHChititet(arraySL);
        // if (findRowByIndex < 0) {
        //     _lapKeHoachBangChiTietModel.push(rowEdit);
        // } else {
        //     _lapKeHoachBangChiTietModel[findRowByIndex] = rowEdit;
        // }
        // setLapKeHoachBangChiTietModel(_lapKeHoachBangChiTietModel);
        setCurentLapKeHoachBangChiTietModel(rowEdit);
    };

    const onChangeBienT = (value: any) => {
        var chititetXeBang = { ...currentLapKeHoachBangChiTietModel };
        const floatValue = Math.round(parseFloat(value.floatValue || 0) * 10) / 10;
        const widthReal =
            Math.round((parseInt(chititetXeBang.widthReal) -
                parseInt(chititetXeBang.bient) +
                floatValue) * 10) / 10;
        setCurentLapKeHoachBangChiTietModel({
            ...currentLapKeHoachBangChiTietModel,
            widthReal: widthReal + "",
            bient: floatValue + "",
        });
    };

    const onChangeBienP = (value: any) => {
        var chititetXeBang = { ...currentLapKeHoachBangChiTietModel };
        const floatValue = Math.round(parseFloat(value.floatValue || 0) * 10) / 10;
        const widthReal = Math.round((parseFloat(chititetXeBang.widthReal || "0") -
            parseFloat(chititetXeBang.bienp || "0") +
            floatValue) * 10) / 10;
        setCurentLapKeHoachBangChiTietModel({
            ...currentLapKeHoachBangChiTietModel,
            widthReal: widthReal + "",
            bienp: floatValue + "",
        });
    };

    const onChangeBienBangItem = (item: number, value: any) => {
        var chititetXeBang = { ...currentLapKeHoachBangChiTietModel };
        const floatValue = Math.round(parseFloat(value.floatValue || 0) * 10) / 10;
        const widthReal =
            Math.round((parseFloat(chititetXeBang.widthReal || "0") -
                parseFloat(chititetXeBang[`bang${item}`] || "0") +
                floatValue) * 10) / 10;
        setCurentLapKeHoachBangChiTietModel({
            ...currentLapKeHoachBangChiTietModel,
            widthReal: widthReal + "",
            [`bang${item}`]: floatValue + "",
        });
    };

    const AddXeBangChiitiet = () => {
        if (currentSLInput == 0) {
            message.error(`Vui lòng nhập số lượng để lập kế hoạch xẻ băng`);
            return false;
        }
        var chititetXeBang = { ...currentLapKeHoachBangChiTietModel };
        let totalwidth =
            parseFloat(chititetXeBang.bient) + parseFloat(chititetXeBang.bienp);
        for (let index = 1; index <= currentSLInput; index++) {
            if (
                chititetXeBang[`bang${index}`] === "" ||
                parseFloat(chititetXeBang[`bang${index}`]) == 0
            ) {
                message.error(`Băng ${index} phải lớn hơn 0`);
                return false;
            }
            totalwidth += parseFloat(chititetXeBang[`bang${index}`]);
        }
        console.log(chititetXeBang, totalwidth);
        if (totalwidth !== parseFloat(chititetXeBang.width)) {
            message.error(
                `Khổ thực không thể bé hơn hoặc lớn hơn ${parseFloat(
                    chititetXeBang.widthReal
                )} `
            );
            return false;
        }
        chititetXeBang.slxebang = currentSLInput;
        chititetXeBang.planDetailOutputID = chititetXeBang.planDetailOutputID ?? chititetXeBang.receiptImeiID;

        const _imeiModel = [...receiptImeiModel];
        const _imeiXeModel = [...planDetailInputModel];
        let _imeiDetailSelectXeModel = [...imeiDetailSelectXeModel];
        const _imeiFilterDetailSelectXeModel = Array<planDetailOutput>();

        let findRowByIndex = _imeiModel.findIndex(
            (item) => item.receiptImeiID === chititetXeBang.receiptImeiID
        );
        if (findRowByIndex > -1) {
            _imeiXeModel.push(chititetXeBang);
            const __imeiModel = _imeiModel.filter(
                (p) => p.receiptImeiID !== chititetXeBang.receiptImeiID
            );
            _imeiModel.forEach(item => item.quantity = 0);
            setreceiptImeiModel(__imeiModel);
        } else {
            findRowByIndex = _imeiXeModel.findIndex(
                (item) => item.receiptImeiID === parseInt(chititetXeBang.receiptImeiID)
            );
            _imeiXeModel[findRowByIndex] = chititetXeBang;
            _imeiDetailSelectXeModel = _imeiDetailSelectXeModel.filter(
                (p: any) => p.receiptImeiID !== chititetXeBang.receiptImeiID
            );
        }

        // set detail
        let totalKg = 0;
        let ListImeiDetail = Array<planDetailOutput>();
        let indexSTT = 98;
        for (let index = 1; index <= currentSLInput + 2; index++) {
            let kg = 0;
            const isBien = index == currentSLInput + 1 || index == currentSLInput + 2;
            const sortOrder = isBien ? indexSTT++ : index;
            if (index == currentSLInput + 1) {
                kg = Math.round(
                    (parseFloat(chititetXeBang[`bient`]) * parseFloat(chititetXeBang.weight2)) /
                    parseFloat(chititetXeBang.widthReal)
                );
            } else if (index == currentSLInput + 2) {
                kg = Math.round(
                    (parseFloat(chititetXeBang[`bienp`]) * parseFloat(chititetXeBang.weight2)) /
                    parseFloat(chititetXeBang.widthReal)
                );
            } else {
                kg = Math.round(
                    (parseFloat(chititetXeBang[`bang${index}`]) *
                        parseFloat(chititetXeBang.weight2)) /
                    parseFloat(chititetXeBang.widthReal)
                );
            }
            var imeiDetail = {
                planDetailInputID: 0,
                planManufacturingID: 0,
                planDetailOutputID: 0,
                planDate: LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planDate,
                planNo: LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planNo,
                productID: isBien ? "PL-CUON" : "BANG",
                quantity: 1,
                vendor: chititetXeBang.vendor,
                steelType: chititetXeBang.steelType,
                width:
                    index == currentSLInput + 1
                        ? chititetXeBang[`bient`].toString()
                        : index == currentSLInput + 2
                            ? chititetXeBang[`bienp`].toString()
                            : chititetXeBang[`bang${index}`].toString(),
                thickness: chititetXeBang.thickness,
                weight: kg,
                imei: chititetXeBang.imei,
                specification: "",
                description: "",
                parentID: chititetXeBang.receiptImeiID,
                sortOrder: sortOrder,
                parentSortOrder: chititetXeBang.sortOrder,
            };
            totalKg += kg;
            ListImeiDetail.push(imeiDetail);
        }

        if (ListImeiDetail.length > 0) {
            let weightLech = 0;
            if (
                totalKg < parseFloat(chititetXeBang.weight2) ||
                totalKg > parseFloat(chititetXeBang.weight2)
            ) {
                weightLech = parseFloat(chititetXeBang.weight2) - totalKg;
            }
            ListImeiDetail.forEach((item: planDetailOutput, index) => {
                item.weight =
                    index == 0
                        ? weightLech !== 0
                            ? item.weight + weightLech
                            : item.weight
                        : item.weight;
                _imeiDetailSelectXeModel.push(item);
                _imeiFilterDetailSelectXeModel.push(item);
            });
        }

        setDetailImeiSelectXeModel(_imeiDetailSelectXeModel);
        setplanDetailOutputModel((pre) => _imeiFilterDetailSelectXeModel);
        setplanDetailInputModel(_imeiXeModel);
        var _chititetXeBang = { ...chititetXeBang };
        setAll(_chititetXeBang, null);
        setCurentLapKeHoachBangChiTietModel({});
        setCurrentSLInput(0);
        setNumberLKHChititet([]);
        setClickToEdittLKH(true);
    };

    const DeleteXeBangChiitiet = async () => {
        var currrenyItem = { ...currentLapKeHoachBangChiTietModel };
        if (currrenyItem.quycach && currrenyItem.quycach !== "") {
            if (currrenyItem.planDetailOutputID && currrenyItem.planDetailOutputID > 0) {
                const isCuonDaSX = await lapKeHoachSXController.SP_KIEMTRA_CUON_DA_SX(currrenyItem.planDetailOutputID);
                if (isCuonDaSX.data === 1) {
                    message.error('Không được xóa, đã sản xuất băng xong.');
                    return false;
                }
            }
            const _imeiXeModel = [...planDetailInputModel];
            const _imeiDetailSelectXeModel = [...imeiDetailSelectXeModel];
            let findRowByIndex = _imeiXeModel.findIndex(
                (item) => item.sortOrder === parseInt(currrenyItem.sortOrder)
            );
            if (findRowByIndex > -1) {
                const _imeiModel = [...receiptImeiModel];
                _imeiModel.push(currrenyItem as any);

                var futherDetalImeiXeModel = _imeiDetailSelectXeModel.filter(
                    (p) => p.sortOrder != currrenyItem.sortOrder
                );
                var futhereImeiXeModel = _imeiXeModel.filter(
                    (p) => p.sortOrder !== currrenyItem.sortOrder
                );

                setreceiptImeiModel(_imeiModel.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1)));

                setDetailImeiSelectXeModel(futherDetalImeiXeModel);
                setplanDetailOutputModel([]);
                setplanDetailInputModel(futhereImeiXeModel);
            }
        }
        setCurentLapKeHoachBangChiTietModel({});
        setCurrentSLInput(0);
        setNumberLKHChititet([]);
        setClickToEdittLKH(true);
    };

    const onSelectImeiSelectXeModel = async (selection: any) => {
        if (selection != null) {
            setCurentLapKeHoachBangChiTietModel(selection);
            const _imeiDetailSelectXeModel = [...imeiDetailSelectXeModel];
            var futherDetalImeiXeModel = _imeiDetailSelectXeModel.filter(
                (p) => p.imei == selection.imei
            );
            setplanDetailOutputModel(futherDetalImeiXeModel);

            selection.slxebang = futherDetalImeiXeModel.length - 2;

            let arraySL = [];
            for (var i = 1; i <= selection.slxebang; i++) {
                arraySL.push(i);
            }

            const rowEdit = selection as any;
            rowEdit.quantity = futherDetalImeiXeModel.length;
            rowEdit["widthReal"] = selection.width;
            futherDetalImeiXeModel.forEach(item => {
                if (item.sortOrder == 98) {
                    rowEdit["bient"] = item.width;
                }
                else if (item.sortOrder == 99) {
                    rowEdit["bienp"] = item.width;
                }
                else {
                    rowEdit[`bang${item.sortOrder}`] = item.width;
                }
            });
            setCurentLapKeHoachBangChiTietModel(rowEdit);
            setNumberLKHChititet(arraySL);
            setCurrentSLInput(selection.slxebang);

        } else {
            setSelectplanDetailInputModel(selection);
        }
    };

    const UpdateAddLKHBang = async () => {
        if (cateMonthInfo == false) {
            message.error('Ngày ' + moment(LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planDate).format(dateFormat) + ' đã khóa sổ');
            return false;
        } else {
            setOptionLKHSX({ ...optionLKHSX, isEditing: true });
            setClickToEdittLKH(true);
            setplanDetailInputModel([]);
            setplanDetailOutputModel([]);
            setDetailImeiSelectXeModel([]);
            await GetSoCT(LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planDate);
        }
    }

    const UpdateLKHBang = async () => {
        if (cateMonthInfo == false) {
            message.error('Ngày ' + moment(LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planDate).format(dateFormat) + ' đã khóa sổ');
            return false;
        }

        if (!selectplanManufacturingModel.productionPlanID || selectplanManufacturingModel.productionPlanID === '') {
            message.error('Vui lòng chọn kế hoạch sản xuất để cập nhật');
            return false;
        }

        await onSelectCTKHVao(undefined); // null
        setOptionLKHSX({ ...optionLKHSX, isEditing: true });
        setClickToEdittLKH(true);
    }

    const onChangeNgayCT = async (date: any, dateString: string) => {
        let _cloneKHSX = { ...LAPKEHOACH_MANAGE_Vm_MODEL };
        _cloneKHSX.planManufacturingVm.planDate = date;
        setLAPKEHOACH_MANAGE_Vm_MODEL(_cloneKHSX);
        await CheckMonthIsOpen(date);
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        let _cloneKHSX = { ...LAPKEHOACH_MANAGE_Vm_MODEL };
        // _cloneKHSX.planManufacturingVm['planDescription'] === value;
        setLAPKEHOACH_MANAGE_Vm_MODEL(_cloneKHSX);
    };

    const SaveLKHBang = async () => {
        setLoadingPage(true);
        if (planDetailInputModel && planDetailInputModel.length > 0) {
            var _LAPKEHOACH_MANAGE_Vm_MODEL = { ...LAPKEHOACH_MANAGE_Vm_MODEL };
            _LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.totalSource = planDetailInputModel.length;
            _LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.totalTarget =
                imeiDetailSelectXeModel.length - planDetailInputModel.length * 2;
            planDetailInputModel.forEach((item) => {
                item.quantity = 1;
                item.listPlanDetailOutputs = imeiDetailSelectXeModel.filter(
                    (p) => p.imei === item.imei
                );
            });
            _LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.listPlanDetailInputs = planDetailInputModel;
            var data = await lapKeHoachSXController.LAP_KEHOACHSX_INS_UPD(
                _LAPKEHOACH_MANAGE_Vm_MODEL
            );
            if (data.status === APIStatus.ERROR) {
                message.error(data.message);
                setLoadingPage(false);
            } else {
                message.success('Lập kế hoạch sản xuất băng thành công');
                settabActiveCTKHSX('tab_ctplanManufacturingVm');
                const loadDataByKetReal = receiptImeiModel.length == 0 ? 0 : 1;
                setFillterIsKetReal(loadDataByKetReal);
                await loadkeHoachCuon(loadDataByKetReal, data.data);
                setLoadingPage(false);
                setOptionLKHSX({ ...optionLKHSX, isEditing: false });
            }
        }
        else {
            setLoadingPage(false);
        }
    }

    const HuyAddLKHBang = async () => {
        setLAPKEHOACH_MANAGE_Vm_MODEL({
            ...LAPKEHOACH_MANAGE_Vm_MODEL,
            planManufacturingVm: {
                ...LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm,
                planManufacturingID: 0,
                planDate: new Date(),
                planNo: '',
                planDescription: ''
            },
        });
        setCurentLapKeHoachBangChiTietModel({});
        setplanDetailInputModel([]);
        setplanDetailOutputModel([]);
        setNumberLKHChititet([]);
        setOptionLKHSX({ ...optionLKHSX, isEditing: false });
        await loadTonXuatNL(selectcreatePlanRollVm.productionPlanID);
        setClickToEdittLKH(false);
    }

    const showEditLoiCuon = (e: any, listSteelDefectDetails?: steelDefectDetail[], description?: string, indexRow?: number) => {
        e.preventDefault();
        ShowModal({
            dvId: 'dgAddUpLoiCuon',
            component: errorModalProps,
            dataProps: { loai: 'C', listSteelDefectDetails: listSteelDefectDetails, description: description, indexRow: indexRow, callBackChoose: callBackChooseLoi }
        });
    }

    const callBackChooseLoi = (listSteelDefectDetails: steelDefectDetail[], description: string, indexRow: number) => {
    }

    return (
        <Fragment>
            <Spin spinning={loadingPage} tip='Dữ liệu đang được xử lý'>
                <Tabs defaultActiveKey={tabActiveKHSX} activeKey={tabActiveKHSX} tabPosition='top' onChange={onChangeKHSX}>
                    <TabPane tab="Danh sách kế hoạch" key="tab_danhsachplanManufacturingVm">
                        <div className="page-pannel">
                            <div className="page-pannel-left page-pannel-left-has-tab page-pannel-left-35">
                                <div className="pannel-left-body-not-header">
                                    <section className="code-box-meta markdown">
                                        <div className="code-box-title"><Checkbox disabled={optionLKHSX.isEditing} checked={fillterIsKetReal === 1} onChange={e => OnSetFillterIsKetReal(e)}></Checkbox> Kế Hoạch Chưa Lập </div>
                                        <div className="code-box-description">
                                            <DataGrid
                                                disabled={optionLKHSX.isEditing}
                                                data={createPlanRollVmModel}
                                                style={{ height: (window.innerHeight - 190) }}
                                                onSelectionChange={(select: createPlanRollVm) => {
                                                    if (optionLKHSX.isEditing) return false;
                                                    else {
                                                        onSelectLapKeHoach(select);
                                                    }
                                                }}
                                                selection={selectcreatePlanRollVm}
                                                selectionMode="single">
                                                <GridColumn title="Kế hoạch" field="productionPlanID" width="40%" />
                                                <GridColumn title="Xuất" field="soxuat" width="15%" align="right"
                                                    header={() => <span>Xuất</span>}
                                                    render={({ row }: any) => (
                                                        // <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.soxuat} />
                                                        row.soxuat
                                                    )}
                                                />
                                                <GridColumn title="Lập KH" field="totalSource" width="15%" align="right"
                                                    header={() => <span>Lập KH</span>}
                                                    render={({ row }: any) => (
                                                        // <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.sokh} />
                                                        row.totalSource
                                                    )}
                                                />
                                                <GridColumn title="SX" field="totalTarget" width="15%" align="right"
                                                    header={() => <span>SX</span>}
                                                    render={({ row }: any) => (
                                                        // <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.sosx} />
                                                        row.totalTarget
                                                    )}
                                                />
                                                <GridColumn title="Còn lại" field="totalExist" width="15%" align="right"
                                                    header={() => <span>Còn lại</span>}
                                                    render={({ row }: any) => (
                                                        // <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.totalExist} />
                                                        row.totalExist
                                                    )}
                                                />
                                            </DataGrid>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="page-pannel-right page-pannel-right-has-tab page-pannel-right-65">
                                <div className="pannel-right-body">
                                    <section className="code-box-meta markdown">
                                        <div className="code-box-title">Lô SX: <span className="text-black">{selectcreatePlanRollVm.planName}</span></div>
                                        <div className="code-box-description">
                                            <DataGrid
                                                data={receiptImeiModel}
                                                style={{ height: ((window.innerHeight - 190)) }}
                                                selection={selectreceiptImeiModel}
                                                onSelectionChange={(select: receiptImei) => {
                                                    if (optionLKHSX.isEditing) return false;
                                                    else {
                                                        setSelectreceiptImeiModel(select);
                                                    }
                                                }}
                                                oncl
                                                selectionMode="single">
                                                <GridColumn title="STT" field="sortOrder" width="5%" />
                                                {/* <GridColumn title="Ngày CT" field="planDate" width="10%"
                                                    header={() => <span>Ngày CT</span>}
                                                    render={({ row }: any) => (
                                                        <span>{CommonUtil.FormatDate("DD/MM/YYYY", row.planDate)}</span>
                                                    )}
                                                /> */}

                                                <GridColumn title="Số CT" field="receiptNo" width="10%"
                                                    header={() => <span>Số CT</span>}
                                                    render={({ row }: any) => (
                                                        row.receiptNo
                                                    )}
                                                />
                                                <GridColumn title="Quy Cách" field="specification" width="25%" />
                                                <GridColumn title="Imei" field="imei" width="15%"
                                                    header={() => <span>Imei</span>}
                                                    render={({ row }: any) => (
                                                        row.imei.split("|")[1]
                                                    )}
                                                />
                                                <GridColumn title="Số kg 1" field="weight1" key="weight1" width="7%" align="right"
                                                    header={() => <span>Số kg 1</span>}
                                                    editable={false}
                                                    render={({ row }: any) => (
                                                        // <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.weight1} />
                                                        row.weight1
                                                    )}
                                                />
                                                <GridColumn title="Số kg 2" field="weight2" key="weight2" width="7%" align="right"
                                                    header={() => <span>Số kg 2</span>}
                                                    editable={false}
                                                    render={({ row }: any) => (
                                                        <div className='bg_weight_2'>
                                                            {/* <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.weight2} />
                                                             */}
                                                            {row.weight2}
                                                        </div>
                                                    )}
                                                />
                                                <GridColumn title="Số kg 3" field="weight3" key="weight3" width="7%" align="right"
                                                    header={() => <span>Số kg 3</span>}
                                                    editable={false}
                                                    render={({ row }: any) => (
                                                        // <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.weight3} />
                                                        row.weight3
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
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Lập kế hoạch" key="tab_danhsach_lapkhsx">
                        <div className="page-pannel">
                            <div className="page-pannel-left page-pannel-left-has-tab page-pannel-left-30">
                                <section className="code-box-meta markdown">
                                    <div className="code-box-title">Kế Hoạch Sản Xuất</div>
                                    <div className="code-box-description">
                                        <DataGrid
                                            data={planManufacturingModel}
                                            style={{ height: ((window.innerHeight - 220)) }}
                                            onSelectionChange={(select: planManufacturing) => {
                                                if (optionLKHSX.isEditing) return false;
                                                else {
                                                    onSelectKeHoachSX(select);
                                                }
                                            }}
                                            selection={selectplanManufacturingModel}
                                            selectionMode="single">
                                            <GridColumn title="Ngày CT" field="planDate" width="20%"
                                                header={() => <span>Ngày CT</span>}
                                                render={({ row }: any) => (
                                                    <span>{CommonUtil.FormatDate("DD/MM/YYYY", row.planDate)}</span>
                                                )}
                                            />
                                            <GridColumn title="Số CT" field="planNo" width="30%" />
                                            <GridColumn title="Số cuộn" field="totalSource" width="30%" align="right"
                                                header={() => <span>Số cuộn</span>}
                                                render={({ row }: any) => (
                                                    row.totalSource
                                                )}
                                            />
                                            <GridColumn title="Số băng" field="totalTarget" width="30%" align="right"
                                                header={() => <span>Số băng</span>}
                                                render={({ row }: any) => (
                                                    row.totalTarget
                                                )}
                                            />
                                        </DataGrid>
                                        <div className="clearfix h-10"></div>
                                        <div className="text-center">
                                            <div className="">

                                                <Fragment>
                                                    {
                                                        optionLKHSX.isEditing ? <>

                                                            <Button className="button mr-5" type="primary" icon={<SaveOutlined />} size="small"
                                                                onClick={e => SaveLKHBang()}>Save</Button>
                                                            <Button className="button mr-5" type="primary" icon={<CloseOutlined />} size="small"
                                                                onClick={e => HuyAddLKHBang()} danger>Hủy</Button>

                                                        </> : <><Button disabled={(selectcreatePlanRollVm.productionPlanID === '' || selectcreatePlanRollVm.productionPlanID === null || selectcreatePlanRollVm.productionPlanID === undefined) || (selectcreatePlanRollVm.totalExist === null || selectcreatePlanRollVm.totalExist == undefined || selectcreatePlanRollVm.totalExist <= 0)} className="button mr-5" type="primary" icon={<PlusOutlined />} size="small"
                                                            onClick={e => UpdateAddLKHBang()}>Thêm</Button>

                                                            <Button className="button mr-5" type="primary" icon={<EditOutlined />} size="small"
                                                                onClick={e => UpdateLKHBang()}>Sửa</Button>
                                                            <Button disabled={selectplanManufacturingModel.productionPlanID === '' || selectplanManufacturingModel.productionPlanID === null || selectplanManufacturingModel.productionPlanID === undefined} className="button mr-5" type="primary" icon={<CloseOutlined />} size="small"
                                                                onClick={e => deleteLKHBang(e)} danger>Xóa</Button>
                                                            {selectcreatePlanRollVm.productionPlanID !== '' && selectcreatePlanRollVm.productionPlanID !== null || selectcreatePlanRollVm.productionPlanID !== undefined ?
                                                                <React.Fragment>
                                                                    <ReactToPrint
                                                                        trigger={() => <Button className="button mr-5" type="primary" icon={<PrinterOutlined />} size="small">In</Button>}
                                                                        content={() => refLapKeHoachPrint.current ? refLapKeHoachPrint.current : eleEmty}
                                                                        pageStyle="@page { size: 29.7cm 21cm; } @media print { body { -webkit-print-color-adjust: exact; } }"
                                                                    />
                                                                </React.Fragment>

                                                                :
                                                                null
                                                            }
                                                        </>
                                                    }

                                                </Fragment>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="page-pannel-right page-pannel-right-has-tab page-pannel-right-70">

                                <section className="code-box-meta markdown">
                                    <div className="code-box-title">Chi Tiết Kế Hoạch Sản Xuất</div>
                                    <div className="code-box-description">
                                        <div>
                                            <div className="clearfix h-3"></div>
                                            <div className="fl-lef w-30">
                                                <div className="lable-cotrol inline-bolck mr-right-5">
                                                    Số CT
                                                </div>
                                                <div className="inline-bolck mr-right-5 input-control">
                                                    <Input size="small" disabled={true} readOnly name="receiptNo" value={LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planNo} />
                                                </div>
                                            </div>
                                            <div className="fl-lef w-40">
                                                <div className="lable-cotrol inline-bolck mr-right-5">
                                                    Nội dung
                                                </div>
                                                <div className="inline-bolck mr-right-5 input-control">
                                                    <Input size="small" onChange={handleChangeInput} disabled={!optionLKHSX.isEditing} name="planDescription" value={LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planDescription} />
                                                </div>
                                            </div>
                                            <div className="fl-lef w-30">
                                                <div className="lable-cotrol inline-bolck mr-right-5">
                                                    Ngày CT
                                                </div>
                                                <div className="inline-bolck mr-right-5 input-control">
                                                    <DatePicker size="small" disabled={optionLKHSX.isEditing} onChange={onChangeNgayCT} value={dayjs(LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planDate)} defaultValue={dayjs(LAPKEHOACH_MANAGE_Vm_MODEL.planManufacturingVm.planDate)} format={dateFormat} allowClear={false} />
                                                </div>
                                            </div>
                                            <div className="clearfix h-3"></div>
                                        </div>
                                        <Form>
                                            <div>
                                                <div className="clearfix h-3"></div>
                                                <div>
                                                    <DataGrid
                                                        ref={gridLapKeHoachInputNummer}
                                                        data={receiptImeiModel}
                                                        style={{ height: 170 }}
                                                        clickToEdit={clickToEdittLKH}
                                                        editMode="row"
                                                        selectionMode="single"
                                                    >
                                                        <GridColumn title="STT" field="sortOrder" width="5%" />
                                                        <GridColumn
                                                            title="Ngày CT"
                                                            field="planDate"
                                                            width="10%"
                                                            header={() => <span>Ngày CT</span>}
                                                            render={({ row }: any) => (
                                                                <span>
                                                                    {CommonUtil.FormatDate("DD/MM/YYYY", row.planDate)}
                                                                </span>
                                                            )}
                                                        />
                                                        <GridColumn title="Số CT" field="receiptNo" width="8%" />
                                                        <GridColumn title="Quy cách" field="imei" width="25%"
                                                            header={() => <span>Imei</span>}
                                                            render={({ row }: any) => (
                                                                row.imei.split("|")[1]
                                                            )}
                                                        />
                                                        <GridColumn title="Số kg 1" field="weight1" key="weight1" width="7%" align="right"
                                                            header={() => <span>Số kg 1</span>}
                                                            editable={false}
                                                            render={({ row }: any) => (
                                                                row.weight1
                                                            )}
                                                        />
                                                        <GridColumn title="Số kg 2" field="weight2" key="weight2" width="7%" align="right"
                                                            header={() => <span>Số kg 2</span>}
                                                            editable={false}
                                                            render={({ row }: any) => (
                                                                <div className='bg_weight_2'>
                                                                    {row.weight2}
                                                                </div>
                                                            )}
                                                        />
                                                        <GridColumn title="Số kg 3" field="weight3" key="weight3" width="7%" align="right"
                                                            header={() => <span>Số kg 3</span>}
                                                            editable={false}
                                                            render={({ row }: any) => (
                                                                row.weight3
                                                            )}
                                                        />
                                                        <GridColumn title="Ghi chú" key="description" field="description" width="15%" align="left"
                                                            render={({ row }: any) => (
                                                                <>
                                                                    {row.description}
                                                                </>
                                                            )}
                                                        />
                                                        <GridColumn title="Lỗi" key="listSteelDefectDetails" field="listSteelDefectDetails" width="15%" align="left"
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
                                                        <GridColumn
                                                            field="quantity"
                                                            title="Số băng"
                                                            align="center"
                                                            width="10%"
                                                            editable
                                                            render={({ row }: any) => (
                                                                <div className='bg_sl'>
                                                                    <NumericFormat readOnly className="ant-input-number-input input-text-right-grid w-100" thousandSeparator={true} value={row.quantity} />
                                                                </div>
                                                            )}
                                                            editor={({ row }: any) => (
                                                                <>
                                                                    <div style={{ padding: "2px 5px" }}>
                                                                        <div
                                                                            className="fl-lef w-100"
                                                                            data-rowindex={row.sortOrder}
                                                                            onKeyDown={(event) => handleKeyDownSoluongLKH(event)}
                                                                        >
                                                                            <NumberBox value={row.quantity}></NumberBox>
                                                                        </div>
                                                                        <div className="clearfix" style={{ height: 0 }}></div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        />
                                                    </DataGrid>
                                                </div>
                                            </div>
                                            <div className="clearfix h-10"></div>
                                            <div>
                                                <div className="fl-lef w-10">
                                                    <div style={{ textAlign: "left" }}>
                                                        <Button
                                                            disabled={!optionLKHSX.isEditing}
                                                            size="small"
                                                            type="primary"
                                                            icon={<CloseOutlined />}
                                                            onClick={(e) => DeleteXeBangChiitiet()
                                                            }
                                                            danger />
                                                    </div>
                                                </div>
                                                <div className="fl-lef w-80">
                                                    <table className="roundedcorners">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: 75 }}>Tổng KG</th>
                                                                <th style={{ width: 75 }}>Khổ gốc</th>
                                                                <th style={{ width: 75 }}>Khổ thực</th>
                                                                <th style={{ width: 75 }}>Biên T</th>
                                                                {numberLKHChititet.map((item) => {
                                                                    return <th style={{ width: 75 }}>{`Băng ${item}`}</th>;
                                                                })}
                                                                <th style={{ width: 75 }}>Biên P</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{currentLapKeHoachBangChiTietModel.weight2}</td>
                                                                <td>{currentLapKeHoachBangChiTietModel.width}</td>
                                                                <td>{currentLapKeHoachBangChiTietModel.widthReal}</td>
                                                                <td>
                                                                    <div className={"ant-input-number-sm ant-input-number"}>
                                                                        <NumericFormat
                                                                            disabled={!optionLKHSX.isEditing}
                                                                            className="ant-input-number-input input-text-right"
                                                                            thousandSeparator={true}
                                                                            value={currentLapKeHoachBangChiTietModel.bient}
                                                                            name="bient"
                                                                            onValueChange={onChangeBienT}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                {numberLKHChititet.map((item) => {
                                                                    return (
                                                                        <td>
                                                                            <div
                                                                                className={"ant-input-number-sm ant-input-number"}
                                                                            >
                                                                                <NumericFormat
                                                                                    disabled={!optionLKHSX.isEditing}
                                                                                    className="ant-input-number-input input-text-right"
                                                                                    thousandSeparator={true}
                                                                                    min={0}
                                                                                    value={
                                                                                        currentLapKeHoachBangChiTietModel[`bang${item}`]
                                                                                    }
                                                                                    name={`bang${item}`}
                                                                                    onValueChange={(value) =>
                                                                                        onChangeBienBangItem(item, value)
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                    );
                                                                })}
                                                                <td>
                                                                    <div className={"ant-input-number-sm ant-input-number"}>
                                                                        <NumericFormat
                                                                            disabled={!optionLKHSX.isEditing}
                                                                            className="ant-input-number-input input-text-right"
                                                                            thousandSeparator={true}
                                                                            value={currentLapKeHoachBangChiTietModel.bienp}
                                                                            name="bienp"
                                                                            onValueChange={onChangeBienP}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="fl-lef w-10">
                                                    <div style={{ textAlign: "right" }}>
                                                        <Button
                                                            disabled={!optionLKHSX.isEditing}
                                                            size="small"
                                                            type="primary"
                                                            icon={<PlusOutlined />}
                                                            onClick={(e) => AddXeBangChiitiet()}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="clearfix h-10"></div>
                                            </div>
                                        </Form>
                                        <Tabs defaultActiveKey={tabActiveCTKHSX} activeKey={tabActiveCTKHSX} tabPosition='bottom' onChange={onChangeCTKHSX}>
                                            <TabPane tab="Danh sách nguyên liệu cuộn" key="tab_ctplanManufacturingVm">
                                                <DataGrid
                                                    data={planDetailInputModel}
                                                    style={{ height: ((window.innerHeight - 190) / 2) }}
                                                    onSelectionChange={onSelectCTKHVao}
                                                    selection={selectplanDetailInputModel}
                                                    selectionMode="single">
                                                    <GridColumn title="STT" field="sortOrder" width="10%" />
                                                    <GridColumn title="Ngày CT" field="planDate" width="10%"
                                                        header={() => <span>Ngày CT</span>}
                                                        render={({ row }: any) => (
                                                            <span>{CommonUtil.FormatDate("DD/MM/YYYY", row.planDate)}</span>
                                                        )}
                                                    />
                                                    <GridColumn title="Số CT" field="receiptNo" width="10%" />
                                                    <GridColumn title="Quy cách" field="specification" width="30%" />
                                                    <GridColumn title="Imei" field="imei" width="10%"
                                                        header={() => <span>Imei</span>}
                                                        render={({ row }: any) => (
                                                            row.imei.split("|")[1]
                                                        )}
                                                    />

                                                    <GridColumn title="Khổ" field="width" width="10%" />
                                                    <GridColumn title="Dày" field="thickness" width="10%" />
                                                    <GridColumn title="Số kg 1" field="weight" key="weight" width="10%" align="right"
                                                        header={() => <span>Số kg</span>}
                                                        editable={false}
                                                        render={({ row }: any) => (
                                                            <div className='bg_weight_1'>
                                                                <NumericFormat readOnly className="ant-input-number-input input-text-right-grid text-red w-100"
                                                                    type='text'
                                                                    thousandSeparator={true}
                                                                    value={row.weight} /></div>
                                                        )}
                                                    />
                                                    <GridColumn title="Số kg 2" field="weightActual" key="weightActual" width="10%" align="right"
                                                        header={() => <span>Số kg thực</span>}
                                                        editable={false}
                                                        render={({ row }: any) => (
                                                            <div className='bg_weight_2'>
                                                                <NumericFormat readOnly className="ant-input-number-input input-text-right-grid text-red w-100"
                                                                    type='text'
                                                                    thousandSeparator={true}
                                                                    value={row.weightActual} /></div>
                                                        )}
                                                    />
                                                </DataGrid>
                                            </TabPane>
                                            <TabPane tab="Chi tiết xả băng" key="tab_ctplanManufacturingVm_list">
                                                <DataGrid
                                                    data={planDetailOutputModel}
                                                    style={{ height: ((window.innerHeight - 190) / 2) }}
                                                    selectionMode="single">
                                                    <GridColumn title="STT" field="sortOrder" width="10%" />
                                                    <GridColumn title="Khổ" field="width" width="15%" />
                                                    <GridColumn title="Dày" field="thickness" width="15%" />
                                                    <GridColumn title="Số Kg 1" field="weight1" width="15%" render={({ row }: any) => (
                                                        <div className='bg_weight'>
                                                            <NumericFormat readOnly className="ant-input-number-input input-text-right-grid text-black w-100" thousandSeparator={true} value={row.weight} />
                                                        </div>
                                                    )} />
                                                    <GridColumn title="Quy cách" field="imei" width="45%" />
                                                </DataGrid>
                                            </TabPane>
                                        </Tabs>
                                        <div style={{ display: "none" }}>
                                            <div ref={refLapKeHoachPrint}>
                                                <div className="inline-bolck w-100 print-area">
                                                    <CreatePlanPrint branchInfo={donviUDUserLogin} userName={userName} lapKeHoachCuonVM={selectcreatePlanRollVm} lapKeHoachCuonPrintVM={createPlanRollVmPrintVmModel} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Spin>
        </Fragment>
    )
}
class EmptyComponent extends React.Component {
    render() {
        return null;
    }
}

export default CreatePlanRollToTape;