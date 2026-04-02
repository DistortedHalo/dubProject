import { ArrowLeft, ArrowRight, Mail, MessageCircle } from "lucide-react";
import { livestreamStats } from "./data";
import { Footer } from "./components/Footer";
import { FadeIn } from "./components/FadeIn";
import { LogoStamp } from "./components/LogoStamp";
import { renderMultilineMarkedText } from "./textFormat";
import type { SiteContent } from "./types";
import { Button } from "./components/Button";

type LearnMorePageProps = {
  onBack: () => void;
  onHome: () => void;
  onSubmitBrief: () => void;
  content: SiteContent;
};

export function LearnMorePage({ onBack, onHome, onSubmitBrief, content }: LearnMorePageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <LogoStamp onClick={onHome} />

      <div className="container-shell flex items-center justify-start py-8">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-white/36 transition hover:text-white">
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <main>
        <section className="px-0 py-10 md:py-16">
          <div className="container-shell">
            <FadeIn>
              <h1 className="massive-title max-w-6xl">{renderMultilineMarkedText(content.learnHero)}</h1>
            </FadeIn>
          </div>
        </section>

        <section className="px-0 py-24 md:py-32">
          <div className="container-shell">
            <FadeIn>
              <h2 className="massive-title"
                   style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                LIVE-STREAM DATA
                <br />
                (DEC 25’)
              </h2>
            </FadeIn>

            <div className="mt-16 grid gap-8 xs: grid-cols-2 md:grid-cols-5">
              {livestreamStats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.05}>
                  <div>
                    <div className="text-2xl text-white md:text-3xl">{stat.value}</div>
                    <div className="mt-2 text-white/40">{stat.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="full-bleed overflow-hidden">
            <div className="relative min-h-[70vh] md:min-h-screen">
              <img
                src="images/h.jpg"
                alt="Fast moving culture"
                className="absolute inset-0 h-full w-full object-cover scale-[1.05]"
              />
              <div className="absolute inset-0 bg-black/60" />

              <div className="relative z-10 flex h-full min-h-[70vh] md:min-h-screen flex-col justify-center px-6 py-16 md:px-12 lg:px-16">
                
                <FadeIn>
                  <div className="w-full text-center mb-14 md:mb-20">
                    <h2
                      className="text-[2.6rem] leading-[0.9] tracking-[-0.06em] text-white md:text-[5rem]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      LIVE-STREAM DATA
                      <br />
                      (DEC 25’)
                    </h2>
                  </div>
                </FadeIn>

                <div className="flex flex-col gap-10 md:gap-14">
                  {livestreamStats.map((stat, i) => {
                    const isLeft = i % 2 === 0;

                    return (
                      <FadeIn key={stat.label} delay={i * 0.05}>
                        <div className={`flex w-full ${isLeft ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`
                              max-w-[280px] md:max-w-[340px]
                              ${isLeft ? "text-left" : "text-right"}
                              ${isLeft ? "md:ml-[6%] lg:ml-[10%]" : "md:mr-[6%] lg:mr-[10%]"}
                            `}
                          >
                            <div className="text-[2.2rem] leading-none tracking-[-0.06em] text-white md:text-[4.5rem]">
                              {stat.value}
                            </div>
                            <div className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>

              </div>
            </div>
          </section>



        <section className="full-bleed overflow-hidden">
          <div className="relative min-h-[50vh]">
  
            <div className="bg-black/60" />
            <div className="max-w-[1280px] md:mx-auto md:top-200" style={{paddingBottom: "120px"}}>
              <h2 className="massive-title" style={{paddingTop:"120px"}}>
                NOT A LIBRARY
                <br />
                (NOT A PLATFORM)
                <br />
                WHAT IS IT?
              </h2>

              <p className="mt-10 text-xs uppercase leading-[1.7] tracking-[0.22em] text-white/50">
                A LIVE SOURCING AND CURATION LAYER BETWEEN ELECTRONIC MUSIC CULTURE AND COMMERCIAL PRODUCTION, THROUGH DAILY LIVE PUBLIC LISTENING SESSIONS AND REAL-TIME COMMUNITY SUBMISSION.
              </p>
            </div>
          </div>
        </section>

        <section className="full-bleed overflow-hidden">
          <div className="relative min-h-[90vh]">
            <img
              src="images/c.jpg"
              alt="Trees spinning"
              className="absolute inset-0 h-full w-full object-cover scale-[1.05] opacity-90"
            />
          
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 container-shell py-24 md:py-32">
              <h3 className="md:mx-auto max-w-[900px] text-[1.5rem] md:text-[2rem] uppercase leading-[1.18] tracking-[-0.04em]"
               style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {content.learnLibraryHeading}
              </h3>

              <div className="text-white/18 md:mx-auto mt-20 max-w-[720px] space-y-0 text-[1.1rem] leading-6 text-white/60">
                {content.learnLibraryBody
                  .split(/\n\n+/)
                  .filter(Boolean)
                  .map((paragraph) => (
                    <p className="whitespace-pre-line" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </section>

<section className="py-20 md:py-28">

    <div className="mx-auto text-center" style={{paddingBottom: "40px"}}>
      <h2
        className="massive-title"
        style={{ fontWeight: "500" }}
      >
        Submit
        <br />
        brief.
      </h2>
    </div>
  <div className="mx-auto w-full max-w-[680px] px-4">
    <div className="border border-white/10  backdrop-blur-sm p-8 md:p-10 rounded-2xl text-center shadow-[0_0_40px_rgba(0,0,0,0.4)]">
      
      <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={onSubmitBrief}>
                  <ArrowRight size={16} />
                  Submit brief
                </Button>

              <Button href="mailto:hello@dubsync.com">
                    <Mail size={16} />
                    Email
                </Button>

          
                <Button href="https://wa.me/">
                  <MessageCircle size={16} />
                  Whatsapp
                </Button>
    
                
              <Button onClick={onBack}>
                <ArrowRight size={16} />
                Learn More
              </Button>

      </div>

    </div>
  </div>
</section>
   
      </main>

      <Footer onLearnMore={onBack} onHome={onHome} content={content} />
    </div>
  );
}
