$(document).ready(function () {
  // chatBotScript();
  chatbotOnButton();
});

// directly adding chatbot script
function chatBotScript() {
      var script = document.createElement("script");
      script.id = "chatbot-script";
      script.src =
        "https://assets.adoberesources.net/loader.js?orgId=7C75630961C0BAC70A495E36%40AdobeOrg&instanceId=tatasteel&env=dev&geo=va7";
       script.async = true;
       //    script.onload = () => {
    //         console.log('Chatbot script loaded');
    //         window.Chatbot.init({
    //         //   dialogId: 'your-dialog-id',
    //           instanceId:'tatasteel',
    //           orgId: '7C75630961C0BAC70A495E36%40AdobeOrg',
    //           env: 'dev',
    //           debug: true,
    //         });
    //       };
       script.onerror = () => console.error('Failed to load chatbot script');

       document.head.appendChild(script);
}


// on click adding chatbot script 
function chatbotOnButton(){
  $("#chatBot").on("click", function () {
    console.log("clicked");
    if (!$("#chatbot-script").length){
      var script = document.createElement("script");
      script.id='chatbot-script'
      script.src =
        "https://assets.adoberesources.net/loader.js?orgId=7C75630961C0BAC70A495E36%40AdobeOrg&instanceId=tatasteel&env=prod&geo=va7"
       script.async = true,
    //    script.onload = () => {
    //         console.log('Chatbot script loaded');
    //         window.Chatbot.init({
    //         //   dialogId: 'your-dialog-id',
    //           instanceId:'tatasteel',
    //           orgId: '7C75630961C0BAC70A495E36%40AdobeOrg',
    //           env: 'dev',
    //           debug: true,
    //         });
    //       };
       script.onerror = () => console.error('Failed to load chatbot script');
        document.head.appendChild(script);
      
    }
  })
}












{/* <script src="https://assets.adoberesources.net/loader.js?orgId=7C75630961C0BAC70A495E36%40AdobeOrg&amp;instanceId=tatasteel&amp;env=prod&amp;geo=va7"></script>
<script async="" src="https://assets.adoberesources.net/builds/a9003c40a9fbd8edefc244f3ff896ab7a0cdcc2b/dist/core-ui/src/index.js"></script>
<script async="" src="https://assets.adoberesources.net/builds/a9003c40a9fbd8edefc244f3ff896ab7a0cdcc2b/dist/core/src/index.js"></script> */}



// ! function() {
//     var t, e, r, n;
//     (e = t || (t = {})).EVENT_LISTENER = "adobedx.conversationalforms.register.event", e.EVENT_LISTENER_REGISTER = "adobedx.conversations.register.event", (n = r || (r = {})).CONVERSATIONAL_FORMS_CLOSE = "adobedx.conversationalforms.close", n.CONVERSATION_CLOSE = "adobedx.conversations.close", n.CONVERSATION_FAILED = "adobedx.conversations.failed", n.CONVERSATION_READY = "adobedx.conversations.ready", n.CONVERSATION_TRIGGERED = "adobedx.conversations.triggered", n.CONVERSATION_ENGAGED = "adobedx.conversations.engaged", n.CONVERSATION_COMPLETED = "adobedx.conversations.completed", n.CONVERSATION_CLOSED = "adobedx.conversations.close", n.CONVERSATION_MEETING_REQUESTED = "adobedx.conversations.meeting.requested", n.CONVERSATION_MEETING_BOOKED = "adobedx.conversations.meeting.booked", n.CONVERSATION_INPUT_PHONE = "adobedx.conversations.input.phone", n.CONVERSATION_INPUT_EMAIL = "adobedx.conversations.input.email", n.CONVERSATION_LIVE_CHAT_REQUESTED = "adobedx.conversations.live_chat.requested", n.CONVERSATION_LIVE_CHAT_INITIATED = "adobedx.conversations.live_chat.initiated", n.CONVERSATION_LIVE_CHAT_ENDED = "adobedx.conversations.live_chat.ended", n.CONVERSATION_LIVE_CHAT_REQUEST_TIMEOUT = "adobedx.conversations.live_chat.timeout";
//     var o, i, a = ["adobezero", "adobestaging"];

//     function c() {
//         for (var t = document.querySelectorAll("script"), e = 0; e < t.length; e++)
//             if (-1 !== t[e].src.indexOf("munchkin.js")) return !0;
//         return !1
//     }

