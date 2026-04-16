import { useEffect } from 'react';
import { UpvoteLogo } from '@/components/brand/UpvoteLogo';
import whatsappMockup from '@/assets/whatsapp-mockup.png';

export function LandingPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://paperform.co/__embed.min.js';
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* Content */}
      <div className="relative">
        {/* Gradient mesh */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
          <div className="absolute -top-[200px] right-[10%] h-[600px] w-[600px] rounded-full bg-lavender/[0.12] blur-[100px]" />
          <div className="absolute -top-[100px] -left-[200px] h-[500px] w-[500px] rounded-full bg-[oklch(0.65_0.20_350)]/[0.08] blur-[80px]" />
          <div className="absolute top-[60%] left-[40%] h-[300px] w-[300px] rounded-full bg-lavender/[0.06] blur-[80px]" />
        </div>

        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* ━━━ HERO ━━━ */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24 md:py-32">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
              {/* Left copy */}
              <div className="flex-1 max-w-xl text-center lg:text-left">
                <div className="mb-8 flex justify-center lg:justify-start">
                  <UpvoteLogo size="lg" variant="light" />
                </div>

                <h1 className="text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl lg:text-[56px]">
                  Collect & showcase verified testimonials in seconds
                </h1>

                <p className="mt-6 mx-auto lg:mx-0 max-w-md text-base leading-[1.6] text-muted-foreground sm:mt-8 sm:text-lg">
                  Collect verified testimonials — text, voice, video — from your clients. Display them anywhere on your website, social media, or proposals to turn interest into sales.
                </p>

                <div className="mt-10">
                  <div data-paperform-id="nay1bcdq"></div>
                </div>
              </div>

              {/* Right mockup — WhatsApp phone image */}
              <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md flex-shrink-0 mx-auto lg:mx-0">
                <img
                  src={whatsappMockup}
                  alt="WhatsApp testimonial collection on a phone"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-4 sm:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <UpvoteLogo size="sm" variant="light" />
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Trustloop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
