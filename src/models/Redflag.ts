import { DataTypes, Sequelize, Model } from 'sequelize';
import { Otteruser } from './Otteruser';

export interface IRedflag {
  id?: number;
  user_id: number;
  received_from: number;
  reason: string;
  double_red: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class Redflag extends Model implements IRedflag {
  public static readonly TableName: string = 'redflag';

  public id!: number;
  public user_id!: number;
  public received_from!: number;
  public reason!: string;
  public double_red!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  public static prepareInit(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        received_from: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        reason: {
          type: DataTypes.STRING,
          allowNull: false
        },
        double_red: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: this.TableName,
        underscored: true
      }
    );
  }

  public static setAssociations() {
    this.belongsTo(Otteruser, { foreignKey: 'user_id', as: 'receiver' });
    this.belongsTo(Otteruser, {
      foreignKey: 'received_from',
      as: 'giver'
    });
  }
}