//     function u(t) {
//         for (var e = t.split(/[;,] */), r = e.length, n = 0; n < r; n++) {
//             var o = e[n],
//                 i = o.indexOf("=");
//             if (i >= 0)
//                 if ("_mkto_trk" === o.substring(0, i).trim()) return !0
//         }
//         return !1
//     }

//     function s(t, e) {
//         if (e.skipCookie) t();
//         else {
//             if (u(document.cookie)) return void t();
//             (r = e.instanceId, n = 1, o = 7, r && a.some((function(t) {
//                 return t === r
//             })) && (o = 15), new Promise((function(t) {
//                 if (c()) t(!0);
//                 else var e = setInterval((function() {
//                     var r = c();
//                     if (r || n === o) return clearInterval(e), t(!(n === o && !r));
//                     n++
//                 }), 1e3)
//             }))).then((function(e) {
//                 e ? function(t) {
//                     var e = 1;
//                     if (u(document.cookie)) t();
//                     else var r = setInterval((function() {
//                         (u(document.cookie) || 5 === e) && (clearInterval(r), t()), e++
//                     }), 1e3)
//                 }(t) : t()
//             }))
//         }
//         var r, n, o
//     }

//     function f(t) {
//         var e = function(t) {
//                 if (t) {
//                     var e = "^((#cf-)[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12})$",
//                         r = o.POPUP,
//                         n = o.INLINE,
//                         i = o.CHATBOT,
//                         a = "^#cf(?:=)[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(?:&t=(".concat(r, "|").concat(n, "|").concat(i, "))?(?:&s=.*)?$"),
//                         c = "gm";
//                     return {
//                         isCf: new RegExp(e, c).test(t) || new RegExp(a, c).test(t),
//                         isOldPattern: new RegExp(e, c).test(t)
//                     }
//                 }
//                 return {
//                     isCf: !1
//                 }
//             }(t),
//             r = e.isCf,
//             n = e.isOldPattern;
//         if (r) {
//             var i, a = "",
//                 c = o.POPUP;
//             if (n) a = t.substring(t.indexOf("-") + 1);
//             else {
//                 var u = new URLSearchParams(t.substring(1));
//                 if (u) {
//                     a = u.get("cf") || "";
//                     var s = u.get("t");
//                     c = [o.POPUP, o.INLINE, o.CHATBOT].includes(s) ? s : c, i = u.get("s") || void 0
//                 }
//             }
//             return {
//                 id: a,
//                 type: c,
//                 selector: i
//             }
//         }
//     }

//     function l(t) {
//         return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
//             return typeof t
//         } : function(t) {
//             return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
//         })(t)
//     }

//     function d() {
//         "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
//         d = function() {
//             return t
//         };
//         var t = {},
//             e = Object.prototype,
//             r = e.hasOwnProperty,
//             n = "function" == typeof Symbol ? Symbol : {},
//             o = n.iterator || "@@iterator",
//             i = n.asyncIterator || "@@asyncIterator",
//             a = n.toStringTag || "@@toStringTag";

//         function c(t, e, r) {
//             return Object.defineProperty(t, e, {
//                 value: r,
//                 enumerable: !0,
//                 configurable: !0,
//                 writable: !0
//             }), t[e]
//         }
//         try {
//             c({}, "")
//         } catch (t) {
//             c = function(t, e, r) {
//                 return t[e] = r
//             }
//         }

//         function u(t, e, r, n) {
//             var o, i, a, c, u = e && e.prototype instanceof h ? e : h,
//                 l = Object.create(u.prototype),
//                 d = new I(n || []);
//             return l._invoke = (o = t, i = r, a = d, c = "suspendedStart", function(t, e) {
//                 if ("executing" === c) throw new Error("Generator is already running");
//                 if ("completed" === c) {
//                     if ("throw" === t) throw e;
//                     return L()
//                 }
//                 for (a.method = t, a.arg = e;;) {
//                     var r = a.delegate;
//                     if (r) {
//                         var n = O(r, a);
//                         if (n) {
//                             if (n === f) continue;
//                             return n
//                         }
//                     }
//                     if ("next" === a.method) a.sent = a._sent = a.arg;
//                     else if ("throw" === a.method) {
//                         if ("suspendedStart" === c) throw c = "completed", a.arg;
//                         a.dispatchException(a.arg)
//                     } else "return" === a.method && a.abrupt("return", a.arg);
//                     c = "executing";
//                     var u = s(o, i, a);
//                     if ("normal" === u.type) {
//                         if (c = a.done ? "completed" : "suspendedYield", u.arg === f) continue;
//                         return {
//                             value: u.arg,
//                             done: a.done
//                         }
//                     }
//                     "throw" === u.type && (c = "completed", a.method = "throw", a.arg = u.arg)
//                 }
//             }), l
//         }

