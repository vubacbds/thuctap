//___Bật Use strict
"use strict"    //Chế độ nghiêm ngặt được bật, và báo lỗi ngay ở dòng 68
//_____IIFE : là tạo function Expression chạy ngay lập tức
var demo = 'demo';    //Trước function IIFE phải ngăn cách bằng ';'
(function myFunc() {          //Có tính Private, nên dc sử dụng để ko bị trùng tên biến tránh lỗi, thường làm cho thư viện dùng chung
    console.log('Now')
})()
    //myFunc(); //Không thể gọi //Đệ quy thì gọi được

//____Phạm vi của biến Scope
    //Global: Var, Let, Const đều có thể là global khi được tạo ở ngoài
    //Trong khối như khối if, for, while,...: Let, Const không thể gọi ở ngoài khối đó bên trong thì được, còn Var thì thành biến Global
    //Trong hàm thì tất cả đều ko thể gọi lại ở ngoài hàm

    //Biến xóa khỏi bộ nhớ khi:
    //Global khi đóng tab, trong khối thì sau khi kết thúc khối }, Hàm thì sau khi gọi hàm
    //Trường hơp đặc biệt ở Hàm là biến trong 1 hàm được gọi lại ở hàm con của hàm đó thì ko bị xóa (lí do (*))
    //Mỗi khi gọi hàm sẽ tạo nên phạm vi mới
        //Let chỉ cho khai báo 1 lần khi ở cùng 1 khối
        //const chỉ cho gán 1 lần
        //Var thoải mái
        //Vè Hosting: là đưa khai báo biến/function lên đầu phạm vi của nó
                    // - Có thể gọi biến trước khi khai báo bằng Var (Phần khai báo biến sẽ được đưa lên đầu, còn phần gán giá trị hay gọi thì vẫn như vậy)
                    // - Function Declareton giống như Var, tuy nhiên phần khai báo là toàn bộ hàm nên vẫn chạy bình thường
                    // - Còn Let, const thì ko
                    //Hosting ý là để biết phạm vi gần nhất đã có 1 khai báo biến này rồi  (#)
        //Khi khai báo cùng biến ở nhiều khối khác nhau, chỉ tìm và thực hiện ỏ khối gần nhất, các khối kia ko xử lí  (#)
    
//______Closure : là 1 hàm có thể Ghi nhớ nơi nó được tạo ra và truy cập được biến ở bên ngoài phạm vi của nó, nên khi gọi hàm nhiều lần biến vẫn được lưu trữ và gọi lại (*)
function createCounter() {
    let counter = 0;    //Closure ko thể truy cập biến này : tính bảo mật ko thể phá hủy

    function increate() {
        return ++counter;
    }

    return increate;    //Nhờ Return nên biến counter ko bị xóa khi hàm chạy xong
}

const counter1 = createCounter();   //Biến counter1 là global mà lưu giá trị return, nên nó lưu luôn vị trí được tạo ra và có thể truy cập được biến ở ngoài phạm vi của hàm tại vị trí đó (biến counter được thay đổi) đúng với lý thuyết của Closure. Vì vậy trả ra các giá trị lần lượt:
console.log(counter1());    //Trả về 1
console.log(counter1());    //Trả về 2
console.log(counter1());    //Trả về 3

//Chú ý: IIFE và Closure ko giống nhau, chỉ là kết hợp: IIFE thì chạy hàm ngay lập tức | Closure thì ghi nhớ vị trí nó tạo ra, sử dụng biến ngoài phạm vi

//___Cái thêm
var bienx = undefined;
var giatri1 = bienx ?? {nguoi1: {ten:'bac', age: 22}, nguoi2:{ten:'dung', age: 19} }   //Nếu bienx là null/undefined trả về object
console.log(giatri1);

var ss = false;
var giatri2 = ss && 'chào bạn'; //Nếu ss là true thì trả về 'chào bạn', ngược lại trẻ về false
console.log(giatri2);


delete giatri1.nguoi1;    //Xóa object
console.log(giatri1);

//__cái thêm
var i = 4;
function kk() {
    var i = 5;    //Biến i được khai báo mới trong hàm nên bị mất sau khi gọi hàm
}
kk();
console.log(i);     //Kết quả i = 4

//___-Cái thêm : gọi element từ thuộc Name
    // <form name="myform">
    //         <input type="text" name="stage" size="20" />
    // </form>
    // document.myform.stage.value = 'dung';    //Gán giá trị cho element bằng 'dung'

//___ "Use strict" : sử dụng chế độ nghiêm ngặt : được đặt ở đầu code của file .js : trước "Use strict" không có đoạn code nào : báo lỗi ngay các lỗi ko báo
const student = Object.freeze({  //Object.freeze là đóng băng không cho sửa 
    name: 'dung', 
    age: 18
});
// student.name = 'bac';  //Mở ra sẽ báo lỗi khi dùng "use strict"
console.log(student.name);  //Kết quả trả về vẫn là 'dung'

//____Cái thêm: Viết object kiểu khác để thêm các thuộc tính
var student2 = {};
Object.defineProperty(student2, 'name', {
    value: 'dung',
    writable: true        //Mặc định là false : cho sửa
})
student2.name = 'bac';
console.log(student2.name); //Kết quả trả về là bac


    //Dùng use strict để báo lỗi khi gọi hàm ở ngoài khối code khai báo hàm
        // {
        //     function demo1() {
        //          console.log('lokl');
        //     }
        // }
        // demo1();

//______Biến tham trị, tham chiếu
        //Tham chiếu là các biến như: array, object, function
        //Tham trị là các biến nguyên thủy
        //Các biến tham trị thì lưu giá trị của ô nhớ vào biến
        //Các biến tham chiếu thì lưu địa chỉ  của ô nhớ vào biến

const a = {
    name: 'vinfast',
}
const b = a;
a.name = 'audi';
console.log(b.name);   //Nếu là tham trị thì trả kết quả là 'vinfast' : vì a lưu giá trị vào 1 ô nhớ: b sẽ tạo ô nhớ mới và copy giá trị của a

                    //Mà đây object là tham chiếu nên trả về kết quả là 'audi'
                    //Vì biến a lưu địa ô nhớ, b = a nên sẽ cũng lưu địa chỉ đó, khi a sửa là sửa trên ô nhớ nên b cũng bị sửa vì dùng chung
                    //Khi a gán lại giá trị khác thì 1 ô nhớ mới được tạo. ô nhớ cũ vẫn còn. Khi sửa a thì ko tạo (*)
                    //Nếu có object con trong 1 object thì sẽ tạo nên 2 ô nhớ, vẫn lưu địa chỉ ô nhớ

var a1 = {
    name: 'bac',
}

var b1 = a1;

a1 = a1;   //a1 mới copy lại địa chỉ ô nhớ a1 cũ lưu
a1 = {
    name: 'dung',   //a1 mới tạo nên ô nhớ mới
}
a1.name = 'love'   //Sửa a1 trong ô nhớ mới 
console.log(b1);   //Kết quả trả về bac, vì b1 nhận giá trị của địa chỉ ô nhớ cũ
    // JSON.parse(JSON.stringify(a1))  : để tạo 1 object mới với địa chỉ ô nhớ khác : giải quyết triệt để khi đối tượng có nhiều đối tượng con bên trong (*)
    // {...a1} : cách này chỉ tạo địa chỉ ô nhớ mới cho cấp đầu tiên, còn các object con trong đó thì vẫn giữ địa chỉ cũ

//_______'This' trong 1 hàm trả về window (có strict mode thì trả về undefined), arrow function thì trả về this của khối cha
    //obj88.ham1(); : thì this ở đây là obj88
    //obj88.child.getname(); : thì this ở đây là child
    //getname(); Trường hợp ko có (.) đằng trước thì this là window : hay cách khác là ko được gọi từ đối tượng nào thì trả về window
    //This ban đầu cũng chưa biết là gì : khi gọi thì mới xác định được this ở đâu
    //getname.bind(obj88); : Để gắn hàm này với this là obj88 : bind là mặc định của function : được định nghĩa sẵn trong JS : nếu cùng key thì cũng có thể truyền obj99 vào bind để trả về kết quả
    //getname.call(obj88,a,b); : vừa bind vừa call luôn  : ngoài ra để mượn hàm vi truyền this
    //getname.apply(obj88,[a,b]) 
    //Tất cả cái trên truyền this để dùng mượn hàm, kế thừa,..

    var domain = 'techtuts.net'
 
try {
    if (domain !== 'freetuts.net'){
        throw new Error('Domain nay khong phai la trang chu');
    }
} catch (e){
    console.log(e.message);
} finally{
    console.log('End');
}


