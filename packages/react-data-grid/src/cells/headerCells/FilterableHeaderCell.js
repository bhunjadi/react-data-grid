const React              = require('react');
const ExcelColumn        = require('../../PropTypeShapes/ExcelColumn');
import PropTypes from 'prop-types';

class FilterableHeaderCell extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.shape(ExcelColumn),
    filters: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      filterTerm: this.getInputValue()
    };
  }

  handleChange = (e: Event) => {
    let val = e.target.value;
    this.setState({filterTerm: val });
    this.props.onChange({filterTerm: val, column: this.props.column});
  };

  getInputValue() {
    const filters = this.props.filters || {};
    return filters[this.props.column.key] || '';
  }

  renderInput = (): ?ReactElement => {
    if (this.props.column.filterable === false) {
      return <span/>;
    }

    const inputKey = 'header-filter-' + this.props.column.key;
    return (<input key={inputKey} type="text" className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>);
  };

  render(): ?ReactElement {
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
