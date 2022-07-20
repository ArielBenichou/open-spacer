import { MeshProps, useLoader } from "@react-three/fiber";
import React from "react";
import { Mesh, TextureLoader } from "three";

function FloorTile(props: MeshProps, ref: React.Ref<Mesh>) {
  const texture = useLoader(TextureLoader, "/texture-concrete.jpg");
  return (
    <mesh
      {...props}
      ref={ref}
      receiveShadow={true}
      castShadow={true}
      scale={[1, 0.2, 1]}
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} color={"white"} />
    </mesh>
  );
}
export default React.forwardRef(FloorTile);
