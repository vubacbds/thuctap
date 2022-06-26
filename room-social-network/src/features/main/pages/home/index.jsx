import React, { useEffect, useState, useContext } from 'react';
import RoomsInfo from "../rooms-info"
import AppCarousel from "../carousel"
import image1 from '../../../../assets/images/modern-design.jpg';
import image2 from '../../../../assets/images/clean-design.jpg';
import image3 from '../../../../assets/images/great-support.jpg';
import image4 from '../../../../assets/images/easy-customise.jpg';
import image5 from '../../../../assets/images/unlimited-features.jpg';
import image6 from '../../../../assets/images/advanced-option.jpg';
import RoomProvince from '../room-province';
import {DataContext} from '../../../../utils/DataContext'

const items = [
  {
    key: '1',
    title: 'Clean and Elegant',
    image: image1,
    diachi:"Quy Nhon"
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
  },
  {
    key: '4',
    title: 'Easy to customise',
    image: image4
  },
  {
    key: '5',
    title: 'Unlimited Features',
    image: image5
  },
  {
    key: '6',
    title: 'Advanced Options',
    image: image6
  }
];


const images = [
  {
    key: 1,
    image: 'https://sncdn.com/imagecache/db/id/11587/6783564a.jpg',
    title: 'Phòng trọ nhanh cho sinh viên',
    desc: 'Chúng tôi tự tin sẽ mang cho bạn 1 cảm giác tuyệt vời'
  },
  {
    key: 2,
    image: 'https://images.trvl-media.com/hotels/1000000/10000/5400/5363/d44a63cd_z.jpg',
    title: 'Rất vui được phục vụ bạn', 
    desc: 'Chúng tôi tự tin sẽ mang cho bạn 1 cảm giác tuyệt vời'
  },
  {
    key: 3,
    image: 'https://content.r9cdn.net/himg/f5/94/af/leonardo-178075906-Hyatt-Ziva-Los-Cabos-Club-Ocean-View-Master-Double_O-343218.jpg',
    title: 'Chúc ngày mới tốt lành',
    desc: 'Chúng tôi tự tin sẽ mang cho bạn 1 cảm giác tuyệt vời'
  }
]

function Home() {
  const dataRoom = useContext(DataContext).dataRoom
  const dataRoomOk = dataRoom.filter((e) => {
    return e.statusRoom == 1
  })
  const dataRoomID = useContext(DataContext).dataRoomID
  return (
    <div id="feature" className="block featureBlock bgGray">
      <AppCarousel data={images} />
      <RoomsInfo title="Tin mới đăng" desc="Thông tin các phòng trọ mới đăng" data={dataRoomOk} itemsAmount={6}/>
      <RoomsInfo title="Tin nổi bật trong ngày" desc="Thông tin các phòng trọ nổi bật trong ngày" data={dataRoomOk} itemsAmount={3} />
      <RoomProvince title="Khám phá phòng trọ ở các thành phố lớn" desc="Tìm kiếm phòng trọ trong thành phố lớn và các tỉnh thành liên quan" data ={items}/>
    </div>
  );
}

export default Home;