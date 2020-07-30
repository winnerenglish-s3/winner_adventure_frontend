<template>
  <q-page
    class="row"
    :class="
      !isLoadData
        ? 'bg5 justify-center items-center'
        : practiceWorld == 'Vocabulary'
        ? 'bg-vocabulary'
        : practiceWorld == 'Grammar'
        ? 'bg-grammar'
        : practiceWorld == 'Reading'
        ? 'bg-reading'
        : practiceWorld == 'Writing'
        ? 'bg-writing'
        : practiceWorld == 'Phonics'
        ? 'bg-phonics'
        : practiceWorld == 'Listening & Speaking'
        ? 'bg-listening'
        : ''
    "
  >
    <q-resize-observer @resize="onResize" />

    <div v-if="!isLoadData">
      <q-spinner-facebook color="deep-orange-10" size="100" />
    </div>

    <div class="col-12 row" v-if="isLoadData">
      <div class="col self-center relative-position" align="center">
        <!-- NOTE  Type : Ready -->
        <div style="max-width:900px;width:100%;">
          <q-img
            :src="'../../statics/main/practice/' + practiceImageURL"
            style="max-width:1500px;width:95%;"
            v-if="!practiceType.includes('review')"
          >
            <div
              class="absolute-bottom bg-transparent full-width"
              style="height:calc(100% - 65%);transform:rotate(-.5deg)"
            >
              <div class="absolute-center full-width">
                <span class="text-bold" style="fontSize:4.2vw">
                  <span
                    style="font-size:4.5vw;"
                  >{{ convertPracticeName(practiceType, practiceWorld) }}</span>
                </span>
              </div>
            </div>
          </q-img>

          <q-img v-else src="../../statics/review-board.png" style="max-width:1000px;width:95%;">
            <div
              class="absolute-bottom bg-transparent full-width"
              style="height:calc(100% - 65%);transform:rotate(-.5deg);font-size:4.5vw;"
            >
              <span v-if="practiceWorld == 'Vocabulary'">คำศัพท์</span>
              <span v-else>ไวยากรณ์</span>
            </div>
          </q-img>
        </div>

        <div style="height:200px;"></div>
      </div>
      <div class="self-end col-lg-4 col-xs-5" align="center">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          v-if="isActiveMainCharactor"
        >
          <div>
            <q-img
              :src="'../../statics/buddy/friend0.png'"
              v-if="studentData.buddy == null"
              style="max-width:1000px;width:80%;"
            ></q-img>
            <q-img
              :src="
                '../../statics/buddy/friend' + studentData.buddy.level + '.png'
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
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md" align="left">
            <span
              class="q-pa-md col-12"
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
            >
              <span
                v-html="
                  charTalking(
                    currentPage,
                    practiceType,
                    studentData.buddy == null ? '0' : studentData.buddy.level
                  )
                "
              ></span>
            </span>
          </div>
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
export default {
  data() {
    return {
      practiceType: "",
      practiceWorld: "",
      practiceImageURL: "",
      currentPage: "",
      isActiveMainLabel: true,
      isActiveMainTalk: true,
      isActiveMainCharactor: true,

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง

      isLoadData: false,
      isloadUnit: false,
      snapSync: ""
    };
  },
  methods: {
    async loadSynchronize() {
      this.snapSync = await db
        .collection("synchronize")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        .where("room", "==", this.studentData.room)
        .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          if (doc.size) {
            this.currentPage = doc.docs[0].data().currentPage;
            this.practiceType = doc.docs[0].data().practicetype;
            this.practiceWorld = doc.docs[0].data().skill;
            this.practiceImageURL = doc.docs[0].data().imgPracticeURL;

            this.isLoadData = true;
          }
        });
    },

    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  created() {
    this.loadSynchronize();
  },
  beforeDestroy() {
    this.snapSync();
  }
};
</script>
