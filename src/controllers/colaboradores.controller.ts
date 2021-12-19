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
import {Colaboradores} from '../models';
import {ColaboradoresRepository} from '../repositories';

@authenticate('jwt')

export class ColaboradoresController {
  constructor(
    @repository(ColaboradoresRepository)
    public colaboradoresRepository: ColaboradoresRepository,
  ) { }

  @post('/colaboradores')
  @response(200, {
    description: 'Colaboradores model instance',
    content: {'application/json': {schema: getModelSchemaRef(Colaboradores)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaboradores, {
            title: 'NewColaboradores',
            exclude: ['id'],
          }),
        },
      },
    })
    colaboradores: Omit<Colaboradores, 'id'>,
  ): Promise<Colaboradores> {
    return this.colaboradoresRepository.create(colaboradores);
  }

  @get('/colaboradores/count')
  @response(200, {
    description: 'Colaboradores model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Colaboradores) where?: Where<Colaboradores>,
  ): Promise<Count> {
    return this.colaboradoresRepository.count(where);
  }

  @get('/colaboradores')
  @response(200, {
    description: 'Array of Colaboradores model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Colaboradores, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Colaboradores) filter?: Filter<Colaboradores>,
  ): Promise<Colaboradores[]> {
    return this.colaboradoresRepository.find(filter);
  }

  @patch('/colaboradores')
  @response(200, {
    description: 'Colaboradores PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaboradores, {partial: true}),
        },
      },
    })
    colaboradores: Colaboradores,
    @param.where(Colaboradores) where?: Where<Colaboradores>,
  ): Promise<Count> {
    return this.colaboradoresRepository.updateAll(colaboradores, where);
  }

  @get('/colaboradores/{id}')
  @response(200, {
    description: 'Colaboradores model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Colaboradores, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Colaboradores, {exclude: 'where'}) filter?: FilterExcludingWhere<Colaboradores>
  ): Promise<Colaboradores> {
    return this.colaboradoresRepository.findById(id, filter);
  }

  @patch('/colaboradores/{id}')
  @response(204, {
    description: 'Colaboradores PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaboradores, {partial: true}),
        },
      },
    })
    colaboradores: Colaboradores,
  ): Promise<void> {
    await this.colaboradoresRepository.updateById(id, colaboradores);
  }

  @put('/colaboradores/{id}')
  @response(204, {
    description: 'Colaboradores PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() colaboradores: Colaboradores,
  ): Promise<void> {
    await this.colaboradoresRepository.replaceById(id, colaboradores);
  }

  @del('/colaboradores/{id}')
  @response(204, {
    description: 'Colaboradores DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.colaboradoresRepository.deleteById(id);
  }
}
