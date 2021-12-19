import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Donaciones, DonacionesRelations} from '../models';

export class DonacionesRepository extends DefaultCrudRepository<
  Donaciones,
  typeof Donaciones.prototype.id,
  DonacionesRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Donaciones, dataSource);
  }
}
