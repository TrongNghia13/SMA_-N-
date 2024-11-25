import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Button, Input, DatePicker, Modal, InputNumber, message, Checkbox, Select, Tabs, Spin, Transfer, Table } from 'antd';
// import difference from 'lodash/difference';
import { ComboGrid, GridColumn, DataGrid, TextBox, LinkButton } from 'rc-easyui';

import ChieuDay from '../cateThicknessPage/index';
import KhoNL from '../cateWidthPage/index';
import TieuChuan from '../cateStandard/index';
import DVMaGC from '../cateGalvanizedOrganization/index';
import SoLo from '../cateProductionBatchNo/index';
import LoaiNL from '../cateSteelType/index';


const { TabPane } = Tabs;

const CateProductionGeneral: React.FC = () => {
    const [tabActive, setTabActive] = useState('chieu_day');

    const onChangeTab = (activeKey: string) => {
        setTabActive(activeKey);
    };
    
    return(
        <div className="card-container">
            <Tabs defaultActiveKey={tabActive} activeKey={tabActive}  type="card" onChange={onChangeTab}>
                <TabPane tab="Chiều dày" key="chieu_day"> 
                    <ChieuDay></ChieuDay>                                               
                </TabPane>
                <TabPane tab="Tiêu chuẩn" key="tieu_chuan">         
                    <TieuChuan></TieuChuan>                                       
                </TabPane>
                 <TabPane tab="Đơn vị mạ gia công" key="don_vi_ma_gia_cong">    
                    <DVMaGC></DVMaGC>                                         
                </TabPane> 
                <TabPane tab="Số lô" key="so_lo">          
                    <SoLo></SoLo>                                   
                </TabPane>
                <TabPane tab="Loại nguyên liệu" key="loai_nguyen_lieu">   
                    <LoaiNL></LoaiNL>                                           
                </TabPane>
                 <TabPane tab="Khổ nguyên liệu" key="kho_nguyen_lieu">     
                    <KhoNL></KhoNL>                                             
                </TabPane> 
            </Tabs>
        </div>
    )
}

export default CateProductionGeneral;