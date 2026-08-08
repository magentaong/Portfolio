import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aboutCards, educationData, leadershipData } from "../data/about.ts";
import { devLogEntries, devlogPage } from "../data/devlog.ts";
import { doodleLibrary } from "../data/doodles.ts";
import { homeContent } from "../data/home.ts";
import { miniProjects, miniProjectsPage } from "../data/miniprojects.ts";
import { photoPage, photos } from "../data/photo.ts";
import { projects, projectsPage } from "../data/projects.ts";
import { siteData } from "../data/site.ts";
import { skillData } from "../data/skills.ts";
import { timelineData } from "../data/timeline.ts";
import {
  doodleBackings,
  doodleInks,
  doodleLayouts,
  doodleMotions,
  doodleSlots,
} from "../types/doodle.ts";
import { homePhotoSlotIds } from "../types/photo.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const authoredMarkIds = [];

function report(message) {
  errors.push(message);
}

function requireText(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    report(`${label}: expected non-empty text`);
  }
}

function validateTextTree(value, label) {
  if (typeof value === "string") {
    requireText(value, label);
    return;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) report(`${label}: expected at least one value`);
    value.forEach((item, index) => validateTextTree(item, `${label}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (key === "alt" && value.decorative === true && child === "") continue;
      validateTextTree(child, `${label}.${key}`);
    }
  }
}

const portfolioCopySmells = [
  [/(?:^|\W)delv(?:e|es|ed|ing)(?:$|\W)/i, "delve"],
  [/\btapestry\b/i, "tapestry"],
  [/\bmultifaceted\b/i, "multifaceted"],
  [/\btransformative\b/i, "transformative"],
  [/\bseamless(?:ly)?\b/i, "seamless"],
  [/\bever[- ]evolving\b/i, "ever-evolving"],
  [/\bmore than just\b/i, "more than just"],
  [/\bat the intersection of\b/i, "at the intersection of"],
  [/\bthe hard part was not\b/i, "the hard part was not"],
  [/\bpushed me to think\b/i, "pushed me to think"],
  [/\bfrom concept to\b/i, "from concept to"],
  [/\bin conclusion\b/i, "in conclusion"],
  [/\bthis project (?:showcases|demonstrates|highlights)\b/i, "portfolio summary language"],
  [/\bnot just\b[^.!?]{0,160}\bbut\b/i, "not just … but …"],
  [/\bwas not\b[^.!?;]{0,120};\s*it was\b/i, "was not …; it was …"],
];

function validatePortfolioCopy(value, label) {
  if (typeof value === "string") {
    for (const [pattern, smell] of portfolioCopySmells) {
      if (pattern.test(value)) report(`${label}: rewrite AI-shaped phrase "${smell}"`);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => validatePortfolioCopy(item, `${label}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      validatePortfolioCopy(child, `${label}.${key}`);
    }
  }
}

function validateUnique(values, label, { caseInsensitive = false } = {}) {
  const seen = new Set();

  for (const value of values) {
    const normalized = caseInsensitive ? value.toLowerCase() : value;
    if (seen.has(normalized)) report(`${label}: duplicate value "${value}"`);
    seen.add(normalized);
  }
}

function validateIdentifier(value, label) {
  requireText(value, label);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    report(`${label}: "${value}" must use lowercase kebab-case`);
  }
}

function validateProjectImage(image, label) {
  validateIdentifier(image.id, `${label}.id`);
  requireText(image.src, `${label}.src`);
  requireText(image.alt, `${label}.alt`);
  if (!/^\/images\//.test(image.src)) {
    report(`${label}.src: expected a local /images/ asset`);
  }
  if (image.caption !== undefined) requireText(image.caption, `${label}.caption`);
  if (image.view !== undefined && !["media", "document"].includes(image.view)) {
    report(`${label}.view: unsupported view ${image.view}`);
  }
  const hasWidth = image.width !== undefined;
  const hasHeight = image.height !== undefined;
  if (hasWidth !== hasHeight) {
    report(`${label}: width and height must be declared together`);
  }
  if (hasWidth && (!Number.isInteger(image.width) || image.width <= 0)) {
    report(`${label}.width: expected a positive integer`);
  }
  if (hasHeight && (!Number.isInteger(image.height) || image.height <= 0)) {
    report(`${label}.height: expected a positive integer`);
  }
  if (image.view === "document") {
    if (!hasWidth || !hasHeight) {
      report(`${label}: document views require intrinsic width and height`);
    }
    requireText(image.caption, `${label}.caption`);
  }
  if (image.fit !== undefined && !["cover", "contain"].includes(image.fit)) {
    report(`${label}.fit: unsupported fit ${image.fit}`);
  }
  if (image.position !== undefined) requireText(image.position, `${label}.position`);
  if (
    image.aspect !== undefined &&
    !["wide", "landscape", "portrait", "phone", "square"].includes(image.aspect)
  ) {
    report(`${label}.aspect: unsupported aspect ${image.aspect}`);
  }
  if (
    image.layout !== undefined &&
    !["full", "wide", "column", "inset"].includes(image.layout)
  ) {
    report(`${label}.layout: unsupported layout ${image.layout}`);
  }
}

