import { Row, Col, Divider } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import '../../index.scss';
import { useContext } from 'react';
import {DataContext} from '../../../../utils/DataContext'

function Home() { 
    const dataRoom = useContext(DataContext).dataRoom
    const dataSourceUser = useContext(DataContext).dataSourceUser
    return (
        <>
            <Row style={{height: 200, fontSize: 24, color: '#fff'}}>
                <Col span={12} style={{background: '#e20a0a', padding: 20, borderRight: '#69e1ff 3px solid'}}>
                    <BarChartOutlined /> &nbsp;
                    <span>Có 1,688 tin đăng mới trong 24h qua</span>
                </Col>
                <Col span={12} style={{background: '#428f04', padding: 20}}>
                    <BarChartOutlined /> &nbsp;
                    <span>Có 192 người dùng tạo mới trong 24 qua</span>
                </Col>
            </Row>
            <Row style={{height: 200, fontSize: 24, color: '#fff'}}>
                <Col span={12} style={{background: '#94037c', padding: 20, borderRight: '#69e1ff 3px solid', borderTop: '#69e1ff 3px solid'}}>
                    <BarChartOutlined /> &nbsp;
                    <span>Có tổng {dataRoom.length} tin đăng</span>
                </Col>
                <Col span={12} style={{background: '#777769', padding: 20, borderTop: '#69e1ff 3px solid'}}>
                    <BarChartOutlined /> &nbsp;
                    <span>Có tổng {dataSourceUser.length} người dùng</span>
                </Col>
            </Row>
        </>
    )
}

export default Home