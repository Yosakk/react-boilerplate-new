import React, { useCallback, useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { NavLink, Stack, ScrollArea, Divider, rem } from "@mantine/core";
import { LogOut, ChevronDown } from "lucide-react";
import { MenuData } from "@/data/menu";
import { LogoSeeds } from "@/assets";
import { useAuth } from "@/hooks/useAuth";

type SidebarProps = {
  onClose?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const [expanded, setExpanded] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(MenuData.map((item, i) => [i, item.expand ?? false]))
  );

  const isActive = useCallback(
    (path: string) => {
      const here = location.pathname;
      if (path === "/dashboard") return here === path;
      return here === path || here.startsWith(path + "/");
    },
    [location.pathname]
  );

  const isParentActive = useCallback(
    (item: (typeof MenuData)[0]) => {
      if (item.path && item.path !== "#" && isActive(item.path)) return true;
      return (
        Array.isArray(item.child) &&
        item.child.some((c: any) => isActive(c.path))
      );
    },
    [isActive]
  );

  return (
    <Stack h="100%" gap={0}>
      <div
        className="flex items-center gap-3 px-5"
        style={{
          height: rem(56),
          borderBottom: "1px solid var(--mantine-color-default-border)",
        }}
      >
        <img
          src={LogoSeeds}
          alt="Seeds"
          className="h-8 w-8 object-contain"
          draggable={false}
        />
        <span className="font-poppins font-semibold text-base">Seeds</span>
      </div>

      <ScrollArea flex={1} px={rem(8)} py={rem(8)}>
        <Stack gap={rem(2)}>
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
                  onChange={(val) =>
                    setExpanded((prev) => ({
                      ...prev,
                      [index]: val,
                    }))
                  }
                  styles={{
                    root: {
                      borderRadius: rem(10),
                      fontWeight: 500,
                    },
                  }}
                >
                  {item.child?.map((child: any) => (
                    <NavLink
                      key={child.path}
                      label={child.name}
                      component={RouterNavLink}
                      to={child.path}
                      active={isActive(child.path)}
                      onClick={onClose}
                      styles={{
                        root: {
                          borderRadius: rem(8),
                          fontSize: rem(13),
                        },
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
                  root: {
                    borderRadius: rem(10),
                    fontWeight: 500,
                  },
                }}
              />
            );
          })}
        </Stack>
      </ScrollArea>

      <div>
        <Divider />
        <Stack px={rem(8)} py={rem(8)} gap={rem(4)}>
          <NavLink
            label="Log out"
            leftSection={<LogOut size={18} />}
            color="red"
            onClick={() => logout()}
            styles={{
              root: {
                borderRadius: rem(10),
                fontWeight: 500,
              },
            }}
          />
        </Stack>
      </div>
    </Stack>
  );
};

export default Sidebar;
