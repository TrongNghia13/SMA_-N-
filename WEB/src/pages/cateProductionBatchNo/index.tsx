import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, Modal, Input } from 'antd';
import CateProductionBatchNoController from '../../services/cateProductionBatchNoService';
import CATE_PRODUCTIONBATCHNO from '../../models/cateProductionBatchNo';
import { APIStatus } from '../../configs/APIConfig';
import {PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined,CloseOutlined} from '@ant-design/icons';

const cateProductionBatchNoController = new CateProductionBatchNoController();

const { confirm } = Modal;
const CateProductionBatchNo: React.FC = () => {        
    const [model, setModel] = useState({ lst: Array<CATE_PRODUCTIONBATCHNO>(), loading: true });
    const dataModelManagerInit = {
        productionBatchNoID: '',        
        productionBatchNoName: '',
    };
    const [modelManager, setModelManager] = useState((() => {
        let dataInit: CATE_PRODUCTIONBATCHNO = dataModelManagerInit
        return dataInit;
    }));
    const [dataSelectproductionBatchNo, setDataSelectproductionBatchNo] = useState((() => {
        let dataInit = { model: dataModelManagerInit, productionBatchNoID: '' }
        return dataInit;
    }));
    const [optionproductionBatchNo, setOptionproductionBatchNo] = useState((() => {
        let dataInit = { productionBatchNoID: '', isEditing: false, isSubmit: false, isCreate: false };
        return dataInit;
    }));
    const [selectproductionBatchNo, setSelectproductionBatchNo] = useState((() => {
        let dataInit: CATE_PRODUCTIONBATCHNO = {} as any;
        return dataInit;
    })); 

    useEffect(() => {
        LoadCateProductionBatchNo();
    }, []);

    const LoadCateProductionBatchNo = async (callback?: any) => {
        var dataCateProductionBatchNo = await cateProductionBatchNoController.GetList();
        setModel({
            ...model,
            lst: dataCateProductionBatchNo.data,
            loading: false
        });
        setTimeout(() => {
            if (callback) callback(dataCateProductionBatchNo.data);
        }, 300);
    }    
    
    const onSelectproductionBatchNo = (selection: CATE_PRODUCTIONBATCHNO, dataInit?: Array<CATE_PRODUCTIONBATCHNO>) => {
        if (optionproductionBatchNo.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectproductionBatchNo({ ...dataSelectproductionBatchNo, model: dataModelManagerInit, productionBatchNoID: '' });            
        }
        else {            
            var productionBatchNoItem: CATE_PRODUCTIONBATCHNO = dataModelManagerInit;
            if (dataInit) {
                productionBatchNoItem = dataInit.find((element) => {
                    return element.productionBatchNoID === selection.productionBatchNoID;
                }) || dataModelManagerInit;
            }
            else {
                productionBatchNoItem = model.lst.find((element) => {
                    return element.productionBatchNoID === selection.productionBatchNoID;
                }) || dataModelManagerInit;
            }
            setModelManager(productionBatchNoItem);
            setDataSelectproductionBatchNo({ ...dataSelectproductionBatchNo, model: productionBatchNoItem });

            setOptionproductionBatchNo(prevState => ({
                ...prevState,
                productionBatchNoID: productionBatchNoItem.productionBatchNoID,
                productionBatchNoName: productionBatchNoItem.productionBatchNoName,
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

    const AddproductionBatchNo = (e: any) => {
        setOptionproductionBatchNo(prevState => ({
            ...prevState,
            productionBatchNoID:"",
            isEditing: true,
            isCreate : true
        }));
        setDataSelectproductionBatchNo({ ...dataSelectproductionBatchNo, model: dataModelManagerInit, productionBatchNoID: '' });
        setModelManager(dataModelManagerInit);
    }

    const EditproductionBatchNo = (e: any) => {
    if (optionproductionBatchNo.productionBatchNoID.length <= 0) {
        message.error('Không được sửa mã');
        return false;
    }
    setOptionproductionBatchNo(prevState => ({ ...prevState, isEditing: true, isCreate : false }));
};

    const DeleteproductionBatchNo = (e: any) => {       
        if (optionproductionBatchNo.productionBatchNoID.length <= 0) {            
            message.error('Vui lòng chọn thông tin để xóa');
            return false;
        }
        confirm({            
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa danh mục: ' + optionproductionBatchNo.productionBatchNoID + '?',
            onOk() {
                OnDeletedproductionBatchNo(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedproductionBatchNo = async (e: any) => {
        var reDelete = await cateProductionBatchNoController.Delete(optionproductionBatchNo.productionBatchNoID);;
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {                        
            await LoadCateProductionBatchNo();
            await CancelCateproductionBatchNo(e);
        }
    }

    const SaveCateproductionBatchNo = async (e: any) => {
        var data: any;

        if (modelManager.productionBatchNoID === '') {
            message.error('Vui lòng nhập mã loại nguyên liệu');
            return false;
        }
    
        if (modelManager.productionBatchNoName === '') {
            message.error('Vui lòng nhập tên loại nguyên liệu');
            return false;
        }

        setOptionproductionBatchNo({ ...optionproductionBatchNo, isSubmit: true });
    
        if (optionproductionBatchNo.isCreate) {
            data = await cateProductionBatchNoController.Create(modelManager);
        } else {
            data = await cateProductionBatchNoController.Update(modelManager);
        }
    
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionproductionBatchNo({ ...optionproductionBatchNo, isSubmit: false });
        } else {
            message.success('Cập nhật thành công');
            CancelCateproductionBatchNo(e);
    
            await LoadCateProductionBatchNo(function (datas: Array<CATE_PRODUCTIONBATCHNO>) {
                var tieuchuanItem = datas.find((element) => {
                    return element.productionBatchNoID === data.data;
                });
    
                if (tieuchuanItem) {
                    onSelectproductionBatchNo(tieuchuanItem, datas);
                }
            });
        }
    }
    
    const CancelCateproductionBatchNo = async (e: any) => {
        setOptionproductionBatchNo(prevState => ({
            ...prevState,
            isEditing: false
        }));
        setDataSelectproductionBatchNo({ ...dataSelectproductionBatchNo, model: dataModelManagerInit, productionBatchNoID: '' });
        setModelManager(dataModelManagerInit);
    }
    const hilightrow = (row : CATE_PRODUCTIONBATCHNO) => {
        if (row.productionBatchNoID === modelManager.productionBatchNoID) {
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
                                onSelectionChange={onSelectproductionBatchNo}
                                selection={selectproductionBatchNo}
                                rowCss={hilightrow}
                                >                                
                                <GridColumn field="productionBatchNoID" title="Mã" width="35%" align="center" />
                                <GridColumn field="productionBatchNoName" title="Tên" width="60%" align="center"/>                                                   
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
                                       <Input size="small" disabled={!optionproductionBatchNo.isEditing || !optionproductionBatchNo.isCreate} name="productionBatchNoID" value={modelManager.productionBatchNoID} onChange={handleChangeInput} />
                                    </div>     
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Tên
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-30">
                                       <Input size="small" disabled={!optionproductionBatchNo.isEditing} name="productionBatchNoName" value={modelManager.productionBatchNoName} onChange={handleChangeInput} />
                                    </div>                                    
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </section>
                    </div>
                    <div className="pannel-footer">
                        {optionproductionBatchNo.isEditing ?
                            <div>
                            <Button className="button" shape="default" loading={optionproductionBatchNo.isSubmit} type="primary" icon={<SaveOutlined/>} onClick={e => SaveCateproductionBatchNo(e)}>Lưu</Button>
                            <Button className="button" shape="default" disabled={optionproductionBatchNo.isSubmit} type="dashed" icon={<CloseOutlined/>} onClick={e => CancelCateproductionBatchNo(e)} danger>Hủy</Button>
                        </div>
                        :
                        <div>
                            <Button className="button" type="primary"  icon={<PlusOutlined />}  onClick={e => AddproductionBatchNo(e)}>Thêm</Button>
                            <Button className="button" type="primary"  icon={<EditOutlined />} onClick={e => EditproductionBatchNo(e)} >Sửa</Button>
                            <Button className="button" type="primary"  icon={<DeleteOutlined />} onClick={e => DeleteproductionBatchNo(e)} danger>Xóa</Button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateProductionBatchNo;