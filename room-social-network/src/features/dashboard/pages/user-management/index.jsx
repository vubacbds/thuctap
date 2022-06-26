import React, { useState, useEffect, useContext } from 'react';
// import '../../index.scss';
import { Table, Input, InputNumber, Popconfirm, Form,
        Typography, Space, Row, Col, Button, Popover, Radio, Modal } from 'antd';
import { AudioOutlined, SearchOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import userService from "../../../../services/userService";
import Regist from "../../../../components/regist"
import {DataContext} from '../../../../utils/DataContext'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserManagement = () => {
  const dataSource = useContext(DataContext).dataSourceUser
  const setDataSource = useContext(DataContext).setDataSourceUser
  const reloadDataUser = useContext(DataContext).reloadDataUser
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [userInfo, setUserInfo] = useState();
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      userId: '',
      IdleDeadline: '',
      title: '',
      ...record,
    });
    setEditingKey(record.id);
  };
 console.log(dataSource)
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (idvao) => {
    try {

      const row = await form.validateFields();
      console.log(row)
      const newData = [...dataSource];
      const index = newData.findIndex((item) => idvao === item.id);

      if (index > -1) {
        //Sửa trên giao diện
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey('');

        //Sửa trên CSDL
        userService.getid(idvao)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            setUserInfo({response, row, idvao})
          })
          .catch(function (error) {
            console.log(error);
          })
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  useEffect(() => {
    if(userInfo != null){
      const userInfoID = {...userInfo.response, ...userInfo.row}
          console.log(userInfoID)
          userService.update(userInfo.idvao, userInfoID)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
  },[userInfo])

  const del = (idvao) => {
    userService.delete(idvao)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Đã xóa")
      reloadDataUser()
    })
    .catch(function (error) {
      console.log(error);
    });

    // console.log(idvao)
    // try {                              //Cũng là reload
    //   const newData = [...dataSource];
    //   const index = newData.findIndex((item) => idvao === item.id);
    //   if (index > -1) {
    //     newData.splice(index, 1);
    //     setDataSource(newData);
    //   }
    // }
    //   catch (errInfo) {
    //   console.log('Validate Failed:', errInfo);
    // }
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

    const columns = [
        // {
        //   title: 'ID',
        //   dataIndex: 'id',
        //   key: 'id',
        //   editable: false,
        //   sorter: (a, b) => a.id - b.id,
        //   sortDirections: ['descend']
        // },
        {
          title: 'Họ và tên',
          dataIndex: 'fullName',
          key: 'fullName',
          editable: true,
          ...getColumnSearchProps('fullName')
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          editable: false,
          ...getColumnSearchProps('username')
        },
        {
          title: 'Giới tính',
          dataIndex: 'gender',
          key: 'gender',
          editable: true,
          render: (_, record) => {
            return <p>{record.gender==1?'Nam':'Nữ'}</p>
            },
          filters: [
            {
            text: 'Nam',
            value: '1',
            },
            {
            text: 'Nữ',
            value: '0',
            },
            ],
            onFilter: (value, record) => record.gender == value,
            filterSearch: false
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'birthDate',
          key: 'birthDate',
          editable: true
        },
        {
          title: 'Liên hệ',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
          editable: true,
          ...getColumnSearchProps('phoneNumber')
        },
        Table.EXPAND_COLUMN,
        {
          title: 'Quyền',
          dataIndex: 'role',
          key: 'role',
          editable: true,
          // render: (_, record) => {
          //   return <p>{record.quyen==1?'Chủ trọ':'Thường'}</p>
          //   },
          render: (_, record) => {
            return <p>{record.role=='0'?'Admin':(record.role=='1' ? 'Chủ trọ' : 'Người thuê')}</p>
            },
            onFilter: (value, record) => record.quyen == value,
            filterSearch: false
        },
        {
            title: 'Ảnh',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <Popover
                        content={
                            <div>
                                <img src={record.avatarUrl} style={{width: 200, height: 200}}  />
                            </div>
                        }
                        title="Avartar"
                        trigger="click"
                    >
                        <Typography.Link>
                            <img className='imgavartar' src={record.avatarUrl} width={46} height={46}/>
                        </Typography.Link>
                    </Popover>

                )
            },
        },
        {
            title: 'Xử lý',
            dataIndex: 'operation',
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link
                    onClick={() => save(record.id)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    Lưu
                  </Typography.Link>
                  <Popconfirm title="Bạn chắc chắn hủy?" onConfirm={cancel}>
                    <a>Hủy</a>
                  </Popconfirm>
                </span>
              ) : (
                <>
                  <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <FormOutlined />
                  </Typography.Link>
                  &ensp;
                  <Popconfirm disabled={editingKey !== ''} title="Bạn chắc chắn xóa?" onConfirm={() => del(record.id)} >
                    <a><DeleteOutlined /></a>
                  </Popconfirm>
                </>
              );
            },
        }
      ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: (col.dataIndex === 'phoneNumber' || col.dataIndex === 'gender') ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const { Search } = Input;

  //Modal đăng ký
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
  return (
    <>
      <Row>
          <Col span={6} >
            <h1>Quản lý người dùng</h1>
            <h4 style={{ fontWeight: 'inherit', fontStyle: 'italic' }}>Có tổng {dataSource.length} người dùng</h4>
          </Col>
          <Col span={12}></Col>
          <Col span={6} >
              <Button type="primary" onClick={showModal}>
                Thêm người dùng mới
              </Button>
              <Modal title="Đăng ký" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Regist />
              </Modal>
          </Col>
      </Row>

      <Row>
        <Col span={24}>
        <Form form={form} component={false} >
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
            // loading={loading}
            pagination={{
              onChange: cancel,
              pageSizeOptions: [10,20,40,100],
              showSizeChanger: true
            }}
            rowKey={record => record.id}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>Link FB|| <a href={record.facebook}>{record.facebook}</a></p>,
                }}
          />
        </Form>
        </Col>
      </Row>
    </>
  );
};

export default UserManagement