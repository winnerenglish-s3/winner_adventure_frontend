<template>
  <q-page class="row justify-center bg-main relative-position">
    <q-resize-observer @resize="onResize" />

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      v-if="isActiveMain"
    >
      <div class="col-12 row relative-position" v-if="isloadMission">
        <div class="q-pa-md z-top fixed-top-right" align="right">
          <div class>
            <q-btn
              class="bg1 border3-md q-mx-md br-a-xs text-h6"
              style="width:320px;"
              @click="showStudentLoginProgress = true"
            >
              <div class="row fit">
                <div class="col self-center" align="left">
                  <span>ลูกเรือที่ยังไม่เข้าระบบ</span>
                </div>

                <div align="center" class="self-center">
                  <q-icon name="far fa-user" size="20px" class="q-px-md"></q-icon>
                  <span>{{ offlineStudent }}</span>
                </div>
              </div>
            </q-btn>
            <!-- TODO update หน้าค่อยโชว์ -->
            <q-btn style="width:260px;" class="bg3 br-a-sm color1 text-h6 border3-sm" v-if="false">
              <div class="row fit">
                <div class="col-2 self-center">
                  <q-icon name="fas fa-dove" size="35px"></q-icon>
                </div>
                <div align="right" class="col self-center">
                  <span>สำรวจเพื่อนร่วมทาง</span>
                </div>
              </div>
            </q-btn>

            <div class="q-mt-md q-px-md">
              <div
                class="relative-position cursor-pointer"
                style="width:150px;"
                v-ripple
                @click="openBag()"
              >
                <q-img src="../../statics/bags.png"></q-img>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 self-end" style="z-index:10;">
          <q-img
            v-if="buddy == null"
            style="z-index:10;max-width:450px;width:100%;"
            :src="'../../statics/buddy/friend0.png'"
          ></q-img>
          <q-img
            v-else
            style="z-index:10;max-width:450px;width:100%;"
            :src="'../../statics/buddy/friend' + buddy.level + '.png'"
            :style="buddy.level == 2 ? { transform: 'rotateY(190deg)' } : null"
          ></q-img>
          <q-img
            :src="'../../statics/ship/ship' + ship.level + '_main.png'"
            class="absolute-bottom-left"
            style="z-index:5;max-width:1600px;width:100%;"
          ></q-img>
          <div style="height:20px;"></div>
        </div>
      </div>
    </transition>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      v-if="isActiveMain"
    >
      <div class="row absolute-bottom q-pb-lg q-pa-md" style="z-index:15;" v-if="isloadMission">
        <div class="col">
          <div class="border3-lg full-height bg1 q-pa-md br-a-lg">
            <span class="text-h5">
              สวัสดีกัปตัน วันนี้มาทำภารกิจกันเถอะ ถ้าพร้อมแล้ว กด "ขึ้นเรือ"
              กัน
            </span>
          </div>
        </div>
        <div class="col-4" style="max-width:350px;width:95%;">
          <div align="right">
            <q-img
              v-ripple
              style="z-index:15;max-width:300px;width:100%;"
              src="../../statics/start_btn.png"
              class="cursor-pointer relative-position"
              @click="startAdventures()"
            ></q-img>
          </div>
        </div>
      </div>
    </transition>

    <div>
      <online-progress @closePopup="closePopup" v-if="showStudentLoginProgress"></online-progress>
    </div>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      v-if="isActiveBags"
    >
      <div class="row full-width q-mt-xl q-pt-xl q-pb-md q-px-md fit" style="max-width:1200px;">
        <div class="col-4 self-end q-pa-sm relative-position" style="width:400px;">
          <q-btn
            class="bg3 color6 text-h6 q-pr-lg br-a-xs"
            icon="fas fa-chevron-left"
            label="กลับท่าเรือ"
            @click="closeBag()"
          ></q-btn>
        </div>
        <div class="col q-pa-sm relative-position">
          <div class="bg5 q-pa-sm br-a-sm" style="width:350px;">
            <div class="border-dashed br-a-xs q-pl-xl q-pa-xs" align="center">
              <span class="text-h4 color3">กระเป๋าเก็บของ</span>
            </div>
          </div>
          <img
            src="../../statics/Backpack.png"
            style="width:90px;top:-7px;left:-15px;"
            class="absolute-left"
          />
        </div>

        <!-- NOTE : ปุ่มเลือกต่างๆ -->
        <div class="col-12 row q-mt-lg">
          <div
            class="col-2 cursor-pointer relative-position q-pa-sm br-ta-lg text-bold text-h6 border5-l-xs border5-r-xs border5-t-xs"
            :class="activeBag == 'ship' ? 'bg5 color3' : 'bg3 color6'"
            style="width:200px;"
            align="center"
            @click="selectBag('ship')"
            v-ripple
          >เรือ</div>
          <div
            class="col-2 cursor-pointer relative-position q-pa-sm br-ta-lg text-bold text-h6 border5-l-xs border5-r-xs border5-t-xs"
            :class="activeBag == 'buddy' ? 'bg5 color3' : 'bg3 color6'"
            style="width:200px;"
            align="center"
            @click="selectBag('buddy')"
            v-ripple
          >คู่หู</div>
          <div
            class="col-2 cursor-pointer relative-position q-pa-sm br-ta-lg text-bold text-h6 border5-l-xs border5-r-xs border5-t-xs"
            :class="activeBag == 'treasure' ? 'bg5 color3' : 'bg3 color6'"
            style="width:200px;"
            align="center"
            @click="selectBag('treasure')"
            v-ripple
          >สมบัติ</div>
        </div>

        <!-- NOTE : ประวัติเรือ -->
        <div class="col-12 row bg5 br-tr-sm br-ba-sm">
          <div
            class="col-6 q-px-xl q-pa-xs q-py-lg relative-position"
            style="width:550px;border-right:2px dashed #662707"
          >
            <div class="bg3 color1 q-pa-sm br-ta-sm" align="center">
              <span class="text-h6">{{ dataItem[itemNumber].itemname }}</span>
            </div>

            <div class="absolute-top-left" style="z-index:50;width:70px;left:15px;top:15px;">
              <q-img src="../../statics/boxlevel.png">
                <div class="bg-transparent absolute-center text-h5">{{ itemNumber }}</div>
              </q-img>
            </div>
            <div class="bg1 br-ba-sm row">
              <div class="col-6" style="width:200px;">
                <q-img
                  v-if="levelShow != '-1'"
                  class="br-ba-sm"
                  :src="
                    '../../statics/' +
                      activeBag +
                      '/' +
                      activeBag +
                      itemNumber +
                      '_card.png'
                  "
                ></q-img>
              </div>
              <div class="col q-pa-sm color3 text-bold">
                <div>
                  <span class="text-h6">{{ labelList[0] }}</span>
                  <div>
                    <q-rating
                      v-model="star1"
                      :max="Math.ceil(star1)"
                      size="40px"
                      class="color6"
                      icon="star_border"
                      icon-selected="star"
                      icon-half="star_half"
                      no-dimming
                      readonly
                    />
                  </div>
                </div>
                <div class="q-mt-sm">
                  <span class="text-h6">{{ labelList[1] }}</span>
                  <div>
                    <q-rating
                      v-model="star2"
                      :max="Math.ceil(star2)"
                      size="40px"
                      class="color6"
                      icon="star_border"
                      icon-selected="star"
                      icon-half="star_half"
                      no-dimming
                      readonly
                    />
                  </div>
                </div>
                <div class="q-mt-sm">
                  <span class="text-h6">{{ labelList[2] }}</span>
                  <div>
                    <q-rating
                      v-model="star3"
                      :max="Math.ceil(star3)"
                      size="40px"
                      class="color6"
                      icon="star_border"
                      icon-selected="star"
                      icon-half="star_half"
                      no-dimming
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 bg1 br-a-sm q-mt-md q-pa-sm q-py-md">
              <div class="text-h6 color3">
                <span>ความสามารถ : {{ skill }}</span>
              </div>
              <div class="q-mt-lg text-h6 color3">
                <span>{{ story }}</span>
              </div>
            </div>
          </div>
          <div class="col self-start">
            <div class="q-pa-md q-mt-xs">
              <div class="row fit boxitem">
                <div v-for="(item, index) in dataItem" :key="index">
                  <div class="q-pa-sm" v-if="!(item.name == 'สมบัติ' && index == 0)">
                    <q-img
                      class="cursor-pointer relative-position"
                      v-if="levelShow >= index"
                      :src="'../../statics/coins/' + coins + index + '.png'"
                      style="width:100px;"
                      @click="selectItem(item, index)"
                    ></q-img>
                    <q-img
                      v-else
                      :src="'../../statics/coins/' + coins + '_unknow.png'"
                      style="width:100px;"
                    ></q-img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
