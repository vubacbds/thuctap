function Register() {
  console.log('ok')
  return (
    <h1>Hello</h1>
  )
}
export default Register

// import React, { Component, useState } from 'react';
// import { Upload, Modal } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { storage } from "../firebase";

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

// function Register() {
//     const [previewVisible, setPreviewVisible] = useState(false)
//     const [previewImage, setPreviewImage] = useState('')
//     const [previewTitle, setPreviewTitle] = useState('')
//     const [fileList, setFileList] = useState([])
//     const handleCancel = () => setPreviewVisible(false);
//     const handlePreview = async file => {
//         if (!file.url && !file.preview) {
//           file.preview = await getBase64(file.originFileObj);
//         }

//         setPreviewImage(() => file.url || file.preview)
//         setPreviewVisible(true)
//         setPreviewTitle(() => file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
//       };

//     const handleChange2 = ({ fileList, ...rest }) => {
//         console.log(rest)
//         setFileList(fileList) 
//     } 


//     //Xử lý upload ảnh
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState("");
//   const [progress, setProgress] = useState(0);

//   const handleChange = e => {
//     console.log(e)
//     setFileList([e.file]) 
//     if (e.file.originFileObj) {
//       delete e.file.originFileObj.uid
//       setImage(e.file.originFileObj);
//       console.log(e.file.originFileObj)
//     }
   
//   };

//   const handleUpload = () => {
//   const uploadTask = storage.ref(`images/${image.name}`).put(image);
//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(progress);
//       },
//       error => {
//         console.log(error);
//       },
//       () => {
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             setUrl(url);
//           });
//       }
//     );
//   };
//     return (
//      <>
//         <Upload
//           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={handlePreview}
//           onChange={handleChange}
//         >
//           {fileList.length == 1 ? null : (
//             <div>
//                 <PlusOutlined />
//                 <div style={{ marginTop: 8 }}>Upload</div>
//             </div>
//             )}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           title={previewTitle}
//           footer={null}
//           onCancel={handleCancel}
//         >
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//         <button onClick={handleUpload}>Upload</button>
//      </>
//     )
// }


// // class App extends React.Component {
// //   state = {
// //     previewVisible: false,
// //     previewImage: '',
// //     previewTitle: '',
// //     fileList: [
// //       {
// //         uid: '-1',
// //         name: 'image.png',
// //         status: 'done',
// //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
// //       },
      
// //     ],
// //   };

// //   handleCancel = () => this.setState({ previewVisible: false });

// //   handlePreview = async file => {
// //     if (!file.url && !file.preview) {
// //       file.preview = await getBase64(file.originFileObj);
// //     }

// //     this.setState({
// //       previewImage: file.url || file.preview,
// //       previewVisible: true,
// //       previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
// //     });
// //   };

// //   handleChange = ({ fileList }) => this.setState({ fileList });

// //   render() {
// //     const { previewVisible, previewImage, fileList, previewTitle } = this.state;
// //     const uploadButton = (
// //       <div>
// //         <PlusOutlined />
// //         <div style={{ marginTop: 8 }}>Upload</div>
// //       </div>
// //     );
// //     return (
// //       <>
// //         <Upload
// //           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
// //           listType="picture-card"
// //           fileList={fileList}
// //           onPreview={this.handlePreview}
// //           onChange={this.handleChange}
// //         >
// //           {fileList.length >= 8 ? null : uploadButton}
// //         </Upload>
// //         <Modal
// //           visible={previewVisible}
// //           title={previewTitle}
// //           footer={null}
// //           onCancel={this.handleCancel}
// //         >
// //           <img alt="example" style={{ width: '100%' }} src={previewImage} />
// //         </Modal>
// //       </>
// //     );
// //   }
// // }

// export default Register;





// // import './Register.scss'
// // import { Link } from 'react-router-dom';
// // import img1 from '../../assets/images/bg-hero.jpg'
// // import { Form, Input, Button, Checkbox } from 'antd';
// // const image = { url: '../../assets/' }
// // const Register = () => {
// //     return ( 
// //         <>
// //     <div id="feature" className="block featureBlock bgGray">
// //         <div className="container_register">
// //         <div id="login" className="login-1">
// //             <div class="container" style={{ background: { img1 } }} >
// //                 <div id="login-row" className="row justify-content-center align-items-center" >
// //                     <div id="login-column" class="col-md-12">
// //                         <div id="login-box" class="col-md-12">
// //                             <form id="login-form" class="form" action="" method="post">
// //                                 <h3 class="text-dn">Đăng ký tài khoản</h3>
// //                                 <hr></hr>
// //                                 <div class="form-group">
// //                                     <label for="username" class="text-label">Tôi là:</label>
// //                                     <select class="form-control">
// //                                          <option value="0">Chủ trọ</option>
// //                                          <option value="1">Khách hàng</option>
// //                                     </select>
// //                                     <br />
// //                                     <label class="toila">Tên đăng nhập</label>
// //                                      <input class="form-control" type="text" name="email" id="email" required></input>
// //                                      <br></br>
// //                                      <label class ="toila" for="psw">Mật khẩu</label>
// //                                      <input class="form-control" type="password" name="psw" id="psw" required></input>
// //                                      <br></br>
// //                                      <label class="toila" for="psw-repeat">Xác thực mật khẩu</label>
// //                                     <input class="form-control" type="password" name="psw-repeat" id="psw-repeat" required></input>
// //                                     <br></br>
// //                                     <label class="toila">Họ và tên</label>
// //                                    <input  class="form-control" type="text" placeholder="Họ và tên" name="email" id="email" required></input>
// //                                     <br></br>
// //                                     <fieldset class="form-control">
// //                                  <label class="toila">Giới tính</label>
// //                                  <div class="sex">
// //                                      <input type="radio" name="sex" id="sex-m" value="m"></input>
// //                                      <label for="sex-m">Male</label>
// //                                      <input class="marnam" type="radio" name="sex" id="sex-f" value="f"></input>
// //                                      <label for="sex-f">Female</label>
// //                                  </div>
// //                              </fieldset>
// //                              <br></br>
// //                              <label >Ngày sinh</label>
// //                              <input class="form-control" type="date"></input>
// //                              <br></br>
// //                              <label class="toila">Số điện thoại</label>
// //                              <input class="form-control" type="text" placeholder="Enter sđt" name="email" id="email" required></input>
// //                              <br></br>
// //                              <label class="toila">Gmail</label>
// //                              <input class="form-control" type="text" placeholder="Enter gmail" name="email" id="email" required></input>
// //                              <hr></hr>
// //                              <p class="accept"><input type="checkbox"></input> Tôi chấp nhận điều kiện và các chính sách riêng tư.</p>
// //                               <div class="flex-btn"><button type="submit" class="registerbtn">Đăng ký</button></div>
                                    
// //                                 </div>
                                
                               
// //                             </form>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //         </div>
// //         </div>
// //     </>
// //     )
// // }
 
// // export default Register;