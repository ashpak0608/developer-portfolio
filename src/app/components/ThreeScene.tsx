"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingShapes() {
    const shapes = useMemo(() => {
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.7, 32, 32),
            new THREE.TorusGeometry(0.5, 0.2, 16, 100),
            new THREE.IcosahedronGeometry(0.7),
            new THREE.ConeGeometry(0.7, 1.4, 32),
        ];

        const colors = [
            "#8b5cf6", // purple
            "#ec4899", // pink
            "#3b82f6", // blue
            "#10b981", // green
            "#f59e0b", // orange
        ];

        return geometries.map((geo, i) => ({
            geometry: geo,
            color: colors[i % colors.length],
            position: [
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
            ] as [number, number, number],
            rotationSpeed: (Math.random() - 0.5) * 0.02,
        }));
    }, []);

    const meshRefs = useRef<THREE.Mesh[]>([]);

    useFrame((state, delta) => {
        meshRefs.current.forEach((mesh, i) => {
            if (mesh) {
                // Use delta for smooth animation instead of fixed rotation
                mesh.rotation.x += shapes[i].rotationSpeed * delta * 30;
                mesh.rotation.y += shapes[i].rotationSpeed * delta * 30;
            }
        });
    });

    return (
        <>
            {shapes.map((shape, i) => (
                <Float
                    key={i}
                    speed={2}
                    rotationIntensity={1}
                    floatIntensity={2}
                >
                    <mesh
                        ref={(el) => {
                            if (el) meshRefs.current[i] = el;
                        }}
                        geometry={shape.geometry}
                        position={shape.position}
                    >
                        <meshStandardMaterial
                            color={shape.color}
                            emissive={shape.color}
                            emissiveIntensity={0.2}
                            roughness={0.3}
                            metalness={0.1}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                </Float>
            ))}
        </>
    );
}

function FloatingCode() {
    const technologies = ["React", "Next.js", "Node.js", "TypeScript", "Python"];

    return (
        <>
            {technologies.map((tech, i) => (
                <Float
                    key={tech}
                    speed={1.5}
                    rotationIntensity={1}
                    floatIntensity={1.5}
                >
                    <Text
                        position={[
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 6,
                            (Math.random() - 0.5) * 5,
                        ]}
                        fontSize={0.5}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        fontWeight="bold"
                    >
                        {tech}
                    </Text>
                </Float>
            ))}
        </>
    );
}

export default function ThreeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            style={{ background: "transparent" }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <pointLight position={[0, 0, 5]} intensity={0.5} />

            <FloatingShapes />
            <FloatingCode />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </Canvas>
    );
}