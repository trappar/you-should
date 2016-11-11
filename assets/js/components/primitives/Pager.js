import React from 'react';
import { observable } from 'mobx';
import { observer, PropTypes } from 'mobx-react';
import classNames from 'classnames';
import LinkButton from './LinkButton';
import PropsProvider from 'props-provider';

@observer
export default class Pager extends React.Component {
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
                  <LinkButton className="page-link" onClick={() => canPrevious && this.page--}>
                    <span>&laquo;</span>
                  </LinkButton>
                </li>
                {pages.map((node, i) => (
                  <li key={i} className={classNames('page-item', { active: this.page === i })}>
                    <LinkButton className="page-link" onClick={() => this.page = i}>
                      {i + 1}
                    </LinkButton>
                  </li>
                ))}
                <li className={classNames('page-item', { disabled: !canNext })}>
                  <LinkButton className="page-link" onClick={() => canNext && this.page++}>
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
  items: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
  allItems: React.PropTypes.oneOfType([
    React.PropTypes.array,
    PropTypes.observableArray
  ]),
  children: PropsProvider.PropType,
  perPage: React.PropTypes.number
};

Pager.defaultProps = {
  perPage: 10
};
