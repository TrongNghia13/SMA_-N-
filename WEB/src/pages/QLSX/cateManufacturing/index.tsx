import React, { useState, useCallback, MouseEvent } from "react";
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  MarkerType,
} from "react-flow-renderer";
import barcodeImg from "../../../assets/images/bar_code.svg";
import truckImg from "../../../assets/images/delivery-truck-svgrepo-com.svg";
import weighingImg from "../../../assets/images/weighing-svgrepo-com.svg";
import databaseImg from "../../../assets/images/database-svgrepo-com.svg";




const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};
interface CateManufacturingPaseProps {
  _AddTabHandler?: ((key: string, title: string, data: any) => void)
  
}
const CateManufacturingPase: React.FC< CateManufacturingPaseProps> = (props) => {

  const dataForNhapCuon = { key: 'value for Nhap Cuon' };
const dataForCanXe = { key: 'value for Can Xe' };
const dataForCapNhatLoi = { key: 'value for Cap Nhat Loi' };
const dataForInTem = { key: 'value for In Tem' };


  const { _AddTabHandler } = props;

  const initialNodes = [
    {
      id: "node-nhap-kho",
      type: "input",
      data: {
        label: (
          <div className="text-center" onClick={e => _AddTabHandler && _AddTabHandler('Nhapnl_cuon', 'Nhập cuộn', dataForNhapCuon)}>

            <div>
              <b>1. NHẬP CUỘN</b>
            </div>
            (Số kg1)
          </div>
        ),
      },
      position: { x: 0, y: 120 },
    },
    {
      id: "node-kho-cuon",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>KHO CUỘN</b>
            </div>
            {/* <img src={databaseImg} height="50" /> */}
          </div>
        ),
      },
      position: { x: 450, y: 90 },
    },
    {
      id: "node-xuatban-noibo",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>XUẤT BÁN/NỘI BỘ</b>
            </div>
            (Số kg3)
          </div>
        ),
      },
      position: { x: 800, y: 120 },
    },
    {
      id: "node-canxe",
      data: {
        label: (
          <div className="text-center" onClick={e => _AddTabHandler &&_AddTabHandler('Canxe_cuon', 'Cân Xe', dataForCanXe)}>
            <div>
              <b>4. CÂN XE</b>
            </div>
            <div>
              {/* <img src={truckImg} height="50" /> */}
            </div>
            (Số kg2)
          </div>
        ),
      },
      position: { x: 170, y: 90  },
    },
    {
      id: "node-loicuon",
      data: {
        label: (
          <div className="text-center" onClick={e => _AddTabHandler &&_AddTabHandler('Update_loicuon', 'Cập nhật lỗi cuộn', dataForCapNhatLoi)}>
            <div>
              <b>3. CẬP NHẬT LỖI</b>
            </div>
          </div>
        ),
      },
      position: { x: 120, y: 0},
    },
    {
      id: "node-intem",
      data: {
        label: (
          <div className="text-center" onClick={e => _AddTabHandler && _AddTabHandler('Intem_cuon', 'In Tem cuộn', dataForInTem)}>
            <div>
              <b>2. IN TEM</b>
            </div>
            {/* <img src={barcodeImg} height="50" /> */}
          </div>
        ),
      },
      position: { x: 20, y: 200 },
    },
    {
      id: "node-dieuchinhkehoach",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>ĐIỀU CHỈNH KẾ HOẠCH</b>
            </div>
          </div>
        ),
      },
      position: { x: 320, y: 200 },
    },
    {
      id: "node-lapkehoachsanxuat",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>LẬP KẾ HOẠCH SẢN XUẤT</b>
            </div>
          </div>
        ),
      },
      position: { x: 250, y: 310 },
    },
    {
      id: "node-quatcancuon",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>QUÉT/CÂN CUỘN</b>
            </div>
            (Số kg3)
          </div>
        ),
      },
      position: { x: 250, y: 510 },
    },
    {
      id: "node-suatcuonsanxuat",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>SUẤT CUỘN</b>
            </div>
            <div>
              <b>SẢN XUẤT</b>
            </div>
          </div>
        ),
      },
      position: { x: 450, y: 310 },
    },
    {
      id: "node-taolosanxuat",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>TẠO LÔ SẢN XUẤT</b>
            </div>
          </div>
        ),
      },
      position: { x: 700, y: 310 },
    },
    {
      id: "node-sanxuatbang",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>SẢN XUẤT BĂNG</b>
            </div>
            (Số kg1)
          </div>
        ),
      },
      position: { x: 450, y: 510 },
    },
    {
      id: "node-khobang",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>KHO BĂNG</b>
            </div>
            {/* <img src={databaseImg} height="50" /> */}
          </div>
        ),
      },
      position: { x: 800, y: 510 },
    },
    {
      id: "node-canbang",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>CÂN BĂNG</b>
            </div>
            <div>
              <img src={weighingImg} height="50" />
            </div>
            (Số kg2)
          </div>
        ),
      },
      position: { x: 630, y: 400 },
    },
    {
      id: "node-INTEM-BANG",
      data: {
        label: (
          <div className="text-center">
            <div>
              <b>IN TEM</b>
            </div>
            {/* <img src={barcodeImg} height="50" /> */}
          </div>
        ),
      },
      position: { x: 630, y: 600 },
    },
  ];

  const initialEdges = [
    {
      id: "edge-2",
      source: "node-kho-cuon",
      type: "smoothstep",
      target: "node-xuatban-noibo",
      label: "Xuất kho",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: "edge-3",
      source: "node-nhap-kho",
      type: "smoothstep",
      target: "node-canxe",
    },
    {
      id: "edge-node-canxe-kho-cuon",
      source: "node-canxe",
      type: "smoothstep",
      target: "node-kho-cuon",
    },
    {
      id: "edge-node-nhap-kho-loicuon-",
      source: "node-nhap-kho",
      type: "smoothstep",
      target: "node-loicuon",
    },
    {
      id: "edge-4",
      source: "node-nhap-kho",
      type: "smoothstep",
      target: "node-intem",
    },
    {
      id: "edge-5",
      source: "node-kho-cuon",
      type: "smoothstep",
      target: "node-suatcuonsanxuat",
      label: "Xuất kho",
    },
    {
      id: "edge-6",
      source: "node-suatcuonsanxuat",
      type: "smoothstep",
      target: "node-lapkehoachsanxuat",
    },
    {
      id: "edge-7",
      source: "node-suatcuonsanxuat",
      type: "smoothstep",
      target: "node-taolosanxuat",
    },
    {
      id: "edge-8",
      source: "node-lapkehoachsanxuat",
      type: "smoothstep",
      target: "node-dieuchinhkehoach",
    },
    {
      id: "edge-9",
      source: "node-dieuchinhkehoach",
      type: "smoothstep",
      target: "node-kho-cuon",
    },
    {
      id: "edge-10",
      source: "node-lapkehoachsanxuat",
      type: "smoothstep",
      target: "node-quatcancuon",
      label: "Sản xuất",
    },
    {
      id: "edge-11",
      source: "node-quatcancuon",
      type: "smoothstep",
      target: "node-sanxuatbang",
    },
    {
      id: "edge-12",
      source: "node-sanxuatbang",
      type: "smoothstep",
      target: "node-khobang",
      label: "Nhập kho",
    },
    {
      id: "edge-13",
      source: "node-sanxuatbang",
      type: "smoothstep",
      target: "node-canbang",
    },
    {
      id: "edge-14",
      source: "node-sanxuatbang",
      type: "smoothstep",
      target: "node-INTEM-BANG",
    },
  ];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      // setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges]
  );

  return (
    <div className="sodo-page">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={fitViewOptions}
      />
    </div>
  );
};
export default CateManufacturingPase;