//_____Regex Javascript  
    //  Cú pháp: /partern/img    : partern là có cấu trúc mình muốn , img là các thông số

    //  i : không phân biệt chữ hoa/thường
    //  g : match tất cả các từ trong chuỗi, không có chỉ lấy cái đầu
    //  m : lấy cả cái xuống hàng

    //  Ví dụ các partern:
    //  ^a : có nghĩa là chữ 'a' phải đầu chuỗi
    //  b$ : có nghĩa là chữ 'b' phải cuối chuỗi
    //  \bbac\b : có nghĩa là chữ 'bac' phải đứng độc lập không nối liền với chữ hay số nào khác, kí tự đặc biệt thì được
    //  bac : chỉ lấy các chuỗi là bac liên tiếp
    //  bac[- :] : nghĩa là lấy từ 'bac' xong tới dấu '-' hoặc khoảng trắng hoặc dấu ':'
    //  \.  :
    //  . : dấu '.' là lấy tất cả
    // \. : để lấy dấu '.'
    //  [a-z0-9A-Z] : lấy các số hoặc từ 0 đến 9, hoặc từ a-z
    //  a{4} : lấy các chữ 'a' xuất hiện liên tiếp 4 lần, <4 hay >4 thì không lấy được  
    //  a{2-6} : lấy các chữ 'a' xuất hiện từ 2 đến 6 lần
    //  a{2,}  : lấy các chữ 'a' xuất hiện ít nhất 2 lần  (Ràng buộc kí tự trước nó)
    //  (dung-a){2} : có ngoặc tròn để gom lại, nghĩa là lấy các chuỗi 'dung-a' xuất hiện 2 lần liên tiếp
    //  [1-6]+ : lấy 1 hoặc nhiều, nghĩa là lấy tất cả các số từ 1-6 và các số phải liên tiếp ở sau nó cũng là 1 đến 6
    //  [^1-6] : lấy số khác từ 1-6
    //  -?  : lấy 0 hoặc 1, nghĩa là không cần có hoặc có 1 dấu '-' 
    //  -*  : lấy 0 hoặc nhiều, nghĩa là không cần có hoặc có nhiều dấu '-' lấy hết

    //Hàm test : Kết quả trả về là True/False
        //Cấu trúc:     /bac-[0-9]/g.test('So dien thoai cua bac- la 0868609878')   //Kết quả trả về là False vì ở giữa bac và sđt còn chữ 'la' và khoảng trắng
   
    //Hàm match : Kết quả trả về mảng
        //Cấu trúc:      
        console.log('098-6789-90'.match(/\d\d\d/g));    //Trả về mảng ['098', '678'] : vì \d là trả số, 3 cái \3 liên tiếp là lấy 3 cái số liên tiếp

    //Ngoài ra: 
    //  \w : tìm các kí tự là chữ cái
    //  \W : ko phải chữ cái
    //  \d : là số
    //  \D  : không phải số
    //  \s : khoảng trắng
    //  \b : so khớp bắt đầu hoặc kết thúc chuỗi
    //  \0 : kí tự là null
    //  \n : kí tự xuống hàng
    //  \t : kí tự tab

    //Làm partern phải đi từng chi tiết nhỏ, mình làm sẽ hiểu vì 1 khối lớn khác đọc vào khó hiểu

//____Debug trong JS
    // Sử dụng strict mode giúp giảm thiểu những lỗi không mong muốn.
    // Testing - unit test giúp kiểm tra từng thành phần trong chương trình. : nghĩa là viết ra các hàm gọi để xem kết quả như mong đợi ko
    // Debugging bằng cách ghi ra log hoặc set breakpoint giúp bạn xác định chính xác vị trí lỗi và sửa nó. : nghĩa là console.log() liên tục các biến kết quả để xem đúng như mong đợi ko

//___Về cài React JS
    //Cài node js : tự động cài thêm npm, npx
        //Tạo 1 dự án với Webpack sẽ nhiều thao tác : như cài thêm các thư viện React, React-Dom, Babel, CSS, vv... Và kết nối cần có link ở index.html, và chạy web thay cho Live Server
            //Vì vậy tại dự án bằng creat-react-app sẽ bao gồm tất cả
        //Github của React lưu trữ mã nguồn, npmjs là nơi lưu trữ các sản phẩm (thư viện) viết từ mã nguồn đó. Về UNPKG thì giúp lấy các thư viện trên npmjs dưới dạng CDN (url), CDN giống như máy chủ đặt ở các châu lục cho truy cập nhanh . Chủ yếu lấy link trên reactjs.org chèn vào luôn khỏi cài node các kiểu
        //npm quản lý các thư viện của Javascript
        //npm khi dùng sẽ lên thư viện JS cài đặt về máy các thứ
        //Terminal cũng chỉ để xử lí với máy tính
        //Có thể dùng Git (Git Bash Here) để mở Terminal, hay các phần mềm như VScode để tới thư mục cần cài React về
        //Khi cài thư viện creat-react-app trên global sẽ tải về ở mục User chỗ lưu tài khoản khi đăng nhập vào máy tính
            //Hạn ché sẽ cài các phiên bản cũ, khó cập nhật
        //Vì vậy dùng npx để cài, sẽ ko cần cài thư viện creat-react-app, mà từ đó tạo ra project React luôn
        //Bên trong các thư viện khi cài đặt, lại có các thư viện con tương tự nữa
        //yarn khác npm vì cài đặt cùng lúc, tốc độ sẽ nhanh hơn, nhưng đòi hỏi bộ nhớ lớn hơn
            //Có thể dùng npm hoặc yarn để thực hiện các câu lệnh

