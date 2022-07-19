import React, { useEffect, useRef, useState } from "react";
import { extend, ReactThreeFiber, useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { Event, Group, Object3D } from "three";

extend({ DragControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dragControls: ReactThreeFiber.Object3DNode<
        DragControls,
        typeof DragControls
      >;
    }
  }
}

function Draggable(props: React.PropsWithChildren) {
  const groupRef = useRef<Group>(null);
  const controlsRef = useRef<DragControls>(null);
  const [objects, setObjects] = useState<Object3D<Event>[]>([]);
  const { camera, gl, scene } = useThree();
  useEffect(() => {
    if (!groupRef?.current) return;
    setObjects(groupRef.current.children);
  }, [groupRef]);

  useEffect(() => {
    if (!controlsRef?.current) return;
    controlsRef.current.addEventListener("hoveron", () => {
      //HACK
      (scene as any).orbitControls.enabled = false;
    });
    controlsRef.current.addEventListener("hoveroff", () => {
      //HACK
      (scene as any).orbitControls.enabled = true;
    });
  }, [objects]);
  return (
    <group ref={groupRef}>
      <dragControls ref={controlsRef} args={[objects, camera, gl.domElement]} />
      {props.children}
    </group>
  );
}

export default Draggable;
