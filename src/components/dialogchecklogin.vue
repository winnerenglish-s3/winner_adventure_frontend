<template>
  <div>
    <q-dialog v-model="isTeacherUseSystem" persistent content-class="backdrop">
      <q-card
        class="bg-transparent shadow-0 q-px-md color1"
        style="border-radius:15px;max-width:450px;width:100%;"
      >
        <q-card-section class="bg3" align="center">
          <div class="q-pa-md q-mt-md" v-if="propsData.type != 'finishLearning'">
            <q-icon :name="propsData.icon" size="100px"></q-icon>
          </div>
          <div class="q-pa-md q-mt-md row" v-else>
            <div class="col self-end relative-position" style align="right">
              <q-icon
                class="color6 absolute-bottom-right"
                style="right:-10px"
                :name="propsData.icon"
                size="55px"
              ></q-icon>
            </div>
            <div class="col self-end relative-position" style>
              <q-icon class="color6" :name="propsData.icon" size="100px"></q-icon>
            </div>
            <div class="col self-end relative-position" style align="left">
              <q-icon
                class="color6 absolute-bottom-left"
                style="left:-10px"
                :name="propsData.icon"
                size="55px"
              ></q-icon>
            </div>
          </div>

          <div class="q-my-sm">
            <span class="text-h6">{{propsData.title}}</span>
          </div>
        </q-card-section>

        <q-card-section class="bg5 color3 text-body2">
          <div class="q-pa-md q-mt-md" v-if="propsData.type == 'checkTeacherLogin'" align="center">
            <span>รอคุณครูเข้าสู่ระบบก่อนนะ</span>
          </div>
          <div class="q-pa-md q-mt-md" v-if="propsData.type == 'passwordIncorrect'" align="center">
            <span>กรุณาตรวจสอบ รหัสผู้ใช้งาน/รหัาผ่าน อีกครั้ง</span>
          </div>
          <div class="q-pa-md q-mt-md" v-if="propsData.type == 'forgetPassword'">
            <span>คุณครู : ติดต่อผู้ประสานงานโรงเรียน โทร 084-323-2206</span>
            <div class="q-py-sm"></div>
            <span>นักเรียน : ติดต่อคุณครูผู้สอน</span>
          </div>
          <div
            class="q-pa-md q-mt-md"
            v-if="propsData.type == 'hasStudentOrTeacher'"
            align="center"
          >
            <span>หากคุณไม่ได้เข้าใช้ระบบจากเครื่องอื่น</span>
            <div class="q-py-xs"></div>
            <span>กรุณาติดต่อคุณครูเพื่อเปลื่ยนรหัสผ่าน</span>
          </div>
          <div
            class="q-pa-md q-mt-md"
            v-if="propsData.type == 'teacherHasInClassroom'"
            align="center"
          >
            <span>ถ้าคุณเลือก เข้าใช้งาน คุณครูที่ใช้งานห้องปัจจุบันจะถูกบังคับออกจากระบบ</span>
          </div>
          <div class="q-pa-md q-mt-md" v-if="propsData.type == 'grammarLesson'" align="center">
            <span>
              ต้องเรียน
              <q-btn
                dense
                color="red"
                style="border-radius:15px"
                class="no-pointer-events q-px-sm"
                label="new"
              ></q-btn>

              <span
                class="q-pl-sm"
              >ที่เลือกอยู่อีก {{ this.$q.localStorage.getItem('finishGrammarLessonVdo') }} หัวข้อ</span>
            </span>
          </div>

          <div class="q-pa-md q-mt-md" v-if="propsData.type == 'finishLearning'" align="center">
            <span>ขอบคุณสำหรับความร่วมมือ</span>
          </div>

          <div class="q-pa-md q-mt-md" v-if="propsData.type == 'languagetips'" align="center">
            <span>ต้องเรียนครบทุกหัวข้อ เหลืออีก {{ this.$q.localStorage.getItem('finishGrammarLessonVdo') }} หัวข้อที่ต้องเรียน</span>
          </div>

          <div class="q-pa-md q-mt-md" align="center" v-if="propsData.type == 'retryPractice'">
            <span
              class="color3"
            >คุณต้องการทำใหม่อีกครั้งหรือไม่ ระบบจะไม่ทำการบันทึกคะแนนของลูกเรือในรอบนี้</span>
          </div>
          <div class="q-pa-md q-mt-md" align="center" v-if="propsData.type == 'finishMission'">
            <span class="color3">เวลาทำภารกิจเหลือ {{showTimer}} นาที</span>
          </div>

          <div class="q-pa-md q-mt-md" align="center" v-if="propsData.type == 'exitPractice'">
            <span class="color3">
              คุณต้องการจบภารกิจหรือไม่
              <br />คะแนนของลูกเรือจะไม่ถูกบันทึกในรอบนี้
            </span>
          </div>

          <div class="q-pa-md q-mt-md" align="center" v-if="propsData.type == 'teacherLogout'">
            <span class="color3">ลูกเรือจะออกจากระบบด้วย</span>
          </div>

          <!-- finishLearning -->

          <div class="q-pa-md q-mt-lg q-pb-lg" align="center">
            <q-btn
              :label="propsData.btn1"
              class="bg3 color1"
              style="width:70%;"
              @click="[propsData.type == 'teacherHasInClassroom' || propsData.type == 'hasStudentOrTeacher' || propsData.type == 'finishLearning' || propsData.type == 'retryPractice' || propsData.type == 'finishMission' || propsData.type == 'exitPractice' || propsData.type == 'teacherLogout' ? returnFunction() : closePopup()]"
            ></q-btn>
            <q-btn
              v-if="propsData.type == 'passwordIncorrect' || propsData.type == 'teacherHasInClassroom' || propsData.type == 'retryPractice' || propsData.type == 'finishMission' || propsData.type == 'exitPractice' || propsData.type == 'teacherLogout'"
              :label="propsData.btn2"
              class="bg1 color3 q-mt-md"
              style="width:70%;"
              @click="[propsData.type == 'passwordIncorrect' ? returnFunction() : null,propsData.type == 'teacherHasInClassroom' || propsData.type == 'retryPractice' || propsData.type=='finishMission' || propsData.type == 'exitPractice' || propsData.type == 'teacherLogout' ? closePopup() : null]"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["propsData"],
  data() {
    return {
      isTeacherUseSystem: true,
      timerCountDownInterval: "",
      showTimer: "0:0"
    };
  },

  methods: {
    returnFunction() {
      this.isTeacherUseSystem = false;

      setTimeout(() => {
        this.$emit("dataclose", {
          type: this.propsData.type,
          reFunction: true
        });
      }, 500);
    },
    closePopup() {
      this.isTeacherUseSystem = false;

      setTimeout(() => {
        this.$emit("dataclose", {
          type: this.propsData.type,
          reFunction: false
        });
      }, 500);
    }
  },
  mounted() {
    if (this.propsData.type == "finishMission") {
      let i = 0;
      this.timerCountDownInterval = setInterval(() => {
        this.showTimer = `${this.$q.localStorage.getItem(
          "countdownMin"
        )}:${this.$q.localStorage.getItem("countdownSec")}`;
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timerCountDownInterval);
  }
};
</script>

<style lang="scss" scoped>
</style>