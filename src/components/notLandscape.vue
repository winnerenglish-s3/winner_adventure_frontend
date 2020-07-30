<template>
  <div
    class="row justify-center items-center bg-notlandscape relative-position q-pa-md"
    style="height:100vh"
  >
    <q-resize-observer @resize="onResize" />
    <q-img
      src="../statics/landscapeonly/bg_rotate.png"
      class="relative-position q-pa-md"
      style="max-width:700px;width:95%;"
    >
      <div class="absolute-full bg-transparent flex flex-center" style="top:-100px;">
        <div class="row">
          <div class="col-12 q-pa-md q-mt-xl" align="center">
            <q-img
              src="../statics/landscapeonly/device_rotate.png"
              class="device-rotate"
              :class="{'device-s':innerWidth > 300 && innerWidth < 401,'device-m': innerWidth > 400 && innerWidth < 601,'device-l':innerWidth > 600 }"
            />
          </div>
          <div class="col-12 q-mt-md" align="center">
            <span
              class="color3 text-bold"
              :class="{'text-size-s':innerWidth > 300 && innerWidth < 401,'text-size-m':innerWidth > 400 && innerWidth < 601,'text-size-l':innerWidth > 600 }"
            >กรุณาหมุนหน้าจอเพื่อใช้งานโปรแกรม</span>
            <br />
            <span
              class="color3 text-bold"
              :class="{'text-size-s':innerWidth > 300 && innerWidth < 401,'text-size-m':innerWidth > 400 && innerWidth < 601,'text-size-l':innerWidth > 600  }"
            >โปรแกรมนี้ไม่รองรับหน้าจอแนวตั้ง</span>
          </div>
        </div>
      </div>
    </q-img>
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
  },
  methods: {
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  }
};
</script>

<style lang="scss" scoped>
.device-rotate {
  animation: deviceRotate 15s linear infinite;
  -webkit-animation: deviceRotate 15s linear infinite;
  -moz-animation: deviceRotate 15s linear infinite;
  -o-animation: deviceRotate 15s linear infinite;
}

.device-s {
  max-width: 100px;
  width: 100%;
}
.device-m {
  max-width: 150px;
  width: 100%;
}

.device-l {
  width: 200px;
}

.text-size-s {
  font-size: 12px;
}
.text-size-m {
  font-size: 14px;
}

.text-size-l {
  font-size: 20px;
}

@keyframes deviceRotate {
  0% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  10% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  30% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  70% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  90% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  100% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
}

@-webkit-keyframes deviceRotate {
  0% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  10% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  30% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  70% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  90% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  100% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
}

@-moz-keyframes deviceRotate {
  0% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  10% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  30% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  70% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  90% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  100% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
}

@-o-keyframes deviceRotate {
  0% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  10% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  30% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  70% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  90% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
  100% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
}
</style>