<template>
    <group>
        <div @click="openMyVideo">
            <cell title="我的视频" is-link style="height: 40px"></cell>
        </div>
        <div @click="openMyFavorite">
            <cell title="我的收藏" is-link style="height: 40px"></cell>
        </div>
        <div @click="openMySubscribe">
            <cell title="我的订阅" is-link style="height: 40px"></cell>
        </div>
        <div @click="openMyHistory">
            <cell title="历史记录" is-link style="height: 40px"></cell>
        </div>
    </group>
</template>

<script>
import { Cell, Group } from "vux";
export default {
  components: {
    Cell,
    Group
  },
  methods: {
    openMyVideo() {
      this.android.openMyVideo();
    },
    openMyFavorite() {
      this.android.openMyFavorite();
    },
    openMySubscribe() {
      this.android.openMySubscribe();
    },
    openMyHistory() {
      this.android.openMyHistory();
    }
  }
};
</script>
