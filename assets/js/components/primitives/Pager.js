import React, { Component, PropTypes } from 'react';
import { observable } from 'mobx';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import classNames from 'classnames';
import LinkButton from './LinkButton';
import PropsProvider from 'props-provider';

@observer
export default class Pager extends Component {
  @observable page = 0;

  constructor(props) {
    super(props);
    this.allItemsLength = 0;
  }

  componentWillReceiveProps(nextProps) {
    const allItems = nextProps.allItems || nextProps.items;
    const newAllItemsLength = allItems.length;
    const newPageCount = Math.ceil(nextProps.items.length / nextProps.perPage);

    /*
     If the current page is too high for the new number of rendered items
     Or if the number of unfiltered items is greater than the last time
     Then set the current page to the last page
     */
    if (
      nextProps.items.length <= nextProps.perPage * (this.page)
      || newAllItemsLength > this.allItemsLength
    ) {
      this.page = newPageCount > 0 ? newPageCount - 1 : 0;
    }

    this.allItemsLength = newAllItemsLength
  }

  previousPage = (canPrevious) => () => canPrevious && this.page--;
  setPage = (page) => () => this.page = page;
  nextPage = (canNext) => () => canNext && this.page++;

  render() {
    const { items, children, perPage } = this.props;
    let pages = [];
    for (let i = 0; i < items.length; i += perPage) {
      pages.push(items.slice(i, i + perPage));
    }

    const canPrevious = this.page > 0;
    const canNext = this.page < pages.length - 1;

    return (
      <PropsProvider
        pagedItems={
          pages.length > 0 ? pages[this.page] : false
        }
        pagination={
          pages.length - 1 > 0 && (
            <nav>
              <ul className="pagination pagination-sm">
                <li className={classNames('page-item', { disabled: !canPrevious })}>
                  <LinkButton className="page-link" onClick={this.previousPage(canPrevious)}>
                    <span>&laquo;</span>
                  </LinkButton>
                </li>
                {pages.map((node, i) => (
                  <li key={i} className={classNames('page-item', { active: this.page === i })}>
                    <LinkButton className="page-link" onClick={this.setPage(i)}>
                      {i + 1}
                    </LinkButton>
                  </li>
                ))}
                <li className={classNames('page-item', { disabled: !canNext })}>
                  <LinkButton className="page-link" onClick={this.nextPage(canNext)}>
                    <span>&raquo;</span>
                  </LinkButton>
                </li>
              </ul>
            </nav>
          )
        }>
        {children}
      </PropsProvider>
    );
  }
}

Pager.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  allItems: PropTypes.oneOfType([
    PropTypes.array,
    MobxPropTypes.observableArray
  ]),
  children: PropsProvider.PropType,
  perPage: PropTypes.number
};

Pager.defaultProps = {
  perPage: 10
};
