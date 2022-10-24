import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CategoriaMarca} from '../models';
import {CategoriaMarcaRepository} from '../repositories';

export class CategoriaMarcaController {
  constructor(
    @repository(CategoriaMarcaRepository)
    public categoriaMarcaRepository : CategoriaMarcaRepository,
  ) {}

  @post('/categoria-marcas')
  @response(200, {
    description: 'CategoriaMarca model instance',
    content: {'application/json': {schema: getModelSchemaRef(CategoriaMarca)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaMarca, {
            title: 'NewCategoriaMarca',
            exclude: ['id'],
          }),
        },
      },
    })
    categoriaMarca: Omit<CategoriaMarca, 'id'>,
  ): Promise<CategoriaMarca> {
    return this.categoriaMarcaRepository.create(categoriaMarca);
  }

  @get('/categoria-marcas/count')
  @response(200, {
    description: 'CategoriaMarca model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CategoriaMarca) where?: Where<CategoriaMarca>,
  ): Promise<Count> {
    return this.categoriaMarcaRepository.count(where);
  }

  @get('/categoria-marcas')
  @response(200, {
    description: 'Array of CategoriaMarca model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CategoriaMarca, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CategoriaMarca) filter?: Filter<CategoriaMarca>,
  ): Promise<CategoriaMarca[]> {
    return this.categoriaMarcaRepository.find(filter);
  }

  @patch('/categoria-marcas')
  @response(200, {
    description: 'CategoriaMarca PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaMarca, {partial: true}),
        },
      },
    })
    categoriaMarca: CategoriaMarca,
    @param.where(CategoriaMarca) where?: Where<CategoriaMarca>,
  ): Promise<Count> {
    return this.categoriaMarcaRepository.updateAll(categoriaMarca, where);
  }

  @get('/categoria-marcas/{id}')
  @response(200, {
    description: 'CategoriaMarca model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CategoriaMarca, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CategoriaMarca, {exclude: 'where'}) filter?: FilterExcludingWhere<CategoriaMarca>
  ): Promise<CategoriaMarca> {
    return this.categoriaMarcaRepository.findById(id, filter);
  }

  @patch('/categoria-marcas/{id}')
  @response(204, {
    description: 'CategoriaMarca PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaMarca, {partial: true}),
        },
      },
    })
    categoriaMarca: CategoriaMarca,
  ): Promise<void> {
    await this.categoriaMarcaRepository.updateById(id, categoriaMarca);
  }

  @put('/categoria-marcas/{id}')
  @response(204, {
    description: 'CategoriaMarca PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() categoriaMarca: CategoriaMarca,
  ): Promise<void> {
    await this.categoriaMarcaRepository.replaceById(id, categoriaMarca);
  }

  @del('/categoria-marcas/{id}')
  @response(204, {
    description: 'CategoriaMarca DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriaMarcaRepository.deleteById(id);
  }
}
