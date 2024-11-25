import React, { FC } from 'react';
import { Layout, Menu,  } from 'antd';
import Icon from '@ant-design/icons'
import TreeMenu from '../../../models/ui/treeMenu';
// import { ClickParam } from 'antd/lib/menu';
import Menus from '../../../models/menus';

import './slider.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SliderProps {
    menus: Array<Menus>,
    handleClickMenu: ((e: any) => void)
}
const SliderPage: FC<SliderProps> = (props) => {
    const { menus, handleClickMenu } = props;

    const RenderMenu = (dataSource: Array<Menus>) => {
        return (
            dataSource.map((menu, index) => {
                // if (menu.listMenu && menu.listMenu.length > 0) {
                //     return (
                //         <SubMenu key={menu.menuID}>
                //             {/* {RenderMenu(menu.listMenu)} */}
                //         </SubMenu>
                //     )
                // } else {
                    return (<Menu.Item key={menu.menuKey} title={menu.menuName}>
                        <Icon style={{ fontSize: '40px', color: '#fff' }} type={menu.icon} />
                        <div className="title-menu-left">{menu.menuName}</div>
                    </Menu.Item>)
                // }
            })
        )
    }

    return (
        <React.Fragment>
            <Sider collapsed={true} className="Sider">
                <Menu mode="inline" onClick={handleClickMenu}>
                    {menus && RenderMenu(menus)}
                    <Menu.Item key={'ReloadPageRemoveCache'} title={'Tải lại trang web'}>
                        <Icon style={{ fontSize: '40px', color: '#fff' }} type={'reload'} />
                        <div className="title-menu-left"></div>
                    </Menu.Item>
                </Menu>
            </Sider>
        </React.Fragment>
    )
}
export default SliderPage;