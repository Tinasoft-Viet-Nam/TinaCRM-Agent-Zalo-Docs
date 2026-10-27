# Nguồn hình hướng dẫn

## Sơ đồ minh họa (vẽ cho workflow này)

- `folder-map.svg`: thư mục `TinaCRM-Agent-Zalo-main` (tên sau khi giải nén ZIP), `inputs/01_company_info`, `inputs/02_marketing_materials`, `outputs`.
- `tag-assignment.svg`: giao khách cho sale bằng nhãn Zalo; khách chưa có nhãn về người quản lý.
- `data-flow.svg`: luồng hằng ngày, gồm lấy tin mới → phân tích → kiểm tra → TinaCRM (Companies → People → Opportunities → Notes → Tasks) → brief sale.
- `outputs-map.svg`: các thư mục con trong `outputs/`.
- `zalo-window.svg`: khung nhắn tự do 48 giờ sau tin cuối của khách (`zalo.free_message_window_hours`).
- `codex-open-folder.svg`, `codex-trust.svg`, `codex-permissions.svg`: mở workflow bằng Codex trong ChatGPT desktop app (New chat, Work in: This computer, chọn thư mục, tin cậy thư mục, chế độ quyền). Vẽ theo tài liệu learn.chatgpt.com (2026-10-27), chờ thay bằng ảnh chụp thật.

Sơ đồ không phải ảnh chụp giao diện Zalo hay TinaCRM.

## Ảnh chụp (dùng lại từ sổ tay crm-lead-workflow)

- `github-download.png`: trang GitHub với menu Code → Download ZIP, chụp trên kho crm-lead-workflow. Vị trí nút giống hệt trên kho TinaCRM-Agent-Zalo.
- `claude-code-folder-chosen-full.png`, `claude-code-open-folder-zoom.png`, `claude-code-permissions-zoom.png`, `claude-account-menu.png` và bản sáng `*-light.png`: Claude Desktop (Mac) tab Code, chụp 2026-10-19. Đã xóa tên tài khoản, email và các dự án khác. Thư mục trong ảnh là crm-lead-workflow; người dùng chọn thư mục TinaCRM-Agent-Zalo-main.
- `tinacrm-api-keys*.png`, `tinacrm-api-key-form*.png`, `tinacrm-api-key-created*.png`: TinaCRM Settings → MCP & APIs → API, chụp 2026-10-19. Đã cắt thanh địa chỉ và che chuỗi khóa.
- `tinacrm-key-dialog.png`: hộp thoại do `scripts/tinacrm_save_key.sh` bật lên (cùng script với workflow này), chụp 2026-10-19.

Còn thiếu ảnh chụp thật: Codex trong ChatGPT desktop app (mở thư mục, hỏi tin cậy, menu quyền, mục Scheduled), hộp thoại `scripts/zalo_save_app.sh`, công cụ API Explorer của Zalo, gắn nhãn trong OA Manager. Khi chụp, che Secret Key, token và thông tin khách.
