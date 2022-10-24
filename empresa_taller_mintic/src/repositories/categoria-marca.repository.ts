import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CategoriaMarca, CategoriaMarcaRelations} from '../models';

export class CategoriaMarcaRepository extends DefaultCrudRepository<
  CategoriaMarca,
  typeof CategoriaMarca.prototype.id,
  CategoriaMarcaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CategoriaMarca, dataSource);
  }
}
