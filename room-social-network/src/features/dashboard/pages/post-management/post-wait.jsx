import { Space, Typography, Carousel, Col, Checkbox, Button, Row, Popover, Table, Popconfirm, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import Search from 'antd/lib/transfer/search';
import { useEffect, useState, useContext } from 'react';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { DataContext } from '../../../../utils/DataContext';
import roomService from "../../../../services/roomService";
import { BiMap } from "react-icons/bi";
import "../../index.scss";


function PostWait() {
    const dataRoomWait = useContext(DataContext).dataRoomWait
    const setDataRoomWait = useContext(DataContext).setDataRoomWait
    const setDataRoomPosted = useContext(DataContext).setDataRoomPosted
    // const dataRoom = useContext(DataContext).dataRoom
    // const setDataSource = useContext(DataContext).setDataSource
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
            if(pageSize == selectedRowKeys.length)
                setIsCheckedAll({all: true, part: false, amount: selectedRowKeys.length})
            else if(selectedRowKeys.length > 0 && selectedRowKeys.length < pageSize) setIsCheckedAll({all: false, part: true, amount: selectedRowKeys.length})
            else setIsCheckedAll({all: false, part: false, amount: selectedRowKeys.length})
        },
        getCheckboxProps: record => {
            return {
                disabled: record.working != null,
                name: record.name
            };
        }
    };
    const contentStyle = {
        height: '160px',
        color: 'black',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
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
    const columns = [
        {
          title: 'Mô tả',
          // dataIndex: 'descriptionRoom',
          // key: 'descriptionRoom',
          // sorter: (a, b) => a.id - b.id,
          // sortDirections: ['descend'],
          // ...getColumnSearchProps('id')
          render: (record) => `${record.descriptionRoom?.slice(0, 30)}...`
        },
        {
          title: 'Địa chỉ',
          // dataIndex: 'price',
          // key: 'price',
          // ...getColumnSearchProps('price')
          render: (record) => record.provinceEntity?.provinceName,
        },
        Table.EXPAND_COLUMN,
        {
          title: 'Diện tích',
          // dataIndex: 'capacity',
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
                            {/* <div>
                                    <img src={record.documentEntities && record.documentEntities[0]?.nameUrl } style={{width: '100%', height: 200, contentStyle}}  />
                            </div>
                            <div>
                                    <img src={"https://noithattrevietnam.com/uploaded/Kien-thuc-nha-dep/hinh-anh-nha-2-tang-mai-thai/1-hinh-anh-nha-2-tang-mai-thai.jpg"} style={{width: '100%', height: 200, contentStyle}}/>
                            </div> */}
                            {/* <div>
                                <img src={record.img3} style={{width: '100%', height: 200, contentStyle}}/>
                            </div>
                            <div>
                                <img src={record.img4} style={{width: '100%', height: 200, contentStyle}}/>
                            </div> */}
                        </Carousel>
                    }
                    title="Ảnh phòng trọ"
                    trigger="click"
                >
                    <Typography.Link>
                        <img className='imgavartar' src={record.userEntity.avatarUrl} width={50} height={40}/>
                    </Typography.Link>
                </Popover>

            )
        }
    },
    Table.SELECTION_COLUMN
    ];

    const [pageSize, setPageSize] = useState(10)
    const [isCheckedAll, setIsCheckedAll] = useState({all: false, part: false, amount: 0})

    const del = () => {
      const newData = [...dataRoomWait];
      selectedRowKeys.forEach( id => {
        const index = newData.findIndex((item) => id === item.roomId);
        newData.splice(index, 1);

        //Xóa trong CSDL
        // roomService.deleteroom(id)
        //   .then(function (response) {
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })
        // Get room trong CSDL
        roomService.getroomid(id)
          .then(function (response) {
              // console.log(response)
              const roomUpdate = {...response, "statusRoom": 2}
              // Update trong CSDL
              roomService.updateroom(id, roomUpdate)
              .then(function (response) {
              })
              .catch(function (error) {
                console.log(error);
              })
          })
          .catch(function (error) {
            console.log(error);
          })
      })
      setDataRoomWait(newData)
    }
    const checkOk = () => {
      const newData = [...dataRoomWait];

      selectedRowKeys.forEach( id => {
        const index = newData.findIndex((item) => id === item.roomId);
        const tin = {...newData[index], "statusRoom": 1 };
        newData.splice(index, 1);
        setDataRoomPosted(pre => [...pre,tin])

        // Get room trong CSDL
        roomService.getroomid(id)
          .then(function (response) {
              // console.log(response)
              const roomUpdate = {...response, "statusRoom": 1}
              // Update trong CSDL
              roomService.updateroom(id, roomUpdate)
              .then(function (response) {
              })
              .catch(function (error) {
                console.log(error);
              })
          })
          .catch(function (error) {
            console.log(error);
          })

      })
      setDataRoomWait(newData)

    }
    return (
        <>
            <Row>
                    <Col span={6} >
                        <h4 style={{ fontWeight: 'inherit', fontStyle: 'italic' }}>Có {dataRoomWait.length} tin đang chờ duyệt</h4>
                    </Col>

                    <Col span={12}></Col>

                    <Col span={6} >
                        <div>
                            <Popconfirm title="Bạn chắc chắn duyệt?" onConfirm={() => checkOk()} >
                              <Button type="primary" style={{ background: "green", borderColor: "green"}}>Duyệt</Button>
                            </Popconfirm>
                            <Popconfirm title="Bạn chắc chắn xóa?" onConfirm={() => del()} >
                              <Button type="primary" danger style={{ marginLeft: 5, width: 68 }}>Xóa</Button>
                            </Popconfirm> &nbsp;
                            <Checkbox checked={isCheckedAll.all} indeterminate={isCheckedAll.part} disabled />
                            <span style={{width: 40}}>{` Đã chọn: ${isCheckedAll.amount} `}</span>
                        </div>
                    </Col>
            </Row>
            <Row>
              <Col span={24} >
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
                    rowSelection={rowSelection}
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
                    dataSource={dataRoomWait}
                    style={{ marginTop: 6 }}
                    // loading={loading}
                />
              </Col>
            </Row>
        </>
    )
}
export default PostWait
