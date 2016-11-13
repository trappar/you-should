import React from 'react';
import Alert from './Alert';
import AlertStore from '../../stores/AlertStore';
import { observer } from 'mobx-react';

export default observer(StandardAlerts);

/**
 * @returns {Object|null}
 * @constructor
 */
function StandardAlerts({ alerts, direction = 'parent' }) {
  return (
    <div>
      <Alert type="danger" onDismiss={() => alerts.clear('error', direction)}>
        {alerts.get('error', direction)}
      </Alert>
      <Alert type="warning" onDismiss={() => alerts.clear('warning', direction)}>
        {alerts.get('warning', direction)}
      </Alert>
      <Alert type="success" onDismiss={() => alerts.clear('success', direction)}>
        {alerts.get('success', direction)}
      </Alert>
    </div>
  );
}
StandardAlerts.propTypes = {
  alerts: React.PropTypes.instanceOf(AlertStore),
  direction: React.PropTypes.string,
};