function validateProjectFrame(frame, label) {
  if (frame.fit !== undefined && !["cover", "contain"].includes(frame.fit)) {
    report(`${label}.fit: unsupported fit ${frame.fit}`);
  }
  if (frame.position !== undefined) requireText(frame.position, `${label}.position`);
  if (frame.background !== undefined && !/^#[\da-f]{6}$/i.test(frame.background)) {
    report(`${label}.background: expected a 6-digit hex colour`);
  }
  if (
    frame.padding !== undefined &&
    !["none", "tight", "roomy"].includes(frame.padding)
  ) {
    report(`${label}.padding: unsupported padding ${frame.padding}`);
  }
  if (
    frame.aspect !== undefined &&
    !["cinematic", "landscape", "square", "portrait"].includes(frame.aspect)
  ) {
    report(`${label}.aspect: unsupported aspect ${frame.aspect}`);
  }
}

function validateAuthoredMark(mark, label) {
  validateIdentifier(mark.id, `${label}.id`);
  authoredMarkIds.push(mark.id);
  requireText(mark.src, `${label}.src`);
  if (!/^\/images\//.test(mark.src)) {
    report(`${label}.src: expected a local /images/ asset`);
  }
  if (mark.decorative === true) {
    if (mark.alt !== "") report(`${label}.alt: decorative marks require empty alt text`);
    if (mark.transcription !== undefined) {
      report(`${label}.transcription: decorative marks cannot have a transcription`);
    }
  } else {
    requireText(mark.alt, `${label}.alt`);
    if (mark.transcription !== undefined) {
      requireText(mark.transcription, `${label}.transcription`);
    }
  }
  if (!Number.isFinite(mark.width) || mark.width <= 0) {
    report(`${label}.width: expected a positive number`);
  }
  if (!Number.isFinite(mark.height) || mark.height <= 0) {
    report(`${label}.height: expected a positive number`);
  }
  if (mark.caption !== undefined) requireText(mark.caption, `${label}.caption`);
}

function validateTags(tags, label) {
  if (!Array.isArray(tags)) return;

  const normalized = [];
  for (const [index, tag] of tags.entries()) {
    requireText(tag, `${label}[${index}]`);
    if (tag !== tag.trim()) report(`${label}[${index}]: remove surrounding whitespace`);
    if (tag.includes(",")) report(`${label}[${index}]: split comma-separated tags`);
    normalized.push(tag.trim().toLowerCase());
  }
  validateUnique(normalized, label);
}

function validateAsset(asset, label) {
  const relativeAsset = asset.replace(/^\//, "");
  const assetPath = path.join(root, "public", relativeAsset);
  if (!fs.existsSync(assetPath)) {
    report(`${label}: missing asset ${asset}`);
    return;
  }

  const stats = fs.statSync(assetPath);
  if (!stats.isFile()) report(`${label}: expected a regular file ${asset}`);
  if (stats.size === 0) report(`${label}: asset is empty ${asset}`);
}

function walkAssets(value, label) {
  if (typeof value === "string") {
    if (/^\/(?:captions|images|videos)\//.test(value)) validateAsset(value, label);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walkAssets(item, `${label}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walkAssets(child, `${label}.${key}`);
    }
  }
}

function isValidHref(href) {
  if (href.startsWith("/")) return !href.startsWith("//");
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validatePage(page, expectedPath, label) {
  if (page.pathname !== expectedPath) {
    report(`${label}.pathname: expected "${expectedPath}", received "${page.pathname}"`);
  }
  validateTextTree(page.eyebrow, `${label}.eyebrow`);
  validateTextTree(page.titleLines, `${label}.titleLines`);
  validateTextTree(page.introduction, `${label}.introduction`);
  validateTextTree(page.metadata, `${label}.metadata`);
}

function validateResponsiveNumber(value, label, { min, max }) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    report(`${label}: expected a responsive number object with a base value`);
    return;
  }

  const keys = Object.keys(value);
  for (const key of keys) {
    if (!["base", "md"].includes(key)) {
      report(`${label}.${key}: unsupported responsive breakpoint`);
    }
  }

  if (!Object.prototype.hasOwnProperty.call(value, "base")) {
    report(`${label}.base: expected a number from ${min} to ${max}`);
  }

  for (const key of ["base", "md"]) {
    if (value[key] === undefined) continue;
    if (!Number.isFinite(value[key]) || value[key] < min || value[key] > max) {
      report(`${label}.${key}: expected a number from ${min} to ${max}`);
    }
  }
}

function validateDoodlePng(asset, label) {
  if (typeof asset.src !== "string") {
    report(`${label}.src: expected a .png asset under /images/doodles/`);
    return;
  }

  const segments = asset.src.split("/");
  const hasUnsafeSegment = segments.includes(".") || segments.includes("..");
  if (
    !asset.src.startsWith("/images/doodles/") ||
    path.posix.extname(asset.src).toLowerCase() !== ".png" ||
    asset.src.includes("\\") ||
    hasUnsafeSegment
  ) {
    report(`${label}.src: expected a .png asset under /images/doodles/`);
    return;
  }

  const assetPath = path.resolve(root, "public", asset.src.slice(1));
  const doodleRoot = path.resolve(root, "public", "images", "doodles");
  if (!assetPath.startsWith(`${doodleRoot}${path.sep}`)) {
    report(`${label}.src: expected a .png asset under /images/doodles/`);
    return;
  }
  if (!fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) return;

  const header = Buffer.alloc(33);
  const descriptor = fs.openSync(assetPath, "r");
  let bytesRead;
  try {
    bytesRead = fs.readSync(descriptor, header, 0, header.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }

  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (
    bytesRead < header.length ||
    !header.subarray(0, 8).equals(pngSignature) ||
    header.readUInt32BE(8) !== 13 ||
    header.toString("ascii", 12, 16) !== "IHDR"
  ) {
    report(`${label}.src: expected a valid PNG with an IHDR header`);
    return;
  }

  const width = header.readUInt32BE(16);
  const height = header.readUInt32BE(20);
  if (asset.width !== width || asset.height !== height) {
    report(
      `${label}: declared ${asset.width}x${asset.height}, PNG is ${width}x${height}`,
    );
  }

  const colorType = header[25];
  if (![4, 6].includes(colorType)) {
    report(`${label}.src: PNG color type ${colorType} does not include alpha`);
  }
}

validateUnique(projects.map((project) => project.slug), "projects.slug");
validateUnique(projects.map((project) => project.title), "projects.title", {
  caseInsensitive: true,
});

for (const project of projects) {
  const label = `projects.${project.slug}`;
  validateIdentifier(project.slug, `${label}.slug`);
  requireText(project.title, `${label}.title`);
  requireText(project.subtitle, `${label}.subtitle`);
  requireText(project.summary, `${label}.summary`);
  requireText(project.date, `${label}.date`);
  validateTextTree(project.description, `${label}.description`);
  validateTextTree(project.technologies, `${label}.technologies`);
  validateTags(project.tags, `${label}.tags`);
  validateProjectImage(project.media.cover, `${label}.media.cover`);

  for (const [index, image] of (project.media.gallery ?? []).entries()) {
    validateProjectImage(image, `${label}.media.gallery[${index}]`);
  }
  for (const [index, video] of (project.media.videos ?? []).entries()) {
    const videoLabel = `${label}.media.videos[${index}]`;
    validateIdentifier(video.id, `${videoLabel}.id`);
    requireText(video.src, `${videoLabel}.src`);
    requireText(video.label, `${videoLabel}.label`);
    if (!/^\/videos\//.test(video.src)) {
      report(`${videoLabel}.src: expected a local /videos/ asset`);
    }
    if (video.poster !== undefined && !/^\/images\//.test(video.poster)) {
      report(`${videoLabel}.poster: expected a local /images/ asset`);
    }
    if (!Number.isInteger(video.width) || video.width <= 0) {
      report(`${videoLabel}.width: expected a positive integer`);
    }
    if (!Number.isInteger(video.height) || video.height <= 0) {
      report(`${videoLabel}.height: expected a positive integer`);
    }
    if (video.caption !== undefined) requireText(video.caption, `${videoLabel}.caption`);
    if (video.description !== undefined) {
      requireText(video.description, `${videoLabel}.description`);
    }
    if (video.fit !== undefined && !["cover", "contain"].includes(video.fit)) {
      report(`${videoLabel}.fit: unsupported fit ${video.fit}`);
    }
    if (
      video.layout !== undefined &&
      !["full", "wide", "column", "inset"].includes(video.layout)
    ) {
      report(`${videoLabel}.layout: unsupported layout ${video.layout}`);
    }

    validateUnique(
      (video.tracks ?? []).map((track) => track.id),
      `${videoLabel}.tracks.id`,
    );
    validateUnique(
      (video.tracks ?? []).map((track) => track.src),
      `${videoLabel}.tracks.src`,
    );
    if ((video.tracks ?? []).filter((track) => track.default).length > 1) {
      report(`${videoLabel}.tracks: only one track can be default`);
    }
    for (const [trackIndex, track] of (video.tracks ?? []).entries()) {
      const trackLabel = `${videoLabel}.tracks[${trackIndex}]`;
      validateIdentifier(track.id, `${trackLabel}.id`);
      requireText(track.src, `${trackLabel}.src`);
      requireText(track.srcLang, `${trackLabel}.srcLang`);
      requireText(track.label, `${trackLabel}.label`);
      if (!/^\/captions\/.+\.vtt$/i.test(track.src)) {
        report(`${trackLabel}.src: expected a local /captions/*.vtt asset`);
      }
      if (!['captions', 'subtitles'].includes(track.kind)) {
        report(`${trackLabel}.kind: unsupported kind ${track.kind}`);
      }
      if (track.default !== undefined && typeof track.default !== "boolean") {
        report(`${trackLabel}.default: expected a boolean`);
      }
    }
  }

  const imageIds = [
    project.media.cover.id,
    ...(project.media.gallery ?? []).map((image) => image.id),
  ];
  const mediaIds = [
    ...imageIds,
    ...(project.media.videos ?? []).map((video) => video.id),
  ];
  validateUnique(mediaIds, `${label}.media.id`);
  const mediaIdSet = new Set(mediaIds);
  const imageIdSet = new Set(imageIds);
  const imageById = new Map(
    [project.media.cover, ...(project.media.gallery ?? [])].map((image) => [
      image.id,
      image,
    ]),
  );
  const videoById = new Map(
    (project.media.videos ?? []).map((video) => [video.id, video]),
  );

  const preview = project.archive?.preview;
  if (preview) {
    validateProjectFrame(preview, `${label}.archive.preview`);
    if (preview.imageId !== undefined && !imageIdSet.has(preview.imageId)) {
      report(`${label}.archive.preview.imageId: unknown image ID ${preview.imageId}`);
    }
  }

  const tier = project.presentation?.tier ?? "standard";
  if (!(["flagship", "standard"].includes(tier))) {
    report(`${label}.presentation.tier: unsupported tier ${tier}`);
  }
  if (project.presentation?.hero) {
    validateProjectFrame(project.presentation.hero, `${label}.presentation.hero`);
  }
  if (project.presentation?.currentBuild) {
    validateProjectFrame(
      project.presentation.currentBuild,
      `${label}.presentation.currentBuild`,
    );
  }
  if (project.presentation?.titleLines) {
    validateTextTree(
      project.presentation.titleLines,
      `${label}.presentation.titleLines`,
    );
    const normalizeTitle = (value) => value.replace(/\s+/g, "").toLowerCase();
    if (
      normalizeTitle(project.presentation.titleLines.join("")) !==
      normalizeTitle(project.title)
    ) {
      report(`${label}.presentation.titleLines: lines must reproduce the project title`);
    }
  }

  if (project.home?.current) {
    requireText(project.home.current.note, `${label}.home.current.note`);
  }

  if (project.home?.feature) {
    const feature = project.home.feature;
    const featureLabel = `${label}.home.feature`;

    if (!Number.isInteger(feature.order) || feature.order < 1) {
      report(`${featureLabel}.order: expected a positive integer`);
    }
    requireText(feature.note, `${featureLabel}.note`);
    if (
      !["product-and-photo", "interface", "video", "game"].includes(
        feature.display,
      )
    ) {
      report(`${featureLabel}.display: unsupported display ${feature.display}`);
    }
    if (
      feature.layout !== undefined &&
      !["wide-right", "narrow-left", "medium-right", "wide-center"].includes(
        feature.layout,
      )
    ) {
      report(`${featureLabel}.layout: unsupported layout ${feature.layout}`);
    }
    if (feature.display === "interface") {
      if (feature.mediaLabel !== undefined) {
        report(`${featureLabel}.mediaLabel: interface previews do not render a media label`);
      }
    } else {
      requireText(feature.mediaLabel, `${featureLabel}.mediaLabel`);
    }
    if (
      feature.display === "product-and-photo" &&
      (project.media.gallery?.length ?? 0) === 0
    ) {
      report(`${featureLabel}.display: product-and-photo requires a gallery image`);
    }
    if (
      ["video", "game"].includes(feature.display) &&
      (project.media.videos?.length ?? 0) === 0
    ) {
      report(`${featureLabel}.display: ${feature.display} requires a video`);
    }
  }

  if (project.chapters && tier !== "flagship") {
    report(`${label}.chapters: chapters require presentation.tier "flagship"`);
  }
  validateUnique(
    (project.chapters ?? []).map((chapter) => chapter.id),
    `${label}.chapters.id`,
  );
  const referencedArtifactIds = [];
  for (const [index, chapter] of (project.chapters ?? []).entries()) {
    const chapterLabel = `${label}.chapters[${index}]`;
    validateIdentifier(chapter.id, `${chapterLabel}.id`);
    requireText(chapter.title, `${chapterLabel}.title`);
    validateTextTree(chapter.body, `${chapterLabel}.body`);
    if (
      chapter.layout !== undefined &&
      ![
        "text-first",
        "artifact-first",
        "text-only",
        "artifact-sequence",
      ].includes(chapter.layout)
    ) {
      report(`${chapterLabel}.layout: unsupported layout ${chapter.layout}`);
    }
    validateUnique(chapter.artifactIds ?? [], `${chapterLabel}.artifactIds`);
    if (chapter.layout === "text-only" && (chapter.artifactIds?.length ?? 0) > 0) {
      report(`${chapterLabel}.artifactIds: text-only chapters cannot render artifacts`);
    }
    for (const artifactId of chapter.artifactIds ?? []) {
      referencedArtifactIds.push(artifactId);
      if (!mediaIdSet.has(artifactId)) {
        report(`${chapterLabel}.artifactIds: unknown media ID ${artifactId}`);
      }
      if (artifactId === project.media.cover.id) {
        report(`${chapterLabel}.artifactIds: cover media already renders in the hero`);
      }
    }
    if (chapter.layout === "artifact-sequence") {
      if ((chapter.artifactIds?.length ?? 0) < 2) {
        report(`${chapterLabel}.artifactIds: artifact-sequence requires at least two artifacts`);
      }

      for (const artifactId of chapter.artifactIds ?? []) {
        const image = imageById.get(artifactId);
        const video = videoById.get(artifactId);
        const artifact = image ?? video;
        if (!artifact) continue;

        requireText(artifact.caption, `${chapterLabel}.${artifactId}.caption`);
        requireText(artifact.layout, `${chapterLabel}.${artifactId}.layout`);

        if (image && image.view !== "document" && image.aspect === undefined) {
          report(`${chapterLabel}.${artifactId}.aspect: sequence images require an explicit aspect`);
        }
        if (video) {
          requireText(video.poster, `${chapterLabel}.${artifactId}.poster`);
        }
      }
    }
    if (chapter.annotation) {
      validateAuthoredMark(chapter.annotation, `${chapterLabel}.annotation`);
      if (
        chapter.annotation.placement !== undefined &&
        !["left-margin", "right-margin"].includes(chapter.annotation.placement)
      ) {
        report(
          `${chapterLabel}.annotation.placement: unsupported placement ${chapter.annotation.placement}`,
        );
      }
    }
  }
  validateUnique(referencedArtifactIds, `${label}.chapters.artifactIds`);

  const evidenceMediaId = project.archive?.evidenceMediaId;
  if (evidenceMediaId !== undefined) {
    requireText(evidenceMediaId, `${label}.archive.evidenceMediaId`);
    if (tier !== "flagship") {
      report(`${label}.archive.evidenceMediaId: evidence previews require presentation.tier "flagship"`);
    }
    if (!mediaIdSet.has(evidenceMediaId)) {
      report(`${label}.archive.evidenceMediaId: unknown media ID ${evidenceMediaId}`);
    }

    const evidenceChapters = (project.chapters ?? []).filter((chapter) =>
      chapter.artifactIds?.includes(evidenceMediaId),
    );
    if (evidenceChapters.length !== 1) {
      report(`${label}.archive.evidenceMediaId: expected exactly one owning chapter`);
    }

    const evidenceImage = [
      project.media.cover,
      ...(project.media.gallery ?? []),
    ].find((image) => image.id === evidenceMediaId);
    const evidenceVideo = (project.media.videos ?? []).find(
      (video) => video.id === evidenceMediaId,
    );
    const evidenceMedia = evidenceImage ?? evidenceVideo;

    if (evidenceMedia) {
      requireText(evidenceMedia.caption, `${label}.archive.evidenceMedia.caption`);
    }
    if (evidenceVideo) {
      requireText(evidenceVideo.poster, `${label}.archive.evidenceMedia.poster`);
    }
  }

  const urls = (project.links ?? []).map((link) => link.url);
  const linkIds = (project.links ?? []).map((link) => link.id);
  validateUnique(urls, `${label}.links`);
  validateUnique(linkIds, `${label}.links.id`);
  for (const [index, link] of (project.links ?? []).entries()) {
    validateIdentifier(link.id, `${label}.links[${index}].id`);
    requireText(link.label, `${label}.links[${index}].label`);
    if (!isValidHref(link.url)) report(`${label}.links[${index}]: invalid URL ${link.url}`);
    if (link.target !== "self" && link.target !== "blank") {
      report(`${label}.links[${index}].target: expected "self" or "blank"`);
    }
    if (
      link.url === `/projects/${project.slug}` ||
      link.url === `/projects?active=${project.slug}`
    ) {
      report(`${label}.links[${index}]: remove self-link ${link.url}`);
    }

    if (link.url.startsWith("/projects/")) {
      const projectPath = link.url.split(/[?#]/, 1)[0];
      const internalProject = projectPath.match(/^\/projects\/([^/]+)$/)?.[1];
      if (!internalProject) {
        report(`${label}.links[${index}]: unsupported project route ${projectPath}`);
      } else if (!projects.some((candidate) => candidate.slug === internalProject)) {
        report(`${label}.links[${index}]: unknown project slug ${internalProject}`);
      }
    }
  }
}

const currentHomeProjects = projects.filter((project) => project.home?.current);
if (currentHomeProjects.length !== 1) {
  report(
    `projects.home.current: expected exactly one current project, found ${currentHomeProjects.length}`,
  );
}
validateUnique(
  projects.flatMap((project) =>
    project.home?.feature ? [project.home.feature.order] : [],
  ),
  "projects.home.feature.order",
);

validateUnique(miniProjects.map((project) => project.slug), "miniProjects.slug");
validateUnique(miniProjects.map((project) => project.title), "miniProjects.title", {
  caseInsensitive: true,
});

for (const project of miniProjects) {
  const label = `miniProjects.${project.slug}`;
  validateIdentifier(project.slug, `${label}.slug`);
  requireText(project.title, `${label}.title`);
  requireText(project.description, `${label}.description`);
  requireText(project.date, `${label}.date`);
  requireText(project.image, `${label}.image`);
  requireText(project.imageAlt, `${label}.imageAlt`);
  if (!/^\/images\//.test(project.image)) {
    report(`${label}.image: expected a local /images/ asset`);
  }
  if (project.video !== undefined && !/^\/videos\//.test(project.video)) {
    report(`${label}.video: expected a local /videos/ asset`);
  }
  if (
    project.mediaFit !== undefined &&
    !["cover", "contain"].includes(project.mediaFit)
  ) {
    report(`${label}.mediaFit: unsupported fit ${project.mediaFit}`);
  }
  if (
    project.presentation?.mediaSide !== undefined &&
    !["left", "right"].includes(project.presentation.mediaSide)
  ) {
    report(`${label}.presentation.mediaSide: unsupported side ${project.presentation.mediaSide}`);
  }
  validateTags(project.tags, `${label}.tags`);
  if (project.learned) validateTextTree(project.learned, `${label}.learned`);

  validateUnique(
    (project.links ?? []).map((link) => link.id),
    `${label}.links.id`,
  );
  validateUnique(
    (project.links ?? []).map((link) => link.href),
    `${label}.links.href`,
  );
  for (const [index, link] of (project.links ?? []).entries()) {
    const linkLabel = `${label}.links[${index}]`;
    validateIdentifier(link.id, `${linkLabel}.id`);
    requireText(link.label, `${linkLabel}.label`);
    if (!isValidHref(link.href)) {
      report(`${linkLabel}.href: invalid URL ${link.href}`);
    }
    if (link.target !== "self" && link.target !== "blank") {
      report(`${linkLabel}.target: expected "self" or "blank"`);
    }
  }
}

validateUnique(devLogEntries.map((entry) => entry.id), "devLogEntries.id");
const publishedEntries = devLogEntries.filter((entry) => !entry.draft);
validateUnique(
  publishedEntries.map((entry) => entry.title.trim().toLowerCase()),
  "devLogEntries.title",
);

for (const entry of devLogEntries) {
  const label = `devLogEntries.${entry.id}`;
  if (!/^\d{3}$/.test(entry.id)) report(`${label}.id: expected a zero-padded 3-digit ID`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.publishedAt)) {
    report(`${label}.publishedAt: expected YYYY-MM-DD`);
  } else if (Number.isNaN(Date.parse(`${entry.publishedAt}T00:00:00Z`))) {
    report(`${label}.publishedAt: invalid date ${entry.publishedAt}`);
  }
  requireText(entry.date, `${label}.date`);
  if (!entry.draft) {
    requireText(entry.title, `${label}.title`);
    requireText(entry.body, `${label}.body`);
  }
  if (entry.project !== undefined) {
    requireText(entry.project, `${label}.project`);
    if (entry.project !== entry.project.trim()) {
      report(`${label}.project: remove surrounding whitespace`);
    }
  }
  if (/https?:\/\//i.test(entry.body)) {
    report(`${label}.body: move raw URLs into the typed links field`);
  }
  validateTags(entry.tags, `${label}.tags`);
  if (!(entry.mood in devlogPage.moodLabels)) {
    report(`${label}.mood: unsupported mood ${entry.mood}`);
  }

  if (
    entry.ink !== undefined &&
    !["blue", "orange", "magenta"].includes(entry.ink)
  ) {
    report(`${label}.ink: unsupported ink ${entry.ink}`);
  }

  for (const assetField of ["marginNote", "artifact"]) {
    const asset = entry[assetField];
    if (!asset) continue;
    validateAuthoredMark(asset, `${label}.${assetField}`);
  }

  if (entry.code) {
    requireText(entry.code.label, `${label}.code.label`);
    requireText(entry.code.content, `${label}.code.content`);
    if (entry.code.language !== undefined) {
      requireText(entry.code.language, `${label}.code.language`);
    }
  }

  validateUnique(
    (entry.links ?? []).map((link) => link.href),
    `${label}.links`,
  );
  for (const [index, link] of (entry.links ?? []).entries()) {
    requireText(link.label, `${label}.links[${index}].label`);
    if (!isValidHref(link.href)) {
      report(`${label}.links[${index}]: invalid URL ${link.href}`);
    }
    if (link.target !== "self" && link.target !== "blank") {
      report(`${label}.links[${index}].target: expected "self" or "blank"`);
    }
  }
}

validateUnique(doodleLibrary.assets.map((asset) => asset.id), "doodleLibrary.assets.id");
validateUnique(doodleLibrary.assets.map((asset) => asset.src), "doodleLibrary.assets.src");
for (const [index, asset] of doodleLibrary.assets.entries()) {
  const label = `doodleLibrary.assets[${index}]`;
  validateAuthoredMark(asset, label);
  if (asset.decorative !== true) {
    report(`${label}.decorative: doodle assets must be decorative`);
  }
  if (asset.alt !== "") {
    report(`${label}.alt: doodle assets require empty alt text`);
  }
  if (asset.caption !== undefined) {
    report(`${label}.caption: decorative doodles cannot have a caption`);
  }
  if (asset.transcription !== undefined) {
    report(`${label}.transcription: decorative doodles cannot have a transcription`);
  }
  validateDoodlePng(asset, label);
}

validateUnique(authoredMarkIds, "authoredMark.id");

validateUnique(photoPage.locations.map((location) => location.id), "photoPage.locations.id");
validateUnique(photoPage.locations.map((location) => location.label), "photoPage.locations.label", {
  caseInsensitive: true,
});
for (const location of photoPage.locations) {
  validateIdentifier(location.id, `photoPage.locations.${location.id}.id`);
  requireText(location.label, `photoPage.locations.${location.id}.label`);
}

validateUnique(photos.map((photo) => photo.id), "photos.id");
validateUnique(photos.map((photo) => photo.src), "photos.src");
for (const photo of photos) {
  const label = `photos.${photo.id}`;
  validateIdentifier(photo.id, `${label}.id`);
  requireText(photo.alt, `${label}.alt`);
  if (photo.caption !== undefined) requireText(photo.caption, `${label}.caption`);
  if (!photoPage.locations.some((location) => location.id === photo.locationId)) {
    report(`${label}.locationId: unknown location ${photo.locationId}`);
  }
  if (
    photo.homeSlot !== undefined &&
    !homePhotoSlotIds.includes(photo.homeSlot)
  ) {
    report(`${label}.homeSlot: unsupported slot ${photo.homeSlot}`);
  }
}

const homePhotoSlots = photoPage.homeStrip.slots;
validateUnique(homePhotoSlots.map((slot) => slot.id), "photoPage.homeStrip.slots.id");
validateUnique(
  photos.flatMap((photo) => (photo.homeSlot ? [photo.homeSlot] : [])),
  "photos.homeSlot",
);
for (const slotId of homePhotoSlotIds) {
  const slot = homePhotoSlots.find((candidate) => candidate.id === slotId);
  if (!slot) {
    report(`photoPage.homeStrip.slots: missing ${slotId}`);
    continue;
  }
  if (slot.acceptedAspectRatios.length === 0) {
    report(`photoPage.homeStrip.slots.${slotId}: expected an accepted aspect ratio`);
  }
  for (const aspectRatio of slot.acceptedAspectRatios) {
    if (!["portrait", "landscape", "square"].includes(aspectRatio)) {
      report(
        `photoPage.homeStrip.slots.${slotId}: unsupported aspect ratio ${aspectRatio}`,
      );
    }
  }
  const initialPhoto = photos.find((photo) => photo.homeSlot === slotId);
  if (!initialPhoto) {
    report(`photos.homeSlot: missing initial photo for ${slotId}`);
    continue;
  }
  if (!slot.acceptedAspectRatios.includes(initialPhoto.aspectRatio)) {
    report(
      `photos.${initialPhoto.id}.homeSlot: ${initialPhoto.aspectRatio} is incompatible with ${slotId}`,
    );
  }
  const initialPhotoIds = new Set(
    photos.flatMap((photo) => (photo.homeSlot ? [photo.id] : [])),
  );
  const hasAlternative = photos.some(
    (photo) =>
      !initialPhotoIds.has(photo.id) &&
      slot.acceptedAspectRatios.includes(photo.aspectRatio),
  );
  if (!hasAlternative) {
    report(`photoPage.homeStrip.slots.${slotId}: no compatible alternative photo`);
  }
}
for (const slot of homePhotoSlots) {
  if (!homePhotoSlotIds.includes(slot.id)) {
    report(`photoPage.homeStrip.slots.${slot.id}: unsupported slot`);
  }
}

validateUnique(timelineData.map((entry) => entry.id), "timelineData.id");
for (const entry of timelineData) {
  validateIdentifier(entry.id, `timelineData.${entry.id}.id`);
  requireText(entry.date, `timelineData.${entry.id}.date`);
  requireText(entry.title, `timelineData.${entry.id}.title`);
  requireText(entry.company, `timelineData.${entry.id}.company`);
  requireText(entry.description, `timelineData.${entry.id}.description`);
}

const miniProjectSlugs = new Set(miniProjects.map((project) => project.slug));
const publishedIds = new Set(publishedEntries.map((entry) => entry.id));
const experienceIds = new Set(timelineData.map((entry) => entry.id));
const doodleAssetIds = new Set(doodleLibrary.assets.map((asset) => asset.id));
const homeExperienceSkillIds = new Set(
  Object.keys(homeContent.experience.skillLabels),
);

validateUnique(
  doodleLibrary.placements.map((placement) => placement.id),
  "doodleLibrary.placements.id",
);
for (const [index, placement] of doodleLibrary.placements.entries()) {
  const label = `doodleLibrary.placements[${index}]`;
  validateIdentifier(placement.id, `${label}.id`);
  if (!doodleAssetIds.has(placement.assetId)) {
    report(`${label}.assetId: unknown doodle asset ${placement.assetId}`);
  }
  if (!doodleSlots.includes(placement.slot)) {
    report(`${label}.slot: unsupported slot ${placement.slot}`);
  }
  if (!doodleMotions.includes(placement.motion)) {
    report(`${label}.motion: unsupported motion ${placement.motion}`);
  }
  if (
    placement.backing !== undefined &&
    !doodleBackings.includes(placement.backing)
  ) {
    report(`${label}.backing: unsupported backing ${placement.backing}`);
  }
  if (placement.ink !== undefined && !doodleInks.includes(placement.ink)) {
    report(`${label}.ink: unsupported ink ${placement.ink}`);
  }
  if (placement.layout !== undefined && !doodleLayouts.includes(placement.layout)) {
    report(`${label}.layout: unsupported layout ${placement.layout}`);
  }
  if (placement.align !== undefined && !["start", "end"].includes(placement.align)) {
    report(`${label}.align: unsupported alignment ${placement.align}`);
  }
  if (placement.edge !== undefined && !["top", "bottom"].includes(placement.edge)) {
    report(`${label}.edge: unsupported edge ${placement.edge}`);
  }
  if (placement.edge !== undefined && placement.layout !== "overlay") {
    report(`${label}.edge: only overlay placements accept an edge`);
  }
  validateResponsiveNumber(placement.displayWidth, `${label}.displayWidth`, {
    min: 24,
    max: 560,
  });
  if (
    placement.rotation !== undefined &&
    (!Number.isFinite(placement.rotation) ||
      placement.rotation < -30 ||
      placement.rotation > 30)
  ) {
    report(`${label}.rotation: expected a number from -30 to 30`);
  }
  if (
    placement.travelDistance !== undefined &&
    placement.motion !== "fly-right"
  ) {
    report(
      `${label}.travelDistance: only fly-right placements accept travel`,
    );
  }
  if (placement.travelDistance !== undefined) {
    validateResponsiveNumber(
      placement.travelDistance,
      `${label}.travelDistance`,
      {
        min: 16,
        max: 160,
      },
    );
  }
  if (placement.offset !== undefined) {
    if (
      !placement.offset ||
      typeof placement.offset !== "object" ||
      Array.isArray(placement.offset)
    ) {
      report(`${label}.offset: expected an object with responsive x/y values`);
    } else {
      for (const key of Object.keys(placement.offset)) {
        if (!["x", "y"].includes(key)) {
          report(`${label}.offset.${key}: unsupported offset axis`);
        }
      }
      for (const axis of ["x", "y"]) {
        if (placement.offset[axis] !== undefined) {
          validateResponsiveNumber(
            placement.offset[axis],
            `${label}.offset.${axis}`,
            { min: -180, max: 180 },
          );
        }
      }
    }
  }
  if (
    placement.layer !== undefined &&
    (!Number.isInteger(placement.layer) ||
      placement.layer < 0 ||
      placement.layer > 10)
  ) {
    report(`${label}.layer: expected an integer from 0 to 10`);
  }
  if (
    placement.revealAfterInteractions !== undefined &&
    (!Number.isInteger(placement.revealAfterInteractions) ||
      placement.revealAfterInteractions < 1 ||
      placement.revealAfterInteractions > 10)
  ) {
    report(`${label}.revealAfterInteractions: expected an integer from 1 to 10`);
  }
  if (
    placement.revealAfterInteractions !== undefined &&
    placement.layout !== "overlay"
  ) {
    report(`${label}.revealAfterInteractions: requires the overlay layout`);
  }
  if (
    placement.revealAfterInteractions !== undefined &&
    ![
      "devlog-filter-rail",
      "home-miniprojects-shuffle",
    ].includes(
      placement.slot,
    )
  ) {
    report(`${label}.revealAfterInteractions: slot does not receive interactions`);
  }
  if (placement.slot === "devlog-entry-margin") {
    if (!placement.anchorId || !publishedIds.has(placement.anchorId)) {
      report(`${label}.anchorId: expected a published Devlog entry ID`);
    }
  } else if (placement.slot === "mini-project-media") {
    if (!placement.anchorId || !miniProjectSlugs.has(placement.anchorId)) {
      report(`${label}.anchorId: expected a mini-project slug`);
    }
  } else if (placement.slot === "home-experience-skill") {
    if (
      !placement.anchorId ||
      !homeExperienceSkillIds.has(placement.anchorId)
    ) {
      report(`${label}.anchorId: expected a home experience skill ID`);
    }
  } else if (placement.anchorId !== undefined) {
    report(
      `${label}.anchorId: this slot does not accept an anchor`,
    );
  }
}

for (const [label, slug] of [
  ["homeContent.currentBuilds.miniProjectSlug", homeContent.currentBuilds.miniProjectSlug],
  ...homeContent.miniProjectSlugs.map((slug, index) => [
    `homeContent.miniProjectSlugs[${index}]`,
    slug,
  ]),
]) {
  if (!miniProjectSlugs.has(slug)) report(`${label}: unknown mini-project slug ${slug}`);
}
validateUnique(homeContent.miniProjectSlugs, "homeContent.miniProjectSlugs");

if (!publishedIds.has(homeContent.featuredDevlogId)) {
  report(
    `homeContent.featuredDevlogId: unknown or draft devlog ID ${homeContent.featuredDevlogId}`,
  );
}

validateUnique(homeContent.featuredExperienceIds, "homeContent.featuredExperienceIds");
for (const id of homeContent.featuredExperienceIds) {
  if (!experienceIds.has(id)) {
    report(`homeContent.featuredExperienceIds: unknown experience ID ${id}`);
  }
}

validatePage(projectsPage, "/projects", "projectsPage");
validatePage(miniProjectsPage, "/miniprojects", "miniProjectsPage");
validatePage(photoPage, "/photos", "photoPage");
validatePage(devlogPage, "/devlog", "devlogPage");
validateTextTree(projectsPage, "projectsPage");
validateTextTree(miniProjectsPage, "miniProjectsPage");
validateTextTree(photoPage, "photoPage");
validateTextTree(devlogPage, "devlogPage");
validateTextTree(homeContent, "homeContent");
validateTextTree(siteData, "siteData");
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteData.email)) {
  report(`siteData.email: invalid email address ${siteData.email}`);
}
for (const key of [
  "controlLabel",
  "hintLabel",
  "successLabel",
  "failureLabel",
  "successAnnouncement",
  "failureAnnouncement",
]) {
  requireText(siteData.emailCopy[key], `siteData.emailCopy.${key}`);
}
if (
  !doodleLibrary.placements.some(
    (placement) => placement.slot === "home-contact-email",
  )
) {
  report("doodleLibrary.placements: missing home-contact-email placement");
}
for (const key of ["controlLabel", "visibleLabel"]) {
  requireText(
    homeContent.introduction.photoCat[key],
    `homeContent.introduction.photoCat.${key}`,
  );
}
for (const key of [
  "label",
  "showLabel",
  "hideLabel",
  "compactLabel",
  "hint",
  "catControlLabel",
  "storageKey",
  "catSrc",
  "fishSrc",
]) {
  requireText(siteData.pointerCompanion[key], `siteData.pointerCompanion.${key}`);
}
validatePortfolioCopy(
  {
    aboutCards,
    educationData,
    homeContent,
    leadershipData,
    miniProjects,
    miniProjectsPage,
    projects,
    projectsPage,
    skillData,
    timelineData,
  },
  "portfolioCopy",
);

