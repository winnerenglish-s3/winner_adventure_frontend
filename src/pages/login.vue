<template>
  <div class>
    <q-resize-observer @resize="onResize" />

    <div
      class="bg-login relative-position animated fadeIn orientation-landscape"
      v-if="innerWidth > 899"
    >
      <waterWave></waterWave>
      <div class="boxlogin q-pa-md">
        <!-- LOGO -->
        <div class="row justify-center q-pb-sm q-mt-lg">
          <div align="center" class="col-8">
            <img src="../statics/logo.png" style="max-width:650px;width:100%;" alt />
          </div>
        </div>

        <!-- LOGIN CONTAINER -->
        <div
          class="bg3 text-white q-pt-lg q-px-md q-pb-md"
          style="max-width:300px;width:95%;margin:auto;border-radius:5px"
        >
          <div class="row">
            <!-- USERNAME -->
            <div class="col-12">
              <q-input
                dense
                v-model="username"
                label="รหัสผู้ใช้งาน"
                style="border-radius:5px"
                class="bg-white q-px-md"
                borderless
              ></q-input>
            </div>
            <!-- PASSWORD -->
            <div class="col-12 q-mt-md">
              <q-input
                dense
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="รหัสผ่าน"
                style="border-radius:5px"
                class="bg-white q-px-md"
                @keydown.enter="login()"
                borderless
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <!-- RADIO SELECTION -->
            <div class="col-12 row q-my-md">
              <div class="col-6">
                <q-radio
                  keep-color
                  color="white"
                  class="text-white"
                  v-model="userType"
                  val="นักเรียน"
                  label="นักเรียน"
                />
              </div>
              <div class="col-6" align="center">
                <q-radio
                  keep-color
                  color="white"
                  class="text-white"
                  v-model="userType"
                  val="คุณครู"
                  label="คุณครู"
                />
              </div>
            </div>
            <!-- LOGIN BTN -->
            <div class="col-12">
              <q-btn
                @click="login()"
                class="bg6 text-black"
                label="เข้าสู่ระบบ"
                style="width:100%"
                :disable="isCheckData"
              ></q-btn>
            </div>
            <div class="col-12 q-mt-md" align="center">
              <a
                @click="forgetPassword()"
                class="text-white cursor-pointer"
                style="text-decoration:underline;font-size:13px;"
              >ลืมรหัสเข้าสู่ระบบ</a>
            </div>
          </div>
        </div>
      </div>

      <!-- VERSION -->
      <div class="fixed-bottom-right q-pa-sm color3 z-top">v {{ version }}</div>

      <dialog-check-login
        v-if="isDialogPopup"
        :propsData="sendDataDialog"
        @dataclose="val => closePopupFunction(val)"
      ></dialog-check-login>
    </div>

    <not-mobile class="orientation-landscape" v-else />
    <not-landscape class="z-top orientation-portrait" />
  </div>
</template>

