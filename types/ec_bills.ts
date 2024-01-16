import { Double } from 'mongodb';
import {  Model } from 'sequelize';
import { Json } from 'sequelize/types/utils';


class EcBills extends Model {
  public id!: number;
  public invoice_number!: string;
  public total_amount!: number;
  public products!: JSON
  public createdAt!: Date;
  public updatedAt!: Date;
}
  

  export default EcBills