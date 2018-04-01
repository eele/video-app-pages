<template>
  <scroller lock-x :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" ref="theScroller" :use-pulldown=true :use-pullup=true @on-pulldown-loading="refresh()" @on-pullup-loading="loadMore()">
    <group>
      <cell-box v-for="user in userList" :key="user.id" @click.native="android.openUserVideoList(user.id)" is-link>
        <div style="margin-right: 1rem">
          <img :src="baseURL + '/users/' + user.id + '/portrait'" height="60" width="60">
        </div>
        <div>
          <div>
            <b>{{ user.username }}</b>
          </div>
          <div style="color:#009fff;font-size:14px">{{user.scNum}} 人订阅</div>
          <div style="color:#ababab">{{ user.description }}</div>
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
    this.searchUsers();
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
    searchUsers() {
      var self = this;
      this.$axios
        .get("/users/all/found", {
          params: {
            username: this.$route.query.username,
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
      this.searchUsers();
      this.$nextTick(() => {
        this.$refs.theScroller.donePulldown();
        this.$refs.theScroller.reset({ top: 0 });
      });
    },
    loadMore() {
      this.searchUsers();
      this.$nextTick(() => {
        this.$refs.theScroller.donePullup();
        this.$refs.theScroller.reset();
      });
    }
  }
};
</script>