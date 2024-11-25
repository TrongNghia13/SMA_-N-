import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, Modal, Input } from 'antd';
import CateSteelTypeController from '../../services/cateSteelTypeService';
import CATE_STEELTYPE from '../../models/cateSteelType';
import { APIStatus } from '../../configs/APIConfig';
import {PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined,CloseOutlined} from '@ant-design/icons';

const cateSteelTypeController = new CateSteelTypeController();

const { confirm } = Modal;
const CateSteelType: React.FC = () => {        
    const [model, setModel] = useState({ lst: Array<CATE_STEELTYPE>(), loading: true });
    const dataModelManagerInit = {
        steelTypeID: '',        
        steelTypeName: '',
    };
    const [modelManager, setModelManager] = useState((() => {
        let dataInit: CATE_STEELTYPE = dataModelManagerInit
        return dataInit;
    }));
    const [dataSelectsteelType, setDataSelectsteelType] = useState((() => {
        let dataInit = { model: dataModelManagerInit, steelTypeID: '' }
        return dataInit;
    }));
    const [optionsteelType, setOptionsteelType] = useState((() => {
        let dataInit = { steelTypeID: '', isEditing: false, isSubmit: false, isCreate: false };
        return dataInit;
    }));
    const [selectsteelType, setSelectsteelType] = useState((() => {
        let dataInit: CATE_STEELTYPE = {} as any;
        return dataInit;
    })); 

    useEffect(() => {
        LoadCateSteelType();
    }, []);

    const LoadCateSteelType = async (callback?: any) => {
        var dataDMLoaiNL = await cateSteelTypeController.GetList();
        setModel({
            ...model,
            lst: dataDMLoaiNL.data,
            loading: false
        });
        setTimeout(() => {
            if (callback) callback(dataDMLoaiNL.data);
        }, 300);
    }    
    
    const onSelectsteelType = (selection: CATE_STEELTYPE, dataInit?: Array<CATE_STEELTYPE>) => {
        if (optionsteelType.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectsteelType({ ...dataSelectsteelType, model: dataModelManagerInit, steelTypeID: '' });            
        }
        else {            
            var steelTypeItem: CATE_STEELTYPE = dataModelManagerInit;
            if (dataInit) {
                steelTypeItem = dataInit.find((element) => {
                    return element.steelTypeID === selection.steelTypeID;
                }) || dataModelManagerInit;
            }
            else {
                steelTypeItem = model.lst.find((element) => {
                    return element.steelTypeID === selection.steelTypeID;
                }) || dataModelManagerInit;
            }
            // LoaiNLItem.managetype = 2;
            setModelManager(steelTypeItem);
            setDataSelectsteelType({ ...dataSelectsteelType, model: steelTypeItem });

            setOptionsteelType(prevState => ({
                ...prevState,
                steelTypeID: steelTypeItem.steelTypeID,
                steelTypeName: steelTypeItem.steelTypeName,
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

    const AddsteelType = (e: any) => {
        setOptionsteelType(prevState => ({
            ...prevState,
            steelTypeID:"",
            isEditing: true,
            isCreate : true
        }));
        setDataSelectsteelType({ ...dataSelectsteelType, model: dataModelManagerInit, steelTypeID: '' });
        setModelManager(dataModelManagerInit);
    }

    const EditsteelType = (e: any) => {
    if (optionsteelType.steelTypeID.length <= 0) {
        message.error('Không được sửa mã');
        return false;
    }
    setOptionsteelType(prevState => ({ ...prevState, isEditing: true, isCreate : false }));
};
    

    const DeletesteelType = (e: any) => {       
        if (optionsteelType.steelTypeID.length <= 0) {            
            message.error('Vui lòng chọn thông tin để xóa');
            return false;
        }
        confirm({            
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa danh mục: ' + optionsteelType.steelTypeID + '?',
            onOk() {
                OnDeletedsteelType(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedsteelType = async (e: any) => {
        var reDelete = await cateSteelTypeController.Delete(optionsteelType.steelTypeID);;
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {                        
            await LoadCateSteelType();
            await CancelCateSteelType(e);
        }
    }

    const SaveCateSteelType = async (e: any) => {
        var data: any;

        if (modelManager.steelTypeID === '') {
            message.error('Vui lòng nhập mã loại nguyên liệu');
            return false;
        }
    
        if (modelManager.steelTypeName === '') {
            message.error('Vui lòng nhập tên loại nguyên liệu');
            return false;
        }

        setOptionsteelType({ ...optionsteelType, isSubmit: true });
    
        if (optionsteelType.isCreate) {
            data = await cateSteelTypeController.Create(modelManager);
        } else {
            data = await cateSteelTypeController.Update(modelManager);
        }
    
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionsteelType({ ...optionsteelType, isSubmit: false });
        } else {
            message.success('Cập nhật thành công');
            CancelCateSteelType(e);
    
            await LoadCateSteelType(function (datas: Array<CATE_STEELTYPE>) {
                var tieuchuanItem = datas.find((element) => {
                    return element.steelTypeID === data.data;
                });
    
                if (tieuchuanItem) {
                    onSelectsteelType(tieuchuanItem, datas);
                }
            });
        }
    }
    
    const CancelCateSteelType = async (e: any) => {
        setOptionsteelType(prevState => ({
            ...prevState,
            isEditing: false
        }));
        setDataSelectsteelType({ ...dataSelectsteelType, model: dataModelManagerInit, steelTypeID: '' });
        setModelManager(dataModelManagerInit);
    }
    const hilightrow = (row : CATE_STEELTYPE) => {
        if (row.steelTypeID === modelManager.steelTypeID) {
          return { background: "#57b4bd ", color: "#fff" };
        }
        return null;
    };

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-float-left w-40">
                    <div className="pannel-header">
                        DANH MỤC LOẠI NGUYÊN LIỆU
                    </div>
                    <div className="pannel-full-body">                        
                            <DataGrid
                                filterable
                                filterRules={[]}
                                data={model.lst}
                                style={{ height: (window.innerHeight - 120) }}
                                selectionMode="single"
                                onSelectionChange={onSelectsteelType}
                                selection={selectsteelType}
                                rowCss={hilightrow}
                                >                                
                                <GridColumn field="steelTypeID" title="Mã" width="35%" align="center" />
                                <GridColumn field="steelTypeName" title="Tên" width="60%" align="center"/>                                                   
                            </DataGrid>                        
                    </div>
                </div>
                <div className="page-pannel-float-left w-60">
                    <div className="pannel-body" style={{ marginBottom: 20 }}>
                        <section className="code-box-meta markdown">
                            <div className="code-box-title">Thông tin loại nguyên liệu</div>
                            <div className="code-box-description">
                                <div className="text-left">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Mã
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                       <Input size="small" disabled={!optionsteelType.isEditing || !optionsteelType.isCreate} name="steelTypeID" value={modelManager.steelTypeID} onChange={handleChangeInput} />
                                    </div>     
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Tên
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                       <Input size="small" disabled={!optionsteelType.isEditing} name="steelTypeName" value={modelManager.steelTypeName} onChange={handleChangeInput} />
                                    </div>                                    
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </section>
                    </div>
                    <div className="pannel-footer">
                        {optionsteelType.isEditing ?
                            <div>
                            <Button className="button" shape="default" loading={optionsteelType.isSubmit} type="primary" icon={<SaveOutlined/>} onClick={e => SaveCateSteelType(e)}>Lưu</Button>
                            <Button className="button" shape="default" disabled={optionsteelType.isSubmit} type="dashed" icon={<CloseOutlined/>} onClick={e => CancelCateSteelType(e)} danger>Hủy</Button>
                        </div>
                        :
                        <div>
                            <Button className="button" type="primary"  icon={<PlusOutlined />}  onClick={e => AddsteelType(e)}>Thêm</Button>
                            <Button className="button" type="primary"  icon={<EditOutlined />} onClick={e => EditsteelType(e)} >Sửa</Button>
                            <Button className="button" type="primary"  icon={<DeleteOutlined />} onClick={e => DeletesteelType(e)} danger>Xóa</Button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateSteelType;