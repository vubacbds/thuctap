import { Typography, Carousel, Col, Checkbox, Button, Row, Popover, Table, Popconfirm, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { useEffect, useState, useContext } from 'react';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import {DataContext} from '../../../../utils/DataContext'
import roomService from "../../../../services/roomService";
import documentService from "../../../../services/documentService";
import { BiMap } from "react-icons/bi";
import "../../index.scss";

function Post() {
    const dataRoomPosted = useContext(DataContext).dataRoomPosted

    // const dataRoom = useContext(DataContext).dataRoom
    const setDataRoomPosted = useContext(DataContext).setDataRoomPosted
    // const setDataSource = useContext(DataContext).setDataSource
    // console.log(dataRoomPosted)
    const del = (idvao) => {
        //Xóa trên giao diện
        try {
          const newData = [...dataRoomPosted];
          const index = newData.findIndex((item) => idvao === item.roomId);
          if (index > -1) {
            newData.splice(index, 1);
            setDataRoomPosted(newData);
          }
        }
          catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }

        //Xóa room trong CSDL
        roomService.deleteroom(idvao)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            // setDataSourceUserID(response)
          })
          .catch(function (error) {
            console.log(error);
          })

        //Xóa document trong CSDL
        deleteDocument(idvao)
      }
    //Xóa document trong CSDL
    const deleteDocument = (idvao) => {
      documentService.getdocumentIdParent(idvao)
      .then(function (response) {
          // const documentSearch = response.filter((e) => e.parentId == idvao)
          response.data.forEach((e) => {
            documentService.deletedocument(e.documentId)
              .then(function (response) {
              })
              .catch(function (error) {
                  console.log(error);
              });
          })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    useEffect(() => {
      documentService.getdocument()
              .then(function (response) {
                console.log(response.length)
              })
              .catch(function (error) {
                  console.log(error);
              });
    },[])
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
              // dataIndex: 'descriptionRoom',
              // key: 'descriptionRoom',
              // sorter: (a, b) => a.id - b.id,
              // sortDirections: ['descend'],
              // ...getColumnSearchProps('id')
              render: (record) => `${record.descriptionRoom?.slice(0, 30)}...`
            },
            {
              title: 'Địa chỉ',
              // dataIndex: 'provinceId',
              // key: 'provinceId',
              render: (record) => record.provinceEntity?.provinceName,
              // ..getColumnSearchProps('provinceId')
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
        {
            title: 'Xử lý',
            dataIndex: 'operation',
            render: (_, record) => {
              return (
                <Popconfirm  title="Bạn chắc chắn xóa?" onConfirm={() => del(record.roomId)} >
                    <a><DeleteOutlined /></a>
                </Popconfirm>
              )
            }
        }
    ];

    const [pageSize, setPageSize] = useState(10)
    const [isCheckedAll, setIsCheckedAll] = useState({all: false, part: false, amount: 0})
    return (
        <>
            <Row>
                    <Col span={6} >
                        <h4 style={{ fontWeight: 'inherit', fontStyle: 'italic' }}>Có {dataRoomPosted.length} tin đã đăng</h4>
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
                dataSource={dataRoomPosted}
                style={{ marginTop: 9 }}
                // loading={loading}
            />
        </>
    )
}
export default Post