<template>
  <div>
    <canvas id="canv" ref='c' height="240" width="240" stylse="display: none"/>
    <div v-if="show">
      Tracking: {{ tracking }}
      Api: {{ api }}
      <slot />
    </div>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { setTimeout } from 'timers';

import { Mtcnn } from 'face-api.js';
const net = new Mtcnn();
net.load('/mtcnn_model-weights_manifest.json')

import 'tracking';
import 'tracking/build/data/face';
const tracker = new tracking.ObjectTracker(['face']);

@Component
export default class extends Vue {
  private show: boolean = true;

  private stream!: MediaStream;

  private tracking: number = 0;
  private api: number = 0;

  mounted() {
    const video = document.createElement('video');
    video.width = 240;
    video.height = 240;
    video.muted = true;
    video.autoplay = true;
    video.style.cssText = "visibility: hidden";
    document.body.appendChild(video);

    tracker.on('track', e => this.tracking = e.data.length);

    window.navigator.mediaDevices.getUserMedia({
      video: true,
    }).then(stream => {
      video.srcObject = stream;

      setInterval(() => {
        let context;
        if (context = (<HTMLCanvasElement>this.$refs.c).getContext('2d')) {
          context.drawImage(video, 0, 0, video.width, video.height);

          net.forward(this.$refs.c as HTMLCanvasElement).then(res => this.api = res.length);
          tracker.track(context.getImageData(0, 0, video.width, video.height).data, video.width, video.height);
        }
      }, 800);
    });
  }
}
</script>
