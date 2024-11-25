import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, message, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
// import { FormComponentProps } from 'antd/lib/form/Form';
import DialogPage from '../../components/dialog/dialogPage';
import menuService from '../../services/menuService';
// import DMErpController from '../../controllers/DMErpController';
import menus from '../../models/menus';
import { APIStatus } from '../../configs/APIConfig';
import mainMenu from '../../models/mainMenu';
// import DM_ERP from '../../models/DM_ERP';

const { Option } = Select;

interface PropsAddMenu {
    menuID: number,
    mainmenuID: number,
    mainMenuName: string
    callBackSubmit: ((mainmenuID: number) => void)
}
const AddUpMenu: React.FC<PropsAddMenu> = (props) => {

    const MenuService = new menuService();

    const { menuID, mainmenuID, mainMenuName, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Menu', confirmLoading: false, destroyOnClose: false });
    const [menuModel, setMenuModel] = useState((() => {
        let dataInit: menus = {} as any;
        return dataInit;
    }));
    const [dataMainMenu, setDataMainMenu] = useState((() => {
        let dataInit: Array<mainMenu> = [] as any;
        return dataInit;
    }));
    // const { getFieldDecorator } = props.form;
    useEffect(() => {
        async function GetData() {

            await GetDataMainMenu();

            if (menuID === 0) {
                setMenuModel({ ...menuModel, menuID: 0, sortOrder: 0, mainMenuID: mainmenuID });
            }
            else {
                var getDdata = await MenuService.GetMenuById(menuID);
                setMenuModel(getDdata.data);
            }

        };
        GetData();
    }, []);

    const GetDataMainMenu = async () => {
        var getDdata = await MenuService.GetMainMenuList();
        setDataMainMenu(getDdata.data);
    }
    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        if (menuModel.sortOrder != null && menuModel.menuName != null && menuModel.menuKey != null && menuModel.mainMenuID != 0 ) {
            var data: any;
            if (menuModel.menuID == 0) {
                data = await MenuService.MenuCreate(menuModel);
            } else if (menuModel.menuID > 0) {
                data = await MenuService.MenuUpdate(menuModel);
            }
            if (data != null) {
                if (data.status === APIStatus.ERROR) {
                    message.error(data.message);
                }
                else {
                    setDialogData({ ...dialogData, visible: false });
                    callBackSubmit(menuModel.mainMenuID);
                }
            }
        }
    }

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setMenuModel({ ...menuModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const handleChangeCheckBox = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setMenuModel({ ...menuModel, [name || '']: checked });
    }

    const onChangeMainMenu = async (value: any, option: any) => {
        setMenuModel({ ...menuModel, mainMenuID: value });
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
                title={dialogData.title}
                visible={dialogData.visible}
                confirmLoading={dialogData.confirmLoading}
                onCancel={onCancel}
                onOk={onOk}
                destroyOnClose={dialogData.destroyOnClose}>
                <Form {...formItemLayout}
                    // onFinish={onOk}
                    >
                    <Form.Item<menus>
                        label="Main Menu"
                        rules={[
                            // { required: true },
                            // { message: 'Vui lòng chọn main menu' },
                        ]}
                    ><Select
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder={mainmenuID == null || mainmenuID == 0 ? "Chọn nhóm Main Menu" : mainMenuName}
                        onChange={onChangeMainMenu}
                        defaultValue={mainmenuID == null || mainmenuID == 0 ? null : mainmenuID}>
                            {dataMainMenu && dataMainMenu.map(d => (
                                <Option value={d.mainMenuID} key={d.mainMenuID}>{d.mainMenuName} </Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item<menus>
                        label="Key"
                        name="menuKey"
                        rules={[

                            { required: true },
                            { message: "Vui lòng nhập menu key" },
                        ]}
                    ><Input name="menuKey" onChange={handleChangeInput} placeholder={menuModel.menuKey == null ? "Vui lòng nhập menu Key" : menuModel.menuKey} />
                    </Form.Item>
                    <Form.Item<menus>
                        label="Tên"
                        name="menuName"
                        rules={[
                            { required: true },
                            { message: 'Vui lòng nhập tên Menu', },
                        ]}
                    ><Input name="menuName" onChange={handleChangeInput} placeholder={menuModel.menuName == null ? "Vui lòng nhập tên Menu" : menuModel.menuName} />
                    </Form.Item>
                    {/* <Form.Item label="Icon">
                        {getFieldDecorator('icon', {
                            initialValue: menuModel.icon,
                            rules: [
                                {
                                    required: true,
                                    message: 'Vui lòng nhập icon',
                                },
                            ],
                        })(<Input name="icon" onChange={handleChangeInput} />)}
                    </Form.Item> */}
                    <Form.Item<menus>
                        label="STT"
                        name="sortOrder"
                        rules={[
                            { required: true },
                            { message: 'Vui lòng nhập stt' }
                        ]}
                    ><Input name="sortOrder" type="number" min={0} onChange={handleChangeInput} placeholder={menuModel.sortOrder == null ? "Vui lòng nhập stt" : menuModel.sortOrder.toString()} />
                    </Form.Item>
                    <Form.Item<menus> label="Truy cập nhanh" name="fastaccess">
                        <Checkbox name="fastaccess" checked={menuModel.fastaccess} onChange={handleChangeCheckBox} />
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpMenu;