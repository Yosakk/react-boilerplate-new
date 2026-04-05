import { useState, useMemo, type ReactNode } from "react";
import {
  Table,
  TextInput,
  Group,
  Text,
  Paper,
  Pagination,
  Select,
  Skeleton,
  Box,
} from "@mantine/core";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────

export type ColumnDef<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: number | string;
  render?: (row: T) => ReactNode;
  getValue?: (row: T) => string | number;
};

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  actions?: (row: T) => ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: string[];
  loading?: boolean;
  pageSize?: number;
  toolbar?: ReactNode;
  emptyMessage?: string;
  stickyHeader?: boolean;
  minWidth?: number;
};

type SortState = {
  key: string;
  direction: "asc" | "desc";
} | null;

// ── Helpers ──────────────────────────────────────────────────────

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function compareValues(a: any, b: any, dir: "asc" | "desc"): number {
  if (a == null && b == null) return 0;
  if (a == null) return dir === "asc" ? -1 : 1;
  if (b == null) return dir === "asc" ? 1 : -1;
  if (typeof a === "number" && typeof b === "number") {
    return dir === "asc" ? a - b : b - a;
  }
  const strA = String(a).toLowerCase();
  const strB = String(b).toLowerCase();
  return dir === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
}

// ── Component ────────────────────────────────────────────────────

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys,
  loading = false,
  pageSize: initialPageSize = 10,
  toolbar,
  emptyMessage = "No data found.",
  stickyHeader = true,
  minWidth = 800,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortState>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Filter
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    const keys = searchKeys ?? columns.map((c) => c.key);
    return data.filter((row) =>
      keys.some((key) => {
        const val = getNestedValue(row, key);
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, searchKeys, columns]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sort) return filteredData;
    const col = columns.find((c) => c.key === sort.key);
    return [...filteredData].sort((a, b) => {
      const valA = col?.getValue
        ? col.getValue(a)
        : getNestedValue(a, sort.key);
      const valB = col?.getValue
        ? col.getValue(b)
        : getNestedValue(b, sort.key);
      return compareValues(valA, valB, sort.direction);
    });
  }, [filteredData, sort, columns]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedData = sortedData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const handleSort = (key: string) => {
    setSort((prev) => {
      if (prev?.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        return null; // third click removes sort
      }
      return { key, direction: "asc" };
    });
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sort?.key !== columnKey)
      return <ArrowUpDown size={14} className="opacity-30" />;
    return sort.direction === "asc" ? (
      <ArrowUp size={14} className="text-seeds-primary-green" />
    ) : (
      <ArrowDown size={14} className="text-seeds-primary-green" />
    );
  };

  // ── Render ───────────────────────────────────────────────────

  if (loading) {
    return (
      <Paper radius="lg" withBorder>
        <Box p="md">
          <Skeleton height={36} radius="xl" mb="lg" w={260} />
          <Skeleton height={40} mb="sm" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={48} mb="xs" />
          ))}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper radius="lg" withBorder>
      {/* Toolbar */}
      {(searchable || toolbar) && (
        <Group justify="space-between" p="md" pb={0}>
          {searchable && (
            <TextInput
              placeholder={searchPlaceholder}
              leftSection={<Search size={16} />}
              radius="xl"
              w={{ base: "100%", sm: 280 }}
              value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value);
                setPage(1);
              }}
            />
          )}
          {toolbar}
        </Group>
      )}

      {/* Table */}
      <Box style={{ position: "relative" }}>
        <Table.ScrollContainer minWidth={minWidth}>
          <Table
            verticalSpacing="md"
            horizontalSpacing="md"
            highlightOnHover
            striped
            stickyHeader={stickyHeader}
          >
            <Table.Thead>
              <Table.Tr>
                {columns.map((col) => (
                  <Table.Th
                    key={col.key}
                    w={col.width}
                    style={
                      col.sortable !== false
                        ? { cursor: "pointer", userSelect: "none" }
                        : undefined
                    }
                    onClick={
                      col.sortable !== false
                        ? () => handleSort(col.key)
                        : undefined
                    }
                  >
                    <Group gap={4} wrap="nowrap">
                      <Text size="sm" fw={600}>
                        {col.label}
                      </Text>
                      {col.sortable !== false && (
                        <SortIcon columnKey={col.key} />
                      )}
                    </Group>
                  </Table.Th>
                ))}
                {actions && (
                  <Table.Th
                    w={80}
                    style={{
                      position: "sticky",
                      right: 0,
                      zIndex: 2,
                      background: "var(--mantine-color-body)",
                      boxShadow: "-4px 0 8px -4px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Text size="sm" fw={600}>
                      Actions
                    </Text>
                  </Table.Th>
                )}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedData.length === 0 ? (
                <Table.Tr>
                  <Table.Td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    style={{ textAlign: "center" }}
                  >
                    <Text c="dimmed" py="xl">
                      {emptyMessage}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <Table.Tr key={idx}>
                    {columns.map((col) => (
                      <Table.Td key={col.key}>
                        {col.render
                          ? col.render(row)
                          : (getNestedValue(row, col.key) ?? "—")}
                      </Table.Td>
                    ))}
                    {actions && (
                      <Table.Td
                        style={{
                          position: "sticky",
                          right: 0,
                          zIndex: 1,
                          background: "var(--mantine-color-body)",
                          boxShadow: "-4px 0 8px -4px rgba(0,0,0,0.08)",
                        }}
                      >
                        {actions(row)}
                      </Table.Td>
                    )}
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Box>

      {/* Footer / Pagination */}
      <Group justify="space-between" p="md" pt="sm">
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            Showing {paginatedData.length} of {filteredData.length} results
          </Text>
          <Select
            size="xs"
            w={80}
            value={String(pageSize)}
            data={["5", "10", "20", "50"]}
            onChange={(v) => {
              setPageSize(Number(v));
              setPage(1);
            }}
          />
        </Group>
        {totalPages > 1 && (
          <Pagination
            value={safePage}
            onChange={setPage}
            total={totalPages}
            size="sm"
            radius="md"
            previousIcon={ChevronLeft}
            nextIcon={ChevronRight}
          />
        )}
      </Group>
    </Paper>
  );
}
