<template>
  <div>
    <scroller lock-x height="-45" :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" ref="theScroller" :use-pulldown=true :use-pullup=true @on-pulldown-loading="refresh()" @on-pullup-loading="loadMore()">
      <div>
        <UploadedItem mode="h" :history="true" :video="video" :key="video.id" v-for="video in videolist" />
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
  created() {
      window.refresh = this.refresh;
  },
  mounted() {
    this.getPlayHistory();
  },
  methods: {
    getPlayHistory() {
      var vidList = JSON.parse(this.android.getHistoryVid(this.videolist.length, this.psize));
      
      var self = this;
      for (var i in vidList) {
        this.$axios
          .get("/videos/" + vidList[i])
          .then(function(response) {
            self.videolist.push(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    refresh() {
      this.videolist = [];
      this.getPlayHistory();
      this.$nextTick(() => {
        this.$refs.theScroller.donePulldown();
        this.$refs.theScroller.reset({ top: 0 });
      });
    },
    loadMore() {
      this.getPlayHistory();
      this.$nextTick(() => {
        this.$refs.theScroller.donePullup();
        this.$refs.theScroller.reset();
      });
    }
  }
};
</script>