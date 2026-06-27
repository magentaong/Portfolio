import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const files = ["data/projects.ts", "data/miniprojects.ts", "data/devlog.ts"]
const errors = []

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8")
}

function report(message) {
  errors.push(message)
}

for (const file of files) {
  const source = read(file)

  for (const match of source.matchAll(/["'](\/(?:images|videos)\/[^"']+)["']/g)) {
    const publicPath = match[1].replaceAll("\\u202f", String.fromCharCode(0x202f))
    const assetPath = path.join(root, "public", publicPath)
    if (!fs.existsSync(assetPath)) {
      report(`${file}: missing asset ${match[1]}`)
    }
  }

  for (const match of source.matchAll(/tags:\s*\[([^\]]*)\]/g)) {
    const tags = match[1]
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    for (const tag of tags) {
      const value = tag.replace(/^["']|["']$/g, "")
      if (value.includes(",") || value.length === 0) {
        report(`${file}: suspicious tag value ${tag}`)
      }
    }
  }
}

const devlog = read("data/devlog.ts")
const ids = [...devlog.matchAll(/id:\s*"([^"]+)"/g)].map((match) => match[1])
const titles = [...devlog.matchAll(/title:\s*"([^"]+)"/g)].map((match) => match[1].toLowerCase())
const bodies = [...devlog.matchAll(/body:\s*"([^"]*)"/g)].map((match) => match[1])

for (const id of ids) {
  if (ids.indexOf(id) !== ids.lastIndexOf(id)) {
    report(`data/devlog.ts: duplicate devlog id ${id}`)
  }
}

for (const title of titles) {
  if (titles.indexOf(title) !== titles.lastIndexOf(title)) {
    report(`data/devlog.ts: duplicate devlog title "${title}"`)
  }
}

if (bodies.some((body) => body.trim().length === 0)) {
  report("data/devlog.ts: found an empty devlog body")
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log("Content validation passed.")
