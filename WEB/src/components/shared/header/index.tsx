import React, { Fragment } from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import Icon from '@ant-design/icons';

import './header.scss';
import logo from '../../../assets/images/logo_blue.png';
import avatarLogo from '../../../assets/images/logo_white.png';
import { MessageOutlined, StepBackwardOutlined} from '@ant-design/icons';
// import { ClickParam } from 'antd/lib/menu';
import LoginUtils from '../../../utils/loginUtils';
import TreeMenu from '../../../models/ui/treeMenu';
import MenuModel from "../../../models/menus"

const { Header } = Layout;
const { SubMenu } = Menu;


// const handleClickMenu = (clickParam : any) => {
//     console.log('ClickParam:', clickParam);
//     console.log('Clicked Key:', clickParam.key);
//   };
  interface HeaderProps {
    menus: Array<TreeMenu>,
    handleClickMenu: ((e: any) => void)
}
const PageHeader: React.FC<HeaderProps> = (props) => {
    const { menus,handleClickMenu } = props;
    const userLoginInfo = LoginUtils.GetInfo();

    const RenderMenu = (dataSource: Array<TreeMenu>) => {
        return (
            dataSource.map((menu, index) => {
                if (menu.listMenu && menu.listMenu.length > 0) {
                    return (
                        <SubMenu key={menu.mainMenuID} title={
                            <span>
                                {/* <MessageOutlined style={{ fontSize: '16px', color: '#08c' }} /> */}
                                {/* <Icon style={menu.icon}/> */}
                                <span>{menu.mainMenuName}</span>
                            </span>
                        }>
                            {/* {RenderMenu(menu.listMenu)} */}
                    {RenderSubMenu(menu.listMenu)}

                        </SubMenu>
                    )
                   
                } else {
                         // {RenderSubMenu(menu.listMenu)}
                }
            })
        )
    }
    const RenderSubMenu = (dataSource:Array<MenuModel>) => {
        return (
        dataSource.map((subMenu, index)=> {
            return (
            <Menu.Item key={subMenu.menuKey} title={subMenu.menuName}>
                <span>
                    {/* <Icon type={subMenu.icon} /> */}
                    {/* <Button icon={subMenu.icon}> </Button> */}
                    <span>{subMenu.menuName}</span>
                </span>
            </Menu.Item>)
        })
        )
    }
    return (
        <Fragment>
            <Header className="header">
                <div className="logo">
                    <img src={logo} />
                </div>
                <div>
                    <Menu onClick={handleClickMenu}
                        mode="horizontal"
                    >
                        {menus && RenderMenu(menus)}
                    </Menu>
                </div>
                <div className="headerRight">
                    <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
                        <SubMenu
                            title={
                                <Fragment>
                                    <div className="inline-bolck" style={{ verticalAlign: 'middle' }}>
                                        <div className="name-user-login text-right">{userLoginInfo.UserName}</div>
                                        <div className="name-user-login">{userLoginInfo.EmployeeName}</div>
                                    </div>
                                    <Avatar style={{ marginLeft: 8 }} src={avatarLogo} />
                                </Fragment>
                            }
                        >
                            <Menu.Item key="donvi-login-user-info">
                                <span style={{ color: '#5884d6' }}>{userLoginInfo.BranchName}</span>
                            </Menu.Item>
                            <Menu.Item key="changepass">
                                <span>Thay đổi mật khẩu</span>
                            </Menu.Item>
                            <Menu.Item key="sign-out">
                                <span>Thoát</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </Header>
        </Fragment>
    )
}
export default PageHeader;