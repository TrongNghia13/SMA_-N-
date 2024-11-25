import React, { useState, useEffect } from 'react';
import { Form, message, Select } from 'antd';
import DialogPage from '../../components/dialog/dialogPage';

import RoleController from '../../services/roleService';
import MenuController from '../../services/menuService';

import ROLES from '../../models/role';
import MENUS from '../../models/mainMenu';
import ROLE_MENUS from '../../models/roleMenu';
import { APIStatus } from '../../configs/APIConfig';

const { Option } = Select;

interface PropsAddUpRoleMenu {
    id: number,
    roleid: number,
    callBackSubmit: ((roleId: number) => void)
}
const AddUpRoleMenu: React.FC<PropsAddUpRoleMenu> = (props) => {

    const roleController = new RoleController();
    const menuController = new MenuController();

    const { id, roleid, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Role Menu', confirmLoading: false, destroyOnClose: false });
    const [roleMenuModel, setRoleMenuModel] = useState((() => {
        let dataInit: ROLE_MENUS = {} as any;
        return dataInit;
    }));
    const [dataMenu, setDataMenu] = useState((() => {
        let dataInit: Array<MENUS> = [] as any;
        return dataInit;
    }));
    const [dataRole, setDataRole] = useState((() => {
        let dataInit: Array<ROLES> = [] as any;
        return dataInit;
    }));

    useEffect(() => {
        async function GetData() {

            await GetSelectRole();
            await GetSelectMenus();

            if (id === 0) {
                setRoleMenuModel({ ...roleMenuModel, roleMenuID: 0, roleID: roleid });
            }
            else {
                // var getDdata = await roleController.GetRoleMenuById(id);
                //setRoleMenuModel(getDdata.data);
            }

        };
        GetData();

    }, []);

    const GetSelectRole = async () => {
        // var getDdata = await roleController.GetRoleList();
       // setDataRole(getDdata.data);
    }

    const GetSelectMenus = async () => {
        var getDdata = await menuController.GetMenuList(0);
       //setDataMenu(getDdata.data);
    }

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
                var data = await roleController.RoleMenuManager(roleMenuModel);
                if (data.status === APIStatus.ERROR) {
                    message.error(data.message);
                }
                else {
                    setDialogData({ ...dialogData, visible: false });
                    callBackSubmit(roleMenuModel.roleID);
                }
    }

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const onChangeRole = async (value: any, option: any) => {
        setRoleMenuModel({ ...roleMenuModel, roleID: parseFloat(value) });
    }

    const onChangeMenu = async (value: any, option: any) => {
        setRoleMenuModel({ ...roleMenuModel, menuID: parseFloat(value) });
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        }
    }

    return (
        <div>
            <DialogPage
                width="60%"
                title={dialogData.title}
                visible={dialogData.visible}
                confirmLoading={dialogData.confirmLoading}
                onCancel={onCancel}
                onOk={onOk}
                destroyOnClose={dialogData.destroyOnClose}>
                <Form {...formItemLayout}>
                    <Form.Item label="Role"
                    initialValue={roleMenuModel.roleID}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn role',
                        },
                    ]}
                    ><Select
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Chọn role"
                            onChange={onChangeRole}
                            disabled={ roleMenuModel.roleMenuID > 0 ? true : false }
                        >

                            {dataRole && dataRole.map(d => (
                                <Option value={d.roleID} key={d.roleID}>{d.roleName}</Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item label="Menu"
                    initialValue={ roleMenuModel.menuID}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn menu',
                        },
                    ]}
                    ><Select
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Chọn menu"
                            onChange={onChangeMenu}
                        >

                            {dataMenu && dataMenu.map(d => (
                                <Option value={d.mainMenuID} key={d.mainMenuID}>{d.mainMenuName}</Option>
                            ))}

                        </Select>
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpRoleMenu;