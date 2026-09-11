import { NextRequest, NextResponse } from "next/server";
import {
  sendMessage,
  sendTypingAction,
  verifyWebhookSecret,
  type ZaloBotUpdate,
} from "@/lib/zalo";
import { getAutoReply } from "@/lib/zaloAutoReply";

// Zalo Bot Platform gọi endpoint này (POST) mỗi khi có tin nhắn mới tới bot.
// Cấu hình webhook 1 lần bằng lib/zalo.ts#setWebhook (xem docs/ZALO_BOT_SETUP.md).

export async function POST(req: NextRequest) {
  // 1. Xác thực request thực sự đến từ Zalo (secret token do chính mình đặt khi setWebhook).
  const secretHeader = req.headers.get("x-bot-api-secret-token");
  if (!verifyWebhookSecret(secretHeader)) {
    return NextResponse.json({ ok: false, error: "invalid secret token" }, { status: 401 });
  }

  let update: ZaloBotUpdate;
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json body" }, { status: 400 });
  }

  const chatId = update?.message?.chat?.id;
  const text = update?.message?.text;

  // Không có tin nhắn/chat id hợp lệ (có thể là event khác) -> vẫn trả 200 để Zalo không retry.
  if (!chatId) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    await sendTypingAction(chatId);
    const reply = getAutoReply(text);
    await sendMessage(chatId, reply);
  } catch (err) {
    console.error("[zalo webhook] gửi phản hồi thất bại:", err);
    // Vẫn trả 200 cho Zalo — lỗi đã được log để debug, tránh Zalo lặp lại retry gây spam.
  }

  return NextResponse.json({ ok: true });
}

// Health check thủ công: mở URL webhook trên trình duyệt để xác nhận route đã deploy đúng.
export async function GET() {
  return NextResponse.json({ ok: true, message: "RIO Zalo Bot webhook đang hoạt động." });
}
