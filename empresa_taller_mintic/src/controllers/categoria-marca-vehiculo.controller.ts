import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CategoriaMarca,
  Vehiculo,
} from '../models';
import {CategoriaMarcaRepository} from '../repositories';

export class CategoriaMarcaVehiculoController {
  constructor(
    @repository(CategoriaMarcaRepository)
    public categoriaMarcaRepository: CategoriaMarcaRepository,
  ) { }

  @get('/categoria-marcas/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to CategoriaMarca',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof CategoriaMarca.prototype.id,
  ): Promise<Vehiculo> {
    return this.categoriaMarcaRepository.vehiculo(id);
  }
}
