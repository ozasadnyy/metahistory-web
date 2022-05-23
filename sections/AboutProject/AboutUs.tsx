import React from 'react';
import Blurb from '@sections/AboutProject/Blurb';
import { useAppRouter } from '@hooks/useAppRouter';
import { useVideoModal } from '@providers/VideoProvider';
import ContainerDimensions from 'react-container-dimensions';

const AboutUs = () => {
  const { push } = useAppRouter();
  const { VideoElement } = useVideoModal();

  return (
    <>
      <div className="desktop:flex desktop:flex-row desktop:justify-between mt-20 tablet:mb-75px mobile:mb-8%">
        <div className="desktop:w-[544px] tablet:w-full mobile:w-full tablet:mt-0 mobile:mt-60px">
          <Blurb header="About us" />
          <div className="pt-20px relative tablet:flex tablet:flex-row font-rnarrow mobile:leading-20px tablet:leading-24px mobile:text-14px tablet:text-16px tablet:justify-between">
            <p className="whitespace-pre-wrap pt-10 tablet:w-45% mobile:mb-6%">
              At MetaHistory, we want to preserve the important events of
              history as they are. Truthful, eternal, immutable.
            </p>
            <p className="whitespace-pre-wrap tablet:w-45%">
              У MetaHistory ми хочемо зберегти важливі події в історії такими,
              якими вони є. Правдивими, вічними, незмінними.
            </p>
          </div>
          <button
            onClick={() => {
              push('/about-us');
            }}
            className="font-rblack relative px-30px border-2 border-carbon rounded-full tablet:text-14px
            tablet:leading-44px tablet:mt-0 tablet:ml-auto mobile:text-14px mobile:leading-36px mobile:mt-20px
            mobile:ml-0 px-48px mb-0 tablet:h-48px mobile:h-60px mobile:w-100% tablet:w-auto"
          >
            More about project
          </button>
        </div>
        <div className="desktop:w-[544px] tablet:w-full mobile:w-full mobile:mt-40px tablet:mt-72px desktop:mt-0">
          <ContainerDimensions>
            {({ width }) => (
              <VideoElement
                videoSrc="https://www.youtube-nocookie.com/embed/gUHU4UX8Rs4"
                classNames="w-full"
                styles={{ height: (width / 16) * 9 }}
              />
            )}
          </ContainerDimensions>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
