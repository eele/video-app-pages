<template>
    <scroller lock-x :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" ref="theScroller" :use-pulldown=true :use-pullup=true @on-pulldown-loading="refresh()" @on-pullup-loading="loadMore()">
        <group>
            <cell-box>
                <div>
                    <span>
                        <b>{{ videoInfo.title }}</b>
                    </span><br><br>
                    <span style="font-size:14px">{{ videoInfo.description }}</span>
                </div>
                <div style="height:100%">
                    <x-button style="width:80px;height:40px" :gradients="['#1D62F0', '#19D5FD']" v-if="favoriteID == ''" @click.native="android.setCollect($route.query.vid)">
                        <span style="font-size:14px">+ 收藏</span>
                    </x-button>
                    <x-button style="width:90px;height:40px" :gradients="['#1D62F0', '#19D5FD']" v-if="favoriteID != ''" @click.native="android.setUnCollect(favoriteID)">
                        <span style="font-size:14px">取消收藏</span>
                    </x-button>
                </div>
            </cell-box>
            <cell-box>
                <x-button plain type="primary" style="border-radius:99px;margin-bottom:1.5rem" @click.native="comment($route.query.vid)">发表评论</x-button>
            </cell-box>
            <cell-box v-for="comment in commentList" :key="comment.id">
                <div style="margin-right: 1rem">
                    <img src="" height="60" width="60">
                </div>
                <div>
                    <div style="color: #009fff">
                        <b>{{ comment.username }}</b>
                    </div>
                    <div style="color:#ababab">{{getDate(comment.datetime)}}</div>
                    <div>{{ comment.text }}</div>
                </div>
            </cell-box>
            <div v-if="commentList.length == 0" style="text-align: center"><br>暂无评论</div>
        </group>
    </scroller>
</template>

<script>
import { XButton, Group, CellBox } from "vux";
import { Scroller, LoadMore } from "vux";
export default {
  components: {
    XButton,
    Group,
    Scroller,
    LoadMore,
    CellBox
  },
  created() {
      window.getFavoriteID = this.getFavoriteID;
  },
  mounted() {
    this.getComments();
    this.getVideoInfo();
    this.getFavoriteID();
  },
  data() {
    return {
      videoInfo: {},
      commentList: [],
      psize: 10,
      pulldownConfig: {
        downContent: "下拉刷新",
        upContent: "释放后更新"
      },
      pullupConfig: {
        upContent: "",
        downContent: "释放后加载"
      },
      favoriteID: ""
    };
  },
  methods: {
    getVideoInfo() {
      var self = this;
      this.$axios
        .get("/videos/" + this.$route.query.vid)
        .then(function(response) {
          self.videoInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getComments() {
      var self = this;
      this.$axios
        .get("/comments", {
          params: {
            vid: this.$route.query.vid,
            pstart: this.commentList.length,
            psize: this.psize
          }
        })
        .then(function(response) {
          self.commentList.push.apply(self.commentList, response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getFavoriteID() {
      var self = this;
      this.$axios
        .get("/favorites", {
          params: {
            vid: this.$route.query.vid,
            uid: this.android.getCurrentUID()
          }
        })
        .then(function(response) {
          self.favoriteID = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    comment(vid) {
      this.android.comment(vid);
    },
    refresh() {
      this.commentList = [];
      this.getComments();
      this.getVideoInfo();
      this.getFavoriteID();
      this.$nextTick(() => {
        this.$refs.theScroller.donePulldown();
        this.$refs.theScroller.reset({ top: 0 });
      });
    },
    loadMore() {
      this.getComments();
      this.$nextTick(() => {
        this.$refs.theScroller.donePullup();
        this.$refs.theScroller.reset();
      });
    }
  }
};
</script>
