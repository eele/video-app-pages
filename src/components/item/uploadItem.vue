<template>
  <swipeout>
    <swipeout-item transition-mode="follow">
      <div slot="right-menu">
        <swipeout-button @click.native="deleteItem(video.id)" type="warn">删除</swipeout-button>
      </div>
      <div slot="content" class="demo-content vux-1px-t">
        <cell-box :style="background">
          <flexbox :gutter="0">
            <flexbox-item :span="1/4" @touchstart.native="changeStyle(1)" @touchend.native="changeStyle(0)">
              <div class="flex-demo">
                <div style='width:4.5rem;height:4.5rem;'>
                  <x-circle :percent="percent" :stroke-width="5" stroke-color="#3FC7FA">
                    <span style="color:#3FC7FA">{{percent}}%</span>
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
    this.intervalID = setInterval(this.update, 1000);
  },
  props: ["video", "refresh"],
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
      uploading: true,
      percent: 0,
      progressUpdated: true,
      intervalID: ""
    };
  },
  methods: {
    update() {
      var self = this;
      if (this.progressUpdated) {
        this.progressUpdated = false;
        this.$axios
          .get(
            this.uploadServerURL + "/service/videos/" + this.video.id + "/uploadprogress"
          )
          .then(function(response) {
            self.progressUpdated = true;
            if (response.data.progress != -1) {
              self.percent = response.data.progress;
            } else {
              self.percent = 100;
              self.android.promptUploadSuccess();
              clearInterval(self.intervalID);
            }
          })
          .catch(function(error) {
            self.progressUpdated = true;
            console.log(error);
          });
      }
    },
    pause() {
      this.uploading = false;
      this.android.pauseUpload();
    },
    resume() {
      this.uploading = true;
      this.android.resumeUpload(this.video.id);
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
    deleteItem(id) {}
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
