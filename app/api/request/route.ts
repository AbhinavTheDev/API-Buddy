import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, requestOptions } = await req.json();

    if (!url) {
      return NextResponse.json({ status: 400, ok: false, error: "Missing URL" }, { status: 400 });
    }

    const { method = "GET", headers = {}, body, ...rest } = requestOptions || {};

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers,
      ...rest,
    };

    // Only include body for non-GET/HEAD
    if (method !== "GET" && method !== "HEAD" && body !== undefined) {
      fetchOptions.body = body;
    }

    const response = await fetch(url, fetchOptions);

    // Try to parse as JSON, fallback to text
    const contentType = response.headers.get("content-type") || "";
    let rawData: any;
    if (contentType.includes("application/json")) {
      rawData = await response.json();
    } else {
      rawData = await response.text();
    }

    // Collect response headers as object
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data: rawData,
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      ok: false,
      error: err?.message || "Unknown error",
    }, { status: 500 });
  }
}