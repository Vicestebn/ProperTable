import React from 'react';
import {Cell} from 'fixed-data-table';

const SortTypes = {
  	ASC: 'ASC',
  	DESC: 'DESC',
  	DEF: 'DEF'
};

const SortIcons = {
	ASC: <i className="fa fa-long-arrow-up"/>,
	DESC:<i className="fa fa-long-arrow-down"/>,
	DEF: null // Default
};

const reverseSortDirection = sortDir => {
  	if (sortDir) { // Second sort
  		if (sortDir === SortTypes.DEF) return reverseSortDirection(null); // From default start again
  		else return sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.DEF; // Third sort from ASC to DESC then from DESC back to default
  	}
  	return SortTypes.ASC; // First sort
};

const onSortChange = (e, props) => {
  e.preventDefault();

	if (typeof props.onSortChange === 'function') {
      props.onSortChange(props.columnKey, reverseSortDirection(props.sortDir), props.sortVal, props.colData);
	}
};

const SortHeaderCell = props => {
	let sortDir = props.sortDir || null;
	let children = props.children || null;
	let sortIcon = sortDir ? SortIcons[sortDir] : SortIcons['DEF'];

	return (
  		<Cell
        className="centrardiv"
        onClick={(e) => {
          onSortChange(e, props);
        }}
        {...props}
      >
        {children} &nbsp; {sortIcon}
  		</Cell>
	);
};

export default SortHeaderCell;