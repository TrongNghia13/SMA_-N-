import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Checkbox, message, Upload, Col, TreeSelect } from 'antd';
import { DataGrid, GridColumn, NumberBox, TextBox, Tooltip, LinkButton } from 'rc-easyui';

import IAntdUpload from '../../models/iAntdUpload';

import DialogPage from '../../components/dialog/dialogPage';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import CateProductService from '../../services/cateProductService';
import MediaUploadService from '../../services/mediaUploadService';

import { cateProductVm } from '../../models/cateProduct';

import { APIStatus } from '../../configs/APIConfig';
import TreeData from '../../models/ui/treeData';
import { NumericFormat } from 'react-number-format';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
interface PropsAddUpProduct {
    type: string,
    productID: string,
    productTypeModel: any,
    callBackSubmit: ((productTypeID: string) => void)
}
const AddUpProduct: React.FC<PropsAddUpProduct> = (props) => {
    const cateProductService = new CateProductService();
    const { type, productID, productTypeModel, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Hàng Hóa', confirmLoading: false, destroyOnClose: false });
    const [cateProductModel, setHangHoaModel] = useState((() => {
        let dataInit: cateProductVm = {} as any;
        return dataInit;
    }));
    const [treeNhomHangHoa, setTreeNhomHangHoa] = useState((() => {
        let dataInit: Array<TreeData> = [] as any;
        return dataInit;
    }));
    const [loadingUpload, setLoadingUpload] = useState(false);
    useEffect(() => {
        async function GetData() {

            await GetTreeDataNhomHangHoa();

            if (productID === '') {

                var productIDAuto = await cateProductService.GetAutoProductID(productTypeModel.productTypeID, productTypeModel.length, productTypeModel.IsAutoPutID, productTypeModel.IsPrefix);
                setHangHoaModel({ ...cateProductModel, productTypeID: productTypeModel.productTypeID, productID: productIDAuto.data, productName: '', stockMin: 0, stockMax: 0, isUse: true });

            }
            else {

                var getDdata = await cateProductService.GetProductById(productID);
                setHangHoaModel(getDdata.data);

            }

        };
        GetData();

    }, []);

    const GetTreeDataNhomHangHoa = async () => {
        var getDdata = await cateProductService.GetListProductTypeTreeGridSelect();
        setTreeNhomHangHoa(getDdata.data);
    }



    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        var data;
        if (type === 'add') {
            data = await cateProductService.CreateProduct(cateProductModel);
        } else {
            data = await cateProductService.UpdateProduct(cateProductModel);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
        }
        else {
            setDialogData({ ...dialogData, visible: false });
            callBackSubmit(cateProductModel.productTypeID);
        }
    }

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setHangHoaModel({ ...cateProductModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }


    const handleChangeInputTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        let { name, value } = e.currentTarget;
        setHangHoaModel({ ...cateProductModel, [name]: value });
    }

    const handleChangeCheckBox = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setHangHoaModel({ ...cateProductModel, [name || '']: checked });
    }

    const onChangeNhomHangHoa = async (value: any, node: any, extra: any) => {
        setHangHoaModel({ ...cateProductModel, productTypeID: value });
        var attrDatas = extra.triggerNode.props.attrData;
        var proData = JSON.parse(attrDatas);
        await GetMaHangHoa(value, proData.Length, proData.IsAutoPutID, proData.IsPrefix);
    }

    const handleChangeMinStock = (value: any) => {
        const floatValue = value.floatValue || 0;
        setHangHoaModel({ ...cateProductModel, stockMin: floatValue })
    }

    const handleChangeMaxStock = (value: any) => {
        const floatValue = value.floatValue || 0;
        setHangHoaModel({ ...cateProductModel, stockMax: floatValue })
    }

    const GetMaHangHoa = async (productTypeID: string, length: number, isAutoPutID: boolean, isPrefix: boolean) => {
        var productIDAuto = await cateProductService.GetAutoProductID(productTypeID, length, isAutoPutID, isPrefix);
        setHangHoaModel({ ...cateProductModel, productTypeID: productTypeID, productID: productIDAuto.data });
    }

    const uploadButton = (
        <div>
            loadingUpload ? <LoadingOutlined /> : <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

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
                    <Col span={20}>
                        <Col span={24} >
                            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Nhóm Hàng Hóa"
                                initialValue={cateProductModel.productTypeID}
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Vui lòng chon nhóm hàng hóa',
                                        },
                                    ]
                                }
                            >
                                <TreeSelect
                                    value={cateProductModel.productTypeID}
                                    treeData={treeNhomHangHoa}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="Chọn nhóm hàng hóa"
                                    treeDefaultExpandAll
                                    onChange={onChangeNhomHangHoa}
                                />
                            </Form.Item>
                        </Col>
                        <div className="clearfix"></div>
                        <Col span={12} >
                            <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="Mã Hàng Hóa"
                                initialValue={cateProductModel.productID}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mã hàng hóa',
                                    },
                                ]}
                            >
                                <Input value={cateProductModel.productID} className="input-text-upercase" placeholder="mã hàng hóa" name="productID" onChange={handleChangeInput} />
                            </Form.Item>
                        </Col>
                        <div className="clearfix"></div>
                        <Col span={24} >
                            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Tên Hàng"
                                initialValue={cateProductModel.productName}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên hàng hóa',
                                    },
                                ]}
                            >
                                <Input value={cateProductModel.productName} placeholder="Tên Hàng Hóa" name="productName" onChange={handleChangeInput} />
                            </Form.Item>
                        </Col>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={20} >
                        <Col span={12} >
                            <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14, className: "input-text-capitalize" }} label="Đơn Vị Tính"
                                initialValue={cateProductModel.productUnit}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đơn vị tính',
                                    },
                                ]}
                            >
                                <Input value={cateProductModel.productUnit} placeholder="Đơn vị tính" name="productUnit" onChange={handleChangeInput} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14, className: "input-text-capitalize" }} label="Quy Cách"
                                initialValue={cateProductModel.specification}
                                rules={[
                                    {
                                        required: false,
                                        message: 'Vui lòng nhập quy cách hàng hóa',
                                    },
                                ]}
                            >
                                <Input value={cateProductModel.specification} placeholder="Quy cách" name="specification" onChange={handleChangeInput} />
                            </Form.Item>
                        </Col>
                        <div className="clearfix"></div>
                        <Col span={12}>
                            <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14, className: "ant-input-number-warper" }} label="Trữ lượng hàng tối thiểu"
                                initialValue={cateProductModel.stockMin}
                            >

                                <NumericFormat
                                    value={cateProductModel.stockMin}
                                    className="ant-input-number-input input-text-right w-100"
                                    thousandSeparator={true}
                                    name="stockMin"
                                    onValueChange={handleChangeMinStock} />

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14, className: "ant-input-number-warper" }} label="Trữ lượng hàng tối đa"
                                initialValue={cateProductModel.stockMax}

                            >
                                <NumericFormat
                                    value={cateProductModel.stockMax}

                                    className="ant-input-number-input input-text-right w-100"
                                    thousandSeparator={true}
                                    name="stockMax"
                                    onValueChange={handleChangeMaxStock} />

                            </Form.Item>
                        </Col>
                        <div className="clearfix"></div>

                    </Col>
                    <Col span={4}>
                        <div style={{ marginLeft: 20 }}>
                            <Col span={24} >
                                <Form.Item>
                                    <Checkbox name="isUse" checked={cateProductModel.isUse} onChange={handleChangeCheckBox}>Sử dụng</Checkbox>
                                </Form.Item>
                            </Col>
                        </div>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={10}>
                        <Form.Item label="Ghi Chú"
                            initialValue={cateProductModel.description}
                        >
                            <TextArea value={cateProductModel.description} rows={7} placeholder="Ghi chú" name="description" onChange={handleChangeInputTextArea} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpProduct;