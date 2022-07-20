import { MeshProps, useLoader } from "@react-three/fiber";
import React from "react";
import { Mesh, TextureLoader } from "three";

function Box(props: MeshProps, ref: React.Ref<Mesh>) {
  const texture = useLoader(TextureLoader, "/box-texture.jpg");
  return (
    <mesh {...props} ref={ref} receiveShadow={true} castShadow={true}>
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} color={"white"} />
    </mesh>
  );
}
export default React.forwardRef(Box);
