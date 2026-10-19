import Image from "next/image";
import { Fill } from "../primitives";

export function Banner() {
  return (
    <section aria-label="Design, code, share" className="px-4 sm:px-8 xl:px-0">
      <div className="relative mx-auto flex h-[220px] max-w-[1347px] items-center justify-center overflow-clip rounded-[15px] border border-black bg-[#fefefe] md:h-[343px] xl:translate-x-[-4.5px]">
        <div className="absolute top-[-66.41px] left-[-52.5px] h-[260.408px] w-[290.5px] max-md:scale-60 max-md:origin-top-left">
          <Fill src="/figma/banner-deco-left.svg" inset="-1.47% -0.77% 0 0" />
        </div>
        <div className="absolute top-[-26px] right-[-295px] h-[94px] w-[365px] bg-[#ffb802]" />
        <Image
          src="/figma/banner-deco-grid.svg"
          alt=""
          width={135.022}
          height={117.146}
          className="absolute top-[-1px] right-[-8.02px] h-[117.146px] w-[135.022px] max-w-none max-md:scale-60 max-md:origin-top-right"
        />
        <div className="absolute top-[222px] right-[49px] hidden size-[78px] md:block">
          <Fill src="/figma/banner-deco-plus.svg" inset="-1.28%" />
        </div>
        <div className="absolute top-[239px] right-[252px] hidden h-[43.5px] w-[37px] md:block">
          <Fill src="/figma/banner-cursor.svg" inset="-7.15% -9.79% -8.26% -5.67%" />
        </div>
        <p className="relative px-4 text-center text-[24px] leading-[0.995] font-bold whitespace-nowrap text-[#141414] sm:text-[56px] md:-mt-[7px] md:text-[60px] xl:text-[75px]">
          Design . Code . Share
        </p>
      </div>
    </section>
  );
}
