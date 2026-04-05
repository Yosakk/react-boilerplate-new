import {
  SimpleGrid,
  Paper,
  Text,
  Group,
  Stack,
  ThemeIcon,
  Progress,
  Avatar,
  Badge,
  RingProgress,
  Tooltip,
  Box,
  Divider,
} from "@mantine/core";
import {
  Users,
  TrendingUp,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Star,
  Clock,
} from "lucide-react";
import { useAppSelector } from "@/store";
import { usePageTitle } from "@/hooks/usePageTitle";

// ── Stat Card with mini sparkline ────────────────────────────────

type StatCardProps = {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
  sparkline: number[];
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={`var(--mantine-color-${color}-5)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  sparkline,
}: StatCardProps) {
  const isPositive = change >= 0;
  return (
    <Paper
      p="lg"
      radius="lg"
      withBorder
      style={{
        borderLeft: `3px solid var(--mantine-color-${color}-5)`,
      }}
    >
      <Group justify="space-between" mb="md" wrap="nowrap">
        <ThemeIcon variant="light" size={44} radius="md" color={color}>
          <Icon size={22} />
        </ThemeIcon>
        <MiniSparkline data={sparkline} color={color} />
      </Group>
      <Text size="1.5rem" fw={800} lh={1.2}>
        {value}
      </Text>
      <Group justify="space-between" mt={4}>
        <Text size="sm" c="dimmed">
          {title}
        </Text>
        <Badge
          variant="light"
          color={isPositive ? "teal" : "red"}
          size="sm"
          leftSection={
            isPositive ? (
              <ArrowUpRight size={12} />
            ) : (
              <ArrowDownRight size={12} />
            )
          }
        >
          {isPositive ? "+" : ""}
          {change}%
        </Badge>
      </Group>
    </Paper>
  );
}

// ── Data ─────────────────────────────────────────────────────────

const STATS: StatCardProps[] = [
  {
    title: "Total Users",
    value: "12,847",
    change: 12.5,
    icon: Users,
    color: "blue",
    sparkline: [30, 40, 35, 50, 49, 60, 70, 91, 85, 95],
  },
  {
    title: "Revenue",
    value: "$48,290",
    change: 8.2,
    icon: Wallet,
    color: "teal",
    sparkline: [20, 25, 30, 28, 35, 42, 38, 45, 50, 48],
  },
  {
    title: "Growth Rate",
    value: "24.5%",
    change: 3.1,
    icon: TrendingUp,
    color: "violet",
    sparkline: [15, 18, 22, 20, 24, 23, 28, 30, 26, 32],
  },
  {
    title: "Active Now",
    value: "1,429",
    change: -2.4,
    icon: Activity,
    color: "orange",
    sparkline: [50, 48, 52, 45, 42, 40, 38, 41, 36, 35],
  },
];

const RECENT_ACTIVITIES = [
  {
    name: "Rina Sari",
    action: "Completed onboarding",
    time: "2 min ago",
    avatar: "RS",
    color: "teal",
    icon: Star,
  },
  {
    name: "Budi Hartono",
    action: "Made first investment",
    time: "15 min ago",
    avatar: "BH",
    color: "blue",
    icon: Zap,
  },
  {
    name: "Dewi Lestari",
    action: "Upgraded to Gold",
    time: "1 hour ago",
    avatar: "DL",
    color: "yellow",
    icon: TrendingUp,
  },
  {
    name: "Ahmad Fauzi",
    action: "Registered account",
    time: "2 hours ago",
    avatar: "AF",
    color: "violet",
    icon: Users,
  },
  {
    name: "Siti Nurhaliza",
    action: "Completed KYC",
    time: "3 hours ago",
    avatar: "SN",
    color: "pink",
    icon: Target,
  },
];

const TOP_ASSETS = [
  {
    name: "BBCA",
    category: "Stock",
    change: 2.4,
    allocation: 35,
    color: "blue",
  },
  {
    name: "Bitcoin",
    category: "Crypto",
    change: -1.2,
    allocation: 25,
    color: "orange",
  },
  {
    name: "TLKM",
    category: "Stock",
    change: 1.8,
    allocation: 20,
    color: "teal",
  },
  {
    name: "Gold ETF",
    category: "ETF",
    change: 0.5,
    allocation: 12,
    color: "yellow",
  },
  {
    name: "Gov Bond",
    category: "Bond",
    change: 0.1,
    allocation: 8,
    color: "gray",
  },
];

const GOALS = [
  { label: "New Signups", current: 847, target: 1000, color: "blue" },
  { label: "Revenue Target", current: 48290, target: 60000, color: "teal" },
  { label: "Retention Rate", current: 82, target: 90, color: "violet" },
  { label: "NPS Score", current: 72, target: 80, color: "orange" },
];

// ── Component ────────────────────────────────────────────────────

export default function DashboardHome() {
  const userName = useAppSelector((s) => s.userExisting?.name);
  usePageTitle("Dashboard");

  const firstName = userName?.split(" ")[0] || "User";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <Stack gap="lg" p="md">
      {/* Hero Greeting */}
      <Paper
        p="xl"
        radius="lg"
        style={{
          background:
            "linear-gradient(135deg, var(--mantine-color-teal-6) 0%, var(--mantine-color-blue-7) 100%)",
          color: "white",
        }}
      >
        <Group justify="space-between" align="flex-start">
          <div>
            <Text size="sm" opacity={0.85} mb={4}>
              {greeting},
            </Text>
            <Text size="1.75rem" fw={800} lh={1.2}>
              {firstName}!
            </Text>
            <Text size="sm" opacity={0.8} mt="xs">
              Here's what's happening with your platform today.
            </Text>
          </div>
          <Group gap="lg" visibleFrom="sm">
            <div style={{ textAlign: "center" }}>
              <Text size="1.5rem" fw={800}>
                96%
              </Text>
              <Text size="xs" opacity={0.8}>
                Uptime
              </Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="1.5rem" fw={800}>
                4.8
              </Text>
              <Text size="xs" opacity={0.8}>
                Avg Rating
              </Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="1.5rem" fw={800}>
                23ms
              </Text>
              <Text size="xs" opacity={0.8}>
                Avg Latency
              </Text>
            </div>
          </Group>
        </Group>
      </Paper>

      {/* Stat Cards */}
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="md">
        {STATS.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </SimpleGrid>

      {/* Goals / Targets Row */}
      <Paper p="lg" radius="lg" withBorder>
        <Group justify="space-between" mb="md">
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="sm" radius="xl">
              <Target size={14} />
            </ThemeIcon>
            <Text fw={600}>Monthly Goals</Text>
          </Group>
          <Badge variant="light" color="blue" size="sm">
            April 2025
          </Badge>
        </Group>
        <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="lg">
          {GOALS.map((goal) => {
            const pct = Math.round((goal.current / goal.target) * 100);
            return (
              <div key={goal.label}>
                <Group justify="space-between" mb={4}>
                  <Text size="sm" fw={500}>
                    {goal.label}
                  </Text>
                  <Text size="sm" fw={700} c={goal.color}>
                    {pct}%
                  </Text>
                </Group>
                <Tooltip
                  label={`${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}`}
                >
                  <Progress
                    value={pct}
                    size="lg"
                    radius="xl"
                    color={goal.color}
                    animated={pct < 100}
                  />
                </Tooltip>
              </div>
            );
          })}
        </SimpleGrid>
      </Paper>

      {/* Main content row */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
        {/* Recent Activity */}
        <Paper p="lg" radius="lg" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <ThemeIcon variant="light" color="blue" size="sm" radius="xl">
                <Clock size={14} />
              </ThemeIcon>
              <Text fw={600}>Recent Activity</Text>
            </Group>
            <Badge variant="light" size="sm" color="gray">
              Live
            </Badge>
          </Group>
          <Stack gap={0}>
            {RECENT_ACTIVITIES.map((a, i) => {
              const ActivityIcon = a.icon;
              return (
                <Box key={i}>
                  <Group justify="space-between" wrap="nowrap" py="sm">
                    <Group gap="sm" wrap="nowrap">
                      <Avatar size="md" radius="xl" color={a.color}>
                        {a.avatar}
                      </Avatar>
                      <div>
                        <Text size="sm" fw={500}>
                          {a.name}
                        </Text>
                        <Group gap={4}>
                          <ActivityIcon size={12} className="opacity-50" />
                          <Text size="xs" c="dimmed">
                            {a.action}
                          </Text>
                        </Group>
                      </div>
                    </Group>
                    <Text size="xs" c="dimmed" className="shrink-0">
                      {a.time}
                    </Text>
                  </Group>
                  {i < RECENT_ACTIVITIES.length - 1 && <Divider />}
                </Box>
              );
            })}
          </Stack>
        </Paper>

        {/* Portfolio Overview */}
        <Paper p="lg" radius="lg" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <ThemeIcon variant="light" color="violet" size="sm" radius="xl">
                <Wallet size={14} />
              </ThemeIcon>
              <Text fw={600}>Portfolio Allocation</Text>
            </Group>
            <Badge variant="light" size="sm" color="teal">
              +5.2% MTD
            </Badge>
          </Group>
          <Group justify="center" mb="lg">
            <RingProgress
              size={180}
              thickness={20}
              roundCaps
              sections={TOP_ASSETS.map((a) => ({
                value: a.allocation,
                color: a.color,
                tooltip: `${a.name} — ${a.allocation}%`,
              }))}
              label={
                <div style={{ textAlign: "center" }}>
                  <Text size="1.25rem" fw={800} lh={1.2}>
                    5
                  </Text>
                  <Text size="xs" c="dimmed">
                    Assets
                  </Text>
                </div>
              }
            />
          </Group>
          <Stack gap="xs">
            {TOP_ASSETS.map((asset) => (
              <Group key={asset.name} justify="space-between">
                <Group gap="xs">
                  <Box
                    w={10}
                    h={10}
                    style={{
                      borderRadius: "50%",
                      backgroundColor: `var(--mantine-color-${asset.color}-5)`,
                    }}
                  />
                  <Text size="sm" fw={500}>
                    {asset.name}
                  </Text>
                  <Badge variant="light" size="xs" color="gray">
                    {asset.category}
                  </Badge>
                </Group>
                <Group gap="sm">
                  <Text
                    size="sm"
                    c={asset.change >= 0 ? "teal" : "red"}
                    fw={600}
                  >
                    {asset.change >= 0 ? "+" : ""}
                    {asset.change}%
                  </Text>
                  <Text size="sm" c="dimmed" w={35} ta="right">
                    {asset.allocation}%
                  </Text>
                </Group>
              </Group>
            ))}
          </Stack>
        </Paper>
      </SimpleGrid>

      {/* Performance Overview */}
      <Paper p="lg" radius="lg" withBorder>
        <Group justify="space-between" mb="md">
          <Group gap="xs">
            <ThemeIcon variant="light" color="orange" size="sm" radius="xl">
              <TrendingUp size={14} />
            </ThemeIcon>
            <Text fw={600}>Monthly Performance</Text>
          </Group>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          {[
            {
              month: "January",
              users: 1240,
              revenue: "$8,400",
              conv: 3.2,
              progress: 65,
            },
            {
              month: "February",
              users: 1580,
              revenue: "$10,200",
              conv: 3.8,
              progress: 78,
            },
            {
              month: "March",
              users: 2100,
              revenue: "$14,800",
              conv: 4.1,
              progress: 92,
            },
            {
              month: "April",
              users: 1890,
              revenue: "$12,600",
              conv: 3.6,
              progress: 84,
            },
          ].map((row) => (
            <Paper
              key={row.month}
              p="md"
              radius="md"
              className="bg-gray-50 dark:bg-neutral-800"
            >
              <Text size="sm" fw={600} mb="xs">
                {row.month}
              </Text>
              <Group justify="space-between" mb={4}>
                <Text size="xs" c="dimmed">
                  Users
                </Text>
                <Text size="sm" fw={600}>
                  {row.users.toLocaleString()}
                </Text>
              </Group>
              <Group justify="space-between" mb={4}>
                <Text size="xs" c="dimmed">
                  Revenue
                </Text>
                <Text size="sm" fw={600}>
                  {row.revenue}
                </Text>
              </Group>
              <Group justify="space-between" mb="xs">
                <Text size="xs" c="dimmed">
                  Conversion
                </Text>
                <Text size="sm" fw={600}>
                  {row.conv}%
                </Text>
              </Group>
              <Progress
                value={row.progress}
                size="sm"
                radius="xl"
                color={
                  row.progress >= 90
                    ? "teal"
                    : row.progress >= 70
                      ? "blue"
                      : "yellow"
                }
              />
              <Text size="xs" c="dimmed" ta="right" mt={2}>
                {row.progress}% of target
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}
