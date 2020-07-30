<template>
  <div>
    <div class="row">
      <div class="col self-center relative-position" align="center"></div>
      <div
        class="self-end col-lg-4 col-xs-5 absolute-bottom-right"
        align="right"
      >
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          v-if="isActiveMainCharactor"
        >
          <div>
            <q-img
              src="../statics/buddy/friend0.png"
              v-if="studentData.buddy == null"
              style="max-width:1000px;width:80%;"
            ></q-img>
            <q-img
              :src="
                '../statics/buddy/friend' + studentData.buddy.level + '.png'
              "
              style="max-width:1000px;width:80%;"
              v-else
            ></q-img>
            <div style="height:50px;"></div>
          </div>
        </transition>
      </div>
      <div class="col-12 z-top absolute-bottom" style="overflow:hidden;">
        <transition
          appear
          enter-active-class="animated fadeInUp duration-talk-in"
          leave-active-class="animated fadeOutDown duration-talk-out"
          v-if="isActiveMainTalk"
        >
          <div
            class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md"
            align="left"
          >
            <span
              class="q-pa-md col-12"
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
            >
              <span>{{
                charTalking(
                  "finish-waiting",
                  dataType,
                  studentData.buddy === null ? "0" : studentData.buddy.level
                )
              }}</span>
            </span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  props: ["dataType"],
  data() {
    return {
      isActiveMainLabel: true,
      isActiveMainTalk: true,
      isActiveMainCharactor: true,

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  }
};
</script>
