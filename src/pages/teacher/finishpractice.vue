<template>
  <q-page class="q-pa-sm color3 bg-vocabulary">
    <div>
      <div class="relative-position q-mb-md" align="center">
        <div
          class="bg5 br-a-sm q-pa-xs shadow-2"
          style="width:fit-content;width:-webkit-fit-content;"
        >
          <div class="br-a-sm border-dashed q-px-xl q-py-sm">
            <span class="text-bold" style="font-size:calc(20px + 1vw)">จบภารกิจ</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-center q-mt-sm full-width q-px-md">
      <div class="col-12 bg5 br-a-xl q-pa-md">
        <div
          class="row justify-center border-dashed br-a-xl q-px-sm q-pb-xl"
          style="min-height:calc(100vh - 200px)"
        >
          <div align="center" class="col-12 self-start q-py-md q-my-lg">
            <span class="text-h5">กรุณาเลือกคำสั่ง</span>
          </div>
          <!-- ปุ่มเรียนใหม่ -->
          <div class="col-4 q-pa-sm" align="center">
            <div align="center" class="animated bounce duration-bounce">
              <q-icon name="fas fa-caret-down" class="color7" size="100px" style="height:50px;"></q-icon>
            </div>

            <div
              class="q-mt-md shadow-3"
              style="background-color:#4F220D;max-width:300px;width:100%;border-radius:25px"
            >
              <q-btn
                class="bg3 row shadow-5"
                @click="restartPractice = true"
                style="max-width:300px;width:100%;border-radius:20px"
                :disable="isClickRetryPractice"
              >
                <div class="col-12 q-pt-md q-pb-lg">
                  <q-btn
                    size="50px"
                    round
                    icon="fas fa-redo"
                    class="color6 bg2 q-pa-sm bgbtn no-pointer-events"
                  ></q-btn>
                </div>
                <div
                  style="font-size:calc(10px + 1vw);height:120px;"
                  class="text-white col-12 q-pt-md"
                >ทำภารกิจอีกครั้ง</div>
              </q-btn>
            </div>
          </div>
          <!-- ปุ่มบทเรียนต่อไป -->
          <div class="col-4 q-pa-sm" align="center">
            <div align="center" class="animated bounce duration-bounce">
              <q-icon name="fas fa-caret-down" class="color7" size="100px" style="height:50px;"></q-icon>
            </div>

            <div
              class="q-mt-md shadow-3"
              style="background-color:#4F220D;max-width:300px;width:100%;border-radius:25px"
            >
              <q-btn
                class="bg3 row shadow-5"
                @click="nextLesson()"
                style="max-width:300px;width:100%;border-radius:20px "
                :disable="isClickNextLesson"
              >
                <div class="col-12 q-pt-md q-pb-lg">
                  <q-btn
                    size="50px"
                    round
                    icon="fas fa-star"
                    class="color6 bg2 q-pa-sm bgbtn no-pointer-events"
                  ></q-btn>
                </div>
                <div
                  style="font-size:calc(10px + 1vw);height:120px;"
                  class="text-white col-12 q-pt-md"
                >ภารกิจถัดไป</div>
              </q-btn>
            </div>
          </div>
          <!-- ปุ่มเพิ่มคะแนน -->
          <div class="col-4 q-pa-sm" align="center">
            <div align="center" class="animated bounce duration-bounce">
              <q-icon name="fas fa-caret-down" class="color7" size="100px" style="height:50px;"></q-icon>
            </div>

            <div
              class="q-mt-md shadow-3"
              style="background-color:#4F220D;max-width:300px;width:100%;border-radius:25px"
            >
              <q-btn
                class="bg3 row shadow-5"
                @click="addScoreAndNextLesson()"
                style="max-width:300px;width:100%;border-radius:20px"
                :disable="isClickAddMoreScore"
              >
                <div class="col-12 q-pt-md q-pb-lg">
                  <q-btn round class="color6 bg2 q-pa-sm bgbtn no-pointer-events" size="50px">
                    <q-icon class="relative-position" name="fas fa-star">
                      <span class="absolute-center text-bold color3" style="font-size:25px;">+10</span>
                    </q-icon>
                  </q-btn>
                </div>
                <div
                  style="font-size:calc(10px + 1vw);line-height:40px;height:120px;"
                  class="text-white col-12 q-pt-md"
                >
                  ให้เพิ่ม 10 XP
                  <br />แล้วทำภารกิจถัดไป
                </div>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- dialog แจ้งเตือนการรีเซ็ทแบบฝึกหัด -->
      <q-dialog v-model="restartPractice" content-class="backdrop">
        <q-card class="bg5 color3">
          <q-card-section>
            <div class="text-h6">ทำอีกครั้ง</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            คุณต้องการทำใหม่อีกครั้งหรีอไม่
            ระบบจะไม่ทำการบันทึกคะแนนของลูกเรือในรอบนี้
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="ยกเลิก" v-close-popup @click="isClickRetryPractice = false"></q-btn>
            <q-btn label="ตกลง" outline @click="restartLearn()" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Dialog นับเวลาถอยหลัง -->

      <q-dialog v-model="showCountdown" content-class="backdrop">
        <q-card class="bg5 q-pa-md">
          <q-card-section>
            <div class="text-h5 color3" align="center">ทำอีกครั้ง</div>
            <div class="text-h6 color3" align="center">คะแนนในรอบนี้จะไม่ถูกบันทึก</div>
            <div
              style="border-radius:10px;border:8px solid #662707"
              class="q-pa-md text-h3 row items-center justify-center"
              align="center"
            >
              <span style="color:#81161E">
                <span>
                  <q-icon size="50px" name="far fa-clock"></q-icon>
                </span>
                <span>{{ countdownSeconds }}</span>
              </span>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
