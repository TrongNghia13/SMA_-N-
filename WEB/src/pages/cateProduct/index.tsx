import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Modal, Button, message } from 'antd';
import { TreeGrid, GridColumn, DataGrid, filterOperators } from 'rc-easyui';
import CateProductService from '../../services/cateProductService';

import Container from '../../components/container/index';

import { cateProductTypeTreeTable } from '../../models/cateProductType';
import { cateProductVm } from '../../models/cateProduct';
import cateProductRequest from '../../models/request/cateProductRequest';
import { APIStatus } from '../../configs/APIConfig';

import { ShowModal } from '../../components/common/index';
import AddUpProductType from './addUpProductType';
import AddUpCateProduct from './addUpProduct';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';


const cateProductService = new CateProductService();
const { confirm } = Modal;
const CateProductPage: React.FC = () => {

    const rf_datagrid_hang_hoa = useRef<any>(null);

    const [stateCateProductPage, setStateCateProductPage] = useState({ lstCateProductPage: Array<cateProductVm>(), loading: true });
    const [stateCateProductTypePage, setStateCateProductTypePage] = useState({ lstCateProductType: Array<cateProductTypeTreeTable>(), loading: true });
    const [stateOptionCateProductType, setStateOptionCateProductType] = useState((() => {
        let dataInit = { productTypeName: 'ALL', productTypeID: 'ALL', isPrefix: false, length: 0, isAutoPutId: false };
        return dataInit;
    }));
    const [stateOptionCateProductPage, setStateOptionCateProductPage] = useState((() => {
        let dataInit = { productID: '', productName: '' };
        return dataInit;
    }));

    useEffect(() => {
        LoadCateProductTypePage();
        LoadDMCateProductPage();
    }, []);

    const LoadDMCateProductPage = async (searchOptions?: any, filters?: any, sorter?: any) => {
        searchOptions = searchOptions == undefined ? {} : searchOptions;
        var req: cateProductRequest = {} as any;
        req.productID = searchOptions.productID || '';
        req.productName = searchOptions.productName || '';
        req.productTypeID = (searchOptions.productTypeID || '') == 'ALL' ? '' : (searchOptions.productTypeID || '');
        req.pageindex = 0;
        req.pagesize = 0;
        req.total = 0;
        var dataCateProductPage = await cateProductService.GetListCateProduct(req);
        setStateCateProductPage({
            ...stateCateProductPage,
            lstCateProductPage: dataCateProductPage.data,
            loading: false
        });
    }

    const LoadCateProductTypePage = async () => {
        var dataCateProductTypePage = await cateProductService.GetListProductTypeTreeGrid();
        console.log(dataCateProductTypePage.data);
        setStateCateProductTypePage({ ...stateCateProductTypePage, lstCateProductType: dataCateProductTypePage.data, loading: false });
    }

    const onSelectCateProductTypePage = (selection: cateProductTypeTreeTable) => {
        setStateOptionCateProductType(prevState => ({ ...prevState, productTypeID: selection.productTypeID, productTypeName: selection.productTypeName, isPrefix: selection.isPrefix, length: selection.length, isAutoPutId: selection.isAutoPutId }));
        setStateCateProductPage({ ...stateCateProductPage, loading: true });
        LoadDMCateProductPage({ productTypeID: selection.productTypeID });
    }

    const editProductType = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionCateProductType.productTypeID === '' || stateOptionCateProductType.productTypeID === 'ALL') {
                message.error('Nhóm mặc định bạn không thể chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dgAddUpProductType',
            component: AddUpProductType,
            dataProps: { type: type, productTypeID: type === 'add' ? '' : stateOptionCateProductType.productTypeID, productParentTypeName: stateOptionCateProductType.productTypeName, parentID: stateOptionCateProductType.productTypeID, callBackSubmit: LoadCateProductTypePage }
        });
    }

    const deleteNhomhangHoa = async (e: any) => {
        e.preventDefault();
        if (stateOptionCateProductType.productTypeID === '' || stateOptionCateProductType.productTypeID === 'ALL') {
            message.error('Nhóm mặc định bạn không thể xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa nhóm hàng hóa: ' + stateOptionCateProductType.productTypeName + '?',
            onOk() {
                OnDeletedCateProductTypePage();
            },
            onCancel() { },
        });
    }

    const OnDeletedCateProductTypePage = async () => {
        var reDelete = await cateProductService.DeleteProductType(stateOptionCateProductType.productTypeID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error("Có lỗi trong quá trình xoá, vui lòng kiểm tra dữ liệu bên trong");
        }
        else {
            setStateOptionCateProductType(prevState => ({ ...prevState, productTypeID: 'ALL', productTypeName: 'ALL' }));
            LoadCateProductTypePage();
        }
    }

    const onSelectCateProductPage = (selection: cateProductVm) => {
        setStateOptionCateProductPage(preSate => ({ ...preSate, productID: selection.productID, productName: selection.productName }));
    }

    const editCateProductPage = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionCateProductPage.productID === '') {
                message.error('Vui lòng chọn hàng hóa để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dgAddUpCateProductPage',
            component: AddUpCateProduct,
            dataProps: { type: type, productID: type === 'add' ? '' : stateOptionCateProductPage.productID, productTypeModel: { productTypeID: stateOptionCateProductType.productTypeID == 'ALL' ? '' : stateOptionCateProductType.productTypeID, isPrefix: stateOptionCateProductType.isPrefix, length: stateOptionCateProductType.length, isAutoPutId: stateOptionCateProductType.isAutoPutId }, callBackSubmit: CallBackAddUpCateProductPage }
        });
    }

    const CallBackAddUpCateProductPage = (productTypeID: string) => {
        LoadDMCateProductPage({ productTypeID: productTypeID });
    }

    const deleteCateProductPage = async (e: any) => {
        e.preventDefault();
        if (stateOptionCateProductPage.productID === '') {
            message.error('Vui lòng chọn hàng hóa để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa hàng hóa: ' + stateOptionCateProductPage.productName + '?',
            onOk() {
                OnDeletedCateProductPage();
            },
            onCancel() { },
        });
    }

    const OnDeletedCateProductPage = async () => {
        var reDelete = await cateProductService.DeleteProduct(stateOptionCateProductPage.productID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            setStateOptionCateProductPage(prevState => ({ ...prevState, productID: '', productName: '' }));
            LoadDMCateProductPage({ productTypeID: stateOptionCateProductType.productTypeID });
        }
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-left">
                    <div className="pannel-left-header">
                        NHÓM HÀNG HÓA
                    </div>
                    <div className="pannel-left-body">
                        <TreeGrid
                            style={{ height: (window.innerHeight - 150) }}
                            data={stateCateProductTypePage.lstCateProductType}
                            idField="productTypeID"
                            treeField="productTypeName"
                            selectionMode="single"
                            onSelectionChange={onSelectCateProductTypePage}
                        >
                            <GridColumn field="productTypeName" title="Tên" width="80%"></GridColumn>
                            <GridColumn field="productTypeID" title="Mã" width="20%"></GridColumn>

                        </TreeGrid>
                    </div>
                    <div className="pannel-left-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />} size="small" onClick={e => editProductType(e, 'add')} >Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} size="small" onClick={e => editProductType(e, 'edit')} >Sửa</Button>
                        <Button className="button" type="primary" icon={<CloseOutlined />} size="small" onClick={e => deleteNhomhangHoa(e)} danger>Xóa</Button>

                    </div>
                </div>
                <div className="page-pannel-right">
                    <div className="pannel-right-header">
                        DANH MỤC HÀNG HÓA
                    </div>
                    <div className="pannel-right-body">
                        <Container isLoading={stateCateProductPage.loading}>
                            <DataGrid
                                filterable
                                filterRules={[]}
                                ref={rf_datagrid_hang_hoa}
                                virtualScroll
                                pageSize={50}
                                data={stateCateProductPage.lstCateProductPage}
                                style={{ height: (window.innerHeight - 150) }}
                                selectionMode="single"
                                onSelectionChange={onSelectCateProductPage}>
                                <GridColumn title="Mã Hàng" field="productID" width="15%" />
                                <GridColumn title="Tên Hàng" field="productName" width="25%" />
                                <GridColumn title="ĐVT" field="productUnit" width="10%" align="center" />
                                <GridColumn title="Lưu Tối Thiểu" field="stockMin" width="10%" align="right" />
                                <GridColumn title="Lưu Tối Đa" field="stockMax" width="10%" align="right" />
                                <GridColumn title="Ghi Chú" field="description" width="10%" align="center" />
                                <GridColumn title="Sử Dụng" field="isUse" width="10%" align="center" />
                            </DataGrid>
                        </Container>
                    </div>
                    <div className="pannel-right-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />} size="small" onClick={e => editCateProductPage(e, 'add')}>Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} size="small" onClick={e => editCateProductPage(e, 'edit')}>Sửa</Button>
                        <Button className="button" type="primary" icon={<CloseOutlined />} size="small" onClick={e => deleteCateProductPage(e)} danger>Xóa</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateProductPage;