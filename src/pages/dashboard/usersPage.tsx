import {
  Text,
  Stack,
  Group,
  Avatar,
  Badge,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { MoreVertical, Edit, Trash2, Eye, UserPlus } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import { Button } from "@mantine/core";

type User = {
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
  color: string;
};

const USERS: User[] = [
  {
    name: "Rina Sari",
    email: "rina@seeds.finance",
    role: "Admin",
    status: "Active",
    joined: "Jan 12, 2025",
    color: "teal",
  },
  {
    name: "Budi Hartono",
    email: "budi@seeds.finance",
    role: "Collaborator",
    status: "Active",
    joined: "Feb 3, 2025",
    color: "blue",
  },
  {
    name: "Dewi Lestari",
    email: "dewi@seeds.finance",
    role: "Collaborator",
    status: "Inactive",
    joined: "Mar 18, 2025",
    color: "yellow",
  },
  {
    name: "Ahmad Fauzi",
    email: "ahmad@seeds.finance",
    role: "Admin",
    status: "Active",
    joined: "Jan 5, 2025",
    color: "violet",
  },
  {
    name: "Siti Nurhaliza",
    email: "siti@seeds.finance",
    role: "Collaborator",
    status: "Active",
    joined: "Apr 1, 2025",
    color: "pink",
  },
  {
    name: "Joko Widodo",
    email: "joko@seeds.finance",
    role: "Collaborator",
    status: "Pending",
    joined: "Apr 2, 2025",
    color: "orange",
  },
  {
    name: "Maya Putri",
    email: "maya@seeds.finance",
    role: "Collaborator",
    status: "Active",
    joined: "Mar 25, 2025",
    color: "cyan",
  },
  {
    name: "Rizky Pratama",
    email: "rizky@seeds.finance",
    role: "Admin",
    status: "Active",
    joined: "Feb 14, 2025",
    color: "grape",
  },
];

function statusColor(status: string) {
  if (status === "Active") return "teal";
  if (status === "Inactive") return "gray";
  return "yellow";
}

const columns: ColumnDef<User>[] = [
  {
    key: "name",
    label: "User",
    width: 250,
    render: (row) => (
      <Group gap="sm" wrap="nowrap">
        <Avatar size="sm" radius="xl" color={row.color}>
          {row.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </Avatar>
        <div>
          <Text size="sm" fw={500}>
            {row.name}
          </Text>
          <Text size="xs" c="dimmed">
            {row.email}
          </Text>
        </div>
      </Group>
    ),
  },
  {
    key: "role",
    label: "Role",
    width: 120,
    render: (row) => (
      <Badge
        variant="light"
        size="sm"
        color={row.role === "Admin" ? "violet" : "gray"}
      >
        {row.role}
      </Badge>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: 120,
    render: (row) => (
      <Badge variant="dot" size="sm" color={statusColor(row.status)}>
        {row.status}
      </Badge>
    ),
  },
  {
    key: "joined",
    label: "Joined",
    width: 140,
    render: (row) => (
      <Text size="sm" c="dimmed">
        {row.joined}
      </Text>
    ),
  },
];

export default function UsersPage() {
  usePageTitle("Users");

  return (
    <Stack gap="lg" p="md">
      <Group justify="space-between" align="flex-end">
        <div>
          <Text size="xl" fw={700}>
            Users
          </Text>
          <Text size="sm" c="dimmed">
            Manage team members and roles.
          </Text>
        </div>
      </Group>

      <DataTable<User>
        data={USERS}
        columns={columns}
        searchPlaceholder="Search users..."
        searchKeys={["name", "email", "role"]}
        pageSize={10}
        toolbar={
          <Button
            leftSection={<UserPlus size={16} />}
            radius="xl"
            size="sm"
            variant="filled"
          >
            Add User
          </Button>
        }
        actions={(row) => (
          <Menu shadow="md" width={160} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <MoreVertical size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<Eye size={14} />}>View</Menu.Item>
              <Menu.Item leftSection={<Edit size={14} />}>Edit</Menu.Item>
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
