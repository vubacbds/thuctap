import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Button } from 'antd';
import { Card } from 'antd';
import { BiMap, BiDollar, BiStar, BiTrip } from "react-icons/bi";

const { Meta } = Card;
function RoomsInfo(props) {

  var items = props.data;
  var a = props?.itemsAmount
  const roomsInfo = items.map((item, index) => {
    return index < a && (
      <Col sm={8} key={index} xs={24} md={8} lg={8}>
        <Link to={`detail/${item.roomId}`} >
          <Card
            hoverable
            cover={<img alt="Ảnh phòng trọ" height={250} src={(item.documentEntities && item.documentEntities !== []) ? item.documentEntities[0]?.nameUrl : "https://noithattrevietnam.com/uploaded/Kien-thuc-nha-dep/hinh-anh-nha-2-tang-mai-thai/1-hinh-anh-nha-2-tang-mai-thai.jpg"} />}
            style={{height: 420}}
          >
            <Meta title={item.descriptionRoom} />
            <div style={{marginTop: 5}}><BiTrip /> Diện tích: {item.capacity} m<sup>2</sup></div>
            <div><BiStar /> Đánh giá: ⭐️⭐️⭐️</div>
            <div>
              <BiMap /> {`${item.wardId?.wardName}, ${item.districtId?.districtName}, ${item.provinceEntity?.provinceName}`}
              {/* <BiMap /> {`${item.wardId?.wardPrefix} ${item.wardId?.wardName}, ${item.districtId?.districtPrefix} ${item.districtId?.districtName}, ${item.provinceEntity?.provinceName}`}</div> */}
            </div>
            <Button type="primary" style={{ background: "#8D0972", borderColor: "#8D0972", marginTop: 5}}>{item.price}/tháng</Button>
          </Card>
        </Link>
      </Col>
    )
  });
  return (
    <div className="container-fluid">
      <div className="titleHolder">
        <h2>{props.title}</h2>
        {props.desc ? <p>{props.desc}</p> : <></>}
      </div>
      <Row gutter={[16, 16]} >
        {roomsInfo}
      </Row>
      {a==6 &&
        <Row>
          <Col span={24} style={{textAlign: 'center', marginTop: 50}}>
            <Link to="room-list"><Button type="primary" >------ Xem tất cả ------</Button></Link>
          </Col>
        </Row>
      }
      <hr style={{border: 2, color: "#BCADB0"}} />
    </div>
  );
}

export default RoomsInfo;