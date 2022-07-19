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

interface DraggableProps extends React.PropsWithChildren {
  onDragStart: () => void;
  onDragEnd: () => void;
}

function Draggable(props: DraggableProps) {
  const groupRef = useRef<Group>(null);
  const controlsRef = useRef<DragControls>(null);
  const [objects, setObjects] = useState<Object3D<Event>[]>([]);
  const { camera, gl } = useThree();

  useEffect(() => {
    if (!groupRef?.current) return;
    setObjects(groupRef.current.children);
  }, [groupRef]);

  useEffect(() => {
    if (!controlsRef?.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      controlsRef.current.addEventListener("touchstart", () => {
        console.log("touchstart");
        props.onDragStart();
      });
      controlsRef.current.addEventListener("touchend", props.onDragEnd);
      return;
    }
    controlsRef.current.addEventListener("hoveron", props.onDragStart);
    controlsRef.current.addEventListener("hoveroff", props.onDragEnd);
  }, [objects]);
  return (
    <group ref={groupRef}>
      <dragControls ref={controlsRef} args={[objects, camera, gl.domElement]} />
      {props.children}
    </group>
  );
}

export default Draggable;
