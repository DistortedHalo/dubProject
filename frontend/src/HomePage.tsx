import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { evidenceCards, metricTiles } from "./data";
import type { HomeActionHandlers } from "./types";
import { renderMarkedText, renderMultilineMarkedText } from "./textFormat";
import { FadeIn } from "./components/FadeIn";
import { Footer } from "./components/Footer";
import { Button } from "./components/Button";
import { LogoStamp } from "./components/LogoStamp";
import { RotatingWord } from "./components/RotatingWord";
import { TrackList } from "./components/TrackList";

export function HomePage({ onLearnMore, onSubmitBrief, onHome, content }: HomeActionHandlers) {
  return (
    <div className="min-h-screen bg-black text-white">
      <LogoStamp onClick={onHome} />

      <main>
     <section className="min-h-[160px] bg-black px-0 pt-8 pb-10 md:px-10 lg:px-10">
          <div className="flex min-h-[160px] w-full items-start md:mx-auto md:max-w-[1280px]">
            <div className="w-full pt-[9vh] md:pt-[10vh]">
              <FadeIn>
                <h1
                  className="
                    text-left
                    font-medium
                    leading-[0.9]
                    tracking-[-0.07em]
                    text-white
                    text-[64px]
                    sm:text-[96px]
                    md:text-[130px]
                    lg:text-[170px]
                    xl:text-[210px]
                  "
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {renderMultilineMarkedText(content.homeHero)}
                </h1>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="px-0 py-16 md:py-0">
          <div className="container-shell">
            <div className="max-w-xl pb-2 md:pb-6">
              <FadeIn delay={0.12}>
                <div className="space-y-10" style={{overflow:"visible"}}>
                  <p className="text-[0.95rem] uppercase leading-[1.2] tracking-[0.08em] text-white/20 md:text-[0.875rem]">
                    {renderMarkedText(content.homeIntro)}
                  </p>

                  <div className="flex flex-wrap gap-4">
                  <Button onClick={onSubmitBrief} variant="primary">
                    <ArrowRight size={16} />
                    Submit brief
                  </Button>

                  <Button onClick={onLearnMore} variant="ghost">
                    <ArrowRight size={16} />
                    Learn More
                  </Button>
                </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="full-bleed overflow-hidden border-y border-white/10">
            <div className="carousel-track py-4">
              {[...evidenceCards, ...evidenceCards].map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  className="w-[260px] shrink-0 border border-white/10 bg-white/[0.03] md:w-[320px]"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-[220px] w-full object-cover opacity-80 md:h-[260px]"
                  />
                  <div className="p-4 md:p-5">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/35">
                      {card.category}
                    </div>
                    <div className="mt-2 text-xl text-white">{card.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-0 pb-10 md:pb-14">
          <div className="container-shell border-t border-white/10 pt-10 md:pt-16">
            <FadeIn>
              <div>
                <h2 className="huge-title max-w-5xl">
                  {renderMultilineMarkedText(content.homeSectionTitle)}{" "}
                  <RotatingWord words={content.rotatingWords} />
                </h2>
                <div className="mt-7 h-px w-full bg-white/10" />
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="full-bleed">
            <div className="relative overflow-hidden bg-neutral-950">
              <img
                src="images/e.jpeg"
                alt="Night city movement"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative container-shell grid min-h-[520px] gap-10 px-0 py-14 md:grid-cols-2 md:py-18 lg:grid-cols-3">
                {metricTiles.map((stat, index) => (
                  <FadeIn key={stat.value} delay={index * 0.08} className="self-end px-8 md:px-12">
                    <div className="text-[4.2rem] font-medium leading-none tracking-[-0.06em] md:text-[5.5rem]">
                      {stat.value}
                    </div>
                    <div className="mt-3 max-w-[220px] text-lg text-white/75">{stat.label}</div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 py-16 md:py-22">
          <div className="container-shell border-t border-white/10 pt-10 md:pt-14">
            <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
              <div className="text-xs uppercase tracking-[0.28em] text-white/30 lg:[writing-mode:vertical-rl] lg:rotate-180">
                Example tracks we pitch
              </div>

              <FadeIn>
                <TrackList />
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="full-bleed">
            <FadeIn delay={0.12}>
              <div className="relative overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src="images/f.jpg"
                  alt="Underground electronic mood"
                  className="h-full min-h-[420px] w-full object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 text-center text-xs uppercase leading-[1.8] tracking-[0.28em] text-white/68 md:text-sm">
                  {renderMarkedText(content.homeSourcingOverlay)}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="px-0 py-20 md:py-28">
          <div className="container-shell border-t border-white/10 pt-14">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="massive-title">
                  Submit
                  <br />
                  brief.
                </h2>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Button onClick={onSubmitBrief}>
                  <ArrowRight size={16} />
                  Submit brief
                </Button>
                <a href="mailto:hello@dubsync.com">
                  <Button>
                    <Mail size={16} />
                    Email
                  </Button>
                </a>
                <a href="https://wa.me/">
                  <Button>
                    <MessageCircle size={16} />
                    Whatsapp
                  </Button>
                </a>
                
                <Button onClick={onLearnMore}>
                  <ArrowRight size={16} />
                  Learn More
                </Button>
                
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onLearnMore={onLearnMore} onHome={onHome} content={content} />
    </div>
  );
}