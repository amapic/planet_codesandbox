import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
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
import { Effects } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import CardPlanet from "./Text";

import create from "zustand";

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// export function Tt() {
//   const colorMap = useLoader(TextureLoader, "/earth.jpg");
//   // useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
//   return (
//     <mesh>
//       <sphereGeometry args={[1, 32, 32]} />
//       <meshStandardMaterial map={colorMap} />
//     </mesh>
//   );
// }

export default function Planet({ compteur, image, ...args }) {
  const cube = useRef<three.Mesh>();

  const colorMap = useLoader(TextureLoader, image.colorMap);

  const [sphereX, setSphereX] = useState(0);
  const [radius, setRadius] = useState(0);

  // const [animDepart, setanimDepart] = useState(true);
  const [hoveredd, hover] = useState(false);
  // console.log("aa");
  useEffect(() => {
    console.log("eee");
  }, []);

  // function UpdatePlanet() {
  //   setanimDepart(false);
  // }

  // const { pos, ...props } = useSpring({
  //   pos: animDepart ? [1, 0, 1] : [2, 0, 2],
  //   config: {
  //     duration: "1s",
  //     mass: 10,
  //     tension: 1000,
  //     friction: 300,
  //     precision: 0.00001
  //   }
  // });

  var timeoutId = 0;
  var oldRadius = 0;

  const [sphereRef, sphereApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [0, 0, 0],
  }));

  const [cardRef, cardApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [0, 0, 0],
  }));

  useFrame(() => {
    // console.log('sphereRef position', sphereRef.current.position);
    // console.log('sphereAPI position', sphereApi.position);
    if (image.radius > radius) {
      setRadius(radius + 0.05);
      // if (cardInc != radius){
      //   setCardInc((cardInc) => oldRadius);
      // }
      // setCardInc((sphereInc) => oldRadius + 0.05);
    }

    setSphereX((sphereX) => sphereX + 0.05);
    sphereApi.position.set(
      radius * Math.cos((sphereX * 2 * Math.PI) / image.periode),
      0,
      radius * Math.sin((sphereX * 2 * Math.PI) / image.periode)
    );

    sphereApi.rotation.set(0, sphereX, 0);
    cardApi.position.set(
      radius * Math.cos((sphereX * 2 * Math.PI) / image.periode),
      0,
      radius * Math.sin((sphereX * 2 * Math.PI) / image.periode)
    );
  }, 2);

  return (
    <>
      <animated.mesh ref={cardRef}>
        <CardPlanet
          {...args}
          hoveredd={hoveredd}
          text={image.text}
          image={image}
        />
      </animated.mesh>
      <animated.mesh
      
        ref={sphereRef}
        {...args}
        onPointerOver={() => {
          hover(true);
          clearTimeout(timeoutId);
        }}
        onPointerOut={(x) => {
          timeoutId = setTimeout(() => {
            hover(false);
            var aa = x.object.position;
            // x.object.getWorldPosition(aa);
            console.log(aa);
          }, 500);
        }}
      >
        <sphereBufferGeometry args={[image.internalRadius, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          // color={[255, 10, 1]}
          // toneMapped={false}
        />
      </animated.mesh>
    </>
  );
}