// TODO : restart reading story ไม่ได้
import { db } from "../../router";
export default {
  data() {
    return {
      isClickAddMoreScore: false,
      isClickNextLesson: false,
      isClickRetryPractice: false,
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      currentLevel: this.decrypt(
        this.$q.localStorage.getItem("currentLevel"),
        2
      ),
      currentUnit: this.decrypt(this.$q.localStorage.getItem("currentUnit"), 2),
      restartPractice: false,
      showCountdown: false,
      countdownSeconds: "03"
    };
  },
  methods: {
    async restartLearn() {
      this.isClickRetryPractice = true;
      let countdown = 3;
      this.showCountdown = true; //โชว์ตัวนับถอยหลัง 3 วิ
      let cinterval = setInterval(() => {
        countdown--;
        this.countdownSeconds = "0" + countdown;
        if (countdown == 0) {
          clearInterval(cinterval);
          this.showCountdown = false;
          this.restartPractice = false;
        }
      }, 1000);
      setTimeout(async () => {
        let date = await this.getDateAndTime();
        this.loadingShow();
        // Reset ข้อมูล Classroom Practice Log
        let filter =
          this.currentClass +
          "-" +
          this.currentRoom +
          "-" +
          this.currentTerm +
          "-" +
          this.currentYear;
        db.collection("classroomPracticeLog")
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .where("filter", "==", filter)
          .where("practiceKey", "==", this.currentPractice.practiceKey)
          .get()
          .then(doc => {
            if (doc.size) {
              db.collection("classroomPracticeLog")
                .doc(doc.docs[0].id)
                .delete()
                .then(() => {
                  db.collection("synchronize")
                    .doc(this.teacherData.key)
                    .update({
                      currentPage: this.currentPractice.practicetype,
                      date: date
                    })
                    .then(() => {
                      this.loadingHide();
                      this.teacherPracticeRouter(
                        this.currentPractice.practicetype,
                        2
                      );
                    });
                });
            }
          });
      }, 3000);
    },
    async nextLesson() {
      console.clear();
      console.log("แบบเรียนถัดไป");
      this.isClickNextLesson = true;
      this.findNextLesson();
    },
    async addScoreAndNextLesson() {
      this.isClickAddMoreScore = true;
      this.loadingShow();
      console.log("ให้คะแนนเพิ่มแล้วไปแบบเรียนถัดไป");
      let date = await this.getDateAndTime();
      // ทำการเพิ่ม exp ของนักเรียนทุกคนในห้องเพิ่ม 10 xp
      db.collection("student")
        .where("classRoom", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get()
        .then(doc => {
          doc.forEach(element => {
            let exp =
              element.data().currentExp == undefined
                ? 10
                : element.data().currentExp + 10;
            db.collection("student")
              .doc(element.id)
              .update({
                currentExp: exp
              });
          });

          db.collection("synchronize")
            .doc(this.teacherData.key)
            .update({
              currentPage: "extra-score",
              date: date
            })
            .then(() => {
              this.loadingHide();
              this.$router.push("/teacher/addmorescore");
            });
        });
    },
    async findNextLesson() {
      // data = {
      //   currentPractice: object,
      //   class: string,
      //   room: string,
      //   term: string,
      //   year : string,
      // }

      let sendData = {
        currentPractice: this.currentPractice,
        class: this.currentClass,
        room: this.currentRoom,
        term: this.currentTerm,
        year: this.currentYear
      };
      this.goToNextLesson(sendData);

      return;
      this.loadingShow();
      // ต้องเช็คว่าเป็นแบบฝึกหัดสุดท้ายในworld หรือเปล่า เพื่อเช็คว่า ต้องขึ้นหน้าสรุป world หรือไม่
      // โหลดแบบฝึกหัดปัจจุบัน
      let filterWhere =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;
      let getClassroomPracticeLog = await db
        .collection("classroomPracticeLog")
        .where("filter", "==", filterWhere)
        .where("level", "==", this.currentLevel)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get();
      // โหลดแบบฝึกหัดที่ทำแล้ว
      let practiceTemp = [];
      getClassroomPracticeLog.forEach(element => {
        practiceTemp.push(element.data());
      });

      this.$q.localStorage.set("totalPassedPractice", practiceTemp);

      practiceTemp = practiceTemp.map(e => {
        return e.practiceKey;
      });

      // หาแบบฝึกหัดถัดไปที่ต้องทำ จาก Practice List
      // Filter Practice ที่ทำไปแล้่วออกไป
      let filterPassedPractice = this.practiceListData.filter(x => {
        return !practiceTemp.includes(x.practiceKey);
      });

      let studyplanChooseMode = this.$q.localStorage.getItem(
        "studyPlanChooseMode"
      );
      // เอาตัวที่อยู่บนสุด จากก้อนที่ตัดแบบฝึกหัดที่ทำเสร็จแล้วออก
      // ถ้าเป็น AUTO เอาตัวบนสุด
      // // ถ้าเป็น Advance เอาตัวถัดไปเสมอ
      // let nextPractice =
      //   studyplanChooseMode == "auto"
      //     ? filterPassedPractice[0]
      //     : filterPassedPractice.filter(x => {
      //         return x.order > this.currentPractice.order;
      //       })[0];

      let nextPractice = filterPassedPractice.filter(
        x => x.order > this.currentPractice.order
      )[0];

      if (!nextPractice) {
        nextPractice = filterPassedPractice[0];
      }

      this.loadingHide();

      let nextPracticeType = nextPractice.practicetype;

      if (nextPracticeType.includes("review")) {
        console.log("Is Review");
        // กรณีแบบฝึกหัดถัดไปเป็น Review Vocab หรือ Review Grammar
        // ต้องเช็คก่อนว่ามีสิทธิ์เข้า review หรือไม่
        // หากไม่มีสิทธิ์เข้า review ให้ข้ามแบบฝึกหัด review ไป
        return;
      } else {
        console.log("Is not review");
      }

      // if(nextPractice)

      // หาเลขแบบฝึกหัด
      let totalPractice = this.practiceListData.filter(x => {
        return x.unit == nextPractice.unit && x.skill == nextPractice.skill;
      });
      this.$q.localStorage.set("totalPractice", totalPractice.length);

      // หาว่าเป็น Practice ที่เท่าไร
      let mapPractice = totalPractice.map(x => {
        return x.practiceKey;
      });

      let indexOf = mapPractice.indexOf(nextPractice.practiceKey);
      let currentWorldEncrypt = this.encrypt(nextPractice.skill, 2);
      let currentUnitEncrypt = this.encrypt(nextPractice.unit, 2);

      this.$q.localStorage.set("currentWorld", currentWorldEncrypt);
      this.$q.localStorage.set("currentUnit", currentUnitEncrypt);
      let data = nextPractice;
      this.$q.localStorage.set("positionOfPractice", indexOf + 1);
      this.$q.localStorage.set("currentPractice", this.currentPractice);
      // จบหาเลขแบบฝึกหัด
      let date = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          level: data.level,
          unit: data.unit,
          practiceKey: data.practiceKey,
          practicetype: data.practicetype,
          skill: data.skill,
          currentPage: "practice",
          date: date
        })
        .then(() => {
          this.$q.localStorage.set("currentPractice", data);
          // หา Practice ต่อไป
          this.loadingHide();
          this.teacherPracticeRouter(data.practicetype, 1);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.bgbtn {
  background-color: #441c0a;
}

.duration-bounce {
  animation-iteration-count: infinite;
  animation-duration: 2.5s;
  animation-delay: 1s;
}
</style>
