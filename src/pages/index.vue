<template>
  <div id="p-index"></div>
  <div id="stats"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import Stats from 'stats.js'
import dat from 'dat.gui'

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
  stats.dom.style.zIndex = '0'

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
  // scene.fog = new THREE.Fog(0x0000ff, 0.01, 110)
  scene.fog = new THREE.FogExp2(0x0000ff, 0.01)
  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

  // 创建坐标轴
  const axes = new THREE.AxesHelper(100)
  axes.setColors(new THREE.Color(0xff00ff), new THREE.Color(0xffff00), new THREE.Color(0x00ffff))
  scene.add(axes)

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

  // 常见一个新的几何体

  const geometry2 = new THREE.BoxGeometry(4, 4, 4)
  const material2 = new THREE.MeshLambertMaterial({ color: 0x00ffee })
  const cube2 = new THREE.Mesh(geometry2, material2)

  cube2.position.set(-10, 4, 0)
  cube2.name = 'cube2'

  scene.add(cube2)

  // 创建地板
  const planeGeometry = new THREE.PlaneGeometry(125, 125) // 几何体
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc }) // 材质
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)

  // 位置信息
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(15, 0, 0)
  plane.receiveShadow = true

  scene.add(plane)

  // 光源
  const spotLight = new THREE.SpotLight(0xffffff)

  spotLight.position.set(-60, 40, -65)
  spotLight.castShadow = true
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
  spotLight.shadow.camera.far = 130
  spotLight.shadow.camera.near = 50

  scene.add(spotLight)

  const ambientLight = new THREE.AmbientLight(0xaaaaaa)

  scene.add(ambientLight)
  // dat.gui 输入控制变量的名称
  const cube2Obj = scene.getObjectByName('cube2')

  const ctrlObj = {
    rotation: 0.01,
    jump: 0.01,
    removeCube2: () => {
      if (cube2Obj instanceof THREE.Mesh) {
        scene.remove(cube2Obj)
      }
    },
    addNewCube() {
      const geometryN = new THREE.BoxGeometry(5, 5, 5)
      const materialN = new THREE.MeshLambertMaterial({ color: 0x00ef0f })
      const cubeN = new THREE.Mesh(geometryN, materialN)
      cubeN.position.set(-Math.random() * 10, Math.random() * 10, Math.random() * 10)
      cubeN.rotation.set(Math.random(), Math.random(), Math.random())
      scene.add(cubeN)
    }
  }

  const ctrl = new dat.GUI()
  ctrl.add(ctrlObj, 'rotation', 0, 1)
  ctrl.add(ctrlObj, 'jump', 0, 1)
  ctrl.add(ctrlObj, 'removeCube2')
  ctrl.add(ctrlObj, 'addNewCube')
  ctrl.domElement.style.zIndex = '10'

  camera.position.x = -30
  camera.position.y = 50
  camera.position.z = 50
  camera.lookAt(scene.position)
  // camera.lookAt(new THREE.Vector3(0, 0, 0))

  let gap = 0

  // cube.rotation.x += 0.75
  // cube.rotation.y += 0.75
  // cube.rotation.z += 0.75

  function renderScene() {
    // cube.rotation.x += ctrlObj.rotation
    // cube.rotation.y += ctrlObj.rotation
    // cube.rotation.z += ctrlObj.rotation

    // gap += ctrlObj.jump
    // cube.position.x = 25 + 20 * Math.sin(gap)
    // cube.position.y = 6 + 20 * Math.abs(Math.cos(gap))

    scene.traverse(obj => {
      if (obj instanceof THREE.Mesh && obj !== plane) {
        obj.rotation.x += ctrlObj.rotation
        obj.rotation.y += ctrlObj.rotation
        obj.rotation.z += ctrlObj.rotation
      }
    })

    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
  }
  addStats()
  renderScene()

  window.addEventListener('resize', onResize, false)

  function onResize() {
    const { innerWidth, innerHeight } = window
    // 更新摄像机的长宽比
    camera.aspect = innerWidth / innerHeight
    // 更新摄像机投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器尺寸大小
    renderer.setSize(innerWidth, innerHeight)
  }
})
</script>

<style scoped></style>
