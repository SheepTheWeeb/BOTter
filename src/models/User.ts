import { Model } from 'sequelize';

export class User extends Model {
  public id!: number;
  public discord_id!: string;
  public discord_tag!: string;
  public created_at!: Date;
  public updated_at!: Date;
}
