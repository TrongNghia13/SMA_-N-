import React, { Fragment, useState, useEffect } from 'react';
import { Modal, Button, message } from 'antd';
import { GridColumn, DataGrid } from 'rc-easyui';
import { APIStatus } from '../../configs/APIConfig';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import Container from '../../components/container/index';
import CateStoreService from '../../services/cateStoreService';
import cateStoreType from '../../models/cateStoreType';
import cateStore from '../../models/cateStore';
import { ShowModal } from '../../components/common';
import addUpCateStoreType from './addUpCateStoreType';
import addUpCateStore from './addUpCateStore';


const { confirm } = Modal;
const cateStoreService = new CateStoreService();
const CateStorePage: React.FC = () => {

    const [cateStoreTypeModelType, setCateStoreTypeModelType] = useState({ loading: true, lstStoreType: Array<cateStoreType>() });
    const [cateStoreModel, setCateStoreModel] = useState({ loading: true, lstStore: Array<cateStore>() });
    const [stateOptionStoreType, setOptionStoreType] = useState((() => {
        let dataInit = { storeTypeID: '', storeTypeName: '' };
        return dataInit;
    }));
    const [stateOptionStore, setOptionStore] = useState((() => {
        let dataInit = { storeID: '', storeName: '' };
        return dataInit;
    }));

    useEffect(() => {
        LoadStoreType();
        LoadStore();
    }, []);

    const LoadStoreType = async () => {
        var storeTypes = await cateStoreService.GetListLoaiKho();
        setCateStoreTypeModelType({ ...cateStoreTypeModelType, lstStoreType: storeTypes.data, loading: false });
    }

    const LoadStore = async (searchOptions?: any) => {
        const storeTypeID = searchOptions == undefined ? "" : searchOptions.storeTypeID;
        var stores = await cateStoreService.GetListStoreByTypeBranchId(storeTypeID, "");
        setCateStoreModel({ ...cateStoreModel, lstStore: stores.data, loading: false });

    }

    const CallBackAddUpStore = (storeTypeID: string) => {
        LoadStore({ storeTypeID: storeTypeID });
    }

    const onSelectStoreType = (selection: cateStoreType) => {
        setOptionStoreType(prevState => ({ ...prevState, storeTypeID: selection.storeTypeID, storeTypeName: selection.storeTypeName }));
        setCateStoreModel({ ...cateStoreModel, loading: true });
        LoadStore({ storeTypeID: selection.storeTypeID });
    }

    const onSelectStore = (selection: cateStore) => {
        console.log(selection);
        setOptionStore(prevState => ({ ...prevState, storeID: selection.storeID, storeName: selection.storeName }));
    }

    const editStoreType = (e: any, type: string) => {

        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionStoreType.storeTypeID == "") {
                message.error('Vui lòng chọn loại kho để chỉnh sửa', 3);
                return;
            }
        }

        ShowModal({
            dvId: 'dgAddUpCateStoreType',
            component: addUpCateStoreType,
            dataProps: { type: type, storeTypeID: type === 'add' ? 0 : stateOptionStoreType.storeTypeID, callBackSubmit: LoadStoreType }
        });

    }



    const deleteStoreType = (e: any) => {
        e.preventDefault();

        if (stateOptionStoreType.storeTypeID == "") {
            message.error('Vui lòng chọn loại kho để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa kho: ' + stateOptionStoreType.storeTypeName + '?',
            onOk() {
                OnDeletedStoreType();
            },
            onCancel() { },
        });
    };

    const OnDeletedStoreType = async () => {
        try {
            const reDelete = await cateStoreService.DeleteLoaiKho(stateOptionStoreType.storeTypeID);
            if (reDelete.status === APIStatus.ERROR) {
                message.error(reDelete.message);
            } else {
                resetStoreType();
                reloadStoreData();
            }
        } catch (error) {
            console.error('Lỗi xóa loại kho:', error);
        }
    };

    const resetStoreType = () => {
        setOptionStoreType({ storeTypeID: '', storeTypeName: '' });
    };

    const reloadStoreData = () => {
        LoadStoreType();
        LoadStore();
    };

    const editStore = (e: any, type: string) => {
        e.preventDefault();
        console.log(stateOptionStore.storeID);
        if (type === 'edit') {
            if (stateOptionStore.storeID == "") {
                message.error('Vui lòng chọn kho để chỉnh sửa', 3);
                return;
            }
        }
        else {

        }
        ShowModal({
            dvId: 'dgAddCateStore',
            component: addUpCateStore,
            dataProps: { type: type, storeID: type === 'add' ? "" : stateOptionStore.storeID, storeTypeID: stateOptionStoreType.storeTypeID, storeTypeName: stateOptionStoreType.storeTypeName, callBackSubmit: CallBackAddUpStore }
        });
    }

    const deleteStore = (e: any) => {
        e.preventDefault();

        if (stateOptionStore.storeID == "") {
            message.error('Vui lòng chọn kho để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: `Bạn có chắc muốn xóa kho: ${stateOptionStore.storeName}?`,
            onOk() {
                OnDeletedStore();
            },
            onCancel() { },
        });
    }

    const OnDeletedStore = async () => {
        const reDelete = await cateStoreService.DeleteKho(stateOptionStore.storeID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        } else {
            setOptionStore({ ...stateOptionStore, storeID: '', storeName: '' });
            LoadStore({ storeTypeID: stateOptionStoreType.storeTypeID });
        }
    }



    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-left">
                    <div className="pannel-left-header">
                        LOẠI KHO
                    </div>
                    <div className="pannel-left-body">
                        <DataGrid
                            style={{ height: (window.innerHeight - 150) }}
                            data={cateStoreTypeModelType.lstStoreType}
                            selectionMode="single"
                            onSelectionChange={onSelectStoreType}
                        >
                            <GridColumn field="storeTypeID" title="Mã" width="30%"></GridColumn>
                            <GridColumn field="storeTypeName" title="Tên" width="70%"></GridColumn>

                        </DataGrid>
                    </div>
                    <div className="pannel-left-footer">
                        <       Button className="button" type="primary" icon={<PlusOutlined />} onClick={e => editStoreType(e, 'add')}>Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} onClick={e => editStoreType(e, 'edit')} >Sửa</Button>
                        <Button className="button" type="primary" icon={<DeleteOutlined />} onClick={e => deleteStoreType(e)} danger>Xóa</Button>

                    </div>
                </div>
                <div className="page-pannel-right">
                    <div className="pannel-right-header">
                        KHO
                    </div>
                    <div className="pannel-right-body">
                        <Container isLoading={cateStoreModel.loading}>
                            <DataGrid
                                //filterable  
                                data={cateStoreModel.lstStore}
                                style={{ height: (window.innerHeight - 150) }}
                                selectionMode="single"
                                onSelectionChange={onSelectStore}>
                                <GridColumn title="Mã" field="storeID" width="15%" />
                                <GridColumn title="Tên" field="storeName" width="20%" />
                                <GridColumn title="Đơn Vị" field="branchID" width="25%" align="center" />
                                <GridColumn title="Loại Kho" field="storeTypeID" width="15%" align="center" />
                                <GridColumn title="Địa Chỉ" field="storeAddress" width="25%" align="center" />
                                <GridColumn title="Thủ Kho" field="storeKeeperName" width="15%" align="center" />
                                <GridColumn title="Ghi Chú" field="description" width="25%" align="center" />
                            </DataGrid>
                        </Container>
                    </div>
                    <div className="pannel-right-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />} onClick={e => editStore(e, 'add')}>Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} onClick={e => editStore(e, 'edit')}>Sửa</Button>
                        <Button className="button" type="primary" icon={<DeleteOutlined />} onClick={e => deleteStore(e)} danger>Xóa</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateStorePage;