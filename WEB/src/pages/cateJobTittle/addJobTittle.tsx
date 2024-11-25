import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, message, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
// import { FormComponentProps } from 'antd/lib/form/Form';
import DialogPage from '../../components/dialog/dialogPage';

import CateJobTittleController from '../../services/cateJobTittleService';
import cateJobtitle from '../../models/cateJobTitle';
import { APIStatus } from '../../configs/APIConfig';
import CateJobTitle from './Index';
import Icon from '@ant-design/icons/lib/components/Icon';

interface PropsAddUpChucDanh  {
    id: number,
    callBackSubmit: (() => void)
}
const AddUpChucDanh: React.FC<PropsAddUpChucDanh> = (props) => {

    const chucDanhController = new CateJobTittleController();

    const { id, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Chức Danh', confirmLoading: false, destroyOnClose: false });
    const [chuDanhModel, setChucDanhModel] = useState((() => {
        let dataInit: cateJobtitle = {} as any;
        return dataInit;
    }));
    
    // const { getFieldDecorator } = props.form;

    useEffect(() => {
        async function GetData() {

            if (id === 0) {
                setChucDanhModel({ ...chuDanhModel, jobTitleID: 0 });
            }
            else {
                var getDdata = await chucDanhController.GetById(id);
                setChucDanhModel(getDdata.data);
            }
        };
        GetData();
    }, []);

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        if (chuDanhModel.jobTitleName !=null ) {
            var data: any;
            if (id === 0) {
                data = await chucDanhController.Create(chuDanhModel);

            } else {
                data = await chucDanhController.Update(chuDanhModel);

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
        setChucDanhModel({ ...chuDanhModel, [name]: (type === 'number' ? parseFloat(value) : value) });
        
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
                {/* <Form.Item<cateJobtitle>
                        label="ID"
                        name="jobTitleID"
                        rules={[
                            { required: true, message: "Vui lòng nhập số thứ tự" },
                            { pattern: /^[0-9]+$/, message: "Mục nhập phải là chữ số" },
                           
                        ]}
                        wrapperCol={{ offset: 1, span: 0 }}
                        >
                        <Input
                           name="jobTitleID" onChange={handleChangeInput} 
                        />
                    </Form.Item> */}
                    <Form.Item<cateJobtitle>
                        label="Chức Danh"
                        name="jobTitleName"
                        rules={[
                            { required: true,
                                message: 'Vui lòng nhập tên chức danh !',}
                           
                        ]}
                        wrapperCol={{ offset: 1, span: 0 }}
                        >
                        <Input   
                         
                           name="jobTitleName" onChange={handleChangeInput} placeholder={chuDanhModel.jobTitleName == null ? "Vui lòng nhập tên chức danh !" : chuDanhModel.jobTitleName} 
                       
                           required
                        />
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpChucDanh;