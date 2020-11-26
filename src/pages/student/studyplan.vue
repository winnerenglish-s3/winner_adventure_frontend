<template>
  <q-page class="bg-cloud relative-position" :class="{ 'flex flex-center': !isLoadMission }">
    <q-resize-observer @resize="onResize" />

    <q-spinner-facebook v-if="!isLoadMission" color="primary" size="100px" />

    <div
      v-if="isLoadMission && isStartMission"
      class="q-pt-xl relative-position"
      style="max-width:1400px;width:90%;margin:auto;z-index:20;"
    >
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="row q-py-xl" style>
          <div class="col-4" align="center">
            <div style="max-width:400px;width:25vw;">
              <q-img
                v-if="mission.name == 'เรือ'"
                :src="'../../statics/coins/sh' + mission.level + '.png'"
              ></q-img>
              <q-img
                v-if="mission.name == 'คู่หู'"
                :src="'../../statics/coins/f' + mission.level + '.png'"
              ></q-img>
              <q-img
                v-if="mission.name == 'สมบัติ'"
                :src="'../../statics/coins/t' + mission.level + '.png'"
              ></q-img>
            </div>
            <div class="bg5 q-mt-lg q-pa-sm br-a-sm" style="max-width:300px;width:80%;">
              <div class="br-a-sm border-dashed q-py-sm color3">
                <div style="font-size:calc(16px + 1vw);">
                  <span>ภารกิจปัจจุบัน</span>
                </div>
                <div class="q-mt-xs" style="font-size:calc(16px + .6vw);">
                  <div>
                    <span>
                      {{
                      mission.name +
                      (mission.name != "สมบัติ" ? " ระดับ " : " ชิ้นที่ ") +
                      mission.level
                      }}
                    </span>
                  </div>
                  <div>
                    <span>{{ mission.goalDiscount + " เหรียญ" }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col q-pt-lg relative-position" align="center">
            <q-img src="../../statics/main/label.png">
              <div
                class="absolute-top bg-transparent"
                style="top:calc(100% - 90%);height:calc(100% - 60%)"
                align="center"
              >
                <span
                  v-if="practice.level && practice.unit"
                  class="color3 text-bold"
                  style="font-size:5vw;font-style:italic;"
                >
                  {{
                  "ระดับ " + practice.level + " บทที่ " + practice.unit
                  }}
                </span>
              </div>
              <div
                class="relative-position absolute-bottom bg-transparent"
                style="height:calc(100% - 63%);transform:rotate(-.5deg)"
              >
                <div class="absolute-center full-width" v-if="practice != ''">
                  <span
                    class="text-bold"
                    style="font-size:4.3vw;"
                    v-if="studyplanType == 'advanced'"
                  >
                    ค้นหาเส้นทาง
                    <q-spinner-facebook color="white" size="4.3vw" />
                  </span>
                  <span
                    v-if="studyplanType == 'auto' && practice != ''"
                    class="text-bold"
                    style="font-size:4.7vw;"
                  >{{ showSkillName(practice.skill) }}</span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </transition>
    </div>

    <waterWave></waterWave>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
import waterWave from "../../components/waterWave.vue";
export default {
  components: {
    waterWave
  },
  data() {
    return {
      mission: {},
      practice: {},
      currentPage: "",
      studyplanType: "",
      totalStudent: 0,

      isLoadData: true,
      isLoadMission: false,
      isStartMission: false,

      snapSync: "",

      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  },
  methods: {
    async loadMission() {
      if (this.isLoadMission) {
        return;
      }

      let dateTime = await this.getDateAndTime();
      let year = this.decrypt(this.$q.localStorage.getItem("currentYear"), 2);
      let term = this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2);

      this.isLoadMission = true;

      db.collection("classroomMission")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        .where("room", "==", this.studentData.room)
        // .where("term", "==", term)
        .where("year", "==", year)
        .where("status", "==", "current")
        .get()
        .then(doc => {
          if (doc.size) {
            db.collection("mission")
              .doc(doc.docs[0].data().currentMissionKey)
              .get()
              .then(docMission => {
                let disCount = 0;

                if (this.studentData.buddy != null) {
                  disCount =
                    Number(this.studentData.buddy.skill) *
                    Number(this.totalStudent);
                }

                let dataKey = {
                  key: docMission.id,
                  goalDiscount:
                    Number(docMission.data().goal) * Number(this.totalStudent) -
                    Number(disCount),
                  ...docMission.data()
                };

                this.mission = dataKey;

                this.isStartMission = true;
              });
          }
        });
    },
    async loadSynchronize() {
      let dateTime = await this.getDateAndTime();
      let year = this.decrypt(this.$q.localStorage.getItem("currentYear"), 2);
      let term = this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2);

      this.snapSync = await db
        .collection("synchronize")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        .where("room", "==", this.studentData.room)
        .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .where("currentDate", "==", dateTime.date)
        .where("status", "==", "online")
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          if (doc.size) {
            this.currentPage = doc.docs[0].data().currentPage;
            this.practice = doc.docs[0].data().nextPractice;
            this.studyplanType = doc.docs[0].data().studyplanType;

            this.totalStudent = doc.docs[0].data().totalStudent;

            if (!this.isLoadMission) {
              this.loadMission();
            }
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
    if (typeof this.snapSync == "function") {
      this.snapSync();
    }
  }
};
</script>

<style lang="scss" scoped></style>
