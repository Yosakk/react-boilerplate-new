import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Suspense, useEffect, type JSX } from "react";
import { AppShell, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./header";
import Sidebar from "./sidebar";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetUserInfoQuery } from "@/_services/user";
import { setUserExisting } from "@/store/user";

const SIDEBAR_WIDTH = 260;

const DashboardLayout: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const { data } = useGetUserInfoQuery(undefined, {
    skip: !accessToken,
  });
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
        layout="alt"
        header={{ height: 56 }}
        navbar={{
          width: SIDEBAR_WIDTH,
          breakpoint: "md",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <Header onOpenMenu={toggle} navOpened={opened} />

        <AppShell.Navbar p={0}>
          <Sidebar onClose={close} />
        </AppShell.Navbar>

        <AppShell.Main
          className="bg-gray-50 dark:bg-neutral-900"
          style={{ minHeight: "100vh" }}
        >
          <Suspense
            fallback={
              <LoadingOverlay
                visible
                zIndex={100}
                overlayProps={{ blur: 2 }}
                loaderProps={{
                  type: "dots",
                  size: "lg",
                }}
              />
            }
          >
            <Outlet />
          </Suspense>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default DashboardLayout;
