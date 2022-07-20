import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Box from "../components/objects/Box";
import PointLight from "../components/objects/lights/PointLight";
import styles from "../styles/Home.module.css";
import Draggable from "../components/wrappers/Draggable";
import React, { Suspense, useState } from "react";
import { MapControls } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import FloorTile from "../components/objects/FloorTile";

const CAMERA_POSITION: Vector3 = new Vector3(5, 6, 5);
const BOX_POSITION: Vector3 = new Vector3(2, 0, 2);

const ROW_LENGTH = 25;
const initialMap: { id: number; hidden: boolean }[] = Array(25 * 25)
  .fill({ hidden: false })
  .map((el, idx) => ({ ...el, id: idx }));

const Home: NextPage = () => {
  const boxRef = React.createRef<Mesh>();
  const [gameMap, setGameMap] = useState(initialMap);
  const [isControlsEnabled, setIsControlsEnabled] = useState<boolean>(true);
  const resetLevel = () => {
    setGameMap(initialMap);
    boxRef.current?.position.set(...BOX_POSITION.toArray());
  };
  const hideTile = (id: number) => {
    const newMap = gameMap.map((el) => {
      if (el.id === id) return { ...el, hidden: true };
      return el;
    });

    setGameMap(newMap);
  };
  return (
    <div>
      <div className="z-10 absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl">
          <span className="font-bold">Open</span>
          <span className="font-light">Spacer</span>
        </h1>
        <h3 className="font-light text-sm mt-2">
          Click on Tiles. Drag the Box.
        </h3>
      </div>
      <div
        className="bg-rose-600 text-white hover:bg-rose-700 font-bold w-24 h-10 flex justify-center items-center rounded absolute z-10 bottom-5 right-7 cursor-pointer"
        onClick={resetLevel}
      >
        Reset
      </div>
      <div className={styles.scene}>
        <Canvas
          shadows={true}
          className={styles.canvas}
          orthographic
          camera={{
            zoom: 100,
            position: CAMERA_POSITION,
          }}
        >
          <ambientLight color={"white"} intensity={0.2} />
          <PointLight position={[2, 3, 2]} />
          <Draggable
            onDragStart={() => setIsControlsEnabled(false)}
            onDragEnd={() => setIsControlsEnabled(true)}
          >
            <Suspense fallback={null}>
              <Box ref={boxRef} position={BOX_POSITION} />
            </Suspense>
          </Draggable>
          <MapControls enabled={isControlsEnabled} />

          {gameMap.map((tile, idx) => {
            return tile.hidden ? null : (
              <FloorTile
                key={idx}
                position={[
                  idx % ROW_LENGTH,
                  -0.6,
                  Math.floor(idx / ROW_LENGTH),
                ]}

                onClick={() => hideTile(tile.id)}
              />
            );
          })}
        </Canvas>
      </div>
    </div>
  );
};

export default Home;
