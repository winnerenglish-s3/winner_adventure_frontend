<template>
  <q-page style="background-color:#FFE5D2">
    <div class="row">
      <div class="col q-pa-md">
        <q-select
          bg-color="white"
          @input="changeClassroom()"
          label="ระดับชั้น"
          v-model="classroomSelected"
          :options="classroomOptions"
          map-options
          emit-value
          outlined
          dense
        ></q-select>
      </div>
      <div class="col q-pa-md">
        <q-select
          bg-color="white"
          @input="changeUnitOrSkill()"
          label="ยูนิต"
          v-model="unitSelected"
          :options="unitOptions"
          outlined
          dense
        ></q-select>
      </div>
      <div class="col q-pa-md">
        <q-select
          bg-color="white"
          @input="changeUnitOrSkill()"
          label="ทักษะ"
          v-model="skillSelected"
          :options="skillOptions"
          outlined
          dense
        ></q-select>
      </div>
    </div>

    <div class="q-pa-md" align="center">
      <div class style="max-width:360px;width:100%">
        <div class="row" v-if="classroomOptions.length">
          <div
            class="col-12 text-h6 color3"
            v-if="unitSelected != 'กรุณาเลือกยูนิต'"
          >{{ showSkillName(skillSelected) }} - {{ practiceNameShow }}</div>
          <div class="col-12" v-for="(items,index) in practiceListShow" :key="index">
            <div class="q-pa-sm">
              <q-btn
                class="bg-teal text-white full-width q-pa-sm"
                no-caps
                align="left"
                icon="fas fa-file-alt"
                :label="convertPracticeName(items.practicetype,items.skill)"
                @click="goToPrint(items)"
              ></q-btn>
            </div>
          </div>
        </div>
        <!-- <div class="q-pa-xl">
          <span class="text-h6">ยังไม่มีการระบุเลเวล</span>
        </div>-->
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router";
export default {
  data() {
    return {
      classroomSelected: "",
      classroomOptions: [],
      unitOptions: [],
      unitSelected: "กรุณาเลือกยูนิต",
      skillSelected: "Vocabulary",
      skillOptions: [],
      practiceListShow: "",
      levelSelected: "",
      practiceList: "",
      practiceNameList: "",
      practiceNameShow: "",
    };
  },
  methods: {
    goToPrint(item) {
      let routeData = "";
      if (item.practicetype == "flashcard") {
        routeData = this.$router.resolve({
          path: "/print/flashcard/" + item.practiceId,
        });
      } else if (item.practicetype == "spelling bee") {
        let flashcardId = this.practiceListShow.filter(
          (x) => x.practicetype == "flashcard"
        )[0].practiceId;
        routeData = this.$router.resolve({
          path: "/print/spellingbee/" + flashcardId,
        });
      } else if (item.practicetype == "multiplechoices") {
        routeData = this.$router.resolve({
          path: "/print/multiple/" + item.practiceId,
        });
      }

      window.open(routeData.href, "_blank");
    },
    changeClassroom() {
      this.loadLevel();
    },
    changeUnitOrSkill() {
      this.loadingShow();

      if (this.unitSelected != "กรุณาเลือกยูนิต") {
        let practiceListShow = this.practiceList.filter(
          (x) =>
            x.level == this.levelSelected &&
            x.unit == this.unitSelected.toString() &&
            x.skill == this.skillSelected &&
            !x.practicetype.includes("review")
        );
        practiceListShow.sort((a, b) => a.order - b.order);
        this.practiceListShow = practiceListShow;
        this.practiceNameShow = this.practiceNameList.filter(
          (x) =>
            x.level == this.levelSelected &&
            x.unit == this.unitSelected &&
            x.skill == this.skillSelected
        )[0].name;
        this.loadingHide();
      } else {
        this.practiceListShow = "";
        this.loadingHide();
      }
    },
    loadPractice() {},
    loadClassroom() {
      this.loadingShow();
      let studentData = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      );

      let roomTotal = [];
      let studentRoom = studentData.map((x) => {
        if (x.level != 0) {
          return x.classRoom;
        }
      });

      let studentRoomObj = [];
      studentRoom = [...new Set(studentRoom)];

      studentRoom = studentRoom.filter((x) => x);

      if (studentRoom[0] == undefined) {
        this.classroomSelected = "ยังไม่ได้ระบุเลเวล";
        this.unitSelected = "ยังไม่ได้ระบุเลเวล";
        this.skillSelected = "ยังไม่ได้ระบุเลเวล";
        this.loadingHide();
        return;
      }

      this.unitOptions = [
        "กรุณาเลือกยูนิต",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
      ];

      this.skillOptions = ["Vocabulary"];

      studentRoom.forEach((element, index) => {
        console.log(element);
        let splitClass = element.split(".");

        let indexadd =
          splitClass[0] == "ป"
            ? Number(splitClass[1])
            : splitClass[0] == "ม"
            ? Number(splitClass[1]) + 6
            : null;

        let dataStudentRoom = {
          label: element,
          value: element,
          indexAdd: indexadd,
        };
        studentRoomObj.push(dataStudentRoom);
      });

      studentRoomObj.sort((a, b) => {
        return a.indexAdd - b.indexAdd;
      });

      this.classroomOptions = studentRoomObj;

      this.classroomSelected = studentRoomObj[0].value;
      this.loadLevel();
    },
    loadLevel() {
      // Load InitialLevel
      let level = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      ).filter((x) => {
        return x.classRoom == this.classroomSelected;
      });
      level = level.sort((a, b) => {
        return b.level - a.level;
      });
      let allLevel = [...new Set(level)];
      allLevel = allLevel.filter((x) => Number(x.level) > 0);
      allLevel = allLevel.map((x) => Number(x.level));
      allLevel = [...new Set(allLevel)];
      let maxLevel = Math.max(...allLevel);
      let minLevel = Math.min(...allLevel);
      level = level[0].level;
      level = level.toString();
      this.levelSelected = level;
      // Load initial Practicelist
      db.collection("practicelist")
        .where("level", ">=", minLevel.toString())
        .where("level", "<=", maxLevel.toString())
        .get()
        .then((doc) => {
          let temp = [];
          doc.forEach((element) => {
            temp.push({ ...element.data(), practiceId: element.id });
          });
          this.practiceList = temp;
          db.collection("practiceListName")
            .where("level", ">=", minLevel.toString())
            .where("level", "<=", maxLevel.toString())
            .get()
            .then((docName) => {
              let tempName = [];
              docName.forEach((element) => {
                tempName.push(element.data());
              });
              this.practiceNameList = tempName;
              this.loadingHide();
            });
        });
    },
  },
  mounted() {
    this.loadClassroom();
  },
};
</script>

<style lang="scss" scoped>
</style>