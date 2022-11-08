import {Model, model, property} from '@loopback/repository';

@model()
export class Prueba extends Model {
  @property({
    type: 'string',
    required: true,
  })
  mesa: string;


  constructor(data?: Partial<Prueba>) {
    super(data);
  }
}

export interface PruebaRelations {
  // describe navigational properties here
}

export type PruebaWithRelations = Prueba & PruebaRelations;
