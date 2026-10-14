# StudyPath AI — Trang Quản lý học phần (Quản trị viên)

Bài kiểm tra giữa kỳ — Học phần **CSE122: Phát triển ứng dụng Web cơ bản**

Sinh viên thực hiện: **Nguyễn Tuân**

## Tên đề tài

**StudyPath AI** — Hệ thống hỗ trợ sinh viên lập lộ trình học tập và quản lý chương trình đào tạo.

## Tên trang đã thực hiện

**Quản lý học phần** — giao diện dành cho Quản trị viên (Admin).

## Mục đích của trang

Trang cho phép quản trị viên quản lý danh mục học phần của 6 chương trình đào tạo (CNTT, KHMT, KTPM, HTTT, ATTT, KHDL): xem, tìm kiếm, lọc, thêm mới, chỉnh sửa và vô hiệu hóa (xóa mềm) học phần. Học phần bị vô hiệu hóa không còn chọn được khi sinh viên đăng ký nhưng vẫn giữ nguyên dữ liệu.

## Các chức năng chính

- Hiển thị danh sách 128 học phần sinh từ dữ liệu mẫu, có phân trang (5 học phần/trang) và skeleton loading.
- **Tìm kiếm** theo mã hoặc tên học phần (ô lọc và ô tìm kiếm trên thanh công cụ đồng bộ với nhau).
- **Lọc** theo chương trình đào tạo và trạng thái (Đang mở / Tạm ngưng).
- **Thêm / Sửa học phần** qua modal, có kiểm tra dữ liệu hợp lệ (form validation): mã đúng định dạng 2 chữ cái + 4 chữ số, không trùng, tên tối thiểu 3 ký tự, số tín chỉ nguyên từ 1–15.
- **Chọn học phần tiên quyết** nhiều mục qua chip có thể thêm/bỏ.
- **Vô hiệu hóa / Mở lại** (xóa mềm) kèm hộp thoại xác nhận.
- Toast thông báo kết quả thao tác, trạng thái rỗng khi không tìm thấy kết quả, responsive cơ bản theo thiết kế.

## Công nghệ sử dụng

- HTML5 (semantic HTML: `header`, `nav`, `aside`, `main`, `section`, `form`...)
- CSS3 (Flexbox, CSS Grid, CSS Variables, Media Query responsive)
- JavaScript thuần (ES5/ES6): DOM manipulation, Array methods, event handling, render dữ liệu từ mảng
- Không dùng framework, không backend

## Link Figma

<https://www.figma.com/design/lxB95UBcKptvDZUvXqgzfS/course-management?node-id=0-1&t=7hH1B7NJA0p6HKtc-1>

## Link video trình bày

> *(Điền link video ~3 phút sau khi quay, tên video: `CSE122-GK-SVxx-NguyenTuan-CourseManagement`)*

## Link GitHub

<https://github.com/nguyentuan-creator/CSE122-GK-NguyenTuan-CourseManagement>

## Cấu trúc thư mục

```
project/
├── index.html          # Trang Quản lý học phần
├── css/
│   ├── base.css        # Design system dùng chung (tokens, nút, form, bảng, modal...)
│   ├── responsive.css  # Responsive bổ sung
│   └── style.css       # CSS riêng của trang
├── js/
│   └── main.js         # Dữ liệu mẫu + toàn bộ logic tương tác
├── assets/
└── README.md
```

## Cách chạy

Mở trực tiếp file `index.html` bằng trình duyệt (không cần server).
