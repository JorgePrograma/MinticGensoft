import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Cliente, CategoriaMarca, Servicio} from '../models';
import {ClienteRepository} from './cliente.repository';
import {CategoriaMarcaRepository} from './categoria-marca.repository';
import {ServicioRepository} from './servicio.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Vehiculo.prototype.id>;

  public readonly categoriaMarca: BelongsToAccessor<CategoriaMarca, typeof Vehiculo.prototype.id>;

  public readonly servicio: HasOneRepositoryFactory<Servicio, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('CategoriaMarcaRepository') protected categoriaMarcaRepositoryGetter: Getter<CategoriaMarcaRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.servicio = this.createHasOneRepositoryFactoryFor('servicio', servicioRepositoryGetter);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
    this.categoriaMarca = this.createBelongsToAccessorFor('categoriaMarca', categoriaMarcaRepositoryGetter,);
    this.registerInclusionResolver('categoriaMarca', this.categoriaMarca.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
