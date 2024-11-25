import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Modal, Button, message } from 'antd';
import { TreeGrid, GridColumn, CheckBox, DataGrid } from 'rc-easyui';

import RoleController from '../../services/roleService';

import Container from '../../components/container/index';

import role, { role_VM } from '../../models/role';
import roleMenu, { roleMenu_VM } from '../../models/roleMenu';
import { roleReport_VM } from '../../models/roleReport';
// import ROLE_MANAGER_Request from '../../models/request/roleManagerRequest';
import TreeData from '../../models/ui/treeData';

import { APIStatus } from '../../configs/APIConfig';

import { ShowModal } from '../../components/common/index';
import AddUpRole from './addUpRole';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { roleAppVm } from '../../models/roleApp';


const roleController = new RoleController();

const { confirm } = Modal;
const Roles: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const ref_tree_role_manager = React.useRef<any>(null);
    const [stateRole, setStateRole] = useState({ lstRole: Array<role>(), loading: true });
    const [stateRoleManager, setStateRoleManager] = useState({ lstRoleManager: Array<TreeData>(), loading: false });
    const [stateOptionRole, setStateOptionRole] = useState((() => {
        let dataInit = { roleID: 0, roleName: '', roleType: '', isSubmit: false };
        return dataInit;
    }));

    useEffect(() => {
        LoadRole();
    }, []);

    const LoadRole = async () => {
        var dataRole = await roleController.GetList();

        setStateRole({
            ...stateRole,
            lstRole: dataRole.data,
            loading: false
        });
        setStateRoleManager({ ...stateOptionRole, lstRoleManager: [], loading: false });
        setStateOptionRole(prevState => ({ ...prevState, roleID: 0, roleName: '', roleType: '', isSubmit: false }));
    }

    const LoadRoleMenu = async (searchOptions?: any) => {
        var roleID = searchOptions.roleID || 0;
        var dataRoleMenu = await roleController.GetTreeMenuByRoleId(roleID);
        setStateRoleManager({ ...stateRoleManager, lstRoleManager: dataRoleMenu.data, loading: false });
    }

    const LoadRoleReport = async (searchOptions?: any) => {

        // var req: ROLE_MANAGER_Request = {} as any;
        var roleID = searchOptions.roleID || 0;
        var dataRoleReport = await roleController.GetRoleReportTreeList(roleID);
        setStateRoleManager({ ...stateRoleManager, lstRoleManager: dataRoleReport.data, loading: false });
    }
    const LoadRoleApp = async (searchOptions?: any) => {

        // var req: ROLE_MANAGER_Request = {} as any;
        var roleID = searchOptions.roleID || 0;
        var dataRoleReport = await roleController.GetTreeListRoleAppByRoleId(roleID);
        setStateRoleManager({ ...stateRoleManager, lstRoleManager: dataRoleReport.data, loading: false });
    }
    const onSelectRole = (selection: role) => {
        setLoading(true);
        setStateOptionRole(preSate => ({ ...preSate, roleID: selection.roleID, roleName: selection.roleName, roleType: selection.roleType }));
        if (selection.roleType === 'M') {
            LoadRoleMenu({ roleID: selection.roleID });
        }
        else if (selection.roleType === 'R') {
            LoadRoleReport({ roleID: selection.roleID });
        } else {
            LoadRoleApp({ roleID: selection.roleID });
        }
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }

    const editRole = (e: any, roleType: string) => {
        e.preventDefault();
        if (roleType === 'edit') {
            if (stateOptionRole.roleID == 0) {
                message.error('Vui lòng chọn role để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dgAddUpRole',
            component: AddUpRole,
            dataProps: { type: roleType, roleID: roleType === 'add' ? 0 : stateOptionRole.roleID, callBackSubmit: LoadRole }
        });
    }

    const deleteRole = async (e: any) => {

        e.preventDefault();
        if (stateOptionRole.roleID == 0) {
            message.error('Vui lòng chọn role xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa role: ' + stateOptionRole.roleName + '?',
            onOk() {
                OnDeletedRole();
            },
            onCancel() { },
        });
    }

    const OnDeletedRole = async () => {
        var reDelete = await roleController.Delete(stateOptionRole.roleID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            LoadRole();
            setStateRoleManager({ ...stateRoleManager, lstRoleManager: [], loading: false });
            setStateOptionRole(prevState => ({ ...prevState, roleID: 0, roleName: '', roleType: '', isSubmit: false }));
        }
    }

    const RoleManagercheckRow = (row: any) => {
    }

    const RoleManagerOnRowCheck = (row: any) => {
    }

    const SaveRoleManager = async (e: any) => {
        if (stateOptionRole.roleType === 'M') {
            await SaveRoleMenu(e);
        }
        else if (stateOptionRole.roleType === 'R') {
            await SaveRoleReport(e);
        } else if (stateOptionRole.roleType === 'A') {
            await SaveRoleApp(e);
        }
    }

    const SaveRoleMenu = async (e: any) => {
        e.preventDefault();
        if (ref_tree_role_manager.current) {

            setStateOptionRole({ ...stateOptionRole, isSubmit: true });
            var roleMenus = Array<roleMenu_VM>();
            var rowsChecked = ref_tree_role_manager.current.getCheckedRows();
            if (rowsChecked.length > 0) {
                rowsChecked.forEach((element: any) => {
                    if (element.children.length <= 0) {
                        roleMenus.push({
                            roleMenuID: 0,
                            roleID: stateOptionRole.roleID,
                            menuID: element.key,
                            menuname: '',
                            rolename: ''
                        });
                    }
                });
            }
            else {
                roleMenus.push({
                    roleMenuID: 0,
                    roleID: stateOptionRole.roleID,
                    menuID: 0,
                    menuname: '',
                    rolename: ''
                });
            }

            var data = await roleController.RoleMenuManagerTreeList(roleMenus);
            if (data.status === APIStatus.ERROR) {
                message.error(data.message);
                setStateOptionRole({ ...stateOptionRole, isSubmit: false });
            }
            else {
                message.success('Cập nhật menu role thành công');
                setStateOptionRole({ ...stateOptionRole, isSubmit: false });
            }
        }
    }

    const SaveRoleReport = async (e: any) => {
        e.preventDefault();
        if (ref_tree_role_manager.current) {

            setStateOptionRole({ ...stateOptionRole, isSubmit: true });
            var roleReports = Array<roleReport_VM>();
            var rowsChecked = ref_tree_role_manager.current.getCheckedRows();
            if (rowsChecked.length > 0) {
                rowsChecked.forEach((element: any) => {
                    if (element.children.length <= 0) {
                        roleReports.push({
                            roleReportID: 0,
                            roleID: stateOptionRole.roleID,
                            reportID: element.key,
                            reportname: '',
                            rolename: ''
                        });
                    }
                });
            }
            else {
                roleReports.push({
                    roleReportID: 0,
                    roleID: stateOptionRole.roleID,
                    reportID: 0,
                    reportname: '',
                    rolename: ''
                });
            }

            var data = await roleController.RoleReportManagerTreeList(roleReports);
            if (data.status === APIStatus.ERROR) {
                message.error(data.message);
                setStateOptionRole({ ...stateOptionRole, isSubmit: false });
            }
            else {
                message.success('Cập nhật menu report thành công');
                setStateOptionRole({ ...stateOptionRole, isSubmit: false });
            }
        }
    }
    const SaveRoleApp = async (e: any) => {
        e.preventDefault();
        if (ref_tree_role_manager.current) {

            setStateOptionRole({ ...stateOptionRole, isSubmit: true });
            var roleApps = Array<roleAppVm>();
            var rowsChecked = ref_tree_role_manager.current.getCheckedRows();
            if (rowsChecked.length > 0) {
                rowsChecked.forEach((element: any) => {
                    if (element.children.length <= 0) {
                        roleApps.push({
                            roleAppID: 0,
                            roleID: stateOptionRole.roleID,
                            menuAppID: element.key,
                            reportname: '',
                            rolename: ''
                        });
                    }
                });
            }
            else {
                roleApps.push({
                    roleAppID: 0,
                    roleID: stateOptionRole.roleID,
                    menuAppID: 0,
                    reportname: '',
                    rolename: ''
                });
            }

            var data = await roleController.RoleAppManagerTreeList(roleApps);
            if (data.status === APIStatus.ERROR) {
                message.error(data.message);
                setStateOptionRole({ ...stateOptionRole, isSubmit: false });
            }
            else {
                message.success('Cập nhật menu Mobile thành công');
                setStateOptionRole({ ...stateOptionRole, isSubmit: false });
            }
        }
    }
    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-left page-pannel-left-50">
                    <div className="pannel-left-header">
                        ROLE
                    </div>
                    <div className="pannel-left-body">
                        <DataGrid
                            style={{ height: (window.innerHeight - 150) }}
                            //filterable  
                            data={stateRole.lstRole}
                            selectionMode="single"
                            onSelectionChange={onSelectRole}
                        >
                            <GridColumn title="Tên" field="roleName" width="35%" />
                            <GridColumn title="Ghi chú" field="roleComment" width="25%" />
                            <GridColumn title="Loại" field="roleType" align="center" width="15%"
                                header={() => <span>Loại</span>}
                                render={({ row }: any) => {
                                    let content;
                                    if (row.roleType === 'M') {
                                        content = 'Menu';
                                    } else if (row.roleType === 'R') {
                                        content = 'Report';
                                    } else {
                                        content = 'Mobile App';
                                    }
                                    return <span>{content}</span>;
                                }}
                            />
                        </DataGrid>
                    </div>
                    <div className="pannel-left-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />} size="small" onClick={e => editRole(e, 'add')} >Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} size="small" onClick={e => editRole(e, 'edit')} >Sửa</Button>
                        <Button className="button" type="primary" icon={<DeleteOutlined />} size="small" onClick={e => deleteRole(e)}danger>Xóa</Button>

                    </div>
                </div>
                <div className="page-pannel-right page-pannel-right-50">
                    <div className="pannel-right-header">
                        ROLE MENU/REPORT
                    </div>
                    <div className="pannel-right-body">
                        <Container isLoading={loading}>
                            <TreeGrid
                                ref={ref_tree_role_manager}
                                data={stateRoleManager.lstRoleManager}
                                style={{ height: (window.innerHeight - 150) }}
                                idField="value"
                                treeField="title"
                                // cascadeCheck={false}
                                checkbox={true}
                                checkRow={RoleManagercheckRow}
                                onRowCheck={RoleManagerOnRowCheck}
                            >
                                <GridColumn title="Tên chức năng" field="title" width="20%" />
                            </TreeGrid>
                        </Container>
                    </div>
                    <div className="pannel-right-footer">
                        {stateOptionRole.roleID > 0 ?
                            <div className="inline-bolck">
                                <Button className="button" loading={stateOptionRole.isSubmit} type="primary" icon={<SaveOutlined />} size="small" onClick={e => SaveRoleManager(e)}>Lưu</Button>
                            </div>
                            :
                            <div className="inline-bolck">
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Roles;