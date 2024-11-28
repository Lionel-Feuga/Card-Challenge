<script setup>
import { ref, onMounted } from 'vue'
import LikeAnimation from './components/Like-Animation.vue'

const image = ref(null)
const isHovering = ref(false)
const isFavorite = ref(false)
const likeButton = ref(null) 

onMounted(() => {
  if (likeButton.value) {
    console.log('likeButton initialized:', likeButton.value)
  }
})

const handleMouseInteraction = (event, hovering) => {
  isHovering.value = hovering
  if (!hovering) {
    image.value.style.transform = 'rotateY(0deg) rotateX(0deg)'
    image.value.style.boxShadow = 'none'
    return
  }

  const rect = image.value.getBoundingClientRect()
  const [x, y] = [event.clientX - rect.left, event.clientY - rect.top]
  const [centerX, centerY] = [rect.width / 2, rect.height / 2]

  const [deltaX, deltaY] = [(x - centerX) / centerX, (y - centerY) / centerY]
  const [rotateY, rotateX] = [deltaX * 20, -deltaY * 20]

  image.value.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
  image.value.style.boxShadow = `${-deltaX * 30}px ${-deltaY * 30}px 10px rgba(0, 0, 0, 0.3)`
}

const handleLikeAnimation = () => {
  console.log('Like animation triggered')
}
</script>

<template>
  <div class="container d-flex justify-center align-center">
    <div class="card elevation-4">
      <div
        class="card-slots d-flex justify-center align-center"
        style="height: 100%; gap: 2.625rem"
      >
        <div
          class="image-wrapper"
          :class="{ 'is-hovering': isHovering }"
          @mouseenter="(e) => handleMouseInteraction(e, true)"
          @mouseleave="(e) => handleMouseInteraction(e, false)"
          @mousemove="(e) => handleMouseInteraction(e, true)"
        >
          <img src="./assets/watch.jfif" alt="montre" ref="image" />
        </div>
        <div class="content">
          <div class="firstRow d-flex justify-space-between align-center">
            <div class="d-flex justify-center align-center fitLife pa-4">FitLife</div>
            <div class="code m">XV-383923810</div>
          </div>
          <div class="item-title mt-3">Montre Connectée FitLife Pro 5+</div>
          <div class="note d-flex align-center">
            <font-awesome-icon
              v-for="n in 4"
              :key="n"
              :icon="['fas', 'star']"
              class="custom-icon"
            />
            <font-awesome-icon :icon="['far', 'star']" class="custom-icon" />
            <div class="note-text">43 notes</div>
          </div>
          <div class="prices mt-10">
            <div class="crossed-price">183,99 €</div>
            <div class="price">149,99 €</div>
          </div>
          <div class="d-flex align-center mt-8" style="gap: 10px">
            <div class="add-to-cart d-flex justify-center align-center">Ajouter au panier</div>

            <LikeAnimation class="coeur" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  background-color: #dbe5fb;
}

.card {
  width: 49.188rem;
  height: 26.75rem;
  border-radius: 15px;
  background-color: white;
}

.image-wrapper {
  position: relative;
  width: 23.125rem;
  height: 20.75rem;
  perspective: 1000px;
}

.image-wrapper.is-hovering::before {
  content: '';
  position: absolute;
  top: -2rem;
  left: -2rem;
  right: -2rem;
  bottom: -2rem;
  background: transparent;
  z-index: 1;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
  transform-origin: center;
}

.content {
  height: 20.75rem;
  width: 17.438rem;
}

.fitLife {
  background-color: #343842;
  height: 2.063rem;
  width: 4.375rem;
  border-radius: 122px;
  color: white;
  font-size: 14px;
}

.code {
  color: #020712cc;
  opacity: 0.8;
  font-size: 12px;
}

.item-title {
  font-size: 32px;
  font-weight: 700;
  color: #020712;
  opacity: 80%;
  letter-spacing: -1px;
  line-height: 1.2;
}

.custom-icon {
  height: 10px;
  color: #edcf5d;
}

.note-text {
  font-size: 12px;
  color: #020712;
  opacity: 50%;
  margin-left: 0.75rem;
}

.prices {
  line-height: 1.2;
}

.crossed-price {
  text-decoration: line-through;
  font-size: 16px;
  color: #020712;
  opacity: 40%;
}

.price {
  font-size: 48px;
  font-weight: 700;
}

.add-to-cart {
  width: 225px;
  height: 44px;
  background-color: #477aeb;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
}

.add-to-cart:hover {
  background-color: #355bbf;
  transform: scale(1.02);
  cursor: pointer;
}

.coeur:hover {
  cursor: pointer;
}
</style>
