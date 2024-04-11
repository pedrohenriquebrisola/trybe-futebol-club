import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './TeamsModel';
// prettier-ignore
class SequelizeMatches extends Model<
InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>
> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}
// prettier-ignore
SequelizeMatches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'home_team_id',
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'away_team_id',
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);
SequelizeMatches.belongsTo(SequelizeTeam, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
SequelizeMatches.belongsTo(SequelizeTeam, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
SequelizeTeam.hasMany(SequelizeMatches, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
SequelizeTeam.hasMany(SequelizeMatches, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
export default SequelizeMatches;
