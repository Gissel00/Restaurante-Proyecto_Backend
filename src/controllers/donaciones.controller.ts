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
import {Donaciones} from '../models';
import {DonacionesRepository} from '../repositories';

@authenticate('jwt')

export class DonacionesController {
  constructor(
    @repository(DonacionesRepository)
    public donacionesRepository: DonacionesRepository,
  ) { }

  @post('/donaciones')
  @response(200, {
    description: 'Donaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Donaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Donaciones, {
            title: 'NewDonaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    donaciones: Omit<Donaciones, 'id'>,
  ): Promise<Donaciones> {
    return this.donacionesRepository.create(donaciones);
  }

  @get('/donaciones/count')
  @response(200, {
    description: 'Donaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Donaciones) where?: Where<Donaciones>,
  ): Promise<Count> {
    return this.donacionesRepository.count(where);
  }

  @get('/donaciones')
  @response(200, {
    description: 'Array of Donaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Donaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Donaciones) filter?: Filter<Donaciones>,
  ): Promise<Donaciones[]> {
    return this.donacionesRepository.find(filter);
  }

  @patch('/donaciones')
  @response(200, {
    description: 'Donaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Donaciones, {partial: true}),
        },
      },
    })
    donaciones: Donaciones,
    @param.where(Donaciones) where?: Where<Donaciones>,
  ): Promise<Count> {
    return this.donacionesRepository.updateAll(donaciones, where);
  }

  @get('/donaciones/{id}')
  @response(200, {
    description: 'Donaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Donaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Donaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Donaciones>
  ): Promise<Donaciones> {
    return this.donacionesRepository.findById(id, filter);
  }

  @patch('/donaciones/{id}')
  @response(204, {
    description: 'Donaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Donaciones, {partial: true}),
        },
      },
    })
    donaciones: Donaciones,
  ): Promise<void> {
    await this.donacionesRepository.updateById(id, donaciones);
  }

  @put('/donaciones/{id}')
  @response(204, {
    description: 'Donaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() donaciones: Donaciones,
  ): Promise<void> {
    await this.donacionesRepository.replaceById(id, donaciones);
  }

  @del('/donaciones/{id}')
  @response(204, {
    description: 'Donaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.donacionesRepository.deleteById(id);
  }
}
