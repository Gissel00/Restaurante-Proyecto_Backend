import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Reservaciones} from '../models';
import {ReservacionesRepository} from '../repositories';

@authenticate('jwt')

export class ReservacionesController {
  constructor(
    @repository(ReservacionesRepository)
    public reservacionesRepository: ReservacionesRepository,
  ) { }

  @post('/reservaciones')
  @response(200, {
    description: 'Reservaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reservaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservaciones, {
            title: 'NewReservaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    reservaciones: Omit<Reservaciones, 'id'>,
  ): Promise<Reservaciones> {
    return this.reservacionesRepository.create(reservaciones);
  }

  @get('/reservaciones/count')
  @response(200, {
    description: 'Reservaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reservaciones) where?: Where<Reservaciones>,
  ): Promise<Count> {
    return this.reservacionesRepository.count(where);
  }

  @get('/reservaciones')
  @response(200, {
    description: 'Array of Reservaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reservaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reservaciones) filter?: Filter<Reservaciones>,
  ): Promise<Reservaciones[]> {
    return this.reservacionesRepository.find(filter);
  }

  @patch('/reservaciones')
  @response(200, {
    description: 'Reservaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservaciones, {partial: true}),
        },
      },
    })
    reservaciones: Reservaciones,
    @param.where(Reservaciones) where?: Where<Reservaciones>,
  ): Promise<Count> {
    return this.reservacionesRepository.updateAll(reservaciones, where);
  }

  @get('/reservaciones/{id}')
  @response(200, {
    description: 'Reservaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reservaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reservaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Reservaciones>
  ): Promise<Reservaciones> {
    return this.reservacionesRepository.findById(id, filter);
  }

  @patch('/reservaciones/{id}')
  @response(204, {
    description: 'Reservaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservaciones, {partial: true}),
        },
      },
    })
    reservaciones: Reservaciones,
  ): Promise<void> {
    await this.reservacionesRepository.updateById(id, reservaciones);
  }

  @put('/reservaciones/{id}')
  @response(204, {
    description: 'Reservaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reservaciones: Reservaciones,
  ): Promise<void> {
    await this.reservacionesRepository.replaceById(id, reservaciones);
  }

  @del('/reservaciones/{id}')
  @response(204, {
    description: 'Reservaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reservacionesRepository.deleteById(id);
  }
}
