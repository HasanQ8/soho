// src/app/api/soho-lead/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let payload: any;

    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      payload = Object.fromEntries(form.entries());
      payload.services = form.getAll("services");
      payload.industries = form.getAll("industries");
    } else {
      // default to JSON parse
      payload = await req.json().catch(() => ({}));
    }

    // Basic validation
    if (!payload.name || !payload.phone || !payload.email) {
      return Response.json(
        { ok: false, error: "Please fill name, phone and work email." },
        { status: 400 }
      );
    }

    // TODO: Persist to DB/CRM, send email, etc.
    // console.log("Lead payload:", payload);

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { ok: false, error: "Unexpected error. Please try again." },
      { status: 500 }
    );
  }
}
