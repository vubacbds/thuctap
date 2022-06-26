import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Button, Pagination } from 'antd';
import { Card } from 'antd';
import { BiMap, BiDollar, BiStar, BiTrip } from "react-icons/bi";

const { Meta } = Card;
function AllRoom(props) {
    var items = props.data;
  //Phân trang
    const objPage = {
        totalPage: items?.length,
        current: 1,
        minIndex: 0,
        maxIndex: 12,
        size: 12
    }
    const [pages, setPages] = useState(objPage)
    //Xử lý khi chọn trang
    const handleChange = (page, size) => {
        setPages({
        ...pages,
        current: page,
        minIndex: (page - 1) * size,
        maxIndex: page * size,
        size: size
        });
    };

    console.log(items)
  const roomsInfo = items.map((item, index) => {
    return (index >= pages.minIndex && index < pages.maxIndex) && (
      <Col span={8} key={index} >
        <Link to={`/room-social-network/detail/${item.roomId}`} >
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
  return items && (
    <div className="container-fluid">
      <div className="titleHolder">
        <h2>{props.title}</h2>
        {props.desc ? <p>{props.desc}</p> : <></>}
      </div>
      <Row gutter={[16, 16]} >
        {roomsInfo}
      </Row>
      
      <hr style={{border: 2, color: "#BCADB0"}} />
      <Pagination
                pageSize={pages.size}
                current={pages.current}
                total={items?.length}
                onChange={handleChange}
                style={{ bottom: "0px", textAlign: 'center', marginTop: 50 }}
                showSizeChanger={true}
                pageSizeOptions={[12,24,48]}
                // onShowSizeChange={handleShowSizeChange}
        />
    </div>
  );
}

export default AllRoom;
