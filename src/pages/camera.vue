<template>
  <div id="p-camera"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import dat from 'dat.gui'

onMounted(function () {
  const { innerWidth, innerHeight } = window

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(innerWidth, innerHeight)
  renderer.shadowMap.enabled = true

  const container = document.querySelector('#p-camera')
  container?.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  let camera: THREE.PerspectiveCamera | THREE.OrthographicCamera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  )
  // const camera = new THREE.OrthographicCamera(
  //   -innerWidth / 16,
  //   innerWidth / 16,
  //   -innerHeight / 16,
  //   innerWidth / 16,
  //   0,
  //   1000
  // )

  camera.position.x = -30
  camera.position.y = 40
  camera.position.z = 30
  camera.lookAt(scene.position)

  const axes = new THREE.AxesHelper(50)
  axes.setColors(new THREE.Color(0xffff00), new THREE.Color(0xff00ff), new THREE.Color(0x00ffff))
  scene.add(axes)

  const planeGeometry = new THREE.PlaneGeometry(100, 100)
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(0, 0, 0)
  plane.receiveShadow = true

  scene.add(plane)

  const ambientLight = new THREE.AmbientLight(0xaaaaaa)

  scene.add(ambientLight)

  // 光源
  const spotLight = new THREE.SpotLight(0xffffff)

  spotLight.position.set(-60, 40, -65)
  spotLight.castShadow = true
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
  spotLight.shadow.camera.far = 130
  spotLight.shadow.camera.near = 40

  scene.add(spotLight)

  console.log(planeGeometry)

  const { width: planeWidth, height: planeHeight } = planeGeometry.parameters

  const size = 4
  const hLen = planeHeight / (size + 1)
  const wLen = planeWidth / (size + 1)

  for (let i = 0; i < wLen; i++) {
    for (let j = 0; j < hLen; j++) {
      const nGeo = new THREE.BoxGeometry(size, size, size)
      const nMaterial = new THREE.MeshLambertMaterial()
      nMaterial.color = new THREE.Color(0, Math.random() * 0.25 + 0.5, 0)
      const nCube = new THREE.Mesh(nGeo, nMaterial)
      nCube.position.y = 2
      nCube.position.x = -(planeWidth / 2) + i * (size + 1)
      nCube.position.z = -(planeHeight / 2) + j * (size + 1)
      scene.add(nCube)
    }
  }

  const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
  const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xfe0efe })
  const boxCube = new THREE.Mesh(boxGeometry, boxMaterial)

  boxCube.position.x = 0
  boxCube.position.y = 12
  boxCube.position.z = 0

  scene.add(boxCube)

  const ctrl = new dat.GUI()

  const ctrlObj = {
    text: '透视摄像机',
    changeCamera() {
      if (camera instanceof THREE.PerspectiveCamera) {
        this.text = '正交摄像机'
        camera = new THREE.OrthographicCamera(
          innerWidth / -16,
          innerWidth / 16,
          innerHeight / 16,
          innerHeight / -16,
          -1000,
          1000
        )
      } else {
        this.text = '透视摄像机'
        camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
      }
      camera.position.x = -30
      camera.position.y = 40
      camera.position.z = 30
      camera.lookAt(scene.position)
    }
  }

  ctrl.add(ctrlObj, 'text').listen()
  ctrl.add(ctrlObj, 'changeCamera')

  let posx = 0

  function render() {
    posx += 0.01
    console.log(1 + 10 * Math.sin(posx))
    boxCube.position.x = 10 + 100 * Math.sin(posx)
    camera.lookAt(boxCube.position)
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }

  render()
})
</script>

<style scoped></style>
