import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./tron_character/scene.gltf");

  return !isMobile ? (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <hemisphereLight intensity={1} groundColor="black" />
        <pointLight intensity={1} />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.003 : 0.002}
          position={[2, -1.25, -0.5]}
          rotation={[0, 1.3, 0]}
        />
      </mesh>
    </Float>
  ) : (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.003 : 0.002}
        position={[0, -3.25, -1.5]}
        rotation={[0, 1.3, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  // ! useEffect es como un onMounted
  useEffect(() => {
    // ! Quiero saber si el dispositivo es menor a 500px
    const mediaQuery = window.matchMedia("(max-width:500px)");

    const handleMediaQueryMatches = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryMatches);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryMatches);
    };
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
