import { Form, Input, Button, Select } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../../../utils/DataContext'

const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Address({onFinish1}) {

    const [form] = Form.useForm();
    const dataProvince = useContext(DataContext).dataProvince
    const dataDistrict = useContext(DataContext).dataDistrict
    const [district, setDistrict] = useState([])
    const dataWard = useContext(DataContext).dataWard
    const [ward, setWard] = useState([])

    const handleChangeProvince = (id) => {
        setDistrict(dataDistrict.filter((e) => e.provinceId == id))
        setWard([])
        form.resetFields(['district'])
        form.resetFields(['ward'])
    }
    const handleChangeDistrict = (id) => {
        setWard(dataWard.filter((e) => e.districtId == id))
        form.resetFields(['ward'])
    }
    const handleChangeWard = (id) => {

    }
    return(
        <>
           <Form
         {...formItemLayout}
         form={form}
         name="roomadd"
         onFinish={onFinish1}
         initialValues={{}}
         scrollToFirstError
         style={{marginTop: 20}}
         >
                <Form.Item
                    name="province"
                    label="Tỉnh/TP: "
                    rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/TP!' }]}
                >
                    <Select name="province" onChange={handleChangeProvince}>
                    {
                        dataProvince.map((e) => <Option value={e.provinceId} >{e.provinceName}</Option>)
                    }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="district"
                    label="Quận/Huyện: "
                    rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện!' }]}
                >
                    <Select name="district" onChange={handleChangeDistrict} >
                    {
                        district.map((e) => <Option value={e.districtId} >{e.districtName}</Option>)
                    }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="ward"
                    label="Phường/Xã: "
                    rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã!' }]}
                >
                    <Select name="ward" onChange={handleChangeWard} >
                    {
                        ward.map((e) => <Option value={e.wardId} >{e.wardName}</Option>)
                    }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="street"
                    label="Số nhà/Tên đường: "
                    rules={[
                        { required: true, message: 'Vui lòng chọn Số nhà/Tên đường!' },
                        {
                            min: 6,
                            max: 60,
                            message: "Số lượng ký tự >6, <60",
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit"  >
                        Tiếp theo
                    </Button>
              </Form>
        </>
    )
}
export default Address
