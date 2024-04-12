import { ILeaderBoard, IMatches } from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModels';
import TeamsModel from '../models/TeamsModels';

// prettier-ignore
export default class LeaderBoardsService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamsModel = new TeamsModel(),
  ) {}

  static findResult(id: number, matche: IMatches) {
    if (id === matche.homeTeamId) {
      return matche.homeTeamGoals - matche.awayTeamGoals;
    }
    return matche.awayTeamGoals - matche.homeTeamGoals;
  }

  static creteResult() {
    const result = {
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    };
    return result;
  }

  // prettier-ignore
  public async findStatisc(id: number) {
    const allMatche = await this.matchesModel.findAllProgress(false);
    const result = LeaderBoardsService.creteResult();
    allMatche.forEach((matche) => {
      if (id === matche.awayTeamId || id === matche.homeTeamId) {
        result.totalGames += 1;
        result.totalVictories += LeaderBoardsService.findResult(id, matche) > 0 ? 1 : 0;
        result.totalDraws += LeaderBoardsService.findResult(id, matche) === 0 ? 1 : 0;
        result.totalLosses += LeaderBoardsService.findResult(id, matche) < 0 ? 1 : 0;
        result.goalsFavor += id === matche.homeTeamId ? matche.homeTeamGoals : matche.awayTeamGoals;
        result.goalsOwn += id === matche.homeTeamId ? matche.awayTeamGoals : matche.homeTeamGoals;
      }
    });
    return result;
  }

  public async findAll(): Promise<ILeaderBoard[]> {
    const allTeams = await this.teamsModel.findAll();

    const leaderBoardsPromises = allTeams.map(async (team) => {
      const result = await this.findStatisc(team.id);
      const newResult = {
        name: team.teamName,
        totalPoints: result.totalVictories * 3 + result.totalDraws,
        ...result,
      };
      return newResult;
    });

    const leaderBoards = await Promise.all(leaderBoardsPromises);
    return leaderBoards;
  }
}
