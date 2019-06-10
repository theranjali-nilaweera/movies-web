import { MovieDetail } from './MovieDetail';
import { MovieSummary } from './MovieSummary';

export class Movie {
  public id: string;
  public summary ?: MovieSummary;
  public detail ?: MovieDetail;

}
