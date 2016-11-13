import React, { Component, PropTypes } from 'react';
import Button from '../../primitives/Button';
import Pager from '../../primitives/Pager';
import Icon from '../../primitives/Icon';
import LinkButton from '../../primitives/LinkButton';
import ThemePicker from './theme-picker/ThemePicker';
import ChoiceControl from './ChoiceControl';
import { observer } from 'mobx-react';
import Decision from '../../../stores/Decision';
import StandardAlerts from '../../primitives/StandardAlerts';

@observer
export default class Config extends Component {
  constructor(props) {
    super(props);
    this.decision = props.decision;
    this.UI = props.decision.UI;
  }

  addChoice = () => {
    this.decision.setFilter();
    this.decision.addChoice();
  };
  removeChoice = (choice) => () => this.decision.removeChoice(choice);
  setTheme = (theme) => this.decision.setTheme(theme);
  clearFilter = () => this.decision.setFilter();
  handleFilterChange = (event) => this.decision.setFilter(event.target.value);

  render() {
    if (this.UI.configuring) {
      return (
        <div className="config">
          <StandardAlerts alerts={this.decision.alerts} direction="self"/>

          <Pager
            items={this.decision.filteredChoices.map((choice) => {
              return (
                <ChoiceControl
                  key={choice.id}
                  choice={choice}
                  addChoice={this.addChoice}
                  removeChoice={this.removeChoice(choice)}
                />
              );
            })}
            allItems={this.decision.choices}
            perPage={5}
          >
            {({ pagedItems, pagination }) => (
              <div>
                <div className="choices-header-bar row" style={{ flexWrap: 'nowrap' }}>
                  <h3 className="col-shrink col-no-padding">Choices</h3>
                  <div className="col-grow col-no-padding">
                    {pagination}
                  </div>
                </div>
                {pagedItems}
              </div>
            )}
          </Pager>

          <div>
            <div className="choices-bottom-controls row">
              <div className="col-grow col-no-padding">
                <LinkButton className="add-choice" onClick={this.addChoice}>
                  <Icon type="plus"/> Add Choice
                </LinkButton>
              </div>
              {
                this.decision.choices.length > 0 &&
                <div className="col-xs-6 col-no-padding filter-container">
                  <input type="text" className="form-control" placeholder="Filter Choices"
                         value={this.UI.filter}
                         onChange={this.handleFilterChange}
                  />
                  <a className="input-clear" onClick={this.clearFilter}>
                    <Icon type="times-circle"/>
                  </a>
                </div>
              }
            </div>
          </div>

          <ThemePicker
            currentTheme={this.decision.theme}
            themeChanged={this.setTheme}
          />

          <div className="row">
            <div className="col-xs-offset-1 col-xs-5">
              <Button
                extraClasses={`btn-${this.decision.theme} form-control`}
                onClick={this.props.onSave}>
                Save
              </Button>
            </div>
            <div className="col-xs-5">
              <Button
                extraClasses={`btn-${this.decision.theme} form-control`}
                onClick={this.props.onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

Config.propTypes = {
  decision: PropTypes.instanceOf(Decision),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};