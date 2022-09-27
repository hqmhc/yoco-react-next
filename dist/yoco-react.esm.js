import React, { useState, useEffect } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["children", "onSubmit"];
var InlineForm = function InlineForm(_ref) {
  var children = _ref.children,
      _onSubmit = _ref.onSubmit,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return React.createElement("form", Object.assign({
    id: "payment-form",
    onSubmit: function onSubmit(event) {
      event.preventDefault();

      _onSubmit();
    }
  }, rest), React.createElement("div", {
    className: "one-liner"
  }, React.createElement("div", {
    id: "card-frame",
    className: "card-frame"
  })), children);
};

var addScript = function addScript(onLoad) {
  var script = document.createElement('script');
  script.src = 'https://js.yoco.com/sdk/v2/blackbird-web-sdk.js';
  script.async = true;
  script.onload = onLoad;
  document.head.appendChild(script);
};

var useYoco = function useYoco(publicKey, id) {
  var _useState = useState(),
      yocoSDK = _useState[0],
      setYocoSDK = _useState[1];

  var initSdk = function initSdk() {
    setYocoSDK(new window.BlackbirdSDK({
      publicKey: publicKey,
      id: id
    }));
  };

  useEffect(function () {
    if (!window.BlackbirdSDK) {
      addScript(function () {
        return initSdk();
      });
    } else {
      initSdk();
    }
  }, []);
  return yocoSDK;
};

var usePopup = function usePopup(publicKey, paymentId) {
  var yocoSDK = useYoco(publicKey, paymentId);

  var _useState = useState(false),
      isYocoReady = _useState[0],
      setisYocoReady = _useState[1];

  function showPopup(params) {
    yocoSDK == null ? void 0 : yocoSDK.showPopup(params);
  }

  useEffect(function () {
    if (!yocoSDK) {
      setisYocoReady(false);
    }

    setisYocoReady(true);
  }, [yocoSDK]);
  return [showPopup, isYocoReady];
};

var useEFT = function useEFT(publicKey) {
  var yocoSDK = useYoco(publicKey);

  var _useState = useState(false),
      isYocoReady = _useState[0],
      setisYocoReady = _useState[1];

  function showEFT(params) {
    if (!yocoSDK) {
      throw new Error('YocoSDK not ready.');
    }

    return yocoSDK.submit(_extends({}, params, {
      paymentType: 'EFT'
    }));
  }

  useEffect(function () {
    if (!yocoSDK) {
      setisYocoReady(false);
    }

    setisYocoReady(true);
  }, [yocoSDK]);
  return [showEFT, isYocoReady];
};

export { InlineForm, useEFT, usePopup, useYoco };
//# sourceMappingURL=yoco-react.esm.js.map
