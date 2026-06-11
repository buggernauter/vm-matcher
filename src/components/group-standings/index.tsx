import { GroupTableRow } from '@/types/tournament';

import {
	StyledGroupList,
	StyledGroupPanel,
	StyledGroupPosition,
	StyledGroupRow,
	StyledGroupStat,
	StyledGroupTable,
	StyledGroupTableHeader,
	StyledGroupTeam,
} from './styles';

export const GroupStandings = ({ groupTable }: { groupTable?: GroupTableRow[] }) => {
	return (
		<StyledGroupPanel>
			<StyledGroupTable>
				<StyledGroupTableHeader>
					<StyledGroupPosition>{''}</StyledGroupPosition>
					<StyledGroupTeam>Lag</StyledGroupTeam>
					<StyledGroupStat>M</StyledGroupStat>
					<StyledGroupStat>+/-</StyledGroupStat>
					<StyledGroupStat>P</StyledGroupStat>
				</StyledGroupTableHeader>
				<StyledGroupList>
					{groupTable?.map((groupTableRow) => (
						<StyledGroupRow key={groupTableRow.teamName}>
							<StyledGroupPosition>{groupTableRow.position}</StyledGroupPosition>
							<StyledGroupTeam>{groupTableRow.teamName}</StyledGroupTeam>
							<StyledGroupStat>{groupTableRow.playedGames}</StyledGroupStat>
							<StyledGroupStat>{`${groupTableRow.goalsFor}/${groupTableRow.goalsAgainst}`}</StyledGroupStat>
							<StyledGroupStat>{groupTableRow.points}</StyledGroupStat>
						</StyledGroupRow>
					))}
				</StyledGroupList>
			</StyledGroupTable>
		</StyledGroupPanel>
	);
};
