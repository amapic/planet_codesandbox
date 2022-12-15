import * as DREI from "@react-three/drei";
import { Text } from "@react-three/drei";
import { useState, useRef, useLayoutEffect, useEffect } from "react";

import { useLoader, useFrame, extend } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import roboto from "./Roboto_Regular.json";

// extend({ TextGeometry });

import * as THREE from "three";

export default function CardPlanet({ text, position, hoveredd, ...args }) {
  const myMesh = useRef();
  const myMesh2 = useRef();

  var boxGeometry = new THREE.BoxGeometry();

  const [boxGeo, setBoxGeo] = useState([2, 2, 2]);
  const [hovered, hover] = useState(false);
  const [texto, setTexto] = useState(text);

  const colorMap = useLoader(TextureLoader, "/b.png");
  // var isJPEG =
  //   colorMap.url.search(/\.(jpg|jpeg)$/) > 0 ||
  //   colorMap.url.search(/^data\:image\/jpeg/) === 0;
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  // var mmesh = new THREE.Mesh();

  // var boxGeometry = new THREE.BoxGeometry();
  // mmesh.boundingbox;

  // useLayoutEffect(() => {}, []);
  // var ggg = colorMap.;
  // colorMap.format = RGBAFormat;
  colorMap.needsUpdate = true;
  // const aspect = colorMap.image.width / colorMap.image.height;

  useFrame(({ gl, scene, camera }) => {
    if (hoveredd) {
      myMesh2.current.parent.lookAt(0, camera.position[1], 0);
      //   camera.position[0],
      //   0,
      //   camera.position[2]
      // );
    }
  }, 1);

  const font = new FontLoader().parse(roboto);

  return (
    <group>
      <mesh
        position={[0, 2, 0]}
        // lookAt={[0, 0, 0]}
        scale={[4, 5, 2]}
        ref={myMesh}
        onPointerOver={(x) => {
          x.stopPropagation(); //not to have 2 elements hovered in the same time
          hover(true);
          // let hh = x.position;
          var vec = new THREE.Vector3();
          var box2 = new THREE.Box3().setFromObject(x.object);
          var boxx3 = new THREE.Box3();
          x.object.getWorldPosition();

          console.log("object", box2);
          console.log("boxsize", box2.getSize(vec));
          console.log("world_position", vec);
          const box = new THREE.BoxHelper(x.object, 0xffff00);
          // setBoxGeo(vec);

          // boxx3 = x.object.parent.geometry.boundingBox;
        }}
        onPointerOut={() => hover(false)}
      >
        <Text
          scale={[1, 1, 1]}
          anchorX="center" // default
          anchorY="middle" // default
          color="white"
          ref={myMesh2}
          fillOpacity={hoveredd ? 1 : 0}
          onUpdate={(x) => {}}
          // onUpdate={() => myMesh.current.lookAt([1, 10, 3])}
        >
          {text}
        </Text>
      </mesh>
      <mesh
        position={[0, 2, 0]}
        // ref={myMesh2}
        onUpdate={(x) => {}}
        // fillOpacity={hovered ? 1 : 0}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        ref={myMesh2}
      >
        {/* <boxGeometry geometry={[boxGeo[0], boxGeo[1], boxGeo[2]]} /> */}
        <planeGeometry geometry={[10, 10]} />
        <meshBasicMaterial
          color="red"
          map={colorMap}
          opacity={hoveredd ? 1 : 0}
          transparent
        />
      </mesh>
      {/* <mesh>
        <textGeometry args={["test", { font, size: 10, height: 10 }]} />
        <meshPhysicalMaterial attach="material" color="white" />
      </mesh> */}
    </group>
  );
}
