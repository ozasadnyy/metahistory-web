import React, { useEffect, useState } from "react";
import SupportButton from "@components/SupportButton";
import DonatePopup from "@sections/Warline/DonatePopup";
import { useViewPort } from "@hooks/useViewport";
import { MINT_LINK, RELEASE_DATE } from "@sections/Constants";

type PropsSupportSticky = {
  targetAnchorId: string;
};


const SupportSticky = ({ targetAnchorId }: PropsSupportSticky) => {
  const [difference, setDifference] = useState(+new Date(RELEASE_DATE) - +new Date());
  useEffect(() => {
    const timer = setTimeout(() => {
      setDifference(+new Date(RELEASE_DATE) - +new Date());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const CTA =
    difference > 0
      ? "Support Ukraine while waiting for the drop"
      : "Buy NFT to support Ukraine";

  const [showDonatePopup, setShowDonatePopup] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const { isMobile, isTablet } = useViewPort();

  const onScroll = () => {
    // ???
    const target = document.getElementById(targetAnchorId);
    if (target) {
      console.log("target");
      const appear =
        window.scrollY > target?.offsetTop + target?.clientHeight - 200;
      setShow(appear);
    }
    console.log(
      "onScroll",
      window.innerHeight,
      window.scrollY,
      document.body.offsetHeight
    );
    window.innerHeight + window.scrollY <= document.body.offsetHeight - 300
      ? setShow(false)
      : setShow(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  const stickyButton =
    difference > 0 ? (
      <SupportButton
        label={"Support Ukraine"}
        onClick={() => {
          if (isMobile) setShowBtn(false);
          setShowDonatePopup(true);
        }}
      />
    ) : (
      <div className={`mr-4% pb-5px  `}>
        <button
          className={`font-rblack text-white  rounded-full   border-2 px-25px py-12px whitespace-nowrap border-white mobile:text-12px laptop:text-14px desktop:text-16px
        hover:border-2 hover:shadow-[0_0_0_1px_rgba(255,255,255,1)]`}
        >
          <a href={MINT_LINK}>Buy NFT</a>
        </button>
      </div>
    );

  return show ? (
    <></>
  ) : (
    <>
      {isMobile ? (
        <div className="fixed left-0 bottom-0 bg-carbon w-100% px-10% py-20px">
          <div
            className="flex align-center justify-between"
            onClick={() => setShowBtn(!showBtn)}
          >
            <p className="font-rblack mobile:text-16px tablet:text-28px text-white w-60%">
              {CTA}
            </p>
            <img
              src={"img/down-white.svg"}
              style={showBtn ? {} : { transform: "rotate(-90deg)" }}
            />
          </div>

          {showBtn && <div className="pt-20px">{stickyButton}</div>}
        </div>
      ) : isTablet ? (
        <div className="fixed left-0 bottom-0 bg-carbon w-100% px-10% py-30px">
          <p className="font-rblack text-32px text-white">{CTA}</p>
          <div className="pt-20px">{stickyButton}</div>
        </div>
      ) : (
        <div className="fixed z-0 left-0 bottom-0 bg-carbon w-100% px-10% py-30px flex flex-row items-center justify-center">
          <p className="font-rblack text-28px leading-28px text-white">{CTA}</p>
          <div className="ml-30px mt-7">{stickyButton}</div>
        </div>
      )}
      {showDonatePopup ? (
        <DonatePopup setShowDonatePopup={setShowDonatePopup} />
      ) : null}
    </>
  );
};

export default SupportSticky;