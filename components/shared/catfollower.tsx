"use client"

import { useEffect, useRef } from "react"
import { Neko } from "@/components/shared/neko"

export default function CatFollower() {
  const nekoRef = useRef<Neko | null>(null)

  useEffect(() => {
    const neko = new Neko({
      nekoName: "neko",
      nekoImageUrl: "/images/ghost.png",
      initialPosX: window.innerWidth - 48,
      initialPosY: window.innerHeight - 48,
    })
    neko.init()
    neko.isFollowing = true
    nekoRef.current = neko

    const handleMouseMove = (e: MouseEvent) => {
      const offset = 80
      const angle = Math.atan2(e.clientY - neko.posY, e.clientX - neko.posX)
      neko.mouseX = e.clientX - Math.cos(angle) * offset
      neko.mouseY = e.clientY - Math.sin(angle) * offset
    }

    const handleMouseUp = () => {
      if (!neko.isDragging) return
      if (!neko.wasDragged) return
      setTimeout(() => {
        neko.isFollowing = false
        neko.isFalling = true
        neko.fallVelocity = 0
        neko.isReturningToOrigin = false
        neko.idleAnimation = null
        neko.idleAnimationFrame = 0
      }, 50)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      neko.destroy()
    }
  }, [])

  return null
}