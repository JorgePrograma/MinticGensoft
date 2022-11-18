import { authenticate } from '@loopback/authentication';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  CategoriaMarca,
} from '../models';
import {VehiculoRepository} from '../repositories';

@authenticate("admin")
export class VehiculoCategoriaMarcaController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/categoria-marca', {
    responses: {
      '200': {
        description: 'CategoriaMarca belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CategoriaMarca)},
          },
        },
      },
    },
  })
  async getCategoriaMarca(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<CategoriaMarca> {
    return this.vehiculoRepository.categoriaMarca(id);
  }
}
