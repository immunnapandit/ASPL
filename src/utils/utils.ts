export const animationCreate = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const boxes = Array.from(document.querySelectorAll<HTMLElement>('.wow'));

  if (!boxes.length) {
    return undefined;
  }

  const reveal = (box: HTMLElement) => {
    box.style.visibility = 'visible';
    box.classList.add('animated');
  };

  const prepare = (box: HTMLElement) => {
    box.style.visibility = 'hidden';

    const duration = box.getAttribute('data-wow-duration');
    const delay = box.getAttribute('data-wow-delay');
    const iteration = box.getAttribute('data-wow-iteration');

    if (duration) {
      box.style.animationDuration = duration;
    }

    if (delay) {
      box.style.animationDelay = delay;
    }

    if (iteration) {
      box.style.animationIterationCount = iteration;
    }
  };

  if (!('IntersectionObserver' in window)) {
    boxes.forEach(reveal);
    return undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const box = entry.target as HTMLElement;
        reveal(box);
        observer.unobserve(box);
      });
    },
    { threshold: 0.1 }
  );

  boxes.forEach((box) => {
    prepare(box);
    observer.observe(box);
  });

  return () => observer.disconnect();
};
