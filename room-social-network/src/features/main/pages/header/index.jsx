import React, { useState } from 'react';

import { Link as Lik} from 'react-router-dom';
import { Anchor, Drawer, Button, Modal, Popover, Typography } from 'antd';
import { BiChevronDown } from "react-icons/bi";
import { PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai";
import Login from "../../../../components/login"
import RoomAdd from "../room-add"
import "../../index.scss";

const { Link } = Anchor;

function MainLayout() {
  //Modal đăng nhập
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //Modal đăng tin
  const [visibleAddRoom, setVisibleAddRoom] = useState(false);
  const showDrawerAddRoom = () => {
    setVisibleAddRoom(true);
  };
  const onCloseAddRoom = () => {
    setVisibleAddRoom(false);
  };
  const [isModalVisibleAddRoom, setIsModalVisibleAddRoom] = useState(false);
  const showModalAddRoom = () => {
    setIsModalVisibleAddRoom(true)
  };
  const handleOkAddRoom = () => {
    setIsModalVisibleAddRoom(false);
  };
  const handleCancelAddRoom = () => {
    setIsModalVisibleAddRoom(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("id")
    localStorage.removeItem("role")
    localStorage.removeItem("avatarUrl")
    localStorage.removeItem("fullName")
    setTimeout("location.reload(true)",1000)
  }
  
  const role = localStorage.getItem("role")
  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <a href="/">Room Social Network</a>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="/" title="Trang chủ" />
            <Link href="/room-social-network/room-list" title="Phòng trọ" />
            <Link href="/about" title="Giới thiệu" />
            <Link href="/works" title="Liên hệ" />
          </Anchor>
        </div>

        <Modal title="Đăng nhập" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Login />
        </Modal>
        <Modal title="Đăng tin" visible={isModalVisibleAddRoom} onOk={handleOkAddRoom} onCancel={handleCancelAddRoom} footer={null}>
            <RoomAdd />
        </Modal>
        {
          role==null ? 
          <Popover content={<span>Bạn cần đăng nhập để đăng tin</span>} title="Thông báo" trigger="click">
          <Button type="primary" style={{ background: "green", borderColor: "green"}}> + Đăng tin</Button>
          </Popover> :
          (
          role==2 ? 
          <Popover content={<span>Bạn cần có quyền chủ trọ để đăng tin</span>} title="Thông báo" trigger="click">
              <Button type="primary" style={{ background: "green", borderColor: "green"}}> + Đăng tin</Button>
          </Popover> :   
          <Button onClick={showModalAddRoom} type="primary" style={{ background: "green", borderColor: "green"}}> + Đăng tin</Button>
          )
        }
        {localStorage.getItem("accessToken") ? 
          (
            
              <Popover
                          content={
                              <>
                                {localStorage.getItem("role")!=2 && <><Button><Lik to='room-management/'>Quản lý tin đăng</Lik></Button> <br /></>}
                                <Button><Lik to={`profile/${localStorage.getItem("id")}`} >Hồ sơ cá nhân </Lik></Button>
                                <br />                               
                                <Button type='button' onClick={() => logout()}>Đăng xuất</Button>
                              </>
                          } 
                          title="Profile" 
                          trigger="click"
                          placement="bottom"
                      >
                          <Typography.Link>
                              <img className='imgavartar' src={localStorage.getItem("avatarUrl")} width={46} height={46}/>
                          </Typography.Link>
              </Popover>
          ) : <Button type='primary' onClick={showModal}>Đăng nhập <BiChevronDown /></Button>
        }
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="/" title="Home" />
              <Link href="/about" title="About" />
              <Link href="/detail" title="Features" />
              <Link href="/works" title="How it works" />
              <Link href="/faq" title="FAQ" />
              <Link href="/pricing" title="Pricing" />
              <Link href="/contact" title="Contact" />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;