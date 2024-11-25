
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { usersVm } from '../../models/users';
import UserController from '../../services/userService';
import LoginUtils from '../../utils/loginUtils';

const { Option } = Select;
interface CBUserQuanTriProps {
    value: string;
    isEditing: boolean;
    OnChangeCBQuanTri: ((value: string) => void)
}
const CBUserQuanTri: React.FC<CBUserQuanTriProps> = (props) => {

    const { value, isEditing, OnChangeCBQuanTri, } = props;
    const userLoginInfo = LoginUtils.GetInfo();
    //const isquantri = userLoginInfo.userinfo.isquantri == true ? true : false;
    const isquantri = true;

    const userController = new UserController();
    const [model, setModel] = useState((() => {
        let dataInit: Array<usersVm> = [] as any;
        return dataInit;
    }));

    useEffect(() => {
        async function GetData() {
            await GetListUser();
        };
        GetData();
    }, []);

    const GetListUser = async () => {
        if (isquantri) {
            var getDdata = await userController.GetListAdmintrator();
            setModel(getDdata.data);
        }
        else {
            setModel([{
                userID: 0,
                employeeID: 0,
                userName: userLoginInfo.userName,
                password: '',
                isActive: true,
                passwordRealTime: '',
                dashBoardID: 0,
                isAccessHour: false,
                employeeName: '',
                isAccessIP: false,
                publicIP: ''
            }])
        }
    }

    return (
        <React.Fragment>
            {isquantri ?
                <div className="input-select-width-200">
                    <Select
                        className="input-bg-special"
                        value={value === '' ? userLoginInfo.userName : value}
                        disabled={isEditing}
                        allowClear
                        size="small"
                        style={{ width: '100%' }}
                        showSearch
                        optionFilterProp="children"
                        optionLabelProp="title"
                        onChange={OnChangeCBQuanTri}
                        getPopupContainer={(trigger: any) => trigger.parentNode}
                        notFoundContent={null}
                    >
                        {model && model.map(d => (
                            <Option title={d.userName} key={d.userName} value={d.userName}>
                                <span>{d.userName} - {d.employeeName}</span>
                            </Option>
                        ))}
                    </Select>
                </div>
                :
                <div></div>
            }
        </React.Fragment>
    )
}
export default CBUserQuanTri;