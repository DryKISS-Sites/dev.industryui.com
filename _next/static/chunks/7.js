(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[7],{

/***/ "./node_modules/audio-recorder-polyfill/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/audio-recorder-polyfill/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wave_encoder_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wave-encoder/index.js */ \"./node_modules/audio-recorder-polyfill/wave-encoder/index.js\");\n\n\nlet AudioContext = window.AudioContext || window.webkitAudioContext\n\nlet createWorker = fn => {\n  let js = fn\n    .toString()\n    .replace(/^(\\(\\)\\s*=>|function\\s*\\(\\))\\s*{/, '')\n    .replace(/}$/, '')\n  let blob = new Blob([js])\n  return new Worker(URL.createObjectURL(blob))\n}\n\nlet error = method => {\n  let event = new Event('error')\n  event.data = new Error('Wrong state for ' + method)\n  return event\n}\n\nlet context\n\n/**\n * Audio Recorder with MediaRecorder API.\n *\n * @example\n * navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {\n *   let recorder = new MediaRecorder(stream)\n * })\n */\nclass MediaRecorder {\n  /**\n   * @param {MediaStream} stream The audio stream to record.\n   */\n  constructor (stream, config = null) {\n    /**\n     * The `MediaStream` passed into the constructor.\n     * @type {MediaStream}\n     */\n    this.stream = stream\n    this.config = config\n    /**\n     * The current state of recording process.\n     * @type {\"inactive\"|\"recording\"|\"paused\"}\n     */\n    this.state = 'inactive'\n\n    this.em = document.createDocumentFragment()\n    this.encoder = createWorker(MediaRecorder.encoder)\n\n    let recorder = this\n    this.encoder.addEventListener('message', e => {\n      let event = new Event('dataavailable')\n      event.data = new Blob([e.data], { type: recorder.mimeType })\n      recorder.em.dispatchEvent(event)\n      if (recorder.state === 'inactive') {\n        recorder.em.dispatchEvent(new Event('stop'))\n      }\n    })\n  }\n\n  /**\n   * Begins recording media.\n   *\n   * @param {number} [timeslice] The milliseconds to record into each `Blob`.\n   *                             If this parameter isn’t included, single `Blob`\n   *                             will be recorded.\n   *\n   * @return {undefined}\n   *\n   * @example\n   * recordButton.addEventListener('click', () => {\n   *   recorder.start()\n   * })\n   */\n  start (timeslice) {\n    if (this.state !== 'inactive') {\n      return this.em.dispatchEvent(error('start'))\n    }\n\n    this.state = 'recording'\n\n    if (!context) {\n      context = new AudioContext(this.config)\n    }\n    this.clone = this.stream.clone()\n    this.input = context.createMediaStreamSource(this.clone)\n    this.processor = context.createScriptProcessor(2048, 1, 1)\n\n    this.encoder.postMessage(['init', context.sampleRate])\n\n    this.processor.onaudioprocess = e => {\n      if (this.state === 'recording') {\n        this.encoder.postMessage(['encode', e.inputBuffer.getChannelData(0)])\n      }\n    }\n\n    this.input.connect(this.processor)\n    this.processor.connect(context.destination)\n\n    this.em.dispatchEvent(new Event('start'))\n\n    if (timeslice) {\n      this.slicing = setInterval(() => {\n        if (this.state === 'recording') this.requestData()\n      }, timeslice)\n    }\n\n    return undefined\n  }\n\n  /**\n   * Stop media capture and raise `dataavailable` event with recorded data.\n   *\n   * @return {undefined}\n   *\n   * @example\n   * finishButton.addEventListener('click', () => {\n   *   recorder.stop()\n   * })\n   */\n  stop () {\n    if (this.state === 'inactive') {\n      return this.em.dispatchEvent(error('stop'))\n    }\n\n    this.requestData()\n    this.state = 'inactive'\n    this.clone.getTracks().forEach(track => {\n      track.stop()\n    })\n    this.processor.disconnect()\n    this.input.disconnect()\n    return clearInterval(this.slicing)\n  }\n\n  /**\n   * Pauses recording of media streams.\n   *\n   * @return {undefined}\n   *\n   * @example\n   * pauseButton.addEventListener('click', () => {\n   *   recorder.pause()\n   * })\n   */\n  pause () {\n    if (this.state !== 'recording') {\n      return this.em.dispatchEvent(error('pause'))\n    }\n\n    this.state = 'paused'\n    return this.em.dispatchEvent(new Event('pause'))\n  }\n\n  /**\n   * Resumes media recording when it has been previously paused.\n   *\n   * @return {undefined}\n   *\n   * @example\n   * resumeButton.addEventListener('click', () => {\n   *   recorder.resume()\n   * })\n   */\n  resume () {\n    if (this.state !== 'paused') {\n      return this.em.dispatchEvent(error('resume'))\n    }\n\n    this.state = 'recording'\n    return this.em.dispatchEvent(new Event('resume'))\n  }\n\n  /**\n   * Raise a `dataavailable` event containing the captured media.\n   *\n   * @return {undefined}\n   *\n   * @example\n   * this.on('nextData', () => {\n   *   recorder.requestData()\n   * })\n   */\n  requestData () {\n    if (this.state === 'inactive') {\n      return this.em.dispatchEvent(error('requestData'))\n    }\n\n    return this.encoder.postMessage(['dump', context.sampleRate])\n  }\n\n  /**\n   * Add listener for specified event type.\n   *\n   * @param {\"start\"|\"stop\"|\"pause\"|\"resume\"|\"dataavailable\"|\"error\"}\n   * type Event type.\n   * @param {function} listener The listener function.\n   *\n   * @return {undefined}\n   *\n   * @example\n   * recorder.addEventListener('dataavailable', e => {\n   *   audio.src = URL.createObjectURL(e.data)\n   * })\n   */\n  addEventListener (...args) {\n    this.em.addEventListener(...args)\n  }\n\n  /**\n   * Remove event listener.\n   *\n   * @param {\"start\"|\"stop\"|\"pause\"|\"resume\"|\"dataavailable\"|\"error\"}\n   * type Event type.\n   * @param {function} listener The same function used in `addEventListener`.\n   *\n   * @return {undefined}\n   */\n  removeEventListener (...args) {\n    this.em.removeEventListener(...args)\n  }\n\n  /**\n   * Calls each of the listeners registered for a given event.\n   *\n   * @param {Event} event The event object.\n   *\n   * @return {boolean} Is event was no canceled by any listener.\n   */\n  dispatchEvent (...args) {\n    this.em.dispatchEvent(...args)\n  }\n}\n\n/**\n * The MIME type that is being used for recording.\n * @type {string}\n */\nMediaRecorder.prototype.mimeType = 'audio/wav'\n\n/**\n * Returns `true` if the MIME type specified is one the polyfill can record.\n *\n * This polyfill supports `audio/wav` and `audio/mpeg`.\n *\n * @param {string} mimeType The mimeType to check.\n *\n * @return {boolean} `true` on `audio/wav` and `audio/mpeg` MIME type.\n */\nMediaRecorder.isTypeSupported = mimeType => {\n  return MediaRecorder.prototype.mimeType === mimeType\n}\n\n/**\n * `true` if MediaRecorder can not be polyfilled in the current browser.\n * @type {boolean}\n *\n * @example\n * if (MediaRecorder.notSupported) {\n *   showWarning('Audio recording is not supported in this browser')\n * }\n */\nMediaRecorder.notSupported = !navigator.mediaDevices || !AudioContext\n\n/**\n * Converts RAW audio buffer to compressed audio files.\n * It will be loaded to Web Worker.\n * By default, WAVE encoder will be used.\n * @type {function}\n *\n * @example\n * MediaRecorder.prototype.mimeType = 'audio/ogg'\n * MediaRecorder.encoder = oggEncoder\n */\nMediaRecorder.encoder = _wave_encoder_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MediaRecorder);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2F1ZGlvLXJlY29yZGVyLXBvbHlmaWxsL2luZGV4LmpzPzFlYWEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFpRDs7QUFFakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDLGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMEJBQTBCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw4REFBVzs7QUFFcEIsNEVBQWEiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXVkaW8tcmVjb3JkZXItcG9seWZpbGwvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2F2ZUVuY29kZXIgZnJvbSAnLi93YXZlLWVuY29kZXIvaW5kZXguanMnXG5cbmxldCBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHRcblxubGV0IGNyZWF0ZVdvcmtlciA9IGZuID0+IHtcbiAgbGV0IGpzID0gZm5cbiAgICAudG9TdHJpbmcoKVxuICAgIC5yZXBsYWNlKC9eKFxcKFxcKVxccyo9PnxmdW5jdGlvblxccypcXChcXCkpXFxzKnsvLCAnJylcbiAgICAucmVwbGFjZSgvfSQvLCAnJylcbiAgbGV0IGJsb2IgPSBuZXcgQmxvYihbanNdKVxuICByZXR1cm4gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKVxufVxuXG5sZXQgZXJyb3IgPSBtZXRob2QgPT4ge1xuICBsZXQgZXZlbnQgPSBuZXcgRXZlbnQoJ2Vycm9yJylcbiAgZXZlbnQuZGF0YSA9IG5ldyBFcnJvcignV3Jvbmcgc3RhdGUgZm9yICcgKyBtZXRob2QpXG4gIHJldHVybiBldmVudFxufVxuXG5sZXQgY29udGV4dFxuXG4vKipcbiAqIEF1ZGlvIFJlY29yZGVyIHdpdGggTWVkaWFSZWNvcmRlciBBUEkuXG4gKlxuICogQGV4YW1wbGVcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSkudGhlbihzdHJlYW0gPT4ge1xuICogICBsZXQgcmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcihzdHJlYW0pXG4gKiB9KVxuICovXG5jbGFzcyBNZWRpYVJlY29yZGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IHN0cmVhbSBUaGUgYXVkaW8gc3RyZWFtIHRvIHJlY29yZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChzdHJlYW0sIGNvbmZpZyA9IG51bGwpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYE1lZGlhU3RyZWFtYCBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IuXG4gICAgICogQHR5cGUge01lZGlhU3RyZWFtfVxuICAgICAqL1xuICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtXG4gICAgdGhpcy5jb25maWcgPSBjb25maWdcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiByZWNvcmRpbmcgcHJvY2Vzcy5cbiAgICAgKiBAdHlwZSB7XCJpbmFjdGl2ZVwifFwicmVjb3JkaW5nXCJ8XCJwYXVzZWRcIn1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXRlID0gJ2luYWN0aXZlJ1xuXG4gICAgdGhpcy5lbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgIHRoaXMuZW5jb2RlciA9IGNyZWF0ZVdvcmtlcihNZWRpYVJlY29yZGVyLmVuY29kZXIpXG5cbiAgICBsZXQgcmVjb3JkZXIgPSB0aGlzXG4gICAgdGhpcy5lbmNvZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBlID0+IHtcbiAgICAgIGxldCBldmVudCA9IG5ldyBFdmVudCgnZGF0YWF2YWlsYWJsZScpXG4gICAgICBldmVudC5kYXRhID0gbmV3IEJsb2IoW2UuZGF0YV0sIHsgdHlwZTogcmVjb3JkZXIubWltZVR5cGUgfSlcbiAgICAgIHJlY29yZGVyLmVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgICBpZiAocmVjb3JkZXIuc3RhdGUgPT09ICdpbmFjdGl2ZScpIHtcbiAgICAgICAgcmVjb3JkZXIuZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3N0b3AnKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyByZWNvcmRpbmcgbWVkaWEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZXNsaWNlXSBUaGUgbWlsbGlzZWNvbmRzIHRvIHJlY29yZCBpbnRvIGVhY2ggYEJsb2JgLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgdGhpcyBwYXJhbWV0ZXIgaXNu4oCZdCBpbmNsdWRlZCwgc2luZ2xlIGBCbG9iYFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbCBiZSByZWNvcmRlZC5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByZWNvcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIuc3RhcnQoKVxuICAgKiB9KVxuICAgKi9cbiAgc3RhcnQgKHRpbWVzbGljZSkge1xuICAgIGlmICh0aGlzLnN0YXRlICE9PSAnaW5hY3RpdmUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdzdGFydCcpKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSAncmVjb3JkaW5nJ1xuXG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCh0aGlzLmNvbmZpZylcbiAgICB9XG4gICAgdGhpcy5jbG9uZSA9IHRoaXMuc3RyZWFtLmNsb25lKClcbiAgICB0aGlzLmlucHV0ID0gY29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZSh0aGlzLmNsb25lKVxuICAgIHRoaXMucHJvY2Vzc29yID0gY29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoMjA0OCwgMSwgMSlcblxuICAgIHRoaXMuZW5jb2Rlci5wb3N0TWVzc2FnZShbJ2luaXQnLCBjb250ZXh0LnNhbXBsZVJhdGVdKVxuXG4gICAgdGhpcy5wcm9jZXNzb3Iub25hdWRpb3Byb2Nlc3MgPSBlID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVjb3JkaW5nJykge1xuICAgICAgICB0aGlzLmVuY29kZXIucG9zdE1lc3NhZ2UoWydlbmNvZGUnLCBlLmlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKDApXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlucHV0LmNvbm5lY3QodGhpcy5wcm9jZXNzb3IpXG4gICAgdGhpcy5wcm9jZXNzb3IuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKVxuXG4gICAgdGhpcy5lbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc3RhcnQnKSlcblxuICAgIGlmICh0aW1lc2xpY2UpIHtcbiAgICAgIHRoaXMuc2xpY2luZyA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09ICdyZWNvcmRpbmcnKSB0aGlzLnJlcXVlc3REYXRhKClcbiAgICAgIH0sIHRpbWVzbGljZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICAvKipcbiAgICogU3RvcCBtZWRpYSBjYXB0dXJlIGFuZCByYWlzZSBgZGF0YWF2YWlsYWJsZWAgZXZlbnQgd2l0aCByZWNvcmRlZCBkYXRhLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGZpbmlzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICogICByZWNvcmRlci5zdG9wKClcbiAgICogfSlcbiAgICovXG4gIHN0b3AgKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAnaW5hY3RpdmUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KGVycm9yKCdzdG9wJykpXG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpXG4gICAgdGhpcy5zdGF0ZSA9ICdpbmFjdGl2ZSdcbiAgICB0aGlzLmNsb25lLmdldFRyYWNrcygpLmZvckVhY2godHJhY2sgPT4ge1xuICAgICAgdHJhY2suc3RvcCgpXG4gICAgfSlcbiAgICB0aGlzLnByb2Nlc3Nvci5kaXNjb25uZWN0KClcbiAgICB0aGlzLmlucHV0LmRpc2Nvbm5lY3QoKVxuICAgIHJldHVybiBjbGVhckludGVydmFsKHRoaXMuc2xpY2luZylcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgcmVjb3JkaW5nIG9mIG1lZGlhIHN0cmVhbXMuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcGF1c2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAqICAgcmVjb3JkZXIucGF1c2UoKVxuICAgKiB9KVxuICAgKi9cbiAgcGF1c2UgKCkge1xuICAgIGlmICh0aGlzLnN0YXRlICE9PSAncmVjb3JkaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuZW0uZGlzcGF0Y2hFdmVudChlcnJvcigncGF1c2UnKSlcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gJ3BhdXNlZCdcbiAgICByZXR1cm4gdGhpcy5lbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncGF1c2UnKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN1bWVzIG1lZGlhIHJlY29yZGluZyB3aGVuIGl0IGhhcyBiZWVuIHByZXZpb3VzbHkgcGF1c2VkLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJlc3VtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICogICByZWNvcmRlci5yZXN1bWUoKVxuICAgKiB9KVxuICAgKi9cbiAgcmVzdW1lICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ3BhdXNlZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoZXJyb3IoJ3Jlc3VtZScpKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSAncmVjb3JkaW5nJ1xuICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXN1bWUnKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSYWlzZSBhIGBkYXRhYXZhaWxhYmxlYCBldmVudCBjb250YWluaW5nIHRoZSBjYXB0dXJlZCBtZWRpYS5cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB0aGlzLm9uKCduZXh0RGF0YScsICgpID0+IHtcbiAgICogICByZWNvcmRlci5yZXF1ZXN0RGF0YSgpXG4gICAqIH0pXG4gICAqL1xuICByZXF1ZXN0RGF0YSAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdpbmFjdGl2ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtLmRpc3BhdGNoRXZlbnQoZXJyb3IoJ3JlcXVlc3REYXRhJykpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZW5jb2Rlci5wb3N0TWVzc2FnZShbJ2R1bXAnLCBjb250ZXh0LnNhbXBsZVJhdGVdKVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBsaXN0ZW5lciBmb3Igc3BlY2lmaWVkIGV2ZW50IHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7XCJzdGFydFwifFwic3RvcFwifFwicGF1c2VcInxcInJlc3VtZVwifFwiZGF0YWF2YWlsYWJsZVwifFwiZXJyb3JcIn1cbiAgICogdHlwZSBFdmVudCB0eXBlLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcmVjb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignZGF0YWF2YWlsYWJsZScsIGUgPT4ge1xuICAgKiAgIGF1ZGlvLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZS5kYXRhKVxuICAgKiB9KVxuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lciAoLi4uYXJncykge1xuICAgIHRoaXMuZW0uYWRkRXZlbnRMaXN0ZW5lciguLi5hcmdzKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtcInN0YXJ0XCJ8XCJzdG9wXCJ8XCJwYXVzZVwifFwicmVzdW1lXCJ8XCJkYXRhYXZhaWxhYmxlXCJ8XCJlcnJvclwifVxuICAgKiB0eXBlIEV2ZW50IHR5cGUuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBzYW1lIGZ1bmN0aW9uIHVzZWQgaW4gYGFkZEV2ZW50TGlzdGVuZXJgLlxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyICguLi5hcmdzKSB7XG4gICAgdGhpcy5lbS5yZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpXG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgZWFjaCBvZiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IElzIGV2ZW50IHdhcyBubyBjYW5jZWxlZCBieSBhbnkgbGlzdGVuZXIuXG4gICAqL1xuICBkaXNwYXRjaEV2ZW50ICguLi5hcmdzKSB7XG4gICAgdGhpcy5lbS5kaXNwYXRjaEV2ZW50KC4uLmFyZ3MpXG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgTUlNRSB0eXBlIHRoYXQgaXMgYmVpbmcgdXNlZCBmb3IgcmVjb3JkaW5nLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuTWVkaWFSZWNvcmRlci5wcm90b3R5cGUubWltZVR5cGUgPSAnYXVkaW8vd2F2J1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBNSU1FIHR5cGUgc3BlY2lmaWVkIGlzIG9uZSB0aGUgcG9seWZpbGwgY2FuIHJlY29yZC5cbiAqXG4gKiBUaGlzIHBvbHlmaWxsIHN1cHBvcnRzIGBhdWRpby93YXZgIGFuZCBgYXVkaW8vbXBlZ2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1pbWVUeXBlIFRoZSBtaW1lVHlwZSB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgb24gYGF1ZGlvL3dhdmAgYW5kIGBhdWRpby9tcGVnYCBNSU1FIHR5cGUuXG4gKi9cbk1lZGlhUmVjb3JkZXIuaXNUeXBlU3VwcG9ydGVkID0gbWltZVR5cGUgPT4ge1xuICByZXR1cm4gTWVkaWFSZWNvcmRlci5wcm90b3R5cGUubWltZVR5cGUgPT09IG1pbWVUeXBlXG59XG5cbi8qKlxuICogYHRydWVgIGlmIE1lZGlhUmVjb3JkZXIgY2FuIG5vdCBiZSBwb2x5ZmlsbGVkIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqXG4gKiBAZXhhbXBsZVxuICogaWYgKE1lZGlhUmVjb3JkZXIubm90U3VwcG9ydGVkKSB7XG4gKiAgIHNob3dXYXJuaW5nKCdBdWRpbyByZWNvcmRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICogfVxuICovXG5NZWRpYVJlY29yZGVyLm5vdFN1cHBvcnRlZCA9ICFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIHx8ICFBdWRpb0NvbnRleHRcblxuLyoqXG4gKiBDb252ZXJ0cyBSQVcgYXVkaW8gYnVmZmVyIHRvIGNvbXByZXNzZWQgYXVkaW8gZmlsZXMuXG4gKiBJdCB3aWxsIGJlIGxvYWRlZCB0byBXZWIgV29ya2VyLlxuICogQnkgZGVmYXVsdCwgV0FWRSBlbmNvZGVyIHdpbGwgYmUgdXNlZC5cbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqXG4gKiBAZXhhbXBsZVxuICogTWVkaWFSZWNvcmRlci5wcm90b3R5cGUubWltZVR5cGUgPSAnYXVkaW8vb2dnJ1xuICogTWVkaWFSZWNvcmRlci5lbmNvZGVyID0gb2dnRW5jb2RlclxuICovXG5NZWRpYVJlY29yZGVyLmVuY29kZXIgPSB3YXZlRW5jb2RlclxuXG5leHBvcnQgZGVmYXVsdCBNZWRpYVJlY29yZGVyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/audio-recorder-polyfill/index.js\n");

/***/ }),

