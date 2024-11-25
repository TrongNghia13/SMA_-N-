import React, { Fragment, useEffect,Suspense } from 'react';
import { Button, Form, Input, Checkbox, Row, Col, message, Select, Card,Spin } from 'antd';
import Icon from '@ant-design/icons';
import BRANCH from '../../models/branch';
import AccountController from '../../services/accountService';
import { APIStatus } from '../../configs/APIConfig';
import LoginUtils from '../../utils/loginUtils';
import logo from '../../assets/images/logo_white2.png';
import './login.scss';
import { LoginOutlined, UserOutlined, LockOutlined} from '@ant-design/icons';
import { Route, Routes,BrowserRouter,Link,useNavigate  } from "react-router-dom";
const accountController = new AccountController();

const FormItem = Form.Item;
type Opts = {
    value: string;
    label: string;
}

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    branchId?: string;
    isSubmit?: boolean;
};

const Login: React.FC = () => {
    let navigate = useNavigate();
    const [dataBranch, setDataBranch] = React.useState<Opts[]>([]);
    const [dataLogin, setDataLogin] = React.useState<FieldType>({ isSubmit: false });

    useEffect(() => {
        accountController.GetListBranch().then((res) => {
            const data = res.data.map((item: BRANCH) => {
                return {
                    value: item.branchID,
                    label: item.branchName
                }
            })
            setDataBranch(data);
        });
    }, []);

    const onFinish = async (values: any) => {
        // values.preventDefault();
        setDataLogin({ ...dataLogin, isSubmit: true });
        var data = await accountController.Login(dataLogin?.username!, dataLogin?.password!, dataLogin?.branchId!);
        if (data.status === APIStatus.SUCCESS && data.success) {
            var dataInfo = JSON.stringify(data.data);
            LoginUtils.SetLogin(dataInfo);
            message.info('Login Successfuly');
                navigate("/");
        }
        else {
            message.error(data.message);
            setDataLogin({ ...dataLogin, isSubmit: false });
        }
      };

    const handleInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
        e.persist();
        const { name, value } = e.currentTarget;
        //    const { name, value } = event.target;
        if (name === 'username') {
            setDataLogin({ ...dataLogin, [name]: value });
        }
        else if (name === 'password') {
            setDataLogin({ ...dataLogin, [name]: value });

        }
    }
    const onChangeBranch = async (value: any, option: any) => {
        setDataLogin({ ...dataLogin, branchId: value });

    }

    return (
        <div className='backGround'>
        <div className="Login-Page">
            <Row className="container-row">
                <Col className="login-area" xs={{ span: 24 }} lg={{ span: 0, offset: 0 }}>
                    <div className="login-content">
                            <div className="logo">
                                <img src={logo} alt="ERP" />
                            </div>
                            <h3>Đăng nhập</h3>
                            <Form onFinish={onFinish}>
                                <Form.Item<FieldType>
                                    name="username"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập tên đăng nhập" },
                                        { pattern: /^[a-zA-Z0-9]+$/, message: "Tên đăng nhập chỉ chứa chữ cái và số" },
                                    ]}
                                    wrapperCol={{ offset: 1, span: 0 }}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Vui lòng nhập Tài Khoản!"
                                        name="username"
                                        // className="input-text-upercase"
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mật khẩu' },
                                        { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },]}
                                    wrapperCol={{ offset: 1, span: 0 }}

                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="Vui lòng nhập mật khẩu!"
                                        name="password"
                                        onChange={handleInputChange} />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    
                                    name="branchId"
                                    valuePropName='branch'
                                    initialValue={dataLogin.branchId}
                                    wrapperCol={{ offset: 1, span: 0 }}

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn đơn vị',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Vui lòng chọn đơn vị"
                                        allowClear
                                        onChange={onChangeBranch}
                                        options={[...dataBranch]}
                                    />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{ offset: 0, span: 0 }}
                                >
                                    <Checkbox>Ghi nhớ</Checkbox>
                                </Form.Item>
                                <FormItem>
                                    <Button
                                        className='button-login'
                                        htmlType="submit"
                                        loading={dataLogin?.isSubmit}>
                                         <LoginOutlined/> Đăng nhập
                                    </Button>
                                </FormItem>
                            </Form>
                       
                    </div>
                </Col>
            </Row>
        </div>
        </div>
    )
}

export default Login;