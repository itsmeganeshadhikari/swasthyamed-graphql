import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from '../schema/card.schema';
import { BaseRepository } from './base.repository';
import { BaseRepo } from './base.repo';

@Injectable()
export class CardRepository extends BaseRepo<CardDocument> {
  constructor(
    @InjectModel(Card.name)
    private readonly card: Model<CardDocument>,
  ) {
    super(card);
  }
}
