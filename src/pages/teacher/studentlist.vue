<template>
  <q-page style="background-color:#FFE5D2">
    <div class="row q-pa-sm relative-position bg5">
      <div class="col">
        <q-btn
          push
          class="bg3 color6"
          to="/teacher/folder"
          icon="fas fa-chevron-left"
          label="เมนูหลัก"
        ></q-btn>
      </div>
      <div align="center" class="color2 col self-center text-h6">รายชื่อนักเรียน</div>
      <div class="col"></div>
    </div>

    <div class="q-pa-md">
      <div class="row justify-between">
        <div class="col-6 self-center" style="max-width:500px;width:100%;">
          <q-select
            outlined
            square
            :options="roomOptions"
            v-model="selectClass"
            type="text"
            label="ชั้น"
            class="bg1 border2-xs"
            @input="loadStudent()"
          />
        </div>
        <div class="col-6 self-center" align="center" style="width:100px;">
          <q-btn push round class="bg3 color1" size="17px" @click="printBtn()">
            <q-icon name="fas fa-print" size="28px"></q-icon>
          </q-btn>
        </div>
      </div>
    </div>

    <div class="q-mt-lg">
      <table class="text-body1">
        <thead>
          <tr>
            <td align="center">เลขที่</td>
            <td align="center">ชื่อ - นามสกุล</td>
            <td align="center">รหัสผู้ใช้งาน</td>
            <td align="center">รหัสผ่าน</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(items,index) in studentList" :key="index">
            <td style="min-width:170px;" align="center">{{items.no}}</td>
            <td style="width:100%;" align="center">{{items.name + " " + items.surname}}</td>
            <td style="min-width:200px" align="center">{{items.user}}</td>
            <td style="min-width:200px" align="center">{{items.password}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      selectClass: "",
      roomOptions: [],
      studentList: [],
      studentAllList: []
    };
  },
  methods: {
    printBtn() {
      console.clear();
      this.$router.push({
        name: "teacher/studentlistprint",
        params: {
          data: this.studentList,
          schoolKey: this.teacherData.schoolKey,
          term: this.getTerm(),
          year: this.getAcademicYear(),
          classRoom: this.selectClass
        }
      });
    },
    loadData() {
      this.loadingShow();

      this.studentAllList = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      );

      let roomTotal = [];
      let studentData = this.studentAllList.map(x => {
        return x.classRoom + "/" + x.room;
      });

      studentData = [...new Set(studentData)];

      studentData.sort((a, b) => {
        let grade1 = a[0];
        let grade2 = b[0];
        if (grade1 == "ป") {
          grade1 = "z";
        }
        if (grade2 == "ป") {
          grade2 = "z";
        }
        let d1 = grade1 + a.slice(1);
        let d2 = grade2 + b.slice(1);
        return d1 > d2 ? 1 : -1;
      });

      this.roomOptions = studentData;
      this.selectClass = studentData[0];

      this.loadStudent();

      return;
    },
    loadStudent() {
      let classRoom = this.selectClass.slice(0, 3);
      let room = this.selectClass.slice(4);

      let result = this.studentAllList.filter(x => {
        return x.classRoom == classRoom && x.room == room;
      });

      result.sort((a, b) => {
        return a.no - b.no;
      });

      this.studentList = result;

      this.loadingHide();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table tr th,
td {
  border: 1px solid #666;
  padding: 13px;
}
</style>