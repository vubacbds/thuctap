import {Link} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { UserOutlined, LockOutlined, PlusOutlined} from '@ant-design/icons';
import userService from "../../services/userService";
import {DataContext} from '../../utils/DataContext'
import { render } from "react-dom";
import { storage } from "../firebase";
import { Upload, Modal } from 'antd';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker,
  Radio,
  Alert
} from 'antd';

const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
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

const Regist = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState()
  //Xử lý dữ liệu user
  const reloadDataUser = useContext(DataContext).reloadDataUser
  const acc = {
    username: '',
    password: '',
    role: '',
    fullName: '',
    birthDate: '',
    phoneNumber: '',
    gender: '',
    fb: '',
    avatarUrl: ''
  }

  const [alertMessage, setAlertMessage] = useState(0)
  const [user, setUser] = useState(acc)

    function handleRegist() {
    //test call api login
    var data = {
      "username": user.username,
      "password": user.password,
      "role": user.role,
      "fullName": user.fullName,
      "birthDate": user.birthDate,
      "phoneNumber": user.phoneNumber,
      "gender": user.gender,
      "facebook": user.facebook,
      "avatarUrl": user.avatarUrl
    };

    userService.add(data)
    .then(function (response) {
      console.log(response.data);
      setAlertMessage(1)
      setError('')
      form.resetFields()
      // setTimeout(() => setAlertMessage(0),4000)
      reloadDataUser()
    })
    .catch(function (error) {
      setAlertMessage(2)
      if(error.response.data.password) {
      setError(error.response.data.password)
      }
      else if(error.response.data.username) {
        setError(error.response.data.username)
      }
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    });

  }
console.log(error)
  // function handleInput(e) {
  //   console.log(e)
  //   setUser( pre => {
  //     return { ...pre, [e.target.name]: e.target.value }}
  //   )
  // }
  // console.log(user)



  const onFinish = (values) => {
    handleUpload()
    console.log('Received values of form: ', values);
    const {username, role, phoneNumber, password, gender, fullName, facebook} = values
            const newd = {
              "username": username,
              "password": password,
              "role": role,
              "fullName": fullName,
              "phoneNumber": `0${phoneNumber}`,
              "gender": gender,
              "facebook": facebook
            }
            setUser(pre => {
              return {...pre, ...newd}
            })
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={"84"}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onchangeDatePicker = (date, stringData) => {
    setUser( pre => {
      return { ...pre, "birthDate": stringData}}
    )
  }

  // const onchangSelectRole = (value) => {
  //   setUser( pre => {
  //     return { ...pre, "role": value}}
  //   )
  // }
  // const onchangeInputPhone = (value) => {
  //   setUser( pre => {
  //     return { ...pre, "phoneNumber": value}}
  //   )
  // }

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
    const [fileList, setFileList] = useState([])
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

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    console.log(e)
    // setNameImage([e.file][0].name)
    setFileList(e.fileList)
    setImage(e.file.originFileObj);
    // if (e.file.originFileObj) {
    //   delete e.file.originFileObj.uid
    //   setImage(e.file.originFileObj);
    //   console.log(e.file.originFileObj)
    // }

  };

  const handleUpload = () => {
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(urlimg => {
            // setUrl(urlimg);
            setUser( pre => {
              return { ...pre, "avatarUrl": urlimg}}
            )
            console.log(urlimg)
          });
      }
    );
  };
  useEffect(() => {
    if(user.avatarUrl !== '') handleRegist()
  }, [user.avatarUrl])

  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  var today = new Date();
      var todayString = JSON.stringify((today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()).replace(/(^|\D)(\d)(?!\d)/g, '$10$2'))
  console.log(todayString);
  return (
    <>
    <Form
      {...formItemLayout}
      form={form}
      name="regist"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        // prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="role"
        label="Tôi là: "
        rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}
      >
        <Select name="role" >
          {/* <Option value="0">Admin</Option>  */}
          <Option value="1">Chủ trọ</Option>
          <Option value="2">Người thuê</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="username"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Vui lòng nhập Nickname!', whitespace: true }]}
      >
        <Input name="username" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!',
          },
        ]}
        hasFeedback
      >
        <Input.Password name="password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng xác nhận mật khẩu',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không đúng'));
            },
          }),
          {
            pattern: {strongRegex},
            message: "Mật khẩu không đủ mạnh !",
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="fullName"
        label="Họ và tên"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn', whitespace: true }]}
      >
        <Input name="fullName" />
      </Form.Item>

      <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng nhập giới tính của bạn', whitespace: true }]}>
        <Radio.Group name="gender" >
          <Radio value="1">Nam</Radio>
          <Radio value="0">Nữ</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="birthDate" label="Ngày sinh"
        rules={[{ type: 'object', required: true, message: 'Vui lòng chọn ngày sinh' }]}
      >
        <DatePicker onChange={onchangeDatePicker} format='YYYY-MM-DD'
          disabledDate={d => !d || d.isAfter({todayString}) || d.isSameOrBefore("1930-01-01") }
        />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại của bạn' },
        {
          pattern: /^[\d]{9,9}$/,
          message: "Số điện thoại phải 10 số !",
        },
        ]}
      >
        <InputNumber addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="facebook"
        label="Link facebook"
        tooltip="What do you want others to call you?"
        rules={[{ whitespace: true }]}
      >
        <Input name="facebook" />
      </Form.Item>
      {/* <Form.Item
        name="avatarUrl"
        label="Link ảnh"
        tooltip="What do you want others to call you?"
        rules={[{ whitespace: true, required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}
      >
        <Input name="avatarUrl" onChange={handleInput} />
      </Form.Item> */}

      <Form.Item
        name="avatarUrl"
        label="Chọn avatar"
        tooltip="What do you want others to call you?"
        rules={[{ whitespace: true, required: true, message: 'Vui lòng chọn ảnh' }]}
      >
        <div>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length == 1 ? null : (
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
          <br />
          <progress value={progress} max="100" />
          <br />
        </div>
      </Form.Item>


      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>

    { alertMessage == 0 ? null :
      (alertMessage == 1 ? <Alert message="Đăng ký thành công!" type="success" showIcon /> :
         <Alert message="Đăng ký thát bại!" type="error" showIcon />)
      }
      <p style={{fontSize: 12, color:'red'}}>{error ?? ''}</p>


    </>
  )

      }


export default Regist;
