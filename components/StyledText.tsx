import * as React from 'react';

import { Text, TextProps } from './Themed';

export default function MonoText({ style, ...otherProps }: TextProps) {
  return <Text {...otherProps} style={[style, { fontFamily: 'Quicksand' }]} />;
}
