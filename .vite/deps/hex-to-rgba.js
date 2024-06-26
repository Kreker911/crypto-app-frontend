import {
  __commonJS
} from "./chunk-LNEMQRCO.js";

// node_modules/hex-to-rgba/build/index.js
var require_build = __commonJS({
  "node_modules/hex-to-rgba/build/index.js"(exports, module) {
    var removeHash = function removeHash2(hex) {
      return hex.charAt(0) === "#" ? hex.slice(1) : hex;
    };
    var parseHex = function parseHex2(nakedHex) {
      var isShort = nakedHex.length === 3 || nakedHex.length === 4;
      var twoDigitHexR = isShort ? "".concat(nakedHex.slice(0, 1)).concat(nakedHex.slice(0, 1)) : nakedHex.slice(0, 2);
      var twoDigitHexG = isShort ? "".concat(nakedHex.slice(1, 2)).concat(nakedHex.slice(1, 2)) : nakedHex.slice(2, 4);
      var twoDigitHexB = isShort ? "".concat(nakedHex.slice(2, 3)).concat(nakedHex.slice(2, 3)) : nakedHex.slice(4, 6);
      var twoDigitHexA = (isShort ? "".concat(nakedHex.slice(3, 4)).concat(nakedHex.slice(3, 4)) : nakedHex.slice(6, 8)) || "ff";
      return {
        r: twoDigitHexR,
        g: twoDigitHexG,
        b: twoDigitHexB,
        a: twoDigitHexA
      };
    };
    var hexToDecimal = function hexToDecimal2(hex) {
      return parseInt(hex, 16);
    };
    var hexesToDecimals = function hexesToDecimals2(_ref) {
      var r = _ref.r, g = _ref.g, b = _ref.b, a = _ref.a;
      return {
        r: hexToDecimal(r),
        g: hexToDecimal(g),
        b: hexToDecimal(b),
        a: +(hexToDecimal(a) / 255).toFixed(2)
      };
    };
    var isNumeric = function isNumeric2(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };
    var formatRgb = function formatRgb2(decimalObject, parameterA) {
      var r = decimalObject.r, g = decimalObject.g, b = decimalObject.b, parsedA = decimalObject.a;
      var a = isNumeric(parameterA) ? parameterA : parsedA;
      return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
    };
    var hexToRgba = function hexToRgba2(hex, a) {
      var hashlessHex = removeHash(hex);
      var hexObject = parseHex(hashlessHex);
      var decimalObject = hexesToDecimals(hexObject);
      return formatRgb(decimalObject, a);
    };
    module.exports = hexToRgba;
  }
});
export default require_build();
//# sourceMappingURL=hex-to-rgba.js.map
