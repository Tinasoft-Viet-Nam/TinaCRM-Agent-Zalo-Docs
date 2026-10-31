export type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  steps?: { title: string; body: string }[];
  note?: { title: string; body: string };
  prompt?: string;
  checks?: string[];
  faqs?: { question: string; answer: string }[];
};

export type Guide = {
  slug: string;
  title: string;
  shortTitle: string;
  /** Who acts in this step: the user on the computer, the user asking the assistant, or both together. */
  actor: "Bạn làm trên máy" | "Bạn yêu cầu trợ lý" | "Bạn và trợ lý cùng làm";
  description: string;
  sections: Section[];
};

/** Step numbers match workflows/USER_GUIDE_FLOW.md so the site and the assistant use the same numbers. */
export const cycle: Guide[] = [
  {
    slug: "mo-workflow", title: "Tải và mở workflow bằng trợ lý AI", shortTitle: "Tải & mở workflow", actor: "Bạn làm trên máy",
    description: "Tải ZIP từ GitHub, đặt tài liệu doanh nghiệp vào inputs, rồi mở thư mục bằng trợ lý AI trên máy: Claude (Claude Desktop) hoặc ChatGPT (Codex trong ChatGPT desktop app). Hai cách dùng như nhau.",
    sections: [
      { id: "download", title: "Tải workflow: Code → Download ZIP", paragraphs: ["Giải nén ra thư mục TinaCRM-Agent-Zalo-main. Mỗi doanh nghiệp dùng một thư mục riêng, và mỗi OA chỉ chạy ở một thư mục, trên một máy."] },
      { id: "inputs", title: "Đặt tài liệu vào inputs", steps: [
        { title: "inputs/01_company_info", body: "Hồ sơ công ty, hồ sơ năng lực, khách hàng tiêu biểu." },
        { title: "inputs/02_marketing_materials", body: "Danh mục sản phẩm/dịch vụ, bảng giá, chính sách bán hàng, câu hỏi khách hay hỏi." }
      ], paragraphs: ["Ưu tiên PDF, Word, Excel có chữ. Ảnh scan có thể không đọc được. Chưa có tài liệu cũng được: ở bước 2 trợ lý có thể đọc website hoặc hỏi bạn từng câu."] },
      { id: "choose", title: "Chọn trợ lý bạn đang dùng", paragraphs: ["Workflow chạy như nhau trên cả hai. Chỉ làm theo các mục của công cụ bạn chọn ở dưới; từ bước 2 trở đi mọi câu lệnh giống nhau. Nên chọn một công cụ và dùng nó cho cả doanh nghiệp này."], steps: [
        { title: "Claude", body: "Cài Claude Desktop, gói Pro, Max, Team hoặc Enterprise. Làm các mục “Claude” bên dưới." },
        { title: "ChatGPT (Codex)", body: "Cài ChatGPT desktop app (Mac hoặc Windows). Mọi gói ChatGPT đều có Codex; gói Plus trở lên dùng được nhiều hơn. Làm các mục “ChatGPT” bên dưới." }
      ] },
      { id: "overview", title: "Claude: mở Claude Desktop → tab Code" },
      { id: "folder", title: "Claude: chọn thư mục workflow", paragraphs: ["Choose… → Open folder… → chọn thư mục TinaCRM-Agent-Zalo-main (thư mục có tệp AGENTS.md). Chọn This computer, không chạy trên đám mây: khóa Zalo và TinaCRM chỉ nằm trên máy này."] },
      { id: "permissions", title: "Claude: chọn quyền Manual", steps: [
        { title: "Auto", body: "Claude tự quyết định việc nào cần hỏi. Không nên dùng khi mới bắt đầu." },
        { title: "Manual (nên chọn)", body: "Luôn hỏi bạn trước khi sửa tệp hoặc chạy lệnh." },
        { title: "Accept edits", body: "Tự sửa tệp không hỏi; chạy lệnh vẫn hỏi." },
        { title: "Plan", body: "Chỉ lập kế hoạch, chưa làm gì. Dùng khi muốn xem trước trợ lý định làm gì." },
        { title: "Bypass permissions (không dùng)", body: "Claude được sửa hoặc xóa tệp, gửi tin cho khách mà không hỏi." }
      ], paragraphs: ["Lần đầu trợ lý chạy lệnh, Claude hỏi quyền: bấm Always allow cho đúng các lệnh python3 scripts/… và sh scripts/… của workflow."] },
      { id: "codex-open", title: "ChatGPT: mở Codex và chọn thư mục", steps: [
        { title: "Mở Codex", body: "Mở ChatGPT desktop app, chọn Codex ở menu ChatGPT phía trên, rồi bấm New chat." },
        { title: "Chạy trên máy này", body: "Ở ô nhập, mục Work in chọn This computer (Local). Không chọn Cloud, không bật Worktree: khóa Zalo, TinaCRM và dữ liệu chống trùng chỉ nằm trong thư mục gốc trên máy này." },
        { title: "Chọn thư mục", body: "Chọn thư mục TinaCRM-Agent-Zalo-main (thư mục có tệp AGENTS.md). Codex tự đọc tệp này." }
      ] },
      { id: "codex-trust", title: "ChatGPT: tin cậy thư mục", paragraphs: ["Lần đầu mở thư mục, Codex hỏi bạn có tin cậy thư mục này không: chọn tin cậy (Trust). Nhờ vậy Codex nạp quy tắc có sẵn của workflow, cho phép đúng các lệnh lấy tin Zalo, ghi TinaCRM và bật hộp thoại nhập khóa chạy mà không hỏi lại mỗi lần. Không tin cậy thì lịch chạy tự động sẽ bị chặn."] },
      { id: "codex-permissions", title: "ChatGPT: chọn quyền", steps: [
        { title: "Ask for approval (nên chọn khi mới dùng)", body: "Codex làm trong thư mục workflow, hỏi bạn trước khi làm việc ra ngoài phạm vi đó." },
        { title: "Approve for me", body: "Giống trên, nhưng để ChatGPT tự xét các yêu cầu đó. Dùng được khi đã quen." },
        { title: "Full access (không dùng)", body: "Codex được làm mọi việc trên máy mà không hỏi. Workflow không cần quyền này." }
      ], paragraphs: ["Nút chọn quyền nằm ngay dưới ô nhập. Nếu Codex hỏi quyền cho một lệnh scripts/… của workflow, chọn cho phép luôn với lệnh đó (không phải chỉ một lần), để lần chạy theo lịch không bị dừng.", "Đã từng dùng Claude Code? Codex có mục Settings → Import from Claude Code. Không bắt buộc: workflow đã có sẵn mọi thứ Codex cần."] },
      { id: "done", title: "Đã mở đúng", paragraphs: ["Claude: thanh dưới ô nhập hiện This computer, tên thư mục workflow và Manual.", "ChatGPT: cuộc trò chuyện Codex chạy trên máy này, đúng thư mục workflow, đã tin cậy thư mục, quyền Ask for approval hoặc Approve for me."], checks: ["Đã giải nén thư mục workflow", "Đã đặt tài liệu vào inputs (hoặc sẽ gửi website)", "Đã mở đúng thư mục bằng Claude hoặc ChatGPT (Codex), chạy trên máy này", "Đã chọn quyền: Manual (Claude) hoặc Ask for approval (ChatGPT)"] }
    ]
  },
  {
    slug: "hieu-doanh-nghiep", title: "Trợ lý hiểu doanh nghiệp", shortTitle: "Hiểu doanh nghiệp", actor: "Bạn yêu cầu trợ lý",
    description: "Trợ lý đọc tài liệu, tóm tắt doanh nghiệp, rồi hỏi danh sách sản phẩm/dịch vụ và các nhóm khách bạn muốn phân loại.",
    sections: [
      { id: "send", title: "Câu lệnh", prompt: "Đọc AGENTS.md và tài liệu trong inputs. Báo tệp nào không đọc được, tóm tắt doanh nghiệp và hỏi tôi phần còn thiếu." },
      { id: "why", title: "Vì sao cần bước này", paragraphs: ["Khi phân tích hội thoại, trợ lý dùng danh sách sản phẩm để biết khách đang hỏi mua gì, ước giá trị cơ hội. Danh sách nhóm khách (ví dụ khách nóng, khách đã mua, khách phàn nàn) dùng để lọc khách khi làm chiến dịch.", "Bạn duyệt bản tóm tắt, sản phẩm và nhóm khách. Sau này muốn sửa chỉ cần nhắn trợ lý, ví dụ “Thêm sản phẩm gói Premium giá 5 triệu”."] }
    ]
  },
  {
    slug: "khai-bao-oa", title: "Khai báo OA, ứng dụng và sale", shortTitle: "Khai báo OA & sale", actor: "Bạn yêu cầu trợ lý",
    description: "Mỗi OA có nhiều ứng dụng (tài khoản con). Mỗi ứng dụng giao cho một sale, và mỗi sale có một nhãn Zalo riêng để đánh dấu khách của mình.",
    sections: [
      { id: "concepts", title: "Ba khái niệm cần biết", steps: [
        { title: "OA (Official Account)", body: "Trang Zalo chính thức của doanh nghiệp, nơi khách nhắn tin." },
        { title: "Ứng dụng (tài khoản con)", body: "Tạo trên developers.zalo.me và được quản trị OA cấp quyền. Mỗi ứng dụng có App ID, Secret Key, và gắn với đúng một sale." },
        { title: "Nhãn sale", body: "Ví dụ “Sale: Minh”. Sale gắn nhãn này cho khách mình phụ trách trong OA Manager. Workflow dựa vào nhãn để biết khách thuộc sale nào." }
      ] },
      { id: "tags", title: "Vì sao phải dùng nhãn" },
      { id: "send", title: "Câu lệnh", paragraphs: ["Trợ lý hỏi lần lượt: có mấy OA, mỗi OA có những ứng dụng nào (App ID, tên gợi nhớ), sale phụ trách (họ tên, email công ty), nhãn của sale, và người quản lý nhận khách chưa được giao. App ID không phải bí mật, có thể gửi trong chat."], prompt: "Khai báo OA, các ứng dụng và sale phụ trách. Hỏi tôi từng câu, rồi cho tôi xem bảng OA – ứng dụng – sale – nhãn để xác nhận." },
      { id: "no-app", title: "Chưa có ứng dụng?", paragraphs: ["Mỗi sale cần một ứng dụng trên developers.zalo.me. Ai tạo cũng được, nhưng bước cấp quyền OA (trang Kết nối Zalo) phải do quản trị viên OA làm. Không chắc nút nào thì chụp màn hình gửi trợ lý, nhớ che thông tin nhạy cảm."], steps: [
        { title: "Tạo ứng dụng", body: "Vào developers.zalo.me, đăng nhập → Ứng dụng của tôi → Tạo mới. Đặt tên dễ nhận ra sale, ví dụ “Sale Minh”." }
      ] },
      { id: "activate", title: "Điền thông tin và kích hoạt ứng dụng", paragraphs: ["Bắt buộc. Ứng dụng chưa kích hoạt thì Zalo từ chối mọi yêu cầu (lỗi -209 “App has been not approved”), kể cả khi đã lưu khóa thành công."], steps: [
        { title: "Điền thông tin", body: "Ở trang Cài đặt của ứng dụng, điền đủ các ô có dấu *: Tên hiển thị, Điện thoại liên hệ, Email liên hệ, Danh mục, Mô tả." },
        { title: "Tải icon 512×512", body: "Bấm Choose File ở mục Icon ứng dụng, chọn ảnh vuông 512×512, chỉnh vùng cắt rồi bấm Lưu. Thiếu icon thì Zalo báo “Vui lòng cập nhật Icon để có thể kích hoạt ứng dụng”." },
        { title: "Lưu thay đổi", body: "Bấm Lưu thay đổi ở cuối trang." },
        { title: "Bật kích hoạt", body: "Bấm công tắc “Chưa kích hoạt” ở góc trên bên phải → Đồng ý. Xong thì công tắc ghi “Đang hoạt động” và Zalo báo “Kích hoạt ứng dụng thành công”." }
      ] },
      { id: "permissions", title: "Chọn quyền cho ứng dụng", paragraphs: ["Menu trái: Sản phẩm → Official Account → Thiết lập chung. Mặc định mọi quyền đã được chọn. Tối thiểu cần “Quyền: Quản lý tin nhắn người dùng” (đọc hội thoại) và “Quyền: Quản lý thông tin OA” (thông tin khách, nhãn). Bấm Lưu nếu có thay đổi."] },
      { id: "no-link", title: "Không bấm “Liên kết”", note: { title: "Chỉ cấp quyền, không liên kết", body: "Trang Quản lý OA của ứng dụng có ô “Liên kết với Official Account”. Đừng dùng: mỗi OA chỉ liên kết được một ứng dụng, liên kết ứng dụng mới sẽ gỡ ứng dụng cũ đang chạy. Workflow chỉ cần cấp quyền (làm ở bước Kết nối Zalo), một OA cấp quyền được cho nhiều ứng dụng." } }
    ]
  },
  {
    slug: "ket-noi-zalo", title: "Kết nối Zalo", shortTitle: "Kết nối Zalo", actor: "Bạn và trợ lý cùng làm",
    description: "Với từng ứng dụng, người quản trị OA lấy Secret Key và Refresh Token rồi dán vào hộp thoại trợ lý bật lên. Không dán khóa vào khung chat.",
    sections: [
      { id: "before", title: "Trước khi bắt đầu", paragraphs: ["Ứng dụng phải ở trạng thái “Đang hoạt động” (xem bước Khai báo OA & sale, mục kích hoạt). Người làm các bước dưới đây phải là quản trị viên OA."] },
      { id: "token", title: "Cấp quyền OA và lấy token (API Explorer)", steps: [
        { title: "Mở API Explorer", body: "Vào developers.zalo.me → Công cụ → API Explorer (hoặc developers.zalo.me/tools/explorer). Ở ô Chọn ứng dụng, chọn đúng ứng dụng của sale." },
        { title: "Đổi loại token", body: "Ô Loại access token: đổi từ User Access Token sang OA Access Token." },
        { title: "Chọn OA", body: "Bấm Lấy Access Token → danh sách OA hiện ra → chọn OA của doanh nghiệp." },
        { title: "Xác nhận thông báo", body: "Hộp Thông báo nói token cũ của ứng dụng này với OA này sẽ hết hiệu lực → bấm “Tôi đã hiểu và muốn tiếp tục”." },
        { title: "Cấp quyền", body: "Cửa sổ “Yêu cầu cấp quyền truy cập Official Account” mở ra: cuộn xuống cuối, tick ô đồng ý Điều khoản → bấm Cấp quyền." },
        { title: "Token đã có", body: "Quay lại API Explorer: ô Access token và Refresh token đã có giá trị. Giữ nguyên trang này cho tới khi dán xong." }
      ] },
      { id: "token-warn", title: "Đừng tải lại API Explorer", note: { title: "Token mới làm token cũ hết hạn", body: "Sau khi có token, đừng tải lại trang, đừng bấm Reset hay Lấy Access Token lần nữa. Làm vậy ô token bị xóa hoặc token vừa lấy hết hiệu lực, khi dán sẽ bị báo “Invalid refresh token”. Nếu lỡ, làm lại các bước trên để lấy token mới rồi dán ngay." } },
      { id: "granted", title: "Kiểm tra đã cấp quyền", paragraphs: ["Ở trang ứng dụng → Sản phẩm → Official Account → Quản lý OA, mục “Danh sách OA đã cấp quyền” có tên OA là được."] },
      { id: "send", title: "Câu lệnh", prompt: "Kết nối Zalo cho từng ứng dụng đã khai báo. Bật hộp thoại để tôi dán Secret Key và Refresh Token, sau đó kiểm tra đúng OA và đọc thử, không in nội dung tin nhắn." },
      { id: "dialog", title: "Dán vào hộp thoại", steps: [
        { title: "Khóa bí mật", body: "Trên Mac, hộp thoại Kết nối Zalo OA hiện ra hai lần. Lần 1: ở trang Cài đặt của ứng dụng, bấm nút sao chép cạnh ô “Khóa bí mật của ứng dụng”, dán vào hộp thoại rồi bấm Tiếp." },
        { title: "Refresh token", body: "Lần 2: ở API Explorer, bấm nút sao chép cạnh ô Refresh token (ô thứ hai, không phải Access token), dán vào rồi bấm Tiếp." },
        { title: "Windows", body: "Trên Windows là một cửa sổ có hai ô: dán Khóa bí mật vào ô trên, Refresh token vào ô dưới, bấm Lưu." }
      ], paragraphs: ["Không thấy hộp thoại thì tìm trên thanh Dock (Mac) hoặc thanh tác vụ (Windows), hoặc phía sau cửa sổ Claude/ChatGPT. Khóa chỉ được lưu khi Zalo chấp nhận.", "Trợ lý báo tên OA nhận được và số hội thoại đọc được. Làm lần lượt cho mọi ứng dụng."] },
      { id: "tag-check", title: "Kiểm tra nhãn sale", paragraphs: ["Trợ lý kiểm tra nhãn của từng sale đã có trên OA chưa. Nhãn chưa có không phải lỗi: Zalo tự tạo khi gắn cho khách đầu tiên."], prompt: "Kiểm tra nhãn sale của từng ứng dụng trên OA." },
      { id: "warn", title: "Lưu ý", note: { title: "Refresh Token chỉ dùng được một lần", body: "Mỗi lần làm mới, Zalo cấp token mới và workflow tự lưu lại. Vì vậy không dùng cùng một ứng dụng ở hai máy hoặc hai thư mục. Nếu ứng dụng không chạy quá khoảng 3 tháng, người quản trị OA phải cấp quyền lại." } }
    ]
  },
  {
    slug: "ket-noi-tinacrm", title: "Kết nối TinaCRM", shortTitle: "Kết nối TinaCRM", actor: "Bạn và trợ lý cùng làm",
    description: "Tạo API key trong TinaCRM, dán vào hộp thoại. Trợ lý ghép từng sale với nhân viên CRM và ánh xạ giai đoạn cơ hội.",
    sections: [
      { id: "apikey-open", title: "Tạo API key", paragraphs: ["Đăng nhập TinaCRM của doanh nghiệp → Settings → MCP & APIs → tab API → Create API key."] },
      { id: "apikey-form", title: "Điền thông tin khóa", paragraphs: ["Role phải đủ quyền đọc/ghi People, Companies, Opportunities, Tasks và Notes. Nên đặt ngày hết hạn thay vì Never."] },
      { id: "apikey-copy", title: "Sao chép khóa", paragraphs: ["Khóa chỉ hiện một lần. Bấm Copy rồi gửi câu lệnh dưới đây. Không dán khóa vào khung chat."], prompt: "Kết nối TinaCRM bằng API key. Hỏi tôi địa chỉ TinaCRM, bật hộp thoại để tôi dán API key, sau đó đọc thử dữ liệu, chưa ghi gì." },
      { id: "apikey-paste", title: "Dán khóa vào hộp thoại", paragraphs: ["Trợ lý bật hộp thoại Kết nối TinaCRM: dán khóa vào ô, bấm Lưu."] },
      { id: "mapping", title: "Ghép sale và giai đoạn", steps: [
        { title: "Sale ↔ nhân viên CRM", body: "Trợ lý ghép theo email để task được giao đúng người. Không khớp thì trợ lý hỏi bạn." },
        { title: "Giai đoạn cơ hội", body: "Trợ lý đọc các giai đoạn có trong CRM (ví dụ Mới, Báo giá, Thắng) và ghép với giai đoạn của workflow." },
        { title: "Trường Zalo trên People", body: "Nên có trường zalo_user_id để không tạo trùng khách, vì khách Zalo thường không để lại email hay điện thoại. Chưa có thì trợ lý hướng dẫn tạo." }
      ] }
    ]
  },
  {
    slug: "chay-thu", title: "Chạy thử ngày đầu", shortTitle: "Chạy thử ngày đầu", actor: "Bạn yêu cầu trợ lý",
    description: "Trợ lý lấy hội thoại, phân tích, cho bạn xem mẫu và bảng sẽ tạo trên CRM. Chỉ đẩy lên CRM sau khi bạn duyệt.",
    sections: [
      { id: "send", title: "Câu lệnh", prompt: "Chạy thử hôm nay: lấy hội thoại, phân tích, cho tôi xem 3–5 bản phân tích mẫu và bảng sẽ tạo trên TinaCRM. Chưa ghi CRM khi tôi chưa duyệt." },
      { id: "what", title: "Trợ lý tạo ra gì", steps: [
        { title: "People và Companies", body: "Khách và công ty của khách, kèm số điện thoại, email, địa chỉ nếu khách có nhắc trong chat." },
        { title: "Opportunities", body: "Cơ hội bán hàng: sản phẩm khách quan tâm, giá trị ước tính, giai đoạn." },
        { title: "Notes", body: "Tóm tắt hội thoại: khách cần gì, đã báo giá chưa, còn vướng gì." },
        { title: "Tasks", body: "Việc tiếp theo, giao cho sale có nhãn của khách. Khách chưa có nhãn thì giao cho người quản lý." }
      ] },
      { id: "flow", title: "Luồng dữ liệu" },
      { id: "review", title: "Duyệt và chạy thật", paragraphs: ["Xem bản phân tích có đúng ý khách không, sản phẩm và giá trị có hợp lý không. Chỉnh xong, nhắn “Đẩy lên CRM”. Trợ lý báo số tạo mới, cập nhật, bỏ qua và lỗi thật trên TinaCRM.", "Khách có dấu hiệu bất thường (thông tin mâu thuẫn, khách có nhãn của hai sale) được đánh dấu cần xem lại và không tự đẩy lên CRM."] }
    ]
  },
  {
    slug: "hang-ngay", title: "Chạy hằng ngày và đặt lịch", shortTitle: "Chạy hằng ngày", actor: "Bạn yêu cầu trợ lý",
    description: "Sau lần chạy thử, mỗi ngày chỉ cần bước này. Mỗi sale nhận một brief việc cần làm hôm nay.",
    sections: [
      { id: "routine", title: "Câu lệnh", paragraphs: ["Trợ lý chỉ lấy tin mới kể từ lần chạy trước. Chạy lại trong cùng ngày không tạo trùng."], prompt: "Chạy hôm nay." },
      { id: "one-sale", title: "Xem khách của một sale", prompt: "Khách của <tên sale> hôm nay." },
      { id: "assign", title: "Người quản lý giao khách cho sale", paragraphs: ["Không cần mở OA Manager: người quản lý nhắn trợ lý là đủ. Trợ lý tìm khách, cho xem bảng khách → sale trước khi làm. Bạn chọn “Giao như trên” thì trợ lý mới gắn nhãn Zalo của sale mới (gỡ nhãn sale cũ) và chuyển các task chưa xong trên TinaCRM sang sale đó.", "Sale vẫn có thể tự gắn nhãn của mình trong OA Manager khi nhận khách. Hai cách dùng song song được."], steps: [
        { title: "Xem khách chưa có sale", body: "“Khách nào chưa có sale?” — trợ lý liệt kê, khách mới nhắn đứng trước." },
        { title: "Giao từng khách", body: "“Giao chị Hoa cho Minh.” Trùng tên thì trợ lý hỏi bạn chọn." },
        { title: "Nhờ trợ lý đề xuất", body: "“Đề xuất sale cho các khách chưa phân công.” Trợ lý gợi ý theo sản phẩm, khu vực và số khách mỗi sale đang giữ, kèm lý do. Bạn duyệt rồi mới giao." },
        { title: "Chuyển khách", body: "“Chuyển khách Tuấn từ Minh sang Lan.”" }
      ], prompt: "Khách nào chưa có sale? Đề xuất sale cho từng khách, cho tôi xem trước rồi mới giao." },
      { id: "schedule", title: "Chạy tự động theo lịch", paragraphs: ["Trợ lý hỏi giờ chạy (nên chọn 7:30 sáng ngày làm việc để sale có brief đầu ngày), và có tự đẩy CRM hay chờ bạn duyệt, rồi tự tạo lịch. Mỗi lần chạy hiện ở mục Scheduled ở thanh bên trái.", "Lịch chỉ chạy khi máy bật, không ngủ và ứng dụng đang mở. Bỏ lỡ thì lần sau lấy bù tin, không mất tin.", "Chỉ đặt lịch ở một công cụ: đã đặt ở Claude thì không đặt thêm ở ChatGPT và ngược lại, tránh chạy hai lần."], steps: [
        { title: "Claude", body: "Lần đầu lịch chạy, nếu Claude hỏi quyền thì mở phiên đó trong Scheduled và bấm Always allow cho đúng các lệnh python3 scripts/… của workflow. Claude Desktop phải đang mở." },
        { title: "ChatGPT (Codex)", body: "Trước khi đặt lịch, trợ lý nhờ bạn chạy tay “Chạy hôm nay” một lần để chắc không còn câu hỏi quyền nào (thư mục đã tin cậy ở bước 1). Lịch chạy trong thư mục workflow trên máy, không dùng worktree. ChatGPT desktop app phải đang mở." }
      ], prompt: "Đặt lịch chạy tự động hằng ngày." },
      { id: "outputs", title: "Kết quả nằm ở đâu" }
    ]
  },
  {
    slug: "chien-dich", title: "Tạo chiến dịch", shortTitle: "Tạo chiến dịch", actor: "Bạn yêu cầu trợ lý",
    description: "Dùng dữ liệu đã tích lũy để chọn nhóm khách: chốt khách nóng, đánh thức khách nguội, bán thêm, chăm sóc sau bán, giữ chân.",
    sections: [
      { id: "send", title: "Câu lệnh", paragraphs: ["Trợ lý chỉ đề xuất loại chiến dịch đang có khách, kèm số khách theo từng sale và số khách còn nhắn được trên Zalo. Bạn điều chỉnh bộ lọc tới khi ưng."], prompt: "Tạo chiến dịch mới. Hỏi tôi mục tiêu, đề xuất nhóm khách dựa trên dữ liệu thật và cho tôi xem quy mô trước khi lưu." },
      { id: "types", title: "Loại chiến dịch gợi ý", steps: [
        { title: "Chốt khách nóng", body: "Khách hỏi giá, hẹn demo trong 7 ngày gần đây." },
        { title: "Đánh thức khách nguội", body: "Khách từng quan tâm nhưng im lặng hơn 14 ngày." },
        { title: "Bán thêm", body: "Khách đã mua, quan tâm sản phẩm liên quan." },
        { title: "Chăm sóc sau bán", body: "Khách mới mua trong 30 ngày: hướng dẫn dùng, xin đánh giá." },
        { title: "Giữ chân", body: "Khách phàn nàn hoặc có dấu hiệu rời bỏ: sale gọi trực tiếp." }
      ] },
      { id: "files", title: "Danh sách khách", paragraphs: ["Mỗi chiến dịch một thư mục campaigns/<tên chiến dịch>. Tệp outputs/audience.csv mở được bằng Excel để sale xem."] }
    ]
  },
  {
    slug: "kich-ban", title: "Kịch bản chăm sóc", shortTitle: "Kịch bản chăm sóc", actor: "Bạn yêu cầu trợ lý",
    description: "Trợ lý soạn tin cá nhân hóa theo từng khách, gửi bằng ứng dụng của đúng sale phụ trách. Không gửi khi bạn chưa duyệt.",
    sections: [
      { id: "send", title: "Câu lệnh", prompt: "Soạn kịch bản chăm sóc cho chiến dịch <tên chiến dịch>: tin mẫu theo từng nhóm khách, cá nhân hóa theo hội thoại. Chưa gửi khi tôi chưa duyệt." },
      { id: "window", title: "Khung nhắn tự do của Zalo" },
      { id: "approve", title: "Cách duyệt", steps: [
        { title: "Chỉ soạn nháp", body: "Mặc định. Tin lưu thành tệp, sale tự sao chép gửi." },
        { title: "Duyệt từng tin", body: "Trợ lý cho xem từng tin, bạn đồng ý mới gửi." },
        { title: "Duyệt mẫu rồi gửi loạt", body: "Duyệt mẫu và danh sách một lần, trợ lý gửi cho cả nhóm." }
      ], note: { title: "Khách yêu cầu ngừng liên hệ", body: "Khách nói không muốn nhận tin sẽ bị loại khỏi mọi chiến dịch sau đó." } },
      { id: "results", title: "Theo dõi kết quả", paragraphs: ["Lần chạy hằng ngày sau đó tự phân tích phản hồi của khách. Hỏi trợ lý “Kết quả chiến dịch <tên>” để xem đã gửi, đã trả lời, cơ hội mới."] }
    ]
  },
  {
    slug: "bao-cao", title: "Báo cáo tuần", shortTitle: "Báo cáo tuần", actor: "Bạn yêu cầu trợ lý",
    description: "Lượng hội thoại, khách mới, cơ hội, task, tốc độ phản hồi theo OA, ứng dụng và sale, cùng kết quả chiến dịch.",
    sections: [
      { id: "setup", title: "Câu lệnh", paragraphs: ["Trợ lý hỏi người nhận, ngày và giờ gửi, cho xem bản nháp, rồi đặt lịch. Báo cáo lưu ở outputs/04_weekly_reports."], prompt: "Thiết lập báo cáo hằng tuần: hỏi tôi người nhận, ngày, giờ gửi, cho xem bản nháp rồi đặt lịch gửi tự động." },
      { id: "loop", title: "Sau bước 10", paragraphs: ["Mỗi ngày quay lại bước 7. Khi muốn chạy chiến dịch mới, quay lại bước 8."] }
    ]
  }
];

