import React from 'react'
import { Alert, Tabs } from 'antd';
import { Form, Input, Button, Modal } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { storage } from "../../../../components/firebase";
import { DataContext } from '../../../../utils/DataContext'
import roomService from "../../../../services/roomService";
import documentService from "../../../../services/documentService";
import Address from './Addresss';
import InfoRoom from './InfoRoom';
import ImageRoom from './ImageRoom';


function RoomAdd () {
    const { TabPane } = Tabs;
    const [newRoom, setNewRoom] = useState({})
    const [newDocument, setNewDocument] = useState({
      "parentType": '1',
      "typeUrl": '2'
    })
    const [activeKey, setActiveKey] = useState('1')
    const onKeyChange = (key) => { setActiveKey(pre => {return key>pre ? pre : key}) }
    const [alertMessage, setAlertMessage] = useState(0) 
    // const [form] = Form.useForm();

    const onFinish1 = (values) => {
            console.log('vua nhan')
            setActiveKey('2') 
            const {province, district, ward, street} = values
            const newd = {
                "provinceId": province,
                "districtId": district,
                "wardId": ward, 
                "street": street 
            }
            setNewRoom(pre => {return {...pre, ...newd}})
            
    };

    const onFinish2 = (values) => {
      console.log('Received values of form: ', values);
      const {price, capacity, desc} = values
      const newd = {
          "price": price, 
          "capacity": capacity,  
          "descriptionRoom": desc
      }
      setNewRoom(pre => {return {...pre, ...newd}})
            setActiveKey('3') 
  
    };

    const onFinish3 = (values) => {
      const newd = {
          "userId": localStorage.getItem("id"),
          "statusRoom": '0'
      }
      setNewRoom(pre => {return {...pre, ...newd}})
      postroom({...newRoom,...newd})
    };
    console.log(newRoom)
    
  const postroom = (data) => {
    roomService.addroom(data)
    .then(function (response) {
      console.log(response)
      console.log("????ng th??nh c??ng")
      // setAlertMessage(1)
      // form.resetFields()
      setNewDocument(pre => {return {...pre, "parentId": response.roomId} })
      // setTimeout(() => setAlertMessage(0),4000)
      
    })
    .catch(function (error) {
      console.log(error);
      // setAlertMessage(2)
    });
  }
  useEffect(()=> {
    if(newDocument.parentId) handleUpload()
  },[newDocument])

  const posdocument = (data) => {
    console.log(data)
    documentService.adddocument(data)
    .then(function (response) {
      console.log(response)
      setAlertMessage(1)
      // form.resetFields()
      setActiveKey('1') 
      setTimeout(() => setAlertMessage(0),3000)
      
    })
    .catch(function (error) {
      console.log(error);
      setAlertMessage(2)
    });
  }
  //X??? l?? upload ???nh
  const [progress, setProgress] = useState(0);
  const [fileList, setFileList] = useState([])
  const [url, setUrl] = useState([]);
  
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
            posdocument({...newDocument, "nameUrl": urlimg})
            setUrl(pre => [...pre, urlimg])
          })
          .catch((e) => {
              console.log(e)
          })
      }
    );
    })
  };
  console.log(url);
  return (
    <>
      <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={onKeyChange}>
        <TabPane tab="Ch???n ?????a ch???" key="1">
            <Address onFinish1={onFinish1} />
        </TabPane>
        <TabPane tab="Chi ti???t ph??ng tr???" key="2">
            <InfoRoom onFinish2={onFinish2} />
        </TabPane>
        <TabPane tab="T???i ???nh l??n" key="3">
            <ImageRoom 
              onFinish3={onFinish3} 
              handleChange={handleChange} 
              handleUpload={handleUpload}  
              fileList={fileList}
              progress={progress}
            />
        </TabPane>
      
                  {/* <Form.Item {...tailFormItemLayout}>
                    {
                      activeKey < 3 ? 
                      (
                        <Button type="primary" onClick={handleSetActive}  >
                          Ti???p theo
                        </Button>
                      ) :
                      <Button type="primary" htmlType="submit"  >
                          ????ng tin
                      </Button>
                    }
                      
                  </Form.Item> */}
      </Tabs>
      { alertMessage == 0 ? null : 
        (alertMessage == 1 ? <Alert message="????ng tin th??nh c??ng!" type="success" showIcon /> :
          <Alert message="????ng tin th???t b???i" type="error" showIcon />
        ) }
    </>
  )
}
export default RoomAdd

