import { cn } from "@/lib/utils";

const SERIF_STACK =
  'var(--font-serif), "Playfair Display", "Cormorant Garamond", Georgia, serif';

/** Lettres du logotype, chacune positionnée pour un espacement maîtrisé. */
const LETTERS = ["A", "B", "Y", "N", "É", "A"] as const;

const PITCH = 21.4;
const FONT_SIZE = 27.6;
const BASELINE = 38;

/** Étincelle à 4 branches (côtés concaves), centrée sur (cx, cy). */
export function sparklePath(cx: number, cy: number, r: number) {
  const w = r * 0.16;
  return [
    `M ${cx} ${cy - r}`,
    `Q ${cx + w} ${cy - w} ${cx + r} ${cy}`,
    `Q ${cx + w} ${cy + w} ${cx} ${cy + r}`,
    `Q ${cx - w} ${cy + w} ${cx - r} ${cy}`,
    `Q ${cx - w} ${cy - w} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

const LETTER_COLORS = {
  default: "currentColor",
  light: "#FFFFFF",
  mono: "currentColor",
} as const;

export type LogoVariant = keyof typeof LETTER_COLORS;

type LogoProps = {
  className?: string;
  variant?: LogoVariant;
  /** Masque l'étincelle dorée (utile pour un lockup 100 % monochrome). */
  withSparkle?: boolean;
  title?: string;
};

/**
 * Logotype ABYNÉA — wordmark serif + étincelle dorée posée au-dessus du « É ».
 * `viewBox 0 0 200 50` : le SVG se redimensionne sans perte sur tous les écrans.
 */
export function Logo({
  className,
  variant = "default",
  withSparkle = true,
  title = "ABYNÉA",
}: LogoProps) {
  const fill = LETTER_COLORS[variant];
  const sparkleFill = variant === "mono" ? "currentColor" : "#D4AF37";

  const firstCenter = 100 - (PITCH * (LETTERS.length - 1)) / 2;
  const accentCenter = firstCenter + PITCH * LETTERS.indexOf("É");

  return (
    <svg
      viewBox="0 0 200 50"
      className={cn("block w-auto", className)}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title}
      focusable="false"
    >
      <title>{title}</title>

      {LETTERS.map((letter, i) => (
        <text
          key={`${letter}-${i}`}
          x={firstCenter + i * PITCH}
          y={BASELINE}
          textAnchor="middle"
          fill={fill}
          fontFamily={SERIF_STACK}
          fontSize={FONT_SIZE}
          fontWeight={600}
          style={{ letterSpacing: 0 }}
        >
          {letter}
        </text>
      ))}

      {withSparkle && (
        <path
          d={sparklePath(accentCenter + 6, 6, 5)}
          fill={sparkleFill}
          aria-hidden="true"
        />
      )}
    </svg>
  );
}

/**
 * Monogramme « A » + étincelle dorée, pour le favicon et les usages carrés.
 */
export function LogoMark({ className, title = "ABYNÉA" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("block h-8 w-8", className)}
      role="img"
      aria-label={title}
      focusable="false"
    >
      <title>{title}</title>
      <rect x="1" y="1" width="62" height="62" rx="14" fill="#FAFAFA" />
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="14"
        fill="none"
        stroke="#E9E6E1"
        strokeWidth="2"
      />
      <text
        x="32"
        y="48"
        textAnchor="middle"
        fill="#111111"
        fontFamily={SERIF_STACK}
        fontSize="42"
        fontWeight={600}
      >
        A
      </text>
      <path d={sparklePath(47, 17, 7)} fill="#D4AF37" aria-hidden="true" />
    </svg>
  );
}
