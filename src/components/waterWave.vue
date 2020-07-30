<template>
  <div>
    <!-- Cloud -->
    <!-- <div class="cloudAnimation">
      <div class="cloud1"></div>
      <div class="cloud2"></div>
      <div class="cloud3"></div>
      <div class="cloud4"></div>
      <div class="cloud5"></div>
      <div class="sun"></div>
    </div>-->

    <!-- sea and ship -->
    <div class="waveWrapper waveAnimation">
      <div class="wave waveMiddle4"></div>
      <div class="wave island" v-if="$route.name == 'login'"></div>
      <div class="wave waveMiddle3"></div>
      <div class="wave waveMiddle2"></div>
      <div class="wave ship" v-if="$route.name == 'login'"></div>
      <div class="wave waveMiddle"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style scoped>
.sun {
  position: absolute;
  overflow: hidden;
  top: 50px;
  right: 25%;
  width: 7vw;
  height: 10vw;
  background-image: url("../statics/sun.png");
  background-repeat: no-repeat;
  background-size: 7vw;
  z-index: 10;
}

/* @keyframes cloundMove1 {
  0% {
    left: 40%;
  }
  100% {
    left: -15%;
  }
}

@keyframes cloundMove2 {
  0% {
    left: 15%;
  }
  100% {
    left: -30%;
  }
}

@keyframes cloundMove3 {
  0% {
    left: 80%;
  }
  100% {
    left: -30%;
  }
}

@keyframes cloundMove4 {
  0% {
    left: 60%;
  }
  100% {
    left: -30%;
  }
}

@keyframes cloundMove5 {
  0% {
    left: 7%;
  }
  100% {
    left: -30%;
  }
} */

.cloudAnimation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 60%);
}

.cloudAnimation .cloud1 {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 10vw;
  height: 10vw;
  background-image: url("../statics/cloud1.png");
  background-repeat: no-repeat;
  background-size: 10vw;
  /* animation: cloundMove1 350s forwards; */
  z-index: 15;
}

.cloudAnimation .cloud2 {
  position: absolute;
  top: 65%;
  left: 70%;
  width: 20vw;
  height: 10vw;
  background-image: url("../statics/cloud2.png");
  background-repeat: no-repeat;
  background-size: 20vw;
  /* animation: cloundMove2 200s forwards; */
  z-index: 15;
}

.cloudAnimation .cloud3 {
  position: absolute;
  top: 50%;
  left: 10%;
  width: 25vw;
  height: 10vw;
  background-image: url("../statics/cloud1.png");
  background-repeat: no-repeat;
  background-size: 25vw;
  /* animation: cloundMove3 300s forwards; */
  z-index: 15;
}

.cloudAnimation .cloud4 {
  position: absolute;
  top: 15%;
  left: 70%;
  width: 9vw;
  height: 10vw;
  background-image: url("../statics/cloud4.png");
  background-repeat: no-repeat;
  background-size: 9vw;
  /* animation: cloundMove4 700s forwards; */
  z-index: 10;
}

.cloudAnimation .cloud5 {
  position: absolute;
  top: 20%;
  left: 40%;
  width: 15vw;
  height: 10vw;
  background-image: url("../statics/cloud4.png");
  background-repeat: no-repeat;
  background-size: 15vw;
  /* animation: cloundMove5 100s forwards; */
  z-index: 15;
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

@-webkit-keyframes isLandSwing {
  20% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 1, 0.3deg);
    transform: translateX(0) rotate3d(0, 0, 1, 0.3deg);
  }

  40% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, -1deg);
    transform: translateX(0) rotate3d(0, 0, 0, -1deg);
  }

  60% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, -1deg);
    transform: translateX(0) rotate3d(0, 0, 0, -1deg);
  }

  80% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 1, 0.3deg);
    transform: translateX(0) rotate3d(0, 0, 1, 0.3deg);
  }

  to {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, -1deg);
    transform: translateX(0) rotate3d(0, 0, 0, -1deg);
  }
}

@keyframes isLandSwing {
  20% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 1, 0.3deg);
    transform: translateX(0) rotate3d(0, 0, 1, 0.3deg);
  }

  40% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, -1deg);
    transform: translateX(0) rotate3d(0, 0, 0, -1deg);
  }

  60% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, -1deg);
    transform: translateX(0) rotate3d(0, 0, 0, -1deg);
  }

  80% {
    -webkit-transform: translateX(0) rotate3d(0, 0, 1, 0.3deg);
    transform: translateX(0) rotate3d(0, 0, 1, 0.3deg);
  }

  to {
    -webkit-transform: translateX(0) rotate3d(0, 0, 0, -1deg);
    transform: translateX(0) rotate3d(0, 0, 0, -1deg);
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

.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat no-repeat;
  background-position: 0px bottom;
  transform-origin: center bottom;
}

.waveAnimation .waveTop {
  animation: move-wave 3s;
  -webkit-animation: move-wave 3s;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}

/* WAVE 1 */
.island {
  left: 67%;
  bottom: 25px;
  background-image: url("../statics/island.png");
  background-size: 32vw;
  background-repeat: no-repeat;
  z-index: 15;
}

/* WAVE 1 */
.ship {
  left: 3%;
  bottom: -10px;
  background-image: url("../statics/boat.png");
  background-size: 20vw;
  background-repeat: no-repeat;
  z-index: 15;
}

.waveAnimation .ship {
  animation: mySwing 10s linear infinite;
}

/* WAVE 1 */
.waveMiddle {
  background-image: url("../statics/wave 1.png");
  background-size: 50% 10vw;
  bottom: -10px;
  z-index: 15;
}

.waveAnimation .waveMiddle {
  animation: move_wave 25s linear infinite;
}

/* WAVE 2 */
.waveMiddle2 {
  background-image: url("../statics/wave 2.png");
  background-size: 50% 10.5vw;
  bottom: 0px;
  z-index: 15;
}

.waveAnimation .waveMiddle2 {
  animation: move_wave 40s linear infinite;
}

/* WAVE 3 */
.waveMiddle3 {
  background-image: url("../statics/wave 3.png");
  background-size: 50% 12vw;
  bottom: 0px;
  z-index: 15;
  opacity: 0.97;
}

.waveAnimation .waveMiddle3 {
  animation: move_wave 50s linear infinite;
}

/* WAVE 4 */
.waveMiddle4 {
  background-image: url("../statics/wave 4.png");
  background-size: 50% 16vw;
  bottom: 0px;
  z-index: 10;
}

.waveAnimation .waveMiddle4 {
  animation: move_wave 60s linear infinite;
}

.waveAnimation .waveBottom {
  animation: move_wave 15s linear infinite;
}
</style>