<template>
  <div id="p-index"></div>
  <div id="stats"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import Stats from 'stats.js'

const stats = new Stats()

function addStats() {
  function show() {
    stats.begin()
    stats.end()
    requestAnimationFrame(show)
  }

  stats.dom.style.position = 'absolute'
  stats.dom.style.left = '0'
  stats.dom.style.right = '0'

  document.getElementById('stats')?.appendChild(stats.dom)

  requestAnimationFrame(show)
}

onMounted(() => {
  const { innerWidth, innerHeight } = window
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(innerWidth, innerHeight)
  renderer.shadowMap.enabled = true
  const container = document.querySelector('#p-index')
  container?.appendChild(renderer.domElement)

  // 创建场景
  const scene = new THREE.Scene()
  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

  // 创建一个几何体
  const geometry = new THREE.BoxGeometry(8, 8, 8)
  // 创建几何体的表面材质
  const material = new THREE.MeshLambertMaterial({ color: 0xff2288 })

  // 生成网格
  const cube = new THREE.Mesh(geometry, material)

  // 设置一个几何体网格的属性
  cube.castShadow = true // 显示阴影
  // 位置设置
  cube.position.x = 4
  cube.position.y = 10
  cube.position.z = 20

  // cube.rotation.x += 0.75
  // cube.rotation.y += 0.75

  scene.add(cube)

  // 创建坐标轴
  const axes = new THREE.AxesHelper(100)
  scene.add(axes)

  // 创建地板
  const planeGeometry = new THREE.PlaneGeometry(80, 80) // 几何体
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc }) // 材质
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)

  // 位置信息
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(-15, 0, 0)
  plane.receiveShadow = true

  scene.add(plane)

  // 光源
  const spotLight = new THREE.SpotLight(0xffffff)

  spotLight.position.set(-60, 40, -65)
  spotLight.castShadow = true
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
  spotLight.shadow.camera.far = 130
  spotLight.shadow.camera.near = 40

  scene.add(spotLight)

  const ambientLight = new THREE.AmbientLight(0xaaaaaa)

  scene.add(ambientLight)

  camera.position.x = -30
  camera.position.y = 45
  camera.position.z = 35
  camera.lookAt(scene.position)

  let gap = 0

  function renderScene() {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01

    gap += 0.01
    cube.position.x = 25 + 20 * Math.sin(gap)
    cube.position.y = 6 + 20 * Math.abs(Math.cos(gap))

    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
  }
  addStats()
  renderScene()
})
</script>

<style scoped></style>
