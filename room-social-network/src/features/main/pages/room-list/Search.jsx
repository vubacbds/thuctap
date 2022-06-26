import { Form, Input, Button, Select, InputNumber, Row, Col } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../../../utils/DataContext'
import roomService from "../../../../services/roomService";

const { Option } = Select;



function Search({setTitle, idprovince, setTemp}) {
    const [form] = Form.useForm();
    const dataProvince = useContext(DataContext).dataProvince
    const dataDistrict = useContext(DataContext).dataDistrict
    const dataWard = useContext(DataContext).dataWard
    const dataRoom = useContext(DataContext).dataRoom
    const setDataRoomSearch = useContext(DataContext).setDataRoomSearch
    
    const [districtSearch, setDistrictSearch] = useState()
    const [wardSearch, setWardSearch] = useState()
    
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 80 }} defaultValue={"m"} >
            <Option value="m"><span style={{color:'#BCADB0'}}>m<sup>2</sup></span></Option>
          </Select>
        </Form.Item>
      );
    const prefixSelectorPrice = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 80 }} defaultValue={"vnd"} >
            <Option value="vnd"><span style={{color:'#BCADB0'}}>vnđ/tháng</span></Option>
          </Select>
        </Form.Item>
      );
    let prname
    switch (idprovince) {
        case '25':
            prname='Bình Định'
            break;
        case '1':
            prname='Hồ Chí Minh'
            break;
        case '10':
            prname='Bà Rịa - Vũng Tàu'
            break;
        case '7':
            prname='Hải Phòng'
            break;
        case '4':
            prname='Bình Dương'
            break;
        case '6':
            prname='Khánh Hòa'
            break;
        case '14':
            prname='Lâm Đồng'
            break;
        case '2':
            prname='Hà Nội'
            break;
        default:
            break;
    }
    
    const onFinish = (values) => {
        const {province, district, ward, price, capacity} = values
        const data = {
            "provinceId": province ?? null, 
            "districtId": district ?? null, 
            "wardId": ward ?? null, 
            "price": price ?? null, 
            "capacity": capacity ?? null,
        }
        setTitle("Kết quả tìm kiếm")
        setTemp(false)
        roomService.searchroom(data) 
        .then(function (response) {
            var x = []
            response.data.map((e) => {
                x.push(e.roomId) 
            })

            const data2 =  dataRoom.filter((e) => {
                return x.includes(e.roomId)
            })
            setDataRoomSearch(data2)
            console.log(data2)
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    //Thay đổi province/district
    const handleChangeProvince = (id) => {
        setDistrictSearch(dataDistrict.filter((e) => e.provinceId == id))
        
        form.resetFields(['district'])
        form.resetFields(['ward'])
        
    }
    const handleChangeDistrict = (id) => {
        setWardSearch(dataWard.filter((e) => e.districtId == id))
        form.resetFields(['ward'])
    }
    useEffect(() => {
        if(districtSearch) setWardSearch([])
    },[districtSearch])

    const reset= () => {
        form.resetFields()
        setDataRoomSearch(dataRoom)
        setTitle("Tất cả tin đăng")
        setTemp(false)
    }
    return dataProvince && (
        <div className="container-fluid">
            <Form
                form={form}
                name="roomadd"
                onFinish={onFinish}
                initialValues={{province: prname ?? null}}
                scrollToFirstError
                style={{marginTop: 20}}
                >
                <Row gutter={[16, 16]}>
                <Col span={2}>
                <Form.Item>
                    <Button type="primary" htmlType="submit"  >
                        Tìm kiếm
                    </Button>
                </Form.Item>
                </Col>
                <Col span={4}>
                <Form.Item
                    name="province"
                    // label="Tỉnh/TP: "
                    // rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/TP!' }]}
                >
                    <Select name="province" placeholder="Tỉnh/TP" onChange={handleChangeProvince}> 
                    {
                        dataProvince?.map((e) => <Option value={e.provinceId} >{e.provinceName}</Option>)
                    } 
                    </Select>
                </Form.Item>
                </Col>
                
                <Col span={4}>
                <Form.Item
                    name="district"
                    // label="Quận/Huyện: "
                >
                    <Select name="district" placeholder="Quận/Huyện" onChange={handleChangeDistrict}> 
                    {
                        districtSearch?.map((e) => <Option value={e.districtId} >{e.districtName}</Option>)
                    }
                    </Select>
                </Form.Item>
                </Col>

                <Col span={4}>
                <Form.Item
                    name="ward"
                    // label="Phường/Xã: "
                >
                    <Select name="ward" placeholder="Phường/Xã"> 
                    {
                        wardSearch?.map((e) => <Option value={e.wardId} >{e.wardName}</Option>)
                    }
                    </Select>
                </Form.Item>
                </Col>

                <Col span={4}>
                <Form.Item
                    name="capacity"
                    // label="Diện tích"
                >
                    <InputNumber addonBefore={prefixSelector} style={{ width: '100%' }} 
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      placeholder="Diện tích"
                    />
                </Form.Item>
                </Col>

                <Col span={4}>
                <Form.Item
                    name="price"
                    // label="Giá tiền"
                >
                    <InputNumber addonBefore={prefixSelectorPrice} style={{ width: '100%' }} 
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      placeholder="Giá tiền"
                    />
                </Form.Item>
                </Col>
                <Col span={2}>
            <Button type="primary" onClick={() => reset()}  >
                        Reset
            </Button>
            </Col>
                </Row>
            </Form> 
            
            <hr style={{border: 2, color: "#BCADB0"}} />
        </div>
    )
}
export default Search







