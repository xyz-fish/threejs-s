<template>
  <div id="p-index"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'

onMounted(() => {
  const { innerWidth, innerHeight } = window
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(innerWidth, innerHeight)
  const container = document.querySelector('#p-index')
  container?.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ffee })

  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  camera.position.z = 5
  mesh.rotation.x = 0.5
  mesh.rotation.y = 0.5

  renderer.render(scene, camera)
})
</script>

<style scoped></style>
