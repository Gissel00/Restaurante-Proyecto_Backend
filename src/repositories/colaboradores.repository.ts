import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Colaboradores, ColaboradoresRelations} from '../models';

export class ColaboradoresRepository extends DefaultCrudRepository<
  Colaboradores,
  typeof Colaboradores.prototype.id,
  ColaboradoresRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Colaboradores, dataSource);
  }
}
