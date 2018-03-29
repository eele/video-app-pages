<template>
  <scroller lock-x :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" ref="theScroller" :use-pulldown=true :use-pullup=true @on-pulldown-loading="refresh()" @on-pullup-loading="loadMore()">
    <group>
      <cell-box v-for="user in userList" :key="user.id" is-link>
        <div style="margin-right: 1rem">
          <img src="" height="60" width="60">
        </div>
        <div>
          <div>
            <b>{{ user.username }}</b>
          </div>
          <div style="color:#009fff;font-size:14px">{{user.scNum}} 人订阅</div>
          <div style="color:#ababab">{{ user.description }}</div>
        </div>
        <div>
          <x-button mini plain type="primary" v-if="true" @click.native="android.setCollect($route.query.vid)">
            <span style="font-size:13px">+ 订阅</span>
          </x-button>
          <x-button mini v-if="false" @click.native="android.setUnCollect(favoriteID)">
            <span style="font-size:13px">取消订阅</span>
          </x-button>
        </div>
      </cell-box>
      <div v-if="userList.length == 0" style="text-align: center"><br>暂无内容</div>
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
  mounted() {
    if (this.$route.query.r == "all") {
      this.getUsers("all");
    } else {
      this.getUsers(this.android.getCurrentUID());
    }
  },
  data() {
    return {
      userList: [],
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
  methods: {
    getUsers(mine) {
      var self = this;
      this.$axios
        .get("/users", {
          params: {
            mineId: mine,
            pstart: this.userList.length,
            psize: this.psize
          }
        })
        .then(function(response) {
          self.userList.push.apply(self.userList, response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    refresh() {
      this.userList = [];
      if (this.$route.query.r == "all") {
        this.getUsers("all");
      } else {
        this.getUsers(this.android.getCurrentUID());
      }
      this.$nextTick(() => {
        this.$refs.theScroller.donePulldown();
        this.$refs.theScroller.reset({ top: 0 });
      });
    },
    loadMore() {
      if (this.$route.query.r == "all") {
        this.getUsers("all");
      } else {
        this.getUsers(this.android.getCurrentUID());
      }
      this.$nextTick(() => {
        this.$refs.theScroller.donePullup();
        this.$refs.theScroller.reset();
      });
    }
  }
};
</script>