// Logic trả lời tự động cho Zalo Bot của RIO.
// Dùng lại nội dung đã có trong src/lib/content.ts để câu trả lời luôn
// nhất quán với thông tin hiển thị trên website.

import { site, faq, legal } from "@/lib/content";

type Rule = {
  keywords: string[];
  reply: string;
};

const WELCOME = `Xin chào 👋 Cảm ơn bạn đã nhắn tin cho RIO!

RIO là nước trái cây lên men đóng chai, nồng độ cồn nhẹ, 7 vị trái cây — sản phẩm dành cho người từ 18 tuổi trở lên.

Bạn có thể hỏi mình về:
• Nồng độ cồn / thành phần
• Mua ở đâu / đại lý phân phối
• Bảo quản, hạn sử dụng
• Đặt hàng sỉ, hợp tác phân phối

Hoặc gõ "hotline" để lấy số điện thoại liên hệ trực tiếp với đội ngũ RIO.`;

const FALLBACK = `Mình chưa có sẵn câu trả lời chính xác cho câu hỏi này 🙏

Bạn vui lòng liên hệ trực tiếp đội ngũ RIO để được hỗ trợ nhanh nhất:
📞 Hotline: ${site.phone}
📧 Email: ${site.email}
🕐 Giờ làm việc: ${site.hours}`;

const HOTLINE_REPLY = `📞 Hotline: ${site.phone}
📧 Email: ${site.email}
📍 ${site.address}
🕐 ${site.hours}

Đội ngũ RIO phản hồi trong vòng 1 ngày làm việc.`;

const LEGAL_REPLY = `⚠️ ${legal.ageWarning}.
${legal.pregnancyWarning}
${legal.drinkResponsibly}.`;

// Ánh xạ FAQ có sẵn trên site thành rule theo từ khoá, để bot Zalo
// và trang FAQ web luôn nói cùng một nội dung.
const faqRules: Rule[] = faq.items.map((item) => ({
  keywords: extractKeywords(item.q),
  reply: item.a,
}));

// Một vài rule bổ sung không có trong FAQ web (chào hỏi, hotline, cảnh báo độ tuổi...).
const extraRules: Rule[] = [
  {
    keywords: ["hotline", "so dien thoai", "lien he", "gọi", "goi dien"],
    reply: HOTLINE_REPLY,
  },
  {
    keywords: ["18 tuoi", "duoi 18", "tre em", "vi thanh nien"],
    reply: LEGAL_REPLY,
  },
  {
    keywords: ["gia", "bao nhieu tien", "giá bán", "price"],
    reply: `RIO hiện phân phối qua kênh bán lẻ và đại lý nên giá có thể khác nhau theo điểm bán. Bạn để lại khu vực đang cần mua, đội ngũ RIO sẽ báo giá và đại lý gần nhất nhé.\n\nHoặc liên hệ nhanh: 📞 ${site.phone}`,
  },
  {
    keywords: ["dat hang si", "phan phoi", "hop tac", "dai ly", "nha phan phoi"],
    reply: `RIO luôn tìm kiếm đối tác phân phối/đại lý mới 🤝. Vui lòng để lại: khu vực kinh doanh, quy mô cửa hàng/kênh bán, và số điện thoại — đội ngũ RIO sẽ liên hệ lại trong 1 ngày làm việc.\n\nHoặc gọi trực tiếp: 📞 ${site.phone}`,
  },
];

const allRules: Rule[] = [...extraRules, ...faqRules];

const GREETINGS = ["xin chao", "chao", "hi", "hello", "alo", "start", "menu"];

/** Bỏ dấu tiếng Việt + về chữ thường để so khớp từ khoá đơn giản, ổn định. */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim();
}

function extractKeywords(question: string): string[] {
  // Lấy vài từ khoá đặc trưng nhất từ câu hỏi FAQ gốc (bỏ dấu) để so khớp.
  const normalized = normalize(question);
  return [normalized];
}

/**
 * Tạo câu trả lời tự động dựa trên nội dung tin nhắn đến.
 * Trả về null nếu không nhận diện được (nên fallback ra FALLBACK ở nơi gọi).
 */
export function getAutoReply(rawText: string | undefined | null): string {
  if (!rawText || !rawText.trim()) return FALLBACK;

  const text = normalize(rawText);

  if (GREETINGS.some((g) => text.includes(g))) {
    return WELCOME;
  }

  for (const rule of allRules) {
    if (rule.keywords.some((kw) => text.includes(kw) || kw.includes(text))) {
      return rule.reply;
    }
  }

  // So khớp lỏng hơn: kiểm tra từng từ trong câu hỏi FAQ gốc có xuất hiện đủ nhiều trong tin nhắn không.
  for (const item of faq.items) {
    const qWords = normalize(item.q)
      .split(/\s+/)
      .filter((w) => w.length > 2);
    const hitCount = qWords.filter((w) => text.includes(w)).length;
    if (qWords.length > 0 && hitCount / qWords.length >= 0.5) {
      return item.a;
    }
  }

  return FALLBACK;
}
