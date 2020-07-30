<template>
  <div class="row justify-center items-center bg-login relative-position">
    <waterWave></waterWave>
    <div class="absolute-center" style="width:100%;"></div>
    <div class="absolute-center z-top">
      <img
        id="logoImg"
        class="animated bounceIn my-animation"
        style="width:100%;animation-duration:1.5s"
        src="../statics/logo.png"
        alt
      />
      <q-linear-progress
        stripe
        rounded
        style="height: 20px;animation-duration:1.5s"
        :value="progress"
        color="warning"
        class="q-mt-sm animated fadeIn"
        id="myProgressBar"
      />
    </div>
  </div>
</template>

<script>
import waterWave from "../components/waterWave.vue";
export default {
  components: {
    waterWave
  },
  data() {
    return {
      progress: 0.0,
      myInterval: "",
      left: 0
    };
  },
  mounted() {
    this.$q.localStorage.clear();
    this.myInterval = setInterval(() => {
      this.left += 0.6;
      this.progress += 0.005;
      if (this.progress >= 1) {
        document.getElementById("logoImg").classList.remove("bounceIn");
        document.getElementById("logoImg").classList.add("bounceOut");
        document.getElementById("myProgressBar").classList.remove("fadeIn");

        setTimeout(() => {
          document.getElementById("myProgressBar").classList.add("fadeOut");
        }, 300);
        clearInterval(this.myInterval);

        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      }
    }, 5);
  }
};
</script>

<style scoped>
.loginBg {
  background-image: url("../statics/loginbg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
}

.cloud1 {
  position: absolute;
  top: 10%;
  left: 7%;
  width: 100px;
  height: 50px;
  background-image: url("../statics/cloud1.png");
  background-repeat: no-repeat;
  background-size: 100px;
}

.cloud2 {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 250px;
  height: 250px;
  background-image: url("../statics/cloud2.png");
  background-repeat: no-repeat;
  background-size: 250px;
}

.cloud3 {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 250px;
  height: 250px;
  background-image: url("../statics/cloud3.png");
  background-repeat: no-repeat;
  background-size: 250px;
}

.cloud4 {
  position: absolute;
  top: 7%;
  right: 35%;
  width: 130px;
  height: 250px;
  background-image: url("../statics/cloud4.png");
  background-repeat: no-repeat;
  background-size: 130px;
}

@-webkit-keyframes mySwing {
  20% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 1, 0.5deg);
    transform: translateX(0) rotate3d(0, 0, 1, 0.5deg);
  }

  40% {
    -webkit-transform: translateX(1%) rotate3d(0, 0, 1, -1deg);
    transform: translateX(1%) rotate3d(0, 0, 1, -1deg);
  }

  60% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, 0deg);
    transform: translateX(0) rotate3d(0, 0, 0, 0deg);
  }

  80% {
    -webkit-transform: translateX(-0.5%) rotate3d(0, 0, 1, -1deg);
    transform: translateX(-0.5%) rotate3d(0, 0, 1, -1deg);
  }

  to {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, 0deg);
    transform: translateX(0) rotate3d(0, 0, 0, 0deg);
  }
}

@keyframes mySwing {
  20% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 1, 0.5deg);
    transform: translateX(0) rotate3d(0, 0, 1, 0.5deg);
  }

  40% {
    -webkit-transform: translateX(1%) rotate3d(0, 0, 1, -1deg);
    transform: translateX(1%) rotate3d(0, 0, 1, -1deg);
  }

  60% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, 0deg);
    transform: translateX(0) rotate3d(0, 0, 0, 0deg);
  }

  80% {
    -webkit-transform: translateX(-0.5%) rotate3d(0, 0, 1, -1deg);
    transform: translateX(-0.5%) rotate3d(0, 0, 1, -1deg);
  }

  to {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, 0deg);
    transform: translateX(0) rotate3d(0, 0, 0, 0deg);
  }
}

@keyframes move_wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(0.7);
  }

  50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.55);
  }

  100% {
    transform: translateX(-50%) translateZ(0) scaleY(0.7);
  }
}

.waveWrapper {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}

.waveWrapperInner {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  bottom: -1px;
}

.wave {
  position: fixed;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat no-repeat;
  background-position: 0 bottom;
  transform-origin: center bottom;
}

.waveTop {
  background-size: 50% 100px;
}

.waveAnimation .waveTop {
  animation: move-wave 3s;
  -webkit-animation: move-wave 3s;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}

/* WAVE 1 */
.ship {
  background-image: url("../statics/ship.png");
  background-size: 400px;
  left: 3%;
  bottom: 50px;
  background-repeat: no-repeat;
}

.waveAnimation .ship {
  animation: mySwing 10s linear infinite;
}

/* WAVE 1 */
.waveMiddle {
  background-image: url("../statics/wave 1.png");
  background-size: 50% 250px;
  bottom: -10px;
}

.waveAnimation .waveMiddle {
  animation: move_wave 25s linear infinite;
}

/* WAVE 2 */
.waveMiddle2 {
  background-image: url("../statics/wave 2.png");
  background-size: 50% 250px;
  bottom: 15px;
}

.waveAnimation .waveMiddle2 {
  animation: move_wave 40s linear infinite;
}

/* WAVE 3 */
.waveMiddle3 {
  background-image: url("../statics/wave 3.png");
  background-size: 50% 250px;
  bottom: 60px;
}

.waveAnimation .waveMiddle3 {
  animation: move_wave 50s linear infinite;
}

/* WAVE 4 */
.waveMiddle4 {
  background-image: url("../statics/wave 4.png");
  background-size: 50% 250px;
  bottom: 90px;
}

.waveAnimation .waveMiddle4 {
  animation: move_wave 60s linear infinite;
}

.waveBottom {
  background-size: 50% 100px;
}

.waveAnimation .waveBottom {
  animation: move_wave 15s linear infinite;
}
</style>
