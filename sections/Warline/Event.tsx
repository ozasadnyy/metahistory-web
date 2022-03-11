import React, { useState } from "react";
import { useViewPort } from "@hooks/useViewport";
import { EventType } from "@sections/types";
import Popup from "./Popup";

type PropsEvent = {
  eventData: EventType;
  dayNo: number;
  date: string;
};

const Event = ({ eventData, dayNo, date }: PropsEvent) => {
  const { isMobile, isTablet } = useViewPort();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return isMobile ? (
    <div className="flex flex-col items-top mb-60px">
      <img alt="Logo" src={eventData.imageUrl} className="w-100%" />
      <div className="mt-20px flex flex-col justify-between">
        <div>
          <div className="flex flex-row items-center justify-between ">
            <p className="font-rblack leading-32px text-32px">
              {eventData.time}
            </p>
            <p className="font-rlight">#000{eventData.tokenId}</p>
          </div>
          <p className="font-rnarrow pt-15px"> {eventData.description}</p>
          <div className="flex flex-row items-center justify-between pt-5px">
            <p className="font-rlight ">{eventData.username}</p>
            <img
              alt="Logo"
              src={"img/warline-TwitterLogo.png"}
              className="w-50px"
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => setShowPopup(true)}
            className="font-rblack mt-15px "
          >
            See Details
          </button>
        </div>
      </div>
      {showPopup ? (
        <Popup
          eventData={eventData}
          dayNo={dayNo}
          date={date}
          setShowPopup={setShowPopup}
        />
      ) : (
        <></>
      )}
    </div>
  ) : isTablet ? (
    <div className="flex flex-row items-top mb-60px">
      <img
        alt="Logo"
        src={eventData.imageUrl}
        className="w-40vw max-w-300px max-h-300px h-40vw mr-50px"
      />
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex flex-row items-center justify-between ">
            <p className="font-rblack leading-32px text-32px">
              {eventData.time}
            </p>
            <p className="font-rlight">#000{eventData.tokenId}</p>
          </div>
          <p className="font-rnarrow pt-15px"> {eventData.description}</p>
          <div className="flex flex-row items-center justify-between pt-15px">
            <p className="font-rlight ">{eventData.username}</p>
            <img
              alt="Logo"
              src={"img/warline-TwitterLogo.png"}
              className="w-50px"
            />
          </div>
        </div>
        <div>
          <button onClick={() => setShowPopup(true)} className="font-rblack ">
            See Details
          </button>
        </div>
      </div>
      {showPopup ? (
        <Popup
          eventData={eventData}
          dayNo={dayNo}
          date={date}
          setShowPopup={setShowPopup}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="flex flex-row items-top mb-60px">
      <img
        alt="Logo"
        src={eventData.imageUrl}
        className="w-20vw max-w-300px max-h-300px h-20vw mr-50px"
      />
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex flex-row items-center justify-between ">
            <p className="font-rblack leading-32px text-32px">
              {eventData.time}
            </p>
            <p className="font-rlight">#000{eventData.tokenId}</p>
          </div>
          <p className="font-rnarrow pt-15px"> {eventData.description}</p>
          <div className="flex flex-row items-center justify-between pt-15px">
            <p className="font-rlight ">{eventData.username}</p>
            <img
              alt="Logo"
              src={"img/warline-TwitterLogo.png"}
              className="w-50px"
            />
          </div>
        </div>
        <div>
          <button onClick={() => setShowPopup(true)} className="font-rblack ">
            See Details
          </button>
        </div>
      </div>
      {showPopup ? (
        <Popup
          eventData={eventData}
          dayNo={dayNo}
          date={date}
          setShowPopup={setShowPopup}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Event;
