import { NextResponse } from "next/server";

import {
  getStaticWorldCupSchedulePayload,
  getWorldCupResultSyncPayload,
} from "@/server/world-cup";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getWorldCupResultSyncPayload());
  } catch {
    return NextResponse.json({
      ...getStaticWorldCupSchedulePayload(),
      updatedMatchesCount: 0,
    });
  }
}
