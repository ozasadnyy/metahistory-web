import React from 'react';
import Button from '@components/Button';
import { AboutProject } from './AboutProject';

import {
  authors,
  nftDescription,
  nfts,
  projectDescription,
  startDate,
} from './data';

export const VesaZenaida = () => {
  return (
    <>
      <div className="-mt-32px tablet:-mt-40px">
        {/* <div className="max-h-[400px] overflow-hidden flex flex-col justify-end"> */}
        <picture>
          <source
            media="(min-width:650px)"
            srcSet="/img/vesa-zinaida/vesa-zinaida_hero.webp"
          />
          <source
            media="(min-width:465px)"
            srcSet="/img/vesa-zinaida/vesa-zinaida_hero_small.webp"
          />
          <img
            src="/img/vesa-zinaida/vesa-zinaida_hero.webp"
            alt="Vesa&Zinaida"
            className="w-full"
          />
        </picture>
        {/* </div> */}

        <div className="desktop:container mx-auto px-24px tablet:px-72px desktop:px-132px">
          <div className="my-40px tablet:my-64px flex justify-center">
            <div className="w-full max-w-[560px]">
              <h3 className="font-rblack text-16px tablet:text-32px text-center">
                {startDate}
              </h3>

              <Button
                mode="custom"
                label="Set a reminder"
                className="mt-8px tablet:mt-16px bg-white text-carbon w-full h-[42px] tablet:h-[48px] mobile:py-0"
              />

              <p className="mt-40px tablet:mt-48px font-rnarrow text-16px">
                {nftDescription}
              </p>
            </div>
          </div>

          <picture>
            <source
              media="(min-width:650px)"
              srcSet="/img/vesa-zinaida/block.webp"
            />
            <source
              media="(min-width:465px)"
              srcSet="/img/vesa-zinaida/block_small.webp"
            />
            <img
              src="/img/vesa-zinaida/block.webp"
              alt="Block"
              className="w-full"
              loading="lazy"
            />
          </picture>

          <div className="my-32px tablet:my-48px flex flex-col items-center">
            <p className="font-rnarrow text-16px w-full desktop:max-w-[560px]">
              {projectDescription}
            </p>
            <div className="mt-16px tablet:mt-24px h-3px w-full bg-white" />
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-48px">
            {nfts.map(({ name, imgUrl, author, type, year, description }) => (
              <div key={name}>
                <img
                  src={imgUrl}
                  alt={name}
                  className="w-full"
                  loading="lazy"
                />
                <div className="mt-24px flex flex-col tablet:flex-row gap-28px tablet:justify-between">
                  <div>
                    <h2 className="font-rblack text-16px">{`Artwork by ${author}:`}</h2>
                    <p className="font-rnarrow text-16px">{name}</p>
                    <p className="font-rnarrow text-16px">{type}</p>
                    <p className="font-rnarrow text-16px">{year}</p>
                  </div>

                  <Button
                    mode="custom"
                    label="Set a reminder"
                    className="bg-white text-carbon w-full tablet:w-auto h-[42px] tablet:h-[48px] mobile:py-0"
                  />
                </div>

                <p className="mt-32px tablet:mt-24px font-rnarrow text-16px">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-48px flex flex-col gap-24px tablet:gap-40px">
            {authors.map(({ name, description }) => (
              <p key={name} className="font-rnarrow text-16px">
                <span className="font-rblack">{name}</span> {description}
              </p>
            ))}
          </div>

          <div className="mt-48px">
            <AboutProject />
          </div>
        </div>
      </div>
    </>
  );
};
