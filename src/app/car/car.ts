import { User } from '../user/user';

export interface Car {
  id?: string;
  marca: string;
  modelo: string;
  cor: string;
  usuarioId: string;
  user?: User;
}
