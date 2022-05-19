import { DataTypes, Sequelize, Model } from 'sequelize';
import { Redflag } from './Redflag';

export interface IOtteruser {
  id?: number;
  discord_id: string;
  discord_tag: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Otteruser extends Model implements IOtteruser {
  public static readonly TableName: string = 'otteruser';

  public id!: number;
  public discord_id!: string;
  public discord_tag!: string;
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
        discord_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        discord_tag: {
          type: DataTypes.STRING,
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
    this.hasMany(Redflag, {
      foreignKey: 'user_id'
    });
    this.hasMany(Redflag, {
      foreignKey: 'received_from'
    });
  }
}
