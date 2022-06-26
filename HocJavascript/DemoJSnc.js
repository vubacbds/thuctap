//__________Đệ quy, sử dựng callback
var mang1 = ['html', 'css', 'javascript'];

function vonglap(start, end, cb){
    if(start < end){
        cb(start);
        vonglap(start+1, end, cb)
    }
}

vonglap(0, mang1.length, function(index){
    console.log(mang1[index]);
})

//___________Lọc các phần tử bị trùng trong mảng
var mang2 = [6,6,8,9,9,12];
console.log([...(new Set(mang2))]);

//Tính giai thừa bằng đệ quy
function giaithua(number) {
    if(number > 0) {
        return number * giaithua(number-1);  
    }
    return 1;
}
console.log(giaithua(3));  

//___________Thêm css bằng js, thêm nhiều style qua Object.assign
var obj1 = document.querySelector('.class1');
Object.assign(obj1.style, {
    width: '200px',
    height: '100px',
    background: 'green',
});
console.log(obj1);

//__________Thêm class, classlist
var obj2 = document.querySelector('.class1')

//obj2.classList.remove('red');   //Xóa class

setTimeout(() => {                //Sau 1 khoảng thời gian câu lệnh sẽ thực hiện
    obj2.classList.add('red');    //Thêm class
}, 3000)
 
setInterval(() => {               //Lặp lại sau 1 thời gian (nhấp nháy)
    obj2.classList.toggle('red');  //Có class thì xóa, ko có thì thêm, ứng dụng như việc chọn vào menu 3 gạch
}, 1000);


//___________Event
var inputTextbox = document.querySelector('input[type="textbox"]')   //Có type trong thẻ input
inputTextbox.onchange = function(e) {     //Khi thay đổi mới chạy, chữ e là sự kiện chuột
    console.log(e.target.value);       //.target để lấy element
}

// input1Dom.input = function(e) {         //Khi nhấn vào là chạy
//     console.log(e.target);
// }

var inputCheckbox = document.querySelector('input[type="checkbox"]')   
inputCheckbox.onchange = function(e) {    
    console.log(e.target.checked);        //Checked trả về true khi check, false khi chưa check   
}

var inputSelect = document.querySelector('select')   
inputSelect.onchange = function(e) {    
    console.log(e.target.value);        
}

document.onkeydown = function(e) {    //Chữ e lưu sự kiện phím   
   switch(e.which){
        case 13: 
            console.log(e.which);    //Which hiển thị số của phím
            break;
        case 27: 
            console.log(e.which);   
            break;
    }
} 

//_____Ngăn chặn sự kiện mặc định, ví dụ nhấn vào thẻ a sẽ ko cho chuyển trang
var aElement = document.links;

for (var i = 0; i < aElement.length; i++) {
    aElement[i].onclick = function(e) {
        if(!e.target.href.startsWith('https://meeyland.com')){   //startsWith là bắt đầu với chuỗi kia thì dc
            e.preventDefault();                                   //Chặn sự kiện mặc định
        }
    }
}

var pElement = document.querySelector('p');
pElement.onclick = function(e) {
    console.log('p');
}

var buttonEl = document.querySelector('button');
buttonEl.onclick = function(e) {
    e.stopPropagation();    //Chống hiện tượng nổi bọt từ con ra ngoài
    console.log('ok');
}

var divEl = document.querySelector('#div1')
divEl.onclick = function(e) {
    console.log('div');
}

//_____EventListener : dùng khi 1 event thực hiện nhiều việc và hủy bỏ 1 sự kiện
var btnEl = document.getElementById('event1');
function viec1() {
    console.log('Việc 1');
}
function viec2() {
    console.log('Việc 2');
}
btnEl.addEventListener('click', viec1);    //EventListener sẽ thực hiện cùng lúc nhiều việc, còn Dom Event chỉ gán thực hiện 1 việc, muốn nhiều phải viết chung trong 1 function
btnEl.addEventListener('click', viec2);

setTimeout(function() {
    btnEl.removeEventListener('click', viec1);    //Xóa đi click Việc 1 sau 3 giây tải lại trang (dùng EventListener sẽ thuận tiện)
}, 3000)

//____________________Validation cho form____________

