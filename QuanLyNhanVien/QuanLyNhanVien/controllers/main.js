document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM đã được tải");

    // Lấy tất cả các nút
    const buttons = document.querySelectorAll("button");

    // Thêm sự kiện click cho tất cả các nút
    buttons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Ngăn chặn tải lại trang
        });
    });
});



// Khởi tạo danh sách nhân viên
let danhSachNhanVien = [];

// Đối tượng nhân viên
class NhanVien {
    constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = luongCoBan;
        this.chucVu = chucVu;
        this.gioLam = gioLam;
        this.tongLuong = this.tinhTongLuong();
        this.loaiNhanVien = this.xepLoaiNhanVien();
    }

    // Tính tổng lương
    tinhTongLuong() {
        let heSoLuong = 1;
        if (this.chucVu === "Giám đốc") {
            heSoLuong = 3;
        } else if (this.chucVu === "Trưởng phòng") {
            heSoLuong = 2;
        }
        return this.luongCoBan * heSoLuong;
    }

    // Xếp loại nhân viên
    xepLoaiNhanVien() {
        if (this.gioLam >= 192) {
            return "Xuất sắc";
        } else if (this.gioLam >= 176) {
            return "Giỏi";
        } else if (this.gioLam >= 160) {
            return "Khá";
        } else {
            return "Trung bình";
        }
    }
}

// Kiểm tra hợp lệ
function kiemTraHopLe() {
    const taiKhoan = document.getElementById("tknv").value;
    const hoTen = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const matKhau = document.getElementById("password").value;
    const ngayLam = document.getElementById("datepicker").value;
    const luongCoBan = +(document.getElementById("luongCB").value);
    const chucVu = document.getElementById("chucvu").value;
    const gioLam = +(document.getElementById("gioLam").value);

    const taiKhoanRegex = /^[0-9]{4,6}$/;
    const hoTenRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const matKhauRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
    const ngayLamRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    if (!taiKhoanRegex.test(taiKhoan)) {
        alert("Tài khoản không hợp lệ (4-6 ký số).");
        return false;
    }
    if (!hoTenRegex.test(hoTen)) {
        alert("Họ tên không hợp lệ (chỉ chứa chữ cái).");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ.");
        return false;
    }
    if (!matKhauRegex.test(matKhau)) {
        alert("Mật khẩu không hợp lệ (6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt).");
        return false;
    }
    if (!ngayLamRegex.test(ngayLam)) {
        alert("Ngày làm không hợp lệ (mm/dd/yyyy).");
        return false;
    }
    if (isNaN(luongCoBan) || luongCoBan < 1000000 || luongCoBan > 20000000) {
        alert("Lương cơ bản không hợp lệ (1,000,000 - 20,000,000).");
        return false;
    }
    if (chucVu !== "Giám đốc" && chucVu !== "Trưởng phòng" && chucVu !== "Nhân viên") {
        alert("Chức vụ không hợp lệ.");
        return false;
    }
    if (isNaN(gioLam) || gioLam < 80 || gioLam > 200) {
        alert("Giờ làm không hợp lệ (80 - 200 giờ).");
        return false;
    }
    return true;
}

// Thêm nhân viên mới
function themNhanVien() {
    if (!kiemTraHopLe()) {
        return;
    }

    const taiKhoan = document.getElementById("tknv").value;
    const hoTen = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const matKhau = document.getElementById("password").value;
    const ngayLam = document.getElementById("datepicker").value;
    const luongCoBan = +(document.getElementById("luongCB").value);
    const chucVu = document.getElementById("chucvu").value;
    const gioLam = +(document.getElementById("gioLam").value);

    const nhanVien = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
    danhSachNhanVien.push(nhanVien);
    hienThiDanhSachNhanVien();
}

// Hiển thị danh sách nhân viên
function hienThiDanhSachNhanVien() {
    const tableDanhSach = document.getElementById("tableDanhSach");
    tableDanhSach.innerHTML = "";

    danhSachNhanVien.forEach((nv, index) => {
        const row = `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNhanVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien(${index})">Xóa</button>
                    <button class="btn btn-primary" onclick="layThongTinNhanVien(${index})">Cập nhật</button>
                </td>
            </tr>
        `;
        tableDanhSach.innerHTML += row;
    });
}

// Xóa nhân viên
function xoaNhanVien(index) {
    danhSachNhanVien.splice(index, 1);
    hienThiDanhSachNhanVien();
}

// Lấy thông tin nhân viên để cập nhật
function layThongTinNhanVien(index) {
    const nhanVien = danhSachNhanVien[index];
    document.getElementById("tknv").value = nhanVien.taiKhoan;
    document.getElementById("name").value = nhanVien.hoTen;
    document.getElementById("email").value = nhanVien.email;
    document.getElementById("password").value = nhanVien.matKhau;
    document.getElementById("datepicker").value = nhanVien.ngayLam;
    document.getElementById("luongCB").value = nhanVien.luongCoBan;
    document.getElementById("chucvu").value = nhanVien.chucVu;
    document.getElementById("gioLam").value = nhanVien.gioLam;

    // Thêm thuộc tính index để biết đang cập nhật nhân viên nào
    document.getElementById("btnCapNhat").dataset.index = index;
}

// Cập nhật nhân viên
function capNhatNhanVien() {
    const index = document.getElementById("btnCapNhat").dataset.index;
    if (index === undefined) {
        alert("Không có nhân viên nào được chọn để cập nhật.");
        return;
    }

    if (!kiemTraHopLe()) {
        return;
    }

    const taiKhoan = document.getElementById("tknv").value;
    const hoTen = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const matKhau = document.getElementById("password").value;
    const ngayLam = document.getElementById("datepicker").value;
    const luongCoBan = +(document.getElementById("luongCB").value);
    const chucVu = document.getElementById("chucvu").value;
    const gioLam = +(document.getElementById("gioLam").value);

    const nhanVien = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
    danhSachNhanVien[index] = nhanVien;
    hienThiDanhSachNhanVien();

    // Xóa thuộc tính index sau khi cập nhật xong
    delete document.getElementById("btnCapNhat").dataset.index;
}

// Tìm nhân viên theo loại
function timNhanVienTheoLoai() {
    const loaiNhanVien = document.getElementById("btnTimNV").value;
    const ketQuaTimKiem = danhSachNhanVien.filter(nv => nv.loaiNhanVien === loaiNhanVien);
    hienThiDanhSachTimKiem(ketQuaTimKiem);
}

// Hiển thị danh sách tìm kiếm
function hienThiDanhSachTimKiem(danhSach) {
    const tableDanhSach = document.getElementById("tableDanhSach");
    tableDanhSach.innerHTML = "";

    danhSach.forEach((nv, index) => {
        const row = `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNhanVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien(${index})">Xóa</button>
                    <button class="btn btn-primary" onclick="layThongTinNhanVien(${index})">Cập nhật</button>
                </td>
            </tr>
        `;
        tableDanhSach.innerHTML += row;
    });
}

// Sự kiện khi nhấn nút "Thêm người dùng"

document.getElementById("btnThemNV").addEventListener("click", themNhanVien);

// Sự kiện khi nhấn nút "Cập nhật"
document.getElementById("btnCapNhat").addEventListener("click", capNhatNhanVien);

// Sự kiện khi nhấn nút "Tìm kiếm"
document.getElementById("btnTimKiem").addEventListener("click", timNhanVienTheoLoai);

