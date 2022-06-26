//Hooks giống như các function component : là các hàm xử lí mình gọi lại

//_________useState
    //Về hiển thị giao diện thì dùng useState
        //Khi muốn dữ liệu thay đổi thì giao diện tự động được cập nhật (reder lại theo dữ liệu)
    //Lệnh import: import {useState} from 'react'
    //Cú pháp sử dụng: const [x, setx] = useState([])   
        //Gán cho x giá trị ban đầu là mảng rỗng
        //setx là hàm để gán giá trị cho x, setx có thể nhận đối số là callback, giống như map giá trị truyền vào của callback đó là giá trị trước đó của state như ví dụ thì là giá trị trước đó của x
        //useState([]): Gán giá trị ban đầu cũng có thể nhận giá trị callback, tại giá trị ban đầu này chỉ thực hiện 1 lần duy nhất
            //vì vậy có hàm xử lí gì chỉ dùng 1 lần nên để trong hàm trong phần giá trị ban đầu này, để nhẹ bộ nhớ hơn
            //giá trị nó nhận là Return trong hàm 
        //Khi hàm setx thực hiện, thì sẽ render lại trang ví dụ như render hàm App sẽ được gọi lại để hiển thị ra giao diện

    //Two-way binding : là khi thay đổi giá trị bên trong thì giao diện thay đổi;
        //và khi thay đổi giá tri bên giao diện thì bên trong cũng thay đổi
        //1 trong 2 cái trên thì one-way binding

    //Mounted: thời điểm đưa 1 component vào sử dụng 
    //Unmounted: thời điểm gỡ nó ra không còn sử dụng nữa

//____Cái thêm : ví dụ muốn Random từ 0 đến 2
    // x = Math.random * 3 //Math.rom sẽ trả về số thực chạy từ 0 đến 1 nên khi * 3 sẽ ra phần nguyên từ 0 đến 2
    // y = Math.floor(x)   //y là số được làm tròn dưới

//_________useEffect : dùng Update DOM, listen DOM event, call API, clear timer listener
    //Cú pháp: 
        //1. useEffect(callback)  //Thường không dùng
            //-Gọi callback mỗi khi render lại
            //-Gọi callback sau khi component thêm element vào DOM
        //2. useEffect(callback, [])
            //-Chỉ gọi callback 1 lần khi component mounted
        //3. useEffect(callback, [deps])
            //-deps có thể là Props truyền từ ngoài vào hoặc state của component, nói chung là biến
            //-Gọi callback mỗi khi deps thay đổi

        //Cả 3:  Callback luôn được gọi khi component mounted
        //Cả 3:  Return giao diện trước rồi hàm trong useEffect mới chạy
        //Cả 3:  Cleanup function luôn được gọi trước khi component unmounted
            //CleanUp function là khi sử dụng useEffect return ra 1 cái hàm, hàm được return này là hàm dọn dẹp
            //CleanUp Fuction luôn được gọi trước khi Unmounted
            //CleanUp Fuction luôn được gọi trước khi Callback được gọi (trừ lần mounted)
            //Dọn dẹp dữ liệu ko muốn để trong bộ nhớ để tránh rò rỉ bộ nhớ

                //Tóm lại khi chạy useEffect lần đầu thì return chưa chạy, 
                    //Nếu chạy 1 lần nữa thì return mới chạy, rồi tiếp tục chạy useEffect lần nữa
                    //Còn không thì phải unmounted đi thì return mới chạy
                    //Mục đích xóa dữ liệu trước đi để không bị rò rỉ bộ nhớ
            //Xóa event hay timer bằng cách thêm 1 Return ra 1 callback ở cuối trong hàm useEffect, sau return thực hiện khi unmounted/ hay nói cách khác là function component ko được gọi
    //Dùng useEffect để ưu tiên giao diện nghươi dùng : callback trong hàm useEffect chỉ được gọi sau khi render giao diện, vì thế có lỗi code trong useEffect thì giao diện cũng đã hiển thị

//_____useLayoutEffect : giống gần như 100% Effect
    //Khác là với useEffect , render thực hiện trước rồi hàm mới thức hiện
    //Còn useLayoutEffect thì bước render là cuối cùng

//_____useRef : Lưu các giá trị qua một tham chiếu bên ngoài function component
    //Cú pháp: useRef(doiso) : doiso là bất kì dữ liệu gì, chỉ gọi 1 lần khi mounted, đối số có thể không có
        //useRef trả về 1 object, lưu giá trị vào 1 thuộc tính là current, nên khi gọi hay sửa phải thêm thuộc tính này 
            //VD: timeId = useRef()  -> khi đó timeId.current sẽ là 1 biens tham chiếu
            //VD: useref(doiso).current -> sẽ trả về doiso
            //Trong DOM có thuộc tính ref để lấy DOM

                //VD:  const h1ref = useRef()    //Const vì useRef trả về object nên ta ko phải gán lại giá trị, mà chỉ cần gán lại giá trị cho các thuộc tính của object
                //      <h1 ref={h1ref}> </h1>
                //Khi đó cả Element h1 sẽ được lưu vào h1ref.current
                    //Khi code thuần để lấy các thuộc tính của Element thì: h1ref.current.getBoundingClientRect()
    //Vậy lí do dùng useRef vì mỗi lần set trong useState sẽ gọi lại hàm App, 
        //mà gọi lại hàm lại tạo ra 1 phạm vi mới của các biến sẽ thay đổi
        //vì vậy dùng useRef để lưu các giá trị qua một tham chiếu, đặt bên ngoài hàm

//_____memo : giúp xử lý component để tránh bị render trong những tình huống không cần thiết
    //Khai báo như Hooks: import {memo} from 'react'
        //Có thể khao báo khác: import React from 'react' -> Khi đó gọi lại là React.memo
    //Có 3 khái niệm hay gặp là Hooks, HOC, render props : memo thuộc HOC bao bên ngoài component
        //VD: export default memo(App)
    //Dùng khi 1 component gọi 1 component con, mà component con này chỉ cần thực hiện 1 lần, 
        //vì vậy nên dùng memo để bao component con, để nó render 1 lần khi các Props của component con ko có sự thay đổi
    //Nên dùng memo cho các component con không dùng useState để tránh xử lý không cần thiết
    
//______useCallback : tránh tạo ra hàm mới không cần thiết trong cái function componet
    //Trả về tham chiếu, gắn vào biến: VD: const x = useCallback(() => {},[])
    //useCallback giống như useEffect về cú pháp
    //Nhưng nó trả về 1 địa chỉ tham chiếu đưa ra bên ngoài hàm, chỉ thay đổi khi có deps như useEffect
    //Khi props là các kiểu dữ liệu tham chiếu như array, object, function nên dùng useCallback. 
        //vì dùng memo vẫn bị render lí do các kiểu dữ liệu array, object, function mỗi lần gọi sẽ tạo nên 1 ô địa chỉ tham chiếu mới nên luôn có sự thay đổi
        //vậy đồng thời phải kết hợp useCallback với memo để thực hiện được việc gọi lại không cần thiết của component
            //Nếu chỉ dùng useCallback là vô nghĩa

//______Cái thêm: Quy ước lắng nghe sự kiện Prop đặt tên là on ví dụ onClick, và truyền vào hàm xử lý nên đặt  là handleClick
    //Để chuyển chuỗi thành số: 
        //Cách 1: Number(chuoiso)
        //Cách 2: ParseInt(chuoiso)
        //Cách 3: +chuoiso
    //Switch case nếu không có Return thì thêm break , không là nó xuống Default

//______useMemo : tránh thực hiện lại 1 đoạn logic không cần thiết
    //Cú pháp giống useEffect
    //VD khi dùng useState cứ bị render lại mỗi khi set, mà 1 logic xử lí tính tổng nào đó không cần thiết cứ bị lặp lại sau khi  

//______useReducer : xử lý giống như useState
    //useState dùng trong các trường hợp kiểu dữ liệu đơn giản, array, object 1 cấp
    //useReducer dùng cho các trường hợp kiểu dữ liệu phức tạp hợp, array, object nhiều cấp. Hoặc trường hợp nhiều state, và state phụ thuộc nhau
    //Cú pháp:
        //1. Init state : khởi tạo giá trị mặc định
            //VD:  const initState = 0
        //2. Action : là khởi tạo hành động Up(state+1) / Down(state-1)
            //VD: 
                //const UP_ACTION = 'up'
                //const UP_ACTION = 'down'
        //3. Reducer : là khởi tạo 1 hàm bình thường có 2 đối số là Giá trị ban đầu và Hành động
            //Trả về dữ liệu phải giống với định dạng của Giá trị khởi tạo
            //VD:
                //const reducer = (state,action) => {..lệnh xử lí, ví dụ sử dụng switch case, UP_ACTION thì return về +1, DOWN_ACTION thì return về -1..}
        //4. Dispatch
    //Cú pháp: const [count, dispatch] = useReducer(reducer, initState)
        //useReducer truyền vào 1 hàm ở bước 3, và giá trị ban đầu của hàm ở bước 1
        //dispatch là 1 hàm có tham số truyền vào là Action ở bước 2
            //VD: dispatch(UP_ACTION)  : với lệnh này thì được return +1 
        //Tóm lại dùng useReducer ở các tình huống phúc tạp, và có thể chia làm nhiều file cho ít dòng code trong 1 file, không thì dùng useState

