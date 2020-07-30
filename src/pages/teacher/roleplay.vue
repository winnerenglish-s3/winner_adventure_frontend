<template>
  <q-page
    :class="practiceWorld == 'Vocabulary'
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
        : ''"
    class="bg-vocabulary bg-blend-mode q-pa-md color3"
  >
    <div class="relative-position q-mb-md" align="center">
      <div
        class="bg5 br-a-sm q-pa-xs shadow-2"
        style="width:fit-content;width:-webkit-fit-content;"
      >
        <div class="br-a-sm border-dashed q-px-xl q-py-sm">
          <span class="text-bold" style="font-size:calc(20px + 1vw)">บทหนังสั้น</span>
        </div>
      </div>
    </div>

    <div class="row justify-center full-width">
      <div class="col-12 bg5 relative-position" style="max-width:1400px;width:100%;">
        <div class="absolute-right" style="top:-105px;">
          <countdown-timer
            class="relative-position"
            style="top:12px"
            :practiceTimeProps="currentPractice.time"
          ></countdown-timer>
        </div>
        <div
          class="bg3 text-white q-pa-md text-h6"
          align="center"
        >{{$q.localStorage.getItem("practiceListName").name}} ({{currentDialog+1}}/{{speakingDialog.length}})</div>
        <div class="bg5 relative-position" style="min-height:calc(100vh - 300px);">
          <div class="q-ma-md row">
            <div class="col q-pa-md" align="left">
              <div
                class="color1 bg3 q-pa-xs"
                style="width:fit-content;width:-webkit-fit-content;border-radius:30px;"
              >
                <q-icon size="50px" name="fas fa-user-circle"></q-icon>
                <span
                  v-if="isLoad"
                  class="q-mx-lg"
                  style="font-size:18px;"
                >{{speakingDialog[currentDialog].name}}</span>
              </div>
            </div>
          </div>
          <div class="row items-center" style="min-height:calc(100vh - 380px)" v-if="isLoad">
            <div class="col-1 q-pl-md">
              <q-btn
                style="height:180px"
                @click="changeDialog('previous')"
                icon="fas fa-chevron-left"
                class="text-h5"
                dense
                push
                :disable="isDisableBtn"
                :class="currentDialog > 0 ? 'bg3 color1' : 'bg11 color1 no-pointer-events' "
              ></q-btn>
            </div>
            <div class="col-10" align="center">
              <div class="text-h2">{{ speakingDialog[currentDialog].conversationEng }}</div>
              <div class="text-h3 q-pt-md">{{ speakingDialog[currentDialog].conversationThai }}</div>
            </div>
            <div class="col-1 q-pr-md" align="right">
              <q-btn
                style="height:180px"
                @click="changeDialog('next')"
                icon="fas fa-chevron-right"
                class="text-h5"
                dense
                push
                :disable="isDisableBtn"
                :class="currentDialog < speakingDialog.length - 1 ? 'bg3 color1' : 'bg11 color1 no-pointer-events'"
              ></q-btn>
            </div>
            <div class="col-12 color6 relative-position" align="center">
              <q-btn style="width:180px" class="bg3">
                <q-icon
                  name="fas fa-volume-up"
                  @click="playSound(speakingDialog[currentDialog].audioURL)"
                  size="50px"
                ></q-icon>
              </q-btn>
              <div class="absolute-right color3 q-pr-md" v-show="isShowFinishPractice">
                <q-btn
                  label="จบภารกิจ"
                  class="bg6 color3 fit text-h5"
                  icon-right="fas fa-chevron-right"
                  @click="finishMission()"
                ></q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import countdownTimer from "../../components/countdownTimer";
