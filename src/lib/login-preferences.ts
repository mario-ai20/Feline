const DEFAULT_LOGIN_BACKGROUND = "Standaard.mp4";
const LOGIN_BACKGROUND_STORAGE_KEY = "feline.loginBackground";
const LEGACY_LOGIN_BACKGROUND_STORAGE_KEY = "saartje.loginBackground";
const LEGACY_LOGIN_BACKGROUND_VALUES = new Set(["Intro 1.mp4", "Intro1.mp4"]);

export const defaultLoginBackground = DEFAULT_LOGIN_BACKGROUND;

type Listener = () => void;

let currentLoginBackground = DEFAULT_LOGIN_BACKGROUND;
let hasHydratedFromStorage = false;
const listeners = new Set<Listener>();

function normalizeLoginBackground(value: string | null): string {
  if (!value || LEGACY_LOGIN_BACKGROUND_VALUES.has(value)) {
    return DEFAULT_LOGIN_BACKGROUND;
  }

  return value;
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function readFromStorage(): string {
  if (typeof window === "undefined") {
    return currentLoginBackground;
  }

  try {
    return normalizeLoginBackground(
      window.localStorage.getItem(LOGIN_BACKGROUND_STORAGE_KEY) ??
        window.localStorage.getItem(LEGACY_LOGIN_BACKGROUND_STORAGE_KEY),
    );
  } catch {
    return currentLoginBackground;
  }
}

export function getLoginBackgroundSnapshot(): string {
  return hasHydratedFromStorage ? currentLoginBackground : DEFAULT_LOGIN_BACKGROUND;
}

export function subscribeToLoginBackground(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function hydrateLoginBackgroundFromStorage() {
  const next = readFromStorage();
  hasHydratedFromStorage = true;

  if (next === currentLoginBackground) {
    return;
  }

  currentLoginBackground = next;
  emitChange();
}

export function storeLoginBackground(loginBackground: string | null) {
  currentLoginBackground = normalizeLoginBackground(loginBackground);
  hasHydratedFromStorage = true;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LOGIN_BACKGROUND_STORAGE_KEY, currentLoginBackground);
      window.localStorage.setItem(LEGACY_LOGIN_BACKGROUND_STORAGE_KEY, currentLoginBackground);
    } catch {
      // Ignore storage failures; the in-memory snapshot still updates.
    }
  }

  emitChange();
}
