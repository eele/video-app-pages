<template>
  <div>
    <scroller lock-x height="-45"
        :pulldown-config="pulldownConfig" 
        :pullup-config="pullupConfig" ref="theScroller" 
        :use-pulldown=true :use-pullup=true 
        @on-pulldown-loading="refresh()" 
        @on-pullup-loading="loadMore()">
      <div>
        <UploadedItem :mode="f" :video="video" :key="video.id" v-for="video in videolist" />
        <div v-if="videolist.length == 0" style="text-align: center"><br>暂无内容</div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller, LoadMore } from "vux";
import UploadedItem from "../components/item/uploadedItem.vue";
export default {
  components: {
    Scroller,
    LoadMore,
    UploadedItem
  },
  data() {
    return {
      videolist: [],
      psize: 10,
      pulldownConfig: {
        downContent: "下拉刷新",
        upContent: "释放后更新"
      },
      pullupConfig: {
        upContent: "",
        downContent: "释放后加载"
      }
    };
  },
  mounted() {
    this.getFavoriteVideos();
  },
  methods: {
    getFavoriteVideos() {
      var self = this;
      this.$axios
        .get("/favorites", {
          params: {
            uid: this.android.getCurrentUID(),
            pstart: this.videolist.length,
            psize: this.psize
          }
        })
        .then(function(response) {
          self.videolist.push.apply(self.videolist, response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    refresh() {
      this.videolist = [];
      this.getFavoriteVideos();
      this.$nextTick(() => {
        this.$refs.theScroller.donePulldown();
        this.$refs.theScroller.reset({ top: 0 });
      });
    },
    loadMore() {
      this.getFavoriteVideos();
      this.$nextTick(() => {
        this.$refs.theScroller.donePullup();
        this.$refs.theScroller.reset();
      });
    }
  }
};
</script>