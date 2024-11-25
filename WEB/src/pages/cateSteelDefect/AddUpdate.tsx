import React, { useState, useEffect } from 'react';
import { Form, Input, message, Row, Col, Button, Select } from 'antd';
import DialogPage from '../../components/dialog/dialogPage';
import { cateSteelDefect_MANAGER } from '../../models/cateSteelDefect';
import SteelTypeConfig from '../../configs/steelTypeConfig';
import LoiSPController from '../../services/steelDefectService';
import { APIStatus } from '../../configs/APIConfig';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

interface PropsAddUpLoiSP {
    id: number;
    callBackSubmit: () => void;
}

const AddUpLoiSP: React.FC<PropsAddUpLoiSP> = (props) => {
    const loiSPController = new LoiSPController();
    const { id, callBackSubmit } = props;
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập nhật lỗi sản phẩm', confirmLoading: false, destroyOnClose: false });

    const [loiModel, setLoiModel] = useState((() => {
        let dataInit: cateSteelDefect_MANAGER = {} as any;
        return dataInit;
    }));
    const setDefaultOption = (number: number) => {
        return {
            steelDefectID: 0,
            defectName: '',
            defectType: '',
            parentID: 0,
            material: '',
            number: number,
            isDelete: false
        };
    };

    const getRandomInt = (max: number): number => {
        return Math.floor(Math.random() * max);
    };

    useEffect(() => {
        async function GetData() {
            if (id === 0) {
                setLoiModel({ ...loiModel, option1: [setDefaultOption(Date.now() + getRandomInt(10))], option2: [setDefaultOption(Date.now() + getRandomInt(10))], option3: [setDefaultOption(Date.now() + getRandomInt(10))] });
            }
            else {
                var getDdata = await loiSPController.GetById(id);
                setLoiModel(getDdata.data);
            }
        }
        GetData();
    }, [id]);

    const onOk = async () => {
        try {         
            const data = await loiSPController.Create(loiModel);
            if (data.status === APIStatus.ERROR) {
                message.error(data.message);
            } else {
                setDialogData({ ...dialogData, visible: false });
                callBackSubmit();
            }
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const onCancel = () => {
        setDialogData({ ...dialogData, visible: false });
    };

    const remove = (key: string, number: number) => {
        setLoiModel((prevState) => {
            const LoiModel = { ...prevState };
            if (key === 'option1' || key === 'option2' || key === 'option3' || key === 'option4') {
                LoiModel[key] = LoiModel[key].map((op: any) => ({
                    ...op,
                    isDelete: op.isDelete || op.number === number
                }));
            }
            return LoiModel;
        });
    };

    const add = (key: string) => {
        setLoiModel((prevState) => {
            const LoiModel = { ...prevState };
            if (key === 'option1' || key === 'option2' || key === 'option3' || key === 'option4') {
                LoiModel[key] = LoiModel[key] ?? [];
                LoiModel[key].push(setDefaultOption(Date.now() + getRandomInt(10)));
            }
            return LoiModel;
        });
    };


    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { type, name, value } = e.target;
        setLoiModel((prevState) => ({ ...prevState, [name]: type === 'number' ? parseFloat(value) : value }));
    };

    const handleChangeInputOption = (e: React.ChangeEvent<HTMLInputElement>, key: string, index: number) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoiModel((prevState) => {
            const LoiModel = { ...prevState };
            if (key === 'option1' || key === 'option2' || key === 'option3' || key === 'option4') {
                const loiCurrentKey = LoiModel[key] || [];
                loiCurrentKey[index]['defectName'] = value;
                LoiModel[key] = loiCurrentKey;
            }
            return LoiModel;
        });
    };


    const onChangeLoai = async (value: any, option: any) => {
        setLoiModel({ ...loiModel, defectType: value });
    }


    const formItems = (key: string, title: string) => {
        if (key === 'option1' || key === 'option2' || key === 'option3' || key === 'option4') {
            return (
                <>
                    {loiModel[key] && loiModel[key].map((k, index) => (
                        <div key={k.number}>
                            {k.isDelete ? null : (
                                <Form.Item
                                    label={index === 0 ? title : ''}
                                    required={true}
                                >
                                    <Input
                                        placeholder=""
                                        style={{ width: '100%' }}
                                        name={`${key}[${index}].defectName`}
                                        value={k.defectName}
                                        onChange={(e) => handleChangeInputOption(e, key, index)}
                                    />
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        style={{ paddingLeft: 5 }}
                                        onClick={() => k.number && remove(key, k.number)}
                                    />

                                </Form.Item>
                            )}
                        </div>
                    ))}
                </>
            );
        }
    };

    return (
        <div>
            <DialogPage
                width='70%'
                title={dialogData.title}
                visible={dialogData.visible}
                confirmLoading={dialogData.confirmLoading}
                onCancel={onCancel}
                onOk={onOk}
                destroyOnClose={dialogData.destroyOnClose}

            >
                <Form>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item label="Loại">
                                <Select
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="Loại"
                                    value={loiModel.material}
                                    onChange={onChangeLoai}
                                >
                                    {SteelTypeConfig &&
                                        SteelTypeConfig.map((k : any, index : any) => (
                                            <Option
                                                value={k.value}
                                                key={`${k.value}${Date.now}`}
                                            >
                                                {k.name}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tên Lỗi">
                                <Input
                                    name="defectName"
                                    value={loiModel.defectName}
                                    onChange={handleChangeInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                    <Row gutter={20}>
                        <Col span={6}>{formItems('option1', 'Option 1')}
                            <Button
                                type="dashed"
                                onClick={() => add('option1')}
                                icon={<PlusOutlined />}
                            >
                                Thêm Option 1
                            </Button>
                        </Col>
                        <Col span={6}>{formItems('option2', 'Option 2')}
                            <Button
                                type="dashed"
                                onClick={() => add('option2')}
                                icon={<PlusOutlined />}
                            >
                                Thêm Option 2
                            </Button>
                        </Col>
                        <Col span={6}>{formItems('option3', 'Option 3')}
                            <Button
                                type="dashed"
                                onClick={() => add('option3')}
                                icon={<PlusOutlined />}
                            >
                                Thêm Option 3
                            </Button>
                        </Col>
                        <Col span={6}>{formItems('option4', 'Option 4')}
                            <Button
                                type="dashed"
                                onClick={() => add('option4')}
                                icon={<PlusOutlined />}
                            >
                                Thêm Option 4
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </DialogPage>
        </div>
    );
};

export default AddUpLoiSP;
