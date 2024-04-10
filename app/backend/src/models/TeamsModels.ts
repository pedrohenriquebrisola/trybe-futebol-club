import SequelizeTeams from '../database/models/TeamsModel';
import { ITeamsModel } from '../Interfaces/teams/ITeams.model';
import ITeams from '../Interfaces/teams/ITeams';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    return dbData;
  }
}
