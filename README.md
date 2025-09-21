# Literature Instructional Plan

## Conventional Commits

Conventional Commits là một quy ước để viết commit message có cấu trúc và ý nghĩa rõ ràng, giúp việc quản lý phiên bản và tạo changelog tự động.

### Cấu trúc cơ bản

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Các loại commit hợp lệ

| Type | Mô tả |
|------|-------|
| `feat` | Thêm tính năng mới |
| `fix` | Sửa bug |
| `docs` | Thay đổi tài liệu |
| `style` | Format, convention (không ảnh hưởng logic) |
| `refactor` | Thay đổi code nhưng không thêm tính năng hoặc sửa bug |
| `perf` | Tối ưu performance |
| `test` | Thêm/chỉnh sửa test |
| `chore` | Việc lặt vặt (build, ci, deps...) |

### Ví dụ commit message đúng

```bash
feat(user): add user registration
fix(order): prevent duplicate checkout  
docs(readme): update usage guide
style(header): format navigation menu
refactor(auth): restructure authentication module
perf(database): optimize query performance
test(user): add unit tests for user service
chore(deps): update dependencies to latest version
```

### Quy tắc viết

1. **Type** là bắt buộc và phải là một trong các loại đã định nghĩa
2. **Scope** là tùy chọn, được đặt trong ngoặc đơn để chỉ phạm vi thay đổi
3. **Description** phải viết ở thì hiện tại, không viết hoa chữ cái đầu
4. **Body** và **Footer** là tùy chọn, sử dụng để mô tả chi tiết hơn

### Lợi ích

- ✅ Commit history rõ ràng và dễ đọc
- ✅ Tự động tạo changelog
- ✅ Xác định semantic version bumps
- ✅ Trigger build và publish processes
- ✅ Dễ dàng tìm kiếm và filter commits

### Breaking Changes

Để đánh dấu breaking changes, thêm `!` sau type/scope hoặc sử dụng footer:

```bash
feat!: send an email to the customer when a product is shipped
feat(api)!: send an email to the customer when a product is shipped

# Hoặc sử dụng footer
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```
