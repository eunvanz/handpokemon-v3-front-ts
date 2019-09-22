import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

const WaypointListContainer = ({
  children,
  onLoad,
  lastPage,
  loading,
  loadingComponent
}) => {
  return (
    <div>
      {children}
      {loading && loadingComponent}
      {!lastPage && !loading && (
        <div>
          <Waypoint onEnter={onLoad} />
        </div>
      )}
    </div>
  );
};

WaypointListContainer.propTypes = {
  onLoad: PropTypes.func.isRequired,
  lastPage: PropTypes.bool,
  loading: PropTypes.bool,
  loadingComponent: PropTypes.element
};

export default WaypointListContainer;