//         function s(t, e, r) {
//             try {
//                 return {
//                     type: "normal",
//                     arg: t.call(e, r)
//                 }
//             } catch (t) {
//                 return {
//                     type: "throw",
//                     arg: t
//                 }
//             }
//         }
//         t.wrap = u;
//         var f = {};

//         function h() {}

//         function p() {}

//         function v() {}
//         var y = {};
//         c(y, o, (function() {
//             return this
//         }));
//         var m = Object.getPrototypeOf,
//             g = m && m(m(S([])));
//         g && g !== e && r.call(g, o) && (y = g);
//         var E = v.prototype = h.prototype = Object.create(y);

//         function w(t) {
//             ["next", "throw", "return"].forEach((function(e) {
//                 c(t, e, (function(t) {
//                     return this._invoke(e, t)
//                 }))
//             }))
//         }

//         function b(t, e) {
//             var n;
//             this._invoke = function(o, i) {
//                 function a() {
//                     return new e((function(n, a) {
//                         ! function n(o, i, a, c) {
//                             var u = s(t[o], t, i);
//                             if ("throw" !== u.type) {
//                                 var f = u.arg,
//                                     d = f.value;
//                                 return d && "object" == l(d) && r.call(d, "__await") ? e.resolve(d.__await).then((function(t) {
//                                     n("next", t, a, c)
//                                 }), (function(t) {
//                                     n("throw", t, a, c)
//                                 })) : e.resolve(d).then((function(t) {
//                                     f.value = t, a(f)
//                                 }), (function(t) {
//                                     return n("throw", t, a, c)
//                                 }))
//                             }
//                             c(u.arg)
//                         }(o, i, n, a)
//                     }))
//                 }
//                 return n = n ? n.then(a, a) : a()
//             }
//         }

//         function O(t, e) {
//             var r = t.iterator[e.method];
//             if (void 0 === r) {
//                 if (e.delegate = null, "throw" === e.method) {
//                     if (t.iterator.return && (e.method = "return", e.arg = void 0, O(t, e), "throw" === e.method)) return f;
//                     e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
//                 }
//                 return f
//             }
//             var n = s(r, t.iterator, e.arg);
//             if ("throw" === n.type) return e.method = "throw", e.arg = n.arg, e.delegate = null, f;
//             var o = n.arg;
//             return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, f) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f)
//         }

//         function x(t) {
//             var e = {
//                 tryLoc: t[0]
//             };
//             1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
//         }

//         function N(t) {
//             var e = t.completion || {};
//             e.type = "normal", delete e.arg, t.completion = e
//         }

//         function I(t) {
//             this.tryEntries = [{
//                 tryLoc: "root"
//             }], t.forEach(x, this), this.reset(!0)
//         }

//         function S(t) {
//             if (t) {
//                 var e = t[o];
//                 if (e) return e.call(t);
//                 if ("function" == typeof t.next) return t;
//                 if (!isNaN(t.length)) {
//                     var n = -1,
//                         i = function e() {
//                             for (; ++n < t.length;)
//                                 if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
//                             return e.value = void 0, e.done = !0, e
//                         };
//                     return i.next = i
//                 }
//             }
//             return {
//                 next: L
//             }
//         }

