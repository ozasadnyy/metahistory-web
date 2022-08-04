import { AuctionVersion } from '@museum-of-war/auction';
import { BigNumberish } from 'ethers';
import { Nft } from '@alch/alchemy-web3/dist/esm/alchemy-apis/types';
import { WarlineDrop } from '@sections/Warline/constants';

export type IndexedNFT = {
  nft: Nft;
  index: number;
};

export type TeamDataType = {
  name: string;
  role: string;
};

export type DayType = {
  dayNo: number;
  date: string;
  events: Array<EventType>;
};

export type EventType = {
  Time: string;
  Tokenid: string;
  DayNo: string;
  FullDate: string;
  TwitterUrl: string;
  TwitterUsername: string;
  Headline: string;
  DescriptionEnglish: string;
  DescriptionUkrainian: string;
  ArtistName: string;
  isAuction?: boolean;
  ArtistLink?: string | undefined;
  ImageType?: string;
  Editions?: number;
  WarlineDrop: WarlineDrop;
  IsOnSale?: boolean;
  IsWhitelisted?: boolean;
};

export enum AuctionCollection {
  FirstDrop = 'drop1',
  Prospect100 = 'Prospect100',
  AvatarsForUkraine = 'avatars',
  Kalush = 'kalush',
  RestOf1stDrop = 'drop1rest',
}

export type AuctionCollectionType = {
  name?: string;
  description?: string;
  logoSrc?: string;
  headerImageSrc: string;
  posterSrc?: string;
  videoSrc?: string;
  contractAddress: string;
  startsAt?: Date;
  endsIn: Date;
  version: AuctionVersion | 'BatchSeller';
  oneItemAuction?: boolean;
  item?: AuctionItemType;
};

export type AuctionItemType = {
  index?: number;
  name: string;
  category: AuctionCollection;
  tokenId: number;
  imageSrc: string;
  animationSrc?: string;
  artist: string;
  descriptionEnglish?: string | JSX.Element;
  descriptionUkrainian?: string | JSX.Element;
  isSale: boolean;
  videoSrc?: string;
  posterSrc?: string;
  bonuses?: string[];
  additionalInfo?: string | JSX.Element;
  externalBid?: BigNumberish;
  externalButton?: {
    Big(): JSX.Element;
    Small(): JSX.Element;
  };
};

export type HallItemType = {
  Id: number;
  TwitterUrl: string;
  ImageSrc: string;
  TwitterUsername: string;
  TwitterAccountName: string;
  TweetText: string;
};

export type BidInfo = {
  eth: string;
  date: Date;
  bidder: string;
};

export type ArtistType = {
  name: string;
  bio: string;
  avatarSrc?: string;
};
