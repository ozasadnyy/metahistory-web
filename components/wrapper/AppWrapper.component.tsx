import { useWeb3Modal } from '@hooks/useWeb3Modal';
import Footer from '@sections/Footer/Footer';
import Header from '@sections/Header/Header';
import { useEffect, useState } from 'react';
import { PopupProvider } from '@providers/PopupProvider';
import { PreloaderProvider } from '@providers/PreloaderProvider';

export interface SharedProps {
  signerAddress: string;
  handleConnect: () => Promise<void>;
  handleDisconnect: () => void;
  menuOpen: boolean;
}

interface WrapperProps {
  Child: React.FC<SharedProps>;
}

export const AppWrapper: React.FC<WrapperProps> = ({ Child }) => {
  const [signerAddress, setSignerAddress] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { provider, connectWallet, disconnectWallet } = useWeb3Modal();

  const handleConnect = async () => {
    await connectWallet();
  };
  const handleDisconnect = () => {
    disconnectWallet();
  };

  useEffect(() => {
    const getAddress = async () => {
      if (provider !== undefined) {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setSignerAddress(address);
      } else {
        setSignerAddress('');
      }
    };
    getAddress();
  }, [provider]);

  return (
    <PreloaderProvider>
      <PopupProvider>
        <div
          className={`desktop:container mx-auto min-h-screen dark:bg-carbon
                     text-carbon dark:text-white overflow-clip
                     desktop:px-132px tablet:px-72px mobile:px-24px
                     pb-36px mobile:pb-20px`}
        >
          <Header
            signerAddress={signerAddress}
            handleConnect={handleConnect}
            handleDisconnect={handleDisconnect}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <div className="pt-8%">
            <Child
              signerAddress={signerAddress}
              handleConnect={handleConnect}
              handleDisconnect={handleDisconnect}
            menuOpen={menuOpen}
            />
            <Footer />
          </div>
        </div>
      </PopupProvider>
    </PreloaderProvider>
  );
};
