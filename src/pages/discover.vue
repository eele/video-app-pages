<template>
    <div>
        <tab>
            <tab-item @on-item-click='refresh(cItem.id)' :selected="tabActive == index + 1" :key="cItem.id" v-for="(cItem, index) in categories">
                {{ cItem.name }}
            </tab-item>
        </tab>
        <scroller lock-x height="-45" :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" ref="theScroller" :use-pulldown=true :use-pullup=true @on-pulldown-loading="refresh()" @on-pullup-loading="loadMore()">
            <div>
                <x-table full-bordered style="background-color:#fff;">
                    <tbody>
                        <tr v-if="videoTop != null">
                            <td colspan="2">
                                <VideoCard :video="videoTop" :top=true />
                            </td>
                        </tr>
                        <tr v-for="videos in videoList" :key="videos[0].id" v-if="videoList.length > 0">
                            <td>
                                <VideoCard :video="videos[0]" :top=false />
                            </td>
                            <td v-if="videos.length == 2">
                                <VideoCard :video="videos[1]" :top=false />
                            </td>
                        </tr>
                    </tbody>
                </x-table>
                <div v-if="videoList.length == 0" style="text-align: center"><br>暂无内容</div>
            </div>
        </scroller>
    </div>
</template>

<script>
import { XTable } from "vux";
import { Tab, TabItem } from "vux";
import { Scroller, LoadMore } from "vux";
import VideoCard from "../components/item/videoCard.vue";
export default {
  components: {
    Tab,
    TabItem,
    Scroller,
    LoadMore,
    XTable,
    VideoCard
  },
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      tabActive: 1,
      categories: [],
      currentCid: "",
      videoTop: null,
      videoList: [],
      pstart: 0,
      psize: 11,
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
  methods: {
    getCategories() {
      var self = this;
      this.$axios
        .get("/categories?name=")
        .then(function(response) {
          self.categories = response.data;
          self.currentCid = self.categories[0].id;
          self.getVideos(self.categories[0].id);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getVideos(cid) {
      this.currentCid = cid;
      var self = this;
      this.$axios
        .get("/videos", {
          params: {
            cid: cid,
            pstart: this.pstart,
            psize: this.psize
          }
        })
        .then(function(response) {
          self.pstart += response.data.length;
          if (response.data.length > 0 && self.videoList.length == 0) {
            self.videoTop = response.data[0];
          }
          if (response.data.length == 0 && self.videoList.length == 0) {
            self.videoTop = null;
          }
          var index = 0;
          if (self.videoList.length == 0) {
            index = 1;
          }
          if (self.videoList.length % 2 == 1) {
            index = 1;
            self.videoList[self.videoList.length - 1][1] = response.data[0];
          }
          for (var i = index; i < response.data.length; i += 2) {
            if (i + 1 == response.data.length) {
              self.videoList.push([response.data[i]]);
            } else {
              self.videoList.push([response.data[i], response.data[i + 1]]);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    refresh(cid) {
      this.pstart = 0;
      this.videoList = [];
      if (cid == undefined) {
        this.getVideos(this.currentCid);
      } else {
        this.getVideos(cid);
      }
      this.$nextTick(() => {
        this.$refs.theScroller.donePulldown();
        this.$refs.theScroller.reset({ top: 0 });
      });
    },
    loadMore() {
      this.getVideos(this.currentCid);
      this.$nextTick(() => {
        this.$refs.theScroller.donePullup();
        this.$refs.theScroller.reset();
      });
    }
  }
};
</script>
