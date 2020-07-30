<template>
  <q-page
    class="row justify-center q-pa-sm color3"
    :class="
      practiceWorld == 'Vocabulary'
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
    <div class="row items-center q-mt-sm">
      <div class="bg5 br-a-sm q-pa-sm" v-if="isLoadData">
        <div class="border-dashed br-a-sm q-px-xl q-py-md">
          <span
            class="text-h4 text-bold"
            style="font-size:2.5vw"
          >คะแนนรวมทักษะ{{ showSkillName(practiceWorld) }}</span>
        </div>
      </div>
    </div>

    <div class="row justify-center full-width q-mt-md" v-if="isLoadData">
      <div class="col-10 bg5 br-a-md q-pa-md relative-position">
        <div
          class="border-dashed br-a-md q-px-lg full-height relative-position"
          style="min-height:calc(100vh - 210px);height:fit-content;"
        >
          <div class>
            <q-scroll-area style="height: 600px;width:100%">
              <table style="width:100%;border-spacing: 10px;" class="q-pa-md">
                <tr>
                  <td
                    class="text-weight-bolder text-h6 q-pl-lg cursor-pointer"
                    @click="sortNumber()"
                    align="center"
                    style="width:20%"
                  >
                    เลขที่
                    <q-icon name="fas fa-sort"></q-icon>
                  </td>
                  <td class="text-weight-bolder text-h6 q-pl-lg">ชื่อ-นามสกุล</td>
                  <td
                    @click="sortScoreResult()"
                    class="text-weight-bolder text-h6 cursor-pointer"
                    align="center"
                    style="width:20%"
                  >
                    คะแนน
                    <q-icon name="fas fa-sort"></q-icon>
                  </td>
                </tr>

                <tr v-for="(items, index) in studentData" :key="index" class="color2">
                  <td
                    align="center"
                    style="width:10%;border-top-left-radius:5px;border-bottom-left-radius:5px"
                    class="q-pa-md"
                    :class="{ bg4: index % 2 == 0, bg9: index % 2 != 0 }"
                  >{{ items.no }}</td>
                  <td
                    class="q-pa-md"
                    :class="{ bg4: index % 2 == 0, bg9: index % 2 != 0 }"
                  >{{ items.name }} {{ items.surname }}</td>
                  <td
                    class="q-pa-md"
                    :class="{ bg4: index % 2 == 0, bg9: index % 2 != 0 }"
                    style="width:10%;border-top-right-radius:5px;border-bottom-right-radius:5px"
                    align="center"
                  >{{ items.totalScore }}</td>
                </tr>
              </table>
            </q-scroll-area>
          </div>

          <!-- ปุ่มบทเรียนต่อไป -->
          <div class="q-py-md" align="center">
            <q-btn
              label="ภารกิจถัดไป"
              icon="fas fa-star"
              class="bg3 color6 text-h6"
              style="width:200px"
              @click="nextLesson()"
            ></q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router";
export default {
  data() {
    return {
      isLoadData: false,
      practiceWorld: this.decrypt(
        this.$q.localStorage.getItem("currentWorld"),
        2
      ),
      practiceName: this.$q.localStorage.getItem("practiceListName").name,
      sortNo: true,
      sortScore: true,
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      currentWorld: this.decrypt(
        this.$q.localStorage.getItem("currentWorld"),
        2
      ),
      currentLevel: this.decrypt(
        this.$q.localStorage.getItem("currentLevel"),
        2
      ),
      currentUnit: this.decrypt(this.$q.localStorage.getItem("currentUnit"), 2),
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      studentPracticeLog: "",
      studentData: "",
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      )
    };
  },
  methods: {
    async nextLesson() {
      let sendData = {
        class: this.currentClass,
        room: this.currentRoom,
        term: this.currentTerm,
        year: this.currentYear,
        currentPractice: this.currentPractice
      };
      this.updateSummaryWorld();
      this.goToNextLesson(sendData, 2);
    },
    sortNumber() {
      this.sortNo = !this.sortNo;
      this.sortScore = true;
      if (this.sortNo) {
        this.studentData = this.studentData.sort((a, b) => a.no - b.no);
      } else {
        this.studentData = this.studentData.sort((a, b) => b.no - a.no);
      }
    },
    sortScoreResult() {
      this.sortScore = !this.sortScore;
      this.sortNo = true;

      if (this.sortScore) {
        this.studentData = this.studentData.sort(
          (a, b) => a.totalScore - b.totalScore
        );
      } else {
        this.studentData = this.studentData.sort(
          (a, b) => b.totalScore - a.totalScore
        );
      }
    },
    async loadScoreData() {
      this.loadingShow();
      let date = await this.getDateAndTime();
      db.collection("studentpracticelog")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear)
        .where("skill", "==", this.currentPractice.skill)
        .where("level", "==", this.currentPractice.level)
        .where("unit", "==", this.currentPractice.unit)
        .get()
        .then(doc => {
          let studentData = this.decrypt(
            this.$q.localStorage.getItem("allStudentData"),
            1
          );

          let studentPracticeLog = [];
          doc.forEach(element => {
            if (!element.data().practiceType.includes("review")) {
              studentPracticeLog.push(element.data());
            }
          });

          this.studentPracticeLog = studentPracticeLog;

          let studentDataFilter = studentData.filter(
            x =>
              x.classRoom == this.currentClass &&
              x.room == this.currentRoom &&
              x.term == this.currentTerm &&
              x.year == this.currentYear
          );
          let studentDataTemp = [];
          studentDataFilter.forEach(element => {
            let totalScore = studentPracticeLog
              .filter(x => x.studentKey == element.key)
              .map(e => e.correct)
              .reduce((a, b) => a + b, 0);

            if (this.currentPractice.skill == "Writing") {
              totalScore = Math.ceil(totalScore / 4);
            }
            let mergeData = { ...element, ...{ totalScore: totalScore } };
            studentDataTemp.push(mergeData);
          });
          this.studentData = studentDataTemp;
          this.studentData.sort((a, b) => a.no - b.no);

          db.collection("synchronize")
            .doc(this.teacherData.key)
            .update({
              summaryWorld: this.studentData,
              currentPage: "finish-world",
              date: date
            })
            .then(() => {
              this.isLoadData = true;
              this.loadingHide();
            });
        });
    },
    updateSummaryWorld() {
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          summaryWorld: ""
        });
    }
  },
  mounted() {
    this.loadScoreData();
  },
  beforeDestroy() {
    // this.updateSummaryWorld();
  }
};
</script>

<style lang="scss" scoped></style>
