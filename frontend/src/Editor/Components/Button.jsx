import React, { useEffect, useState } from 'react';
import cx from 'classnames';
const tinycolor = require('tinycolor2');
import * as Icons from '@tabler/icons-react';
import { getCssVariableValue } from '@/_helpers/appUtils';

export const Button = function Button(props) {
  const { height, properties, styles, fireEvent, id, dataCy, setExposedVariable, setExposedVariables, component } =
    props;
  const {
    backgroundColor,
    textColor,
    borderRadius,
    loaderColor,
    borderColor,
    boxShadow,
    iconColor,
    direction,
    type,
    iconVisibility,
  } = styles;

  const { loadingState, disabledState } = properties;
  const [label, setLabel] = useState(properties.text);
  const [disable, setDisable] = useState(disabledState || loadingState);
  const [visibility, setVisibility] = useState(properties.visibility);
  const [loading, setLoading] = useState(loadingState);
  const iconName = styles.icon; // Replace with the name of the icon you want
  // eslint-disable-next-line import/namespace
  const IconElement = Icons[iconName] == undefined ? Icons['IconHome2'] : Icons[iconName];

  useEffect(() => {
    setLabel(properties.text);
    setExposedVariable('buttonText', properties.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.text]);

  useEffect(() => {
    disable !== disabledState && setDisable(disabledState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledState]);

  useEffect(() => {
    visibility !== properties.visibility && setVisibility(properties.visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.visibility]);

  useEffect(() => {
    loading !== properties.loadingState && setLoading(properties.loadingState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.loadingState]);

  const computedIconColor =
    getCssVariableValue('--icons-on-solid') === iconColor
      ? type === 'primary'
        ? getCssVariableValue('--icons-on-solid')
        : getCssVariableValue('--icons-strong')
      : iconColor;
  const computedBorderColor =
    '#4368E3' === borderColor
      ? type === 'primary'
        ? '#4368E3'
        : getCssVariableValue('--borders-default')
      : borderColor;

  const computedTextColor =
    getCssVariableValue('--text-on-solid') === textColor
      ? type == 'primary'
        ? getCssVariableValue('--text-on-solid')
        : getCssVariableValue('text-primary')
      : textColor;
  const computedBgColor =
    getCssVariableValue('--primary-brand') === backgroundColor
      ? type === 'primary'
        ? getCssVariableValue('--primary-brand')
        : getCssVariableValue('--surfaces-surface-01')
      : backgroundColor;
  const computedStyles = {
    backgroundColor: computedBgColor,
    color: computedTextColor,
    width: '100%',
    borderRadius: `${borderRadius}px`,
    height,
    display: visibility ? '' : 'none',
    '--tblr-btn-color-darker': tinycolor(computedBgColor).darken(8).toString(),
    '--tblr-btn-color-clicked': tinycolor(computedBgColor).darken(15).toString(),
    '--loader-color': tinycolor(loaderColor ?? getCssVariableValue('--icons-on-solid')).toString(),
    borderColor: computedBorderColor,
    boxShadow: boxShadow,
    padding: '0px 12px',
    cursor: 'pointer',
    opacity: disable && '50%',
  };

  useEffect(() => {
    const exposedVariables = {
      click: async function () {
        if (!disable) {
          fireEvent('onClick');
        }
      },
      setText: async function (text) {
        setLabel(text);
        setExposedVariable('buttonText', text);
      },
      disable: async function (value) {
        setDisable(value);
      },
      visibility: async function (value) {
        setVisibility(value);
      },
      loading: async function (value) {
        setLoading(value);
      },
    };

    setExposedVariables(exposedVariables);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disable]);

  useEffect(() => {
    setExposedVariable('setLoading', async function (loading) {
      setLoading(loading);
      setExposedVariable('isLoading', loading);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingState]);

  useEffect(() => {
    setExposedVariable('setVisibility', async function (state) {
      setVisibility(state);
      setExposedVariable('isVisible', state);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.visibility]);

  useEffect(() => {
    setExposedVariable('setDisable', async function (disable) {
      setDisable(disable);
      setExposedVariable('isDisabled', disable);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledState]);

  useEffect(() => {
    setExposedVariable('isLoading', loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    setExposedVariable('isVisible', visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility]);

  useEffect(() => {
    setExposedVariable('isDisabled', disable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disable]);

  const hasCustomBackground = computedBgColor?.charAt() === '#';
  if (hasCustomBackground) {
    computedStyles['--tblr-btn-color-darker'] = tinycolor(computedBgColor).darken(8).toString();
    computedStyles['--tblr-btn-color-clicked'] = tinycolor(computedBgColor).darken(15).toString();
  }
  const handleClick = () => {
    const event1 = new CustomEvent('submitForm', { detail: { buttonComponentId: id } });
    document.dispatchEvent(event1);
    fireEvent('onClick');
  };
  const renderButton = () => (
    <div
      className="widget-button d-flex align-items-center"
      style={{
        position: 'relative',
        height,
      }}
    >
      <button
        disabled={disable || loading}
        className={cx('overflow-hidden', {
          'btn-loading': loading,
          'btn-custom': hasCustomBackground,
          'jet-button ': type == 'primary',
          'jet-outline-button ': type == 'outline',
        })}
        style={computedStyles}
        onClick={handleClick}
        onMouseOver={() => {
          fireEvent('onHover');
        }}
        data-cy={dataCy}
        type="default"
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: direction == 'right' ? 'row-reverse' : 'row',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <div
            style={{
              overflow: 'hidden',
            }}
          >
            <span style={{ maxWidth: ' 100%', minWidth: '0' }}>
              <p className="tj-text-sm" style={{ fontWeight: '500', margin: '0px', padding: '0px' }}>
                {label}
              </p>
            </span>
          </div>
          {iconVisibility && (
            <div className="d-flex">
              {!props.isResizing && !loading && (
                <IconElement
                  style={{
                    width: '16px',
                    height: '16px',
                    color: computedIconColor,
                  }}
                  stroke={1.5}
                />
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );

  return <>{renderButton()}</>;
};
