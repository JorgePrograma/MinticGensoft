import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Persona } from './persona.model';
import {Empleado} from './empleado.model';
import {Empresa} from './empresa.model';

@model()
export class Directivo extends Persona {
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
  categoria: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<Directivo>) {
    super(data);
  }
}

export interface DirectivoRelations {
  // describe navigational properties here
}

export type DirectivoWithRelations = Directivo & DirectivoRelations;
