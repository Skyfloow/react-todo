import React, { Component } from "react";
import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];

  render() {
    const { filter, onFilterChange } = this.props,
          buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name,
            clazz = isActive ? 'btn-info' : 'btn-outline-primary'
            return(
              <button type="button"
                      key={name}
                      className={`btn ${clazz}`}
                      onClick={() => onFilterChange(name)}>
                {label}
              </button>
            )
        });
        
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}
