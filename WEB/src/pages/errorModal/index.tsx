import React, { useState, useEffect } from 'react';
import { Spin, Collapse, Row, Col, Radio, Form, Input, message } from 'antd';
// import DialogPage from '../../../../components/Dialog/DialogPage';
// import LoiSPController from '../../../../controllers/LoiSPController';
// import { DM_LOISP_LIST } from '../../../../models/DM_LOISP';
// import CHITIET_LOISP from '../../../../models/CHITIET_LOISP';
// import CommonUtil from '../../../../utils/CommonUtil';

const { Panel } = Collapse;
interface errorModalProps {
    // loai: string,
    // indexRow: number,
    // callBackChoose: ((lois: CHITIET_LOISP[], ghichu: string, indexRow: number) => void)
    // lois?: CHITIET_LOISP[],
    // ghichu?: string
}
const ErrorModal: React.FC<errorModalProps> = (props) => {
    // const { loai, lois, ghichu, callBackChoose, indexRow } = props;

    // const { getFieldDecorator } = props.form;
    // const loiSPController = new LoiSPController();
    // const [stateLoiSP, setStateLoiSP] = useState({ lstLoiSP: Array<DM_LOISP_LIST>(), ghichu: ghichu, loading: true });
    // const [dialogData, setDialogData] = useState({ visible: true, title: 'Ghi chú lỗi', confirmLoading: false, destroyOnClose: false });
    // const [loiUpdate, setLoiUpDate] = useState<CHITIET_LOISP[]>(lois);
    // const [defaultKeys, setDefaultKeys] = useState<any>(lois ? lois.map(p => p.main) : []);

    // useEffect(() => {
    //     (async () => {
    //         await LoadLoiSP();
    //     })();
    // }, []);
    // const LoadLoiSP = async () => {
    //     let dataSP = await loiSPController.GetList({ loaisp: loai });
    //     if (dataSP && dataSP.data.length > 0) {
    //         setStateLoiSP({
    //             ...stateLoiSP,
    //             lstLoiSP: dataSP.data,
    //             loading: false
    //         });
    //     }
    //     else {
    //         setStateLoiSP({
    //             ...stateLoiSP,
    //             lstLoiSP: [],
    //             loading: false
    //         });
    //     }
    // }

    // const getLoiName = (idLoi: number) => {
    //     const divContainer = document.getElementById(`loi-radio-${idLoi}`);
    //     if (divContainer === null || divContainer === undefined) {
    //         console.log(`div null: loi-radio-${idLoi}`);
    //     }
    //     return divContainer !== null && divContainer !== undefined ? document.getElementById(`loi-radio-${idLoi}`).innerHTML : '';
    // }

    // const onOk = async (event: React.MouseEvent<HTMLElement>) => {
    //     props.form.validateFields(async (err, values) => {
    //         let lois = values.CHITIET_LOISP !== null && values.CHITIET_LOISP !== undefined ? values.CHITIET_LOISP as CHITIET_LOISP[] : [];
    //         lois = lois.filter(p => p.option1 !== -1 || p.option2 !== -1 && p.option3 !== -1 || p.option4 !== -1);
    //         if (lois && lois.length > 0) {
    //             lois.forEach(item => {
    //                 if (item.option1 !== -1) {
    //                     item.tenloi += " " + getLoiName(item.option1);
    //                 }
    //                 if (item.option2 !== -1) {
    //                     item.tenloi += " " + getLoiName(item.option2);
    //                 }
    //                 if (item.option3 !== -1) {
    //                     item.tenloi += " " + getLoiName(item.option3);
    //                 }
    //                 if (item.option4 !== -1) {
    //                     item.tenloi += " " + getLoiName(item.option4);
    //                 }
    //                 item.tenloi += ",";
    //             });
    //         }
    //         callBackChoose(lois, values.ghichu, indexRow);
    //         setDialogData({ ...dialogData, visible: false });
    //     });
    // }

    // const onCancel = (event: React.MouseEvent<HTMLElement>) => {
    //     event.preventDefault();
    //     setDialogData({ ...dialogData, visible: false });
    // }

    // const radioStyle = {
    //     display: 'block',
    //     height: '30px',
    //     lineHeight: '30px',
    // };

    // const getDefaultValueForGroup = (_lois: DM_LOISP_LIST[], _defaultValue?: CHITIET_LOISP[]) => {
    //     if (_defaultValue && _lois) {
    //         let idExists = -1;
    //         for (var i = 0; i < _lois.length; i++) {
    //             const idLoi = _lois[i].idLoi;
    //             var exists = _defaultValue.filter(p => p.option1 === idLoi || p.option2 === idLoi || p.option3 === idLoi || p.option4 == idLoi);
    //             idExists = exists && exists.length > 0 ? idLoi : -1;
    //             if (idExists > 0) {
    //                 break;
    //             }
    //         }
    //         return idExists;
    //     }
    //     return -1;
    // }

    // const callbackCollapse = (keys: any) => {
    //     setDefaultKeys(keys);
    // }

    // return (
    //     <DialogPage
    //         title={dialogData.title}
    //         visible={dialogData.visible}
    //         confirmLoading={dialogData.confirmLoading}
    //         onCancel={onCancel}
    //         onOk={onOk}
    //         destroyOnClose={dialogData.destroyOnClose}>
    //         <Spin spinning={stateLoiSP.loading}>
    //             <Form>
    //                 <Form.Item label="Ghi chú">
    //                     {getFieldDecorator(`ghichu`, {
    //                         initialValue: stateLoiSP.ghichu,
    //                     })(<Input />)}
    //                 </Form.Item>
    //                 <hr></hr>
    //                 <Collapse defaultActiveKey={defaultKeys}
    //                     onChange={callbackCollapse}>
    //                     {
    //                         stateLoiSP.lstLoiSP && stateLoiSP.lstLoiSP.map((d, index) => {
    //                             return <Panel header={d.tenloi} key={`${d.idLoi}`} forceRender={true}>
    //                                 <div style={{ display: 'none' }}>
    //                                     <Form.Item>
    //                                         {getFieldDecorator(`CHITIET_LOISP[${index}].main`, {
    //                                             initialValue: d.idLoi,
    //                                         })(<Input />)}
    //                                     </Form.Item>
    //                                     <Form.Item>
    //                                         {getFieldDecorator(`CHITIET_LOISP[${index}].tenloi`, {
    //                                             initialValue: d.tenloi,
    //                                         })(<Input />)}
    //                                     </Form.Item>
    //                                 </div>
    //                                 <Row gutter={20}>
    //                                     <Col span={6}>
    //                                         <p><b>OPTION 1</b></p>
    //                                         <Form.Item>
    //                                             {getFieldDecorator(`CHITIET_LOISP[${index}].option1`, {
    //                                                 initialValue: getDefaultValueForGroup(d.optioN1, lois),
    //                                             })(<Radio.Group >
    //                                                 <Radio value={-1}>
    //                                                     Bỏ chọn
    //                                                 </Radio>
    //                                                 {
    //                                                     d.optioN1 && d.optioN1.map((op, indexop) => {
    //                                                         return <Radio key={`${CommonUtil.uuidv4(indexop)}${op.idLoi}`} style={radioStyle} value={op.idLoi}>
    //                                                             {op.tenloi}
    //                                                             <div id={`loi-radio-${op.idLoi}`} style={{ display: 'none' }}>{op.tenloi}</div>
    //                                                         </Radio>
    //                                                     })
    //                                                 }
    //                                             </Radio.Group>)}
    //                                         </Form.Item>
    //                                     </Col>
    //                                     <Col span={6}>
    //                                         <p><b>OPTION 2</b></p>
    //                                         <Form.Item>
    //                                             {getFieldDecorator(`CHITIET_LOISP[${index}].option2`, {
    //                                                 initialValue: getDefaultValueForGroup(d.optioN2, lois),
    //                                             })(<Radio.Group >
    //                                                 <Radio value={-1}>
    //                                                     Bỏ chọn
    //                                                 </Radio>
    //                                                 {
    //                                                     d.optioN2 && d.optioN2.map((op, indexop) => {
    //                                                         return <Radio key={`${CommonUtil.uuidv4(indexop)}${op.idLoi}`} style={radioStyle} value={op.idLoi}>
    //                                                             {op.tenloi}
    //                                                             <div id={`loi-radio-${op.idLoi}`} style={{ display: 'none' }}>{op.tenloi}</div>
    //                                                         </Radio>
    //                                                     })
    //                                                 }
    //                                             </Radio.Group>)}
    //                                         </Form.Item>
    //                                     </Col>
    //                                     <Col span={6}>
    //                                         <p><b>OPTION 3</b></p>
    //                                         <Form.Item>
    //                                             {getFieldDecorator(`CHITIET_LOISP[${index}].option3`, {
    //                                                 initialValue: getDefaultValueForGroup(d.optioN3, lois),
    //                                             })(<Radio.Group >
    //                                                 <Radio value={-1}>
    //                                                     Bỏ chọn
    //                                                 </Radio>
    //                                                 {
    //                                                     d.optioN3 && d.optioN3.map((op, indexop) => {
    //                                                         return <Radio key={`${CommonUtil.uuidv4(indexop)}${op.idLoi}`} style={radioStyle} value={op.idLoi}>
    //                                                             {op.tenloi}
    //                                                             <div id={`loi-radio-${op.idLoi}`} style={{ display: 'none' }}>{op.tenloi}</div>
    //                                                         </Radio>
    //                                                     })
    //                                                 }
    //                                             </Radio.Group>)}
    //                                         </Form.Item>
    //                                     </Col>
    //                                     <Col span={6}>
    //                                         <p><b>OPTION 4</b></p>
    //                                         <Form.Item>
    //                                             {getFieldDecorator(`CHITIET_LOISP[${index}].option4`, {
    //                                                 initialValue: getDefaultValueForGroup(d.optioN4, lois),
    //                                             })(<Radio.Group >
    //                                                 <Radio value={-1}>
    //                                                     Bỏ chọn
    //                                                 </Radio>
    //                                                 {
    //                                                     d.optioN4 && d.optioN4.map((op, indexop) => {
    //                                                         return <Radio key={`${CommonUtil.uuidv4(indexop)}${op.idLoi}`} style={radioStyle} value={op.idLoi}>
    //                                                             {op.tenloi}
    //                                                             <div id={`loi-radio-${op.idLoi}`} style={{ display: 'none' }}>{op.tenloi}</div>
    //                                                         </Radio>
    //                                                     })
    //                                                 }
    //                                             </Radio.Group>)}
    //                                         </Form.Item>
    //                                     </Col>
    //                                 </Row>
    //                             </Panel>
    //                         })
    //                     }
    //                 </Collapse>
    //             </Form>
    //         </Spin>
    //     </DialogPage>
    // )
    return (
        <div></div>
    )
}
export default ErrorModal;