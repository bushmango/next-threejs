import React from 'react'
import { Layout } from '../layout/Layout-sidecar'
import * as THREE from 'three'
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import GLTFLoader from 'three-gltf-loader'

function initScene() {
  var scene = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  )

  var renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  var geometry = new THREE.BoxGeometry()
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  var cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  cube.translateX(-2)

  camera.position.z = 5

  var loader = new GLTFLoader()
  var gltfLoaded: any = null
  loader.load(
    '/ring.gltf',
    function (gltf) {
      gltfLoaded = gltf

      scene.add(gltf.scene)
      gltf.scene.translateX(2)
    },
    undefined,
    function (error) {
      console.error(error)
    },
  )

  let bounce = false
  let max = Math.PI / 3
  var animate = function () {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    if (gltfLoaded) {
      gltfLoaded.scene.rotation.z += 0.01
      if (bounce) {
        gltfLoaded.scene.rotation.y -= 0.01
        if (gltfLoaded.scene.rotation.y < -max) {
          bounce = false
        }
      } else {
        gltfLoaded.scene.rotation.y += 0.01
        if (gltfLoaded.scene.rotation.y > max) {
          bounce = true
        }
      }
    }

    renderer.render(scene, camera)
  }

  animate()
}

export const HomePage = () => {
  React.useEffect(() => {
    initScene()
  }, [])

  return <Layout title='Home'>Test page here</Layout>
}
