import { MeshProps } from "@react-three/fiber";
import React from "react";

function Floor(props: MeshProps) {
  return (
    <mesh {...props} receiveShadow={true}>
      <boxBufferGeometry args={[20,1,10]} />
      <meshPhysicalMaterial color='white' />
    </mesh>
  );
}

export default Floor;