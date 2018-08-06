import Vue, { PluginFunction } from 'vue';
import FaceControl from './FaceControl.vue';

export const FacecontrolPlugin = ((vue: typeof Vue, options: {}): void => {  
    vue.component('facecontrol', FaceControl);
}) as PluginFunction<any>;
