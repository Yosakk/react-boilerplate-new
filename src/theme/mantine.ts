import { createTheme, rem, type MantineColorsTuple } from "@mantine/core";

const primaryColor: MantineColorsTuple = [
  "#f0f4ff",
  "#dce4ff",
  "#bac6ff",
  "#95a5ff",
  "#7588fe",
  "#6474fe",
  "#5b6bfe",
  "#4a59e3",
  "#404ecb",
  "#3342b4",
];

export const mantineTheme = createTheme({
  primaryColor: "brand",
  colors: { brand: primaryColor },
  fontFamily: "Poppins, Inter, system-ui, sans-serif",
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, monospace",

  headings: {
    fontFamily: "Poppins, Inter, system-ui, sans-serif",
    fontWeight: "700",
  },

  defaultRadius: "md",

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },

  components: {
    Button: {
      defaultProps: { radius: "xl" },
      styles: {
        root: {
          fontWeight: 600,
          letterSpacing: "0.01em",
          transition: "all 0.18s ease",
        },
      },
    },
    TextInput: {
      defaultProps: { radius: "xl" },
      styles: {
        label: { fontWeight: 500, marginBottom: rem(4) },
        error: { marginTop: rem(4) },
      },
    },
    PasswordInput: {
      defaultProps: { radius: "xl" },
      styles: {
        label: { fontWeight: 500, marginBottom: rem(4) },
        error: { marginTop: rem(4) },
      },
    },
    Select: {
      defaultProps: { radius: "xl" },
    },
    Textarea: {
      defaultProps: { radius: "md" },
    },
    NumberInput: {
      defaultProps: { radius: "xl" },
    },
    Modal: {
      defaultProps: { radius: "lg", centered: true },
      styles: { header: { fontWeight: 600 } },
    },
    Paper: {
      defaultProps: { radius: "lg", shadow: "sm" },
    },
    Card: {
      defaultProps: { radius: "lg", shadow: "sm", padding: "lg" },
    },
    Badge: {
      defaultProps: { radius: "sm" },
    },
    Notification: {
      styles: { root: { borderRadius: rem(12) } },
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: rem(10),
          fontWeight: 500,
        },
      },
    },
  },
});
