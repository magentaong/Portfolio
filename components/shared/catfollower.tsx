"use client"

import { useEffect } from "react"
import { Neko } from "@/components/shared/neko"

export default function CatFollower() {
  useEffect(() => {
    const neko = new Neko({
      nekoName: "neko",
      nekoImageUrl: "/images/ghost.png",
    })
    neko.init()

    // make it follow by default
    neko.isFollowing = true

    const handleMouseMove = (e: MouseEvent) => {
      const offset = 80 // how far ahead of cursor the target is
      const angle = Math.atan2(
        e.clientY - neko.posY,
        e.clientX - neko.posX
      )
      neko.mouseX = e.clientX - Math.cos(angle) * offset
      neko.mouseY = e.clientY - Math.sin(angle) * offset
    }
  
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        neko.destroy()
      }
    }, [])
    
  

  return null
}