//Thư viện Webpack để tạo reacjs: Module hóa, Minin file ra sản phẩm cuối tối ưu
//babel chuyển đồi es6 sang es5, jsx sang javascript
//npx trỏ tới file bin trong npm, giúp cài create-react-app trên trang chủ về, mà ko cần cài create-react-app về
//Yarn và npm đều quản lý những thư viện viết bằng javascripts
    //Với yarn thì có file yarn lock còn npm thì package-lock.json
    //file lock để quản lý các thư viện (dự án) của tất cả, giúp reset lại khi xóa file Node_module
        //cài lại thư viện với yarn là gõ: yarn  //Nhanh hơn npm
        //với npm là gõ: npm i
    //file package.jscon chứa các file dự án trong Node_module, 1 dự án lại chứa các dự án con trong đó
    //yarn tốc độ nhanh, bộ nhớ tốn hơn
//file .gitgnore : giúp bỏ qua các file khi đưa lên Git như bỏ file thư viện Node_module vì nó rất nặng, và file package.js và file lock đã lưu lại các thư viện đó rồi
//Sau khi chạy start tạo nên file built để đưa cho khách hàng, đưa thư mục lên hosting là chạy rồi
    //Built tương tự như source code ở dưới, được minin file chính là file khác hàng sẽ dùng

//file src/index.js : file webpack sẽ trỏ vào, đọc nội dung và render, nơi viết code react. Viết trong App.js, chia làm nhiều file import, export, 
    //Chứa các file css bình thường, được webpack module hóa
    //Các file mặc định thường xóa đi đẻ theo cấu trúc của mình
