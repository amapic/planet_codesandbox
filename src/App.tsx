import React, { Suspense, useRef, useEffect, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  createPortal,
} from "@react-three/fiber";
import {
  Stats,
  OrbitControls,
  Effects as EffectsComposer,
  PerspectiveCamera,
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
import Scene from "./scene";
// import ItemList from "./LoopCreation";
// import { Effects, BloomPerso } from "./Effects";
import FrameLimiter, { FPSLimiter } from "./FrameLimiter";

import { SSAOPass } from "three-stdlib";

function RenderHud({ defaultScene, defaultCamera, renderPriority = 1 }) {
  const { gl, scene, camera } = useThree();
  useFrame(() => {
    if (renderPriority === 1) {
      // Clear scene and render the default scene
      gl.autoClear = true;
      gl.render(defaultScene, defaultCamera);
    }
    // Disable cleaning and render the portal with its own camera
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene, camera);
  }, renderPriority);
}
function Hud({ children, renderPriority = 1 }) {
  const { scene: defaultScene, camera: defaultCamera } = useThree();
  const [hudScene] = useState(() => new three.Scene());
  return createPortal(
    <>
      {children}
      <RenderHud
        defaultScene={defaultScene}
        defaultCamera={defaultCamera}
        renderPriority={renderPriority}
      />
    </>,
    hudScene,
    { events: { priority: renderPriority + 1 } }
  );
}
// import { Pass } from "three";
// import { SSAO } from "three/examples/jsm/postprocessing";
// import { EffectComposer, SSAO, SMAA } from "@react-three/drei/po";
// import { SSAO } from "@react-three/postprocessing";
// import { SSAO, SSR } from "@react-three/postprocessing";

// import {
//   EffectComposer,
//   DepthOfField,
//   Bloom,
//   Noise,
//   Vignette,
// } from "@react-three/postprocessing";

extend({ UnrealBloomPass });

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
          console.log(window.devicePixelRatio);
        }}
      >
        {/* <FrameLimiter /> */}
        <FPSLimiter />
        <Effects disableGamma>
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}

          {/* <SSAO /> */}
          {/* <sSAOPass /> */}
          {/* <Noise
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.ADD} // blend mode
          /> */}
          {/* <unrealBloomPass threshold={1} strength={intensity} radius={radius} /> */}
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

            {/* <Tt /> */}
          </Physics>

          <Hud renderPriority={2}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <mesh>
              <ringGeometry args={[0.5, 1, 64]} />
              <meshBasicMaterial color="hotpink" />
            </mesh>
            {/* <mesh> */}
            {/*<kk.RoundedrectGeometry args={[0.5, 1, 64, 1]}>
              <meshBasicMaterial color="hotpink" />
              </mesh> */}
            {/* <group rotation={[0.8, 0, 0.8]}>
            <mesh position={[0.5, 0, 1]}>
              <BoxBlendGeometry radius={0.4} />
              <meshBasicMaterial color="red" />
            </mesh>
          </group> */}
            {/* <RoundedRectangle args={[0.5, 1, 64, 1]} /> */}
            {/* <mesh position={[3, 3, 3]}
            
            >
              <bufferGeometry attach="geometry" geometry={yy} />
              <meshBasicMaterial color="hotpink" />
            </mesh> */}
          </Hud>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
