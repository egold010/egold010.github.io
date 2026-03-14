import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import { ThemeService } from './theme.service';
import * as THREE from 'three';

@Component({
  selector: 'app-three-background',
  template: `
    <div #threeContainer class="three-background"></div>
  `,
  styles: [`
    .three-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
    }
  `]
})
export class ThreeBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('threeContainer', { static: true }) container!: ElementRef;

  @Input() particleCount: number = 1000;
  @Input() enableMouseInteraction: boolean = true;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.PointsMaterial;
  private animationId!: number;
  private mouse = new THREE.Vector2();
  private targetMouse = new THREE.Vector2();
  private themeSubscription: any;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.initThreeJS();
    this.createParticles();
    this.animate();

    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.updateThemeColors(theme);
    });

    // Mouse interaction
    if (this.enableMouseInteraction) {
      window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private initThreeJS() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    // Handle resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private createParticles() {
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);
    const sizes = new Float32Array(this.particleCount);

    for (let i = 0; i < this.particleCount; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 50 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Colors based on distance
      const distance = radius / 60;
      colors[i * 3] = 0.2 + distance * 0.3;     // R
      colors[i * 3 + 1] = 0.4 + distance * 0.4; // G
      colors[i * 3 + 2] = 0.8 + distance * 0.2; // B

      sizes[i] = Math.random() * 2 + 0.5;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Material
    this.material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    // Particles
    this.particles = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.particles);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    // Rotate particles
    if (this.particles) {
      this.particles.rotation.x += 0.0005;
      this.particles.rotation.y += 0.001;

      // Mouse interaction
      this.mouse.lerp(this.targetMouse, 0.02);
      this.camera.position.x = this.mouse.x * 2;
      this.camera.position.y = this.mouse.y * 2;
      this.camera.lookAt(this.scene.position);
    }

    this.renderer.render(this.scene, this.camera);
  };

  private onMouseMove(event: MouseEvent) {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private updateThemeColors(theme: 'dark' | 'light') {
    if (this.material) {
      const colors = this.geometry.attributes['color'].array as Float32Array;

      for (let i = 0; i < this.particleCount; i++) {
        if (theme === 'light') {
          colors[i * 3] = 0.1;     // R - more subtle in light mode
          colors[i * 3 + 1] = 0.3; // G
          colors[i * 3 + 2] = 0.6; // B
        } else {
          colors[i * 3] = 0.2;     // R - brighter in dark mode
          colors[i * 3 + 1] = 0.4; // G
          colors[i * 3 + 2] = 0.8; // B
        }
      }

      this.geometry.attributes['color'].needsUpdate = true;
    }
  }
}