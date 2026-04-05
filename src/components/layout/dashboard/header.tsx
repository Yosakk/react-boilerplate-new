import * as React from "react";
import {
  AppShell,
  Burger,
  Group,
  ActionIcon,
  Avatar,
  Indicator,
  Text,
  Menu,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { Bell, Sun, Moon, LogOut, User, ChevronDown } from "lucide-react";
import { useAppSelector } from "@/store";
import { useAuth } from "@/hooks/useAuth";

type HeaderProps = {
  onOpenMenu?: () => void;
  navOpened?: boolean;
};

export default function Header({ onOpenMenu, navOpened = false }: HeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const userExisting = useAppSelector((s) => s.userExisting);
  const { logout } = useAuth();
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
        <Burger
          opened={navOpened}
          onClick={onOpenMenu}
          hiddenFrom="md"
          size="sm"
          aria-label="Toggle navigation"
        />

        <div className="flex-1" />

        <Group gap="xs" wrap="nowrap">
          <ActionIcon
            variant="subtle"
            color="gray"
            radius="xl"
            size="lg"
            onClick={() => toggleColorScheme()}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>

          <Indicator color="red" size={8} offset={4} processing>
            <ActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              size="lg"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </ActionIcon>
          </Indicator>

          <Menu shadow="lg" width={200} position="bottom-end">
            <Menu.Target>
              <Group gap={rem(6)} className="cursor-pointer select-none">
                <Avatar radius="xl" size="sm" color="teal">
                  {initials || "U"}
                </Avatar>
                <Text
                  size="sm"
                  fw={500}
                  visibleFrom="sm"
                  className="max-w-[120px] truncate"
                >
                  {userExisting?.name || "User"}
                </Text>
                <ChevronDown size={14} />
              </Group>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<User size={14} />}>Profile</Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<LogOut size={14} />}
                onClick={() => logout()}
              >
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
