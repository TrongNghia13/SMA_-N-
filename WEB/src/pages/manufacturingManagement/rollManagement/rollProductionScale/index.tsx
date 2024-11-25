import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Button, Spin, Input, Tabs, message, Modal, Checkbox, Form, DatePicker } from 'antd';
import { GridColumn, DataGrid, NumberBox, CheckBox } from 'rc-easyui';
import { NumericFormat } from 'react-number-format';
import CommonUtil from '../../../../utils/commonUtil';
import LoginUtils from '../../../../utils/loginUtils';
import createPlanRollVm from '../../../../models/productions/createPlanRollVm';
import receiptImei from '../../../../models/receiptImei';
import steelDefectDetail from '../../../../models/steelDefectDetail';
import planDetailOutput from '../../../../models/planDetailOutput';

import errorModalProps from '../../components/errorModal/index';
import { ShowModal } from '../../../../components/common/index';

import CreatePlanTapeService from '../../../../services/createPlanTapeService';
import { APIStatus } from '../../../../configs/APIConfig';
import moment, { Moment } from "moment";
import { PlusOutlined, SaveOutlined, CloseOutlined} from '@ant-design/icons';

const dateFormat = 'DD/MM/YYYY';
const { confirm } = Modal;
const { TabPane } = Tabs;

