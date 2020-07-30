<template>
  <q-page class="bg_score">
    <!-- NOTE App Bar -->
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
      <div align="center" class="color3 col-12 self-center text-h5">คะแนนทดสอบก่อนเรียน / หลังเรียน</div>
    </div>
    <!-- NOTE Selection Section -->
    <div class="row items-center q-pa-md text-h7">
      <div class="col-1" align="center">ชั้น/ห้อง</div>
      <div class="col-1">
        <q-select
          @input="loadStudent()"
          square
          class="bg-white"
          dense
          outlined
          :options="classRoomOptions"
          v-model="classRoomSelected"
        ></q-select>
      </div>
      <div class="col q-px-md">
        <div class="row items-center q-px-md q-py-sm" style="border:1px solid #87533B">
          <div class="col-2">รูปแบบคะแนน</div>
          <div class="col">
            <div class="row q-pa-sm">
              <div class="col">
                <q-radio
                  @input="loadTestScore()"
                  dense
                  color="brown-8"
                  v-model="scoreType"
                  val="1"
                  label="ทดสอบก่อนเรียน"
                ></q-radio>
              </div>
              <div class="col">
                <q-radio
                  @input="loadTestScore()"
                  dense
                  color="brown-8"
                  v-model="scoreType"
                  val="2"
                  label="ทดสอบหลังเรียน"
                ></q-radio>
              </div>
              <div class="col">
                <q-radio
                  @input="loadTestScore()"
                  dense
                  color="brown-8"
                  v-model="scoreType"
                  val="3"
                  label="ทดสอบก่อนและหลังเรียน"
                ></q-radio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE DATA TABLE -->
    <div class="q-pa-md">
      <div style="border:1px solid #87533B;" class="q-pa-md relative-position">
        <!-- <div align="right" class="q-pb-sm">
          <q-btn @click="printScore()" icon="fas fa-print" round class="bg3 text-white" size="md"></q-btn>
        </div>-->
        <div style="margin:auto;width:100%;" class="bg-white q-pa-sm">
          <div class="row bg8 q-pa-xs" style="border-radius:5px">
            <div class="col-2 bg-white" align="center" style="border-radius:5px">
              <img style="width:90px" src="../../statics/logo_winner.png" alt />
            </div>
            <div class="col text-white q-pa-sm" align="center">
              <div class="q-pb-xs">{{ schoolData.name }}</div>
              <div class="q-px-md">
                <q-separator class="bg-white q-mb-xs" />
                ปีการศึกษา {{ this.getTerm() }}/{{ this.getAcademicYear() }} |
                {{ convertClassroom }}
              </div>
            </div>
          </div>
          <div align="center" v-if="scoreType == '1'" class="q-pa-md">คะแนนทดสอบก่อนเรียน</div>
          <div align="center" v-else-if="scoreType == '2'" class="q-pa-md">คะแนนทดสอบหลังเรียน</div>
          <div align="center" v-else class="q-pa-md">คะแนนทดสอบก่อนและหลังเรียน</div>
          <!-- NOTE คะแนนก่อนเรียน -->
          <div v-if="scoreType == '1'">
            <table class="fit table_border" style="border-collapse:collapse">
              <tr style="background-color:#616262" class="text-white">
                <td class="q-pa-sm table_border" style="width:10%">เลขที่</td>
                <td class="table_border">ชื่อ - นามสกุล</td>
                <td class="table_border" style="width:15%">คะแนน</td>
              </tr>
              <tr v-for="(items, index) in studentList" :key="index">
                <td class="table_border">{{ items.no }}</td>
                <td class="table_border">{{ items.name }} {{ items.surname }}</td>
                <td class="table_border">{{ items.score }}</td>
              </tr>
            </table>
          </div>
          <!-- NOTE คะแนนหลังเรียน -->
          <div v-else-if="scoreType == '2'">
            <table class="fit table_border" style="border-collapse:collapse">
              <tr style="background-color:#616262" class="text-white">
                <td class="q-pa-sm table_border" style="width:10%">เลขที่</td>
                <td class="table_border">ชื่อ - นามสกุล</td>
                <td class="table_border" style="width:15%">คะแนน</td>
              </tr>
              <tr v-for="(items, index) in studentList" :key="index">
                <td class="table_border">{{ items.no }}</td>
                <td class="table_border">{{ items.name }} {{ items.surname }}</td>
                <td class="table_border">{{ items.score }}</td>
              </tr>
            </table>
          </div>
          <div v-else>
            <!-- NOTE คะแนนก่อนเรียนและหลังเรียน -->
            <table class="fit table_border" style="border-collapse:collapse">
              <tr style="background-color:#616262" class="text-white">
                <td class="q-pa-sm table_border" style="width:10%">เลขที่</td>
                <td class="table_border">ชื่อ - นามสกุล</td>
                <td class="table_border" style="width:15%">คะแนนก่อนเรียน</td>
                <td class="table_border" style="width:15%">คะแนนหลังเรียน</td>
                <td class="table_border" style="width:15%">ผลต่างคะแนน</td>
              </tr>

              <tr v-for="(items, index) in studentList" :key="index">
                <td class="table_border">{{ items.no }}</td>
                <td class="table_border">{{ items.name }} {{ items.surname }}</td>
                <td class="table_border">{{ items.pretestScore }}</td>
                <td class="table_border">{{ items.posttestScore }}</td>
                <td class="table_border">{{ items.diffScore }}</td>
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
      classRoomOptions: "",
      classRoomSelected: "",
      scoreType: "1",
      term: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      year: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      practiceList: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      studentList: "",
      scoreData: ""
    };
  },
  methods: {
    printScore() {
      this.$router.push({
        name: "teacher/scorePrePostPrint",
        params: {
          data: this.studentList,
          schoolKey: this.teacherData.schoolKey,
          term: this.getTerm(),
          year: this.getAcademicYear(),
          classRoomSelected: this.classRoomSelected,
          type: this.scoreType
        }
      });
    },
    loadData() {
      // NOTE LOAD CLASSROOM OPTIONS
      this.loadingShow();

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

      this.studentList = result;
      this.loadScore();
    },
    loadScore() {
      db.collection("studentprepostlog")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("room", "==", this.classRoomSelected.slice(4))
        .where("class", "==", this.classRoomSelected.slice(0, 3))
        .where("term", "==", this.term)
        .where("year", "==", this.year)
        .get()
        .then(doc => {
          let scoreTemp = [];
          doc.forEach(element => {
            let data = {
              correct: element.data().correct,
              incorrect: element.data().incorrect,
              studentKey: element.data().studentKey,
              type: element.data().type,
              scorePercent: Math.round(
                (element.data().correct / element.data().totalQuestion) * 100
              )
            };
            scoreTemp.push(data);
          });

          this.scoreData = scoreTemp;
          this.loadTestScore();
        });
    },
    loadTestScore() {
      let type;
      if (this.scoreType == "1") {
        type = "pretest";
      } else if (this.scoreType == "2") {
        type = "posttest";
      }

      this.studentList.forEach(element => {
        let score;
        if (this.scoreType == "3") {
          // NOTE กรณีเลือกแบบคะแนนก่อนเเละหลังเรียน

          let pretestScore = this.scoreData.filter(
            x => x.studentKey == element.key && x.type == "pretest"
          );
          let posttestScore = this.scoreData.filter(
            x => x.studentKey == element.key && x.type == "posttest"
          );
          element.pretestScore = pretestScore.length
            ? pretestScore[0].scorePercent
            : 0;

          element.posttestScore = posttestScore.length
            ? posttestScore[0].scorePercent
            : 0;
          element.diffScore = element.posttestScore - element.pretestScore;
          this.studentList.push("");
          this.studentList.pop();
        } else {
          score = this.scoreData.filter(
            x => x.studentKey == element.key && x.type == type
          );
          score = score.length ? score[0].scorePercent : 0;
          element.score = score;
          this.studentList.push("");
          this.studentList.pop();
        }
      });
      this.loadingHide();
    }
  },
  computed: {
    convertClassroom() {
      if (this.classRoomSelected.includes("ป")) {
        return this.classRoomSelected.replace("ป.", "ชั้นประถมศึกษาปีที่ ");
      } else {
        return this.classRoomSelected.replace("ม.", "ชั้นมัธยมศึกษาปีที่ ");
      }
    }
  },
  mounted() {
    console.clear();
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
.bg_score {
  background-color: #ffe5d2;
}
.table_border {
  border: 1px solid black;
  text-align: center;
}
</style>
