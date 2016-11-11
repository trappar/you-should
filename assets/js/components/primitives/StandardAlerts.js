import React from 'react';
import Alert from './Alert';
import AlertStore from '../../stores/AlertStore';
import { observer } from 'mobx-react';

export default observer(StandardAlerts);

/**
 * @returns {Object|null}
 * @constructor
 */
function StandardAlerts({ alerts }) {
  return (
    <div>
      <Alert type="danger" onDismiss={() => alerts.clearErrors(true)}>
        {alerts.errors}
      </Alert>
      <Alert type="warning" onDismiss={() => alerts.clearWarnings(true)}>
        {alerts.warnings}
      </Alert>
      <Alert type="success" onDismiss={() => alerts.clearSuccesses(true)}>
        {alerts.successes}
      </Alert>
    </div>
  );
}
StandardAlerts.propTypes = {
  alerts: React.PropTypes.instanceOf(AlertStore)
};
