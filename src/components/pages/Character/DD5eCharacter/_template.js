import React from 'react';
import { shape } from 'prop-types';

import Box from './shared/Box';

const Info = ({ data }) => <Box gridArea="info" title="Info" />;
Info.propTypes = { data: shape({}) };
Info.defaultProps = { data: {} };

export default Info;
