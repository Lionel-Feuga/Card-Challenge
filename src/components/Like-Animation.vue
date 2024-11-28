<script setup>
import { ref } from 'vue';
import gsap from 'gsap';

const isFavorite = ref(false);
const hearts = ref(Array(7).fill({ visible: false }));
const isAnimating = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;

  if (isAnimating.value) return;

  if (isFavorite.value) {
    isAnimating.value = true;

    hearts.value.forEach((heart, index) => {
      heart.visible = true;

      const heartEl = document.querySelector(`#heart-${index}`);

      gsap.set(heartEl, {
        x: 0,
        y: 0,
        opacity: 1,
      });

      const xRandom = Math.random() * 80 - 30;
      const yRandom = Math.random() * -80 - 50;

      gsap.to(heartEl, {
        x: xRandom,
        y: yRandom,
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        onComplete: () => {
          heart.visible = false;

          if (index === hearts.value.length - 1) {
            isAnimating.value = false;
          }
        },
      });
    });
  }
};
</script>

<template>
  <div
    class="heart d-flex align-center justify-center"
    @click="toggleFavorite"
    :class="{ 'is-favorite': isFavorite }"
  >
    <div class="heart-button">
      <font-awesome-icon :icon="isFavorite ? ['fas', 'heart'] : ['far', 'heart']" />
    </div>
    <div class="hearts">
      <div
        v-for="(heart, index) in hearts"
        :key="index"
        :id="'heart-' + index"
        class="heart-icon"
        v-show="heart.visible"
      >
        <font-awesome-icon :icon="['fas', 'heart']" />
      </div>
    </div>
  </div>
</template>

<style>
.heart {
  background-color: #dbe5fb;
  border-radius: 8px;
  height: 44px;
  width: 44px;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.heart:hover {
  background-color: #477aeb;
  transform: translateY(-1px);
}

.heart-button {
  cursor: pointer;
  font-size: 1.2rem;
  color: #477aeb;
  margin-top: 1px;
}

.heart:hover .heart-button {
  color: white;
}

.hearts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.heart-icon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  color: #477aeb;
  opacity: 1;
  pointer-events: none;
}
</style>
