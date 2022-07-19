import { MeshProps, useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";

function Box(props: MeshProps) {
  const texture = useLoader(TextureLoader, "/box-texture.jpg");
  return (
    <mesh {...props} receiveShadow={true} castShadow={true}>
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} color={"white"} />
    </mesh>
  );
}
export default Box;
