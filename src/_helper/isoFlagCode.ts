export const flagUrl = (code: string, size = 24) => {
  const cc = code.toLowerCase();
  const h = Math.round(size * 3 / 4);
  return {
    src: `https://flagcdn.com/${size}x${h}/${cc}.png`,
    srcSet: `https://flagcdn.com/${size * 2}x${h * 2}/${cc}.png 2x`,
    width: size,
    height: h,
    loading: "lazy",
    decoding: "async",
    referrerPolicy: "no-referrer",
  } satisfies React.ImgHTMLAttributes<HTMLImageElement>;
};
