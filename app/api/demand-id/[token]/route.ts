import { idByToken } from "@/lib/functions/tokens";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  return NextResponse.json({
    id: idByToken(params.token)
  }, { status: 200 })
}
