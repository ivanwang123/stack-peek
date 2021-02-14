export const convertSizeToStr = (size: number) => {
  if (size >= 1000) {
    const mb = Number(size / 1000).toPrecision(3);
    return `${mb} MB`;
  }
  return `${size} KB`;
};
