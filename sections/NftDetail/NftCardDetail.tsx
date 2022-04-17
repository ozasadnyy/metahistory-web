import { useEffect, useState } from 'react';
import BidsHistoryTable from '@components/BidsHistoryTable';
import Button from '@components/Button';
import { useWeb3Modal } from '@hooks/useWeb3Modal';
import { useViewPort } from '@hooks/useViewport';
import { calculateTimeLeft } from '@sections/AboutProject/ContentTop/CountdownBanner';
import { AuctionItemType } from '@sections/types';
import { useAppRouter } from '@hooks/useAppRouter';
import AuctionData from '@sections/Auction/AuctionData';
import NftCard from '@components/NftCard';
import { usePopup } from 'providers/PopupProvider';

type NftCardDetailProps = {
  item: AuctionItemType;
};

type BidCardProps = {
  isMobile?: boolean;
  endsIn: Date;
  currentBid: string;
  contractAddress: string;
  tokenId: number;
};

const BidCard = ({
  currentBid,
  isMobile,
  endsIn,
  contractAddress,
  tokenId,
}: BidCardProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(`${endsIn}`));
  const { showPopup } = usePopup();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(`${endsIn}`));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex justify-between tablet:items-end mobile:flex-col tablet:flex-row mobile:mt-20px tablet:mt-[0px]">
        <div>
          <p className="text-14px opacity-70 tablet:mb-12px">Current bid</p>
          <p className="mobile:text-27px tablet:text-32px font-black">
            {currentBid} ETH
          </p>
          <p className="text-16px">{/* TODO add $ */}</p>
        </div>
        <div className="tablet:h-60px mobile:h-4px tablet:w-[4px] mobile:w-full mobile:my-20px tablet:my-[0px] bg-carbon dark:bg-white" />
        <div>
          <p className="text-14px opacity-70 tablet:mb-12px">Ends in</p>
          <div className="flex -mx-10px">
            <div className="text-center px-10px">
              <p className="mobile:text-27px tablet:text-32px font-black">
                {timeLeft.days}
              </p>
              <p className="mobile:text-14px tablet:text-16px">days</p>
            </div>
            <div className="text-center px-10px">
              <p className="mobile:text-27px tablet:text-32px font-black">
                {timeLeft.hours}
              </p>
              <p className="mobile:text-14px tablet:text-16px">hours</p>
            </div>
            <div className="text-center px-10px">
              <p className="mobile:text-27px tablet:text-32px font-black">
                {timeLeft.minutes}
              </p>
              <p className="mobile:text-14px tablet:text-16px">minutes</p>
            </div>
            <div className="text-center px-10px">
              <p className="mobile:text-27px tablet:text-32px font-black">
                {timeLeft.seconds}
              </p>
              <p className="mobile:text-14px tablet:text-16px">seconds</p>
            </div>
          </div>
        </div>
      </div>
      {!isMobile && (
        <Button
          mode="custom"
          label="Place Bid"
          onClick={() => {
            showPopup('bid', { currentBid, contractAddress, tokenId });
          }}
          className="bg-white text-carbon w-100% mt-24px"
        />
      )}
    </>
  );
};

