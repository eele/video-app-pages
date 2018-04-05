<template>
  <swipeout>
    <swipeout-item transition-mode="follow">
      <div slot="right-menu">
        <swipeout-button @click.native="deleteItem(video.vid)" type="warn">删除</swipeout-button>
      </div>
      <div slot="content" class="demo-content vux-1px-t">
        <cell-box :style="background">
          <flexbox :gutter="0">
            <flexbox-item :span="1/4" @touchstart.native="changeStyle(1)" @touchend.native="changeStyle(0)">
              <div class="flex-demo">
                <div style='width:4.5rem;height:4.5rem;'>
                  <x-circle :percent="percent" :stroke-width="5" stroke-color="#3FC7FA">
                    <span style="color:#3FC7FA" v-if="this.uploadingVideoID == this.video.vid || !uploading">{{percent}}%</span>
                    <span style="color:#3FC7FA" v-if="this.uploadingVideoID != this.video.vid && uploading">等待中</span>
                  </x-circle>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="9/16" @touchstart.native="changeStyle(1)" @touchend.native="changeStyle(0)">
              <div class="v-title">{{video.title}}</div>
              <div class="v-datetime">{{this.getTime(video.datetime)}}</div>
            </flexbox-item>
            <flexbox-item :span="3/16" class="u-ctrl">
              <i class="material-icons" @click="pause" v-show="uploading">pause_circle_outline</i>
              <i class="material-icons" @click="resume" v-show="!uploading">play_circle_outline</i>
            </flexbox-item>
          </flexbox>
        </cell-box>
      </div>
    </swipeout-item>
  </swipeout>
</template>

<script>
import { CellBox } from "vux";
import { Flexbox, FlexboxItem } from "vux";
import { XCircle } from "vux";
import { Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
import "material-design-icons/iconfont/material-icons.css";

export default {
  mounted() {
    this.percent = this.android.getSavedUploadProgress(this.video.vid);
    if (this.uploadingVideoID == this.video.vid) {
      this.intervalID = setInterval(this.getUploadProgress, 1000);
      this.android.resumeUpload(this.video.vid);
      this.uploading = true;
    }
  },
  props: ["video", "uploadingVideoID"],
  components: {
    CellBox,
    Flexbox,
    FlexboxItem,
    XCircle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data() {
    return {
      background: {},
      uploading: false,
      percent: 0,
      progressUpdated: true,
      intervalID: ""
    };
  },
  methods: {
    getUploadProgress() {
      var p = this.android.getUploadProgress();
      if (p == -1) {
        this.percent = 100;
        clearInterval(this.intervalID);
        this.$emit("changeUploadingVideoID", "0");
        this.$emit("refresh");
      } else {
        this.percent = p;
      }
    },
    pause() {
      if (this.uploadingVideoID == this.video.vid) {
        clearInterval(this.intervalID);
        this.android.pauseUpload(this.video.vid, this.percent);
        this.$emit("changeUploadingVideoID", "0");
      }
      this.uploading = false;
    },
    resume() {
      if (this.uploadingVideoID == "0") {
        this.intervalID = setInterval(this.getUploadProgress, 1000);
        this.android.resumeUpload(this.video.vid);
        this.$emit("changeUploadingVideoID", this.video.vid);
      }
      this.uploading = true;
    },
    changeStyle(op) {
      if (op == 0) {
        this.background = {};
      }
      if (op == 1) {
        this.background = {
          "background-color": "#ececec"
        };
      }
    },
    deleteItem(id) {
      this.android.deleteVideoItem(id);
    }
  }
};
</script>

<style>
.v-title {
  font-weight: 900;
  font-size: 1.3rem;
}
.v-datetime {
  margin-top: 0.8rem;
  color: grey;
  font-size: 1rem;
}
.u-ctrl {
  padding-left: 1.5rem;
}
</style>

<style scoped>
.u-item {
  background-color: #c8c7cd52;
}
</style>
