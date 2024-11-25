import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, Modal, Input } from 'antd';
import GalvanizedOrganizationService from '../../services/cateGalvanizedOrganizationService';
import GalvanizedOrganizationModels from '../../models/cateGalvanizedOrganization';
import { APIStatus } from '../../configs/APIConfig';
import {PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined,CloseOutlined} from '@ant-design/icons';

const galvanizedOrganizationService = new GalvanizedOrganizationService();

const { confirm } = Modal;
const CateGalvanizedOrganization: React.FC = () => {        
    const [model, setModel] = useState({ lst: Array<GalvanizedOrganizationModels>(), loading: true });
    const dataModelManagerInit = {
        galvanizedOrganizationID: '',        
        galvanizedOrganizationName: '',
    };
    const [modelManager, setModelManager] = useState((() => {
        let dataInit: GalvanizedOrganizationModels = dataModelManagerInit
        return dataInit;
    }));
    const [dataSelectGalvanizedOrganization, setDataSelectGalvanizedOrganization] = useState((() => {
        let dataInit = { model: dataModelManagerInit, galvanizedOrganizationID: '' }
        return dataInit;
    }));
    const [optionGalvanizedOrganization, setOptionGalvanizedOrganization] = useState((() => {
        let dataInit = { galvanizedOrganizationID: '', name: '', isEditing: false, isSubmit: false, isCreate: false };
        return dataInit;
    }));
    const [selectDVMaGC, setSelectDVMaGC] = useState((() => {
        let dataInit: GalvanizedOrganizationModels = {} as any;
        return dataInit;
    })); 

    useEffect(() => {
        LoadGalvanizedOrganization();
    }, []);

    const LoadGalvanizedOrganization = async (callback?: any) => {
        var dataGalvanizedOrganization = await galvanizedOrganizationService.GetList();
        setModel({
            ...model,
            lst: dataGalvanizedOrganization.data,
            loading: false
        });
        setTimeout(() => {
            if (callback) callback(dataGalvanizedOrganization.data);
        }, 300);
    }    
    
    const onSelectGalvanizedOrganization = (selection: GalvanizedOrganizationModels, dataInit?: Array<GalvanizedOrganizationModels>) => {
        if (optionGalvanizedOrganization.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectGalvanizedOrganization({ ...dataSelectGalvanizedOrganization, model: dataModelManagerInit, galvanizedOrganizationID: '' });            
        }
        else {            
            var DVMaGCItem: GalvanizedOrganizationModels = dataModelManagerInit;
            if (dataInit) {
                DVMaGCItem = dataInit.find((element) => {
                    return element.galvanizedOrganizationID === selection.galvanizedOrganizationID;
                }) || dataModelManagerInit;
            }
            else {
                DVMaGCItem = model.lst.find((element) => {
                    return element.galvanizedOrganizationID === selection.galvanizedOrganizationID;
                }) || dataModelManagerInit;
            }
           
            setModelManager(DVMaGCItem);
            setDataSelectGalvanizedOrganization({ ...dataSelectGalvanizedOrganization, model: DVMaGCItem });

            setOptionGalvanizedOrganization(prevState => ({
                ...prevState,
                galvanizedOrganizationID: DVMaGCItem.galvanizedOrganizationID,
                name: DVMaGCItem.galvanizedOrganizationName,
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

    const AddGalvanizedOrganization = (e: any) => {
        setOptionGalvanizedOrganization(prevState => ({
            ...prevState,
            galvanizedOrganizationID:"",
            isEditing: true,
            isCreate: true 
        }));
        setDataSelectGalvanizedOrganization({ ...dataSelectGalvanizedOrganization, model: dataModelManagerInit, galvanizedOrganizationID: '' });
        setModelManager(dataModelManagerInit);
    }

    const EditGalvanizedOrganization = (e: any) => {
        if (optionGalvanizedOrganization.galvanizedOrganizationID.length <= 0) {
            message.error('Vui lòng chọn thông tin để sửa');
            return false;
        }
        setOptionGalvanizedOrganization(prevState => ({ ...prevState, isEditing: true, isCreate:false }));
    }

    const DeleteGalvanizedOrganization = (e: any) => {       
        if (optionGalvanizedOrganization.galvanizedOrganizationID.length <= 0) {            
            message.error('Vui lòng chọn thông tin để xóa');
            return false;
        }
        confirm({            
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa danh mục: ' + optionGalvanizedOrganization.name + '?',
            onOk() {
                OnDeletedDVMaGC(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedDVMaGC = async (e: any) => {
        var reDelete = await galvanizedOrganizationService.Delete(optionGalvanizedOrganization.galvanizedOrganizationID);;
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {                        
            await LoadGalvanizedOrganization();
            await CancelGalvanizedOrganization(e);
        }
    }

    const SaveGalvanizedOrganization = async (e: any) => {
        // e.preventDefault();
        var data : any ;
        if (modelManager.galvanizedOrganizationID === '') {
            message.error('Vui lòng nhập mã đơn vị mạ gia công');
            return false;
        } 
        if (modelManager.galvanizedOrganizationName === '') {
            message.error('Vui lòng nhập tên đơn vị mạ gia công');
            return false;
        } 
        const existingStandard = model.lst.find(item => item.galvanizedOrganizationID === modelManager.galvanizedOrganizationID);
        if (existingStandard && (optionGalvanizedOrganization.isCreate || existingStandard.galvanizedOrganizationID !== optionGalvanizedOrganization.galvanizedOrganizationID)) {
            message.error('Mã đã tồn tại trong danh sách');
            setOptionGalvanizedOrganization({ ...optionGalvanizedOrganization, isSubmit: false });
            return;
        }
        setOptionGalvanizedOrganization({ ...optionGalvanizedOrganization, isSubmit: true });
        if(optionGalvanizedOrganization.isCreate){
            data = await galvanizedOrganizationService.Create(modelManager);
        } else {
            data = await galvanizedOrganizationService.Update(modelManager);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionGalvanizedOrganization({ ...optionGalvanizedOrganization, isSubmit: false });
        }
        else {
            message.success('Cập nhật thành công');
            CancelGalvanizedOrganization(e);
            await LoadGalvanizedOrganization(function (datas: Array<GalvanizedOrganizationModels>) {
                var DVMaGCItem = datas.find((element) => {
                    return element.galvanizedOrganizationID === data.data;
                });
                if (DVMaGCItem) {
                    onSelectGalvanizedOrganization(DVMaGCItem, datas);                    
                }
            });
        }
    }    
   
    const CancelGalvanizedOrganization = async (e: any) => {
        setOptionGalvanizedOrganization(prevState => ({
            ...prevState,
            galvanizedOrganizationID:"",
            isEditing: false
        }));
        setDataSelectGalvanizedOrganization({ ...dataSelectGalvanizedOrganization, model: dataModelManagerInit, galvanizedOrganizationID: '' });
        setModelManager(dataModelManagerInit);
    }
    const hilightrow = (row : GalvanizedOrganizationModels) => {
        if (row.galvanizedOrganizationID === modelManager.galvanizedOrganizationID) {
          return { background: "#57b4bd ", color: "#fff" };
        }
        return null;
    };

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-float-left w-40">
                    <div className="pannel-header">
                        DANH MỤC ĐƠN VỊ MẠ GIA CÔNG
                    </div>
                    <div className="pannel-full-body">                        
                            <DataGrid
                                filterable
                                filterRules={[]}
                                data={model.lst}
                                style={{ height: (window.innerHeight - 120) }}
                                selectionMode="single"
                                onSelectionChange={onSelectGalvanizedOrganization}
                                selection={selectDVMaGC}
                                rowCss={hilightrow}
                                >                                
                                <GridColumn field="galvanizedOrganizationID" title="Mã" width="35%" align="center" />
                                <GridColumn field="galvanizedOrganizationName" title="Tên" width="60%" align="center"/>                                                   
                            </DataGrid>                        
                    </div>
                </div>
                <div className="page-pannel-float-left w-60">
                    <div className="pannel-body" style={{ marginBottom: 20 }}>
                        <section className="code-box-meta markdown">
                            <div className="code-box-title">Thông tin đơn vị mạ gia công</div>
                            <div className="code-box-description">
                                <div className="text-left">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Mã
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                        <Input disabled={!optionGalvanizedOrganization.isCreate || !optionGalvanizedOrganization.isEditing} size="small"  maxLength={10} name="galvanizedOrganizationID" value={modelManager.galvanizedOrganizationID} onChange={handleChangeInput} />
                                    </div>     
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Tên
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                        <Input size="small" disabled={!optionGalvanizedOrganization.isEditing} name="galvanizedOrganizationName" value={modelManager.galvanizedOrganizationName} onChange={handleChangeInput} />
                                    </div>                                    
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </section>
                    </div>
                    <div className="pannel-footer">
                        {optionGalvanizedOrganization.isEditing ?
                            <div>
                            <Button className="button" shape="default" loading={optionGalvanizedOrganization.isSubmit} type="primary" icon={<SaveOutlined/>} onClick={e => SaveGalvanizedOrganization(e)}>Lưu</Button>
                            <Button className="button" shape="default" disabled={optionGalvanizedOrganization.isSubmit} type="dashed" icon={<CloseOutlined/>} onClick={e => CancelGalvanizedOrganization(e)} danger>Hủy</Button>
                        </div>
                        :
                        <div>
                            <Button className="button" type="primary"  icon={<PlusOutlined />}  onClick={e => AddGalvanizedOrganization(e)}>Thêm</Button>
                            <Button className="button" type="primary"  icon={<EditOutlined />} onClick={e => EditGalvanizedOrganization(e)} >Sửa</Button>
                            <Button className="button" type="primary"  icon={<DeleteOutlined />} onClick={e => DeleteGalvanizedOrganization(e)} danger>Xóa</Button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateGalvanizedOrganization;