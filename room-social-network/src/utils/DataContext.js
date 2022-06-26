import { useState, useEffect, createContext } from 'react'
import { Rate } from 'antd';
import userService from "../services/userService";
import addressService from "../services/addressService";
import roomService from "../services/roomService";

export const DataContext = createContext()
// const dataPost = [
//     {
//       id: 1,
//       tieude: 'Phòng trọ vip',
//       diachi: 'Quy Nhơn, Bình Định',
//       gia: 600,
//       donvi: 'nghìn vnđ/tháng',
//       mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//       nguoidang: 'bacvu',
//       img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//       img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//       img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//       img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//       trangthai: 0,
//       danhgia:<Rate defaultValue={3}/>,
//       dientich:'20m2'
//     },
//     {
//       id: 2,
//       tieude: 'Phòng trọ mini',
//       diachi: 'BMT, Đắk Lắk',
//       gia: 500,
//       donvi: 'nghìn vnđ/tháng',
//       mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//       nguoidang: 'thonguyen',
//       img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//       img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//       img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//       img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//       trangthai: 1
//     },
//     {
//       id: 3,
//       tieude: 'Phòng trọ BMT',
//       diachi: 'BMT, Đắk Lắk',
//       gia: 600,
//       donvi: 'nghìn vnđ/tháng',
//       mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//       nguoidang: 'diepdang',
//       img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//       img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//       img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//       img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//       trangthai: 1
//     },
//     {
//       id: 4,
//       tieude: 'Phòng trọ giá tốt',
//       diachi: 'Q12, Hồ Chí Minh',
//       gia: 800,
//       donvi: 'nghìn vnđ/tháng',
//       mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//       nguoidang: 'anhthu',
//       img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//       img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//       img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//       img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//       trangthai: 0
//     },
//     {
//         id: 5,
//         tieude: 'Phòng trọ vip',
//         diachi: 'Quy Nhơn, Bình Định',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'bacvu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 6,
//         tieude: 'Phòng trọ mini',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 500,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'thonguyen',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 7,
//         tieude: 'Phòng trọ BMT',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'diepdang',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 8,
//         tieude: 'Phòng trọ giá tốt',
//         diachi: 'Q12, Hồ Chí Minh',
//         gia: 800,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'anhthu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 9,
//         tieude: 'Phòng trọ vip',
//         diachi: 'Quy Nhơn, Bình Định',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'bacvu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 10,
//         tieude: 'Phòng trọ mini',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 500,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'thonguyen',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 11,
//         tieude: 'Phòng trọ BMT',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'diepdang',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 12,
//         tieude: 'Phòng trọ giá tốt',
//         diachi: 'Q12, Hồ Chí Minh',
//         gia: 800,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'anhthu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 13,
//         tieude: 'Phòng trọ vip',
//         diachi: 'Quy Nhơn, Bình Định',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'bacvu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 14,
//         tieude: 'Phòng trọ mini',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 500,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'thonguyen',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 15,
//         tieude: 'Phòng trọ BMT',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'diepdang',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 16,
//         tieude: 'Phòng trọ giá tốt',
//         diachi: 'Q12, Hồ Chí Minh',
//         gia: 800,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'anhthu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 17,
//         tieude: 'Phòng trọ vip',
//         diachi: 'Quy Nhơn, Bình Định',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'bacvu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 18,
//         tieude: 'Phòng trọ mini',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 500,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'thonguyen',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 19,
//         tieude: 'Phòng trọ BMT',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'diepdang',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 20,
//         tieude: 'Phòng trọ giá tốt',
//         diachi: 'Q12, Hồ Chí Minh',
//         gia: 800,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'anhthu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 21,
//         tieude: 'Phòng trọ vip',
//         diachi: 'Quy Nhơn, Bình Định',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'bacvu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 22,
//         tieude: 'Phòng trọ mini',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 500,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'thonguyen',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 1
//       },
//       {
//         id: 23,
//         tieude: 'Phòng trọ BMT',
//         diachi: 'BMT, Đắk Lắk',
//         gia: 600,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'diepdang',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       },
//       {
//         id: 24,
//         tieude: 'Phòng trọ giá tốt',
//         diachi: 'Q12, Hồ Chí Minh',
//         gia: 800,
//         donvi: 'nghìn vnđ/tháng',
//         mota: 'Google Dịch là một công cụ dịch thuật trực tuyến do Google phát triển. Nó cung cấp giao diện trang web, ứng dụng trên thiết bị di động cho hệ điều hành Android và iOS và giao diện lập trình ứng dụng giúp nhà phát triển xây dựng tiện ích mở rộng trình duyệt web và ứng dụng phần mềm.',
//         nguoidang: 'anhthu',
//         img1: 'https://afamilycdn.com/150157425591193600/2020/9/6/2-15993881710591920233797.jpg',
//         img2: 'https://xaynhatro.net/wp-content/uploads/2018/06/f70f05c965f280acd9e3.jpg',
//         img3: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg',
//         img4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpKimrec6en61zfIC1FOLvdpSRAf5dbYgqQ&usqp=CAU',
//         trangthai: 0
//       }
//   ];

function DataProvider({children}) {
    // const [dataSource, setDataSource] = useState([])
    const [dataSourceUser, setDataSourceUser] = useState([])
    const [dataSourceUserID, setDataSourceUserID] = useState([])

    const [dataProvince, setDataProvince] = useState([])
    const [dataDistrict, setDataDistrict] = useState([])
    const [dataWard, setDataWard] = useState([])
    const [dataRoom, setDataRoom] = useState([])
    const [load, setLoad] = useState(0)
    const [dataRoomPosted, setDataRoomPosted] = useState([])
    const [dataRoomWait, setDataRoomWait] = useState([])
    const [dataRoomFail, setDataRoomFail] = useState([])
    const [dataRoomSearch, setDataRoomSearch] = useState([])

    const reloadDataUser = () => {
      userService.getall()
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        setDataSourceUser(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    useEffect(() => {
        // setDataSource(dataPost)
        reloadDataUser()

        if(localStorage.getItem("id"))
        {
          userService.getid(localStorage.getItem("id"))
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            setDataSourceUserID(response)
          })
          .catch(function (error) {
            console.log(error);
          })
        }
    
        //Lấy tỉnh
        addressService.getProvince() 
        .then(function (response) {
          setDataProvince(response)
          setLoad(pre => pre+1)
        })
        .catch(function (error) {
          console.log(error);
        });
        //Lấy huyện
        addressService.getDistrict() 
        .then(function (response) {
          setDataDistrict(response)
          setLoad(pre => pre+1)
        })
        .catch(function (error) {
          console.log(error);
        });
        //Lấy xã
        addressService.getWard() 
        .then(function (response) {
          setDataWard(response)
          setLoad(pre => pre+1)
        })
        .catch(function (error) {
          console.log(error);
        });

        
        
    },[])

    useEffect(() => {
      if(load==3){
        //Lấy room: tên huyện, xã
        roomService.getroom() 
        .then(function (response) {
          response.map((e) => {
            const getward = dataWard.find((w) => {
              return w.wardId == e.wardId 
            })
            return e.wardId = { "wardName": getward.wardName, "wardPrefix": getward.wardPrefix}
          })
          response.map((e) => {
            const getdistrict = dataDistrict.find((d) => {
              return d.districtId == e.districtId 
            })
            return e.districtId = { "districtName": getdistrict.districtName, "districtPrefix": getdistrict.districtPrefix}
          })
          response.map((e) => e.price = e.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }))
          setDataRoom(response)
          setDataRoomSearch(response)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },[load])
    

    useEffect(() => {
        if(dataRoom!=[]){
          setDataRoomPosted(dataRoom.filter( item => {  
            return item.statusRoom === 1;
          }))
    
          setDataRoomWait(dataRoom.filter( item => {  
            return item.statusRoom === 0;
          }))

          setDataRoomFail(dataRoom.filter( item => {  
            return item.statusRoom === 2;
          }))
        }
    }, [dataRoom])
    

    const value = {
        dataRoomPosted, setDataRoomPosted, dataRoomWait, setDataRoomWait,dataRoomFail ,setDataRoomFail,
        dataSourceUser, setDataSourceUser, reloadDataUser,
        dataSourceUserID, setDataSourceUserID,
        dataProvince, dataDistrict, dataWard,
        dataRoom,
        dataRoomSearch, setDataRoomSearch
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider 