import React, { PropTypes } from 'react';
import Alert from './Alert';
import AlertStore from '../../stores/AlertStore';
import { observer } from 'mobx-react';

export default observer(StandardAlerts);

const clear = (alerts, type, direction) => () => alerts.clear(type, direction);

/**
 * @returns {Object|null}
 * @constructor
 */
function StandardAlerts({ alerts, direction = 'parent' }) {
  return (
    <div>
      <Alert type="danger" onDismiss={clear(alerts, 'error', direction)}>
        {alerts.get('error', direction)}
      </Alert>
      <Alert type="warning" onDismiss={clear(alerts, 'warning', direction)}>
        {alerts.get('warning', direction)}
      </Alert>
      <Alert type="success" onDismiss={clear(alerts, 'success', direction)}>
        {alerts.get('success', direction)}
      </Alert>
    </div>
  );
}
StandardAlerts.propTypes = {
  alerts: PropTypes.instanceOf(AlertStore),
  direction: PropTypes.string,
};
