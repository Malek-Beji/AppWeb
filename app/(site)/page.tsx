import Hero from "@/components/site/Hero";
import Ticker from "@/components/site/Ticker";
import CtaBand from "@/components/site/CtaBand";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <CtaBand />
    </>
  );
}
