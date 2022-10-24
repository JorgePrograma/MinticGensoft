import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CategoriaMarca, CategoriaMarcaRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class CategoriaMarcaRepository extends DefaultCrudRepository<
  CategoriaMarca,
  typeof CategoriaMarca.prototype.id,
  CategoriaMarcaRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof CategoriaMarca.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof CategoriaMarca.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(CategoriaMarca, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