//         function L() {
//             return {
//                 value: void 0,
//                 done: !0
//             }
//         }
//         return p.prototype = v, c(E, "constructor", v), c(v, "constructor", p), p.displayName = c(v, a, "GeneratorFunction"), t.isGeneratorFunction = function(t) {
//             var e = "function" == typeof t && t.constructor;
//             return !!e && (e === p || "GeneratorFunction" === (e.displayName || e.name))
//         }, t.mark = function(t) {
//             return Object.setPrototypeOf ? Object.setPrototypeOf(t, v) : (t.__proto__ = v, c(t, a, "GeneratorFunction")), t.prototype = Object.create(E), t
//         }, t.awrap = function(t) {
//             return {
//                 __await: t
//             }
//         }, w(b.prototype), c(b.prototype, i, (function() {
//             return this
//         })), t.AsyncIterator = b, t.async = function(e, r, n, o, i) {
//             void 0 === i && (i = Promise);
//             var a = new b(u(e, r, n, o), i);
//             return t.isGeneratorFunction(r) ? a : a.next().then((function(t) {
//                 return t.done ? t.value : a.next()
//             }))
//         }, w(E), c(E, a, "Generator"), c(E, o, (function() {
//             return this
//         })), c(E, "toString", (function() {
//             return "[object Generator]"
//         })), t.keys = function(t) {
//             var e = [];
//             for (var r in t) e.push(r);
//             return e.reverse(),
//                 function r() {
//                     for (; e.length;) {
//                         var n = e.pop();
//                         if (n in t) return r.value = n, r.done = !1, r
//                     }
//                     return r.done = !0, r
//                 }
//         }, t.values = S, I.prototype = {
//             constructor: I,
//             reset: function(t) {
//                 if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(N), !t)
//                     for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
//             },
//             stop: function() {
//                 this.done = !0;
//                 var t = this.tryEntries[0].completion;
//                 if ("throw" === t.type) throw t.arg;
//                 return this.rval
//             },
//             dispatchException: function(t) {
//                 if (this.done) throw t;
//                 var e = this;

//                 function n(r, n) {
//                     return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n
//                 }
//                 for (var o = this.tryEntries.length - 1; o >= 0; --o) {
//                     var i = this.tryEntries[o],
//                         a = i.completion;
//                     if ("root" === i.tryLoc) return n("end");
//                     if (i.tryLoc <= this.prev) {
//                         var c = r.call(i, "catchLoc"),
//                             u = r.call(i, "finallyLoc");
//                         if (c && u) {
//                             if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
//                             if (this.prev < i.finallyLoc) return n(i.finallyLoc)
//                         } else if (c) {
//                             if (this.prev < i.catchLoc) return n(i.catchLoc, !0)
//                         } else {
//                             if (!u) throw new Error("try statement without catch or finally");
//                             if (this.prev < i.finallyLoc) return n(i.finallyLoc)
//                         }
//                     }
//                 }
//             },
//             abrupt: function(t, e) {
//                 for (var n = this.tryEntries.length - 1; n >= 0; --n) {
//                     var o = this.tryEntries[n];
//                     if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
//                         var i = o;
//                         break
//                     }
//                 }
//                 i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
//                 var a = i ? i.completion : {};
//                 return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, f) : this.complete(a)
//             },
//             complete: function(t, e) {
//                 if ("throw" === t.type) throw t.arg;
//                 return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), f
//             },
//             finish: function(t) {
//                 for (var e = this.tryEntries.length - 1; e >= 0; --e) {
//                     var r = this.tryEntries[e];
//                     if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), N(r), f
//                 }
//             },
//             catch: function(t) {
//                 for (var e = this.tryEntries.length - 1; e >= 0; --e) {
//                     var r = this.tryEntries[e];
//                     if (r.tryLoc === t) {
//                         var n = r.completion;
//                         if ("throw" === n.type) {
//                             var o = n.arg;
//                             N(r)
//                         }
//                         return o
//                     }
//                 }
//                 throw new Error("illegal catch attempt")
//             },
//             delegateYield: function(t, e, r) {
//                 return this.delegate = {
//                     iterator: S(t),
//                     resultName: e,
//                     nextLoc: r
//                 }, "next" === this.method && (this.arg = void 0), f
//             }
//         }, t
//     }

//     function h(t, e) {
//         return function(t) {
//             if (Array.isArray(t)) return t
//         }(t) || function(t, e) {
//             var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
//             if (null == r) return;
//             var n, o, i = [],
//                 a = !0,
//                 c = !1;
//             try {
//                 for (r = r.call(t); !(a = (n = r.next()).done) && (i.push(n.value), !e || i.length !== e); a = !0);
//             } catch (t) {
//                 c = !0, o = t
//             } finally {
//                 try {
//                     a || null == r.return || r.return()
//                 } finally {
//                     if (c) throw o
//                 }
//             }
//             return i
//         }(t, e) || function(t, e) {
//             if (!t) return;
//             if ("string" == typeof t) return p(t, e);
//             var r = Object.prototype.toString.call(t).slice(8, -1);
//             "Object" === r && t.constructor && (r = t.constructor.name);
//             if ("Map" === r || "Set" === r) return Array.from(t);
//             if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return p(t, e)
//         }(t, e) || function() {
//             throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
//         }()
//     }

