<template>
  <q-page class="bg-questionnair relative-position">
    <q-resize-observer @resize="onResize" />

    <!-- SECTION  Main Logo -->
    <div align="center" class="full-width q-pb-lg">
      <transition
        appear
        enter-active-class="animated fadeInDown duration-label"
        leave-active-class="animated fadeOutUp duration-label"
      >
        <img
          src="../../statics/questionnair/questionnair_logo.png"
          style="margin-top:-35px;width:400px;"
        />
      </transition>
    </div>

    <!-- SECTION  Main Talking -->
    <div class="q-px-xl q-pb-lg sticky-boxtalk" v-if="activeType != 'start'">
      <div align="right">
        <transition
          appear
          enter-active-class="animated fadeIn duration-charactor-in"
          leave-active-class="animated fadeOut duration-charactor-out"
          v-if="isActiveMainCharactor"
        >
          <img
            class="absolute-bottom-left"
            src="../../statics/questionnair/king.png"
            style="height:calc(100vh - 150px);bottom:-30px;left:15%;"
          />
        </transition>
      </div>

      <transition
        appear
        enter-active-class="animated fadeInUp duration-talk-in"
        leave-active-class="animated fadeOutDown duration-talk-out"
        v-if="isActiveMainTalk "
      >
        <div class="relative-position">
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-pa-md">
            <div class="col q-pa-xs q-pr-md" align="left">
              <!-- NOTE  Type = Ready -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'ready'"
                v-html="talking.ready"
              ></span>

              <!-- NOTE  Active Type = Continue -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'continue'"
                v-html="talking.continue"
              ></span>

              <!-- NOTE  Active Type = finish -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'finish'"
                v-html="talking.finish"
              ></span>
            </div>
            <div
              class="col-4 self-end"
              :style="[activeType != 'finish' ? {width:'350px'} : {width:'200px'}]"
              align="center"
            >
              <q-btn
                flat
                v-if="activeType != 'finish'"
                class="color3 q-mr-md text-h6 q-py-xs q-my-md q-px-sm"
                label="ทำทีหลัง"
                @click="skipQuestionnaire()"
              />
              <q-btn
                v-if="activeType != 'finish'"
                class="bg6 color3 text-h6 q-py-xs q-my-md q-px-sm"
                label="เริ่มประเมิน"
                @click="startQuestionnaire()"
              />
              <q-btn
                v-else
                class="bg6 color3 text-h6 q-py-xs q-my-md q-px-sm"
                label="กลับหน้าหลัก"
                @click="backToMain()"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>

    <timer
      v-if="activeType == 'start'"
      :practiceType="{type:practice.type}"
      :finishStudent="finishStudent"
      :totalStudent="totalStudent"
      @finish="val => { finishQuestionnaire() }"
    ></timer>
  </q-page>
</template>

