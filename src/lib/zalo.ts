// Server-only helper for the Zalo Bot Platform API (bot.zaloplatforms.com).
// This talks to Zalo's bot HTTP API, which follows the same shape as the
// Telegram Bot API: https://bot-api.zapps.me/bot<TOKEN>/<method>
//
// Docs: https://bot.zapps.me/docs/
//
// Never import this file from a Client Component — it reads process.env
// server-side secrets (ZALO_BOT_TOKEN).

const ZALO_BOT_API_BASE = "https://bot-api.zapps.me/bot";

function getBotToken(): string {
  const token = process.env.ZALO_BOT_TOKEN;
  if (!token) {
    throw new Error(
      "ZALO_BOT_TOKEN chưa được cấu hình. Thêm biến môi trường ZALO_BOT_TOKEN (lấy từ Zalo Bot Creator)."
    );
  }
  return token;
}

async function callZaloBotApi<T = unknown>(
  method: string,
  payload: Record<string, unknown>
): Promise<T> {
  const token = getBotToken();
  const url = `${ZALO_BOT_API_BASE}${token}/${method}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Bot API calls should never be cached.
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || (data && data.ok === false)) {
    const errMsg =
      (data && (data.description || data.message)) || `HTTP ${res.status}`;
    throw new Error(`Zalo Bot API lỗi (${method}): ${errMsg}`);
  }

  return data as T;
}

/** Gửi tin nhắn văn bản tới một chat (user hoặc group) qua bot. */
export async function sendMessage(chatId: string | number, text: string) {
  return callZaloBotApi("sendMessage", {
    chat_id: chatId,
    text,
  });
}

/** Gửi trạng thái "đang soạn tin nhắn..." để trải nghiệm tự nhiên hơn. */
export async function sendTypingAction(chatId: string | number) {
  try {
    await callZaloBotApi("sendChatAction", {
      chat_id: chatId,
      action: "typing",
    });
  } catch {
    // Non-critical — bỏ qua nếu API chưa hỗ trợ hoặc lỗi tạm thời.
  }
}

/** Đăng ký webhook URL cho bot. Chỉ cần gọi 1 lần sau khi deploy. */
export async function setWebhook(webhookUrl: string, secretToken: string) {
  return callZaloBotApi("setWebhook", {
    url: webhookUrl,
    secret_token: secretToken,
  });
}

/** Kiểm tra thông tin webhook hiện tại đang trỏ về đâu. */
export async function getWebhookInfo() {
  return callZaloBotApi("getWebhookInfo", {});
}

/** Xoá webhook (dùng khi chuyển sang long-polling hoặc đổi domain). */
export async function deleteWebhook() {
  return callZaloBotApi("deleteWebhook", {});
}

// --- Kiểu dữ liệu update đến từ webhook (rút gọn, đủ dùng) ---
export type ZaloBotUpdate = {
  update_id?: number;
  message?: {
    message_id?: string | number;
    chat?: { id: string | number; type?: string };
    from?: { id?: string | number; display_name?: string };
    text?: string;
    date?: number;
  };
};

/** So khớp header X-Bot-Api-Secret-Token với secret đã cấu hình. */
export function verifyWebhookSecret(headerValue: string | null): boolean {
  const expected = process.env.ZALO_BOT_WEBHOOK_SECRET;
  if (!expected) return false;
  if (!headerValue || headerValue.length !== expected.length) return false;
  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1) {
    mismatch |= headerValue.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return mismatch === 0;
}
