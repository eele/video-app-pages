<template>
  <div>
    <tab>
      <tab-item @on-item-click='uploadedHandler' :selected="tab">
        <b>已上传</b>
      </tab-item>
      <tab-item @on-item-click='uploadingHandler' :selected="!tab">
        <b>正在上传</b>
      </tab-item>
    </tab>

    <scroller lock-x height="-45"
        :pulldown-config="pulldownConfig" 
        :pullup-config="pullupConfig" ref="theScroller" 
        :use-pulldown=true :use-pullup=true 
        @on-pulldown-loading="refresh()" 
        @on-pullup-loading="loadMore()">
      <div>
        <UploadedItem mode="u" :video="video" :key="video.id" v-for="video in uploadedVideolist" v-if="tab" />
        <UploadItem :uploadingVideoID="uploadingVideoID" v-on:changeUploadingVideoID="changeUploadingVideoID" v-on:refresh="refresh"
        :video="video" :key="video.id" v-for="video in uploadingVideolist" v-if="!tab" />
        <div v-if="tab && uploadedVideolist.length == 0" style="text-align: center"><br>暂无内容</div>
        <div v-if="!tab && uploadingVideolist.length == 0" style="text-align: center"><br>暂无内容</div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
import { Scroller, LoadMore } from "vux";
import UploadItem from "../components/item/uploadItem.vue";
import UploadedItem from "../components/item/uploadedItem.vue";
export default {
  components: {
    Tab,
    TabItem,
    Scroller,
    LoadMore,
    UploadItem,
    UploadedItem
  },
  data() {
    return {
      uid: "",
      tab: true,
      firstUpload: true,
      uploadingVideoID: this.$route.query.uploadingVideoID,
      onFetching: false,
      uploadingVideolist: [],
      uploadedVideolist: [],
      uploadingPsize: 10,
      uploadedPsize: 10,
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
    this.getCurrentUID();
    if (this.uploadingVideoID == "0") {
      this.firstUpload = false;
      this.uploadedHandler();
    } else {
      this.firstUpload = true;
      this.uploadingHandler();
    }
  },
  methods: {
    changeUploadingVideoID(id) {
      this.uploadingVideoID = id;
    },
    getUploadingVideos() {
      var self = this;
      this.$axios
        .get("/videos/p/uploading", {
          params: {
            uid: this.uid,
            pstart: this.uploadingVideolist.length,
            psize: this.uploadingPsize
          }
        })
        .then(function(response) {
          self.uploadingVideolist.push.apply(
            self.uploadingVideolist,
            response.data
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUploadedVideos() {
      var self = this;
      this.$axios
        .get("/videos/p/uploaded", {
          params: {
            uid: this.uid,
            pstart: this.uploadedVideolist.length,
            psize: this.uploadedPsize
          }
        })
        .then(function(response) {
          self.uploadedVideolist.push.apply(
            self.uploadedVideolist,
            response.data
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCurrentUID() {
      this.uid = this.android.getCurrentUID();
    },
    uploadedHandler() {
      this.tab = true;
      this.$nextTick(() => {
          this.$refs.theScroller.reset({top: 0});
        })
      this.getUploadedVideos();
    },
    uploadingHandler() {
      this.tab = false;
      this.$nextTick(() => {
          this.$refs.theScroller.reset({top: 0});
        })
      this.getUploadingVideos();
    },
    refresh() {
      if (this.tab) {
        this.uploadedVideolist = [];
        this.getUploadedVideos();
      } else {
        this.uploadingVideolist = [];
        this.getUploadingVideos();
      }
      this.$nextTick(() => {
          this.$refs.theScroller.donePulldown();
          this.$refs.theScroller.reset({top: 0});
        })
    },
    loadMore() {
      if (this.tab) {
        this.getUploadedVideos();
      } else {
        this.getUploadingVideos();
      }
      this.$nextTick(() => {
          this.$refs.theScroller.donePullup();
          this.$refs.theScroller.reset();
        })
    }
  }
};
</script>
