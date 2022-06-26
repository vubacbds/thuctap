import { Form, Input, Button, Select, InputNumber, Upload, Modal, Alert } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../../../utils/DataContext'
import { PlusOutlined} from '@ant-design/icons';
import { storage } from "../../../../components/firebase";
import roomService from "../../../../services/roomService";
import documentService from "../../../../services/documentService";

const { Option } = Select;


const formItemLayout = { 
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
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

function UpdateRoom({onFinish1, roomUpdateId, form}) {
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
    // const [form] = Form.useForm();
    const dataProvince = useContext(DataContext).dataProvince
    const dataDistrict = useContext(DataContext).dataDistrict
    const setDataDistrict = useContext(DataContext).setDataDistrict
    
    const dataWard = useContext(DataContext).dataWard
    
    //Xử lý upload 
        const [oldUrl, setoldUrl] = useState();
        const [progress, setProgress] = useState(0);
        const [alertMessage, setAlertMessage] = useState(0) 
        const [fileList, setFileList] = useState([])
        const [url, setUrl] = useState([]);
        const [previewVisible, setPreviewVisible] = useState(false)
        const [previewImage, setPreviewImage] = useState('')
        const [previewTitle, setPreviewTitle] = useState('')
        const handleCancel = () => setPreviewVisible(false);
        const handlePreview = async file => {
            if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
            }

            setPreviewImage(() => file.url || file.preview)
            setPreviewVisible(true)
            setPreviewTitle(() => file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
        };
        function getBase64(file) {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            });
        }
  
  
        const handleChange = e => {
            setFileList(e.fileList) 
            console.log(e.fileList)
        };

        const handleUpload = () => {
            fileList.forEach((e) => {
                const uploadTask = storage.ref(`images/${e.originFileObj.name}`).put(e.originFileObj);
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
                .child(e.originFileObj.name)
                .getDownloadURL()
                .then(urlimg => {               
                setAlertMessage(1)
                setTimeout(() => setAlertMessage(0),3000)
                    const newDocument = {
                        "parentId": roomUpdateId.roomId,
                        "parentType": 1,
                        "nameUrl": urlimg,
                        "typeUrl": 2
                    }
                    posdocument(newDocument)
                    setUrl(pre => [...pre, urlimg])
                })
                .catch((e) => {
                    console.log(e)
                    setAlertMessage(2)
                })
            }
            );
            })
        };


        const posdocument = (data) => {
            // console.log(data)
            documentService.adddocument(data)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error);
            });
          }

          const onFinish = (values) => {
            const {province, district, ward, street, price, capacity, desc} = values
            const newd = {
                "provinceId": province,
                "districtId": district,
                "wardId": ward, 
                "street": street ,
                "price": price, 
                "capacity": capacity,  
                "descriptionRoom": desc,
                "userId": localStorage.getItem("id"),
                "statusRoom": '0'
            }
            postroom(newd)
            handleUpload()
          };

          const deleteDocument = () => {
            documentService.getdocument()
            .then(function (response) {
                const documentSearch = response.filter((e) => e.parentId == roomUpdateId.roomId)
                documentSearch.forEach((e) => {
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

          const postroom = (data) => {
            roomService.updateroom(roomUpdateId.roomId,data)
            .then(function (response) {
                deleteDocument()
            })
            .catch(function (error) {
              console.log(error);
            });
          }

    return(
        <>
        {(roomUpdateId && fileList) &&
           <Form
         {...formItemLayout}
         form={form}
         name="roomadd"
         onFinish={onFinish}
         initialValues={{
            province: roomUpdateId.provinceId,
            district: roomUpdateId.districtId,
            ward: roomUpdateId.wardId,
            street: roomUpdateId.street,
            desc: roomUpdateId.descriptionRoom,
            capacity: roomUpdateId.capacity,
            price: roomUpdateId.price
         }}
         scrollToFirstError
         style={{marginTop: 20}}
         >
                <Form.Item
                    name="province"
                    label="Tỉnh/TP: "
                    rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/TP!' }]}
                >
                    <Select name="province" disabled> 
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
                    <Select name="district" disabled> 
                    {
                        dataDistrict.map((e) => <Option value={e.districtId} >{e.districtName}</Option>)
                    }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="ward"
                    label="Phường/Xã: "
                    rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã!' }]}
                >
                    <Select name="ward" disabled> 
                    {
                        dataWard.map((e) => <Option value={e.wardId} >{e.wardName}</Option>)
                    }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="street"
                    label="Số nhà/Tên đường: "
                    rules={[{ required: true, message: 'Vui lòng chọn Số nhà/Tên đường!' }]}
                >
                    <Input  />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="Mô tả: "
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
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
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá tiền"
                    rules={[{ required: true, message: 'Vui lòng nhập giá tiền phòng' }]}
                >
                    <InputNumber addonBefore={prefixSelectorPrice} style={{ width: '100%' }} 
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      // parser={value => value.replace(/\$\s?|(,*)/g, '')} 
                    />
                </Form.Item>

                <Form.Item     
                    name="avatarUrl"
                    label="Link ảnh"
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
                    {fileList.length > 4 ? null : (
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
                    <br />
                    <progress value={progress} max="100" />
                    <br />
                    
                    </div>
                </Form.Item>

                <Button type="primary" htmlType="submit"  >
                        Cập nhật
                    </Button>
              </Form> }
              { 
                alertMessage == 0 ? null : 
                (alertMessage == 1 ? <Alert message="Cập nhật thành công!" type="success" showIcon /> :
                  <Alert message="Cập nhật thất bại" type="error" showIcon />
                ) 
              }
        </>
    )
}
export default UpdateRoom







