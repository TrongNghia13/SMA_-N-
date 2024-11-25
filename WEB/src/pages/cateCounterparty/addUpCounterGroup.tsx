import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, message, Select } from 'antd';
import DialogPage from '../../components/dialog/dialogPage';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import CateCounterpartyService from '../../services/cateCounterpartyService';
import cateCounterpartyGroup from '../../models/cateCounterpartyGroup';
import cateCounterpartyType from '../../models/cateCounterpartyType';
import { APIStatus } from '../../configs/APIConfig';
const { Option } = Select;
interface PropsAddUpCounterGroup {
    counterpartyGroupID: string,
    counterpartyType: string,
    callBackSubmit: (() => void)
}
const AddUpCounterGroup: React.FC<PropsAddUpCounterGroup> = (props) => {
    const cateCounterpartyService = new CateCounterpartyService();
    const { counterpartyGroupID, counterpartyType, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Nhóm Đối Tác', confirmLoading: false, destroyOnClose: false });
    const [nhomDTModel, setNhomDTModel] = useState((() => {
        let dataInit: cateCounterpartyGroup = {} as any;
        return dataInit;
    }));
    const [counterpartyTypeModel, setLoaiDTModel] = useState((() => {
        let dataInit: Array<cateCounterpartyType> = [] as any;
        return dataInit;
    }));
    useEffect(() => {
        async function GetData() {
            await GetListLoaiDoiTac();
            if (counterpartyGroupID === '') {
                setNhomDTModel({ ...nhomDTModel, counterpartyGroupID: '', counterpartyGroupName: '', counterpartyType: counterpartyType, length: 0 });
            }
            else {
                var getDdata = await cateCounterpartyService.GetCounterPartyGroupByID(counterpartyGroupID);
                setNhomDTModel(getDdata.data);
            }
        };
        GetData();
    }, []);

    const GetListLoaiDoiTac = async () => {
        var getDdata = await cateCounterpartyService.GetListCounterPartyGroupType();
        setLoaiDTModel(getDdata.data);
    }

    const onOk = async (event: React.MouseEvent<HTMLElement>) => {

        var data = await cateCounterpartyService.CreateCounterpartyGroup(nhomDTModel);
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
        setNhomDTModel({ ...nhomDTModel, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const handleChangeCheckBox = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setNhomDTModel({ ...nhomDTModel, [name || '']: checked });
    }


    const onChangeLoaiDT = async (value: any, option: any) => {
        setNhomDTModel({ ...nhomDTModel, counterpartyType: value });
    }

    const onChangeLevel = async (value: any, option: any) => {
        setNhomDTModel({ ...nhomDTModel, isChild: value });
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
                    <Form.Item label="Loại ĐT"
                        initialValue={nhomDTModel.counterpartyType}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn loại đối tác',
                            },
                        ]}
                    ><Select
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Chọn loại đối tác"
                        onChange={onChangeLoaiDT}
                    >

                            {counterpartyTypeModel && counterpartyTypeModel.map(d => (
                                <Option value={d.counterpartyTypeID} key={d.counterpartyTypeID}>{d.counterpartyTypeName}</Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item label="isChild"
                        initialValue={nhomDTModel.isChild}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn isChild',
                            },
                        ]}
                    >
                        <Select
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Chọn isChild"
                            onChange={onChangeLevel}
                        >
                            <Option value={false} key={0}>Không</Option>
                            <Option value={true} key={1}>Đúng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Mã nhóm"
                        initialValue={nhomDTModel.counterpartyGroupID}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mã nhóm đối tác!',
                            }
                        ]}
                    >
                        <Input className="input-text-upercase" disabled={counterpartyGroupID !== '' ? true : false} name="counterpartyGroupID" onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Mã HH Tự Động">
                        <Checkbox name="isAutoPutID" checked={nhomDTModel.isAutoPutID} onChange={handleChangeCheckBox} />
                    </Form.Item>
                    <Form.Item label="Tên Nhóm"
                        initialValue={nhomDTModel.counterpartyGroupName}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên nhóm đối tượng',
                            },
                        ]}
                    ><Input name="counterpartyGroupName" onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Độ Dài Mã"
                        initialValue={nhomDTModel.length}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập dộ dài mã ĐT',
                            },
                        ]}
                    ><Input name="length" type="number" min={0} onChange={handleChangeInput} />
                    </Form.Item>
                    <Form.Item label="Tiền Tố">
                        <Checkbox name="isPrefix" checked={nhomDTModel.isPrefix} onChange={handleChangeCheckBox} />
                    </Form.Item>
                </Form>
            </DialogPage>
        </div>

    )
}
export default AddUpCounterGroup;