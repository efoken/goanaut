import { Shape, Types } from 'react-validators';

import ForNameAndPictureProps from './ForNameAndPictureProps';

export default Shape(Object.assign({}, ForNameAndPictureProps, {
  is_superhost: Types.bool,
}));
