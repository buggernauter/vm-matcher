import { NextResponse } from "next/server";

import {
  getStaticWCPayload,
  getWorldCupSchedulePayload,
} from "@/server/world-cup";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getWorldCupSchedulePayload());
  } catch {
    return NextResponse.json(getStaticWCPayload());
  }
}
