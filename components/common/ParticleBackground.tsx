'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

const options: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  fullScreen: { enable: false, zIndex: 0 },
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: { enable: true, delay: 0.25 },
    },
    modes: {
      repulse: {
        distance: 140,
        duration: 0.6,
        factor: 2,
        speed: 0.8,
        maxSpeed: 1.2,
      },
    },
  },
  particles: {
    color: {
      value: ['#5B8DEF', '#A78BFA', '#93B8FF'],
    },
    links: {
      color: 'rgba(91, 141, 239, 0.25)',
      distance: 120,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      random: true,
      speed: 1.2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      value: 70,
    },
    opacity: {
      value: { min: 0.2, max: 0.6 },
    },
    shape: { type: 'circle' },
    size: {
      value: { min: 1, max: 3.5 },
    },
  },
  detectRetina: true,
}

export function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  if (!init) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles-home"
        options={options}
        className="w-full h-full"
        style={{ position: 'absolute', inset: 0 }}
      />
    </div>
  )
}
