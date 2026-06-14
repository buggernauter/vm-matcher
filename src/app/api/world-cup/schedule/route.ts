import { loadLocalResults } from '@/server/data/load-local-results';
import { buildScheduleData } from '@/server/data/schedule-base';

export const dynamic = 'force-dynamic';

export async function GET() {
	const updatedResults = await loadLocalResults();
	const schedule = buildScheduleData(updatedResults);

	return Response.json({
		...schedule,
		source: 'dynamic',
		syncedAt: new Date().toISOString(),
	});
}