import { db } from "../../router";
export default {
  components: {
    countdownTimer
  },
  data() {
    return {
      isShowFinishPractice: false,
      practiceWorld: this.decrypt(
        this.$q.localStorage.getItem("currentWorld"),
        2
      ),
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      speakingDialog: "",
      practiceList: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      currentDialog: 0,
      isDisableBtn: false,
      isLoad: false,
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      enterPageMicrotime: this.$q.localStorage.getItem("enterPracticeTime"),
      practiceListName: this.$q.localStorage.getItem("practiceListName")
    };
  },
  methods: {
    async finishMission() {
      this.loadingShow();
      let date = await this.getDateAndTime();
      // ปุ่มเสร็จสิ้น Flashcard
      let useTime = date.microtime - this.enterPageMicrotime;
      // หน่วยวินาที
      useTime = useTime / 1000;
      useTime = this.secondToMinutes(useTime);

      let filterWhere =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      // เช็คว่าเคยเซฟเข้าไปแล้วหรือยัง
      db.collection("classroomPracticeLog")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("filter", "==", filterWhere)
        .get()
        .then(doc => {
          if (!doc.size) {
            db.collection("classroomPracticeLog")
              .add({
                practiceKey: this.currentPractice.practiceKey,
                date: date,
                useTime: useTime,
                class: this.currentClass,
                room: this.currentRoom,
                term: this.currentTerm,
                year: this.currentYear,
                filter: filterWhere,
                timeIn: this.enterPageMicrotime,
                timeOut: date.microtime,
                skill: this.currentPractice.skill,
                order: this.currentPractice.order,
                practiceListName: this.practiceListName.name,
                practiceType: this.currentPractice.practicetype,
                level: this.currentPractice.level,
                unit: this.currentPractice.unit,
                schoolKey: this.teacherData.schoolKey
              })
              .then(() => {
                db.collection("synchronize")
                  .doc(this.teacherData.key)
                  .update({
                    currentPage: "finish-waiting",
                    date: date
                  })
                  .then(() => {
                    this.loadingHide();
                    this.$router.push("/teacher/finishpractice/");
                  });
              });
          } else {
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                currentQuestion: 0,
                currentVocabKey: "",
                practiceKey: "",
                currentPage: "finish-waiting",
                date: date
              })
              .then(() => {
                this.loadingHide();
                this.$router.push("/teacher/finishpractice/");
              });
          }
        });
    },
    changeDialog(type) {
      this.isDisableBtn = true;
      if (type == "next") {
        if (this.currentDialog < this.speakingDialog.length - 1) {
          this.currentDialog++;
        }
      } else {
        if (this.currentDialog > 0) {
          this.currentDialog--;
        }
      }

      if (this.currentDialog == this.speakingDialog.length - 1) {
        this.isShowFinishPractice = true;
      }

      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentQuestion: this.currentDialog
        })
        .then(() => {
          this.isDisableBtn = false;
        });
    },
    async loadRolePlay() {
      let speaker = await this.loadConversationSpeaker();
      let conversationKey = speaker.conversationKey;

      let conversationSpeaker = speaker.temp;

      console.log(conversationSpeaker);

      // console.log(speaker);
      // console.log(conversationDialog);

      db.collection("practicepool_server")
        .where("practicekey", "==", conversationKey)
        .get()
        .then(doc => {
          let temp = [];
          console.log(
            "อย่าลืม Sync ข้อมูล เมื่อทำการ เปิดการใช้งาน RolePlay ไม่งั้นจะโหลดข้อมูลไม่ได้"
          );
          doc.forEach(element => {
            if (element.data().rolePlay) {
              let name = conversationSpeaker.filter(
                x => x.key == element.data().nameKey
              )[0];

              let mergeData = {
                name: name.nameConversationer
              };

              temp.push({ name: name.nameConversationer, ...element.data() });
            }
          });
          temp.sort((a, b) => Number(a.order) - Number(b.order));

          this.speakingDialog = temp;
          this.isLoad = true;
        });
    },
    async loadConversationSpeaker() {
      return new Promise((a, b) => {
        let findConversationKey = this.practiceList.filter(
          x =>
            x.level == this.currentPractice.level &&
            x.unit == this.currentPractice.unit &&
            x.practicetype == "speaking"
        )[0].practiceKey;

        db.collection("conversationSpeaker")
          .where("practicekey", "==", findConversationKey)
          .get()
          .then(doc => {
            let temp = [];
            doc.forEach(element => {
              temp.push({ ...element.data(), key: element.id });
            });

            let finalData = {
              temp,
              ...{ conversationKey: findConversationKey }
            };

            a(finalData);
          });
      });
    }
  },
  mounted() {
    this.loadRolePlay();
  }
};
</script>

<style lang="scss" scoped>
</style>