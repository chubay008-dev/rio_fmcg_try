import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { site } from "@/lib/content";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_SELLER = process.env.EMAIL_SELLER || site.email;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Insert into Supabase contacts table
    const { data, error } = await supabase
      .from("contacts")
      .insert({ name, phone, email, message, email_seller: EMAIL_SELLER })
      .select("id");

    if (error) {
      console.error("[contact] Supabase insert failed:", error.message);
      return NextResponse.json(
        { ok: false, error: "Failed to save contact" },
        { status: 500 },
      );
    }

    const id = data?.[0]?.id;

    // Fire-and-forget email notification
    if (RESEND_API_KEY) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "RIO Contact Form <onboarding@resend.dev>",
          to: [EMAIL_SELLER],
          subject: `🆕 New Contact: ${name}`,
          text: `
📞 New contact form submission:

Tên: ${name}
Số điện thoại: ${phone}
Email: ${email}
Nội dung: ${message}

Xem chi tiết tại: https://rioasia.onrender.com/admin/contacts/${id}
          `,
        }),
      }).catch(() => {/* non-blocking, ignore errors */});
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 },
    );
  }
}
