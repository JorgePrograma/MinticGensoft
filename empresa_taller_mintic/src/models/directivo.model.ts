import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Empleado} from './empleado.model';

@model()
export class Directivo extends Entity {
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

  @belongsTo(() => Empresa)
  empresaId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<Directivo>) {
    super(data);
  }
}

export interface DirectivoRelations {
  // describe navigational properties here
}

export type DirectivoWithRelations = Directivo & DirectivoRelations;
