import { MeshProps } from "@react-three/fiber";
import React from "react";

function PointLight(props: MeshProps) {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.1, 30, 10]} />
      <meshPhongMaterial emissive={"yellow"} />
    </mesh>
  );
}

export default PointLight;