const NftCardDetail = ({ item }: NftCardDetailProps) => {
  const { isTablet, isMobile } = useViewPort();
  const { activePopupName, showPopup } = usePopup();
  const { push } = useAppRouter();
  const { getAuctionInfo } = useWeb3Modal();

  const [isSold, _setSold] = useState<boolean>(false);
  const [currentBid, setCurrentBid] = useState<{
    bid: string;
    nextMinBid: string;
    fullInfo: any;
  }>({ bid: '0', nextMinBid: '', fullInfo: '' });

  useEffect(() => {
    getAuctionInfo(item.contractAddress, item.tokenId)
      .then((i) => {
        setCurrentBid({ ...i });
      })
      .catch((error) => console.log(`NftCardDetail ${error}`));
  }, []);

  const handleToAuction = () => push('/auction');
  console.log(currentBid);
  return (
    <>
      <div>
        {(isTablet || isMobile) && !isSold && !activePopupName && (
          <div className="tablet:border-[5px] fixed bg-[#212121] text-white bottom-20px left-[2%] right-[2%] tablet:p-48px w-[96%] z-50 ">
            {isTablet ? (
              <BidCard
                endsIn={item.endsIn}
                currentBid={currentBid.nextMinBid}
                contractAddress={item.contractAddress}
                tokenId={item.tokenId}
              />
            ) : (
              <Button
                mode="custom"
                label="Place Bid"
                onClick={() =>
                  showPopup('bid', {
                    currentBid: currentBid.nextMinBid,
                    contractAddress: item.contractAddress,
                    tokenId: item.tokenId,
                  })
                }
                className="bg-white text-carbon w-100%"
              />
            )}
          </div>
        )}
        <div className="flex mt-40px mobile:flex-col laptop:flex-row  justify-between">
          <div className="laptop:w-[48%] mobile: w-full">
            <img alt="Dots" src={`../${item.imageSrc}`} />
          </div>
          <div className="laptop:w-[48%] mobile: w-full">
            {isSold ? (
              <p className="mobile:text-27px tablet:text-32px font-black  mobile:mt-20px laptop:mt-[0px]">
                Sold
              </p>
            ) : isTablet ? (
              <></>
            ) : (
              <BidCard
                isMobile={isMobile}
                endsIn={item.endsIn}
                currentBid={currentBid.nextMinBid}
                contractAddress={item.contractAddress}
                tokenId={item.tokenId}
              />
            )}
            <p className="mobile:text-14px tablet:text-16px mobile:mt-40px leading-[150%] tablet:mt-48px">
              {item.descriptionEnglish}
            </p>
            <p className="mobile:text-14px tablet:text-16px leading-[150%] mt-24px">
              {item.descriptionUkrainian}
            </p>
            <div className="flex  mobile:flex-col laptop:flex-col tablet:flex-row mobile:mt-40px tablet:mt-48px">
              <div className="flex mobile:flex-col tablet:flex-row text-16px">
                <div className="flex">
                  <p>Artist:</p>
                  <p className=" tablet:ml-[8px]">{item.artist}</p>
                </div>
                <div className="flex mobile:ml-[0px] tablet:ml-48px mobile:my-[20px] tablet:my-[0px]">
                  <p>Edition:</p>
                  <p className="ml-[8px]">1 of 1</p>
                </div>
              </div>
              {isSold && (
                <div className="flex text-16px laptop:mt-24px tablet:ml-48px laptop:ml-[0px]">
                  <p>Owner:</p>
                  <p className="ml-[8px]">0x4EFesagas12...0x4E</p>
                </div>
              )}
            </div>
            {isSold && (
              <div className="mobile:mt-60px tablet:mt-72px laptop:mt-96px">
                <p className="mobile:text-27px tablet:text-32px font-black mobile:mb-30px tablet:mb-36px">
                  Bids history
                </p>
                <BidsHistoryTable />
              </div>
            )}
            <div className="laptop:mt-96px mobile:my-60px tablet:mt-72px">
              <div className="flex items-center mobile:mb-[20px] tablet:mb-24px">
                <p className="mobile:text-27px tablet:text-32px font-black">
                  More auctions
                </p>
                {!isMobile && (
                  <p
                    onClick={handleToAuction}
                    className="text-[14px] font-black ml-32px  hover:cursor-pointer"
                  >
                    See all auctions
                  </p>
                )}
              </div>
              <div className="flex flex-wrap -mx-24px">
                {AuctionData.slice(0, 2).map((item, index) => (
                  <div
                    className={`tablet:w-1/2 mobile:w-full flex flex-col p-14px`}
                    key={item.index}
                  >
                    <NftCard
                      orderIndex={index}
                      index={item.index}
                      imageSrc={`../${item.imageSrc}`}
                      name={item.name}
                      endsIn={item.endsIn}
                      contractAddress={item.contractAddress}
                      tokenId={item.tokenId}
                      type="small"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftCardDetail;