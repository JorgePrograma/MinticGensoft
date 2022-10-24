import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CategoriaMarca, CategoriaMarcaRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class CategoriaMarcaRepository extends DefaultCrudRepository<
  CategoriaMarca,
  typeof CategoriaMarca.prototype.id,
  CategoriaMarcaRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof CategoriaMarca.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(CategoriaMarca, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
