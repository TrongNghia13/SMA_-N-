import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, Form, Col, Modal, Input, Checkbox, Select, DatePicker } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import CateProductionPlanService from '../../services/cateProductionPlanService';
import CatePlanTypeService from '../../services/catePlanTypeService';
import { APIStatus } from '../../configs/APIConfig';
import Cate_ProductionPlan from '../../models/cateProductionPlan';
import Cate_PlanType from '../../models/catePlanType';
import moment from 'moment';
import LoginUtils from '../../utils/loginUtils';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import cateProductionPlan from '../../models/cateProductionPlan';
import { log } from 'console';

const cateProductionPlanService = new CateProductionPlanService();
const catePlanTypeService = new CatePlanTypeService();
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const { confirm } = Modal;
const CateProductionPlan: React.FC = () => {
    const [model, setModel] = useState({ lst: Array<Cate_ProductionPlan>(), loading: true });
    const userLoginInfo = LoginUtils.GetInfo();

    const dataModelManagerInit = {
        productionPlanID: '', //ma
        branchID: (userLoginInfo.BranchId), //madv
        planTypeID: 'KHXB', //lct
        planNo: '', //soct
        planName: '',
        planDate: new Date(Date.now()),
        planDescription: '',
        isFinish: false,

    };
    const [planIdModel, setPlanIdModel] = useState((() => {
        let dataInit = ""
        return dataInit;
    }));


    const [modelManager, setModelManager] = useState((() => {
        let dataInit: Cate_ProductionPlan = dataModelManagerInit
        return dataInit;
    }));
    const [dataSelectProductionPlan, setDataSelectProductionPlan] = useState((() => {
        let dataInit = { model: dataModelManagerInit, productionPlanID: "" }
        return dataInit;
    }));

    const [optionProductionPlan, setOptionProductionPlan] = useState((() => {
        let dataInit = { productionPlanID: '', planName: '', isEditing: false, isSubmit: false, isCreate: false };
        return dataInit;
    }));

    useEffect(() => {
        async function GetData() {
            await LoadProductionPlan();
            await GetDataPlanType();
        };
        GetData();
    }, []);

    const [dataPlanType, setDataPlanType] = useState((() => {
        let dataInit: Array<Cate_PlanType> = [] as any;
        return dataInit;
    }));
    const GetDataPlanType = async () => {
        var getDdata = await catePlanTypeService.GetList();
        setDataPlanType(getDdata.data);
    }


    const handleChangeCheckBox = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setModelManager({ ...modelManager, [name || '']: checked });
    }

    const LoadProductionPlan = async (callback?: any) => {
        const userLoginInfo = LoginUtils.GetInfo();
        var dataLoSX = await cateProductionPlanService.GetListPlanByBranchID(userLoginInfo.BranchId);
        setModel({
            ...model,
            lst: dataLoSX.data,
            loading: false
        });
        setTimeout(() => {
            if (callback) callback(dataLoSX.data);
        }, 300);
    }

    // const [selectedDate, setSelectedDate] = useState();
    const onSelectLoSX = (selection: Cate_ProductionPlan, dataInit?: Array<Cate_ProductionPlan>) => {
        if (optionProductionPlan.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectProductionPlan({ ...dataSelectProductionPlan, model: dataModelManagerInit, productionPlanID: '' });
        }
        else {
            var losxItem: Cate_ProductionPlan = dataModelManagerInit;
            if (dataInit) {
                losxItem = dataInit.find((element) => {
                    return element.productionPlanID === selection.productionPlanID;
                }) || dataModelManagerInit;
            }
            else {
                losxItem = model.lst.find((element) => {
                    return element.productionPlanID === selection.productionPlanID;
                }) || dataModelManagerInit;
            }
            setModelManager(losxItem);
            setDataSelectProductionPlan({ ...dataSelectProductionPlan, model: losxItem });

            setOptionProductionPlan(prevState => ({
                ...prevState,
                productionPlanID: losxItem.productionPlanID,
                planName: losxItem.planName,
                isEditing: false,
                isSubmit: false,
            }));
        }
    }

    const onChangePlanDate = async (date: any, dateString: string) => {
        var getData = await cateProductionPlanService.GetPlanNo(date != null ? dayjs(date).format("YYYY-MM-DD") : "", modelManager.planTypeID, modelManager.branchID);
        let planNo = "0";
        if (getData != null && getData.data != null) {
            planNo = getData.data;
        }
        var dateSub = dayjs(date).format("MM/YYYY");
        var productionPlanIDFormated = modelManager.planTypeID + '-' + dateSub + '-' + modelManager.branchID + '-' + planNo;
        setModelManager({ ...dataModelManagerInit, planDate: date, planNo: planNo, productionPlanID: productionPlanIDFormated });
    }

    const onchangePlanType = async (value: any) => {
        // const formatPlantDate=null;
        var getData = await cateProductionPlanService.GetPlanNo(modelManager.planDate != null ? dayjs(modelManager.planDate).format("YYYY-MM-DD") : "", value, modelManager.branchID);
        let planNo = "0";
        if (getData != null && getData.data != null) {
            planNo = getData.data;
        }
        var dateSub = dayjs(modelManager.planDate).format("MM/YYYY");
        var productionPlanIDFormated = value + '-' + dateSub + '-' + modelManager.branchID + '-' + planNo;
        setModelManager({ ...modelManager, planTypeID: value, planDate: modelManager.planDate, planNo: planNo, productionPlanID: productionPlanIDFormated });

    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModelManager({ ...modelManager, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const AddProductionPlan = (e: any) => {
        
        setOptionProductionPlan(prevState => ({
            ...prevState,
            productionPlanID: "",
            isEditing: true,
            isCreate: true
        }));
        setDataSelectProductionPlan({ ...dataModelManagerInit, model: dataModelManagerInit, productionPlanID: '' });
        setModelManager(dataModelManagerInit);
        // dataModelManagerInit.planDate = selectedDate;
        setPlanIdModel(dataModelManagerInit.planTypeID);
        onChangePlanDate(new Date(), "");
    }

    const EditProductionPlan = (e: any) => {
        if (optionProductionPlan.productionPlanID.length <= 0) {
            message.error('Vui lòng chọn thông tin để sửa');
            return false;
        }
        setOptionProductionPlan(prevState => ({ ...prevState, isEditing: true, isCreate: false }));
    }

    const DeleteProductionPlan = (e: any) => {
        if (optionProductionPlan.productionPlanID.length <= 0) {
            message.error('Vui lòng chọn thông tin để xóa');
            return false;
        }
        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa lô sản xuất: ' + optionProductionPlan.productionPlanID + '?',
            onOk() {
                OnDeletedLoSX(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedLoSX = async (e: any) => {
        var reDelete = await cateProductionPlanService.Delete(encodeURIComponent(optionProductionPlan.productionPlanID));;
        if (reDelete.status === APIStatus.ERROR) {
            message.error("Có lỗi trong quá trình xoá");
        }
        else {
            await LoadProductionPlan();
            await CancelProductionPlan(e);
        }
    }

    const SaveProductionPlan = async (e: any) => {
        var data: any;
        if (modelManager.planTypeID === '') {
            message.error('Vui lòng chọn loại KH');
            return false;
        }
        if (modelManager.planName === '') {
            message.error('Vui lòng nhập Mã lô KH');
            return false;
        }
        setOptionProductionPlan({ ...optionProductionPlan, isSubmit: true });
        if (optionProductionPlan.isCreate) {
            // modelManager.productionPlanID = planIdModel;
            data = await cateProductionPlanService.Create(modelManager);
        } else {
            data = await cateProductionPlanService.Update(modelManager);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionProductionPlan({ ...optionProductionPlan, isSubmit: false });
        }
        const existingStandard = model.lst.find(item => item.productionPlanID === modelManager.productionPlanID);
        // setModelManager({...modelManager, productionPlanID: planIdModel});
        if (existingStandard && (optionProductionPlan.isCreate || existingStandard.productionPlanID !== optionProductionPlan.productionPlanID)) {
            message.error('Mã đã tồn tại trong danh sách');
            setOptionProductionPlan({ ...optionProductionPlan, isSubmit: false });
            return;
        }

        else {
            message.success('Cập nhật thành công');
            CancelProductionPlan(e);
            await LoadProductionPlan(function (datas: Array<cateProductionPlan>) {
                var standardItem = datas.find((element) => {
                    return element.productionPlanID === data.data;
                });
                if (standardItem) {
                    onSelectLoSX(standardItem, datas);
                }
            });
        } setOptionProductionPlan({ ...optionProductionPlan, isSubmit: false });
    }

    const CancelProductionPlan = async (e: any) => {
        setOptionProductionPlan(prevState => ({
            ...prevState,
            productionPlanID: "",
            isEditing: false
        }));
        setDataSelectProductionPlan({ ...dataSelectProductionPlan, model: dataModelManagerInit, productionPlanID: "" });
        setModelManager(dataModelManagerInit);
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-float-left w-50">
                    <div className="pannel-header">
                        DANH MỤC LÔ SẢN XUẤT
                    </div>
                    <div className="pannel-full-body">
                        <DataGrid
                            filterable
                            filterRules={[]}
                            data={model.lst}
                            style={{ height: (window.innerHeight - 120) }}
                            selectionMode="single"
                            onSelectionChange={onSelectLoSX}>
                            <GridColumn field="productionPlanID" title="Mã lô" width="25%" align="center" />
                            <GridColumn field="planName" title="Tên lô" width="45%" align="center" />
                            <GridColumn field="planDate" title="Ngày tạo" width="20%" align="center"
                                header={() => <span>Ngày tạo</span>}
                                render={({ row }: any) => (
                                    <span>{moment(row.planDate).format('DD/MM/YYYY')}</span>
                                )}
                            />
                            <GridColumn field="isFinish" title="Kết thúc" width="10%" align="center"
                                header={() => <span>Kết thúc</span>}
                                render={({ row }: any) => (
                                    <Checkbox
                                        checked={row.isFinish == 1 ? true : false}
                                    ></Checkbox>
                                )}
                            />
                        </DataGrid>
                    </div>
                </div>
                <div className="page-pannel-float-left w-50">
                    <div className="pannel-body" style={{ marginBottom: 20 }}>
                        <section className="code-box-meta markdown">
                            <div className="code-box-title">Chi tiết lô sản xuất</div>
                            <div className="code-box-description">
                                <div className="fl-lef w-50">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Loại KH
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-60">
                                        <Select
                                            size="small"
                                            style={{ width: '100%' }}
                                            value={modelManager.planTypeID}
                                            dropdownStyle={{ maxHeight: 100, overflow: 'auto' }}
                                            placeholder="Chọn loại KH"
                                            disabled={!optionProductionPlan.isEditing}
                                            onChange={onchangePlanType}
                                        >
                                            {dataPlanType && dataPlanType.map(d => (
                                                <Option title={d.planTypeName} key={d.planTypeID} value={d.planTypeID}>
                                                    <span>{d.planTypeID} - {d.planTypeName}</span>
                                                </Option>
                                            ))}

                                        </Select>
                                    </div>
                                </div>
                                <div className="fl-lef w-50">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Ngày CT
                                    </div>
                                    <div className="inline-bolck input-control">
                                        <DatePicker
                                            disabled={!optionProductionPlan.isCreate || !optionProductionPlan.isEditing}
                                            size="small"
                                            onChange={onChangePlanDate}
                                            value={dayjs(modelManager.planDate)}
                                            format={dateFormat}
                                            allowClear={false}
                                        />

                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="fl-lef w-50">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Mã lô KH
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-60">

                                        <Input readOnly value={modelManager.productionPlanID} disabled={true} size="small" name='productionPlanID' maxLength={20} onChange={handleChangeInput} />
                                    </div>
                                </div>
                                <div className="fl-lef w-50">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Số CT
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-60">

                                        <Input readOnly size="small" disabled={true} name="planNo" value={modelManager.planNo} onChange={handleChangeInput} />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="fl-lef w-100">
                                    <div className="lable-cotrol inline-bolck mr-right-5">
                                        Tên lô SX
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-80">
                                        <Input size="small" disabled={!optionProductionPlan.isEditing} maxLength={100} name="planName" value={modelManager.planName} onChange={handleChangeInput} />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="fl-lef w-100">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Ghi chú
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-80">
                                        <Input size="small" disabled={!optionProductionPlan.isEditing} maxLength={200} name="planDescription" value={modelManager.planDescription} onChange={handleChangeInput} />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="text-right">
                                    <div className=".fl-lef w-100">
                                        <div className="lable-cotrol inline-bolck mr-right-5 w-20">
                                            Kết thúc sản xuất
                                        </div>
                                        <div className="inline-bolck mr-right-5 input-control w-3">
                                            <Checkbox 
                                            name="isFinish" disabled={!optionProductionPlan.isEditing} checked={modelManager.isFinish == true ? true : false} onChange={handleChangeCheckBox}></Checkbox>
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
                        {optionProductionPlan.isEditing ?
                            <div>
                                <Button className="button" shape="default" loading={optionProductionPlan.isSubmit} type="primary" icon={<SaveOutlined />} onClick={e => SaveProductionPlan(e)}>Lưu</Button>
                                <Button className="button" shape="default" disabled={optionProductionPlan.isSubmit} type="dashed" icon={<CloseOutlined />} onClick={e => CancelProductionPlan(e)} danger>Hủy</Button>
                            </div>
                            :
                            <div>
                                <Button className="button" type="primary" icon={<PlusOutlined />} onClick={e => AddProductionPlan(e)}>Thêm</Button>
                                <Button className="button" type="primary" icon={<EditOutlined />} onClick={e => EditProductionPlan(e)} >Sửa</Button>
                                <Button className="button" type="primary" icon={<DeleteOutlined />} onClick={e => DeleteProductionPlan(e)} danger>Xóa</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateProductionPlan;