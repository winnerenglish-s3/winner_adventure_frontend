<template>
  <div>
    <!-- .where("schoolKey", "==", this.studentData.schoolKey)
    .where("class", "==", this.studentData.classRoom)
    .where("room", "==", this.studentData.room)
    .where("term", "==", this.studentData.term)
    .where("year", "==", this.studentData.year)
    .where("currentDate", "==", dateTime.date)
    .where("status", "==", "online")-->

    <div class="q-gutter-md" style="width:360px;margin:auto">
      <q-input
        class="bg-white q-px-sm"
        v-model="studentDataTemp.schoolKey"
        label="Id โรงเรียน"
      ></q-input>
      <q-input
        class="bg-white q-px-sm"
        v-model="studentDataTemp.classRoom"
        label="ระดับชั้น"
      ></q-input>
      <q-input
        class="bg-white q-px-sm"
        v-model="studentDataTemp.room"
        label="ห้อง"
      ></q-input>
      <div align="center">
        <q-btn
          label="Hack"
          class="bg-red-10 text-white"
          style="width:70%"
          @click="hackStudent()"
        ></q-btn>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentDataTemp: {
        schoolKey: "",
        classRoom: "",
        room: "",
        term: "2",
        year: "2563",
        currentDate: "",
        status: "online"
      }
    };
  },
  methods: {
    async hackStudent() {
      let dateTime = await this.getDateAndTime();
      this.studentDataTemp.currentDate = dateTime.date;
      this.encrypt(this.studentDataTemp, 1);

      let studentDataEncrypt = this.encrypt(this.studentDataTemp, 1);
      this.$q.localStorage.set("studentData", studentDataEncrypt);

      let currentTermEncrypt = this.encrypt(this.studentDataTemp.term, 2);
      let currentYearEncrypt = this.encrypt(this.studentDataTemp.year, 2);

      this.$q.localStorage.set("currentTerm", currentTermEncrypt);
      this.$q.localStorage.set("currentYear", currentYearEncrypt);
      this.$router.push("/student/waiting");
    }
  }
};
</script>

<style lang="scss" scoped></style>
