import Vue from "vue";
import VueRouter from "vue-router";
import VueSpriteAnimator from "vue-sprite-animator";
import routes from "./routes";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCryptojs from "vue-cryptojs";

Vue.use(VueRouter);
Vue.use(VueSpriteAnimator);
Vue.use(VueAxios, axios);
Vue.use(VueCryptojs);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

var firebaseConfig = {
  apiKey: "AIzaSyDfkvwshPDlNA_U0CmYHQZjDQPABTBndG4",
  authDomain: "winneradventure-ed4a1.firebaseapp.com",
  databaseURL: "https://winneradventure-ed4a1.firebaseio.com",
  projectId: "winneradventure-ed4a1",
  storageBucket: "winneradventure-ed4a1.appspot.com",
  messagingSenderId: "422902637715",
  appId: "1:422902637715:web:3b968c9aed708785c91966"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let storage = firebase.storage();

export const db = firebase.firestore();
export const st = storage.ref();

import test from "../pages/student/charactertalking";
export default function(/* { store, ssrContext } */) {
  Vue.mixin({
    data() {
      return {
        version: "0.0.010", // Version Main App
        studentData: {
          ...this.decrypt(this.$q.localStorage.getItem("studentData"), 1),
          term: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
          year: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2)
        },
        serverPath: "https://storage.googleapis.com/winnerenglish/upload/",
        setTimer: "",
        startTime: "",
        schoolData: this.decrypt(this.$q.localStorage.getItem("schoolData"), 1),
        teacherData: this.decrypt(
          this.$q.localStorage.getItem("teacherData"),
          1
        ),

        playAudioSound: ""
      };
    },
    methods: {
      encrypt(data, type) {
        // ฟังก์ชันการเข้ารหัส AES
        // type 1.OBJ 2.String / boolean / number
        let result;
        if (type == 1) {
          // object TYPE
          result = this.CryptoJS.AES.encrypt(
            JSON.stringify(data),
            "chomart12"
          ).toString();
        } else if (type == 2) {
          // STRING TYPE
          data = data.toString();
          result = this.CryptoJS.AES.encrypt(data, "chomart12").toString();
        }
        return result;
      },
      decrypt(data, type) {
        // ฟังก์ชันการถอดรหัส AES
        // type 1.OBJ 2.String 3.Number 4.boolean
        if (!data) {
          return data;
        }
        let result = this.CryptoJS.AES.decrypt(data, "chomart12").toString(
          this.CryptoJS.enc.Utf8
        );
        if (type == 1) {
          // object type
          // แปลงJSON กลับ
          result = JSON.parse(result.toString(CryptoJS.enc.Utf8));
        } else if (type == 3) {
          // number type
          result = Number(result);
        } else if (type == 4) {
          // JSON TYPE
          result = JSON.parse(result);
        }
        return result;
      },
      async teacherPracticeRouter(practicetype, mode) {
        console.log(practicetype);
        // mode 1 == Router ข้างนอก ปุ่มเริ่มเดินทางหน้า Main
        // mode 2 == Router เข้าแบบฝึกหัดเลย
        if (mode == 1) {
          this.$router.push("/teacher/practice");
        } else {
          // โหมดเข้าสู่แบบฝึกหัด
          let date = await this.getDateAndTime();
          this.$q.localStorage.set("enterPracticeTime", date.microtime);
          this.$q.localStorage.remove("timerMinutes");
          this.$q.localStorage.remove("timerSeconds");

          if (practicetype == "flashcard") {
            // FLASHCARD กรณีเป็น Flashcard เข้าหน้า Flashcard ของครู
            this.$router.push("/teacher/flashcard");
          } else if (practicetype == "grammarlesson") {
            this.$router.push("/teacher/grammarlesson");
          } else if (
            practicetype == "readingfillin" ||
            practicetype == "readingmulti"
          ) {
            // TODO : แก้ Practicetype ของ Reading
            // this.$router.push("/teacher/readingstory")
            this.$router.push("/teacher/progress");
          } else if (practicetype == "grammaraction") {
            this.$router.push("/teacher/grammaraction");
          } else if (
            practicetype == "phonicslesson" ||
            practicetype == "languagetips"
          ) {
            this.$router.push("/teacher/vdolesson");
          } else if (practicetype == "speaking") {
            this.$router.push("/teacher/conversationlesson");
          } else if (practicetype == "readingspeaking") {
            this.$router.push("/teacher/readingstory");
          } else if (practicetype == "roleplay") {
            this.$router.push("/teacher/roleplay");
          } else {
            // กรณีแบบฝึกหัดทั่วไป เข้าหน้า Progress กราฟ
            this.$router.push("/teacher/progress");
          }
        }
      },
      secondToMinutes(second) {
        let minutes = Math.floor(second / 60);
        let second2 = Math.floor(second % 60);
        let resMin = minutes > 10 ? minutes : "0" + minutes;
        let resSec = second2 > 10 ? second2 : "0" + second2;
        return resMin + ":" + resSec;
      },
      playSound(url) {
        if (this.playAudioSound != "") {
          this.playAudioSound.pause();
        }

        this.playAudioSound = new Audio(url);
        this.playAudioSound.play();
      },
      showNotify(color = "secondary", message) {
        this.$q.notify({
          color: color,
          message: message,
          position: "top"
        });
      },
      showDialog(title, message) {
        this.$q.dialog({
          title: title,
          message: message,
          dark: true
        });
      },
      loadingShow() {
        this.$q.loading.show({
          delay: 400,
          spinner: "QSpinnerHourglass"
        });
      },
      loadingHide() {
        this.$q.loading.hide();
      },

      async getDateAndTime() {
        let apiLink = "https://api.winner-english.com/data/api/gettime.php";
        const res = await axios.get(apiLink);
        return res.data[0];
      },
      getAcademicYear() {
        return this.decrypt(this.$q.localStorage.getItem("currentYear"), 2);
      },
      getTerm() {
        return this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2);
      },
      updateOnlineStudent() {
        db.collection("student")
          .doc(this.studentData.key)
          .update({
            status: "online"
          });
      },
      timer(start, end) {
        let min = this.$q.localStorage.has("timerMin")
          ? this.$q.localStorage.getItem("timerMin")
          : start;
        let sec = this.$q.localStorage.has("timerSec")
          ? this.$q.localStorage.getItem("timerSec")
          : end;

        this.setTimer = setInterval(() => {
          if (min == 0 && sec == 0) {
            clearInterval(this.setTimer);
            this.isTimeOut = true;
          } else {
            if (sec == 0) {
              min--;
              sec = 60;
            }
            sec--;
            this.$q.localStorage.set("timerMin", min);
            this.$q.localStorage.set("timerSec", sec);
          }
          sec = (sec < 10 ? "0" : "") + sec;
          this.practice.timer = (min < 10 ? "0" : "") + min + " : " + sec;
        }, 1000);
      },
      sortRandom(data) {
        data.sort(() => {
          return 0.5 - Math.random();
        });
      },
      showSkillName(name) {
        let returnData;
        if (name == "Vocabulary") {
          returnData = "คำศัพท์";
        } else if (name == "Grammar") {
          returnData = "ไวยากรณ์";
        } else if (name == "Writing") {
          returnData = "การเขียน";
        } else if (name == "Reading") {
          returnData = "การอ่าน";
        } else if (name == "Phonics") {
          returnData = "การออกเสียง";
        } else {
          returnData = "การฟังและการพูด";
        }
        return returnData;
      },
      convertPracticeName(name, world) {
        let result;
        if (world == "Vocabulary") {
          if (name == "review vocab") {
            result = "ทบทวนคำศัพท์";
          } else if (name == "flashcard") {
            result = "การ์ดคำศัพท์";
          } else if (name == "spelling bee") {
            result = "สะกดคำศัพท์";
          } else if (name == "multiplechoices") {
            result = "เลือกคำศัพท์";
          }
        } else if (world == "Grammar") {
          if (name == "grammarlesson") {
            result = "สอนไวยากรณ์";
          } else if (name == "review grammar") {
            result = "ทบทวนไวยากรณ์";
          } else if (name == "grammaraction") {
            result = "ถามตอบไวยากรณ์";
          } else if (name == "multiplechoices") {
            result = "เลือกคำตอบ";
          } else if (name == "fillintheblank") {
            result = "เติมคำตอบ";
          }
        } else if (world == "Reading") {
          if (name == "readingspeaking") {
            result = "อ่านออกเสียง";
          } else {
            result = "อ่านจับใจความ";
          }
        } else if (world == "Writing") {
          result = "แต่งประโยค";
        } else if (world == "Phonics") {
          if (name == "phonicslesson") {
            result = "สอนออกเสียง";
          } else {
            result = "ฝึกออกเสียง";
          }
        } else {
          if (name == "languagetips") {
            result = "เคล็ดลับภาษา";
          } else if (name == "multiplechoices") {
            result = "เลือกคำตอบ";
          } else if (name == "roleplay") {
            result = "บทหนังสั้น";
          } else if (name == "speaking") {
            result = "ดูหนังสั้น";
          } else {
            result = "ถามตอบหนังสั้น";
          }
        }

        return result;
      },
      charTalking(active, type, level) {
        return test.test1(active, type, level);
      },
      async checkPassedMission(data) {
        this.loadingShow();
        // NOTE เช็คการผ่านภารกิจ ถ้าผ่านภารกิจ ต้องไปหน้าสรุปผ่านภารกิจ
        return new Promise((a, b) => {
          console.log(data);
          db.collection("classroomMission")
            .where("schoolKey", "==", this.teacherData.schoolKey)
            .where("class", "==", data.class)
            .where("room", "==", data.room)
            // .where("term", "==", data.term)
            .where("year", "==", data.year)
            // .where("status", "==", "current")
            .get()
            .then(result => {
              let allMission = this.decrypt(
                this.$q.localStorage.getItem("allMission"),
                1
              );

              let resultTemp = [];
              let missionTemp = [];
              let passedMission = [];
              result.forEach(element => {
                resultTemp.push(element.data().status);
                missionTemp.push({
                  ...element.data(),
                  key: element.id
                });
                if (element.data().status == "finish") {
                  passedMission.push(element.data());
                }
              });

              let currentMissionKey = missionTemp.filter(
                x => x.status == "current"
              );
              let missionId = currentMissionKey[0].key;
              currentMissionKey = currentMissionKey[0].currentMissionKey;

              let finishBuddyArr = [];
              let passedMissionMap = passedMission.map(
                x => x.currentMissionKey
              );

              allMission.forEach(mission => {
                if (
                  passedMissionMap.includes(mission.key) &&
                  mission.name == "คู่หู"
                ) {
                  finishBuddyArr.push(mission);
                }
              });

              let buddyDiscount = 0;
              let totalStudent = this.decrypt(
                this.$q.localStorage.getItem("totalStudent"),
                2
              );

              if (finishBuddyArr.length == 0) {
                // NOTE กรณีไม่มีคู่หูในครอบครอง
              } else {
                finishBuddyArr.sort(
                  (a, b) => Number(b.level) - Number(a.level)
                );
                let lastBuddy = finishBuddyArr[0];
                buddyDiscount = Number(lastBuddy.status) * totalStudent;
              }

              if (resultTemp.includes("current")) {
                let goal = allMission.filter(
                  mission => currentMissionKey === mission.key
                );
                // NOTE เป้าหมายปัจจุบัน

                let finishGoal = Number(goal[0].goal) * Number(totalStudent);
                console.log("คะแนนเป้าหมายก่อนลด", finishGoal);

                finishGoal = finishGoal - buddyDiscount;

                db.collection("studentpracticelog")
                  .where("schoolKey", "==", this.teacherData.schoolKey)
                  .where("missionKey", "==", currentMissionKey)
                  .where("class", "==", data.class)
                  .where("room", "==", data.room)
                  // .where("term", "==", data.term)
                  .where("year", "==", data.year)
                  .get()
                  .then(doc => {
                    let totalScore = 0;
                    doc.forEach(element => {
                      let score = element.data().correct;
                      let extraScore;
                      if (element.data().extraScore != undefined) {
                        extraScore = element.data().extraScore;
                      } else {
                        extraScore = 0;
                      }
                      if (element.data().practiceType == "translation") {
                        // กรณีเป็นแบบฝึกหัด Translation ให้คะแนน หาร 4
                        score = Math.round(element.data().correct / 4);
                      }
                      totalScore += score;
                      totalScore += extraScore;
                    });

                    let filterBalance = `${data.class}-${data.room}-${data.term}-${data.year}-${this.teacherData.schoolKey}`;

                    db.collection("classroomScoreBalance")
                      .doc(filterBalance)
                      .get()
                      .then(b => {
                        if (b.exists) {
                          totalScore += b.data().scoreBalance;
                        }
                        console.log("ส่วนลด", buddyDiscount);
                        console.log("คะแนนปัจจุบัน", totalScore);
                        console.log(
                          "คะแนนเป้าหมายปัจจุบันหลังได้ส่วนลด",
                          finishGoal
                        );

                        db.collection("synchronize")
                          .doc(this.teacherData.key)
                          .update({
                            missionScore: totalScore,
                            missionGoal: finishGoal,
                            currentMissionKey: this.$q.localStorage.getItem(
                              "currentMissionKey"
                            ),
                            classroomMissionId: missionId
                          })
                          .then(() => {
                            if (totalScore >= finishGoal) {
                              a(true);
                            } else {
                              a(false);
                            }
                          });
                      });
                  });
              }
            });
        });
      },
      async goToNextLesson(data, checkType = 1) {
        let checkPassedMission = await this.checkPassedMission(data);
        // NOTE true = ผ่านภารกิจ
        // NOTE false =ไม่ผ่านภารกิจ
        if (!checkPassedMission) {
          // NOTE กรณียังไม่ผ่านภารกิจ
          console.log("ไม่ผ่านภารกิจ");
          // checkType == 2 ข้ามการเช็คแบบฝึกหัดสุดท้ายเพื่อแสดงหน้าสรุปคะแนนทักษะ

          // REQUIRE DATA
          // data = {
          //   currentPractice: object,
          //   class: string,
          //   room: string,
          //   term: string,
          //   year : string,
          // }

          // NOTE ฟังก์ชันหาแบบฝึกหัดถัดไป
          let currentPractice = data.currentPractice;
          let practiceListData = this.decrypt(
            this.$q.localStorage.getItem("practiceList"),
            1
          );

          // console.log(practiceListData);

          let filter = `${data.class}-${data.room}-${data.term}-${data.year}`;
          // NOTE เช็คก่อนว่าเป็นแบบฝึกหัดสุดท้ายหรือไม่ เพื่อจะแสดงผลหน้าสรุปคะแนนของทักษะ

          // console.log(filter);

          let numOfPracticeInThisWorld = practiceListData.filter(
            x =>
              x.skill == currentPractice.skill &&
              x.level == currentPractice.level &&
              x.unit == currentPractice.unit &&
              !x.practicetype.includes("review")
          );

          // NOTE จำนวนของแบบฝึกหัดใน Level / unit / skill ปัจจุบัน
          let practiceCounter = numOfPracticeInThisWorld.length;

          // console.log(practiceCounter);
          //
          // NOTE โหลดค่าแบบฝึกหัดที่ทำไปแล้ว
          let classroomPracticeLog = await db
            .collection("classroomPracticeLog")
            .where("filter", "==", filter)
            .where("level", "==", currentPractice.level)
            .where("schoolKey", "==", this.teacherData.schoolKey)
            .get();

          // NOTE จำนวนแบบฝึกหัดที่ทำไปแล้วทั้งหมดของ Level / Unit / Skill ปัจจุบัน
          let classroomPracticeLogData = [];
          classroomPracticeLog.forEach(element => {
            classroomPracticeLogData.push(element.data());
          });

          let passedPracticeCounter = classroomPracticeLogData.filter(
            x =>
              x.unit == currentPractice.unit &&
              x.skill == currentPractice.skill &&
              !x.practiceType.includes("review")
          );

          // console.log(passedPracticeCounter);

          passedPracticeCounter = [
            ...new Set(passedPracticeCounter.map(x => x.practiceKey))
          ];

          console.log(passedPracticeCounter);

          passedPracticeCounter = passedPracticeCounter.length;

          console.log(passedPracticeCounter);

          // console.log(classroomPracticeLogData.filter(
          //   x =>
          //   x.unit == currentPractice.unit &&
          //   x.skill == currentPractice.skill &&
          //   !x.practiceType.includes("review")
          // ));

          console.log(
            "practiceCounter",
            practiceCounter,
            "passedPracticeCounter",
            passedPracticeCounter
          );

          console.log("includes");

          if (practiceCounter == passedPracticeCounter && checkType == 1) {
            // NOTE กรณี จำนวนแบบฝึกหัดใน Level / unit / skill ปัจจุบัน เท่ากับ จำนวนแบบฝึกหัดที่ทำไปแล้วใน level / unit / skill ปัจจุบัน หมายถึง ทำครบทุกแบบฝึกหัดแล้ว
            // NOTE push ไปหน้า สรุปคะแนนรวมทักษะ
            this.$router.push("/teacher/summaryscore/");
          } else {
            this.$q.localStorage.set(
              "totalPassedPractice",
              classroomPracticeLogData
            );

            let classroomPracticeLogKey = classroomPracticeLogData.map(
              x => x.practiceKey
            );

            // NOTE หาแบบฝึกหัดถัดไปจากตัวแปร practiceListData
            // NOTE ตัวแปรเก็บแบบฝึกหัดที่ยังไม่ได้ทำทั้งหมด
            let notPassedPractice = practiceListData.filter(
              x => !classroomPracticeLogKey.includes(x.practiceKey)
            );

            // NOTE Filter แบบฝึกหัดที่อยู่ถัดไปจากแบบฝึกหัดปัจจุบันภายในunitปัจจุบัน
            let nextPracticeFilterd = notPassedPractice.filter(
              x =>
                Number(x.order) > Number(currentPractice.order) &&
                x.unit == currentPractice.unit
            );

            let nextPractice;

            if (!nextPracticeFilterd.length) {
              // NOTE ถ้าไม่มีแบบฝึกหัดถัดไปภายใน unitนี้ ให้เเบบฝึกหัดถัดไปเป็น แบบฝึกหัดบนสุดที่ยังไม่ได้ทำ
              nextPractice = notPassedPractice.filter(
                x => Number(x.unit) > Number(currentPractice.unit)
              )[0];
            } else {
              // NOTE กรณีมีแบบฝึกหัดถัดไปภายใน Unit
              nextPractice = nextPracticeFilterd[0];
            }

            if (nextPractice.practicetype.includes("review")) {
              // NOTE กรณี แบบฝึกหัดถัดไปเป็น Review
              if (nextPractice.skill == "Vocabulary") {
                // NOTE กรณีเป็น review vocab

                let isPassedFlashcardLesson = classroomPracticeLogData.filter(
                  x =>
                    x.practiceType == "flashcard" && x.unit != nextPractice.unit
                ).length;
                if (!isPassedFlashcardLesson) {
                  nextPractice = notPassedPractice.filter(
                    x => !x.practicetype.includes("review")
                  )[0];
                }
              } else {
                // NOTE กรณีเป็น review grammar

                // NOTE เช็คว่าเคยผ่าน Grammar หรือยัง
                // console.log(classroomPracticeLogData);
                // console.log(classroomPracticeLogData.filter(x => x.practiceType == 'grammarlesson'));
                let isPassedGrammarLesson = classroomPracticeLogData.filter(
                  x =>
                    x.practiceType == "grammarlesson" &&
                    x.unit != nextPractice.unit
                ).length;
                // console.log(nextPractice);
                if (!isPassedGrammarLesson) {
                  // NOTE กรณีแบบฝึกหัดถัดไปเป็น Review Grammar แต่ยังไม่เคยทำ Grammar Lesson เลย
                  nextPractice = notPassedPractice.filter(
                    x => !x.practicetype.includes("review")
                  )[0];
                }
              }
            }

            let nextPracticeList = practiceListData.filter(
              x =>
                x.unit == nextPractice.unit &&
                x.skill == nextPractice.skill &&
                !x.practicetype.includes("review")
            );
            // NOTE จำนวนแบบฝึกหัดทั้งหมดของ Unit
            let totalNumberOfPractice = nextPracticeList.length;

            // NOTE ARRAY ของคีย์แบบฝึกหัดที่ทำไปแล้ว
            let passedPracticeKeyArr = nextPracticeList.map(x => x.practiceKey);

            // if (nextPractice.skill == 'Vocabulary' || nextPractice.skill == 'Grammar') {
            //   this.$q.localStorage.set("totalPractice", totalNumberOfPractice - 1)
            // } else {
            this.$q.localStorage.set("totalPractice", totalNumberOfPractice);
            // }
            // NOTE หาว่าแบบฝึกหัดถัดไปอยู่ในตำแหน่งที่เท่าไร
            let indexOfNextPractice =
              passedPracticeKeyArr.indexOf(nextPractice.practiceKey) + 1;
            this.$q.localStorage.set("positionOfPractice", indexOfNextPractice);

            let currentWorldEncrypt = this.encrypt(nextPractice.skill, 2);
            let currentUnitEncrypt = this.encrypt(nextPractice.unit, 2);
            this.$q.localStorage.set("currentWorld", currentWorldEncrypt);
            this.$q.localStorage.set("currentUnit", currentUnitEncrypt);

            let practiceName = await db
              .collection("practiceListName")
              .where("level", "==", nextPractice.level)
              .where("unit", "==", nextPractice.unit)
              .where("skill", "==", nextPractice.skill)
              .get();

            this.$q.localStorage.set(
              "practiceListName",
              practiceName.docs[0].data()
            );
            // console.log(practiceName.docs[0].data());

            // let loadScore = await this.loadScoreMission(data)
            // this.$q.localStorage.set("missionScore", loadScore);

            let date = await this.getDateAndTime();
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                level: nextPractice.level,
                unit: nextPractice.unit,
                practiceKey: nextPractice.practiceKey,
                practicetype: nextPractice.practicetype,
                skill: nextPractice.skill,
                currentPage: "practice",
                date: date
              })
              .then(() => {
                this.$q.localStorage.set("currentPractice", nextPractice);
                this.loadingHide();
                this.teacherPracticeRouter(nextPractice.practicetype, 1);
              });
          }
        } else {
          // NOTE กรณีผ่านภารกิจแล้ว ต้องไปหน้าสรุปภารกิจ
          console.log("ผ่านภารกิจ ไปหน้าสรุปภารกิจ");
          // NOTE เก็บคะแนนส่วนเกินเข้าสู่ Collection classroomScoreBalance
          // STRUCTURE { class , room , term , year , schoolKey , scoreBalance }
          // NOTE score ส่วนเกินได้จาก finishGoal - totalScore

          db.collection("synchronize")
            .doc(this.teacherData.key)
            .update({
              currentPage: "finish-mission"
            })
            .then(() => {
              this.loadingHide();
              this.$router.push("/teacher/finishMission");
            });
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.setTimer);
    }
  });
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
