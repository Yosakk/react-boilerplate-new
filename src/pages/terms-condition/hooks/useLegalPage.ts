import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TNC_FLAG_KEY = "seeds.tnc.accepted";

export function useLegalPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const returnTo = params.get("return")
    ? decodeURIComponent(params.get("return")!)
    : "/auth/login";
  const setForm = params.get("setForm") === "1";

  const [page, setPage] = useState<"tnc" | "policy">("tnc");

  const handleBack = () => navigate(-1);

  const handleAccept = () => {
    if (setForm) {
      sessionStorage.setItem(TNC_FLAG_KEY, "1");
    }
    navigate(returnTo);
  };

  return {
    page,
    setPage,
    handleBack,
    handleAccept,
  };
}
