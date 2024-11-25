import React, { useState, useEffect } from 'react';
import { Spin, Collapse, Row, Col, Radio, Form, Input, message, RadioChangeEvent, Button } from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';
import DialogPage from '../../../../components/dialog/dialogPage';
import SteelDefectService from '../../../../services/steelDefectService';
import { cateSteelDefectList } from '../../../../models/cateSteelDefect';
import steelDefectDetail from '../../../../models/steelDefectDetail';
import CommonUtil from '../../../../utils/commonUtil';
import LoginUtils from '../../../../utils/loginUtils';

const { Panel } = Collapse;
interface errorModalProps {
    materialType: string,
    indexRow: number,
    callBackChoose: ((listSteelDefectDetails: steelDefectDetail[], description: string, indexRow: number) => void)
    listSteelDefectDetails?: steelDefectDetail[],
    description?: string
}
const ErrorModal: React.FC<errorModalProps> = (props) => {
    const { materialType, listSteelDefectDetails, description, callBackChoose, indexRow } = props;
    const userLoginInfo = LoginUtils.GetInfo();
    const userName = userLoginInfo.username;
    // const { getFieldDecorator } = props.form;
    const steelDefectService = new SteelDefectService();
    const [stateCateSteelDefect, setStateCateSteelDefect] = useState({ lstCateSteelDefect: Array<cateSteelDefectList>(), description: description, loading: true });
    const [dialogData, setDialogData] = useState({ visible: true, title: 'Ghi chú lỗi', confirmLoading: false, destroyOnClose: false });
    const [listDefectDetail, setListDefectDetail] = useState<steelDefectDetail[]>(listSteelDefectDetails as steelDefectDetail[]);
    const [defaultKeys, setDefaultKeys] = useState<any>(listSteelDefectDetails ? listSteelDefectDetails.map(p => p.main) : []);
    const [descriptionModel, setDescriptionModel] = useState<string>((""));
    useEffect(() => {
        (async () => {
            await LoadCateSteelDefect();
        })();
    }, []);
    const LoadCateSteelDefect = async () => {
        let dataSP = await steelDefectService.GetList(materialType);
        if (dataSP && dataSP.data.length > 0) {
            setStateCateSteelDefect({
                ...stateCateSteelDefect,
                lstCateSteelDefect: dataSP.data,
                loading: false
            });
        }
        else {
            setStateCateSteelDefect({
                ...stateCateSteelDefect,
                lstCateSteelDefect: [],
                loading: false
            });
        }
    }

    const getDefectName = (steelDefectID: number) => {
        const divContainer = document.getElementById(`loi-radio-${steelDefectID}`);
        if (divContainer === null || divContainer === undefined) {
        }
        return divContainer !== null && divContainer !== undefined ? divContainer.innerHTML : '';
    }

    const onOk = async (values: any) => {
        if (listDefectDetail !== null && listDefectDetail !== undefined) {
            let listSteelDefectDetails = listDefectDetail;
            listSteelDefectDetails = listSteelDefectDetails.filter(p => (p.option1 !== -1 && p.option1 !== 0) || (p.option2 !== -1 && p.option2 !== 0) || (p.option3 !== -1 && p.option3 !== 0) || (p.option4 !== -1 && p.option4 !== 0));
            if (listSteelDefectDetails && listSteelDefectDetails.length > 0) {
                listSteelDefectDetails.forEach(item => {
                    if (item.option1 !== -1 && item.option1 !== 0) {
                        item.steelDefectName += " " + getDefectName(item.option1);
                    }
                    if (item.option2 !== -1 && item.option2 !== 0) {
                        item.steelDefectName += " " + getDefectName(item.option2);
                    }
                    if (item.option3 !== -1 && item.option3 !== 0) {
                        item.steelDefectName += " " + getDefectName(item.option3);
                    }
                    if (item.option4 !== -1 && item.option4 !== 0) {
                        item.steelDefectName += " " + getDefectName(item.option4);
                    }
                    item.steelDefectName += ",";
                });
            }
            callBackChoose(listSteelDefectDetails, descriptionModel, indexRow);
        }
        setDialogData({ ...dialogData, visible: false });
    }
    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogData({ ...dialogData, visible: false });
    }

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const getDefaultValueForGroup = (_listSteelDefectDetails: cateSteelDefectList[], _defaultValue?: steelDefectDetail[]) => {
        if (_defaultValue && _listSteelDefectDetails) {
            let idExists = -1;
            for (var i = 0; i < _listSteelDefectDetails.length; i++) {
                const steelDefectID = _listSteelDefectDetails[i].steelDefectID;
                var exists = _defaultValue.filter(p => p.option1 === steelDefectID || p.option2 === steelDefectID || p.option3 === steelDefectID || p.option4 == steelDefectID);
                idExists = exists && exists.length > 0 ? steelDefectID : -1;
                if (idExists > 0) {
                    break;
                }
            }
            return idExists;
        }
        return -1;
    }

    const callbackCollapse = (keys: any) => {
        setDefaultKeys(keys);
    }
    const onChangeDescription = async (e: any) => {
        let content = e.target.value;
        setDescriptionModel(content);
    }
    const onChangeSelectDefect = async (e: any) => {
        const fullPart = e.target.name.split('|');
        let optionType = fullPart[0].substring(0, 7);
        let mainIdString = fullPart[0].substring(7).toString() ?? "";
        let mainId = parseInt(mainIdString);
        if (mainId != 0) {
            let optionValue = parseInt(e.target.value);
            var listDefect: steelDefectDetail[] = [];
            var newElement: steelDefectDetail = {
                main: mainId,
                createdBy: userName ?? "",
                // createdDate: new Date().toString(),
                imei: "",
                option1: 0,
                option2: 0,
                option3: 0,
                option4: 0,
                steelDefectName: "",
                steelDefectDetailID: 0
            };
            let notExist = true;
            if (listDefectDetail != null && listDefectDetail != undefined) {
                listDefect = listDefectDetail;
                for (var i = 0; i < listDefect.length; i++) {
                    if (listDefect[i].main == mainId) {
                        notExist = false;
                        listDefect[i].steelDefectDetailID = i + 1;
                        //  
                        if (optionType == "option1") {
                            listDefect[i].option1 = optionValue
                        } else if (optionType == "option2") {
                            listDefect[i].option2 = optionValue
                        } else if (optionType == "option3") {
                            listDefect[i].option3 = optionValue
                        } else if (optionType == "option4") {
                            listDefect[i].option4 = optionValue
                        }
                    }
                }
            }
            if (notExist == true) {
                newElement.steelDefectName = fullPart[1];
                newElement.steelDefectDetailID = 1;
                if (optionType == "option1") {
                    newElement.option1 = optionValue
                } else if (optionType == "option2") {
                    newElement.option2 = optionValue
                } else if (optionType == "option3") {
                    newElement.option3 = optionValue
                } else if (optionType == "option4") {
                    newElement.option4 = optionValue
                }
                listDefect.push(newElement);
            }
            setListDefectDetail(listDefect);
        }
    }
    return (
        <DialogPage
            title={dialogData.title}
            visible={dialogData.visible}
            confirmLoading={dialogData.confirmLoading}
            onCancel={onCancel}
            onOk={onOk}
            destroyOnClose={dialogData.destroyOnClose}>
            <Spin spinning={stateCateSteelDefect.loading}>
                <Form.Item label="Ghi chú"
                    initialValue={stateCateSteelDefect.description} >
                    <Input name='description' onChange={onChangeDescription}></Input>
                </Form.Item>
                <hr></hr>
                <Form
                    onChange={onChangeSelectDefect}
                >
                    <Collapse defaultActiveKey={defaultKeys}
                        onChange={callbackCollapse}>
                        {
                            stateCateSteelDefect.lstCateSteelDefect && stateCateSteelDefect.lstCateSteelDefect.map((d, index) => {
                                return <Panel header={d.defectName} key={`${d.steelDefectID}`} forceRender={true}>
                                    <div style={{ display: 'none' }}>
                                        <Form.Item<steelDefectDetail[]>
                                            initialValue={d.steelDefectID}
                                            name={[index, 'main']}
                                        >
                                            <Input name='main'></Input>
                                        </Form.Item>

                                        <Form.Item<steelDefectDetail[]>
                                            initialValue={d.defectName}
                                            name={[index, 'steelDefectName']}
                                        >
                                            {/* {getFieldDecorator(`steelDefectDetail[${index}].steelDefectName`, {
                                                initialValue: d.steelDefectName,
                                            })(<Input />)} */}
                                            <Input

                                            ></Input>
                                        </Form.Item>
                                    </div>
                                    <Row gutter={20}>
                                        <Col span={6}>
                                            <p><b>option 1</b></p>
                                            <Form.Item<steelDefectDetail[]>
                                                name={[index, 'option1']}
                                                initialValue={getDefaultValueForGroup(d.option1, listSteelDefectDetails)}
                                            >
                                                {/* {getFieldDecorator(`steelDefectDetail[${index}].option1`, {
                                                    initialValue: getDefaultValueForGroup(d.option1, listSteelDefectDetails),
                                                }) */}
                                                <Radio.Group
                                                    name={'option1 ' + d.steelDefectID + "|" + d.defectName}
                                                // onChange={onChangeSelectDefect}
                                                >
                                                    <Radio value={-1}>
                                                        Bỏ chọn
                                                    </Radio>
                                                    {
                                                        d.option1 && d.option1.map((op, indexop) => {
                                                            return <Radio key={`${CommonUtil.uuidv4(indexop)}${op.steelDefectID}`} style={radioStyle} value={op.steelDefectID}>
                                                                {op.defectName}
                                                                <div id={`loi-radio-${op.steelDefectID}`} style={{ display: 'none' }}>{op.defectName}</div>
                                                            </Radio>
                                                        })
                                                    }
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <p><b>option 2</b></p>
                                            <Form.Item<steelDefectDetail[]>
                                                name={[index, 'option2']}
                                                initialValue={getDefaultValueForGroup(d.option2, listSteelDefectDetails)}>
                                                {/* {getFieldDecorator(`steelDefectDetail[${index}].option2`, {
                                                    initialValue: getDefaultValueForGroup(d.option2, listSteelDefectDetails), */}
                                                <Radio.Group
                                                    name={'option2 ' + d.steelDefectID + "|" + d.defectName}
                                                >
                                                    <Radio value={-1}>
                                                        Bỏ chọn
                                                    </Radio>
                                                    {
                                                        d.option2 && d.option2.map((op, indexop) => {
                                                            return <Radio key={`${CommonUtil.uuidv4(indexop)}${op.steelDefectID}`} style={radioStyle} value={op.steelDefectID}>
                                                                {op.defectName}
                                                                <div id={`loi-radio-${op.steelDefectID}`} style={{ display: 'none' }}>{op.defectName}</div>
                                                            </Radio>
                                                        })
                                                    }
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <p><b>option 3</b></p>
                                            <Form.Item<steelDefectDetail[]>
                                                name={[index, 'option3']}
                                                initialValue={getDefaultValueForGroup(d.option3, listSteelDefectDetails)}
                                            >
                                                {/* {getFieldDecorator(`steelDefectDetail[${index}].option3`, {
                                                    initialValue: getDefaultValueForGroup(d.option3, listSteelDefectDetails),
                                                })( */}
                                                <Radio.Group
                                                    name={'option3 ' + d.steelDefectID + "|" + d.defectName}
                                                >
                                                    <Radio value={-1}>
                                                        Bỏ chọn
                                                    </Radio>
                                                    {
                                                        d.option3 && d.option3.map((op, indexop) => {
                                                            return <Radio key={`${CommonUtil.uuidv4(indexop)}${op.steelDefectID}`} style={radioStyle} value={op.steelDefectID}>
                                                                {op.defectName}
                                                                <div id={`loi-radio-${op.steelDefectID}`} style={{ display: 'none' }}>{op.defectName}</div>
                                                            </Radio>
                                                        })
                                                    }
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <p><b>option 4</b></p>
                                            <Form.Item<steelDefectDetail[]>
                                                name={[index, 'option4']}
                                                initialValue={getDefaultValueForGroup(d.option4, listSteelDefectDetails)}
                                            >
                                                {/* {getFieldDecorator(`steelDefectDetail[${index}].option4`, {
                                                    initialValue: getDefaultValueForGroup(d.option4, listSteelDefectDetails),
                                                })( */}
                                                <Radio.Group
                                                    name={'option4 ' + d.steelDefectID + "|" + d.defectName}
                                                >
                                                    <Radio value={-1}>
                                                        Bỏ chọn
                                                    </Radio>
                                                    {
                                                        d.option4 && d.option4.map((op, indexop) => {
                                                            return <Radio key={`${CommonUtil.uuidv4(indexop)}${op.steelDefectID}`} style={radioStyle} value={op.steelDefectID}>
                                                                {op.defectName}
                                                                <div id={`loi-radio-${op.steelDefectID}`} style={{ display: 'none' }}>{op.defectName}</div>
                                                            </Radio>
                                                        })
                                                    }
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Panel>
                            })
                        }
                    </Collapse>
                </Form>
            </Spin>
        </DialogPage>
    )
}
export default ErrorModal;