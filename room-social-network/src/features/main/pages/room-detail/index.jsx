import React, { useEffect, useState, useContext } from 'react';
import RoomsInfo from '../rooms-info';
import DetailsInfoRoom from './details-info-room';
import Comment from './comment-review';
import AppCarousel from '../carousel';
import { useParams } from "react-router-dom";
import {DataContext} from '../../../../utils/DataContext'
import image1 from '../../../../assets/images/modern-design.jpg';
import image2 from '../../../../assets/images/clean-design.jpg';
import image3 from '../../../../assets/images/great-support.jpg';
import roomService from "../../../../services/roomService";
import "../../index.scss";
import { Button, Row, Col } from 'antd';
import { BiMap, BiDollar, BiStar, BiTrip } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { FiFacebook} from "react-icons/fi";
import { AiOutlinePhone} from "react-icons/ai";

const items = [
  {
    key: '1',
    title: 'Modern Design',
    image: image1
  },
  {
    key: '2',
    title: 'Clean and Elegant',
    image: image2
  },
  {
    key: '3',
    title: 'Great Support',
    image: image3
  }
];
const roomDetail = {
  id: 'facd0009as9fffff-feidws456',
  title: 'Easy to customise',
  detail: '',
  images: [
    'https://sncdn.com/imagecache/db/id/11587/6783564a.jpg',
    'https://images.trvl-media.com/hotels/1000000/10000/5400/5363/d44a63cd_z.jpg',
    'https://content.r9cdn.net/himg/f5/94/af/leonardo-178075906-Hyatt-Ziva-Los-Cabos-Club-Ocean-View-Master-Double_O-343218.jpg'
  ]
};

function RoomDetail() {
  const {id} = useParams()
  // const dataRoomID = useContext(DataContext).dataRoomID
  const getDataRoomInfoID = useContext(DataContext).getDataRoomInfoID
  const dataDistrict = useContext(DataContext).dataDistrict
  const dataWard = useContext(DataContext).dataWard
  const [dataRoomID, setDataRoomID] = useState()



  useEffect(() => {
    if(dataWard){
        roomService.getroominfoid(id)
        .then(function (response) {

            const getward = dataWard.find((w) => {
              return w.wardId == response.wardId
            })
            response.wardId = { "wardName": getward?.wardName, "wardPrefix": getward?.wardPrefix}

            const getdistrict = dataDistrict.find((d) => {
              return d.districtId == response.districtId
            })
            response.districtId = { "districtName": getdistrict?.districtName, "districtPrefix": getdistrict?.districtPrefix}

          response.price = response.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })

          setDataRoomID(response)
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  },[dataWard])

  var dataCarousel
    if(dataRoomID) {
      dataCarousel = dataRoomID.documentEntities?.map(item =>{

        return {image: item.nameUrl, key: Math.random()};
      });
    }
  const styleImg = {
    width: 700,
    height: 500,
    textAlign: 'center',
    marginLeft: 120
  }
  return (dataCarousel && dataRoomID) && (
    <div id="feature" className="block featureBlock bgGray" style={{marginTop: 20}}>
      <div className="container-fluid">
        {/* <div className="titleHolder">
          <h2>{dataRoomID.descriptionRoom}</h2>
        </div> */}
        <AppCarousel data={dataCarousel} styleImg={styleImg} />
        <div>
          {/* <h4 className="titleHolder marginTop">Thông tin chi tiết phòng trọ</h4>
          <DetailsInfoRoom /> */}
          <Row>
            <Col span={12}>
          <div className='box' >
            <div className='titleHolder'><b>Chi tiết phòng trọ</b></div>
            <div style={{marginLeft: 50, height: 180}}>
            <div> {dataRoomID.descriptionRoom} </div>
            <div style={{marginTop: 5}}><BiTrip /> Diện tích: {dataRoomID.capacity} m<sup>2</sup></div>
            <div><BiStar /> Đánh giá: ⭐️⭐️⭐️</div>
            <div>
              <BiMap /> {`${dataRoomID.wardId?.wardPrefix} ${dataRoomID.wardId?.wardName}, ${dataRoomID.districtId?.districtPrefix}, ${dataRoomID.districtId?.districtName}, ${dataRoomID.provinceEntity?.provinceName}`}
            </div>
            <Button type="primary" style={{ background: "#8D0972", borderColor: "#8D0972", marginTop: 5,  marginBottom: 20}}>{dataRoomID.price}/tháng</Button>
            </div>
          </div>
          </Col>

          <Col span={12}>
          <div className='box'>
            <div className='titleHolder'><b>Thông tin chủ trọ</b></div>
            <div style={{marginLeft: 50, height: 180}}>
            <img className='imgavartar' src={dataRoomID.userEntity.avatarUrl} width={46} height={46}/>
            <span> {dataRoomID.userEntity.fullName} </span>
            <div style={{marginTop: 5}}><AiOutlinePhone /> {dataRoomID.userEntity.phoneNumber}</div>
            <div style={{marginTop: 5}}><CgMail /> {dataRoomID.userEntity.username}</div>
            <div><FiFacebook /><a href={dataRoomID.userEntity.facebook}> {dataRoomID.userEntity.facebook}</a></div>

            </div>
          </div>
          </Col>
          </Row>



          {/* <div className='marginTop' style={{marginTop: 100}}>
            <RoomsInfo title='Phòng tương thích' data={items} />
          </div> */}

          <h4 style={{marginTop: 100}}>Bình luận</h4>
          <Comment dataComment={dataRoomID.evaluationEntities} roomid={id} />
        </div>
      </div>
    </div>
  );
}
export default RoomDetail
