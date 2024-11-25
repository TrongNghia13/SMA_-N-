import React, {
    Fragment,
    Suspense,
    lazy,
    useState,
    useEffect,
    FunctionComponent,
    useRef
} from "react";
import { Layout, Spin, Tabs, Menu, theme } from 'antd';
import { Route, Routes, BrowserRouter, Link, useNavigate } from "react-router-dom";

import TreeMenu from "../../../models/ui/treeMenu";
import MenuModel from "../../../models/menus";
import LoginUtils from "../../../utils/loginUtils";
import MenuController from "../../../services/menuService";
import LogTimeController from "../../../services/logTimeService";
import { ShowModal } from "../../../components/common/index";
import ChangePass from "../changePassword";
import './layout.scss';
// import CateWidth from "../../../pages/cateWidthPage";
// import CateWidth from "../../../pages/cateWidthPage";


const { Header, Content, Footer, Sider } = Layout;

const loading = () => (
    <div className="spin-loading">
        <Spin tip="Loading ..." />
    </div>
);

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const PageHeader = lazy(() => import("../header/index"));
const SliderPage = lazy(() => import("../slider/index"));
const CateMonthPage = lazy(() => import("../../../pages/cateMonthPage/index"));
const DashBoard = lazy(() => import("../../../pages/dashBoard"));
const CateStandard = lazy(() => import("../../../pages/cateStandard/index"));
const CateSteelType = lazy(() => import("../../../pages/cateSteelType/index"));
const CateProductionBatchNo = lazy(() => import("../../../pages/cateProductionBatchNo/index"));
const MenuPage = lazy(() => import("../../../pages/menu/index"));
const CateBranch = lazy(() => import("../../../pages/cateBranch/index"));
const CateJobTitle = lazy(() => import("../../../pages/cateJobTittle/Index"));
// const cateThickness = lazy(() => import("../../../pages/cateThicknessPage/index"));
// const cateWidth = lazy(() => import("../../../pages/cateWidthPage/index"));
const cateThickness = lazy(() => import("../../../pages/cateThicknessPage/index"));
const TaskDeliveryAppPage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/taskDeliveryApp/index"));
const cateWidthPage = lazy(() => import("../../../pages/cateWidthPage/index"))
const InputInventoryPage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/inputInventory"))
const CateManufacturing = lazy(() => import("../../../pages/QLSX/cateManufacturing/index"));
const cateProductionGeneral = lazy(() => import("../../../pages/cateProductionGeneral/index"));
const cateGalvanizedOrganization = lazy(() => import("../../../pages/cateGalvanizedOrganization/index"));
const cateProductionPlan = lazy(() => import("../../../pages/cateProductionPlan/index"));
const UpdateSteelDefectPage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/updateSteelDefect/index"));
const RollTruckScalePage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/rollTruckScale/index"));
const OutputRollInventoryPage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/outputInventory/index"));
const CreatePlanRollToTapePage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/createPlanRollToTape/index"));
const RollProductionScalePage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/rollProductionScale/index"));
const UpdateWidthImportPage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/updateWidthImport/index"));
const PrintQRCodePage = lazy(() => import("../../../pages/manufacturingManagement/rollManagement/printQRCode/index"));
const CateSteelDefectPage = lazy(() => import("../../../pages/cateSteelDefect/index"));
const InputTapeFormProductionPage = lazy(() => import("../../../pages/manufacturingManagement/tapeManagement/inputTapeFormProduction/index"));
const InputFormRollPage = lazy(() => import("../../../pages/manufacturingManagement/scrapManagement/inputFormRoll/index"));
const UsersPage = lazy(() => import("../../../pages/users/index"));
const TransferDataBeginingPage = lazy(() => import("../../../pages/transferDataBegining/index"));
const CateCounterpartyPage = lazy(() => import("../../../pages/cateCounterparty/index"));
const CateEmployeeOgranzationPage = lazy(() => import("../../../pages/cateEmployeeOgranzationUnit/index"));
const cateStore = lazy(() => import("../../../pages/cateStore/index"))
const RolePage = lazy(() => import("../../../pages/roles/index"));
const ProductPage = lazy(() => import("../../../pages/cateProduct/index"));
const ReportPage = lazy(() => import("../../../pages/report/index"));
const LookupProductInstockPage = lazy(() => import("../../../pages/lookupProductInstock/index"));
const StatisticalPage = lazy(() => import("../../../pages/statistical/index"));
const CateStandardPage  = lazy(() => import("../../../pages/cateStandard/index"));


const menuController = new MenuController();
const logTimeController = new LogTimeController();


const initialItems = [
    {
        label: 'Tab 3',
        children: 'Content of Tab 3',
        key: '3',
        closable: false,
    },
    { label: 'Tab 1', children: 'Content of Tab 1', key: '1' },
    // { label: 'Tab 2', children: 'Content of Tab 2', key: '2' },
];
const { TabPane } = Tabs;

