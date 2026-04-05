import {
  Paper,
  Text,
  Stack,
  Group,
  Switch,
  Divider,
  Avatar,
  Badge,
  ThemeIcon,
} from "@mantine/core";
import { Bell, Shield, Palette } from "lucide-react";
import { useAppSelector } from "@/store";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function SettingsPage() {
  usePageTitle("Settings");
  const user = useAppSelector((s) => s.userExisting);

  const initials = (user?.name || "U")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <Stack gap="lg" p="md">
      <div>
        <Text size="xl" fw={700}>
          Settings
        </Text>
        <Text size="sm" c="dimmed">
          Manage your account preferences.
        </Text>
      </div>

      {/* Profile Card */}
      <Paper p="lg" radius="lg" withBorder>
        <Group gap="md">
          <Avatar size="lg" radius="xl" color="teal">
            {initials}
          </Avatar>
          <div className="flex-1">
            <Text fw={600}>{user?.name || "Seeds User"}</Text>
            <Text size="sm" c="dimmed">
              {user?.email || "user@seeds.finance"}
            </Text>
          </div>
          <Badge variant="light" color="teal">
            Active
          </Badge>
        </Group>
      </Paper>

      {/* Notifications */}
      <Paper p="lg" radius="lg" withBorder>
        <Group gap="sm" mb="lg">
          <ThemeIcon variant="light" color="blue" radius="md">
            <Bell size={18} />
          </ThemeIcon>
          <Text fw={600}>Notifications</Text>
        </Group>
        <Stack gap="md">
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Push Notifications
              </Text>
              <Text size="xs" c="dimmed">
                Receive push notifications on your device
              </Text>
            </div>
            <Switch defaultChecked />
          </Group>
          <Divider />
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Email Notifications
              </Text>
              <Text size="xs" c="dimmed">
                Get updates sent to your email
              </Text>
            </div>
            <Switch defaultChecked />
          </Group>
          <Divider />
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Marketing Emails
              </Text>
              <Text size="xs" c="dimmed">
                Receive promotions and news
              </Text>
            </div>
            <Switch />
          </Group>
        </Stack>
      </Paper>

      {/* Security */}
      <Paper p="lg" radius="lg" withBorder>
        <Group gap="sm" mb="lg">
          <ThemeIcon variant="light" color="red" radius="md">
            <Shield size={18} />
          </ThemeIcon>
          <Text fw={600}>Security</Text>
        </Group>
        <Stack gap="md">
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Two-Factor Authentication
              </Text>
              <Text size="xs" c="dimmed">
                Add an extra layer of security
              </Text>
            </div>
            <Switch />
          </Group>
          <Divider />
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Biometric Login
              </Text>
              <Text size="xs" c="dimmed">
                Use fingerprint or face recognition
              </Text>
            </div>
            <Switch defaultChecked />
          </Group>
        </Stack>
      </Paper>

      {/* Preferences */}
      <Paper p="lg" radius="lg" withBorder>
        <Group gap="sm" mb="lg">
          <ThemeIcon variant="light" color="violet" radius="md">
            <Palette size={18} />
          </ThemeIcon>
          <Text fw={600}>Preferences</Text>
        </Group>
        <Stack gap="md">
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Dark Mode
              </Text>
              <Text size="xs" c="dimmed">
                Toggle dark theme
              </Text>
            </div>
            <Switch />
          </Group>
          <Divider />
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Compact View
              </Text>
              <Text size="xs" c="dimmed">
                Reduce spacing in tables and lists
              </Text>
            </div>
            <Switch />
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
