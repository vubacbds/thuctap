import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import userService from "../../services/userService";
import Regist from "../regist"

const Login = () => {
  const acc = {
    username: '',
    password: '' 
  }
  const [user, setUser] = useState(acc)
    function handleLogin() {
    //test call api login
    userService.authenticate({
      "username": user.username,
      "password": user.password
    }).then((res) => {
      if(res.accessToken){
        console.log("Token ", res.accessToken);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("id", res.userDetailDto.id);
        localStorage.setItem("role", res.userDetailDto.role);
        localStorage.setItem("avatarUrl", res.userDetailDto.avatarUrl);
        localStorage.setItem("fullName", res.userDetailDto.fullName);
        alert("Đăng nhập thành công !")
        setTimeout("location.reload(true)",1000)
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Đăng nhập thất bại !")
    });
  }

  function handleInput(e) {
    setUser( pre => {
      // console.log(e.target.name)
      return { ...pre, [e.target.name]: e.target.value }}  
    )
    
  }
  
  const onFinish = (values) => {
    handleLogin()
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };      
  
  const userLogined = localStorage.getItem("role")

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
      {userLogined == 0 ? <Navigate to="/admin-management/" /> : ((userLogined == 1 || userLogined == 2) ? <Navigate to="/" /> :
      (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input name="username" onChange={handleInput}/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password name="password" onChange={handleInput} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button> &nbsp;
            Or <Button type="text" onClick={showModal}><span style={{color: '#1890FF'}}>register now!</span></Button>
            <Modal title="Đăng ký" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Regist />
            </Modal>
          </Form.Item>
        </Form>
      ) )}
    </>
  )
}
 
export default Login;




// //_____Login________
// import { useState, useEffect, useRef } from 'react'
// import userService from "../../services/userService";
// import axios from 'axios'

// function Login() {
//   const acc = {
//     username: '',
//     password: ''
//   }
//   const [user, setUser] = useState(acc)

//   function handleInput(e) {
//     setUser( pre => {
//       return { ...pre, [e.target.name]: e.target.value }}  
//     )
//   }
//   const handleLogin = () => {
//     var axios = require('axios');
//     var data = JSON.stringify({
//       "username": user.username,
//       "password": user.password
//     });
    
//     var config = {
//       method: 'post',
//       url: '/user/login',
//       headers: { 
//         //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwODRhNWEzMi0yOGNmLTRhN2UtYmQyYi1mMzMyYzAwMDdiNTQiLCJpYXQiOjE2NTA0NTA4OTgsImV4cCI6MTY1MTA1NTY5OH0.tR8jz4gMu4QIEW_PpceAHUiFR-fLRgRBULThLpdthl-znnmVV2IiGiSwSrWF4bkKc4yEB-UvbXYYdJYBmtm_mQ', 
//         'Content-Type': 'application/json'
//       },
//       data : data
//     };
    
//     axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//       console.log(response.data.accessToken);
//       localStorage.setItem("accessToken", response.data.accessToken)
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }

//       const [data, setData] = useState()
//       const handleLoad = () => {
        
//                   var axios = require('axios');

//         var config = {
//           method: 'get',
//           url: '/user/all',
//           headers: { 
//             'Authorization': `Bearer ${localStorage.getItem("accessToken")}` 
//           }
//         };

//         axios(config)
//         .then(function (response) {
//           console.log(JSON.stringify(response.data));
//           console.log(response.data);
//           console.log(response.data[0].username);
//           setData(response.data)
// })
// .catch(function (error) {
//   console.log(error);
// });


        
//       }
//       console.log(data);
//   const handleLogout = () => {
//     localStorage.removeItem("accessToken")
//     alert("Đã đăng xuất")
//   }
//   return (
//     <>
//       <div>
//         <label>Username</label>
//         <input type="text" name='username' onChange={handleInput} />
//       </div>
//       <div>
//         <label>Password</label>
//         <input type="password" name='password' onChange={handleInput} />
//       </div>
//       <button type="button" onClick={handleLogin}>Login</button>
//       <br/><br/>
//       <div>

//         {/* {localStorage.getItem("accessToken") && data.map((a) => {
//           return <h3>ok {a.username} </h3>
//         })
//       } */}
//       {/* <img src={data[0].url_avatar} /> */}
//       <h3>okllll</h3>

//         <button type="button" onClick={handleLoad}>Load</button>
//         <button type="button" onClick={handleLogout}>Logout</button>
//       </div>
//     </>
//   )
// }
// export default Login;
