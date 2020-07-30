<template>
  <div class="bg5 boxprint">
    <div class="printMe q-pa-md">
      <div class="row bg13 border13-xs br-tl-xs br-bl-xs q-mb-xs">
        <div class="col-3 q-pa-xs self-center bg1 br-a-xs" align="center">
          <img src="../../statics/logo_winner.png" style="width:120px;" />
        </div>
        <div class="col self-center q-pa-sm color1 text-body1" align="center">
          <div class>
            <span>{{dataShow.name}}</span>
          </div>
          <div class="border1-xs"></div>
          <div class="row q-pa-xs">
            <div class="col-6 q-px-md" align="right" style="border-right:1px solid #fff">
              <span>{{"ปีการศึกษา " + dataShow.term + "/" + dataShow.year}}</span>
            </div>

            <div class="col-6 q-px-md" align="left">
              <span>{{ "" + dataShow.classRoom}}</span>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th colspan="4">
              <div class="q-mt-md"></div>
            </th>
          </tr>
          <tr style="background-color:#616262" class="color1">
            <td align="center" style="border:1px solid#777;padding:10px;">เลขที่</td>
            <td align="center" style="border:1px solid#777;padding:10px;">ชื่อ-นามสกุล</td>
            <td align="center" style="border:1px solid#777;padding:10px;">username</td>
            <td align="center" style="border:1px solid#777;padding:10px;">password</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(items,index) in studentList" :key="index">
            <td style="min-width:80px;" align="center">{{items.no}}</td>
            <td style="width:100%;" align="left">{{items.name + " " + items.surname}}</td>
            <td style="min-width:150px" align="center">{{items.user}}</td>
            <td style="min-width:150px" align="center">{{items.password}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "../../router/index.js";
export default {
  data() {
    return {
      studentList: [],
      dataShow: {
        term: "",
        year: "",
        name: "",
        classRoom: ""
      }
    };
  },
  methods: {
    getData() {
      let refs = db
        .collection("school")
        .doc(this.$route.params.schoolKey)
        .get();

      refs.then(result => {
        this.studentList = this.$route.params.data;
        this.dataShow.name = result.data().name;
        this.dataShow.term = this.$route.params.term;
        this.dataShow.year = this.$route.params.year;
        this.dataShow.classRoom = this.$route.params.classRoom
          .replace("ป.", "ชั้นประถมศึกษาปีที่ ")
          .replace("ม.", "ชันมัธยมศึกษาปีที่ ");

        setTimeout(() => {
          window.print();
        }, 500);

        setTimeout(() => {
          this.$router.go(-1);
        }, 600);
      });
    }
  },
  mounted() {
    if (this.$route.params.data == undefined) {
      this.$router.go(-1);
    } else {
      this.getData();
    }
  }
};
</script>

<style >
table {
  width: 100%;
  border-collapse: collapse;
}

table tr td {
  border: 1px solid #666;
  padding: 13px;
}

.printMe {
  background-color: #fff;
  width: 210mm;
  height: 297mm;
  margin: auto;
  box-shadow: 0px 3px 3px rgba(51, 51, 51, 0.479);
}

.border-right {
  border-right: 1px solid;
}

.boxprint {
  padding: 15px;
}

@media print {
  html,
  body {
    background-color: #fff;
  }

  .bg5 {
    background-color: #fff;
  }

  .printMe {
    background-color: #fff;
    width: 210mm;
    height: 297mm;
    margin: auto;
    box-shadow: 0px 0px 0px transparent;
  }

  .boxprint {
    padding: 0px;
  }
}

@page {
  margin: 0mm;
  width: 210mm;
  height: 297mm;
}
</style>