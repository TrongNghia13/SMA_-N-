import React, { Fragment } from 'react';
import moment from 'moment';
import {NumericFormat} from 'react-number-format';
import cateBranch from '../../../models/cateBranch';
import cateStore from '../../../models/cateStore';
import reportLeftHeadline from '../../../models/reportLeftHeadline';
import { cateProductVm } from '../../../models/cateProduct';

interface Props_SP_RP_TONKHO_HH {
    option: any,
    userName: string,
    branchInfo: cateBranch,
    kho: cateStore,
    tdtBaoCao: reportLeftHeadline,
    data: Array<any>,
    HangHoa: cateProductVm
}
class _SP_RP_TONKHO_HH extends React.Component<Props_SP_RP_TONKHO_HH>  {
    constructor(props: Props_SP_RP_TONKHO_HH) {
        super(props);
        this.formatDate = this.formatDate.bind(this);
        this.EndDayOfMonth = this.EndDayOfMonth.bind(this);
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
    EndDayOfMonth(month: string, format: string) {
        if (month) {
            const myDate = moment(month, 'YYYYMM').toDate();
            return moment(myDate).endOf("month").format(format);
        }
        else {
            return '';
        }
    }
    render() {
        var indexCount = 0;
        var DataModel = Array<any>();
        var tt_soluong = 0, tt_thanhtien = 0;
        const { option, data, tdtBaoCao, kho, userName } = this.props;
        if (data) {
            if (data.length > 0) {
                var groupData = [
                    ...data.reduce(
                        (result, item) => (
                            result.get(item.nhomhh)
                                ? result.get(item.nhomhh).push(item.tennhom)
                                : result.set(item.nhomhh, [item.tennhom]),
                            result
                        ),
                        new Map(),
                    ),
                ].map(([label, value]) => ({ label, value }));

                if (groupData) {
                    if (groupData.length > 0) {
                        groupData.forEach((itemGr) => {
                            var _tt_soluong = 0, _tt_thanhtien = 0;
                            var dataChild = data.filter(itemfi => itemfi.nhomhh == itemGr.label);
                            dataChild.forEach((item) => {

                                _tt_soluong += item.lgton;
                                _tt_thanhtien += item.thanhtien;

                                tt_soluong += item.lgton;
                                tt_thanhtien += item.thanhtien;
                            });
                            DataModel.push({
                                mahh: "",
                                nhomhh: itemGr.label,
                                tennhom: itemGr.value[0],
                                ten: "",
                                dvt: "",
                                lgton: _tt_soluong,
                                dongia: 0,
                                thanhtien: _tt_thanhtien,
                                ghichu: "",
                                childrens: dataChild
                            });
                        });
                    }
                }
            }
        }
        return (
            <React.Fragment>
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
                    </div>
                    <div className="clearfix"></div>
                    <hr />
                    <div className="w-100 text-center">
                        {option.tonam === '1' ?
                            <h2 className="title-print" style={{ marginBottom: 0 }}>BÁO CÁO TỒN KHO</h2>
                            :
                            <h2 className="title-print" style={{ marginBottom: 0 }}>BÁO CÁO TỒN KHO XUẤT ÂM</h2>
                        }
                    </div>
                    <div className="w-100 text-center">
                        <p className="date-print font-italic">Đến ngày {this.EndDayOfMonth(option.thang, 'DD')}/{this.formatDate(option.thang, 'MM')}/{this.formatDate(option.thang, 'YYYY')}</p>
                    </div>
                    <div className="clearfix"></div>
                    <div className="w-100 text-left">
                        <h2 className="title-print">Kho: {option.storeID} - {kho.storeName}</h2>
                    </div>
                    <table className="table-detail-print">
                        <tbody>
                            <tr>
                                <td className="text-center" style={{ width: '3%' }}><b>STT</b></td>
                                <td className="text-center" style={{ width: '33%' }}><b>Tên hàng hóa</b></td>
                                <td className="text-center" style={{ width: '5%' }}><b>Đvt</b></td>
                                <td className="text-center" style={{ width: '8%' }}><b>Số lượng</b></td>
                                <td className="text-center" style={{ width: '8%' }}><b>Đơn giá</b></td>
                                <td className="text-center" style={{ width: '8%' }}><b>Thành tiền</b></td>
                                <td className="text-center" style={{ width: '30%' }}><b>Ghi chú</b></td>
                            </tr>
                            {
                                DataModel && DataModel.map((dgr, indexgr) => {
                                    return (
                                        <Fragment key={'_SP_RP_TONKHO_HH' + indexgr + new Date().toLocaleTimeString()}>
                                            <tr key={'_SP_RP_TONKHO_HH' + indexgr + dgr.nhomhh + new Date().toLocaleTimeString()}>
                                                <td className="text-center font-bold" colSpan={7}>{dgr.nhomhh } - {dgr.tennhom}</td>
                                            </tr>
                                            {
                                                dgr.childrens && dgr.childrens.map((d: any, index: any) => {
                                                    indexCount = indexCount + 1;
                                                    return (
                                                        <tr key={d.mahh + '_SP_RP_TONKHO_HH' + index + new Date().toLocaleTimeString()}>
                                                            <td className="text-center" style={{ width: '3%' }}>{indexCount}</td>
                                                            <td className="text-left" style={{ width: '33%' }}>{d.mahh} - {d.ten}</td>
                                                            <td className="text-center" style={{ width: '5%' }}>{d.dvt}</td>
                                                            <td className="text-right" style={{ width: '8%' }}>
                                                                <NumericFormat value={d.lgton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                            </td>
                                                            <td className="text-right" style={{ width: '8%' }}>
                                                                <NumericFormat value={d.dongia} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                            </td>
                                                            <td className="text-right" style={{ width: '8%' }}>
                                                                <NumericFormat value={d.thanhtien} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                            </td>
                                                            <td className="text-left" style={{ width: '30%' }}>{d.ghichu}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan={3} className="text-center">
                                    <b>TỔNG CỘNG</b>
                                </td>
                                <td className="text-right font-bold">
                                    <NumericFormat value={tt_soluong} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                </td>
                                <td className="text-right font-bold">
                                </td>
                                <td className="text-right font-bold">
                                    <NumericFormat value={tt_thanhtien} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                </td>
                                <td className="text-right font-bold">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="h-10"></div>
                    <div className="text-right">
                        <div style={{ paddingRight: 40 }}>
                            <span className="font-italic">
                                Cần Thơ, ngày.....tháng.....năm {moment(new Date()).format("YYYY")}
                            </span>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="inline-bolck w-40 text-center">
                        <h2 className="emp-name-print"><b>Người Lập Phiếu</b></h2>
                    </div>
                    <div className="inline-bolck w-60 text-right">
                        <h2 className="emp-name-print" style={{ paddingRight: 100 }}><b>Giám Đốc</b></h2>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        )
    }
}
export default _SP_RP_TONKHO_HH;