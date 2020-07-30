<template>
  <div class="animated fadeIn loginBg">
    <!-- APP BAR -->
    <div class="bg1 q-pa-sm">
      <div align="right">
        <q-icon name="fas fa-sign-out-alt" color="white" size="28px"></q-icon>
      </div>
    </div>
    <!-- END APP BAR -->
    <!-- QUOTE -->
    <div class="text-h2 color1 q-pa-md q-mt-lg" align="center">ไม่อยากเหมือนลุง อย่ายุ่งกับการโกง</div>
    <!-- END QUOTE -->
    <div class="row q-mt-xl q-pa-md">
      <div class="col-4" align="center">
        <img
          src="../statics/ship.png"
          id="myShip"
          class="animated mySwing infinite"
          style="position:relative;animation-duration:5s;width:400px"
          alt
        />
      </div>
      <div class="col-8 z-top q-pa-md" align="center">
        <q-img src="../statics/paper.png" style="width:82%">
          <div class="row absolute-top bg-transparent justify-center" style="width:100%;top:80px">
            <!-- HEADER TEXT -->
            <div class="col-12 text-h3 color1" style="letter-spacing:2px" align="center">ภารกิจพิเศษ</div>
            <!-- DASHED BORDER -->
            <div class="col-6 q-py-sm" style="border-bottom:1px dashed red;border-width:2px"></div>
            <div class="col-10 q-mt-lg row items-center text-h5">
              <div class="col-12 row items-center q-pa-sm text-black" v-for="i in 3" :key="i">
                <div style="width:50px" class="col-1">
                  <q-checkbox color="teal" v-model="checktest"></q-checkbox>
                </div>
                <div class="col-8" align="left">เข้าเรียนต่อเนื่องติดต่อกัน 5 ครั้ง</div>
                <div class="col-2">100 xp</div>
              </div>
            </div>
          </div>
        </q-img>
      </div>
    </div>

    <div class="absolute-bottom q-pb-md text-h5 color1" align="center">
      กัปตันกำลังหาเส้นทาง รอสักครู่
      <q-spinner-dots class="color1" size="2em" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checktest: false
    };
  },
  methods: {}
};
</script>

<style>
</style>