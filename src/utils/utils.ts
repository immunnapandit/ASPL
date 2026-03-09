export const animationCreate = () => {
  if (typeof window !== "undefined") {
    import("wowjs").then(({ WOW }) => {
      new WOW({ live: false }).init();
    });
  }
};