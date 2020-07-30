<template>
  <q-page class="bg_score">
    <div class="row q-pa-sm relative-position bg5">
      <div class="absolute" style="bottom:6px">
        <q-btn
          push
          class="bg3 color6"
          to="/teacher/score"
          label="เมนูหลัก"
          icon="fas fa-chevron-left"
        ></q-btn>
      </div>
      <div align="center" class="color3 col-12 self-center text-h5">คะแนนทบทวน</div>
    </div>

    <div class="row q-pa-md items-center" style="width:90%;margin:auto;">
      <div class="col-1">ชั้น/ห้อง</div>
      <div class="col-2">
        <q-select
          outlined
          square
          dense
          class="bg-white"
          v-model="classRoomSelected"
          :options="classRoomOptions"
          @input="loadStudent()"
        ></q-select>
      </div>
      <div class="col offset-2" style="border:1px solid #662707">
        <div class="row items-center q-px-md q-py-sm">
          <div class="col">รูปแบบคะแนน</div>
          <div class="col">
            <q-radio @input="loadScoreReview()" val="1" v-model="scoreType" label="ทบทวนคำศัพท์"></q-radio>
          </div>
          <div class="col">
            <q-radio @input="loadScoreReview()" val="2" v-model="scoreType" label="ทบทวนไวยากรณ์"></q-radio>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div style="width:90%;margin:auto;border:1px solid #662707">
        <div class="bg-white q-pa-sm">
          <div class="row bg8 q-pa-xs" style="border-radius:5px">
            <div class="col-2 bg-white" align="center" style="border-radius:5px">
              <img style="width:90px" src="../../statics/logo_winner.png" alt />
            </div>
            <div class="col text-white q-pa-sm" align="center">
              <div class="q-pb-xs">{{ schoolData.name }}</div>
              <div class="q-px-md">
                <q-separator class="bg-white q-mb-xs" />
                ปีการศึกษา {{ this.getTerm() }}/{{ this.getAcademicYear() }} | {{ convertClassroom }}
              </div>
            </div>
          </div>

          <div class="q-pt-md">
            <table style="width:100%;border-collapse:collapse">
              <tr style="background-color:#616262" class="text-white">
                <td
                  style="width:8%;border-right:1px solid black;border-left:1px solid black;border-top:1px solid black"
                  align="center"
                  class="q-pa-sm"
                >เลขที่</td>
                <td
                  style="width:20%;border-right:1px solid black;border-top:1px solid black"
                  align="center"
                >ชื่อ - นามสกุล</td>
                <td>
                  <table class="fit" style="border-collapse:collapse">
                    <tr>
                      <td
                        align="center"
                        colspan="16"
                        style="border-bottom:1px solid black;border-top:1px solid black;border-right:1px solid black"
                        class="q-pa-sm"
                      >
                        <span v-if="scoreType == '1'">คะแนนทบทวนคำศัพท์ (%)</span>
                        <span v-else>คะแนนทบทวนไวยากรณ์ (%)</span>
                      </td>
                    </tr>
                    <tr style="border-bottom:1px solid black">
                      <td
                        align="center"
                        class="q-pa-sm"
                        style="min-width:40px;border-right:1px solid black"
                        v-for="i in 16"
                        :key="i"
                      >{{ i }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr
                v-for="(items,index) in studentList"
                :key="index"
                style="border-bottom:1px solid black"
              >
                <td
                  style="border-left:1px solid;border-right:1px solid black"
                  align="center"
                >{{ items.no }}</td>
                <td
                  style="border-right:1px solid;"
                  class="q-pl-md"
                >{{ items.name }} {{ items.surname }}</td>
                <td>
                  <table class="fit" style="border-collapse:collapse" v-if="isLoadScore">
                    <tr>
                      <td
                        align="center"
                        style="min-width:40px;border-right:1px solid black"
                        v-for="i in 16"
                        :key="i"
                      >
                        <span
                          v-if=" reviewScore.filter(x => x.studentKey == items.key && x.unit == i.toString()).length"
                        >{{ reviewScore.filter(x => x.studentKey == items.key && x.unit == i.toString())[0].scorePercent }}</span>
                        <span v-else>-</span>
                        <!-- <span v-if="scoreType == '1'">
                          <span v-if="i== 1">{{ examScore[index] }}</span>
                          <span v-else>-</span>
                        </span>
                        <span v-else>
                          <span v-if="i== 1">{{ examScoreGrammar[index] }}</span>
                          <span v-else>-</span>
                        </span>-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
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
      classRoomSelected: "",
      classRoomOptions: [],
      scoreType: "1",
      studentList: [],
      reviewScore: "",
      isLoadScore: false,
      examScore: [],
      examScoreGrammar: []
    };
  },
  methods: {
    loadData() {
      // NOTE LOAD CLASSROOM OPTIONS
      //   this.loadingShow();

      this.studentAllList = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      );

      let roomTotal = [];
      let studentData = this.studentAllList.map(x => {
        return x.classRoom + "/" + x.room;
      });

      studentData = [...new Set(studentData)];

      studentData.sort((a, b) => {
        let grade1 = a[0];
        let grade2 = b[0];
        if (grade1 == "ป") {
          grade1 = "z";
        }
        if (grade2 == "ป") {
          grade2 = "z";
        }
        let d1 = grade1 + a.slice(1);
        let d2 = grade2 + b.slice(1);
        return d1 > d2 ? 1 : -1;
      });

      this.classRoomOptions = studentData;
      this.classRoomSelected = studentData[0];
      this.loadStudent();
    },
    loadStudent() {
      let classRoom = this.classRoomSelected.slice(0, 3);
      let room = this.classRoomSelected.slice(4);
      let result = this.studentAllList.filter(x => {
        return x.classRoom == classRoom && x.room == room;
      });

      result.sort((a, b) => {
        return a.no - b.no;
      });

      let levelStudent = result.map(x => x.level);
      levelStudent = levelStudent.sort((a, b) => Number(b) - Number(a));

      this.selectedLevel = levelStudent[0];

      this.studentList = result;
      this.loadScoreReview();
    },
    loadScoreReview() {
      this.isLoadScore = false;
      let classSelected = this.classRoomSelected.slice(0, 3);
      let roomSelected = this.classRoomSelected.slice(4);
      let year = this.getAcademicYear();

      this.studentList.forEach(element => {
        element.scoreReview = [];
      });

      db.collection("studentpracticelog")
        .where("class", "==", classSelected)
        .where("room", "==", roomSelected)
        .where("year", "==", year)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get()
        .then(doc => {
          let temp = [];
          let reviewType =
            this.scoreType == "1" ? "review vocab" : "review grammar";
          doc.forEach(element => {
            if (element.data().practiceType == reviewType) {
              let scorePercent =
                element.data().correct / element.data().totalQuestion;

              // console.log(element.data().correct, element.data().totalQuestion);
              let test = Math.round(scorePercent * 100);
              let dataPush = {
                scorePercent: Math.round(scorePercent * 100),
                studentKey: element.data().studentKey,
                studentName: element.data().studentName,
                unit: element.data().unit
              };

              console.log(dataPush);
              temp.push(dataPush);
            }
          });

          temp = temp.sort((a, b) => Number(a.unit) - Number(b.unit));
          this.reviewScore = temp;
          this.isLoadScore = true;
        });
    }
  },
  mounted() {
    this.loadData();
  },
  computed: {
    convertClassroom() {
      if (this.classRoomSelected.includes("ป")) {
        return this.classRoomSelected.replace("ป.", "ชั้นประถมศึกษาปีที่ ");
      } else {
        return this.classRoomSelected.replace("ม.", "ชั้นมัธยมศึกษาปีที่ ");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bg_score {
  background-color: #ffe5d2;
}
</style>