//     function p(t, e) {
//         (null == e || e > t.length) && (e = t.length);
//         for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
//         return n
//     }

//     function v(t, e) {
//         var r = Object.keys(t);
//         if (Object.getOwnPropertySymbols) {
//             var n = Object.getOwnPropertySymbols(t);
//             e && (n = n.filter((function(e) {
//                 return Object.getOwnPropertyDescriptor(t, e).enumerable
//             }))), r.push.apply(r, n)
//         }
//         return r
//     }

//     function y(t) {
//         for (var e = arguments, r = function(r) {
//                 var n = null != e[r] ? e[r] : {};
//                 r % 2 ? v(Object(n), !0).forEach((function(e) {
//                     m(t, e, n[e])
//                 })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : v(Object(n)).forEach((function(e) {
//                     Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
//                 }))
//             }, n = 1; n < arguments.length; n++) r(n);
//         return t
//     }

//     function m(t, e, r) {
//         return e in t ? Object.defineProperty(t, e, {
//             value: r,
//             enumerable: !0,
//             configurable: !0,
//             writable: !0
//         }) : t[e] = r, t
//     }

//     function g(t, e, r, n, o, i, a) {
//         try {
//             var c = t[i](a),
//                 u = c.value
//         } catch (t) {
//             return void r(t)
//         }
//         c.done ? e(u) : Promise.resolve(u).then(n, o)
//     }

//     function E(t) {
//         return function() {
//             var e = this,
//                 r = arguments;
//             return new Promise((function(n, o) {
//                 var i = t.apply(e, r);

//                 function a(t) {
//                     g(i, n, o, a, c, "next", t)
//                 }

//                 function c(t) {
//                     g(i, n, o, a, c, "throw", t)
//                 }
//                 a(void 0)
//             }))
//         }
//     }(i = o || (o = {})).CHATBOT = "chatbot", i.INLINE = "inline", i.POPUP = "popup";
//     var w = D();
//     w && "prod" !== w.env && console.log(w.env);
//     var b, O, x, N = "a9003c40a9fbd8edefc244f3ff896ab7a0cdcc2b",
//         I = "https://assets.adoberesources.net/builds/".concat(N, "/dist/"),
//         S = {
//             local: "http://localhost:1234/",
//             dev: I,
//             qe: I,
//             qa: I,
//             stage: I,
//             stg: I,
//             prod: I
//         },
//         L = {
//             scripts: {
//                 core: w ? S[w.env] + "core/src/index.js" : "",
//                 "core-ui": w ? S[w.env] + "core-ui/src/index.js" : ""
//             },
//             styles: {}
//         },
//         _ = [];

//     function A(t) {
//         return Promise.all(Object.keys(t).map((function(e) {
//             return function(t) {
//                 return V.apply(this, arguments)
//             }(t[e])
//         })))
//     }

//     function T(t) {
//         return Promise.all(Object.keys(t).map((function(e) {
//             return r = t[e], new Promise((function(t, e) {
//                 var n, o = document.createElement("script");
//                 o.async = !0, o.addEventListener("load", (function() {
//                     return t("".concat(r, " loaded"))
//                 })), o.addEventListener("error", e), o.src = r, null === (n = document.currentScript) || void 0 === n || n.after(o)
//             }));
//             var r
//         })))
//     }

//     function P() {
//         return (P = E(d().mark((function t(e) {
//             var n, o, i, a, c, u, f;
//             return d().wrap((function(t) {
//                 for (;;) switch (t.prev = t.next) {
//                     case 0:
//                         if (!e) {
//                             t.next = 14;
//                             break
//                         }
//                         return n = L.scripts, o = L.styles, t.next = 4, Promise.all([A(o), T(n), j()]);
//                     case 4:
//                         if (i = t.sent, a = h(i, 2), c = a[0], (u = a[1]) && u.length === Object.keys(n).length && (f = new CustomEvent(r.CONVERSATION_READY), window.dispatchEvent(f)), b) {
//                             t.next = 11;
//                             break
//                         }
//                         throw new Error("Failed to load hummingbird api");
//                     case 11:
//                         s((function() {
//                             return b.init(e)
//                         }), e), c.forEach(b.addStyle), _.forEach((function(t) {
//                             return t(b)
//                         }));
//                     case 14:
//                     case "end":
//                         return t.stop()
//                 }
//             }), t)
//         })))).apply(this, arguments)
//     }

