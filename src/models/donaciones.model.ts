import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Donaciones extends Entity {
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
  fudacion: string;

  @property({
    type: 'number',
    required: true,
  })
  monto: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Donaciones>) {
    super(data);
  }
}

export interface DonacionesRelations {
  // describe navigational properties here
}

export type DonacionesWithRelations = Donaciones & DonacionesRelations;
