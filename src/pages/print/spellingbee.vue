<template>
  <div class="page-white">
    <div class="page-header row z-top">
      <div align="right" class="self-center col q-px-md">
        <q-btn icon="fas fa-print" dense round class="text-white" flat @click="printBtn()"></q-btn>
      </div>
    </div>

    <div class="box-space"></div>

    <div class="box-page" v-if="practiceData.length">
      <div class="page-A4" v-for="(item,index) in practiceData" :key="index">
        <div class="q-px-lg q-pb-md">
          <table class="table">
            <tr>
              <th>
                <!-- Header -->
                <div class="row text-h6 font-default q-mb-xl q-pt-md">
                  <div class="col-6" align="left">
                    <span>WINNER ADVENTURES</span>
                  </div>
                  <div class="col-6" align="right">
                    <span>{{"UNIT" + practiceData[0][0].unit}}</span>
                  </div>
                </div>
              </th>
            </tr>
            <tr v-if="index == 0">
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
              <tr v-for="(item2,index2) in item" :key="index2">
                <td>
                  <div class="q-py-xs q-mt-md">
                    <div class="text-subtitle1 font-default q-mb-sm">
                      <span v-if="index == 0">{{ index2 + 1 + ". " }}</span>
                      <span v-if="index == 1">{{ (practiceData[0].length + index2 + 1) + ". " }}</span>
                      <span>{{ item2.meaning }}</span>
                    </div>
                    <div class="row text-subtitle1">
                      <div class="q-ma-xs" v-for="(space,index3) in item2.vocabulary" :key="index3">
                        <q-btn
                          class="text-white shadow-1 no-pointer-events"
                          dense
                          style="width:40px;height:35px;"
                        ></q-btn>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="page-A4">
        <div class="q-px-lg q-pt-md">
          <table class="table">
            <tr>
              <th>
                <!-- Header -->
                <div class="row text-h6 font-default q-mb-md q-mt-xl">
                  <div class="col" align="center">
                    <span class="text-h6">เฉลย</span>
                  </div>
                </div>
              </th>
            </tr>

            <tr>
              <td>
                <div class="q-mt-md">
                  <div
                    class="text-subtitle1 font-default"
                    v-for="(item,index) in practiceData"
                    :key="index"
                  >
                    <div v-for="(item2,index2) in item" :key="index2" class="q-mt-md">
                      <span v-if="index == 0">{{index2 + 1 }}</span>
                      <span v-if="index == 1">{{practiceData[0].length + index2 + 1 }}</span>
                      <span v-html="'. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + item2.vocabulary"></span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../router";
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
    loadVocabulary() {
      db.collection("practicepool_server")
        .where("practicekey", "==", this.$route.params.practiceId)
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(element => {
            temp.push(element.data());
          });
          temp.sort((a, b) => a.order - b.order);

          let count = 8;
          let row = Math.ceil(temp.length / count);
          let start = 0;
          let end = count;

          let newData = [];

          for (let i = 0; i < row; i++) {
            let getArray = temp.slice(start, end);

            newData.push(getArray);

            start += count;
            end += count;
          }

          this.practiceData = newData;
        });
    }
  },
  mounted() {
    this.loadVocabulary();
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
  padding-top: 50px;
}

.box-page {
  padding-bottom: 15px;
}

.page-A4 {
  width: 210mm;
  min-height: 297mm;
  height: fit-content;
  margin: 15px auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgb(0, 0, 0);
}

@media print {
  .page-header {
    display: none;
  }

  .page-white {
    width: 100%;
    background-color: #fff;
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
}
</style>