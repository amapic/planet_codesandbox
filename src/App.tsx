import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
  Stats,
  OrbitControls,
  Effects as EffectsComposer,
} from "@react-three/drei";

import { Debug, Physics, usePlane, useSphere } from "@react-three/cannon";
import * as three from "three";
import "./styles.css";
import { useSpring, animated, config } from "@react-spring/three";

import { UnrealBloomPass } from "three-stdlib";
import { useControls } from "leva";
import { Effects, Stars } from "@react-three/drei";

import BoxBlendGeometry from "./roundedRectangle";

import CardPlanet from "./Text";
import Planet from "./Planet";
import ItemList from "./LoopCreation";
// import { Effects, BloomPerso } from "./Effects";
import FrameLimiter, { FPSLimiter } from "./FrameLimiter";
extend({ UnrealBloomPass });

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

const Scene = () => {
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
};

const App = () => {
  const cam = useRef<three.Mesh>();
  // const aspect = useMemo(() => new three.Vector2(100, 100), []);
  const { intensity, radius } = useControls({
    intensity: { value: 1, min: 0, max: 1.5, step: 0.01 },
    radius: { value: 0.4, min: 0, max: 1, step: 0.01 },
  });
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas
        // concurrent
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [4, 4, 4],
        }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor("#252934");
          camera.lookAt(0, 0, 0);
          camera.position.set(4, 4, 4);
        }}
      >
        {/* <FrameLimiter /> */}
        <FPSLimiter />
        <Effects disableGamma>
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}
          <unrealBloomPass threshold={1} strength={intensity} radius={radius} />
        </Effects>

        <Stats />
        <OrbitControls />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Suspense fallback={null}>
          <Physics allowSleep={false} gravity={[0, 0, 0]}>
            <Scene />
            <group rotation={[0.8, 0, 0.8]}>
              <mesh position={[0.5, 0, 1]}>
                <BoxBlendGeometry radius={0.4} />
                <meshBasicMaterial color="red" />
              </mesh>
            </group>
            {/* <Tt /> */}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
