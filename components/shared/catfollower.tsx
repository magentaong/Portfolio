"use client"

import { useEffect, useRef } from "react"
import { Neko } from "@/components/shared/neko"
import { usePointerCompanion } from "@/components/shared/PointerCompanion"

export default function CatFollower() {
  const nekoRef = useRef<Neko | null>(null)
  const { active, config } = usePointerCompanion()

  useEffect(() => {
    if (!active) {
      nekoRef.current = null
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const neko = nekoRef.current
      if (!neko) return
      const offset = 80
      const angle = Math.atan2(e.clientY - neko.posY, e.clientX - neko.posX)
      neko.mouseX = e.clientX - Math.cos(angle) * offset
      neko.mouseY = e.clientY - Math.sin(angle) * offset
    }

    const neko = new Neko({
      nekoName: "neko",
      nekoImageUrl: config.catSrc,
      controlLabel: config.catControlLabel,
      initialPosX: window.innerWidth - 48,
      initialPosY: window.innerHeight - 48,
    })
    neko.init()
    neko.isFollowing = true
    nekoRef.current = neko
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      neko.destroy()
      nekoRef.current = null
    }
  }, [active, config.catControlLabel, config.catSrc])

  return null
}
