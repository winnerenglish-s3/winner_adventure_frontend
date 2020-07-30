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
      <div align="center" class="color3 col-12 self-center text-h5">คะแนนเก็บ</div>
    </div>

    <!-- NOTE Selection-->

    <div class="row q-pa-md items-center">
      <div class="col-2 q-pr-sm" style="width:100px" align="right">ชั้น/ห้อง</div>
      <div class="col-1">
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
      <div class="col-1 q-pr-sm" style="width:80px" align="right">คะแนนเต็ม</div>
      <div class="col-1">
        <q-input
          @input="filterScoreByUnit()"
          v-model="fullScore"
          outlined
          class="bg-white"
          dense
          square
        ></q-input>
      </div>
      <div class="col q-px-md">
        <div class="row items-center q-px-md q-py-sm" style="border:1px solid #87533B">
          <div class="col-5">
            <q-radio
              @input="filterScoreByUnit()"
              label="บทเดียว"
              val="1"
              v-model="unitType"
              color="brown-8"
            ></q-radio>
            <q-radio
              @input="filterScoreByUnit()"
              label="หลายบท"
              val="2"
              v-model="unitType"
              color="brown-8"
            ></q-radio>
          </div>
          <div class="col">
            <div class="row items-center">
              <div class="col q-pr-md" align="right">บทที่</div>
              <div class="col" style="min-width:90px">
                <q-select
                  :disable="!passedUnit.length"
                  :options="startUnitOptions"
                  v-model="startUnit"
                  dense
                  outlined
                  class="bg-white"
                  square
                  @input="checkEndUnit()"
                ></q-select>
              </div>
              <div class="col q-pr-md" v-show="unitType !='1'" align="right">ถึง</div>
              <div class="col" style="min-width:90px" v-show="unitType !='1'">
                <q-select
                  :disable="!passedUnit.length"
                  :options="endUnitOptions"
                  v-model="endUnit"
                  dense
                  outlined
                  class="bg-white"
                  square
                  @input="filterScoreByUnit()"
                  @popup-show="checkEndUnitOptions()"
                ></q-select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md">
      <div style="border:1px solid #87533B" class="row items-center q-pa-md">
        <div class="col-2">ทักษะที่เก็บคะแนน</div>
        <div class="col row justify-between">
          <q-checkbox
            @input="filterScoreByUnit()"
            dense
            v-model="skillSelected"
            val="Vocabulary"
            label="คำศัพท์"
          ></q-checkbox>
          <q-checkbox
            @input="filterScoreByUnit()"
            dense
            v-model="skillSelected"
            val="Grammar"
            label="ไวยกรณ์"
          ></q-checkbox>
          <q-checkbox
            @input="filterScoreByUnit()"
            dense
            v-model="skillSelected"
            val="Reading"
            label="การอ่าน"
          ></q-checkbox>
          <q-checkbox
            @input="filterScoreByUnit()"
            dense
            v-model="skillSelected"
            val="Writing"
            label="การเขียน"
          ></q-checkbox>
          <q-checkbox
            @input="filterScoreByUnit()"
            dense
            v-model="skillSelected"
            val="Phonics"
            label="การออกเสียง"
          ></q-checkbox>
          <q-checkbox
            @input="filterScoreByUnit()"
            dense
            v-model="skillSelected"
            val="Listening & Speaking"
            label="การพูดและฟัง"
          ></q-checkbox>
        </div>
      </div>
    </div>

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
                ปีการศึกษา {{ this.getTerm() }}/{{ this.getAcademicYear() }} | {{ convertClassroom }}
              </div>
            </div>
          </div>

          <div
            align="center"
            class="q-px-md q-pt-md"
            v-if="unitType == '1'"
          >ตารางคะแนนเก็บ บทที่ {{ startUnit }}</div>
          <div
            align="center"
            class="q-px-md q-pt-md"
            v-else
          >ตารางคะแนนเก็บ บทที่ {{startUnit}} - {{endUnit}}</div>
          <div align="center" class="q-px-md q-pb-md">คะแนนเต็ม {{ fullScore }} คะแนน</div>
          <!-- NOTE คะแนนแยกตามแบบฝึกหัด -->
          <div>
            <table class="fit table_border" style="border-collapse:collapse">
              <tr style="background-color:#616262" class="text-white">
                <td style="width:15%" align="center" class="q-pa-sm table_border">เลขที่</td>
                <td align="center" class="table_border">ชื่อ - นามสกุล</td>
                <td style="width:15%" align="center" class="table_border">คะแนนเก็บ</td>
              </tr>
              <tr v-for="(items,index) in studentList" :key="index">
                <td align="center" class="q-pa-sm table_border">{{ items.no }}</td>
                <td class="table_border">
                  <div class="q-pl-md">{{ items.name }} {{ items.surname }}</div>
                </td>
                <td align="center" class="table_border">{{ items.scoreAvg }}</td>
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
      fullScore: 10,
      unitType: "1",
      startUnit: "",
      startUnitOptions: [],
      endUnitOptions: [],
      endUnit: "",
      classRoomSelected: "",
      classRoomOptions: [],
      skillSelected: [
        "Vocabulary",
        "Grammar",
        "Reading",
        "Writing",
        "Phonics",
        "Listening & Speaking"
      ],
      studentAllList: "",
      passedUnit: [],
      term: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      year: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      studentList: [],
      studentPracticeLog: "",
      practiceList: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      copyUnitOptions: "",
      selectedLevel: ""
    };
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
  methods: {
    checkEndUnitOptions() {
      let copyFilter = this.copyUnitOptions.slice();
      this.endUnitOptions = copyFilter;
      this.endUnitOptions = copyFilter.filter(
        x =>
          Number(x) >= Number(this.startUnit) &&
          Number(x) <=
            Number(this.startUnitOptions[this.startUnitOptions.length - 1])
      );
    },
    printScore() {
      this.$router.push({
        name: "teacher/scoreAvgPrint",
        params: {
          data: this.studentList,
          schoolKey: this.teacherData.schoolKey,
          term: this.getTerm(),
          year: this.getAcademicYear(),
          classRoomSelected: this.classRoomSelected,
          typeHeader:
            this.unitType == "1"
              ? `ตารางคะแนนเก็บ Unit ${this.startUnit} `
              : `ตารางคะแนนเก็บ Unit ที่ ${this.startUnit} - ${this.endUnit}`,
          scoreHeader: `คะแนนเต็ม ${this.fullScore} คะแนน`
        }
      });
    },
    checkEndUnit() {
      this.endUnitOptions = this.copyUnitOptions;
      if (this.endUnit < this.startUnit) this.endUnit = this.startUnit;
      this.filterScoreByUnit();
    },
    loadPassedUnit() {
      // NOTE LOAD unit ที่เคยทำแล้วของระดับชั้นนี้ ห้องนี้
      let filter =
        this.classRoomSelected.slice(0, 3) +
        "-" +
        this.classRoomSelected.slice(4) +
        "-" +
        this.term +
        "-" +
        this.year;
      let passedUnit = [];

      db.collection("classroomPracticeLog")
        .where("filter", "==", filter)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get()
        .then(doc => {
          doc.forEach(element => {
            passedUnit.push(element.data().unit);
          });
          passedUnit = [...new Set(passedUnit)];
          passedUnit = passedUnit.sort((a, b) => {
            return Number(a) - Number(b);
          });
          this.startUnit = passedUnit[passedUnit.length - 1];
          this.endUnit = passedUnit[passedUnit.length - 1];
          this.passedUnit = passedUnit;
          let copyUnitOptions = [...this.copyUnitOptions];
          let newOptions = copyUnitOptions.filter(x => passedUnit.includes(x));
          this.startUnitOptions = newOptions;
          this.endUnitOptions = newOptions;
          this.loadPracticeLog();
        });
    },
    loadStartAndEndUnitOptions() {
      // NOTE SET INITIAL UNIT FOR START AND END UNIT
      let startUnit = [];
      let endUnit = [];
      let numberOfUnit = 16;
      for (let unit = 1; unit <= numberOfUnit; unit++) {
        startUnit.push(unit.toString());
        endUnit.push(unit.toString());
      }
      this.startUnitOptions = startUnit;
      this.endUnitOptions = endUnit;
      this.copyUnitOptions = startUnit;
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

      let levelStudent = result.map(x => x.level);
      levelStudent = levelStudent.sort((a, b) => Number(b) - Number(a));

      this.selectedLevel = levelStudent[0];

      this.studentList = result;
      this.loadPassedUnit();
    },
    loadPracticeLog() {
      this.loadingShow();
      let studentPracticeLogTemp = [];

      // console.log(this.classRoomSelected.slice(0, 3));
      // console.log(this.classRoomSelected.slice(4));
      // console.log(this.teacherData.schoolKey);
      // console.log(this.year);
      // console.log(this.selectedLevel, typeof this.selectedLevel);
      db.collection("studentpracticelog")
        .where("class", "==", this.classRoomSelected.slice(0, 3))
        .where("room", "==", this.classRoomSelected.slice(4))
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("year", "==", this.year)
        .where("level", "==", this.selectedLevel)
        .get()
        .then(doc => {
          // console.log(doc.size);
          doc.forEach(element => {
            // console.log(element.data());
            if (!element.data().practiceType.includes("review")) {
              let scorePercent =
                (Number(element.data().correct) /
                  Number(element.data().totalQuestion)) *
                100;

              let dataPush = {
                studentKey: element.data().studentKey,
                unit: element.data().unit,
                scorePercent: scorePercent,
                scoreAvg: 0,
                skill: element.data().skill
              };
              studentPracticeLogTemp.push(dataPush);
            }
          });

          this.studentPracticeLog = studentPracticeLogTemp;
          this.filterScoreByUnit();
        });
    },
    async getPracticeList() {
      let practiceTemp = [];
      let loadPracticelist = await db.collection("practicelist").get();
      loadPracticelist.forEach(element => {
        let dataKey = { practiceKey: element.id };
        let final = { ...dataKey, ...element.data() };
        practiceTemp.push(final);
        practiceTemp.sort((a, b) => {
          return a.order - b.order;
        });
      });
      practiceTemp.sort((a, b) => {
        return Number(a.unit) - Number(b.unit);
      });
      this.practiceList = practiceTemp;
      this.loadData();
    },
    filterScoreByUnit() {
      let exceptPracticeType = [
        "flashcard",
        "grammarlesson",
        "languagetips",
        "phonicslesson",
        "readingspeaking",
        "roleplay",
        "speaking",
        "vdo",
        "review vocab",
        "review grammar"
      ];

      let practiceFiltered = this.practiceList.filter(x => {
        return !exceptPracticeType.includes(x.practicetype);
      });

      let practiceLog = this.studentPracticeLog.filter(x =>
        this.skillSelected.includes(x.skill)
      );

      if (this.unitType == "1") {
        // NOTE เลือกแบบบทเดียว
        // let levelStudent = this.studentList.map(x => x.level);
        // levelStudent = levelStudent.sort((a, b) => Number(b) - Number(a))[0];

        let scoreFiltered = practiceLog.filter(x => x.unit == this.startUnit);
        let totalPracticeInUnit = practiceFiltered.filter(x => {
          return (
            x.unit == this.startUnit &&
            this.skillSelected.includes(x.skill) &&
            x.level == this.selectedLevel
          );
        });
        // NOTE จำนวนแบบฝึกหัดทั้งหมดของ Unit นี้โดย ตัดแบบฝึกหัดที่ไม่มีคะเเนนทิ้งไปแล้ว
        let numberOfPracticeInThisUnit = totalPracticeInUnit.length;

        this.studentList.forEach(element => {
          let scoreAvg = scoreFiltered
            .filter(x => x.studentKey == element.key)
            .map(e => e.scorePercent);
          element.scoreTotal = scoreAvg;
          console.log(scoreAvg);
          console.log("____________________");
          // TODO ต้องหารจากแบบฝึกหัดทั้งหมดของunit นั้นๆ
          scoreAvg =
            ((scoreAvg.reduce((a, b) => a + b, 0) /
              numberOfPracticeInThisUnit) *
              this.fullScore) /
            100;
          element.scoreAvg = scoreAvg ? Math.round(scoreAvg) : "-";
          this.studentList.push("");
          this.studentList.pop();
        });
      } else {
        // NOTE เลือกแบบหลายบท
        console.clear();
        let unitSelected = [];
        for (
          let unit = Number(this.startUnit);
          unit <= Number(this.endUnit);
          unit++
        ) {
          unitSelected.push(unit.toString());
        }

        let scoreFiltered = practiceLog.filter(x => {
          return unitSelected.includes(x.unit);
        });

        let totalPracticeInUnit = practiceFiltered.filter(x => {
          return (
            unitSelected.includes(x.unit) &&
            x.level == this.selectedLevel &&
            this.skillSelected.includes(x.skill)
          );
        });

        let numberOfPracticeInThisUnit = totalPracticeInUnit.length;

        this.studentList.forEach(element => {
          let scoreAvg = scoreFiltered
            .filter(x => x.studentKey == element.key)
            .map(e => e.scorePercent);
          element.scoreTotal = scoreAvg;
          // TODO ต้องหารจากแบบฝึกหัดทั้งหมดของunit นั้นๆ
          scoreAvg =
            ((scoreAvg.reduce((a, b) => a + b, 0) /
              numberOfPracticeInThisUnit) *
              this.fullScore) /
            100;
          element.scoreAvg = scoreAvg ? Math.round(scoreAvg) : "-";
          this.studentList.push("");
          this.studentList.pop();
        });
      }
      this.loadingHide();
    }
  },
  mounted() {
    this.loadStartAndEndUnitOptions();
    this.getPracticeList();
  }
};
</script>

<style lang="scss" scoped>
.bg_score {
  background-color: #ffe5d2;
}
.table_border {
  border: 1px solid black;
}
</style>