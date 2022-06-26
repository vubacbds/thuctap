import { Form, Input, Button, Select, Upload, Modal } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { PlusOutlined} from '@ant-design/icons';


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
function ImageRoom({onFinish3, handleChange, handleUpload, fileList, progress}) {
    const [form] = Form.useForm();

    //Xử lý upload ảnh
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    // const [nameImage, setNameImage] = useState()
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(() => file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(() => file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
      };






    return (
        <>
            <Form
       {...formItemLayout}
       form={form}
       name="roomadd"
       onFinish={onFinish3}
       initialValues={{}}
       scrollToFirstError
       style={{marginTop: 20}}
      >
                <Form.Item
                    name="avatarUrl"
                    label="Hình Ảnh"
                    tooltip="What do you want others to call you?"
                    rules={[{ whitespace: true, required: true, message: 'Vui lòng chọn ảnh' }]}
                >
                    <div>
                    {/* <Input name="avatarUrl" value={nameImage}  /> */}

                    <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    multiple={true}
                    >
                    {fileList.length >= 4 ? null : (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                        )}
                    </Upload>
                    <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                    >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    {/* <button onClick={handleUpload}>Upload</button> */}
                    <br />
                    <progress value={progress} max="100" />
                    <br />

                    </div>
                </Form.Item>
                <Button type="primary" htmlType="submit"  >
                        Đăng tin
                    </Button>
                </Form>
        </>
    )
}
export default ImageRoom