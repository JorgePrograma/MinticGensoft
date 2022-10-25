import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Directivo,
  Empleado,
} from '../models';
import {DirectivoRepository} from '../repositories';

export class DirectivoEmpleadoController {
  constructor(
    @repository(DirectivoRepository)
    public directivoRepository: DirectivoRepository,
  ) { }

  @get('/directivos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Directivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Directivo.prototype.id,
  ): Promise<Empleado> {
    return this.directivoRepository.empleado(id);
  }
}
