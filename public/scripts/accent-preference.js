try {
  const script = document.currentScript;
  const storageKey = script?.dataset.storageKey;
  const accent = storageKey ? localStorage.getItem(storageKey) : null;

  if (accent === "orange" || accent === "magenta") {
    document.documentElement.dataset.folioAccent = accent;
  }
} catch {
  // Keep the default accent when storage is unavailable.
}
