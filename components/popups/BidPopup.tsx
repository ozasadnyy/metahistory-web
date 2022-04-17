import React, { useMemo, useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import Button from '@components/Button';
import { usePopup } from '@providers/PopupProvider';
import {useWeb3Modal} from "@hooks/useWeb3Modal";

const NUMBER_3_DECIMALS = /^(?:\d*\.\d{1,3}|\d+)$/;

type PropsPopup = {
  currentBid: string;
  contractAddress: string;
  tokenId: number;
};

const BidButton = ({
  handleClick,
  amount,
}: {
  handleClick: () => void;
  amount: string;
}) => {
  return (
    <button
      className="font-rblack text-14px leading-40px tablet:leading-48px"
      onClick={handleClick}
    >
      {amount} ETH
    </button>
  );
};

const BidPopup = ({ currentBid, contractAddress, tokenId }: PropsPopup) => {
  const { makeBid } = useWeb3Modal();
  const { hidePopup } = usePopup();
  const [ETHAmount, setETHAmount] = useState<number | string>(currentBid);
  const [amountError, setAmountError] = useState<string | undefined>(undefined);
  const amounts = useMemo(
    () =>
      [+currentBid, +currentBid * 1.5, +currentBid * 2, +currentBid * 2.5]
        .map(value => value.toFixed(3))
        .map(parseFloat)
        .map(
          String,
        ),
    [currentBid],
  );

  return (
    <div
      className="fixed z-10 w-screen100% h-screen100% top-0 left-0 flex items-center justify-evenly"
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;

        hidePopup();
      }}
    >
      <div
        className="z-100 desktop:h-auto tablet:h-auto mobile:h-100% dark:bg-carbon relative desktop:w-544px tablet:w-496px mobile:w-100%
                    flex flex-row desktop:px-72px tablet:px-72px desktop:py-72px tablet:py-72px mobile:px-24px
                    mobile:py-24px overflow-auto mobile:items-center border-4"
      >
        <button className="absolute right-20px top-20px" onClick={hidePopup}>
          <VscChromeClose size={25} />
        </button>
        <div className="flex flex-col">
          <p
            className="font-rblack mobile:text-38px tablet:text-32px laptop:text-32px"
            style={{ lineHeight: '48px' }}
          >
            Place bid
          </p>
          <p
            className="font-rlight mt-24px"
            style={{ fontSize: 16, lineHeight: '24px' }}
          >
            You must bid at least {currentBid} ETH. Once a bid is placed it
            cannot be withdrawn.
          </p>
          <div className="mt-24px pb-10px border-b-4 font-rlight border-white text-22px dark:border-cotton flex flex-row items-center justify-between">
            <input
              className="w-70% placeholder-mid_gray placeholder-opacity-70 transition-all duration-1500 outline-none bg-transparent"
              placeholder="Enter Amount"
              value={ETHAmount !== null ? ETHAmount : ''}
              onChange={(event) => {
                const { value } = event.target;

                setETHAmount(value);

                if (value === '') {
                  setAmountError(undefined);
                } else if (!NUMBER_3_DECIMALS.test(value)) {
                  setAmountError('Amount has incorrect format');
                } else if (+value < +currentBid) {
                  setAmountError('Amount should exceed current bid');
                } else {
                  setAmountError(undefined);
                }
              }}
            />
            <p>ETH</p>
          </div>
          <div className="flex flex-row items-center flex-wrap gap-x-24px">
            {amounts.map((amount) => (
              <BidButton
                key={amount}
                handleClick={() => {
                  setETHAmount(amount);
                }}
                amount={amount}
              />
            ))}
          </div>
          {amountError && (
            <p className="text-10px text-red-500 font-rlight">{amountError}</p>
          )}
          <Button
            mode="custom"
            label="Place Bid"
            disabled={Boolean(amountError)}
            onClick={async () => {
              await makeBid(contractAddress, tokenId, ETHAmount)
            }}
            className="bg-white text-carbon w-100% mt-24px"
          />
        </div>
      </div>
    </div>
  );
};

export default BidPopup;
