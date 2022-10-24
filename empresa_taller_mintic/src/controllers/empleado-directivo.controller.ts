import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empleado,
  Directivo,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoDirectivoController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/directivo', {
    responses: {
      '200': {
        description: 'Empleado has one Directivo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Directivo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Directivo>,
  ): Promise<Directivo> {
    return this.empleadoRepository.directivo(id).get(filter);
  }

  @post('/empleados/{id}/directivo', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Directivo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {
            title: 'NewDirectivoInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) directivo: Omit<Directivo, 'id'>,
  ): Promise<Directivo> {
    return this.empleadoRepository.directivo(id).create(directivo);
  }

  @patch('/empleados/{id}/directivo', {
    responses: {
      '200': {
        description: 'Empleado.Directivo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {partial: true}),
        },
      },
    })
    directivo: Partial<Directivo>,
    @param.query.object('where', getWhereSchemaFor(Directivo)) where?: Where<Directivo>,
  ): Promise<Count> {
    return this.empleadoRepository.directivo(id).patch(directivo, where);
  }

  @del('/empleados/{id}/directivo', {
    responses: {
      '200': {
        description: 'Empleado.Directivo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Directivo)) where?: Where<Directivo>,
  ): Promise<Count> {
    return this.empleadoRepository.directivo(id).delete(where);
  }
}
