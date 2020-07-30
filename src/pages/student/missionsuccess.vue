<template>
  <q-page
    class="row"
    :class="
      isLoadData
        ? 'bg5 flex flex-center'
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
      <q-spinner-facebook color="deep-orange-10" size="100" />
    </div>

    <!-- SECTION  score 1 -->
    <div class="col-12 row" v-if="!isLoadData">
      <div class="col self-center relative-position" align="center">
        <div style="max-width:900px;width:85%;">
          <q-img
            src="../../statics/main/practice/score_finish.png"
            style="max-width:1500px;width:100%;"
          >
            <div
              class="absolute-bottom-right bg-transparent"
              style="right:15px;width:calc(100% - 20%);height:calc(100% - 40%);transform:rotate(-.5deg);"
            >
              <div class="color3" style="font-size:3.5vw;width:calc(100% - 90px);">
                <div class="border3-md bg1 br-a-sm q-py-xs">
                  <span class="text-bold">
                    {{
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ"
                    ? " ระดับ "
                    : " ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>
                </div>
              </div>
            </div>
            <div
              class="relative-position absolute-bottom bg-transparent"
              style="height:calc(100% - 67%);transform:rotate(-.5deg)"
            >
              <div class="absolute-center full-width" style>
                <div>
                  <span class="text-bold" style="font-size:5vw">ภารกิจสำเร็จ</span>
                </div>
              </div>
            </div>

            <div
              class="absolute-bottom bg-transparent"
              style="height:calc(100% - 25%);width:calc(100% - 87%);"
            >
              <div class="absolute-left">
                <img
                  :src="
                    '../../statics/coins/sh' + missionCurrent.level + '.png'
                  "
                  style="width:258.5%;"
                  v-if="missionCurrent.name == 'เรือ'"
                />
                <img
                  :src="'../../statics/coins/f' + missionCurrent.level + '.png'"
                  style="width:258.5%;"
                  v-if="missionCurrent.name == 'คู่หู'"
                />
                <img
                  :src="'../../statics/coins/t' + missionCurrent.level + '.png'"
                  style="width:258.5%;"
                  v-if="missionCurrent.name == 'สมบัติ'"
                />
              </div>
            </div>
          </q-img>
        </div>

        <div style="height:230px;"></div>
      </div>

      <div class="self-end col-lg-4 col-xs-5">
        <div align="center">
          <q-img
            src="../../statics/buddy/friend0.png"
            style="max-width:700px;width:80%;"
            v-if="studentData.buddy == null"
          ></q-img>
          <q-img
            :src="
              '../../statics/buddy/friend' + studentData.buddy.level + '.png'
            "
            style="max-width:700px;width:80%;"
            v-else
          ></q-img>
          <div style="height:100px;"></div>
        </div>
      </div>
      <div class="col-12 z-top absolute-bottom" style="overflow:hidden;">
        <transition
          appear
          enter-active-class="animated fadeInUp duration-talk-in"
          leave-active-class="animated fadeOutDown duration-talk-out"
          v-if="isActiveMainTalk"
        >
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md" align="left">
            <div class="q-pa-md relative-position" style="font-size:calc(17px + .5vw)">
              <span
                class="q-pa-md"
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
              >
                <!-- NOTE : Buddy level 0 -->
                <span v-if="studentData.buddy == null">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "สุดยอดเลย!!! เธอทำภารกิจสำเร็วแล้ว เรือของเธอจะเปลื่ยนเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "สุดยอดเลย!!! เธอทำภารกิจสำเร็วแล้ว คู่หูใหม่ของเธอคือ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else>
                    {{
                    "สุดยอดเลย!!! เธอทำภารกิจสำเร็วแล้ว และนี้คือ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ของเธอ"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 1 -->
                <span v-else-if="studentData.buddy.level == '1'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "โอ้..เย้..เย้.. ขอมอบเพลงนี้ให้แก่ความสำเร็จ เรือของน้องๆ จะเปลี่ยนเป็น" +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "โอ้..เย้..เย้.. ขอมอบเพลงนี้ให้แก่ความสำเร็จ คู่หูใหม่ของน้องๆ จะเปลี่ยนเป็น" +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else>
                    {{
                    "โอ้..เย้..เย้.. ขอมอบเพลงนี้ให้แก่ความสำเร็จ และนี้คือ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ของน้องๆ"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 2 -->
                <span v-else-if="studentData.buddy.level == '2'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "โอ้โห!! เจ้าเด็กพวกนี้สามัคคีกันดีนิ เป้าหมายสำเร็จจนได้... ไม่น่าเชื่อ!! เรือของเจ้าเปลี่ยนเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " แล้ว"
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "โอ้โห!! เจ้าเด็กพวกนี้สามัคคีกันดีนิ เป้าหมายสำเร็จจนได้... ไม่น่าเชื่อ!! คู่หูใหม่ของเจ้าเปลี่ยนเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ของเจ้าไปได้เลย"
                    }}
                  </span>

                  <span v-else>
                    {{
                    "โอ้โห!! เจ้าเด็กพวกนี้สามัคคีกันดีนิ เป้าหมายสำเร็จจนได้... ไม่น่าเชื่อ!! รับ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ของเจ้าไปได้เลย"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 3  -->
                <span v-else-if="studentData.buddy.level == '3'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "เพราะเธอสามัคคีกัน จึงทำเป้าหมายได้สำเร็จ ฉันจะเปลี่ยนเรือของเธอให้เป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "เพราะเธอสามัคคีกัน จึงทำเป้าหมายได้สำเร็จ ฉันจะเปลี่ยนคู่หูใหม่ของเธอให้เป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else>
                    {{
                    "เพราะเธอสามัคคีกัน จึงทำเป้าหมายได้สำเร็จ ฉันขอมอบ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ให้กับเธอ"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 4 -->
                <span v-else-if="studentData.buddy.level == '4'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "เก่งมากเลย โฮ่ง... มนุษย์ทำได้ดีมาก เจ้ามีเรือ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ไว้ใช้แล้ว โฮ่ง โฮ่ง~"
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "เก่งมากเลย โฮ่ง... มนุษย์ทำได้ดีมาก เจ้าจะมีคู่หูใหม่เป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " โฮ่ง โฮ่ง~"
                    }}
                  </span>

                  <span v-else>
                    {{
                    "เก่งมากเลย โฮ่ง... มนุษย์ทำได้ดีมาก และนี้คือ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ที่เจ้าตามหา โฮ่ง โฮ่ง~"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 5 -->
                <span v-else-if="studentData.buddy.level == '5'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "ก็ทำได้ดีนิ... เพราะพวกเจ้าช่วยเหลือกัน จึงสำเร็จได้ ข้าจะเปลี่ยนเรือของเจ้าให้เป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "ก็ทำได้ดีนิ... เพราะพวกเจ้าช่วยเหลือกัน จึงสำเร็จได้ ดีใจด้วยคู่หูใหม่ของเจ้าคือ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else>
                    {{
                    "ก็ทำได้ดีนิ... เพราะพวกเจ้าช่วยเหลือกัน จึงสำเร็จได้ ข้าให้ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " เป็นรางวัลเจ้านะ... สหาย"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 6 -->
                <span v-else-if="studentData.buddy.level == '6'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "ความสำเร็จของเจ้าไม่ใช่กลใดแน่ๆ นอกจากความสามัคคี เรือของเจ้าจงเปลี่ยนเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "ความสำเร็จของเจ้าไม่ใช่กลใดแน่ๆ นอกจากความสามัคคี เจ้าจะมีคู่หูใหม่เป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else>
                    {{
                    "ความสำเร็จของเจ้าไม่ใช่กลใดแน่ๆ นอกจากความสามัคคี รับ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ของเจ้าไปซิ"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 7 -->
                <span v-else-if="studentData.buddy.level == '7'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "เก่งจังเลย... ยังไงก็ขอให้ทำได้ดีแบบนี้ต่อไปนะ... ฉันจะเปลี่ยนเรือของเธอเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "เก่งจังเลย... ยังไงก็ขอให้ทำได้ดีแบบนี้ต่อไปนะ... ฉันจะเปลี่ยนคู่หูใหม่ของเธอเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else>
                    {{
                    "เก่งจังเลย... ยังไงก็ขอให้ทำได้ดีแบบนี้ต่อไปนะ... ฉันขอมอบ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " เป็นรางวัล"
                    }}
                  </span>
                </span>

                <!-- NOTE : BUddy level 8 -->
                <span v-else-if="studentData.buddy.level == '8'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "เจ้าลูกเรือทำได้ดีมาก หนทางข้างหน้ายังรออยู่ จงรับ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ของเจ้าไป"
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "เจ้าลูกเรือทำได้ดีมาก หนทางข้างหน้ายังรออยู่ เจ้าจะได้เปลี่ยนคู่หูใหม่เป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else>
                    {{
                    "เจ้าลูกเรือทำได้ดีมาก หนทางข้างหน้ายังรออยู่ จงรับ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " ของเจ้าไป"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 9 -->
                <span v-else-if="studentData.buddy.level == '9'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "ฮึฮึ~ เจ้าก็เก่งนิ ถ้าอย่างนั้น ข้าจะเสกให้เรือของเจ้ากลายเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "ฮึฮึ~ เจ้าก็เก่งนิ ถ้าอย่างนั้น ข้าจะเสกคู่หูใหม่ใหกันเจ้า จากนี้คู่หูของเจ้าคือ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level
                    }}
                  </span>

                  <span v-else>
                    {{
                    "ฮึฮึ~ เจ้าก็เก่งนิ ถ้าอย่างนั้น ข้าจะเสกสมบัติให้เจ้าหนึ่งชิ้น รับ " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " นี่ไปซะ"
                    }}
                  </span>
                </span>

                <!-- NOTE : Buddy level 10 -->
                <span v-else-if="studentData.buddy.level == '10'">
                  <span v-if="missionCurrent.name == 'เรือ'">
                    {{
                    "เจ้าทำภารกิจสำเร็จแล้วรึ.. เรือของเจ้าเปลี่ยนเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " แล้วด้วยอย่างนั้นรึ...."
                    }}
                  </span>

                  <span v-else-if="missionCurrent.name == 'คู่หู'">
                    {{
                    "เจ้าทำภารกิจสำเร็จแล้วรึ.. คู่หูใหม่ของเจ้าเปลี่ยนเป็น " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " แล้วด้วยอย่างนั้นรึ...."
                    }}
                  </span>

                  <span v-else>
                    {{
                    "เจ้าทำภารกิจสำเร็จแล้วรึ.. เจ้ามี " +
                    missionCurrent.name +
                    (missionCurrent.name != "สมบัติ" ? "ระดับ " : "ชิ้นที่ ") +
                    missionCurrent.level +
                    " แล้วด้วยอย่างนั้นรึ...."
                    }}
                  </span>
                </span>
              </span>
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
      practiceWorld: "",
      practiceKey: "",
      practiceType: "",
      shipSkill: null,
      currentPage: null,
      scoreWorld: 0,
      score: 0,
      missionCurrent: this.decrypt(
        this.$q.localStorage.getItem("currentMission"),
        1
      ),
      isActiveMainTalk: true,
      isLoadData: false,
      isLoadScore: true,

      snapSync: "",
      setCount: "",

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  },
  methods: {
    loadScore() {
      if (this.isLoadData) {
        return;
      }

      this.isLoadData = true;

      if (this.$q.localStorage.has("lastPracticeLog")) {
        let getScore = this.$q.localStorage.has("lastPracticeLog")
          ? this.decrypt(this.$q.localStorage.getItem("lastPracticeLog"), 1)
              .correct
          : 0;

        if (this.practiceWorld == "Writing") {
          this.score = Math.ceil(getScore / 4);
        } else {
          this.score = getScore;
        }

        this.shipSkill =
          this.studentData.ship == null
            ? 0
            : Number(this.studentData.ship.skill);

        if (this.shipSkill != 0) {
          let finisScore = this.score + this.shipSkill;
          setTimeout(() => {
            for (let i = 0; i < this.shipSkill; i++) {
              this.score++;
            }
          }, 2150);
        }
      } else {
        this.score = 0;
      }

      this.isLoadScore = false;
    },
    loadSynchronize() {
      this.snapSync = db
        .collection("synchronize")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        .where("room", "==", this.studentData.room)
        .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          this.practiceWorld = doc.docs[0].data().skill;
          this.currentPage = doc.docs[0].data().currentPage;
          this.practiceType = doc.docs[0].data().practicetype;

          if (this.currentPage == "finish-world") {
            this.scoreWorld = doc.docs[0].data().summaryWorld.filter(x => {
              return x.key == this.studentData.key;
            })[0].totalScore;
          }

          if (!this.isLoadScore) {
            this.loadScore();
          }
        });
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  created() {
    this.loadSynchronize();
  },
  beforeDestroy() {
    this.snapSync();
  }
};
</script>

<style lang="scss" scoped>
.duration-talk-in {
  animation-duration: 0.5s;
}

.duration-talk-out {
  animation-duration: 1s;
}

.slideDownAnimated {
  animation-name: slideDown;
  animation-delay: 1.5s;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  top: 0%;
  left: 32.5%;
  transform: translate(-7%, -60%);
  -webkit-transform: translate(-7%, -60%);
  opacity: 0;
}

@keyframes slideDown {
  0% {
    top: 0%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 0;
  }

  10% {
    top: 0%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 0.5;
  }

  40% {
    top: 0%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 1;
  }

  50% {
    top: 0%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 1;
  }
  90% {
    top: 0%;
    transform: translate(-7%, -0%);
    -webkit-transform: translate(-7%, -0%);
    opacity: 1;
  }

  99% {
    opacity: 0.5;
  }

  100% {
    top: 0%;
    transform: translate(-7%, -0%);
    -webkit-transform: translate(-7%, -0%);
    opacity: 0;
  }
}
</style>
