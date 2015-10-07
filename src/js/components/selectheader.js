import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			className: '',
			uniqueId: _.uniqueId('select-all-header'),
			rowspan: null,
			colspan: null,
			sortable: true,
			sorted: false,
			onSort: null,
			selected: false,
			onSelect: null
		}
	},

	handleSort(e) {
		let next = 'asc';

		if (this.props.sorted == 'asc') {
			next = 'desc';
		}

		if (this.props.sorted == 'desc') {
			next = false;
		}

		if (this.props.onSort && typeof this.props.onSort == 'function') {
			this.props.onSort(next, {field: '_selected'});
		}
	},

	handleSelect(e) {
		if (typeof this.props.onSelect == 'function') {
			this.props.onSelect(this.props.data, !this.props.selected);
		}
	},

	renderSortOptions() {
		let next = 'asc';

		if (this.props.sorted == 'asc') {
			next = 'desc';
		}

		if (this.props.sorted == 'desc') {
			next = false;
		}

		if (!this.props.sortable) {
			return false;
		}

		return <button className={"pull-right btn btn-xs sort sort-"+next} onClick={this.handleSort}>sort</button>;
	},

	render() {
		let className = this.props.className;
		let spans = {};
		let sortBtns = this.renderSortOptions();
		let tools = null;
		let msg = Settings.msg('select_all');

		spans.rowSpan = this.props.rowspan;

		if (this.props.colspan) {
			spans.colSpan = this.props.colspan + 1;
		}

		if (this.props.selected) {
			msg = Settings.msg('deselect_all');
		}

		tools = <div className="htools">
			<button className={"btn btn-xs select-all"} onClick={this.handleSelect}>
				{msg}
			</button>
			{sortBtns}
		</div>;

		className += ' has-tools'

		return <div id={this.props.uniqueId} className={"propertable-hcell selectheader "+className} {...spans}>
			{tools}
		</div>;
	}
});