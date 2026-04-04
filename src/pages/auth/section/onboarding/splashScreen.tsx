
import { LeftBanner, Ornament } from '@/assets/auth';
import { useTranslation } from 'react-i18next';

interface ISplashScreen {
    isFading: boolean;
}

const SplashScreen: React.FC<ISplashScreen> = ({
    isFading
}: ISplashScreen) => {
    const { t } = useTranslation();
    return (
        <div
            className={`fixed inset-0 z-[9999] bg-gradient-to-b from-[#3AC4A0] to-[#177C62] flex md:hidden flex-col justify-center items-center ${isFading ? 'fade-out' : ''
                }`}
        >
            <img
                src={Ornament}
                alt="Ornament"
                className="absolute top-0 right-0 w-[60%] md:w-[375px] h-auto z-0"
            />
            <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
                <img
                    src={LeftBanner}
                    alt="LeftBanner"
                    className="w-[340px] md:w-[375px] h-auto"
                />
                <div className='flex flex-col justify-start items-start'>
                    <p className="font-semibold font-poppins text-4xl text-white mt-2 text-left">
                        {t('onboarding.leftBanner.text1')}
                    </p>
                    <p className="font-poppins xl:text-xl text-lg text-white text-left mt-2">
                        {t('onboarding.leftBanner.text2')}
                    </p>
                </div>
                <div className="w-full h-4 bg-white bg-opacity-30 rounded-full mt-8 overflow-hidden">
                    <div
                        className="h-full rounded-full"
                        style={{
                            width: '0%',
                            animation: 'loadingBar 2.5s ease-in-out forwards',
                            backgroundImage:
                                'repeating-linear-gradient(315deg, #5DEF8F 0 15px, white 5px 20px)',
                            backgroundSize: 'auto',
                            backgroundRepeat: 'repeat'
                        }}
                    ></div>
                </div>
                <p className="font-medium font-poppins text-white mt-8 text-xl md:text-4xl">
                    {t('onboarding.splashScreen.text1')}
                </p>
                <p className="font-poppins text-white text-md md:text-4xl">
                    {t('onboarding.splashScreen.text2')}
                </p>
            </div>
        </div>
    );
};

export default SplashScreen