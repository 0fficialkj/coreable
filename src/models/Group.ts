import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import { User } from './User';
import { Industry } from './Industry';
import { Team } from './Team';

export class Group extends Model {
  public groupID!: number;
  public teamName!: string;
  public groupLeader!: number;
  public inviteCode!: string;
  public industryID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Group.init({
  'groupID': {
    'type': DataTypes.INTEGER.UNSIGNED,
    'primaryKey': true,
    'autoIncrement': true
  },
  'teamName': {
    'type': DataTypes.STRING,
    'allowNull': false
  },
  'groupLeader': {
    'type': DataTypes.INTEGER.UNSIGNED,
    'allowNull': false,
  },
  'inviteCode': {
    'type': DataTypes.STRING,
    'allowNull': false,
  },
  'industryID': {
    'type': DataTypes.INTEGER.UNSIGNED,
    'allowNull': false
  }
}, {
  'tableName': 'GROUP',
  'sequelize': sequelize
});

// Relations
Group.belongsTo(Industry, { foreignKey: { name: 'industryID', allowNull: false, field: 'industryID' }});
Group.belongsTo(User, { foreignKey: { name: 'userID', allowNull: false, field: 'groupLeader' } });
