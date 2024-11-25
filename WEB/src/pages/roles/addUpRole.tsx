import React, { useState, useEffect } from 'react';
import { Form, Input, message, Select } from 'antd';
import DialogPage from '../../components/dialog/dialogPage';

import RoleService from '../../services/roleService';
import { APIStatus } from '../../configs/APIConfig';
import ROLES from '../../models/role';

interface PropsAddUpRole {
    type: string,
    roleID: number,
    callBackSubmit: (() => void)
}

const { Option } = Select;

const AddUpRole: React.FC<PropsAddUpRole> = (props) => {

    const roleService = new RoleService();

    const { type, roleID, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Role', confirmLoading: false, destroyOnClose: false });
    const [roleModel, setRoleModel] = useState((() => {
        let dataInit: ROLES = {} as any;
        return dataInit;
    }));


    useEffect(() => {
        async function GetData() {
            if (roleID === 0) {
                setRoleModel({ ...roleModel, roleID: 0, roleType: 'M' });
            } else {
                var getDdata = await roleService.GetRoleById(roleID);
                setRoleModel(getDdata.data);
            }
        };
        GetData();
    }, []);

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        var data;
        if (type == "add") {
            data = await roleService.Create(roleModel);

        } else {
            data = await roleService.Update(roleModel);

        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
        } else {
            setDialogData({ ...dialogData, visible: false });
            callBackSubmit();
        }
    }

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setRoleModel({ ...roleModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const onChangeLoai = async (value: any, option: any) => {
        setRoleModel({ ...roleModel, roleType: value });
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
                <Form {...formItemLayout}>
                    <Form.Item label="Tên Role"
                        initialValue={roleModel.roleName}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên role',
                            },
                        ]}
                    ><Input value={roleModel.roleName} name="roleName" onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Ghi Chú"
                        initialValue={roleModel.roleComment}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ghi chú',
                            },
                        ]}
                    >
                        <Input value={roleModel.roleComment} name="roleComment" onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Loại"
                        initialValue={roleModel.roleType}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn Loại',
                            },
                        ]}
                    >
                        <Select
                            value={roleModel.roleType}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Loại"
                            onChange={onChangeLoai}
                        >
                            <Option value={'M'} key={'M'}>Menu</Option>
                            <Option value={'R'} key={'R'}>Report</Option>
                            <Option value={'A'} key={'A'}>Mobile</Option>

                        </Select>
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>
    )
}

export default AddUpRole;
