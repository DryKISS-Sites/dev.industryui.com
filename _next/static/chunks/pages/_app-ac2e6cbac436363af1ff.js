_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[20],{10:function(t,e,n){n("GcxT"),t.exports=n("nOHt")},"1TCz":function(t,e,n){"use strict";n.r(e);var i=n("nKUr"),r=n("rePB"),o=n("VX74"),s=n("mrSG"),c=n("Yzoe"),a=function(t){function e(e){var n=t.call(this)||this;return e instanceof c.SubscriptionClient?n.subscriptionClient=e:n.subscriptionClient=new c.SubscriptionClient(e.uri,e.options,e.webSocketImpl),n}return Object(s.c)(e,t),e.prototype.request=function(t){return this.subscriptionClient.request(t)},e}(n("Bdln").ApolloLink),u=n("H8+m"),l=n("oY9k"),h=n.n(l),p=n("E9Ay"),f=n("e+cM"),d=n("h4VS"),y=n("vOnD");function v(){var t=Object(d.a)(["\n\nhtml{\n  overflow-x: hidden;\n}\n  * {\n    &::-webkit-scrollbar {\n      width: 6px;\n      background-color: ",";\n    }\n\n    &::-webkit-scrollbar-thumb {\n      border-radius: 10px;\n      background-color: ",";\n    }\n  }\n\n"]);return v=function(){return t},t}var m=Object(y.b)(v(),(function(t){return t.theme.COLOUR.lighterGray}),(function(t){return t.theme.COLOUR.lightGray})),b=function(t){var e=t.children;return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(f.d,{}),Object(i.jsxs)("main",{children:[e,Object(i.jsx)(p.s,{marginBottom:"lg"})]}),Object(i.jsx)(f.c,{}),Object(i.jsx)(m,{})]})},O=n("rOcY");function w(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?w(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var T="";T=window.localStorage.getItem("bearerToken");var g=new o.HttpLink({fetch:h.a,uri:"https://api-staging.cleverly.works/v1/graphql"}),I=g;I=new a({uri:"wss://api-staging.cleverly.works/v1/graphql",options:{reconnect:!0,connectionParams:{headers:{authorization:T?"Bearer ".concat(T):""}}}});var C=Object(o.split)((function(t){var e=t.query,n=Object(u.p)(e),i=n.kind,r=n.operation;return"OperationDefinition"===i&&"subscription"===r}),I,g),E=new o.ApolloLink((function(t,e){return T&&t.setContext((function(t){var e=t.headers;return{headers:_(_({},void 0===e?{}:e),{},{authorization:"Bearer ".concat(T)})}})),e(t)})),N=new o.ApolloClient({cache:new o.InMemoryCache,defaultOptions:{watchQuery:{fetchPolicy:"cache-and-network",errorPolicy:"all"},query:{fetchPolicy:"network-only",errorPolicy:"all"},mutate:{errorPolicy:"all"}},link:Object(o.from)([E,C]),name:"cleverlyGQL",version:"1.0"});e.default=function(t){return Object(i.jsx)(p.n,_({apolloClient:N,config:_(_({},O.c),{},{AccessPages:O.a,AccessRules:O.b}),Layout:b,pageProgressBar:!0,theme:O.d,user:!0},t))}},C2QD:function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}},GcxT:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("1TCz")}])},HsqM:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return null!==t&&"object"===typeof t}},Nj7N:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){throw new Error("Static Class")}return t.GQL_CONNECTION_INIT="connection_init",t.GQL_CONNECTION_ACK="connection_ack",t.GQL_CONNECTION_ERROR="connection_error",t.GQL_CONNECTION_KEEP_ALIVE="ka",t.GQL_CONNECTION_TERMINATE="connection_terminate",t.GQL_START="start",t.GQL_DATA="data",t.GQL_ERROR="error",t.GQL_COMPLETE="complete",t.GQL_STOP="stop",t.SUBSCRIPTION_START="subscription_start",t.SUBSCRIPTION_DATA="subscription_data",t.SUBSCRIPTION_SUCCESS="subscription_success",t.SUBSCRIPTION_FAIL="subscription_fail",t.SUBSCRIPTION_END="subscription_end",t.INIT="init",t.INIT_SUCCESS="init_success",t.INIT_FAIL="init_fail",t.KEEP_ALIVE="keepalive",t}();e.default=i},Qcyp:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return"string"===typeof t}},SYjR:function(t,e,n){"use strict";n.r(e),n.d(e,"getOperationAST",(function(){return r}));var i=n("/jXB");function r(t,e){for(var n=null,r=0,o=t.definitions;r<o.length;r++){var s=o[r];if(s.kind===i.a.OPERATION_DEFINITION)if(e){if(s.name&&s.name.value===e)return s}else{if(n)return null;n=s}}return n}},Yzoe:function(t,e,n){"use strict";(function(t){var i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},r=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,o){function s(t){try{a(i.next(t))}catch(e){o(e)}}function c(t){try{a(i.throw(t))}catch(e){o(e)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,c)}a((i=i.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var n,i,r,o,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,i=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(r=(r=s.trys).length>0&&r[r.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){s.label=o[1];break}if(6===o[0]&&s.label<r[1]){s.label=r[1],r=o;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(o);break}r[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(c){o=[6,c],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},s=this&&this.__spreadArrays||function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var i=Array(t),r=0;for(e=0;e<n;e++)for(var o=arguments[e],s=0,c=o.length;s<c;s++,r++)i[r]=o[s];return i};Object.defineProperty(e,"__esModule",{value:!0}),e.SubscriptionClient=void 0;var c="undefined"!==typeof t?t:"undefined"!==typeof window?window:{},a=c.WebSocket||c.MozWebSocket,u=n("C2QD"),l=n("uhBA"),h=n("Qcyp"),p=n("HsqM"),f=n("dQau"),d=n("SYjR"),y=n("bCCX"),v=n("yiBj"),m=n("jZto"),b=n("Nj7N"),O=function(){function t(t,e,n,i){var r=e||{},o=r.connectionCallback,s=void 0===o?void 0:o,c=r.connectionParams,h=void 0===c?{}:c,p=r.minTimeout,f=void 0===p?m.MIN_WS_TIMEOUT:p,d=r.timeout,y=void 0===d?m.WS_TIMEOUT:d,b=r.reconnect,O=void 0!==b&&b,w=r.reconnectionAttempts,_=void 0===w?1/0:w,T=r.lazy,g=void 0!==T&&T,I=r.inactivityTimeout,C=void 0===I?0:I,E=r.wsOptionArguments,N=void 0===E?[]:E;if(this.wsImpl=n||a,!this.wsImpl)throw new Error("Unable to find native implementation, or alternative implementation for WebSocket!");this.wsProtocols=i||v.GRAPHQL_WS,this.connectionCallback=s,this.url=t,this.operations={},this.nextOperationId=0,this.minWsTimeout=f,this.wsTimeout=y,this.unsentMessagesQueue=[],this.reconnect=O,this.reconnecting=!1,this.reconnectionAttempts=_,this.lazy=!!g,this.inactivityTimeout=C,this.closedByUser=!1,this.backoff=new u({jitter:.5}),this.eventEmitter=new l.EventEmitter,this.middlewares=[],this.client=null,this.maxConnectTimeGenerator=this.createMaxConnectTimeGenerator(),this.connectionParams=this.getConnectionParams(h),this.wsOptionArguments=N,this.lazy||this.connect()}return Object.defineProperty(t.prototype,"status",{get:function(){return null===this.client?this.wsImpl.CLOSED:this.client.readyState},enumerable:!1,configurable:!0}),t.prototype.close=function(t,e){void 0===t&&(t=!0),void 0===e&&(e=!0),this.clearInactivityTimeout(),null!==this.client&&(this.closedByUser=e,t&&(this.clearCheckConnectionInterval(),this.clearMaxConnectTimeout(),this.clearTryReconnectTimeout(),this.unsubscribeAll(),this.sendMessage(void 0,b.default.GQL_CONNECTION_TERMINATE,null)),this.client.close(),this.client.onopen=null,this.client.onclose=null,this.client.onerror=null,this.client.onmessage=null,this.client=null,this.eventEmitter.emit("disconnected"),t||this.tryReconnect())},t.prototype.request=function(t){var e,n,i=this.getObserver.bind(this),r=this.executeOperation.bind(this),o=this.unsubscribe.bind(this);return this.clearInactivityTimeout(),(e={})[y.default]=function(){return this},e.subscribe=function(e,s,c){var a=i(e,s,c);return n=r(t,(function(t,e){null===t&&null===e?a.complete&&a.complete():t?a.error&&a.error(t[0]):a.next&&a.next(e)})),{unsubscribe:function(){n&&(o(n),n=null)}}},e},t.prototype.on=function(t,e,n){var i=this.eventEmitter.on(t,e,n);return function(){i.off(t,e,n)}},t.prototype.onConnected=function(t,e){return this.on("connected",t,e)},t.prototype.onConnecting=function(t,e){return this.on("connecting",t,e)},t.prototype.onDisconnected=function(t,e){return this.on("disconnected",t,e)},t.prototype.onReconnected=function(t,e){return this.on("reconnected",t,e)},t.prototype.onReconnecting=function(t,e){return this.on("reconnecting",t,e)},t.prototype.onError=function(t,e){return this.on("error",t,e)},t.prototype.unsubscribeAll=function(){var t=this;Object.keys(this.operations).forEach((function(e){t.unsubscribe(e)}))},t.prototype.applyMiddlewares=function(t){var e=this;return new Promise((function(n,i){!function(e,r){var o=function(s){if(s)i(s);else if(e.length>0){var c=e.shift();c&&c.applyMiddleware.apply(r,[t,o])}else n(t)};o()}(s(e.middlewares),e)}))},t.prototype.use=function(t){var e=this;return t.map((function(t){if("function"!==typeof t.applyMiddleware)throw new Error("Middleware must implement the applyMiddleware function.");e.middlewares.push(t)})),this},t.prototype.getConnectionParams=function(t){return function(){return new Promise((function(e,n){if("function"===typeof t)try{return e(t.call(null))}catch(i){return n(i)}e(t)}))}},t.prototype.executeOperation=function(t,e){var n=this;null===this.client&&this.connect();var i=this.generateOperationId();return this.operations[i]={options:t,handler:e},this.applyMiddlewares(t).then((function(t){n.checkOperationOptions(t,e),n.operations[i]&&(n.operations[i]={options:t,handler:e},n.sendMessage(i,b.default.GQL_START,t))})).catch((function(t){n.unsubscribe(i),e(n.formatErrors(t))})),i},t.prototype.getObserver=function(t,e,n){return"function"===typeof t?{next:function(e){return t(e)},error:function(t){return e&&e(t)},complete:function(){return n&&n()}}:t},t.prototype.createMaxConnectTimeGenerator=function(){var t=this.minWsTimeout,e=this.wsTimeout;return new u({min:t,max:e,factor:1.2})},t.prototype.clearCheckConnectionInterval=function(){this.checkConnectionIntervalId&&(clearInterval(this.checkConnectionIntervalId),this.checkConnectionIntervalId=null)},t.prototype.clearMaxConnectTimeout=function(){this.maxConnectTimeoutId&&(clearTimeout(this.maxConnectTimeoutId),this.maxConnectTimeoutId=null)},t.prototype.clearTryReconnectTimeout=function(){this.tryReconnectTimeoutId&&(clearTimeout(this.tryReconnectTimeoutId),this.tryReconnectTimeoutId=null)},t.prototype.clearInactivityTimeout=function(){this.inactivityTimeoutId&&(clearTimeout(this.inactivityTimeoutId),this.inactivityTimeoutId=null)},t.prototype.setInactivityTimeout=function(){var t=this;this.inactivityTimeout>0&&0===Object.keys(this.operations).length&&(this.inactivityTimeoutId=setTimeout((function(){0===Object.keys(t.operations).length&&t.close()}),this.inactivityTimeout))},t.prototype.checkOperationOptions=function(t,e){var n=t.query,i=t.variables,r=t.operationName;if(!n)throw new Error("Must provide a query.");if(!e)throw new Error("Must provide an handler.");if(!h.default(n)&&!d.getOperationAST(n,r)||r&&!h.default(r)||i&&!p.default(i))throw new Error("Incorrect option types. query must be a string or a document,`operationName` must be a string, and `variables` must be an object.")},t.prototype.buildMessage=function(t,e,n){return{id:t,type:e,payload:n&&n.query?i(i({},n),{query:"string"===typeof n.query?n.query:f.print(n.query)}):n}},t.prototype.formatErrors=function(t){return Array.isArray(t)?t:t&&t.errors?this.formatErrors(t.errors):t&&t.message?[t]:[{name:"FormatedError",message:"Unknown error",originalError:t}]},t.prototype.sendMessage=function(t,e,n){this.sendMessageRaw(this.buildMessage(t,e,n))},t.prototype.sendMessageRaw=function(t){switch(this.status){case this.wsImpl.OPEN:var e=JSON.stringify(t);try{JSON.parse(e)}catch(n){this.eventEmitter.emit("error",new Error("Message must be JSON-serializable. Got: "+t))}this.client.send(e);break;case this.wsImpl.CONNECTING:this.unsentMessagesQueue.push(t);break;default:this.reconnecting||this.eventEmitter.emit("error",new Error("A message was not sent because socket is not connected, is closing or is already closed. Message was: "+JSON.stringify(t)))}},t.prototype.generateOperationId=function(){return String(++this.nextOperationId)},t.prototype.tryReconnect=function(){var t=this;if(this.reconnect&&!(this.backoff.attempts>=this.reconnectionAttempts)){this.reconnecting||(Object.keys(this.operations).forEach((function(e){t.unsentMessagesQueue.push(t.buildMessage(e,b.default.GQL_START,t.operations[e].options))})),this.reconnecting=!0),this.clearTryReconnectTimeout();var e=this.backoff.duration();this.tryReconnectTimeoutId=setTimeout((function(){t.connect()}),e)}},t.prototype.flushUnsentMessagesQueue=function(){var t=this;this.unsentMessagesQueue.forEach((function(e){t.sendMessageRaw(e)})),this.unsentMessagesQueue=[]},t.prototype.checkConnection=function(){this.wasKeepAliveReceived?this.wasKeepAliveReceived=!1:this.reconnecting||this.close(!1,!0)},t.prototype.checkMaxConnectTimeout=function(){var t=this;this.clearMaxConnectTimeout(),this.maxConnectTimeoutId=setTimeout((function(){t.status!==t.wsImpl.OPEN&&(t.reconnecting=!0,t.close(!1,!0))}),this.maxConnectTimeGenerator.duration())},t.prototype.connect=function(){var t,e=this;this.client=new((t=this.wsImpl).bind.apply(t,s([void 0,this.url,this.wsProtocols],this.wsOptionArguments))),this.checkMaxConnectTimeout(),this.client.onopen=function(){return r(e,void 0,void 0,(function(){var t,e;return o(this,(function(n){switch(n.label){case 0:if(this.status!==this.wsImpl.OPEN)return[3,4];this.clearMaxConnectTimeout(),this.closedByUser=!1,this.eventEmitter.emit(this.reconnecting?"reconnecting":"connecting"),n.label=1;case 1:return n.trys.push([1,3,,4]),[4,this.connectionParams()];case 2:return t=n.sent(),this.sendMessage(void 0,b.default.GQL_CONNECTION_INIT,t),this.flushUnsentMessagesQueue(),[3,4];case 3:return e=n.sent(),this.sendMessage(void 0,b.default.GQL_CONNECTION_ERROR,e),this.flushUnsentMessagesQueue(),[3,4];case 4:return[2]}}))}))},this.client.onclose=function(){e.closedByUser||e.close(!1,!1)},this.client.onerror=function(t){e.eventEmitter.emit("error",t)},this.client.onmessage=function(t){var n=t.data;e.processReceivedData(n)}},t.prototype.processReceivedData=function(t){var e,n;try{n=(e=JSON.parse(t)).id}catch(c){throw new Error("Message must be JSON-parseable. Got: "+t)}if(-1===[b.default.GQL_DATA,b.default.GQL_COMPLETE,b.default.GQL_ERROR].indexOf(e.type)||this.operations[n])switch(e.type){case b.default.GQL_CONNECTION_ERROR:this.connectionCallback&&this.connectionCallback(e.payload);break;case b.default.GQL_CONNECTION_ACK:this.eventEmitter.emit(this.reconnecting?"reconnected":"connected",e.payload),this.reconnecting=!1,this.backoff.reset(),this.maxConnectTimeGenerator.reset(),this.connectionCallback&&this.connectionCallback();break;case b.default.GQL_COMPLETE:var r=this.operations[n].handler;delete this.operations[n],r.call(this,null,null);break;case b.default.GQL_ERROR:this.operations[n].handler(this.formatErrors(e.payload),null),delete this.operations[n];break;case b.default.GQL_DATA:var o=e.payload.errors?i(i({},e.payload),{errors:this.formatErrors(e.payload.errors)}):e.payload;this.operations[n].handler(null,o);break;case b.default.GQL_CONNECTION_KEEP_ALIVE:var s="undefined"===typeof this.wasKeepAliveReceived;this.wasKeepAliveReceived=!0,s&&this.checkConnection(),this.checkConnectionIntervalId&&(clearInterval(this.checkConnectionIntervalId),this.checkConnection()),this.checkConnectionIntervalId=setInterval(this.checkConnection.bind(this),this.wsTimeout);break;default:throw new Error("Invalid message type!")}else this.unsubscribe(n)},t.prototype.unsubscribe=function(t){this.operations[t]&&(delete this.operations[t],this.setInactivityTimeout(),this.sendMessage(t,b.default.GQL_STOP,void 0))},t}();e.SubscriptionClient=O}).call(this,n("yLpj"))},jZto:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.WS_TIMEOUT=e.MIN_WS_TIMEOUT=void 0;e.MIN_WS_TIMEOUT=1e3;e.WS_TIMEOUT=3e4},oY9k:function(t,e,n){"use strict";var i=function(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof i)return i;throw new Error("unable to locate global object")}();t.exports=e=i.fetch,i.fetch&&(e.default=i.fetch.bind(i)),e.Headers=i.Headers,e.Request=i.Request,e.Response=i.Response},uhBA:function(t,e,n){"use strict";var i=Object.prototype.hasOwnProperty,r="~";function o(){}function s(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function c(t,e,n,i,o){if("function"!==typeof n)throw new TypeError("The listener must be a function");var c=new s(n,i||t,o),a=r?r+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],c]:t._events[a].push(c):(t._events[a]=c,t._eventsCount++),t}function a(t,e){0===--t._eventsCount?t._events=new o:delete t._events[e]}function u(){this._events=new o,this._eventsCount=0}Object.create&&(o.prototype=Object.create(null),(new o).__proto__||(r=!1)),u.prototype.eventNames=function(){var t,e,n=[];if(0===this._eventsCount)return n;for(e in t=this._events)i.call(t,e)&&n.push(r?e.slice(1):e);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(t)):n},u.prototype.listeners=function(t){var e=r?r+t:t,n=this._events[e];if(!n)return[];if(n.fn)return[n.fn];for(var i=0,o=n.length,s=new Array(o);i<o;i++)s[i]=n[i].fn;return s},u.prototype.listenerCount=function(t){var e=r?r+t:t,n=this._events[e];return n?n.fn?1:n.length:0},u.prototype.emit=function(t,e,n,i,o,s){var c=r?r+t:t;if(!this._events[c])return!1;var a,u,l=this._events[c],h=arguments.length;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),h){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,n),!0;case 4:return l.fn.call(l.context,e,n,i),!0;case 5:return l.fn.call(l.context,e,n,i,o),!0;case 6:return l.fn.call(l.context,e,n,i,o,s),!0}for(u=1,a=new Array(h-1);u<h;u++)a[u-1]=arguments[u];l.fn.apply(l.context,a)}else{var p,f=l.length;for(u=0;u<f;u++)switch(l[u].once&&this.removeListener(t,l[u].fn,void 0,!0),h){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,e);break;case 3:l[u].fn.call(l[u].context,e,n);break;case 4:l[u].fn.call(l[u].context,e,n,i);break;default:if(!a)for(p=1,a=new Array(h-1);p<h;p++)a[p-1]=arguments[p];l[u].fn.apply(l[u].context,a)}}return!0},u.prototype.on=function(t,e,n){return c(this,t,e,n,!1)},u.prototype.once=function(t,e,n){return c(this,t,e,n,!0)},u.prototype.removeListener=function(t,e,n,i){var o=r?r+t:t;if(!this._events[o])return this;if(!e)return a(this,o),this;var s=this._events[o];if(s.fn)s.fn!==e||i&&!s.once||n&&s.context!==n||a(this,o);else{for(var c=0,u=[],l=s.length;c<l;c++)(s[c].fn!==e||i&&!s[c].once||n&&s[c].context!==n)&&u.push(s[c]);u.length?this._events[o]=1===u.length?u[0]:u:a(this,o)}return this},u.prototype.removeAllListeners=function(t){var e;return t?(e=r?r+t:t,this._events[e]&&a(this,e)):(this._events=new o,this._eventsCount=0),this},u.prototype.off=u.prototype.removeListener,u.prototype.addListener=u.prototype.on,u.prefixed=r,u.EventEmitter=u,t.exports=u},yiBj:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GRAPHQL_SUBSCRIPTIONS=e.GRAPHQL_WS=void 0;e.GRAPHQL_WS="graphql-ws";e.GRAPHQL_SUBSCRIPTIONS="graphql-subscriptions"}},[[10,1,2,12,7,10,6,5,3,13,4,9,8,0,11,15]]]);