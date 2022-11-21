import * as React from 'react';
import PropTypes from 'prop-types';
import withHover from './withHover';

const container = {
  position: 'relative',
  display: 'flex',
};

class Tooltip extends React.Component {
  render() {
    const { children, element, hovering } = this.props;
    return (
      <div style={container}>
        {hovering && element}
        {children}
      </div>
    );
  }
}

export default withHover(Tooltip);
