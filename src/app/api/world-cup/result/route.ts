import { fetchResultForMatch } from '@/features/world-cup/result-checker';
import { MatchToCheck } from '@/types/tournament';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const match = (await request.json()) as MatchToCheck;
	const result = await fetchResultForMatch(match);

	return NextResponse.json({
		result,
	});
}
