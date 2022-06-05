var __defProp = Object.defineProperty;
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
import { a as axios, c as createAsyncThunk, b as createSlice, d as configureStore, u as useDispatch, j as jsxDevRuntime, e as useSelector, r as react, f as createRoot, P as Provider } from "./vendor.js";
var style = "";
const axiosObj = axios.create({
  baseURL: vmData.apiEndpoint,
  headers: {
    "Content-type": "application/json",
    "X-WP-Nonce": vmData.apiNonce
  }
});
const sendMessage$1 = (name, email, data) => __async(this, null, function* () {
  if (data.type == "text") {
    return yield axiosObj.post("/messages", {
      name,
      email,
      message_type: "text",
      message_value: data.text
    });
  }
});
const api = {
  axiosObj,
  sendMessage: sendMessage$1
};
const initialState = {
  name: "",
  email: "",
  data: {},
  displayChatScreen: false,
  chatScreen: "welcome",
  chatStep: 1
};
const sendMessage = createAsyncThunk("chatBox/send", (_, thunkAPI) => __async(this, null, function* () {
  const data = thunkAPI.getState().data;
  const name = thunkAPI.getState().name;
  const email = thunkAPI.getState().email;
  try {
    let response = yield api.sendMessage(name, email, data);
    let result = response.data;
    return thunkAPI.fulfillWithValue(result);
  } catch (error) {
    let result = error.response.data;
    return thunkAPI.rejectWithValue(result);
  }
}));
const chatBoxSlice = createSlice({
  name: "chatBox",
  initialState,
  reducers: {
    toggleDisplayChatScreen(state) {
      state.displayChatScreen = !state.displayChatScreen;
    },
    chatScreen(state, action) {
      state.chatScreen = action.payload;
    },
    chatStep(state, action) {
      state.chatStep = action.payload;
    },
    back(state) {
      if (state.chatStep > 1) {
        state.chatStep -= 1;
      } else {
        state.chatScreen = "welcome";
      }
    },
    reset() {
      return initialState;
    },
    resetWithChatScreen() {
      let state = __spreadValues({}, initialState);
      state.displayChatScreen = true;
      return state;
    },
    setContactInfo(state, { payload }) {
      state.name = payload.name;
      state.email = payload.email;
    },
    setData(state, action) {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.chatScreen = "sending";
    });
    builder.addCase(sendMessage.fulfilled, (state) => {
      state.chatScreen = "success";
    });
    builder.addCase(sendMessage.rejected, (state, { payload }) => {
      state.chatScreen = "contactForm";
      let message = payload.message;
      console.log(message);
    });
  }
});
const chatBoxActions = chatBoxSlice.actions;
const store = configureStore({
  reducer: chatBoxSlice.reducer
});
const avatar = "_avatar_1iq8b_1";
const ttt = "_ttt_1iq8b_7";
var classes$2 = {
  avatar,
  ttt
};
var avater = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAFVBMVEXFxcX////7+/vv7+/e3t7R0dHJycnl4e1FAAADpUlEQVRo3u2YTVMbMQyG2+bjrndDz2ghPSeZgXPSaTlDoD1ngP//G9ox2ijG63gl57jvAEnI7DOSLMuyvowaNWrUqFGjRmX05+XX778XIb20TP91c3eoJU3XxPSh5qEO9c5MR+GuBjURiMC4AjZtKRZWXtRsTZ/VPjpZe2UwiRZOD6lP9y7WupfVHDxryNSrHw7WRkMFYtQYNmVByR/NNHtePFFOjTm3mLJ6dO2ey0R/R6paJ1sJNRMxE2qcnAqIuzWMwrfybUWVAnlhDReUgUCAvLcGjBNjVGwL2IzOCitzduHEyVjXBta3yLfUySvzZlQgxDJPdd1BYbGzH29bV0ntdxYHa0rkheFJMRdW3ratK71SFHwslocTPThPxtRHGCrFlNEbcQUbWFQyzGLXiQ2IklasW9WWCX9O5MUW1txgl30PcRR9WArrmhHCHhgSdYExiE17e3PMJw6/HD6AIAvZVjcmqhsD67VQJ5amsyPER/xjCZOvO5nmMkubAG8xZHy8hFWFtTnZnc17W8u6JxAklyA2aeFZWNvCgIC00YILbAm9MWCgXmHr7jG5iz6cPearbr5TZPjXlb8nZ9nZ6IjiotVJ9IStqbha1V+u5usEAu0ljHpLOUFL/21byoQAWc1yG6ZyjhV+xucFkpuoN8eE6J7DvHG1h6o9x8X+tmYyFAIlxR81Lj5rVnGlk8/FnPCj/LD3XIuJe8eoI6d2a6wSm3wjhxt7YuW1dHiYAQIWLzcn4e7DNvZqEzMYxyad723lOZpZyQfoEMzbyfkPkHmbVHn3zfYtc/9UPzF4nrlWjAZbQyc/zcEyRYOkBCvbOmzaCSaKF3PX3wPy6dbQ9rJYg9xCbKsTQrW0tRF8LjUab2dPjug/6WZWcz6vhDTCS8vNEemNm09dr3LRtJJ7E+uqsH8samwTbf/o6hsVxdEMcuicENJURikRD/wW/nkcGwI2C2YUOTwkKyaFcVyS/VgVwnWZDNtk3eOo1GLAoKKVJ4cLF9iMXAr+pLOeO1cglRoxCeUh5P5Y5xGdQwzhy9foChjyhXoX7BAKFCbvFBbwQbwwFgkkYSpm/jz7uEJSHQxTVV9tneiFM4Vml3JVLF6IQMkMWY8QXBdObI44alN6suWSYpeGu3tFPoCLDMugAotz63a+1y8WaCQkU6WYyRPRYZFiw4Y/QfNjL4v77cJpZ8dpS1dVvcqsiYPDmvh+lgouFoZ3h1/Jp+vM1vboe6ba17H+AetQVgc5T+AyAAAAAElFTkSuQmCC";
var _jsxFileName$e = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/Avatar.jsx";
function Avatar() {
  const dispatch = useDispatch();
  function clickHandler(e) {
    e.preventDefault();
    dispatch(chatBoxActions.toggleDisplayChatScreen());
  }
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: classes$2.avatar,
    onClick: clickHandler,
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("img", {
      className: classes$2.ttt,
      src: avater,
      alt: "Avatar"
    }, void 0, false, {
      fileName: _jsxFileName$e,
      lineNumber: 16,
      columnNumber: 4
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName$e,
    lineNumber: 15,
    columnNumber: 3
  }, this);
}
const main = "_main_1yz4z_1";
const box = "_box_1yz4z_10";
var classes$1 = {
  main,
  box
};
var _jsxFileName$d = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/ui/ClosePopup.jsx";
function ClosePopup(props) {
  const dispatch = useDispatch();
  function yesHandler() {
    dispatch(chatBoxActions.reset());
  }
  function noHandler() {
    props.setDisplayClosePopup(false);
  }
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    className: classes$1.main,
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: classes$1.box,
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
        children: "Are you sure that you want to close? All progress will be lost."
      }, void 0, false, {
        fileName: _jsxFileName$d,
        lineNumber: 18,
        columnNumber: 5
      }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
          onClick: yesHandler,
          children: "Yes I'm Sure"
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 23,
          columnNumber: 6
        }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
          onClick: noHandler,
          children: "No"
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 24,
          columnNumber: 6
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName$d,
        lineNumber: 22,
        columnNumber: 5
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName$d,
      lineNumber: 17,
      columnNumber: 4
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName$d,
    lineNumber: 16,
    columnNumber: 3
  }, this);
}
const container = "_container_aud45_1";
const relative = "_relative_aud45_10";
const back = "_back_aud45_13";
const minus = "_minus_aud45_25";
const close = "_close_aud45_37";
var classes = {
  container,
  relative,
  back,
  minus,
  close
};
var _jsxFileName$c = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/ui/Container.jsx";
function Container(props) {
  const dispatch = useDispatch();
  const chatScreen = useSelector((state) => state.chatScreen);
  const [displayClosePopup, setDisplayClosePopup] = react.exports.useState(false);
  function backHandler() {
    dispatch(chatBoxActions.back());
  }
  function minusHandler() {
    dispatch(chatBoxActions.toggleDisplayChatScreen());
  }
  function closeHandler() {
    if (chatScreen == "success") {
      dispatch(chatBoxActions.reset());
    } else {
      setDisplayClosePopup(true);
    }
  }
  let backBtn = /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
    onClick: backHandler,
    className: classes.back,
    children: "<<Back"
  }, void 0, false, {
    fileName: _jsxFileName$c,
    lineNumber: 29,
    columnNumber: 3
  }, this);
  if (chatScreen == "welcome" || chatScreen == "success") {
    backBtn = "";
  }
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(jsxDevRuntime.exports.Fragment, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      className: classes.container,
      children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
        className: classes.relative,
        children: [backBtn, /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
          onClick: minusHandler,
          className: classes.minus,
          children: "-"
        }, void 0, false, {
          fileName: _jsxFileName$c,
          lineNumber: 42,
          columnNumber: 6
        }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
          onClick: closeHandler,
          className: classes.close,
          children: "x"
        }, void 0, false, {
          fileName: _jsxFileName$c,
          lineNumber: 45,
          columnNumber: 6
        }, this), props.children]
      }, void 0, true, {
        fileName: _jsxFileName$c,
        lineNumber: 40,
        columnNumber: 5
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName$c,
      lineNumber: 39,
      columnNumber: 4
    }, this), displayClosePopup && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ClosePopup, {
      setDisplayClosePopup
    }, void 0, false, {
      fileName: _jsxFileName$c,
      lineNumber: 52,
      columnNumber: 5
    }, this)]
  }, void 0, true);
}
var _jsxFileName$b = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/Welcome.jsx";
function Welcome() {
  const dispatch = useDispatch();
  function btnHandler(type) {
    dispatch(chatBoxActions.chatScreen(type));
    dispatch(chatBoxActions.chatStep(1));
  }
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      children: "Welcome to wpWax, Leave your question below and we'll get back to you asap."
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 15,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      children: "[Video Screen]"
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 19,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      children: "How would you like to chat?"
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 20,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
        onClick: () => btnHandler("video"),
        children: "Video"
      }, void 0, false, {
        fileName: _jsxFileName$b,
        lineNumber: 22,
        columnNumber: 5
      }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
        onClick: () => btnHandler("screenRecord"),
        children: "Screen Record"
      }, void 0, false, {
        fileName: _jsxFileName$b,
        lineNumber: 23,
        columnNumber: 5
      }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
        onClick: () => btnHandler("audio"),
        children: "Voice"
      }, void 0, false, {
        fileName: _jsxFileName$b,
        lineNumber: 26,
        columnNumber: 5
      }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
        onClick: () => btnHandler("text"),
        children: "Text"
      }, void 0, false, {
        fileName: _jsxFileName$b,
        lineNumber: 27,
        columnNumber: 5
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName$b,
      lineNumber: 21,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      children: "You can practise before sending"
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 29,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
      children: "Powered by wpWax"
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 30,
      columnNumber: 4
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName$b,
    lineNumber: 14,
    columnNumber: 3
  }, this);
}
var _jsxFileName$a = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/ContactForm.jsx";
function ContactForm() {
  const dispatch = useDispatch();
  const nameRef = react.exports.useRef();
  const emailRef = react.exports.useRef();
  const name = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  function submitHandler(e) {
    e.preventDefault();
    const name2 = nameRef.current.value;
    const email2 = emailRef.current.value;
    dispatch(chatBoxActions.setContactInfo({
      name: name2,
      email: email2
    }));
    dispatch(sendMessage());
  }
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
      children: "Before you go, please leave your contact details so that we can get back to you..."
    }, void 0, false, {
      fileName: _jsxFileName$a,
      lineNumber: 25,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("form", {
      onSubmit: submitHandler,
      children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
        placeholder: "Your name*",
        type: "text",
        defaultValue: name,
        ref: nameRef,
        required: true
      }, void 0, false, {
        fileName: _jsxFileName$a,
        lineNumber: 30,
        columnNumber: 5
      }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("input", {
        placeholder: "Your email*",
        type: "email",
        defaultValue: email,
        ref: emailRef,
        required: true
      }, void 0, false, {
        fileName: _jsxFileName$a,
        lineNumber: 37,
        columnNumber: 5
      }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
        children: "Send"
      }, void 0, false, {
        fileName: _jsxFileName$a,
        lineNumber: 44,
        columnNumber: 5
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName$a,
      lineNumber: 29,
      columnNumber: 4
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName$a,
    lineNumber: 24,
    columnNumber: 3
  }, this);
}
var _jsxFileName$9 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/Sending.jsx";
function Sending() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
      children: "Sending...."
    }, void 0, false, {
      fileName: _jsxFileName$9,
      lineNumber: 6,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
      children: "We are currently sending your response"
    }, void 0, false, {
      fileName: _jsxFileName$9,
      lineNumber: 7,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
      children: "Please dont close this page"
    }, void 0, false, {
      fileName: _jsxFileName$9,
      lineNumber: 8,
      columnNumber: 4
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName$9,
    lineNumber: 5,
    columnNumber: 3
  }, this);
}
var _jsxFileName$8 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/Success.jsx";
function Success() {
  const dispatch = useDispatch();
  function btnHandler(e) {
    e.preventDefault();
    dispatch(chatBoxActions.resetWithChatScreen());
  }
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("p", {
      children: "Submission Success"
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 14,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
      onClick: btnHandler,
      children: "Start a new chat"
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 15,
      columnNumber: 4
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName$8,
    lineNumber: 13,
    columnNumber: 3
  }, this);
}
var _jsxFileName$7 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/video/Index.jsx";
function Video() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    children: "Video"
  }, void 0, false, {
    fileName: _jsxFileName$7,
    lineNumber: 2,
    columnNumber: 9
  }, this);
}
var _jsxFileName$6 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/audio/Index.jsx";
function Audio() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    children: "Audio"
  }, void 0, false, {
    fileName: _jsxFileName$6,
    lineNumber: 2,
    columnNumber: 9
  }, this);
}
var _jsxFileName$5 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/text/Form.jsx";
function Form() {
  const dispatch = useDispatch();
  const textRef = react.exports.useRef();
  function submitHandler(e) {
    e.preventDefault();
    const text = textRef.current.value;
    const data = {
      type: "text",
      text
    };
    dispatch(chatBoxActions.setData(data));
    dispatch(chatBoxActions.chatScreen("contactForm"));
  }
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("form", {
    onSubmit: submitHandler,
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("textarea", {
      required: true,
      maxLength: "1000",
      row: "5",
      placeholder: "Type your text...",
      ref: textRef
    }, void 0, false, {
      fileName: _jsxFileName$5,
      lineNumber: 23,
      columnNumber: 4
    }, this), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
      children: "Send"
    }, void 0, false, {
      fileName: _jsxFileName$5,
      lineNumber: 30,
      columnNumber: 4
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName$5,
    lineNumber: 22,
    columnNumber: 3
  }, this);
}
var _jsxFileName$4 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/text/Index.jsx";
function Text() {
  const chatStep = useSelector((state) => state.chatStep);
  let result = "";
  switch (chatStep) {
    case 1:
      result = /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Form, {}, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 11,
        columnNumber: 13
      }, this);
      break;
  }
  return result;
}
var _jsxFileName$3 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/screen-record/Index.jsx";
function ScreenRecord() {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
    children: "ScreenRecord"
  }, void 0, false, {
    fileName: _jsxFileName$3,
    lineNumber: 2,
    columnNumber: 9
  }, this);
}
var _jsxFileName$2 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/components/ChatScreen.jsx";
function ChatScreen() {
  const chatScreen = useSelector((state) => state.chatScreen);
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Container, {
    children: [chatScreen == "welcome" && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Welcome, {}, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 18,
      columnNumber: 32
    }, this), chatScreen == "video" && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Video, {}, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 19,
      columnNumber: 30
    }, this), chatScreen == "audio" && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Audio, {}, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 20,
      columnNumber: 30
    }, this), chatScreen == "text" && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Text, {}, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 21,
      columnNumber: 29
    }, this), chatScreen == "screenRecord" && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ScreenRecord, {}, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 22,
      columnNumber: 37
    }, this), chatScreen == "contactForm" && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ContactForm, {}, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 24,
      columnNumber: 36
    }, this), chatScreen == "sending" && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Sending, {}, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 25,
      columnNumber: 32
    }, this), chatScreen == "success" && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Success, {}, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 26,
      columnNumber: 32
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 17,
    columnNumber: 3
  }, this);
}
var _jsxFileName$1 = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/App.jsx";
function App() {
  const displayChatScreen = useSelector((state) => state.displayChatScreen);
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(jsxDevRuntime.exports.Fragment, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Avatar, {}, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 11,
      columnNumber: 4
    }, this), displayChatScreen && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(ChatScreen, {}, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 12,
      columnNumber: 26
    }, this)]
  }, void 0, true);
}
var _jsxFileName = "/Users/syedgalibahmed/Local Sites/video-chat-support/app/public/wp-content/plugins/wpwax-video-message/src/js/apps/chatbox/index.jsx";
document.addEventListener("DOMContentLoaded", function() {
  const container2 = document.getElementById("wpwax-vm-chatbox");
  if (!container2) {
    return;
  }
  const root = createRoot(container2);
  root.render(/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Provider, {
    store,
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(App, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 4
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 3
  }, this));
});
//# sourceMappingURL=public.js.map
