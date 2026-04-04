import React, { useCallback, useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import {
  NavLink,
  Stack,
  ScrollArea,
  Text,
  Divider,
  Group,
  Modal,
  Button,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogOut, ChevronDown } from "lucide-react";
import { MenuData } from "@/data/menu";
import { LogoSeeds } from "@/assets";
import { useAppDispatch } from "@/store";
import { deleteTokenAuth } from "@/store/auth";

type SidebarProps = {
  onClose?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [logoutOpened, { open: openLogout, close: closeLogout }] = useDisclosure(false);

  const [expanded, setExpanded] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(MenuData.map((item, i) => [i, item.expand ?? false]))
  );

  const isParentActive = useCallback(
    (item: (typeof MenuData)[0]) => {
      const here = location.pathname;
      if (item.path && item.path !== "#") {
        if (here === item.path || here.startsWith(item.path + "/")) return true;
      }
      if (Array.isArray(item.child)) {
        return item.child.some((c: any) => here === c.path || here.startsWith(c.path + "/"));
      }
      return false;
    },
    [location.pathname]
  );

  const handleLogout = () => {
    dispatch(deleteTokenAuth());
    closeLogout();
  };

  return (
    <>
      {/* Logout Confirm Modal */}
      <Modal opened={logoutOpened} onClose={closeLogout} title="Log out" centered size="sm">
        <Text size="sm" c="dimmed" mb="lg">
          Are you sure you want to log out?
        </Text>
        <Group justify="flex-end" gap="sm">
          <Button variant="default" size="sm" onClick={closeLogout}>
            Cancel
          </Button>
          <Button variant="filled" color="red" size="sm" onClick={handleLogout}>
            Yes, log out
          </Button>
        </Group>
      </Modal>

      {/* Sidebar content */}
      <Stack h="100%" gap={0}>
        {/* Logo */}
        <Group
          justify="center"
          align="center"
          h={56}
          px="md"
          style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}
        >
          <img
            src={LogoSeeds}
            alt="Seeds Logo"
            style={{ height: rem(48), width: rem(48), objectFit: "contain" }}
            draggable={false}
          />
        </Group>

        {/* Nav items */}
        <ScrollArea flex={1} px={rem(8)} py={rem(8)}>
          <Stack gap={rem(4)}>
            {MenuData.map((item, index) => {
              const active = isParentActive(item);
              const hasChild = Array.isArray(item.child) && item.child.length > 0;
              const Icon = item.icon;

              if (hasChild) {
                return (
                  <NavLink
                    key={item.path ?? `${item.name}-${index}`}
                    label={item.name}
                    leftSection={Icon ? <Icon size={18} /> : null}
                    rightSection={<ChevronDown size={14} />}
                    active={active}
                    defaultOpened={active}
                    opened={expanded[index]}
                    onChange={(val) => setExpanded((prev) => ({ ...prev, [index]: val }))}
                    styles={{
                      root: { borderRadius: rem(10), fontWeight: 500 },
                    }}
                  >
                    {item.child?.map((child: any) => (
                      <NavLink
                        key={child.path}
                        label={child.name}
                        component={RouterNavLink}
                        to={child.path}
                        active={
                          location.pathname === child.path ||
                          location.pathname.startsWith(child.path + "/")
                        }
                        onClick={onClose}
                        styles={{
                          root: { borderRadius: rem(8), fontSize: rem(13) },
                        }}
                      />
                    ))}
                  </NavLink>
                );
              }

              return (
                <NavLink
                  key={item.path ?? `${item.name}-${index}`}
                  label={item.name}
                  leftSection={Icon ? <Icon size={18} /> : null}
                  component={RouterNavLink}
                  to={item.path}
                  active={active}
                  onClick={onClose}
                  styles={{
                    root: { borderRadius: rem(10), fontWeight: 500 },
                  }}
                />
              );
            })}
          </Stack>
        </ScrollArea>

        {/* Footer */}
        <div>
          <Divider />
          <Stack px={rem(8)} py={rem(8)} gap={rem(4)}>
            <NavLink
              label="Log out"
              leftSection={<LogOut size={18} />}
              color="red"
              onClick={openLogout}
              styles={{
                root: { borderRadius: rem(10), fontWeight: 500 },
              }}
            />
          </Stack>
        </div>
      </Stack>
    </>
  );
};

export default Sidebar;
