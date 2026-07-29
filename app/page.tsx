import BeyondCode from "./_components/beyond-code";
import Channels from "./_components/channels";
import Experience from "./_components/experience";
import Footer from "./_components/footer";
import GitHubActivity from "./_components/github-activity";
import HeroSection from "./_components/hero-section";
import Marquee from "./_components/marquee";
import Principles from "./_components/principles";
import Projects from "./_components/projects";
import Setup from "./_components/setup";
import Skills from "./_components/skills";
import StatsBand from "./_components/stats-band";

export default function Home() {
  return (
    <>
      <main id="main" className="flex-1">
        <HeroSection />
        <Marquee />
        <StatsBand />
        <Projects />
        <Principles />
        <Experience />
        <Skills />
        <GitHubActivity />
        <BeyondCode />
        <Channels />
        <Setup />
      </main>
      <Footer />
    </>
  );
}
