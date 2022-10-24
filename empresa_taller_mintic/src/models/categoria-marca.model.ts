import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
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

  @belongsTo(() => Vehiculo)
  vehiculoId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CategoriaMarca>) {
    super(data);
  }
}

export interface CategoriaMarcaRelations {
  // describe navigational properties here
}

export type CategoriaMarcaWithRelations = CategoriaMarca & CategoriaMarcaRelations;
