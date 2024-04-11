import SequelizeTeams from '../database/models/TeamsModel';
import SequelizeMatches from '../database/models/MatchesModel';
import { IMatchesModel } from '../Interfaces/matches/IMatches.model';
import { IMatches, IMatchesCreate } from '../Interfaces/matches/IMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async findAllProgress(progress: true | false): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: progress },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }
  // prettier-ignore

  async finishingProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  // prettier-ignore
  async updateMatche(
    homeTeamG: number,
    awayTeamG: number,
    id: number,
  ): Promise<void> {
    await this.model.update(
      { homeTeamGoals: homeTeamG, awayTeamGoals: awayTeamG },
      { where: { id } },
    );
  }

  async create(data: IMatchesCreate): Promise<IMatches> {
    const dbData = await this.model.create({ ...data, inProgress: true });
    return dbData;
  }
}
