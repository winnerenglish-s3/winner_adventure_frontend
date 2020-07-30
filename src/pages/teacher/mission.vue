<template>
  <q-page
    class="bg-main row justify-center"
    :class="{ 'flex flex-center': isLoadData }"
  >
    <q-resize-observer @resize="onResize" />

    <div v-if="isLoadData">
      <q-spinner-facebook color="deep-orange-10" size="100" />
    </div>

    <!-- SECTION  vote status : finish -->
    <div
      class="row q-py-sm q-px-lg relative-position full-width"
      style="z-index:10;"
      v-if="!isLoadData"
    >
      <div class="col self-center relative-position" align="center">
        <div>
          <q-img
            src="../../statics/main/practice/score_upgrade.png"
            class="z-top"
            style="margin-top:50px;max-width:1000px;width:95%;"
          >
            <div
              class="absolute-bottom bg-transparent full-width"
              style="height:calc(100% - 37%);transform:rotate(-.5deg)"
            >
              <div class="color3 q-pl-xl q-ml-md relative-position">
                <span
                  class="text-bold absolute color10 slideDownAnimated"
                  style="font-size:4.7vw;"
                  >{{ "-" + buddyDisCount }}</span
                >
                <span class="text-bold" style="font-size:4.7vw">
                  {{ missionScore }}
                </span>
                <span class="text-bold q-ml-md" style="font-size:4.7vw"
                  >เหรียญ</span
                >
              </div>
            </div>
            <div
              class="relative-position absolute-bottom bg-transparent"
              style="height:calc(100% - 70%);transform:rotate(-.2deg)"
            >
              <div class="absolute-center full-width">
                <span
                  class="text-bold"
                  style="font-size:2.4vw;margin-left:100px;"
                >
                  {{
                    "ภารกิจปัจจุบัน : " +
                      missionData.name +
                      (missionData.name != "สมบัติ" ? " ระดับ " : " ชิ้นที่ ") +
                      missionData.level
                  }}
                </span>
              </div>
            </div>

            <div
              class="absolute-bottom bg-transparent"
              style="height:calc(100% - 55%);width:calc(100% - 90%);"
            >
              <div class="absolute-left">
                <img
                  :src="'../../statics/coins/sh' + missionData.level + '.png'"
                  style="width:258.5%;"
                  v-if="missionData.name == 'เรือ'"
                />
                <img
                  :src="'../../statics/coins/f' + missionData.level + '.png'"
                  style="width:258.5%;"
                  v-if="missionData.name == 'คู่หู'"
                />
                <img
                  :src="'../../statics/coins/t' + missionData.level + '.png'"
                  style="width:258.5%;"
                  v-if="missionData.name == 'สมบัติ'"
                />
              </div>
            </div>
          </q-img>
        </div>

        <div style="height:250px;"></div>
      </div>

      <!-- NOTE  main ship & friend & bridge : แสดง เรือ, คู่หู, สะพาน  -->
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        v-if="isActiveMain"
      >
        <div class="col-4 self-end" align="right">
          <div>
            <div align="right">
              <q-img
                style="z-index:10;width:27vw;"
                :src="'../../statics/buddy/friend' + buddyLevel + '.png'"
              />
              <div style="height:100px;"></div>
            </div>
            <q-img
              v-if="shipLevel == ''"
              src="../../statics/ship/ship0.png"
              class="absolute-bottom-right"
              style="z-index:5;width:96vw;"
            ></q-img>
            <q-img
              v-else
              :src="'../../statics/ship/ship' + shipLevel + '.png'"
              class="absolute-bottom-right"
              style="z-index:5;width:96vw;"
            ></q-img>
          </div>
        </div>
      </transition>

      <!-- NOTE  main Talking : แสดงการพูดคุย -->
      <div
        class="col-12 self-end z-top absolute-bottom"
        style="overflow:hidden;"
      >
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
            <div class="col q-px-lg q-pt-lg">
              <span
                class="q-pa-md"
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
              >
                <!-- Level 1 -->
                <span v-if="buddyLevel == '1'"
                  >ฮู้...ฮ่า...ฮ่า... แค่ร้องเพลงให้พ่อค้าฟัง เขาก็ลดราคาให้ตั้ง
                  {{ buddyDisCount }} เหรียญเลย</span
                >
                <!-- Level 2 -->
                <span v-else-if="buddyLevel == '2'"
                  >โอ๊ย...เจ้าพ่อค้าหน้าเลือด ต่อแทบตายลดราคาให้แค่
                  {{ buddyDisCount }} เหรียญเองหรือ!!!</span
                >
                <!-- Level 3 -->
                <span v-else-if="buddyLevel == '3'"
                  >เธอ... พ่อค้าใจดีมากเลยนะ เขาลดราคาให้เราตั้ง
                  {{ buddyDisCount }} เหรียญแหนะ</span
                >
                <!-- Level 4 -->
                <span v-else-if="buddyLevel == '4'"
                  >โฮ่ง โฮ่ง ... คนขายบอกข้าน่ารัก เขาเลยลดราคาให้เราตั้ง
                  {{ buddyDisCount }} เหรียญเลย โฮ่ง โฮ่ง..</span
                >
                <!-- Level 5 -->
                <span v-else-if="buddyLevel == '5'"
                  >เนี้ยเพราะชื่อเสียงของข้า แค่พ่อค้าได้ยินชื่อข้า ก็ลดราคาให้
                  {{ buddyDisCount }} เหรียญแล้ว</span
                >
                <!-- Level 6 -->
                <span v-else-if="buddyLevel == '6'"
                  >เนี้ยข้าเอาไม้เท้าข้าไปแลกส่วนลดให้เจ้ามาได้ตั้ง
                  {{ buddyDisCount }} เหรียญเลยนะ</span
                >
                <!-- Level 7 -->
                <span v-else-if="buddyLevel == '7'"
                  >อายจัง ข้าไม่เคยต่อราคาใครเลยนะ แต่พ่อค้าเขาให้ส่วนลดมา
                  {{ buddyDisCount }} เหรียญนะ</span
                >
                <!-- Level 8 -->
                <span v-else-if="buddyLevel == '8'"
                  >ด้วยพลังไฟแห่งมังกรของข้า ราคาภารกิจจงลดลง
                  {{ buddyDisCount }} เหรียญ</span
                >
                <!-- Level 9 -->
                <span v-else-if="buddyLevel == '9'"
                  >ข้าไม่ได้โกงพ่อค้าหน้าเลือดคนนั้นนะ แต่เขาลดราคาให้ข้าเอง
                  {{ buddyDisCount }} เหรียญ</span
                >
                <!-- Level 10 -->
                <span v-else-if="buddyLevel == '10'"
                  >ข้าสั่งให้ลดราคา {{ buddyDisCount }} เหรียญ เข้าใจไหม</span
                >
              </span>
            </div>
            <div align="right" class="q-px-lg q-py-lg self-end">
              <q-btn
                icon="fas fa-star"
                label="เข้าสู่เนื้อหา"
                class="bg6 color3 q-pa-xs shadow-5"
                @click="goToLearn()"
              ></q-btn>
            </div>
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
      missionData: {},
      buddyLevel: "",
      shipLevel: "",
      buddyDisCount: 0,
      missionScore: 0,
      isActiveMain: true,
      isActiveMainTalk: true,

      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง

      setCount: "",

      isLoadData: true,
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),

      totalStudent: this.decrypt(
        this.$q.localStorage.getItem("totalStudent"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2)
    };
  },
  methods: {
    async goToLearn() {
      let dateAndTime = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({ currentPage: "studyplan", date: dateAndTime })
        .then(() => {
          this.loadingHide();
          this.$router.push("/teacher/studyplan");
        });
    },
    async getCurrentMission() {
      console.clear();
      let allMission = this.decrypt(
        this.$q.localStorage.getItem("allMission"),
        1
      );

      let classroomMission = await db
        .collection("classroomMission")
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get();

      let classroomMissionArr = [];

      classroomMission.forEach(element => {
        classroomMissionArr.push(element.data());
      });

      let currentMission = classroomMissionArr.filter(e => {
        return e.status == "current";
      })[0];

      let finishMission = classroomMissionArr.filter(e => {
        return e.status == "finish";
      });
      // console.log(finishMission);

      let mapFinishMission = finishMission.map(e => e.currentMissionKey);

      let mergeCurrentMission = allMission.filter(x => {
        return x.key === currentMission.currentMissionKey;
      });

      mergeCurrentMission.sort((a, b) => {
        return Number(a.level) - Number(b.level);
      });

      let mergeFinishMission = allMission.filter(x => {
        return mapFinishMission.includes(x.key) && x.name == "คู่หู";
      });

      mergeFinishMission.sort((a, b) => {
        return Number(a.level) - Number(b.level);
      });

      let mergeFinishShip = allMission.filter(x => {
        return mapFinishMission.includes(x.key) && x.name == "เรือ";
      });

      console.log(mergeFinishShip);

      mergeFinishShip.sort((a, b) => {
        return Number(a.level) - Number(b.level);
      });

      if (mergeFinishShip.length) {
        this.shipLevel = mergeFinishShip[mergeFinishShip.length - 1].level;
      }

      this.missionData = mergeCurrentMission[mergeCurrentMission.length - 1];

      this.missionScore =
        mergeCurrentMission[mergeCurrentMission.length - 1].goal *
        this.totalStudent;

      this.buddyDisCount =
        mergeFinishMission[mergeFinishMission.length - 1].status *
        this.totalStudent;

      this.buddyLevel = mergeFinishMission[mergeFinishMission.length - 1].level;

      setTimeout(() => {
        if (currentMission) {
          let discount = Number(this.buddyDisCount);
          let goal = Number(this.missionScore);
          let summary = goal - discount;
          this.setCount = setInterval(() => {
            this.missionScore -= 1;
            if (this.missionScore == summary) {
              clearInterval(this.setCount);
            }
          }, 0);
        }
      }, 3000);

      this.isLoadData = false;

      // mergeCurrentMission.buddySkill = mergeCurrentMission.status;

      // mergeCurrentMission = { ...mergeCurrentMission, ...currentMission };

      // this.missionData = {};
      // this.missionData.name = mergeCurrentMission.name;
      // this.missionData.level = mergeCurrentMission.level;

      // หา buddy ที่มีอยู่
      // let allBuddy = allMission.filter(x => {
      //   return x.name == "คู่หู";
      // });

      // allBuddy.sort((a, b) => {
      //   return Number(a.level) - Number(b.level);
      // });

      // console.log(allBuddy);

      // let currentBuddy;
      // if (allBuddy) {
      //   currentBuddy = allBuddy[allBuddy.length - 1];
      // } else {
      //   currentBuddy = null;
      // }
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  mounted() {
    // this.testArr();
    this.getCurrentMission();
  },
  beforeDestroy() {
    clearInterval(this.setCount);
  }
};
</script>

<style lang="scss" scoped>
.slideDownAnimated {
  animation-name: slideDown;
  animation-delay: 2s;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  top: 0%;
  left: 30%;
  transform: translate(-7%, -60%);
  -webkit-transform: translate(-7%, -60%);
  opacity: 0;
}

@keyframes slideDown {
  0% {
    top: 0%;
    left: 30%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 0;
  }

  10% {
    top: 0%;
    left: 30%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 0.5;
  }

  40% {
    top: 0%;
    left: 30%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 1;
  }

  50% {
    top: 0%;
    left: 30%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 1;
  }
  90% {
    top: 0%;
    left: 30%;
    transform: translate(-7%, -0%);
    -webkit-transform: translate(-7%, -0%);
    opacity: 1;
  }

  99% {
    opacity: 0.5;
  }

  100% {
    top: 0%;
    left: 30%;
    transform: translate(-7%, -0%);
    -webkit-transform: translate(-7%, -0%);
    opacity: 0;
  }
}
</style>
