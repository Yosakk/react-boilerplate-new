import * as React from "react";
import {
  AppShell,
  Burger,
  Group,
  ActionIcon,
  Avatar,
  Indicator,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { Bell, MessageCircle, Sun, Moon } from "lucide-react";
import { useAppSelector } from "@/store";

type HeaderProps = {
  onOpenMenu?: () => void;
  navOpened?: boolean;
  hasNotification?: boolean;
  onClickBell?: () => void;
  onClickChat?: () => void;
};

export default function Header({
  onOpenMenu,
  navOpened = false,
  hasNotification = true,
  onClickBell,
  onClickChat,
}: HeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const userExisting = useAppSelector((s) => s.userExisting);
  const isDark = colorScheme === "dark";

  const initials = React.useMemo(() => {
    const name = userExisting?.name ?? "";
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase() ?? "")
      .join("");
  }, [userExisting?.name]);

  return (
    <AppShell.Header h={56} px="md">
      <Group h="100%" justify="space-between" wrap="nowrap">
        {/* Mobile burger */}
        <Burger
          opened={navOpened}
          onClick={onOpenMenu}
          hiddenFrom="md"
          size="sm"
          aria-label="Toggle navigation"
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <Group gap={rem(4)} wrap="nowrap">
          {/* Dark mode toggle */}
          <ActionIcon
            variant="subtle"
            color="gray"
            radius="xl"
            size="lg"
            onClick={() => toggleColorScheme()}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>

          {/* Notifications */}
          <Indicator
            color="violet"
            size={8}
            offset={4}
            disabled={!hasNotification}
            processing
          >
            <ActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              size="lg"
              onClick={onClickBell}
              aria-label="Notifications"
            >
              <Bell size={18} />
            </ActionIcon>
          </Indicator>

          {/* Messages */}
          <ActionIcon
            variant="subtle"
            color="gray"
            radius="xl"
            size="lg"
            onClick={onClickChat}
            aria-label="Messages"
          >
            <MessageCircle size={18} />
          </ActionIcon>

          {/* Avatar */}
          <Avatar
            radius="xl"
            size="sm"
            color="violet"
            style={{ cursor: "pointer" }}
            aria-label="Account"
          >
            {initials || "U"}
          </Avatar>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
