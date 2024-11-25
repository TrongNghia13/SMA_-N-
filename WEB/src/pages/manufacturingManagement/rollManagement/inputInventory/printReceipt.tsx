import React from 'react';
import moment from 'moment';
import {NumericFormat} from 'react-number-format';

import { receiptVm } from '../../../../models/receipt';
import ReceiptImei from '../../../../models/receiptImei';
import ReceiptDetail, { receiptDetailVm } from '../../../../models/receiptDetail';
import CateBranch from '../../../../models/cateBranch';
import SteelDefectDetail from '../../../../models/steelDefectDetail';

interface PropsPrintReceipt {
    branchInfo: CateBranch,
    dataReceiptVm: receiptVm,
    dataReceiptDetail: receiptDetailVm,
    dataLstIMEI: Array<ReceiptImei>
}
class PrintReceipt extends React.Component<PropsPrintReceipt>  {
    constructor(props: PropsPrintReceipt) {
        super(props);
        this.uuidv4 = this.uuidv4.bind(this);
    }
    uuidv4(index: number) {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16) + index;
        });
    }
    render() {
        const { branchInfo, dataReceiptVm, dataReceiptDetail, dataLstIMEI } = this.props;
        var tongsl = dataLstIMEI.length, tongkg = 0;
        dataLstIMEI.map((d) => {
            tongkg += d.weight || 0;
        })
        return (
            <div className="print-container">
                <div className="inline-bolck w-100 text-left">
                    <h2 className="company-name-print"><b>{branchInfo.branchName}</b></h2>
                    <h3 className="company-address-print">{branchInfo.branchAddress}</h3>
                    <h3 className="company-phone-print">{branchInfo.branchTel}</h3>
                </div>
                <div className="clearfix"></div>
                <div className="inline-bolck w-100 text-center">
                    <h2 className="title-print">PHIẾU NHẬP HÀNG</h2>
                </div>
                <div className="inline-bolck w-100 vertical-align-top text-center">
                    <i>Số: {dataReceiptVm.receiptNo} - Ngày {moment(dataReceiptVm.receiptDate).format("DD/MM/YYYY")}</i>
                    <div style={{ marginBottom: 0 }}>Số xe: {dataReceiptVm.licensePlate} </div>
                </div>
                <div className="clearfix h-10"></div>
                <div className="w-100 text-left">
                    <p style={{ marginBottom: 0, marginTop: 0 }}>Nhà CC: {dataReceiptVm.counterpartyID} - {dataReceiptVm.counterpartyName}</p>
                    <p>Nội dung: {dataReceiptVm.receiptContent}</p>
                </div>
                <div className="clearfix"></div>
                <table className="table-detail-print">
                    <tbody>
                        <tr>
                            <td className="text-center"><b>TT</b></td>
                            <td className="text-center"><b>Tên quy cách</b></td>
                            <td className="text-center"><b>Đvt</b></td>
                            <td className="text-center"><b>S.Lg</b></td>
                            <td className="text-center"><b>Số Kg</b></td>
                            <td className="text-center"><b>Ghi chú</b></td>
                        </tr>
                        {
                            dataLstIMEI && dataLstIMEI.map((d, index) => (
                                <tr key={d.productID + d.steelType + d.width + d.thickness + dataReceiptVm.receiptNo + this.uuidv4(index)}>
                                    <td className="text-center">{d.sortOrder}</td>
                                    <td className="text-left">{d.specification}</td>
                                    <td className="text-center">{dataReceiptDetail.calculationUnit}</td>
                                    <td className="text-right">
                                        <NumericFormat value={1} displayType={'text'} thousandSeparator={true} prefix={''} />
                                    </td>
                                    <td className="text-right">
                                        <NumericFormat value={d.weight} displayType={'text'} thousandSeparator={true} prefix={''} />
                                    </td>
                                    <td className="text-left">
                                    <span>{d.description}</span>,  
                                    {
                                        d.listSteelDefectDetails && d.listSteelDefectDetails.map((p: SteelDefectDetail) => {
                                            return <span>{p.steelDefectName}</span>
                                        })
                                    }
                                </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={3} className="text-center">
                                <b>TỔNG CỘNG</b></td>
                            <td className="text-right">
                                <b>
                                    <NumericFormat value={tongsl} displayType={'text'} thousandSeparator={true}  />
                                </b>
                            </td>
                            <td className="text-right">
                                <b>
                                    <NumericFormat 
                                    
                                    value={tongkg} 
                                    displayType={'text'} 
                                    thousandSeparator={true} prefix={''} 
                                    />
                                    
                                </b>
                            </td>
                            <td></td>
                        </tr>

                    </tbody>
                </table>
                <div className="h-10"></div>
                <div className="text-right" style={{ paddingRight: 60}}>
                    <span className="font-italic">
                        Cần Thơ, ngày {moment(new Date()).format("DD")} tháng {moment(new Date()).format("MM")} năm {moment(new Date()).format("YYYY")}
                    </span>
                </div>
                <div className="clearfix"></div>
                <div className="inline-bolck w-40">
                    <h2 className="emp-name-print" style={{ paddingLeft: 60}}><b>Người nhận</b></h2>
                </div>
                <div className="inline-bolck w-60 text-right">
                    <h2 className="emp-name-print" style={{ paddingRight: 120}}><b>Người giao</b></h2>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}
export default PrintReceipt;