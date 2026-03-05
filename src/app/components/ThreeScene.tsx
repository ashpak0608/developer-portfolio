"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

function Box() {
    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#4f46e5" />
            </mesh>
        </Float>
    );
}

export default function ThreeScene() {
    return (
        <Canvas style={{ height: "400px" }}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 2]} />

            <Box />

            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}