import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class CategoriaMarca extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<CategoriaMarca>) {
    super(data);
  }
}

export interface CategoriaMarcaRelations {
  // describe navigational properties here
}

export type CategoriaMarcaWithRelations = CategoriaMarca & CategoriaMarcaRelations;