//____Trong thư viện React đã cung cấp sẵn phương thức tạo ra Context - đầy là khái niệm truyền dữ liệu từ component cha đển component con mà không dùng tới Props
    //VD: Từ compometA -> componentB -> componentC thì có thể truyền Props từ compometA tới componentC luôn, không phải qua componentB
    //Có 3 bước tạo Context:
        //1. Create Context : tạo
        //2. Provider : nhà cung cấp  - Là React Component
        //3. Customer : nhận
            //1: Khai báo createContext: import {createContext} from 'react'
                //VD: const ThemeContext = createContext() - Trả về object có phương thức Provider và  Customer
                //Truyền vào các component con, bằng cách bao lại trong return trong App
                    //VD: fuction App()
                    // ......
                    // return (
                    //  <ThemeContext.Provider value={theme}>
                    //   <div> ... Các Component con trong đây đều có thể nhận được giá trị trong value - value là props có sẵn - có thể nhận object để truyền vào nhiều dữ liệu</div>
                    //  </ThemeContext.Provider>
                    // )
                    
                
                //Khi dùng thì: import biến ThemeContext , và import useContext
                    //VD: const context = useContext(ThemeContext)
    //Có thể tạo nhiều context
    //component chứa context thường bao luôn cả component App trong index.js

//_________Tạo nên state phạm vi toàn cục qua Context : xem video 44
    //Export default trong trang index, để việc import được ngắn gọn hơn
    //Tạo logger để console.log dễ xem hơn: xem video 43

//________useImperativeHandle : tùy chỉnh được ref của 1 function component
    //forwardRef : giúp ref làm props của function component, để truyền vào hàm đó có thể sử dụng, trả về đối số thứ 2 của hàm đó
    //useImperativeHandle : giúp private dữ liệu

//_________CSS trong React : khi code import vào sẽ ở dạng internel (nó tự tạo thẻ style bên trong)
    //Sẽ có 2 file css là index.css và 1 file mình import
    //Khi build cho khách hàng thì nó gom tất cả làm 1 dưới dạng chèn link, và minin file giúp tăng tốc độ
    //Module css: để không bị trùng tên
        //1. Đổi tên file thành: VD: Heading.module.css
        //2. Import cú pháp: import styles from './Heading.module.css'
        //3. Sử dụng: styles.(tên class/.. trong file css)

//__Cái thêm: Nên chia nhỏ file cho dễ quản lý: 
    //Trong src tạo 1 file components
    //Trong file components tạo các file component con VD Heading,....
    //Trong file Heading lại tạo file index.js và tạo file css như heading.module.css

    //Ctrl + nhấn vào tên cmponent để đi tới file component đó
    //Về flex: https://www.homiedev.com/tim-hieu-ve-flex-grow-flex-shrink-va-flex-basis/ 
        //Có flexGrow - lấp đầy khoảng trống thẻ cha

    //Về Route: https://v1study.com/reactjs-how-to-cach-xu-ly-dinh-tuyen-route-trong-ung-dung-react-voi-react-router.html
    //Giúp tạo component nhanh
        //Cài : install snip ES7
        //Gõ: rafce
        //Ctrl + dấu chấm để import nhanh
        //import nhanh thì gõ xong thấy gợi ý , bấm phím tab

    //VD:  x?.id : nghĩa là tồn tại x thì trả về id, ngược lại không trẻ về gì

    //Hướng dẫn route reactjs v6 (mới nhất) : https://www.youtube.com/watch?v=KmG3zcZ7J5c
    //Private Route: https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
    //Link upload ảnh lên firebase: https://www.youtube.com/watch?v=8r1Pb6Ja90o&t=1077s
    //Link sửa lỗi cors khi gọi API khác địa chỉ: https://www.youtube.com/watch?v=hxyp_LkKDdk&t=1270s
    //Lấy API từ Axios: https://www.youtube.com/watch?v=eyKY7zNu8q8&t=1148s
    //Xuất lỗi từ API team BE làm: https://www.codegrepper.com/code-examples/javascript/react+doesn%27t+print+error+message+with+axios