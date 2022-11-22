import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
  Stats,
  OrbitControls,
  Effects as EffectsComposer
} from "@react-three/drei";

import { Debug, Physics, usePlane, useSphere } from "@react-three/cannon";
import * as three from "three";
import "./styles.css";
import { useSpring, animated, config } from "@react-spring/three";

import { UnrealBloomPass } from "three-stdlib";
import { useControls } from "leva";
import { Effects } from "@react-three/drei";

import AA, { Shape2, CardPlanet } from "./Text";
import Planet, { Tt } from "./Planet";
import ItemList from "./LoopCreation";
// import { Effects, BloomPerso } from "./Effects";
import FrameLimiter, { FPSLimiter } from "./FrameLimiter";
extend({ UnrealBloomPass });

const ButtonChangeState = ({ infoEtoile, aa, ...args }) => {
  let IMAGES = [
    { rotation: 0, position: [-2, 1, 1], radius: 1, freq: 30, text: "Z" },
    { rotation: 45, position: [-1, 1, 1], radius: 2, freq: 60, text: "R" },
    { rotation: 90, position: [-0, 1, 1], radius: 3, freq: 90, text: "T" }
  ];
  return (
    <>
      <animated.mesh
        // position={[Math.cos(sphereX), Math.sin(sphereX), 0]}
        {...args}
        onClick={(x) => {
          infoEtoile.map((x) => (x.radius = x.radius + 1));
          // console.log(IMAGES);
          aa(infoEtoile);
          // console.log(x.getWorldPosition(tt));
        }}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
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
      rotation: 0,
      position: [-2, 1, 1],
      radius: 1,
      freq: 30,
      text: "A",
      colorMap: "/earth.jpg"
    },
    {
      rotation: 45,
      position: [-1, 1, 1],
      radius: 2,
      freq: 60,
      text: ">TTT",
      colorMap: "/earth.jpg"
    },
    {
      rotation: 90,
      position: [-0, 1, 1],
      radius: 3,
      freq: 90,
      text: "HHHHHHHHHHH",
      colorMap: "/earth.jpg"
    }
  ];

  const [infoEtoile, setInfoEtoile] = useState(IMAGES);

  function AA(x) {
    setInfoEtoile(x);
    console.log(x);
  }

  return (
    <>
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[5, 3, 5]} />
      <ButtonChangeState infoEtoile={infoEtoile} aa={AA} position={[1, 1, 1]} />
      {/* <Cube position={[-2, 1, 1]} /> */}
      {/* <MyRotatingBox position={[-1, 1, 1]} /> */}
      {/* <Effects /> */}
      {infoEtoile.map((image, i) => (
        <>
          <Planet
            key={i}
            image={image}
            rotationx={image.rotation}
            rotationy={image.rotation}
            position={image.position}
            radius={image.radius}
            colorMap={image.colorMap}
          />
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
    radius: { value: 0.4, min: 0, max: 1, step: 0.01 }
  });
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw"
      }}
    >
      <Canvas
        // concurrent
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [4, 4, 4]
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
        {/* <Camera /> */}
        {/* <Shape color={[1, 4, 0.5]} position={[2, 0, 0]}>
          <circleGeometry args={[0.8, 64]} />
        </Shape> */}
        {/* <Cube color={[1, 4, 0.5]} position={[-2, 1, 1]} /> */}
        <Stats />
        <OrbitControls />
        <Suspense fallback={null}>
          <Physics allowSleep={false} gravity={[0, 0, 0]}>
            <Scene />
            <Tt />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