//     function C(t, e, r) {
//         window.addEventListener(t, (function(t) {
//             if (r && r.listenOn && r.listenOn.length > 0 && r.listenOn.some((function(e) {
//                     return t.detail.type === e
//                 }))) {
//                 var n = {
//                     type: t.detail.type,
//                     data: y({}, t.detail.data)
//                 };
//                 e(n)
//             }
//         }))
//     }

//     function R() {
//         if (window.location.hash) {
//             var t = f(window.location.hash);
//             t && (k(t), window.history && window.history.replaceState("", "", "".concat(window.location.pathname).concat(window.location.search)))
//         }
//     }

//     function k(e) {
//         if (e && w) {
//             var n = new O;
//             return x ? x(n) : _.forEach((function(t) {
//                 return t(n)
//             })), e.path = "livestream", e.id = e.id.startsWith("#cf-") ? e.id.substring(e.id.indexOf("-") + 1) : e.id, n.showPreloaderIfRequired(w, e), s((function() {
//                 return n.init(w, e)
//             }), w), {
//                 registerCallback: C,
//                 Enum: {
//                     Events: r,
//                     CallbackType: t
//                 }
//             }
//         }
//     }

//     function j() {
//         return new Promise((function(t) {
//             "complete" === document.readyState || "interactive" === document.readyState ? t() : document.addEventListener("DOMContentLoaded", (function() {
//                 return t()
//             }))
//         }))
//     }

//     function V() {
//         return (V = E(d().mark((function t(e) {
//             var r;
//             return d().wrap((function(t) {
//                 for (;;) switch (t.prev = t.next) {
//                     case 0:
//                         return t.next = 2, fetch(e, {
//                             mode: "cors",
//                             credentials: "omit",
//                             redirect: "follow",
//                             referrerPolicy: "no-referrer"
//                         });
//                     case 2:
//                         if ((r = t.sent).ok) {
//                             t.next = 5;
//                             break
//                         }
//                         throw new Error("Failed loading style ".concat(e));
//                     case 5:
//                         return t.abrupt("return", r.text());
//                     case 6:
//                     case "end":
//                         return t.stop()
//                 }
//             }), t)
//         })))).apply(this, arguments)
//     }

//     function D() {
//         var t;
//         if (document.currentScript) {
//             var e = document.currentScript.getAttribute("src"),
//                 r = document.currentScript.getAttribute("data-loader") || void 0;
//             if (e) {
//                 var n = e.split("?")[1] ? new URLSearchParams(e.split("?")[1]) : new URLSearchParams(r),
//                     o = n.get("orgId"),
//                     i = n.get("instanceId"),
//                     a = n.get("geo"),
//                     c = n.get("env"),
//                     u = "true" === n.get("skipCookie");
//                 o && i && (t = {
//                     orgId: o,
//                     instanceId: i,
//                     env: c,
//                     geo: a,
//                     skipCookie: u
//                 })
//             }
//             if (!t) throw new Error("Hummingbird error: orgId and instanceId are required parameters on the script url.")
//         }
//         return t
//     }
//     window.AdobeDX || (window.AdobeDX = {
//         _init: function(t) {
//             b = new t, O = t, _.forEach((function(t) {
//                 return t(b)
//             }))
//         },
//         register: function(t) {
//             b ? (t(b), x = t) : _.push(t)
//         },
//         addListener: function(t, e) {
//             var r, n;
//             r = t, n = e, window.addEventListener(r, (function(t) {
//                 var e = t.detail.data,
//                     r = e.code,
//                     o = e.message,
//                     i = e.payload,
//                     a = {
//                         type: t.detail.type,
//                         data: y({}, i)
//                     };
//                 r && (a.code = r), o && (a.message = o), n(a)
//             }))
//         },
//         conversationalForms: function(t) {
//             return k(t)
//         },
//         conversations: function(t) {
//             return k(t)
//         },
//         Enum: {
//             Events: r
//         }
//     }, window.addEventListener("hashchange", R), window.location.hash && window.addEventListener("load", R), function(t) {
//         P.apply(this, arguments)
//     }(D()))
// }();