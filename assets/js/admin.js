var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { j as jsxDevRuntime, e as axios, R as React$1, h as reactIs$1, i as hoistNonReactStatics_cjs, r as react, g as createRoot, k as redux, a as combineReducers, c as createStore, b as applyMiddleware, t as thunk, l as React$2, _ as _defineProperty$1, m as reactDom, f as useSelector, u as useDispatch, P as Provider } from "./index.js";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k2) {
    var d = Object.getOwnPropertyDescriptor(n, k2);
    Object.defineProperty(a, k2, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k2];
      }
    });
  });
  return a;
}
function _extends$4() {
  _extends$4 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$4.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$4(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var admin = "";
var classes = ".header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 22px;\n}\n.header .title {\n  font-size: 24px;\n  font-weight: 500;\n}\n.header .btn {\n  margin-left: 20px;\n}";
var Style = "";
var _jsxFileName$h = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/components/pageheader/Index.jsx";
const PageHeader = () => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(jsxDevRuntime.exports.Fragment, {
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: classes.header,
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("h2", {
        className: classes.title,
        children: "All Templates"
      }, void 0, false, {
        fileName: _jsxFileName$h,
        lineNumber: 8,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
        href: location.href + "&mode=edit",
        className: `${classes.btn} wpwax-vm-btn wpwax-vm-btn-dark`,
        children: "Create New"
      }, void 0, false, {
        fileName: _jsxFileName$h,
        lineNumber: 9,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$h,
      lineNumber: 7,
      columnNumber: 13
    }, globalThis)
  }, void 0, false);
};
const axiosInstance = axios.create({
  baseURL: `${location.protocol + "//" + location.host + "/wp-json/wpwax-vm/v1"}`,
  headers: {
    "Content-type": "application/json"
  }
});
const getAll = (path) => {
  return axiosInstance.get(path);
};
const dataUpdate = (path, data) => {
  return axiosInstance.put(path, data);
};
const datadelete = (path) => {
  return axiosInstance.delete(path);
};
const apiService = {
  getAll,
  dataUpdate,
  datadelete
};
function stylis_min(W2) {
  function M2(d, c, e, h, a) {
    for (var m = 0, b2 = 0, v2 = 0, n = 0, q2, g2, x2 = 0, K2 = 0, k2, u = k2 = q2 = 0, l = 0, r = 0, I2 = 0, t = 0, B3 = e.length, J2 = B3 - 1, y, f = "", p = "", F3 = "", G3 = "", C; l < B3; ) {
      g2 = e.charCodeAt(l);
      l === J2 && b2 + n + v2 + m !== 0 && (b2 !== 0 && (g2 = b2 === 47 ? 10 : 47), n = v2 = m = 0, B3++, J2++);
      if (b2 + n + v2 + m === 0) {
        if (l === J2 && (0 < r && (f = f.replace(N2, "")), 0 < f.trim().length)) {
          switch (g2) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;
            default:
              f += e.charAt(l);
          }
          g2 = 59;
        }
        switch (g2) {
          case 123:
            f = f.trim();
            q2 = f.charCodeAt(0);
            k2 = 1;
            for (t = ++l; l < B3; ) {
              switch (g2 = e.charCodeAt(l)) {
                case 123:
                  k2++;
                  break;
                case 125:
                  k2--;
                  break;
                case 47:
                  switch (g2 = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J2; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (g2 === 42 && e.charCodeAt(u - 1) === 42 && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }
                              break;
                            case 10:
                              if (g2 === 47) {
                                l = u + 1;
                                break a;
                              }
                          }
                        }
                        l = u;
                      }
                  }
                  break;
                case 91:
                  g2++;
                case 40:
                  g2++;
                case 34:
                case 39:
                  for (; l++ < J2 && e.charCodeAt(l) !== g2; ) {
                  }
              }
              if (k2 === 0)
                break;
              l++;
            }
            k2 = e.substring(t, l);
            q2 === 0 && (q2 = (f = f.replace(ca, "").trim()).charCodeAt(0));
            switch (q2) {
              case 64:
                0 < r && (f = f.replace(N2, ""));
                g2 = f.charCodeAt(1);
                switch (g2) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;
                  default:
                    r = O;
                }
                k2 = M2(c, r, k2, g2, a + 1);
                t = k2.length;
                0 < A2 && (r = X2(O, f, I2), C = H2(3, k2, r, c, D2, z2, t, g2, a, h), f = r.join(""), C !== void 0 && (t = (k2 = C.trim()).length) === 0 && (g2 = 0, k2 = ""));
                if (0 < t)
                  switch (g2) {
                    case 115:
                      f = f.replace(da, ea);
                    case 100:
                    case 109:
                    case 45:
                      k2 = f + "{" + k2 + "}";
                      break;
                    case 107:
                      f = f.replace(fa, "$1 $2");
                      k2 = f + "{" + k2 + "}";
                      k2 = w2 === 1 || w2 === 2 && L2("@" + k2, 3) ? "@-webkit-" + k2 + "@" + k2 : "@" + k2;
                      break;
                    default:
                      k2 = f + k2, h === 112 && (k2 = (p += k2, ""));
                  }
                else
                  k2 = "";
                break;
              default:
                k2 = M2(c, X2(c, f, I2), k2, h, a + 1);
            }
            F3 += k2;
            k2 = I2 = r = u = q2 = 0;
            f = "";
            g2 = e.charCodeAt(++l);
            break;
          case 125:
          case 59:
            f = (0 < r ? f.replace(N2, "") : f).trim();
            if (1 < (t = f.length))
              switch (u === 0 && (q2 = f.charCodeAt(0), q2 === 45 || 96 < q2 && 123 > q2) && (t = (f = f.replace(" ", ":")).length), 0 < A2 && (C = H2(1, f, c, d, D2, z2, p.length, h, a, h)) !== void 0 && (t = (f = C.trim()).length) === 0 && (f = "\0\0"), q2 = f.charCodeAt(0), g2 = f.charCodeAt(1), q2) {
                case 0:
                  break;
                case 64:
                  if (g2 === 105 || g2 === 99) {
                    G3 += f + e.charAt(l);
                    break;
                  }
                default:
                  f.charCodeAt(t - 1) !== 58 && (p += P2(f, q2, g2, f.charCodeAt(2)));
              }
            I2 = r = u = q2 = 0;
            f = "";
            g2 = e.charCodeAt(++l);
        }
      }
      switch (g2) {
        case 13:
        case 10:
          b2 === 47 ? b2 = 0 : 1 + q2 === 0 && h !== 107 && 0 < f.length && (r = 1, f += "\0");
          0 < A2 * Y2 && H2(0, f, c, d, D2, z2, p.length, h, a, h);
          z2 = 1;
          D2++;
          break;
        case 59:
        case 125:
          if (b2 + n + v2 + m === 0) {
            z2++;
            break;
          }
        default:
          z2++;
          y = e.charAt(l);
          switch (g2) {
            case 9:
            case 32:
              if (n + m + b2 === 0)
                switch (x2) {
                  case 44:
                  case 58:
                  case 9:
                  case 32:
                    y = "";
                    break;
                  default:
                    g2 !== 32 && (y = " ");
                }
              break;
            case 0:
              y = "\\0";
              break;
            case 12:
              y = "\\f";
              break;
            case 11:
              y = "\\v";
              break;
            case 38:
              n + b2 + m === 0 && (r = I2 = 1, y = "\f" + y);
              break;
            case 108:
              if (n + b2 + m + E2 === 0 && 0 < u)
                switch (l - u) {
                  case 2:
                    x2 === 112 && e.charCodeAt(l - 3) === 58 && (E2 = x2);
                  case 8:
                    K2 === 111 && (E2 = K2);
                }
              break;
            case 58:
              n + b2 + m === 0 && (u = l);
              break;
            case 44:
              b2 + v2 + n + m === 0 && (r = 1, y += "\r");
              break;
            case 34:
            case 39:
              b2 === 0 && (n = n === g2 ? 0 : n === 0 ? g2 : n);
              break;
            case 91:
              n + b2 + v2 === 0 && m++;
              break;
            case 93:
              n + b2 + v2 === 0 && m--;
              break;
            case 41:
              n + b2 + m === 0 && v2--;
              break;
            case 40:
              if (n + b2 + m === 0) {
                if (q2 === 0)
                  switch (2 * x2 + 3 * K2) {
                    case 533:
                      break;
                    default:
                      q2 = 1;
                  }
                v2++;
              }
              break;
            case 64:
              b2 + v2 + n + m + u + k2 === 0 && (k2 = 1);
              break;
            case 42:
            case 47:
              if (!(0 < n + m + v2))
                switch (b2) {
                  case 0:
                    switch (2 * g2 + 3 * e.charCodeAt(l + 1)) {
                      case 235:
                        b2 = 47;
                        break;
                      case 220:
                        t = l, b2 = 42;
                    }
                    break;
                  case 42:
                    g2 === 47 && x2 === 42 && t + 2 !== l && (e.charCodeAt(t + 2) === 33 && (p += e.substring(t, l + 1)), y = "", b2 = 0);
                }
          }
          b2 === 0 && (f += y);
      }
      K2 = x2;
      x2 = g2;
      l++;
    }
    t = p.length;
    if (0 < t) {
      r = c;
      if (0 < A2 && (C = H2(2, p, r, d, D2, z2, t, h, a, h), C !== void 0 && (p = C).length === 0))
        return G3 + p + F3;
      p = r.join(",") + "{" + p + "}";
      if (w2 * E2 !== 0) {
        w2 !== 2 || L2(p, 2) || (E2 = 0);
        switch (E2) {
          case 111:
            p = p.replace(ha, ":-moz-$1") + p;
            break;
          case 112:
            p = p.replace(Q2, "::-webkit-input-$1") + p.replace(Q2, "::-moz-$1") + p.replace(Q2, ":-ms-input-$1") + p;
        }
        E2 = 0;
      }
    }
    return G3 + p + F3;
  }
  function X2(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length, m = d.length;
    switch (m) {
      case 0:
      case 1:
        var b2 = 0;
        for (d = m === 0 ? "" : d[0] + " "; b2 < a; ++b2) {
          c[b2] = Z2(d, c[b2], e).trim();
        }
        break;
      default:
        var v2 = b2 = 0;
        for (c = []; b2 < a; ++b2) {
          for (var n = 0; n < m; ++n) {
            c[v2++] = Z2(d[n] + " ", h[b2], e).trim();
          }
        }
    }
    return c;
  }
  function Z2(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));
    switch (h) {
      case 38:
        return c.replace(F2, "$1" + d.trim());
      case 58:
        return d.trim() + c.replace(F2, "$1" + d.trim());
      default:
        if (0 < 1 * e && 0 < c.indexOf("\f"))
          return c.replace(F2, (d.charCodeAt(0) === 58 ? "" : "$1") + d.trim());
    }
    return d + c;
  }
  function P2(d, c, e, h) {
    var a = d + ";", m = 2 * c + 3 * e + 4 * h;
    if (m === 944) {
      d = a.indexOf(":", 9) + 1;
      var b2 = a.substring(d, a.length - 1).trim();
      b2 = a.substring(0, d).trim() + b2 + ";";
      return w2 === 1 || w2 === 2 && L2(b2, 1) ? "-webkit-" + b2 + b2 : b2;
    }
    if (w2 === 0 || w2 === 2 && !L2(a, 1))
      return a;
    switch (m) {
      case 1015:
        return a.charCodeAt(10) === 97 ? "-webkit-" + a + a : a;
      case 951:
        return a.charCodeAt(3) === 116 ? "-webkit-" + a + a : a;
      case 963:
        return a.charCodeAt(5) === 110 ? "-webkit-" + a + a : a;
      case 1009:
        if (a.charCodeAt(4) !== 100)
          break;
      case 969:
      case 942:
        return "-webkit-" + a + a;
      case 978:
        return "-webkit-" + a + "-moz-" + a + a;
      case 1019:
      case 983:
        return "-webkit-" + a + "-moz-" + a + "-ms-" + a + a;
      case 883:
        if (a.charCodeAt(8) === 45)
          return "-webkit-" + a + a;
        if (0 < a.indexOf("image-set(", 11))
          return a.replace(ja, "$1-webkit-$2") + a;
        break;
      case 932:
        if (a.charCodeAt(4) === 45)
          switch (a.charCodeAt(5)) {
            case 103:
              return "-webkit-box-" + a.replace("-grow", "") + "-webkit-" + a + "-ms-" + a.replace("grow", "positive") + a;
            case 115:
              return "-webkit-" + a + "-ms-" + a.replace("shrink", "negative") + a;
            case 98:
              return "-webkit-" + a + "-ms-" + a.replace("basis", "preferred-size") + a;
          }
        return "-webkit-" + a + "-ms-" + a + a;
      case 964:
        return "-webkit-" + a + "-ms-flex-" + a + a;
      case 1023:
        if (a.charCodeAt(8) !== 99)
          break;
        b2 = a.substring(a.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify");
        return "-webkit-box-pack" + b2 + "-webkit-" + a + "-ms-flex-pack" + b2 + a;
      case 1005:
        return ka.test(a) ? a.replace(aa, ":-webkit-") + a.replace(aa, ":-moz-") + a : a;
      case 1e3:
        b2 = a.substring(13).trim();
        c = b2.indexOf("-") + 1;
        switch (b2.charCodeAt(0) + b2.charCodeAt(c)) {
          case 226:
            b2 = a.replace(G2, "tb");
            break;
          case 232:
            b2 = a.replace(G2, "tb-rl");
            break;
          case 220:
            b2 = a.replace(G2, "lr");
            break;
          default:
            return a;
        }
        return "-webkit-" + a + "-ms-" + b2 + a;
      case 1017:
        if (a.indexOf("sticky", 9) === -1)
          break;
      case 975:
        c = (a = d).length - 10;
        b2 = (a.charCodeAt(c) === 33 ? a.substring(0, c) : a).substring(d.indexOf(":", 7) + 1).trim();
        switch (m = b2.charCodeAt(0) + (b2.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b2.charCodeAt(8))
              break;
          case 115:
            a = a.replace(b2, "-webkit-" + b2) + ";" + a;
            break;
          case 207:
          case 102:
            a = a.replace(b2, "-webkit-" + (102 < m ? "inline-" : "") + "box") + ";" + a.replace(b2, "-webkit-" + b2) + ";" + a.replace(b2, "-ms-" + b2 + "box") + ";" + a;
        }
        return a + ";";
      case 938:
        if (a.charCodeAt(5) === 45)
          switch (a.charCodeAt(6)) {
            case 105:
              return b2 = a.replace("-items", ""), "-webkit-" + a + "-webkit-box-" + b2 + "-ms-flex-" + b2 + a;
            case 115:
              return "-webkit-" + a + "-ms-flex-item-" + a.replace(ba, "") + a;
            default:
              return "-webkit-" + a + "-ms-flex-line-pack" + a.replace("align-content", "").replace(ba, "") + a;
          }
        break;
      case 973:
      case 989:
        if (a.charCodeAt(3) !== 45 || a.charCodeAt(4) === 122)
          break;
      case 931:
      case 953:
        if (la.test(d) === true)
          return (b2 = d.substring(d.indexOf(":") + 1)).charCodeAt(0) === 115 ? P2(d.replace("stretch", "fill-available"), c, e, h).replace(":fill-available", ":stretch") : a.replace(b2, "-webkit-" + b2) + a.replace(b2, "-moz-" + b2.replace("fill-", "")) + a;
        break;
      case 962:
        if (a = "-webkit-" + a + (a.charCodeAt(5) === 102 ? "-ms-" + a : "") + a, e + h === 211 && a.charCodeAt(13) === 105 && 0 < a.indexOf("transform", 10))
          return a.substring(0, a.indexOf(";", 27) + 1).replace(ma, "$1-webkit-$2") + a;
    }
    return a;
  }
  function L2(d, c) {
    var e = d.indexOf(c === 1 ? ":" : "{"), h = d.substring(0, c !== 3 ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R2(c !== 2 ? h : h.replace(na, "$1"), e, c);
  }
  function ea(d, c) {
    var e = P2(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ";" ? e.replace(oa, " or ($1)").substring(4) : "(" + c + ")";
  }
  function H2(d, c, e, h, a, m, b2, v2, n, q2) {
    for (var g2 = 0, x2 = c, w3; g2 < A2; ++g2) {
      switch (w3 = S2[g2].call(B2, d, x2, e, h, a, m, b2, v2, n, q2)) {
        case void 0:
        case false:
        case true:
        case null:
          break;
        default:
          x2 = w3;
      }
    }
    if (x2 !== c)
      return x2;
  }
  function T2(d) {
    switch (d) {
      case void 0:
      case null:
        A2 = S2.length = 0;
        break;
      default:
        if (typeof d === "function")
          S2[A2++] = d;
        else if (typeof d === "object")
          for (var c = 0, e = d.length; c < e; ++c) {
            T2(d[c]);
          }
        else
          Y2 = !!d | 0;
    }
    return T2;
  }
  function U2(d) {
    d = d.prefix;
    d !== void 0 && (R2 = null, d ? typeof d !== "function" ? w2 = 1 : (w2 = 2, R2 = d) : w2 = 0);
    return U2;
  }
  function B2(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V2 = e;
    e = [V2];
    if (0 < A2) {
      var h = H2(-1, c, e, e, D2, z2, 0, 0, 0, 0);
      h !== void 0 && typeof h === "string" && (c = h);
    }
    var a = M2(O, e, c, 0, 0);
    0 < A2 && (h = H2(-2, a, e, e, D2, z2, a.length, 0, 0, 0), h !== void 0 && (a = h));
    V2 = "";
    E2 = 0;
    z2 = D2 = 1;
    return a;
  }
  var ca = /^\0+/g, N2 = /[\0\r\f]/g, aa = /: */g, ka = /zoo|gra/, ma = /([,: ])(transform)/g, ia = /,\r+?/g, F2 = /([\t\r\n ])*\f?&/g, fa = /@(k\w+)\s*(\S*)\s*/, Q2 = /::(place)/g, ha = /:(read-only)/g, G2 = /[svh]\w+-[tblr]{2}/, da = /\(\s*(.*)\s*\)/g, oa = /([\s\S]*?);/g, ba = /-self|flex-/g, na = /[^]*?(:[rp][el]a[\w-]+)[^]*/, la = /stretch|:\s*\w+\-(?:conte|avail)/, ja = /([^-])(image-set\()/, z2 = 1, D2 = 1, E2 = 0, w2 = 1, O = [], S2 = [], A2 = 0, R2 = null, Y2 = 0, V2 = "";
  B2.use = T2;
  B2.set = U2;
  W2 !== void 0 && U2(W2);
  return B2;
}
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
function memoize(fn) {
  var cache2 = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache2[arg] === void 0)
      cache2[arg] = fn(arg);
    return cache2[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(function(prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
function v() {
  return (v = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
var g = function(e, t) {
  for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1)
    n.push(t[r], e[r + 1]);
  return n;
}, S = function(t) {
  return t !== null && typeof t == "object" && (t.toString ? t.toString() : Object.prototype.toString.call(t)) === "[object Object]" && !reactIs$1.exports.typeOf(t);
}, w$1 = Object.freeze([]), E = Object.freeze({});
function b(e) {
  return typeof e == "function";
}
function _(e) {
  return typeof e == "string" && e || e.displayName || e.name || "Component";
}
function N(e) {
  return e && typeof e.styledComponentId == "string";
}
var A = typeof process != "undefined" && ({}.REACT_APP_SC_ATTR || {}.SC_ATTR) || "data-styled", I = typeof window != "undefined" && "HTMLElement" in window, P = Boolean(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process != "undefined" && {}.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && {}.REACT_APP_SC_DISABLE_SPEEDY !== "" ? {}.REACT_APP_SC_DISABLE_SPEEDY !== "false" && {}.REACT_APP_SC_DISABLE_SPEEDY : typeof process != "undefined" && {}.SC_DISABLE_SPEEDY !== void 0 && {}.SC_DISABLE_SPEEDY !== "" ? {}.SC_DISABLE_SPEEDY !== "false" && {}.SC_DISABLE_SPEEDY : true), R = { 1: "Cannot create styled-component for component: %s.\n\n", 2: "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n", 3: "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n", 4: "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n", 5: "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n", 6: "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n", 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: 'ThemeProvider: Please make your "theme" prop an object.\n\n', 9: "Missing document `<head>`\n\n", 10: "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n", 11: "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n", 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n", 14: 'ThemeProvider: "theme" prop is required.\n\n', 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n", 17: "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n" };
function D() {
  for (var e = arguments.length <= 0 ? void 0 : arguments[0], t = [], n = 1, r = arguments.length; n < r; n += 1)
    t.push(n < 0 || arguments.length <= n ? void 0 : arguments[n]);
  return t.forEach(function(t2) {
    e = e.replace(/%[a-z]/, t2);
  }), e;
}
function j$1(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  throw new Error(D.apply(void 0, [R[e]].concat(n)).trim());
}
var T = function() {
  function e(e2) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e2;
  }
  var t = e.prototype;
  return t.indexOfGroup = function(e2) {
    for (var t2 = 0, n = 0; n < e2; n++)
      t2 += this.groupSizes[n];
    return t2;
  }, t.insertRules = function(e2, t2) {
    if (e2 >= this.groupSizes.length) {
      for (var n = this.groupSizes, r = n.length, o = r; e2 >= o; )
        (o <<= 1) < 0 && j$1(16, "" + e2);
      this.groupSizes = new Uint32Array(o), this.groupSizes.set(n), this.length = o;
      for (var s = r; s < o; s++)
        this.groupSizes[s] = 0;
    }
    for (var i = this.indexOfGroup(e2 + 1), a = 0, c = t2.length; a < c; a++)
      this.tag.insertRule(i, t2[a]) && (this.groupSizes[e2]++, i++);
  }, t.clearGroup = function(e2) {
    if (e2 < this.length) {
      var t2 = this.groupSizes[e2], n = this.indexOfGroup(e2), r = n + t2;
      this.groupSizes[e2] = 0;
      for (var o = n; o < r; o++)
        this.tag.deleteRule(n);
    }
  }, t.getGroup = function(e2) {
    var t2 = "";
    if (e2 >= this.length || this.groupSizes[e2] === 0)
      return t2;
    for (var n = this.groupSizes[e2], r = this.indexOfGroup(e2), o = r + n, s = r; s < o; s++)
      t2 += this.tag.getRule(s) + "/*!sc*/\n";
    return t2;
  }, e;
}(), x = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map(), V = 1, B = function(e) {
  if (x.has(e))
    return x.get(e);
  for (; k.has(V); )
    V++;
  var t = V++;
  return ((0 | t) < 0 || t > 1 << 30) && j$1(16, "" + t), x.set(e, t), k.set(t, e), t;
}, z = function(e) {
  return k.get(e);
}, M = function(e, t) {
  t >= V && (V = t + 1), x.set(e, t), k.set(t, e);
}, G = "style[" + A + '][data-styled-version="5.3.5"]', L = new RegExp("^" + A + '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'), F = function(e, t, n) {
  for (var r, o = n.split(","), s = 0, i = o.length; s < i; s++)
    (r = o[s]) && e.registerName(t, r);
}, Y = function(e, t) {
  for (var n = (t.textContent || "").split("/*!sc*/\n"), r = [], o = 0, s = n.length; o < s; o++) {
    var i = n[o].trim();
    if (i) {
      var a = i.match(L);
      if (a) {
        var c = 0 | parseInt(a[1], 10), u = a[2];
        c !== 0 && (M(u, c), F(e, u, a[3]), e.getTag().insertRules(c, r)), r.length = 0;
      } else
        r.push(i);
    }
  }
}, q = function() {
  return typeof window != "undefined" && window.__webpack_nonce__ !== void 0 ? window.__webpack_nonce__ : null;
}, H = function(e) {
  var t = document.head, n = e || t, r = document.createElement("style"), o = function(e2) {
    for (var t2 = e2.childNodes, n2 = t2.length; n2 >= 0; n2--) {
      var r2 = t2[n2];
      if (r2 && r2.nodeType === 1 && r2.hasAttribute(A))
        return r2;
    }
  }(n), s = o !== void 0 ? o.nextSibling : null;
  r.setAttribute(A, "active"), r.setAttribute("data-styled-version", "5.3.5");
  var i = q();
  return i && r.setAttribute("nonce", i), n.insertBefore(r, s), r;
}, $ = function() {
  function e(e2) {
    var t2 = this.element = H(e2);
    t2.appendChild(document.createTextNode("")), this.sheet = function(e3) {
      if (e3.sheet)
        return e3.sheet;
      for (var t3 = document.styleSheets, n = 0, r = t3.length; n < r; n++) {
        var o = t3[n];
        if (o.ownerNode === e3)
          return o;
      }
      j$1(17);
    }(t2), this.length = 0;
  }
  var t = e.prototype;
  return t.insertRule = function(e2, t2) {
    try {
      return this.sheet.insertRule(t2, e2), this.length++, true;
    } catch (e3) {
      return false;
    }
  }, t.deleteRule = function(e2) {
    this.sheet.deleteRule(e2), this.length--;
  }, t.getRule = function(e2) {
    var t2 = this.sheet.cssRules[e2];
    return t2 !== void 0 && typeof t2.cssText == "string" ? t2.cssText : "";
  }, e;
}(), W = function() {
  function e(e2) {
    var t2 = this.element = H(e2);
    this.nodes = t2.childNodes, this.length = 0;
  }
  var t = e.prototype;
  return t.insertRule = function(e2, t2) {
    if (e2 <= this.length && e2 >= 0) {
      var n = document.createTextNode(t2), r = this.nodes[e2];
      return this.element.insertBefore(n, r || null), this.length++, true;
    }
    return false;
  }, t.deleteRule = function(e2) {
    this.element.removeChild(this.nodes[e2]), this.length--;
  }, t.getRule = function(e2) {
    return e2 < this.length ? this.nodes[e2].textContent : "";
  }, e;
}(), U = function() {
  function e(e2) {
    this.rules = [], this.length = 0;
  }
  var t = e.prototype;
  return t.insertRule = function(e2, t2) {
    return e2 <= this.length && (this.rules.splice(e2, 0, t2), this.length++, true);
  }, t.deleteRule = function(e2) {
    this.rules.splice(e2, 1), this.length--;
  }, t.getRule = function(e2) {
    return e2 < this.length ? this.rules[e2] : "";
  }, e;
}(), J = I, X = { isServer: !I, useCSSOMInjection: !P }, Z = function() {
  function e(e2, t2, n) {
    e2 === void 0 && (e2 = E), t2 === void 0 && (t2 = {}), this.options = v({}, X, {}, e2), this.gs = t2, this.names = new Map(n), this.server = !!e2.isServer, !this.server && I && J && (J = false, function(e3) {
      for (var t3 = document.querySelectorAll(G), n2 = 0, r = t3.length; n2 < r; n2++) {
        var o = t3[n2];
        o && o.getAttribute(A) !== "active" && (Y(e3, o), o.parentNode && o.parentNode.removeChild(o));
      }
    }(this));
  }
  e.registerId = function(e2) {
    return B(e2);
  };
  var t = e.prototype;
  return t.reconstructWithOptions = function(t2, n) {
    return n === void 0 && (n = true), new e(v({}, this.options, {}, t2), this.gs, n && this.names || void 0);
  }, t.allocateGSInstance = function(e2) {
    return this.gs[e2] = (this.gs[e2] || 0) + 1;
  }, t.getTag = function() {
    return this.tag || (this.tag = (n = (t2 = this.options).isServer, r = t2.useCSSOMInjection, o = t2.target, e2 = n ? new U(o) : r ? new $(o) : new W(o), new T(e2)));
    var e2, t2, n, r, o;
  }, t.hasNameForId = function(e2, t2) {
    return this.names.has(e2) && this.names.get(e2).has(t2);
  }, t.registerName = function(e2, t2) {
    if (B(e2), this.names.has(e2))
      this.names.get(e2).add(t2);
    else {
      var n = /* @__PURE__ */ new Set();
      n.add(t2), this.names.set(e2, n);
    }
  }, t.insertRules = function(e2, t2, n) {
    this.registerName(e2, t2), this.getTag().insertRules(B(e2), n);
  }, t.clearNames = function(e2) {
    this.names.has(e2) && this.names.get(e2).clear();
  }, t.clearRules = function(e2) {
    this.getTag().clearGroup(B(e2)), this.clearNames(e2);
  }, t.clearTag = function() {
    this.tag = void 0;
  }, t.toString = function() {
    return function(e2) {
      for (var t2 = e2.getTag(), n = t2.length, r = "", o = 0; o < n; o++) {
        var s = z(o);
        if (s !== void 0) {
          var i = e2.names.get(s), a = t2.getGroup(o);
          if (i && a && i.size) {
            var c = A + ".g" + o + '[id="' + s + '"]', u = "";
            i !== void 0 && i.forEach(function(e3) {
              e3.length > 0 && (u += e3 + ",");
            }), r += "" + a + c + '{content:"' + u + '"}/*!sc*/\n';
          }
        }
      }
      return r;
    }(this);
  }, e;
}(), K = /(a)(d)/gi, Q = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function ee(e) {
  var t, n = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0)
    n = Q(t % 52) + n;
  return (Q(t % 52) + n).replace(K, "$1-$2");
}
var te = function(e, t) {
  for (var n = t.length; n; )
    e = 33 * e ^ t.charCodeAt(--n);
  return e;
}, ne = function(e) {
  return te(5381, e);
};
var oe = ne("5.3.5"), se = function() {
  function e(e2, t, n) {
    this.rules = e2, this.staticRulesId = "", this.isStatic = false, this.componentId = t, this.baseHash = te(oe, t), this.baseStyle = n, Z.registerId(t);
  }
  return e.prototype.generateAndInjectStyles = function(e2, t, n) {
    var r = this.componentId, o = [];
    if (this.baseStyle && o.push(this.baseStyle.generateAndInjectStyles(e2, t, n)), this.isStatic && !n.hash)
      if (this.staticRulesId && t.hasNameForId(r, this.staticRulesId))
        o.push(this.staticRulesId);
      else {
        var s = Ne(this.rules, e2, t, n).join(""), i = ee(te(this.baseHash, s) >>> 0);
        if (!t.hasNameForId(r, i)) {
          var a = n(s, "." + i, void 0, r);
          t.insertRules(r, i, a);
        }
        o.push(i), this.staticRulesId = i;
      }
    else {
      for (var c = this.rules.length, u = te(this.baseHash, n.hash), l = "", d = 0; d < c; d++) {
        var h = this.rules[d];
        if (typeof h == "string")
          l += h, u = te(u, h + d);
        else if (h) {
          var p = Ne(h, e2, t, n), f = Array.isArray(p) ? p.join("") : p;
          u = te(u, f + d), l += f;
        }
      }
      if (l) {
        var m = ee(u >>> 0);
        if (!t.hasNameForId(r, m)) {
          var y = n(l, "." + m, void 0, r);
          t.insertRules(r, m, y);
        }
        o.push(m);
      }
    }
    return o.join(" ");
  }, e;
}(), ie = /^\s*\/\/.*$/gm, ae = [":", "[", ".", "#"];
function ce(e) {
  var t, n, r, o, s = e === void 0 ? E : e, i = s.options, a = i === void 0 ? E : i, c = s.plugins, u = c === void 0 ? w$1 : c, l = new stylis_min(a), d = [], h = function(e2) {
    function t2(t3) {
      if (t3)
        try {
          e2(t3 + "}");
        } catch (e3) {
        }
    }
    return function(n2, r2, o2, s2, i2, a2, c2, u2, l2, d2) {
      switch (n2) {
        case 1:
          if (l2 === 0 && r2.charCodeAt(0) === 64)
            return e2(r2 + ";"), "";
          break;
        case 2:
          if (u2 === 0)
            return r2 + "/*|*/";
          break;
        case 3:
          switch (u2) {
            case 102:
            case 112:
              return e2(o2[0] + r2), "";
            default:
              return r2 + (d2 === 0 ? "/*|*/" : "");
          }
        case -2:
          r2.split("/*|*/}").forEach(t2);
      }
    };
  }(function(e2) {
    d.push(e2);
  }), f = function(e2, r2, s2) {
    return r2 === 0 && ae.indexOf(s2[n.length]) !== -1 || s2.match(o) ? e2 : "." + t;
  };
  function m(e2, s2, i2, a2) {
    a2 === void 0 && (a2 = "&");
    var c2 = e2.replace(ie, ""), u2 = s2 && i2 ? i2 + " " + s2 + " { " + c2 + " }" : c2;
    return t = a2, n = s2, r = new RegExp("\\" + n + "\\b", "g"), o = new RegExp("(\\" + n + "\\b){2,}"), l(i2 || !s2 ? "" : s2, u2);
  }
  return l.use([].concat(u, [function(e2, t2, o2) {
    e2 === 2 && o2.length && o2[0].lastIndexOf(n) > 0 && (o2[0] = o2[0].replace(r, f));
  }, h, function(e2) {
    if (e2 === -2) {
      var t2 = d;
      return d = [], t2;
    }
  }])), m.hash = u.length ? u.reduce(function(e2, t2) {
    return t2.name || j$1(15), te(e2, t2.name);
  }, 5381).toString() : "", m;
}
var ue = React$1.createContext();
ue.Consumer;
var de = React$1.createContext(), he = (de.Consumer, new Z()), pe = ce();
function fe() {
  return react.exports.useContext(ue) || he;
}
function me() {
  return react.exports.useContext(de) || pe;
}
var ve = function() {
  function e(e2, t) {
    var n = this;
    this.inject = function(e3, t2) {
      t2 === void 0 && (t2 = pe);
      var r = n.name + t2.hash;
      e3.hasNameForId(n.id, r) || e3.insertRules(n.id, r, t2(n.rules, r, "@keyframes"));
    }, this.toString = function() {
      return j$1(12, String(n.name));
    }, this.name = e2, this.id = "sc-keyframes-" + e2, this.rules = t;
  }
  return e.prototype.getName = function(e2) {
    return e2 === void 0 && (e2 = pe), this.name + e2.hash;
  }, e;
}(), ge = /([A-Z])/, Se = /([A-Z])/g, we = /^ms-/, Ee = function(e) {
  return "-" + e.toLowerCase();
};
function be(e) {
  return ge.test(e) ? e.replace(Se, Ee).replace(we, "-ms-") : e;
}
var _e = function(e) {
  return e == null || e === false || e === "";
};
function Ne(e, n, r, o) {
  if (Array.isArray(e)) {
    for (var s, i = [], a = 0, c = e.length; a < c; a += 1)
      (s = Ne(e[a], n, r, o)) !== "" && (Array.isArray(s) ? i.push.apply(i, s) : i.push(s));
    return i;
  }
  if (_e(e))
    return "";
  if (N(e))
    return "." + e.styledComponentId;
  if (b(e)) {
    if (typeof (l = e) != "function" || l.prototype && l.prototype.isReactComponent || !n)
      return e;
    var u = e(n);
    return reactIs$1.exports.isElement(u) && console.warn(_(e) + " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."), Ne(u, n, r, o);
  }
  var l;
  return e instanceof ve ? r ? (e.inject(r, o), e.getName(o)) : e : S(e) ? function e2(t, n2) {
    var r2, o2, s2 = [];
    for (var i2 in t)
      t.hasOwnProperty(i2) && !_e(t[i2]) && (Array.isArray(t[i2]) && t[i2].isCss || b(t[i2]) ? s2.push(be(i2) + ":", t[i2], ";") : S(t[i2]) ? s2.push.apply(s2, e2(t[i2], i2)) : s2.push(be(i2) + ": " + (r2 = i2, (o2 = t[i2]) == null || typeof o2 == "boolean" || o2 === "" ? "" : typeof o2 != "number" || o2 === 0 || r2 in unitlessKeys ? String(o2).trim() : o2 + "px") + ";"));
    return n2 ? [n2 + " {"].concat(s2, ["}"]) : s2;
  }(e) : e.toString();
}
var Ae = function(e) {
  return Array.isArray(e) && (e.isCss = true), e;
};
function Ce(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return b(e) || S(e) ? Ae(Ne(g(w$1, [e].concat(n)))) : n.length === 0 && e.length === 1 && typeof e[0] == "string" ? e : Ae(Ne(g(e, n)));
}
var Ie = /invalid hook call/i, Pe = /* @__PURE__ */ new Set(), Oe = function(e, t) {
  {
    var n = "The component " + e + (t ? ' with the id of "' + t + '"' : "") + " has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.", r = console.error;
    try {
      var o = true;
      console.error = function(e2) {
        if (Ie.test(e2))
          o = false, Pe.delete(n);
        else {
          for (var t2 = arguments.length, s = new Array(t2 > 1 ? t2 - 1 : 0), i = 1; i < t2; i++)
            s[i - 1] = arguments[i];
          r.apply(void 0, [e2].concat(s));
        }
      }, react.exports.useRef(), o && !Pe.has(n) && (console.warn(n), Pe.add(n));
    } catch (e2) {
      Ie.test(e2.message) && Pe.delete(n);
    } finally {
      console.error = r;
    }
  }
}, Re = function(e, t, n) {
  return n === void 0 && (n = E), e.theme !== n.theme && e.theme || t || n.theme;
}, De = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, je = /(^-|-$)/g;
function Te(e) {
  return e.replace(De, "-").replace(je, "");
}
var xe = function(e) {
  return ee(ne(e) >>> 0);
};
function ke(e) {
  return typeof e == "string" && e.charAt(0) === e.charAt(0).toLowerCase();
}
var Ve = function(e) {
  return typeof e == "function" || typeof e == "object" && e !== null && !Array.isArray(e);
}, Be = function(e) {
  return e !== "__proto__" && e !== "constructor" && e !== "prototype";
};
function ze(e, t, n) {
  var r = e[n];
  Ve(t) && Ve(r) ? Me(r, t) : e[n] = t;
}
function Me(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  for (var o = 0, s = n; o < s.length; o++) {
    var i = s[o];
    if (Ve(i))
      for (var a in i)
        Be(a) && ze(e, i[a], a);
  }
  return e;
}
var Ge = React$1.createContext();
Ge.Consumer;
var Ye = {};
function qe(e, t, n) {
  var o = N(e), i = !ke(e), a = t.attrs, c = a === void 0 ? w$1 : a, d = t.componentId, h = d === void 0 ? function(e2, t2) {
    var n2 = typeof e2 != "string" ? "sc" : Te(e2);
    Ye[n2] = (Ye[n2] || 0) + 1;
    var r = n2 + "-" + xe("5.3.5" + n2 + Ye[n2]);
    return t2 ? t2 + "-" + r : r;
  }(t.displayName, t.parentComponentId) : d, p = t.displayName, f = p === void 0 ? function(e2) {
    return ke(e2) ? "styled." + e2 : "Styled(" + _(e2) + ")";
  }(e) : p, g2 = t.displayName && t.componentId ? Te(t.displayName) + "-" + t.componentId : t.componentId || h, S2 = o && e.attrs ? Array.prototype.concat(e.attrs, c).filter(Boolean) : c, A2 = t.shouldForwardProp;
  o && e.shouldForwardProp && (A2 = t.shouldForwardProp ? function(n2, r, o2) {
    return e.shouldForwardProp(n2, r, o2) && t.shouldForwardProp(n2, r, o2);
  } : e.shouldForwardProp);
  var C, I2 = new se(n, g2, o ? e.componentStyle : void 0), P2 = I2.isStatic && c.length === 0, O = function(e2, t2) {
    return function(e3, t3, n2, r) {
      var o2 = e3.attrs, i2 = e3.componentStyle, a2 = e3.defaultProps, c2 = e3.foldedComponentIds, d2 = e3.shouldForwardProp, h2 = e3.styledComponentId, p2 = e3.target;
      react.exports.useDebugValue(h2);
      var f2 = function(e4, t4, n3) {
        e4 === void 0 && (e4 = E);
        var r2 = v({}, t4, { theme: e4 }), o3 = {};
        return n3.forEach(function(e5) {
          var t5, n4, s, i3 = e5;
          for (t5 in b(i3) && (i3 = i3(r2)), i3)
            r2[t5] = o3[t5] = t5 === "className" ? (n4 = o3[t5], s = i3[t5], n4 && s ? n4 + " " + s : n4 || s) : i3[t5];
        }), [r2, o3];
      }(Re(t3, react.exports.useContext(Ge), a2) || E, t3, o2), y = f2[0], g3 = f2[1], S3 = function(e4, t4, n3, r2) {
        var o3 = fe(), s = me(), i3 = t4 ? e4.generateAndInjectStyles(E, o3, s) : e4.generateAndInjectStyles(n3, o3, s);
        return react.exports.useDebugValue(i3), !t4 && r2 && r2(i3), i3;
      }(i2, r, y, e3.warnTooManyClasses), w2 = n2, _2 = g3.$as || t3.$as || g3.as || t3.as || p2, N2 = ke(_2), A3 = g3 !== t3 ? v({}, t3, {}, g3) : t3, C2 = {};
      for (var I3 in A3)
        I3[0] !== "$" && I3 !== "as" && (I3 === "forwardedAs" ? C2.as = A3[I3] : (d2 ? d2(I3, isPropValid, _2) : !N2 || isPropValid(I3)) && (C2[I3] = A3[I3]));
      return t3.style && g3.style !== t3.style && (C2.style = v({}, t3.style, {}, g3.style)), C2.className = Array.prototype.concat(c2, h2, S3 !== h2 ? S3 : null, t3.className, g3.className).filter(Boolean).join(" "), C2.ref = w2, react.exports.createElement(_2, C2);
    }(C, e2, t2, P2);
  };
  return O.displayName = f, (C = React$1.forwardRef(O)).attrs = S2, C.componentStyle = I2, C.displayName = f, C.shouldForwardProp = A2, C.foldedComponentIds = o ? Array.prototype.concat(e.foldedComponentIds, e.styledComponentId) : w$1, C.styledComponentId = g2, C.target = o ? e.target : e, C.withComponent = function(e2) {
    var r = t.componentId, o2 = function(e3, t2) {
      if (e3 == null)
        return {};
      var n2, r2, o3 = {}, s2 = Object.keys(e3);
      for (r2 = 0; r2 < s2.length; r2++)
        n2 = s2[r2], t2.indexOf(n2) >= 0 || (o3[n2] = e3[n2]);
      return o3;
    }(t, ["componentId"]), s = r && r + "-" + (ke(e2) ? e2 : Te(_(e2)));
    return qe(e2, v({}, o2, { attrs: S2, componentId: s }), n);
  }, Object.defineProperty(C, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(t2) {
    this._foldedDefaultProps = o ? Me({}, e.defaultProps, t2) : t2;
  } }), Oe(f, g2), C.warnTooManyClasses = function(e2, t2) {
    var n2 = {}, r = false;
    return function(o2) {
      if (!r && (n2[o2] = true, Object.keys(n2).length >= 200)) {
        var s = t2 ? ' with the id of "' + t2 + '"' : "";
        console.warn("Over 200 classes were generated for component " + e2 + s + ".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"), r = true, n2 = {};
      }
    };
  }(f, g2), C.toString = function() {
    return "." + C.styledComponentId;
  }, i && hoistNonReactStatics_cjs(C, e, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true, withComponent: true }), C;
}
var He = function(e) {
  return function e2(t, r, o) {
    if (o === void 0 && (o = E), !reactIs$1.exports.isValidElementType(r))
      return j$1(1, String(r));
    var s = function() {
      return t(r, o, Ce.apply(void 0, arguments));
    };
    return s.withConfig = function(n) {
      return e2(t, r, v({}, o, {}, n));
    }, s.attrs = function(n) {
      return e2(t, r, v({}, o, { attrs: Array.prototype.concat(o.attrs, n).filter(Boolean) }));
    }, s;
  }(qe, e);
};
["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "textPath", "tspan"].forEach(function(e) {
  He[e] = He(e);
});
typeof navigator != "undefined" && navigator.product === "ReactNative" && console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"), typeof window != "undefined" && (window["__styled-components-init__"] = window["__styled-components-init__"] || 0, window["__styled-components-init__"] === 1 && console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."), window["__styled-components-init__"] += 1);
var Styled = He;
const TemplateBox = Styled.div`
    border-radius: 10px;
    padding: 20px;
    background-color: var(--color-white);
    .wpwax-vm-table{
        tr{
            th{
                &.wpwax-vm-head-name{
                    width: 80%;
                }
            }
        }
        .wpwax-vm-table-action{
            margin: -8px;
        }
        .wpwax-vm-btn{
            font-size: 14px;
            margin: 8px;
            text-decoration: none;
            .dashicons{
                width: 15px;
                height: 15px;
                margin-right: 8px;
                position: relative;
                top: -4px;
            }
        }
    }
    .wpwax-vm-titlebox{
        display: flex;
        align-items: center;
        .wpwax-vm-titlebox-inner{
            display: flex;
            align-items: center;
            min-width: 240px;
        }
        .wpwax-vm-titlebox__name{
            display: none;
            font-weight: 500;
            min-width: 240px;
            color: var(--color-dark);
            &.wpwax-vm-show{
                display: block;
            }
            span{
                display: block;
            }
            .wpwax-vm-titlebox__id{
                font-size: 13px;
                font-weight: 400;
                display: block;
                margin-top: 4px;
                color: var(--color-gray);
            }
        }
    }
    .wpwax-vm-titlebox__editor{
        display: none;
        &.wpwax-vm-show{
            display: flex;
        }
        input{
            border: 0 none;
            background-color: transparent;
            border-bottom: 1px solid var(--color-border-light);
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }
        
    }
    .wpwax-vm-titlebox__editor-action{
        margin-left: 10px;
        a{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 5px 10px #adb4d260;
            margin: 2px;
            transition: 0.3s ease;
            text-decoration: none;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
            &.wpwax-vm-titlebox__editor--cancel{
                background-color: var(--color-danger);
                display: none;
                &.wpwax-vm-show{
                    display: inline-flex;;
                }
            }
            &.wpwax-vm-titlebox__editor--yes{
                background-color: var(--color-success);
                display: none;
                &.wpwax-vm-show{
                    display: inline-flex;;
                }
            }
            &.wpwax-vm-titlebox__editor--edit{
                font-size: 15px;
                display: none;
                margin-left: 15px;
                &:before{
                    color: #2C99FF;
                }
                &.wpwax-vm-show{
                    display: inline-flex;
                }
            }
            .dashicons{
                line-height: 1;
                position: relative;
                top: -2px;
                &:before{
                    font-size: 15px;
                    color: var(--color-white);
                }
            }
        }
    }
`;
var _jsxFileName$g = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/components/formTable/overview/Table.jsx";
const Table = () => {
  const [state, setState] = react.exports.useState({
    data: [],
    titleInput: "",
    message: "",
    responseType: "success",
    loader: true
  });
  const [editElementIndexState, seteditElementIndexState] = react.exports.useState({
    editElementIndex: ""
  });
  const {
    data,
    titleInput,
    message,
    responseType,
    loader
  } = state;
  const {
    editElementIndex
  } = editElementIndexState;
  const activateeditElementIndex = (name, index) => {
    setState(__spreadProps(__spreadValues({}, state), {
      titleInput: name
    }));
    seteditElementIndexState({
      editElementIndex: index
    });
  };
  const canceleditElementIndex = () => {
    seteditElementIndexState({
      editElementIndex: ""
    });
  };
  const updateTableName = (event) => {
    setState(__spreadProps(__spreadValues({}, state), {
      titleInput: event.target.value
    }));
  };
  const removeNotice = (event) => {
    event.preventDefault();
    setState(__spreadProps(__spreadValues({}, state), {
      message: ""
    }));
  };
  const saveTableName = (id) => {
    setState(__spreadProps(__spreadValues({}, state), {
      loader: true
    }));
    const updatedData = data.map((item) => {
      if (item.form_id === id) {
        item.name = titleInput;
        return item;
      }
      return item;
    });
    apiService.dataUpdate(`/forms/${id}`, updatedData).then((response) => {
      if (response.data.success) {
        setState(__spreadProps(__spreadValues({}, state), {
          data: updatedData,
          responseType: "success",
          message: response.data.message,
          loader: false
        }));
      } else {
        setState(__spreadProps(__spreadValues({}, state), {
          data,
          responseType: "warning",
          message: response.data.message,
          loader: false
        }));
      }
      seteditElementIndexState({
        editElementIndex: ""
      });
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };
  const deleteForm = (id) => {
    setState(__spreadProps(__spreadValues({}, state), {
      loader: true
    }));
    apiService.datadelete(`/forms/${id}`).then((response) => {
      if (response.data.success) {
        const responsedData = data.filter((item) => item.form_id !== id);
        setState(__spreadProps(__spreadValues({}, state), {
          data: responsedData,
          responseType: "success",
          message: response.data.message,
          loader: false
        }));
      }
    }).catch((error) => {
      setState(__spreadProps(__spreadValues({}, state), {
        message: error.message,
        responseType: "error",
        loader: false
      }));
    });
  };
  react.exports.useEffect(() => {
    apiService.getAll("/forms").then((response) => {
      setState(__spreadProps(__spreadValues({}, state), {
        titleInput: response.data.name,
        data: response.data.data,
        loader: false
      }));
    }).catch((error) => {
      setState(__spreadProps(__spreadValues({}, state), {
        message: error.message,
        responseType: "error",
        loader: false
      }));
    });
  }, []);
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(TemplateBox, {
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-table-wrap wpwax-vm-table-responsive",
      children: [message ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
        className: `${responseType === "success" ? "wpwax-vm-notice wpwax-vm-notice-success" : "wpwax-vm-notice wpwax-vm-notice-danger"}`,
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          className: "wpwax-vm-notice__text",
          children: message
        }, void 0, false, {
          fileName: _jsxFileName$g,
          lineNumber: 183,
          columnNumber: 25
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
          href: "#",
          className: "wpwax-vm-notice__close",
          onClick: removeNotice,
          children: "x"
        }, void 0, false, {
          fileName: _jsxFileName$g,
          lineNumber: 184,
          columnNumber: 25
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$g,
        lineNumber: 182,
        columnNumber: 21
      }, globalThis) : "", /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("table", {
        className: "wpwax-vm-table",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("thead", {
          children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("tr", {
            children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("th", {
              className: "wpwax-vm-head-name",
              children: "Title"
            }, void 0, false, {
              fileName: _jsxFileName$g,
              lineNumber: 192,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("th", {
              className: "wpwax-vm-head-action",
              children: "Action"
            }, void 0, false, {
              fileName: _jsxFileName$g,
              lineNumber: 193,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$g,
            lineNumber: 191,
            columnNumber: 25
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$g,
          lineNumber: 190,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("tbody", {
          children: data.length > 0 ? data.map((value, key) => {
            return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("tr", {
              children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("td", {
                children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
                  className: "wpwax-vm-titlebox",
                  children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
                    className: "wpwax-vm-titlebox-inner",
                    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                      className: editElementIndex === key ? "wpwax-vm-titlebox__name" : "wpwax-vm-titlebox__name wpwax-vm-show",
                      children: [value.name, /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                        className: "wpwax-vm-titlebox__id",
                        children: ["ID: ", value.form_id]
                      }, void 0, true, {
                        fileName: _jsxFileName$g,
                        lineNumber: 207,
                        columnNumber: 57
                      }, globalThis)]
                    }, void 0, true, {
                      fileName: _jsxFileName$g,
                      lineNumber: 205,
                      columnNumber: 53
                    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
                      className: editElementIndex === key ? `wpwax-vm-titlebox__editor wpwax-vm-show` : `wpwax-vm-titlebox__editor`,
                      children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
                        type: "text",
                        name: "wpwax-vm-title-input",
                        value: titleInput || "",
                        onChange: updateTableName
                      }, void 0, false, {
                        fileName: _jsxFileName$g,
                        lineNumber: 210,
                        columnNumber: 57
                      }, globalThis)
                    }, void 0, false, {
                      fileName: _jsxFileName$g,
                      lineNumber: 209,
                      columnNumber: 53
                    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
                      className: "wpwax-vm-titlebox__editor-action",
                      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
                        href: "#",
                        className: editElementIndex === key ? "wpwax-vm-titlebox__editor--cancel wpwax-vm-show" : "wpwax-vm-titlebox__editor--cancel",
                        onClick: canceleditElementIndex,
                        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                          className: "dashicons dashicons-no"
                        }, void 0, false, {
                          fileName: _jsxFileName$g,
                          lineNumber: 214,
                          columnNumber: 61
                        }, globalThis)
                      }, void 0, false, {
                        fileName: _jsxFileName$g,
                        lineNumber: 213,
                        columnNumber: 57
                      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
                        href: "#",
                        className: editElementIndex === key ? "wpwax-vm-titlebox__editor--yes wpwax-vm-show" : "wpwax-vm-titlebox__editor--yes",
                        onClick: () => saveTableName(value.form_id),
                        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                          className: "dashicons dashicons-yes"
                        }, void 0, false, {
                          fileName: _jsxFileName$g,
                          lineNumber: 217,
                          columnNumber: 61
                        }, globalThis)
                      }, void 0, false, {
                        fileName: _jsxFileName$g,
                        lineNumber: 216,
                        columnNumber: 57
                      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
                        href: "#",
                        className: editElementIndex === key ? "wpwax-vm-titlebox__editor--edit dashicons dashicons-edit" : "wpwax-vm-titlebox__editor--edit dashicons dashicons-edit wpwax-vm-show",
                        onClick: () => activateeditElementIndex(value.name, key)
                      }, void 0, false, {
                        fileName: _jsxFileName$g,
                        lineNumber: 219,
                        columnNumber: 57
                      }, globalThis)]
                    }, void 0, true, {
                      fileName: _jsxFileName$g,
                      lineNumber: 212,
                      columnNumber: 53
                    }, globalThis)]
                  }, void 0, true, {
                    fileName: _jsxFileName$g,
                    lineNumber: 204,
                    columnNumber: 49
                  }, globalThis)
                }, void 0, false, {
                  fileName: _jsxFileName$g,
                  lineNumber: 203,
                  columnNumber: 45
                }, globalThis)
              }, void 0, false, {
                fileName: _jsxFileName$g,
                lineNumber: 202,
                columnNumber: 41
              }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("td", {
                children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
                  className: "wpwax-vm-table-action",
                  children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
                    href: "#",
                    className: "wpwax-vm-btn wpwax-vm-btn-light",
                    children: [" ", /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                      className: "dashicons dashicons-edit"
                    }, void 0, false, {
                      fileName: _jsxFileName$g,
                      lineNumber: 226,
                      columnNumber: 106
                    }, globalThis), " Edit"]
                  }, void 0, true, {
                    fileName: _jsxFileName$g,
                    lineNumber: 226,
                    columnNumber: 49
                  }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
                    href: "#",
                    className: "wpwax-vm-btn wpwax-vm-btn-danger",
                    onClick: () => deleteForm(value.form_id),
                    children: [" ", /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                      className: "dashicons dashicons-trash"
                    }, void 0, false, {
                      fileName: _jsxFileName$g,
                      lineNumber: 227,
                      columnNumber: 148
                    }, globalThis), " Delete"]
                  }, void 0, true, {
                    fileName: _jsxFileName$g,
                    lineNumber: 227,
                    columnNumber: 49
                  }, globalThis)]
                }, void 0, true, {
                  fileName: _jsxFileName$g,
                  lineNumber: 225,
                  columnNumber: 45
                }, globalThis)
              }, void 0, false, {
                fileName: _jsxFileName$g,
                lineNumber: 224,
                columnNumber: 41
              }, globalThis)]
            }, key, true, {
              fileName: _jsxFileName$g,
              lineNumber: 201,
              columnNumber: 37
            }, globalThis);
          }) : /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("tr", {
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("td", {
              colSpan: 2,
              children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                className: "wpwax-notfound-text wpwax-vm-text-center",
                children: "Sorry!! Data Not Found :("
              }, void 0, false, {
                fileName: _jsxFileName$g,
                lineNumber: 235,
                columnNumber: 37
              }, globalThis)
            }, void 0, false, {
              fileName: _jsxFileName$g,
              lineNumber: 234,
              columnNumber: 33
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$g,
            lineNumber: 233,
            columnNumber: 29
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$g,
          lineNumber: 197,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$g,
        lineNumber: 189,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$g,
      lineNumber: 180,
      columnNumber: 13
    }, globalThis)
  }, void 0, false, {
    fileName: _jsxFileName$g,
    lineNumber: 179,
    columnNumber: 9
  }, globalThis);
};
var _jsxFileName$f = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/components/formTable/Index.jsx";
function FormTable() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(jsxDevRuntime.exports.Fragment, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(PageHeader, {}, void 0, false, {
      fileName: _jsxFileName$f,
      lineNumber: 7,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Table, {}, void 0, false, {
      fileName: _jsxFileName$f,
      lineNumber: 9,
      columnNumber: 4
    }, this)]
  }, void 0, true);
}
var _jsxFileName$e = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/App.jsx";
const BuilderContainer = () => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: "wpwax-vm-page-inner",
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FormTable, {}, void 0, false, {
      fileName: _jsxFileName$e,
      lineNumber: 6,
      columnNumber: 4
    }, globalThis)
  }, void 0, false, {
    fileName: _jsxFileName$e,
    lineNumber: 5,
    columnNumber: 9
  }, globalThis);
};
function App$1() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(BuilderContainer, {}, void 0, false, {
    fileName: _jsxFileName$e,
    lineNumber: 13,
    columnNumber: 9
  }, this);
}
var _jsxFileName$d = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/index.jsx";
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("wpwax-vm-forms");
  if (!container) {
    return;
  }
  const root = createRoot(container);
  root.render(/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(App$1, {}, void 0, false, {
    fileName: _jsxFileName$d,
    lineNumber: 12,
    columnNumber: 15
  }, this));
});
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(redux);
var compose = require$$0.compose;
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0)
    return void 0;
  if (typeof arguments[0] === "object")
    return compose;
  return compose.apply(null, arguments);
};
const actions = {
  FORM_READ_BEGIN: "FORM_READ_BEGIN",
  FORM_READ_SUCCESS: "FORM_READ_SUCCESS",
  FORM_READ_ERR: "FORM_READ_ERR",
  FORM_ADD_BEGIN: "FORM_ADD_BEGIN",
  FORM_ADD_SUCCESS: "FORM_ADD_SUCCESS",
  FORM_ADD_ERR: "FORM_ADD_ERR",
  addFormBegin: () => {
    return {
      type: actions.FORM_ADD_BEGIN
    };
  },
  addFormSuccess: (data) => {
    return {
      type: actions.FORM_ADD_SUCCESS,
      data
    };
  },
  addFormErr: (err) => {
    return {
      type: actions.FORM_ADD_ERR,
      err
    };
  },
  formReadBegin: () => {
    return {
      type: actions.FORM_READ_BEGIN
    };
  },
  formReadSuccess: (data) => {
    return {
      type: actions.FORM_READ_SUCCESS,
      data
    };
  },
  formReadErr: (err) => {
    return {
      type: actions.FORM_READ_ERR,
      err
    };
  }
};
const formData = [
  {
    "form_id": "1",
    "name": "",
    "template": "Large",
    "all_page_visibility": true,
    "custom_visible_page": null,
    "acccount_creation": true,
    "account_fields": ["name", "email", "passowrd"],
    "show_chat_onload": true,
    "chat_video_img": "",
    "greet_message": "Welcome to Directorist, leave your questions below",
    "description_visibility": true,
    "description": "Welcome to Directorist, leave your questions below",
    "chat_box_title": "How would you like to chat?",
    "reply_type_video": true,
    "reply_type_screen_record": true,
    "reply_type_voice": false,
    "reply_type_text": false,
    "footer_visibility": true,
    "footer_message": "You can practice before sending",
    "font": "Roboto",
    "font_size": "Medium",
    "font_color": "#ffffff",
    "button_color": "#000000",
    "button_border_radius": "15",
    "info_collection_visibility": true,
    "collect_info": ["name", "email", "phone"],
    "thank_page_title": "Thank You",
    "thank_page_description_Visibility": true,
    "thank_page_description": "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface",
    "thank_page_button_visibility": true,
    "thank_page_button_text": "Try for Free",
    "thank_page_button_url": "www.demo.com",
    "thank_page_background": "#ffffff",
    "thank_page_title_font_size": "xx-large",
    "thank_page_font_color": "#030308",
    "thank_page_button_color": "#6551F2",
    "thank_page_button_text_color": "#ffffff",
    "thank_page_button_radius": "10"
  }
];
const initialState = {
  data: formData,
  loading: false,
  error: null
};
const {
  FORM_READ_BEGIN,
  FORM_READ_SUCCESS,
  FORM_READ_ERR,
  FORM_ADD_BEGIN,
  FORM_ADD_SUCCESS,
  FORM_ADD_ERR
} = actions;
const FormReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FORM_ADD_BEGIN:
      return __spreadProps(__spreadValues({}, state), {
        sLoading: true
      });
    case FORM_ADD_SUCCESS:
      return __spreadProps(__spreadValues({}, state), {
        data,
        sLoading: false
      });
    case FORM_ADD_ERR:
      return __spreadProps(__spreadValues({}, state), {
        error: err,
        sLoading: false
      });
    case FORM_READ_BEGIN:
      return __spreadProps(__spreadValues({}, state), {
        loading: true
      });
    case FORM_READ_SUCCESS:
      return __spreadProps(__spreadValues({}, state), {
        data,
        loading: false
      });
    case FORM_READ_ERR:
      return __spreadProps(__spreadValues({}, state), {
        error: err,
        loading: false
      });
    default:
      return state;
  }
};
const rootReducers = combineReducers({
  form: FormReducer
});
const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk.withExtraArgument())));
var propTypes$6 = { exports: {} };
var reactIs = { exports: {} };
var reactIs_development = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
{
  (function() {
    var hasSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
    function isValidElementType(type) {
      return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }
    function typeOf(object) {
      if (typeof object === "object" && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;
            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;
              default:
                var $$typeofType = type && type.$$typeof;
                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
      return void 0;
    }
    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false;
    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true;
          console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }
    reactIs_development.AsyncMode = AsyncMode;
    reactIs_development.ConcurrentMode = ConcurrentMode;
    reactIs_development.ContextConsumer = ContextConsumer;
    reactIs_development.ContextProvider = ContextProvider;
    reactIs_development.Element = Element;
    reactIs_development.ForwardRef = ForwardRef;
    reactIs_development.Fragment = Fragment;
    reactIs_development.Lazy = Lazy;
    reactIs_development.Memo = Memo;
    reactIs_development.Portal = Portal;
    reactIs_development.Profiler = Profiler;
    reactIs_development.StrictMode = StrictMode;
    reactIs_development.Suspense = Suspense;
    reactIs_development.isAsyncMode = isAsyncMode;
    reactIs_development.isConcurrentMode = isConcurrentMode;
    reactIs_development.isContextConsumer = isContextConsumer;
    reactIs_development.isContextProvider = isContextProvider;
    reactIs_development.isElement = isElement;
    reactIs_development.isForwardRef = isForwardRef;
    reactIs_development.isFragment = isFragment;
    reactIs_development.isLazy = isLazy;
    reactIs_development.isMemo = isMemo;
    reactIs_development.isPortal = isPortal;
    reactIs_development.isProfiler = isProfiler;
    reactIs_development.isStrictMode = isStrictMode;
    reactIs_development.isSuspense = isSuspense;
    reactIs_development.isValidElementType = isValidElementType;
    reactIs_development.typeOf = typeOf;
  })();
}
{
  reactIs.exports = reactIs_development;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
      return test2[n];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
  var from2;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from2 = Object(arguments[s]);
    for (var key in from2) {
      if (hasOwnProperty$1.call(from2, key)) {
        to[key] = from2[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from2);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from2, symbols[i])) {
          to[symbols[i]] = from2[symbols[i]];
        }
      }
    }
  }
  return to;
};
var ReactPropTypesSecret$2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;
var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning$1 = function() {
};
{
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = has$2;
  printWarning$1 = function(text) {
    var message = "Warning: " + text;
    if (typeof console !== "undefined") {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (x2) {
    }
  };
}
function checkPropTypes$1(typeSpecs, values, location2, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        try {
          if (typeof typeSpecs[typeSpecName] !== "function") {
            var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
            err.name = "Invariant Violation";
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || "React class") + ": type specification of " + location2 + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : "";
          printWarning$1("Failed " + location2 + " type: " + error.message + (stack != null ? stack : ""));
        }
      }
    }
  }
}
checkPropTypes$1.resetWarningCache = function() {
  {
    loggedTypeFailures = {};
  }
};
var checkPropTypes_1 = checkPropTypes$1;
var ReactIs$1 = reactIs.exports;
var assign$1 = objectAssign;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
var has = has$2;
var checkPropTypes = checkPropTypes_1;
var printWarning = function() {
};
{
  printWarning = function(text) {
    var message = "Warning: " + text;
    if (typeof console !== "undefined") {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (x2) {
    }
  };
}
function emptyFunctionThatReturnsNull() {
  return null;
}
var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = "@@iterator";
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === "function") {
      return iteratorFn;
    }
  }
  var ANONYMOUS = "<<anonymous>>";
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker("array"),
    bigint: createPrimitiveTypeChecker("bigint"),
    bool: createPrimitiveTypeChecker("boolean"),
    func: createPrimitiveTypeChecker("function"),
    number: createPrimitiveTypeChecker("number"),
    object: createPrimitiveTypeChecker("object"),
    string: createPrimitiveTypeChecker("string"),
    symbol: createPrimitiveTypeChecker("symbol"),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  function is(x2, y) {
    if (x2 === y) {
      return x2 !== 0 || 1 / x2 === 1 / y;
    } else {
      return x2 !== x2 && y !== y;
    }
  }
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === "object" ? data : {};
    this.stack = "";
  }
  PropTypeError.prototype = Error.prototype;
  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location2, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
          err.name = "Invariant Violation";
          throw err;
        } else if (typeof console !== "undefined") {
          var cacheKey = componentName + ":" + propName;
          if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
            printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError("The " + location2 + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
          }
          return new PropTypeError("The " + location2 + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location2, propFullName);
      }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location2, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var preciseType = getPreciseType(propValue);
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."), { expectedType });
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location2, propFullName) {
      if (typeof typeChecker !== "function") {
        return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location2, propFullName + "[" + i + "]", ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location2, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location2, propFullName) {
      var propValue = props[propName];
      if (!ReactIs$1.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location2, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      {
        if (arguments.length > 1) {
          printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
        } else {
          printWarning("Invalid argument supplied to oneOf, expected an array.");
        }
      }
      return emptyFunctionThatReturnsNull;
    }
    function validate(props, propName, componentName, location2, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }
      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === "symbol") {
          return String(value);
        }
        return value;
      });
      return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
    }
    return createChainableTypeChecker(validate);
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location2, propFullName) {
      if (typeof typeChecker !== "function") {
        return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== "object") {
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning("Invalid argument supplied to oneOfType, expected an instance of array.");
      return emptyFunctionThatReturnsNull;
    }
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== "function") {
        printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + ".");
        return emptyFunctionThatReturnsNull;
      }
    }
    function validate(props, propName, componentName, location2, propFullName) {
      var expectedTypes = [];
      for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
        var checker2 = arrayOfTypeCheckers[i2];
        var checkerResult = checker2(props, propName, componentName, location2, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, "expectedType")) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
      return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
    }
    return createChainableTypeChecker(validate);
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location2, propFullName) {
      if (!isNode2(props[propName])) {
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function invalidValidatorError(componentName, location2, propFullName, key, type) {
    return new PropTypeError((componentName || "React class") + ": " + location2 + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`.");
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location2, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== "object") {
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== "function") {
          return invalidValidatorError(componentName, location2, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location2, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== "object") {
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
      }
      var allKeys = assign$1({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== "function") {
          return invalidValidatorError(componentName, location2, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
        }
        var error = checker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function isNode2(propValue) {
    switch (typeof propValue) {
      case "number":
      case "string":
      case "undefined":
        return true;
      case "boolean":
        return !propValue;
      case "object":
        if (Array.isArray(propValue)) {
          return propValue.every(isNode2);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }
        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode2(step.value)) {
                return false;
              }
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode2(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }
        return true;
      default:
        return false;
    }
  }
  function isSymbol(propType, propValue) {
    if (propType === "symbol") {
      return true;
    }
    if (!propValue) {
      return false;
    }
    if (propValue["@@toStringTag"] === "Symbol") {
      return true;
    }
    if (typeof Symbol === "function" && propValue instanceof Symbol) {
      return true;
    }
    return false;
  }
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return "array";
    }
    if (propValue instanceof RegExp) {
      return "object";
    }
    if (isSymbol(propType, propValue)) {
      return "symbol";
    }
    return propType;
  }
  function getPreciseType(propValue) {
    if (typeof propValue === "undefined" || propValue === null) {
      return "" + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === "object") {
      if (propValue instanceof Date) {
        return "date";
      } else if (propValue instanceof RegExp) {
        return "regexp";
      }
    }
    return propType;
  }
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case "array":
      case "object":
        return "an " + type;
      case "boolean":
      case "date":
      case "regexp":
        return "a " + type;
      default:
        return type;
    }
  }
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }
  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  var ReactIs = reactIs.exports;
  var throwOnDirectAccess = true;
  propTypes$6.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
}
var propTypes$5 = propTypes$6.exports;
function makeTypeChecker(tabsRole) {
  return function(element) {
    return !!element.type && element.type.tabsRole === tabsRole;
  };
}
var isTab = makeTypeChecker("Tab");
var isTabList = makeTypeChecker("TabList");
var isTabPanel = makeTypeChecker("TabPanel");
function _extends$3() {
  _extends$3 = Object.assign || function(target) {
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
  return _extends$3.apply(this, arguments);
}
function isTabChild(child) {
  return isTab(child) || isTabList(child) || isTabPanel(child);
}
function deepMap(children, callback) {
  return react.exports.Children.map(children, function(child) {
    if (child === null)
      return null;
    if (isTabChild(child)) {
      return callback(child);
    }
    if (child.props && child.props.children && typeof child.props.children === "object") {
      return /* @__PURE__ */ react.exports.cloneElement(child, _extends$3({}, child.props, {
        children: deepMap(child.props.children, callback)
      }));
    }
    return child;
  });
}
function deepForEach(children, callback) {
  return react.exports.Children.forEach(children, function(child) {
    if (child === null)
      return;
    if (isTab(child) || isTabPanel(child)) {
      callback(child);
    } else if (child.props && child.props.children && typeof child.props.children === "object") {
      if (isTabList(child))
        callback(child);
      deepForEach(child.props.children, callback);
    }
  });
}
function childrenPropType(props, propName, componentName) {
  var error;
  var tabsCount = 0;
  var panelsCount = 0;
  var tabListFound = false;
  var listTabs = [];
  var children = props[propName];
  deepForEach(children, function(child) {
    if (isTabList(child)) {
      if (child.props && child.props.children && typeof child.props.children === "object") {
        deepForEach(child.props.children, function(listChild) {
          return listTabs.push(listChild);
        });
      }
      if (tabListFound) {
        error = new Error("Found multiple 'TabList' components inside 'Tabs'. Only one is allowed.");
      }
      tabListFound = true;
    }
    if (isTab(child)) {
      if (!tabListFound || listTabs.indexOf(child) === -1) {
        error = new Error("Found a 'Tab' component outside of the 'TabList' component. 'Tab' components have to be inside the 'TabList' component.");
      }
      tabsCount++;
    } else if (isTabPanel(child)) {
      panelsCount++;
    }
  });
  if (!error && tabsCount !== panelsCount) {
    error = new Error("There should be an equal number of 'Tab' and 'TabPanel' in `" + componentName + "`. " + ("Received " + tabsCount + " 'Tab' and " + panelsCount + " 'TabPanel'."));
  }
  return error;
}
function onSelectPropType(props, propName, componentName, location2, propFullName) {
  var prop = props[propName];
  var name = propFullName || propName;
  var error = null;
  if (prop && typeof prop !== "function") {
    error = new Error("Invalid " + location2 + " `" + name + "` of type `" + typeof prop + "` supplied " + ("to `" + componentName + "`, expected `function`."));
  } else if (props.selectedIndex != null && prop == null) {
    error = new Error("The " + location2 + " `" + name + "` is marked as required in `" + componentName + "`, but its value is `undefined` or `null`.\n`onSelect` is required when `selectedIndex` is also set. Not doing so will make the tabs not do anything, as `selectedIndex` indicates that you want to handle the selected tab yourself.\nIf you only want to set the inital tab replace `selectedIndex` with `defaultIndex`.");
  }
  return error;
}
function selectedIndexPropType(props, propName, componentName, location2, propFullName) {
  var prop = props[propName];
  var name = propFullName || propName;
  var error = null;
  if (prop != null && typeof prop !== "number") {
    error = new Error("Invalid " + location2 + " `" + name + "` of type `" + typeof prop + "` supplied to " + ("`" + componentName + "`, expected `number`."));
  } else if (props.defaultIndex != null && prop != null) {
    return new Error("The " + location2 + " `" + name + "` cannot be used together with `defaultIndex` " + ("in `" + componentName + "`.\n") + ("Either remove `" + name + "` to let `" + componentName + "` handle the selected ") + "tab internally or remove `defaultIndex` to handle it yourself.");
  }
  return error;
}
function toVal(mix) {
  var k2, y, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k2 = 0; k2 < mix.length; k2++) {
        if (mix[k2]) {
          if (y = toVal(mix[k2])) {
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (k2 in mix) {
        if (mix[k2]) {
          str && (str += " ");
          str += k2;
        }
      }
    }
  }
  return str;
}
function cx() {
  var i = 0, tmp, x2, str = "";
  while (i < arguments.length) {
    if (tmp = arguments[i++]) {
      if (x2 = toVal(tmp)) {
        str && (str += " ");
        str += x2;
      }
    }
  }
  return str;
}
var count = 0;
function uuid() {
  return "react-tabs-" + count++;
}
function getTabsCount(children) {
  var tabCount = 0;
  deepForEach(children, function(child) {
    if (isTab(child))
      tabCount++;
  });
  return tabCount;
}
var _jsxFileName$c = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/node_modules/react-tabs/esm/components/UncontrolledTabs.js";
var _excluded$9 = ["children", "className", "disabledTabClassName", "domRef", "focus", "forceRenderTabPanel", "onSelect", "selectedIndex", "selectedTabClassName", "selectedTabPanelClassName", "environment", "disableUpDownKeys"];
function _objectWithoutPropertiesLoose$3(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function isNode(node2) {
  return node2 && "getAttribute" in node2;
}
function isTabNode(node2) {
  return isNode(node2) && node2.getAttribute("data-rttab");
}
function isTabDisabled(node2) {
  return isNode(node2) && node2.getAttribute("aria-disabled") === "true";
}
var canUseActiveElement;
function determineCanUseActiveElement(environment) {
  var env = environment || (typeof window !== "undefined" ? window : void 0);
  try {
    canUseActiveElement = !!(typeof env !== "undefined" && env.document && env.document.activeElement);
  } catch (e) {
    canUseActiveElement = false;
  }
}
var defaultProps$4 = {
  className: "react-tabs",
  focus: false
};
var propTypes$4 = {
  children: childrenPropType,
  direction: propTypes$5.oneOf(["rtl", "ltr"]),
  className: propTypes$5.oneOfType([propTypes$5.string, propTypes$5.array, propTypes$5.object]),
  disabledTabClassName: propTypes$5.string,
  disableUpDownKeys: propTypes$5.bool,
  domRef: propTypes$5.func,
  focus: propTypes$5.bool,
  forceRenderTabPanel: propTypes$5.bool,
  onSelect: propTypes$5.func.isRequired,
  selectedIndex: propTypes$5.number.isRequired,
  selectedTabClassName: propTypes$5.string,
  selectedTabPanelClassName: propTypes$5.string,
  environment: propTypes$5.object
};
var UncontrolledTabs = function UncontrolledTabs2(props) {
  var tabNodes = react.exports.useRef([]);
  var tabIds = react.exports.useRef([]);
  var panelIds = react.exports.useRef([]);
  var _ref3 = react.exports.useRef();
  function setSelected(index, event) {
    if (index < 0 || index >= getTabsCount$1())
      return;
    var onSelect = props.onSelect, selectedIndex = props.selectedIndex;
    onSelect(index, selectedIndex, event);
  }
  function getNextTab(index) {
    var count2 = getTabsCount$1();
    for (var i = index + 1; i < count2; i++) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }
    for (var _i = 0; _i < index; _i++) {
      if (!isTabDisabled(getTab(_i))) {
        return _i;
      }
    }
    return index;
  }
  function getPrevTab(index) {
    var i = index;
    while (i--) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }
    i = getTabsCount$1();
    while (i-- > index) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }
    return index;
  }
  function getFirstTab() {
    var count2 = getTabsCount$1();
    for (var i = 0; i < count2; i++) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }
    return null;
  }
  function getLastTab() {
    var i = getTabsCount$1();
    while (i--) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }
    return null;
  }
  function getTabsCount$1() {
    var children = props.children;
    return getTabsCount(children);
  }
  function getTab(index) {
    return tabNodes.current["tabs-" + index];
  }
  function getChildren() {
    var index = 0;
    var children = props.children, disabledTabClassName = props.disabledTabClassName, focus = props.focus, forceRenderTabPanel = props.forceRenderTabPanel, selectedIndex = props.selectedIndex, selectedTabClassName = props.selectedTabClassName, selectedTabPanelClassName = props.selectedTabPanelClassName, environment = props.environment;
    tabIds.current = tabIds.current || [];
    panelIds.current = panelIds.current || [];
    var diff = tabIds.current.length - getTabsCount$1();
    while (diff++ < 0) {
      tabIds.current.push(uuid());
      panelIds.current.push(uuid());
    }
    return deepMap(children, function(child) {
      var result = child;
      if (isTabList(child)) {
        var listIndex = 0;
        var wasTabFocused = false;
        if (canUseActiveElement == null) {
          determineCanUseActiveElement(environment);
        }
        var env = environment || (typeof window !== "undefined" ? window : void 0);
        if (canUseActiveElement && env) {
          wasTabFocused = React$1.Children.toArray(child.props.children).filter(isTab).some(function(tab, i) {
            return env.document.activeElement === getTab(i);
          });
        }
        result = /* @__PURE__ */ react.exports.cloneElement(child, {
          children: deepMap(child.props.children, function(tab) {
            var key = "tabs-" + listIndex;
            var selected = selectedIndex === listIndex;
            var props2 = {
              tabRef: function tabRef(node2) {
                tabNodes.current[key] = node2;
              },
              id: tabIds.current[listIndex],
              panelId: panelIds.current[listIndex],
              selected,
              focus: selected && (focus || wasTabFocused)
            };
            if (selectedTabClassName)
              props2.selectedClassName = selectedTabClassName;
            if (disabledTabClassName)
              props2.disabledClassName = disabledTabClassName;
            listIndex++;
            return /* @__PURE__ */ react.exports.cloneElement(tab, props2);
          })
        });
      } else if (isTabPanel(child)) {
        var _props = {
          id: panelIds.current[index],
          tabId: tabIds.current[index],
          selected: selectedIndex === index
        };
        if (forceRenderTabPanel)
          _props.forceRender = forceRenderTabPanel;
        if (selectedTabPanelClassName)
          _props.selectedClassName = selectedTabPanelClassName;
        index++;
        result = /* @__PURE__ */ react.exports.cloneElement(child, _props);
      }
      return result;
    });
  }
  function handleKeyDown(e) {
    var direction = props.direction, disableUpDownKeys = props.disableUpDownKeys;
    if (isTabFromContainer(e.target)) {
      var index = props.selectedIndex;
      var preventDefault = false;
      var useSelectedIndex = false;
      if (e.code === "Space" || e.keyCode === 32 || e.code === "Enter" || e.keyCode === 13) {
        preventDefault = true;
        useSelectedIndex = false;
        handleClick(e);
      }
      if (e.code === "ArrowLeft" || e.keyCode === 37 || !disableUpDownKeys && (e.keyCode === 38 || e.code === "ArrowUp")) {
        if (direction === "rtl") {
          index = getNextTab(index);
        } else {
          index = getPrevTab(index);
        }
        preventDefault = true;
        useSelectedIndex = true;
      } else if (e.code === "ArrowRight" || e.keyCode === 39 || !disableUpDownKeys && (e.keyCode === 40 || e.code === "ArrowDown")) {
        if (direction === "rtl") {
          index = getPrevTab(index);
        } else {
          index = getNextTab(index);
        }
        preventDefault = true;
        useSelectedIndex = true;
      } else if (e.keyCode === 35 || e.code === "End") {
        index = getLastTab();
        preventDefault = true;
        useSelectedIndex = true;
      } else if (e.keyCode === 36 || e.code === "Home") {
        index = getFirstTab();
        preventDefault = true;
        useSelectedIndex = true;
      }
      if (preventDefault) {
        e.preventDefault();
      }
      if (useSelectedIndex) {
        setSelected(index, e);
      }
    }
  }
  function handleClick(e) {
    var node2 = e.target;
    do {
      if (isTabFromContainer(node2)) {
        if (isTabDisabled(node2)) {
          return;
        }
        var index = [].slice.call(node2.parentNode.children).filter(isTabNode).indexOf(node2);
        setSelected(index, e);
        return;
      }
    } while ((node2 = node2.parentNode) != null);
  }
  function isTabFromContainer(node2) {
    if (!isTabNode(node2)) {
      return false;
    }
    var nodeAncestor = node2.parentElement;
    do {
      if (nodeAncestor === _ref3.current)
        return true;
      if (nodeAncestor.getAttribute("data-rttabs"))
        break;
      nodeAncestor = nodeAncestor.parentElement;
    } while (nodeAncestor);
    return false;
  }
  props.children;
  var className = props.className;
  props.disabledTabClassName;
  var domRef = props.domRef;
  props.focus;
  props.forceRenderTabPanel;
  props.onSelect;
  props.selectedIndex;
  props.selectedTabClassName;
  props.selectedTabPanelClassName;
  props.environment;
  props.disableUpDownKeys;
  var attributes = _objectWithoutPropertiesLoose$3(props, _excluded$9);
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", __spreadProps(__spreadValues({}, attributes), {
    className: cx(className),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ref: function ref(node2) {
      _ref3.current = node2;
      if (domRef)
        domRef(node2);
    },
    "data-rttabs": true,
    children: getChildren()
  }), void 0, false, {
    fileName: _jsxFileName$c,
    lineNumber: 370,
    columnNumber: 23
  }, this);
};
UncontrolledTabs.defaultProps = defaultProps$4;
UncontrolledTabs.propTypes = propTypes$4;
var _jsxFileName$b = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/node_modules/react-tabs/esm/components/Tabs.js";
function _extends$2() {
  _extends$2 = Object.assign || function(target) {
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
  return _extends$2.apply(this, arguments);
}
var MODE_CONTROLLED = 0;
var MODE_UNCONTROLLED = 1;
var propTypes$3 = {
  children: childrenPropType,
  direction: propTypes$5.oneOf(["rtl", "ltr"]),
  className: propTypes$5.oneOfType([propTypes$5.string, propTypes$5.array, propTypes$5.object]),
  defaultFocus: propTypes$5.bool,
  defaultIndex: propTypes$5.number,
  disabledTabClassName: propTypes$5.string,
  disableUpDownKeys: propTypes$5.bool,
  domRef: propTypes$5.func,
  focusTabOnClick: propTypes$5.bool,
  forceRenderTabPanel: propTypes$5.bool,
  onSelect: onSelectPropType,
  selectedIndex: selectedIndexPropType,
  selectedTabClassName: propTypes$5.string,
  selectedTabPanelClassName: propTypes$5.string,
  environment: propTypes$5.object
};
var defaultProps$3 = {
  defaultFocus: false,
  focusTabOnClick: true,
  forceRenderTabPanel: false,
  selectedIndex: null,
  defaultIndex: null,
  environment: null,
  disableUpDownKeys: false
};
var getModeFromProps = function getModeFromProps2(props) {
  return props.selectedIndex === null ? MODE_UNCONTROLLED : MODE_CONTROLLED;
};
var checkForIllegalModeChange = function checkForIllegalModeChange2(props, mode) {
  if (mode != void 0 && mode !== getModeFromProps(props)) {
    throw new Error("Switching between controlled mode (by using `selectedIndex`) and uncontrolled mode is not supported in `Tabs`.\nFor more information about controlled and uncontrolled mode of react-tabs see https://github.com/reactjs/react-tabs#controlled-vs-uncontrolled-mode.");
  }
};
var Tabs = function Tabs2(props) {
  var children = props.children, defaultFocus = props.defaultFocus, defaultIndex = props.defaultIndex, focusTabOnClick = props.focusTabOnClick, onSelect = props.onSelect;
  var _useState = react.exports.useState(defaultFocus), focus = _useState[0], setFocus = _useState[1];
  var _useState2 = react.exports.useState(getModeFromProps(props)), mode = _useState2[0];
  var _useState3 = react.exports.useState(mode === MODE_UNCONTROLLED ? defaultIndex || 0 : null), selectedIndex = _useState3[0], setSelectedIndex = _useState3[1];
  react.exports.useEffect(function() {
    setFocus(false);
  }, []);
  if (mode === MODE_UNCONTROLLED) {
    var tabsCount = getTabsCount(children);
    react.exports.useEffect(function() {
      if (selectedIndex != null) {
        var maxTabIndex = Math.max(0, tabsCount - 1);
        setSelectedIndex(Math.min(selectedIndex, maxTabIndex));
      }
    }, [tabsCount]);
  }
  checkForIllegalModeChange(props, mode);
  var handleSelected = function handleSelected2(index, last3, event) {
    if (typeof onSelect === "function") {
      if (onSelect(index, last3, event) === false)
        return;
    }
    if (focusTabOnClick) {
      setFocus(true);
    }
    if (mode === MODE_UNCONTROLLED) {
      setSelectedIndex(index);
    }
  };
  var subProps = _extends$2({}, props);
  subProps.focus = focus;
  subProps.onSelect = handleSelected;
  if (selectedIndex != null) {
    subProps.selectedIndex = selectedIndex;
  }
  delete subProps.defaultFocus;
  delete subProps.defaultIndex;
  delete subProps.focusTabOnClick;
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(UncontrolledTabs, __spreadProps(__spreadValues({}, subProps), {
    children
  }), void 0, false, {
    fileName: _jsxFileName$b,
    lineNumber: 121,
    columnNumber: 23
  }, this);
};
Tabs.propTypes = propTypes$3;
Tabs.defaultProps = defaultProps$3;
Tabs.tabsRole = "Tabs";
var _excluded$8 = ["children", "className"];
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
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
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var defaultProps$2 = {
  className: "react-tabs__tab-list"
};
var propTypes$2 = {
  children: propTypes$5.oneOfType([propTypes$5.object, propTypes$5.array]),
  className: propTypes$5.oneOfType([propTypes$5.string, propTypes$5.array, propTypes$5.object])
};
var TabList = function TabList2(props) {
  var children = props.children, className = props.className, attributes = _objectWithoutPropertiesLoose$2(props, _excluded$8);
  return /* @__PURE__ */ React$1.createElement("ul", _extends$1({}, attributes, {
    className: cx(className),
    role: "tablist"
  }), children);
};
TabList.tabsRole = "TabList";
TabList.propTypes = propTypes$2;
TabList.defaultProps = defaultProps$2;
var _jsxFileName$a = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/node_modules/react-tabs/esm/components/Tab.js";
var _excluded$7 = ["children", "className", "disabled", "disabledClassName", "focus", "id", "panelId", "selected", "selectedClassName", "tabIndex", "tabRef"];
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var DEFAULT_CLASS$1 = "react-tabs__tab";
var DEFAULT_PROPS = {
  className: DEFAULT_CLASS$1,
  disabledClassName: DEFAULT_CLASS$1 + "--disabled",
  focus: false,
  id: null,
  panelId: null,
  selected: false,
  selectedClassName: DEFAULT_CLASS$1 + "--selected"
};
var propTypes$1 = {
  children: propTypes$5.oneOfType([propTypes$5.array, propTypes$5.object, propTypes$5.string]),
  className: propTypes$5.oneOfType([propTypes$5.string, propTypes$5.array, propTypes$5.object]),
  disabled: propTypes$5.bool,
  tabIndex: propTypes$5.string,
  disabledClassName: propTypes$5.string,
  focus: propTypes$5.bool,
  id: propTypes$5.string,
  panelId: propTypes$5.string,
  selected: propTypes$5.bool,
  selectedClassName: propTypes$5.string,
  tabRef: propTypes$5.func
};
var Tab = function Tab2(props) {
  var _cx;
  var nodeRef = react.exports.useRef();
  var children = props.children, className = props.className, disabled = props.disabled, disabledClassName = props.disabledClassName, focus = props.focus, id = props.id, panelId = props.panelId, selected = props.selected, selectedClassName = props.selectedClassName, tabIndex = props.tabIndex, tabRef = props.tabRef, attributes = _objectWithoutPropertiesLoose$1(props, _excluded$7);
  react.exports.useEffect(function() {
    if (selected && focus) {
      nodeRef.current.focus();
    }
  }, [selected, focus]);
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("li", __spreadProps(__spreadValues({}, attributes), {
    className: cx(className, (_cx = {}, _cx[selectedClassName] = selected, _cx[disabledClassName] = disabled, _cx)),
    ref: function ref(node2) {
      nodeRef.current = node2;
      if (tabRef)
        tabRef(node2);
    },
    role: "tab",
    id,
    "aria-selected": selected ? "true" : "false",
    "aria-disabled": disabled ? "true" : "false",
    "aria-controls": panelId,
    tabIndex: tabIndex || (selected ? "0" : null),
    "data-rttab": true,
    children
  }), void 0, false, {
    fileName: _jsxFileName$a,
    lineNumber: 61,
    columnNumber: 23
  }, this);
};
Tab.propTypes = propTypes$1;
Tab.tabsRole = "Tab";
Tab.defaultProps = DEFAULT_PROPS;
var _excluded$6 = ["children", "className", "forceRender", "id", "selected", "selectedClassName", "tabId"];
function _extends() {
  _extends = Object.assign || function(target) {
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
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var DEFAULT_CLASS = "react-tabs__tab-panel";
var defaultProps$1 = {
  className: DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: DEFAULT_CLASS + "--selected"
};
var propTypes = {
  children: propTypes$5.node,
  className: propTypes$5.oneOfType([propTypes$5.string, propTypes$5.array, propTypes$5.object]),
  forceRender: propTypes$5.bool,
  id: propTypes$5.string,
  selected: propTypes$5.bool,
  selectedClassName: propTypes$5.string,
  tabId: propTypes$5.string
};
var TabPanel = function TabPanel2(props) {
  var _cx;
  var children = props.children, className = props.className, forceRender = props.forceRender, id = props.id, selected = props.selected, selectedClassName = props.selectedClassName, tabId = props.tabId, attributes = _objectWithoutPropertiesLoose(props, _excluded$6);
  return /* @__PURE__ */ React$1.createElement("div", _extends({}, attributes, {
    className: cx(className, (_cx = {}, _cx[selectedClassName] = selected, _cx)),
    role: "tabpanel",
    id,
    "aria-labelledby": tabId
  }), forceRender || selected ? children : null);
};
TabPanel.tabsRole = "TabPanel";
TabPanel.propTypes = propTypes;
TabPanel.defaultProps = defaultProps$1;
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from2.length, ar; i < l; i++) {
      if (ar || !(i in from2)) {
        if (!ar)
          ar = Array.prototype.slice.call(from2, 0, i);
        ar[i] = from2[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g;
var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g;
var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
var parse_1 = parse$1;
function parse$1(string) {
  if (!string) {
    throw new TypeError("argument string is required");
  }
  var header = typeof string === "object" ? getcontenttype(string) : string;
  if (typeof header !== "string") {
    throw new TypeError("argument string is required to be a string");
  }
  var index = header.indexOf(";");
  var type = index !== -1 ? header.substr(0, index).trim() : header.trim();
  if (!TYPE_REGEXP.test(type)) {
    throw new TypeError("invalid media type");
  }
  var obj = new ContentType(type.toLowerCase());
  if (index !== -1) {
    var key;
    var match2;
    var value;
    PARAM_REGEXP.lastIndex = index;
    while (match2 = PARAM_REGEXP.exec(header)) {
      if (match2.index !== index) {
        throw new TypeError("invalid parameter format");
      }
      index += match2[0].length;
      key = match2[1].toLowerCase();
      value = match2[2];
      if (value[0] === '"') {
        value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
      }
      obj.parameters[key] = value;
    }
    if (index !== header.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return obj;
}
function getcontenttype(obj) {
  var header;
  if (typeof obj.getHeader === "function") {
    header = obj.getHeader("content-type");
  } else if (typeof obj.headers === "object") {
    header = obj.headers && obj.headers["content-type"];
  }
  if (typeof header !== "string") {
    throw new TypeError("content-type header is missing from object");
  }
  return header;
}
function ContentType(type) {
  this.parameters = /* @__PURE__ */ Object.create(null);
  this.type = type;
}
var cache = /* @__PURE__ */ new Map();
var cloneSvg = function cloneSvg2(sourceSvg) {
  return sourceSvg.cloneNode(true);
};
var isLocal = function isLocal2() {
  return window.location.protocol === "file:";
};
var makeAjaxRequest = function makeAjaxRequest2(url, httpRequestWithCredentials, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    try {
      if (!/\.svg/i.test(url) && httpRequest.readyState === 2) {
        var contentType = httpRequest.getResponseHeader("Content-Type");
        if (!contentType) {
          throw new Error("Content type not found");
        }
        var type = parse_1(contentType).type;
        if (!(type === "image/svg+xml" || type === "text/plain")) {
          throw new Error("Invalid content type: ".concat(type));
        }
      }
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 404 || httpRequest.responseXML === null) {
          throw new Error(isLocal() ? "Note: SVG injection ajax calls do not work locally without adjusting security settings in your browser. Or consider using a local webserver." : "Unable to load SVG file: " + url);
        }
        if (httpRequest.status === 200 || isLocal() && httpRequest.status === 0) {
          callback(null, httpRequest);
        } else {
          throw new Error("There was a problem injecting the SVG: " + httpRequest.status + " " + httpRequest.statusText);
        }
      }
    } catch (error) {
      httpRequest.abort();
      if (error instanceof Error) {
        callback(error, httpRequest);
      } else {
        throw error;
      }
    }
  };
  httpRequest.open("GET", url);
  httpRequest.withCredentials = httpRequestWithCredentials;
  if (httpRequest.overrideMimeType) {
    httpRequest.overrideMimeType("text/xml");
  }
  httpRequest.send();
};
var requestQueue = {};
var queueRequest = function queueRequest2(url, callback) {
  requestQueue[url] = requestQueue[url] || [];
  requestQueue[url].push(callback);
};
var processRequestQueue = function processRequestQueue2(url) {
  var _loop_1 = function _loop_12(i2, len2) {
    setTimeout(function() {
      if (Array.isArray(requestQueue[url])) {
        var cacheValue = cache.get(url);
        var callback = requestQueue[url][i2];
        if (cacheValue instanceof SVGSVGElement) {
          callback(null, cloneSvg(cacheValue));
        }
        if (cacheValue instanceof Error) {
          callback(cacheValue);
        }
        if (i2 === requestQueue[url].length - 1) {
          delete requestQueue[url];
        }
      }
    }, 0);
  };
  for (var i = 0, len = requestQueue[url].length; i < len; i++) {
    _loop_1(i);
  }
};
var loadSvgCached = function loadSvgCached2(url, httpRequestWithCredentials, callback) {
  if (cache.has(url)) {
    var cacheValue = cache.get(url);
    if (cacheValue === void 0) {
      queueRequest(url, callback);
      return;
    }
    if (cacheValue instanceof SVGSVGElement) {
      callback(null, cloneSvg(cacheValue));
      return;
    }
  }
  cache.set(url, void 0);
  queueRequest(url, callback);
  makeAjaxRequest(url, httpRequestWithCredentials, function(error, httpRequest) {
    if (error) {
      cache.set(url, error);
    } else if (httpRequest.responseXML instanceof Document && httpRequest.responseXML.documentElement && httpRequest.responseXML.documentElement instanceof SVGSVGElement) {
      cache.set(url, httpRequest.responseXML.documentElement);
    }
    processRequestQueue(url);
  });
};
var loadSvgUncached = function loadSvgUncached2(url, httpRequestWithCredentials, callback) {
  makeAjaxRequest(url, httpRequestWithCredentials, function(error, httpRequest) {
    if (error) {
      callback(error);
    } else if (httpRequest.responseXML instanceof Document && httpRequest.responseXML.documentElement && httpRequest.responseXML.documentElement instanceof SVGSVGElement) {
      callback(null, httpRequest.responseXML.documentElement);
    }
  });
};
var idCounter = 0;
var uniqueId = function uniqueId2() {
  return ++idCounter;
};
var injectedElements = [];
var ranScripts = {};
var svgNamespace$1 = "http://www.w3.org/2000/svg";
var xlinkNamespace$1 = "http://www.w3.org/1999/xlink";
var injectElement = function injectElement2(el, evalScripts, renumerateIRIElements, cacheRequests, httpRequestWithCredentials, beforeEach, callback) {
  var elUrl = el.getAttribute("data-src") || el.getAttribute("src");
  if (!elUrl) {
    callback(new Error("Invalid data-src or src attribute"));
    return;
  }
  if (injectedElements.indexOf(el) !== -1) {
    injectedElements.splice(injectedElements.indexOf(el), 1);
    el = null;
    return;
  }
  injectedElements.push(el);
  el.setAttribute("src", "");
  var loadSvg = cacheRequests ? loadSvgCached : loadSvgUncached;
  loadSvg(elUrl, httpRequestWithCredentials, function(error, svg) {
    if (!svg) {
      injectedElements.splice(injectedElements.indexOf(el), 1);
      el = null;
      callback(error);
      return;
    }
    var elId = el.getAttribute("id");
    if (elId) {
      svg.setAttribute("id", elId);
    }
    var elTitle = el.getAttribute("title");
    if (elTitle) {
      svg.setAttribute("title", elTitle);
    }
    var elWidth = el.getAttribute("width");
    if (elWidth) {
      svg.setAttribute("width", elWidth);
    }
    var elHeight = el.getAttribute("height");
    if (elHeight) {
      svg.setAttribute("height", elHeight);
    }
    var mergedClasses = Array.from(new Set(__spreadArray(__spreadArray(__spreadArray([], (svg.getAttribute("class") || "").split(" "), true), ["injected-svg"], false), (el.getAttribute("class") || "").split(" "), true))).join(" ").trim();
    svg.setAttribute("class", mergedClasses);
    var elStyle = el.getAttribute("style");
    if (elStyle) {
      svg.setAttribute("style", elStyle);
    }
    svg.setAttribute("data-src", elUrl);
    var elData = [].filter.call(el.attributes, function(at) {
      return /^data-\w[\w-]*$/.test(at.name);
    });
    Array.prototype.forEach.call(elData, function(dataAttr) {
      if (dataAttr.name && dataAttr.value) {
        svg.setAttribute(dataAttr.name, dataAttr.value);
      }
    });
    if (renumerateIRIElements) {
      var iriElementsAndProperties_1 = {
        clipPath: ["clip-path"],
        "color-profile": ["color-profile"],
        cursor: ["cursor"],
        filter: ["filter"],
        linearGradient: ["fill", "stroke"],
        marker: ["marker", "marker-start", "marker-mid", "marker-end"],
        mask: ["mask"],
        path: [],
        pattern: ["fill", "stroke"],
        radialGradient: ["fill", "stroke"]
      };
      var element_1;
      var elements_1;
      var properties_1;
      var currentId_1;
      var newId_1;
      Object.keys(iriElementsAndProperties_1).forEach(function(key) {
        element_1 = key;
        properties_1 = iriElementsAndProperties_1[key];
        elements_1 = svg.querySelectorAll(element_1 + "[id]");
        var _loop_1 = function _loop_12(a2, elementsLen2) {
          currentId_1 = elements_1[a2].id;
          newId_1 = currentId_1 + "-" + uniqueId();
          var referencingElements;
          Array.prototype.forEach.call(properties_1, function(property) {
            referencingElements = svg.querySelectorAll("[" + property + '*="' + currentId_1 + '"]');
            for (var b2 = 0, referencingElementLen = referencingElements.length; b2 < referencingElementLen; b2++) {
              var attrValue = referencingElements[b2].getAttribute(property);
              if (attrValue && !attrValue.match(new RegExp('url\\("?#' + currentId_1 + '"?\\)'))) {
                continue;
              }
              referencingElements[b2].setAttribute(property, "url(#" + newId_1 + ")");
            }
          });
          var allLinks = svg.querySelectorAll("[*|href]");
          var links = [];
          for (var c = 0, allLinksLen = allLinks.length; c < allLinksLen; c++) {
            var href = allLinks[c].getAttributeNS(xlinkNamespace$1, "href");
            if (href && href.toString() === "#" + elements_1[a2].id) {
              links.push(allLinks[c]);
            }
          }
          for (var d = 0, linksLen = links.length; d < linksLen; d++) {
            links[d].setAttributeNS(xlinkNamespace$1, "href", "#" + newId_1);
          }
          elements_1[a2].id = newId_1;
        };
        for (var a = 0, elementsLen = elements_1.length; a < elementsLen; a++) {
          _loop_1(a);
        }
      });
    }
    svg.removeAttribute("xmlns:a");
    var scripts = svg.querySelectorAll("script");
    var scriptsToEval = [];
    var script;
    var scriptType;
    for (var i = 0, scriptsLen = scripts.length; i < scriptsLen; i++) {
      scriptType = scripts[i].getAttribute("type");
      if (!scriptType || scriptType === "application/ecmascript" || scriptType === "application/javascript" || scriptType === "text/javascript") {
        script = scripts[i].innerText || scripts[i].textContent;
        if (script) {
          scriptsToEval.push(script);
        }
        svg.removeChild(scripts[i]);
      }
    }
    if (scriptsToEval.length > 0 && (evalScripts === "always" || evalScripts === "once" && !ranScripts[elUrl])) {
      for (var l = 0, scriptsToEvalLen = scriptsToEval.length; l < scriptsToEvalLen; l++) {
        new Function(scriptsToEval[l])(window);
      }
      ranScripts[elUrl] = true;
    }
    var styleTags = svg.querySelectorAll("style");
    Array.prototype.forEach.call(styleTags, function(styleTag) {
      styleTag.textContent += "";
    });
    svg.setAttribute("xmlns", svgNamespace$1);
    svg.setAttribute("xmlns:xlink", xlinkNamespace$1);
    beforeEach(svg);
    if (!el.parentNode) {
      injectedElements.splice(injectedElements.indexOf(el), 1);
      el = null;
      callback(new Error("Parent node is null"));
      return;
    }
    el.parentNode.replaceChild(svg, el);
    injectedElements.splice(injectedElements.indexOf(el), 1);
    el = null;
    callback(null, svg);
  });
};
var SVGInjector = function SVGInjector2(elements, _a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.afterAll, afterAll = _c === void 0 ? function() {
    return void 0;
  } : _c, _d = _b.afterEach, afterEach = _d === void 0 ? function() {
    return void 0;
  } : _d, _e2 = _b.beforeEach, beforeEach = _e2 === void 0 ? function() {
    return void 0;
  } : _e2, _f = _b.cacheRequests, cacheRequests = _f === void 0 ? true : _f, _g = _b.evalScripts, evalScripts = _g === void 0 ? "never" : _g, _h = _b.httpRequestWithCredentials, httpRequestWithCredentials = _h === void 0 ? false : _h, _j = _b.renumerateIRIElements, renumerateIRIElements = _j === void 0 ? true : _j;
  if (elements && "length" in elements) {
    var elementsLoaded_1 = 0;
    for (var i = 0, j = elements.length; i < j; i++) {
      injectElement(elements[i], evalScripts, renumerateIRIElements, cacheRequests, httpRequestWithCredentials, beforeEach, function(error, svg) {
        afterEach(error, svg);
        if (elements && "length" in elements && elements.length === ++elementsLoaded_1) {
          afterAll(elementsLoaded_1);
        }
      });
    }
  } else if (elements) {
    injectElement(elements, evalScripts, renumerateIRIElements, cacheRequests, httpRequestWithCredentials, beforeEach, function(error, svg) {
      afterEach(error, svg);
      afterAll(1);
      elements = null;
    });
  } else {
    afterAll(0);
  }
};
var shallowDiffers = function shallowDiffers2(a, b2) {
  for (var i in a) {
    if (!(i in b2)) {
      return true;
    }
  }
  for (var _i in b2) {
    if (a[_i] !== b2[_i]) {
      return true;
    }
  }
  return false;
};
var _excluded$5 = ["afterInjection", "beforeInjection", "evalScripts", "fallback", "httpRequestWithCredentials", "loading", "renumerateIRIElements", "src", "useRequestCache", "wrapper"];
var svgNamespace = "http://www.w3.org/2000/svg";
var xlinkNamespace = "http://www.w3.org/1999/xlink";
var ReactSVG = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(ReactSVG2, _React$Component);
  function ReactSVG2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.initialState = {
      hasError: false,
      isLoading: true
    };
    _this.state = _this.initialState;
    _this._isMounted = false;
    _this.reactWrapper = void 0;
    _this.nonReactWrapper = void 0;
    _this.refCallback = function(reactWrapper) {
      _this.reactWrapper = reactWrapper;
    };
    return _this;
  }
  var _proto = ReactSVG2.prototype;
  _proto.renderSVG = function renderSVG() {
    var _this2 = this;
    if (this.reactWrapper instanceof Node) {
      var _this$props = this.props, beforeInjection2 = _this$props.beforeInjection, evalScripts = _this$props.evalScripts, httpRequestWithCredentials = _this$props.httpRequestWithCredentials, renumerateIRIElements = _this$props.renumerateIRIElements, src = _this$props.src, useRequestCache = _this$props.useRequestCache;
      var afterInjection2 = this.props.afterInjection;
      var wrapper = this.props.wrapper;
      var nonReactWrapper;
      var nonReactTarget;
      if (wrapper === "svg") {
        nonReactWrapper = document.createElementNS(svgNamespace, wrapper);
        nonReactWrapper.setAttribute("xmlns", svgNamespace);
        nonReactWrapper.setAttribute("xmlns:xlink", xlinkNamespace);
        nonReactTarget = document.createElementNS(svgNamespace, wrapper);
      } else {
        nonReactWrapper = document.createElement(wrapper);
        nonReactTarget = document.createElement(wrapper);
      }
      nonReactWrapper.appendChild(nonReactTarget);
      nonReactTarget.dataset.src = src;
      this.nonReactWrapper = this.reactWrapper.appendChild(nonReactWrapper);
      var afterEach = function afterEach2(error, svg) {
        if (error) {
          _this2.removeSVG();
          if (!_this2._isMounted) {
            afterInjection2(error);
            return;
          }
        }
        if (_this2._isMounted) {
          _this2.setState(function() {
            return {
              hasError: !!error,
              isLoading: false
            };
          }, function() {
            afterInjection2(error, svg);
          });
        }
      };
      SVGInjector(nonReactTarget, {
        afterEach,
        beforeEach: beforeInjection2,
        cacheRequests: useRequestCache,
        evalScripts,
        httpRequestWithCredentials,
        renumerateIRIElements
      });
    }
  };
  _proto.removeSVG = function removeSVG() {
    var _this$nonReactWrapper;
    if ((_this$nonReactWrapper = this.nonReactWrapper) != null && _this$nonReactWrapper.parentNode) {
      this.nonReactWrapper.parentNode.removeChild(this.nonReactWrapper);
      this.nonReactWrapper = null;
    }
  };
  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    this.renderSVG();
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this3 = this;
    if (shallowDiffers(prevProps, this.props)) {
      this.setState(function() {
        return _this3.initialState;
      }, function() {
        _this3.removeSVG();
        _this3.renderSVG();
      });
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this._isMounted = false;
    this.removeSVG();
  };
  _proto.render = function render() {
    var _this$props2 = this.props;
    _this$props2.afterInjection;
    _this$props2.beforeInjection;
    _this$props2.evalScripts;
    var Fallback = _this$props2.fallback;
    _this$props2.httpRequestWithCredentials;
    var Loading = _this$props2.loading;
    _this$props2.renumerateIRIElements;
    _this$props2.src;
    _this$props2.useRequestCache;
    var wrapper = _this$props2.wrapper, rest = _objectWithoutPropertiesLoose$4(_this$props2, _excluded$5);
    var Wrapper = wrapper;
    return /* @__PURE__ */ react.exports.createElement(Wrapper, _extends$4({}, rest, {
      ref: this.refCallback
    }, wrapper === "svg" ? {
      xmlns: svgNamespace,
      xmlnsXlink: xlinkNamespace
    } : {}), this.state.isLoading && Loading && /* @__PURE__ */ react.exports.createElement(Loading, null), this.state.hasError && Fallback && /* @__PURE__ */ react.exports.createElement(Fallback, null));
  };
  return ReactSVG2;
}(react.exports.Component);
ReactSVG.defaultProps = {
  afterInjection: function afterInjection() {
    return void 0;
  },
  beforeInjection: function beforeInjection() {
    return void 0;
  },
  evalScripts: "never",
  fallback: null,
  httpRequestWithCredentials: false,
  loading: null,
  renumerateIRIElements: true,
  useRequestCache: true,
  wrapper: "div"
};
ReactSVG.propTypes = {
  afterInjection: propTypes$6.exports.func,
  beforeInjection: propTypes$6.exports.func,
  evalScripts: propTypes$6.exports.oneOf(["always", "once", "never"]),
  fallback: propTypes$6.exports.oneOfType([propTypes$6.exports.func, propTypes$6.exports.object, propTypes$6.exports.string]),
  httpRequestWithCredentials: propTypes$6.exports.bool,
  loading: propTypes$6.exports.oneOfType([propTypes$6.exports.func, propTypes$6.exports.object, propTypes$6.exports.string]),
  renumerateIRIElements: propTypes$6.exports.bool,
  src: propTypes$6.exports.string.isRequired,
  useRequestCache: propTypes$6.exports.bool,
  wrapper: propTypes$6.exports.oneOf(["div", "span", "svg"])
};
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options2) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options2.key);
  if (options2.nonce !== void 0) {
    tag.setAttribute("nonce", options2.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options2) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options2.speedy === void 0 ? false : options2.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options2.nonce;
    this.key = options2.key;
    this.container = options2.container;
    this.prepend = options2.prepend;
    this.insertionPoint = options2.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    {
      var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
      if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
        console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
    }
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error('There was a problem inserting the following rule: "' + rule + '"', e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
    {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };
  return StyleSheet2;
}();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3);
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count2) {
  while (--count2 && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count2 < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && characters2.charCodeAt(length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k2 = 0; i < index; ++i)
    for (var x2 = 0, y = substr(value, post + 1, post = abs(j = points[i])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j > 0 ? rule[x2] + " " + y : replace(y, /&\f/g, rule[x2])))
        props[k2++] = z2;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function prefix(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
                case "::placeholder":
                  return serialize([
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
                  ], callback);
              }
              return "";
            });
      }
  }
}
var last = function last2(arr) {
  return arr.length ? arr[arr.length - 1] : null;
};
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || element.length < 1) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k2 = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k2++) {
      element.props[k2] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
      element["return"] = "";
      element.value = "";
    }
  }
};
var ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var isIgnoringComment = function isIgnoringComment2(element) {
  return !!element && element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
};
var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache2) {
  return function(element, index, children) {
    if (element.type !== "rule")
      return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
    if (unsafePseudoClasses && cache2.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;
      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }
      unsafePseudoClasses.forEach(function(unsafePseudoClass) {
        console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
      });
    }
  };
};
var isImportRule = function isImportRule2(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};
var isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }
  return false;
};
var nullifyElement = function nullifyElement2(element) {
  element.type = "";
  element.value = "";
  element["return"] = "";
  element.children = "";
  element.props = "";
};
var incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }
  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options2) {
  var key = options2.key;
  if (!key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options2.stylisPlugins || defaultStylisPlugins;
  {
    if (/[^a-z-]/.test(key)) {
      throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
    }
  }
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options2.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node2) {
      var attrib = node2.getAttribute("data-emotion").split(" ");
      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }
      nodesToHydrate.push(node2);
    });
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache2.compat;
      }
    }), incorrectImportAlarm);
  }
  {
    var currentSheet;
    var finalizingPlugins = [stringify, function(element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== COMMENT) {
          currentSheet.insert(element.value + "{}");
        }
      }
    }];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      if (serialized.map !== void 0) {
        currentSheet = {
          insert: function insert2(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache2.inserted[serialized.name] = true;
      }
    };
  }
  var cache2 = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options2.nonce,
      speedy: options2.speedy,
      prepend: options2.prepend,
      insertionPoint: options2.insertionPoint
    }),
    nonce: options2.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache2.sheet.hydrate(nodesToHydrate);
  return cache2;
};
var isBrowser$1 = true;
function getRegisteredStyles(registered, registeredStyles, classNames2) {
  var rawClassName = "";
  classNames2.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache2, serialized, isStringTag) {
  var className = cache2.key + "-" + serialized.name;
  if ((isStringTag === false || isBrowser$1 === false) && cache2.registered[className] === void 0) {
    cache2.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
  registerStyles(cache2, serialized, isStringTag);
  var className = cache2.key + "-" + serialized.name;
  if (cache2.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
function murmur2(str) {
  var h = 0;
  var k2, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k2 = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
    k2 ^= k2 >>> 24;
    h = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
{
  var contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ["normal", "none", "initial", "inherit", "unset"];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};
  processStyleValue = function processStyleValue3(key, value) {
    if (key === "content") {
      if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }
    var processed = oldProcessStyleValue(key, value);
    if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }
    return processed;
  };
}
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (interpolation.toString() === "NO_COMPONENT_SELECTOR") {
      throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = interpolation.styles + ";";
        if (interpolation.map !== void 0) {
          styles += interpolation.map;
        }
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match2, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && true) {
          throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (_key === "undefined") {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;
{
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
}
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (strings[0] === void 0) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }
    styles += strings[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      if (strings[i] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles += strings[i];
    }
  }
  var sourceMap;
  {
    styles = styles.replace(sourceMapPattern, function(match3) {
      sourceMap = match3;
      return "";
    });
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  {
    return {
      name,
      styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
};
var hasOwnProperty = {}.hasOwnProperty;
var EmotionCacheContext = /* @__PURE__ */ react.exports.createContext(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
  key: "css"
}) : null);
{
  EmotionCacheContext.displayName = "EmotionCacheContext";
}
EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ react.exports.forwardRef(function(props, ref) {
    var cache2 = react.exports.useContext(EmotionCacheContext);
    return func(props, cache2, ref);
  });
};
var ThemeContext = /* @__PURE__ */ react.exports.createContext({});
{
  ThemeContext.displayName = "EmotionThemeContext";
}
var getLastPart = function getLastPart2(functionName) {
  var parts = functionName.split(".");
  return parts[parts.length - 1];
};
var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine2(line2) {
  var match2 = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line2);
  if (match2)
    return getLastPart(match2[1]);
  match2 = /^([A-Za-z0-9$.]+)@/.exec(line2);
  if (match2)
    return getLastPart(match2[1]);
  return void 0;
};
var internalReactFunctionNames = /* @__PURE__ */ new Set(["renderWithHooks", "processChild", "finishClassComponent", "renderToString"]);
var sanitizeIdentifier = function sanitizeIdentifier2(identifier2) {
  return identifier2.replace(/\$/g, "-");
};
var getLabelFromStackTrace = function getLabelFromStackTrace2(stackTrace) {
  if (!stackTrace)
    return void 0;
  var lines = stackTrace.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]);
    if (!functionName)
      continue;
    if (internalReactFunctionNames.has(functionName))
      break;
    if (/^[A-Z]/.test(functionName))
      return sanitizeIdentifier(functionName);
  }
  return void 0;
};
var useInsertionEffect$1 = React$2["useInsertionEffect"] ? React$2["useInsertionEffect"] : function useInsertionEffect(create) {
  create();
};
function useInsertionEffectMaybe(create) {
  useInsertionEffect$1(create);
}
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps2(type, props) {
  if (typeof props.css === "string" && props.css.indexOf(":") !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }
  newProps[typePropName] = type;
  if (!!props.css && (typeof props.css !== "object" || typeof props.css.name !== "string" || props.css.name.indexOf("-") === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label)
      newProps[labelPropName] = label;
  }
  return newProps;
};
var Insertion$1 = function Insertion(_ref3) {
  var cache2 = _ref3.cache, serialized = _ref3.serialized, isStringTag = _ref3.isStringTag;
  registerStyles(cache2, serialized, isStringTag);
  useInsertionEffectMaybe(function() {
    return insertStyles(cache2, serialized, isStringTag);
  });
  return null;
};
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache2, ref) {
  var cssProp = props.css;
  if (typeof cssProp === "string" && cache2.registered[cssProp] !== void 0) {
    cssProp = cache2.registered[cssProp];
  }
  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";
  if (typeof props.className === "string") {
    className = getRegisteredStyles(cache2.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = serializeStyles(registeredStyles, void 0, react.exports.useContext(ThemeContext));
  if (serialized.name.indexOf("-") === -1) {
    var labelFromStack = props[labelPropName];
    if (labelFromStack) {
      serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
    }
  }
  className += cache2.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && key !== labelPropName) {
      newProps[key] = props[key];
    }
  }
  newProps.ref = ref;
  newProps.className = className;
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Insertion$1, {
    cache: cache2,
    serialized,
    isStringTag: typeof WrappedComponent === "string"
  }), /* @__PURE__ */ react.exports.createElement(WrappedComponent, newProps));
});
{
  Emotion.displayName = "EmotionCssPropInternal";
}
var pkg = {
  name: "@emotion/react",
  version: "11.9.0",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.cjs.js": "./dist/emotion-react.browser.cjs.js",
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  types: "types/index.d.ts",
  files: [
    "src",
    "dist",
    "jsx-runtime",
    "jsx-dev-runtime",
    "_isolated-hnrs",
    "types/*.d.ts",
    "macro.js",
    "macro.d.ts",
    "macro.js.flow"
  ],
  sideEffects: false,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.13.10",
    "@emotion/babel-plugin": "^11.7.1",
    "@emotion/cache": "^11.7.1",
    "@emotion/serialize": "^1.0.3",
    "@emotion/utils": "^1.1.0",
    "@emotion/weak-memoize": "^0.2.5",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    "@babel/core": "^7.0.0",
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@babel/core": {
      optional: true
    },
    "@types/react": {
      optional: true
    }
  },
  devDependencies: {
    "@babel/core": "^7.13.10",
    "@emotion/css": "11.9.0",
    "@emotion/css-prettifier": "1.0.1",
    "@emotion/server": "11.4.0",
    "@emotion/styled": "11.8.1",
    "@types/react": "^16.9.11",
    dtslint: "^4.2.1",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1",
    typescript: "^4.5.5"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: [
      "./index.js",
      "./jsx-runtime.js",
      "./jsx-dev-runtime.js",
      "./_isolated-hnrs.js"
    ],
    umdName: "emotionReact"
  }
};
var jsx = function jsx2(type, props) {
  var args = arguments;
  if (props == null || !hasOwnProperty.call(props, "css")) {
    return react.exports.createElement.apply(void 0, args);
  }
  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  createElementArgArray[1] = createEmotionProps(type, props);
  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }
  return react.exports.createElement.apply(null, createElementArgArray);
};
var useInsertionEffect2 = React$2["useInsertionEffect"] ? React$2["useInsertionEffect"] : react.exports.useLayoutEffect;
var warnedAboutCssPropForGlobal = false;
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache2) {
  if (!warnedAboutCssPropForGlobal && (props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }
  var styles = props.styles;
  var serialized = serializeStyles([styles], void 0, react.exports.useContext(ThemeContext));
  var sheetRef = react.exports.useRef();
  useInsertionEffect2(function() {
    var key = cache2.key + "-global";
    var sheet = new cache2.sheet.constructor({
      key,
      nonce: cache2.sheet.nonce,
      container: cache2.sheet.container,
      speedy: cache2.sheet.isSpeedy
    });
    var rehydrating = false;
    var node2 = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
    if (cache2.sheet.tags.length) {
      sheet.before = cache2.sheet.tags[0];
    }
    if (node2 !== null) {
      rehydrating = true;
      node2.setAttribute("data-emotion", key);
      sheet.hydrate([node2]);
    }
    sheetRef.current = [sheet, rehydrating];
    return function() {
      sheet.flush();
    };
  }, [cache2]);
  useInsertionEffect2(function() {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }
    if (serialized.next !== void 0) {
      insertStyles(cache2, serialized.next, true);
    }
    if (sheet.tags.length) {
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }
    cache2.insert("", serialized, sheet, false);
  }, [cache2, serialized.name]);
  return null;
});
{
  Global.displayName = "EmotionGlobal";
}
function css$2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var keyframes = function keyframes2() {
  var insertable = css$2.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};
var classnames = function classnames2(args) {
  var len = args.length;
  var i = 0;
  var cls = "";
  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null)
      continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames2(arg);
        } else {
          if (arg.styles !== void 0 && arg.name !== void 0) {
            console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.");
          }
          toAdd = "";
          for (var k2 in arg) {
            if (arg[k2] && k2) {
              toAdd && (toAdd += " ");
              toAdd += k2;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};
function merge(registered, css4, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css4(registeredStyles);
}
var Insertion2 = function Insertion3(_ref3) {
  var cache2 = _ref3.cache, serializedArr = _ref3.serializedArr;
  useInsertionEffectMaybe(function() {
    for (var i = 0; i < serializedArr.length; i++) {
      insertStyles(cache2, serializedArr[i], false);
    }
  });
  return null;
};
var ClassNames = /* @__PURE__ */ withEmotionCache(function(props, cache2) {
  var hasRendered = false;
  var serializedArr = [];
  var css4 = function css5() {
    if (hasRendered && true) {
      throw new Error("css can only be used during render");
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache2.registered);
    serializedArr.push(serialized);
    registerStyles(cache2, serialized, false);
    return cache2.key + "-" + serialized.name;
  };
  var cx2 = function cx3() {
    if (hasRendered && true) {
      throw new Error("cx can only be used during render");
    }
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return merge(cache2.registered, css4, classnames(args));
  };
  var content = {
    css: css4,
    cx: cx2,
    theme: react.exports.useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Insertion2, {
    cache: cache2,
    serializedArr
  }), ele);
});
{
  ClassNames.displayName = "EmotionClassNames";
}
{
  var isBrowser = true;
  var isJest = typeof jest !== "undefined";
  if (isBrowser && !isJest) {
    var globalContext = typeof globalThis !== "undefined" ? globalThis : isBrowser ? window : global;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
    if (globalContext[globalKey]) {
      console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
    }
    globalContext[globalKey] = true;
  }
}
function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose$4(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e2;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e2 = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e2;
    }
  }
  return _arr;
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
var _excluded$3 = ["className", "clearValue", "cx", "getStyles", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"];
var noop = function noop2() {
};
function applyPrefixToName(prefix2, name) {
  if (!name) {
    return prefix2;
  } else if (name[0] === "-") {
    return prefix2 + name;
  } else {
    return prefix2 + "__" + name;
  }
}
function classNames(prefix2, state, className) {
  var arr = [className];
  if (state && prefix2) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push("".concat(applyPrefixToName(prefix2, key)));
      }
    }
  }
  return arr.filter(function(i) {
    return i;
  }).map(function(i) {
    return String(i).trim();
  }).join(" ");
}
var cleanValue = function cleanValue2(value) {
  if (isArray(value))
    return value.filter(Boolean);
  if (_typeof(value) === "object" && value !== null)
    return [value];
  return [];
};
var cleanCommonProps = function cleanCommonProps2(props) {
  props.className;
  props.clearValue;
  props.cx;
  props.getStyles;
  props.getValue;
  props.hasValue;
  props.isMulti;
  props.isRtl;
  props.options;
  props.selectOption;
  props.selectProps;
  props.setValue;
  props.theme;
  var innerProps = _objectWithoutProperties(props, _excluded$3);
  return _objectSpread2({}, innerProps);
};
function isDocumentElement(el) {
  return [document.documentElement, document.body, window].indexOf(el) > -1;
}
function normalizedHeight(el) {
  if (isDocumentElement(el)) {
    return window.innerHeight;
  }
  return el.clientHeight;
}
function getScrollTop(el) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }
  return el.scrollTop;
}
function scrollTo(el, top) {
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }
  el.scrollTop = top;
}
function getScrollParent(element) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === "absolute";
  var overflowRx = /(auto|scroll)/;
  if (style.position === "fixed")
    return document.documentElement;
  for (var parent = element; parent = parent.parentElement; ) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === "static") {
      continue;
    }
    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }
  return document.documentElement;
}
function easeOutCubic(t, b2, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b2;
}
function animatedScrollTo(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 200;
  var callback = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : noop;
  var start = getScrollTop(element);
  var change = to - start;
  var increment = 10;
  var currentTime = 0;
  function animateScroll() {
    currentTime += increment;
    var val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback(element);
    }
  }
  animateScroll();
}
function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;
  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
}
function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}
function isTouchCapable() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
}
var passiveOptionAccessed = false;
var options = {
  get passive() {
    return passiveOptionAccessed = true;
  }
};
var w = typeof window !== "undefined" ? window : {};
if (w.addEventListener && w.removeEventListener) {
  w.addEventListener("p", noop, options);
  w.removeEventListener("p", noop, false);
}
var supportsPassiveEvents = passiveOptionAccessed;
function notNullish(item) {
  return item != null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
function valueTernary(isMulti, multiValue, singleValue) {
  return isMulti ? multiValue : singleValue;
}
function singleValueAsValue(singleValue) {
  return singleValue;
}
function multiValueAsValue(multiValue) {
  return multiValue;
}
var removeProps = function removeProps2(propsObj) {
  for (var _len = arguments.length, properties = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    properties[_key - 1] = arguments[_key];
  }
  var propsMap = Object.entries(propsObj).filter(function(_ref3) {
    var _ref22 = _slicedToArray(_ref3, 1), key = _ref22[0];
    return !properties.includes(key);
  });
  return propsMap.reduce(function(newProps, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], val = _ref4[1];
    newProps[key] = val;
    return newProps;
  }, {});
};
function getMenuPlacement(_ref3) {
  var maxHeight = _ref3.maxHeight, menuEl = _ref3.menuEl, minHeight = _ref3.minHeight, placement = _ref3.placement, shouldScroll = _ref3.shouldScroll, isFixedPosition = _ref3.isFixedPosition, theme = _ref3.theme;
  var spacing2 = theme.spacing;
  var scrollParent = getScrollParent(menuEl);
  var defaultState = {
    placement: "bottom",
    maxHeight
  };
  if (!menuEl || !menuEl.offsetParent)
    return defaultState;
  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(), scrollHeight = _scrollParent$getBoun.height;
  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(), menuBottom = _menuEl$getBoundingCl.bottom, menuHeight = _menuEl$getBoundingCl.height, menuTop = _menuEl$getBoundingCl.top;
  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(), containerTop = _menuEl$offsetParent$.top;
  var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
  var scrollTop = getScrollTop(scrollParent);
  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  var viewSpaceAbove = containerTop - marginTop;
  var viewSpaceBelow = viewHeight - menuTop;
  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  var scrollUp = scrollTop + menuTop - marginTop;
  var scrollDuration = 160;
  switch (placement) {
    case "auto":
    case "bottom":
      if (viewSpaceBelow >= menuHeight) {
        return {
          placement: "bottom",
          maxHeight
        };
      }
      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }
        return {
          placement: "bottom",
          maxHeight
        };
      }
      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }
        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
        return {
          placement: "bottom",
          maxHeight: constrainedHeight
        };
      }
      if (placement === "auto" || isFixedPosition) {
        var _constrainedHeight = maxHeight;
        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
        if (spaceAbove >= minHeight) {
          _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing2.controlHeight, maxHeight);
        }
        return {
          placement: "top",
          maxHeight: _constrainedHeight
        };
      }
      if (placement === "bottom") {
        if (shouldScroll) {
          scrollTo(scrollParent, scrollDown);
        }
        return {
          placement: "bottom",
          maxHeight
        };
      }
      break;
    case "top":
      if (viewSpaceAbove >= menuHeight) {
        return {
          placement: "top",
          maxHeight
        };
      }
      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }
        return {
          placement: "top",
          maxHeight
        };
      }
      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
        var _constrainedHeight2 = maxHeight;
        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
        }
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }
        return {
          placement: "top",
          maxHeight: _constrainedHeight2
        };
      }
      return {
        placement: "bottom",
        maxHeight
      };
    default:
      throw new Error('Invalid placement provided "'.concat(placement, '".'));
  }
  return defaultState;
}
function alignToControl(placement) {
  var placementToCSSProp = {
    bottom: "top",
    top: "bottom"
  };
  return placement ? placementToCSSProp[placement] : "bottom";
}
var coercePlacement = function coercePlacement2(p) {
  return p === "auto" ? "bottom" : p;
};
var menuCSS = function menuCSS2(_ref22) {
  var _ref3;
  var placement = _ref22.placement, _ref2$theme = _ref22.theme, borderRadius2 = _ref2$theme.borderRadius, spacing2 = _ref2$theme.spacing, colors2 = _ref2$theme.colors;
  return _ref3 = {
    label: "menu"
  }, _defineProperty$1(_ref3, alignToControl(placement), "100%"), _defineProperty$1(_ref3, "backgroundColor", colors2.neutral0), _defineProperty$1(_ref3, "borderRadius", borderRadius2), _defineProperty$1(_ref3, "boxShadow", "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)"), _defineProperty$1(_ref3, "marginBottom", spacing2.menuGutter), _defineProperty$1(_ref3, "marginTop", spacing2.menuGutter), _defineProperty$1(_ref3, "position", "absolute"), _defineProperty$1(_ref3, "width", "100%"), _defineProperty$1(_ref3, "zIndex", 1), _ref3;
};
var PortalPlacementContext = /* @__PURE__ */ react.exports.createContext({
  getPortalPlacement: null
});
var MenuPlacer = /* @__PURE__ */ function(_Component) {
  _inherits(MenuPlacer2, _Component);
  var _super = _createSuper(MenuPlacer2);
  function MenuPlacer2() {
    var _this;
    _classCallCheck(this, MenuPlacer2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      maxHeight: _this.props.maxMenuHeight,
      placement: null
    };
    _this.context = void 0;
    _this.getPlacement = function(ref) {
      var _this$props = _this.props, minMenuHeight = _this$props.minMenuHeight, maxMenuHeight = _this$props.maxMenuHeight, menuPlacement = _this$props.menuPlacement, menuPosition = _this$props.menuPosition, menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView, theme = _this$props.theme;
      if (!ref)
        return;
      var isFixedPosition = menuPosition === "fixed";
      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
      var state = getMenuPlacement({
        maxHeight: maxMenuHeight,
        menuEl: ref,
        minHeight: minMenuHeight,
        placement: menuPlacement,
        shouldScroll,
        isFixedPosition,
        theme
      });
      var getPortalPlacement = _this.context.getPortalPlacement;
      if (getPortalPlacement)
        getPortalPlacement(state);
      _this.setState(state);
    };
    _this.getUpdatedProps = function() {
      var menuPlacement = _this.props.menuPlacement;
      var placement = _this.state.placement || coercePlacement(menuPlacement);
      return _objectSpread2(_objectSpread2({}, _this.props), {}, {
        placement,
        maxHeight: _this.state.maxHeight
      });
    };
    return _this;
  }
  _createClass(MenuPlacer2, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return children({
        ref: this.getPlacement,
        placerProps: this.getUpdatedProps()
      });
    }
  }]);
  return MenuPlacer2;
}(react.exports.Component);
MenuPlacer.contextType = PortalPlacementContext;
var Menu = function Menu2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerRef = props.innerRef, innerProps = props.innerProps;
  return jsx("div", _extends$4({
    css: getStyles("menu", props),
    className: cx2({
      menu: true
    }, className),
    ref: innerRef
  }, innerProps), children);
};
var menuListCSS = function menuListCSS2(_ref4) {
  var maxHeight = _ref4.maxHeight, baseUnit2 = _ref4.theme.spacing.baseUnit;
  return {
    maxHeight,
    overflowY: "auto",
    paddingBottom: baseUnit2,
    paddingTop: baseUnit2,
    position: "relative",
    WebkitOverflowScrolling: "touch"
  };
};
var MenuList = function MenuList2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps, innerRef = props.innerRef, isMulti = props.isMulti;
  return jsx("div", _extends$4({
    css: getStyles("menuList", props),
    className: cx2({
      "menu-list": true,
      "menu-list--is-multi": isMulti
    }, className),
    ref: innerRef
  }, innerProps), children);
};
var noticeCSS = function noticeCSS2(_ref5) {
  var _ref5$theme = _ref5.theme, baseUnit2 = _ref5$theme.spacing.baseUnit, colors2 = _ref5$theme.colors;
  return {
    color: colors2.neutral40,
    padding: "".concat(baseUnit2 * 2, "px ").concat(baseUnit2 * 3, "px"),
    textAlign: "center"
  };
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return jsx("div", _extends$4({
    css: getStyles("noOptionsMessage", props),
    className: cx2({
      "menu-notice": true,
      "menu-notice--no-options": true
    }, className)
  }, innerProps), children);
};
NoOptionsMessage.defaultProps = {
  children: "No options"
};
var LoadingMessage = function LoadingMessage2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return jsx("div", _extends$4({
    css: getStyles("loadingMessage", props),
    className: cx2({
      "menu-notice": true,
      "menu-notice--loading": true
    }, className)
  }, innerProps), children);
};
LoadingMessage.defaultProps = {
  children: "Loading..."
};
var menuPortalCSS = function menuPortalCSS2(_ref6) {
  var rect = _ref6.rect, offset = _ref6.offset, position2 = _ref6.position;
  return {
    left: rect.left,
    position: position2,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
};
var MenuPortal = /* @__PURE__ */ function(_Component2) {
  _inherits(MenuPortal2, _Component2);
  var _super2 = _createSuper(MenuPortal2);
  function MenuPortal2() {
    var _this2;
    _classCallCheck(this, MenuPortal2);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _this2.state = {
      placement: null
    };
    _this2.getPortalPlacement = function(_ref7) {
      var placement = _ref7.placement;
      var initialPlacement = coercePlacement(_this2.props.menuPlacement);
      if (placement !== initialPlacement) {
        _this2.setState({
          placement
        });
      }
    };
    return _this2;
  }
  _createClass(MenuPortal2, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props, appendTo = _this$props2.appendTo, children = _this$props2.children, className = _this$props2.className, controlElement = _this$props2.controlElement, cx2 = _this$props2.cx, innerProps = _this$props2.innerProps, menuPlacement = _this$props2.menuPlacement, position2 = _this$props2.menuPosition, getStyles = _this$props2.getStyles;
      var isFixed = position2 === "fixed";
      if (!appendTo && !isFixed || !controlElement) {
        return null;
      }
      var placement = this.state.placement || coercePlacement(menuPlacement);
      var rect = getBoundingClientObj(controlElement);
      var scrollDistance = isFixed ? 0 : window.pageYOffset;
      var offset = rect[placement] + scrollDistance;
      var state = {
        offset,
        position: position2,
        rect
      };
      var menuWrapper = jsx("div", _extends$4({
        css: getStyles("menuPortal", state),
        className: cx2({
          "menu-portal": true
        }, className)
      }, innerProps), children);
      return jsx(PortalPlacementContext.Provider, {
        value: {
          getPortalPlacement: this.getPortalPlacement
        }
      }, appendTo ? /* @__PURE__ */ reactDom.exports.createPortal(menuWrapper, appendTo) : menuWrapper);
    }
  }]);
  return MenuPortal2;
}(react.exports.Component);
var containerCSS = function containerCSS2(_ref3) {
  var isDisabled = _ref3.isDisabled, isRtl = _ref3.isRtl;
  return {
    label: "container",
    direction: isRtl ? "rtl" : void 0,
    pointerEvents: isDisabled ? "none" : void 0,
    position: "relative"
  };
};
var SelectContainer = function SelectContainer2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps, isDisabled = props.isDisabled, isRtl = props.isRtl;
  return jsx("div", _extends$4({
    css: getStyles("container", props),
    className: cx2({
      "--is-disabled": isDisabled,
      "--is-rtl": isRtl
    }, className)
  }, innerProps), children);
};
var valueContainerCSS = function valueContainerCSS2(_ref22) {
  var spacing2 = _ref22.theme.spacing, isMulti = _ref22.isMulti, hasValue = _ref22.hasValue, controlShouldRenderValue = _ref22.selectProps.controlShouldRenderValue;
  return {
    alignItems: "center",
    display: isMulti && hasValue && controlShouldRenderValue ? "flex" : "grid",
    flex: 1,
    flexWrap: "wrap",
    padding: "".concat(spacing2.baseUnit / 2, "px ").concat(spacing2.baseUnit * 2, "px"),
    WebkitOverflowScrolling: "touch",
    position: "relative",
    overflow: "hidden"
  };
};
var ValueContainer = function ValueContainer2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, innerProps = props.innerProps, isMulti = props.isMulti, getStyles = props.getStyles, hasValue = props.hasValue;
  return jsx("div", _extends$4({
    css: getStyles("valueContainer", props),
    className: cx2({
      "value-container": true,
      "value-container--is-multi": isMulti,
      "value-container--has-value": hasValue
    }, className)
  }, innerProps), children);
};
var indicatorsContainerCSS = function indicatorsContainerCSS2() {
  return {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, innerProps = props.innerProps, getStyles = props.getStyles;
  return jsx("div", _extends$4({
    css: getStyles("indicatorsContainer", props),
    className: cx2({
      indicators: true
    }, className)
  }, innerProps), children);
};
var _templateObject;
var _excluded$2 = ["size"];
function _EMOTION_STRINGIFIED_CSS_ERROR__$2() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref2$1 = {
  name: "tj5bde-Svg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0ZvY3VzZWQsXG4gIHRoZW1lOiB7XG4gICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIGNvbG9ycyxcbiAgfSxcbn06XG4gIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuXG4gICc6aG92ZXInOiB7XG4gICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBkcm9wZG93bkluZGljYXRvckNTUyA9IGJhc2VDU1M7XG5leHBvcnQgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBEcm9wZG93bkluZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+XG4pID0+IHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e2dldFN0eWxlcygnZHJvcGRvd25JbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdjbGVhckluZGljYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgZm9udFNpemU6IHNpemUsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG1hcmdpblJpZ2h0OiBzaXplLFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcywgaXNSdGwgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2xvYWRpbmdJbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5Mb2FkaW5nSW5kaWNhdG9yLmRlZmF1bHRQcm9wcyA9IHsgc2l6ZTogNCB9O1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
};
var Svg = function Svg2(_ref3) {
  var size = _ref3.size, props = _objectWithoutProperties(_ref3, _excluded$2);
  return jsx("svg", _extends$4({
    height: size,
    width: size,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: _ref2$1
  }, props));
};
var CrossIcon = function CrossIcon2(props) {
  return jsx(Svg, _extends$4({
    size: 20
  }, props), jsx("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
};
var DownChevron = function DownChevron2(props) {
  return jsx(Svg, _extends$4({
    size: 20
  }, props), jsx("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
};
var baseCSS = function baseCSS2(_ref3) {
  var isFocused = _ref3.isFocused, _ref3$theme = _ref3.theme, baseUnit2 = _ref3$theme.spacing.baseUnit, colors2 = _ref3$theme.colors;
  return {
    label: "indicatorContainer",
    color: isFocused ? colors2.neutral60 : colors2.neutral20,
    display: "flex",
    padding: baseUnit2 * 2,
    transition: "color 150ms",
    ":hover": {
      color: isFocused ? colors2.neutral80 : colors2.neutral40
    }
  };
};
var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return jsx("div", _extends$4({
    css: getStyles("dropdownIndicator", props),
    className: cx2({
      indicator: true,
      "dropdown-indicator": true
    }, className)
  }, innerProps), children || jsx(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return jsx("div", _extends$4({
    css: getStyles("clearIndicator", props),
    className: cx2({
      indicator: true,
      "clear-indicator": true
    }, className)
  }, innerProps), children || jsx(CrossIcon, null));
};
var indicatorSeparatorCSS = function indicatorSeparatorCSS2(_ref4) {
  var isDisabled = _ref4.isDisabled, _ref4$theme = _ref4.theme, baseUnit2 = _ref4$theme.spacing.baseUnit, colors2 = _ref4$theme.colors;
  return {
    label: "indicatorSeparator",
    alignSelf: "stretch",
    backgroundColor: isDisabled ? colors2.neutral10 : colors2.neutral20,
    marginBottom: baseUnit2 * 2,
    marginTop: baseUnit2 * 2,
    width: 1
  };
};
var IndicatorSeparator = function IndicatorSeparator2(props) {
  var className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return jsx("span", _extends$4({}, innerProps, {
    css: getStyles("indicatorSeparator", props),
    className: cx2({
      "indicator-separator": true
    }, className)
  }));
};
var loadingDotAnimations = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"])));
var loadingIndicatorCSS = function loadingIndicatorCSS2(_ref5) {
  var isFocused = _ref5.isFocused, size = _ref5.size, _ref5$theme = _ref5.theme, colors2 = _ref5$theme.colors, baseUnit2 = _ref5$theme.spacing.baseUnit;
  return {
    label: "loadingIndicator",
    color: isFocused ? colors2.neutral60 : colors2.neutral20,
    display: "flex",
    padding: baseUnit2 * 2,
    transition: "color 150ms",
    alignSelf: "center",
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: "center",
    verticalAlign: "middle"
  };
};
var LoadingDot = function LoadingDot2(_ref6) {
  var delay = _ref6.delay, offset = _ref6.offset;
  return jsx("span", {
    css: /* @__PURE__ */ css$2({
      animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
      backgroundColor: "currentColor",
      borderRadius: "1em",
      display: "inline-block",
      marginLeft: offset ? "1em" : void 0,
      height: "1em",
      verticalAlign: "top",
      width: "1em"
    }, ";label:LoadingDot;", "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFQSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0ZvY3VzZWQsXG4gIHRoZW1lOiB7XG4gICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIGNvbG9ycyxcbiAgfSxcbn06XG4gIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuXG4gICc6aG92ZXInOiB7XG4gICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBkcm9wZG93bkluZGljYXRvckNTUyA9IGJhc2VDU1M7XG5leHBvcnQgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBEcm9wZG93bkluZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+XG4pID0+IHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e2dldFN0eWxlcygnZHJvcGRvd25JbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdjbGVhckluZGljYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgZm9udFNpemU6IHNpemUsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG1hcmdpblJpZ2h0OiBzaXplLFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcywgaXNSdGwgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2xvYWRpbmdJbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5Mb2FkaW5nSW5kaWNhdG9yLmRlZmF1bHRQcm9wcyA9IHsgc2l6ZTogNCB9O1xuIl19 */")
  });
};
var LoadingIndicator = function LoadingIndicator2(props) {
  var className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps, isRtl = props.isRtl;
  return jsx("div", _extends$4({
    css: getStyles("loadingIndicator", props),
    className: cx2({
      indicator: true,
      "loading-indicator": true
    }, className)
  }, innerProps), jsx(LoadingDot, {
    delay: 0,
    offset: isRtl
  }), jsx(LoadingDot, {
    delay: 160,
    offset: true
  }), jsx(LoadingDot, {
    delay: 320,
    offset: !isRtl
  }));
};
LoadingIndicator.defaultProps = {
  size: 4
};
var css$1 = function css(_ref3) {
  var isDisabled = _ref3.isDisabled, isFocused = _ref3.isFocused, _ref$theme = _ref3.theme, colors2 = _ref$theme.colors, borderRadius2 = _ref$theme.borderRadius, spacing2 = _ref$theme.spacing;
  return {
    label: "control",
    alignItems: "center",
    backgroundColor: isDisabled ? colors2.neutral5 : colors2.neutral0,
    borderColor: isDisabled ? colors2.neutral10 : isFocused ? colors2.primary : colors2.neutral20,
    borderRadius: borderRadius2,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: isFocused ? "0 0 0 1px ".concat(colors2.primary) : void 0,
    cursor: "default",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minHeight: spacing2.controlHeight,
    outline: "0 !important",
    position: "relative",
    transition: "all 100ms",
    "&:hover": {
      borderColor: isFocused ? colors2.primary : colors2.neutral30
    }
  };
};
var Control = function Control2(props) {
  var children = props.children, cx2 = props.cx, getStyles = props.getStyles, className = props.className, isDisabled = props.isDisabled, isFocused = props.isFocused, innerRef = props.innerRef, innerProps = props.innerProps, menuIsOpen = props.menuIsOpen;
  return jsx("div", _extends$4({
    ref: innerRef,
    css: getStyles("control", props),
    className: cx2({
      control: true,
      "control--is-disabled": isDisabled,
      "control--is-focused": isFocused,
      "control--menu-is-open": menuIsOpen
    }, className)
  }, innerProps), children);
};
var _excluded$1$1 = ["data"];
var groupCSS = function groupCSS2(_ref3) {
  var spacing2 = _ref3.theme.spacing;
  return {
    paddingBottom: spacing2.baseUnit * 2,
    paddingTop: spacing2.baseUnit * 2
  };
};
var Group = function Group2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, Heading = props.Heading, headingProps = props.headingProps, innerProps = props.innerProps, label = props.label, theme = props.theme, selectProps = props.selectProps;
  return jsx("div", _extends$4({
    css: getStyles("group", props),
    className: cx2({
      group: true
    }, className)
  }, innerProps), jsx(Heading, _extends$4({}, headingProps, {
    selectProps,
    theme,
    getStyles,
    cx: cx2
  }), label), jsx("div", null, children));
};
var groupHeadingCSS = function groupHeadingCSS2(_ref22) {
  var spacing2 = _ref22.theme.spacing;
  return {
    label: "group",
    color: "#999",
    cursor: "default",
    display: "block",
    fontSize: "75%",
    fontWeight: 500,
    marginBottom: "0.25em",
    paddingLeft: spacing2.baseUnit * 3,
    paddingRight: spacing2.baseUnit * 3,
    textTransform: "uppercase"
  };
};
var GroupHeading = function GroupHeading2(props) {
  var getStyles = props.getStyles, cx2 = props.cx, className = props.className;
  var _cleanCommonProps = cleanCommonProps(props);
  _cleanCommonProps.data;
  var innerProps = _objectWithoutProperties(_cleanCommonProps, _excluded$1$1);
  return jsx("div", _extends$4({
    css: getStyles("groupHeading", props),
    className: cx2({
      "group-heading": true
    }, className)
  }, innerProps));
};
var _excluded$4 = ["innerRef", "isDisabled", "isHidden", "inputClassName"];
var inputCSS = function inputCSS2(_ref3) {
  var isDisabled = _ref3.isDisabled, value = _ref3.value, _ref$theme = _ref3.theme, spacing2 = _ref$theme.spacing, colors2 = _ref$theme.colors;
  return _objectSpread2({
    margin: spacing2.baseUnit / 2,
    paddingBottom: spacing2.baseUnit / 2,
    paddingTop: spacing2.baseUnit / 2,
    visibility: isDisabled ? "hidden" : "visible",
    color: colors2.neutral80,
    transform: value ? "translateZ(0)" : ""
  }, containerStyle);
};
var spacingStyle = {
  gridArea: "1 / 2",
  font: "inherit",
  minWidth: "2px",
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0
};
var containerStyle = {
  flex: "1 1 auto",
  display: "inline-grid",
  gridArea: "1 / 1 / 2 / 3",
  gridTemplateColumns: "0 min-content",
  "&:after": _objectSpread2({
    content: 'attr(data-value) " "',
    visibility: "hidden",
    whiteSpace: "pre"
  }, spacingStyle)
};
var inputStyle = function inputStyle2(isHidden) {
  return _objectSpread2({
    label: "input",
    color: "inherit",
    background: 0,
    opacity: isHidden ? 0 : 1,
    width: "100%"
  }, spacingStyle);
};
var Input = function Input2(props) {
  var className = props.className, cx2 = props.cx, getStyles = props.getStyles, value = props.value;
  var _cleanCommonProps = cleanCommonProps(props), innerRef = _cleanCommonProps.innerRef, isDisabled = _cleanCommonProps.isDisabled, isHidden = _cleanCommonProps.isHidden, inputClassName = _cleanCommonProps.inputClassName, innerProps = _objectWithoutProperties(_cleanCommonProps, _excluded$4);
  return jsx("div", {
    className: cx2({
      "input-container": true
    }, className),
    css: getStyles("input", props),
    "data-value": value || ""
  }, jsx("input", _extends$4({
    className: cx2({
      input: true
    }, inputClassName),
    ref: innerRef,
    style: inputStyle(isHidden),
    disabled: isDisabled
  }, innerProps)));
};
var multiValueCSS = function multiValueCSS2(_ref3) {
  var _ref$theme = _ref3.theme, spacing2 = _ref$theme.spacing, borderRadius2 = _ref$theme.borderRadius, colors2 = _ref$theme.colors;
  return {
    label: "multiValue",
    backgroundColor: colors2.neutral10,
    borderRadius: borderRadius2 / 2,
    display: "flex",
    margin: spacing2.baseUnit / 2,
    minWidth: 0
  };
};
var multiValueLabelCSS = function multiValueLabelCSS2(_ref22) {
  var _ref2$theme = _ref22.theme, borderRadius2 = _ref2$theme.borderRadius, colors2 = _ref2$theme.colors, cropWithEllipsis = _ref22.cropWithEllipsis;
  return {
    borderRadius: borderRadius2 / 2,
    color: colors2.neutral80,
    fontSize: "85%",
    overflow: "hidden",
    padding: 3,
    paddingLeft: 6,
    textOverflow: cropWithEllipsis || cropWithEllipsis === void 0 ? "ellipsis" : void 0,
    whiteSpace: "nowrap"
  };
};
var multiValueRemoveCSS = function multiValueRemoveCSS2(_ref3) {
  var _ref3$theme = _ref3.theme, spacing2 = _ref3$theme.spacing, borderRadius2 = _ref3$theme.borderRadius, colors2 = _ref3$theme.colors, isFocused = _ref3.isFocused;
  return {
    alignItems: "center",
    borderRadius: borderRadius2 / 2,
    backgroundColor: isFocused ? colors2.dangerLight : void 0,
    display: "flex",
    paddingLeft: spacing2.baseUnit,
    paddingRight: spacing2.baseUnit,
    ":hover": {
      backgroundColor: colors2.dangerLight,
      color: colors2.danger
    }
  };
};
var MultiValueGeneric = function MultiValueGeneric2(_ref4) {
  var children = _ref4.children, innerProps = _ref4.innerProps;
  return jsx("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
  var children = _ref5.children, innerProps = _ref5.innerProps;
  return jsx("div", _extends$4({
    role: "button"
  }, innerProps), children || jsx(CrossIcon, {
    size: 14
  }));
}
var MultiValue = function MultiValue2(props) {
  var children = props.children, className = props.className, components2 = props.components, cx2 = props.cx, data = props.data, getStyles = props.getStyles, innerProps = props.innerProps, isDisabled = props.isDisabled, removeProps3 = props.removeProps, selectProps = props.selectProps;
  var Container = components2.Container, Label = components2.Label, Remove = components2.Remove;
  return jsx(ClassNames, null, function(_ref6) {
    var css4 = _ref6.css, emotionCx = _ref6.cx;
    return jsx(Container, {
      data,
      innerProps: _objectSpread2({
        className: emotionCx(css4(getStyles("multiValue", props)), cx2({
          "multi-value": true,
          "multi-value--is-disabled": isDisabled
        }, className))
      }, innerProps),
      selectProps
    }, jsx(Label, {
      data,
      innerProps: {
        className: emotionCx(css4(getStyles("multiValueLabel", props)), cx2({
          "multi-value__label": true
        }, className))
      },
      selectProps
    }, children), jsx(Remove, {
      data,
      innerProps: _objectSpread2({
        className: emotionCx(css4(getStyles("multiValueRemove", props)), cx2({
          "multi-value__remove": true
        }, className)),
        "aria-label": "Remove ".concat(children || "option")
      }, removeProps3),
      selectProps
    }));
  });
};
var optionCSS = function optionCSS2(_ref3) {
  var isDisabled = _ref3.isDisabled, isFocused = _ref3.isFocused, isSelected = _ref3.isSelected, _ref$theme = _ref3.theme, spacing2 = _ref$theme.spacing, colors2 = _ref$theme.colors;
  return {
    label: "option",
    backgroundColor: isSelected ? colors2.primary : isFocused ? colors2.primary25 : "transparent",
    color: isDisabled ? colors2.neutral20 : isSelected ? colors2.neutral0 : "inherit",
    cursor: "default",
    display: "block",
    fontSize: "inherit",
    padding: "".concat(spacing2.baseUnit * 2, "px ").concat(spacing2.baseUnit * 3, "px"),
    width: "100%",
    userSelect: "none",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    ":active": {
      backgroundColor: !isDisabled ? isSelected ? colors2.primary : colors2.primary50 : void 0
    }
  };
};
var Option = function Option2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, isDisabled = props.isDisabled, isFocused = props.isFocused, isSelected = props.isSelected, innerRef = props.innerRef, innerProps = props.innerProps;
  return jsx("div", _extends$4({
    css: getStyles("option", props),
    className: cx2({
      option: true,
      "option--is-disabled": isDisabled,
      "option--is-focused": isFocused,
      "option--is-selected": isSelected
    }, className),
    ref: innerRef,
    "aria-disabled": isDisabled
  }, innerProps), children);
};
var placeholderCSS = function placeholderCSS2(_ref3) {
  var _ref$theme = _ref3.theme, spacing2 = _ref$theme.spacing, colors2 = _ref$theme.colors;
  return {
    label: "placeholder",
    color: colors2.neutral50,
    gridArea: "1 / 1 / 2 / 3",
    marginLeft: spacing2.baseUnit / 2,
    marginRight: spacing2.baseUnit / 2
  };
};
var Placeholder = function Placeholder2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return jsx("div", _extends$4({
    css: getStyles("placeholder", props),
    className: cx2({
      placeholder: true
    }, className)
  }, innerProps), children);
};
var css2 = function css3(_ref3) {
  var isDisabled = _ref3.isDisabled, _ref$theme = _ref3.theme, spacing2 = _ref$theme.spacing, colors2 = _ref$theme.colors;
  return {
    label: "singleValue",
    color: isDisabled ? colors2.neutral40 : colors2.neutral80,
    gridArea: "1 / 1 / 2 / 3",
    marginLeft: spacing2.baseUnit / 2,
    marginRight: spacing2.baseUnit / 2,
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  };
};
var SingleValue = function SingleValue2(props) {
  var children = props.children, className = props.className, cx2 = props.cx, getStyles = props.getStyles, isDisabled = props.isDisabled, innerProps = props.innerProps;
  return jsx("div", _extends$4({
    css: getStyles("singleValue", props),
    className: cx2({
      "single-value": true,
      "single-value--is-disabled": isDisabled
    }, className)
  }, innerProps), children);
};
var components = {
  ClearIndicator,
  Control,
  DropdownIndicator,
  DownChevron,
  CrossIcon,
  Group,
  GroupHeading,
  IndicatorsContainer,
  IndicatorSeparator,
  Input,
  LoadingIndicator,
  Menu,
  MenuList,
  MenuPortal,
  LoadingMessage,
  NoOptionsMessage,
  MultiValue,
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
  Option,
  Placeholder,
  SelectContainer,
  SingleValue,
  ValueContainer
};
var defaultComponents = function defaultComponents2(props) {
  return _objectSpread2(_objectSpread2({}, components), props.components);
};
var _excluded$1 = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
function useStateManager(_ref3) {
  var _ref$defaultInputValu = _ref3.defaultInputValue, defaultInputValue = _ref$defaultInputValu === void 0 ? "" : _ref$defaultInputValu, _ref$defaultMenuIsOpe = _ref3.defaultMenuIsOpen, defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe, _ref$defaultValue = _ref3.defaultValue, defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue, propsInputValue = _ref3.inputValue, propsMenuIsOpen = _ref3.menuIsOpen, propsOnChange = _ref3.onChange, propsOnInputChange = _ref3.onInputChange, propsOnMenuClose = _ref3.onMenuClose, propsOnMenuOpen = _ref3.onMenuOpen, propsValue = _ref3.value, restSelectProps = _objectWithoutProperties(_ref3, _excluded$1);
  var _useState = react.exports.useState(propsInputValue !== void 0 ? propsInputValue : defaultInputValue), _useState2 = _slicedToArray(_useState, 2), stateInputValue = _useState2[0], setStateInputValue = _useState2[1];
  var _useState3 = react.exports.useState(propsMenuIsOpen !== void 0 ? propsMenuIsOpen : defaultMenuIsOpen), _useState4 = _slicedToArray(_useState3, 2), stateMenuIsOpen = _useState4[0], setStateMenuIsOpen = _useState4[1];
  var _useState5 = react.exports.useState(propsValue !== void 0 ? propsValue : defaultValue), _useState6 = _slicedToArray(_useState5, 2), stateValue = _useState6[0], setStateValue = _useState6[1];
  var onChange2 = react.exports.useCallback(function(value2, actionMeta) {
    if (typeof propsOnChange === "function") {
      propsOnChange(value2, actionMeta);
    }
    setStateValue(value2);
  }, [propsOnChange]);
  var onInputChange = react.exports.useCallback(function(value2, actionMeta) {
    var newValue;
    if (typeof propsOnInputChange === "function") {
      newValue = propsOnInputChange(value2, actionMeta);
    }
    setStateInputValue(newValue !== void 0 ? newValue : value2);
  }, [propsOnInputChange]);
  var onMenuOpen = react.exports.useCallback(function() {
    if (typeof propsOnMenuOpen === "function") {
      propsOnMenuOpen();
    }
    setStateMenuIsOpen(true);
  }, [propsOnMenuOpen]);
  var onMenuClose = react.exports.useCallback(function() {
    if (typeof propsOnMenuClose === "function") {
      propsOnMenuClose();
    }
    setStateMenuIsOpen(false);
  }, [propsOnMenuClose]);
  var inputValue = propsInputValue !== void 0 ? propsInputValue : stateInputValue;
  var menuIsOpen = propsMenuIsOpen !== void 0 ? propsMenuIsOpen : stateMenuIsOpen;
  var value = propsValue !== void 0 ? propsValue : stateValue;
  return _objectSpread2(_objectSpread2({}, restSelectProps), {}, {
    inputValue,
    menuIsOpen,
    onChange: onChange2,
    onInputChange,
    onMenuClose,
    onMenuOpen,
    value
  });
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
      return lastResult;
    }
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }
  return memoized;
}
function _EMOTION_STRINGIFIED_CSS_ERROR__$1() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref = {
  name: "1f43avz-a11yText-A11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};
var A11yText = function A11yText2(props) {
  return jsx("span", _extends$4({
    css: _ref
  }, props));
};
var defaultAriaLiveMessages = {
  guidance: function guidance(props) {
    var isSearchable = props.isSearchable, isMulti = props.isMulti, isDisabled = props.isDisabled, tabSelectsValue = props.tabSelectsValue, context = props.context;
    switch (context) {
      case "menu":
        return "Use Up and Down to choose options".concat(isDisabled ? "" : ", press Enter to select the currently focused option", ", press Escape to exit the menu").concat(tabSelectsValue ? ", press Tab to select the option and exit the menu" : "", ".");
      case "input":
        return "".concat(props["aria-label"] || "Select", " is focused ").concat(isSearchable ? ",type to refine list" : "", ", press Down to open the menu, ").concat(isMulti ? " press left to focus selected values" : "");
      case "value":
        return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";
      default:
        return "";
    }
  },
  onChange: function onChange(props) {
    var action = props.action, _props$label = props.label, label = _props$label === void 0 ? "" : _props$label, labels = props.labels, isDisabled = props.isDisabled;
    switch (action) {
      case "deselect-option":
      case "pop-value":
      case "remove-value":
        return "option ".concat(label, ", deselected.");
      case "clear":
        return "All selected options have been cleared.";
      case "initial-input-focus":
        return "option".concat(labels.length > 1 ? "s" : "", " ").concat(labels.join(","), ", selected.");
      case "select-option":
        return isDisabled ? "option ".concat(label, " is disabled. Select another option.") : "option ".concat(label, ", selected.");
      default:
        return "";
    }
  },
  onFocus: function onFocus(props) {
    var context = props.context, focused = props.focused, options2 = props.options, _props$label2 = props.label, label = _props$label2 === void 0 ? "" : _props$label2, selectValue = props.selectValue, isDisabled = props.isDisabled, isSelected = props.isSelected;
    var getArrayIndex = function getArrayIndex2(arr, item) {
      return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : "";
    };
    if (context === "value" && selectValue) {
      return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
    }
    if (context === "menu") {
      var disabled = isDisabled ? " disabled" : "";
      var status = "".concat(isSelected ? "selected" : "focused").concat(disabled);
      return "option ".concat(label, " ").concat(status, ", ").concat(getArrayIndex(options2, focused), ".");
    }
    return "";
  },
  onFilter: function onFilter(props) {
    var inputValue = props.inputValue, resultsMessage = props.resultsMessage;
    return "".concat(resultsMessage).concat(inputValue ? " for search term " + inputValue : "", ".");
  }
};
var LiveRegion = function LiveRegion2(props) {
  var ariaSelection = props.ariaSelection, focusedOption = props.focusedOption, focusedValue = props.focusedValue, focusableOptions = props.focusableOptions, isFocused = props.isFocused, selectValue = props.selectValue, selectProps = props.selectProps, id = props.id;
  var ariaLiveMessages = selectProps.ariaLiveMessages, getOptionLabel4 = selectProps.getOptionLabel, inputValue = selectProps.inputValue, isMulti = selectProps.isMulti, isOptionDisabled3 = selectProps.isOptionDisabled, isSearchable = selectProps.isSearchable, menuIsOpen = selectProps.menuIsOpen, options2 = selectProps.options, screenReaderStatus2 = selectProps.screenReaderStatus, tabSelectsValue = selectProps.tabSelectsValue;
  var ariaLabel = selectProps["aria-label"];
  var ariaLive = selectProps["aria-live"];
  var messages = react.exports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, defaultAriaLiveMessages), ariaLiveMessages || {});
  }, [ariaLiveMessages]);
  var ariaSelected = react.exports.useMemo(function() {
    var message = "";
    if (ariaSelection && messages.onChange) {
      var option = ariaSelection.option, selectedOptions = ariaSelection.options, removedValue = ariaSelection.removedValue, removedValues = ariaSelection.removedValues, value = ariaSelection.value;
      var asOption = function asOption2(val) {
        return !Array.isArray(val) ? val : null;
      };
      var selected = removedValue || option || asOption(value);
      var label = selected ? getOptionLabel4(selected) : "";
      var multiSelected = selectedOptions || removedValues || void 0;
      var labels = multiSelected ? multiSelected.map(getOptionLabel4) : [];
      var onChangeProps = _objectSpread2({
        isDisabled: selected && isOptionDisabled3(selected, selectValue),
        label,
        labels
      }, ariaSelection);
      message = messages.onChange(onChangeProps);
    }
    return message;
  }, [ariaSelection, messages, isOptionDisabled3, selectValue, getOptionLabel4]);
  var ariaFocused = react.exports.useMemo(function() {
    var focusMsg = "";
    var focused = focusedOption || focusedValue;
    var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
    if (focused && messages.onFocus) {
      var onFocusProps = {
        focused,
        label: getOptionLabel4(focused),
        isDisabled: isOptionDisabled3(focused, selectValue),
        isSelected,
        options: options2,
        context: focused === focusedOption ? "menu" : "value",
        selectValue
      };
      focusMsg = messages.onFocus(onFocusProps);
    }
    return focusMsg;
  }, [focusedOption, focusedValue, getOptionLabel4, isOptionDisabled3, messages, options2, selectValue]);
  var ariaResults = react.exports.useMemo(function() {
    var resultsMsg = "";
    if (menuIsOpen && options2.length && messages.onFilter) {
      var resultsMessage = screenReaderStatus2({
        count: focusableOptions.length
      });
      resultsMsg = messages.onFilter({
        inputValue,
        resultsMessage
      });
    }
    return resultsMsg;
  }, [focusableOptions, inputValue, menuIsOpen, messages, options2, screenReaderStatus2]);
  var ariaGuidance = react.exports.useMemo(function() {
    var guidanceMsg = "";
    if (messages.guidance) {
      var context = focusedValue ? "value" : menuIsOpen ? "menu" : "input";
      guidanceMsg = messages.guidance({
        "aria-label": ariaLabel,
        context,
        isDisabled: focusedOption && isOptionDisabled3(focusedOption, selectValue),
        isMulti,
        isSearchable,
        tabSelectsValue
      });
    }
    return guidanceMsg;
  }, [ariaLabel, focusedOption, focusedValue, isMulti, isOptionDisabled3, isSearchable, menuIsOpen, messages, selectValue, tabSelectsValue]);
  var ariaContext = "".concat(ariaFocused, " ").concat(ariaResults, " ").concat(ariaGuidance);
  var ScreenReaderText = jsx(react.exports.Fragment, null, jsx("span", {
    id: "aria-selection"
  }, ariaSelected), jsx("span", {
    id: "aria-context"
  }, ariaContext));
  var isInitialFocus = (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus";
  return jsx(react.exports.Fragment, null, jsx(A11yText, {
    id
  }, isInitialFocus && ScreenReaderText), jsx(A11yText, {
    "aria-live": ariaLive,
    "aria-atomic": "false",
    "aria-relevant": "additions text"
  }, isFocused && !isInitialFocus && ScreenReaderText));
};
var diacritics = [{
  base: "A",
  letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
}, {
  base: "AA",
  letters: "\uA732"
}, {
  base: "AE",
  letters: "\xC6\u01FC\u01E2"
}, {
  base: "AO",
  letters: "\uA734"
}, {
  base: "AU",
  letters: "\uA736"
}, {
  base: "AV",
  letters: "\uA738\uA73A"
}, {
  base: "AY",
  letters: "\uA73C"
}, {
  base: "B",
  letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
}, {
  base: "C",
  letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
}, {
  base: "D",
  letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779"
}, {
  base: "DZ",
  letters: "\u01F1\u01C4"
}, {
  base: "Dz",
  letters: "\u01F2\u01C5"
}, {
  base: "E",
  letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
}, {
  base: "F",
  letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B"
}, {
  base: "G",
  letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
}, {
  base: "H",
  letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
}, {
  base: "I",
  letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
}, {
  base: "J",
  letters: "J\u24BF\uFF2A\u0134\u0248"
}, {
  base: "K",
  letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
}, {
  base: "L",
  letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
}, {
  base: "LJ",
  letters: "\u01C7"
}, {
  base: "Lj",
  letters: "\u01C8"
}, {
  base: "M",
  letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
}, {
  base: "N",
  letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
}, {
  base: "NJ",
  letters: "\u01CA"
}, {
  base: "Nj",
  letters: "\u01CB"
}, {
  base: "O",
  letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
}, {
  base: "OI",
  letters: "\u01A2"
}, {
  base: "OO",
  letters: "\uA74E"
}, {
  base: "OU",
  letters: "\u0222"
}, {
  base: "P",
  letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
}, {
  base: "Q",
  letters: "Q\u24C6\uFF31\uA756\uA758\u024A"
}, {
  base: "R",
  letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
}, {
  base: "S",
  letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
}, {
  base: "T",
  letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
}, {
  base: "TZ",
  letters: "\uA728"
}, {
  base: "U",
  letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
}, {
  base: "V",
  letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
}, {
  base: "VY",
  letters: "\uA760"
}, {
  base: "W",
  letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
}, {
  base: "X",
  letters: "X\u24CD\uFF38\u1E8A\u1E8C"
}, {
  base: "Y",
  letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
}, {
  base: "Z",
  letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
}, {
  base: "a",
  letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
}, {
  base: "aa",
  letters: "\uA733"
}, {
  base: "ae",
  letters: "\xE6\u01FD\u01E3"
}, {
  base: "ao",
  letters: "\uA735"
}, {
  base: "au",
  letters: "\uA737"
}, {
  base: "av",
  letters: "\uA739\uA73B"
}, {
  base: "ay",
  letters: "\uA73D"
}, {
  base: "b",
  letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
}, {
  base: "c",
  letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
}, {
  base: "d",
  letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
}, {
  base: "dz",
  letters: "\u01F3\u01C6"
}, {
  base: "e",
  letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
}, {
  base: "f",
  letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C"
}, {
  base: "g",
  letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
}, {
  base: "h",
  letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
}, {
  base: "hv",
  letters: "\u0195"
}, {
  base: "i",
  letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
}, {
  base: "j",
  letters: "j\u24D9\uFF4A\u0135\u01F0\u0249"
}, {
  base: "k",
  letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
}, {
  base: "l",
  letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
}, {
  base: "lj",
  letters: "\u01C9"
}, {
  base: "m",
  letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
}, {
  base: "n",
  letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
}, {
  base: "nj",
  letters: "\u01CC"
}, {
  base: "o",
  letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
}, {
  base: "oi",
  letters: "\u01A3"
}, {
  base: "ou",
  letters: "\u0223"
}, {
  base: "oo",
  letters: "\uA74F"
}, {
  base: "p",
  letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
}, {
  base: "q",
  letters: "q\u24E0\uFF51\u024B\uA757\uA759"
}, {
  base: "r",
  letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
}, {
  base: "s",
  letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
}, {
  base: "t",
  letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
}, {
  base: "tz",
  letters: "\uA729"
}, {
  base: "u",
  letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
}, {
  base: "v",
  letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
}, {
  base: "vy",
  letters: "\uA761"
}, {
  base: "w",
  letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
}, {
  base: "x",
  letters: "x\u24E7\uFF58\u1E8B\u1E8D"
}, {
  base: "y",
  letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
}, {
  base: "z",
  letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
}];
var anyDiacritic = new RegExp("[" + diacritics.map(function(d) {
  return d.letters;
}).join("") + "]", "g");
var diacriticToBase = {};
for (var i = 0; i < diacritics.length; i++) {
  var diacritic = diacritics[i];
  for (var j = 0; j < diacritic.letters.length; j++) {
    diacriticToBase[diacritic.letters[j]] = diacritic.base;
  }
}
var stripDiacritics = function stripDiacritics2(str) {
  return str.replace(anyDiacritic, function(match2) {
    return diacriticToBase[match2];
  });
};
var memoizedStripDiacriticsForInput = memoizeOne(stripDiacritics);
var trimString = function trimString2(str) {
  return str.replace(/^\s+|\s+$/g, "");
};
var defaultStringify = function defaultStringify2(option) {
  return "".concat(option.label, " ").concat(option.value);
};
var createFilter = function createFilter2(config) {
  return function(option, rawInput) {
    if (option.data.__isNew__)
      return true;
    var _ignoreCase$ignoreAcc = _objectSpread2({
      ignoreCase: true,
      ignoreAccents: true,
      stringify: defaultStringify,
      trim: true,
      matchFrom: "any"
    }, config), ignoreCase = _ignoreCase$ignoreAcc.ignoreCase, ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents, stringify2 = _ignoreCase$ignoreAcc.stringify, trim2 = _ignoreCase$ignoreAcc.trim, matchFrom = _ignoreCase$ignoreAcc.matchFrom;
    var input = trim2 ? trimString(rawInput) : rawInput;
    var candidate = trim2 ? trimString(stringify2(option)) : stringify2(option);
    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }
    if (ignoreAccents) {
      input = memoizedStripDiacriticsForInput(input);
      candidate = stripDiacritics(candidate);
    }
    return matchFrom === "start" ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};
var _excluded = ["innerRef"];
function DummyInput(_ref3) {
  var innerRef = _ref3.innerRef, props = _objectWithoutProperties(_ref3, _excluded);
  var filteredProps = removeProps(props, "onExited", "in", "enter", "exit", "appear");
  return jsx("input", _extends$4({
    ref: innerRef
  }, filteredProps, {
    css: /* @__PURE__ */ css$2({
      label: "dummyInput",
      background: 0,
      border: 0,
      caretColor: "transparent",
      fontSize: "inherit",
      gridArea: "1 / 1 / 2 / 3",
      outline: 0,
      padding: 0,
      width: 1,
      color: "transparent",
      left: -100,
      opacity: 0,
      position: "relative",
      transform: "scale(.01)"
    }, ";label:DummyInput;", "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgcmVtb3ZlUHJvcHMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIER1bW15SW5wdXQoe1xuICBpbm5lclJlZixcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW5wdXQnXSAmIHtcbiAgcmVhZG9ubHkgaW5uZXJSZWY6IFJlZjxIVE1MSW5wdXRFbGVtZW50Pjtcbn0pIHtcbiAgLy8gUmVtb3ZlIGFuaW1hdGlvbiBwcm9wcyBub3QgbWVhbnQgZm9yIEhUTUwgZWxlbWVudHNcbiAgY29uc3QgZmlsdGVyZWRQcm9wcyA9IHJlbW92ZVByb3BzKFxuICAgIHByb3BzLFxuICAgICdvbkV4aXRlZCcsXG4gICAgJ2luJyxcbiAgICAnZW50ZXInLFxuICAgICdleGl0JyxcbiAgICAnYXBwZWFyJ1xuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICByZWY9e2lubmVyUmVmfVxuICAgICAgey4uLmZpbHRlcmVkUHJvcHN9XG4gICAgICBjc3M9e3tcbiAgICAgICAgbGFiZWw6ICdkdW1teUlucHV0JyxcbiAgICAgICAgLy8gZ2V0IHJpZCBvZiBhbnkgZGVmYXVsdCBzdHlsZXNcbiAgICAgICAgYmFja2dyb3VuZDogMCxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHRoaXMgaGlkZXMgdGhlIGZsYXNoaW5nIGN1cnNvclxuICAgICAgICBjYXJldENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICAgICBncmlkQXJlYTogJzEgLyAxIC8gMiAvIDMnLFxuICAgICAgICBvdXRsaW5lOiAwLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHdpdGhvdXQgYHdpZHRoYCBicm93c2VycyB3b24ndCBhbGxvdyBmb2N1c1xuICAgICAgICB3aWR0aDogMSxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIGRlc2t0b3BcbiAgICAgICAgY29sb3I6ICd0cmFuc3BhcmVudCcsXG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBtb2JpbGUgd2hpbHN0IG1haW50YWluaW5nIFwic2Nyb2xsIGludG8gdmlld1wiIGJlaGF2aW91clxuICAgICAgICBsZWZ0OiAtMTAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoLjAxKScsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG4iXX0= */")
  }));
}
var cancelScroll = function cancelScroll2(event) {
  event.preventDefault();
  event.stopPropagation();
};
function useScrollCapture(_ref3) {
  var isEnabled = _ref3.isEnabled, onBottomArrive = _ref3.onBottomArrive, onBottomLeave = _ref3.onBottomLeave, onTopArrive = _ref3.onTopArrive, onTopLeave = _ref3.onTopLeave;
  var isBottom = react.exports.useRef(false);
  var isTop = react.exports.useRef(false);
  var touchStart = react.exports.useRef(0);
  var scrollTarget = react.exports.useRef(null);
  var handleEventDelta = react.exports.useCallback(function(event, delta) {
    if (scrollTarget.current === null)
      return;
    var _scrollTarget$current = scrollTarget.current, scrollTop = _scrollTarget$current.scrollTop, scrollHeight = _scrollTarget$current.scrollHeight, clientHeight = _scrollTarget$current.clientHeight;
    var target = scrollTarget.current;
    var isDeltaPositive = delta > 0;
    var availableScroll = scrollHeight - clientHeight - scrollTop;
    var shouldCancelScroll = false;
    if (availableScroll > delta && isBottom.current) {
      if (onBottomLeave)
        onBottomLeave(event);
      isBottom.current = false;
    }
    if (isDeltaPositive && isTop.current) {
      if (onTopLeave)
        onTopLeave(event);
      isTop.current = false;
    }
    if (isDeltaPositive && delta > availableScroll) {
      if (onBottomArrive && !isBottom.current) {
        onBottomArrive(event);
      }
      target.scrollTop = scrollHeight;
      shouldCancelScroll = true;
      isBottom.current = true;
    } else if (!isDeltaPositive && -delta > scrollTop) {
      if (onTopArrive && !isTop.current) {
        onTopArrive(event);
      }
      target.scrollTop = 0;
      shouldCancelScroll = true;
      isTop.current = true;
    }
    if (shouldCancelScroll) {
      cancelScroll(event);
    }
  }, [onBottomArrive, onBottomLeave, onTopArrive, onTopLeave]);
  var onWheel = react.exports.useCallback(function(event) {
    handleEventDelta(event, event.deltaY);
  }, [handleEventDelta]);
  var onTouchStart = react.exports.useCallback(function(event) {
    touchStart.current = event.changedTouches[0].clientY;
  }, []);
  var onTouchMove = react.exports.useCallback(function(event) {
    var deltaY = touchStart.current - event.changedTouches[0].clientY;
    handleEventDelta(event, deltaY);
  }, [handleEventDelta]);
  var startListening = react.exports.useCallback(function(el) {
    if (!el)
      return;
    var notPassive = supportsPassiveEvents ? {
      passive: false
    } : false;
    el.addEventListener("wheel", onWheel, notPassive);
    el.addEventListener("touchstart", onTouchStart, notPassive);
    el.addEventListener("touchmove", onTouchMove, notPassive);
  }, [onTouchMove, onTouchStart, onWheel]);
  var stopListening = react.exports.useCallback(function(el) {
    if (!el)
      return;
    el.removeEventListener("wheel", onWheel, false);
    el.removeEventListener("touchstart", onTouchStart, false);
    el.removeEventListener("touchmove", onTouchMove, false);
  }, [onTouchMove, onTouchStart, onWheel]);
  react.exports.useEffect(function() {
    if (!isEnabled)
      return;
    var element = scrollTarget.current;
    startListening(element);
    return function() {
      stopListening(element);
    };
  }, [isEnabled, startListening, stopListening]);
  return function(element) {
    scrollTarget.current = element;
  };
}
var STYLE_KEYS = ["boxSizing", "height", "overflow", "paddingRight", "position"];
var LOCK_STYLES = {
  boxSizing: "border-box",
  overflow: "hidden",
  position: "relative",
  height: "100%"
};
function preventTouchMove(e) {
  e.preventDefault();
}
function allowTouchMove(e) {
  e.stopPropagation();
}
function preventInertiaScroll() {
  var top = this.scrollTop;
  var totalScroll = this.scrollHeight;
  var currentScroll = top + this.offsetHeight;
  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
}
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var activeScrollLocks = 0;
var listenerOptions = {
  capture: false,
  passive: false
};
function useScrollLock(_ref3) {
  var isEnabled = _ref3.isEnabled, _ref$accountForScroll = _ref3.accountForScrollbars, accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
  var originalStyles = react.exports.useRef({});
  var scrollTarget = react.exports.useRef(null);
  var addScrollLock = react.exports.useCallback(function(touchScrollTarget) {
    if (!canUseDOM)
      return;
    var target = document.body;
    var targetStyle = target && target.style;
    if (accountForScrollbars) {
      STYLE_KEYS.forEach(function(key) {
        var val = targetStyle && targetStyle[key];
        originalStyles.current[key] = val;
      });
    }
    if (accountForScrollbars && activeScrollLocks < 1) {
      var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
      var clientWidth = document.body ? document.body.clientWidth : 0;
      var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
      Object.keys(LOCK_STYLES).forEach(function(key) {
        var val = LOCK_STYLES[key];
        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
      if (targetStyle) {
        targetStyle.paddingRight = "".concat(adjustedPadding, "px");
      }
    }
    if (target && isTouchDevice()) {
      target.addEventListener("touchmove", preventTouchMove, listenerOptions);
      if (touchScrollTarget) {
        touchScrollTarget.addEventListener("touchstart", preventInertiaScroll, listenerOptions);
        touchScrollTarget.addEventListener("touchmove", allowTouchMove, listenerOptions);
      }
    }
    activeScrollLocks += 1;
  }, [accountForScrollbars]);
  var removeScrollLock = react.exports.useCallback(function(touchScrollTarget) {
    if (!canUseDOM)
      return;
    var target = document.body;
    var targetStyle = target && target.style;
    activeScrollLocks = Math.max(activeScrollLocks - 1, 0);
    if (accountForScrollbars && activeScrollLocks < 1) {
      STYLE_KEYS.forEach(function(key) {
        var val = originalStyles.current[key];
        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
    }
    if (target && isTouchDevice()) {
      target.removeEventListener("touchmove", preventTouchMove, listenerOptions);
      if (touchScrollTarget) {
        touchScrollTarget.removeEventListener("touchstart", preventInertiaScroll, listenerOptions);
        touchScrollTarget.removeEventListener("touchmove", allowTouchMove, listenerOptions);
      }
    }
  }, [accountForScrollbars]);
  react.exports.useEffect(function() {
    if (!isEnabled)
      return;
    var element = scrollTarget.current;
    addScrollLock(element);
    return function() {
      removeScrollLock(element);
    };
  }, [isEnabled, addScrollLock, removeScrollLock]);
  return function(element) {
    scrollTarget.current = element;
  };
}
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var blurSelectInput = function blurSelectInput2() {
  return document.activeElement && document.activeElement.blur();
};
var _ref2 = {
  name: "bp8cua-ScrollManager",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9ICgpID0+XG4gIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmJsdXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2Nyb2xsTWFuYWdlcih7XG4gIGNoaWxkcmVuLFxuICBsb2NrRW5hYmxlZCxcbiAgY2FwdHVyZUVuYWJsZWQgPSB0cnVlLFxuICBvbkJvdHRvbUFycml2ZSxcbiAgb25Cb3R0b21MZWF2ZSxcbiAgb25Ub3BBcnJpdmUsXG4gIG9uVG9wTGVhdmUsXG59OiBQcm9wcykge1xuICBjb25zdCBzZXRTY3JvbGxDYXB0dXJlVGFyZ2V0ID0gdXNlU2Nyb2xsQ2FwdHVyZSh7XG4gICAgaXNFbmFibGVkOiBjYXB0dXJlRW5hYmxlZCxcbiAgICBvbkJvdHRvbUFycml2ZSxcbiAgICBvbkJvdHRvbUxlYXZlLFxuICAgIG9uVG9wQXJyaXZlLFxuICAgIG9uVG9wTGVhdmUsXG4gIH0pO1xuICBjb25zdCBzZXRTY3JvbGxMb2NrVGFyZ2V0ID0gdXNlU2Nyb2xsTG9jayh7IGlzRW5hYmxlZDogbG9ja0VuYWJsZWQgfSk7XG5cbiAgY29uc3QgdGFyZ2V0UmVmOiBSZWZDYWxsYmFjazxIVE1MRWxlbWVudD4gPSAoZWxlbWVudCkgPT4ge1xuICAgIHNldFNjcm9sbENhcHR1cmVUYXJnZXQoZWxlbWVudCk7XG4gICAgc2V0U2Nyb2xsTG9ja1RhcmdldChlbGVtZW50KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIHtsb2NrRW5hYmxlZCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBvbkNsaWNrPXtibHVyU2VsZWN0SW5wdXR9XG4gICAgICAgICAgY3NzPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0OiAwLCBib3R0b206IDAsIHJpZ2h0OiAwLCB0b3A6IDAgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7Y2hpbGRyZW4odGFyZ2V0UmVmKX1cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufVxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
function ScrollManager(_ref3) {
  var children = _ref3.children, lockEnabled = _ref3.lockEnabled, _ref$captureEnabled = _ref3.captureEnabled, captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled, onBottomArrive = _ref3.onBottomArrive, onBottomLeave = _ref3.onBottomLeave, onTopArrive = _ref3.onTopArrive, onTopLeave = _ref3.onTopLeave;
  var setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive,
    onBottomLeave,
    onTopArrive,
    onTopLeave
  });
  var setScrollLockTarget = useScrollLock({
    isEnabled: lockEnabled
  });
  var targetRef = function targetRef2(element) {
    setScrollCaptureTarget(element);
    setScrollLockTarget(element);
  };
  return jsx(react.exports.Fragment, null, lockEnabled && jsx("div", {
    onClick: blurSelectInput,
    css: _ref2
  }), children(targetRef));
}
var formatGroupLabel = function formatGroupLabel2(group) {
  return group.label;
};
var getOptionLabel$1 = function getOptionLabel(option) {
  return option.label;
};
var getOptionValue$1 = function getOptionValue(option) {
  return option.value;
};
var isOptionDisabled = function isOptionDisabled2(option) {
  return !!option.isDisabled;
};
var defaultStyles = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: css$1,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: inputCSS,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  menuPortal: menuPortalCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: optionCSS,
  placeholder: placeholderCSS,
  singleValue: css2,
  valueContainer: valueContainerCSS
};
var colors = {
  primary: "#2684FF",
  primary75: "#4C9AFF",
  primary50: "#B2D4FF",
  primary25: "#DEEBFF",
  danger: "#DE350B",
  dangerLight: "#FFBDAD",
  neutral0: "hsl(0, 0%, 100%)",
  neutral5: "hsl(0, 0%, 95%)",
  neutral10: "hsl(0, 0%, 90%)",
  neutral20: "hsl(0, 0%, 80%)",
  neutral30: "hsl(0, 0%, 70%)",
  neutral40: "hsl(0, 0%, 60%)",
  neutral50: "hsl(0, 0%, 50%)",
  neutral60: "hsl(0, 0%, 40%)",
  neutral70: "hsl(0, 0%, 30%)",
  neutral80: "hsl(0, 0%, 20%)",
  neutral90: "hsl(0, 0%, 10%)"
};
var borderRadius = 4;
var baseUnit = 4;
var controlHeight = 38;
var menuGutter = baseUnit * 2;
var spacing = {
  baseUnit,
  controlHeight,
  menuGutter
};
var defaultTheme = {
  borderRadius,
  colors,
  spacing
};
var defaultProps = {
  "aria-live": "polite",
  backspaceRemovesValue: true,
  blurInputOnSelect: isTouchCapable(),
  captureMenuScroll: !isTouchCapable(),
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel,
  getOptionLabel: getOptionLabel$1,
  getOptionValue: getOptionValue$1,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return "Loading...";
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: "bottom",
  menuPosition: "absolute",
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !isMobileDevice(),
  noOptionsMessage: function noOptionsMessage() {
    return "No options";
  },
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: "Select...",
  screenReaderStatus: function screenReaderStatus(_ref3) {
    var count2 = _ref3.count;
    return "".concat(count2, " result").concat(count2 !== 1 ? "s" : "", " available");
  },
  styles: {},
  tabIndex: 0,
  tabSelectsValue: true
};
function toCategorizedOption(props, option, selectValue, index) {
  var isDisabled = _isOptionDisabled(props, option, selectValue);
  var isSelected = _isOptionSelected(props, option, selectValue);
  var label = getOptionLabel2(props, option);
  var value = getOptionValue2(props, option);
  return {
    type: "option",
    data: option,
    isDisabled,
    isSelected,
    label,
    value,
    index
  };
}
function buildCategorizedOptions(props, selectValue) {
  return props.options.map(function(groupOrOption, groupOrOptionIndex) {
    if ("options" in groupOrOption) {
      var categorizedOptions = groupOrOption.options.map(function(option, optionIndex) {
        return toCategorizedOption(props, option, selectValue, optionIndex);
      }).filter(function(categorizedOption2) {
        return isFocusable(props, categorizedOption2);
      });
      return categorizedOptions.length > 0 ? {
        type: "group",
        data: groupOrOption,
        options: categorizedOptions,
        index: groupOrOptionIndex
      } : void 0;
    }
    var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
    return isFocusable(props, categorizedOption) ? categorizedOption : void 0;
  }).filter(notNullish);
}
function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
  return categorizedOptions.reduce(function(optionsAccumulator, categorizedOption) {
    if (categorizedOption.type === "group") {
      optionsAccumulator.push.apply(optionsAccumulator, _toConsumableArray(categorizedOption.options.map(function(option) {
        return option.data;
      })));
    } else {
      optionsAccumulator.push(categorizedOption.data);
    }
    return optionsAccumulator;
  }, []);
}
function buildFocusableOptions(props, selectValue) {
  return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}
function isFocusable(props, categorizedOption) {
  var _props$inputValue = props.inputValue, inputValue = _props$inputValue === void 0 ? "" : _props$inputValue;
  var data = categorizedOption.data, isSelected = categorizedOption.isSelected, label = categorizedOption.label, value = categorizedOption.value;
  return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
    label,
    value,
    data
  }, inputValue);
}
function getNextFocusedValue(state, nextSelectValue) {
  var focusedValue = state.focusedValue, lastSelectValue = state.selectValue;
  var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);
  if (lastFocusedIndex > -1) {
    var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);
    if (nextFocusedIndex > -1) {
      return focusedValue;
    } else if (lastFocusedIndex < nextSelectValue.length) {
      return nextSelectValue[lastFocusedIndex];
    }
  }
  return null;
}
function getNextFocusedOption(state, options2) {
  var lastFocusedOption = state.focusedOption;
  return lastFocusedOption && options2.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options2[0];
}
var getOptionLabel2 = function getOptionLabel3(props, data) {
  return props.getOptionLabel(data);
};
var getOptionValue2 = function getOptionValue3(props, data) {
  return props.getOptionValue(data);
};
function _isOptionDisabled(props, option, selectValue) {
  return typeof props.isOptionDisabled === "function" ? props.isOptionDisabled(option, selectValue) : false;
}
function _isOptionSelected(props, option, selectValue) {
  if (selectValue.indexOf(option) > -1)
    return true;
  if (typeof props.isOptionSelected === "function") {
    return props.isOptionSelected(option, selectValue);
  }
  var candidate = getOptionValue2(props, option);
  return selectValue.some(function(i) {
    return getOptionValue2(props, i) === candidate;
  });
}
function _filterOption(props, option, inputValue) {
  return props.filterOption ? props.filterOption(option, inputValue) : true;
}
var shouldHideSelectedOptions = function shouldHideSelectedOptions2(props) {
  var hideSelectedOptions = props.hideSelectedOptions, isMulti = props.isMulti;
  if (hideSelectedOptions === void 0)
    return isMulti;
  return hideSelectedOptions;
};
var instanceId = 1;
var Select$1 = /* @__PURE__ */ function(_Component) {
  _inherits(Select2, _Component);
  var _super = _createSuper(Select2);
  function Select2(_props) {
    var _this;
    _classCallCheck(this, Select2);
    _this = _super.call(this, _props);
    _this.state = {
      ariaSelection: null,
      focusedOption: null,
      focusedValue: null,
      inputIsHidden: false,
      isFocused: false,
      selectValue: [],
      clearFocusValueOnUpdate: false,
      prevWasFocused: false,
      inputIsHiddenAfterUpdate: void 0,
      prevProps: void 0
    };
    _this.blockOptionHover = false;
    _this.isComposing = false;
    _this.commonProps = void 0;
    _this.initialTouchX = 0;
    _this.initialTouchY = 0;
    _this.instancePrefix = "";
    _this.openAfterFocus = false;
    _this.scrollToFocusedOptionOnUpdate = false;
    _this.userIsDragging = void 0;
    _this.controlRef = null;
    _this.getControlRef = function(ref) {
      _this.controlRef = ref;
    };
    _this.focusedOptionRef = null;
    _this.getFocusedOptionRef = function(ref) {
      _this.focusedOptionRef = ref;
    };
    _this.menuListRef = null;
    _this.getMenuListRef = function(ref) {
      _this.menuListRef = ref;
    };
    _this.inputRef = null;
    _this.getInputRef = function(ref) {
      _this.inputRef = ref;
    };
    _this.focus = _this.focusInput;
    _this.blur = _this.blurInput;
    _this.onChange = function(newValue, actionMeta) {
      var _this$props = _this.props, onChange2 = _this$props.onChange, name = _this$props.name;
      actionMeta.name = name;
      _this.ariaOnChange(newValue, actionMeta);
      onChange2(newValue, actionMeta);
    };
    _this.setValue = function(newValue, action, option) {
      var _this$props2 = _this.props, closeMenuOnSelect = _this$props2.closeMenuOnSelect, isMulti = _this$props2.isMulti, inputValue = _this$props2.inputValue;
      _this.onInputChange("", {
        action: "set-value",
        prevInputValue: inputValue
      });
      if (closeMenuOnSelect) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });
        _this.onMenuClose();
      }
      _this.setState({
        clearFocusValueOnUpdate: true
      });
      _this.onChange(newValue, {
        action,
        option
      });
    };
    _this.selectOption = function(newValue) {
      var _this$props3 = _this.props, blurInputOnSelect = _this$props3.blurInputOnSelect, isMulti = _this$props3.isMulti, name = _this$props3.name;
      var selectValue = _this.state.selectValue;
      var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);
      var isDisabled = _this.isOptionDisabled(newValue, selectValue);
      if (deselected) {
        var candidate = _this.getOptionValue(newValue);
        _this.setValue(multiValueAsValue(selectValue.filter(function(i) {
          return _this.getOptionValue(i) !== candidate;
        })), "deselect-option", newValue);
      } else if (!isDisabled) {
        if (isMulti) {
          _this.setValue(multiValueAsValue([].concat(_toConsumableArray(selectValue), [newValue])), "select-option", newValue);
        } else {
          _this.setValue(singleValueAsValue(newValue), "select-option");
        }
      } else {
        _this.ariaOnChange(singleValueAsValue(newValue), {
          action: "select-option",
          option: newValue,
          name
        });
        return;
      }
      if (blurInputOnSelect) {
        _this.blurInput();
      }
    };
    _this.removeValue = function(removedValue) {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var candidate = _this.getOptionValue(removedValue);
      var newValueArray = selectValue.filter(function(i) {
        return _this.getOptionValue(i) !== candidate;
      });
      var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: "remove-value",
        removedValue
      });
      _this.focusInput();
    };
    _this.clearValue = function() {
      var selectValue = _this.state.selectValue;
      _this.onChange(valueTernary(_this.props.isMulti, [], null), {
        action: "clear",
        removedValues: selectValue
      });
    };
    _this.popValue = function() {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var lastSelectedValue = selectValue[selectValue.length - 1];
      var newValueArray = selectValue.slice(0, selectValue.length - 1);
      var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: "pop-value",
        removedValue: lastSelectedValue
      });
    };
    _this.getValue = function() {
      return _this.state.selectValue;
    };
    _this.cx = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return classNames.apply(void 0, [_this.props.classNamePrefix].concat(args));
    };
    _this.getOptionLabel = function(data) {
      return getOptionLabel2(_this.props, data);
    };
    _this.getOptionValue = function(data) {
      return getOptionValue2(_this.props, data);
    };
    _this.getStyles = function(key, props) {
      var base = defaultStyles[key](props);
      base.boxSizing = "border-box";
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    };
    _this.getElementId = function(element) {
      return "".concat(_this.instancePrefix, "-").concat(element);
    };
    _this.getComponents = function() {
      return defaultComponents(_this.props);
    };
    _this.buildCategorizedOptions = function() {
      return buildCategorizedOptions(_this.props, _this.state.selectValue);
    };
    _this.getCategorizedOptions = function() {
      return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
    };
    _this.buildFocusableOptions = function() {
      return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
    };
    _this.getFocusableOptions = function() {
      return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
    };
    _this.ariaOnChange = function(value, actionMeta) {
      _this.setState({
        ariaSelection: _objectSpread2({
          value
        }, actionMeta)
      });
    };
    _this.onMenuMouseDown = function(event) {
      if (event.button !== 0) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      _this.focusInput();
    };
    _this.onMenuMouseMove = function(event) {
      _this.blockOptionHover = false;
    };
    _this.onControlMouseDown = function(event) {
      if (event.defaultPrevented) {
        return;
      }
      var openMenuOnClick = _this.props.openMenuOnClick;
      if (!_this.state.isFocused) {
        if (openMenuOnClick) {
          _this.openAfterFocus = true;
        }
        _this.focusInput();
      } else if (!_this.props.menuIsOpen) {
        if (openMenuOnClick) {
          _this.openMenu("first");
        }
      } else {
        if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
          _this.onMenuClose();
        }
      }
      if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
        event.preventDefault();
      }
    };
    _this.onDropdownIndicatorMouseDown = function(event) {
      if (event && event.type === "mousedown" && event.button !== 0) {
        return;
      }
      if (_this.props.isDisabled)
        return;
      var _this$props4 = _this.props, isMulti = _this$props4.isMulti, menuIsOpen = _this$props4.menuIsOpen;
      _this.focusInput();
      if (menuIsOpen) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });
        _this.onMenuClose();
      } else {
        _this.openMenu("first");
      }
      event.preventDefault();
    };
    _this.onClearIndicatorMouseDown = function(event) {
      if (event && event.type === "mousedown" && event.button !== 0) {
        return;
      }
      _this.clearValue();
      event.preventDefault();
      _this.openAfterFocus = false;
      if (event.type === "touchend") {
        _this.focusInput();
      } else {
        setTimeout(function() {
          return _this.focusInput();
        });
      }
    };
    _this.onScroll = function(event) {
      if (typeof _this.props.closeMenuOnScroll === "boolean") {
        if (event.target instanceof HTMLElement && isDocumentElement(event.target)) {
          _this.props.onMenuClose();
        }
      } else if (typeof _this.props.closeMenuOnScroll === "function") {
        if (_this.props.closeMenuOnScroll(event)) {
          _this.props.onMenuClose();
        }
      }
    };
    _this.onCompositionStart = function() {
      _this.isComposing = true;
    };
    _this.onCompositionEnd = function() {
      _this.isComposing = false;
    };
    _this.onTouchStart = function(_ref22) {
      var touches = _ref22.touches;
      var touch = touches && touches.item(0);
      if (!touch) {
        return;
      }
      _this.initialTouchX = touch.clientX;
      _this.initialTouchY = touch.clientY;
      _this.userIsDragging = false;
    };
    _this.onTouchMove = function(_ref3) {
      var touches = _ref3.touches;
      var touch = touches && touches.item(0);
      if (!touch) {
        return;
      }
      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
      var moveThreshold = 5;
      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
    };
    _this.onTouchEnd = function(event) {
      if (_this.userIsDragging)
        return;
      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
        _this.blurInput();
      }
      _this.initialTouchX = 0;
      _this.initialTouchY = 0;
    };
    _this.onControlTouchEnd = function(event) {
      if (_this.userIsDragging)
        return;
      _this.onControlMouseDown(event);
    };
    _this.onClearIndicatorTouchEnd = function(event) {
      if (_this.userIsDragging)
        return;
      _this.onClearIndicatorMouseDown(event);
    };
    _this.onDropdownIndicatorTouchEnd = function(event) {
      if (_this.userIsDragging)
        return;
      _this.onDropdownIndicatorMouseDown(event);
    };
    _this.handleInputChange = function(event) {
      var prevInputValue = _this.props.inputValue;
      var inputValue = event.currentTarget.value;
      _this.setState({
        inputIsHiddenAfterUpdate: false
      });
      _this.onInputChange(inputValue, {
        action: "input-change",
        prevInputValue
      });
      if (!_this.props.menuIsOpen) {
        _this.onMenuOpen();
      }
    };
    _this.onInputFocus = function(event) {
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
      _this.setState({
        inputIsHiddenAfterUpdate: false,
        isFocused: true
      });
      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
        _this.openMenu("first");
      }
      _this.openAfterFocus = false;
    };
    _this.onInputBlur = function(event) {
      var prevInputValue = _this.props.inputValue;
      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
        _this.inputRef.focus();
        return;
      }
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
      _this.onInputChange("", {
        action: "input-blur",
        prevInputValue
      });
      _this.onMenuClose();
      _this.setState({
        focusedValue: null,
        isFocused: false
      });
    };
    _this.onOptionHover = function(focusedOption) {
      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
        return;
      }
      _this.setState({
        focusedOption
      });
    };
    _this.shouldHideSelectedOptions = function() {
      return shouldHideSelectedOptions(_this.props);
    };
    _this.onKeyDown = function(event) {
      var _this$props5 = _this.props, isMulti = _this$props5.isMulti, backspaceRemovesValue = _this$props5.backspaceRemovesValue, escapeClearsValue = _this$props5.escapeClearsValue, inputValue = _this$props5.inputValue, isClearable = _this$props5.isClearable, isDisabled = _this$props5.isDisabled, menuIsOpen = _this$props5.menuIsOpen, onKeyDown = _this$props5.onKeyDown, tabSelectsValue = _this$props5.tabSelectsValue, openMenuOnFocus = _this$props5.openMenuOnFocus;
      var _this$state = _this.state, focusedOption = _this$state.focusedOption, focusedValue = _this$state.focusedValue, selectValue = _this$state.selectValue;
      if (isDisabled)
        return;
      if (typeof onKeyDown === "function") {
        onKeyDown(event);
        if (event.defaultPrevented) {
          return;
        }
      }
      _this.blockOptionHover = true;
      switch (event.key) {
        case "ArrowLeft":
          if (!isMulti || inputValue)
            return;
          _this.focusValue("previous");
          break;
        case "ArrowRight":
          if (!isMulti || inputValue)
            return;
          _this.focusValue("next");
          break;
        case "Delete":
        case "Backspace":
          if (inputValue)
            return;
          if (focusedValue) {
            _this.removeValue(focusedValue);
          } else {
            if (!backspaceRemovesValue)
              return;
            if (isMulti) {
              _this.popValue();
            } else if (isClearable) {
              _this.clearValue();
            }
          }
          break;
        case "Tab":
          if (_this.isComposing)
            return;
          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
            return;
          }
          _this.selectOption(focusedOption);
          break;
        case "Enter":
          if (event.keyCode === 229) {
            break;
          }
          if (menuIsOpen) {
            if (!focusedOption)
              return;
            if (_this.isComposing)
              return;
            _this.selectOption(focusedOption);
            break;
          }
          return;
        case "Escape":
          if (menuIsOpen) {
            _this.setState({
              inputIsHiddenAfterUpdate: false
            });
            _this.onInputChange("", {
              action: "menu-close",
              prevInputValue: inputValue
            });
            _this.onMenuClose();
          } else if (isClearable && escapeClearsValue) {
            _this.clearValue();
          }
          break;
        case " ":
          if (inputValue) {
            return;
          }
          if (!menuIsOpen) {
            _this.openMenu("first");
            break;
          }
          if (!focusedOption)
            return;
          _this.selectOption(focusedOption);
          break;
        case "ArrowUp":
          if (menuIsOpen) {
            _this.focusOption("up");
          } else {
            _this.openMenu("last");
          }
          break;
        case "ArrowDown":
          if (menuIsOpen) {
            _this.focusOption("down");
          } else {
            _this.openMenu("first");
          }
          break;
        case "PageUp":
          if (!menuIsOpen)
            return;
          _this.focusOption("pageup");
          break;
        case "PageDown":
          if (!menuIsOpen)
            return;
          _this.focusOption("pagedown");
          break;
        case "Home":
          if (!menuIsOpen)
            return;
          _this.focusOption("first");
          break;
        case "End":
          if (!menuIsOpen)
            return;
          _this.focusOption("last");
          break;
        default:
          return;
      }
      event.preventDefault();
    };
    _this.instancePrefix = "react-select-" + (_this.props.instanceId || ++instanceId);
    _this.state.selectValue = cleanValue(_props.value);
    return _this;
  }
  _createClass(Select2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startListeningComposition();
      this.startListeningToTouch();
      if (this.props.closeMenuOnScroll && document && document.addEventListener) {
        document.addEventListener("scroll", this.onScroll, true);
      }
      if (this.props.autoFocus) {
        this.focusInput();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props, isDisabled = _this$props6.isDisabled, menuIsOpen = _this$props6.menuIsOpen;
      var isFocused = this.state.isFocused;
      if (isFocused && !isDisabled && prevProps.isDisabled || isFocused && menuIsOpen && !prevProps.menuIsOpen) {
        this.focusInput();
      }
      if (isFocused && isDisabled && !prevProps.isDisabled) {
        this.setState({
          isFocused: false
        }, this.onMenuClose);
      }
      if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
        scrollIntoView(this.menuListRef, this.focusedOptionRef);
        this.scrollToFocusedOptionOnUpdate = false;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopListeningComposition();
      this.stopListeningToTouch();
      document.removeEventListener("scroll", this.onScroll, true);
    }
  }, {
    key: "onMenuOpen",
    value: function onMenuOpen() {
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function onMenuClose() {
      this.onInputChange("", {
        action: "menu-close",
        prevInputValue: this.props.inputValue
      });
      this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(newValue, actionMeta) {
      this.props.onInputChange(newValue, actionMeta);
    }
  }, {
    key: "focusInput",
    value: function focusInput() {
      if (!this.inputRef)
        return;
      this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function blurInput() {
      if (!this.inputRef)
        return;
      this.inputRef.blur();
    }
  }, {
    key: "openMenu",
    value: function openMenu(focusOption) {
      var _this2 = this;
      var _this$state2 = this.state, selectValue = _this$state2.selectValue, isFocused = _this$state2.isFocused;
      var focusableOptions = this.buildFocusableOptions();
      var openAtIndex = focusOption === "first" ? 0 : focusableOptions.length - 1;
      if (!this.props.isMulti) {
        var selectedIndex = focusableOptions.indexOf(selectValue[0]);
        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      }
      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
      this.setState({
        inputIsHiddenAfterUpdate: false,
        focusedValue: null,
        focusedOption: focusableOptions[openAtIndex]
      }, function() {
        return _this2.onMenuOpen();
      });
    }
  }, {
    key: "focusValue",
    value: function focusValue(direction) {
      var _this$state3 = this.state, selectValue = _this$state3.selectValue, focusedValue = _this$state3.focusedValue;
      if (!this.props.isMulti)
        return;
      this.setState({
        focusedOption: null
      });
      var focusedIndex = selectValue.indexOf(focusedValue);
      if (!focusedValue) {
        focusedIndex = -1;
      }
      var lastIndex = selectValue.length - 1;
      var nextFocus = -1;
      if (!selectValue.length)
        return;
      switch (direction) {
        case "previous":
          if (focusedIndex === 0) {
            nextFocus = 0;
          } else if (focusedIndex === -1) {
            nextFocus = lastIndex;
          } else {
            nextFocus = focusedIndex - 1;
          }
          break;
        case "next":
          if (focusedIndex > -1 && focusedIndex < lastIndex) {
            nextFocus = focusedIndex + 1;
          }
          break;
      }
      this.setState({
        inputIsHidden: nextFocus !== -1,
        focusedValue: selectValue[nextFocus]
      });
    }
  }, {
    key: "focusOption",
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "first";
      var pageSize = this.props.pageSize;
      var focusedOption = this.state.focusedOption;
      var options2 = this.getFocusableOptions();
      if (!options2.length)
        return;
      var nextFocus = 0;
      var focusedIndex = options2.indexOf(focusedOption);
      if (!focusedOption) {
        focusedIndex = -1;
      }
      if (direction === "up") {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options2.length - 1;
      } else if (direction === "down") {
        nextFocus = (focusedIndex + 1) % options2.length;
      } else if (direction === "pageup") {
        nextFocus = focusedIndex - pageSize;
        if (nextFocus < 0)
          nextFocus = 0;
      } else if (direction === "pagedown") {
        nextFocus = focusedIndex + pageSize;
        if (nextFocus > options2.length - 1)
          nextFocus = options2.length - 1;
      } else if (direction === "last") {
        nextFocus = options2.length - 1;
      }
      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        focusedOption: options2[nextFocus],
        focusedValue: null
      });
    }
  }, {
    key: "getTheme",
    value: function getTheme() {
      if (!this.props.theme) {
        return defaultTheme;
      }
      if (typeof this.props.theme === "function") {
        return this.props.theme(defaultTheme);
      }
      return _objectSpread2(_objectSpread2({}, defaultTheme), this.props.theme);
    }
  }, {
    key: "getCommonProps",
    value: function getCommonProps() {
      var clearValue = this.clearValue, cx2 = this.cx, getStyles = this.getStyles, getValue = this.getValue, selectOption = this.selectOption, setValue = this.setValue, props = this.props;
      var isMulti = props.isMulti, isRtl = props.isRtl, options2 = props.options;
      var hasValue = this.hasValue();
      return {
        clearValue,
        cx: cx2,
        getStyles,
        getValue,
        hasValue,
        isMulti,
        isRtl,
        options: options2,
        selectOption,
        selectProps: props,
        setValue,
        theme: this.getTheme()
      };
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      var selectValue = this.state.selectValue;
      return selectValue.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function hasOptions() {
      return !!this.getFocusableOptions().length;
    }
  }, {
    key: "isClearable",
    value: function isClearable() {
      var _this$props7 = this.props, isClearable2 = _this$props7.isClearable, isMulti = _this$props7.isMulti;
      if (isClearable2 === void 0)
        return isMulti;
      return isClearable2;
    }
  }, {
    key: "isOptionDisabled",
    value: function isOptionDisabled3(option, selectValue) {
      return _isOptionDisabled(this.props, option, selectValue);
    }
  }, {
    key: "isOptionSelected",
    value: function isOptionSelected(option, selectValue) {
      return _isOptionSelected(this.props, option, selectValue);
    }
  }, {
    key: "filterOption",
    value: function filterOption(option, inputValue) {
      return _filterOption(this.props, option, inputValue);
    }
  }, {
    key: "formatOptionLabel",
    value: function formatOptionLabel(data, context) {
      if (typeof this.props.formatOptionLabel === "function") {
        var _inputValue = this.props.inputValue;
        var _selectValue = this.state.selectValue;
        return this.props.formatOptionLabel(data, {
          context,
          inputValue: _inputValue,
          selectValue: _selectValue
        });
      } else {
        return this.getOptionLabel(data);
      }
    }
  }, {
    key: "formatGroupLabel",
    value: function formatGroupLabel3(data) {
      return this.props.formatGroupLabel(data);
    }
  }, {
    key: "startListeningComposition",
    value: function startListeningComposition() {
      if (document && document.addEventListener) {
        document.addEventListener("compositionstart", this.onCompositionStart, false);
        document.addEventListener("compositionend", this.onCompositionEnd, false);
      }
    }
  }, {
    key: "stopListeningComposition",
    value: function stopListeningComposition() {
      if (document && document.removeEventListener) {
        document.removeEventListener("compositionstart", this.onCompositionStart);
        document.removeEventListener("compositionend", this.onCompositionEnd);
      }
    }
  }, {
    key: "startListeningToTouch",
    value: function startListeningToTouch() {
      if (document && document.addEventListener) {
        document.addEventListener("touchstart", this.onTouchStart, false);
        document.addEventListener("touchmove", this.onTouchMove, false);
        document.addEventListener("touchend", this.onTouchEnd, false);
      }
    }
  }, {
    key: "stopListeningToTouch",
    value: function stopListeningToTouch() {
      if (document && document.removeEventListener) {
        document.removeEventListener("touchstart", this.onTouchStart);
        document.removeEventListener("touchmove", this.onTouchMove);
        document.removeEventListener("touchend", this.onTouchEnd);
      }
    }
  }, {
    key: "renderInput",
    value: function renderInput() {
      var _this$props8 = this.props, isDisabled = _this$props8.isDisabled, isSearchable = _this$props8.isSearchable, inputId = _this$props8.inputId, inputValue = _this$props8.inputValue, tabIndex = _this$props8.tabIndex, form = _this$props8.form, menuIsOpen = _this$props8.menuIsOpen;
      var _this$getComponents = this.getComponents(), Input3 = _this$getComponents.Input;
      var _this$state4 = this.state, inputIsHidden = _this$state4.inputIsHidden, ariaSelection = _this$state4.ariaSelection;
      var commonProps = this.commonProps;
      var id = inputId || this.getElementId("input");
      var ariaAttributes = _objectSpread2(_objectSpread2(_objectSpread2({
        "aria-autocomplete": "list",
        "aria-expanded": menuIsOpen,
        "aria-haspopup": true,
        "aria-errormessage": this.props["aria-errormessage"],
        "aria-invalid": this.props["aria-invalid"],
        "aria-label": this.props["aria-label"],
        "aria-labelledby": this.props["aria-labelledby"],
        role: "combobox"
      }, menuIsOpen && {
        "aria-controls": this.getElementId("listbox"),
        "aria-owns": this.getElementId("listbox")
      }), !isSearchable && {
        "aria-readonly": true
      }), this.hasValue() ? (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus" && {
        "aria-describedby": this.getElementId("live-region")
      } : {
        "aria-describedby": this.getElementId("placeholder")
      });
      if (!isSearchable) {
        return /* @__PURE__ */ react.exports.createElement(DummyInput, _extends$4({
          id,
          innerRef: this.getInputRef,
          onBlur: this.onInputBlur,
          onChange: noop,
          onFocus: this.onInputFocus,
          disabled: isDisabled,
          tabIndex,
          inputMode: "none",
          form,
          value: ""
        }, ariaAttributes));
      }
      return /* @__PURE__ */ react.exports.createElement(Input3, _extends$4({}, commonProps, {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        id,
        innerRef: this.getInputRef,
        isDisabled,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        spellCheck: "false",
        tabIndex,
        form,
        type: "text",
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: "renderPlaceholderOrValue",
    value: function renderPlaceholderOrValue() {
      var _this3 = this;
      var _this$getComponents2 = this.getComponents(), MultiValue3 = _this$getComponents2.MultiValue, MultiValueContainer2 = _this$getComponents2.MultiValueContainer, MultiValueLabel2 = _this$getComponents2.MultiValueLabel, MultiValueRemove2 = _this$getComponents2.MultiValueRemove, SingleValue3 = _this$getComponents2.SingleValue, Placeholder3 = _this$getComponents2.Placeholder;
      var commonProps = this.commonProps;
      var _this$props9 = this.props, controlShouldRenderValue = _this$props9.controlShouldRenderValue, isDisabled = _this$props9.isDisabled, isMulti = _this$props9.isMulti, inputValue = _this$props9.inputValue, placeholder = _this$props9.placeholder;
      var _this$state5 = this.state, selectValue = _this$state5.selectValue, focusedValue = _this$state5.focusedValue, isFocused = _this$state5.isFocused;
      if (!this.hasValue() || !controlShouldRenderValue) {
        return inputValue ? null : /* @__PURE__ */ react.exports.createElement(Placeholder3, _extends$4({}, commonProps, {
          key: "placeholder",
          isDisabled,
          isFocused,
          innerProps: {
            id: this.getElementId("placeholder")
          }
        }), placeholder);
      }
      if (isMulti) {
        return selectValue.map(function(opt, index) {
          var isOptionFocused = opt === focusedValue;
          var key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
          return /* @__PURE__ */ react.exports.createElement(MultiValue3, _extends$4({}, commonProps, {
            components: {
              Container: MultiValueContainer2,
              Label: MultiValueLabel2,
              Remove: MultiValueRemove2
            },
            isFocused: isOptionFocused,
            isDisabled,
            key,
            index,
            removeProps: {
              onClick: function onClick() {
                return _this3.removeValue(opt);
              },
              onTouchEnd: function onTouchEnd() {
                return _this3.removeValue(opt);
              },
              onMouseDown: function onMouseDown(e) {
                e.preventDefault();
              }
            },
            data: opt
          }), _this3.formatOptionLabel(opt, "value"));
        });
      }
      if (inputValue) {
        return null;
      }
      var singleValue = selectValue[0];
      return /* @__PURE__ */ react.exports.createElement(SingleValue3, _extends$4({}, commonProps, {
        data: singleValue,
        isDisabled
      }), this.formatOptionLabel(singleValue, "value"));
    }
  }, {
    key: "renderClearIndicator",
    value: function renderClearIndicator() {
      var _this$getComponents3 = this.getComponents(), ClearIndicator3 = _this$getComponents3.ClearIndicator;
      var commonProps = this.commonProps;
      var _this$props10 = this.props, isDisabled = _this$props10.isDisabled, isLoading = _this$props10.isLoading;
      var isFocused = this.state.isFocused;
      if (!this.isClearable() || !ClearIndicator3 || isDisabled || !this.hasValue() || isLoading) {
        return null;
      }
      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ react.exports.createElement(ClearIndicator3, _extends$4({}, commonProps, {
        innerProps,
        isFocused
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function renderLoadingIndicator() {
      var _this$getComponents4 = this.getComponents(), LoadingIndicator3 = _this$getComponents4.LoadingIndicator;
      var commonProps = this.commonProps;
      var _this$props11 = this.props, isDisabled = _this$props11.isDisabled, isLoading = _this$props11.isLoading;
      var isFocused = this.state.isFocused;
      if (!LoadingIndicator3 || !isLoading)
        return null;
      var innerProps = {
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ react.exports.createElement(LoadingIndicator3, _extends$4({}, commonProps, {
        innerProps,
        isDisabled,
        isFocused
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function renderIndicatorSeparator() {
      var _this$getComponents5 = this.getComponents(), DropdownIndicator3 = _this$getComponents5.DropdownIndicator, IndicatorSeparator3 = _this$getComponents5.IndicatorSeparator;
      if (!DropdownIndicator3 || !IndicatorSeparator3)
        return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      return /* @__PURE__ */ react.exports.createElement(IndicatorSeparator3, _extends$4({}, commonProps, {
        isDisabled,
        isFocused
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function renderDropdownIndicator() {
      var _this$getComponents6 = this.getComponents(), DropdownIndicator3 = _this$getComponents6.DropdownIndicator;
      if (!DropdownIndicator3)
        return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      var innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ react.exports.createElement(DropdownIndicator3, _extends$4({}, commonProps, {
        innerProps,
        isDisabled,
        isFocused
      }));
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this4 = this;
      var _this$getComponents7 = this.getComponents(), Group3 = _this$getComponents7.Group, GroupHeading3 = _this$getComponents7.GroupHeading, Menu3 = _this$getComponents7.Menu, MenuList3 = _this$getComponents7.MenuList, MenuPortal2 = _this$getComponents7.MenuPortal, LoadingMessage3 = _this$getComponents7.LoadingMessage, NoOptionsMessage3 = _this$getComponents7.NoOptionsMessage, Option3 = _this$getComponents7.Option;
      var commonProps = this.commonProps;
      var focusedOption = this.state.focusedOption;
      var _this$props12 = this.props, captureMenuScroll = _this$props12.captureMenuScroll, inputValue = _this$props12.inputValue, isLoading = _this$props12.isLoading, loadingMessage2 = _this$props12.loadingMessage, minMenuHeight = _this$props12.minMenuHeight, maxMenuHeight = _this$props12.maxMenuHeight, menuIsOpen = _this$props12.menuIsOpen, menuPlacement = _this$props12.menuPlacement, menuPosition = _this$props12.menuPosition, menuPortalTarget = _this$props12.menuPortalTarget, menuShouldBlockScroll = _this$props12.menuShouldBlockScroll, menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView, noOptionsMessage2 = _this$props12.noOptionsMessage, onMenuScrollToTop = _this$props12.onMenuScrollToTop, onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
      if (!menuIsOpen)
        return null;
      var render = function render2(props, id) {
        var type = props.type, data = props.data, isDisabled = props.isDisabled, isSelected = props.isSelected, label = props.label, value = props.value;
        var isFocused = focusedOption === data;
        var onHover = isDisabled ? void 0 : function() {
          return _this4.onOptionHover(data);
        };
        var onSelect = isDisabled ? void 0 : function() {
          return _this4.selectOption(data);
        };
        var optionId = "".concat(_this4.getElementId("option"), "-").concat(id);
        var innerProps = {
          id: optionId,
          onClick: onSelect,
          onMouseMove: onHover,
          onMouseOver: onHover,
          tabIndex: -1
        };
        return /* @__PURE__ */ react.exports.createElement(Option3, _extends$4({}, commonProps, {
          innerProps,
          data,
          isDisabled,
          isSelected,
          key: optionId,
          label,
          type,
          value,
          isFocused,
          innerRef: isFocused ? _this4.getFocusedOptionRef : void 0
        }), _this4.formatOptionLabel(props.data, "menu"));
      };
      var menuUI;
      if (this.hasOptions()) {
        menuUI = this.getCategorizedOptions().map(function(item) {
          if (item.type === "group") {
            var _data = item.data, options2 = item.options, groupIndex = item.index;
            var groupId = "".concat(_this4.getElementId("group"), "-").concat(groupIndex);
            var headingId = "".concat(groupId, "-heading");
            return /* @__PURE__ */ react.exports.createElement(Group3, _extends$4({}, commonProps, {
              key: groupId,
              data: _data,
              options: options2,
              Heading: GroupHeading3,
              headingProps: {
                id: headingId,
                data: item.data
              },
              label: _this4.formatGroupLabel(item.data)
            }), item.options.map(function(option) {
              return render(option, "".concat(groupIndex, "-").concat(option.index));
            }));
          } else if (item.type === "option") {
            return render(item, "".concat(item.index));
          }
        });
      } else if (isLoading) {
        var message = loadingMessage2({
          inputValue
        });
        if (message === null)
          return null;
        menuUI = /* @__PURE__ */ react.exports.createElement(LoadingMessage3, commonProps, message);
      } else {
        var _message = noOptionsMessage2({
          inputValue
        });
        if (_message === null)
          return null;
        menuUI = /* @__PURE__ */ react.exports.createElement(NoOptionsMessage3, commonProps, _message);
      }
      var menuPlacementProps = {
        minMenuHeight,
        maxMenuHeight,
        menuPlacement,
        menuPosition,
        menuShouldScrollIntoView
      };
      var menuElement = /* @__PURE__ */ react.exports.createElement(MenuPlacer, _extends$4({}, commonProps, menuPlacementProps), function(_ref4) {
        var ref = _ref4.ref, _ref4$placerProps = _ref4.placerProps, placement = _ref4$placerProps.placement, maxHeight = _ref4$placerProps.maxHeight;
        return /* @__PURE__ */ react.exports.createElement(Menu3, _extends$4({}, commonProps, menuPlacementProps, {
          innerRef: ref,
          innerProps: {
            onMouseDown: _this4.onMenuMouseDown,
            onMouseMove: _this4.onMenuMouseMove,
            id: _this4.getElementId("listbox")
          },
          isLoading,
          placement
        }), /* @__PURE__ */ react.exports.createElement(ScrollManager, {
          captureEnabled: captureMenuScroll,
          onTopArrive: onMenuScrollToTop,
          onBottomArrive: onMenuScrollToBottom,
          lockEnabled: menuShouldBlockScroll
        }, function(scrollTargetRef) {
          return /* @__PURE__ */ react.exports.createElement(MenuList3, _extends$4({}, commonProps, {
            innerRef: function innerRef(instance) {
              _this4.getMenuListRef(instance);
              scrollTargetRef(instance);
            },
            isLoading,
            maxHeight,
            focusedOption
          }), menuUI);
        }));
      });
      return menuPortalTarget || menuPosition === "fixed" ? /* @__PURE__ */ react.exports.createElement(MenuPortal2, _extends$4({}, commonProps, {
        appendTo: menuPortalTarget,
        controlElement: this.controlRef,
        menuPlacement,
        menuPosition
      }), menuElement) : menuElement;
    }
  }, {
    key: "renderFormField",
    value: function renderFormField() {
      var _this5 = this;
      var _this$props13 = this.props, delimiter2 = _this$props13.delimiter, isDisabled = _this$props13.isDisabled, isMulti = _this$props13.isMulti, name = _this$props13.name;
      var selectValue = this.state.selectValue;
      if (!name || isDisabled)
        return;
      if (isMulti) {
        if (delimiter2) {
          var value = selectValue.map(function(opt) {
            return _this5.getOptionValue(opt);
          }).join(delimiter2);
          return /* @__PURE__ */ react.exports.createElement("input", {
            name,
            type: "hidden",
            value
          });
        } else {
          var input = selectValue.length > 0 ? selectValue.map(function(opt, i) {
            return /* @__PURE__ */ react.exports.createElement("input", {
              key: "i-".concat(i),
              name,
              type: "hidden",
              value: _this5.getOptionValue(opt)
            });
          }) : /* @__PURE__ */ react.exports.createElement("input", {
            name,
            type: "hidden"
          });
          return /* @__PURE__ */ react.exports.createElement("div", null, input);
        }
      } else {
        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : "";
        return /* @__PURE__ */ react.exports.createElement("input", {
          name,
          type: "hidden",
          value: _value
        });
      }
    }
  }, {
    key: "renderLiveRegion",
    value: function renderLiveRegion() {
      var commonProps = this.commonProps;
      var _this$state6 = this.state, ariaSelection = _this$state6.ariaSelection, focusedOption = _this$state6.focusedOption, focusedValue = _this$state6.focusedValue, isFocused = _this$state6.isFocused, selectValue = _this$state6.selectValue;
      var focusableOptions = this.getFocusableOptions();
      return /* @__PURE__ */ react.exports.createElement(LiveRegion, _extends$4({}, commonProps, {
        id: this.getElementId("live-region"),
        ariaSelection,
        focusedOption,
        focusedValue,
        isFocused,
        selectValue,
        focusableOptions
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$getComponents8 = this.getComponents(), Control3 = _this$getComponents8.Control, IndicatorsContainer3 = _this$getComponents8.IndicatorsContainer, SelectContainer3 = _this$getComponents8.SelectContainer, ValueContainer3 = _this$getComponents8.ValueContainer;
      var _this$props14 = this.props, className = _this$props14.className, id = _this$props14.id, isDisabled = _this$props14.isDisabled, menuIsOpen = _this$props14.menuIsOpen;
      var isFocused = this.state.isFocused;
      var commonProps = this.commonProps = this.getCommonProps();
      return /* @__PURE__ */ react.exports.createElement(SelectContainer3, _extends$4({}, commonProps, {
        className,
        innerProps: {
          id,
          onKeyDown: this.onKeyDown
        },
        isDisabled,
        isFocused
      }), this.renderLiveRegion(), /* @__PURE__ */ react.exports.createElement(Control3, _extends$4({}, commonProps, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled,
        isFocused,
        menuIsOpen
      }), /* @__PURE__ */ react.exports.createElement(ValueContainer3, _extends$4({}, commonProps, {
        isDisabled
      }), this.renderPlaceholderOrValue(), this.renderInput()), /* @__PURE__ */ react.exports.createElement(IndicatorsContainer3, _extends$4({}, commonProps, {
        isDisabled
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevProps = state.prevProps, clearFocusValueOnUpdate = state.clearFocusValueOnUpdate, inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate, ariaSelection = state.ariaSelection, isFocused = state.isFocused, prevWasFocused = state.prevWasFocused;
      var options2 = props.options, value = props.value, menuIsOpen = props.menuIsOpen, inputValue = props.inputValue, isMulti = props.isMulti;
      var selectValue = cleanValue(value);
      var newMenuOptionsState = {};
      if (prevProps && (value !== prevProps.value || options2 !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
        var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
        var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
        var focusedOption = getNextFocusedOption(state, focusableOptions);
        newMenuOptionsState = {
          selectValue,
          focusedOption,
          focusedValue,
          clearFocusValueOnUpdate: false
        };
      }
      var newInputIsHiddenState = inputIsHiddenAfterUpdate != null && props !== prevProps ? {
        inputIsHidden: inputIsHiddenAfterUpdate,
        inputIsHiddenAfterUpdate: void 0
      } : {};
      var newAriaSelection = ariaSelection;
      var hasKeptFocus = isFocused && prevWasFocused;
      if (isFocused && !hasKeptFocus) {
        newAriaSelection = {
          value: valueTernary(isMulti, selectValue, selectValue[0] || null),
          options: selectValue,
          action: "initial-input-focus"
        };
        hasKeptFocus = !prevWasFocused;
      }
      if ((ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus") {
        newAriaSelection = null;
      }
      return _objectSpread2(_objectSpread2(_objectSpread2({}, newMenuOptionsState), newInputIsHiddenState), {}, {
        prevProps: props,
        ariaSelection: newAriaSelection,
        prevWasFocused: hasKeptFocus
      });
    }
  }]);
  return Select2;
}(react.exports.Component);
Select$1.defaultProps = defaultProps;
var StateManagedSelect = /* @__PURE__ */ react.exports.forwardRef(function(props, ref) {
  var baseSelectProps = useStateManager(props);
  return /* @__PURE__ */ react.exports.createElement(Select$1, _extends$4({
    ref
  }, baseSelectProps));
});
var Select = StateManagedSelect;
var reactSwitch = { exports: {} };
var reactSwitch_dev = {};
var _jsxFileName$9 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/node_modules/react-switch/dist/react-switch.dev.js";
var _jsxDEV = jsxDevRuntime.exports.jsxDEV;
Object.defineProperty(reactSwitch_dev, "__esModule", {
  value: true
});
var React = react.exports;
var PropTypes = propTypes$6.exports;
var uncheckedIcon = /* @__PURE__ */ _jsxDEV("svg", {
  viewBox: "-2 -5 14 20",
  height: "100%",
  width: "100%",
  style: {
    position: "absolute",
    top: 0
  },
  children: /* @__PURE__ */ _jsxDEV("path", {
    d: "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",
    fill: "#fff",
    fillRule: "evenodd"
  }, void 0, false, {
    fileName: _jsxFileName$9,
    lineNumber: 55,
    columnNumber: 4
  }, commonjsGlobal)
}, void 0, false, {
  fileName: _jsxFileName$9,
  lineNumber: 47,
  columnNumber: 21
}, commonjsGlobal);
var checkedIcon = /* @__PURE__ */ _jsxDEV("svg", {
  height: "100%",
  width: "100%",
  viewBox: "-2 -5 17 21",
  style: {
    position: "absolute",
    top: 0
  },
  children: /* @__PURE__ */ _jsxDEV("path", {
    d: "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",
    fill: "#fff",
    fillRule: "evenodd"
  }, void 0, false, {
    fileName: _jsxFileName$9,
    lineNumber: 68,
    columnNumber: 4
  }, commonjsGlobal)
}, void 0, false, {
  fileName: _jsxFileName$9,
  lineNumber: 60,
  columnNumber: 19
}, commonjsGlobal);
function createBackgroundColor(pos, checkedPos, uncheckedPos, offColor, onColor) {
  var relativePos = (pos - uncheckedPos) / (checkedPos - uncheckedPos);
  if (relativePos === 0) {
    return offColor;
  }
  if (relativePos === 1) {
    return onColor;
  }
  var newColor = "#";
  for (var i = 1; i < 6; i += 2) {
    var offComponent = parseInt(offColor.substr(i, 2), 16);
    var onComponent = parseInt(onColor.substr(i, 2), 16);
    var weightedValue = Math.round((1 - relativePos) * offComponent + relativePos * onComponent);
    var newComponent = weightedValue.toString(16);
    if (newComponent.length === 1) {
      newComponent = "0" + newComponent;
    }
    newColor += newComponent;
  }
  return newColor;
}
function convertShorthandColor(color) {
  if (color.length === 7) {
    return color;
  }
  var sixDigitColor = "#";
  for (var i = 1; i < 4; i += 1) {
    sixDigitColor += color[i] + color[i];
  }
  return sixDigitColor;
}
function getBackgroundColor(pos, checkedPos, uncheckedPos, offColor, onColor) {
  var sixDigitOffColor = convertShorthandColor(offColor);
  var sixDigitOnColor = convertShorthandColor(onColor);
  return createBackgroundColor(pos, checkedPos, uncheckedPos, sixDigitOffColor, sixDigitOnColor);
}
var hexColorPropType = function(props, propName, componentName) {
  var prop = props[propName];
  if (typeof prop !== "string" || prop[0] !== "#" || prop.length !== 4 && prop.length !== 7) {
    return new Error("Invalid prop '" + propName + "' supplied to '" + componentName + "'. '" + propName + "' has to be either a 3-digit or 6-digit hex-color string. Valid examples: '#abc', '#123456'");
  }
  return null;
};
function objectWithoutProperties(obj, exclude) {
  var target = {};
  for (var k2 in obj)
    if (Object.prototype.hasOwnProperty.call(obj, k2) && exclude.indexOf(k2) === -1)
      target[k2] = obj[k2];
  return target;
}
var ReactSwitch = /* @__PURE__ */ function(Component) {
  function ReactSwitch2(props) {
    Component.call(this, props);
    var height = props.height;
    var width = props.width;
    var handleDiameter = props.handleDiameter;
    var checked = props.checked;
    this.$handleDiameter = handleDiameter || height - 2;
    this.$checkedPos = Math.max(width - height, width - (height + this.$handleDiameter) / 2);
    this.$uncheckedPos = Math.max(0, (height - this.$handleDiameter) / 2);
    this.state = {
      $pos: checked ? this.$checkedPos : this.$uncheckedPos
    };
    this.$lastDragAt = 0;
    this.$lastKeyUpAt = 0;
    this.$onMouseDown = this.$onMouseDown.bind(this);
    this.$onMouseMove = this.$onMouseMove.bind(this);
    this.$onMouseUp = this.$onMouseUp.bind(this);
    this.$onTouchStart = this.$onTouchStart.bind(this);
    this.$onTouchMove = this.$onTouchMove.bind(this);
    this.$onTouchEnd = this.$onTouchEnd.bind(this);
    this.$onClick = this.$onClick.bind(this);
    this.$onInputChange = this.$onInputChange.bind(this);
    this.$onKeyUp = this.$onKeyUp.bind(this);
    this.$setHasOutline = this.$setHasOutline.bind(this);
    this.$unsetHasOutline = this.$unsetHasOutline.bind(this);
    this.$getInputRef = this.$getInputRef.bind(this);
  }
  if (Component)
    ReactSwitch2.__proto__ = Component;
  ReactSwitch2.prototype = Object.create(Component && Component.prototype);
  ReactSwitch2.prototype.constructor = ReactSwitch2;
  ReactSwitch2.prototype.componentDidMount = function componentDidMount() {
    this.$isMounted = true;
  };
  ReactSwitch2.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.checked === this.props.checked) {
      return;
    }
    var $pos = this.props.checked ? this.$checkedPos : this.$uncheckedPos;
    this.setState({
      $pos
    });
  };
  ReactSwitch2.prototype.componentWillUnmount = function componentWillUnmount() {
    this.$isMounted = false;
  };
  ReactSwitch2.prototype.$onDragStart = function $onDragStart(clientX) {
    this.$inputRef.focus();
    this.setState({
      $startX: clientX,
      $hasOutline: true,
      $dragStartingTime: Date.now()
    });
  };
  ReactSwitch2.prototype.$onDrag = function $onDrag(clientX) {
    var ref = this.state;
    var $startX = ref.$startX;
    var $isDragging = ref.$isDragging;
    var $pos = ref.$pos;
    var ref$1 = this.props;
    var checked = ref$1.checked;
    var startPos = checked ? this.$checkedPos : this.$uncheckedPos;
    var mousePos = startPos + clientX - $startX;
    if (!$isDragging && clientX !== $startX) {
      this.setState({
        $isDragging: true
      });
    }
    var newPos = Math.min(this.$checkedPos, Math.max(this.$uncheckedPos, mousePos));
    if (newPos !== $pos) {
      this.setState({
        $pos: newPos
      });
    }
  };
  ReactSwitch2.prototype.$onDragStop = function $onDragStop(event) {
    var ref = this.state;
    var $pos = ref.$pos;
    var $isDragging = ref.$isDragging;
    var $dragStartingTime = ref.$dragStartingTime;
    var ref$1 = this.props;
    var checked = ref$1.checked;
    var halfwayCheckpoint = (this.$checkedPos + this.$uncheckedPos) / 2;
    var prevPos = this.props.checked ? this.$checkedPos : this.$uncheckedPos;
    this.setState({
      $pos: prevPos
    });
    var timeSinceStart = Date.now() - $dragStartingTime;
    var isSimulatedClick = !$isDragging || timeSinceStart < 250;
    var isDraggedHalfway = checked && $pos <= halfwayCheckpoint || !checked && $pos >= halfwayCheckpoint;
    if (isSimulatedClick || isDraggedHalfway) {
      this.$onChange(event);
    }
    if (this.$isMounted) {
      this.setState({
        $isDragging: false,
        $hasOutline: false
      });
    }
    this.$lastDragAt = Date.now();
  };
  ReactSwitch2.prototype.$onMouseDown = function $onMouseDown(event) {
    event.preventDefault();
    if (typeof event.button === "number" && event.button !== 0) {
      return;
    }
    this.$onDragStart(event.clientX);
    window.addEventListener("mousemove", this.$onMouseMove);
    window.addEventListener("mouseup", this.$onMouseUp);
  };
  ReactSwitch2.prototype.$onMouseMove = function $onMouseMove(event) {
    event.preventDefault();
    this.$onDrag(event.clientX);
  };
  ReactSwitch2.prototype.$onMouseUp = function $onMouseUp(event) {
    this.$onDragStop(event);
    window.removeEventListener("mousemove", this.$onMouseMove);
    window.removeEventListener("mouseup", this.$onMouseUp);
  };
  ReactSwitch2.prototype.$onTouchStart = function $onTouchStart(event) {
    this.$checkedStateFromDragging = null;
    this.$onDragStart(event.touches[0].clientX);
  };
  ReactSwitch2.prototype.$onTouchMove = function $onTouchMove(event) {
    this.$onDrag(event.touches[0].clientX);
  };
  ReactSwitch2.prototype.$onTouchEnd = function $onTouchEnd(event) {
    event.preventDefault();
    this.$onDragStop(event);
  };
  ReactSwitch2.prototype.$onInputChange = function $onInputChange(event) {
    if (Date.now() - this.$lastDragAt > 50) {
      this.$onChange(event);
      if (Date.now() - this.$lastKeyUpAt > 50) {
        if (this.$isMounted) {
          this.setState({
            $hasOutline: false
          });
        }
      }
    }
  };
  ReactSwitch2.prototype.$onKeyUp = function $onKeyUp() {
    this.$lastKeyUpAt = Date.now();
  };
  ReactSwitch2.prototype.$setHasOutline = function $setHasOutline() {
    this.setState({
      $hasOutline: true
    });
  };
  ReactSwitch2.prototype.$unsetHasOutline = function $unsetHasOutline() {
    this.setState({
      $hasOutline: false
    });
  };
  ReactSwitch2.prototype.$getInputRef = function $getInputRef(el) {
    this.$inputRef = el;
  };
  ReactSwitch2.prototype.$onClick = function $onClick(event) {
    event.preventDefault();
    this.$inputRef.focus();
    this.$onChange(event);
    if (this.$isMounted) {
      this.setState({
        $hasOutline: false
      });
    }
  };
  ReactSwitch2.prototype.$onChange = function $onChange(event) {
    var ref = this.props;
    var checked = ref.checked;
    var onChange2 = ref.onChange;
    var id = ref.id;
    onChange2(!checked, event, id);
  };
  ReactSwitch2.prototype.render = function render() {
    var ref = this.props;
    var checked = ref.checked;
    var disabled = ref.disabled;
    var className = ref.className;
    var offColor = ref.offColor;
    var onColor = ref.onColor;
    var offHandleColor = ref.offHandleColor;
    var onHandleColor = ref.onHandleColor;
    var checkedIcon2 = ref.checkedIcon;
    var uncheckedIcon2 = ref.uncheckedIcon;
    var checkedHandleIcon = ref.checkedHandleIcon;
    var uncheckedHandleIcon = ref.uncheckedHandleIcon;
    var boxShadow = ref.boxShadow;
    var activeBoxShadow = ref.activeBoxShadow;
    var height = ref.height;
    var width = ref.width;
    var borderRadius2 = ref.borderRadius;
    ref.handleDiameter;
    var rest$1 = objectWithoutProperties(ref, ["checked", "disabled", "className", "offColor", "onColor", "offHandleColor", "onHandleColor", "checkedIcon", "uncheckedIcon", "checkedHandleIcon", "uncheckedHandleIcon", "boxShadow", "activeBoxShadow", "height", "width", "borderRadius", "handleDiameter"]);
    var rest = rest$1;
    var ref$1 = this.state;
    var $pos = ref$1.$pos;
    var $isDragging = ref$1.$isDragging;
    var $hasOutline = ref$1.$hasOutline;
    var rootStyle = {
      position: "relative",
      display: "inline-block",
      textAlign: "left",
      opacity: disabled ? 0.5 : 1,
      direction: "ltr",
      borderRadius: height / 2,
      WebkitTransition: "opacity 0.25s",
      MozTransition: "opacity 0.25s",
      transition: "opacity 0.25s",
      touchAction: "none",
      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none"
    };
    var backgroundStyle = {
      height,
      width,
      margin: Math.max(0, (this.$handleDiameter - height) / 2),
      position: "relative",
      background: getBackgroundColor($pos, this.$checkedPos, this.$uncheckedPos, offColor, onColor),
      borderRadius: typeof borderRadius2 === "number" ? borderRadius2 : height / 2,
      cursor: disabled ? "default" : "pointer",
      WebkitTransition: $isDragging ? null : "background 0.25s",
      MozTransition: $isDragging ? null : "background 0.25s",
      transition: $isDragging ? null : "background 0.25s"
    };
    var checkedIconStyle = {
      height,
      width: Math.min(height * 1.5, width - (this.$handleDiameter + height) / 2 + 1),
      position: "relative",
      opacity: ($pos - this.$uncheckedPos) / (this.$checkedPos - this.$uncheckedPos),
      pointerEvents: "none",
      WebkitTransition: $isDragging ? null : "opacity 0.25s",
      MozTransition: $isDragging ? null : "opacity 0.25s",
      transition: $isDragging ? null : "opacity 0.25s"
    };
    var uncheckedIconStyle = {
      height,
      width: Math.min(height * 1.5, width - (this.$handleDiameter + height) / 2 + 1),
      position: "absolute",
      opacity: 1 - ($pos - this.$uncheckedPos) / (this.$checkedPos - this.$uncheckedPos),
      right: 0,
      top: 0,
      pointerEvents: "none",
      WebkitTransition: $isDragging ? null : "opacity 0.25s",
      MozTransition: $isDragging ? null : "opacity 0.25s",
      transition: $isDragging ? null : "opacity 0.25s"
    };
    var handleStyle = {
      height: this.$handleDiameter,
      width: this.$handleDiameter,
      background: getBackgroundColor($pos, this.$checkedPos, this.$uncheckedPos, offHandleColor, onHandleColor),
      display: "inline-block",
      cursor: disabled ? "default" : "pointer",
      borderRadius: typeof borderRadius2 === "number" ? borderRadius2 - 1 : "50%",
      position: "absolute",
      transform: "translateX(" + $pos + "px)",
      top: Math.max(0, (height - this.$handleDiameter) / 2),
      outline: 0,
      boxShadow: $hasOutline ? activeBoxShadow : boxShadow,
      border: 0,
      WebkitTransition: $isDragging ? null : "background-color 0.25s, transform 0.25s, box-shadow 0.15s",
      MozTransition: $isDragging ? null : "background-color 0.25s, transform 0.25s, box-shadow 0.15s",
      transition: $isDragging ? null : "background-color 0.25s, transform 0.25s, box-shadow 0.15s"
    };
    var uncheckedHandleIconStyle = {
      height: this.$handleDiameter,
      width: this.$handleDiameter,
      opacity: Math.max((1 - ($pos - this.$uncheckedPos) / (this.$checkedPos - this.$uncheckedPos) - 0.5) * 2, 0),
      position: "absolute",
      left: 0,
      top: 0,
      pointerEvents: "none",
      WebkitTransition: $isDragging ? null : "opacity 0.25s",
      MozTransition: $isDragging ? null : "opacity 0.25s",
      transition: $isDragging ? null : "opacity 0.25s"
    };
    var checkedHandleIconStyle = {
      height: this.$handleDiameter,
      width: this.$handleDiameter,
      opacity: Math.max((($pos - this.$uncheckedPos) / (this.$checkedPos - this.$uncheckedPos) - 0.5) * 2, 0),
      position: "absolute",
      left: 0,
      top: 0,
      pointerEvents: "none",
      WebkitTransition: $isDragging ? null : "opacity 0.25s",
      MozTransition: $isDragging ? null : "opacity 0.25s",
      transition: $isDragging ? null : "opacity 0.25s"
    };
    var inputStyle3 = {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: 1
    };
    return /* @__PURE__ */ _jsxDEV("div", {
      className,
      style: rootStyle,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: "react-switch-bg",
        style: backgroundStyle,
        onClick: disabled ? null : this.$onClick,
        onMouseDown: function(e) {
          return e.preventDefault();
        },
        children: [checkedIcon2 && /* @__PURE__ */ _jsxDEV("div", {
          style: checkedIconStyle,
          children: checkedIcon2
        }, void 0, false, {
          fileName: _jsxFileName$9,
          lineNumber: 495,
          columnNumber: 23
        }, this), uncheckedIcon2 && /* @__PURE__ */ _jsxDEV("div", {
          style: uncheckedIconStyle,
          children: uncheckedIcon2
        }, void 0, false, {
          fileName: _jsxFileName$9,
          lineNumber: 497,
          columnNumber: 39
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName$9,
        lineNumber: 488,
        columnNumber: 8
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: "react-switch-handle",
        style: handleStyle,
        onClick: function(e) {
          return e.preventDefault();
        },
        onMouseDown: disabled ? null : this.$onMouseDown,
        onTouchStart: disabled ? null : this.$onTouchStart,
        onTouchMove: disabled ? null : this.$onTouchMove,
        onTouchEnd: disabled ? null : this.$onTouchEnd,
        onTouchCancel: disabled ? null : this.$unsetHasOutline,
        children: [uncheckedHandleIcon && /* @__PURE__ */ _jsxDEV("div", {
          style: uncheckedHandleIconStyle,
          children: uncheckedHandleIcon
        }, void 0, false, {
          fileName: _jsxFileName$9,
          lineNumber: 510,
          columnNumber: 31
        }, this), checkedHandleIcon && /* @__PURE__ */ _jsxDEV("div", {
          style: checkedHandleIconStyle,
          children: checkedHandleIcon
        }, void 0, false, {
          fileName: _jsxFileName$9,
          lineNumber: 512,
          columnNumber: 51
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName$9,
        lineNumber: 499,
        columnNumber: 25
      }, this), /* @__PURE__ */ _jsxDEV("input", __spreadProps(__spreadValues({
        type: "checkbox",
        role: "switch",
        "aria-checked": checked,
        checked,
        disabled,
        style: inputStyle3
      }, rest), {
        ref: this.$getInputRef,
        onFocus: this.$setHasOutline,
        onBlur: this.$unsetHasOutline,
        onKeyUp: this.$onKeyUp,
        onChange: this.$onInputChange
      }), void 0, false, {
        fileName: _jsxFileName$9,
        lineNumber: 514,
        columnNumber: 29
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName$9,
      lineNumber: 485,
      columnNumber: 12
    }, this);
  };
  return ReactSwitch2;
}(React.Component);
ReactSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  offColor: hexColorPropType,
  onColor: hexColorPropType,
  offHandleColor: hexColorPropType,
  onHandleColor: hexColorPropType,
  handleDiameter: PropTypes.number,
  uncheckedIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  checkedIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  boxShadow: PropTypes.string,
  borderRadius: PropTypes.number,
  activeBoxShadow: PropTypes.string,
  uncheckedHandleIcon: PropTypes.element,
  checkedHandleIcon: PropTypes.element,
  height: PropTypes.number,
  width: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string
};
ReactSwitch.defaultProps = {
  disabled: false,
  offColor: "#888",
  onColor: "#080",
  offHandleColor: "#fff",
  onHandleColor: "#fff",
  uncheckedIcon,
  checkedIcon,
  boxShadow: null,
  activeBoxShadow: "0 0 2px 3px #3bf",
  height: 28,
  width: 56
};
reactSwitch_dev.default = ReactSwitch;
{
  reactSwitch.exports = reactSwitch_dev;
}
var Switch = reactSwitch.exports;
var _jsxFileName$8 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/components/Checkbox.jsx";
const Checkbox = ({
  id,
  label,
  value,
  onChange: onChange2
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: "wpwax-vm-checkbox",
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
      id,
      type: "checkbox",
      checked: value,
      onChange: onChange2
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 4,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
      htmlFor: id,
      children: label
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 10,
      columnNumber: 13
    }, globalThis)]
  }, void 0, true, {
    fileName: _jsxFileName$8,
    lineNumber: 3,
    columnNumber: 9
  }, globalThis);
};
var _jsxFileName$7 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/components/Radio.jsx";
const Radio = ({
  id,
  name,
  label,
  value,
  onChange: onChange2
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: "wpwax-vm-radio",
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
      id,
      name,
      type: "radio",
      value,
      onChange: onChange2
    }, void 0, false, {
      fileName: _jsxFileName$7,
      lineNumber: 4,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
      htmlFor: id,
      children: label
    }, void 0, false, {
      fileName: _jsxFileName$7,
      lineNumber: 11,
      columnNumber: 13
    }, globalThis)]
  }, void 0, true, {
    fileName: _jsxFileName$7,
    lineNumber: 3,
    columnNumber: 9
  }, globalThis);
};
const GeneralSettingWrap = Styled.div`
    
`;
const FormSettingsWrap = Styled.div`
    
`;
const ThankSettingsWrap = Styled.div`
    
`;
const PreviewWrap = Styled.div`
    width: 420px;
    min-height: 640px;
    z-index: 10;
    position: relative;
    word-break: break-all;
    padding-top: 0;
    color: var(--color-white);
    .wpwax-vm-media-preview{
        position: absolute;
        left: -90%;
        top: -160px;
        height: 210px;
        &:after{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .50);
            z-index: 0;
            border-radius: 12px;
            content: '';
        }
        .wpwax-vm-media-preview__replace{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 15px;
            z-index: 10;
            svg{
                margin-right: 6px;
            }
        }
    }
    .wpwax-vm-preview-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .wpwax-vm-preview-header{
        .wpwax-vm-preview-title{
            font-size: 24px;
            font-weight: 600;
            line-height: 1.25;
            color: #ffffff;
            margin-bottom: 15px;
            max-width: 320px;
        }
        .wpwax-vm-preview-subtitle{
            font-size: 15px;
            font-weight: 500;
            opacity: .8;
        }
    }
    .wpwax-vm-preview-inner{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 140px 0 50px;
    }
    .wpwax-vm-btn-play{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        border-radius: 50%;
        text-decoration: none;
        background-color: var(--color-white);
        i{
            width: 30px;
            height: 30px;
            color: var(--color-primary);
            &:before{
                font-size: 30px;
            }
        }
    }
    .wpwax-vm-preview-footer{
        .wpwax-vm-preview-footer__title{
            font-size: 18px;
            font-weight: 600;
            text-align: center;
        }
        .wpwax-vm-preview-footer__actions{
            display: flex;
            flex-wrap: wrap;
            margin: -10px;
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                min-height: 46px;
                flex: 0 0 48%;
                margin: 1%;
            }
        }
        .wpwax-vm-preview-footer__text{
            font-size: 13px;
            font-weight: 500;
            opacity: .8;
            margin: 15px 0 0;
            text-align: center;
        }
    }
    .wpwax-vm-preview-general{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        padding: 270px 30px;
        background-color: var(--color-dark);
        p{
            font-size: 20px;
            font-weight: 500;
            opacity: .4;
        }
    }
    .wpwax-vm-preview-from{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        border-radius: 25px;
        padding: 30px;
        /* margin: 10px 0 -35px; */
        background-color: var(--color-dark);
    }
    .wpwax-vm-preview-thank{
        display: flex; 
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 155px 0 30px;
        border-radius: 25px;
        background-color: var(--color-white);
        .wpwax-vm-preview-thank__content{
            text-align: center;
            max-width: 370px;
            margin: 0 auto;
            h3{
                font-size: 30px;
                font-weight: 600;
                line-height: 1.07;
                color: var(--color-dark);
            }
            p{
                font-size: 16px;
                font-weight: 500;
                line-height: 1.625;
                color: #4D4D4D;
            }
        }
        .wpwax-vm-preview-thank__botttom{
            margin-top: 200px;
            padding: 0 20px;
        }
    }
`;
var _jsxFileName$6 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/addForm/components/AddForm/overview/GeneralSettings.jsx";
const templateOptions$1 = [{
  value: "chat",
  label: "Chat"
}, {
  value: "video",
  label: "Video"
}, {
  value: "Issue",
  label: "Issue"
}];
const GeneralSettings = () => {
  const {
    formInitialData
  } = useSelector((state2) => {
    return {
      formInitialData: state2.form.data
    };
  });
  react.exports.useState({
    pageVisibility: formInitialData.all_page_visibility,
    accountVisibility: formInitialData.all_page_visibility
  });
  const Option3 = (props) => {
    return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(components.Option, __spreadProps(__spreadValues({}, props), {
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Checkbox, {
          id: `wpwax-vm${props.label}`,
          label: props.label
        }, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 30,
          columnNumber: 15
        }, globalThis)
      }), void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 29,
        columnNumber: 13
      }, globalThis)
    }, void 0, false, {
      fileName: _jsxFileName$6,
      lineNumber: 28,
      columnNumber: 11
    }, globalThis);
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(GeneralSettingWrap, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Name of Form"
        }, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 51,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 50,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
        type: "text",
        className: "wpwax-vm-form__element",
        id: "wpwax-vm-form-name"
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 53,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$6,
      lineNumber: 49,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: ["Template ", /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            className: "wpwax-vm-tooltip",
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("i", {
              className: "dashicons"
            }, void 0, false, {
              fileName: _jsxFileName$6,
              lineNumber: 57,
              columnNumber: 71
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 57,
            columnNumber: 36
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$6,
          lineNumber: 57,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 56,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
        type: "text",
        className: "wpwax-vm-form__element",
        id: "wpwax-vm-form-name"
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 59,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$6,
      lineNumber: 55,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Display on all pages"
        }, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 63,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {}, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 64,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$6,
        lineNumber: 62,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
        type: "text",
        className: "wpwax-vm-form__element",
        id: "wpwax-vm-form-name"
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 80,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$6,
      lineNumber: 61,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Display on custom pages"
        }, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 84,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 83,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Select, {
        className: "my-class",
        options: templateOptions$1,
        isMulti: true,
        closeMenuOnSelect: false,
        hideSelectedOptions: false,
        searchable: false,
        menuIsOpen: true,
        components: {
          Option: Option3
        },
        allowSelectAll: true
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 86,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$6,
      lineNumber: 82,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Create account first"
        }, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 102,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 101,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-chekbox-list",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-chekbox-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Name"
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 119,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Checkbox, {
            id: "account-name",
            label: ""
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 120,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$6,
          lineNumber: 118,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-chekbox-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Email"
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 123,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Checkbox, {
            id: "account-email",
            label: ""
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 124,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$6,
          lineNumber: 122,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-chekbox-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Password"
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 127,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Checkbox, {
            id: "account-password",
            label: ""
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 128,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$6,
          lineNumber: 126,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$6,
        lineNumber: 117,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$6,
      lineNumber: 100,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Close chat option"
        }, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 134,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 133,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-radio-list",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-radio-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "If closed never show again"
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 138,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Radio, {
            id: "wpwax-vm-never-show",
            label: "",
            name: "wpwax-vm-close-option"
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 139,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$6,
          lineNumber: 137,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-radio-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Show on reload"
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 142,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Radio, {
            id: "wpwax-vm-load-show",
            label: "",
            name: "wpwax-vm-close-option"
          }, void 0, false, {
            fileName: _jsxFileName$6,
            lineNumber: 143,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$6,
          lineNumber: 141,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$6,
        lineNumber: 136,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$6,
      lineNumber: 132,
      columnNumber: 13
    }, globalThis)]
  }, void 0, true, {
    fileName: _jsxFileName$6,
    lineNumber: 48,
    columnNumber: 9
  }, globalThis);
};
const {
  formReadBegin,
  formReadSuccess,
  addFormBegin,
  addFormSuccess,
  formReadErr,
  addFormErr
} = actions;
const onFormEdit = (data) => {
  console.log(data);
  return (dispatch) => __async(this, null, function* () {
    try {
      dispatch(formReadBegin());
      console.log(data);
      dispatch(formReadSuccess(data));
    } catch (err) {
      dispatch(formReadErr(err));
    }
  });
};
var _jsxFileName$5 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/addForm/components/AddForm/overview/FormSettings.jsx";
const fontSizeOptions = [{
  value: "roboto",
  label: "Roboto"
}, {
  value: "inter",
  label: "Inter"
}, {
  value: "legend",
  label: "Legend"
}];
const fontOptions = [{
  value: "large",
  label: "large"
}, {
  value: "larger",
  label: "larger"
}, {
  value: "x-large",
  label: "x-large"
}, {
  value: "xx-large",
  label: "xx-large"
}, {
  value: "medium",
  label: "medium"
}, {
  value: "small",
  label: "small"
}, {
  value: "smaller",
  label: "smaller"
}, {
  value: "x-small",
  label: "x-small"
}];
const FormSettings = () => {
  const {
    formData: formData2,
    formInitialData
  } = useSelector((state2) => {
    return {
      formData: state2.form.data,
      formInitialData: state2.form.data[0]
    };
  });
  const [state, setState] = react.exports.useState({
    id: formInitialData.form_id,
    grettingMessage: formInitialData.greet_message,
    descriptionVisibility: formInitialData.description_visibility,
    description: formInitialData.description,
    chatTitle: formInitialData.chat_box_title,
    replyTypeVideo: formInitialData.reply_type_video,
    replyTypeScreenRecord: formInitialData.reply_type_screen_record,
    replyTypeVoice: formInitialData.reply_type_voice,
    replyTypeText: formInitialData.reply_type_text,
    titleColor: formInitialData.font_color,
    buttonColor: formInitialData.button_color,
    buttonRadius: formInitialData.button_border_radius,
    footerVisibility: formInitialData.footer_visibility,
    footerMessage: formInitialData.footer_message,
    openCollapse: true
  });
  const {
    id,
    grettingMessage,
    descriptionVisibility,
    description,
    chatTitle,
    replyTypeVideo,
    replyTypeScreenRecord,
    replyTypeVoice,
    replyTypeText,
    titleColor,
    buttonColor,
    buttonRadius,
    footerVisibility,
    footerMessage,
    openCollapse
  } = state;
  const dispatch = useDispatch();
  const updateForm = (label, value) => {
    let updatedData = formData2.map((item) => {
      if (item.form_id === id) {
        switch (label) {
          case "greet":
            item.greet_message = value;
            break;
          case "des-visibility":
            item.description_visibility = value;
            break;
          case "description":
            item.thank_page_description = value;
            break;
          case "chat-title":
            item.chat_box_title = value;
            break;
          case "video-visibility":
            item.reply_type_video = value;
            break;
          case "screen-record-visibility":
            item.reply_type_screen_record = value;
            break;
          case "voice-visibility":
            item.reply_type_voice = value;
            break;
          case "replyText-visibility":
            item.reply_type_text = value;
            break;
          case "title-color":
            item.font_color = value;
            break;
          case "button-color":
            item.button_color = value;
            break;
          case "button-radius":
            item.button_border_radius = value;
            break;
          case "footer-visibility":
            item.footer_visibility = value;
            break;
          case "footer-text":
            item.footer_message = value;
            break;
        }
        return item;
      }
      return item;
    });
    dispatch(onFormEdit(updatedData));
  };
  const changeGreet = (event) => {
    let greetMessage = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      grettingMessage: greetMessage
    }));
    updateForm("greet", greetMessage);
  };
  const changeDescriptionVisibillity = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      descriptionVisibility: !descriptionVisibility
    }));
    updateForm("des-visibility", !descriptionVisibility);
  };
  const changeChatTitle = (event) => {
    let chatTitleText = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      chatTitle: chatTitleText
    }));
    updateForm("chat-title", chatTitleText);
  };
  const changeVideoVisibility = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      replyTypeVideo: !replyTypeVideo
    }));
    updateForm("video-visibility", !replyTypeVideo);
  };
  const changeScreenRecordVisibility = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      replyTypeScreenRecord: !replyTypeScreenRecord
    }));
    updateForm("screen-record-visibility", !replyTypeScreenRecord);
  };
  const changeVoiceVisibility = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      replyTypeVoice: !replyTypeVoice
    }));
    updateForm("voice-visibility", !replyTypeVoice);
  };
  const changeReplyTextVisibility = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      replyTypeText: !replyTypeText
    }));
    updateForm("replyText-visibility", !replyTypeText);
  };
  const changeFooterVisibility = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      footerVisibility: !footerVisibility
    }));
    updateForm("footer-visibility", !footerVisibility);
  };
  const changeFooterMessage = (event) => {
    let footerMessageText = event.target.value;
    console.log(footerMessage);
    setState(__spreadProps(__spreadValues({}, state), {
      footerMessage: footerMessageText
    }));
    updateForm("footer-text", footerMessageText);
  };
  const changeTitleColor = (event) => {
    let titleColor2 = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      titleColor: titleColor2
    }));
    updateForm("title-color", titleColor2);
  };
  const changeButtonColor = (event) => {
    let buttonColor2 = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      buttonColor: buttonColor2
    }));
    updateForm("button-color", buttonColor2);
  };
  const changeButtonRadius = (event) => {
    let buttonRadius2 = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      buttonRadius: buttonRadius2
    }));
    updateForm("button-radius", buttonRadius2);
  };
  const toogleCollapse = (e) => {
    e.preventDefault();
    setState(__spreadProps(__spreadValues({}, state), {
      openCollapse: !openCollapse
    }));
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FormSettingsWrap, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Add an image/video or Record a video"
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 206,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 205,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-uploader",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          className: "wpwax-vm-btn wpwax-vm-media-btn wpwax-vm-upload-trigger",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
            type: "file",
            id: "wpwax-vm-media-upload"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 210,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
            htmlFor: "wpwax-vm-media-upload",
            children: "Add image/video"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 211,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 209,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          className: "wpwax-vm-seperation",
          children: "or"
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 213,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
          href: "#",
          className: "wpwax-vm-btn wpwax-vm-media-btn wpwax-vm-media-recorder",
          children: "Record a video"
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 214,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$5,
        lineNumber: 208,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$5,
      lineNumber: 204,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Greetings message "
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 219,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 218,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("textarea", {
        className: "wpwax-vm-form__element",
        value: grettingMessage,
        onChange: (e) => changeGreet(e)
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 221,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$5,
      lineNumber: 217,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Description"
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 225,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
          children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
            uncheckedIcon: false,
            checkedIcon: false,
            onColor: "#6551F2",
            offColor: "#E2E2E2",
            onHandleColor: "#FFFFFF",
            className: "wpwax-vm-switch",
            handleDiameter: 14,
            height: 22,
            width: 40,
            checked: descriptionVisibility,
            onChange: changeDescriptionVisibillity
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 227,
            columnNumber: 25
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 226,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$5,
        lineNumber: 224,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("textarea", {
        className: "wpwax-vm-form__element",
        value: description
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 242,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$5,
      lineNumber: 223,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
        type: "text",
        className: "wpwax-vm-form__element",
        value: chatTitle,
        onChange: changeChatTitle
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 245,
        columnNumber: 17
      }, globalThis)
    }, void 0, false, {
      fileName: _jsxFileName$5,
      lineNumber: 244,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Users can reply in"
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 249,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 248,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-switch-list",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-switch-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Videos"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 253,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
            uncheckedIcon: false,
            checkedIcon: false,
            onColor: "#6551F2",
            offColor: "#E2E2E2",
            onHandleColor: "#FFFFFF",
            className: "wpwax-vm-switch",
            handleDiameter: 14,
            height: 22,
            width: 40,
            checked: replyTypeVideo,
            onChange: changeVideoVisibility
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 254,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 252,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-switch-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Screen Recording"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 269,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
            uncheckedIcon: false,
            checkedIcon: false,
            onColor: "#6551F2",
            offColor: "#E2E2E2",
            onHandleColor: "#FFFFFF",
            className: "wpwax-vm-switch",
            handleDiameter: 14,
            height: 22,
            width: 40,
            checked: replyTypeScreenRecord,
            onChange: changeScreenRecordVisibility
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 270,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 268,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-switch-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Voice"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 285,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
            uncheckedIcon: false,
            checkedIcon: false,
            onColor: "#6551F2",
            offColor: "#E2E2E2",
            onHandleColor: "#FFFFFF",
            className: "wpwax-vm-switch",
            handleDiameter: 14,
            height: 22,
            width: 40,
            checked: replyTypeVoice,
            onChange: changeVoiceVisibility
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 286,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 284,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-switch-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Text"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 301,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
            uncheckedIcon: false,
            checkedIcon: false,
            onColor: "#6551F2",
            offColor: "#E2E2E2",
            onHandleColor: "#FFFFFF",
            className: "wpwax-vm-switch",
            handleDiameter: 14,
            height: 22,
            width: 40,
            checked: replyTypeText,
            onChange: changeReplyTextVisibility
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 302,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 300,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$5,
        lineNumber: 251,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$5,
      lineNumber: 247,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Footer Message "
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 320,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
          uncheckedIcon: false,
          checkedIcon: false,
          onColor: "#6551F2",
          offColor: "#E2E2E2",
          onHandleColor: "#FFFFFF",
          className: "wpwax-vm-switch",
          handleDiameter: 14,
          height: 22,
          width: 40,
          checked: footerVisibility,
          onChange: changeFooterVisibility
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 321,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$5,
        lineNumber: 319,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("textarea", {
        className: "wpwax-vm-form__element",
        value: footerMessage,
        onChange: (e) => changeFooterMessage(e)
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 335,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$5,
      lineNumber: 318,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Customize"
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 339,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
          href: "",
          className: openCollapse ? "wpwax-vm-btn-collapsable wpwax-vm-open" : "wpwax-vm-btn-collapsable",
          onClick: (e) => toogleCollapse(e),
          children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            className: "dashicons-arrow-down-alt2 dashicons"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 340,
            columnNumber: 159
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 340,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$5,
        lineNumber: 338,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: openCollapse ? "wpwax-vm-form-group__input-list wpwax-vm-show" : "wpwax-vm-form-group__input-list wpwax-vm-hide",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: " Font"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 344,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Select, {
            options: fontOptions,
            closeMenuOnSelect: true,
            hideSelectedOptions: false,
            searchable: false
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 345,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 343,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: " Font Size"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 354,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Select, {
            options: fontSizeOptions,
            closeMenuOnSelect: true,
            hideSelectedOptions: false,
            searchable: false
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 355,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 353,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Font color"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 364,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-form__color-plate",
            children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
              className: "wpwax-vm-form__color-text",
              children: titleColor
            }, void 0, false, {
              fileName: _jsxFileName$5,
              lineNumber: 366,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
              htmlFor: "wpwax-vm-form-title-color",
              className: "wpwax-vm-form__color-ball",
              style: {
                backgroundColor: titleColor
              }
            }, void 0, false, {
              fileName: _jsxFileName$5,
              lineNumber: 367,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
              type: "color",
              id: "wpwax-vm-form-title-color",
              className: "wpwax-vm-form__element",
              value: titleColor,
              onChange: (e) => changeTitleColor(e)
            }, void 0, false, {
              fileName: _jsxFileName$5,
              lineNumber: 368,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$5,
            lineNumber: 365,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 363,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Button color"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 372,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-form__color-plate",
            children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
              className: "wpwax-vm-form__color-text",
              children: buttonColor
            }, void 0, false, {
              fileName: _jsxFileName$5,
              lineNumber: 374,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
              htmlFor: "wpwax-vm-form-button-color",
              className: "wpwax-vm-form__color-ball",
              style: {
                backgroundColor: buttonColor
              }
            }, void 0, false, {
              fileName: _jsxFileName$5,
              lineNumber: 375,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
              type: "color",
              id: "wpwax-vm-form-button-color",
              className: "wpwax-vm-form__element",
              value: buttonColor,
              onChange: (e) => changeButtonColor(e)
            }, void 0, false, {
              fileName: _jsxFileName$5,
              lineNumber: 376,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$5,
            lineNumber: 373,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 371,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Button border-radius"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 380,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-form__color-plate",
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
              type: "text",
              className: "wpwax-vm-form__element",
              value: buttonRadius,
              onChange: (e) => changeButtonRadius(e)
            }, void 0, false, {
              fileName: _jsxFileName$5,
              lineNumber: 382,
              columnNumber: 29
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 381,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 379,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$5,
        lineNumber: 342,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$5,
      lineNumber: 337,
      columnNumber: 13
    }, globalThis)]
  }, void 0, true, {
    fileName: _jsxFileName$5,
    lineNumber: 203,
    columnNumber: 9
  }, globalThis);
};
var _jsxFileName$4 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/addForm/components/AddForm/overview/ThankSettings.jsx";
const templateOptions = [{
  value: "large",
  label: "large"
}, {
  value: "larger",
  label: "larger"
}, {
  value: "x-large",
  label: "x-large"
}, {
  value: "xx-large",
  label: "xx-large"
}, {
  value: "medium",
  label: "medium"
}, {
  value: "small",
  label: "small"
}, {
  value: "smaller",
  label: "smaller"
}, {
  value: "x-small",
  label: "x-small"
}];
const ThankSettings = () => {
  const {
    formData: formData2,
    formInitialData
  } = useSelector((state2) => {
    return {
      formData: state2.form.data,
      formInitialData: state2.form.data[0]
    };
  });
  const [state, setState] = react.exports.useState({
    id: formInitialData.form_id,
    collectInfoVisibility: formInitialData.info_collection_visibility,
    pageVisibility: formInitialData.all_page_visibility,
    accountVisibility: formInitialData.all_page_visibility,
    title: formInitialData.thank_page_title,
    descriptionVisibility: formInitialData.thank_page_description_Visibility,
    description: formInitialData.thank_page_description,
    buttonVisibility: formInitialData.thank_page_button_visibility,
    buttonText: formInitialData.thank_page_button_text,
    buttonUrl: formInitialData.thank_page_button_url,
    bgColor: formInitialData.thank_page_background,
    titleFontSize: formInitialData.thank_page_title_font_size,
    fontColor: formInitialData.thank_page_font_color,
    buttonColor: formInitialData.thank_page_button_color,
    buttonTextColor: formInitialData.thank_page_button_text_color,
    buttonRadius: formInitialData.thank_page_button_radius
  });
  const {
    id,
    collectInfoVisibility,
    pageVisibility,
    accountVisibility,
    title,
    descriptionVisibility,
    description,
    buttonVisibility,
    buttonText,
    buttonUrl,
    colorPicker,
    bgColor,
    titleFontSize,
    fontColor,
    buttonColor,
    buttonTextColor,
    buttonRadius
  } = state;
  const dispatch = useDispatch();
  const updateForm = (label, value) => {
    let updatedData = formData2.map((item) => {
      if (item.form_id === id) {
        switch (label) {
          case "title":
            item.thank_page_title = value;
            break;
          case "title-size":
            item.thank_page_title_font_size = value;
            break;
          case "des-visibility":
            item.thank_page_description_Visibility = value;
            break;
          case "description":
            item.thank_page_description = value;
            break;
          case "btn-visibility":
            item.thank_page_button_visibility = value;
            break;
          case "btn-text":
            item.thank_page_button_text = value;
            break;
          case "btn-url":
            item.thank_page_button_url = value;
            break;
          case "bg-color":
            item.thank_page_background = value;
            break;
          case "font-color":
            item.thank_page_font_color = value;
            break;
          case "button-color":
            item.thank_page_button_color = value;
            break;
          case "button-text-color":
            item.thank_page_button_text_color = value;
            break;
          case "button-radius":
            item.thank_page_button_radius = value;
            break;
        }
        return item;
      }
      return item;
    });
    dispatch(onFormEdit(updatedData));
  };
  const changePageVisibility = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      pageVisibility: !pageVisibility
    }));
  };
  const changeBgColor = (event) => {
    let thankBgColor = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      bgColor: thankBgColor
    }));
    updateForm("bg-color", thankBgColor);
  };
  const changeFontColor = (event) => {
    let thankFontColor = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      fontColor: thankFontColor
    }));
    updateForm("font-color", thankFontColor);
  };
  const changeButtonColor = (event) => {
    let thankButtonColor = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      buttonColor: thankButtonColor
    }));
    updateForm("button-color", thankButtonColor);
  };
  const changeButtonTextColor = (event) => {
    let thankButtonTextColor = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      buttonTextColor: thankButtonTextColor
    }));
    updateForm("button-text-color", thankButtonTextColor);
  };
  const changeButtonRadius = (event) => {
    let thankButtonRadius = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      buttonRadius: thankButtonRadius
    }));
    updateForm("button-radius", thankButtonRadius);
  };
  const changeTItle = (event) => {
    let thankTitle = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      title: thankTitle
    }));
    updateForm("title", thankTitle);
  };
  const chagneTitleFontSize = (selectedSize) => {
    console.log(selectedSize.value);
    setState(__spreadProps(__spreadValues({}, state), {
      titleFontSize: selectedSize.value
    }));
    updateForm("title-size", selectedSize.value);
  };
  const changeDescriptionVisibility = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      descriptionVisibility: !descriptionVisibility
    }));
    updateForm("des-visibility", !descriptionVisibility);
  };
  const changeDescription = (event) => {
    let thankDescription = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      description: thankDescription
    }));
    updateForm("description", thankDescription);
  };
  const changeButtonVisibility = () => {
    setState(__spreadProps(__spreadValues({}, state), {
      buttonVisibility: !buttonVisibility
    }));
    updateForm("btn-visibility", !buttonVisibility);
  };
  const changeButtonText = (event) => {
    let thankBtnText = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      buttonText: thankBtnText
    }));
    updateForm("btn-text", thankBtnText);
  };
  const changeButtonUrl = (event) => {
    let thankBtnUrl = event.target.value;
    setState(__spreadProps(__spreadValues({}, state), {
      buttonText: thankBtnUrl
    }));
    updateForm("btn-url", thankBtnUrl);
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ThankSettingsWrap, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Collect info"
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 203,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
          children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
            uncheckedIcon: false,
            checkedIcon: false,
            onColor: "#6551F2",
            offColor: "#E2E2E2",
            onHandleColor: "#FFFFFF",
            className: "wpwax-vm-switch",
            handleDiameter: 14,
            height: 22,
            width: 40,
            checked: pageVisibility,
            onChange: changePageVisibility
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 205,
            columnNumber: 25
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 204,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$4,
        lineNumber: 202,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-chekbox-list",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-chekbox-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Name"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 222,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Checkbox, {
            id: "contact-name",
            label: ""
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 223,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 221,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-chekbox-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Email"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 226,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Checkbox, {
            id: "contact-email",
            label: ""
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 227,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 225,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-chekbox-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Phone Number"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 230,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Checkbox, {
            id: "contact-password",
            label: ""
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 231,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 229,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$4,
        lineNumber: 220,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$4,
      lineNumber: 201,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Title"
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 237,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 236,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("textarea", {
        className: "wpwax-vm-form__element",
        value: title,
        onChange: (e) => changeTItle(e)
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 239,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$4,
      lineNumber: 235,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Description"
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 243,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
          children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
            uncheckedIcon: false,
            checkedIcon: false,
            onColor: "#6551F2",
            offColor: "#E2E2E2",
            onHandleColor: "#FFFFFF",
            className: "wpwax-vm-switch",
            handleDiameter: 14,
            height: 22,
            width: 40,
            checked: descriptionVisibility,
            onChange: changeDescriptionVisibility
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 245,
            columnNumber: 25
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 244,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$4,
        lineNumber: 242,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("textarea", {
        className: "wpwax-vm-form__element",
        value: description,
        onChange: (e) => changeDescription(e)
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 260,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$4,
      lineNumber: 241,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Add buttons"
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 264,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Switch, {
          uncheckedIcon: false,
          checkedIcon: false,
          onColor: "#6551F2",
          offColor: "#E2E2E2",
          onHandleColor: "#FFFFFF",
          className: "wpwax-vm-switch",
          handleDiameter: 14,
          height: 22,
          width: 40,
          checked: buttonVisibility,
          onChange: changeButtonVisibility
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 265,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$4,
        lineNumber: 263,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__input-list wpwax-vm-addbtn-style",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Button text"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 281,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
            type: "text",
            className: "wpwax-vm-form__element",
            value: buttonText,
            onChange: (e) => changeButtonText(e)
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 282,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 280,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Button URL"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 285,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
            type: "url",
            className: "wpwax-vm-form__element",
            value: buttonUrl,
            onChange: (e) => changeButtonUrl(e)
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 286,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 284,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$4,
        lineNumber: 279,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$4,
      lineNumber: 262,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-form-group",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__label",
        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
          children: "Customize"
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 292,
          columnNumber: 21
        }, globalThis)
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 291,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-form-group__input-list",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Background Color"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 296,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-form__color-plate",
            children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
              className: "wpwax-vm-form__color-text",
              children: bgColor
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 298,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
              htmlFor: "wpwax-vm-form-bg-color",
              className: "wpwax-vm-form__color-ball",
              style: {
                backgroundColor: bgColor
              }
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 299,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
              type: "color",
              className: "wpwax-vm-form__element",
              id: "wpwax-vm-form-bg-color",
              value: bgColor,
              onChange: (e) => changeBgColor(e)
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 300,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$4,
            lineNumber: 297,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 295,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Title Font size"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 304,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Select, {
            options: templateOptions,
            closeMenuOnSelect: false,
            hideSelectedOptions: false,
            searchable: false,
            onChange: chagneTitleFontSize
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 305,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 303,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Font color"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 314,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-form__color-plate",
            children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
              className: "wpwax-vm-form__color-text",
              children: fontColor
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 316,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
              htmlFor: "wpwax-vm-form-font-color",
              className: "wpwax-vm-form__color-ball",
              style: {
                backgroundColor: fontColor
              }
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 317,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
              type: "color",
              className: "wpwax-vm-form__element",
              id: "wpwax-vm-form-font-color",
              value: fontColor,
              onChange: (e) => changeFontColor(e)
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 318,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$4,
            lineNumber: 315,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 313,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Button color"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 322,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-form__color-plate",
            children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
              className: "wpwax-vm-form__color-text",
              children: buttonColor
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 324,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
              htmlFor: "wpwax-vm-form-button-color",
              className: "wpwax-vm-form__color-ball",
              style: {
                backgroundColor: buttonColor
              }
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 325,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
              type: "color",
              id: "wpwax-vm-form-button-color",
              className: "wpwax-vm-form__element",
              value: buttonColor,
              onChange: (e) => changeButtonColor(e)
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 326,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$4,
            lineNumber: 323,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 321,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Button text color"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 330,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-form__color-plate",
            children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
              className: "wpwax-vm-form__color-text",
              children: buttonTextColor
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 332,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
              htmlFor: "wpwax-vm-form-text-color",
              className: "wpwax-vm-form__color-ball",
              style: {
                backgroundColor: buttonTextColor
              }
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 333,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
              type: "color",
              id: "wpwax-vm-form-text-color",
              className: "wpwax-vm-form__element",
              value: buttonTextColor,
              onChange: (e) => changeButtonTextColor(e)
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 334,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$4,
            lineNumber: 331,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 329,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-form-group__input-single",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            children: "Button border-radius"
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 338,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-form__color-plate",
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
              type: "text",
              className: "wpwax-vm-form__element",
              value: buttonRadius,
              onChange: (e) => changeButtonRadius(e)
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 340,
              columnNumber: 29
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 339,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$4,
          lineNumber: 337,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$4,
        lineNumber: 294,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$4,
      lineNumber: 290,
      columnNumber: 13
    }, globalThis)]
  }, void 0, true, {
    fileName: _jsxFileName$4,
    lineNumber: 200,
    columnNumber: 9
  }, globalThis);
};
var formImg = "/wp-content/plugins/wpwax-video-message/assets/images/form-img.png";
var replaceImg = "/wp-content/plugins/wpwax-video-message/assets/images/replace.svg";
var _jsxFileName$3 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/addForm/components/AddForm/overview/PreviewOne.jsx";
const PreviewOne = ({
  previewStage
}) => {
  const {
    formInitialData
  } = useSelector((state) => {
    return {
      formInitialData: state.form.data[0]
    };
  });
  console.log(typeof formInitialData.thank_page_button_radius);
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(PreviewWrap, {
    children: previewStage === "general" ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-preview-general",
      children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
        children: "No Preview Available"
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 21,
        columnNumber: 21
      }, globalThis)
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 20,
      columnNumber: 17
    }, globalThis) : previewStage === "form" ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(jsxDevRuntime.exports.Fragment, {
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-media-preview",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("img", {
          src: formImg,
          alt: "wpwax Media"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 27,
          columnNumber: 29
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
          href: "#",
          className: "wpwax-vm-btn wpwax-vm-btn-white wpwax-vm-media-preview__replace",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ReactSVG, {
            src: replaceImg
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 28,
            columnNumber: 117
          }, globalThis), "Replace"]
        }, void 0, true, {
          fileName: _jsxFileName$3,
          lineNumber: 28,
          columnNumber: 29
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 26,
        columnNumber: 25
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-preview-from",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-preview-bg"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 31,
          columnNumber: 29
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-preview-header",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("h4", {
            className: "wpwax-vm-preview-title",
            style: {
              color: formInitialData.font_color
            },
            children: formInitialData.greet_message
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 33,
            columnNumber: 33
          }, globalThis), formInitialData.description_visibility ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
            className: "wpwax-vm-preview-subtitle",
            children: formInitialData.description
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 35,
            columnNumber: 37
          }, globalThis) : ""]
        }, void 0, true, {
          fileName: _jsxFileName$3,
          lineNumber: 32,
          columnNumber: 29
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-preview-inner",
          children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
            href: "#",
            className: "wpwax-vm-btn-play",
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("i", {
              className: "dashicons dashicons-controls-play"
            }, void 0, false, {
              fileName: _jsxFileName$3,
              lineNumber: 40,
              columnNumber: 75
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 40,
            columnNumber: 33
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 39,
          columnNumber: 29
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-preview-footer",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("h5", {
            className: "wpwax-vm-preview-footer__title",
            children: formInitialData.chat_box_title
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 43,
            columnNumber: 33
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
            className: "wpwax-vm-preview-footer__actions",
            children: [formInitialData.reply_type_video ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
              href: "#",
              className: "wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary",
              style: {
                borderRadius: `${formInitialData.button_border_radius}px`,
                backgroundColor: `${formInitialData.button_color}`,
                borderColor: `${formInitialData.button_color}`
              },
              children: "Video"
            }, void 0, false, {
              fileName: _jsxFileName$3,
              lineNumber: 47,
              columnNumber: 45
            }, globalThis) : "", formInitialData.reply_type_screen_record ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
              href: "#",
              className: "wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary",
              style: {
                borderRadius: `${formInitialData.button_border_radius}px`,
                backgroundColor: `${formInitialData.button_color}`,
                borderColor: `${formInitialData.button_color}`
              },
              children: "Screen Record"
            }, void 0, false, {
              fileName: _jsxFileName$3,
              lineNumber: 52,
              columnNumber: 45
            }, globalThis) : "", formInitialData.reply_type_voice ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
              href: "#",
              className: "wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary",
              style: {
                borderRadius: `${formInitialData.button_border_radius}px`,
                backgroundColor: `${formInitialData.button_color}`,
                borderColor: `${formInitialData.button_color}`
              },
              children: "Voice"
            }, void 0, false, {
              fileName: _jsxFileName$3,
              lineNumber: 57,
              columnNumber: 45
            }, globalThis) : "", formInitialData.reply_type_text ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
              href: "#",
              className: "wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary",
              style: {
                borderRadius: `${formInitialData.button_border_radius}px`,
                backgroundColor: `${formInitialData.button_color}`,
                borderColor: `${formInitialData.button_color}`
              },
              children: "Text"
            }, void 0, false, {
              fileName: _jsxFileName$3,
              lineNumber: 62,
              columnNumber: 45
            }, globalThis) : ""]
          }, void 0, true, {
            fileName: _jsxFileName$3,
            lineNumber: 44,
            columnNumber: 33
          }, globalThis), formInitialData.footer_visibility ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
            className: "wpwax-vm-preview-footer__text",
            children: formInitialData.footer_message
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 68,
            columnNumber: 37
          }, globalThis) : ""]
        }, void 0, true, {
          fileName: _jsxFileName$3,
          lineNumber: 42,
          columnNumber: 29
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 30,
        columnNumber: 25
      }, globalThis)]
    }, void 0, true) : previewStage === "thank" ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-preview-thank",
      style: {
        backgroundColor: formInitialData.thank_page_background
      },
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-preview-thank__content",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("h3", {
          style: {
            color: formInitialData.thank_page_font_color,
            fontSize: `${formInitialData.thank_page_title_font_size}`
          },
          children: formInitialData.thank_page_title
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 80,
          columnNumber: 25
        }, globalThis), formInitialData.thank_page_description_Visibility ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
          children: formInitialData.thank_page_description
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 83,
          columnNumber: 29
        }, globalThis) : ""]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 79,
        columnNumber: 21
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: "wpwax-vm-preview-thank__botttom",
        children: formInitialData.thank_page_button_visibility ? /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
          className: "wpwax-vm-btn wpwax-vm-btn-primary wpwax-vm-btn-lg wpwax-vm-btn-block",
          style: {
            borderRadius: `${formInitialData.thank_page_button_radius}px`,
            backgroundColor: formInitialData.thank_page_button_color,
            borderColor: formInitialData.thank_page_button_color,
            color: formInitialData.thank_page_button_text_color
          },
          children: formInitialData.thank_page_button_text
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 89,
          columnNumber: 29
        }, globalThis) : ""
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 87,
        columnNumber: 21
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 78,
      columnNumber: 17
    }, globalThis) : ""
  }, void 0, false, {
    fileName: _jsxFileName$3,
    lineNumber: 18,
    columnNumber: 9
  }, globalThis);
};
PreviewOne.propTypes = {
  previewStage: propTypes$5.string
};
const AddFormStyle = Styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 30px;
    .wpwax-vm-add-form{
        position: relative;
        width: 420px;
        border-radius: 14px;
        z-index: 10;
        background-color: var(--color-bg-white);
    }
    .wpwax-vm-form-group{
        &:not(:last-child){
            border-bottom: 1px solid var(--color-border-light);
        }
        .wpwax-vm-form-group__label{
            .wpwax-vm-btn-collapsable{
                text-decoration: none;
                color: #4D4D4D;
                &:focus{
                    outline: none;
                    box-shadow: 0 0;
                }
                &.wpwax-vm-open{
                    .dashicons-arrow-down-alt2 {
                        &:before{
                            content: '\f343';
                        }
                    }
                }
            }
        }
    }
    .wpwax-vm-add-form__tab{
        .wpwax-vm-add-form__top{
            margin: 0;
        }
    }
    .wpwax-vm-add-form__top{
        padding: 20px;
        border-radius: 14px 14px 0 0;
        background-color: var(--color-bg-gray);
        .wpwax-vm-add-form__top--btn{
            display: inline-flex;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
            min-height: 36px;
            padding: 0 16px;
            text-decoration: none;
            border-radius: 8px;
            cursor: pointer;
            color: var(--color-dark);
            &:focus{
                outline: 0 none;
                box-shadow: 0 0;
            }
            &.react-tabs__tab--selected{
                font-weight: 700;
                color: var(--color-white);
                background-color: var(--color-primary);
            }
        }
    }
    .wpwax-vm-add-form__content{
        padding: 25px 30px;
        height: 580px;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            width: 8px;
        }
        &::-webkit-scrollbar-track{
            background-color: var(--color-white);
        }
        &::-webkit-scrollbar-thumb{
            border-radius: 5px;
            height: 200px;
            background-color: var(--color-bg-gray);
        }
        .wpwax-vm-switch-list,
        .wpwax-vm-chekbox-list,
        .wpwax-vm-radio-list{
            margin-top: 18px;
            .wpwax-vm-switch-single,
            .wpwax-vm-chekbox-single,
            .wpwax-vm-radio-single{
                display: flex;
                align-items: center;
                justify-content: space-between;
                &:not(:last-child){
                    margin-bottom: 20px;
                }
                span{
                    font-size: 14px;
                    font-weight: 500;
                    position: relative;
                    top: -2px;
                    line-height: 1;
                    color: var(--color-dark);
                }
            }
        }
        .wpwax-vm-form-group__input-list {
            &.wpwax-vm-addbtn-style{
                .wpwax-vm-form-group__input-single{
                    span{
                        margin-right: 45px;
                    }
                }
            }
            
            &.wpwax-vm-hide{
                display: none;
            }
            &.wpwax-vm-show{
                display: block;
            }
        }
        .wpwax-vm-form-group__input-single{
            display: flex;
            justify-content: space-between;
            &:not(:last-child){
                margin-bottom: 20px;
            }
            span{
                font-size: 14px;
                font-weight: 500;
                display: inline-block;
                margin-right: 15px;
                min-width: 130px;
                color: var(--color-dark);
            }
            .wpwax-vm-form__element{
                flex: 1;
            }
        }
        .wpwax-vm-form__color-plate{
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            flex: 1;
            height: 40px;
            border-radius: 6px;
            background-color: var(--color-bg-general);
            .wpwax-vm-form__color-text{
                padding-left: 15px;
                margin: 0;
            }
            input[type="color"]{
                flex: none;
                appearance: none;
                padding: 0;
                width: 26px;
                min-height: 26px;
                margin-right: 15px;
                border-radius: 50%;
                opacity: 0;
                cursor: pointer;
                &::-webkit-color-swatch-wrapper{
                    padding: 0;
                }
                &::-webkit-color-swatch{
                    border: none
                }
            }
            .wpwax-vm-form__color-ball{
                position: absolute;
                right: 12px;
                top: 6px;
                width: 26px;
                height: 26px;
                border-radius: 50%;
            }
            .block-picker{
                position: absolute !important;
                left: 5px;
                top: 50px;
                z-index: 10;
            }
        }
        .css-26l3qy-menu{
            border-radius: 10px;
            border: 0 none;
            border-radius: 10px;
            padding: 8px;
            margin: 0;
            background-color: var(--color-white);
            box-shadow: 0 6px 40px rgba(144,144,144,.25);
            .css-1n7v3ny-option,
            .css-9gakcf-option{
                border-radius: 8px;
                background-color: var(--color-bg-gray);
                .wpwax-vm-checkbox label{
                    font-size: 13px;
                    font-weight: 400;
                    color: #4D4D4D;
                }
            }
            .css-9gakcf-option{
                border-radius: 8px;
                background-color: var(--color-bg-gray);
            }
            .css-yt9ioa-option{
                .wpwax-vm-checkbox label{
                    font-size: 13px;
                    font-weight: 400;
                    color: #4D4D4D;
                }
            }
        }
        .css-b62m3t-container{
            width: 100%;
            .css-6j8wv5-Input{
                input{
                    &:focus{
                        box-shadow: 0 0;
                    }
                }
            }
        }
        .css-1s2u09g-control{
            border: 0 none;
            background-color: var(--color-bg-general);
        }
        .css-1pahdxg-control{
            border: 0 none;
            box-shadow: 0 0;
            background-color: var(--color-bg-general);
            &:hover{
                border: 0 none;
            }
        }
        .css-1okebmr-indicatorSeparator{
            min-width: auto;
            background-color: transparent;
        }
    }
    .wpwax-vm-add-form__bottom{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 14px 14px;
        padding: 16px 0;
        background-color: var(--color-primary);
        .wpwax-vm-form-save{
            display: flex;
            justify-content: center;
            width: 100%;
            font-size: 17px;
            font-weight: 600;
            text-decoration: none;
            color: var(--color-white);
        }
    }
    .wpwax-vm-preview{
        flex: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 120px;
        margin-left: -70px;
        z-index: 0;
        .wpwax-vm-preview-label{
            font-size: 14px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            margin-bottom: 22px;
            color: #7C7C7C;
            svg{
                position: relative;
                top: 3px;
                margin-right: 5px;
            }
        }
    }
    .wpwax-vm-uploader{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 210px;
        border-radius: 12px;
        border: 1px dashed #BEBEBE;
        background-color: var(--color-bg-general);
        .wpwax-vm-upload-trigger{
            input[type=file]{
                display: none;
            }
        }
        .wpwax-vm-media-btn{
            display: flex;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            min-width: 155px;
            text-align: center;
            color: var(--color-dark);
            background-color: var(--color-white);
        }
        .wpwax-vm-seperation{
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: #898989;
            margin: 7px 0;
        }
    }
`;
var handDownImg = "/wp-content/plugins/wpwax-video-message/assets/images/hand-down.svg";
var _jsxFileName$2 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/addForm/components/AddForm/Index.jsx";
const AddForm$1 = () => {
  const [formStage, setFormStage] = react.exports.useState("general");
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(AddFormStyle, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-add-form",
      children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("form", {
        action: "",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Tabs, {
          className: "wpwax-vm-add-form__tab",
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(TabList, {
            className: "wpwax-vm-add-form__top",
            children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Tab, {
              href: "#",
              className: "wpwax-vm-add-form__top--btn",
              onClick: () => setFormStage("general"),
              children: "General"
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 21,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Tab, {
              href: "#",
              className: "wpwax-vm-add-form__top--btn",
              onClick: () => setFormStage("form"),
              children: "Form Settings"
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 22,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Tab, {
              href: "#",
              className: "wpwax-vm-add-form__top--btn",
              onClick: () => setFormStage("thank"),
              children: "Thank You Page"
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 23,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$2,
            lineNumber: 20,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(TabPanel, {
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
              className: "wpwax-vm-add-form__content",
              children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(GeneralSettings, {}, void 0, false, {
                fileName: _jsxFileName$2,
                lineNumber: 28,
                columnNumber: 33
              }, globalThis)
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 27,
              columnNumber: 29
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 26,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(TabPanel, {
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
              className: "wpwax-vm-add-form__content",
              children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FormSettings, {}, void 0, false, {
                fileName: _jsxFileName$2,
                lineNumber: 33,
                columnNumber: 33
              }, globalThis)
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 32,
              columnNumber: 29
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 31,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(TabPanel, {
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
              className: "wpwax-vm-add-form__content",
              children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ThankSettings, {}, void 0, false, {
                fileName: _jsxFileName$2,
                lineNumber: 38,
                columnNumber: 33
              }, globalThis)
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 37,
              columnNumber: 29
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 36,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$2,
          lineNumber: 19,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-add-form__bottom",
          children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
            href: "#",
            className: "wpwax-vm-form-save",
            children: "Save"
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 45,
            columnNumber: 25
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 44,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 18,
        columnNumber: 17
      }, globalThis)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 17,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-preview",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
        className: "wpwax-vm-preview-label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ReactSVG, {
          src: handDownImg
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 50,
          columnNumber: 58
        }, globalThis), "Preview your changes"]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 50,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(PreviewOne, {
        previewStage: formStage
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 51,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 49,
      columnNumber: 13
    }, globalThis)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 16,
    columnNumber: 9
  }, globalThis);
};
var _jsxFileName$1 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/addForm/App.jsx";
const AddForm = () => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: "wpwax-vm-page-inner",
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(AddForm$1, {}, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 8,
      columnNumber: 4
    }, globalThis)
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 7,
    columnNumber: 9
  }, globalThis);
};
function App() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Provider, {
    store,
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(AddForm, {}, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 16,
      columnNumber: 13
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 15,
    columnNumber: 9
  }, this);
}
var _jsxFileName = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/addForm/index.jsx";
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("wpwax-vm-form-edit");
  if (!container) {
    return;
  }
  const root = createRoot(container);
  root.render(/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(App, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 15
  }, this));
});
//# sourceMappingURL=admin.js.map
