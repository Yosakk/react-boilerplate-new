import { GoogleIcon } from "@/assets/auth";
import IconButton from "@/components/IconButton";
import React from "react";
import { useGoogleSSO } from "../../hooks/auth/useAuthSSO";

const GoogleSSO: React.FC<{ label?: string }> = ({ label }) => {
  const { startGoogle, isLoading } = useGoogleSSO();

  return (
    <IconButton
      label={label}
      variant="outline"
      size="md"
      rounded="lg"
      className="mt-3"
      widthClassName="w-full h-[50px] md:w-[60%] max-w-[400px]"
      icon={<img src={GoogleIcon} alt="Google" className="w-[25px] h-[25px]" />}
      onClick={() => startGoogle()}
      disabled={isLoading}
    />
  );
};

export default GoogleSSO;
