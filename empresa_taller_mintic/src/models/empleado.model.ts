import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Directivo} from './directivo.model';
import { Persona } from './persona.model';

@model()
export class Empleado extends Persona {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  sueldo: number;

  @property({
    type: 'string',
    required: true,
  })
  horario: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  @hasOne(() => Directivo)
  directivo: Directivo;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
