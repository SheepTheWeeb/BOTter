import { Model } from 'sequelize';

export class Redflag extends Model {
  public id!: number;
  public user_id!: number;
  public received_from!: number;
  public reason!: string;
  public double_red!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
}
