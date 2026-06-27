import { CheckCircle, Cog, Skull, Zap } from "lucide-react"

export const moodConfig = {
  good: { icon: <CheckCircle className="h-3 w-3" />, label: "Good", style: "bg-green-500/10 text-green-500" },
  stuck: { icon: <Skull className="h-3 w-3" />, label: "Stuck", style: "bg-red-500/10 text-red-500" },
  breakthrough: { icon: <Zap className="h-3 w-3" />, label: "Breakthrough", style: "bg-orange-500/10 text-orange-500" },
  grind: { icon: <Cog className="h-3 w-3" />, label: "Grind", style: "bg-blue-500/10 text-blue-400" },
}

export const statusStyles = {
  complete: "bg-green-500/10 text-green-500",
  "in-progress": "bg-orange-500/10 text-orange-500",
  abandoned: "bg-muted text-muted-foreground",
}

export const statusLabel = {
  complete: "Complete",
  "in-progress": "In Progress",
  abandoned: "Abandoned",
}
