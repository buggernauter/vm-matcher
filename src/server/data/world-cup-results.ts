import type { GameResult } from '@/types/tournament';
import updatedResults from './updated-results.json';

export type WorldCupResults = Record<string, GameResult>;

export const worldCupResults = updatedResults as WorldCupResults;
