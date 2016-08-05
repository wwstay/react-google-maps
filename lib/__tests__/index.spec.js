"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _googleMaps = require("../__mocks__/google.maps.mock");

var maps = _interopRequireWildcard(_googleMaps);

var _index = require("../index");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("index", function () {
  it("should be exported", function () {
    (0, _expect2.default)(_index.withGoogleMap).toExist();
    (0, _expect2.default)(_index.GoogleMap).toExist();

    (0, _expect2.default)(_index.Circle).toExist();
    (0, _expect2.default)(_index.DirectionsRenderer).toExist();
    (0, _expect2.default)(_index.InfoWindow).toExist();
    (0, _expect2.default)(_index.Marker).toExist();
    (0, _expect2.default)(_index.OverlayView).toExist();
    (0, _expect2.default)(_index.Polygon).toExist();
    (0, _expect2.default)(_index.Polyline).toExist();
    (0, _expect2.default)(_index.Rectangle).toExist();
  });

  context("combine withGoogleMap with GoogleMap", function () {
    var Component = void 0;

    before(function () {
      global.google = { maps: maps };
      Component = (0, _index.withGoogleMap)(_index.GoogleMap);
    });

    after(function () {
      delete global.google;
    });

    describe("initialization", function () {
      context("global.google is undefined", function () {
        var prevGoogle = void 0;

        before(function () {
          prevGoogle = global.google;
          delete global.google;
        });

        after(function () {
          global.google = prevGoogle;
        });

        it("should warn and throw error", function () {
          var warningSpy = _expect2.default.spyOn(console, "error");
          (0, _expect2.default)(warningSpy).toNotHaveBeenCalled();

          var error = void 0;
          try {
            (0, _reactDom.render)(_react2.default.createElement(Component, {
              containerElement: _react2.default.createElement("div", null),
              mapElement: _react2.default.createElement("div", null)
            }), document.createElement("div"));
          } catch (__e__) {
            error = __e__;
          }
          (0, _expect2.default)(error).toExist();
          (0, _expect2.default)(warningSpy).toHaveBeenCalled();

          warningSpy.restore();
        });
      });
    });

    describe("rendering", function () {
      var domEl = void 0;

      beforeEach(function () {
        domEl = document.createElement("div");
      });

      afterEach(function () {
        (0, _reactDom.unmountComponentAtNode)(domEl);
        domEl = null;
      });

      it("should call setOptions during initial render", function () {
        var setOptionsSpy = _expect2.default.spyOn(maps.Map.prototype, "setOptions");
        (0, _expect2.default)(setOptionsSpy).toNotHaveBeenCalled();

        (0, _reactDom.render)(_react2.default.createElement(Component, {
          containerElement: _react2.default.createElement("div", null),
          mapElement: _react2.default.createElement("div", null)
        }), domEl);

        (0, _expect2.default)(setOptionsSpy).toHaveBeenCalled();

        setOptionsSpy.restore();
      });

      it("should call setZoom when props.zoom changes", function () {
        var setZoomSpy = _expect2.default.spyOn(maps.Map.prototype, "setZoom");
        (0, _expect2.default)(setZoomSpy).toNotHaveBeenCalled();

        (0, _reactDom.render)(_react2.default.createElement(Component, {
          containerElement: _react2.default.createElement("div", null),
          mapElement: _react2.default.createElement("div", null)
        }), domEl);
        (0, _expect2.default)(setZoomSpy).toNotHaveBeenCalled();

        (0, _reactDom.render)(_react2.default.createElement(Component, {
          containerElement: _react2.default.createElement("div", null),
          mapElement: _react2.default.createElement("div", null),
          zoom: 10
        }), domEl);
        (0, _expect2.default)(setZoomSpy).toHaveBeenCalled();

        setZoomSpy.restore();
      });
    });
  });
});