const pagePaths = [
  projectsPage.pathname,
  miniProjectsPage.pathname,
  photoPage.pathname,
  devlogPage.pathname,
];
validateUnique(pagePaths, "archive page pathnames");
validateUnique(siteData.archiveNavigation.map((item) => item.href), "siteData.archiveNavigation");
for (const item of siteData.archiveNavigation) {
  requireText(item.label, `siteData.archiveNavigation.${item.href}.label`);
  if (!pagePaths.includes(item.href)) {
    report(`siteData.archiveNavigation: ${item.href} has no archive page config`);
  }
}
for (const pagePath of pagePaths) {
  if (!siteData.archiveNavigation.some((item) => item.href === pagePath)) {
    report(`siteData.archiveNavigation: missing ${pagePath}`);
  }
}

walkAssets(
  {
    devLogEntries,
    devlogPage,
    doodleLibrary,
    aboutCards,
    educationData,
    homeContent,
    leadershipData,
    miniProjects,
    miniProjectsPage,
    photoPage,
    photos,
    projects,
    projectsPage,
    siteData,
    skillData,
    timelineData,
  },
  "data",
);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Content validation passed: ${projects.length} projects, ${miniProjects.length} mini-projects, ${publishedEntries.length} published notes, ${photos.length} photos.`,
);
