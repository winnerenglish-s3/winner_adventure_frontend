<template>
  <q-page
    class="row"
    :class="
      isLoadData
        ? 'bg5 justify-center items-center'
        : practiceWorld == 'Vocabulary'
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
    <q-resize-observer @resize="onResize" />

    <div v-if="isLoadData">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <div class="col-12 row" v-else>
      <div class="absolute-top-right q-pa-md" align="right">
        <!-- <q-btn round class="bg3 color6 q-pa-sm" icon="fas fa-user-plus"></q-btn> -->
        <q-btn
          class="bg3 color6 text-h6"
          icon="fas fa-atlas"
          label="เลือกบทเรียน"
          @click="chooseLessonType()"
        ></q-btn>
      </div>
      <div class="col self-center relative-position" align="center">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          v-if="isActiveMainLabel"
        >
          <!-- NOTE  Type : Ready -->
          <div style="max-width:900px;width:95%;" v-if="activeType == 'ready'">
            <q-img
              v-if="!currentPractice.practicetype.includes('review')"
              :src="'../../statics/main/practice/' + urlImgShow"
              style="max-width:1500px;width:100%;margin-top:70px"
            >
              <div
                class="relative-position absolute-bottom bg-transparent"
                style="height:calc(100% - 65%);transform: rotate(-.5deg);"
              >
                <div class="absolute-center full-width">
                  <span class="text-bold" style="font-size:4.2vw;">
                    {{
                    convertPracticeName(
                    currentPractice.practicetype,
                    currentPractice.skill
                    )
                    }}
                  </span>
                </div>
              </div>
            </q-img>
            <q-img v-else src="../../statics/review-board.png">
              <div
                class="bg-transparent absolute-bottom"
                style="height:calc(100% - 62%);font-size:5vw;transform: rotate(-.5deg);"
              >
                <span v-if="currentPractice.skill == 'Vocabulary'">คำศัพท์</span>
                <span v-else>ไวยากรณ์</span>
              </div>
            </q-img>
          </div>
        </transition>

        <div style="height:230px;"></div>
      </div>
      <!-- BUDDY -->
      <div class="self-end col-lg-4 col-xs-5" align="center">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          v-if="isActiveMainCharactor"
        >
          <div>
            <q-img src="../../statics/teacher-practice.png" style="max-width:1200px;width:100%;"></q-img>
          </div>
        </transition>
      </div>
      <!-- TALKING BOX -->
      <div class="col-12 z-top absolute-bottom" style="overflow:hidden;">
        <transition
          appear
          enter-active-class="animated fadeInUp duration-talk-in"
          leave-active-class="animated fadeOutDown duration-talk-out"
          v-if="isActiveMainTalk"
        >
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md" align="left">
            <div class="col q-pa-md">
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
              >
                <!-- GRAMMAR LESSON  -->

                <div v-if="!currentPractice.practicetype.includes('review')" class="q-pb-sm">
                  {{ talking.title }}
                  <br />
                </div>

                <span v-if="currentPractice.practicetype == 'grammarlesson'">
                  กัปตันครับ เราจะมาทำภารกิจสอนไวยากรณ์กันนะครับ
                  กัปตันต้องสอนหัวข้อ
                  <span>
                    <q-btn
                      color="red"
                      style="border-radius:15px"
                      class="no-pointer-events"
                      label="new"
                    ></q-btn>
                  </span>
                  ให้ครบถึงจะสามารถทำภารกิจต่อไปได้
                </span>

                <span v-else-if="currentPractice.practicetype == 'review grammar'">
                  กัปตันครับ ก่อนที่ท่านและลูกเรือจะเริ่มทำภารกิจ ไวยากรณ์
                  ท่านจะต้องพาลูกเรือมา ทบทวน ความรู้ก่อนทุกครั้ง
                </span>
                <!-- FILL IN THE BLANK -->
                <span v-else-if="currentPractice.practicetype == 'fillintheblank'">
                  กัปตันครับ
                  ให้ลูกเรือเตรียมพร้อมทำภารกิจเติมคำในช่องว่าง
                </span>
                <!-- PHONICS LESSON -->
                <span v-else-if="currentPractice.practicetype == 'phonicslesson'">
                  เรียนการออกเสียง ต้องเรียนให้ครบทุกอัน
                  เพื่อทำแบบฝึกหัดนะ
                </span>
                <!-- SPELLING BEE -->
                <span v-else-if="currentPractice.practicetype == 'spelling bee'">
                  กัปตัน เราจะทำภารกิจ สะกดคำศัพท์
                  จะให้ลูกเรือใส่หูฟังหรือไม่ก็ได้ ขึ้นอยู่กับท่าน
                </span>
                <!-- READING -->
                <span
                  v-else-if="currentPractice.practicetype == 'readingspeaking'"
                >กัปตัน อย่าลืมให้ลูกเรืออ่านออกเสียงประโยคพร้อมกันนะ</span>
                <span v-else-if="currentPractice.practicetype == 'readingmulti'">
                  กัปตันครับ เราจะให้ลูกเรือทำภารกิจ อ่านจับใจความ
                  ถ้าลูกเรือพร้อมแล้ว กัปตันกดทำภารกิจได้เลยครับ
                </span>
                <span v-else-if="currentPractice.practicetype == 'readingfillin'">
                  กัปตันครับ เราจะให้ลูกเรือทำภารกิจ อ่านจับใจความ
                  ถ้าลูกเรือพร้อมแล้ว กัปตันกดทำภารกิจได้เลยครับ
                </span>
                <!-- MULTIPLE CHOICES -->
                <span v-else-if="currentPractice.practicetype == 'multiplechoices'">
                  กัปตันครับ เราจะทำภารกิจ เลือกคำศัพท์
                  ลูกเรือทุกคนพร้อมลุยแล้วครับ
                </span>

                <span
                  v-else-if="
                    currentPractice.practicetype ==
                      'multiplechoice(answersound)' ||
                      currentPractice.practicetype ==
                        'multiplechoice(questionsound)'
                  "
                >
                  กัปตันครับ...
                  ภารกิจนี้จำเป็นต้องให้ลูกเรือใส่หูฟังในการทำภารกิจนะครับ
                  กัปตันช่วยสั่งการด้วยนะครับ
                </span>
                <!-- TRANSLATION -->
                <span
                  v-else-if="currentPractice.practicetype == 'translation'"
                >ให้ลูกเรือแปลประโยคภาษาไทยเป็นภาษาอังกฤษ</span>
                <!-- PHONICS MULTIPLE CHOICES -->

                <span
                  v-else-if="
                    currentPractice.practicetype == 'multiplechoices' &&
                      currentPractice.skill == 'Phonics'
                  "
                >
                  กัปตันครับ
                  ภารกิจที่แล้วเราเรียนรู้หลักการออกเสียงมาแล้วถึงเวลาที่ลูกเรือจะได้รับการฝึกฝีมือแล้วครับ...
                </span>

                <span
                  v-else-if="
                    currentPractice.practicetype == 'multiplechoices' ||
                      currentPractice.practicetype ==
                        'multiplechoice(answersound)' ||
                      (currentPractice.practicetype ==
                        'multiplechoice(questionsound)' &&
                        currentPractice.skill == 'Phonics')
                  "
                >
                  กัปตันครับ...
                  ภารกิจนี้จำเป็นต้องให้ลูกเรือใส่หูฟังในการทำภารกิจนะครับกัปตันช่วยสั่งการด้วยนะครับ
                </span>
                <!-- LANGUAGE TIPS -->
                <span v-else-if="currentPractice.practicetype == 'languagetips'">
                  กัปตันครับ... ถ้าเจอสัญลักษณ์
                  <q-btn icon="fas fa-volume-up" round flat class="bg3 text-white" />
                  <span class="q-pl-sm">ให้ลูกเรือออกเสียงตามด้วยนะครับ</span>
                </span>
                <!-- GRAMMAR ACTION -->
                <span v-else-if="currentPractice.practicetype == 'grammaraction'">
                  กัปตันครับ เราจะพาลูกเรือทำภารกิจ ถามตอบไวยากรณ์
                  กัปตันพร้อมที่จะให้ลูกเรือทำภารกิจหรือยังครับ
                </span>
                <!-- FLASHCARD -->
                <span v-else-if="currentPractice.practicetype == 'flashcard'">
                  กัปตันเราจะพาลูกเรือเรียนคำศัพท์ใหม่
                  กัปตันอย่าลืมให้ลูกเรือออกเสียงด้วยนะครับ
                </span>
                <!-- REVIEW VOCAB -->
                <span v-else-if="currentPractice.practicetype == 'review vocab'">
                  กัปตันครับ ก่อนที่ท่านและลูกเรือจะเริ่มทำภารกิจ คำศัพท์
                  ท่านจะต้องพาลูกเรือมา ทบทวน ความรู้ก่อนทุกครั้ง
                </span>
                <span
                  v-else-if="currentPractice.practicetype == 'roleplay'"
                >กัปตันพร้อมจะพาลูกเรือ ทำภารกิจ หรือยังครับ?</span>

                <span v-else-if="currentPractice.practicetype == 'speaking'">
                  กัปตันครับ... เปิดหนังสั้นให้ลูกเรือดูพร้อมกัน
                  เพื่อนำไปตอบคำถาม ในภารกิจถัดไป
                </span>
              </span>
            </div>

            <div align="right" class="col-2 q-px-lg q-py-lg self-end" style="width:220px">
              <q-btn
                icon="fas fa-star"
                :label="
                  currentPractice.practicetype.includes('review')
                    ? 'เริ่มทบทวน'
                    : 'ทำภารกิจ'
                "
                class="bg6 color3 q-pa-xs shadow-5 text-h6 animated tada infinite"
                style="animation-duration:1.5s;"
                :disable="isClickStartMission"
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
      isClickStartMission: false,
      totalPractice: this.$q.localStorage.getItem("totalPractice"),
      positionPractice: this.$q.localStorage.getItem("positionOfPractice"),
      urlImgShow:
        "sign" +
        this.$q.localStorage.getItem("totalPractice") +
        "-" +
        this.$q.localStorage.getItem("positionOfPractice") +
        ".png",
      practiceWorld: this.decrypt(
        this.$q.localStorage.getItem("currentWorld"),
        2
      ),

      activeType: "ready",
      talking: {
        title:
          "Unit " +
          this.decrypt(this.$q.localStorage.getItem("currentUnit"), 2), // สถานะการพูดคุย : เตรียมเรียน
        content: "ถ้าตั้งใจคะแนนพิเศษได้แน่นอน รอลุ้นกัน",
      },

      isActiveMainLabel: true,
      isActiveMainTalk: true,
      isActiveMainCharactor: true,

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง

      isLoadData: false,
      isloadUnit: false,
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      practiceType: this.$q.localStorage.getItem("practiceType"),
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      missionScore: 0,
    };
  },
  methods: {
    async goToLearn() {
      // ปุ่มเข้าสู่เนื้อหา
      let date = await this.getDateAndTime();
      let data = this.currentPractice;
      this.isClickStartMission = true;
      this.loadingShow();
      let updateData = {
        level: data.level,
        unit: data.unit,
        practiceKey: data.practiceKey,
        practicetype: data.practicetype,
        skill: data.skill,
        currentPage: data.practicetype,
        readingContentKey: "",
        date: date,
        currentQuestion: 0,
        page: "1",
        order: data.order,
      };
      let totalPassedPractice = this.$q.localStorage.getItem(
        "totalPassedPractice"
      );
      if (this.currentPractice.practicetype == "review vocab") {
        // TODO : ไม่รวมทบทวน unit ตัวเอง
        // หากเป็น แบบฝึกหัดทบทวน Vocabulary ต้องค้นหาว่า Multiplechoices ของ Vocabulary ใดที่ทำไปแล้วบ้าง ส่งเป็น Array ไปในชื่อ reviewKey
        // ต้องหาก่อนว่า Flashcard เรียน Unit ไหนไปแล้ว แล้วเอา เลขunit มาเป็น array
        let findFlashcardUnit = totalPassedPractice
          .filter(
            (x) =>
              x.skill == "Vocabulary" &&
              x.practiceType == "flashcard" &&
              x.level ==
                this.decrypt(this.$q.localStorage.getItem("currentLevel"), 2) &&
              x.term == this.currentTerm &&
              x.year == this.currentYear &&
              x.unit != this.currentPractice.unit
          )
          .map((e) => e.unit);

        // UNIT ของ Flashcard ที่ผ่านมาแล้วทั้งหมด
        let flashcardUnitSet = [...new Set(findFlashcardUnit)];

        let findPracticeKey = this.decrypt(
          this.$q.localStorage.getItem("practiceList"),
          1
        )
          .filter((x) => {
            return (
              x.skill == "Vocabulary" &&
              x.practicetype == "multiplechoices" &&
              flashcardUnitSet.includes(x.unit)
            );
          })
          .map((e) => {
            return e.practiceKey;
          });

        updateData.reviewKey = findPracticeKey;
        updateData.reviewUnit = flashcardUnitSet;
        this.$q.localStorage.set("reviewKey", findPracticeKey);
        this.$q.localStorage.set("reviewUnit", flashcardUnitSet);
      } else if (this.currentPractice.practicetype == "review grammar") {
        // หากเป็นแบบฝึกหัดทบทวน Grammar ต้องค้นหา Key ของ multiplechoices grammar ที่เคยทำมาแล้ว ไปทบทวน
        // TODO : ไม่รวมทบทวนunitตัวเอง

        let findGrammarLessonUnit = totalPassedPractice
          .filter(
            (x) =>
              (x.skill =
                "Grammar" &&
                x.practiceType == "grammarlesson" &&
                x.level ==
                  this.decrypt(
                    this.$q.localStorage.getItem("currentLevel"),
                    2
                  ) &&
                x.term == this.currentTerm &&
                x.year == this.currentYear) &&
              x.unit != this.currentPractice.unit
          )
          .map((e) => e.unit);
        let findPracticeKey = this.decrypt(
          this.$q.localStorage.getItem("practiceList"),
          1
        )
          .filter(
            (x) =>
              x.skill == "Grammar" &&
              x.practicetype == "multiplechoices" &&
              findGrammarLessonUnit.includes(x.unit)
          )
          .map((e) => e.practiceKey);
        // console.log(findPracticeKey);
        updateData.reviewKey = findPracticeKey;
        updateData.reviewUnit = findGrammarLessonUnit;
        this.$q.localStorage.set("reviewKey", findPracticeKey);
        this.$q.localStorage.set("reviewUnit", findGrammarLessonUnit);
      }

      if (data.practicetype == "readingspeaking") {
        let readingPracticeKey = this.decrypt(
          this.$q.localStorage.getItem("practiceList"),
          1
        ).filter(
          (x) =>
            x.unit == data.unit && x.skill == "Reading" && x.order > data.order
        )[0].practiceKey;

        updateData.readingContentKey = readingPracticeKey;
      }

      // if (data.practicetype == "grammaraction") {
      let filterWhere =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear +
        "-" +
        data.practiceKey;
      // กรณีเป็น แบบฝึกหัด ต้องเข้าไป Reset ข้อมูลการทำแบบฝึกหัดของนักเรียนในกรณี เข้ามาทำทีหลัง
      db.collection("studentpracticelog")
        // .where("filter", "==", filterWhere)
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get()
        .then((doc) => {
          // กรณีพบว่าได้เคยทำ หรือ นักเรียนมีข้อมูลแบบฝึกหัดนี้อยู่แล้ว ให้ทำการลบข้อมูลนั้นๆออก
          if (doc.size) {
            let counter = 0;
            doc.forEach((element) => {
              // console.log("LOOP");
              db.collection("studentpracticelog")
                .doc(element.id)
                .delete()
                .then(() => {
                  // console.log("DELETED");
                  counter++;
                  if (counter == doc.size) {
                    db.collection("synchronize")
                      .doc(this.teacherData.key)
                      .update(updateData)
                      .then(() => {
                        this.loadingHide();
                        this.teacherPracticeRouter(data.practicetype, 2);
                      });
                  }
                });
            });
          } else {
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update(updateData)
              .then(() => {
                this.loadingHide();
                this.teacherPracticeRouter(data.practicetype, 2);
              });
          }
        });
    },

    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    },
    async getTalking() {
      this.loadingShow();
      let getPracticeName = this.$q.localStorage.getItem("practiceListName")
        .name;

      let showTitle = `${this.showSkillName(
        this.currentPractice.skill
      )} : บทที่ ${this.currentPractice.unit}  ${getPracticeName.replace(
        /:/g,
        " "
      )}`;

      this.talking.title = showTitle;

      // CONTENT ต้องสร้างคำ
      if (this.currentPractice.practicetype == "flashcard") {
        this.talking.content = "พานักเรียนท่องศัพท์ ออกเสียงด้วยกันนะ";
      } else if (this.currentPractice.practicetype == "grammarlesson") {
        // this.talking.content =
        //   "เข้าเรียน<span style='color:#8116E;border:1px solid red;border-radius:15px;width:fit-content;padding:5px'>new</span>ให้ครบเพื่อทำแบบฝึกหัดนะ";
      } else {
        this.talking.content = "ยังไม่ได้ตั้ง";
      }
      let imgPracticeURL = this.urlImgShow;

      if (
        this.currentPractice.practicetype == "review grammar" ||
        this.currentPractice.practicetype == "review vocab"
      ) {
        imgPracticeURL = "review-board.png";
      }

      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          imgPracticeURL: imgPracticeURL,
        })
        .then(() => {
          this.loadingHide();
        });
    },
    chooseLessonType() {
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "studyplan",
        })
        .then(() => {
          this.$router.push("/teacher/studyplan");
        });
    },
  },
  created() {
    this.getTalking();
    this.$q.localStorage.remove("finishClicked");
    this.$q.localStorage.remove("enterPracticeTime");
    this.$q.localStorage.remove("timerMin");
    this.$q.localStorage.remove("timerSec");
    this.$q.localStorage.remove("countdownMin");
    this.$q.localStorage.remove("countdownSec");
    this.$q.localStorage.set("isExtraTime", false);
  },
  mounted() {
    // this.loadScoreMission();
    // console.log("LOAD SCORE MISSION");
  },
};
</script>