import onlineProgress from "../../components/onlineProgress.vue";
export default {
  components: {
    onlineProgress
  },
  data() {
    return {
      activeBag: "ship",

      showStudentLoginProgress: false,
      totalStudent: this.decrypt(
        this.$q.localStorage.getItem("totalStudent"),
        2
      ),
      totalOnlineStudent: 0,
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      pageItem: 0, // หน้าสมบัติปัจจุบัน
      item: [], // เก็บสมบัติของผู้เล่นแล้วนำไปแสดง

      isActiveMain: true, // เปิดการใช้งาน : รูปภาพหลัก เช่น เรือ, คู่หู, สะพาน

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      snapGetOfflineStudent: "",
      allMission: this.decrypt(this.$q.localStorage.getItem("allMission"), 1),
      classroomMission: "",

      ship: {},
      buddy: {},
      treasure: {},
      shipItem: [],
      itemNumber: 0,
      itemLevel: 0,
      buddyItem: [],
      treasureItem: [],
      isloadMission: false,
      totalPage: null,
      offlineStudent: 10,

      isActiveBags: false,

      star1: 1,
      star2: 0.5,
      star3: 1,
      dataItem: [],
      coins: "sh",
      levelShow: "0",
      labelList: [],
      story: "",
      skill: ""
    };
  },

  methods: {
    selectItem(val, index) {
      if (this.activeBag == "ship") {
        this.star1 = Number(val.durable);
        this.star2 = Number(val.speed);
        this.star3 = Number(val.control);
        this.story = val.story;
        this.itemNumber = index;
        this.itemLevel = index;
        if (index == 0) {
          this.skill = "ไม่มีความสามารถ";
        } else {
          this.skill = "+" + val.status + " เหรียญ เมื่อทำแบบฝึกหัดเสร็จ";
        }
      } else if (this.activeBag == "buddy") {
        this.star1 = Number(val.str);
        this.star2 = Number(val.intg);
        this.star3 = Number(val.friendly);
        this.story = val.story;
        this.itemNumber = index;
        this.itemLevel = index;
        if (index == 0) {
          this.skill = "ไม่มีความสามารถ";
        } else {
          this.skill =
            "ลดราคาภารกิจ " + val.status * this.totalStudent + " เหรียญ";
        }
      } else {
        this.star1 = Number(val.rare);
        this.star2 = Number(val.val);
        this.star3 = Number(val.magic);
        this.story = val.story;

        this.itemNumber = index;

        this.skill =
          "มอบเหรียญภารกิจให้ " + val.status * this.totalStudent + " เหรียญ";
      }
    },
    selectBag(type) {
      this.activeBag = type;

      if (type == "ship") {
        this.dataItem = this.shipItem;
        this.levelShow = this.ship.level;
        this.labelList = ["ความทนทาน", "ความเร็ว", "ควบคุม"];
        this.itemNumber = 0;
        this.itemLevel = 0;
        this.star1 = Number(this.dataItem[0].durable);
        this.star2 = Number(this.dataItem[0].speed);
        this.star3 = Number(this.dataItem[0].control);
        this.story = this.dataItem[0].story;
        this.skill = "ไม่มีความสามารถ";
        this.coins = "sh";
      } else if (type == "buddy") {
        this.dataItem = this.buddyItem;
        this.levelShow = this.buddy.level;
        this.labelList = ["ความแข็งแรง", "ความฉลาด", "ความน่าคบหา"];
        this.itemNumber = 0;

        this.star1 = Number(this.dataItem[0].str);
        this.star2 = Number(this.dataItem[0].intg);
        this.star3 = Number(this.dataItem[0].friendly);
        this.story = this.dataItem[0].story;
        this.skill = "ไม่มีความสามารถ";
        this.itemLevel = 0;
        this.coins = "f";
      } else {
        this.dataItem = this.treasureItem;
        this.labelList = ["ความหายาก", "มูลค่า", "พลังเวทย์"];
        this.coins = "t";

        if (this.treasure.level == "-1") {
          this.skill = "-";
          this.star1 = Number(this.dataItem[0].rare);
          this.star2 = Number(this.dataItem[0].val);
          this.star3 = Number(this.dataItem[0].magic);
          this.story = this.dataItem[0].story;
          this.itemNumber = 0;
        } else {
          this.itemNumber = 1;

          this.skill =
            "มอบเหรียญภารกิจให้ " +
            this.dataItem[1].status * this.totalStudent +
            " เหรียญ";
          this.star1 = Number(this.dataItem[1].rare);
          this.star2 = Number(this.dataItem[1].val);
          this.star3 = Number(this.dataItem[1].magic);
          this.story = this.dataItem[1].story;
        }

        this.levelShow = this.treasure.level;
      }
    },
    openBag() {
      this.isActiveMain = false;

      setTimeout(() => {
        this.selectBag("ship");
        this.isActiveBags = true;
      }, 500);
    },
    closeBag() {
      this.isActiveBags = false;

      setTimeout(() => {
        this.isActiveMain = true;
      }, 500);
    },
    closePopup(val) {
      this.showStudentLoginProgress = val;
    },
    studentLoginProgress() {},
    async startAdventures() {
      // ปุ่มขึ้นเรือ
      this.loadingShow();
      let dateAndTime = await this.getDateAndTime();
      // Check ว่ามี ภารกิจที่กำลังดำเนินการทำอยู่หรือไม่ หากไม่มีให้ไปหน้า Vote
      // หากมีอยู่แล้วไปเรียนต่อได้เลย
      let checkMission = await db
        .collection("classroomMission")
        .where("room", "==", this.currentRoom)
        .where("class", "==", this.currentClass)
        // .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear)
        .where("status", "==", "current")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get();

      if (checkMission.size > 0) {
        console.log("กรณีเจอภารกิจที่กำลังทำอยู่");
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({ currentPage: "studyplan", date: dateAndTime })
          .then(() => {
            this.loadingHide();
            this.$router.push("/teacher/studyplan");
          });
      } else {
        console.log("กรณีไม่มีภารกิจที่กำลังทำอยู่");
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({ currentPage: "vote", date: dateAndTime })
          .then(() => {
            this.loadingHide();
            this.$router.push("/teacher/vote");
          });
      }
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    },
    async checkQuestionnaire() {
      this.loadingShow();
      // เช็คว่ามีการเปิด วัดความพึงพอใจไว้หรือไม่
      let date = await this.getDateAndTime();
      db.collection("school")
        .doc(this.teacherData.schoolKey)
        .get()
        .then(async doc => {
          if (doc.data().questionNaire) {
            console.log("เปิด Questionnaire");
            let findQuestionnaireKey = await db
              .collection("questionnaireset")
              .where("active", "==", true)
              .get();

            let questionnaireKey = findQuestionnaireKey.docs[0].id;

            // กรณีเรียนห้องเดียว
            let checkQuestionnaire = await db
              .collection("schooltestlog")
              .where("testtype", "==", "questionnaire")
              .where("class", "==", this.currentClass)
              .where("room", "==", this.currentRoom)
              .where("term", "==", this.currentTerm)
              .where("year", "==", this.currentYear)
              .where("questionnaireKey", "==", questionnaireKey)
              .where("schoolKey", "==", this.teacherData.schoolKey)
              .get();
            if (checkQuestionnaire.size) {
              console.log("ทำ Questionnaire แล้ว");
              this.$q.loading.hide();
            } else {
              db.collection("synchronize")
                .doc(this.teacherData.key)
                .update({
                  currentPage: "prepare-questionnaire",
                  date: date
                })
                .then(() => {
                  this.$q.loading.hide();
                  this.$q.localStorage.remove("timerMin");
                  this.$q.localStorage.remove("timerSec");
                  this.$q.localStorage.set("timerMin", 15);
                  this.$q.localStorage.set("timerSec", 0);
                  this.$router.push("/teacher/questionnaire/");
                });
            }
          } else {
            this.loadingHide();
          }
        });
    },
    getOfflineStudent() {
      let dbStudent;
      dbStudent = db
        .collection("student")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("classRoom", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear);
      this.snapGetOfflineStudent = dbStudent.onSnapshot(
        { includeMetadataChanges: true },
        doc => {
          let offlineStudent = 0;
          doc.forEach(element => {
            if (element.data().status != "online") {
              offlineStudent++;
            }
          });
          this.offlineStudent = offlineStudent;
        }
      );
    },
    loadMissionItems() {
      let dbMission;

      db.collection("mission")
        .get()
        .then(missiondoc => {
          let tempMission = [];

          missiondoc.forEach(missiondata => {
            let newData = {
              key: missiondata.id,
              ...missiondata.data()
            };

            tempMission.push(newData);
          });

          tempMission.sort((a, b) => {
            return Number(a.level) - Number(b.level);
          });

          tempMission.unshift(
            {
              itemname: "ถังถัง",
              name: "เรือ",
              level: "0",
              goal: 0,
              story: "ถังไม้อายุ 100 ปี ทนแดดทนฝน ลอยกลางทะเลไม่มีวันจม....",
              control: "0.5",
              durable: "1",
              speed: "1"
            },
            {
              itemname: "แพน",
              name: "คู่หู",
              level: "0",
              goal: 0,
              story:
                "เด็กน้อยผู้สดใสและร่าเริง เขาชอบท่องเที่ยวและเขามักจะอยู่กับเพื่อนเสมอ",
              str: "2",
              intg: "2.5",
              friendly: "5"
            },
            {
              itemname: "ไม่มีข้อมูล",
              name: "สมบัติ",
              level: "0",
              goal: 0,
              story: "-",
              rare: "0",
              val: "0",
              magic: "0"
            }
          );

          this.shipItem = tempMission.filter(x => {
            return x.name == "เรือ";
          });

          this.buddyItem = tempMission.filter(x => {
            return x.name == "คู่หู";
          });

          this.treasureItem = tempMission.filter(x => {
            return x.name == "สมบัติ";
          });

          dbMission = db
            .collection("classroomMission")
            .where("schoolKey", "==", this.teacherData.schoolKey)
            .where("status", "==", "finish")
            // .where("term", "==", this.currentTerm)
            .where("year", "==", this.currentYear)
            .where("class", "==", this.currentClass)
            .where("room", "==", this.currentRoom)
            .get();
          dbMission.then(doc => {
            if (doc.size) {
              // กรณีเคยมีภารกิจที่ทำไปแล้ว
              let classroomMissionTemp = [];

              doc.forEach(element => {
                let newData = this.allMission.filter(x => {
                  return x.key == element.data().currentMissionKey;
                });

                newData[0].missionStat = newData[0].status;
                delete newData[0].status;
                let merge = { ...newData[0], ...element.data() };

                classroomMissionTemp.push(merge);
              });

              classroomMissionTemp.sort((a, b) => {
                return Number(a.level) - Number(b.level);
              });

              this.classroomMission = classroomMissionTemp;

              let allShip = classroomMissionTemp.filter(x => {
                return x.name == "เรือ";
              });
              let allTreasure = classroomMissionTemp.filter(x => {
                return x.name == "สมบัติ";
              });
              let allBuddy = classroomMissionTemp.filter(x => {
                return x.name == "คู่หู";
              });

              this.ship =
                allShip.length > 0 ? allShip[allShip.length - 1] : null;

              this.buddy =
                allBuddy.length > 0 ? allBuddy[allBuddy.length - 1] : null;

              this.treasure =
                allTreasure.length > 0
                  ? allTreasure[allTreasure.length - 1]
                  : null;

              // กรณีมีภารกิจที่เคยทำไปแล้ว แต่ยังไม่เคยทำ ภารกิจคู่หู
              if (this.buddy == null) {
                this.buddy = {
                  level: "0",
                  missionStat: "ยังไม่มี"
                };
              }

              if (this.ship == null) {
                this.ship = {
                  level: "0",
                  missionStat: "ยังไม่มี"
                };
              }

              if (this.treasure == null) {
                this.treasure = {
                  level: "-1",
                  missionStat: "ยังไม่มี"
                };
              }

              this.isloadMission = true;
            } else {
              // กรณียังไม่เคยทำภารกิจ

              // SET เรือเลเวล0
              this.ship.missionStat = "ยังไม่มี";
              this.ship.level = "0";
              // SET BUDDY เลเวล0
              this.buddy.missionStat = "ยังไม่มี";
              this.buddy.level = "0";
              // SET Treasure
              this.treasure.missionStat = "ยังไม่มี";
              this.treasure.level = "-1";

              this.isloadMission = true;
              this.totalPage = 0;
            }
          });
        });
    },
    checkProgress() {
      // ฟังก์ชันเช็คว่า ความก้าวหน้าของนักเรียนช้าหรือไม่ เช็คที่ Mount ได้เลย
    }
  },
  created() {
    this.getOfflineStudent();
    this.loadMissionItems();
  },
  mounted() {
    this.$q.localStorage.remove("finishClicked");
    if (!this.$q.localStorage.has("isSkipQuestionnaire")) {
      // กรณีมีการกด Skip แบบสอบถามแล้ว ไม่ต้องเช็คใหม่
      this.checkQuestionnaire();
    }
  },
  beforeDestroy() {
    this.snapGetOfflineStudent();
  }
};
</script>

<style lang="scss" scoped>
.disable-arrow {
  background-color: #bbb;
}
.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.boxitem {
  overflow-y: auto;
  height: 400px;
}

/* width */
.boxitem::-webkit-scrollbar {
  width: 15px;
}

/* Track */
.boxitem::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 10px;
  border-left: 3px solid #eabd94;
  border-right: 3px solid #eabd94;
}

/* Handle */
.boxitem::-webkit-scrollbar-thumb {
  background: #662707;
  border-radius: 10px;
}

/* Handle on hover */
.boxitem::-webkit-scrollbar-thumb:hover {
  background: #92380a;
}
</style>
