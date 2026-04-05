import {
  SimpleGrid,
  Paper,
  Text,
  Stack,
  Group,
  Badge,
  Progress,
  RingProgress,
  ThemeIcon,
} from "@mantine/core";
import { BarChart3, Eye, Clock, MousePointerClick } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const METRICS = [
  {
    label: "Page Views",
    value: "284,129",
    change: "+14.2%",
    icon: Eye,
    color: "blue",
  },
  {
    label: "Avg. Session",
    value: "4m 32s",
    change: "+2.1%",
    icon: Clock,
    color: "teal",
  },
  {
    label: "Click Rate",
    value: "6.8%",
    change: "-0.4%",
    icon: MousePointerClick,
    color: "violet",
  },
  {
    label: "Bounce Rate",
    value: "32.4%",
    change: "-1.8%",
    icon: BarChart3,
    color: "orange",
  },
];

const TRAFFIC_SOURCES = [
  { source: "Organic Search", value: 42, color: "blue" },
  { source: "Direct", value: 28, color: "teal" },
  { source: "Social Media", value: 18, color: "violet" },
  { source: "Referral", value: 8, color: "orange" },
  { source: "Email", value: 4, color: "pink" },
];

const TOP_PAGES = [
  { page: "/dashboard", views: 12840, bounce: 22 },
  { page: "/onboarding", views: 8420, bounce: 35 },
  { page: "/auth/login", views: 6280, bounce: 48 },
  { page: "/portfolio", views: 4120, bounce: 18 },
  { page: "/settings", views: 2840, bounce: 12 },
];

export default function AnalyticsPage() {
  usePageTitle("Analytics");

  return (
    <Stack gap="lg" p="md">
      <div>
        <Text size="xl" fw={700}>
          Analytics
        </Text>
        <Text size="sm" c="dimmed">
          Traffic and engagement overview.
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="md">
        {METRICS.map((m) => (
          <Paper key={m.label} p="lg" radius="lg" withBorder>
            <Group justify="space-between" mb="xs">
              <ThemeIcon variant="light" size="lg" radius="md" color={m.color}>
                <m.icon size={18} />
              </ThemeIcon>
              <Badge
                variant="light"
                size="sm"
                color={m.change.startsWith("+") ? "teal" : "red"}
              >
                {m.change}
              </Badge>
            </Group>
            <Text size="xl" fw={700}>
              {m.value}
            </Text>
            <Text size="sm" c="dimmed">
              {m.label}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
        <Paper p="lg" radius="lg" withBorder>
          <Text fw={600} mb="md">
            Traffic Sources
          </Text>
          <Group justify="center" mb="lg">
            <RingProgress
              size={180}
              thickness={20}
              roundCaps
              sections={TRAFFIC_SOURCES.map((s) => ({
                value: s.value,
                color: s.color,
              }))}
              label={
                <Text ta="center" fw={700} size="lg">
                  100%
                </Text>
              }
            />
          </Group>
          <Stack gap="sm">
            {TRAFFIC_SOURCES.map((s) => (
              <Group key={s.source} justify="space-between">
                <Group gap="xs">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: `var(--mantine-color-${s.color}-6)`,
                    }}
                  />
                  <Text size="sm">{s.source}</Text>
                </Group>
                <Text size="sm" fw={500}>
                  {s.value}%
                </Text>
              </Group>
            ))}
          </Stack>
        </Paper>

        <Paper p="lg" radius="lg" withBorder>
          <Text fw={600} mb="md">
            Top Pages
          </Text>
          <Stack gap="md">
            {TOP_PAGES.map((p) => (
              <div key={p.page}>
                <Group justify="space-between" mb={4}>
                  <Text size="sm" fw={500}>
                    {p.page}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {p.views.toLocaleString()} views
                  </Text>
                </Group>
                <Progress
                  value={100 - p.bounce}
                  size="sm"
                  radius="xl"
                  color={
                    p.bounce < 25 ? "teal" : p.bounce < 40 ? "blue" : "orange"
                  }
                />
                <Text size="xs" c="dimmed" mt={2}>
                  {p.bounce}% bounce rate
                </Text>
              </div>
            ))}
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}
