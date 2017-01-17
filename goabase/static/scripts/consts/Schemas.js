import { Schema } from 'normalizr';

const country = new Schema('countries');
const party = new Schema('parties');

party.define({
  country,
});

export const countrySchema = country;
export const partySchema = party;
