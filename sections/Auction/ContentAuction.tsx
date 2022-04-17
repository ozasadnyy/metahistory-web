import { useEffect, useMemo, useState } from 'react';
import Button from '@components/Button';
import DropdownSelect from '@components/DropdownSelect';
import NftCard from '@components/NftCard';
import PriceRange from '@components/PriceRange';
import { useViewPort } from '@hooks/useViewport';
import TabletDrawer from './TabletDrawer';
import AuctionData from '@sections/Auction/AuctionData';
import {
  FilterSvg,
  FILTER_OPTIONS_CATEGORIES,
  FILTER_OPTIONS_SORT_TYPE,
  FILTER_OPTIONS_TYPES,
  EMPTY_NFT_SELLER,
} from './cosntants';
import { useWeb3Modal } from '@hooks/useWeb3Modal';

type ContentAuctionProps = {};

const ContentAuction = ({}: ContentAuctionProps) => {
  const { isTablet, isMobile } = useViewPort();
  const [data, setData] = useState<any[]>([]);
  const { getAuctionInfo } = useWeb3Modal();

  useEffect(() => {
    const getEnrichedData = async () => {
      try {
        const response = await Promise.all(
          AuctionData.map((datum) => {
            return getAuctionInfo(datum.contractAddress, datum.tokenId);
          }),
        );

        setData(
          response.map((datum, index) => ({
            ...AuctionData[index],
            ...datum,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };

    getEnrichedData();
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string | undefined>(
    FILTER_OPTIONS_TYPES[0]?.value,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    FILTER_OPTIONS_CATEGORIES[0]?.value,
  );
  const [selectedSort, selSelectedSort] = useState<string | undefined>(
    FILTER_OPTIONS_SORT_TYPE[0]?.value,
  );
  const [priceRange, setPriceRange] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });

  const filteredData = useMemo(() => {
    let result = data;

    if (data.length === 0) return [];

    if (selectedCategory !== FILTER_OPTIONS_CATEGORIES[0]?.value) {
      result = result.filter((datum) => datum.category === selectedCategory);
    }

    if (selectedType !== FILTER_OPTIONS_TYPES[2]?.value) {
      result = result.filter((datum) =>
        selectedType === 'On Sale'
          ? datum.fullInfo.nftSeller !== EMPTY_NFT_SELLER
          : datum.fullInfo.nftSeller === EMPTY_NFT_SELLER,
      );
    }

    if (priceRange.from !== '') {
      result = result.filter((datum) => +datum.bid >= +priceRange.from);
    }

    if (priceRange.to !== '') {
      result = result.filter((datum) => +datum.bid <= +priceRange.to);
    }

    if (selectedSort === FILTER_OPTIONS_SORT_TYPE[0]?.value) {
      result = result.sort((datumA, datumB) =>
        new Date(datumA.endsIn) > new Date(datumB.endsIn) ? -1 : 1,
      );
    } else if (selectedSort === FILTER_OPTIONS_SORT_TYPE[1]?.value) {
      result = result.sort((datumA, datumB) =>
        new Date(datumA.startsAt) > new Date(datumB.startsAt) ? -1 : 1,
      );
    } else if (selectedSort === FILTER_OPTIONS_SORT_TYPE[2]?.value) {
      result = result.sort((datumA, datumB) =>
        +datumA.bid > +datumB.bid ? -1 : 1,
      );
    } else if (selectedSort === FILTER_OPTIONS_SORT_TYPE[3]?.value) {
      result = result.sort((datumA, datumB) =>
        datumA.bid < datumB.bid ? -1 : 1,
      );
    }

    return result;
  }, [data, selectedType, selectedCategory, priceRange, selectedSort]);

  const handleChangeType = (v?: string) => setSelectedType(v);
  const handleChangeCategory = (v?: string) => setSelectedCategory(v);
  const handleChangeSort = (v?: string) => selSelectedSort(v);
  const toggleDrawer = () => setOpen((state) => !state);
  const closeDrawer = () => setOpen(false);
  const openDrawer = () => setOpen(true);
  const handleChangeRange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setPriceRange((state) => ({
        ...state,
        [type]: e.target.value,
      }));

  return (
    <>
      <div className="flex justify-between laptop:mt-[0px] tablet:mt-72px mobile:mt-[24px]">
        {!isTablet && !isMobile ? (
          <div className="flex -mx-10px tablet:mb-[57px] ">
            <div className="px-20px">
              <PriceRange
                value={priceRange}
                setValue={setPriceRange}
                handleChange={handleChangeRange}
              />
            </div>
            <div className="px-20px">
              <DropdownSelect
                options={FILTER_OPTIONS_TYPES}
                selectedValue={selectedType}
                onChange={handleChangeType}
                className="w-[162px]"
              />
            </div>
            <div className="px-20px">
              <DropdownSelect
                options={FILTER_OPTIONS_CATEGORIES}
                selectedValue={selectedCategory}
                onChange={handleChangeCategory}
                className="w-[211px]"
              />
            </div>
          </div>
        ) : (
          <Button
            mode="primary"
            label={
              <div className="flex align-center justify-between">
                <span className="mr-16px">
                  {isMobile ? 'Filters and Sorting' : 'Filters'}
                </span>
                <span>
                  <FilterSvg />
                </span>
              </div>
            }
            onClick={openDrawer}
            className={isMobile ? 'mobile: w-full ' : ''}
          />
        )}
        {!isMobile && (
          <DropdownSelect
            options={FILTER_OPTIONS_SORT_TYPE}
            selectedValue={selectedSort}
            onChange={handleChangeSort}
            className="w-[236px]"
          />
        )}
      </div>
      <div className="flex flex-wrap -mx-16px">
        {filteredData.map((item, index) => (
          <div
            className={`${index < 2 ? 'laptop:w-1/2' : 'laptop:w-1/4'} ${
              index === 0 ? 'tablet:w-full' : 'tablet:w-1/2'
            } mobile:w-full flex flex-col py-14px px-6px`}
            key={item.index}
          >
            <NftCard
              orderIndex={index}
              index={item.index}
              imageSrc={item.imageSrc}
              name={item.name}
              endsIn={item.endsIn}
              contractAddress={item.contractAddress}
              tokenId={item.tokenId}
            />
          </div>
        ))}
      </div>
      {(isTablet || isMobile) && (
        <TabletDrawer
          toggleDrawer={toggleDrawer}
          closeDrawer={closeDrawer}
          isOpen={open}
          selectedType={selectedType}
          handleChangeType={handleChangeType}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
          value={priceRange}
          setValue={setPriceRange}
          handleChangeRange={handleChangeRange}
        />
      )}
    </>
  );
};

export default ContentAuction;