import React, { Fragment, useState, useEffect } from 'react';
import { Modal, Button, message } from 'antd';
import { GridColumn, DataGrid } from 'rc-easyui';
import { APIStatus } from '../../configs/APIConfig';

import Container from '../../components/container/index';

import mainMenu from '../../models/mainMenu';
import menus, { menusVm } from '../../models/menus';

import MenuService from '../../services/menuService';

import { ShowModal } from '../../components/common/index';
import AddUpMainMenu from './addUpMainMenu';
import AddUpMenu from './addUpMenu';
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

const { confirm } = Modal;
const menuService = new MenuService();
const MenuPage: React.FC = () => {

    const [stateMainMenu, setStateMainMenu] = useState({ loading: true, lstMainMenu: Array<mainMenu>() });
    const [stateMenu, setStateMenu] = useState({ loading: true, lstMenu: Array<menusVm>() });
    const [stateOptionMainMenu, setOptionMainMenu] = useState((() => {
        let dataInit = { mainmenuID: 0, mainmenuName: '' };
        return dataInit;
    }));
    const [stateOptionMenu, setOptionMenu] = useState((() => {
        let dataInit = { mnid: 0, ten: '' };
        return dataInit;
    }));

    useEffect(() => {
        LoadMainMenu();
        LoadMenu();
    }, []);

    const LoadMainMenu = async () => {
        var mainumenus = await menuService.GetMainMenuList();
        setStateMainMenu({ ...stateMainMenu, lstMainMenu: mainumenus.data, loading: false });
    }

    const LoadMenu = async (searchOptions?: any) => {
        const mainmenuID = searchOptions == undefined ? 0 : searchOptions.mainmenuID || 0;
        var menus = await menuService.GetListMenuByMainMenuId(mainmenuID);
        setStateMenu({ ...stateMenu, lstMenu: menus.data, loading: false });

    }

    const CallBackAddUpMenu = (mainmenuID: number) => {
        LoadMenu({ mainmenuID: mainmenuID });
    }

    const onSelectMainMenu = (selection: mainMenu) => {
        setOptionMainMenu(prevState => ({ ...prevState, mainmenuID: selection.mainMenuID, mainmenuName: selection.mainMenuName }));
        setStateMenu({ ...stateMenu, loading: true });
        LoadMenu({ mainmenuID: selection.mainMenuID });
    }

    const onSelectMenu = (selection: menus) => {
        setOptionMenu(prevState => ({ ...prevState, mnid: selection.menuID, ten: selection.menuName }));
    }

    const editMainMenu = (e: any, type: string) => {

        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionMainMenu.mainmenuID === 0) {
                message.error('Vui lòng chọn main menu để chỉnh sửa', 3);
                return;
            }
        }

        ShowModal({
            dvId: 'dgAddUpMainMenu',
            component: AddUpMainMenu,
            dataProps: { mainmenuId: type === 'add' ? 0 : stateOptionMainMenu.mainmenuID, callBackSubmit: LoadMainMenu }
        });

    }

    const deleteMainMenu = (e: any) => {
        e.preventDefault();
        if (stateOptionMainMenu.mainmenuID === 0) {
            message.error('Vui lòng chọn main menu để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa main menu: ' + stateOptionMainMenu.mainmenuName + '?',
            onOk() {
                OnDeletedMainMenu();
            },
            onCancel() { },
        });

    }

    const OnDeletedMainMenu = async () => {
        var reDelete = await menuService.MainMenuDelete(stateOptionMainMenu.mainmenuID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            setOptionMainMenu(prevState => ({ ...prevState, mainmenuID: 0, mainmenuName: '' }));
            LoadMainMenu();
            LoadMenu();
        }
    }

    const editMenu = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionMenu.mnid === 0) {
                message.error('Vui lòng chọn menu để chỉnh sửa', 3);
                return;
            }
        }
        else {
        
        }
        ShowModal({
            dvId: 'dgAddUpMenu',
            component: AddUpMenu,
            dataProps: { menuID: type === 'add' ? 0 : stateOptionMenu.mnid, mainmenuID: stateOptionMainMenu.mainmenuID,mainMenuName: stateOptionMainMenu.mainmenuName, callBackSubmit: CallBackAddUpMenu}
        });
    }

    const deleteMenu = (e: any) => {
        e.preventDefault();
        if (stateOptionMenu.mnid === 0) {
            message.error('Vui lòng chọn menu để xóa', 3);
            return;
        }
        if (stateOptionMainMenu.mainmenuID == 0){
            message.error('Vui lòng chọn mục MainMenu của Menu muốn xoá để tránh lỗi hệ thống', 3);
            return;
        }
        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa menu: ' + stateOptionMenu.ten + '?',
            onOk() {
                OnDeletedMenu();
            },
            onCancel() { },
        });
    }

    const OnDeletedMenu = async () => {
        var reDelete = await menuService.MenuDelete(stateOptionMenu.mnid);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            setOptionMenu(prevState => ({ ...prevState, mnid: 0, ten: '' }));
            LoadMenu({ mainmenuID: stateOptionMainMenu.mainmenuID});
        }
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-left">
                    <div className="pannel-left-header">
                        MAIN MENU
                    </div>
                    <div className="pannel-left-body">
                        <DataGrid
                            //filterable
                            data={stateMainMenu.lstMainMenu}
                            style={{ height: (window.innerHeight - 150) }}
                            onSelectionChange={onSelectMainMenu}
                            selectionMode="single">
                            <GridColumn title="Tên" field="mainMenuName" width="70%" />
                            <GridColumn title="STT" field="sortOrder" width="30%" align="right" />
                        </DataGrid>
                    </div>
                    <div className="pannel-left-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />}size="small" onClick={e => editMainMenu(e, 'add')} >Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} size="small" onClick={e => editMainMenu(e, 'edit')} >Sửa</Button>
                        <Button className="button" type="primary" icon={<DeleteOutlined />} size="small" onClick={e => deleteMainMenu(e)} danger>Xóa</Button>

                    </div>
                </div>
                <div className="page-pannel-right">
                    <div className="pannel-right-header">
                        MENU
                    </div>
                    <div className="pannel-right-body">
                        <Container isLoading={stateMenu.loading}>
                            <DataGrid
                                //filterable
                                data={stateMenu.lstMenu}
                                style={{ height: (window.innerHeight - 150) }}
                                onSelectionChange={onSelectMenu}
                                selectionMode="single">
                                {/* <GridColumn title="ID" field="menuid" width="20%" /> */}
                                {/* <GridColumn title="ERP" field="erpten" width="20%" /> */}
                                <GridColumn title="Tên" field="menuName" width="50%" />
                                <GridColumn title="Key" field="menuKey" width="25%" align="center" />
                                <GridColumn title="STT" field="sortOrder" width="25%" align="right" />

                            </DataGrid>
                        </Container>
                    </div>
                    <div className="pannel-right-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />}  size="small" onClick={e => editMenu(e, 'add')}>Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} size="small" onClick={e => editMenu(e, 'edit')}>Sửa</Button>
                        <Button className="button" type="primary" icon={<DeleteOutlined />} size="small" onClick={e => deleteMenu(e)}danger>Xóa</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default MenuPage;