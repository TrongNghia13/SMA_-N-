import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import DialogPage from '../../components/dialog/dialogPage';
import userService from '../../services/userService';
import { APIStatus } from '../../configs/APIConfig';
import UserUpdatePassRequest from '../../models/request/userUpdatePassRequest';
import LoginUtils from '../../utils/loginUtils';


const ChangePass: React.FC = (props) => {
    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.UserName;
    const branchId = userLoginInfo.BranchId;
    // const isquantri = userLoginInfo.userinf
    const userController = new userService();
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập nhật mật khẩu', confirmLoading: false, destroyOnClose: false });
    const [model, setModel] = useState((() => {
        let dataInit: UserUpdatePassRequest = {} as any;
        return dataInit;
    }));
    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        model.userName = userName;
        model.branchID = branchId;
        if (model.newPassword !=null && model.newPassword.length >=8 && model.newPassword == model.PasswordConfirm) {
            var data = await userController.UpdatePassword(model);
            if (data.success !=null && data.success == true) {
                message.success("Thay đổi mật khẩu thành công");
                setDialogData({ ...dialogData, visible: false });
            }
            else {
                message.error("Đổi mật khẩu thất bại");
               
            }
        } else {
            message.error("Vui lòng kiểm tra lại dữ liệu đã nhập");

        }

    }

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModel({ ...model, [name]: (type === 'number' ? parseFloat(value) : value) });
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

    const validateToNextPassword = (rule: any, value: any, callback: any) => {
        console.log(value, rule, callback);
        // const { form } = props;
        // if (value && model.PasswordConfirm) {
        //     form.validateFields(['PasswordConfirm'], { force: true });
        // }
        // callback();
    };

    const compareToFirstPassword = (rule: any, value: any, callback: any) => {
        callback('Chưa trùng khớp với mật khẩu mới', value);

        // const { form }  = props;
        // if (value && value !== form.getFieldValue('Password')) {
        //     callback('Chưa trùng khớp với mật khẩu mới');
        // } else {
        //     callback();
        // }
    };
    return (
        <div>
            <DialogPage
                title={dialogData.title}
                visible={dialogData.visible}
                confirmLoading={dialogData.confirmLoading}
                onCancel={onCancel}
                onOk={onOk}
                destroyOnClose={dialogData.destroyOnClose}>
                <Form {...formItemLayout}  >
                    <Form.Item label="Mật khẩu hiện tại" hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu hiện tại',
                            },
                        ]}
                        initialValue={model.password}>
                        <Input.Password name="password" onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Mật khẩu mới" hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu mới',
                            },
                            {
                                validator: validateToNextPassword
                            }
                        ]}
                        initialValue={model.newPassword}>
                        <Input.Password name="newPassword" onChange={handleChangeInput} minLength={8} />
                    </Form.Item>
                    <Form.Item label="Xác nhận mật khẩu mới" hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu mới',
                            },
                            {
                                validator: compareToFirstPassword
                            }
                        ]}
                        initialValue={model.PasswordConfirm}
                    >
                        <Input.Password name="PasswordConfirm" onChange={handleChangeInput} minLength={8} />
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>

    )
}
export default ChangePass;