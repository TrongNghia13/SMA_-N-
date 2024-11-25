import React, { Fragment } from 'react';
import moment from 'moment';
import {NumericFormat} from 'react-number-format';
import cateBranch from '../../../models/cateBranch';
import cateStore from '../../../models/cateStore';
import reportLeftHeadline from '../../../models/reportLeftHeadline';
import { cateProductVm } from '../../../models/cateProduct';

interface Props_SP_RP_THNX {
    option: any,
    userName: string,
    branchInfo: cateBranch,
    kho: cateStore,
    tdtBaoCao: reportLeftHeadline,
    data: Array<any>,
    HangHoa : cateProductVm
}
class PrintSP_RP_CT_NXHH extends React.Component<Props_SP_RP_THNX>  {
    constructor(props: Props_SP_RP_THNX) {
        super(props);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(month: string, format: string) {
        if (month) {
            const myDate = moment(month, 'YYYYMM').toDate();
            return moment(myDate).format(format);
        }
        else {
            return '';
        }
    }
    render() {
        var DataModel = Array<any>();
        var tt_l_ton = 0, tt_t_ton = 0;
        const { option, data, tdtBaoCao, kho, userName, HangHoa } = this.props;
        if (data) {
            if (data.length > 0) {
                data.forEach((itemGr) => {
                    DataModel.push(itemGr);
                    tt_l_ton += itemGr.lgton;
                    tt_t_ton += itemGr.tienton;
                });
            }
        }
        return (
            <div className="report_area">
                <div className="h-10"></div>
                <div className="inline-bolck w-70 text-left">
                    {tdtBaoCao && tdtBaoCao.leftHeadlineId > 0 ?
                        <div>
                            <h2 className="company-name-print"><b>{tdtBaoCao.leftHeadlineName}</b></h2>
                            <h3 className="company-address-print">{tdtBaoCao.line1}</h3>
                            <h3 className="company-address-print">{tdtBaoCao.line2}</h3>
                            <h3 className="company-address-print">{tdtBaoCao.line3}</h3>
                        </div>
                        :
                        <div></div>
                    }
                </div>
                <div className="inline-bolck w-30 vertical-align-top text-right">
                    <p className="date-print font-italic" style={{ marginBottom: 2 }}>Ngày: {moment(new Date()).format("DD/MM/YYYY hh:mm")}</p>
                    <p className="date-print font-italic">Người dùng: {userName}</p>
                </div>
                <div className="clearfix"></div>
                <hr />
                <div className="w-100 text-center">
                    <h2 className="title-print" style={{ marginBottom: 0 }}>BÁO CÁO CHI TIẾT NHẬP XUẤT</h2>
                </div>
                <div className="w-100 text-center">
                    <p className="date-print font-italic">Tháng {this.formatDate(option.thang, 'MM')} - Năm {this.formatDate(option.thang, 'YYYY')}</p>
                </div>
                <div className="clearfix"></div>
                <div className="w-100 text-left">
                    <h2 className="title-print">Kho: {option.storeID} - {kho.storeName}</h2>
                    <h2 className="title-print">Hàng Hóa: {HangHoa.productID} - {HangHoa.productName}</h2>
                </div>
                <table className="table-detail-print">
                    <tbody>
                        <tr>
                            <td className="text-center" rowSpan={2}><b>NGÀY</b></td>
                            <td className="text-center" colSpan={2}><b>CHỨNG TỪ</b></td>
                            <td className="text-center" rowSpan={2}><b>DIỂN DÃI</b></td>
                            <td className="text-center" rowSpan={2}><b>ĐƠN GIÁ</b></td>
                            <td className="text-center" colSpan={2}><b>NHẬP</b></td>
                            <td className="text-center" colSpan={2}><b>XUẤT</b></td>
                            <td className="text-center" colSpan={2}><b>TỒN</b></td>
                        </tr>
                        <tr>
                            <td className="text-center"><b>NHẬP</b></td>
                            <td className="text-center"><b>XUẤT</b></td>

                            <td className="text-center"><b>L</b></td>
                            <td className="text-center"><b>T. TIỀN</b></td>

                            <td className="text-center"><b>L</b></td>
                            <td className="text-center"><b>T. TIỀN</b></td>

                            <td className="text-center"><b>L</b></td>
                            <td className="text-center"><b>T. TIỀN</b></td>

                        </tr>
                        {
                            DataModel && DataModel.map((d, indexgr) => {
                                return (
                                    <Fragment key={indexgr + new Date().toLocaleTimeString()}>
                                        <tr key={d.mahh + new Date().toLocaleTimeString()}>

                                            <td className="text-center">{d.ngay !== null ? d.ngay : '' }</td>

                                            <td className="text-left">{d.soctn}</td>
                                            <td className="text-left">{d.soctx}</td>

                                            <td className="text-left">{d.noidung}</td>
                                            <td className="text-right">
                                                <NumericFormat value={d.dongia} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                                            </td>

                                            <td className="text-right">
                                                <NumericFormat value={d.lgnhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                                            </td>
                                            <td className="text-right">
                                                <NumericFormat value={d.tiennhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                                            </td>

                                            <td className="text-right">
                                                <NumericFormat value={d.lgxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                                            </td>
                                            <td className="text-right">
                                                <NumericFormat value={d.tienxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                                            </td>

                                            <td className="text-right">
                                                <NumericFormat value={d.lgton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                                            </td>
                                            <td className="text-right">
                                                <NumericFormat value={d.tienton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                                            </td>
                                            
                                        </tr>
                                    </Fragment>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={9} className="text-center">
                                <b>TỔNG CỘNG</b>
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={tt_l_ton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={tt_t_ton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="h-10"></div>
                <div className="text-right">
                    <div style={{ paddingRight: 40 }}>
                        <span className="font-italic">
                            Cần Thơ, ngày {moment(new Date()).format("DD")} tháng {moment(new Date()).format("MM")} năm {moment(new Date()).format("YYYY")}
                        </span>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="inline-bolck w-40 text-center">
                    <h2 className="emp-name-print"><b>Người lập</b></h2>
                </div>
                <div className="inline-bolck w-60 text-right">
                    <h2 className="emp-name-print" style={{ paddingRight: 100 }}><b>Thứ trưởng đơn vị</b></h2>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}
export default PrintSP_RP_CT_NXHH;