<script>
import timer from "../../components/timer.vue";
import { db } from "../../router";
export default {
  components: {
    timer
  },
  data() {
    return {
      // total online student
      totalStudent: "",
      // SECTION  practice data
      practice: {
        type: "questionnair"
      },

      // SECTION  Status Active
      activeType: "ready", // เก็บข้อมูลประเภท
      talking: {
        ready:
          "<div >เจ้าสามารถทำแบบประเมินนี้ ทีหลังได้ แต่มันสำคัญต่อการปรับปรุงการเดินทางด้วยนะ เจ้าต้องอย่าลืม</div>",
        finish:
          "<div > เจ้าทำแบบประเมินเสร็จแล้ว เจ้าสามารถพาลูกเรือกลับมาสู่บทเรียนได้ </div>"
      },
      isActiveMainTalk: true, // เปิดใข้งาน Animation : แบบสนทนา
      isActiveMainCharactor: true, //เปิดใช้งาน Animation : รูปโจรสลัด

      isActivePractice: false, // เปิดใช้งาน Animation : เปิดใช้งานแบบฝึกหัด
      isActivePracticeTimer: false, // เปิดใช้งาน Animation : ตัวจับเวลา
      isActivePracticeNumberQuestion: false, // เปิดใช้งาน Animation : แสดงจำนวนข้อแบบฝึกหัด
      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      snapGetLog: "",
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      finishStudent: "",
      snapGetOnlineStudent: ""
    };
  },
  methods: {
    skipQuestionnaire() {
      // to="/teacher/main"
      this.$q.localStorage.set("isSkipQuestionnaire", true);
      this.$router.push("/teacher/main");
    },
    async finishQuestionnaire() {
      this.loadingShow();
      let date = await this.getDateAndTime();

      db.collection("schooltestlog")
        .where("class", "==", this.currentClass)
        .where(
          "questionnaireKey",
          "==",
          this.$q.localStorage.getItem("currentQuestionnaireKey")
        )
        .where("room", "==", this.currentRoom)
        .where("testtype", "==", "questionnaire")
        .where(
          "year",
          "==",
          this.decrypt(this.$q.localStorage.getItem("currentYear"), 2)
        )
        .where(
          "term",
          "==",
          this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2)
        )
        .get()
        .then(check => {
          if (!check.size) {
            db.collection("schooltestlog")
              .add({
                schoolKey: this.teacherData.schoolKey,
                class: this.currentClass,
                room: this.currentRoom,
                questionnaireKey: this.$q.localStorage.getItem(
                  "currentQuestionnaireKey"
                ),
                year: this.decrypt(
                  this.$q.localStorage.getItem("currentYear"),
                  2
                ),
                term: this.decrypt(
                  this.$q.localStorage.getItem("currentTerm"),
                  2
                ),
                testtype: "questionnaire",
                date: date,
                status: true
              })
              .then(() => {
                this.isActiveMainTalk = true;
                this.isActiveMainCharactor = true;
                this.isActivePractice = false;
                this.activeType = "finish";
                this.loadingHide();
              });
          } else {
            console.log("มีการบันทึกไว้อยู่แล้วไม่บันทึก");
            this.isActiveMainTalk = true;
            this.isActiveMainCharactor = true;
            this.isActivePractice = false;
            this.activeType = "finish";
            this.loadingHide();
          }
        });
    },
    async backToMain() {
      let date = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "main",
          date: date
        })
        .then(() => {
          this.$router.push("/teacher/main");
        });
    },
    async snapQuestionnaireLog() {
      let term = this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2);
      let year = this.getAcademicYear();
      console.clear();

      // GET ONLINE STUDENT
      this.snapGetOnlineStudent = db
        .collection("student")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("status", "==", "online")
        .where("classRoom", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("status", "==", "online")
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          this.totalStudent = doc.size;
        });

      // GET FINISH STUDENT

      this.snapGetLog = db
        .collection("studentquestionnairelog")
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("term", "==", term.toString())
        .where("year", "==", year.toString())
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          let finish = 0;
          doc.forEach(element => {
            if (element.data().finish) {
              finish++;
            }
          });
          this.finishStudent = finish;
        });
    },
    async startQuestionnaire() {
      let date = await this.getDateAndTime();
      this.$q.localStorage.set("activeType", "start");

      db.collection("questionnaireset")
        .where("active", "==", true)
        .get()
        .then(doc => {
          if (doc.size) {
            this.$q.localStorage.set("currentQuestionnaireKey", doc.docs[0].id);
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                questionnaireKey: doc.docs[0].id,
                currentPage: "start-questionnaire",
                date: date
              })
              .then(() => {
                this.isActivePracticeNumberQuestion = true;
                this.isActivePractice = true;
                this.isActivePracticeTimer = true;
                this.activeType = "start";
              });
          }
        });
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  created() {
    this.snapQuestionnaireLog();
    if (this.$q.localStorage.has("activeType")) {
      this.activeType = this.$q.localStorage.getItem("activeType");
    } else {
      this.activeType = "ready";
    }
  },
  beforeDestroy() {
    this.snapGetOnlineStudent();
    this.snapGetLog();
  }
};
</script>

<style lang="scss" scoped>
.btn-active {
  transition-duration: 0.2s;
}
.btn-active:hover {
  background-color: #ffffffe3;
}

.btn-active:active {
  background-color: #ffffffaf;
}

.text-size-s {
  font-size: 24px;
}

.text-size-m {
  font-size: 28px;
}

.text-size-l {
  font-size: 32px;
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
