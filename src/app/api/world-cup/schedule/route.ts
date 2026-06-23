import { loadLocalSchedule } from '@/server/data/load-local-schedule';
import { buildScheduleData } from '@/server/data/schedule-base';

export const dynamic = 'force-dynamic';

export async function GET() {
	const scheduleData = await loadLocalSchedule();
	const schedule = buildScheduleData(scheduleData);

	return Response.json({
		...schedule,
		source: 'dynamic',
		syncedAt: new Date().toISOString(),
	});
}
