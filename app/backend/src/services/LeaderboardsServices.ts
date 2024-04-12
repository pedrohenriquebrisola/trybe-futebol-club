import { ILeaderBoardTotal, IMatches } from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModels';
import TeamsModel from '../models/TeamsModels';

export default class LeaderBoardsService {
  // prettier-ignore
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
  public async findStatisc(id: number, homeTeam: boolean) {
    const allMatche = await this.matchesModel.findAllProgress(false);
    const result = LeaderBoardsService.creteResult();
    allMatche.forEach((matche) => {
      const team = homeTeam === true ? id === matche.homeTeamId : id === matche.awayTeamId;
      if (team) {
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

  // prettier-ignore
  public async findStatiscAll(id: number) {
    const allMatche = await this.matchesModel.findAllProgress(false);
    const result = LeaderBoardsService.creteResult();
    allMatche.forEach((matche) => {
      if (id === matche.homeTeamId || id === matche.awayTeamId) {
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

  // prettier-ignore
  static ordenArray(array: ILeaderBoardTotal[]) {
    const arrayTeams = array.sort(
      (a: ILeaderBoardTotal, b: ILeaderBoardTotal) => {
        if (a.totalPoints !== b.totalPoints) {
          return b.totalPoints - a.totalPoints;
        }
        if (a.totalVictories !== b.totalVictories) {
          return b.totalVictories - a.totalVictories;
        }
        if (a.goalsBalance !== b.goalsBalance) {
          return b.goalsBalance - a.goalsBalance;
        }
        return b.goalsFavor - a.goalsFavor;
      },
    );
    return arrayTeams;
  }

  // prettier-ignore
  public async findAll(homeOrWay: boolean, all: boolean): Promise<ILeaderBoardTotal[]> {
    const allTeams = await this.teamsModel.findAll();
    const leaderBoardsPromises = allTeams.map(async (team) => {
      const result = all === false ? await this.findStatisc(team.id, homeOrWay)
        : await this.findStatiscAll(team.id);
      const newResult = {
        name: team.teamName,
        totalPoints: result.totalVictories * 3 + result.totalDraws,
        ...result,
        goalsBalance: result.goalsFavor - result.goalsOwn,
        efficiency: (((result.totalVictories * 3 + result.totalDraws)
        / (result.totalGames * 3)) * 100).toFixed(2),
      };
      return newResult;
    });
    const leaderBoards = await Promise.all(leaderBoardsPromises);
    const ordemLeaderBoards = LeaderBoardsService.ordenArray(leaderBoards);
    return ordemLeaderBoards;
  }
}
