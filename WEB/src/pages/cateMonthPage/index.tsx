import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Checkbox, Button, message, DatePicker, Modal, Input } from 'antd';
import Icon from '@ant-design/icons'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment from 'moment';
import Container from '../../components/container';
import CateMonthService from '../../services/cateMonthService';
import CateMonth from '../../models/cateMonth';
import { APIStatus } from '../../configs/APIConfig';
import dayjs from 'dayjs';
import {PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined,CloseOutlined} from '@ant-design/icons';

// import './CateMonthPage.scss'
const cateMonthService = new CateMonthService();
const { confirm } = Modal;
const { MonthPicker } = DatePicker;
const CateMonthPage: React.FC = () => {

    const dateFormat = 'MM/YYYY';

    const [model, setModel] = useState({ lst: Array<CateMonth>(), loading: true });
    const dataModelManagerInit = {
        monthID: dayjs(new Date()).format("YYYYMM"),
        explainDetail: "Tháng " + moment(new Date()).format("MM") + " Năm " + moment(new Date()).format("YYYY"),
        isLock: false
    };
    const [modelManager, setModelManager] = useState((() => {
        let dataInit: CateMonth = dataModelManagerInit
        return dataInit;
    }));
    const [dataSelectCateMonth, setDataSelectCateMonth] = useState((() => {
        let dataInit = { model: dataModelManagerInit, monthID: "" }
        return dataInit;
    }));
    const [optionCateMonth, setOptionCateMonth] = useState((() => {
        let dataInit = { monthID: '', isEditing: false, isSubmit: false, isCreate:false};
        return dataInit;
    }));
    useEffect(() => {
        LoadCateMonth();
    }, []);

    const LoadCateMonth = async (callback?: any) => {
        var dataCateMonth = await cateMonthService.GetList();
        setModel({
            ...model,
            lst: dataCateMonth.data,
            loading: false
        });
        setTimeout(() => {
            if (callback) callback(dataCateMonth.data);
        }, 300);
    }

    const onSelectCateMonth = (selection: CateMonth, dataInit?: Array<CateMonth>) => {
        if (optionCateMonth.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectCateMonth({ ...dataSelectCateMonth, model: dataModelManagerInit, monthID: "" });
        }
        else {

            var CateMonthItem: CateMonth = dataModelManagerInit;
            if (dataInit) {
                CateMonthItem = dataInit.find((element) => {
                    return element.monthID === selection.monthID;
                }) || dataModelManagerInit;
            }
            else {
                CateMonthItem = model.lst.find((element) => {
                    return element.monthID === selection.monthID;
                }) || dataModelManagerInit;
            }
            setModelManager(CateMonthItem);
            setDataSelectCateMonth({ ...dataSelectCateMonth, model: CateMonthItem });

            setOptionCateMonth(prevState => ({
                ...prevState,
                monthID: CateMonthItem.monthID,
                isEditing: false,
                isSubmit: false,
            }));

        }
    }

    const onChangeNgayCateMonth = async (date: any, dateString: string) => {
        if(dateString == null || dateString.length == 0){
            setModelManager({...dataModelManagerInit});
        } else {
            var explainDetail = "Tháng " + dayjs(date).format("MM") + " Năm " + dayjs(date).format("YYYY");
            setModelManager({ ...modelManager, monthID: dayjs(date).format("YYYYMM"), explainDetail: explainDetail });
        }
        
    }

    const handleChangeCKCateMonth = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setModelManager({ ...modelManager, isLock: checked ? true : false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModelManager({ ...modelManager, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const AddCateMonth = (e: any) => {
        setOptionCateMonth(prevState => ({
            ...prevState,
            monthID:"",
            isEditing: true,
            isCreate : true
        }));
        setDataSelectCateMonth({ ...dataSelectCateMonth, model: dataModelManagerInit, monthID: "" });
        setModelManager(dataModelManagerInit);
    }

    const EditCateMonth = (e: any) => {
        if (optionCateMonth.monthID.length <= 0) {
            message.error('Vui lòng chọn thông tin mở sổ để sửa');
            return false;
        }
        setOptionCateMonth(prevState => ({ ...prevState, isEditing: true,isCreate : false }));
    }

    const DeleteCateMonth = (e: any) => {
        if (optionCateMonth.monthID.length <= 0) {
            message.error('Vui lòng chọn thông tin mở sổ để xóa');
            return false;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa mở sổ tháng: ' + optionCateMonth.monthID + '?',
            onOk() {
                OnDeletedCateMonth(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedCateMonth = async (e: any) => {
        var reDelete = await cateMonthService.Delete(optionCateMonth.monthID);;
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            await LoadCateMonth();
            await CancelCateMonth(e);
        }
    }

    const SaveCateMonth = async (e: any) => {
        var data : any ;
        setOptionCateMonth({ ...optionCateMonth, isSubmit: true });
        if(optionCateMonth.isCreate){
            data = await cateMonthService.Create(modelManager);
        } else {
            data = await cateMonthService.Update(modelManager);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
        }
        else {
            message.success('Cập nhật mở sổ thành thành công');
            CancelCateMonth(e);
            await LoadCateMonth(function (datas: Array<CateMonth>) {
                var CateMonthItem = datas.find((element) => {
                    return element.monthID === data.data;
                });
                if (CateMonthItem) {
                    onSelectCateMonth(CateMonthItem, datas);
                }
            });
        }
        setOptionCateMonth({ ...optionCateMonth, isSubmit: false });
    }

    const CancelCateMonth = async (e: any) => {
        setOptionCateMonth(prevState => ({
            ...prevState,
            monthID:"",
            isEditing: false
        }));
        setDataSelectCateMonth({ ...dataSelectCateMonth, model: dataModelManagerInit, monthID: "" });
        setModelManager(dataModelManagerInit);
    }
    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-float-left w-40">
                    <div className="pannel-header">
                        THÔNG TIN MỞ SỔ
                    </div>
                    <div className="pannel-full-body">
                        <Container isLoading={model.loading}>
                            <DataGrid
                                //filterable
                                data={model.lst}
                                style={{ height: (window.innerHeight - 140), overflow: 'auto' }}
                                selectionMode="single"
                                selection={dataSelectCateMonth.model}
                                onSelectionChange={onSelectCateMonth}>
                                {/* <GridColumn field="id" title="id" width="15%" align="center" /> */}
                                <GridColumn field="monthID" title="Tháng" width="30%" align="center" />
                                <GridColumn field="explainDetail" title="Diễn giải" width="50%" align="center" />
                                <GridColumn field="isLock" title="Khóa" width="20%" align="center"
                                    header={() => <span>Khóa</span>}
                                    render={({ row }: any) => (
                                        <Checkbox
                                            checked={row.isLock}
                                        ></Checkbox>
                                    )}
                                />
                            </DataGrid>
                        </Container>
                    </div>
                </div>
                <div className="page-pannel-float-left w-60">
                    <div className="pannel-body" style={{ marginBottom: 20 }}>
                        <section className="code-box-meta markdown">
                            <div className="code-box-title">Thông tin mở sổ</div>
                            <div className="code-box-description">
                                <div className="text-left">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Tháng
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-20">
                                        <MonthPicker disabled={!optionCateMonth.isCreate || !optionCateMonth.isEditing } onChange={onChangeNgayCateMonth} value={dayjs(modelManager.monthID, "YYYYMM")} defaultValue={dayjs(dataModelManagerInit.monthID, "YYYYMM")} format={dateFormat} size="small"  />
                                    </div>
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Diễn giải
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                        <Input size="small" disabled={!optionCateMonth.isEditing} name="explainDetail" value={modelManager.explainDetail} onChange={handleChangeInput} />
                                    </div>
                                    <div className="inline-bolck w-15 text-center">
                                        <Checkbox disabled={!optionCateMonth.isEditing} onChange={handleChangeCKCateMonth} checked={modelManager.isLock} name="isLock">Khóa</Checkbox>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </section>
                    </div>
                    <div className="pannel-footer">
                        {optionCateMonth.isEditing ?
                            <div>
                                <Button className="button" shape="default" loading={optionCateMonth.isSubmit} type="primary" icon={<SaveOutlined/>} onClick={e => SaveCateMonth(e)}>Lưu</Button>
                                <Button className="button" shape="default" disabled={optionCateMonth.isSubmit} type="dashed" icon={<CloseOutlined/>} onClick={e => CancelCateMonth(e)} danger>Hủy</Button>
                            </div>
                            :
                            <div>
                                <Button className="button" type="primary"  icon={<PlusOutlined />}  onClick={e => AddCateMonth(e)}>Thêm</Button>
                                <Button className="button" type="primary"  icon={<EditOutlined />} onClick={e => EditCateMonth(e)} >Sửa</Button>
                                <Button className="button" type="primary"  icon={<DeleteOutlined />} onClick={e => DeleteCateMonth(e)} danger>Xóa</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateMonthPage;