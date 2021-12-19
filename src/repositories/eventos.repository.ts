import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Eventos, EventosRelations} from '../models';

export class EventosRepository extends DefaultCrudRepository<
  Eventos,
  typeof Eventos.prototype.id,
  EventosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Eventos, dataSource);
  }
}
