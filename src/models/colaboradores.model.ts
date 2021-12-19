import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Colaboradores extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  numero: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Colaboradores>) {
    super(data);
  }
}

export interface ColaboradoresRelations {
  // describe navigational properties here
}

export type ColaboradoresWithRelations = Colaboradores & ColaboradoresRelations;
