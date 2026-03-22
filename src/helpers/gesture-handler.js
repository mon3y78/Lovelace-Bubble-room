// src/helpers/gesture-handler.js

/** Default hold duration in milliseconds */
export const HOLD_THRESHOLD = 500;

/**
 * Creates a reusable gesture controller for tap/hold actions.
 *
 * Eliminates duplicated pointer-event logic from BubbleIcon, BubbleMushroom
 * and BubbleSubButton.
 *
 * Usage:
 *   const g = createGestureHandler({
 *     onTap:  (arg) => ...,
 *     onHold: (arg) => ...,
 *   });
 *   element.addEventListener('pointerdown',  () => g.onDown(arg));
 *   element.addEventListener('pointerup',    () => g.onUp(arg));
 *   element.addEventListener('pointerleave', () => g.clearTimer());
 *   element.addEventListener('pointercancel',() => g.onCancel());
 *
 * Multi-button support: pass the button index (or entity object) as `arg`.
 * onTap / onHold are only fired when the up-arg matches the down-arg.
 *
 * @param {Object}   opts
 * @param {number}   [opts.holdThreshold=500] - Hold duration in ms
 * @param {Function} opts.onTap               - Fired on tap; receives arg from onDown
 * @param {Function} opts.onHold              - Fired on hold; receives arg from onDown
 * @returns {{ onDown, onUp, onCancel, clearTimer }}
 */
export function createGestureHandler({
  holdThreshold = HOLD_THRESHOLD,
  onTap,
  onHold,
} = {}) {
  let holdTimer = null;
  let holdFired = false;
  let pendingArg = undefined;

  /** Cancel the pending hold timer (does NOT reset holdFired). */
  function clearTimer() {
    if (holdTimer !== null) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
  }

  /** Call on pointerdown. Starts the hold timer. */
  function onDown(arg) {
    holdFired = false;
    pendingArg = arg;
    clearTimer();
    holdTimer = setTimeout(() => {
      holdFired = true;
      holdTimer = null;
      onHold?.(pendingArg);
    }, holdThreshold);
  }

  /**
   * Call on pointerup. Fires tap if hold did not already fire.
   * For multi-button layouts, tap is suppressed when `arg !== pendingArg`.
   */
  function onUp(arg) {
    clearTimer();
    if (holdFired) {
      holdFired = false;
      return;
    }
    // Multi-button guard: only fire tap on the same target as onDown
    if (arg !== undefined && pendingArg !== undefined && arg !== pendingArg) return;
    onTap?.(arg !== undefined ? arg : pendingArg);
  }

  /** Call on pointercancel. Clears timer and resets state. */
  function onCancel() {
    clearTimer();
    holdFired = false;
    pendingArg = undefined;
  }

  return { onDown, onUp, onCancel, clearTimer };
}
