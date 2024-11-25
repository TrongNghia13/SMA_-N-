import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';
import DialogPage from '../../components/dialog/dialogPage';
import MenuController from '../../services/menuService';
import mainMenu from '../../models/mainMenu';
import { APIStatus } from '../../configs/APIConfig';
import Icon from '@ant-design/icons';

interface PropsAddUpMainMenu {
    mainmenuId: number
    callBackSubmit: (() => void)
}
const AddUpMainMenu: React.FC<PropsAddUpMainMenu> = (props) => {

    const menuController = new MenuController();
    const { mainmenuId, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Main Menu', confirmLoading: false, destroyOnClose: false });
    const [mainMenuModel, setMainMenuModel] = useState((() => {
        let dataInit: mainMenu = {} as any;
        return dataInit;
    }));
    // const { getFieldDecorator } = props.form;
    useEffect(() => {
        async function GetData() {
            if (mainmenuId === 0) {
                setMainMenuModel({ ...mainMenuModel, mainMenuID: 0, sortOrder: 0 });
            }
            else {
                var getDdata = await menuController.GetMainMenuById(mainmenuId);
                setMainMenuModel(getDdata.data);
            }
        };
        GetData();
    }, []);

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        if (mainMenuModel.mainMenuName != null && mainMenuModel.sortOrder !=null) {
            var data: any;
            if (mainmenuId === 0) {
                data = await menuController.MainMenuCreate(mainMenuModel);

            } else {
                data = await menuController.MainMenuUpdate(mainMenuModel);

            }
                if (data.status === APIStatus.ERROR) {
                    message.error(data.message);
                }
                else {
                    setDialogData({ ...dialogData, visible: false });
                    callBackSubmit();
                }
        }
    }
    const onFinish = () => {
    }
    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setMainMenuModel({ ...mainMenuModel, [name]: (type === 'number' ? parseFloat(value) : value) });
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
                <Form {...formItemLayout} onFinish={onFinish}>
                    <Form.Item<mainMenu>
                        label="Tên"
                        name="mainMenuName"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên" },
                        ]}
                        wrapperCol={{ offset: 1, span: 0 }}
                    >
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder={mainMenuModel.mainMenuID != 0 ? mainMenuModel.mainMenuName : "Vui lòng nhập tên!"}
                            name="mainMenuName"
                            required
                            // className="input-text-upercase"
                            onChange={handleChangeInput}
                        />
                    </Form.Item>

                    {/* <Form.Item label="Icon">
                        {getFieldDecorator('icon', {
                            initialValue: mainMenuModel.icon,
                            rules: [
                                {
                                    required: true,
                                    message: 'Vui lòng nhập icon',
                                },
                            ],
                        })(<Input name="icon" onChange={handleChangeInput} />)}
                    </Form.Item> */}
                    <Form.Item<mainMenu>
                        label="STT"
                        name="sortOrder"
                        rules={[
                            { required: true, message: "Vui lòng nhập số thứ tự" },
                            { pattern: /^[0-9]+$/, message: "Mục nhập phải là chữ số" },
                        ]}
                        wrapperCol={{ offset: 1, span: 0 }}
                    >
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder={mainMenuModel.mainMenuID != 0 ? (mainMenuModel.sortOrder > 0 ? mainMenuModel.sortOrder.toString() : "0") : "Vui lòng nhập số thứ tự!"}
                            name="sortOrder"
                            // className="input-text-upercase"
                            type='number'
                            min={0}
                            onChange={handleChangeInput}
                        />
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpMainMenu;