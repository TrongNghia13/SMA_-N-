import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, message, Col, Select, Tabs, TimePicker, Divider } from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';
import DialogPage from '../../components/dialog/dialogPage';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment, { Moment } from 'moment';

import UsersService from '../../services/userService';
import CateBranchService from '../../services/cateBranchService';
import PermissionsSystemService from '../../services/permissionsSystemService';
import EmployeeService from '../../services/employeeService';
import RoleService from '../../services/roleService';
// import DMErpController from '../../services/DMErpController';

import users, { usersManagerVm } from '../../models/users';
import cateBranch from '../../models/cateBranch';
import permissionsSystem from '../../models/permissionsSystem';
import employee from '../../models/employee';
import role from '../../models/role';
// import DM_ERP from '../../models/DM_ERP';
// import USER_KHUNGGIO from '../../models/USER_KHUNGGIO';

import { APIStatus } from '../../configs/APIConfig';

const { Option } = Select;
const { TabPane } = Tabs;
interface PropsAddUpUser {
    userID: number,
    callBackSubmit: (() => void)
}
const AddUpUsers: React.FC<PropsAddUpUser> = (props) => {

    const timeForMat = 'HH';

    const usersService = new UsersService();
    const cateBranchService = new CateBranchService();
    const permissionsSystemService = new PermissionsSystemService();
    const employeeService = new EmployeeService();
    const roleService = new RoleService();
    // const dmErpController = new DMErpController();

    const { userID, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật User', confirmLoading: false, destroyOnClose: false });
    const [userModel, setUserModel] = useState((() => {
        let dataInit: users = {} as any;
        return dataInit;
    }));
    const [optionUserModel, setOptionUserModel] = useState({ roleIds: Array<number>(), branchIDs: Array<string>() });
    const [nhanVienModel, setNhanVienModel] = useState((() => {
        let dataInit: Array<employee> = [] as any;
        return dataInit;
    }));

    // const [modelERP, setModelERP] = useState(Array<DM_ERP>());

    const [donviUDModel, setDonviUDModel] = useState(Array<cateBranch>());
    const [roleModel, setRoleModel] = useState(Array<role>());

    const [loadingUpload, setLoadingUpload] = useState(false);
    useEffect(() => {
        async function GetData() {

            await GetListNhanVien();
            await GetListRoles();
            await GetListDonViUD();
            if (userID <= 0) {
                setUserModel({ ...userModel, userID: 0, userName: '', password: '', isActive: false, isAccessHour: false, isAccessIP: false });

            }
            else {
                var getDdata = await usersService.GetManagerByID(userID);
                setUserModel(getDdata.data.user);
                setOptionUserModel({
                    ...optionUserModel,
                    roleIds: getDdata.data.roleForUser,
                    branchIDs: getDdata.data.branchForUser,
                });
            }
        };
        GetData();

    }, []);

    const GetListNhanVien = async () => {
        var getDdata = await employeeService.GetListEmployee();
        setNhanVienModel(getDdata.data);
    }


    const GetListDonViUD = async () => {
        var getDdata = await cateBranchService.GetList();
        setDonviUDModel(getDdata.data);
    }


    const GetListRoles = async () => {
        var getDdata = await roleService.GetList();
        setRoleModel(getDdata.data);
    }

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        const userManagerVM: usersManagerVm = {} as any;
        userManagerVM.user = userModel;
        var _roleModelPost: any = [];
        var _donviUDModelPost: any = [];

        optionUserModel.roleIds.forEach(item => {
            var roleFind = roleModel.find(x => x.roleID == item);
            if (roleFind && roleFind.roleID > 0) {
                _roleModelPost.push(roleFind.roleID);
            }
        });

        optionUserModel.branchIDs.forEach(item => {
            var donviUDFind = donviUDModel.find(x => x.branchID == item);
            if (donviUDFind && donviUDFind.branchID !== '') {
                _donviUDModelPost.push(donviUDFind.branchID);
            }
        });

        userManagerVM.roleForUser = _roleModelPost;
        userManagerVM.branchForUser = _donviUDModelPost;
        await usersService.UserMananger(userManagerVM);
    }

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setUserModel({ ...userModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const handleChangeCheckBox = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setUserModel({ ...userModel, [name || '']: checked });
    };

    const onChangeNhanVien = async (value: any, option: any) => {
        setUserModel({ ...userModel, employeeID: parseFloat(value) });
    }

    const handleChangeRoles = (e: any) => {
        const roleIds = optionUserModel.roleIds;
        let index;
        if (e.target.checked) {
            roleIds.push(e.target.value)
        } else {
            index = roleIds.indexOf(e.target.value)
            roleIds.splice(index, 1)
        }
        setOptionUserModel({ ...optionUserModel, roleIds: roleIds });
    };

    const handleChangeDonViUD = (e: any) => {
        const branchIDs = optionUserModel.branchIDs;
        let index;
        if (e.target.checked) {
            branchIDs.push(e.target.value)
        } else {
            index = branchIDs.indexOf(e.target.value)
            branchIDs.splice(index, 1)
        }
        setOptionUserModel({ ...optionUserModel, branchIDs: branchIDs });
    };
    
    return (
        <div>
            <DialogPage
                width="70%"
                title={dialogData.title}
                visible={dialogData.visible}
                confirmLoading={dialogData.confirmLoading}
                onCancel={onCancel}
                onOk={onOk}
                destroyOnClose={dialogData.destroyOnClose}>
                <Form>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Thông tin" key="addup_user_info">
                            <Col span={24} >
                                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Nhân Viên"
                                    initialValue={userModel.employeeID}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn nhân viên cho user !',
                                        }
                                    ]}
                                >

                                    <Select
                                    value={userModel.employeeID}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Chọn nhân viên"
                                        onChange={onChangeNhanVien}
                                    >

                                        {nhanVienModel && nhanVienModel.map(d => (
                                            <Option value={d.employeeID} key={d.employeeID}>{d.fullName}</Option>
                                        ))}

                                    </Select>
                                </Form.Item>
                            </Col>
                            <div className="clearfix"></div>
                            <Col span={12} >
                                <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="Tên đăng nhập"
                                    initialValue={userModel.userName}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập user name',
                                        }
                                    ]}
                                >
                                    <Input value={userModel.userName} autoComplete="new-userName" placeholder="Tên đăng nhập" name="userName" onChange={handleChangeInput} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="Mật khẩu"
                                    initialValue={userModel.password}
                                    rules={[{
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu',
                                    }]}
                                >
                                    <Input.Password value={userModel.password} autoComplete="new-password" placeholder="Mật khẩu" name="password" onChange={handleChangeInput} />
                                </Form.Item>
                            </Col>
                            <div className="clearfix"></div>
                            <Col span={5} >
                            </Col>
                            <Col span={19} >
                                <Form.Item>
                                    <Checkbox value={userModel.isActive} name="active" checked={userModel.isActive} onChange={handleChangeCheckBox}>Active</Checkbox>
                                </Form.Item>
                            </Col>
                            <div className="clearfix"></div>
                            <Col span={5} >
                            </Col>
                            <Col span={19} >
                                <Form.Item>
                                    <Checkbox value={userModel.isAccessIP} name="isAccessIP" checked={userModel.isAccessIP} onChange={handleChangeCheckBox}>Truy Cập IP</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    rules={[{
                                        required: false,
                                        message: 'Vui lòng nhập public',
                                    }]}
                                    initialValue={userModel.publicIP}
                                ><Input value={userModel.publicIP} placeholder="Public IP" name="publicIP" onChange={handleChangeInput} />
                                </Form.Item>
                            </Col>
                        </TabPane>
                        <TabPane tab="Phân Quyền" key="addup_user_phanquyen">
                            <Col span={19}>
                                <Col span={12}>
                                    <section className="code-box-meta markdown">
                                        <div className="code-box-title">ROLE MENU</div>
                                        <div className="code-box-description" style={{ paddingLeft: 25 }}>
                                            <Form.Item className="checkboxgroup-fullwidth">
                                                {/* <Checkbox.Group defaultValue={optionUserModel.roleIds.map(String)} className="checkboxgroup-fullwidth" onChange={handleChangeRoles}> */}
                                                {roleModel && roleModel.filter(p => p.roleType === 'M').map(d => (
                                                    <Checkbox onChange={handleChangeRoles} checked={(optionUserModel.roleIds.indexOf(d.roleID) > -1)} name="roleIds" key={d.roleID} value={d.roleID}>{d.roleName}</Checkbox>
                                                ))}
                                                {/* </Checkbox.Group> */}
                                            </Form.Item>
                                        </div>
                                    </section>
                                </Col>
                                <Col span={12}>
                                    <section className="code-box-meta markdown">
                                        <div className="code-box-title">ROLE MOBILE</div>
                                        <div className="code-box-description" style={{ paddingLeft: 25 }}>
                                            <Form.Item className="checkboxgroup-fullwidth">
                                                {/* <Checkbox.Group defaultValue={optionUserModel.roleIds.map(String)} className="checkboxgroup-fullwidth" onChange={handleChangeRoles}> */}
                                                {roleModel && roleModel.filter(p => p.roleType === 'A').map(d => (
                                                    <Checkbox onChange={handleChangeRoles} checked={(optionUserModel.roleIds.indexOf(d.roleID) > -1)} name="roleIds" key={d.roleID} value={d.roleID}>{d.roleName}</Checkbox>
                                                ))}
                                                {/* </Checkbox.Group> */}
                                            </Form.Item>
                                        </div>
                                    </section>
                                </Col>
                                <Col span={12}>
                                    <section className="code-box-meta markdown">
                                        <div className="code-box-title">ROLE REPORT</div>
                                        <div className="code-box-description" style={{ paddingLeft: 25 }}>
                                            <Form.Item className="checkboxgroup-fullwidth">
                                                {/* <Checkbox.Group defaultValue={optionUserModel.roleIds.map(String)} className="checkboxgroup-fullwidth" onChange={handleChangeRoles}> */}
                                                {roleModel && roleModel.filter(p => p.roleType === 'R').map(d => (
                                                    <Checkbox onChange={handleChangeRoles} checked={(optionUserModel.roleIds.indexOf(d.roleID) > -1)} name="roleIds" key={d.roleID} value={d.roleID}>{d.roleName}</Checkbox>
                                                ))}
                                                {/* </Checkbox.Group> */}
                                            </Form.Item>
                                        </div>
                                    </section>
                                </Col>
                                <div className="clearfix"></div>
                                <section className="code-box-meta markdown">
                                    <div className="code-box-title">ĐƠN VỊ ỨNG DỤNG</div>
                                    <div className="code-box-description" style={{ paddingLeft: 25 }}>
                                        <Form.Item className="checkboxgroup-fullwidth">
                                            {/* <Checkbox.Group defaultValue={optionUserModel.branchIDs} className="checkboxgroup-fullwidth" onChange={handleChangeDonViUD}> */}
                                            {donviUDModel && donviUDModel.map(d => (
                                                <Checkbox onChange={handleChangeDonViUD} checked={(optionUserModel.branchIDs.indexOf(d.branchID) > -1)} key={d.branchID} value={d.branchID}>{d.branchName} </Checkbox>
                                            ))}
                                            {/* </Checkbox.Group> */}
                                        </Form.Item>
                                    </div>
                                </section>
                            </Col>
                            <div className="clearfix"></div>
                        </TabPane>
                    </Tabs>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpUsers;