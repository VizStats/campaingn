type Tone = "dark" | "light" | "gold";
type Props = { children: React.ReactNode; tone?: Tone };

const toneClass: Record<Tone, string> = {
  dark: "text-gold-700", // on paper / cream
  light: "text-gold-400", // on brown / ink
  gold: "text-brown-900", // on gold blocks
};

/** Short coloured label above a section heading. */
export function SectionLabel({ children, tone = "dark" }: Props) {
  return <p className={`text-[0.95rem] font-semibold ${toneClass[tone]}`}>{children}</p>;
}
