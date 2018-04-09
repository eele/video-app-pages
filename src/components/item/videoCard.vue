<template>
    <card ref="videotitle" @click.native="play(video.uid, video.id)">
        <img slot="header" :src="imgUrl" style="width:100%;display:block;">
        <div slot="content" class="card-padding">
            <p class="videotitle" :style="videotitle">{{ video.title }}</p>
            <p style="color:#999;font-size:14px;line-height:1.2;">{{this.getDate(video.datetime)}}</p>
        </div>
    </card>
</template>

<script>
import { Card } from "vux";
export default {
  props: ["video", "top"],
  components: {
    Card
  },
  data() {
    return {
      videotitle: {},
      imgUrl: "/static/450x300"
    };
  },
  mounted() {
    var self = this;
    this.$axios
      .head(
        this.playServerURL +
          "/" +
          this.video.uid +
          "/" +
          this.video.id +
          "_/img.jpg"
      )
      .then(function(response) {
        self.imgUrl =
          self.playServerURL +
          "/" +
          self.video.uid +
          "/" +
          self.video.id +
          "_/img.jpg";
      });

    if (this.top) {
      this.videotitle = {
        width: window.screen.width - 20 + "px"
      };
    } else {
      this.videotitle = {
        width: window.screen.width / 2 - 20 + "px"
      };
    }
  },
  methods: {
    play(uid, vid) {
      this.android.play(uid, vid);
    }
  }
};
</script>

<style scoped lang="less">
.weui-panel {
  padding: 2px;
}
.card-demo-flex {
  display: flex;
}
.card-padding {
  padding: 8px;
  text-align: left;
}
.videotitle {
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
