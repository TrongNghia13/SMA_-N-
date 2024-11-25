import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, Modal, Input } from 'antd';
import CateStandardController from '../../services/cateStandardService';
import CateStandard from '../../models/cateStandard';
import { APIStatus } from '../../configs/APIConfig';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

const cateStandardController = new CateStandardController();
const { confirm } = Modal;
const CateStandardPage: React.FC = () => {
    const [model, setModel] = useState({ lst: Array<CateStandard>(), loading: true });
    const dataModelManagerInit = {
        standardID: '',
        standardName: '',
    };
    const [modelManager, setModelManager] = useState((() => {
        let dataInit: CateStandard = dataModelManagerInit
        return dataInit;
    }));
    const [dataSelectCateStandard, setDataSelectCateStandard] = useState((() => {
        let dataInit = { model: dataModelManagerInit, standardID: "" }
        return dataInit;
    }));
    const [optionCateStandard, setOptionCateStandard] = useState((() => {
        let dataInit = { standardID: '', isEditing: false, isSubmit: false, isCreate: false };
        return dataInit;
    }));
    const [selectStandard, setSelectStandard] = useState((() => {
        let dataInit: CateStandard = {} as any;
        return dataInit;
    }));

    useEffect(() => {
        LoadCateStandard();
    }, []);

    const LoadCateStandard = async (callback?: any) => {
        var dataCateStandard = await cateStandardController.GetList();
        setModel({
            ...model,
            lst: dataCateStandard.data,
            loading: false
        });
        setTimeout(() => {
            if (callback) callback(dataCateStandard.data);
        }, 300);
    }

    const onSelectStandard = (selection: CateStandard, dataInit?: Array<CateStandard>) => {
        if (optionCateStandard.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectCateStandard({ ...dataSelectCateStandard, model: dataModelManagerInit, standardID: "" });
        }
        else {
            var standardItem: CateStandard = dataModelManagerInit;
            if (dataInit) {
                standardItem = dataInit.find((element) => {
                    return element.standardID === selection.standardID;
                }) || dataModelManagerInit;
            }
            else {
                standardItem = model.lst.find((element) => {
                    return element.standardID === selection.standardID;
                }) || dataModelManagerInit;
            }
            setModelManager(standardItem);
            setDataSelectCateStandard({ ...dataSelectCateStandard, model: standardItem });

            setOptionCateStandard(prevState => ({
                ...prevState,
                standardID: standardItem.standardID,
                standardName: standardItem.standardName,
                isEditing: false,
                isSubmit: false,
            }));
        }
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModelManager({ ...modelManager, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const AddStandard = (e: any) => {
        setOptionCateStandard(prevState => ({
            ...prevState,
            standardID: "",
            isEditing: true,
            isCreate: true
        }));
        setDataSelectCateStandard({ ...dataSelectCateStandard, model: dataModelManagerInit, standardID: '' });
        setModelManager(dataModelManagerInit);
    }

    const EditStandard = (e: any) => {
        if (optionCateStandard.standardID.length <= 0) {
            message.error('Vui lòng chọn thông tin để sửa');
            return false;
        }
        setOptionCateStandard(prevState => ({ ...prevState, isEditing: true, isCreate: false }));
    }

    const DeletedCateStandard = (e: any) => {
        if (optionCateStandard.standardID.length <= 0) {
            message.error('Vui lòng chọn thông tin để xóa');
            return false;
        }
        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa danh mục: ' + optionCateStandard.standardID + '?',
            onOk() {
                OnDeletedCateStandard(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedCateStandard = async (e: any) => {
        var reDelete = await cateStandardController.Delete(optionCateStandard.standardID);;
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            await LoadCateStandard();
            await CancelStandard(e);
        }
    }
   
    const SaveStandard = async (e: any) => {
        var data: any;
        if (modelManager.standardID === '') {
            message.error('Vui lòng nhập mã');
            return false;
        }
        if (modelManager.standardName === '') {
            message.error('Vui lòng nhập tên');
            return false;
        }
        const existingStandard = model.lst.find(item => item.standardID === modelManager.standardID);
        if (existingStandard && (optionCateStandard.isCreate || existingStandard.standardID !== optionCateStandard.standardID)) {
            message.error('Mã đã tồn tại trong danh sách');
            setOptionCateStandard({ ...optionCateStandard, isSubmit: false });
            return;
        }
        setOptionCateStandard({ ...optionCateStandard, isSubmit: true });
        if (optionCateStandard.isCreate) {
            data = await cateStandardController.Create(modelManager);
        } else {
            data = await cateStandardController.Update(modelManager);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionCateStandard({ ...optionCateStandard, isSubmit: false });
        }
        else {
            message.success('Cập nhật thành công');
            CancelStandard(e);
            await LoadCateStandard(function (datas: Array<CateStandard>) {
                var standardItem = datas.find((element) => {
                    return element.standardID === data.data;
                });
                if (standardItem) {
                    onSelectStandard(standardItem, datas);
                }
            });
        }
    }
  

    const CancelStandard = async (e: any) => {
        setOptionCateStandard(prevState => ({
            ...prevState,
            standardID: "",
            isEditing: false
        }));
        setDataSelectCateStandard({ ...dataSelectCateStandard, model: dataModelManagerInit, standardID: "" });
        setModelManager(dataModelManagerInit);
    }
    const hilightrow = (row: CateStandard) => {
        if (row.standardID === modelManager.standardID) {
            return { background: "#57b4bd ", color: "#fff" };
        }
        return null;
    };

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-float-left w-40">
                    <div className="pannel-header">
                        DANH MỤC TIÊU CHUẨN
                    </div>
                    <div className="pannel-full-body">
                        <DataGrid
                            filterable
                            // filterRules={[]}
                            data={model.lst}
                            style={{ height: (window.innerHeight - 120) }}
                            selectionMode="single"
                            onSelectionChange={onSelectStandard}
                            selection={dataSelectCateStandard.model}
                            rowCss={hilightrow}
                        >
                            <GridColumn field="standardID" title="Mã" width="35%" align="center" />
                            <GridColumn field="standardName" title="Tên" width="60%" align="center" />
                        </DataGrid>
                    </div>
                </div>
                <div className="page-pannel-float-left w-60">
                    <div className="pannel-body" style={{ marginBottom: 20 }}>
                        <section className="code-box-meta markdown">
                            <div className="code-box-title">Thông tin tiêu chuẩn</div>
                            <div className="code-box-description">
                                <div className="text-left">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Mã
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                        <Input disabled={!optionCateStandard.isCreate || !optionCateStandard.isEditing} size="small" maxLength={10} name="standardID" value={modelManager.standardID} onChange={handleChangeInput} />
                                    </div>
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Tên
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                        <Input size="small" disabled={!optionCateStandard.isEditing} name="standardName" value={modelManager.standardName} onChange={handleChangeInput} />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </section>
                    </div>
                    <div className="pannel-footer">
                        {optionCateStandard.isEditing ?
                            <div>
                                <Button className="button" shape="default" loading={optionCateStandard.isSubmit} type="primary" icon={<SaveOutlined />} onClick={e => SaveStandard(e)}>Lưu</Button>
                                <Button className="button" shape="default" disabled={optionCateStandard.isSubmit} type="dashed" icon={<CloseOutlined />} onClick={e => CancelStandard(e)} danger>Hủy</Button>
                            </div>
                            :
                            <div>
                                <Button className="button" type="primary" icon={<PlusOutlined />} onClick={e => AddStandard(e)}>Thêm</Button>
                                <Button className="button" type="primary" icon={<EditOutlined />} onClick={e => EditStandard(e)} >Sửa</Button>
                                <Button className="button" type="primary" icon={<DeleteOutlined />} onClick={e => DeletedCateStandard(e)} danger>Xóa</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateStandardPage;