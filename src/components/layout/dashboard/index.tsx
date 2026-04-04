import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { AppShell, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./header";
import Sidebar from "./sidebar";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetUserInfoQuery } from "@/_services/user";
import { setUserExisting } from "@/store/user";

const SIDEBAR_WIDTH = rem(272);
const SIDEBAR_BREAKPOINT = "md";

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
        navbar={{
          width: SIDEBAR_WIDTH,
          breakpoint: SIDEBAR_BREAKPOINT,
          collapsed: { mobile: !opened },
        }}
        padding={0}
        styles={{
          main: {
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <AppShell.Navbar p={0}>
          <Sidebar onClose={close} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Header onOpenMenu={toggle} navOpened={opened} />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default DashboardLayout;
