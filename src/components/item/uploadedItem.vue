<template>
    <swipeout>
        <swipeout-item transition-mode="follow">
            <div slot="right-menu">
                <swipeout-button v-if="mode == 'u'" @click.native="deleteItem(video.id)" type="warn">删除</swipeout-button>
                <swipeout-button v-if="mode == 'h'" @click.native="deleteHistoryItem(video.id)" type="warn">删除</swipeout-button>
                <swipeout-button v-if="mode == 'f'" @click.native="cancelItem(video.id)" type="warn">取消收藏</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
                <cell-box :style="background" @click.native="android.play(video.uid, video.id)" @touchstart.native="changeStyle(1)" @touchend.native="changeStyle(0)">
                    <flexbox :gutter="0">
                        <flexbox-item :span="1/3">
                            <div class="flex-demo">
                                <div style='width:6.0rem;height:4.5rem;background-color:grey'>

                                </div>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span="2/3">
                            <div class="v-title">{{video.title}}</div>
                            <div class="v-desc">{{video.description}}</div>
                            <div class="v-datetime">{{this.getDate(video.datetime)}}</div>
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
import { Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
import "material-design-icons/iconfont/material-icons.css";

export default {
  props: ["mode", "video"],
  components: {
    CellBox,
    Flexbox,
    FlexboxItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data() {
    return {
      background: {}
    };
  },
  methods: {
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
    deleteItem(id) {},
    deleteHistoryItem(id) {},
    cancelItem(id) {}
  }
};
</script>

<style>
.v-title {
  color: rgb(63, 172, 236);
  font-weight: 900;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.v-desc {
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.v-datetime {
  margin-top: 0.8rem;
  color: grey;
  font-size: 1rem;
}
</style>

<style scoped>
.u-item {
  background-color: #c8c7cd52;
}
</style>
