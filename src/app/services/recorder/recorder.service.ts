import { Injectable } from '@angular/core';

import { AudioUtilService } from '../audio-util/audio-util.service';

@Injectable()
export class RecorderService {

  constructor() { }

  init() {
    var Recorder = function (source, cfg) {
      var config = cfg || {};
      var bufferLen = config.bufferLen || 4096;
      var numChannels = config.numChannels || 2;
      this.context = source.context;
      this.node = (this.context.createScriptProcessor ||
        this.context.createJavaScriptNode).call(this.context,
        bufferLen, numChannels, numChannels);
      this._audioUtil = new AudioUtilService();
      this._audioUtil.init({
        sampleRate: this.context.sampleRate,
        numChannels: numChannels
      });

      var recording = false,
        currCallback;

      this.node.onaudioprocess = (e) => {
        if (!recording) return;
        var buffer = [];
        for (var channel = 0; channel < numChannels; channel++) {
          buffer.push(e.inputBuffer.getChannelData(channel));
        }
        this._audioUtil.record(buffer);
      }

      this.configure = function (cfg) {
        for (var prop in cfg) {
          if (cfg.hasOwnProperty(prop)) {
            config[prop] = cfg[prop];
          }
        }
      }

      this.record = function () {
        recording = true;
      }

      this.stop = function () {
        recording = false;
      }

      this.isRecording = function () {
        return recording;
      }

      this.clear = () => {
        this._audioUtil.clear();
      }

      this.getBuffer = function (cb) {
        currCallback = cb || config.callback;
        currCallback(this._audioUtil.getBuffer());
      }

      this.exportWAV = (cb, type) => {
        currCallback = cb || config.callback;
        type = type || config.type || 'audio/wav';
        if (!currCallback) throw new Error('Callback not set');
        currCallback(this._audioUtil.exportWAV(type));
      }

      source.connect(this.node);
      this.node.connect(this.context.destination);    //this should not be necessary


      this.forceDownload = function (blob, filename) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var link = window.document.createElement('a');
        link.href = url;
        link.download = filename || 'output.wav';
        var click = document.createEvent("Event");
        click.initEvent("click", true, true);
        link.dispatchEvent(click);
      }


    };

    (<any>window).Recorder = Recorder;
  }

}