type Props = { children: React.ReactNode; tone?: "dark" | "light" };

/** Short coloured label above a section heading. */
export function SectionLabel({ children, tone = "dark" }: Props) {
  return (
    <p className={`text-[0.95rem] font-semibold ${tone === "light" ? "text-gold-400" : "text-green-700"}`}>
      {children}
    </p>
  );
}
