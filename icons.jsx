/* butiDev — hand-drawn single-stroke SVG icons. Inherit color via currentColor. */
const { createElement: h } = React;

function Svg({ size = 24, w, children, vb = "0 0 24 24", style, className = "" }) {
  return (
    <svg
      width={w || size}
      height={size}
      viewBox={vb}
      className={"sketch " + className}
      style={style}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* curved hand-drawn arrow, points down-right toward a CTA */
function CurvyArrow({ size = 96, style }) {
  return (
    <Svg size={size} w={size} vb="0 0 120 110" style={style}>
      <path d="M14 12 C 10 44, 24 76, 60 84 C 78 88, 92 84, 100 78" />
      <path d="M86 86 C 92 84, 98 80, 100 78 C 100 74, 98 66, 95 60" />
    </Svg>
  );
}

/* hand-drawn checkmark */
function Check({ size = 20, style, className }) {
  return (
    <Svg size={size} w={size} vb="0 0 24 24" style={style} className={className}>
      <path d="M4 13 C 6 15, 8 18, 9.5 19.5 C 13 14, 17 8, 21 4.5" />
    </Svg>
  );
}

/* wavy underline (animated draw) */
function Squiggle({ style }) {
  return (
    <svg className="underline-svg squiggle" viewBox="0 0 600 26" preserveAspectRatio="none" style={style} aria-hidden="true">
      <path className="sketch" style={{ strokeWidth: 6, vectorEffect: "non-scaling-stroke" }}
        d="M6 16 C 90 6, 150 22, 240 14 C 330 6, 400 22, 500 12 C 545 8, 575 14, 594 12" />
    </svg>
  );
}

/* infinity loop */
function Infinity8({ size = 56, style }) {
  return (
    <Svg size={size} w={size * 2} vb="0 0 96 48" style={style}>
      <path d="M48 24 C 42 12, 30 10, 22 16 C 12 23, 14 36, 26 38 C 38 40, 44 30, 48 24 C 52 18, 58 8, 70 10 C 82 12, 84 25, 74 32 C 66 38, 54 36, 48 24 Z" />
    </Svg>
  );
}

/* sketched lightbulb */
function Bulb({ size = 40, style }) {
  return (
    <Svg size={size} w={size} vb="0 0 48 48" style={style}>
      <path d="M24 6 C 14 6, 8 13, 9 22 C 9.5 27, 13 30, 15 33 C 16 35, 16 37, 16 38 L 32 38 C 32 37, 32 35, 33 33 C 35 30, 38.5 27, 39 22 C 40 13, 34 6, 24 6 Z" />
      <path d="M18 38 L 30 38" />
      <path d="M19 42 L 29 42" />
      <path d="M24 16 C 20 17, 18 20, 19 24" style={{ strokeWidth: 1.8 }} />
    </Svg>
  );
}

/* asterisk / spark */
function Spark({ size = 28, style }) {
  return (
    <Svg size={size} w={size} vb="0 0 32 32" style={style}>
      <path d="M16 4 L 16 28 M5 9 L 27 23 M27 9 L 5 23" />
    </Svg>
  );
}

/* disconnected boxes (the problem) */
function Disconnect({ size = 60, style }) {
  return (
    <Svg size={size} w={size * 2.4} vb="0 0 144 60" style={style}>
      <rect x="4" y="14" width="34" height="30" rx="3" />
      <rect x="55" y="6" width="34" height="30" rx="3" />
      <rect x="106" y="22" width="34" height="30" rx="3" />
      <path style={{ strokeDasharray: "2 6", strokeWidth: 2 }} d="M38 30 L 55 21" />
      <path style={{ strokeDasharray: "2 6", strokeWidth: 2 }} d="M72 36 C 72 44, 90 42, 106 38" />
      <path d="M44 9 L 50 3 M47 3 L 50 3 L 50 6" style={{ strokeWidth: 1.8 }} />
    </Svg>
  );
}

/* inline right arrow for buttons/links */
function ArrowR({ size = 17, style, className }) {
  return (
    <svg className={"arr " + (className || "")} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M4 12 H 19" />
      <path d="M13 6 L 20 12 L 13 18" />
    </svg>
  );
}

/* code bracket mark {C/>} used in logo contexts */
function Bracket({ size = 20, style }) {
  return (
    <Svg size={size} w={size} vb="0 0 24 24" style={style}>
      <path d="M9 5 L 5 12 L 9 19 M15 5 L 19 12 L 15 19" style={{ strokeWidth: 2.2 }} />
    </Svg>
  );
}

/* instagram glyph (simple) */
function Insta({ size = 18, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* WhatsApp glyph (brand logo, single filled path) */
function Whatsapp({ size = 30, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.962 11.962 0 005.71 1.448h.005c6.581 0 11.946-5.335 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
    </svg>
  );
}

Object.assign(window, {
  IconSvg: Svg, CurvyArrow, Check, Squiggle, Infinity8, Bulb, Spark, Disconnect, ArrowR, Bracket, Insta, Whatsapp,
});
