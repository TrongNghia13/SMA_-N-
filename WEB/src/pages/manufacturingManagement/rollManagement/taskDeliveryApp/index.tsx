import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, Form, Col, Modal, Input, Checkbox, Select, DatePicker } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { APIStatus } from '../../../../configs/APIConfig';
import TaskDeliverAppModel from '../../../../models/taskDeliverApp';
import LoginUtils from '../../../../utils/loginUtils';
/* import services */
import TaskDeliveryAppService from '../../../../services/taskDeliveryAppService';
import CateProductionPlanService from '../../../../services/cateProductionPlanService';
import UserService from '../../../../services/userService';
import CateCounterpartyService from '../../../../services/cateCounterpartyService';
import CateThicknessService from '../../../../services/cateThicknessService';
import CateWidthService from '../../../../services/cateWidthService';
import CateProductionBatchNoService from '../../../../services/cateProductionBatchNoService';
import CateStoreService from '../../../../services/cateStoreService';
/* import Models*/
import UserInformation from '../../../../models/userInformation';
import CateProductionPlan from '../../../../models/cateProductionPlan';
import CateCounterparty from '../../../../models/cateCounterparty';
import CateThickness from '../../../../models/cateThickness';
import CateWidth from '../../../../models/cateWidth';
import CateProductionBatchNo from '../../../../models/cateProductionBatchNo';
import CateStore from '../../../../models/cateStore';
/* import Antd*/
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import Container from '../../../../components/container';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const { confirm } = Modal;
type dateSearch = {
    fromDate: string,
    toDate: string
};
const TaskDeliveryApp: React.FC = () => {
    const taskDeliveryAppService = new TaskDeliveryAppService();
    const cateProductionPlanService = new CateProductionPlanService();
    const cateCounterpartyService = new CateCounterpartyService();
    const cateThicknessService = new CateThicknessService();
    const cateWidthService = new CateWidthService();
    const cateProductionBatchNoService = new CateProductionBatchNoService();
    const cateStoreService = new CateStoreService();
    const userService = new UserService();
    const [taskDeliverAppModel, settaskDeliverAppModel] = useState({ listTDA: Array<TaskDeliverAppModel>(), loading: true });
    const dataModelManagerInit = {
        taskDeliverAppID: 0,
        receiptNo: "",
        taskDate: dayjs(new Date()).format("YYYY-MM-DD"),
        userName: "",
        productionPlanID: "",
        storeID: "",
        materialType: "",
        vendor: "",
        width: "",
        thickness: "",
        productionBatchNo: "",
        quantity: 0,
        isFinish: false,
        createdBy: "",
        createdDate: dayjs(new Date()).format("YYYY-MM-DD"),
    }
    const dataDateSearchInit = {
        fromDate: dayjs(new Date()).set('date', 1).format("YYYY-MM-DD"),
        toDate: dayjs(new Date()).format("YYYY-MM-DD")
    }
    const [receiptNoModel, setReceiptNoModel] = useState((() => {
        let dataInit: string = ""
        return dataInit;
    }));
    const [dateSearchModel, setDateSearchModel] = useState((() => {
        let dataInit: dateSearch = dataDateSearchInit
        return dataInit;
    }));
    const [modelManager, setModelManager] = useState((() => {
        let dataInit: TaskDeliverAppModel = dataModelManagerInit
        return dataInit;
    }));
    const [dataPlanModel, setDataPlanModel] = useState((() => {
        let dataInit: Array<CateProductionPlan> = [] as any;
        return dataInit;
    }));
    const [userInformationModel, setUserInformationModel] = useState((() => {
        let dataInit: Array<UserInformation> = [] as any;
        return dataInit;
    }));
    const [cateCounterpartyModel, setCateCounterpartyModel] = useState((() => {
        let dataInit: Array<CateCounterparty> = [] as any;
        return dataInit;
    }));
    const [cateThicknessModel, setCateThicknessModel] = useState((() => {
        let dataInit: Array<CateThickness> = [] as any;
        return dataInit;
    }));
    const [cateWidthModel, setCateWidthModel] = useState((() => {
        let dataInit: Array<CateWidth> = [] as any;
        return dataInit;
    }));
    const [cateProductionBatchNoModel, setCateProductionBatchNoModel] = useState((() => {
        let dataInit: Array<CateProductionBatchNo> = [] as any;
        return dataInit;
    }));
    const [cateStoreModel, setCateStoreModel] = useState((() => {
        let dataInit: Array<CateStore> = [] as any;
        return dataInit;
    }));
    const [optionTaskApp, setOptionTaskApp] = useState((() => {
        let dataInit = { taskAppId: 0, productPlanId: '', isEditing: false, isSubmit: false, isCreating: false };
        return dataInit;
    }));
    const [dataSelectTaskApp, setDataSelectTaskApp] = useState((() => {
        let dataInit = { model: dataModelManagerInit }
        return dataInit;
    }));
    useEffect(() => {
        async function GetData() {
            await GetDataTaskDeliverApp();
            await GetDataListProductPlan();
            await GetDataListUser();
            await GetDataCounterParty();
            await GetDataCateThickness();
            await GetDataCateWidth();
            await GetDataCateProductionBatchNo();
            await GetDataCateStore();
        }
        GetData();
    }, []);
    const GetDataTaskDeliverApp = async (callback?: any) => {
        const userLoginInfo = LoginUtils.GetInfo();
        var getDdata = await taskDeliveryAppService.GetListRollTaskDeliverAppByBranchId(userLoginInfo.BranchId, dateSearchModel?.fromDate, dateSearchModel?.toDate);
        if (getDdata) {
            settaskDeliverAppModel({ ...taskDeliverAppModel, listTDA: getDdata.data, loading: false });
        }
        setTimeout(() => {
            if (callback) callback(getDdata.data);
        }, 300);
    }
    const GetReceiptNo = async () => {
        console.log("modelManager.taskDate",modelManager.taskDate);
        var getDdata = await taskDeliveryAppService.GetReceiptNoByPlanType("KHXB", modelManager.taskDate);
        if (getDdata) {
            setReceiptNoModel(getDdata.data);
        }
    }
    const GetDataListProductPlan = async () => {
        const userLoginInfo = LoginUtils.GetInfo();
        var getDdata = await cateProductionPlanService.GetListPlanNotFinishByBranchId(userLoginInfo.BranchId);
        setDataPlanModel(getDdata.data);
    }
    const GetDataListUser = async () => {
        const userLoginInfo = LoginUtils.GetInfo();
        var getDdata = await userService.GetListUserInformationUseMobile(userLoginInfo.BranchId);
        setUserInformationModel(getDdata.data);
    }
    const GetDataCounterParty = async () => {
        var getDdata = await cateCounterpartyService.GetListGetVendorByGroupId("NVL");
        setCateCounterpartyModel(getDdata.data);
    }
    const GetDataCateThickness = async () => {
        var getDdata = await cateThicknessService.GetList();
        setCateThicknessModel(getDdata.data);
    }
    const GetDataCateWidth = async () => {
        var getDdata = await cateWidthService.GetListCateWidthByType("C");
        setCateWidthModel(getDdata.data);
    }
    const GetDataCateProductionBatchNo = async () => {
        var getDdata = await cateProductionBatchNoService.GetList();
        setCateProductionBatchNoModel(getDdata.data);
    }
    const GetDataCateStore = async () => {
        const userLoginInfo = LoginUtils.GetInfo();
        var getDdata = await cateStoreService.GetListStoreByTypeBranchId("02", userLoginInfo.BranchId);
        setCateStoreModel(getDdata.data);
    }
    const onSelectTaskApp = (selection: TaskDeliverAppModel, dataInit?: Array<TaskDeliverAppModel>) => {
        setReceiptNoModel(selection.receiptNo);
        if (optionTaskApp.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectTaskApp({ ...dataSelectTaskApp, model: dataModelManagerInit });
        }
        else {
            var taskAppItem: TaskDeliverAppModel = dataModelManagerInit;
            if (dataInit) {
                taskAppItem = dataInit.find((element) => {
                    return element.taskDeliverAppID === selection.taskDeliverAppID;
                }) || dataModelManagerInit;
            }
            else {
                taskAppItem = taskDeliverAppModel.listTDA.find((element) => {
                    return element.taskDeliverAppID === selection.taskDeliverAppID;
                }) || dataModelManagerInit;
            }
            setModelManager(taskAppItem);
            setDataSelectTaskApp({ ...dataSelectTaskApp, model: taskAppItem });

            setOptionTaskApp(prevState => ({
                ...prevState,
                taskAppId: taskAppItem.taskDeliverAppID,
                productPlanId: taskAppItem.productionPlanID,
                isEditing: false,
                isSubmit: false,
            }));
        }
    }
    const onChangeFromDateSearch = async (value: any) => {
        setDateSearchModel({ ...dateSearchModel, fromDate: dayjs(value).format("MM-DD-YYYY") })
    }
    const onChangeToDateSearch = async (value: any) => {
        setDateSearchModel({ ...dateSearchModel, toDate: dayjs(value).format("MM-DD-YYYY") })
    }
    const onChangePlanId = async (value: any) => {
        setModelManager({ ...modelManager, productionPlanID: value });
    }
    const onChangeUsername = async (value: any) => {
        setModelManager({ ...modelManager, userName: value });
    }
    const onChangeVendor = async (value: any) => {
        setModelManager({ ...modelManager, vendor: value });
    }
    const onChangeThickness = async (value: any) => {
        setModelManager({ ...modelManager, thickness: value });
    }
    const onChangeWidth = async (value: any) => {
        setModelManager({ ...modelManager, width: value });
    }
    const onChangeQuantity = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModelManager({ ...modelManager, quantity: parseInt(value.toString()) });
    }
    const onChangeTaskDate = async (value: any) => {
        setModelManager({ ...modelManager, taskDate: dayjs(value).format("MM-DD-YYYY") });
        async function GetData() {
            await GetReceiptNo()
        }
        GetData();
    }
    const onChangeBatchNo = async (value: any) => {
        setModelManager({ ...modelManager, productionBatchNo: value });
    }
    const onChangeStore = async (value: any) => {
        setModelManager({ ...modelManager, storeID: value });
    }
    const handleChangeIsFinish = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setModelManager({ ...modelManager, isFinish: checked ? true : false });
    }

    const AddTaskApp = (e: any) => {
        async function GetData() {
            await GetReceiptNo()
        }
        GetData();
        setOptionTaskApp(prevState => ({
            ...prevState,
            isEditing: true,
            isCreating: true,
            isSubmit: false
        }));
        setDataSelectTaskApp({ ...dataSelectTaskApp, model: dataModelManagerInit });

        const userLoginInfo = LoginUtils.GetInfo();
        setModelManager({ ...dataModelManagerInit, createdBy: userLoginInfo.UserName, materialType: "C" })
    }

    const EditTaskApp = (e: any) => {
        if (optionTaskApp.taskAppId <= 0) {
            message.error('Vui lòng chọn thông tin yêu cầu cho kế hoạch để sửa');
            return false;
        }
        setOptionTaskApp(prevState => ({ ...prevState, isEditing: true, isCreating: false }));
        const userLoginInfo = LoginUtils.GetInfo();
        setModelManager({ ...modelManager, createdBy: userLoginInfo.UserName, materialType: "C" });

    }

    const DeleteTaskApp = (e: any) => {
        if (optionTaskApp.taskAppId <= 0) {
            message.error('Vui lòng chọn thông tin yêu cầu cho kế hoạch để xóa');
            return false;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa yêu cầu cho kế hoạch: ' + optionTaskApp.productPlanId + '?',
            onOk() {
                OnDeletedTaskApp(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedTaskApp = async (e: any) => {
        var reDelete = await taskDeliveryAppService.DeleteTaskApp(optionTaskApp.taskAppId);;
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            await GetDataTaskDeliverApp();
            await CancelTaskApp(e);
        }
    }

    const SaveTaskApp = async (e: any) => {
        if (modelManager.productionPlanID.length == 0
            || modelManager.quantity == 0
            || modelManager.storeID.length == 0
            || modelManager.thickness.length == 0
            || modelManager.width.length == 0
            || modelManager.materialType.length == 0
            || modelManager.vendor.length == 0
            || modelManager.productionBatchNo.length == 0) {
            message.error('Dữ liệu đầu vào không được bỏ trống');
            return;
        }
        setOptionTaskApp({ ...optionTaskApp, isSubmit: true });
        var data: any;
        if (optionTaskApp.isCreating) {
            data = await taskDeliveryAppService.CreateTaskApp(modelManager);
        } else {
            data = await taskDeliveryAppService.UpdateTaskApp(modelManager);
        }
        if (data.status === APIStatus.ERROR || data.success == false) {
            message.error("Có lỗi trong quá trình tạo, vui lòng kiểm tra dữ liệu nhập!");
            setOptionTaskApp({ ...optionTaskApp, isSubmit: false });
        }
        else {
            message.success('Thao tác thành công');
            CancelTaskApp(e);
            await GetDataTaskDeliverApp(function (datas: Array<TaskDeliverAppModel>) {
                if (datas != null) {
                    var TaskAppItem = datas.find((element) => {
                        return element.taskDeliverAppID === data.data.taskDeliverAppID;
                    });
                    if (TaskAppItem) {
                        onSelectTaskApp(TaskAppItem, datas);
                    }
                }
            });
        }
    }

    const CancelTaskApp = async (e: any) => {
        setOptionTaskApp(prevState => ({
            ...prevState,
            taskAppId: 0,
            isEditing: false,
            isCreating: false
        }));
        setDataSelectTaskApp({ ...dataSelectTaskApp, model: dataModelManagerInit });
        setModelManager(dataModelManagerInit);
        setReceiptNoModel("");
    }
    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-float-left w-32">
                    <div className="pannel-header">
                        BẢNG CÔNG VIỆC
                    </div>
                    <div className="fl-lef w-90">
                        <div className="fl-lef w-50">
                            <DatePicker
                                style={{ width: '100%' }}
                                disabled={optionTaskApp.isEditing}
                                value={dayjs(dateSearchModel.fromDate)}
                                format={dateFormat}
                                onChange={onChangeFromDateSearch}
                                allowClear={false}
                            />
                        </div>
                        <div className="fl-lef w-50">
                            <DatePicker
                                style={{ width: '100%' }}
                                disabled={optionTaskApp.isEditing}
                                value={dayjs(dateSearchModel.toDate)}
                                format={dateFormat}
                                onChange={onChangeToDateSearch}
                                allowClear={false}
                            />
                        </div>
                    </div>
                    <div className="fl-lef w-10 text-center">
                        <Button disabled={optionTaskApp.isEditing} type="primary" icon={<SearchOutlined />} onClick={e => GetDataTaskDeliverApp(null)}></Button>
                    </div>
                    <div className="clearfix h-5"></div>
                    <div className="pannel-full-body">
                        <Container isLoading={taskDeliverAppModel.loading}>
                            <DataGrid
                                filterable
                                filterRules={[]}
                                data={taskDeliverAppModel.listTDA}
                                style={{ height: (window.innerHeight - 120) }}
                                selectionMode="single"
                                selection={dataSelectTaskApp.model}
                                onSelectionChange={onSelectTaskApp}
                            >
                                <GridColumn field="receiptNo" title="Số chứng từ" width="10%" align="center" />
                                <GridColumn field="productionPlanID" title="Mã kế hoạch" width="40%" align="center" />
                                <GridColumn field="userName" title="Người nhận việc" width="20%" align="center" />
                                <GridColumn field="quantity" title="Số lượng" width="10%" align="center" />
                                <GridColumn field="isFinish" title="Kết thúc" width="10%" align="center"
                                    header={() => <span>Kết thúc</span>}
                                    render={({ row }: any) => (
                                        <Checkbox
                                            checked={row.isFinish == 1 ? true : false}
                                        ></Checkbox>
                                    )}
                                />
                            </DataGrid>
                        </Container>
                    </div>
                </div>

                <div className="page-pannel-float-left w-68">
                    <Form>
                        <div className="pannel-body" style={{ marginBottom: 20 }}>
                            <section className="code-box-meta markdown">
                                <div className="code-box-title">Chi tiết lô sản xuất</div>

                                <div className="code-box-description">
                                    <div className="fl-lef w-15">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Loại NL
                                        </div>
                                        <div className="inline-bolck input-control">
                                        <Input size="small" readOnly value="C" disabled></Input>
                                        </div>
                                    </div>
                                    <div className="fl-lef w-30">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Kế hoạch
                                        </div>
                                        <div className="inline-bolck input-control">
                                            <Select
                                                size="small"
                                                style={{ width: '100%' }}
                                                value={modelManager.productionPlanID}
                                                dropdownStyle={{ maxHeight: 200 }}
                                                placeholder="Chọn mã kế hoạch"
                                                disabled={!optionTaskApp.isEditing || !optionTaskApp.isCreating}
                                                onChange={onChangePlanId}
                                            >
                                                {dataPlanModel && dataPlanModel.map(d => (
                                                    <Option title={d.productionPlanID} key={d.productionPlanID} value={d.productionPlanID}>
                                                        <span>{d.planName}</span>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="fl-lef w-20">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Ngày giao việc
                                        </div>
                                        <div className="inline-bolck input-control">
                                            <DatePicker size="small" disabled={!optionTaskApp.isEditing}
                                            defaultValue={dayjs(modelManager.taskDate)} 
                                            value={dayjs(modelManager.taskDate)} 
                                            format={dateFormat} 
                                            onChange={onChangeTaskDate} 
                                            onPanelChange={onChangeTaskDate}
                                            allowClear={false}/>
                                        </div>
                                    </div>

                                    <div className="fl-lef w-35">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Số chứng từ
                                        </div>
                                        <div className="inline-bolck input-control">
                                        <Input size="small" readOnly value={receiptNoModel} disabled></Input>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="fl-lef w-65">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Người nhận
                                        </div>
                                        <div className="inline-bolck mr-right-5 input-control">
                                            <Select
                                                size="small"
                                                style={{ width: '100%' }}
                                                value={modelManager.userName}
                                                dropdownStyle={{ maxHeight: 200 , overflow: 'auto'}}
                                                placeholder="Chọn loại KH"
                                                disabled={!optionTaskApp.isEditing}
                                                onChange={onChangeUsername}
                                            >
                                                {userInformationModel && userInformationModel.map(d => (
                                                    <Option title={d.fullName} key={d.userName} value={d.userName}>
                                                        <span>{d.fullName} - {d.userName}</span>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="fl-lef w-35">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Mã Kho
                                        </div>
                                        <div className="inline-bolck mr-right-5 input-control   ">
                                            <Select
                                                size="small"
                                                style={{ width: '100%' }}
                                                value={modelManager.storeID}
                                                dropdownStyle={{ maxHeight: 200 }}
                                                placeholder="Chọn loại KH"
                                                disabled={!optionTaskApp.isEditing}
                                                onChange={onChangeStore}
                                            >
                                                {cateStoreModel && cateStoreModel.map(d => (
                                                    <Option title={d.storeID} key={d.storeID} value={d.storeID}>
                                                        <span>{d.storeID} - {d.storeName}</span>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="fl-lef w-65">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Nhà cung cấp
                                        </div>
                                        <div className="inline-bolck mr-right-5 input-control">
                                            <Select
                                                size="small"
                                                style={{ width: '100%' }}
                                                value={modelManager.vendor}
                                                dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                                                placeholder="Chọn loại KH"
                                                disabled={!optionTaskApp.isEditing}
                                                onChange={onChangeVendor}
                                            >
                                                {cateCounterpartyModel && cateCounterpartyModel.map(d => (
                                                    <Option title={d.counterpartyName} key={d.counterpartyID} value={d.counterpartyID}>
                                                        <span>{d.counterpartyID} - {d.counterpartyName}</span>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="fl-lef w-35">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Số lô
                                        </div>
                                        <div className="inline-bolck mr-right-5 input-control   ">
                                            <Select
                                                size="small"
                                                style={{ width: '100%' }}
                                                value={modelManager.productionBatchNo}
                                                dropdownStyle={{ maxHeight: 200 }}
                                                placeholder="Chọn loại KH"
                                                disabled={!optionTaskApp.isEditing}
                                                onChange={onChangeBatchNo}
                                            >
                                                {cateProductionBatchNoModel && cateProductionBatchNoModel.map(d => (
                                                    <Option title={d.productionBatchNoName} key={d.productionBatchNoName} value={d.productionBatchNoName}>
                                                        <span>{d.productionBatchNoName}</span>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="fl-lef w-32">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Chiều dày
                                        </div>
                                        <div className="inline-bolck input-control">
                                            <Select
                                                size="small"
                                                style={{ width: '100%' }}
                                                value={modelManager.thickness}
                                                dropdownStyle={{ maxHeight: 200 }}
                                                placeholder="Chọn chiều dày"
                                                disabled={!optionTaskApp.isEditing}
                                                onChange={onChangeThickness}
                                            >
                                                {cateThicknessModel && cateThicknessModel.map(d => (
                                                    <Option title={d.thicknessName} key={d.thicknessName} value={d.thicknessID}>
                                                        <span>{d.thicknessName}</span>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="fl-lef w-33">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Chiều rộng
                                        </div>
                                        <div className="inline-bolck input-control">
                                            <Select
                                                size="small"
                                                style={{ width: '100%' }}
                                                value={modelManager.width}
                                                dropdownStyle={{ maxHeight: 200 }}
                                                placeholder="Chọn loại KH"
                                                disabled={!optionTaskApp.isEditing}
                                                onChange={onChangeWidth}
                                            >
                                                {cateWidthModel && cateWidthModel.map(d => (
                                                    <Option title={d.widthName} key={d.widthName} value={d.widthID}>
                                                        <span>{d.widthName}</span>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="fl-lef w-35">
                                        <div className="lable-cotrol inline-bolck mr-right-5 ">
                                            Số lượng
                                        </div>
                                        <div className="inline-bolck mr-right-5 input-control">
                                            <Input
                                                size="small"
                                                placeholder="Số lượng sản phẩm"
                                                disabled={!optionTaskApp.isEditing}
                                                onChange={onChangeQuantity}
                                                value={modelManager.quantity} min={1} max={99}
                                                type="number"
                                                required />
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="text-right">
                                        <div className=".fl-lef w-100">
                                            <div className="lable-cotrol inline-bolck mr-right-5 w-20">
                                                Kết thúc sản xuất
                                            </div>
                                            <div className="inline-bolck mr-right-5 input-control w-3">
                                                <Checkbox name="isFinish" disabled={!optionTaskApp.isEditing} checked={modelManager.isFinish} onChange={handleChangeIsFinish}></Checkbox>

                                            </div>
                                            <div className="lable-cotrol inline-bolck mr-right-5 w-1">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </section>
                        </div>
                        <div className="clearfix h-5"></div>
                        <div className="pannel-footer">
                            {optionTaskApp.isEditing ?
                                <div>
                                    <Button className="button" shape="default" loading={optionTaskApp.isSubmit} type="primary" icon={<SaveOutlined />} onClick={e => SaveTaskApp(e)}>Lưu</Button>
                                    <Button className="button" shape="default" disabled={optionTaskApp.isSubmit} type="dashed" icon={<CloseOutlined />} onClick={e => CancelTaskApp(e)} danger>Hủy</Button>
                                </div>
                                :
                                <div>
                                    <Button className="button" type="primary" icon={<PlusOutlined />} onClick={e => AddTaskApp(e)}>Thêm</Button>
                                    <Button className="button" type="primary" icon={<EditOutlined />} onClick={e => EditTaskApp(e)} >Sửa</Button>
                                    <Button className="button" type="primary" icon={<DeleteOutlined />} onClick={e => DeleteTaskApp(e)} danger>Xóa</Button>
                                </div>
                            }
                        </div>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
};
export default TaskDeliveryApp