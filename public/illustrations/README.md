# Nguồn hình hướng dẫn

## Sơ đồ minh họa (vẽ cho workflow này)

- `folder-map.svg`: thư mục `TinaCRM-Agent-Zalo-main` (tên sau khi giải nén ZIP), `inputs/01_company_info`, `inputs/02_marketing_materials`, `outputs`.
- `tag-assignment.svg`: giao khách cho sale bằng nhãn Zalo; khách chưa có nhãn về người quản lý.
- `data-flow.svg`: luồng hằng ngày, gồm lấy tin mới → phân tích → kiểm tra → TinaCRM (Companies → People → Opportunities → Notes → Tasks) → brief sale.
- `outputs-map.svg`: các thư mục con trong `outputs/`.
- `zalo-window.svg`: khung nhắn tự do 48 giờ sau tin cuối của khách (`zalo.free_message_window_hours`).

Sơ đồ không phải ảnh chụp giao diện Zalo hay TinaCRM.

## Ảnh chụp (dùng lại từ sổ tay crm-lead-workflow)

- `github-download.png`, `github-download-light.png`: trang GitHub Tinasoft-Viet-Nam/TinaCRM-Agent-Zalo với menu Code → Download ZIP (giao diện tối/sáng), chụp khi chưa đăng nhập; tên và ảnh người commit, danh sách contributors đã làm mờ.
- `claude-code-folder-chosen-full.png`, `claude-code-open-folder-zoom.png`, `claude-code-permissions-zoom.png`, `claude-account-menu.png` và bản sáng `*-light.png`: Claude Desktop (Mac) tab Code, chụp 2026-10-19. Đã xóa tên tài khoản, email và các dự án khác. Thư mục trong ảnh là crm-lead-workflow; người dùng chọn thư mục TinaCRM-Agent-Zalo-main.
- `tinacrm-api-keys*.png`, `tinacrm-api-key-form*.png`, `tinacrm-api-key-created*.png`: TinaCRM Settings → MCP & APIs → API, chụp 2026-10-19. Đã cắt thanh địa chỉ và che chuỗi khóa.
- `tinacrm-key-dialog.png`: hộp thoại do `scripts/tinacrm_save_key.sh` bật lên (cùng script với workflow này), chụp 2026-10-19.

## Ảnh chụp Zalo (chụp 2026-10-31 khi làm thật với ứng dụng “Sale Phúc” và OA TinaCRM)

Đã che ảnh đại diện tài khoản, số điện thoại, email và mọi ô token.

- `zalo-dev-apps.png`: developers.zalo.me → Ứng dụng của tôi, nút Tạo mới.
- `zalo-app-settings.png`: trang Cài đặt sau khi kích hoạt (điện thoại, email, icon 512×512, Lưu thay đổi, công tắc Đang hoạt động).
- `zalo-app-activate-confirm.png`: hộp xác nhận “Bạn có chắc muốn kích hoạt ứng dụng?”.
- `zalo-oa-permissions.png`: Official Account → Thiết lập chung, danh sách quyền.
- `zalo-explorer-oa.png`, `zalo-explorer-tokens.png`: API Explorer, chọn OA Access Token → Lấy Access Token → chọn OA; sau khi có token.
- `zalo-oauth-consent.png`: cuối cửa sổ cấp quyền Official Account (tick đồng ý → Cấp quyền).
- `zalo-oa-granted.png`: Quản lý OA, “Danh sách OA đã cấp quyền”.
- `zalo-key-dialog.png`: hộp thoại `scripts/zalo_save_app.sh` trên Mac (lần 1, Khóa bí mật).

Còn thiếu ảnh chụp thật: hộp thoại `zalo_save_app.ps1` trên Windows, gắn nhãn trong OA Manager. Khi chụp, che Secret Key, token và thông tin khách.
