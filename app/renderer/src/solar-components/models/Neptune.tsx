
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'
type GLTFResult = GLTF & {
  nodes: {
    Esfera_Mat1_0: THREE.Mesh
    Esfera_Mat1_0_1: THREE.Mesh
    Esfera_Mat1_0_2: THREE.Mesh
    Esfera_Mat1_0_3: THREE.Mesh
    Esfera_Mat1_0_4: THREE.Mesh
    Esfera_Mat1_0_5: THREE.Mesh
    Esfera_Mat1_0_6: THREE.Mesh
    Esfera_Mat1_0_7: THREE.Mesh
    Plano_Mat_0: THREE.Mesh
  }
  materials: {
    ['Mat.1']: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

function CircleGeometry(radius: number, segments: number, center: THREE.Vector3): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];


  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = center.x + radius * Math.cos(theta);
    const y = center.y;
    const z = center.z + radius * Math.sin(theta);
    vertices.push(x, y, z);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  return geometry;
}


type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('../../../public/neptune.glb') as GLTFResult;

  const groupScale = 0.05;
  const sphereScale = 1;


  const groupRef = useRef<THREE.Group>(null);
  const [websocket, setWs] = useState<WebSocket | null>(null);


useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    ws.addEventListener("open", (event) => {
        ws.send("Connection established");
    });

    setWs(ws);

    return () => {
        ws.close();
    };
}, []);

  useFrame(() => {
    if (websocket && websocket.readyState === WebSocket.OPEN && groupRef.current) {
      const position = groupRef.current.position.clone();
      const theta = Math.atan2(groupRef.current.position.z, groupRef.current.position.x);
      websocket.send(JSON.stringify({ type: 'mercury', coords: {x: position.x, y: position.y, z: position.z}, theta: theta}));
    }
  });
  return (
    <group>
      <group {...props} dispose={null} position={[-400, 0, 0]} scale={[groupScale, groupScale, groupScale]} ref={groupRef}>
        <group rotation={[-2.967, 1.045, -Math.PI]}>
          <mesh geometry={nodes.Esfera_Mat1_0.geometry} material={materials['Mat.1']}  castShadow 
              receiveShadow />
          <mesh geometry={nodes.Esfera_Mat1_0_1.geometry} material={materials['Mat.1']}  castShadow 
              receiveShadow />
          <mesh geometry={nodes.Esfera_Mat1_0_2.geometry} material={materials['Mat.1']}  castShadow 
              receiveShadow />
          <mesh geometry={nodes.Esfera_Mat1_0_3.geometry} material={materials['Mat.1']}  castShadow 
              receiveShadow />
          <mesh geometry={nodes.Esfera_Mat1_0_4.geometry} material={materials['Mat.1']}  castShadow 
              receiveShadow />
          <mesh geometry={nodes.Esfera_Mat1_0_5.geometry} material={materials['Mat.1']}  castShadow 
              receiveShadow />
          <mesh geometry={nodes.Esfera_Mat1_0_6.geometry} material={materials['Mat.1']}  castShadow 
              receiveShadow />
          <mesh geometry={nodes.Esfera_Mat1_0_7.geometry} material={materials['Mat.1']}  castShadow 
              receiveShadow />
        </group>
        <group rotation={[-1.396, 0, 0]}>
          <mesh geometry={nodes.Plano_Mat_0.geometry} material={materials.material} position={[-140, 5, -1]} scale={[groupScale, groupScale, groupScale]}  castShadow 
              receiveShadow />
        </group>
      </group>
      <line geometry={CircleGeometry(520, 64, new THREE.Vector3(120, 0, 0))}>
        <lineBasicMaterial color={`#ADAAA8 `} transparent opacity={0.5} />
      </line>
    </group>
  )
}

useGLTF.preload('../../../public/neptune.glb')
