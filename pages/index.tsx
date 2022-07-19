import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Box from "../components/Box";
import Floor from "../components/Floor";
import Light from "../components/LightBulb";
import styles from "../styles/Home.module.css";
import Draggable from "../components/Draggable";
import { Suspense, useState } from "react";
import { MapControls } from "@react-three/drei";

const Home: NextPage = () => {
  const [isControlsEnabled, setIsControlsEnabled] = useState(true);
  return (
    <div className={styles.scene}>
      <Canvas
        shadows={true}
        className={styles.canvas}
        camera={{
          position: [-6, 7, 7],
        }}
      >
        <ambientLight color={"white"} intensity={0.2} />
        <Light position={[0, 3, 0]} />
        <Draggable
          onDragStart={() => setIsControlsEnabled(false)}
          onDragEnd={() => setIsControlsEnabled(true)}
        >
          <Suspense fallback={null}>
            <Box />
          </Suspense>
        </Draggable>
        <MapControls enabled={isControlsEnabled} />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
};

export default Home;
