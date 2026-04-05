import {
  Paper,
  Text,
  Stack,
  Badge,
  ThemeIcon,
  SimpleGrid,
  ActionIcon,
  Menu,
} from "@mantine/core";
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Eye,
  Trash2,
  Share2,
} from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { DataTable, type ColumnDef } from "@/components/ui/data-table";

type Report = {
  title: string;
  description: string;
  date: string;
  status: string;
  type: string;
  size: string;
};

const REPORTS: Report[] = [
  {
    title: "Monthly Revenue Report",
    description: "Revenue breakdown by category and region",
    date: "Apr 1, 2025",
    status: "Ready",
    type: "Finance",
    size: "2.4 MB",
  },
  {
    title: "User Growth Analysis",
    description: "New signups, retention, and churn metrics",
    date: "Mar 28, 2025",
    status: "Ready",
    type: "Analytics",
    size: "1.8 MB",
  },
  {
    title: "Q1 Performance Summary",
    description: "Quarterly KPIs and target completion",
    date: "Mar 31, 2025",
    status: "Ready",
    type: "Performance",
    size: "3.1 MB",
  },
  {
    title: "Risk Assessment Report",
    description: "Portfolio risk analysis and recommendations",
    date: "Apr 3, 2025",
    status: "Processing",
    type: "Risk",
    size: "—",
  },
  {
    title: "Compliance Audit",
    description: "Regulatory compliance status and findings",
    date: "Apr 5, 2025",
    status: "Pending",
    type: "Compliance",
    size: "—",
  },
  {
    title: "Customer Satisfaction Survey",
    description: "NPS scores and user feedback analysis",
    date: "Mar 15, 2025",
    status: "Ready",
    type: "Analytics",
    size: "1.2 MB",
  },
  {
    title: "Investment Portfolio Review",
    description: "Asset allocation and performance review",
    date: "Mar 20, 2025",
    status: "Ready",
    type: "Finance",
    size: "4.5 MB",
  },
  {
    title: "Security Incident Report",
    description: "Monthly security assessment and incidents",
    date: "Apr 2, 2025",
    status: "Processing",
    type: "Security",
    size: "—",
  },
];

function statusColor(status: string) {
  if (status === "Ready") return "teal";
  if (status === "Processing") return "blue";
  return "yellow";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Ready") return <CheckCircle size={14} />;
  if (status === "Processing") return <Clock size={14} />;
  return <AlertCircle size={14} />;
}

const columns: ColumnDef<Report>[] = [
  {
    key: "title",
    label: "Report",
    width: 300,
    render: (row) => (
      <div>
        <Text size="sm" fw={500}>
          {row.title}
        </Text>
        <Text size="xs" c="dimmed" lineClamp={1}>
          {row.description}
        </Text>
      </div>
    ),
  },
  {
    key: "type",
    label: "Type",
    width: 120,
    render: (row) => (
      <Badge variant="light" size="sm" color="gray">
        {row.type}
      </Badge>
    ),
  },
  {
    key: "date",
    label: "Date",
    width: 130,
    render: (row) => (
      <Text size="sm" c="dimmed">
        {row.date}
      </Text>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: 130,
    render: (row) => (
      <Badge
        variant="light"
        color={statusColor(row.status)}
        leftSection={<StatusIcon status={row.status} />}
        size="sm"
      >
        {row.status}
      </Badge>
    ),
  },
  {
    key: "size",
    label: "Size",
    width: 80,
    render: (row) => (
      <Text size="sm" c="dimmed">
        {row.size}
      </Text>
    ),
  },
];

export default function ReportsPage() {
  usePageTitle("Reports");

  return (
    <Stack gap="lg" p="md">
      <div>
        <Text size="xl" fw={700}>
          Reports
        </Text>
        <Text size="sm" c="dimmed">
          View and download generated reports.
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        <Paper
          p="lg"
          radius="lg"
          withBorder
          style={{ borderLeft: "3px solid var(--mantine-color-blue-5)" }}
        >
          <ThemeIcon variant="light" size="xl" radius="md" color="blue" mb="sm">
            <FileText size={22} />
          </ThemeIcon>
          <Text size="1.5rem" fw={800}>
            12
          </Text>
          <Text size="sm" c="dimmed">
            Total Reports
          </Text>
        </Paper>
        <Paper
          p="lg"
          radius="lg"
          withBorder
          style={{ borderLeft: "3px solid var(--mantine-color-teal-5)" }}
        >
          <ThemeIcon variant="light" size="xl" radius="md" color="teal" mb="sm">
            <CheckCircle size={22} />
          </ThemeIcon>
          <Text size="1.5rem" fw={800}>
            9
          </Text>
          <Text size="sm" c="dimmed">
            Ready to Download
          </Text>
        </Paper>
        <Paper
          p="lg"
          radius="lg"
          withBorder
          style={{ borderLeft: "3px solid var(--mantine-color-orange-5)" }}
        >
          <ThemeIcon
            variant="light"
            size="xl"
            radius="md"
            color="orange"
            mb="sm"
          >
            <Clock size={22} />
          </ThemeIcon>
          <Text size="1.5rem" fw={800}>
            3
          </Text>
          <Text size="sm" c="dimmed">
            In Progress
          </Text>
        </Paper>
      </SimpleGrid>

      <DataTable<Report>
        data={REPORTS}
        columns={columns}
        searchPlaceholder="Search reports..."
        searchKeys={["title", "type", "status"]}
        pageSize={10}
        actions={(row) => (
          <Menu shadow="md" width={160} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <MoreVertical size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<Eye size={14} />}>View</Menu.Item>
              {row.status === "Ready" && (
                <Menu.Item leftSection={<Download size={14} />}>
                  Download
                </Menu.Item>
              )}
              <Menu.Item leftSection={<Share2 size={14} />}>Share</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<Trash2 size={14} />}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      />
    </Stack>
  );
}
