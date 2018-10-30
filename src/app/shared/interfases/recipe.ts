import {User} from './user';
import {Ingridient} from './ingridient';

export interface Recipe {
  categoryId?: string;
  title?: string;
  description?: string;
  favorite?: boolean;
  ingridients?: Ingridient[];
  instructions?: string;
  likes?: number;
  photoUrl?: string;
  user?: string;
  _id?: string;
}


