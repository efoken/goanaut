import { Shape, Types } from 'react-validators';

export default Shape({
  first_name: Types.string,
  has_profile_pic: Types.bool,
  id: Types.number,
  picture_url: Types.string,
  smart_name: Types.string,
  thumbnail_url: Types.string,
});
