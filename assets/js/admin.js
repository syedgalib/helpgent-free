var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { j as jsxDevRuntime, a as axios, S as Styled, r as react, f as createRoot, g as combineReducers, h as createStore, i as composeWithDevTools, k as applyMiddleware, t as thunk, e as useSelector, l as Select, m as components, u as useDispatch, n as Switch, p as propTypes, R as ReactSVG, T as Tabs, o as TabList, q as Tab, s as TabPanel, P as Provider } from "./vendor.js";
var admin = "";
var classes = ".header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 22px;\n}\n.header .title {\n  font-size: 24px;\n  font-weight: 500;\n}\n.header .btn {\n  margin-left: 20px;\n}";
var Style = "";
var _jsxFileName$d = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/components/pageheader/Index.jsx";
const PageHeader = () => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(jsxDevRuntime.exports.Fragment, {
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: classes.header,
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("h2", {
        className: classes.title,
        children: "All Templates"
      }, void 0, false, {
        fileName: _jsxFileName$d,
        lineNumber: 8,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
        href: location.href + "&mode=edit",
        className: `${classes.btn} wpwax-vm-btn wpwax-vm-btn-dark`,
        children: "Create New"
      }, void 0, false, {
        fileName: _jsxFileName$d,
        lineNumber: 9,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$d,
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
var _jsxFileName$c = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/components/formTable/overview/Table.jsx";
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
          fileName: _jsxFileName$c,
          lineNumber: 183,
          columnNumber: 25
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
          href: "#",
          className: "wpwax-vm-notice__close",
          onClick: removeNotice,
          children: "x"
        }, void 0, false, {
          fileName: _jsxFileName$c,
          lineNumber: 184,
          columnNumber: 25
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$c,
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
              fileName: _jsxFileName$c,
              lineNumber: 192,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("th", {
              className: "wpwax-vm-head-action",
              children: "Action"
            }, void 0, false, {
              fileName: _jsxFileName$c,
              lineNumber: 193,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$c,
            lineNumber: 191,
            columnNumber: 25
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$c,
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
                        fileName: _jsxFileName$c,
                        lineNumber: 207,
                        columnNumber: 57
                      }, globalThis)]
                    }, void 0, true, {
                      fileName: _jsxFileName$c,
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
                        fileName: _jsxFileName$c,
                        lineNumber: 210,
                        columnNumber: 57
                      }, globalThis)
                    }, void 0, false, {
                      fileName: _jsxFileName$c,
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
                          fileName: _jsxFileName$c,
                          lineNumber: 214,
                          columnNumber: 61
                        }, globalThis)
                      }, void 0, false, {
                        fileName: _jsxFileName$c,
                        lineNumber: 213,
                        columnNumber: 57
                      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
                        href: "#",
                        className: editElementIndex === key ? "wpwax-vm-titlebox__editor--yes wpwax-vm-show" : "wpwax-vm-titlebox__editor--yes",
                        onClick: () => saveTableName(value.form_id),
                        children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                          className: "dashicons dashicons-yes"
                        }, void 0, false, {
                          fileName: _jsxFileName$c,
                          lineNumber: 217,
                          columnNumber: 61
                        }, globalThis)
                      }, void 0, false, {
                        fileName: _jsxFileName$c,
                        lineNumber: 216,
                        columnNumber: 57
                      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
                        href: "#",
                        className: editElementIndex === key ? "wpwax-vm-titlebox__editor--edit dashicons dashicons-edit" : "wpwax-vm-titlebox__editor--edit dashicons dashicons-edit wpwax-vm-show",
                        onClick: () => activateeditElementIndex(value.name, key)
                      }, void 0, false, {
                        fileName: _jsxFileName$c,
                        lineNumber: 219,
                        columnNumber: 57
                      }, globalThis)]
                    }, void 0, true, {
                      fileName: _jsxFileName$c,
                      lineNumber: 212,
                      columnNumber: 53
                    }, globalThis)]
                  }, void 0, true, {
                    fileName: _jsxFileName$c,
                    lineNumber: 204,
                    columnNumber: 49
                  }, globalThis)
                }, void 0, false, {
                  fileName: _jsxFileName$c,
                  lineNumber: 203,
                  columnNumber: 45
                }, globalThis)
              }, void 0, false, {
                fileName: _jsxFileName$c,
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
                      fileName: _jsxFileName$c,
                      lineNumber: 226,
                      columnNumber: 106
                    }, globalThis), " Edit"]
                  }, void 0, true, {
                    fileName: _jsxFileName$c,
                    lineNumber: 226,
                    columnNumber: 49
                  }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
                    href: "#",
                    className: "wpwax-vm-btn wpwax-vm-btn-danger",
                    onClick: () => deleteForm(value.form_id),
                    children: [" ", /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
                      className: "dashicons dashicons-trash"
                    }, void 0, false, {
                      fileName: _jsxFileName$c,
                      lineNumber: 227,
                      columnNumber: 148
                    }, globalThis), " Delete"]
                  }, void 0, true, {
                    fileName: _jsxFileName$c,
                    lineNumber: 227,
                    columnNumber: 49
                  }, globalThis)]
                }, void 0, true, {
                  fileName: _jsxFileName$c,
                  lineNumber: 225,
                  columnNumber: 45
                }, globalThis)
              }, void 0, false, {
                fileName: _jsxFileName$c,
                lineNumber: 224,
                columnNumber: 41
              }, globalThis)]
            }, key, true, {
              fileName: _jsxFileName$c,
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
                fileName: _jsxFileName$c,
                lineNumber: 235,
                columnNumber: 37
              }, globalThis)
            }, void 0, false, {
              fileName: _jsxFileName$c,
              lineNumber: 234,
              columnNumber: 33
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$c,
            lineNumber: 233,
            columnNumber: 29
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$c,
          lineNumber: 197,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$c,
        lineNumber: 189,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$c,
      lineNumber: 180,
      columnNumber: 13
    }, globalThis)
  }, void 0, false, {
    fileName: _jsxFileName$c,
    lineNumber: 179,
    columnNumber: 9
  }, globalThis);
};
var _jsxFileName$b = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/components/formTable/Index.jsx";
function FormTable() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(jsxDevRuntime.exports.Fragment, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(PageHeader, {}, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 7,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Table, {}, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 9,
      columnNumber: 4
    }, this)]
  }, void 0, true);
}
var _jsxFileName$a = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/App.jsx";
const BuilderContainer = () => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: "wpwax-vm-page-inner",
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FormTable, {}, void 0, false, {
      fileName: _jsxFileName$a,
      lineNumber: 6,
      columnNumber: 4
    }, globalThis)
  }, void 0, false, {
    fileName: _jsxFileName$a,
    lineNumber: 5,
    columnNumber: 9
  }, globalThis);
};
function App$1() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(BuilderContainer, {}, void 0, false, {
    fileName: _jsxFileName$a,
    lineNumber: 13,
    columnNumber: 9
  }, this);
}
var _jsxFileName$9 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/builder/index.jsx";
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("wpwax-vm-forms");
  if (!container) {
    return;
  }
  const root = createRoot(container);
  root.render(/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(App$1, {}, void 0, false, {
    fileName: _jsxFileName$9,
    lineNumber: 12,
    columnNumber: 15
  }, this));
});
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
var _jsxFileName$8 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/components/Checkbox.jsx";
const Checkbox = ({
  id,
  label,
  value,
  onChange
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: "wpwax-vm-checkbox",
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
      id,
      type: "checkbox",
      checked: value,
      onChange
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
  onChange
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: "wpwax-vm-radio",
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
      id,
      name,
      type: "radio",
      value,
      onChange
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
  const Option = (props) => {
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
          Option
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
  previewStage: propTypes.string
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
              lineNumber: 23,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Tab, {
              href: "#",
              className: "wpwax-vm-add-form__top--btn",
              onClick: () => setFormStage("form"),
              children: "Form Settings"
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 24,
              columnNumber: 29
            }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Tab, {
              href: "#",
              className: "wpwax-vm-add-form__top--btn",
              onClick: () => setFormStage("thank"),
              children: "Thank You Page"
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 25,
              columnNumber: 29
            }, globalThis)]
          }, void 0, true, {
            fileName: _jsxFileName$2,
            lineNumber: 22,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(TabPanel, {
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
              className: "wpwax-vm-add-form__content",
              children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(GeneralSettings, {}, void 0, false, {
                fileName: _jsxFileName$2,
                lineNumber: 30,
                columnNumber: 33
              }, globalThis)
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 29,
              columnNumber: 29
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 28,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(TabPanel, {
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
              className: "wpwax-vm-add-form__content",
              children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FormSettings, {}, void 0, false, {
                fileName: _jsxFileName$2,
                lineNumber: 35,
                columnNumber: 33
              }, globalThis)
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 34,
              columnNumber: 29
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 33,
            columnNumber: 25
          }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(TabPanel, {
            children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
              className: "wpwax-vm-add-form__content",
              children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ThankSettings, {}, void 0, false, {
                fileName: _jsxFileName$2,
                lineNumber: 40,
                columnNumber: 33
              }, globalThis)
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 39,
              columnNumber: 29
            }, globalThis)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 38,
            columnNumber: 25
          }, globalThis)]
        }, void 0, true, {
          fileName: _jsxFileName$2,
          lineNumber: 21,
          columnNumber: 21
        }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          className: "wpwax-vm-add-form__bottom",
          children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("a", {
            href: "#",
            className: "wpwax-vm-form-save",
            children: "Save"
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 47,
            columnNumber: 25
          }, globalThis)
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 46,
          columnNumber: 21
        }, globalThis)]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 20,
        columnNumber: 17
      }, globalThis)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 19,
      columnNumber: 13
    }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: "wpwax-vm-preview",
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("span", {
        className: "wpwax-vm-preview-label",
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ReactSVG, {
          src: handDownImg
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 52,
          columnNumber: 58
        }, globalThis), "Preview your changes"]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 52,
        columnNumber: 17
      }, globalThis), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(PreviewOne, {
        previewStage: formStage
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 53,
        columnNumber: 17
      }, globalThis)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 51,
      columnNumber: 13
    }, globalThis)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 18,
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
