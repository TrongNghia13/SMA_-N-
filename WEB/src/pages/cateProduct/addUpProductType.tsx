import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, message } from 'antd';
import DialogPage from '../../components/dialog/dialogPage';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import CateProductService from '../../services/cateProductService';
import cateProductType from '../../models/cateProductType';
import { APIStatus } from '../../configs/APIConfig';

interface PropsAddUpProductType {
    type: string,
    productTypeID: string,
    productParentTypeName: string,
    parentID: string,
    callBackSubmit: (() => void)
}
const AddUpProductType: React.FC<PropsAddUpProductType> = (props) => {
    const cateProductService = new CateProductService();
    const { type, productTypeID, productParentTypeName, parentID, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Nhóm Hàng Hóa', confirmLoading: false, destroyOnClose: false });
    const [productTypeModel, setProductTypeModel] = useState((() => {
        let dataInit: cateProductType = {} as any;
        return dataInit;
    }));
    useEffect(() => {
        async function GetData() {
            if (productTypeID === '') {
                setProductTypeModel({ ...productTypeModel, productTypeID: '', productTypeName: '', parentID: parentID, length: 0 });
            }
            else {
                var getDdata = await cateProductService.GetProductTypeByMa(productTypeID);
                setProductTypeModel(getDdata.data);
            }
        };
        GetData();
    }, []);

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        var data;
        if (type === 'add') {
            data = await cateProductService.ProductTypeCreate(productTypeModel);

        } else {
            data = await cateProductService.ProductTypeUpdate(productTypeModel);

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
        setProductTypeModel({ ...productTypeModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const handleChangeCheckBox = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setProductTypeModel({ ...productTypeModel, [name || '']: checked });
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
                    {
                        productTypeID === '' ? (
                            <Form.Item label="Nhóm Cha"
                                initialValue={productParentTypeName}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập chọn nhóm cha hàng hóa',
                                    },
                                ]}
                            >
                                <Input value={productParentTypeName} required disabled={true} name="productParentTypeName" />
                            </Form.Item>
                        ) : ('')
                    }
                    <Form.Item label="Mã nhóm">
                        <Input className="input-text-upercase" value={productTypeModel.productTypeID} disabled={productTypeID !== '' ? true : false} name="productTypeID" onChange={handleChangeInput} required />
                    </Form.Item>
                    <Form.Item label="Mã HH Tự Động">
                        <Checkbox name="isAutoPutId" checked={productTypeModel.isAutoPutId} onChange={handleChangeCheckBox} />
                    </Form.Item>
                    <Form.Item label="Tên Nhóm">
                        <Input required value={productTypeModel.productTypeName} name="productTypeName" onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Độ Dài Mã HH">
                        <Input required value={productTypeModel.length} name="length" type="number" min={0} onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Tiền Tố">
                        <Checkbox name="isPrefix" checked={productTypeModel.isPrefix} onChange={handleChangeCheckBox} />
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpProductType;