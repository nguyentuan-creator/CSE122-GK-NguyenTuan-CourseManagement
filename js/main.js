/* =========================================================
   StudyPath AI — JS trang Quản lý học phần (Admin)
   Chức năng: sinh 128 học phần từ 6 chương trình đào tạo (khớp
   miền dữ liệu trang Catalog), tìm kiếm, lọc (chương trình /
   trạng thái), phân trang, thêm / sửa học phần qua modal kèm
   kiểm tra hợp lệ, vô hiệu hóa (xóa mềm) / mở lại, toast thông báo.
   ========================================================= */

/* ===== 1. DỮ LIỆU GỐC: 6 chương trình đào tạo ===== */
const PROGRAMS = [
  {
    name: "Công nghệ thông tin",
    prefix: "IT",
    short: "CNTT",
    label: "CNTT (K17)",
    faculty: "Khoa Công nghệ thông tin",
    levels: [
      ["Nhập môn lập trình", "Kỹ thuật lập trình", "Kiến trúc máy tính", "Hệ điều hành", "Kỹ thuật số"],
      ["Lập trình hướng đối tượng", "Lập trình web cơ bản", "Lập trình thiết bị di động", "Đồ họa máy tính"],
      ["Lập trình nâng cao", "Xử lý ảnh số", "Truyền thông dữ liệu", "Khai thác dữ liệu", "Hệ thống nhúng", "Cơ sở dữ liệu"],
      ["Hệ thống phân tán", "Thiết kế phần mềm", "Quản lý dự án CNTT", "Cấu trúc dữ liệu và giải thuật"],
      ["Điện toán đám mây", "Internet vạn vật", "Điện toán di động", "Bảo mật mạng", "Đồ án công nghệ thông tin", "Mạng máy tính"]
    ]
  },
  {
    name: "Khoa học máy tính",
    prefix: "MA",
    short: "KHMT",
    label: "Toán - Tin",
    faculty: "Khoa Toán — Tin",
    levels: [
      ["Giải tích 1", "Giải tích 2", "Đại số tuyến tính", "Nhập môn khoa học máy tính"],
      ["Toán rời rạc", "Xác suất thống kê", "Lý thuyết đồ thị", "Tối ưu hóa"],
      ["Trí tuệ nhân tạo", "Học máy", "Logic tính toán", "Lý thuyết automata", "Độ phức tạp tính toán"],
      ["Học sâu", "Xử lý ngôn ngữ tự nhiên", "Thị giác máy tính", "Mạng nơ-ron"],
      ["Đồ án khoa học máy tính", "Chuyên đề học máy", "Hệ chuyên gia", "Kho dữ liệu"]
    ]
  },
  {
    name: "Kỹ thuật phần mềm",
    prefix: "SE",
    short: "KTPM",
    label: "KTPM (K17)",
    faculty: "Khoa Công nghệ thông tin",
    levels: [
      ["Nhập môn kỹ thuật phần mềm", "Lập trình Python", "Phân tích yêu cầu", "Kỹ năng giao tiếp"],
      ["Lập trình Java", "Thiết kế giao diện người dùng", "Quản lý cấu hình", "Kiểm thử phần mềm"],
      ["Kiểu mẫu thiết kế", "Kiến trúc phần mềm", "Tích hợp hệ thống", "Quản lý chất lượng"],
      ["DevOps cơ bản", "Tự động hóa kiểm thử", "Quản trị mã nguồn", "Triển khai phần mềm"],
      ["Đồ án kỹ thuật phần mềm", "Thực tập doanh nghiệp", "Quản trị dự án phần mềm", "Chuyên đề Agile", "Đồ án tốt nghiệp"]
    ]
  },
  {
    name: "Hệ thống thông tin",
    prefix: "IS",
    short: "HTTT",
    label: "HTTT (K17)",
    faculty: "Khoa Hệ thống thông tin",
    levels: [
      ["Nhập môn hệ thống thông tin", "Tin học văn phòng", "Kinh tế học vi mô", "Quản trị học"],
      ["Cơ sở dữ liệu quản trị", "Hệ thống thông tin quản lý", "Phân tích thiết kế HTTT", "Kế toán quản trị"],
      ["Hệ quản trị cơ sở dữ liệu", "Kho dữ liệu", "Trí tuệ kinh doanh", "Mạng doanh nghiệp"],
      ["Hệ thống ERP", "Quản trị quy trình nghiệp vụ", "An toàn hệ thống thông tin", "Phân tích dữ liệu"],
      ["Đồ án hệ thống thông tin", "Chuyên đề chuyển đổi số", "Quản trị dự án CNTT", "Kiến trúc doanh nghiệp", "Đồ án tốt nghiệp"]
    ]
  },
  {
    name: "An toàn thông tin",
    prefix: "AT",
    short: "ATTT",
    label: "ATTT (K17)",
    faculty: "Khoa An toàn thông tin",
    levels: [
      ["Nhập môn an toàn thông tin", "Tin học pháp lý", "Mật mã sơ cấp", "Quản lý rủi ro"],
      ["Mật mã học ứng dụng", "An toàn hệ điều hành", "An toàn web", "Điều tra số"],
      ["An toàn mạng", "Kỹ thuật kiểm tra xâm nhập", "Phân tích mã độc", "Bảo mật đám mây"],
      ["Giám sát an ninh", "Khôi phục sự cố", "An toàn ứng dụng di động", "Pháp chế an ninh mạng"],
      ["Đồ án an toàn thông tin", "Chuyên đề phòng chống tấn công", "Quản trị an toàn thông tin", "Thực tập an ninh mạng"]
    ]
  },
  {
    name: "Khoa học dữ liệu",
    prefix: "DA",
    short: "KHDL",
    label: "KHDL (K17)",
    faculty: "Khoa Khoa học dữ liệu & AI",
    levels: [
      ["Nhập môn khoa học dữ liệu", "Lập trình R", "Thống kê mô tả", "Thu thập dữ liệu"],
      ["Làm sạch dữ liệu", "Trực quan hóa dữ liệu", "Học máy cơ sở", "Xác suất cho dữ liệu"],
      ["Khai phá dữ liệu", "Học sâu cơ sở", "Dữ liệu lớn", "Xử lý ngôn ngữ tự nhiên ứng dụng"],
      ["Hệ thống khuyến nghị", "Dữ liệu chuỗi thời gian", "Thực nghiệm A/B", "Kỹ thuật đặc trưng"],
      ["Đồ án khoa học dữ liệu", "Chuyên đề trí tuệ nhân tạo", "Triển khai mô hình", "Đạo đức dữ liệu"]
    ]
  }
];

/* Học phần tạm ngưng để trình diễn bộ lọc + nút "Mở lại" */
const PAUSED_CODES = new Set(["IT5060", "IT3030", "MA4010"]);

/* Dữ liệu khớp thiết kế Figma: 5 dòng hiển thị ở trang 1, nhãn và ngày cập nhật riêng */
const FIGMA_PAGE_ONE = ["IT1010", "IT1020", "IT3060", "IT5060", "MA2010"];
const FIGMA_LABELS = { IT3060: "CNTT - HTTT" };
const FIGMA_DATES = {
  IT1010: [2026, 9, 1],
  IT1020: [2026, 7, 28],
  IT3060: [2026, 8, 25],
  IT5060: [2026, 8, 20],
  MA2010: [2026, 8, 15]
};

/* Chu kỳ tín chỉ lặp lại cho từng học phần */
const CREDIT_PATTERN = [3, 4, 3, 3, 3];

/* Tên loại học phần */
const TYPE_ELECTIVE = "Tự chọn";
const TYPE_REQUIRED = "Bắt buộc";

/* ===== 2. SINH DANH SÁCH 128 HỌC PHẦN ===== */
function buildCourses() {
  const list = [];
  let id = 0;

  PROGRAMS.forEach(function (program) {
    let prevCode = "";

    program.levels.forEach(function (names, levelIndex) {
      names.forEach(function (name, k) {
        id++;

        /* Mã: TIỀN TỐ + MỨC + SỐ THỨ TỰ + "0", ví dụ IT1010 */
        const code = program.prefix + (levelIndex + 1) + String(k + 1).padStart(2, "0") + "0";

        /* Tiên quyết: học phần liền trước trong chương trình + Toán rời rạc (MA2010) */
        const prereqs = [];
        if (prevCode !== "") {
          prereqs.push(prevCode);
          if (k >= 1 && program.prefix !== "MA") {
            prereqs.push("MA2010");
          }
        }

        /* Ngày cập nhật: 5 dòng đầu lấy đúng ngày trong Figma, còn lại sinh theo id */
        let updated;
        if (FIGMA_DATES[code]) {
          updated = new Date(FIGMA_DATES[code][0], FIGMA_DATES[code][1], FIGMA_DATES[code][2]);
        } else {
          const dayOffset = (id * 7) % 55; // cách ngày hiện tại tối đa ~8 tuần
          updated = new Date(2026, 9, 14);
          updated.setDate(updated.getDate() - dayOffset);
        }

        list.push({
          id: id,
          code: code,
          name: name,
          credits: CREDIT_PATTERN[(id - 1) % CREDIT_PATTERN.length],
          type: /^(Chuyên đề|Thực tập)/.test(name) ? TYPE_ELECTIVE : TYPE_REQUIRED,
          program: program.short,
          label: FIGMA_LABELS[code] || program.label,
          programName: program.name,
          faculty: program.faculty,
          description: "Học phần " + name + " thuộc chương trình " + program.name + ".",
          prereqs: prereqs,
          status: PAUSED_CODES.has(code) ? "suspended" : "open",
          updatedAt: updated
        });

        prevCode = code;
      });
    });
  });

  return list;
}

let courses = buildCourses();

/* Đưa đúng 5 dòng trang 1 của Figma lên đầu, giữ nguyên thứ tự phần còn lại */
const featuredRows = FIGMA_PAGE_ONE.map(function (code) {
  return courses.find(function (c) {
    return c.code === code;
  });
}).filter(Boolean);
courses = featuredRows.concat(courses.filter(function (c) {
  return FIGMA_PAGE_ONE.indexOf(c.code) === -1;
}));

let nextId = courses.length + 1;

/* ===== 3. TRẠNG THÁI ỨNG DỤNG ===== */
const state = {
  query: "",
  program: "",
  status: "",
  page: 1,
  pageSize: 5
};

let editingId = null; // null = đang thêm mới
let prereqDraft = []; // mã tiên quyết đang chọn trong modal

/* ===== 4. THAM CHIẾU CÁC PHẦN TỬ DOM ===== */
const el = {
  tbody: document.getElementById("courseTbody"),
  tableWrapper: document.querySelector(".table-wrapper"),
  emptyState: document.getElementById("emptyState"),
  showingText: document.getElementById("showingText"),
  subtitle: document.getElementById("pageSubtitle"),
  searchInput: document.getElementById("searchInput"),
  globalSearch: document.getElementById("globalSearch"),
  programFilter: document.getElementById("programFilter"),
  statusFilter: document.getElementById("statusFilter"),
  filterForm: document.getElementById("filterForm"),
  pagination: document.getElementById("pagination"),
  btnAdd: document.getElementById("btnAdd"),
  btnReset: document.getElementById("btnReset"),
  modal: document.getElementById("courseModal"),
  modalTitle: document.getElementById("modalTitle"),
  form: document.getElementById("courseForm"),
  editingId: document.getElementById("editingId"),
  code: document.getElementById("courseCode"),
  name: document.getElementById("courseName"),
  credits: document.getElementById("courseCredits"),
  type: document.getElementById("courseType"),
  desc: document.getElementById("courseDesc"),
  prereqChips: document.getElementById("prereqChips"),
  prereqSelect: document.getElementById("prereqSelect"),
  btnCloseModal: document.getElementById("btnCloseModal"),
  btnCancel: document.getElementById("btnCancel"),
  errCode: document.getElementById("errCode"),
  errName: document.getElementById("errName"),
  errCredits: document.getElementById("errCredits"),
  toastStack: document.getElementById("toastStack")
};

/* ===== 5. TIỆN ÍCH ===== */
function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return dd + "/" + mm + "/" + date.getFullYear();
}

/* Thoát ký tự đặc biệt để chèn dữ liệu vào HTML an toàn */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function statusLabel(status) {
  return status === "open" ? "Đang mở" : "Tạm ngưng";
}

/* Thông báo nhỏ góc màn hình, tự biến mất sau ~2.5 giây */
function showToast(message, isError) {
  const toast = document.createElement("div");
  toast.className = "toast" + (isError ? " toast-error" : "");
  toast.textContent = message;
  el.toastStack.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("hide");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 2500);
}

/* ===== 6. LỌC VÀ PHÂN TRANG ===== */
function getFilteredCourses() {
  const query = state.query.trim().toLowerCase();

  return courses.filter(function (course) {
    const matchQuery = query === "" ||
      course.code.toLowerCase().includes(query) ||
      course.name.toLowerCase().includes(query);
    const matchProgram = state.program === "" || course.programName === state.program;
    const matchStatus = state.status === "" || course.status === state.status;
    return matchQuery && matchProgram && matchStatus;
  });
}

function getTotalPages(totalItems) {
  return Math.max(1, Math.ceil(totalItems / state.pageSize));
}

/* ===== 7. RENDER ===== */
/* 7a. Đổ danh sách chương trình vào ô lọc */
function renderProgramOptions() {
  PROGRAMS.forEach(function (program) {
    const option = document.createElement("option");
    option.value = program.name;
    option.textContent = program.name;
    el.programFilter.appendChild(option);
  });
}

/* 7b. Một dòng của bảng */
function rowHtml(course) {
  const statusTag = course.status === "open"
    ? '<span class="tag tag-green">Đang mở</span>'
    : '<span class="tag tag-gray">Tạm ngưng</span>';

  /* Học phần đang mở: Sửa + Vô hiệu hóa; tạm ngưng: chỉ Mở lại */
  const actions = course.status === "open"
    ? '<button type="button" class="btn-link" data-action="edit" data-id="' + course.id + '">Sửa</button>' +
      '<button type="button" class="btn-pill btn-pill-danger" data-action="toggle" data-id="' + course.id + '">Vô hiệu hóa</button>'
    : '<button type="button" class="btn-pill btn-pill-success" data-action="toggle" data-id="' + course.id + '">Mở lại</button>';

  return (
    '<tr class="' + (course.status === "suspended" ? "row-suspended" : "") + '">' +
      '<td class="cell-code">' + escapeHtml(course.code) + "</td>" +
      '<td class="cell-name">' + escapeHtml(course.name) + "</td>" +
      '<td class="td-center">' + course.credits + "</td>" +
      "<td>" + escapeHtml(course.label || course.program) + "</td>" +
      "<td>" + statusTag + "</td>" +
      "<td>" + formatDate(course.updatedAt) + "</td>" +
      '<td class="row-actions">' + actions + "</td>" +
    "</tr>"
  );
}

/* 7c. Toàn bộ bảng + trạng thái rỗng */
function renderTable() {
  const filtered = getFilteredCourses();
  const totalPages = getTotalPages(filtered.length);

  /* Giữ trang hiện tại hợp lệ (ví dụ vừa xóa / lọc hết dữ liệu ở trang cuối) */
  if (state.page > totalPages) {
    state.page = totalPages;
  }

  const start = (state.page - 1) * state.pageSize;
  const pageItems = filtered.slice(start, start + state.pageSize);

  el.tbody.innerHTML = pageItems.map(rowHtml).join("");

  /* Trạng thái rỗng */
  const isEmpty = filtered.length === 0;
  el.emptyState.classList.toggle("hidden", !isEmpty);
  el.tableWrapper.classList.toggle("is-empty", isEmpty);

  /* Dòng "Hiển thị X trong Y học phần" */
  if (isEmpty) {
    el.showingText.textContent = "Không có kết quả";
  } else {
    const from = start + 1;
    const to = start + pageItems.length;
    el.showingText.textContent = "Hiển thị " + from + "–" + to + " trong " + filtered.length + " học phần";
  }
}

/* 7d. Thanh phân trang: ‹ 1 2 3 … 26 › */
function renderPagination() {
  const totalPages = getTotalPages(getFilteredCourses().length);
  const current = state.page;
  let parts = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      parts.push(i);
    }
  } else {
    parts.push(1, 2, 3);
    if (current > 4) parts.push("…");
    if (current >= 4 && current <= totalPages - 1) {
      parts.push(current);
    }
    if (current < totalPages - 2) parts.push("…");
    parts.push(totalPages);
  }

  let html = '<button type="button" class="page-btn" data-page="prev" aria-label="Trang trước"' +
    (current === 1 ? " disabled" : "") + ">‹</button>";

  parts.forEach(function (item) {
    if (item === "…") {
      html += '<span class="page-dots" aria-hidden="true">…</span>';
    } else {
      html += '<button type="button" class="page-btn' + (item === current ? " active" : "") +
        '" data-page="' + item + '"' + (item === current ? ' aria-current="page"' : "") +
        ">" + item + "</button>";
    }
  });

  html += '<button type="button" class="page-btn" data-page="next" aria-label="Trang sau"' +
    (current === totalPages ? " disabled" : "") + ">›</button>";

  el.pagination.innerHTML = html;
}

/* 7e. Dòng tiêu đề phụ: "128 học phần · 8 tạm ngưng" */
function renderSubtitle() {
  const paused = courses.filter(function (c) {
    return c.status === "suspended";
  }).length;
  el.subtitle.textContent = courses.length + " học phần · " + paused + " tạm ngưng";
}

function render() {
  renderTable();
  renderPagination();
  renderSubtitle();
}

/* ===== 8. MODAL THÊM / SỬA ===== */
/* Danh sách chọn tiên quyết: học phần đang mở, chưa chọn, không phải chính nó */
function renderPrereqSelect() {
  const chosen = new Set(prereqDraft);
  const options = courses.filter(function (course) {
    return course.status === "open" &&
      course.id !== editingId &&
      !chosen.has(course.code);
  });

  let html = '<option value="">+ Thêm tiên quyết</option>';
  options.forEach(function (course) {
    html += '<option value="' + course.code + '">' +
      escapeHtml(course.code + " — " + course.name) + "</option>";
  });
  el.prereqSelect.innerHTML = html;
}

/* Các chip hiển thị tiên quyết đã chọn */
function renderPrereqChips() {
  el.prereqChips.innerHTML = prereqDraft.map(function (code) {
    return '<span class="chip">' + escapeHtml(code) +
      '<button type="button" class="chip-remove" data-code="' + code +
      '" aria-label="Bỏ ' + code + '">×</button></span>';
  }).join("");
}

function resetFormErrors() {
  [el.code, el.name, el.credits].forEach(function (input) {
    input.classList.remove("is-invalid");
  });
  [el.errCode, el.errName, el.errCredits].forEach(function (err) {
    err.classList.add("hidden");
    err.textContent = "";
  });
}

function setError(input, errEl, message) {
  input.classList.add("is-invalid");
  errEl.textContent = message;
  errEl.classList.remove("hidden");
}

function openModal(course) {
  editingId = course ? course.id : null;
  prereqDraft = course ? course.prereqs.slice() : [];

  el.form.reset();
  resetFormErrors();
  el.editingId.value = editingId || "";

  el.modalTitle.textContent = editingId ? "Sửa học phần" : "Thêm học phần";

  if (course) {
    el.code.value = course.code;
    el.name.value = course.name;
    el.credits.value = course.credits;
    el.type.value = course.type;
    el.desc.value = course.description;
  }

  renderPrereqChips();
  renderPrereqSelect();
  el.modal.classList.remove("hidden");
  el.code.focus();
}

function closeModal() {
  el.modal.classList.add("hidden");
  editingId = null;
  prereqDraft = [];
}

/* ===== 9. KIỂM TRA HỢP LỆ + LƯU ===== */
function validateForm() {
  resetFormErrors();
  let isValid = true;

  const code = el.code.value.trim().toUpperCase();
  const name = el.name.value.trim();
  const credits = Number(el.credits.value);

  /* Mã: bắt buộc, đúng dạng 2 chữ + 4 số (VD: IT1010), thuộc chương trình, không trùng */
  if (code === "") {
    setError(el.code, el.errCode, "Vui lòng nhập mã học phần");
    isValid = false;
  } else if (!/^[A-Z]{2}\d{4}$/.test(code)) {
    setError(el.code, el.errCode, "Mã học phần gồm 2 chữ cái + 4 chữ số, VD: IT1010");
    isValid = false;
  } else if (!PROGRAMS.some(function (p) { return p.prefix === code.slice(0, 2); })) {
    setError(el.code, el.errCode, "Tiền tố mã phải thuộc 1 chương trình: IT, MA, SE, IS, AT, DA");
    isValid = false;
  } else if (courses.some(function (c) { return c.code === code && c.id !== editingId; })) {
    setError(el.code, el.errCode, "Mã học phần này đã tồn tại");
    isValid = false;
  }

  /* Tên: bắt buộc, tối thiểu 3 ký tự */
  if (name.length < 3) {
    setError(el.name, el.errName, "Tên học phần tối thiểu 3 ký tự");
    isValid = false;
  }

  /* Tín chỉ: số nguyên từ 1 đến 15 */
  if (!Number.isInteger(credits) || credits < 1 || credits > 15) {
    setError(el.credits, el.errCredits, "Số tín chỉ phải là số nguyên từ 1 đến 15");
    isValid = false;
  }

  return isValid;
}

function saveCourse(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const code = el.code.value.trim().toUpperCase();
  const program = PROGRAMS.find(function (p) {
    return p.prefix === code.slice(0, 2);
  });
  const today = new Date();

  if (editingId) {
    /* Sửa học phần có sẵn */
    const course = courses.find(function (c) {
      return c.id === editingId;
    });
    course.code = code;
    course.name = el.name.value.trim();
    course.credits = Number(el.credits.value);
    course.type = el.type.value;
    course.description = el.desc.value.trim();
    course.prereqs = prereqDraft.slice();
    /* Mã đổi tiền tố thì chương trình / khoa đổi theo */
    course.program = program.short;
    course.label = FIGMA_LABELS[code] || program.label;
    course.programName = program.name;
    course.faculty = program.faculty;
    course.updatedAt = today;
    showToast("Đã cập nhật học phần " + code);
  } else {
    /* Thêm mới */
    courses.unshift({
      id: nextId++,
      code: code,
      name: el.name.value.trim(),
      credits: Number(el.credits.value),
      type: el.type.value,
      program: program.short,
      label: FIGMA_LABELS[code] || program.label,
      programName: program.name,
      faculty: program.faculty,
      description: el.desc.value.trim() || "Học phần " + el.name.value.trim() + ".",
      prereqs: prereqDraft.slice(),
      status: "open",
      updatedAt: today
    });
    showToast("Đã thêm học phần " + code);
  }

  closeModal();
  render();
}

/* ===== 10. VÔ HIỆU HÓA / MỞ LẠI (XÓA MỀM) ===== */
function toggleStatus(id) {
  const course = courses.find(function (c) {
    return c.id === id;
  });
  if (!course) return;

  const message = course.status === "open"
    ? 'Vô hiệu hóa "' + course.name + '"? Học phần sẽ không còn chọn được nhưng vẫn giữ dữ liệu.'
    : 'Mở lại "' + course.name + '"?';

  if (!window.confirm(message)) {
    return;
  }

  course.status = course.status === "open" ? "suspended" : "open";
  course.updatedAt = new Date();
  showToast(course.status === "open"
    ? "Đã mở lại " + course.code
    : "Đã vô hiệu hóa " + course.code);
  render();
}

/* ===== 11. GÁN SỰ KIỆN ===== */
/* Nút Thêm học phần */
el.btnAdd.addEventListener("click", function () {
  openModal(null);
});

/* Đóng modal: nút ×, nút Hủy, bấm nền mờ, phím Esc */
el.btnCloseModal.addEventListener("click", closeModal);
el.btnCancel.addEventListener("click", closeModal);
el.modal.addEventListener("click", function (event) {
  if (event.target === el.modal) {
    closeModal();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !el.modal.classList.contains("hidden")) {
    closeModal();
  }
});

/* Nút Sửa / Vô hiệu hóa / Mở lại trong bảng (gán 1 lần ở tbody) */
el.tbody.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  if (button.dataset.action === "edit") {
    const course = courses.find(function (c) {
      return c.id === id;
    });
    openModal(course);
  } else if (button.dataset.action === "toggle") {
    toggleStatus(id);
  }
});

/* Chọn / bỏ tiên quyết trong modal */
el.prereqSelect.addEventListener("change", function () {
  const code = el.prereqSelect.value;
  if (code !== "") {
    prereqDraft.push(code);
    renderPrereqChips();
    renderPrereqSelect();
  }
});
el.prereqChips.addEventListener("click", function (event) {
  const button = event.target.closest(".chip-remove");
  if (!button) return;
  prereqDraft = prereqDraft.filter(function (code) {
    return code !== button.dataset.code;
  });
  renderPrereqChips();
  renderPrereqSelect();
});

/* Lưu form trong modal */
el.form.addEventListener("submit", saveCourse);

/* Bộ lọc: nút Lọc hoặc nhấn Enter */
el.filterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  state.query = el.searchInput.value;
  state.program = el.programFilter.value;
  state.status = el.statusFilter.value;
  state.page = 1;
  render();
});

/* Đổi select cũng lọc luôn cho tiện */
el.programFilter.addEventListener("change", function () {
  el.filterForm.requestSubmit();
});
el.statusFilter.addEventListener("change", function () {
  el.filterForm.requestSubmit();
});

/* Gõ từ khóa lọc ngay, đồng thời đồng bộ 2 ô tìm kiếm (bộ lọc + thanh trên cùng) */
el.searchInput.addEventListener("input", function () {
  el.globalSearch.value = el.searchInput.value;
  state.query = el.searchInput.value;
  state.page = 1;
  render();
});
el.globalSearch.addEventListener("input", function () {
  el.searchInput.value = el.globalSearch.value;
  state.query = el.globalSearch.value;
  state.page = 1;
  render();
});

/* Nút Đặt lại bộ lọc ở trạng thái rỗng */
el.btnReset.addEventListener("click", function () {
  el.searchInput.value = "";
  el.globalSearch.value = "";
  el.programFilter.value = "";
  el.statusFilter.value = "";
  state.query = "";
  state.program = "";
  state.status = "";
  state.page = 1;
  render();
});

/* Bấm số trang */
el.pagination.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-page]");
  if (!button || button.disabled) return;

  const totalPages = getTotalPages(getFilteredCourses().length);
  let page = state.page;

  if (button.dataset.page === "prev") {
    page = state.page - 1;
  } else if (button.dataset.page === "next") {
    page = state.page + 1;
  } else {
    page = Number(button.dataset.page);
  }

  state.page = Math.min(Math.max(1, page), totalPages);
  render();
});

/* ===== 12. KHỞI ĐỘNG: skeleton giả lập đang tải, rồi render thật ===== */
renderProgramOptions();

el.tbody.innerHTML = Array.from({ length: state.pageSize }, function () {
  return '<tr><td colspan="7"><div class="skeleton">&nbsp;</div></td></tr>';
}).join("");

setTimeout(function () {
  render();
}, 400);
