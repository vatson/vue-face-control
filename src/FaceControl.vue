<template>
  <div>
    <!-- <video 
      id="video" 
      width="320" 
      height="240" 
      style="position: absolute; left: -319px; top: -239px; "
    
      ref="video"
    ></video> -->

    <canvas id="canv" ref='c' height="240" width="320" style="display: none"/>
    <div v-if="show">
      <slot />
    </div>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import 'tracking';
import 'tracking/build/data/face';
import { setTimeout } from 'timers';

const tracker = new tracking.ObjectTracker(['face']);
//  tracker.setInitialScale(0);
      // tracker.setStepSize(2);
      // tracker.setEdgesDensity(0.1);

@Component
export default class extends Vue {
  private show: boolean = true;

  private stream!: MediaStream;


  mounted() {
    const video = document.createElement('video');
    video.width = 320;
    video.height = 240;
    video.muted = true;
    video.autoplay = true;
    video.style.cssText = "visibility: hidden";
    document.body.appendChild(video);

    
    // tracker.on('track', e => console.log(e));

    window.navigator.mediaDevices.getUserMedia({
      video: true,
    }).then(stream => {
      video.srcObject = stream;

      setInterval(() => {
        let context;
        if (context = (<HTMLCanvasElement>this.$refs.c).getContext('2d')) {
          context.drawImage(video, 0, 0, video.width, video.height);
          tracker.track(context.getImageData(0, 0, video.width, video.height).data, video.width,  video.height);
        }
      }, 800);
      
    });



    // tracking.track('#video', tracker, { camera: true });
    // tracker.on('track', (e) => { 
    // this.show = e.data.length == 0;
    // })
  }
}
</script>