//____LocalStorage : Kiểu giống như lưu vào bộ nhớ để giữ dữ liệu
    //Chỉ lưu kiểu string
    //Ví dụ có 1 dữ liệu kiểu mảng được lưu trong biến MangDung
        //Bước 1: Chuyển mảng sang JSON (là chuyển sang chuỗi)
            //const MangDungString = JSON.stringify(MangDung)
        //Bước 2: Lưu vào LocalStorage:
            //localStorage.setItem('KeyNek',MangDungString)
        //Bước 3: Xem localStorage: F12 -> chọn dâu '>>' -> Application -> localStorage -> https://127.......
        //Bước 3: Chuyển lại thành kiểu mảng
            //localStorage.getItem('KeyNek')   //Có thể kiểu này: localStorage.KeyNek   //Từ Key của nó để lấy dữ liệu

console.log(false&&'hello')  //Nếu true vế trước trả vế phải, ngược lại trả về false
console.log(false||'No')   // Vế nào đúng trả vế đó
console.log(null??'Yes')   // Null/undefined trả vế phải

//_____Cái thêm: Về Github
    //1. Cài Git về máy
    //2. Kiểm tra phiên bản: git --version
    //3. Cập nhật: git update

    //Nếu tạo dự án mới trên Github thì:
        //git init : khởi tạo
        //git remote add origin https://github.com/vubacbds/room-social-network.git : gửi yêu cầu kết nối
        //git push -u origin master : kết nối với redo master
        //git add index.html  : thêm file index 
            //git add . : thêm tất cả
        //git commit -m "Thong bao" : tạo commit
            //git state : kiểm tra
            //git log : kiểm tra
        //git push : úp file lên github
        //git pull : lấy file github về
        //Chú ý trước khi commit cần khở tại mail và tên tài khoản: 
            //git config user.email "vubacbds@gmail.com"
            //git config user.name "vubacbds"

    //Nếu lấy dự án có sẵn tren github:
        //git clone https://github.com/vubacbds/bactydo.git : lên github lấy link
        //xong các bước như trên

    //Về branch : để tải code về branch khác dễ quản lý
        //git branch : xem tất cả branch, mặc định có 'master'
        //git branch tenbranch : tạo 1 branch mới
        //git checkout tenbranch : cài branch làm mặc định
            //Câu lệnh rút gọn: git checkout -b tenbranch : tạo 1 brach và cho nó làm mặc định luôn
        //git merge tenbranch : câu lệnh này chạy khi branch 'master' đang được chọn mặc định, nó sẽ lấy code từ tenbranch truyền vào master

    //Nhưng sẽ it dùng merge vì dùng: compare & pull request để gửi yêu cầu đến team xem qua phê duyệt
        //compare & pull request : xuất hiện trên web github khi mình vừa tạo 1 branch mới, cho branh đó cần phê duyệt
        //có thể bình luận, được chấp thuận thì chọn Merge pull request để merge tất cả vào branch master
            //hoặc chọn Squash and merge để chỉ merge 1 commit

    //Khác
        //Xem link github đã kết nối: git remote -v
        //Xóa: git remote rm origin
        //Lấy code từ 1 branch: git pull origin <branch>
        //Xem chi tiêt 1 số câu lệnh: https://www.tma.vn/Hoi-dap/Cam-nang-nghe-nghiep/Cach-xu-ly-cac-loi-thuong-gap-trong-git/33031

        //Giải quyết vấn đề chưa có dữ liệu đã render và báo lỗi: https://daveceddia.com/react-before-render/
        
            
  
    const is_perfect = (number) => {
        var sum = 0
        for(var i=1; i < number; i++) {
            if(number/i==0) {
                sum = sum + i
            }
        }
        if(sum==number) alert("Đúng")
        else alert('sai')
    }
    is_perfect(6)

        




    
