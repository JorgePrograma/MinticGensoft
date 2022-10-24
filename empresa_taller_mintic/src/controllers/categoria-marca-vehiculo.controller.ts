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
  CategoriaMarca,
  Vehiculo,
} from '../models';
import {CategoriaMarcaRepository} from '../repositories';

export class CategoriaMarcaVehiculoController {
  constructor(
    @repository(CategoriaMarcaRepository) protected categoriaMarcaRepository: CategoriaMarcaRepository,
  ) { }

  @get('/categoria-marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of CategoriaMarca has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.categoriaMarcaRepository.vehiculos(id).find(filter);
  }

  @post('/categoria-marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CategoriaMarca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CategoriaMarca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInCategoriaMarca',
            exclude: ['id'],
            optional: ['categoriaMarcaId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.categoriaMarcaRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/categoria-marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CategoriaMarca.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.categoriaMarcaRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/categoria-marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CategoriaMarca.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.categoriaMarcaRepository.vehiculos(id).delete(where);
  }
}
