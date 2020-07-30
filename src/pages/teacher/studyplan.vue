<template>
  <q-page class="bg-main">
    <q-resize-observer @resize="onResize" />
    <div style="max-width:1400px;width:95%;margin:auto;" class="q-pa-md">
      <div class="row q-mt-lg" style="height:120px;">
        <div class="col self-end">
          <!-- SECTION  Mode : เลือกเนื้อหาเอง -->
          <q-btn
            push
            style="width:230px;"
            class="bg3 br-a-sm color6 text-h5 border3-sm"
            :disable="isDisable"
            v-if="isActiveMode3"
            @click="backPlan()"
          >
            <div class="row fit">
              <div class="col-2 self-center">
                <q-icon name="fas fa-chevron-left" size="35px"></q-icon>
              </div>
              <div align="center" class="col self-center">
                <span>เลือกทักษะ</span>
              </div>
            </div>
          </q-btn>
        </div>

        <div class="col-12 self-end" align="right">
          <!-- SECTION  Mode : เลือกเนื้อหาเอง -->
          <q-btn
            @click="chooseStudyType()"
            push
            style="width:230px;"
            class="bg3 br-a-sm color6 text-h5 border3-sm"
            v-show="mode == 1"
            :disable="isDisable"
          >
            <div class="row fit">
              <div class="col-2 self-center">
                <q-icon name="fas fa-atlas" size="35px"></q-icon>
              </div>
              <div align="right" class="col self-center">
                <span>เลือกบทเรียน</span>
              </div>
            </div>
          </q-btn>

          <!-- SECTION  Mode : เรียนตามปกติ -->
          <q-btn
            @click="chooseStudyType()"
            push
            style="width:260px;"
            class="bg9 br-a-sm color3 text-h5 border6-sm"
            v-if="mode == 2"
            :disable="isDisable"
          >
            <div class="row fit">
              <div class="col self-center">
                <q-icon name="fas fa-compass" size="35px"></q-icon>
              </div>
              <div align="right" class="col-10 self-center">
                <span>เรียนตามหลักสูตร</span>
              </div>
            </div>
          </q-btn>
        </div>
      </div>
    </div>

    <div class="row q-pa-md" style="max-width:1400px;width:95%;margin:auto;">
      <!-- SECTION  Mode : เรียนตามปกติ -->
      <transition
        appear
        enter-active-class="animated zoomIn duration-mode1-in"
        leave-active-class="animated zoomOut"
        v-if="isActiveMode1"
      >
        <div class="col-12 row">
          <div class="col-4" align="center">
            <div>
              <q-img
                style="max-width:350px;width:85%;"
                v-if="currentMission.name == 'เรือ'"
                :src="'../../statics/coins/sh' + currentMission.level + '.png'"
              ></q-img>
              <q-img
                style="max-width:350px;width:85%;"
                v-if="currentMission.name == 'คู่หู'"
                :src="'../../statics/coins/f' + currentMission.level + '.png'"
              ></q-img>
              <q-img
                style="max-width:350px;width:85%;"
                v-if="currentMission.name == 'สมบัติ'"
                :src="'../../statics/coins/t' + currentMission.level + '.png'"
              ></q-img>
            </div>
            <div class="bg5 q-mt-lg q-pa-sm br-a-sm" style="max-width:300px;width:85%;">
              <div v-if="isShowMission" class="br-a-sm border-dashed q-py-sm color3">
                <div style="font-size:calc(16px + 1vw)">
                  <span>ภารกิจปัจจุบัน</span>
                </div>
                <div class="q-mt-xs" style="font-size:calc(16px + .6vw);">
                  <div>
                    <span>
                      {{
                      currentMission.name +
                      (currentMission.name != "สมบัติ"
                      ? " ระดับ "
                      : " ชิ้นที่") +
                      currentMission.level
                      }}
                    </span>
                  </div>
                  <div>
                    <span>
                      <!-- NOTE ต้องถามว่า จะให้ลดก่อนคูณ หรือ คูณก่อนลด -->
                      {{
                      currentMission.goal * totalStudent -
                      currentMission.discount +
                      " เหรียญ"
                      }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="br-a-sm border-dashed color3 q-pa-md">
                <q-spinner-hourglass color="deep-orange-10" size="50" />
              </div>
            </div>
          </div>
          <div class="col q-pt-lg relative-position" align="center">
            <q-img src="../../statics/main/label.png" style="max-width:900px;width:100%;">
              <div
                class="absolute-top bg-transparent"
                style="top:calc(100% - 90%);height:calc(100% - 60%)"
                align="center"
              >
                <span
                  class="color3 text-bold relative-position"
                  style="font-size:5vw;font-style:italic;"
                >
                  {{
                  "ระดับ " +
                  currentPractice.level +
                  " บทที่ " +
                  currentPractice.unit
                  }}
                </span>
              </div>
              <div class="absolute-bottom bg-transparent" style="height:calc(100% - 66%)">
                <span v-if="isLoadType" style="font-size:4.5vw;">
                  {{
                  showSkillName(currentPractice.skill)
                  }}
                </span>
              </div>
            </q-img>
            <div class="q-mt-xl">
              <q-btn
                push
                dense
                label="เริ่มภารกิจ"
                @click="startAdventure()"
                class="bg6 color3 br-a-md q-px-xl"
                :class="{
                  'text-h4': innerWidth < 1280,
                  'text-h3': innerWidth > 1279
                }"
              ></q-btn>
            </div>
          </div>
        </div>
      </transition>
      <!-- SECTION  Mode : เลือกเนื้อหาเอง -->
      <transition
        appear
        enter-active-class="animated zoomIn duration-mode1-in"
        leave-active-class="animated zoomOut"
        v-if="isActiveMode2"
      >
        <div class="col-12 row">
          <div
            class="col-4 q-mb-lg"
            :class="[
              index == 0 || index == 3 ? 'text-left q-pr-sm' : null,
              index == 1 || index == 4 ? 'text-center' : null,
              index == 2 || index == 5 ? 'text-right q-pl-sm' : null
            ]"
            v-for="(item, index) in plan"
            :key="index"
          >
            <q-btn
              push
              class="bg3 q-py-lg br-a-xl border3-sm"
              style="max-width:270px;width:100%;"
              @click="selectPlan(item)"
            >
              <div class="full-width">
                <img
                  :src="'../../statics/' + item.img.toLowerCase() + '.png'"
                  style="max-width:170px;width:100%;"
                />
              </div>
              <div class="q-mt-md full-width">
                <span class="text-h5 color1">{{ item.name }}</span>
              </div>
            </q-btn>
          </div>
        </div>
      </transition>

      <!-- SECTION  Mode : เลือกเนื้อหาเอง / เนื้อหาภายใน -->
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        v-if="isActiveMode3"
      >
        <div class="col-12">
          <div class="bg5 br-a-md q-pa-sm shadow-3">
            <div class="border-dashed br-a-md q-pa-md">
              <div
                class="content-scroll q-pr-md br-a-xs"
                :class="{ 'row justify-center items-center': !isLoadData }"
              >
                <div v-if="!isLoadData">
                  <q-spinner-hourglass color="deep-orange-10" size="100" />
                </div>
                <div v-if="isLoadData">
                  <div v-for="(item, index) in listUnit" :key="index">
                    <!-- โชว์ไว้แค่ 8 unit -->
                    <q-expansion-item
                      :default-opened="index == 0"
                      group="practice"
                      class="bg3"
                      expand-icon-class="color1"
                      @click="
                        selectPractice(item),
                          selectList == index + 1
                            ? (selectList = 0)
                            : (selectList = index + 1)
                      "
                    >
                      <template v-slot:header>
                        <q-item-section avatar class="q-py-sm">
                          <q-icon
                            name="fas fa-circle "
                            size="30px"
                            :class="{
                              color1: selectList != index + 1,
                              color6: selectList == index + 1
                            }"
                          ></q-icon>
                        </q-item-section>
                        <q-item-section class="color1 text-h6">
                          {{
                          "บทที่ " +
                          (index + 1) +
                          " : " +
                          practiceShowName[index].name.replace(/:/g, " ")
                          }}
                        </q-item-section>
                      </template>

                      <q-list
                        separator
                        class="bg1"
                        style="border-bottom:1px solid #f1f1f1"
                        v-for="(i, index2) in practiceShow"
                        :key="index2"
                      >
                        <q-item clickable v-ripple @click="goToLearn(i, index2)">
                          <q-item-section avatar class="q-px-md">
                            <div style="width:50px;">
                              <!-- กรณีแบบฝึกหัดยังไม่ถูกทำ จะ ขึ้นตัวเลข -->
                              <span
                                v-if="
                                  !totalPassedPractice.includes(i.practicekey)
                                "
                                class="text-h3 text-bold text-shadow color3"
                              >
                                <span v-if="i.practicetype.includes('review')">
                                  <q-icon size="32px" name="fas fa-book-reader"></q-icon>
                                </span>
                                <span
                                  v-else-if="
                                    practiceShow.findIndex(x =>
                                      x.practicetype.includes('review')
                                    ) >= 0
                                  "
                                >{{ index2 }}</span>
                                <span v-else>{{ index2 + 1 }}</span>
                              </span>
                              <span v-else>
                                <!-- กรณีแบบฝึกหัดถูกทำแล้ว -->
                                <q-icon name="fas fa-check" size="35px" class="color10"></q-icon>
                              </span>
                            </div>
                          </q-item-section>
                          <q-item-section>
                            <span class="text-h6">
                              {{
                              convertPracticeName(
                              decrypt(
                              $q.localStorage.getItem("practiceType"),
                              1
                              ).filter(x => {
                              return x.key == i.practicetype;
                              })[0].key,
                              i.skill
                              )
                              }}
                            </span>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-expansion-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <app-dialog
      :isShow="isShowDialog"
      :header="dialogHeader"
      :content="dialogContent"
      @confirmDialog="confirmDialog"
      :cancle="dialogCancle"
    ></app-dialog>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
