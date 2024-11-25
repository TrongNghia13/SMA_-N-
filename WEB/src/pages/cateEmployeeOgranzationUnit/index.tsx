import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button, message } from 'antd';
import { TreeGrid, GridColumn, DataGrid } from 'rc-easyui';

import CateOrganizationService from '../../services/cateOrganizationService';
import EmployeeService from '../../services/employeeService';

import Container from '../../components/container/index';

import { organizationUnitTreeTable } from '../../models/organizationUnit';
import { employeeVm } from '../../models/employee';
import employeeRequest from '../../models/request/employeeRequest';
import { APIStatus } from '../../configs/APIConfig';

import { ShowModal } from '../../components/common/index';
import AddUpOganization from './addUpOganization';
import AddUpEmployee from './addUpEmployee';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';


const cateOrganizationService = new CateOrganizationService();
const employeeService = new EmployeeService();

const { confirm } = Modal;
const CateEmployeeOgranzationUnit: React.FC = () => {

    const [stateNhanVien, setStateNhanVien] = useState({ lstNhanVien: Array<employeeVm>(), loading: true });
    const [stateDonVi, setStateDonVi] = useState({ lstDonVi: Array<organizationUnitTreeTable>(), loading: true });
    const [stateOptionDonVi, setStateOptionDonVi] = useState((() => {
        let dataInit = { organizationUnitID: 0, organizationUnitName: '', organizationUnitTypeID: "" };
        return dataInit;
    }));
    const [stateOptionNhanVien, setStateOptionNhanVien] = useState((() => {
        let dataInit = { employeeID: 0, employeeCode: '', fullName: '' };
        return dataInit;
    }));

    useEffect(() => {
        LoadNhanVien();
        LoadDonVi();
    }, []);

    const LoadNhanVien = async (searchOptions?: any, filters?: any, sorter?: any) => {
        searchOptions = searchOptions == undefined ? {} : searchOptions;
        var req: employeeRequest = {} as any;
        req.employeeCode = searchOptions.employeeCode || '';
        req.fullName = searchOptions.fullName || '';
        req.organizationUnitID = searchOptions.organizationUnitID || 0;
        req.pageindex = 0;
        req.pagesize = 0;
        req.total = 0;
        var dataHangHoa = await employeeService.GetAllListEmployee(req);
        setStateNhanVien({
            ...stateNhanVien,
            lstNhanVien: dataHangHoa.data,
            loading: false
        });
    }

    const LoadDonVi = async () => {
        var dataDonVi = await cateOrganizationService.GetListTreeGrid();
        setStateDonVi({ ...stateDonVi, lstDonVi: dataDonVi.data, loading: false });
    }

    const onSelectDonVi = (selection: organizationUnitTreeTable) => {
        if(selection.organizationUnitTypeID != null && selection.organizationUnitTypeID > 0 ){
            setStateOptionDonVi(prevState => ({ ...prevState, organizationUnitID: selection.organizationUnitID, organizationUnitName: selection.organizationUnitName, organizationUnitTypeID: selection.organizationUnitTypeID.toString() }));
            setStateNhanVien({ ...stateNhanVien, loading: true });
            LoadNhanVien({ organizationUnitID: selection.organizationUnitID });
        }
    }

    const editDonVi = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionDonVi.organizationUnitID == 0) {
                message.error('Vui lòng chọn đơn vị để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'AddUpOganization',
            component: AddUpOganization,
            dataProps: { type: type, organizationUnitId: type === 'add' ? 0 : stateOptionDonVi.organizationUnitID, organizationUnitTypeID: stateOptionDonVi.organizationUnitTypeID, callBackSubmit: LoadDonVi }
        });
    }

    const deleteDonVi = async (e: any) => {

        e.preventDefault();
        if (stateOptionDonVi.organizationUnitID == 0) {
            message.error('Vui lòng chọn đơn vị để chỉnh xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa đơn vị: ' + stateOptionDonVi.organizationUnitName + '?',
            onOk() {
                OnDeletedDonVi();
            },
            onCancel() { },
        });
    }

    const OnDeletedDonVi = async () => {
        var reDelete = await cateOrganizationService.Delete(stateOptionDonVi.organizationUnitID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            setStateOptionDonVi(prevState => ({ ...prevState, organizationUnitId: 0, organizationUnitName: '' }));
            LoadDonVi();
            LoadNhanVien({ organizationUnitTypeID: 0 });
        }
    }

    const onSelectNhanVien = (selection: employeeVm) => {
        console.log(selection);
        setStateOptionNhanVien(preSate => ({ ...preSate, employeeID: selection.employeeID, fullName: selection.fullName }));
    }

    const editNhanVien = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionNhanVien.employeeID == 0) {
                message.error('Vui lòng chọn nhân viên để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dgAddUpEmployee',
            component: AddUpEmployee,
            dataProps: {type : type, employeeID: type === 'add' ? 0 : stateOptionNhanVien.employeeID, organizationUnitID: stateOptionDonVi.organizationUnitID, callBackSubmit: CallBackAddUPNhanVien }
        });
    }

    const CallBackAddUPNhanVien = (organizationUnitTypeID: number) => {
        LoadNhanVien({ organizationUnitTypeID: organizationUnitTypeID });
    }

    const deleteNhanVien = async (e: any) => {
        e.preventDefault();
        if (stateOptionNhanVien.employeeID === 0) {
            message.error('Vui lòng chọn nhân viên để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa nhân viên: ' + stateOptionNhanVien.fullName + '?',
            onOk() {
                OnDeletedNhanVien();
            },
            onCancel() { },
        });
    }

    const OnDeletedNhanVien = async () => {
        var reDelete = await employeeService.DeleteEmployee(stateOptionNhanVien.employeeID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            setStateOptionNhanVien(prevState => ({ ...prevState, employeeID: 0, employeeCode: '', fullName: '' }));
            LoadNhanVien({ organizationUnitTypeID: stateOptionDonVi.organizationUnitID });
        }
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-left">
                    <div className="pannel-left-header">
                        ĐƠN VỊ
                    </div>
                    <div className="pannel-left-body">
                        <TreeGrid
                            style={{ height: (window.innerHeight - 150) }}
                            data={stateDonVi.lstDonVi}
                            idField="organizationUnitID"
                            treeField="organizationUnitName"
                            selectionMode="single"
                            onSelectionChange={onSelectDonVi}
                        >
                            <GridColumn field="key" title="CT" width="10%"></GridColumn>
                            <GridColumn field="organizationUnitName" title="Tên" width="80%"></GridColumn>
                            <GridColumn field="organizationUnitID" title="Mã" width="10%"></GridColumn>

                            {/* <GridColumn field="tenphancap" title="Phân Cấp" width="30%"></GridColumn> */}

                        </TreeGrid>
                    </div>
                    <div className="pannel-left-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />} size="small" onClick={e => editDonVi(e, 'add')} >Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} size="small" onClick={e => editDonVi(e, 'edit')} >Sửa</Button>
                        <Button className="button" type="primary" icon={<CloseOutlined />} size="small" onClick={e => deleteDonVi(e)} danger>Xóa</Button>

                    </div>
                </div>
                <div className="page-pannel-right">
                    <div className="pannel-right-header">
                        NHÂN VIÊN
                    </div>
                    <div className="pannel-right-body">
                        <Container isLoading={stateNhanVien.loading}>
                            <DataGrid
                                //filterable  
                                data={stateNhanVien.lstNhanVien}
                                style={{ height: (window.innerHeight - 150) }}
                                selectionMode="single"
                                onSelectionChange={onSelectNhanVien}>
                                <GridColumn title="Mã NV" field="employeeID" width="12%" />
                                <GridColumn title="Họ Tên" field="fullName" width="20%" />
                                <GridColumn title="SĐT" field="employeeTel" width="13%" align="center" />
                                <GridColumn title="Email" field="employeeEmail" width="15%" align="center" />
                                <GridColumn title="Bộ Phận" field="organizationUnitName" width="20%" align="center" />
                                <GridColumn title="Chức Danh" field="jobTitleName" width="20%" align="center" />
                            </DataGrid>
                        </Container>
                    </div>
                    <div className="pannel-right-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />} size="small" onClick={e => editNhanVien(e, 'add')}>Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} size="small" onClick={e => editNhanVien(e, 'edit')}>Sửa</Button>
                        <Button className="button" type="primary" icon={<CloseOutlined />} size="small" onClick={e => deleteNhanVien(e)} danger>Xóa</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateEmployeeOgranzationUnit;