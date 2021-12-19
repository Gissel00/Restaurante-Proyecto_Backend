import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Franquicias, FranquiciasRelations} from '../models';

export class FranquiciasRepository extends DefaultCrudRepository<
  Franquicias,
  typeof Franquicias.prototype.id,
  FranquiciasRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Franquicias, dataSource);
  }
}
