import {Entity, model, property, belongsTo} from '@loopback/repository';
import { CategoriaMarca } from './categoria-marca.model';
import {Cliente} from './cliente.model';

@model({settings: {strict: false}})
export class Vehiculo extends CategoriaMarca {
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
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  serie_motor: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => CategoriaMarca)
  categoriaMarcaId: string;

  @property({
    type: 'string',
  })
  servicioId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
