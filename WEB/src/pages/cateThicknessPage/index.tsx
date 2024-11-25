import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, Modal, Input } from 'antd';
import CateThicknesCotroller from '../../services/cateThicknessService';
import cateThickness from '../../models/cateThickness';
import { APIStatus } from '../../configs/APIConfig';
import {PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined,CloseOutlined} from '@ant-design/icons';

const cateThicknesCotroller = new CateThicknesCotroller();

const { confirm } = Modal;
const CateMonthPage: React.FC = () => {        
    const [model, setModel] = useState({ lst: Array<cateThickness>(), loading: true });
    const datamodelthicknessIDInit = {
        thicknessID: '',        
        thicknessName: '',
       
    };
    const [modelManager, setModelManager] = useState((() => {
        let dataInit: cateThickness = datamodelthicknessIDInit
        return dataInit;
    }));
    const [dataSelectThickness, setDataSelectThickness] = useState((() => {
        let dataInit = { model: datamodelthicknessIDInit, thicknessID: '' }
        return dataInit;
    }));
    const [optionThickness, setOptionThickness] = useState((() => {
        let dataInit = { thicknessID: '', isEditing: false, isSubmit: false, isCreate:false};
        return dataInit;
    }));
    const [selectThickness, setSelectThickness] = useState((() => {
        let dataInit: cateThickness = {} as any;
        return dataInit;
    })); 

    useEffect(() => {
        LoadDMThickness();
    }, []);

    const LoadDMThickness = async (callback?: any) => {
        var dataDMThickness = await cateThicknesCotroller.GetList();
        setModel({
            ...model,
            lst: dataDMThickness.data,
            loading: false
        });
        setTimeout(() => {
            if (callback) callback(dataDMThickness.data);
        }, 300);
    }    
    
    const onselectThickness = (selection: cateThickness, dataInit?: Array<cateThickness>) => {
        if (optionThickness.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectThickness({ ...dataSelectThickness, model: datamodelthicknessIDInit, thicknessID: '' });            
        }
        else {            
            var ThicknessItem: cateThickness = datamodelthicknessIDInit;
            if (dataInit) {
                ThicknessItem = dataInit.find((element) => {
                    return element.thicknessID === selection.thicknessID;
                }) || datamodelthicknessIDInit;
            }
            else {
                ThicknessItem = model.lst.find((element) => {
                    return element.thicknessID === selection.thicknessID;
                }) || datamodelthicknessIDInit;
            }
           
            setModelManager(ThicknessItem);
            setDataSelectThickness({ ...dataSelectThickness, model: ThicknessItem });

            setOptionThickness(prevState => ({
                ...prevState,
                thicknessID: ThicknessItem.thicknessID,
                thicknessName: ThicknessItem.thicknessName,
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

    const AddThickness = (e: any) => {
        setOptionThickness(prevState => ({
            ...prevState,
            isEditing: true,
            isCreate: true
        }));
        setDataSelectThickness({ ...dataSelectThickness, model: datamodelthicknessIDInit, thicknessID: '' });
        setModelManager(datamodelthicknessIDInit);
    }

    const EditThickness = (e: any) => {
        if (optionThickness.thicknessID.length <= 0 ) {
            message.error('Vui lòng chọn thông tin để sửa');
            return false;
        }
        setOptionThickness(prevState => ({ ...prevState, isEditing: true, isCreate:false }));
    }

    const DeleteThickness = (e: any) => {       
        if (optionThickness.thicknessID === '') {            
            message.error('Vui lòng chọn thông tin để xóa');
            return false;
        }
        confirm({            
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa danh mục: ' + optionThickness.thicknessID + '?',
            onOk() {
                OnDeletedThickness(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedThickness = async (e: any) => {
        var reDelete = await cateThicknesCotroller.Delete(optionThickness.thicknessID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {                        
            await LoadDMThickness();
            await CancelThickness(e);
        }
    }

    const SaveCateThickness = async (e: any) => {
        var data : any ;
        if (modelManager.thicknessID === '') {
            message.error('Vui lòng nhập mã');
            return false;
        }
        if (modelManager.thicknessName === '') {
            message.error('Vui lòng nhập tên');
            return false;
        }
        setOptionThickness({ ...optionThickness, isSubmit: true });
        if(optionThickness.isCreate){
            data = await cateThicknesCotroller.Create(modelManager);
        } else {
            data = await cateThicknesCotroller.Update(modelManager);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionThickness({ ...optionThickness, isSubmit: false });
        }
        const existingGalvanizedOrganization = model.lst.find(item => item.thicknessID === modelManager.thicknessID);
        if (existingGalvanizedOrganization && (optionThickness.isCreate || existingGalvanizedOrganization.thicknessID !== optionThickness.thicknessID)) {
            message.error('Mã đã tồn tại trong danh sách');
            setOptionThickness({ ...optionThickness, isSubmit: false });
            return;
        }
        else {
            message.success('Cập nhật Chiều dày thành thành công');
            CancelThickness(e);
            await LoadDMThickness(function (datas: Array<cateThickness>) {
                var ThicknessItem = datas.find((element) => {
                    return element.thicknessID === data.data;
                });
                if (ThicknessItem) {
                    onselectThickness(ThicknessItem, datas);
                }
            });
        }
    }
   
    const CancelThickness = async (e: any) => {
        setOptionThickness(prevState => ({
            ...prevState,
            thicknessID:"",
            isEditing: false
        }));
        setDataSelectThickness({ ...dataSelectThickness, model: datamodelthicknessIDInit, thicknessID: '' });
        setModelManager(datamodelthicknessIDInit);
    }
    const hilightrow = (row:cateThickness) => {
        if (row.thicknessID === modelManager.thicknessID) {
          return { background: "#57b4bd ", color: "#fff" };
        }
        return null;
    };

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-float-left w-40">
                    <div className="pannel-header">
                        DANH MỤC CHIỀU DÀY
                    </div>
                    <div className="pannel-full-body">                        
                            <DataGrid
                                filterable
                                filterRules={[]}
                                data={model.lst}
                                style={{ height: (window.innerHeight - 120) }}
                                selectionMode="single"
                                onSelectionChange={onselectThickness}
                                selection={selectThickness}
                                rowCss={hilightrow}
                                >                                
                                <GridColumn field="thicknessID" title="Mã" width="35%" align="center" />
                                <GridColumn field="thicknessName" title="Tên" width="60%" align="center"/>                                                   
                            </DataGrid>                        
                    </div>
                </div>
                <div className="page-pannel-float-left w-60">
                    <div className="pannel-body" style={{ marginBottom: 20 }}>
                        <section className="code-box-meta thicknessIDrkdown">
                            <div className="code-box-title">Thông tin chiều dày</div>
                            <div className="code-box-description">
                                <div className="text-left">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Mã
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                        <Input disabled={!optionThickness.isCreate || !optionThickness.isEditing } size="small"  maxLength={10} name="thicknessID" value={modelManager.thicknessID} onChange={handleChangeInput} />
                                    </div>     
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Tên
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                        <Input size="small" disabled={!optionThickness.isEditing} name="thicknessName" value={modelManager.thicknessName} onChange={handleChangeInput} />
                                    </div>                                    
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </section>
                    </div>
                    <div className="pannel-footer">
                        {optionThickness.isEditing ?
                          <div>
                          <Button className="button" shape="default" loading={optionThickness.isSubmit} type="primary" icon={<SaveOutlined/>} onClick={e => SaveCateThickness(e)}>Lưu</Button>
                          <Button className="button" shape="default" disabled={optionThickness.isSubmit} type="dashed" icon={<CloseOutlined/>} onClick={e => CancelThickness(e)} danger>Hủy</Button>
                      </div>
                      :
                      <div>
                          <Button className="button" type="primary"  icon={<PlusOutlined />}  onClick={e => AddThickness(e)}>Thêm</Button>
                          <Button className="button" type="primary"  icon={<EditOutlined />} onClick={e => EditThickness(e)} >Sửa</Button>
                          <Button className="button" type="primary"  icon={<DeleteOutlined />} onClick={e => DeleteThickness(e)} danger>Xóa</Button>
                      </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateMonthPage;