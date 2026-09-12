import { createMorph } from "morphicons/dom";
import { ArrowRight, ArrowUpRight, Play, Sparkles, BookOpen, Orbit, WandSparkles, MousePointer2, Menu, X } from "lucide";

const icons = { ArrowRight, ArrowUpRight, Play, Sparkles, BookOpen, Orbit, WandSparkles, MousePointer2, Menu, X };
const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function makeIcon(host, initialName) {
  const initial = icons[initialName] || ArrowRight;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.8");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.appendChild(path);
  host.replaceChildren(svg);
  const morph = createMorph(path, initial, { reducedMotion: reduced ? "always" : "user" });
  return { morph, initial };
}

document.querySelectorAll("[data-morph-icon]").forEach((host) => {
  const initialName = host.dataset.morphIcon || "ArrowRight";
  const hoverName = host.dataset.morphHover || "ArrowUpRight";
  const { morph, initial } = makeIcon(host, initialName);
  const trigger = host.closest("a,button,.morph-trigger") || host;
  trigger.addEventListener("pointerenter", () => morph.morphTo(icons[hoverName] || ArrowUpRight, "snappy"));
  trigger.addEventListener("pointerleave", () => morph.morphTo(initial, "snappy"));
  trigger.addEventListener("focus", () => morph.morphTo(icons[hoverName] || ArrowUpRight, "snappy"));
  trigger.addEventListener("blur", () => morph.morphTo(initial, "snappy"));
});

// Rare UI-inspired tactile spotlight: each card owns its light instead of using a generic page glow.
document.querySelectorAll(".gateway-card,.visual,.foundation-item,.cap,.timeline-link").forEach((card) => {
  card.classList.add("rare-spotlight");
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  });
});
