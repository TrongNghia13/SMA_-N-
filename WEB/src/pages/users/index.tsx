import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message } from 'antd';
import Container from '../../components/container/index';
import UserService from '../../services/userService';
import { usersVm } from '../../models/users';

import { ShowModal } from '../../components/common/index';
import AddUpUsers from './addUpUsers';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
const userService = new UserService();
const Users: React.FC = () => {

    const [stateUsers, setStateUsers] = useState({ lstUsers: Array<usersVm>(), loading: true });
    const [optionUser, setOptionUser] = useState((() => {
        return { userID: 0, userName: '' };
    }));
    useEffect(() => {
        LoadUsers();
    }, []);

    const LoadUsers = async () => {
        var dataRole = await userService.GetList();
        setStateUsers({
            ...stateUsers,
            lstUsers: dataRole.data,
            loading: false
        });
    }

    const onSelectUsers = (selection: usersVm) => {
        setOptionUser({ ...optionUser, userID: selection.userID, userName: selection.userName })
    }

    const editUsers = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (optionUser.userID == 0) {
                message.error('Vui lòng chọn user để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dgAddUpUsers',
            component: AddUpUsers,
            dataProps: { userID: type === 'add' ? 0 : optionUser.userID, callBackSubmit: LoadUsers }
        });
    }

    const deleteUsers = async (e: any) => {
        e.preventDefault();
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-full">
                    <div className="pannel-full-header">
                        USERS
                    </div>
                    <div className="pannel-full-body">
                        <Container isLoading={stateUsers.loading}>
                            <DataGrid
                                //filterable
                                data={stateUsers.lstUsers}
                                style={{ height: (window.innerHeight - 150) }}
                                selectionMode="single"
                                onSelectionChange={onSelectUsers}>
                                <GridColumn title="Mã Nhân Viên" field="employeeID" width="10%" />
                                <GridColumn title="Nhân Viên" field="fullName" width="35%" />
                                <GridColumn title="User Name" field="userName" width="20%" />
                                <GridColumn title="Active" field="active" width="15%" align="center"
                                    header={() => <span>Active</span>}
                                    render={({ row }: any) => (
                                        <span>{row.active ? "Bật" : "Tắt"}</span>
                                    )}
                                />
                                {/* <GridColumn title="Truy cập giờ" field="isAccessHour" width="15%" align="center"
                                    header={() => <span>Giời</span>}
                                    render={({ row }: any) => (
                                        <span>{row.isAccessHour ? "Bật" : "Tắt"}</span>
                                    )}
                                />
                                <GridColumn title="IP" field="isAccessIP" width="15%" align="center"
                                    header={() => <span>IP</span>}
                                    render={({ row }: any) => (
                                        <span>{row.isAccessIP ? "Bật" : "Tắt"}</span>
                                    )}
                                /> */}
                            </DataGrid>
                        </Container>
                    </div>
                    <div className="pannel-full-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />} size="small" onClick={e => editUsers(e, 'add')}>Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} size="small" onClick={e => editUsers(e, 'edit')}>Sửa</Button>
                        <Button className="button" type="primary" icon={<CloseOutlined />} size="small" onClick={e => deleteUsers(e)} danger>Xóa</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Users;