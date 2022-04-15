import Button from "@components/Button";
import { useViewPort } from "@hooks/useViewport";

type DropNftProps = {
  desc: string;
  buttonLabel: string;
  className?: string;
};

const DropNft = ({ className, desc, buttonLabel }: DropNftProps) => {
  const { isMobile } = useViewPort();
  return (
    <div className={`text-center ${className}`}>
      <p className="font-black tablet:text-32px mobile:text-27px tablet:mb-24px mobile:mb-20px">
        That’s it...
      </p>
      <p className="tablet:text-16px mobile:text-14px leading-150% laptop:w-[40%] mobile:w-full my-0 mx-[auto]">
        {desc}
      </p>
      <Button
        mode="custom"
        label={buttonLabel}
        onClick={() => console.log("asd")}
        className={`bg-white text-carbon tablet:mt-48px mobile:mt-36px ${
          isMobile && "w-full"
        }`}
      />
    </div>
  );
};

export default DropNft;
