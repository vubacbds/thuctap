import { Typography, Carousel, Col, Checkbox, Button, Row, Popover, Table, Popconfirm, Input, Space, Modal, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { useEffect, useState, useContext } from 'react';
import { DeleteOutlined, SearchOutlined, FormOutlined } from '@ant-design/icons';
import {DataContext} from '../../../../utils/DataContext'
import roomService from "../../../../services/roomService";
import RoomAdd from "../room-add"
import UpdateRoom from './UpdateRoom';
import { BiMap } from "react-icons/bi";

function RoomUser({dataRoom, setDataRoom, notUpdate}) {
    const [form] = Form.useForm();
    const [roomUpdateId, setRoomUpdateId] = useState()

    const del = (idvao) => {
        //Xóa trên giao diện
        try {
          const newData = [...dataRoom];
          const index = newData.findIndex((item) => idvao === item.roomId);
          if (index > -1) {
            newData.splice(index, 1);
            setDataRoom(newData);
          } 
        }
          catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }

        //Xóa trong CSDL
        roomService.deleteroom(idvao)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            // setDataSourceUserID(response)
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    //Xử lý tìm kiếm (mở)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0])
                setSearchedColumn(dataIndex)
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        // if (visible) {
        //   setTimeout(() => this.searchInput.select(), 100);
        // }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };
  
    const handleReset = clearFilters => {
      clearFilters();
      setSearchText('')
    };
    //Xử lý tìm kiếm (đóng)

    const contentStyle = {
        height: '160px',
        color: 'black',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const columns = [
            {
              title: 'Mô tả',
              render: (record) => `${record.descriptionRoom?.slice(0, 30)}...`
            },
            {
              title: 'Địa chỉ',
              render: (record) => record.provinceEntity?.provinceName,
            },
            Table.EXPAND_COLUMN,
            {
              title: 'Diện tích',
              key: 'capacity',
              render: (record) => `${record.capacity} m2`
            },
            {
              title: 'Giá',
              dataIndex: 'price',
              key: 'price',
              sorter: (a, b) => a.price - b.price,
              sortDirections: ['descend','ascend'],
              ...getColumnSearchProps('price')
            },
            {
              title: 'Người đăng',
              render: (record) => record.userEntity?.username
            },
         {
            title: 'Ảnh',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <Popover 
                        content={
                            <Carousel autoplay autoplaySpeed={1000} style={{width: 200, height: 200}} >
                                
                                {record.documentEntities && record.documentEntities.map((e) => {
                                    return(
                                      <div>
                                        <img src={e?.nameUrl } style={{width: '100%', height: 200, contentStyle}} />
                                      </div>
                                    )
                                })}
                            </Carousel>
                        } 
                        title="Ảnh phòng trọ" 
                        trigger="click"
                    >
                        <Typography.Link>
                            <img src='https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg' width={50} height={40}/>
                        </Typography.Link>
                    </Popover>
                    
                )     
            }  
        },
        {
            title: 'Xử lý',
            dataIndex: 'operation',
            render: (_, record) => {
              return (    
                <>
                    {notUpdate!=1 && <Typography.Link onClick={() => showModalAddRoom(record.roomId)}><FormOutlined /></Typography.Link>} &ensp;
                    <Popconfirm  title="Bạn chắc chắn xóa?" onConfirm={() => del(record.roomId)} >
                        <Typography.Link><DeleteOutlined /></Typography.Link>
                    </Popconfirm> 
                </>
              )    
            }
        }
    ];

    const [pageSize, setPageSize] = useState(10)
    //Modal đăng tin
    const [visibleAddRoom, setVisibleAddRoom] = useState(false);
    const showDrawerAddRoom = () => {  
        setVisibleAddRoom(true);
    };
    const onCloseAddRoom = () => {
        
        setVisibleAddRoom(false);
    };
    const [isModalVisibleAddRoom, setIsModalVisibleAddRoom] = useState(false);
    const showModalAddRoom = (roomId) => {
        roomService.getroomid(roomId) 
        .then(function (response) {
          setRoomUpdateId(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        // setRoomUpdateId(roomId)
        setIsModalVisibleAddRoom(true)
    };
    
    const handleOkAddRoom = () => {
        setIsModalVisibleAddRoom(false);
    };
    const handleCancelAddRoom = () => {
      form.resetFields()
      setRoomUpdateId()
        setIsModalVisibleAddRoom(false);
    };
    return (
        <>
            <Modal title="Cập nhật phòng trọ" visible={isModalVisibleAddRoom} onOk={handleOkAddRoom} onCancel={handleCancelAddRoom} footer={null}>
                <UpdateRoom roomUpdateId={roomUpdateId} form={form} />
            </Modal>
            <Row>
                    <Col span={6} >
                        {/* <h4 style={{ fontWeight: 'inherit', fontStyle: 'italic' }}>Có {dataRoom.length} tin đã đăng</h4> */}
                    </Col>
                    <Col span={14}></Col>
                    <Col span={4}></Col>
            </Row>
            <Table
                pagination={{
                    onChange: (page, pageSize) => {
                        setPageSize(pageSize)
                    },
                    pageSizeOptions: [10,20,40,100],
                    showSizeChanger: true
                }}
                rowKey={record => record.roomId}
                columns={columns}
                expandable={{
                expandedRowRender: record => {
                  return(
                    <>
                      <p style={{ margin: 0 }}>{record.descriptionRoom}</p><br/>
                      <p style={{fontSize: 12}}><BiMap /> {`${record.street} - ${record.wardId.wardName} - ${record.districtId.districtName} - ${record.provinceEntity?.provinceName}`}</p>
                    </>
                  )                
                },
                }}
                dataSource={dataRoom}
                style={{ marginTop: 9 }}
            />
        </>
    )
}
export default RoomUser