import appDialog from "../../components/dialog.vue";
export default {
  components: {
    appDialog
  },
  data() {
    return {
      dialogCancle: false,
      dialogContent: "กรุณาเข้าเรียน Flashcard ก่อน",
      dialogHeader: "เลือกบทเรียน",
      isShowDialog: false,
      currentMissionScore: 500,
      isLoadType: false,
      mode: this.$q.localStorage.has("studyPlanChooseMode")
        ? this.$q.localStorage.getItem("studyPlanChooseMode") == "auto"
          ? 1
          : 2
        : 1,
      plan: [
        {
          name: "คำศัพท์",
          type: "Vocabulary",
          img: "Vocabulary"
        },
        {
          name: "ไวยากรณ์",
          type: "Grammar",
          img: "Grammar"
        },
        {
          name: "การอ่าน",
          type: "Reading",
          img: "Reading"
        },
        {
          name: "การเขียน",
          type: "Writing",
          img: "Writing"
        },
        {
          name: "การออกเสียง",
          type: "Phonics",
          img: "Speaking"
        },
        {
          name: "การพูดและฟัง",
          type: "Listening & Speaking",
          img: "Listening"
        }
      ],

      planData: {
        level: "1",
        unit: "16",
        name: "",
        type: "",
        typeOld: ""
      },

      practiceList: [],
      practiceShow: [],
      practiceNameList: [],
      practiceShowName: [],

      listUnit: [],

      selectList: 0,

      isActiveMode1: this.$q.localStorage.has("studyPlanChooseMode")
        ? this.$q.localStorage.getItem("studyPlanChooseMode") == "auto"
          ? true
          : false
        : true,
      isActiveMode2: this.$q.localStorage.has("studyPlanChooseMode")
        ? this.$q.localStorage.getItem("studyPlanChooseMode") == "auto"
          ? false
          : true
        : false,
      isActiveMode3: false,

      isDisable: false,
      isLoadData: false,
      isShowMission: false,

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      currentLevel: this.decrypt(
        this.$q.localStorage.getItem("currentLevel"),
        2
      ),
      currentMission: "",
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      currentPractice: {
        level: "",
        unit: ""
      },
      practiceType: this.decrypt(
        this.$q.localStorage.getItem("practiceType"),
        1
      ),
      totalPassedPractice: [],
      practiceFiltered: "",
      passedPractice: "",

      totalStudent: Number(
        this.decrypt(this.$q.localStorage.getItem("totalStudent"), 2)
      )
    };
  },
  methods: {
    confirmDialog(val) {
      this.isShowDialog = val;
    },

    async startAdventure() {
      console.clear();
      let date = await this.getDateAndTime();
      // แบบฝึกหัดที่ทำไปแล้วทั้งหมดของภายใน Level ปัจจุบัน
      let passedPractice = this.$q.localStorage.getItem("totalPassedPractice");
      let copyPracticeFiltered = this.practiceFiltered.slice();
      let nextPractice = this.currentPractice;

      // ปุ่มเริ่มเดินทาง

      let totalPractice;
      let numberOfPractice;
      totalPractice = this.practiceListData.filter(x => {
        return (
          x.unit == nextPractice.unit &&
          x.skill == nextPractice.skill &&
          !x.practicetype.includes("review")
        );
      });
      numberOfPractice = totalPractice.length;

      this.$q.localStorage.set("totalPractice", numberOfPractice);

      let filter = `${this.currentClass}-${this.currentRoom}-${this.currentTerm}-${this.currentYear}`;
      // NOTE โหลดค่าแบบฝึกหัดที่ทำไปแล้ว
      let classroomPracticeLog = await db
        .collection("classroomPracticeLog")
        .where("filter", "==", filter)
        .where("level", "==", nextPractice.level)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get();

      let classroomPracticeLogData = [];
      classroomPracticeLog.forEach(element => {
        classroomPracticeLogData.push(element.data());
      });

      let classroomPracticeLogKey = classroomPracticeLogData.map(
        x => x.practiceKey
      );
      let notPassedPractice = this.practiceListData.filter(
        x => !classroomPracticeLogKey.includes(x.practiceKey)
      );

      let indexOfPractice =
        totalPractice
          .map(x => x.practiceKey)
          .indexOf(nextPractice.practiceKey) + 1;

      this.$q.localStorage.set("positionOfPractice", indexOfPractice);
      nextPractice.practiceType = nextPractice.practicetype;
      this.$q.localStorage.set("currentPractice", nextPractice);

      let practiceName = await db
        .collection("practiceListName")
        .where("level", "==", nextPractice.level)
        .where("unit", "==", nextPractice.unit)
        .get();

      this.$q.localStorage.set("practiceListName", practiceName.docs[0].data());

      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "practice",
          practiceKey: nextPractice.practiceKey,
          date: date,
          practicetype: nextPractice.practicetype,
          skill: nextPractice.skill,
          order: nextPractice.order,
          practiceName: practiceName.docs[0].data().name
        })
        .then(() => {
          this.$router.push("/teacher/practice/");
        });
    },
    async loadCurrentPractice() {
      let filter =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      // NOTE โหลดค่าแบบฝึกหัดที่ทำไปแล้ว
      let classroomPracticeLog = await db
        .collection("classroomPracticeLog")
        .where("filter", "==", filter)
        .where("level", "==", this.currentLevel)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get();

      // NOTE จำนวนแบบฝึกหัดที่ทำไปแล้วทั้งหมดของ Level / Unit / Skill ปัจจุบัน
      let classroomPracticeLogData = [];
      classroomPracticeLog.forEach(element => {
        classroomPracticeLogData.push(element.data());
      });

      this.$q.localStorage.set("totalPassedPractice", classroomPracticeLogData);
      this.passedPractice = classroomPracticeLogData;

      let classroomPracticeLogDataMap = classroomPracticeLogData.map(e => {
        return e.practiceKey;
      });

      this.totalPassedPractice = classroomPracticeLogDataMap;

      let filterPractice = this.practiceListData.filter(x => {
        return !classroomPracticeLogDataMap.includes(x.practiceKey);
      });

      // NOTE แบบฝึกหัดที่ยังไม่ได้ทำ
      this.practiceFiltered = filterPractice;

      let nextPractice = filterPractice[0];

      if (nextPractice.practicetype.includes("review")) {
        // NOTE กรณี แบบฝึกหัดถัดไปเป็น Review
        if (nextPractice.skill == "Vocabulary") {
          // NOTE กรณีเป็น review vocab

          let isPassedFlashcardLesson = classroomPracticeLogData.filter(
            x => x.practiceType == "flashcard" && x.unit != nextPractice.unit
          ).length;

          if (!isPassedFlashcardLesson) {
            // NOTE กรณีไม่เคยผ่าน Flashcard มาก่อน ให้ไปเอาแบบฝึกหัดถัดไป
            nextPractice = filterPractice.filter(
              x => !x.practicetype.includes("review")
            )[0];

            // if (nextPractice.practicetype.includes("review")) {
            //   let isPassedGrammarLesson = classroomPracticeLogData.filter(
            //     x =>
            //       x.practiceType == "grammarlesson" &&
            //       x.unit != nextPractice.unit
            //   ).length;

            //   if (!isPassedGrammarLesson) {
            //     // NOTE กรณีแบบฝึกหัดถัดไปเป็น Review Grammar แต่ยังไม่เคยทำ Grammar Lesson เลย
            //     nextPractice = filterPractice.filter(
            //       x => !x.practicetype.includes("review")
            //     )[0];
            //   }
            // }
          }
        } else {
          // NOTE กรณีเป็น review grammar

          // NOTE เช็คว่าเคยผ่าน Grammar หรือยัง

          let isPassedGrammarLesson = classroomPracticeLogData.filter(
            x =>
              x.practiceType == "grammarlesson" && x.unit != nextPractice.unit
          ).length;

          // console.log(nextPractice);
          if (!isPassedGrammarLesson) {
            // NOTE กรณีแบบฝึกหัดถัดไปเป็น Review Grammar แต่ยังไม่เคยทำ Grammar Lesson เลย
            nextPractice = filterPractice.filter(
              x => !x.practicetype.includes("review")
            )[0];
          }
        }
      }

      let currentWorldEncrypt = this.encrypt(nextPractice.skill, 2);
      let currentUnitEncrypt = this.encrypt(nextPractice.unit, 2);
      this.$q.localStorage.set("currentWorld", currentWorldEncrypt);
      this.$q.localStorage.set("currentUnit", currentUnitEncrypt);

      this.currentPractice = nextPractice;

      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          nextPractice: nextPractice,
          practicetype: nextPractice.practicetype
        })
        .then(() => {
          this.isLoadType = true;
        });
    },
    async goToLearn(data, index) {
      // ฟังก์ชัน เข้าสู่เนื้อหา กรณีเลือกเนื้อหาเอง
      console.clear();
      // TODO กรณี ตรวจพบว่า ต้องทำ Review ต้องบังคับเข้า Review ไม่ว่าจะเข้าแบบฝึกหัดใดก็ตาม

      this.loadingShow();

      let practiceName = await db
        .collection("practiceListName")
        .where("level", "==", data.level)
        .where("unit", "==", data.unit)
        .where("skill", "==", data.skill)
        .get();

      this.$q.localStorage.set("practiceListName", practiceName.docs[0].data());

      let currentWorldEncrypt = this.encrypt(data.skill, 2);
      let currentUnitEncrypt = this.encrypt(data.unit, 2);

      this.$q.localStorage.set("currentWorld", currentWorldEncrypt);
      this.$q.localStorage.set("currentUnit", currentUnitEncrypt);

      if (data.skill == "Vocabulary") {
        // NOTE
        // NOTE ต้องเช็คว่า เคยทำ Flashcard แล้วหรือยัง และทำ Review แล้วหรือยัง ถ้ายังไม่ทำ review และ บังคับ review
        let res = this.passedPractice.filter(x => {
          return x.practiceType == "flashcard" && x.skill == "Vocabulary";
        });

        let currentReviewKey = this.practiceShow.filter(
          x => x.practicetype == "review vocab"
        );

        if (currentReviewKey.length) {
          currentReviewKey = currentReviewKey[0].practicekey;
        }

        // console.log(res.length, currentReivewKey);
        if (res.length && currentReviewKey.length) {
          // กรณีผ่าน Flashcard แล้ว
          // NOTE เช็คว่าทำ Review ไปหรือยัง
          if (!this.totalPassedPractice.includes(currentReviewKey)) {
            // console.log("มี review ยังไม่ทำ");
            console.log("บังคับ review vocab");

            // บังคับไปทำ Review
            // console.log("บังคับทำ Review");
            let reviewPractice = this.practiceShow.filter(
              x => x.practicetype == "review vocab"
            )[0];

            this.loadingShow();
            let date = await this.getDateAndTime();
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                level: reviewPractice.level,
                unit: reviewPractice.unit,
                practiceKey: reviewPractice.practicekey,
                practicetype: reviewPractice.practicetype,
                skill: reviewPractice.skill,
                currentPage: "practice",
                date: date,
                order: reviewPractice.order
                // practiceName: practiceName.docs[0].data().name
              })
              .then(() => {
                this.loadingHide();
                this.$q.localStorage.set(
                  "totalPractice",
                  this.practiceShow.length
                );
                let newData = { ...reviewPractice };
                delete newData.practicekey;
                newData.practiceKey = reviewPractice.practicekey;
                newData.practiceType = newData.practicetype;
                this.$q.localStorage.set("currentPractice", newData);
                this.teacherPracticeRouter(newData.practicetype, 1);
              });

            return;
          }
        }

        if (
          data.practicetype == "spelling bee" ||
          data.practicetype == "multiplechoices"
        ) {
          // กรณีเป็น spelling bee / multiple vocab แล้วยังไม่ผ่าน Flashcard ต้องขึ้นเเจ้งเตือนว่าต้องทำ Flashcard ก่อน
          // ถ้าเจอ Flashcard ใน practiceFiltered แปลว่ายังไม่ผ่าน Flashcard
          let filt = this.practiceFiltered.filter(x => {
            return x.unit == this.selectList.toString();
          });

          //  หาว่ามี Flashcard อยู่ในแบบฝึกหัดที่ยังไม่เคยทำหรือไม่
          let findFlashcard = filt.find(e => e.practicetype == "flashcard");
          if (findFlashcard) {
            //  กรณีพบว่ายังมีแบบฝึกหัด Flashcard ที่ยังไม่ทำ ขึ้นเเจ้งเตือนว่าต้องทำ Flashcard ก่อน
            this.isShowDialog = true;
            this.dialogContent = "กรุณาเข้าเรียน Flashcard ก่อน";
            this.dialogHeader = "เลือกบทเรียน";
            this.dialogCancle = false;
            this.loadingHide();
            return;
          }
        }
      } else if (data.skill == "Grammar") {
        let res = this.passedPractice.filter(x => {
          return x.practiceType == "grammarlesson";
        });

        let currentReviewKey = this.practiceShow.filter(
          x => x.practicetype == "review grammar"
        );

        if (currentReviewKey.length) {
          currentReviewKey = currentReviewKey[0].practicekey;
        }

        if (res.length && currentReviewKey.length) {
          // NOTE กรณีมี review grammar ปรากฎ บังคับทำ review grammar
          if (!this.totalPassedPractice.includes(currentReviewKey)) {
            let reviewPractice = this.practiceShow.filter(
              x => x.practicetype == "review grammar"
            )[0];

            this.loadingShow();
            let date = await this.getDateAndTime();
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                level: reviewPractice.level,
                unit: reviewPractice.unit,
                practiceKey: reviewPractice.practicekey,
                practicetype: reviewPractice.practicetype,
                skill: reviewPractice.skill,
                currentPage: "practice",
                date: date,
                order: reviewPractice.order
              })
              .then(() => {
                this.loadingHide();
                this.$q.localStorage.set(
                  "totalPractice",
                  this.practiceShow.length
                );
                this.$q.localStorage.set("positionOfPractice", index + 1);
                let newData = { ...reviewPractice };
                delete newData.practicekey;
                newData.practiceKey = reviewPractice.practicekey;
                newData.practiceType = newData.practicetype;
                this.$q.localStorage.set("currentPractice", newData);
                this.teacherPracticeRouter(newData.practicetype, 1);
              });

            return;
          }
        }

        // GRAMMAR CASE
        if (data.practicetype == "grammaraction") {
          let practiceKeyBefore = this.practiceShow[index - 1].practicekey;
          let isPassedLesson = this.totalPassedPractice.includes(
            practiceKeyBefore
          );
          if (!isPassedLesson) {
            // กรณียังไม่ผ่าน Grammar Lesson
            console.log("ยังไม่ผ่าน");
            this.isShowDialog = true;
            this.dialogContent = "กรุณาเข้าเรียน Grammar Lesson ก่อน";
            this.dialogHeader = "เลือกบทเรียน";
            this.dialogCancle = false;
            this.loadingHide();
            return;
          }
          // ต้องเช็คว่าทำแบบฝึกหัดก่อนหน้าแล้วหรือยัง
        } else if (
          data.practicetype == "multiplechoices" ||
          data.practicetype == "fillintheblank"
        ) {
          let allGrammarLessonInUnit = this.practiceShow
            .filter(x => {
              return x.practicetype == "grammarlesson";
            })
            .map(e => {
              return e.practicekey;
            });

          let checkPassedLesson = allGrammarLessonInUnit.every(a =>
            this.totalPassedPractice.includes(a)
          );
          if (!checkPassedLesson) {
            // กรณีทำ Grammar Lesson ยังไม่ครบ
            console.log("ทำ Grammar Lesson ไม่ครบ");
            this.isShowDialog = true;
            this.dialogContent = "กรุณาเข้าเรียน Grammar Lesson ให้ครบก่อน";
            this.dialogHeader = "เลือกบทเรียน";
            this.dialogCancle = false;
            this.loadingHide();
            return;
          }
        }
      } else if (data.skill == "Phonics") {
        // PHONICS CASE
        // ต้องเช็คว่า ทำ Phonic lesson ไปแล้วหรือยัง
        if (data.practicetype != "phonicslesson") {
          let phonicsLesson = this.practiceShow.filter(
            x => x.practicetype == "phonicslesson"
          )[0];
          let phonicsLessonKey = phonicsLesson.practicekey;

          if (!this.totalPassedPractice.includes(phonicsLessonKey)) {
            this.isShowDialog = true;
            this.dialogContent = "กรุณาเข้าเรียน สอนออกเสียงก่อน";
            this.dialogHeader = "เลือกบทเรียน";
            this.dialogCancle = false;
            this.loadingHide();

            return;
          }
        }
      }

      console.log(data);

      // กรณีแบบฝึกหัดทั่วไปที่ไม่มี Requirement หรือ ผ่านการเช็คเคสข้างบนมาแล้ว
      if (
        !this.totalPassedPractice.includes(data.practicekey) ||
        data.practicetype == "flashcard" ||
        data.practicetype == "grammarlesson" ||
        data.practicetype == "phonicslesson" ||
        data.practicetype == "languagetips" ||
        data.practicetype == "readingspeaking" ||
        data.practicetype == "speaking"
      ) {
        this.loadingShow();
        let date = await this.getDateAndTime();
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({
            level: data.level,
            unit: data.unit,
            practiceKey: data.practicekey,
            practicetype: data.practicetype,
            skill: data.skill,
            currentPage: "practice",
            date: date,
            order: data.order,
            practiceName: practiceName.docs[0].data().name
          })
          .then(() => {
            this.loadingHide();

            let currentShow = this.practiceShow.filter(x =>
              x.practicetype.includes("review")
            );

            if (
              (data.skill == "Vocabulary" || data.skill == "Grammar") &&
              currentShow.length
            ) {
              this.$q.localStorage.set(
                "totalPractice",
                this.practiceShow.length - 1
              );
              this.$q.localStorage.set("positionOfPractice", index);
            } else {
              this.$q.localStorage.set(
                "totalPractice",
                this.practiceShow.length
              );
              this.$q.localStorage.set("positionOfPractice", index + 1);
            }

            let newData = { ...data };
            delete newData.practicekey;
            newData.practiceKey = data.practicekey;
            newData.practiceType = newData.practicetype;
            this.$q.localStorage.set("currentPractice", newData);
            this.teacherPracticeRouter(newData.practicetype, 1);
          });
      } else {
        console.log("แบบฝึกหัดได้ถูกทำไปแล้ว");
        this.isShowDialog = true;
        this.dialogContent = "แบบฝึกหัดนี้ได้เรียนไปแล้ว";
        this.dialogHeader = "แจ้งเตือน";
        this.dialogCancle = false;
        this.loadingHide();
      }
    },
    chooseStudyType() {
      this.loadingShow();
      if (this.mode == 1) {
        this.isDisable = true;
        this.isActiveMode1 = false;
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({
            studyplanType: "advanced"
          })
          .then(() => {
            this.loadingHide();
            setTimeout(() => {
              this.isDisable = false;
              this.mode = 2;
              this.$q.localStorage.set("studyPlanChooseMode", "advanced");
              this.isActiveMode2 = true;
            }, 500);
          });
      } else {
        this.planData.typeOld = this.planData.type;
        this.isDisable = true;
        this.isActiveMode2 = false;
        this.isActiveMode3 = false;

        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({
            studyplanType: "auto"
          })
          .then(() => {
            this.loadingHide();
            setTimeout(() => {
              this.isDisable = false;
              this.mode = 1;
              this.$q.localStorage.set("studyPlanChooseMode", "auto");
              this.isActiveMode1 = true;
            }, 500);
          });
      }
    },
    backPlan() {
      this.isActiveMode3 = false;
      this.planData.typeOld = this.planData.type;
      this.selectList = 0;

      setTimeout(() => {
        this.isActiveMode2 = true;
      }, 1000);
    },
    selectPlan(data) {
      this.practiceShowName = this.practiceNameList.filter(
        x => x.skill == data.type
      );

      this.isActiveMode2 = false;
      this.selectList = 1;
      setTimeout(() => {
        this.planData.name = data.name;
        this.planData.type = data.type;
        this.isActiveMode3 = true;
        this.practiceData();
      }, 1000);
    },
    selectPractice(unit) {
      unit = unit.toString();
      this.practiceShow = this.practiceList.filter(x => {
        return x.unit == unit;
      });

      let passedPractice = this.$q.localStorage.getItem("totalPassedPractice");

      if (this.planData.type == "Vocabulary") {
        // เช็คการแสดงผล Review
        // กรณีเป็น skill Vocab
        let res = passedPractice.filter(x => {
          return (
            x.practiceType == "flashcard" &&
            x.skill == "Vocabulary" &&
            x.unit != unit
          );
        });

        // TODO เช็คว่า ถ้าเป็น Vocabulary แล้วมี Review ต้องเช็คว่า เคยทำ multiple choices ของ vocab แล้วหรือไม่ ถ้ายังไม่เคยทำ multiple choices ของ vocab ให้ ตัด review ออก

        if (res.length == 0) {
          // กรณียังไม่เคยมีการทำ multiple choice ของ vocab เลย
          this.practiceShow = this.practiceShow.filter(
            x => x.practicetype != "review vocab"
          );
        }
      } else if (this.planData.type == "Grammar") {
        // เช็คการแสดงผล Review Grammar
        // จะขึ้นแสดงผลต่อเมื่อ มีการทำ Grammar Lesson ใดๆแล้ว
        let res = passedPractice.filter(
          x => x.practiceType == "grammarlesson" && x.unit != unit
        );

        if (res.length == 0) {
          // กรณียังไม่เคยทำ Grammar Lesson

          this.practiceShow = this.practiceShow.filter(
            x => x.practicetype != "review grammar"
          );
        }
      }

      this.practiceShow.sort((a, b) => {
        return a.order - b.order;
      });
    },
    async practiceData() {
      this.isLoadData = false;
      // ดึงเลเวลของห้องเรียน
      let level = this.$q.localStorage.getItem("currentLevel");

      level = this.decrypt(level, 2);

      db.collection("practicelist")
        .where("level", "==", level)
        .where("skill", "==", this.planData.type)
        .get()
        .then(practiceData => {
          let dataArr = [];
          practiceData.forEach(data => {
            dataArr.push({ practicekey: data.id, ...data.data() });
          });

          this.practiceList = dataArr;

          this.listUnit = dataArr.map(x => {
            return x.unit;
          });

          this.listUnit = [...new Set(this.listUnit)];
          this.listUnit.sort((a, b) => {
            return Number(a) - Number(b);
          });
          this.selectPractice(1);
          this.isLoadData = true;
        });
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    },
    async loadCurrentMission() {
      this.loadingShow();

      let allMission = this.decrypt(
        this.$q.localStorage.getItem("allMission"),
        1
      );
      let totalStudent = this.decrypt(
        this.$q.localStorage.getItem("totalStudent"),
        2
      );

      let level = this.decrypt(this.$q.localStorage.getItem("currentLevel"), 2);
      let unit = this.decrypt(this.$q.localStorage.getItem("currentUnit"), 2);

      let temp = [];

      let practiceName = await db
        .collection("practiceListName")
        .where("level", "==", level)
        .get();

      practiceName.forEach(result => {
        let newData = {
          level: result.data().level,
          unit: result.data().unit,
          name: result.data().name,
          skill: result.data().skill
        };

        temp.push(newData);

        temp.sort((a, b) => Number(a.unit) - Number(b.unit));
      });

      this.practiceNameList = temp;

      db.collection("classroomMission")
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        // .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        // .where("status", "==", "current")
        .get()
        .then(doc => {
          // NOTE ทำส่วนลด
          let missionTemp = [];
          let allClassroomMission = [];

          doc.forEach(element => {
            if (element.data().status == "finish") {
              missionTemp.push(element.data());
            }
            allClassroomMission.push(element.data());
          });

          let buddyDiscount = 0;
          let finishBuddyArr = [];
          allMission.forEach(mission => {
            if (
              missionTemp.map(x => x.currentMissionKey).includes(mission.key) &&
              mission.name == "คู่หู"
            ) {
              finishBuddyArr.push(mission);
            }
          });

          if (finishBuddyArr.length) {
            // NOTE กรณีมีคู่หู
            finishBuddyArr.sort((a, b) => Number(b.level) - Number(a.level));
            let lastBuddy = finishBuddyArr[0];
            buddyDiscount = Number(lastBuddy.status) * totalStudent;
          }

          // if (element.data().status == "current") {
          let currentMissionKey = allClassroomMission.filter(
            x => x.status == "current"
          )[0].currentMissionKey;
          this.$q.localStorage.set("currentMissionKey", currentMissionKey);
          db.collection("mission")
            .doc(currentMissionKey)
            .get()
            .then(missionData => {
              this.currentMission = {
                ...missionData.data(),
                discount: buddyDiscount
              };
              this.isShowMission = true;
              this.loadingHide();
            });
          // }
        });
    }
  },
  beforeMount() {
    this.loadCurrentPractice();
  },
  mounted() {
    this.loadCurrentMission();
    this.$q.localStorage.remove("enterPracticeTime");
    if (!this.$q.localStorage.has("studyPlanChooseMode")) {
      this.$q.localStorage.set("studyPlanChooseMode", "auto");
    }
  }
};
</script>

<style lang="scss" scoped>
.duration-mode1-in {
  animation-duration: 0.5s;
}

.duration-mode2-in {
  animation-duration: 0.5s;
}

.content-scroll {
  height: calc(100vh - 300px);
  overflow-y: auto;
}

/* width */
.content-scroll::-webkit-scrollbar {
  width: 20px;
}

/* Track */
.content-scroll::-webkit-scrollbar-track {
  border-radius: 15px;
  background: #d68a4c;
  border: 4px solid #eabd94;
}

/* Handle */
.content-scroll::-webkit-scrollbar-thumb {
  background: #662707;
  border-radius: 15px;
  border: 0.25mm solid #eabd94;
}

/* Handle on hover */
.content-scroll::-webkit-scrollbar-thumb:hover {
  background: #5f2508;
}

.text-shadow {
  text-shadow: 0px 0px 4px rgb(255, 208, 0);
}
</style>
