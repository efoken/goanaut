import { Shape, Types } from 'react-validators';

import ForSuperhostProps from './ForSuperhostProps';

export default Shape({
  bedrooms: Types.number,
  bathrooms: Types.number,
  beds: Types.number,
  city: Types.string,
  distance: Types.string,
  id: Types.number,
  instant_bookable: Types.bool,
  is_business_travel_ready: Types.bool,
  is_new_listing: Types.bool,
  lat: Types.number,
  lng: Types.number,
  name: Types.string,
  neighborhood: Types.string,
  person_capacity: Types.number,
  picture_count: Types.number,
  picture_url: Types.string,
  picture_urls: Types.arrayOf(Types.string),
  primary_host: ForSuperhostProps,
  property_type: Types.string,
  property_type_id: Types.number,
  public_address: Types.string,
  reviews_count: Types.number,
  room_type: Types.string,
  room_type_category: Types.string,
  star_rating: Types.number,
  thumbnail_url: Types.string,
  user: ForSuperhostProps,
  user_id: Types.number,
  xl_picture_url: Types.string,
  xl_picture_urls: Types.arrayOf(Types.string),
});
