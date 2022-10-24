import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import { Persona } from './persona.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Cliente extends Persona {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
