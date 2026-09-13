import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, BookOpen, Compass, Sparkles, Maximize2, X } from 'lucide-react';

export default function Book3DViewer({ currentBook, onOpenChapter }) {
  const containerRef = useRef(null);
  const canvasMountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const bookMeshRef = useRef(null);
  const targetRotationRef = useRef({ x: -0.15, y: 0.55 });
  const currentRotationRef = useRef({ x: -0.15, y: 0.55 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const lightRef = useRef(null);
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  const [activePerspective, setActivePerspective] = useState('perspectiva');
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with responsive distance based on aspect ratio
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    cameraRef.current = camera;
    if (aspect < 1) {
      camera.position.set(0, 0.2, 8.5 + (1 - aspect) * 7.5);
    } else {
      camera.position.set(0, 0.2, 8.5);
    }

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 4. Lighting: Architectural Warm Sunlight
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff3df, 2.2);
    sunLight.position.set(5, 7, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);
    lightRef.current = sunLight;

    // Subtle soft fill light
    const fillLight = new THREE.DirectionalLight(0xe8dfd5, 0.8);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    // 5. Contact Shadow Ground Plane
    const shadowGeo = new THREE.PlaneGeometry(10, 10);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.6;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 6. Create Book Geometry & Mesh
    const bookWidth = 3.2;
    const bookHeight = 4.8;
    const bookDepth = 0.55;
    const geometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);

    // Initial placeholder materials
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xf5eedf, roughness: 0.7 }), // Right (paper)
      new THREE.MeshStandardMaterial({ color: 0x34312e, roughness: 0.5 }), // Left (spine)
      new THREE.MeshStandardMaterial({ color: 0xf5eedf, roughness: 0.7 }), // Top (paper)
      new THREE.MeshStandardMaterial({ color: 0xf5eedf, roughness: 0.7 }), // Bottom (paper)
      new THREE.MeshStandardMaterial({ color: 0xf5eedf, roughness: 0.5 }), // Front
      new THREE.MeshStandardMaterial({ color: 0x34312e, roughness: 0.5 }), // Back
    ];

    const bookMesh = new THREE.Mesh(geometry, materials);
    bookMesh.castShadow = true;
    bookMesh.receiveShadow = true;
    bookMeshRef.current = bookMesh;
    scene.add(bookMesh);

    // Load Textures function
    loadBookTextures(currentBook, bookMesh);

    // 7. Render Loop with Smooth Damping
    let animationFrameId;
    let autoRotateTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth interpolation for rotation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (bookMeshRef.current) {
        // Subtle floating / breath motion
        autoRotateTime += 0.012;
        const breathOffset = Math.sin(autoRotateTime) * 0.04;
        
        bookMeshRef.current.rotation.x = currentRotationRef.current.x;
        bookMeshRef.current.rotation.y = currentRotationRef.current.y;
        bookMeshRef.current.position.y = breathOffset;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mount || !rendererRef.current || !cameraRef.current) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight || (isFullscreen ? window.innerHeight : 480);
      const aspect = newWidth / newHeight;
      cameraRef.current.aspect = aspect;
      if (aspect < 1) {
        cameraRef.current.position.z = 8.5 + (1 - aspect) * 7.5;
      } else {
        cameraRef.current.position.z = 8.5;
      }
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      materials.forEach(m => m.dispose());
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle Fullscreen Transitions & Resizing
  useEffect(() => {
    const updateSize = () => {
      if (!canvasMountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = canvasMountRef.current.clientWidth || window.innerWidth;
      const h = canvasMountRef.current.clientHeight || (isFullscreen ? window.innerHeight : 400);
      const aspect = w / h;
      cameraRef.current.aspect = aspect;
      if (aspect < 1) {
        cameraRef.current.position.z = 8.5 + (1 - aspect) * 7.5;
      } else {
        cameraRef.current.position.z = 8.5;
      }
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const timer1 = setTimeout(updateSize, 30);
    const timer2 = setTimeout(updateSize, 120);

    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Escape key to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Update textures when currentBook changes
  useEffect(() => {
    if (bookMeshRef.current && currentBook) {
      loadBookTextures(currentBook, bookMeshRef.current);
      // Gentle subtle spin to showcase the new book
      targetRotationRef.current = { x: -0.15, y: 0.55 };
      setActivePerspective('perspectiva');
    }
  }, [currentBook]);

  // Texture loading helper
  const loadBookTextures = (book, mesh) => {
    const loader = textureLoaderRef.current;

    const paperTex = loader.load(book.textures.paper);
    paperTex.wrapS = THREE.RepeatWrapping;
    paperTex.wrapT = THREE.RepeatWrapping;
    paperTex.repeat.set(1, 4);

    const frontTex = loader.load(book.textures.front);
    const spineTex = loader.load(book.textures.spine);
    const backTex = loader.load(book.textures.back);

    // Enable anisotropy for sharp high-res rendering
    [frontTex, spineTex, backTex, paperTex].forEach(t => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });

    const paperMat = new THREE.MeshStandardMaterial({
      map: paperTex,
      roughness: 0.85,
      metalness: 0.02
    });

    mesh.material = [
      paperMat, // Right (+X): Page edges
      new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.45, metalness: 0.05 }), // Left (-X): Spine
      paperMat, // Top (+Y)
      paperMat, // Bottom (-Y)
      new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.4, metalness: 0.08 }), // Front (+Z)
      new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.45, metalness: 0.05 })   // Back (-Z)
    ];
  };

  // Mouse / Touch Drag Handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    // Dynamic sun light follow
    if (containerRef.current && lightRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      lightRef.current.position.set(4 + nx * 3, 6 + ny * 2, 5);
    }

    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.012;
    targetRotationRef.current.x += deltaY * 0.008;

    // Clamp X rotation to prevent flipping upside down
    targetRotationRef.current.x = Math.max(-0.8, Math.min(0.8, targetRotationRef.current.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    setActivePerspective('custom');
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.014;
    targetRotationRef.current.x += deltaY * 0.01;
    targetRotationRef.current.x = Math.max(-0.8, Math.min(0.8, targetRotationRef.current.x));

    previousMousePositionRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Camera presets
  const setPerspective = (preset) => {
    setActivePerspective(preset);
    switch (preset) {
      case 'portada':
        targetRotationRef.current = { x: 0, y: 0 };
        break;
      case 'lomo':
        targetRotationRef.current = { x: 0, y: Math.PI / 2 };
        break;
      case 'contraportada':
        targetRotationRef.current = { x: 0, y: Math.PI };
        break;
      case 'perspectiva':
      default:
        targetRotationRef.current = { x: -0.15, y: 0.55 };
        break;
    }
  };

  // Perspective control buttons helper
  const renderPerspectiveControls = (isFs = false) => (
    <div className={`flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-sans ${isFs ? 'text-carbon' : 'mt-4'}`}>
      <span className="text-grafito/60 mr-1 hidden sm:inline">Perspectiva:</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPerspective('portada');
        }}
        className={`px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all ${
          activePerspective === 'portada'
            ? 'bg-carbon text-blancoLuz border-carbon shadow-sm'
            : 'bg-blancoLuz/80 text-grafito border-piedra hover:border-corten hover:text-corten'
        }`}
      >
        Portada
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPerspective('lomo');
        }}
        className={`px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all ${
          activePerspective === 'lomo'
            ? 'bg-carbon text-blancoLuz border-carbon shadow-sm'
            : 'bg-blancoLuz/80 text-grafito border-piedra hover:border-corten hover:text-corten'
        }`}
      >
        Lomo
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPerspective('contraportada');
        }}
        className={`px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all ${
          activePerspective === 'contraportada'
            ? 'bg-carbon text-blancoLuz border-carbon shadow-sm'
            : 'bg-blancoLuz/80 text-grafito border-piedra hover:border-corten hover:text-corten'
        }`}
      >
        Contraportada
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPerspective('perspectiva');
        }}
        className={`px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all ${
          activePerspective === 'perspectiva'
            ? 'bg-carbon text-blancoLuz border-carbon shadow-sm'
            : 'bg-blancoLuz/80 text-grafito border-piedra hover:border-corten hover:text-corten'
        }`}
      >
        <RotateCcw className="w-3 h-3 inline-block mr-1" />
        3/4 isométrica
      </button>
    </div>
  );

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        style={{ touchAction: isFullscreen ? 'none' : 'pan-y' }}
        className={
          isFullscreen
            ? "fixed inset-0 z-50 w-screen h-screen bg-[#FAF6EF] flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing animate-fade-in"
            : "w-full h-[400px] sm:h-[460px] md:h-[540px] cursor-grab active:cursor-grabbing relative overflow-hidden rounded-2xl bg-gradient-to-b from-cal/40 to-piedra/20 border border-piedra/40 shadow-inner"
        }
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Three.js Canvas Mount */}
        <div ref={canvasMountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Subtle Architectural Grid Background */}
        <div className="absolute inset-0 bg-mineral-grid pointer-events-none opacity-40" />

        {/* Dynamic Light Beam Glow */}
        <div className="absolute top-0 inset-x-0 h-40 light-beam-overlay pointer-events-none" />

        {/* Fullscreen Header Overlay */}
        {isFullscreen && (
          <div className="relative flex items-center justify-between px-4 py-3 border-b border-piedra/40 bg-cal/80 backdrop-blur-md z-30">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif font-bold bg-corten text-blancoLuz">
                {currentBook.roman}
              </span>
              <div>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-corten font-medium block">
                  Modelo 3D · Pantalla completa
                </span>
                <h3 className="font-serif text-sm sm:text-base font-medium text-carbon">
                  {currentBook.title}
                </h3>
              </div>
            </div>

            {/* Close Cross Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="p-2 sm:p-2.5 rounded-full bg-blancoLuz border border-piedra/60 text-carbon hover:bg-corten hover:text-blancoLuz transition-all shadow-sm active:scale-95"
              aria-label="Cerrar pantalla completa"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}

        {/* Interactive Helper Cue */}
        <div className={`absolute ${isFullscreen ? 'top-16' : 'top-4'} left-4 transition-opacity duration-300 pointer-events-none z-20 ${isHovered ? 'opacity-90' : 'opacity-60'}`}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blancoLuz/90 backdrop-blur-sm border border-piedra/60 text-xs font-sans text-grafito/80 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-corten animate-spin-slow" />
            Arrastra 360° para examinar
          </span>
        </div>

        {/* Top-Right Badges & Mobile-exclusive Fullscreen Trigger */}
        {!isFullscreen && (
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
            {/* Mobile Fullscreen Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(true);
              }}
              className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-carbon/90 text-blancoLuz text-xs font-sans font-medium shadow-md active:scale-95 transition-all hover:bg-corten"
              aria-label="Ver en pantalla completa"
              title="Pantalla completa"
            >
              <Maximize2 className="w-3.5 h-3.5 text-corten" />
              <span>Pantalla completa</span>
            </button>

            {/* Blueprint badge if Book 3 */}
            {currentBook.id === 'book3' && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-corten/10 border border-corten/40 text-xs font-sans font-medium text-corten backdrop-blur-sm pointer-events-none">
                <Sparkles className="w-3.5 h-3.5" />
                Modelo en planos · boceto 1:1
              </span>
            )}
          </div>
        )}

        {/* Inline Chapter 1 prompt */}
        {!isFullscreen && currentBook.hasChapter && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-auto px-4 text-center">
            <button
              onClick={onOpenChapter}
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-carbon text-blancoLuz text-xs sm:text-sm font-sans tracking-wide hover:bg-corten transition-all duration-300 shadow-architectural hover:scale-105 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-corten group-hover:text-blancoLuz transition-colors" />
              <span>Abrir y leer el capítulo 1</span>
            </button>
          </div>
        )}

        {/* Fullscreen Footer Controls */}
        {isFullscreen && (
          <div className="relative px-4 py-3 border-t border-piedra/40 bg-cal/80 backdrop-blur-md flex flex-col items-center gap-2.5 z-30">
            {renderPerspectiveControls(true)}
            {currentBook.hasChapter && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                  onOpenChapter();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-carbon text-blancoLuz text-xs font-sans tracking-wide hover:bg-corten transition-all shadow-sm active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5 text-corten" />
                <span>Abrir y leer el capítulo 1</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Inline Perspective Quick-Angle Controls */}
      {!isFullscreen && renderPerspectiveControls(false)}
    </div>
  );
}
