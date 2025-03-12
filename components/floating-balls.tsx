"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function FloatingBalls({ count = 15 }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ballsRef = useRef<HTMLDivElement[]>([])
  const animationsRef = useRef<number[]>([])
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Colors for the balls
  const colors = [
    "#FFA500", // Orange
    "#FF4500", // Red-Orange
    "#FFD700", // Gold
    "#FF8C00", // Dark Orange
    "#FF7F50", // Coral
    "#FF69B4", // Hot Pink
  ]

  useEffect(() => {
    setMounted(true)

    // Create balls
    createBalls()

    // Handle window resize
    const handleResize = () => {
      createBalls()
    }

    window.addEventListener("resize", handleResize)

    // Clean up animations on unmount
    return () => {
      animationsRef.current.forEach((id) => cancelAnimationFrame(id))
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const createBalls = () => {
    if (!containerRef.current) return

    // Clear existing balls
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    ballsRef.current = []

    // Create new balls
    for (let i = 0; i < count; i++) {
      const ball = document.createElement("div")
      // Make balls smaller (15-30px)
      const size = 15 + Math.random() * 15
      const color = getRandomColor()

      ball.className = "fixed rounded-full pointer-events-auto cursor-move mix-blend-difference filter blur-[1px]"
      ball.style.width = `${size}px`
      ball.style.height = `${size}px`
      ball.style.background = `radial-gradient(circle, ${color} 0%, rgba(255,102,0,1) 100%)`
      ball.style.boxShadow = `0 0 10px ${getRandomColor()}, 0 0 25px ${getRandomColor()}`
      ball.style.top = `${Math.random() * window.innerHeight}px`
      ball.style.left = `${Math.random() * window.innerWidth}px`
      ball.style.zIndex = "1" // Lower z-index so they stay below UI elements
      ball.style.opacity = "0.7" // Make them slightly transparent

      // Add pulse animation
      const pulseDelay = Math.random() * 10 // Random delay for the pulse animation
      ball.style.animation = `pulse 8s ease-in-out ${pulseDelay}s infinite`

      containerRef.current.appendChild(ball)
      ballsRef.current.push(ball)

      // Start animation
      animateBall(ball)

      // Add hover effect
      ball.addEventListener("mouseenter", () => {
        ball.style.transform = "scale(1.2)"
        ball.style.transition = "transform 0.3s ease"
        ball.style.opacity = "0.9"
      })

      ball.addEventListener("mouseleave", () => {
        ball.style.transform = "scale(1)"
        ball.style.transition = "transform 0.3s ease"
        ball.style.opacity = "0.7"
      })

      // Add drag functionality
      makeDraggable(ball)
    }
  }

  const animateBall = (ball: HTMLDivElement) => {
    let x = Number.parseFloat(ball.style.left)
    let y = Number.parseFloat(ball.style.top)
    let vx = (Math.random() - 0.5) * 0.7 // Slower movement
    let vy = (Math.random() - 0.5) * 0.7

    const animate = () => {
      if (!ball.isConnected) return

      // Don't animate if being dragged
      if (ball.getAttribute("data-dragging") === "true") {
        const animationId = requestAnimationFrame(animate)
        animationsRef.current.push(animationId)
        return
      }

      x += vx
      y += vy

      // Bounce off walls
      if (x <= 0 || x >= window.innerWidth - Number.parseFloat(ball.style.width)) {
        vx = -vx
        // Add a little "bounce" effect
        ball.style.transform = "scale(1.1)"
        setTimeout(() => {
          if (ball.isConnected) ball.style.transform = "scale(1)"
        }, 150)
      }

      if (y <= 0 || y >= window.innerHeight - Number.parseFloat(ball.style.height)) {
        vy = -vy
        // Add a little "bounce" effect
        ball.style.transform = "scale(1.1)"
        setTimeout(() => {
          if (ball.isConnected) ball.style.transform = "scale(1)"
        }, 150)
      }

      ball.style.left = `${x}px`
      ball.style.top = `${y}px`

      const animationId = requestAnimationFrame(animate)
      animationsRef.current.push(animationId)
    }

    animate()
  }

  const makeDraggable = (ball: HTMLDivElement) => {
    let isDragging = false
    let offsetX = 0
    let offsetY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      ball.setAttribute("data-dragging", "true")
      offsetX = e.clientX - Number.parseFloat(ball.style.left)
      offsetY = e.clientY - Number.parseFloat(ball.style.top)
      ball.style.cursor = "grabbing"
      ball.style.zIndex = "5" // Raise z-index while dragging, but still below UI
    }

    const onClick = () => {
      // Add a pulse effect when clicked
      ball.style.transform = "scale(1.5)"
      ball.style.opacity = "1"
      ball.style.transition = "transform 0.3s ease, opacity 0.3s ease"

      setTimeout(() => {
        if (ball.isConnected) {
          ball.style.transform = "scale(1)"
          ball.style.opacity = "0.7"
          ball.style.transition = "transform 0.5s ease, opacity 0.5s ease"
        }
      }, 300)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newLeft = e.clientX - offsetX
      const newTop = e.clientY - offsetY

      // Keep ball within window bounds
      const width = Number.parseFloat(ball.style.width)
      const maxX = window.innerWidth - width
      const maxY = window.innerHeight - width

      ball.style.left = `${Math.max(0, Math.min(newLeft, maxX))}px`
      ball.style.top = `${Math.max(0, Math.min(newTop, maxY))}px`
    }

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false
        ball.setAttribute("data-dragging", "false")
        ball.style.cursor = "move"
        ball.style.zIndex = "1" // Reset z-index
      }
    }

    ball.addEventListener("mousedown", onMouseDown)
    ball.addEventListener("click", onClick)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)

    // Clean up function to remove event listeners
    return () => {
      ball.removeEventListener("mousedown", onMouseDown)
      ball.removeEventListener("click", onClick)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true" />
}

