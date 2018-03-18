<template>
    <group>
        <div @click="openMyVideo">
            <cell title="我的视频" is-link></cell>
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
    }
  }
};
</script>