/***/ "./node_modules/audio-recorder-polyfill/wave-encoder/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/audio-recorder-polyfill/wave-encoder/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Copied from https://github.com/chris-rudmin/Recorderjs\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n  let BYTES_PER_SAMPLE = 2\n\n  let recorded = []\n\n  function encode (buffer) {\n    let length = buffer.length\n    let data = new Uint8Array(length * BYTES_PER_SAMPLE)\n    for (let i = 0; i < length; i++) {\n      let index = i * BYTES_PER_SAMPLE\n      let sample = buffer[i]\n      if (sample > 1) {\n        sample = 1\n      } else if (sample < -1) {\n        sample = -1\n      }\n      sample = sample * 32768\n      data[index] = sample\n      data[index + 1] = sample >> 8\n    }\n    recorded.push(data)\n  }\n\n  function dump (sampleRate) {\n    let bufferLength = recorded.length ? recorded[0].length : 0\n    let length = recorded.length * bufferLength\n    let wav = new Uint8Array(44 + length)\n    let view = new DataView(wav.buffer)\n\n    // RIFF identifier 'RIFF'\n    view.setUint32(0, 1380533830, false)\n    // file length minus RIFF identifier length and file description length\n    view.setUint32(4, 36 + length, true)\n    // RIFF type 'WAVE'\n    view.setUint32(8, 1463899717, false)\n    // format chunk identifier 'fmt '\n    view.setUint32(12, 1718449184, false)\n    // format chunk length\n    view.setUint32(16, 16, true)\n    // sample format (raw)\n    view.setUint16(20, 1, true)\n    // channel count\n    view.setUint16(22, 1, true)\n    // sample rate\n    view.setUint32(24, sampleRate, true)\n    // byte rate (sample rate * block align)\n    view.setUint32(28, sampleRate * BYTES_PER_SAMPLE, true)\n    // block align (channel count * bytes per sample)\n    view.setUint16(32, BYTES_PER_SAMPLE, true)\n    // bits per sample\n    view.setUint16(34, 8 * BYTES_PER_SAMPLE, true)\n    // data chunk identifier 'data'\n    view.setUint32(36, 1684108385, false)\n    // data chunk length\n    view.setUint32(40, length, true)\n\n    // eslint-disable-next-line unicorn/no-for-loop\n    for (let i = 0; i < recorded.length; i++) {\n      wav.set(recorded[i], i * bufferLength + 44)\n    }\n\n    recorded = []\n    postMessage(wav.buffer, [wav.buffer])\n  }\n\n  onmessage = e => {\n    if (e.data[0] === 'encode') {\n      encode(e.data[1])\n    } else if (e.data[0] === 'dump') {\n      dump(e.data[1])\n    }\n  }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2F1ZGlvLXJlY29yZGVyLXBvbHlmaWxsL3dhdmUtZW5jb2Rlci9pbmRleC5qcz9mOWZmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7O0FBRWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXVkaW8tcmVjb3JkZXItcG9seWZpbGwvd2F2ZS1lbmNvZGVyL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NocmlzLXJ1ZG1pbi9SZWNvcmRlcmpzXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgbGV0IEJZVEVTX1BFUl9TQU1QTEUgPSAyXG5cbiAgbGV0IHJlY29yZGVkID0gW11cblxuICBmdW5jdGlvbiBlbmNvZGUgKGJ1ZmZlcikge1xuICAgIGxldCBsZW5ndGggPSBidWZmZXIubGVuZ3RoXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGggKiBCWVRFU19QRVJfU0FNUExFKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGkgKiBCWVRFU19QRVJfU0FNUExFXG4gICAgICBsZXQgc2FtcGxlID0gYnVmZmVyW2ldXG4gICAgICBpZiAoc2FtcGxlID4gMSkge1xuICAgICAgICBzYW1wbGUgPSAxXG4gICAgICB9IGVsc2UgaWYgKHNhbXBsZSA8IC0xKSB7XG4gICAgICAgIHNhbXBsZSA9IC0xXG4gICAgICB9XG4gICAgICBzYW1wbGUgPSBzYW1wbGUgKiAzMjc2OFxuICAgICAgZGF0YVtpbmRleF0gPSBzYW1wbGVcbiAgICAgIGRhdGFbaW5kZXggKyAxXSA9IHNhbXBsZSA+PiA4XG4gICAgfVxuICAgIHJlY29yZGVkLnB1c2goZGF0YSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGR1bXAgKHNhbXBsZVJhdGUpIHtcbiAgICBsZXQgYnVmZmVyTGVuZ3RoID0gcmVjb3JkZWQubGVuZ3RoID8gcmVjb3JkZWRbMF0ubGVuZ3RoIDogMFxuICAgIGxldCBsZW5ndGggPSByZWNvcmRlZC5sZW5ndGggKiBidWZmZXJMZW5ndGhcbiAgICBsZXQgd2F2ID0gbmV3IFVpbnQ4QXJyYXkoNDQgKyBsZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcod2F2LmJ1ZmZlcilcblxuICAgIC8vIFJJRkYgaWRlbnRpZmllciAnUklGRidcbiAgICB2aWV3LnNldFVpbnQzMigwLCAxMzgwNTMzODMwLCBmYWxzZSlcbiAgICAvLyBmaWxlIGxlbmd0aCBtaW51cyBSSUZGIGlkZW50aWZpZXIgbGVuZ3RoIGFuZCBmaWxlIGRlc2NyaXB0aW9uIGxlbmd0aFxuICAgIHZpZXcuc2V0VWludDMyKDQsIDM2ICsgbGVuZ3RoLCB0cnVlKVxuICAgIC8vIFJJRkYgdHlwZSAnV0FWRSdcbiAgICB2aWV3LnNldFVpbnQzMig4LCAxNDYzODk5NzE3LCBmYWxzZSlcbiAgICAvLyBmb3JtYXQgY2h1bmsgaWRlbnRpZmllciAnZm10ICdcbiAgICB2aWV3LnNldFVpbnQzMigxMiwgMTcxODQ0OTE4NCwgZmFsc2UpXG4gICAgLy8gZm9ybWF0IGNodW5rIGxlbmd0aFxuICAgIHZpZXcuc2V0VWludDMyKDE2LCAxNiwgdHJ1ZSlcbiAgICAvLyBzYW1wbGUgZm9ybWF0IChyYXcpXG4gICAgdmlldy5zZXRVaW50MTYoMjAsIDEsIHRydWUpXG4gICAgLy8gY2hhbm5lbCBjb3VudFxuICAgIHZpZXcuc2V0VWludDE2KDIyLCAxLCB0cnVlKVxuICAgIC8vIHNhbXBsZSByYXRlXG4gICAgdmlldy5zZXRVaW50MzIoMjQsIHNhbXBsZVJhdGUsIHRydWUpXG4gICAgLy8gYnl0ZSByYXRlIChzYW1wbGUgcmF0ZSAqIGJsb2NrIGFsaWduKVxuICAgIHZpZXcuc2V0VWludDMyKDI4LCBzYW1wbGVSYXRlICogQllURVNfUEVSX1NBTVBMRSwgdHJ1ZSlcbiAgICAvLyBibG9jayBhbGlnbiAoY2hhbm5lbCBjb3VudCAqIGJ5dGVzIHBlciBzYW1wbGUpXG4gICAgdmlldy5zZXRVaW50MTYoMzIsIEJZVEVTX1BFUl9TQU1QTEUsIHRydWUpXG4gICAgLy8gYml0cyBwZXIgc2FtcGxlXG4gICAgdmlldy5zZXRVaW50MTYoMzQsIDggKiBCWVRFU19QRVJfU0FNUExFLCB0cnVlKVxuICAgIC8vIGRhdGEgY2h1bmsgaWRlbnRpZmllciAnZGF0YSdcbiAgICB2aWV3LnNldFVpbnQzMigzNiwgMTY4NDEwODM4NSwgZmFsc2UpXG4gICAgLy8gZGF0YSBjaHVuayBsZW5ndGhcbiAgICB2aWV3LnNldFVpbnQzMig0MCwgbGVuZ3RoLCB0cnVlKVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tZm9yLWxvb3BcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3YXYuc2V0KHJlY29yZGVkW2ldLCBpICogYnVmZmVyTGVuZ3RoICsgNDQpXG4gICAgfVxuXG4gICAgcmVjb3JkZWQgPSBbXVxuICAgIHBvc3RNZXNzYWdlKHdhdi5idWZmZXIsIFt3YXYuYnVmZmVyXSlcbiAgfVxuXG4gIG9ubWVzc2FnZSA9IGUgPT4ge1xuICAgIGlmIChlLmRhdGFbMF0gPT09ICdlbmNvZGUnKSB7XG4gICAgICBlbmNvZGUoZS5kYXRhWzFdKVxuICAgIH0gZWxzZSBpZiAoZS5kYXRhWzBdID09PSAnZHVtcCcpIHtcbiAgICAgIGR1bXAoZS5kYXRhWzFdKVxuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/audio-recorder-polyfill/wave-encoder/index.js\n");

/***/ })

}]);