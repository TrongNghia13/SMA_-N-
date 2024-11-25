import React from 'react';
import moment from 'moment';
import QRCode from 'qrcode.react';
import NumberFormat from 'react-number-format';

import { receiptVm } from '../../../../models/receipt';
import receiptImei from '../../../../models/receiptImei';
import { receiptDetailVm } from '../../../../models/receiptDetail';
import cateBranch from '../../../../models/cateBranch';
import CommonUtil from './../../../../utils/commonUtil';

interface PropsPrintBarcode {
    branchInfo: cateBranch,
    receiptVm: receiptVm,
    receiptDetailVm: receiptDetailVm,
    dataLstIMEI: Array<receiptImei>
}
class PrintBarcode extends React.Component<PropsPrintBarcode>  {
    constructor(props: PropsPrintBarcode) {
        super(props);
        this.getNameNhanVien = this.getNameNhanVien.bind(this);
        this.formatDay = this.formatDay.bind(this);
    }

    getNameNhanVien(name: string) {
        const _names = name == null || name === undefined ? [''] : name.trim().split(' ');
        if (_names.length > 2) {
            return _names[_names.length - 2] + ' ' + _names[_names.length - 1];
        }
        else {
            return _names[0];
        }
    }
    formatDay(day: string) {
        day = day == null || day === undefined ? '' : day;
        if (day == '') {
            return '';
        }
        else {
            return day.slice(0, 1) + ',' + day.substr(1, day.length);
        }
    }
    render() {
        const { receiptVm, receiptDetailVm, dataLstIMEI, branchInfo } = this.props;
        return (
            <React.Fragment>
                {
                    dataLstIMEI && dataLstIMEI.map((d, index) => (
                        <React.Fragment key={d.productID + d.steelType + d.width + d.thickness + receiptVm.receiptNo + CommonUtil.uuidv4(index)} >
                            <div style={{ width: 466, height: 132, border: '1px solid #000', lineHeight: 1 }}>

                                <div style={{ width: 375, height: 132, float: 'left', borderRight: '1px solid #000' }}>
                                    <div style={{ width: '100%', height: 32, borderBottom: '1px solid #000' }}>
                                        <div style={{ textAlign: 'center', paddingTop: 3 }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 14 }}>CÔNG TY TNHH THÉP PHƯƠNG NAM 3</p>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 11 }}>{branchInfo.branchName}</p>
                                        </div>
                                    </div>
                                    <div style={{ width: 105, height: 32, float: 'left', borderRight: '1px solid #000' }}>
                                        <div style={{ padding: '4px 5px' }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 10 }}>LÔ:</p>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 10 }}> {d.specification.substring(0, 15)} </p>
                                        </div>
                                    </div>
                                    <div style={{ width: 269, height: 32, float: 'left' }}>
                                        <div style={{ padding: '4px 5px', textAlign: 'center' }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 12 }}>TÊN SẢN PHẨM</p>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 14, textAlign: 'center', textTransform: 'uppercase' }}> {receiptDetailVm.productName} {d.ten_lnl}</p>
                                        </div>
                                    </div>
                                    <div className="clearfix" style={{ borderBottom: '1px solid #000' }}></div>
                                    <div style={{ width: 105, height: 32, float: 'left', borderRight: '1px solid #000' }}>
                                        <div style={{ padding: '4px 5px' }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 10 }}>NGÀY/GIỜ NHẬP:</p>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 11 }}> {moment(receiptVm.receiptDate).format("DD/MM/YYYY HH:mm")} </p>
                                        </div>
                                    </div>
                                    <div style={{ width: 133, height: 32, float: 'left', borderRight: '1px solid #000' }}>
                                        <div style={{ paddingLeft: 5 }}>
                                            <div style={{ width: 58, float: 'left', padding: '8px 0px 0px 5px', lineHeight: 1, textAlign: 'right' }}>
                                                <p style={{ margin: 0, fontSize: 9 }}><b>KHỔ:</b></p>
                                                <p style={{ margin: 0, fontSize: 9 }}><b>(mm)</b></p>
                                            </div>
                                            <div style={{ float: 'left', paddingTop: 5 }}>
                                                <span style={{ marginBottom: 0, fontSize: 21, padding: '2px 0px 0px 5px' }}><b>{d.width}</b></span>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div style={{ width: 134, height: 32, float: 'left' }}>
                                        <div style={{ paddingLeft: 5 }}>
                                            <div style={{ width: 50, float: 'left', padding: '8px 0px 0px 5px', lineHeight: 1 }}>
                                                <p style={{ margin: 0, fontSize: 9 }}><b>DÀY:</b></p>
                                                <p style={{ margin: 0, fontSize: 9 }}><b>(mm)</b></p>
                                            </div>
                                            <div style={{ float: 'left', paddingTop: 5 }}>
                                                <span style={{ marginBottom: 0, fontSize: 21, padding: '2px 0px 0px 10px' }}><b>{this.formatDay(d.thickness)}</b></span>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div className="clearfix" style={{ borderBottom: '1px solid #000' }}></div>
                                    <div style={{ width: 105, height: 32, float: 'left', borderRight: '1px solid #000' }}>
                                        <div style={{ padding: '4px 5px' }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 10 }}>THỦ KHO:</p>
                                            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 11 }}> {this.getNameNhanVien(receiptVm.tennv)} </p>
                                        </div>
                                    </div>
                                    <div style={{ width: 133, height: 32, float: 'left', borderRight: '1px solid #000' }}>
                                        <div style={{ paddingLeft: 5 }}>
                                            <div style={{ width: 58, float: 'left', padding: '1px 0px 0px 5px', lineHeight: 1 }}>
                                                <span style={{ marginBottom: 0, fontSize: 9 }}><b>TR.LƯỢNG:</b></span>
                                                <span style={{ marginBottom: 0, fontSize: 9, float: 'right' }}><b>(KG)</b></span>
                                            </div>
                                            <div style={{ float: 'left', paddingTop: 5 }}>
                                                <span style={{ marginBottom: 0, fontSize: 20, padding: '2px 0px 0px 5px' }}><b>
                                                    {d.weight1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                </b>
                                                </span>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div style={{ width: 134, height: 32, float: 'left' }}>
                                        <div style={{ paddingLeft: 5 }}>
                                            <div style={{ width: 50, float: 'left', padding: '10px 0px 0px 5px' }}>
                                                <p style={{ marginBottom: 0, fontSize: 9 }}><b>TC:</b></p>
                                            </div>
                                            <div style={{ float: 'left', paddingTop: 5 }}>
                                                <span style={{ marginBottom: 0, fontSize: 21, padding: '2px 0px 0px 0px' }}><b>{d.standard}</b></span>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div style={{ width: 89, height: 132, float: 'left' }}>
                                    <div style={{ margin: '15px 3px' }}>
                                        <QRCode value={d.imei} size={83} />
                                        <p style={{ fontSize: 12, marginTop: 5 }}>{d.imei !== '' ? d.imei.split('|')[1] : ''}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="barcodePage" style={{ pageBreakAfter: "always", pageBreakInside: "avoid" }}></div>
                        </React.Fragment>
                    ))
                }
            </React.Fragment>
        )
    }
}
export default PrintBarcode;