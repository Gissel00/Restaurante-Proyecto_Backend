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
import {Franquicias} from '../models';
import {FranquiciasRepository} from '../repositories';

@authenticate('jwt')

export class FranquiciasController {
  constructor(
    @repository(FranquiciasRepository)
    public franquiciasRepository: FranquiciasRepository,
  ) { }

  @post('/franquicias')
  @response(200, {
    description: 'Franquicias model instance',
    content: {'application/json': {schema: getModelSchemaRef(Franquicias)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Franquicias, {
            title: 'NewFranquicias',
            exclude: ['id'],
          }),
        },
      },
    })
    franquicias: Omit<Franquicias, 'id'>,
  ): Promise<Franquicias> {
    return this.franquiciasRepository.create(franquicias);
  }

  @get('/franquicias/count')
  @response(200, {
    description: 'Franquicias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Franquicias) where?: Where<Franquicias>,
  ): Promise<Count> {
    return this.franquiciasRepository.count(where);
  }

  @get('/franquicias')
  @response(200, {
    description: 'Array of Franquicias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Franquicias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Franquicias) filter?: Filter<Franquicias>,
  ): Promise<Franquicias[]> {
    return this.franquiciasRepository.find(filter);
  }

  @patch('/franquicias')
  @response(200, {
    description: 'Franquicias PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Franquicias, {partial: true}),
        },
      },
    })
    franquicias: Franquicias,
    @param.where(Franquicias) where?: Where<Franquicias>,
  ): Promise<Count> {
    return this.franquiciasRepository.updateAll(franquicias, where);
  }

  @get('/franquicias/{id}')
  @response(200, {
    description: 'Franquicias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Franquicias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Franquicias, {exclude: 'where'}) filter?: FilterExcludingWhere<Franquicias>
  ): Promise<Franquicias> {
    return this.franquiciasRepository.findById(id, filter);
  }

  @patch('/franquicias/{id}')
  @response(204, {
    description: 'Franquicias PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Franquicias, {partial: true}),
        },
      },
    })
    franquicias: Franquicias,
  ): Promise<void> {
    await this.franquiciasRepository.updateById(id, franquicias);
  }

  @put('/franquicias/{id}')
  @response(204, {
    description: 'Franquicias PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() franquicias: Franquicias,
  ): Promise<void> {
    await this.franquiciasRepository.replaceById(id, franquicias);
  }

  @del('/franquicias/{id}')
  @response(204, {
    description: 'Franquicias DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.franquiciasRepository.deleteById(id);
  }
}
