import { Form, Input, Button, Select, InputNumber } from 'antd';



const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 24,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }} defaultValue={"m"} >
        <Option value="m">m<sup>2</sup></Option>
      </Select>
    </Form.Item>
  );
const prefixSelectorPrice = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }} defaultValue={"vnd"} >
        <Option value="vnd">vnđ/tháng</Option>
      </Select>
    </Form.Item>
  );

function InfoRoom({onFinish2}) {
    const [form] = Form.useForm();
    return(
        <>
            <Form
         {...formItemLayout}
         form={form}
         name="roomadd"
         onFinish={onFinish2}
         initialValues={{}}
         scrollToFirstError
         style={{marginTop: 20}}
      >
                <Form.Item
                    name="desc"
                    label="Mô tả: "
                    rules={[
                      { required: true, message: 'Vui lòng nhập mô tả!' },
                       {
                      min: 10,
                      max: 100,
                      message: "Số lượng ký tự >10, <100",
                       }
                    ]}
                >
                    <Input.TextArea rows={5} cols={100} />
                </Form.Item>

                <Form.Item
                    name="capacity"
                    label="Diện tích"
                    rules={[{ required: true, message: 'Vui lòng nhập diện tích phòng' }]}
                >
                    <InputNumber addonBefore={prefixSelector} style={{ width: '100%' }}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      min={0}
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá tiền"
                    rules={[{ required: true, message: 'Vui lòng nhập giá tiền phòng' }]}
                >
                    <InputNumber addonBefore={prefixSelectorPrice} style={{ width: '100%' }}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      min={0}
                      // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit"  >
                        Tiếp theo
                    </Button>
         </Form>
        </>
    )
}
export default InfoRoom