interface _TabItem {
    title: string;
    key: string;
    closable: boolean;
    data: any;
    content: React.LazyExoticComponent<FunctionComponent>;
    _AddTabHandler?: (key: string, title: string, data: any) => void;
}
const ScaffoldLayout: React.FC = () => {
    let navigate = useNavigate();
    const [tabActive, setTabActive] = useState("DashBoard");
    const [itemTab, setItemTab] = useState(() => {
        let dataInit: Array<_TabItem> = [
            // {
            //     key: "DashBoard",
            //     title: "DashBoard",
            //     closable: false,
            //     data: {},
            //     content: DashBoard,
            // },
        ];
        return dataInit;
    });
    const [treeMenu, setTreeMenu] = useState(Array<TreeMenu>());
    const [treeMenuFastAccess, setFastAccessMenuFastAccess] = useState(
        Array<MenuModel>()
    );

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);
    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };
    useEffect(() => {
        async function GetData() {
            await GetListMenu();
        }
        GetData();
    }, []);

    const GetListMenu = async () => {
        const userLoginInfo = LoginUtils.GetInfo();
        var getDdata = await menuController.GetMenuByUserLogin(userLoginInfo.UserId);
        if (getDdata) {
            setTreeMenu(getDdata.data.mainMenu);
            setFastAccessMenuFastAccess(getDdata.data.fastAccessMenu);
        }
    };

    // const add = () => {
    //     const newActiveKey = `newTab${newTabIndex.current++}`;
    //     const newPanes = [...items];
    //     newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
    //     setItems(newPanes);
    //     setActiveKey(newActiveKey);
    // };
    // const remove = (targetKey: TargetKey) => {
    //     let newActiveKey = activeKey;
    //     let lastIndex = -1;
    //     items.forEach((item, i) => {
    //         if (item.key === targetKey) {
    //             lastIndex = i - 1;
    //         }
    //     });
    //     const newPanes = items.filter((item) => item.key !== targetKey);
    //     if (newPanes.length && newActiveKey === targetKey) {
    //         if (lastIndex >= 0) {
    //             newActiveKey = newPanes[lastIndex].key;
    //         } else {
    //             newActiveKey = newPanes[0].key;
    //         }
    //     }
    //     setItems(newPanes);
    //     setActiveKey(newActiveKey);
    // };

    // const onEdit = (
    //     targetKey: React.MouseEvent | React.KeyboardEvent | string,
    //     action: 'add' | 'remove',
    // ) => {
    //     if (action === 'add') {
    //         add();
    //     } else {
    //         remove(targetKey);
    //     }
    // };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    const addTab = (
        key: string,
        title: string,
        closable: boolean,
        data: any,
        component: React.LazyExoticComponent<FunctionComponent>
    ) => {
        logTimeController.AddUpLogForm({
            loginid: 0,
            userid: 0,
            username: "",
            menukey: key,
        });
        if (IsExistTab(key)) {
            setTabActive(key);
        } else {
            var _itemTab = [...itemTab];
            _itemTab.push({
                key: key,
                title: title,
                closable: closable,
                data: data,
                content: component,
                _AddTabHandler: AddTabFromChild,
            });
            setItemTab(_itemTab);
            setTabActive(key);
        }
    };

    const onEditTab = (targetKey: any, action: any) => {
        if (action === "remove") {
            removeTab(targetKey);
        }
    };

    const removeTab = (targetKey: string, callback?: any) => {
        let lastIndex: number = 0;
        let activeKey = tabActive;
        var _itemTab = [...itemTab];
        var _indexremove = 0;
        _itemTab.forEach((pane, i) => {
            if (pane.key === targetKey) {
                _indexremove = i;
                lastIndex = i - 1;
            }
        });
        itemTab.splice(_indexremove, 1);
        const panes = _itemTab.filter((pane) => pane.key !== targetKey);
        if (panes.length && tabActive === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        setItemTab(panes);
        setTabActive(activeKey);
        if (callback) {
            callback();
        }
    };

    const onChangeTab = (activeKey: string) => {
        setTabActive(activeKey);
    };

    const IsExistTab = (key: string) => {
        var IsExistTab = false;
        var _itemTab = [...itemTab];
        for (var i = 0; i < _itemTab.length; i++) {
            var item = _itemTab[i];
            if (item.key == key) IsExistTab = true;
            if (IsExistTab) break;
        }
        return IsExistTab;
    };
    const AddTabHandler = (key: string, title: string, data: any) => {
        console.log("click", key);
        switch (key) {
            case "sign-out":
                logTimeController.AddUpLogStatus({
                    loginid: 0,
                    userid: 0,
                    username: "",
                    iplogin: "",
                    erpid: 0,
                    donviud: "",
                });
                LoginUtils.SetLogout();
                navigate("/login")
                break;
            case "changepass":
                ShowModal({
                    dvId: "dbChangePass",
                    component: ChangePass,
                    dataProps: {},
                });
                break;
            case "open_month":
                addTab(key, title, true, data, CateMonthPage);
                break;

            case "Tracuu_tonkhohh": //sử dụng tạm, key chưa có trong database
                addTab(key, title, true, data, cateGalvanizedOrganization);
                break;

            case "cate_menu":
                addTab(key, title, true, data, MenuPage);
                break;
            case "cate_branch":
                addTab(key, title, true, data, CateBranch);
                break;
            case "loai_nguyenlieu": // chưa có trên trên bảng 
                addTab(key, title, true, data, CateSteelType);
                break;
            case "solo": // chưa có trên trên bảng 
                addTab(key, title, true, data, CateProductionBatchNo);
                break;
            case "task_delivery_app":
                addTab(key, title, true, data, TaskDeliveryAppPage);
                break;
            case "dm_chungsx":
                addTab(key, title, true, data, cateProductionGeneral);
                break;

            case "dm_khonl":
                addTab(key, title, true, data, cateWidthPage);
                break;
            case "dm_chieuday":
                addTab(key, title, true, data, cateThickness);
                break;
            case "cate_JobTittle":
                addTab(key, title, true, data, CateJobTitle);
                break;   //InputInventoryPage
            case "Nhapnl_cuon":
                addTab(key, title, true, data, InputInventoryPage);
                break;   //InputInventoryPage    
            case "Sodo_Cuon":
                addTab(key, title, true, data, CateManufacturing);
                break;
            case "cate_JobTittle":
                addTab(key, title, true, data, CateJobTitle);
                break;
            case "cateProductionPlan":
                addTab(key, title, true, data, cateProductionPlan);
                break;
            case "rollSteelDefect":
                addTab(key, title, true, data, UpdateSteelDefectPage);
                break; //RollTruckScalePage
            case "rollTruckScale":
                addTab(key, title, true, data, RollTruckScalePage);
                break;
            case "outputInventory":
                addTab(key, title, true, data, OutputRollInventoryPage);
                break;
            case "createPlanToTape":
                addTab(key, title, true, data, CreatePlanRollToTapePage);
                break;
            case "rollProductionScale":
                addTab(key, title, true, data, RollProductionScalePage);
                break;
            case "updateWidthImport":
                addTab(key, title, true, data, UpdateWidthImportPage);
                break;
            case "printRollBarcode":
                addTab(key, title, true, data, PrintQRCodePage);
                break;
            case "rollTruckScale":
                addTab(key, title, true, data, RollTruckScalePage);
                break;
            case "dm_loisp":
                addTab(key, title, true, data, CateSteelDefectPage);
                break;
            case "inputTapeFormProduction":
                addTab(key, title, true, data, InputTapeFormProductionPage);
                break;
            case "inputScrapRollFormProduction":
                addTab(key, title, true, data, InputFormRollPage);
                break;
            case "systemUser":
                addTab(key, title, true, data, UsersPage);
                break;
            case "transferDataBegining":
                addTab(key, title, true, data, TransferDataBeginingPage);
                break;
            case "cateCounterparty":
                addTab(key, title, true, data, CateCounterpartyPage);
                break;
            case "cateEmployeeOgranzation":
                addTab(key, title, true, data, CateEmployeeOgranzationPage);
                break;
                break;
            case "cate_store":
                addTab(key, title, true, data, cateStore);
                break;
            case "system_role":
                addTab(key, title, true, data, RolePage);
                break;
            case "cateProduct":
                addTab(key, title, true, data, ProductPage);
                break;
            case "report":
                addTab(key, title, true, data, ReportPage);
                break;
            case "lookupProductInstock":
                addTab(key, title, true, data, LookupProductInstockPage);
                break;
            case "statistical":
                addTab(key, title, true, data, StatisticalPage);
                break;
                case "cate_Standard":
                addTab(key, title, true, data, CateStandardPage);
                break;
        }
    };

    const AddTabFromChild = (key: string, title: string, data: any) => {
        if (IsExistTab(key)) {
            removeTab(key, function () {
                setTimeout(() => {
                    AddTabHandler(key, title, data);
                }, 300);
            });
        } else {
            setTimeout(() => {
                AddTabHandler(key, title, data);
            }, 300);
        }
    };
    const handleClickMenu = (e: any, data: any = {}) => {
        AddTabHandler(e.key, e.item.props.title, data);
    };
    return (
        <Fragment>
            <Layout className="layout-page">
                <Suspense fallback={loading()}>
                    <PageHeader menus={treeMenu} handleClickMenu={handleClickMenu} />
                </Suspense>
                <Layout>
                    <Suspense fallback={loading()}>
                        {/* <SliderPage
                  menus={treeMenuFastAccess}
                  handleClickMenu={handleClickMenu}
                /> */}
                    </Suspense>
                    <Content className="content-page">
                        <div className="tab-content">
                            <Tabs
                                onChange={onChangeTab}
                                onEdit={onEditTab}
                                activeKey={tabActive}
                                type="editable-card"
                                hideAdd
                            >
                                {itemTab.map((pane) => (
                                    <TabPane
                                        tab={pane.title}
                                        key={pane.key}
                                        closable={pane.closable}
                                    >
                                        <Suspense fallback={loading()}>
                                            <pane.content {...pane} />
                                        </Suspense>
                                    </TabPane>
                                ))}
                            </Tabs>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    );
};

export default ScaffoldLayout;