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
      <Alert type="danger" onDismiss={() => alerts.clear('error', 'parent')}>
        {alerts.get('error', 'parent')}
      </Alert>
      <Alert type="warning" onDismiss={() => alerts.clear('warning', 'parent')}>
        {alerts.get('warning', 'parent')}
      </Alert>
      <Alert type="success" onDismiss={() => alerts.clear('success', 'parent')}>
        {alerts.get('success', 'parent')}
      </Alert>
    </div>
  );
}
StandardAlerts.propTypes = {
  alerts: React.PropTypes.instanceOf(AlertStore)
};
