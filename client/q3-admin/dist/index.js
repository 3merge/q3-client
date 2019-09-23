"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactI18next = require("react-i18next");

var _q3Ui = _interopRequireWildcard(require("q3-ui"));

var _q3UiPermissions = _interopRequireWildcard(require("q3-ui-permissions"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Login,
  PasswordReset,
  Reverify,
  Verify
} = _q3Ui.Views;
const {
  External
} = _q3Ui.Layouts;

const ApplicationGate = ({
  name,
  logoImgSrc
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const links = [{
    to: '/login',
    label: t('labels:login'),
    render: () => _react.default.createElement(Login, {
      onSubmit: _q3UiPermissions.authenticate
    })
  }, {
    to: '/reset-password',
    label: t('labels:passwordReset'),
    render: () => _react.default.createElement(PasswordReset, {
      onSubmit: () => null
    })
  }, {
    to: '/verify',
    label: t('labels:verify'),
    render: () => _react.default.createElement(Verify, {
      onSubmit: () => null
    })
  }, {
    to: '/reverify',
    label: t('labels:reverify'),
    render: () => _react.default.createElement(Reverify, {
      onSubmit: () => null
    })
  }];
  return _react.default.createElement(_q3UiPermissions.default, {
    loading: _CircularProgress.default,
    renderPrivate: () => null,
    renderPublic: () => _react.default.createElement(External, {
      companyName: name,
      links: links,
      logo: logoImgSrc
    }, _react.default.createElement(_reactRouterDom.Switch, null, links.map(link => _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      key: link.to,
      path: link.to,
      component: link.render
    })), _react.default.createElement(_reactRouterDom.Redirect, {
      exact: true,
      to: "login"
    })))
  });
};

ApplicationGate.propTypes = {
  name: _propTypes.default.string.isRequired,
  logoImgSrc: _propTypes.default.string.isRequired
};

const Wrapper = ({
  themeOptions,
  ...rest
}) => _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_q3Ui.default, {
  settings: themeOptions
}, _react.default.createElement(_reactI18next.I18nextProvider, {
  i18n: _q3Ui.i18
}, _react.default.createElement(ApplicationGate, rest))));

Wrapper.propTypes = {
  themeOptions: _propTypes.default.shape({
    primary: _propTypes.default.string,
    secondary: _propTypes.default.string
  }).isRequired
};
var _default = Wrapper;
exports.default = _default;