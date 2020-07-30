<template>
  <div class="page-white">
    <div class="page-header row">
      <div align="right" class="self-center col q-px-md">
        <q-btn icon="fas fa-print" dense round class="text-white" flat @click="printBtn()"></q-btn>
      </div>
    </div>

    <div class="box-space"></div>

    <div class="box-page" v-if="practiceData.length">
      <div class="page-A4">
        <div class="q-px-lg q-pb-md">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <!-- Header -->
                  <div class="row text-h6 font-default q-mb-xl q-pt-md">
                    <div class="col-6" align="left">
                      <span>WINNER ADVENTURES</span>
                    </div>
                    <div class="col-6" align="right">
                      <span>{{"UNIT" + practiceData[0].unit}}</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tr>
              <th>
                <!-- ชื่อ-นามสกุล -->
                <div class="row text-h6 font-default q-mb-xl" style="margin-top:-15px;">
                  <div class="col" align="left">
                    <span>
                      ชื่อ
                      <span
                        class="q-mr-xs"
                      >...........................................................................................................</span>
                    </span>
                  </div>
                  <div class="col-2" style="width:300px;" align="right">
                    <span class="q-mr-sm">
                      ชั้น
                      <span>..........................</span>
                    </span>
                    <span>
                      เลขที่
                      <span>..........................</span>
                    </span>
                  </div>
                </div>
              </th>
            </tr>

            <tbody>
              <tr v-for="(item,index) in practiceData" :key="index">
                <td>
                  <div class="q-py-xs q-mt-md">
                    <div class="text-subtitle1 font-default q-mb-sm">
                      <span>{{index + 1 + ". "}}</span>
                      <span v-html="item.convertData"></span>
                    </div>
                    <div class="row">
                      <div
                        class="col-4 self-center border-dotted q-pa-sm text-subtitle1"
                        style="height:45px;"
                        v-for="i in 6"
                        :key="i"
                        align="center"
                      >
                        <span v-if="i == 1" class="text-grey-4">{{item.vocabulary}}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../router/index";
export default {
  data() {
    return {
      practiceData: []
    };
  },
  methods: {
    printBtn() {
      window.print();
    },
    loadPractice() {
      let practiceId = this.$route.params.practiceId;

      db.collection("practicepool_server")
        .where("practicekey", "==", practiceId)
        .get()
        .then(doc => {
          this.practiceData = [];
          doc.forEach(result => {
            let newData = {
              convertData:
                result.data().vocabulary +
                "&nbsp;&nbsp; (" +
                result.data().pronounce +
                ") &nbsp;&nbsp;" +
                result.data().meaning,
              ...result.data()
            };

            this.practiceData.push(newData);
          });

          this.practiceData.sort((a, b) => {
            return a.order - b.order;
          });
        });
    }
  },
  mounted() {
    this.loadPractice();
  }
};
</script>

<style lang="scss" scoped>
.font-default {
  font-family: pridi;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.border-dotted {
  border: 1px dotted rgb(211, 211, 211);
}

.page-white {
  width: 100%;
  background-color: #ffe5d2;
  background-size: cover;
}

.page-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #662707;
}

.box-space {
  padding-top: 70px;
}

.box-page {
  padding-bottom: 15px;
}

.page-A4 {
  width: 210mm;
  min-height: 297mm;
  height: fit-content;
  margin: auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgb(0, 0, 0);
}

@media print {
  .page-header {
    display: none;
  }

  .page-white {
    width: 100%;
    background-color: transparent;
    background-size: cover;
  }

  .page-A4 {
    width: 210mm;
    height: 297mm;
    margin: 0px auto;
    background-color: #fff;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  }

  .box-space {
    padding-top: 0px;
  }

  .box-page {
    padding-bottom: 0px;
  }

  @page {
    margin: 0mm;
  }

  @page :footer {
    display: none;
  }
  @page :header {
    display: none;
  }
}
</style>