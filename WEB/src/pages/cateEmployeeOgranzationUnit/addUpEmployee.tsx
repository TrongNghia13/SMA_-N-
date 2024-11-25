import React, { useState, useEffect } from 'react';
import { Form, Input, message, Upload, Col, TreeSelect, Select } from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';
import DialogPage from '../../components/dialog/dialogPage';

import EmployeeService from '../../services/employeeService';
import CateOrganizationService from '../../services/cateOrganizationService';
import CateJobTittleService from '../../services/cateJobTittleService';

import DM_CHUCDANH from '../../models/cateJobTitle';
import { employeeVm } from '../../models/employee';
import { APIStatus } from '../../configs/APIConfig';
import TreeData from '../../models/ui/treeData';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
interface PropsAddUpEmployee {
    type: string,
    employeeID: number,
    organizationUnitID: number,
    callBackSubmit: ((organizationUnitID: number) => void)
}
const AddUpEmployee: React.FC<PropsAddUpEmployee> = (props) => {

    const employeeService = new EmployeeService();
    const cateOrganizationService = new CateOrganizationService();
    const cateJobTittleService = new CateJobTittleService();

    const {type, employeeID, organizationUnitID, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Nhân Viên', confirmLoading: false, destroyOnClose: false });
    const [nhanvienModel, setNhanVienModel] = useState((() => {
        let dataInit: employeeVm = {} as any;
        return dataInit;
    }));
    const [treeDonVi, setTreeDonVi] = useState((() => {
        let dataInit: Array<TreeData> = [] as any;
        return dataInit;
    }));
    const [dataChucDanh, setDataChucDanh] = useState((() => {
        let dataInit: Array<DM_CHUCDANH> = [] as any;
        return dataInit;
    }));
    const [loadingUpload, setLoadingUpload] = useState(false);

    useEffect(() => {
        async function GetData() {

            await GetTreeDataDonVi();
            await GetSelectChucDanh();

            if (employeeID === 0) {
                setNhanVienModel({ ...nhanvienModel, employeeID: 0, organizationUnitID: organizationUnitID });
            }
            else {
                var getDdata = await employeeService.GetByID(employeeID);
                setNhanVienModel(getDdata.data);
            }

        };
        GetData();

    }, []);

    const GetTreeDataDonVi = async () => {
        var getDdata = await cateOrganizationService.GetListTreeSelect();
        setTreeDonVi(getDdata.data);
    }

    const GetSelectChucDanh = async () => {
        var getDdata = await cateJobTittleService.GetList();
        setDataChucDanh(getDdata.data);
    }

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        var data;
        if (type === "add") {
            data = await employeeService.CreateEmployee(nhanvienModel);
        } else {
            data = await employeeService.UpdateEmployee(nhanvienModel);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
        }
        else {
            setDialogData({ ...dialogData, visible: false });
            callBackSubmit(nhanvienModel.organizationUnitID);
        }
    }

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setNhanVienModel({ ...nhanvienModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const handleChangeInputTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        let { name, value } = e.currentTarget;
        setNhanVienModel({ ...nhanvienModel, [name]: value });
    }

    const onChangeChuCDanh = async (value: any, option: any) => {
        setNhanVienModel({ ...nhanvienModel, jobTitleID: parseFloat(value) });
    }

    const onChangeDonVi = async (value: any, node: any, extra: any) => {
        setNhanVienModel({ ...nhanvienModel, organizationUnitID: parseFloat(value) });
    }

    const uploadButton = (
        <div>
            {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

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
                <Form>
                    <Col span={24} >
                        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Bộ Phận"
                            initialValue={nhanvienModel.organizationUnitID}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn bộ phận cho nhân viên',
                                },
                            ]}><TreeSelect
                                value={nhanvienModel.organizationUnitID}
                                treeData={treeDonVi}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Chọn bộ phận"
                                treeDefaultExpandAll
                                onChange={onChangeDonVi}
                            />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={24} >
                        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Chức Danh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn chức danh cho nhân viên',
                                },
                            ]}
                            initialValue={nhanvienModel.jobTitleID}
                        >
                            <Select
                                value={nhanvienModel.jobTitleID}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Chọn chức danh"
                                onChange={onChangeChuCDanh}
                            >

                                {dataChucDanh && dataChucDanh.map(d => (
                                    <Option value={d.jobTitleID} key={d.jobTitleID}>{d.jobTitleName}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={24} >
                        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Mã Số NV"
                            initialValue={nhanvienModel.employeeCode}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã số nhân viên',
                                },
                                {
                                    max: 10,
                                    message: 'Mã số nhân viên không được vượt quá 10 ký tự',
                                }
                            ]}
                        >
                            <Input value={nhanvienModel.employeeCode} className="input-text-upercase" placeholder="Mã Số Nhân Viên" name="employeeCode" maxLength={10} onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={24} >
                        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Tên Nhân Viên"
                            initialValue={nhanvienModel.fullName}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên nhân viên',
                                },
                            ]}
                        >
                            <Input value={nhanvienModel.fullName} placeholder="Tên Nhân Viên" name="fullName" onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={12} >
                        <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="Email"
                            initialValue={nhanvienModel.employeeEmail}
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập employeeEmail',
                                },
                            ]}
                        >
                            <Input value={nhanvienModel.employeeEmail} placeholder="Email" name="employeeEmail" onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="SĐT"
                            initialValue={nhanvienModel.employeeTel}
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập số điện thoại',
                                },
                            ]}
                        >
                            <Input value={nhanvienModel.employeeTel} placeholder="số điện thoại" name="employeeTel" onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={6}>
                        <Form.Item label="Avatar">
                            <Upload
                                name="img"
                                listType="picture-card"
                                className="avatar-uploader"
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Col span={24} >
                            <Form.Item label="Ghi Chú"
                                initialValue={nhanvienModel.description}
                                rules={[
                                    {
                                        required: false,
                                        message: 'Vui lòng nhập ghi chú',
                                    },
                                ]}
                            >
                                <TextArea value={nhanvienModel.description} rows={5} placeholder="Ghi chú" name="description" onChange={handleChangeInputTextArea} />
                            </Form.Item>
                        </Col>
                        <div className="clearfix"></div>
                    </Col>
                    <div className="clearfix"></div>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpEmployee;