(function () {
  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }
    callback();
  }

  ready(function () {
    var nav = document.querySelector(".site-nav");
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.site-nav .nav-link[href^="#"]')
    );

    if (!nav || navLinks.length === 0) {
      return;
    }

    var sections = navLinks
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(function (section) {
        return section && section.id;
      });

    if (sections.length === 0) {
      return;
    }

    function setActive(id) {
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }

    function updateActiveLink() {
      var offset = nav.offsetHeight + 20;
      var orderedSections = sections
        .slice()
        .sort(function (a, b) {
          return a.offsetTop - b.offsetTop;
        });
      var currentSectionId = orderedSections[0].id;

      orderedSections.forEach(function (section) {
        if (section.getBoundingClientRect().top - offset <= 0) {
          currentSectionId = section.id;
        }
      });

      setActive(currentSectionId);
    }

    var ticking = false;
    function onScroll() {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(function () {
        updateActiveLink();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveLink);

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        var menu = document.getElementById("siteNavMenu");
        if (menu && menu.classList.contains("show") && window.jQuery) {
          window.jQuery(menu).collapse("hide");
        }
      });
    });

    updateActiveLink();
  });
})();
