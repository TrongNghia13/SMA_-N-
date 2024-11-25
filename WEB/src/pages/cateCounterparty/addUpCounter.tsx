import React, { useState, useEffect } from 'react';
import { Form, Input, message, Checkbox, Col, Select } from 'antd';
import DialogPage from '../../components/dialog/dialogPage';
import NumberFormat from 'react-number-format';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import CateCounterpartyService from '../../services/cateCounterpartyService';

import cateCounterparty from '../../models/cateCounterparty';
import cateCounterpartyGroup from '../../models/cateCounterpartyGroup';
import { APIStatus } from '../../configs/APIConfig';

const { TextArea } = Input;
const { Option } = Select;
interface PropsAddUpCounter {
    counterpartyID: string,
    counterpartyGroup: string,
    counterpartyType: string,
    callBackSubmit: ((counterpartyGroup: string) => void)
}
const AddUpCounter: React.FC<PropsAddUpCounter> = (props) => {

    const cateCounterpartyService = new CateCounterpartyService();

    const { counterpartyID, counterpartyGroup, counterpartyType, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Đối Tác', confirmLoading: false, destroyOnClose: false });
    const [doitacModel, setDoiTacModel] = useState((() => {
        let dataInit: cateCounterparty = {} as any;
        return dataInit;
    }));
    const [nhomDTModel, setNhomDTModel] = useState((() => {
        let dataInit: Array<cateCounterpartyGroup> = [] as any;
        return dataInit;
    }));
    const [loadingUpload, setLoadingUpload] = useState(false);

    useEffect(() => {
        async function GetData() {

            await GetSelectNhomDT();

            if (counterpartyID === '') {
                setDoiTacModel({ ...doitacModel, counterpartyID: '', counterpartyGroup: counterpartyGroup, counterpartyType: counterpartyType });
            }
            else {
                var getDdata = await cateCounterpartyService.GetListCounterPartyByID(counterpartyID);
                if (getDdata) {
                    setDoiTacModel(getDdata.data);
                }
            }

        };
        GetData();

    }, []);

    const GetSelectNhomDT = async () => {
        var getDdata = await cateCounterpartyService.GetListCounterPartyGroup('0', false);
        if (getDdata) {
            setNhomDTModel(getDdata.data);
        }
    }

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {
        var data = await cateCounterpartyService.CreateCounterparty(doitacModel);
        if (data) {
            if (data.status === APIStatus.ERROR) {
                message.error(data.message);
            }
            else {
                setDialogData({ ...dialogData, visible: false });
                callBackSubmit(doitacModel.counterpartyGroup);
            }
        }
    }

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setDoiTacModel({ ...doitacModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const handleChangeInputTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        let { name, value } = e.currentTarget;
        setDoiTacModel({ ...doitacModel, [name]: value });
    }

    const onChangeNhomDoiTac = async (value: any, option: any) => {
        setDoiTacModel({ ...doitacModel, counterpartyGroup: value, counterpartyType: option.props['data-counterpartyType'] });
    }

    const handleChangeCheckBox = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setDoiTacModel({ ...doitacModel, [name || '']: checked });
    }

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
                        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Nhóm ĐT"
                            initialValue={doitacModel.counterpartyGroup}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn nhóm đối tác',
                                },
                            ]}
                        >
                            <Select
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Chọn Nhóm ĐT"
                                onChange={onChangeNhomDoiTac}
                            >

                                {nhomDTModel && nhomDTModel.map(d => (
                                    <Option data-counterpartyType={d.counterpartyType} value={d.counterpartyGroupID} key={d.counterpartyGroupID}>{d.counterpartyGroupName}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={12} >
                        <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="Mã"
                            initialValue={doitacModel.counterpartyID}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã',
                                },
                                {
                                    max: 30,
                                    message: 'Mã không được vượt quá 30 ký tự',
                                }
                            ]}
                        ><Input className="input-text-upercase"
                            disabled={counterpartyID !== '' ? true : false}
                            placeholder="Mã" name="counterpartyID" maxLength={30} onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={24} >
                        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Tên"
                            initialValue={doitacModel.counterpartyName}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên',
                                },
                            ]}
                        >
                            <Input placeholder="Tên" name="counterpartyName" onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={24} >
                        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Địa chỉ"
                            initialValue={doitacModel.counterpartyAddress}
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập địa chỉ',
                                },
                            ]}
                        >
                            <Input placeholder="địa chỉ" name="counterpartyAddress" onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={12} >
                        <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="Liên hệ"
                            initialValue={doitacModel.counterpartyTel}
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập liên hệ',
                                },
                            ]}
                        ><Input placeholder="lienhe" name="counterpartyTel" onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="Email"
                            className='counterpartyEmail'
                            initialValue={doitacModel.counterpartyEmail}
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập số điện thoại',
                                },
                            ]}
                        >
                            <Input placeholder="Email" name="counterpartyEmail" onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={12} >
                        <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="MST"
                            initialValue={doitacModel.counterpartyTaxCode}
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập MST',
                                },
                            ]}
                        ><Input placeholder="MST" name="counterpartyTaxCode" onChange={handleChangeInput} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <div className="clearfix"></div>
                    <Col span={18}>
                    </Col>
                    <Col span={6} className="text-right">
                        <Form.Item>
                            <Checkbox name="isRelationship" checked={doitacModel.isRelationship} onChange={handleChangeCheckBox}>Quan hệ</Checkbox>
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                    <Col span={24} >
                        <Form.Item label="Ghi Chú"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập ghi chú',
                                },
                            ]}
                            initialValue={doitacModel.counterpartyDescription}
                        ><TextArea rows={5} placeholder="Ghi chú" name="counterpartyDescription" onChange={handleChangeInputTextArea} />
                        </Form.Item>
                    </Col>
                    <div className="clearfix"></div>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpCounter;