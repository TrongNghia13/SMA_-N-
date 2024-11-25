import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, message, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FormProps } from 'antd/lib/form/Form';
import DialogPage from '../../components/dialog/dialogPage';

import CateBranchController from '../../services/cateBranchService';
import CateStoreService from '../../services/cateStoreService';
import cateBranch from '../../models/cateBranch';
import { APIStatus } from '../../configs/APIConfig';
import cateStore from '../../models/cateStore';
import cateStoreType from '../../models/cateStoreType';
import Login from '../login';
import LoginUtils from '../../utils/loginUtils';

interface PropsAddUpCateStore extends FormProps {
  type: string,
  storeID: string;
  callBackSubmit: ((storeTypeID: string) => void)
}
const userLogin = LoginUtils.GetInfo();
const { Option } = Select;

const AddUpCateStore: React.FC<PropsAddUpCateStore> = (props) => {
  const cateStoreService = new CateStoreService();
  const cateBranchController = new CateBranchController();

  const { type, storeID, callBackSubmit } = props;
  const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Kho', confirmLoading: false, destroyOnClose: false });
  const [storeModel, setStoreModel] = useState((() => {
    let dataInit: cateStore = {} as any;
    return dataInit;
  }));
  const [storeTypeModel, setStoreTypeModel] = useState((() => {
    let dataInit: Array<cateStoreType> = [] as any;
    return dataInit;
  }));
  const [dataCateBranch, setDataCateBranch] = React.useState((() => {
    let dataInit: Array<cateBranch> = [] as any;
    return dataInit;
  }));

  //const { getFieldDecorator } = props.form;

  useEffect(() => {
    async function GetData() {
      await GetListStoreType();
      await GetListCateBranch();

      if (storeID === '') {
        setStoreModel({ ...storeModel, storeID: '', });
      } else {
        var getDdata = await cateStoreService.GetStoreById(storeID);
        setStoreModel(getDdata.data);
      }
    }
    GetData();
  }, []);

  const GetListStoreType = async () => {
    var getDdata = await cateStoreService.GetListLoaiKho();
    setStoreTypeModel(getDdata.data);
  };

  const GetListCateBranch = async () => {
    var getDdata = await cateBranchController.GetList();
    setDataCateBranch(getDdata.data);
  };

  const onOk = async (event: React.MouseEvent<HTMLElement>) => {
    // Check if model.storeName is not null
    if (storeModel.storeName !== null && storeModel.storeID !=null &&  storeModel.storeID.length > 0 ) {
      var data;
      if (type === 'add') {
        data = await cateStoreService.CreateStore(storeModel);
      } else {
        data = await cateStoreService.UpdateStore(storeModel);
      }
      if (data.status === APIStatus.ERROR) {
        message.error(data.message);
      } else {
        setDialogData({ ...dialogData, visible: false });
        callBackSubmit(storeModel.storeTypeID);
      }
    } else {
      // Handle the case where model.storeName is null
      // You can show an error message or take appropriate action here.
    }
  };




  const onCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setDialogData({ ...dialogData, visible: false });
  };

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let { type, name, value } = e.currentTarget;
    setStoreModel({ ...storeModel, [name]: type === 'number' ? parseFloat(value) : value });
  };

  const onChangeStoreType = async (value: any, option: any) => {
    setStoreModel({ ...storeModel, storeTypeID: value });
  };

  const onChangeCateBranch = async (value: any, option: any) => {
    setStoreModel({ ...storeModel, branchID: value });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div>
      <DialogPage
        title={dialogData.title}
        visible={dialogData.visible}
        confirmLoading={dialogData.confirmLoading}
        onCancel={onCancel}
        onOk={onOk}
        destroyOnClose={dialogData.destroyOnClose}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Đơn vị">
            <Select
              value={storeModel?.branchID}
              onChange={onChangeCateBranch}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Chọn đơn vị"
            >
              {dataCateBranch &&
                dataCateBranch.map((d) => (
                  <Option value={d.branchID} key={d.branchID}>
                    {d.branchName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Loại Kho">
            <Select
              value={storeModel?.storeTypeID}
              onChange={onChangeStoreType}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Chọn loại kho"
            >
              {storeTypeModel &&
                storeTypeModel.map((d) => (
                  <Option value={d.storeTypeID} key={d.storeTypeID}>
                    {d.storeTypeName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Mã Kho">
            <Input
              className="input-text-upercase"
              placeholder="Mã loại kho"
              name="storeID"
              value={storeModel?.storeID}
              onChange={handleChangeInput}
              required
              maxLength={3}
            />
          </Form.Item>
          <Form.Item label="Tên Kho">
            <Input
              name="storeName"
              value={storeModel?.storeName}
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input
              name="storeAddress"
              value={storeModel?.storeAddress}
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item label="Thủ Kho">
            <Input
              name="storeKeeperName"
              value={storeModel?.storeKeeperName}
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item label="Ghi chú">
            <Input
              name="description"
              value={storeModel?.description}
              onChange={handleChangeInput}
            />
          </Form.Item>
        </Form>
      </DialogPage>
    </div>
  );
}
export default AddUpCateStore;
