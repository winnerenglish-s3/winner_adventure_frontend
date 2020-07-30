<template>
  <q-page class="bg-placement relative-position animated fadeIn">
    <q-resize-observer @resize="onResize" />

    <!-- SECTION  Main Logo -->
    <div align="center" class="full-width">
      <transition
        appear
        enter-active-class="animated fadeInDown duration-label"
        leave-active-class="animated fadeOutUp duration-label"
      >
        <img src="../statics/placement/placement_label.png" style="width:350px;" />
      </transition>
    </div>

    <!-- SECTION  Main Talking -->
    <div class="q-px-xl q-pb-lg sticky-boxtalk">
      <div align="right">
        <transition
          appear
          enter-active-class="animated fadeIn duration-charactor-in"
          leave-active-class="animated fadeOut duration-charactor-out"
          v-if="isActiveMainCharactor"
        >
          <img
            class="absolute-bottom-right"
            src="../statics/placement/pirates_captain.png"
            style="height:calc(100vh - 110px);bottom:-85px;right:45px;"
          />
        </transition>
      </div>
    </div>

    <div class="q-pa-md absolute-bottom" style="overflow:hidden;">
      <transition
        appear
        enter-active-class="animated fadeInUp duration-boxtalk-in"
        leave-active-class="animated fadeOutDown duration-boxtalk-out"
        v-if="isActiveMainTalk"
      >
        <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-pa-md">
          <div class="col q-pa-xs q-pr-md" align="left">
            <!-- NOTE  Type = Ready -->
            <span
              :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
              v-if="activeType == 'continue'"
              v-html="talking.continue"
            ></span>
          </div>
        </div>
      </transition>
    </div>
  </q-page>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      practice: {
        type: "placement"
      },
      teacherData: this.$q.localStorage.getItem("teacherData"),
      // SECTION  Status Active
      activeType: "continue", // เก็บข้อมูลประเภท ready , start , finish
      talking: {
        continue:
          "เรือของท่านยังไม่พร้อมออกเดินทาง ข้ากำลังเตรียมเรือให้ท่านอยู่...."
      },

      isActiveMainTalk: true, // เปิดใข้งาน Animation : แบบสนทนา
      isActiveMainCharactor: true, //เปิดใช้งาน Animation : รูปโจรสลัด

      // SECTION  Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  },
  methods: {
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  }
};
</script>

<style lang="scss" scoped>
.text-size-s {
  font-size: 24px;
}

.text-size-m {
  font-size: 27px;
}

.text-size-l {
  font-size: 30px;
}

.boxtalk {
  max-height: fit-content;
  min-height: 200px;
}

.sticky-boxtalk {
  position: sticky;
  top: 100%;
}

.duration-label {
  animation-delay: 0.3s;
}

.duration-charactor-in {
  animation-delay: 0.2s;
}
.duration-charactor-out {
  animation-delay: 0.5s;
}

.duration-boxtalk-in {
  animation-delay: 0.5s;
}
.duration-boxtalk-out {
  animation-delay: 0.3s;
}
</style>
