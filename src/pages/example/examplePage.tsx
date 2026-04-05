import {
  Title,
  Text,
  SimpleGrid,
  Paper,
  Stack,
  Group,
  Badge,
  Divider,
  Code,
  Container,
  Skeleton,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { Input } from "@/components/ui/input/input";
import { PasswordInput } from "@/components/ui/input/password";
import { Textarea } from "@/components/ui/input/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { LayoutDashboard, Bell, ShieldCheck, Palette } from "lucide-react";

export const exampleRouteNames = "/example";

const Example = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Page header */}
        <div>
          <Title order={2} mb={4}>
            Component Showcase
          </Title>
          <Text c="dimmed" size="sm">
            Mantine v7 components integrated with react-hook-form and Tailwind
            CSS.
          </Text>
        </div>

        <Divider />

        {/* Feature cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          {[
            {
              icon: LayoutDashboard,
              label: "AppShell",
              desc: "Responsive layout",
            },
            { icon: Bell, label: "Notifications", desc: "Toast feedback" },
            { icon: ShieldCheck, label: "Validation", desc: "Yup + RHF" },
            { icon: Palette, label: "Theming", desc: "Dark mode ready" },
          ].map((item) => (
            <Paper key={item.label} p="md" withBorder>
              <Group gap="sm" mb="xs">
                <ThemeIcon variant="light" size="md" radius="md">
                  <item.icon size={16} />
                </ThemeIcon>
                <Text fw={600} size="sm">
                  {item.label}
                </Text>
              </Group>
              <Text c="dimmed" size="xs">
                {item.desc}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>

        {/* Form inputs demo */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Paper p="lg" withBorder>
            <Title order={4} mb="md">
              Form Inputs
            </Title>
            <Stack gap="sm">
              <Input
                name="name"
                label="Full Name"
                placeholder="John Doe"
                required
              />
              <Input
                name="email"
                label="Email"
                placeholder="john@example.com"
                type="email"
              />
              <PasswordInput
                label="Password"
                placeholder="Min 8 characters"
                required
              />
              <Select
                label="Role"
                placeholder="Select a role"
                data={[
                  { value: "admin", label: "Admin" },
                  { value: "editor", label: "Editor" },
                  { value: "viewer", label: "Viewer" },
                ]}
              />
              <Textarea
                label="Bio"
                placeholder="Tell us about yourself..."
                rows={3}
              />
              <Group mt="xs">
                <Button type="button">Save</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="subtle" color="red">
                  Delete
                </Button>
              </Group>
            </Stack>
          </Paper>

          <Paper p="lg" withBorder>
            <Title order={4} mb="md">
              Button Variants
            </Title>
            <Stack gap="sm">
              <Group>
                <Button variant="filled">Filled</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="light">Light</Button>
                <Button variant="subtle">Subtle</Button>
              </Group>
              <Group>
                <Button size="xs">XS</Button>
                <Button size="sm">SM</Button>
                <Button size="md">MD</Button>
                <Button size="lg">LG</Button>
              </Group>
              <Group>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button color="red">Danger</Button>
                <Button color="green">Success</Button>
              </Group>

              <Divider label="Badges" labelPosition="center" my="xs" />
              <Group>
                <Badge>Default</Badge>
                <Badge color="green">Active</Badge>
                <Badge color="red" variant="light">
                  Error
                </Badge>
                <Badge color="yellow" variant="outline">
                  Warning
                </Badge>
              </Group>

              <Divider label="Skeleton Loader" labelPosition="center" my="xs" />
              <Stack gap="xs">
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} width="70%" radius="xl" />
                <Skeleton height={rem(36)} radius="xl" mt="xs" />
              </Stack>
            </Stack>
          </Paper>
        </SimpleGrid>

        {/* Info section */}
        <Paper p="md" withBorder>
          <Text size="sm" c="dimmed">
            Tech stack: <Code>React 19</Code> + <Code>Mantine v7</Code> +{" "}
            <Code>Tailwind CSS v4</Code> + <Code>Redux Toolkit</Code> +{" "}
            <Code>react-hook-form</Code> + <Code>Yup</Code>
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Example;
