<template>
  <q-page style="background-color:#FFE5D2" class="flex flex-center">
    <div style="width:450px" class="bg1">
      <div class="bg3 color6 q-pa-sm text-h5" align="center">ข้อมูลผู้ใช้</div>
      <div class="bg1 q-pa-md">
        <div>
          <q-input
            :value="`${teacherData.name} ${teacherData.surname}`"
            label="ชื่อผู้ใช้งาน"
            outlined
            readonly
            hint
          ></q-input>
        </div>
        <div>
          <q-input hint :value="teacherData.userName" label="เบอร์โทรศัพท์" outlined readonly></q-input>
        </div>

        <div v-if="isChangePassword">
          <div>
            <q-input
              :error="errorCurrentPassword"
              hint
              v-model="oldPassword"
              label="รหัสผ่านปัจจุบัน"
              @click="resetValidation()"
              lazy-rules
              outlined
              ref="currentPassword"
              type="password"
            ></q-input>
          </div>
          <div>
            <q-input
              v-model="newPassword"
              label="รหัสผ่านใหม่"
              :rules="[val => val.length >= 4 || 'ความยามอย่างน้อย 4 ตัวอักษร']"
              lazy-rules
              outlined
              type="password"
              ref="newPassword"
            ></q-input>
          </div>
          <div class="q-pt-xs">
            <q-input
              hint
              v-model="confirmNewPassword"
              :rules="[val => val == newPassword && newPassword.length >= 4 || 'รหัสผ่านใหม่ไม่ตรงกัน']"
              label="ยืนยันรหัสผ่านใหม่"
              outlined
              type="password"
              ref="confirmPassword"
            ></q-input>
          </div>
        </div>
        <div align="center" class="q-mt-md">
          <q-btn
            push
            :label="isChangePassword ? 'บันทึกข้อมูล' : 'เปลื่ยนแปลงรหัสผ่าน'"
            class="bg3 color6 q-py-xs"
            @click="isChangePassword ? saveData() : isChangePassword = true"
          ></q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="showSuccessDialog">
      <q-card style="width:400px">
        <q-card-section class="bg3 q-py-xl">
          <div>
            <div align="center">
              <q-icon name="far fa-check-circle" size="55px" color="white"></q-icon>
            </div>
            <div align="center" class="text-h5 text-white q-pt-md">เปลี่ยนรหัสผ่านเรียบร้อย</div>
          </div>
        </q-card-section>
        <q-card-actions class="bg5 q-py-lg" align="center">
          <q-btn
            @click="backToLesson()"
            label="กลับสู่บทเรียน"
            class="bg3 color1"
            style="width:180px"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../../router";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      errorNewPassword: false,
      errorConfirmPassword: false,
      errorCurrentPassword: false,
      showSuccessDialog: false,

      isChangePassword: false
    };
  },
  methods: {
    async backToLesson() {
      let checkClassSelect = this.$q.localStorage.has("currentClass");

      if (checkClassSelect) {
        // กรณีมีห้องเรียนเลือกไว้แล้ว ไปหน้า Main

        let getTime = await this.getDateAndTime();
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({
            currentPage: "main",
            date: getTime
          })
          .then(() => {
            this.$router.push("/teacher/main");
          });
      } else {
        this.$router.push("/teacher/classroom");
      }
    },
    resetValidation() {
      this.errorCurrentPassword = false;
    },
    async saveData() {
      this.$refs.newPassword.validate();
      this.$refs.confirmPassword.validate();

      if (
        this.$refs.newPassword.hasError ||
        this.$refs.confirmPassword.hasError
      ) {
        this.$q.notify({
          message: "รหัสผ่านใหม่ไม่ตรงกัน",
          position: "top",
          color: "red"
        });
        return;
      }

      let currentPassword = await db
        .collection("teacher")
        .doc(this.teacherData.key)
        .get();
      currentPassword = currentPassword.data().password;

      if (currentPassword != this.oldPassword) {
        // พาสเวิร์ดเก่าไม่ถูก
        this.$q.notify({
          message: "รหัสผ่านปัจจุบันไม่ถูกต้อง",
          position: "top",
          color: "red"
        });

        this.errorCurrentPassword = true;
      } else {
        // พาสเวิร์ดใหม่ตรงกัน ผ่าน
        db.collection("teacher")
          .doc(this.teacherData.key)
          .update({
            password: this.newPassword
          })
          .then(() => {
            this.showSuccessDialog = true;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>