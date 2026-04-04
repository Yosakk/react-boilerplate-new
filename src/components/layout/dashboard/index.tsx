import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useEffect, type JSX } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./header";
import Sidebar from "./sidebar";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetUserInfoQuery } from "@/_services/user";
import { setUserExisting } from "@/store/user";

const SIDEBAR_WIDTH = 272;
const SIDEBAR_BREAKPOINT = "md" as const;

const DashboardLayout: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const { data } = useGetUserInfoQuery(undefined, { skip: !accessToken });
  const [opened, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    if (data) {
      dispatch(
        setUserExisting({
          name: data.name,
          email: data.email ?? null,
          phoneNumber: data.phoneNumber ?? null,
        })
      );
    }
  }, [data, dispatch]);

  return (
    <>
      <Helmet>
        <title>{t("Seeds")}</title>
      </Helmet>
      <AppShell
        header={{ height: 56 }}
        navbar={{
          width: SIDEBAR_WIDTH,
          breakpoint: SIDEBAR_BREAKPOINT,
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <Header onOpenMenu={toggle} navOpened={opened} />

        <AppShell.Navbar p={0}>
          <Sidebar onClose={close} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default DashboardLayout;