function Validator(options) {    //Đối tượng (constructor function)
    var selectorRules = {};

    //Hàm lấy element cha form-group đi từ input, rồi đi xuống element báo lỗi (trường hợp oinput nhiều thẻ cha)
    function getParent(element, selector) {
        while (element.parentElement) {      //Lấy Element cha            
            if (element.parentElement.matches(selector)) { //matches kiểm tra có tên class 
                return element.parentElement
            }
            element = element.parentElement;
        }
    }
    function validate(inputElement, rule) {  //Hàm thực hiện Validate
        var errorMessage;
        var errorElement = getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector); 
       
        //Lấy ra các rules của Selector
        var rules = selectorRules[rule.selector];
        
        //Lặp qua từng Rule và kiểm tra
        //Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default: 
                     errorMessage = rules[i](inputElement.value);
            }
            
            if (errorMessage) {
                break;
            }
        }
        if(errorMessage) { 
            errorElement.innerText = errorMessage;
            inputElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.classList.remove('invalid');
        }
        return !errorMessage  // dấu ! trả về boolean
    } 
    //Lấy element của form cần Validate
    var formElement = document.querySelector(options.form);  //Lấy form element
    if(formElement) {
        //Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;
            //Lặp qua từng rules trong validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false;
                }
            });
           
            if (isFormValid) {
                //Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    
                    //EnableInput sẽ thuộc kiểu NodeList ko phải mảng
                    var EnableInput = formElement.querySelectorAll('[name]:not([disabled])'); //Lấy tất cả Element có thuộc tính Name và ko phải Disabled (ẩn)
                    //Chuyển sang mảng
                    var formValues = Array.from(EnableInput).reduce(function (values, input) {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked'))  {//Matches trả về boolean xem có thuộc tính trong 1 element hay ko
                                    values[input.name] = '';
                                    return values;  
                                }
                                if(!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});
                    options.onSubmit(formValues);
                } 
                //Trường hợp submit với hành vi mặc định (xóa cái onSubmit đi)
                else {
                    formElement.submit(); //Submit lại với hành vi của trình duyệt
                }

            } 
        }
        //Lặp qua mỗi Rule và xử lí lắng nghe sự kiện Blur, input,..
        options.rules.forEach(function(rule) {
            //Lưu lại các Rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            
            var inputElements = formElement.querySelectorAll(rule.selector);           
            Array.from(inputElements).forEach(function (inputElement) {
                //Xử lí trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }                       
                //Xử lí mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = getParent(inputElement,options.formGroupSelector).querySelector('.form-message'); //Lấy Element cha , rồi tới thg con tương ứng            
                    errorElement.innerText = '';
                    inputElement.classList.remove('invalid');
                }
            });
        });
        console.log(selectorRules);
    }
    //console.log(options.rules);
}

Validator.isRequired = function(selector, message) {    //Định nghĩa các Rule
    return  {                                  //Nguyên tắc: 1. Khi có lỗi => trẻ về message lỗi
        selector: selector,                    //2. Khi hợp lệ => không trả về gì
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
} 
Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   //Kiểm tra email => Tra gg từ khóa 'javascript email regex'
            return regex.test(value) ? undefined : message || "Trường này phải là Email";
        }
    } 
}
Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    } 
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

console.log(Validator);

//___Test tạo object 
var dt = {};   
dt['a'] = [0];   //Tạo mảng
dt['a'].push(1); 
//console.log(Array.isArray(dt['a']));
dt['b'] = 1;
console.log(dt);

//______Test var, let
let bac ='dung';
if (true) {
    let bac ='dung2'; 
    console.log(bac);
}
console.log(bac);

//_____Demo Arrow function
var demo1 = function(a,b) {     //Function Expression:
    console.log(a+b);
} 
demo1(2,2);

function demo2(a,b) {     //Function Declaration
    console.log(a+b);
} 
demo2(3,3);

var demo22 = (a,b) => a+b;  //Arrow Function (sau dấu suy ra mặc định là return)
console.log(demo22(4,4));
var demo4 = (a,b) => ({a:a, b:b});  //Arrow Function (sau dấu suy ra mặc định là return)
console.log(demo4('bac','dung'));


//_____Class giống như Constructor function
class Course {
    constructor(name,price) {
        this.name = name;
        this.price = price;
    }
}

const php = new Course('php',1000);
const js = new Course('js',1200);
console.log(php);
console.log(js);


