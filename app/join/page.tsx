import type { Metadata } from "next";
import JoinForm from "@/components/join-form";

export const metadata: Metadata = {
  title: "Join the Deal List",
  description:
    "Register as an investor with Sam n Harv — tell us your strategy, areas and budget, and hear about UK property deals that fit before anyone else.",
  alternates: { canonical: "/join" },
};

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ src?: string }>;
}) {
  const src = (await searchParams).src;
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="annot muted">The Deal List</p>
          <h1 className="display mt-3 text-5xl md:text-7xl">
            Hear about deals <span className="display-it">first.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed muted">
            Tell us what you&rsquo;re after and we&rsquo;ll bring you deals
            that fit — analysed, honest, and before they go anywhere else.
          </p>
          <div className="mt-10">
            <JoinForm source={src ? `qr-${src}`.slice(0, 30) : "website"} />
          </div>
        </div>
      </section>
    </main>
  );
}
