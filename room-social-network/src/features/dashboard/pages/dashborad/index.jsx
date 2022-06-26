import { Layout, Menu, Breadcrumb, Avatar, Badge, Popover, Spin } from 'antd';
import { GitlabFilled, FileDoneOutlined, NotificationOutlined, BellOutlined, 
        MailOutlined, UsergroupAddOutlined, LaptopOutlined } from '@ant-design/icons';
import React, { Suspense } from "react";
import { Routes, Route, Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
import '../../index.scss';
import {DataContext} from '../../../../utils/DataContext'
import PrivateOutlet from '../private-outlet'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function AdminPage() {
  const dataRoomWait = useContext(DataContext).dataRoomWait
  const {id} = useParams();
  const [crumb, setCrumb] = useState({})
  const navigate = useNavigate()

  return(
   
    <Layout>
          <Header className="site-layout-background" style={{ padding: 0, background: '#0f4d92', color:'#fff', textAlign: 'right', display: 'flex'}}>
               <div className="logo" >TM</div>
               <div style={{float: 'left', marginRight: 15}}>
                  <span className="avatar-item">
                    <Popover content={<span>Tính năng đang được phát triển...</span>} title="Tin nhắn" trigger="click">
                      <Badge count={'!'}>
                          <a><Avatar shape="square" icon={<MailOutlined />} style={{background: '#0f4d92', fontSize: 24}}/></a>
                      </Badge>
                    </Popover>
                  </span>
                  &ensp; &nbsp;
                  <span className="avatar-item">
                    <Popover content={<Link to="post-management">Có {dataRoomWait.length} tin đăng mới đang chờ duyệt</Link>} title="Thông báo" trigger="click">
                      <Badge count={dataRoomWait.length}>
                          <a><Avatar shape="square" icon={<BellOutlined />} style={{background: '#0f4d92', fontSize: 24}}/></a>
                      </Badge>
                    </Popover>
                  </span>
               </div>
         </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<GitlabFilled />}><Link to="dashboard" onClick={() => setCrumb({})}>ADMIN</Link></Menu.Item>
            <Menu.Item key="2" icon={<UsergroupAddOutlined />}><Link to="user-management" 
              onClick={() => 
                setCrumb({
                  cha: 'Quản lý người dùng'
                })
              }
            >Quản lý người dùng</Link></Menu.Item>
             
            <Menu.Item key="3"icon={<FileDoneOutlined />}><Link to="post-management" 
                onClick={() => {
                  setCrumb({
                    cha: 'Quản lý tin đăng'
                  })
                }
                }
              >Quản lý tin đăng</Link>
            </Menu.Item>
              
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Khác">
              <Menu.Item key="4"><Link to="interface">Giao diện</Link></Menu.Item>
              <Menu.Item key="5"><Link to="key-words">Từ khóa hot</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>{crumb.cha && crumb.cha}</Breadcrumb.Item>
            <Breadcrumb.Item>{crumb.con && crumb.con}</Breadcrumb.Item> 
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            
              <PrivateOutlet /> 

          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AdminPage