//___JSON : định dạng dữ liệu dạng chuỗi
var json1 = '8';   //chuỗi thể hiện số 8 trong JSON
var json2 = '["js","php"]';  //từ dấu ngoặc vuông là của JSON, dùng dấu ngoặc kép
var json3 = '{"name":"Bac","age":18}';
var json4 = '"ChuoiDemo'
console.log(JSON.parse(json1));   //Từ JSON sang JS
console.log(JSON.stringify([      //Từ JS sang JSON (JSON ở dạng chuỗi)
    'html',                        //Function ko viết dưới dạng JSON được
    'css',
    'js'
]))
var kkoo = {
    khoahoc: [
        {
            id: 1,
            name: 'bac',
        },
        {
            id: 2,
            name: 'dung',
        }
    ]
};
console.log(JSON.stringify(kkoo))  //Trả về 1 JSON

//______Giá trị mặc định khi ko truyền vào tham số (ko truyền thì là Undefinded)
function logger(log = 'gia tri mac dinh !') {  //Tham số bắt buộc nên ko nhất thiết cần giá trị Default
    console.log(log);
}
logger(undefined);

function logger2(log, type = 'log') {  //Tyoe là giá trị ko bắt buộc
    console[type](log);   //Mặc đinh là .log, có thể thay đổi
}
logger2('Message....', 'warn');

//_____Định nghĩa Key: value cho object (ES6)
var ten = "xuanbac";
var tuoi = 22;
var dc = 'diachi';
var thonhtin = {
    ten: ten,       //Trường hợ Key giống tên biến
    tuoi: tuoi,
    diachi: 'Dak Lak',  //Trường hợp tên Ky bình thường
    getTen: function() {   //Trường hợp tên hàm dài dòng
        return ten;
    }
}
//Viết lại theo kiểu ES6
var thonhtin2 = {
    ten,       
    tuoi,
    [dc]: 'Dak Lak',   //Trường hợp tên Key là biến
    getTen() {   
        return ten;
    }
}

console.log(thonhtin2);

//_______________________________Destructuring
        //Destructuring với mảng
var DemoMang = ['html','css','js']; 
var [a,,c] = DemoMang;   
console.log(a,c);   //Lấy ra a,c bỏ b

var DemoMang2 = ['html','css','js'];
var [a,...rest] = DemoMang2;   //Dùng ...rest lấy phần còn lại
console.log(rest);  //Trả về mảng chưa các phần tử còn lại

        //Destructuring với object
var DemoObject = {
    name: 'javascript',
    price: 1000,
    children: {
        name: 'ReactJS'
    }
}

var {name, price} = DemoObject //Chỉ lấy giá trị có key là name, price trong mảng
var {name:doiten, mota='gi tri mac dinh khi ko co', children: {name:childrenname} } = DemoObject; //Đổi tên qua :
console.log(childrenname);
console.log(mota);  //Gọi gia tri Mota không được định nghĩa, và đặt giá trị mặc định

var DemoObject2 = {
    name: 'javascript',
    price: 1000
}
var {name,...rest} = DemoObject;
console.log(rest);

 //Truyền nhiều tham số với toán tử Rest
 function test(a,b,...rest) {  //Sử dụng tham số bằng toán tử Rest trả về mảng
     console.log(rest);
 }
 console.log(test(1,2,3,4,5,6,7,8));  //Lấy ra Rest là từ 3->8

 //Ví dụ Destructuring và Rest trong object
 function objdemo({name, price,...rest}){
     console.log(name);
     console.log(price);
     console.log(rest)     
 }

 objdemo({   //Truyền vào obj
     name: 'JavaScript',
     price: 1000,
     description: 'Mo ta'
 })

 //______Spread (kiểu loại bỏ dấu ngoặc và nối các mảng hay obj)
 var array1 = ['html', 'css'];
 var array2 = ['javascript', 'reactjs'];
 var array3 = [...array1, ...array2];  //Dùng Spread
 console.log(array3);
//Rest với Destructuring, truyền tham số : Spread là đối số để giải ngoặc

//______Tagged template literals
//Mong muốn in đậm các biến nội suy trong chuỗi
            //[first,...strings] đang dùng Destructuring vì phần tử đầu là mảng
function highlight([first, ...strings], ...values){  //Truyền tham số Rest lấy tất cả các đối số, Rest trả về mảng
    return values.reduce(
        (acc, curr) => [...acc, `<span>${curr}</span>`, strings.shift()],
        [first]
    ).join(''); 
}
var brand = 'TMA';
var course = 'JavaScript';
const html = highlight`Học lập trình ${course} tại ${brand} !`; //Cú pháp như truyền đối số vào hàm trong đó các chuỗi thành các phần tử của phần tử đầu tiên của mảng Rest (mẩng con trong mảng), các biến nội suy thành các phần tử riêng
console.log(html);


//____Module trong ES6 (import, export)
// import kkk, {     //Dùng Destructuring để lấy nhiều giá trị export vì bên kia trả về kiểu 1 đối tượng
//     TYPE_LOG,     
//     TYPE_WARM,
//     TYPE_ERROR
// } from './TestModule.js';
// kkk('thong bao',TYPE_WARM);

//Hoặc import tất cả qua: 
// import * as TenTuDat from './TestModule.js';
//Với as để đổi tên, kiểu trả về là 1 object

//______Optional chaining (cú pháp "?.", dùng khi ví dụ nhận được dữ lieeuh từ DB, API mà ko chắc có)
var obj100 = {
    name: 'Son',
    cat: {
        name: 'Bac',
        cat2: {
            name: 'Dung'
        }
    },
    getname(value) {
        console.log(value);
    }
};
if(obj100.cat?.cat2) {   //ko có dấu ? khi ko có Cat sẽ bị lỗi
    console.log(obj100.cat.cat2.name);
}
obj100.getname?.('chao ban');

//______Promise : giải quyết bất đồng bộ và Callbackhell
var promise = new Promise(function(resolve, reject) { //Truyền vào callback, resolve thực hiện khi thành công, reject thực hiện khi thất bại
    resolve('8888');
    //reject('Có lỗi');
});

promise
    .then(function(data) {   //Truyền vào callback nhận giá trị từ Resolve
        console.log(data); 
    })
    .catch(function(fail) {
        console.log(fail);   //Truyền vào callback nhận giá trị từ Reject
    })
    .finally(function() {
        console.log('Done');   //Truyền vào callback trả về giá trị bất kì, được gọi cả khi có Resolve hoặc Reject
    })

    //Khai báo ngắn gọn với Promise.resolve khi Chỉ thành công  //Tương tự chi Reject
var promiseKhac = Promise.resolve('8888 khác');  
promiseKhac
    .then(function(data) {
        console.log(data);
    })

    //Với Promise.all để cho thực hiện đồng bộ : ví dụ qua 3s để thực hiện cùng lúc 2 cái dưới
var promise1 = new Promise(function(resolve) {
    setTimeout(function() {
        resolve([1]);
    }, 2000)
})

var promise2 = new Promise(function(resolve) {
    setTimeout(function() {
        resolve([2,3]);
    }, 3000)
})

Promise.all([promise1,promise2])    //Trả về mảng
    .then (function(data) {
        var data1 = data[0];
        var data2 = data[1];

        console.log(data1.concat(data2))
    })

    //Giải bài toán đếm từ 1 đến 3 sau mỗi giây mới hiển thị
    function sleep(ms) {
        return new Promise(function(resolve) {  //Trả về Promise nên có thể .then
            setTimeout(resolve, ms)                     //Trong Promise cũng có thể truyền vào thời gian chờ như setTimeout
        });
    }

    sleep(1000)
        .then(function() {
            console.log(1);
            return sleep(1000);  //Lại trả về Promise. Nên cái .Then ở dưới sẽ thực hiện cái Promise này. Cơ chế lồng nhau
        })
        .then(function() {
            console.log(2);
            return sleep(1000);
        })
        .then(function() {
            console.log(3);
            return sleep(1000);
        });

        //Chú ý: .then thực hiện lần lượt từ trên xuống khi ko có reject
        //.then phía sau nhận dữ liệu trả về từ .them phía trên nếu có
        //.then phía trước trả về Promise thì .then phía sau sẽ chờ thực hiện xong Promise đó và thực hiện Resolve của Promise mới đó  (lồng nhau)
//Ví dụ
var mypromise = new Promise(function(resolve) {
    resolve();
})


mypromise
    .then(function() {
        return 1;
    })
    .then(function(datatruoc) {  //Đối số datatruoc là nhận từ .then phía trên
        console.log(datatruoc);
        return 2;
    })
    .then(function(datatruoc) {  
        console.log(datatruoc);
        return 3;
    })
    .then(function(datatruoc) {   //Kết quả trả về từ 1 đến 3
        console.log(datatruoc);
    });

  

    var a = [1,2,3]
    var b = a.map(function(phantu) { 
        return phantu;
    }) //callback là hàm, và làm đối số
    console.log(b);

