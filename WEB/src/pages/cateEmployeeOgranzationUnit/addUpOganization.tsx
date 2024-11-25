import React, { useState, useEffect } from 'react';
import { Form, Input, TreeSelect, message, Select } from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';
import DialogPage from '../../components/dialog/dialogPage';
import CateOrganizationService from '../../services/cateOrganizationService';
import CateOrganizationTypeService from '../../services/cateOrganizationTypeService';

import organizationUnit from '../../models/organizationUnit';
import organizationUnitType from '../../models/organizationUnitType';

import { APIStatus } from '../../configs/APIConfig';
import TreeData from '../../models/ui/treeData';

const { Option } = Select;

interface PropsAddUpOganization {
    type: string,
    organizationUnitId: number,
    organizationUnitTypeID: number,
    callBackSubmit: (() => void)
}
const AddUpOganization: React.FC<PropsAddUpOganization> = (props) => {

    const cateOrganizationService = new CateOrganizationService();
    const cateOrganizationTypeService = new CateOrganizationTypeService();

    const { type, organizationUnitId, organizationUnitTypeID = 0, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Đơn Vị', confirmLoading: false, destroyOnClose: false });
    const [donviModel, setDonViModel] = useState((() => {
        let dataInit: organizationUnit = {} as any;
        return dataInit;
    }));
    const [treeDonVi, setTreeDonVi] = useState((() => {
        let dataInit: Array<TreeData> = [] as any;
        return dataInit;
    }));
    const [dataPhanCap, setDataPhanCap] = useState((() => {
        let dataInit: Array<organizationUnitType> = [] as any;
        return dataInit;
    }));

    useEffect(() => {
        async function GetData() {

            await GetTreeSelectDonVi();
            await GetSelectPhanCap();

            if (organizationUnitId === 0) {
                setDonViModel({ ...donviModel, organizationUnitID: 0, organizationUnitTypeID: organizationUnitTypeID });
            }
            else {
                var getDdata = await cateOrganizationService.GetByID(organizationUnitId);
                setDonViModel(getDdata.data);
            }
        };
        GetData();
    }, []);

    const GetTreeSelectDonVi = async () => {
        var getDdata = await cateOrganizationService.GetListTypeTreeSelect();
        setTreeDonVi(getDdata.data);
    }

    const GetSelectPhanCap = async () => {
        var getDdata = await cateOrganizationTypeService.GetListAll();
        setDataPhanCap(getDdata.data);
    }

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        var data;
        if (type === 'add') {
            data = await cateOrganizationService.CreateOrgani(donviModel);
        } else {
            data = await cateOrganizationService.UpdateOrgani(donviModel);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
        }
        else {
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
        setDonViModel({ ...donviModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const onChangeCapTrenDonVi = async (value: any, node: any, extra: any) => {
        setDonViModel({ ...donviModel, organizationUnitTypeID: parseFloat(value) });
    }

    // const onChangePhanCap = async (value: any, option: any) => {
    //     setDonViModel({ ...donviModel, phancap: parseFloat(value) });
    // }

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
                    <Form.Item label="Cấp Trên"
                        initialValue={donviModel.organizationUnitTypeID}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn cấp trên',
                            },
                        ]}
                    ><TreeSelect
                            value={donviModel.organizationUnitTypeID}
                            treeData={treeDonVi}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Chọn Cấp Trên"
                            treeDefaultExpandAll
                            onChange={onChangeCapTrenDonVi}
                        />
                    </Form.Item>
                    <Form.Item label="Tên Đơn Vị"
                        initialValue={donviModel.organizationUnitName}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên đơn vị',
                            },
                        ]}
                    >
                        <Input value={donviModel.organizationUnitName} name="organizationUnitName" onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Người Đại Diện"
                        initialValue={donviModel.companyOwnerName}
                        rules={[
                            {
                                required: false,
                                message: 'Vui lòng nhập người đại diện',
                            },
                        ]}
                    >
                        <Input value={donviModel.companyOwnerName} name="companyOwnerName" onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Số Điện Thoại"
                        initialValue={donviModel.phone}
                        rules={[
                            {
                                required: false,
                                message: 'Vui lòng nhập số điện thoại người đại diện',
                            },
                        ]}
                    ><Input value={donviModel.phone} name="phone" onChange={handleChangeInput} />
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpOganization;