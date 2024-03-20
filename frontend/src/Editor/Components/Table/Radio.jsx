import React, { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export const Radio = ({ options, value, onChange, readOnly, containerWidth }) => {
  value = value === undefined ? [] : value;
  options = Array.isArray(options) ? options : [];

  const elem = document.querySelector('.table-radio-column-list');
  console.log('manish ::', { elem, sh: elem?.scrollHeight, ch: elem?.clientHeight });

  const [showOverlay, setShowOverlay] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [hovered]);

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <label
        key={index}
        className="form-check form-check-inline"
        onClick={() => {
          if (!readOnly) onChange(option.value);
        }}
      >
        <input
          className="form-check-input"
          type="radio"
          checked={option.value === value}
          disabled={readOnly && option.value !== value}
        />
        <span className="form-check-label">{option.name}</span>
      </label>
    ));
  };

  const getOverlay = (options, containerWidth) => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    return Array.isArray(options) ? (
      <div
        style={{
          height: 'fit-content',
          maxWidth: containerWidth,
          width: containerWidth,
          background: 'var(--surfaces-surface-01)',
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: '10px',
          padding: '16px',
          borderRadius: '6px',
          boxShadow:
            '0px 8px 16px 0px var(--elevation-400-box-shadow), 0px 0px 1px 0px var(--elevation-400-box-shadow)',
        }}
        className={`overlay-radio-table ${darkMode && 'dark-theme'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {renderOptions(options)}
      </div>
    ) : (
      <div></div>
    );
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={elem && elem?.clientHeight < elem?.scrollHeight && getOverlay(options, containerWidth)}
      trigger={elem && elem?.clientHeight < elem?.scrollHeight && ['focus']}
      rootClose={true}
      show={elem && elem?.clientHeight < elem?.scrollHeight && showOverlay}
    >
      <div
        className="table-radio-column-cell radio row h-100"
        onMouseMove={() => {
          if (!hovered) setHovered(true);
        }}
        onMouseOut={() => setHovered(false)}
      >
        <div className="table-radio-column-list">{renderOptions(options)}</div>
      </div>
    </OverlayTrigger>
  );
};