export const help: Guide = {
  slug: "tro-giup", title: "Câu hỏi thường gặp", shortTitle: "Câu hỏi thường gặp", actor: "Bạn yêu cầu trợ lý",
  description: "Các vướng mắc hay gặp.",
  sections: [
    { id: "faq", title: "Câu hỏi", faqs: [
      { question: "Mỗi ứng dụng có thấy riêng hội thoại của sale đó không?", answer: "Không. Zalo không tách hội thoại theo ứng dụng: mọi ứng dụng của cùng một OA đều thấy toàn bộ hội thoại. Vì vậy workflow dùng nhãn Zalo “Sale: <tên>” để biết khách thuộc ai." },
      { question: "Nhiều khách “chưa phân công”?", answer: "Sale chưa gắn nhãn cho khách. Người quản lý nhắn trợ lý “Khách nào chưa có sale?” rồi “Giao … cho …” (bước 7). Trong lúc chờ, task CRM của các khách này giao cho người quản lý." },
      { question: "Giao khách xong thì task trên TinaCRM thế nào?", answer: "Các task chưa xong do workflow tạo được chuyển sang sale mới; task đã xong giữ nguyên. Sale mới cũng thấy khách trong brief từ lần chạy tiếp theo." },
      { question: "Khách có nhãn của hai sale?", answer: "Trợ lý đánh dấu cần xem lại và hỏi bạn giữ sale nào, rồi gỡ nhãn sale kia." },
      { question: "Sale nghỉ việc, chuyển khách cho người khác?", answer: "Nhắn trợ lý “Đổi sale phụ trách ứng dụng <tên> thành <sale mới>”. Toàn bộ khách mang nhãn đó chuyển theo, không cần gắn lại." },
      { question: "Báo lỗi cần cấp quyền lại Zalo (reauthorize)?", answer: "Refresh Token đã hết hạn hoặc đã bị dùng ở nơi khác. Người quản trị OA lấy Refresh Token mới (bước 4) rồi nhắn “Kết nối lại ứng dụng <tên>”." },
      { question: "Báo lỗi -209 “App has been not approved”?", answer: "Ứng dụng chưa được kích hoạt. Vào trang Cài đặt của ứng dụng trên developers.zalo.me, điền đủ điện thoại, email, icon 512×512, bấm Lưu thay đổi rồi bật công tắc kích hoạt (bước 3). Khóa đã lưu thì không cần dán lại, chỉ cần nhắn “Kiểm tra lại kết nối Zalo”." },
      { question: "Báo “Invalid refresh token” khi dán khóa?", answer: "Token đã dán là token cũ, hoặc trang API Explorer đã bị tải lại hay lấy token mới sau đó. Lấy token mới ở API Explorer (bước 4) và dán ngay, không tải lại trang giữa chừng." },
      { question: "Không gửi được tin cho khách?", answer: "Zalo chỉ cho nhắn tự do trong khoảng 48 giờ sau tin cuối của khách. Ngoài khung, trợ lý tạo task để sale gọi hoặc nhắn trực tiếp." },
      { question: "Trợ lý báo đã lưu nhưng TinaCRM không có?", answer: "Yêu cầu trợ lý kiểm tra lại bằng công cụ và báo ID bản ghi." },
      { question: "Lịch chạy không hoạt động?", answer: "Lịch chỉ chạy khi máy bật, không ngủ và ứng dụng đặt lịch (Claude Desktop hoặc ChatGPT desktop app) đang mở. Mở mục Scheduled ở thanh bên trái xem lần chạy gần nhất: nếu đang chờ hỏi quyền, mở ra và cho phép luôn đúng lệnh scripts/… của workflow. Trên ChatGPT, kiểm tra thư mục workflow đã được tin cậy (bước 1)." },
      { question: "Đổi giờ, tạm dừng hoặc xem lịch?", answer: "Nhắn trợ lý, ví dụ “Xem các lịch đang chạy”, “Tạm dừng lịch hằng ngày”, “Đổi giờ chạy sang 8:00”." },
      { question: "Thêm sale hoặc ứng dụng mới?", answer: "Nhắn “Thêm ứng dụng mới cho sale <tên>”. Trợ lý làm lại bước 3–5 chỉ cho ứng dụng đó." },
      { question: "Dùng trên hai máy được không?", answer: "Không dùng cùng một ứng dụng Zalo ở hai máy hoặc hai thư mục: token chỉ dùng được một lần nên máy kia sẽ bị từ chối. Dữ liệu chống trùng cũng chỉ nằm ở một thư mục." },
      { question: "Dùng cho doanh nghiệp khác?", answer: "Tải một bản workflow riêng và làm lại từ bước 1." },
      { question: "Nên dùng Claude hay ChatGPT?", answer: "Workflow chạy như nhau trên cả hai, câu lệnh giống nhau. Chọn công cụ doanh nghiệp đã có tài khoản. Claude cần gói Pro trở lên; ChatGPT gói nào cũng có Codex, gói Plus trở lên dùng được nhiều hơn." },
      { question: "Đổi từ Claude sang ChatGPT (hoặc ngược lại)?", answer: "Mở cùng thư mục workflow bằng công cụ mới theo bước 1, rồi nhắn “Tôi chuyển sang dùng công cụ này, tiếp tục từ lần trước”. Dữ liệu, khóa và tiến độ vẫn giữ nguyên. Nếu đã đặt lịch, nhờ trợ lý ở công cụ cũ tạm dừng lịch trước, rồi đặt lại ở công cụ mới. Không chạy cùng lúc ở hai công cụ." },
      { question: "ChatGPT báo lỗi mạng hoặc hỏi quyền mỗi lần chạy?", answer: "Thường do thư mục chưa được tin cậy. Mở cuộc trò chuyện Codex mới cùng thư mục, chọn tin cậy khi được hỏi, và chọn cho phép luôn khi Codex hỏi quyền chạy lệnh scripts/… của workflow. Lỗi mạng kiểu này không có nghĩa là khóa Zalo hay TinaCRM bị sai." }
    ] },
    { id: "privacy", title: "Dữ liệu khách hàng", paragraphs: ["Hội thoại, phân tích và khóa chỉ lưu trên máy này, trong thư mục workflow. Trợ lý không in nội dung tin nhắn hay khóa ra khung chat khi không cần. Khi gửi ảnh chụp màn hình cho trợ lý, nhớ che khóa và thông tin khách."] },
    { id: "usage", title: "Xem mức sử dụng", paragraphs: ["Claude: bấm tên tài khoản ở góc dưới bên trái → Usage.", "ChatGPT (Codex): mở chatgpt.com/codex/settings/usage để xem hạn mức còn lại và lúc được làm mới."] }
  ]
};

export type Phase = { id: string; title: string; when: string; from: number; to: number };

/** Groups of cycle steps (1-based, inclusive) so users can tell one-time setup from daily use. */
export const phases: Phase[] = [
  { id: "thiet-lap", title: "Thiết lập lần đầu", when: "Làm một lần cho mỗi doanh nghiệp.", from: 1, to: 5 },
  { id: "hang-ngay", title: "Dùng hằng ngày", when: "Thiết lập xong thì chỉ cần phần này. Trợ lý có thể tự chạy theo lịch.", from: 6, to: 7 },
  { id: "chien-dich", title: "Chiến dịch & báo cáo", when: "Dùng dữ liệu đã tích lũy để bán hàng và chăm sóc khách.", from: 8, to: 10 }
];
export const phaseOf = (step: number) => phases.find((p) => step >= p.from && step <= p.to);

export const guides: Guide[] = [...cycle, help];
export const stepNumber = (slug: string) => cycle.findIndex((g) => g.slug === slug) + 1;
export const guideHref = (slug: string) => `/huong-dan/${slug}`;
