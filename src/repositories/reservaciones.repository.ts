import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Reservaciones, ReservacionesRelations} from '../models';

export class ReservacionesRepository extends DefaultCrudRepository<
  Reservaciones,
  typeof Reservaciones.prototype.id,
  ReservacionesRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Reservaciones, dataSource);
  }
}
