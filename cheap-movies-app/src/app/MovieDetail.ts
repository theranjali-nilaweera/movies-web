import { Charge } from './Charge';
export class MovieDetail {
  public id: string;
  public type?: string;
  public plot?: string;
  public rated?: string;
  public released?: string;
  public runtime?: string;
  public genre?: string;
  public director?: string;
  public writer?: string;
  public actors?: string;
  public language?: string;
  public awards?: string;
  public rating?: number;
  public votes?: number;
  public prices?: Charge[];
}
