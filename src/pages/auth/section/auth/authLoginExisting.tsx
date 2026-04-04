import { Backward, SeedyAuthLogin } from "@/assets/auth";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoginPinDialog from "./DialogPIN";
import { useExistingLoginForm } from "../../hooks/auth/useLoginExistingForm";

export const authLoginExistingPageRouteName = "/auth/login/existing";

const LoginExisting: React.FC = () => {
  const { t } = useTranslation();
  const { userNameExisting, openPin, setOpenPin, dialogBindings } = useExistingLoginForm({
    autoNavigate: true,
    onSuccess: undefined,
  });

  return (
    <div className="flex flex-col items-center px-4 md:px-0 max-w-[640px] w-full mx-auto">
      <div className="w-full flex justify-start">
        <button
          type="button"
          onClick={() => history.back()}
          aria-label="Kembali"
          className="inline-flex items-center justify-center h-10 w-10 md:h-auto md:w-auto rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AC4A0] focus-visible:ring-offset-2"
        >
          <img
            src={Backward}
            alt=""
            className="h-6 w-6 md:h-auto md:w-auto cursor-pointer hover:scale-110 duration-200"
          />
        </button>
      </div>

      <p className="font-poppins font-semibold bg-gradient-to-b text-center w-full from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent text-2xl md:text-3xl mt-4">
        {t("loginRevamp.text1") + " " + userNameExisting + "!"}{" "}
        <span className="text-white">👋</span>
      </p>

      <p className="font-poppins text-neutral-medium font-medium text-sm md:text-lg text-center mt-2">
        {t("loginRevamp.text19")}
      </p>

      <img
        src={SeedyAuthLogin}
        alt="SeedyAuthLogin"
        className="w-[220px] sm:w-[250px] md:w-[20vw] my-4"
      />

      <button
        onClick={() => setOpenPin(true)}
        className="capitalize font-semibold font-poppins text-sm md:text-sm leading-[14px] text-white w-full lg:w-[40%] border-2 py-3 min-h-[44px] hover:border-[#70FFA0] border-[#5EFF95] bg-gradient-to-r from-[#3AC4A0] to-[#177C62] transition duration-200 hover:opacity-90 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AC4A0] focus-visible:ring-offset-2"
      >
        {t("loginRevamp.text22") + " " + userNameExisting}
      </button>

      <div className="flex flex-col md:flex-row gap-1 justify-center items-center mt-4">
        <p className="font-poppins text-neutral-soft text-sm md:text-lg text-center md:my-2">
          {t("loginRevamp.text20")}
        </p>
        <Link
          to={"/auth/login"}
          className="font-medium text-sm md:text-lg font-poppins bg-gradient-to-b text-center from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent my-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AC4A0] focus-visible:ring-offset-2 rounded"
        >
          {t("loginRevamp.text21")}
        </Link>
      </div>

      <LoginPinDialog {...dialogBindings} imageSrc={SeedyAuthLogin} />
    </div>
  );
};

export default LoginExisting;
