"use client"

import { useEffect, useRef, useState } from "react"

export default function FishCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [facingLeft, setFacingLeft] = useState(false)
  const posRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setFacingLeft(e.clientX < posRef.current.x)
      posRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div
        className="fixed z-[9999] pointer-events-none select-none"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scaleX(${facingLeft ? -1 : 1})`,
          imageRendering: "pixelated",
          width: 32,
          height: 32,
        }}
      >
        <img
          src="/images/FishCursor.PNG"
          alt=""
          width={32}
          height={32}
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    </>
  )
}