import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, message, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FormProps } from 'antd/lib/form/Form';
import DialogPage from '../../components/dialog/dialogPage';

import CateStoreService from '../../services/cateStoreService';
import { APIStatus } from '../../configs/APIConfig';
import cateStoreType from '../../models/cateStoreType';

interface PropsAddUpCateStoreType extends FormProps {
  type: string,
  storeTypeID: string;
  callBackSubmit: () => void;
}
const AddUpCateStoreType: React.FC<PropsAddUpCateStoreType> = (props) => {

  const cateStoreService = new CateStoreService();

  const {type, storeTypeID, callBackSubmit } = props;
  const [dialogData, setDialogData] = useState({ visible: true, title: 'Cập Nhật Loại Kho', confirmLoading: false, destroyOnClose: false });
  const [storeTypeModel, setStoreTypeModel] = useState((() => {
    let dataInit: cateStoreType = {} as any;
    return dataInit;
  }));

  //const { getFieldDecorator } = props.form;

  useEffect(() => {
    async function GetData() {
      if (storeTypeID === '') {
        setStoreTypeModel({ ...storeTypeModel, storeTypeID: '', });
      }
      else {
        var getDdata = await cateStoreService.GetCateStoreTypeById(storeTypeID);
        setStoreTypeModel(getDdata.data);
      }
    };
    GetData();
  }, []);

  const onOk = async (event: React.MouseEvent<HTMLElement>) => {
    if (storeTypeModel.storeTypeName) {
      var data: any;
      if (type === 'add') {
        data = await cateStoreService.CreateStoreType(storeTypeModel);
      } else {
        data = await cateStoreService.UpdateStoreType(storeTypeModel);

      }
      if (data.status === APIStatus.ERROR) {
        message.error(data.message);
      }
      else {
        setDialogData({ ...dialogData, visible: false });
        callBackSubmit();
      }
    }
  }


  const onCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setDialogData({ ...dialogData, visible: false });
  }

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let { type, name, value } = e.currentTarget;
    setStoreTypeModel({ ...storeTypeModel, [name]: (type === 'number' ? parseFloat(value) : value) });
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    }
  }
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
          <Form.Item label="Mã Loại Kho">
            <Input
              className="input-text-upercase"
              placeholder="Mã loại kho"
              name="storeTypeID"
              value={storeTypeModel?.storeTypeID} // Use the value directly
              onChange={handleChangeInput}
              required // Add the "required" attribute for validation
            />
          </Form.Item>
          <Form.Item label="Tên Loại Kho">
            <Input
              name="storeTypeName"
              value={storeTypeModel?.storeTypeName} // Use the value directly
              onChange={handleChangeInput}
              required // Add the "required" attribute for validation
            />
          </Form.Item>
        </Form>
      </DialogPage>
    </div>
  );

}
export default AddUpCateStoreType;