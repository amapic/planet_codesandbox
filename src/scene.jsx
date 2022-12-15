import { useState } from "react";
import { useFrame } from "@react-three/fiber";

import * as three from "three";
import "./styles.css";
import { useSpring, animated, config } from "@react-spring/three";

const Soleil = ({ infoEtoile, aa, ...args }) => {
  // let IMAGES = [
  //   { rotation: 0, position: [-2, 1, 1], radius: 1, freq: 30, text: "Z" },
  //   { rotation: 45, position: [-1, 1, 1], radius: 2, freq: 60, text: "R" },
  //   { rotation: 90, position: [-0, 1, 1], radius: 3, freq: 90, text: "T" },
  //   { rotation: 90, position: [-0, 1, 1], radius: 4, freq: 90, text: "T" },
  // ];

  const IMAGES = [
    {
      rotation: 200,
      position: [-2, 1, 1],
      radius: 1,
      periode: 50,
      text: "A",
      colorMap: "/earth.jpg",
      internalRadius: 0.1,
    },
    {
      rotation: 145,
      position: [-1, 1, 1],
      radius: 2,
      periode: 50,
      text: "B",
      colorMap: "/earth.jpg",
      internalRadius: 0.2,
    },
    {
      rotation: 190,
      position: [-0, 1, 1],
      radius: 3,
      periode: 70,
      text: "C",
      colorMap: "/earth.jpg",
      internalRadius: 0.3,
    },
  ];
  return (
    <>
      <animated.mesh
        // position={[Math.cos(sphereX), Math.sin(sphereX), 0]}
        {...args}
        onClick={(x) => {
          IMAGES.map((x) => (x.radius = x.radius + 1));
          // console.log(IMAGES);
          aa(IMAGES);
          // console.log(x.getWorldPosition(tt));
        }}
      >
        <sphereBufferGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={[255, 10, 1]} toneMapped={false} />
      </animated.mesh>
    </>
  );
};

export default function Scene() {
  useFrame(({ gl, scene, camera }) => {
    // console.log(camera.position);
    // myMesh2.current!.geometry.lookAt(0, 0, 0);
    // myMesh.current.BufferGeometry.computeBoundingBox();
    // myMesh2.current!.geometry.computeBoundingBox();
    // console.log(myMesh.current!.buffergeometry.getattribute("boundingbox"));
  }, 1);
  const IMAGES = [
    {
      rotation: 900,
      position: [-2, 1, 1],
      radius: 1,
      periode: 50,
      text: "A",
      colorMap: "/earth.jpg",
      internalRadius: 0.1,
    },
    {
      rotation: 700,
      position: [-1, 1, 1],
      radius: 2,
      periode: 60,
      text: "B",
      colorMap: "/earth.jpg",
      internalRadius: 0.2,
    },
    {
      rotation: 600,
      position: [-0, 1, 1],
      radius: 3,
      periode: 80,
      text: "C",
      colorMap: "/earth.jpg",
      internalRadius: 0.3,
    },
  ];

  const [infoEtoile, setInfoEtoile] = useState(IMAGES);
  const [compteur, setCompteur] = useState(0);

  // const yy = three.PASS();
  function AA(x) {
    setInfoEtoile(x);
    console.log(compteur);
    setCompteur(compteur + 1);
  }

  return (
    <>
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[0, 0, 0]} />
      <Soleil infoEtoile={infoEtoile} aa={AA} position={[0, 0, 0]} />
      {/* <Cube position={[-2, 1, 1]} /> */}
      {/* <MyRotatingBox position={[-1, 1, 1]} /> */}
      {/* <Effects /> */}
      {infoEtoile.map((image, i) => (
        <>
          <Planet compteur={compteur} key={i} image={image} />
        </>
      ))}
    </>
  );
}
