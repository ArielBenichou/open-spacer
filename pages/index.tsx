import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Box from "../components/Box";
import Floor from "../components/Floor";
import Light from "../components/LightBulb";
import OrbitControls from "../components/OrbitControls";
import styles from "../styles/Home.module.css";
import Draggable from "../components/Draggable";
import { Suspense } from "react";

const Home: NextPage = () => {
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
        <Draggable>
          <Suspense fallback={null}>
            <Box />
          </Suspense>
        </Draggable>
        <OrbitControls />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
};

export default Home;
