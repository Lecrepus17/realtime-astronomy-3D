import * as THREE from 'three'

export type MoonModelProps = {
    textures: {
        map: string,
        bump: string,
        normal: string
    },
    orbitRadius: number
    orbitSpeed: number
    height: number
    size: number
    angle: number
}

export class MoonModel {

    textures: { [key: string]: THREE.Texture } = {}
    //@ts-ignore
    mesh: THREE.Mesh
    orbitRadius: number
    orbitSpeed: number
    height: number
    size: number
    angle: number

    constructor(props: MoonModelProps) {
        this.orbitRadius = props.orbitRadius
        this.orbitSpeed = props.orbitSpeed
        this.height = props.height
        this.size = props.size
        this.angle = props.angle
        this.loadTextures(props.textures)
        this.loadGeometry()
    }

    loadTextures(textures: MoonModelProps['textures']) {
        const textureLoader = new THREE.TextureLoader();
        this.textures.moonTexture = textureLoader.load(textures.map);
        this.textures.moonBumpMap = textureLoader.load(textures.bump);
        this.textures.moonNormalMap = textureLoader.load(textures.normal);
    }

    loadGeometry() {
        const moonMaterial = new THREE.MeshPhongMaterial({
            map: this.textures.moonTexture,
            bumpMap: this.textures.moonBumpMap,  // Aplicando o bump map
            bumpScale: 1,  // Ajuste a intensidade do relevo 
            normalMap: this.textures.moonNormalMap,
        });

        console.log(this.size)
        const moonGeometry = new THREE.SphereGeometry(this.size, 16, 16);
        this.mesh = new THREE.Mesh(moonGeometry, moonMaterial);
        this.mesh.castShadow = true

        this.mesh.position.set(
            Math.cos(this.angle) * this.orbitRadius,
            this.height,
            Math.sin(this.angle) * this.orbitRadius
        );
    }

    animate() {
        // Simula a órbita da Lua ao redor da Terra
        this.angle += this.orbitSpeed;

        // Inclinação da órbita de 5 graus (convertido para radianos)
        const inclination = THREE.MathUtils.degToRad(this.height);
        this.mesh.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.mesh.position.z = Math.sin(this.angle) * this.orbitRadius * Math.cos(inclination);
        this.mesh.position.y = Math.sin(this.angle) * this.orbitRadius * Math.sin(inclination);
    }
}