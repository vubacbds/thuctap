function f1(){
    document.getElementById("id1").innerHTML = "Chào mừng các bạn đến với TMA"
}



function f2(){
    document.getElementById("id2").innerHTML = "Tôi tên là Vũ Xuân Bắc"
}

var dem = 0;
function f3(){
    dem++;
    document.getElementById("id3").innerHTML = "Nhấn <span class='maudo'>" + dem +" </span> lần "
    var hinh1 = 'https://freetuts.net/upload/tut_post/images/2017/03/29/810/quan-ly-ten-mien-trong-direct-admin.gif';
    var hinh2 = 'https://freetuts.net/upload/tut_post/images/2016/09/27/746/typescript-basic-types.gif';
    if(dem%2==0)
        document.getElementById("id4").src = hinh1
    else 
        document.getElementById("id4").src = hinh2
}

//function : Declaretion
function bac(){
    console.log('chào bạn');
  }
bac();
 
//function : expresstion
var bac2 = function() {
    console.log('Toi ten là B A C');
}
bac2();

//object
var diachi = 'address';
var obj1 = {
    name: "bac",
    age: 22,
    [diachi]: 'Buôn Đôn, Đắk Lắk',  //Khai báo key là một biến
    getage: function() {          //function
        return this.age;
    }
}
obj1.phone = 0868609878;
obj1["my-email"] = "vb@gmail.com";
console.log(obj1.name);
console.log(obj1[diachi]);    //Gọi lại khi key là biến
console.log(obj1['address']);    //Gọi khi dùng ngoặc vuông
console.log(obj1.address);
console.log(obj1.getage());


//object constructor  : giống bảng thiết kế ngôi nhà : Hàm tạo
function User(firstname, lastname, age, avatar){     //Tên chữ cái đầu hàm tạo viết hoa
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.avatar = avatar
    this.getName = function() {
        return `${this.lastname} ${this.firstname}`;
    }
}
var user1 = new User('bac', 'vu', 22, 'img1');
var user2 = new User('dung', 'ngo', 18, 'img2');
user1.title = "đây là title 1"; 
 //Thêm thuộc tính/ phương thức cho đối tượng đã định nghĩa trong bảng thiết kế
console.log(user1.constructor);  //Xem lại bản thiết kế của đối tượng này
console.log(user1);
console.log(user2.title); //không gọi được
console.log(user2.getName());

//Dùng prototype, thêm tiếp thuộc tính/phương thức vào trong hàm tạo User
User.prototype.classname = "DHTN";
User.prototype.getClassName = function() {
    return this.classname;
}
console.log(user2.classname); 
console.log(user2.getClassName()); 

//Mảng
var arr1 = [
    'bac',
     22,
    'dhtn',
    'Dak Lak',
    {
        name: 'bac',
        point: 10
    },
    {
        name: 'dung',
        point: 10
    },
    function() {

    },
    'dung'
]
var arr2 = [
    'Cong',
    'IT'
]
console.log(arr1.concat(arr2));  //Nối mảng
console.log(typeof arr1);   //Kiểm tra kiểu dữ liệu
console.log(Array.isArray(arr1));   //Kiểm tra phải mảng không
console.log(typeof User);

console.log(arr1.toString());   //Biến array thành chuỗi, mặc định ngăn cách bởi dấu ','
console.log(arr1.join('_'));  //Biến array thành chuỗi , các phần tử ngăn cách bởi dấu '_'
console.log(arr1.pop()); //Xóa phần tử cuối mảng và trả lại chính phần tử bị xóa đó
console.log(arr1.shift()); //Xóa phần tử đầu mảng và trả lại chính nó
console.log(arr1.push(19, 'ok')); //thêm 1 hoặc nhiều phần tử vào cuối mảng
console.log(arr1.unshift('hi')); //Thêm 1 hoặc nhiều phần tử vào đầu mảng
arr1.splice(1,1,21,'yd'); //Xóa phần từ, từ vị trí 5 xóa 1 phần tử và chèn thêm những phần tử 21,yd
console.log(arr1.slice(1,3)); //Cắt lấy mảng, từ vị trí 1 đến vị trí 3, cắt toàn bộ là slice(0)

console.log(arr1);

arr1.forEach(function(ar1, index) {  //Duyệt qua từng phần tử của mảng
    console.log(index, ar1);
})

var a = arr1.every(function(ar1, index) {  //Tất cả phần tử thỏa mãn điều kiện trả kết quả True, ngược lại là False
    return ar1.point === 10;
})
console.log(a);

var b = arr1.some(function(ar1, index) {  //1 phần tử thỏa mãn điều kiện trả kết quả True, ngược lại là False
    return ar1.point === 10;
})
console.log(b);

var c = arr1.find(function(ar1, index) {  //Lấy phần tử thỏa mãn điều kiện, duyệt trên xuống có dừng luôn (chỉ lấy 1 phần tử thỏa mãn)
    return ar1.name === 'bac';
})
console.log(c);

var d= arr1.filter(function(ar1, index) {  //Lấy phần tử thỏa mãn điều kiện (lấy tất cả phần tử thỏa mãn)
    return ar1.point === 10;
})
console.log(d);


function f8(f){    //f nhận giá trị của các phần tử của mảng
    return f;
}
var e = arr1.map(f8);     //Dùng Map duyệt lần lượt các phần tử trong mảng truyền vào function f8 để xử lí, function f8 là đối số, map trả về mảng
console.log(e);

function f9(f, index){    //f nhận giá trị của các phần tử của mảng
    return {                        //tạo ra một object mới
        ten: `Tên tôi là: ${f.name} `,
        diem: f.point,
        index: index
    };
}
var f = arr1.map(f9);     //Dùng Map lấy lần lượt các phần tử trong mảng truyền vào function f9 để xử lí
console.log(f);

var arr3 = [
    {
        name: 'bac',
        point: 9,
        Ms: 12
    },
    {
        name: 'dung',
        point: 10,
        Ms: 8
    }
]

function f10(accumulator, currentValue, currentIndex, originArray) {   //Reduce của mảng, accumulator là giắ trị ban đầu, currentValue là phần tử lúc đó, currentIndex là chỉ số của phần tủ đó, originArray là mảng truyền vào
    return accumulator += currentValue.point;
}
var tongdiem = arr3.reduce(f10,0);  //Truyền vào function f10 và giá trị ban đầu = 0, như Tong=0
console.log(tongdiem);

//CallBack
function cb(param) {
    param('Happy');
}

function cb2(value) {
    console.log(value);
}

cb(cb2);