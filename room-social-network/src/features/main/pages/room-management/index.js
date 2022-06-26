import React from 'react'
import { Alert, Avatar, Badge, Tabs } from 'antd';
import { Form, Input, Button, Modal } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
// import { storage } from "../../../../components/firebase";
import { DataContext } from '../../../../utils/DataContext'
// import roomService from "../../../../services/roomService";
// import RoomPosted from './RoomPosted';
// import RoomWaiting from './RoomWaiting';
// import RoomFail from './RoomFail';
import RoomUser from './RoomUser';

function RoomManagement () {
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState('1')
    const onKeyChange = (key) => setActiveKey(key) 
    const [alertMessage, setAlertMessage] = useState(0) 

    //Data room chờ duyệt
    const dataRoomWait = useContext(DataContext).dataRoomWait
    const dataRoomWaitID = dataRoomWait.filter((e) => e.userId == localStorage.getItem("id"))
    const setDataRoomWait = useContext(DataContext).setDataRoomWait

    //Data room đã đăng
    const dataRoomPosted = useContext(DataContext).dataRoomPosted
    const dataRoomPostedID = dataRoomPosted.filter((e) => e.userId == localStorage.getItem("id"))
    const setDataRoomPosted = useContext(DataContext).setDataRoomPosted

    //Data room bị từ chối
    const dataRoomFail = useContext(DataContext).dataRoomFail
    const dataRoomFailID = dataRoomFail.filter((e) => e.userId == localStorage.getItem("id"))
    const setDataRoomFail = useContext(DataContext).setDataRoomFail
    
  return (
    <>
      {/* <Badge count={dataRoomPostedID.length}>
          <Avatar shape="square" icon={<BellOutlined />} style={{background: '#0f4d92', fontSize: 24}}/>
      </Badge> */}
      <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={onKeyChange} style={{marginTop: 100, marginLeft: 50, marginRight: 50}}>
        <TabPane tab={`Tin đã đăng (${dataRoomPostedID.length})`} key="1">
            <RoomUser dataRoom={dataRoomPostedID} setDataRoom={setDataRoomPosted} notUpdate={1} />
        </TabPane>
        <TabPane tab={`Tin chờ duyệt (${dataRoomWaitID.length})`} key="2">
            <RoomUser dataRoom={dataRoomWaitID} setDataRoom={setDataRoomWait} />
        </TabPane>
        <TabPane tab={`Tin vi phạm (${dataRoomFailID.length})`} key="3">
            <RoomUser dataRoom={dataRoomFailID} setDataRoom={setDataRoomFail} />
        </TabPane>
      </Tabs>
    </>
  )
}
export default RoomManagement

