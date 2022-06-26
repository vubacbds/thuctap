import React, { useEffect, useState, useContext } from 'react';
import RoomsInfo from "../rooms-info"
import AppCarousel from "../carousel"
import RoomProvince from '../room-province';
import {DataContext} from '../../../../utils/DataContext'
import { useParams } from "react-router-dom";
import AllRoom from './AllRoom';
import Search from './Search'

function RoomList() {
  const [temp, setTemp] = useState(true)
  const {id} = useParams()
  let dataRoomSearch = useContext(DataContext).dataRoomSearch
  dataRoomSearch = dataRoomSearch.filter((e) => {
    return e.statusRoom == 1
  })
  const [title, setTitle] = useState("Tất cả tin đăng")
  if(id && temp) {
      dataRoomSearch = dataRoomSearch.filter((e) => {
            return e.provinceId == id
         })
    }
 
  return  (
    <div id="feature" className="block featureBlock bgGray" style={{marginTop: 3}}>
      {/* <AppCarousel data={images} /> */}
      <Search setTitle={setTitle} idprovince={id} setTemp={setTemp} />
      <AllRoom title={title} desc={`Có ${dataRoomSearch.length} phòng trọ`} data={dataRoomSearch} />
    </div>
  );
}

export default RoomList;