<template>
  <div class="bg5 boxprint">
    <div class="printMe q-pa-md">
      <div class="row bg13 border13-xs br-tl-xs br-bl-xs q-mb-xs">
        <div class="col-3 q-pa-xs self-center bg1 br-a-xs" align="center">
          <img src="../../statics/logo_winner.png" style="width:120px;" />
        </div>
        <div class="col self-center q-pa-sm color1 text-body1" align="center">
          <div class>
            <span>{{ schoolData.name }}</span>
          </div>
          <div class="border1-xs"></div>
          <div class="row q-pa-xs">
            <div class="col-6 q-px-md" align="right" style="border-right:1px solid #fff">
              {{"ปีการศึกษา " + $route.params.term + "/" + $route.params.year}}
              <!-- <span>ปีการศึกษา</span> -->
            </div>

            <div class="col-6 q-px-md" align="left">
              <span>{{ "" + convertClassroom}}</span>
              <!-- <span>ห้อง</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="q-px-md q-pt-sm text-h6" align="center">{{ $route.params.typeHeader }}</div>
      <div class="q-pt-sm q-px-md text-h6" align="center">{{ $route.params.scoreHeader }}</div>

      <table v-if="$route.params.type != '3'">
        <thead>
          <tr>
            <th colspan="4">
              <div class="q-mt-md"></div>
            </th>
          </tr>
          <tr style="background-color:#616262" class="text-white">
            <td align="center" style="border:1px solid#777;padding:10px;">เลขที่</td>
            <td align="center" style="border:1px solid#777;padding:10px;">ชื่อ-นามสกุล</td>
            <td align="center" style="border:1px solid#777;padding:10px;">คะแนน</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(items,index) in $route.params.data" :key="index">
            <td style="width:16%;" align="center">{{items.no}}</td>
            <td>{{items.name + " " + items.surname}}</td>
            <td style="width:16%" align="center">{{items.scoreAvg}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classRoomSelected: this.$route.params.classRoomSelected
    };
  },
  computed: {
    convertClassroom() {
      if (this.classRoomSelected[0] == "ป") {
        return this.classRoomSelected.replace("ป", "ชั้นประถมศึกษาปีที่");
      } else {
        return this.classRoomSelected.replace("ม", "ชั้นมัธยมศึกษาปีที่");
      }
    }
  },
  mounted() {
    if (this.$route.params.data == undefined) {
      this.$router.go(-1);
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