<script>
import waterWave from "../components/waterWave.vue";
import { db } from "../router/index.js";
import dialogCheckLogin from "../components/dialogchecklogin.vue";
import notLandscape from "../components/notLandscape.vue";
import notMobile from "../components/notMobile.vue";
export default {
  components: {
    waterWave,
    dialogCheckLogin,
    notLandscape,
    notMobile
  },
  data() {
    return {
      isPwd: true,
      username: "",
      password: "",
      userType: "นักเรียน",

      sendDataDialog: {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: ""
      },
      isForgetPassword: false,
      isDialogPopup: false,
      isCheckData: false,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
  },
  methods: {
    closePopupFunction(val) {
      if (
        val.type == "checkTeacherLogin" ||
        (val.type == "forgetPassword" && !val.reFunction)
      ) {
        this.isDialogPopup = false;
        this.isCheckData = false;
      }

      if (val.type == "passwordIncorrect" && val.reFunction) {
        this.isDialogPopup = false;

        setTimeout(() => {
          this.forgetPassword();
        }, 1);
      } else {
        this.isDialogPopup = false;
        this.isCheckData = false;
      }

      this.sendDataDialog = {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: ""
      };
    },
    forgetPassword() {
      this.isDialogPopup = true;

      this.sendDataDialog.type = "forgetPassword";
      this.sendDataDialog.title = "ลืมรหัสผ่านสู่ระบบ";
      this.sendDataDialog.btn1 = "ตกลง";
      this.sendDataDialog.icon = "fas fa-unlock-alt";
    },
    async login() {
      this.loadingShow();
      this.isCheckData = true;

      let getTermAndYear = await this.getTermAndYear();

      if (this.userType == "นักเรียน") {
        // Login นักเรียน
        db.collection("student")
          .where("user", "==", this.username)
          .where("password", "==", this.password)
          .where("term", "==", getTermAndYear.term)
          .where("year", "==", getTermAndYear.year)
          .get()
          .then(async doc => {
            if (doc.size) {
              let studentData = doc.docs[0].data();
              delete studentData.password;
              this.$q.localStorage.set("sk", doc.docs[0].id);

              studentData.classRoom = studentData.classRoom
                .replace("p", "ป.")
                .replace("m", "ม.");

              let checkSync = await db
                .collection("synchronize")
                .where("schoolKey", "==", studentData.schoolKey)
                .where("class", "==", studentData.classRoom)
                .where("room", "==", studentData.room)
                .where("status", "==", "online")
                .get();

              if (checkSync.size == 0) {
                this.loadingHide();
                this.sendDataDialog.type = "checkTeacherLogin";
                this.sendDataDialog.title = "ไม่สามารถเข้าสู่ระบบได้";
                this.sendDataDialog.btn1 = "ลองใหม่";
                this.sendDataDialog.icon = "far fa-times-circle";
                this.isDialogPopup = true;
                return;
              }

              db.collection("student")
                .doc(doc.docs[0].id)
                .update({
                  status: "offline"
                })
                .then(() => {
                  db.collection("student")
                    .doc(doc.docs[0].id)
                    .update({
                      status: "online"
                    })
                    .then(() => {
                      this.$router.push("/student/waiting");
                      this.loadingHide();
                    });
                });
            }
            // NOTE กรณี doc size > 1 ให้แจ้งเตือนว่า ลงทะเบียนผิดพลาด กรุณาติดต่อ
            else {
              this.loadingHide();

              this.sendDataDialog.type = "passwordIncorrect";
              this.sendDataDialog.title = "รหัสผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง";
              this.sendDataDialog.btn1 = "ลองใหม่";
              this.sendDataDialog.btn2 = "ลืมรหัสเข้าสู่ระบบ";
              this.sendDataDialog.icon = "far fa-times-circle";
              this.isDialogPopup = true;
            }
          });
      } else {
        // Login ครู
        db.collection("teacher")
          .where("userName", "==", this.username)
          .where("password", "==", this.password)
          .get()
          .then(async doc => {
            // REMARK ป้องกันการลงทะเบียนซ้ำ doc size > 1 เป็นการลงทะเบียนผิดพลาด
            if (doc.size) {
              // Username และ Password ถูกต้อง
              let newData = doc.docs[0].data();
              newData.key = doc.docs[0].id;
              this.$q.localStorage.set("tk", newData.key);

              db.collection("teacher")
                .doc(doc.docs[0].id)
                .update({
                  status: "offline"
                })
                .then(() => {
                  db.collection("teacher")
                    .doc(doc.docs[0].id)
                    .update({
                      status: "online"
                    })
                    .then(() => {
                      this.loadingHide();
                      // ไปหน้าเลือกห้องเรียน
                      this.$router.push("/teacher/classroom");
                    });
                });
            } else {
              // Username / Password ผิดพลาด
              this.loadingHide();
              this.sendDataDialog.type = "passwordIncorrect";
              this.sendDataDialog.title = "รหัสผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง";
              this.sendDataDialog.btn1 = "ลองใหม่";
              this.sendDataDialog.btn2 = "ลืมรหัสเข้าสู่ระบบ";
              this.sendDataDialog.icon = "far fa-times-circle";
              this.isDialogPopup = true;
            }
          });
      }
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  mounted() {
    this.$q.localStorage.clear();
  }
};
</script>

<style>
.boxlogin {
  position: relative;
  z-index: 200;
}
</style>