const RollProductionScale: React.FC = () => {

    const eleEmty: React.ReactInstance = new EmptyComponent({});
    const gridCanCuonSXInputNummer = useRef<any>(null);
    const gridCanCuonSXChiTietInputNummer = useRef<any>(null);

    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.UserName;
    const branchId = userLoginInfo.BranchId;

    const createPlanTapeService = new CreatePlanTapeService();
    const [loadingPage, setLoadingPage] = useState(true);
    const [spinningLoadCTBang, setSpinningLoadCTBang] = useState(false);
    const [tabActiveCCSX, setTabActiveCCSX] = useState('tab_ccsx_ds');

    const [fillterIsKetThuc, setFillterIsKetThuc] = useState(1);

    const [optionCanCuonSX, setOptionCanCuonSX] = useState((() => {
        let dataInit = { idkh: 0, isEditing: false };
        return dataInit;
    }));

    const [soKgThucInput, setSoKgThucInput] = useState('0');
    const [clickToEditCanCuonSX, setClickToEditCanCuonSX] = useState(false);
    const [createPlanRollVmModel, setcreatePlanRollVmModel] = useState([] as Array<createPlanRollVm>);
    const [selectcreatePlanRollVm, setSelectcreatePlanRollVm] = useState({} as createPlanRollVm);
    const [receiptImeiModel, setreceiptImeiModel] = useState([] as Array<receiptImei>);
    const [planDetailOutputModel, setplanDetailOutputModel] = useState([] as Array<planDetailOutput>);
    const [CanCuon_MANAGE_VM_MODEL, setCanCuon_MANAGE_VM_MODEL] = useState({
        planNo: "",
        planDate: new Date(),
        productionPlanID: '',
        planDescription: "",
        data: Array<any>()
    });

    useEffect(() => {
        async function getData() {
            await loadkeHoachCuon(fillterIsKetThuc);
            setLoadingPage(false);
        }
        getData();
    }, []);

    const onChangeCCSX = (activeKey: string) => {
        setTabActiveCCSX(activeKey);
    }

    const loadkeHoachCuon = async (isKetthuc: number) => {
        let data = await createPlanTapeService.KH_SX_SP_KEHOACH_CUON_CANSX_GET(isKetthuc,branchId);
        setcreatePlanRollVmModel(data.data);
        if (selectcreatePlanRollVm && selectcreatePlanRollVm.productionPlanID && selectcreatePlanRollVm.productionPlanID !== '') {
            const ItemDefault = data.data.filter((p: any) => p.productionPlanID === selectcreatePlanRollVm.productionPlanID)[0];
            if (ItemDefault) {
                await onSelectLapKeHoach(ItemDefault);
            } else {
                setSelectcreatePlanRollVm({} as createPlanRollVm)
                setreceiptImeiModel([]);
                setplanDetailOutputModel([]);
            }
        } else {
            setreceiptImeiModel([]);
            setplanDetailOutputModel([]);
        }
    }

    const loadDataKHCuonRa = async (idkh: number) => {
        const data = await createPlanTapeService.SP_KH_CUON_RA_GET(idkh);
        return data.data;
    }

    const OnSetFillterIsKetThuc = (e: any) => {
        const isKetThuc = e.target.checked ? 1 : 0;
        setFillterIsKetThuc(isKetThuc);
        loadkeHoachCuon(isKetThuc);
    }

    const onSelectLapKeHoach = async (selection: createPlanRollVm) => {
        setLoadingPage(true);
        setSelectcreatePlanRollVm(selection);
        await loadTonXuatNL(selection.productionPlanID);
        setLoadingPage(false);
    }

    const onSelectCTKHVao = async (selection: receiptImei) => {
        setSpinningLoadCTBang(true);
        var cloneData = Object.assign({}, CanCuon_MANAGE_VM_MODEL);
        var findRow = cloneData.data.find((p: any) => p.index == selection.index);
        let chillds = Array<any>();
        if (findRow.listDetailOutputs == null || findRow.listDetailOutputs === undefined) {
            chillds = await loadDataKHCuonRa(selection.planDetailInputID!);
            chillds.forEach((ele, idx) => {
                ele['index'] = idx;
                ele['indexGr'] = selection.index;
            });
            findRow.listDetailOutputs = chillds;
        } else {
            chillds = findRow.listDetailOutputs;
        }
        cloneData.data[selection.index!] = findRow;
        setCanCuon_MANAGE_VM_MODEL(cloneData);
        setplanDetailOutputModel([]);
        setTimeout(() => {
            setplanDetailOutputModel(chillds);
            setSpinningLoadCTBang(false);
        }, 1000);

    }

    const handleRowCheck = (row: any, checked: any) => {
        onSelectCTKHVao(row);
        setSpinningLoadCTBang(true);
        var cloneDataManage = Object.assign({}, CanCuon_MANAGE_VM_MODEL);
        var cloneData = Object.assign(Array<any>(), receiptImeiModel);
        cloneData[row.index].isChecked = checked;
        cloneDataManage.data[row.index].isChecked = checked;
        setreceiptImeiModel([]);
        setTimeout(() => {
            setreceiptImeiModel(cloneData);
            setCanCuon_MANAGE_VM_MODEL(cloneDataManage);
            setSpinningLoadCTBang(false);
        }, 500);
    }

    const removeCTKHVao = async (index: number, planDetailInputID: number) => {
        setSpinningLoadCTBang(true);
        let cloneCTIMEI = Object.assign([], receiptImeiModel);
        cloneCTIMEI = cloneCTIMEI.filter((p: any) => p.index !== index);

        let cloneDataManage = Object.assign({}, CanCuon_MANAGE_VM_MODEL);
        cloneDataManage.data = cloneDataManage.data.filter((p: any) => p.index !== index);

        let dataKHra = document.getElementById('RollProductionScale_planDetailOutputModel_Input') as HTMLInputElement;
        let dataInputKHra = JSON.parse(dataKHra.value).filter((p: any) => p.planDetailInputID !== planDetailInputID);

        setreceiptImeiModel([]);
        setplanDetailOutputModel([]);

        setTimeout(() => {
            setCanCuon_MANAGE_VM_MODEL(cloneDataManage);
            setreceiptImeiModel(cloneCTIMEI);
            setplanDetailOutputModel(dataInputKHra);
            setSpinningLoadCTBang(false);
        }, 1000);
    }

    const loadTonXuatNL = async (productionPlanID: string) => {
        const data = await createPlanTapeService.SP_TONNL_CHUA_SX_GET(encodeURIComponent(productionPlanID),branchId);
        if (data.data) {
            data.data.forEach((ele, idx) => {
                ele['isChecked'] = false;
                ele['index'] = idx;
            });
            setCanCuon_MANAGE_VM_MODEL({ ...CanCuon_MANAGE_VM_MODEL, data: data.data });
        }
        setreceiptImeiModel(data.data);
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

    const Capnhatcan = async (e: any) => {
        if (selectcreatePlanRollVm.productionPlanID === '') {
            message.error('Vui lòng chọn thông tin lô sản xuất để cập nhật');
            return false;
        }

        setSpinningLoadCTBang(true);
        setOptionCanCuonSX({ ...optionCanCuonSX, isEditing: true });
        setClickToEditCanCuonSX(true);
        await GetSoCT(new Date());

        setplanDetailOutputModel([]);
        setreceiptImeiModel([]);
        setTimeout(() => {
            setreceiptImeiModel(receiptImeiModel);
            setSpinningLoadCTBang(false);
        }, 500);

    }

    const HuyCapnhatcan = async (e: any) => {
        setOptionCanCuonSX({ ...optionCanCuonSX, isEditing: false });
        setClickToEditCanCuonSX(false);
        await loadTonXuatNL(selectcreatePlanRollVm.productionPlanID);
    }

    const GetSoCT = async (ngay: Date) => {
        var ngatct = moment(ngay, "YYYY/MM/DD");
        var month = ngatct.format("YYYYMM");
        var data = await createPlanTapeService.GetPlanNo(branchId, "C", month);
        setCanCuon_MANAGE_VM_MODEL({
            ...CanCuon_MANAGE_VM_MODEL,
            planDate: ngay,
            planNo: data.data,
            productionPlanID: selectcreatePlanRollVm.productionPlanID
        });
    };

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setCanCuon_MANAGE_VM_MODEL({ ...CanCuon_MANAGE_VM_MODEL, [name]: type === "number" ? parseFloat(value) : value });
    };

    const handleKeyDownSoKgGroup = (event: any, index: number) => {
        if (event.keyCode === 13) {
            setSpinningLoadCTBang(true);
            if (gridCanCuonSXInputNummer.current) {
                // gridCanCuonSXInputNummer.current.endEdit();
                var cloneDataNLBangSX = Object.assign({}, CanCuon_MANAGE_VM_MODEL);
                let value = parseFloat(event.target.value);

                const dataChils = cloneDataNLBangSX.data[index].listDetailOutputs;

                cloneDataNLBangSX.data[index].weight3 = value;
                let totalSokg = 0;
                dataChils.forEach((element: any) => {
                    element.weightActual = Math.round((parseFloat(element.width) * value) / parseFloat(cloneDataNLBangSX.data[index].width)) * 100 / 100;
                    totalSokg += element.weightActual;
                });

                if (totalSokg !== value) {
                    if (totalSokg > value) {
                        const indexLast = dataChils[dataChils.length - 1].index;
                        dataChils[indexLast].weightActual = dataChils[indexLast].weightActual - (parseFloat((totalSokg - value).toFixed(2)));
                    }
                    else {
                        const indexFirst = dataChils[dataChils.length - 2].index;
                        dataChils[indexFirst].weightActual = dataChils[indexFirst].weightActual + (parseFloat((value - totalSokg).toFixed(2)));
                    }
                }

                const weightActualBang = dataChils.filter((p: any) => p.productID !== 'PL-CUON').reduce((accumulator: any, object: any) => {
                    return accumulator + parseFloat(object.weightActual);
                }, 0);
                setSoKgThucInput(weightActualBang);

                cloneDataNLBangSX.data[index].listDetailOutputs = dataChils;
                setplanDetailOutputModel([]);
                setTimeout(() => {
                    setplanDetailOutputModel(dataChils);
                    setCanCuon_MANAGE_VM_MODEL(cloneDataNLBangSX);
                    setSpinningLoadCTBang(false);
                }, 1000);
            }
        }
    }

    const handleKeyDownSoKgChiTietGroup = (event: any, indexgr: number, index: number) => {
        if (event.keyCode === 13) {
            if (gridCanCuonSXChiTietInputNummer.current) {
                // gridCanCuonSXChiTietInputNummer.current.endEdit();
                let value = parseFloat(event.target.value);
                var cloneData = Object.assign({}, CanCuon_MANAGE_VM_MODEL);
                cloneData.data[indexgr].listDetailOutputs[index].weightActual = value;
                setCanCuon_MANAGE_VM_MODEL(cloneData);
                const dataChils = Object.assign([], cloneData.data[indexgr].listDetailOutputs);
                const totalSokgthuc = dataChils.filter((p: any) => p.productID !== 'PL-CUON').reduce((accumulator: any, object: any) => {
                    return accumulator + parseFloat(object.weightActual);
                }, 0);
                setSoKgThucInput(totalSokgthuc);
            }
        }
    }

    const UpdateSoKgThuc_Total_Chtiet = (e: any) => {
        if (e.key === 'Enter') {
            setSpinningLoadCTBang(true);
            const index = gridCanCuonSXInputNummer.current!.selectionValue().index;
            const value = e.currentTarget.value;
            setSoKgThucInput(value);
            const floatValue = value !== '' ? parseFloat(value) : 0;
            var cloneDataCanCuonSX = Object.assign({}, CanCuon_MANAGE_VM_MODEL);
            const data = cloneDataCanCuonSX.data[index];
            const dataChils = data.listDetailOutputs;
            const tongKhoBang = dataChils.filter((p: any) => p.productID !== 'PL-CUON').reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.width);
            }, 0);
            const tongKhoPL = dataChils.filter((p: any) => p.productID === 'PL-CUON').reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.width);
            }, 0);

            const totalBang = floatValue;
            let totalSokgBang = 0;
            dataChils.forEach((element: any) => {
                element.weightActual = element.productID !== 'PL-CUON' ? Math.round((parseFloat(element.width) * totalBang) / parseFloat(tongKhoBang)) : element.weightActual;
                totalSokgBang += element.productID !== 'PL-CUON' ? element.weightActual : 0;
            });

            if (totalSokgBang !== floatValue) {
                const bangs = dataChils.filter((p: any) => p.productID !== 'PL-CUON');
                if (totalSokgBang > floatValue) {
                    const indexLast = bangs[bangs.length - 1].index;
                    dataChils[indexLast].weightActual = dataChils[indexLast].weightActual - (totalSokgBang - floatValue);
                }
                else {
                    const indexFirst = bangs[0].index;
                    dataChils[indexFirst].weightActual = dataChils[indexFirst].weightActual + (floatValue - totalSokgBang);
                }
            }

            let totalSokgPL = 0;
            const totalPL = data.weight3 - floatValue;
            dataChils.forEach((element: any) => {
                element.weightActual = element.productID === 'PL-CUON' ? Math.round((parseFloat(element.width) * totalPL) / parseFloat(tongKhoPL)) : element.weightActual;
                element.weightActual = isNaN(element.weightActual) ? 0 : element.weightActual;
                totalSokgPL += element.productID === 'PL-CUON' ? element.weightActual : 0;
            });

            if (data.weight3 < (floatValue + totalSokgPL)) {
                const biendo = (floatValue + totalSokgPL) - data.weight3;
                dataChils.forEach((element: any, index: any) => {
                    element.weightActual = element.productID === 'PL-CUON' ? (index == dataChils.length - 1 ? element.weightActual - biendo : element.weightActual) : element.weightActual;
                    element.weightActual = isNaN(element.weightActual) ? 0 : element.weightActual;
                });
            }

            cloneDataCanCuonSX.data[index].listDetailOutputs = dataChils;
            setplanDetailOutputModel([]);
            setTimeout(() => {
                setplanDetailOutputModel(dataChils);
                setCanCuon_MANAGE_VM_MODEL(cloneDataCanCuonSX);
                setSpinningLoadCTBang(false);
            }, 1000);
        }
    }

    const SaveCan = async (e: any) => {
        e.preventDefault();

        var cloneDataNLBangSX = Object.assign({}, CanCuon_MANAGE_VM_MODEL);

        var isChecKImei = true;
        const dataNLCanSXs = cloneDataNLBangSX.data.filter((p: any) => p.isChecked === true);
        if (dataNLCanSXs.length === 0) {
            message.error('Vui lòng chọn kế hoạch sản xuất');
            return false;
        }

        for (var i = 0; i < dataNLCanSXs.length; i++) {
            const item = dataNLCanSXs[i];
            if (item.weight3 <= 0) {
                isChecKImei = false;
                message.error('Vui lòng nhập số kg thực của imei: ' + item.imei);
                break;
            }
        }

        for (var i = 0; i < dataNLCanSXs.length; i++) {
            const item = dataNLCanSXs[i];
            const dataChils = item.listDetailOutputs;

            const tongSokgThuc = dataChils.reduce((accumulator: any, object: any) => {
                return accumulator + parseFloat(object.weightActual);
            }, 0);

            if (item.weight3 != tongSokgThuc) {
                isChecKImei = false;
                message.error('Số kg thực của imei: ' + item.imei + ' không khớp');
                break;
            }
        }

        if (isChecKImei) {
            setLoadingPage(true);
            var data = await createPlanTapeService.SP_NXNL_IMEI_UPD_CANSX(dataNLCanSXs);
            if (data.status === APIStatus.ERROR) {
                message.error(data.message);
                setLoadingPage(false);
            }
            else {
                message.success('Cập nhật dữ liệu sản xuất cân thành phẩm thành công');
                setTimeout(async () => {
                    const loadDataByKetThuc = dataNLCanSXs.length === cloneDataNLBangSX.data.length ? 0 : 1;
                    setFillterIsKetThuc(loadDataByKetThuc);
                    await loadkeHoachCuon(loadDataByKetThuc);
                    setOptionCanCuonSX({ ...optionCanCuonSX, isEditing: false });
                    setLoadingPage(false);
                }, 500);
            }
        }

    }

    return (
        <Fragment>
            <Spin spinning={loadingPage}>

                <div className="page-pannel">
                    <div className="page-pannel-left page-pannel-left-30">
                        <div className="pannel-left-body-not-header">
                            <section className="code-box-meta markdown">
                                <div className="code-box-title"><Checkbox disabled={optionCanCuonSX.isEditing} checked={fillterIsKetThuc == 1} onChange={e => OnSetFillterIsKetThuc(e)}></Checkbox> Sản xuất chưa cân</div>
                                <div className="code-box-description">
                                    <DataGrid
                                        disabled={optionCanCuonSX.isEditing}
                                        data={createPlanRollVmModel}
                                        style={{ height: (window.innerHeight - 190) }}
                                        onSelectionChange={(select: any) => {
                                            if (optionCanCuonSX.isEditing) return false;
                                            else {
                                                onSelectLapKeHoach(select);
                                            }
                                        }}
                                        selection={selectcreatePlanRollVm}
                                        selectionMode="single">
                                        <GridColumn title="Kế hoạch" field="productionPlanID" width="40%" />
                                        <GridColumn title="Xuất" field="totalSource" width="15%" align="right"
                                            header={() => <span>Xuất</span>}
                                            render={({ row }: any) => (
                                                row.totalSource
                                            )}
                                        />
                                        <GridColumn title="Lập KH" field="totalTarget" width="15%" align="right"
                                            header={() => <span>Lập KH</span>}
                                            render={({ row }: any) => (
                                                row.totalTarget
                                            )}
                                        />
                                        <GridColumn title="SX" field="sodacan" width="15%" align="right"
                                            header={() => <span>Đã cân</span>}
                                            render={({ row }: any) => (
                                              row.sodacan
                                            )}
                                        />
                                        <GridColumn title="Còn lại" field="totalExist" width="15%" align="right"
                                            header={() => <span>Còn lại</span>}
                                            render={({ row }: any) => (
                                                row.totalExist
                                            )}
                                        />
                                    </DataGrid>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="page-pannel-right page-pannel-right-70">
                        <div className="pannel-right-body">
                            <section className="code-box-meta markdown">
                                <div className="code-box-title">Lô SX: <span className="text-red">{selectcreatePlanRollVm.planName}</span></div>
                                <div className="code-box-description">
                                    <DataGrid style={{ height: ((window.innerHeight - 190) / 2) - 25 }}
                                        ref={gridCanCuonSXInputNummer}
                                        data={receiptImeiModel}
                                        onSelectionChange={onSelectCTKHVao}
                                        clickToEdit={clickToEditCanCuonSX}
                                        editMode="cell"
                                        selectionMode="single">
                                        <GridColumn key="ck_column_key" width='5%' align="center"
                                            field="ck"
                                            render={({ row }: any) => (
                                                <CheckBox disabled={!clickToEditCanCuonSX} checked={row.isChecked} onChange={(checked: any) => handleRowCheck(row, checked)}></CheckBox>
                                            )}
                                            header={() => (
                                                <></>
                                            )}
                                            filter={() => <span></span>}
                                        />
                                        <GridColumn title="STT" key="sortOrder" field="sortOrder" width="3%" />
                                        <GridColumn title="Imei" key="imei" field="imei" width="20%" align="left" />
                                        <GridColumn title="Số kg 1" field="weight1" key="weight1" width="7%" align="right"
                                            header={() => <span>Số kg 1</span>}
                                            editable={false}
                                            render={({ row }: any) => (
                                               <div className="ant-input-number-sm ant-input-number w-100">
                                               <NumericFormat
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
                                               />
                                           </div>
                                            )}
                                        />
                                        <GridColumn title="Số kg 2" field="weight2" key="weight2" width="7%" align="right"
                                            header={() => <span>Số kg 2</span>}
                                            editable={false}
                                            render={({ row }: any) => (
                                                <div className="ant-input-number-sm ant-input-number w-100">
                                                <NumericFormat
                                                    className="ant-input-number-input input-text-right w-100"
                                                    thousandSeparator={true}
                                                    isAllowed={(values) => {
                                                        const { floatValue } = values;
                                                        return floatValue ? floatValue > 0 && floatValue <= 999999 : true;
                                                    }}
                                                    minLength={1}
                                                    min={1}
                                                    max={999999}
                                                    value={row.weight2}
                                                />
                                            </div>
                                            )}
                                        />
                                        <GridColumn
                                            editable
                                            field="weight3"
                                            title="Số kg 3"
                                            align="right"
                                            width="10%"
                                            render={({ row }: any) => (
                                                <div className='bg_sokg_thuc'>
                                                    <NumericFormat readOnly className="ant-input-number-input input-text-right-grid text-blue w-100" thousandSeparator={true} value={row.weight3} />
                                                </div>
                                            )}
                                            editor={({ row }: any) => (
                                                <>
                                                    <div style={{ padding: "2px 5px" }}>
                                                        <div
                                                            className="fl-lef w-100"
                                                            data-rowindex={row.sortOrder}
                                                            onKeyDown={(event) => handleKeyDownSoKgGroup(event, row.index)}
                                                        >
                                                            <NumberBox value={row.weight3}></NumberBox>
                                                        </div>
                                                        <div className="clearfix" style={{ height: 0 }}></div>
                                                    </div>
                                                </>
                                            )}
                                        />
                                        <GridColumn title="Ghi chú" key="description" field="description" width="15%" align="left"
                                            render={({ row }: any) => (
                                                <>
                                                    {
                                                        row.description
                                                    }
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
                                    <div className="clearfix h-10"></div>
                                    <div className="w-100" style={{ textAlign: 'right' }}>
                                        <div className="inline-bolck w-30 mr-1">
                                            <label className='lable-cotrol inline-bolck mr-right-5'>Số Kg Thực</label>
                                            <div className='inline-bolck mr-right-5 input-control'>
                                                <Input
                                                    disabled={planDetailOutputModel.length <= 0}
                                                    style={{ width: '100%' }}
                                                    onKeyDown={UpdateSoKgThuc_Total_Chtiet}
                                                    value={soKgThucInput}
                                                    onChange={e => setSoKgThucInput(e.target.value)}
                                                    size="small" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix h-10"></div>
                                    <Spin spinning={spinningLoadCTBang}>
                                        <DataGrid
                                            ref={gridCanCuonSXChiTietInputNummer}
                                            data={planDetailOutputModel}
                                            style={{ height: ((window.innerHeight - 190) / 2) - 25 }}
                                            clickToEdit={clickToEditCanCuonSX}
                                            editMode="cell">
                                            <GridColumn title="Mã HH" field="productID" width="5%" />
                                            <GridColumn title="Imei" key="imei" field="imei" width="15%" align="left" />
                                            <GridColumn title="Khổ" field="width" width="5%" />
                                            <GridColumn title="Dày" field="thickness" width="5%" />
                                            <GridColumn title="Số Kg" field="weight" width="7%"
                                                render={({ row }: any) => (
                                                    <div className='bg_sokg'>
                                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid text-red w-100" thousandSeparator={true} value={row.weight} />
                                                    </div>
                                                )}
                                            />
                                            <GridColumn editable title="Số Kg Thực" field="weightActual" width="7%"
                                                render={({ row }: any) => (
                                                    <div className='bg_sokg_thuc'>
                                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid text-red w-100" thousandSeparator={true} value={row.weightActual} />
                                                    </div>
                                                )}
                                                editor={({ row }: any) => (
                                                    <>
                                                        <div style={{ padding: "2px 5px" }}>
                                                            <div
                                                                className="fl-lef w-100"
                                                                data-rowindex={row.sortOrder}
                                                                onKeyDown={e => handleKeyDownSoKgChiTietGroup(e, row.indexGr, row.index)}
                                                            >
                                                                <NumberBox value={row.weightActual}></NumberBox>
                                                            </div>
                                                            <div className="clearfix" style={{ height: 0 }}></div>
                                                        </div>
                                                    </>
                                                )} />
                                        </DataGrid>
                                        <input type="hidden" value={JSON.stringify(planDetailOutputModel)} id='RollProductionScale_planDetailOutputModel_Input' />
                                        <div className="clearfix h-10"></div>
                                    </Spin>
                                </div>
                            </section>
                            <div className="clearfix h-5"></div>
                            <div className='text-center'>
                                <Fragment>
                                    {
                                        optionCanCuonSX.isEditing ?
                                            <>

                                                <Button className="button mr-5" type="primary" icon={<SaveOutlined/>} size="small"
                                                    onClick={e => SaveCan(e)}>Save</Button>
                                                <Button className="button mr-5" type="primary" icon={<CloseOutlined/>} size="small"
                                                    onClick={e => HuyCapnhatcan(e)} danger>Hủy</Button>

                                            </> :
                                            <>
                                                <Button disabled={(selectcreatePlanRollVm.productionPlanID === '' || selectcreatePlanRollVm.productionPlanID === null || selectcreatePlanRollVm.productionPlanID === undefined)} className="button mr-5" type="primary" icon={<PlusOutlined/>}size="small"
                                                    onClick={e => Capnhatcan(e)}>Cập nhật KG</Button>
                                            </>
                                    }
                                </Fragment>
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
export default RollProductionScale;