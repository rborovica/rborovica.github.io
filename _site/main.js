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

  const initNewsTicker = () => {
    const ticker = document.querySelector(".news-ticker");
    if (!ticker) {
      return;
    }

    const track = ticker.querySelector(".news-track");
    if (!track) {
      return;
    }

    const items = () => Array.from(track.children);
    const visibleCount = Number(ticker.dataset.visible || 2);
    ticker.style.setProperty("--news-visible", `${visibleCount}`);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || items().length <= visibleCount) {
      return;
    }

    const getGap = () => {
      const styles = window.getComputedStyle(track);
      const gapValue = styles.rowGap || styles.gap || "0px";
      const parsed = parseFloat(gapValue);
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    let isAnimating = false;

    const stepOnce = () => {
      if (isAnimating) {
        return;
      }

      const first = track.children[0];
      if (!first) {
        return;
      }

      const gap = getGap();
      const step = first.getBoundingClientRect().height + gap;
      isAnimating = true;
      track.style.transition = "transform 0.6s ease";
      track.style.transform = `translateY(-${step}px)`;

      const onEnd = () => {
        track.removeEventListener("transitionend", onEnd);
        track.style.transition = "none";
        track.style.transform = "translateY(0)";
        track.appendChild(first);
        isAnimating = false;
      };

      track.addEventListener("transitionend", onEnd, { once: true });
    };

    const intervalMs = 1300;
    let timer = window.setInterval(stepOnce, intervalMs);

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      if (!timer) {
        timer = window.setInterval(stepOnce, intervalMs);
      }
    };

    ticker.addEventListener("mouseenter", stop);
    ticker.addEventListener("mouseleave", start);
  };

  initNewsTicker();
})();
