
import { useParams } from 'react-router-dom';
import userService from "../../../../services/userService";

import {Link} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { UserOutlined, LockOutlined, PlusOutlined, IdcardFilled} from '@ant-design/icons';
import {DataContext} from '../../../../utils/DataContext'
import { render } from "react-dom";
import { storage } from "../../../../components/firebase";
import { Upload, Modal } from 'antd';
import moment from "moment";
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

function Profile() {
    const [form] = Form.useForm();
    const dataSourceUserID = useContext(DataContext).dataSourceUserID
    const setDataSourceUserID = useContext(DataContext).setDataSourceUserID
    const {id} = useParams();

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [alertMessage, setAlertMessage] = useState(0)

    // const [userInfo, setUserInfo] = useState()
    // console.log(dataSourceUserID)

    // useEffect(() => {
    //   form.setFieldsValue({
    //     username: dataSourceUserID.username,
    //     fullName: dataSourceUserID.fullName,
    //     role: dataSourceUserID.role,
    //     gender: dataSourceUserID.gender,
    //     phoneNumber: dataSourceUserID.phoneNumber,
    //     facebook: dataSourceUserID.facebook
    //  });
    // },[])
    //Xử lý dữ liệu user

  // const reloadDataUser = useContext(DataContext).reloadDataUser
  // const acc = {
  //   username: '',
  //   password: '',
  //   role: '',
  //   fullName: '',
  //   birthDate: '',
  //   phoneNumber: '',
  //   gender: '',
  //   fb: '',
  //   avatarUrl: ''
  // }

  // const [alertMessage, setAlertMessage] = useState(0)
  // const [user, setUser] = useState(acc)
  //   function handleRegist() {
  //   //test call api login
  //   var data = {
  //     "username": user.username,
  //     "password": user.password,
  //     "role": user.role,
  //     "fullName": user.fullName,
  //     "birthDate": user.birthDate,
  //     "phoneNumber": user.phoneNumber,
  //     "gender": user.gender,
  //     "fb": user.fb,
  //     "avatarUrl": user.avatarUrl
  //   };

  //   userService.add(data)
  //   .then(function (response) {
  //     console.log(response.data);
  //     setAlertMessage(1)
  //     reloadDataUser()
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     setAlertMessage(2)
  //   });

  // }
  function handleUpdate(newd) {
    var data = {
          "id": dataSourceUserID.id,
          "username": dataSourceUserID.username,
          "password": dataSourceUserID.password,
          "role": dataSourceUserID.role,
          "fullName": dataSourceUserID.fullName,
          "birthDate": dataSourceUserID.birthDate,
          "phoneNumber": dataSourceUserID.phoneNumber,
          "gender": dataSourceUserID.gender,
          "facebook": dataSourceUserID.facebook,
          "avatarUrl": dataSourceUserID.avatarUrl,
          "birthDate": moment(dataSourceUserID.birthDate),
          ...newd
        };

      userService.update(dataSourceUserID.id, data)
    .then(function (response) {
      // console.log(response.data);
      setAlertMessage(1)
      setTimeout(() => setAlertMessage(0),4000)
    })
    .catch(function (error) {
      console.log(error);
      setAlertMessage(2)
    });
  }

  // function handleInput(e) {
  //   console.log(e.target.value)
  //   setDataSourceUserID( pre => {
  //     return { ...pre, [e.target.name]: e.target.value }}
  //   )
  // }




  const onFinish = (values) => {
    const {username, role, phoneNumber, password, gender, fullName, facebook} = values
            const newd = {
              "username": username,
              "password": password,
              "role": role,
              "fullName": fullName,
              "phoneNumber": phoneNumber,
              "gender": gender,
              "facebook": facebook
            }
    if(image == null)
    handleUpdate(newd)
    else
    handleUpload()
    // console.log('Received values of form: ', values);

  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={"84"} >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onchangeDatePicker = (date, stringData) => {
    setDataSourceUserID( pre => {
      return { ...pre, "birthDate": stringData}}
    )
  }
  // const onchangSelectRole = (value) => {
  //   setDataSourceUserID( pre => {
  //     return { ...pre, "role": value}}
  //   )
  // }
  // const onchangeInputPhone = (value) => {
  //   setDataSourceUserID( pre => {
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
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'avartar.jpg',
            status: 'done',
            url: dataSourceUserID.avatarUrl,
          }
    ])

    // const [nameImage, setNameImage] = useState()
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(() => file.url || file.preview)
        // console.log(file.url)
        setPreviewVisible(true)
        setPreviewTitle(() => file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
      };



  const handleChange = e => {
    // storage.ref(`images/${localStorage.getItem("username")}`).delete() //Xóa ảnh trong firebase
    // console.log(e)
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
          .child(image.name) //Thay vì tên ảnh 'image.name', đặt bằng username cho dễ xóa
          .getDownloadURL()
          .then(urlimg => {
            // setUrl(urlimg);
            setDataSourceUserID( pre => {
              return { ...pre, "avatarUrl": urlimg}}
            )

            localStorage.setItem("avatarUrl", urlimg)
            console.log(urlimg)
          });
      }
    );
  };
  useEffect(() => {
    if(image != null)
    handleUpdate(null)
  }, [dataSourceUserID.avatarUrl])


  const dateFormat = "YYYY-MM-DD";
    return(

                    <>
                    <h2 style={{marginTop: 90, textAlign: 'center'}}>Cập nhật thông tin</h2>
                    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        username: dataSourceUserID.username,
        fullName: dataSourceUserID.fullName,
        role: dataSourceUserID.role,
        gender: dataSourceUserID.gender,
        phoneNumber: dataSourceUserID.phoneNumber,
        facebook: dataSourceUserID.facebook,
        birthDate: moment(dataSourceUserID.birthDate, dateFormat),
        avatarUrl: dataSourceUserID.avatarUrl
      }}
      scrollToFirstError
      style={{marginTop: 20}}
    >
        <Row>
        <Col span={12}>
      <Form.Item
        name="avatarUrl"
        label="Chọn avatar"
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
        >
          {fileList.length == 1 ? null : (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8}}>Upload</div>
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
      </Col>
        <Col span={12}>
      <Form.Item
        name="role"
        label="Tôi là: "
        rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}
      >
        <Select name="role" >
          {/* <Option value="0" >Admin</Option> */}
          <Option value="1">Chủ trọ</Option>
          <Option value="2" >Người thuê</Option>
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
        name="fullName"
        label="Họ và tên"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn', whitespace: true }]}
      >
        <Input name="fullName" />
      </Form.Item>

      <Form.Item name="gender" label="Giới tính" >
        <Radio.Group name="gender" >
          <Radio value={1}>Nam</Radio>
          <Radio value={0}>Nữ</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="birthDate" label="Ngày sinh"
      rules={[{ type: 'object', required: true, message: 'Vui lòng chọn ngày sinh' }]}
      >
        <DatePicker onChange={onchangeDatePicker}
          // defaultValue={moment(dataSourceUserID.birthDate, dateFormat)}
          format={dateFormat}
         />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}
      >
        <InputNumber addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="facebook"
        label="Link facebook"
        tooltip="What do you want others to call you?"
        // rules={[{ whitespace: true }]}
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
      </Form.Item> */}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" >
          Cập nhật
        </Button>
      </Form.Item>
      </Col>
      </Row>
    </Form>
    { alertMessage == 0 ? null :
      (alertMessage == 1 ? <Alert message="Cập nhật thành công!" type="success" showIcon /> :
         <Alert message="Cập nhật thất bại" type="error" showIcon />
      ) }
    </>
    )
}
export default Profile