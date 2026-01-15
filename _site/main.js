(() => {
  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) {
          return;
        }
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActive(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const initialId = window.location.hash.replace("#", "");
  if (initialId) {
    setActive(initialId);
  } else if (sections[0]) {
    setActive(sections[0].id);
  }

  window.addEventListener("hashchange", () => {
    const id = window.location.hash.replace("#", "");
    if (id) {
      setActive(id);
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").replace("#", "");
      if (id) {
        setActive(id);
      }
    });
  });
})();
