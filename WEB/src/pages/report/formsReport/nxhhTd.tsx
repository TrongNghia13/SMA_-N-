import React, { Fragment } from 'react';
import moment from 'moment';
import {NumericFormat} from 'react-number-format';
import cateBranch from '../../../models/cateBranch';
import cateStore from '../../../models/cateStore';
import reportLeftHeadline from '../../../models/reportLeftHeadline';
import { cateProductVm } from '../../../models/cateProduct';

interface Props_SP_RP_CT_NXHH_TD {
    option: any,
    userName: string,
    branchInfo: cateBranch,
    kho: cateStore,
    tdtBaoCao: reportLeftHeadline,
    data: Array<any>,
    HangHoa: cateProductVm
}
class _SP_RP_CT_NXHH_TD extends React.Component<Props_SP_RP_CT_NXHH_TD>  {
    constructor(props: Props_SP_RP_CT_NXHH_TD) {
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
        var sl_nhap = 0, sl_xuat = 0, sl_ton = 0;
        const { option, data, tdtBaoCao, kho, userName, HangHoa } = this.props;
        if (data) {
            if (data.length > 0) {
                data.forEach((item, index) => {
                    sl_nhap += item.lgnhap;
                    sl_xuat += item.lgxuat;
                    if (index == data.length - 1) {
                        sl_ton += item.lgton;
                    }
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
                    {/* <p className="date-print font-italic" style={{ marginBottom: 2 }}>Ngày: {moment(new Date()).format("DD/MM/YYYY hh:mm")}</p>
                    <p className="date-print font-italic">Người dùng: {userName}</p> */}
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
                    <h2 className="title-print">Tên hàng: {HangHoa.productName}</h2>
                    <h2 className="title-print">Đơn vị tính: {HangHoa.productUnit} - Mã số: {HangHoa.productID}</h2>
                    <h2 className="title-print">Kho: {option.storeID} - {kho.storeName}</h2>
                </div>
                <table className="table-detail-print">
                    <tbody>
                        <tr>
                            <td className="text-center" rowSpan={2}><b>NGÀY</b></td>
                            <td className="text-center" colSpan={2}><b>CHỨNG TỪ</b></td>
                            <td className="text-center" rowSpan={2}><b>DIỄN GIẢI</b></td>
                            <td className="text-center" rowSpan={2}><b>SL NHẬP</b></td>
                            <td className="text-center" rowSpan={2}><b>SL XUẤT</b></td>
                            <td className="text-center" rowSpan={2}><b>SL TỒN</b></td>
                        </tr>
                        <tr>
                            <td className="text-center"><b>NHẬP</b></td>
                            <td className="text-center"><b>XUẤT</b></td>
                        </tr>
                        {
                            data && data.map((d, index) => {
                                return (
                                    <Fragment key={'_SP_RP_CT_NXHH_TD' + index + new Date().toLocaleTimeString()}>
                                        {index == 0 ?
                                            <tr key={'_SP_RP_CT_NXHH_TD' + d.id + index + new Date().toLocaleTimeString()}>
                                                <td className="text-center font-bold">{d.ngayct !== null ? moment(d.ngayct).format("DD/MM/YYYY") : ''}</td>
                                                <td className="text-center font-bold">{d.lct === 'N' ? d.soct : ''}</td>
                                                <td className="text-center font-bold">{d.lct === 'X' ? d.soct : ''}</td>
                                                <td className="text-left font-bold">{d.noidung}</td>
                                                <td className="text-right font-bold">
                                                    <NumericFormat value={d.lgnhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                </td>
                                                <td className="text-right font-bold">
                                                    <NumericFormat value={d.lgxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                </td>
                                                <td className="text-right font-bold">
                                                    <NumericFormat value={d.lgton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                </td>
                                            </tr>
                                            :
                                            <tr key={'_SP_RP_CT_NXHH_TD' + d.id + index + new Date().toLocaleTimeString()}>
                                                <td className="text-center">{d.ngayct !== null ? moment(d.ngayct).format("DD/MM/YYYY") : ''}</td>
                                                <td className="text-center">{d.lct === 'N' ? d.soct : ''}</td>
                                                <td className="text-center">{d.lct === 'X' ? d.soct : ''}</td>
                                                <td className="text-left">{d.noidung}</td>
                                                <td className="text-right">
                                                    <NumericFormat value={d.lgnhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                </td>
                                                <td className="text-right">
                                                    <NumericFormat value={d.lgxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                </td>
                                                <td className="text-right">
                                                    <NumericFormat value={d.lgton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                </td>
                                            </tr>
                                        }
                                    </Fragment>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={4} className="text-center">
                                <b>TỔNG CỘNG</b>
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={sl_nhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={sl_xuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={sl_ton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
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
export default _SP_RP_CT_NXHH_TD;