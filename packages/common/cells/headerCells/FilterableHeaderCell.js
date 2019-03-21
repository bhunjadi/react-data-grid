import React from 'react';
import ExcelColumn from 'common/prop-shapes/ExcelColumn';
import PropTypes from 'prop-types';

class FilterableHeaderCell extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.shape(ExcelColumn),
    filters: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      filterTerm: this.getInputValue()
    };
  }

  componentWillReceiveProps(nextProps) {
    const newInputValue = this.getInputValue(nextProps);
    if (this.state.filterTerm !== newInputValue) {
      this.setState({
        filterTerm: newInputValue
      });
    }
  }

  handleChange = (e) => {
    let val = e.target.value;
    this.setState({filterTerm: val });
    this.props.onChange({filterTerm: val, column: this.props.column});
  };

  getInputValue(passedInProps) {
    const props = passedInProps || this.props;
    const filters = props.filters || {};
    return filters[props.column.key] || '';
  }

  renderInput = () => {
    if (this.props.column.filterable === false) {
      return <span/>;
    }

    const inputKey = 'header-filter-' + this.props.column.key;
    return (<input key={inputKey} type="text" className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>);
  };

  render() {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  }
}

module.exports = FilterableHeaderCell;
