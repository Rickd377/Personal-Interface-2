document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('.theme-picker input[type="radio"]');
  const html = document.documentElement;
  let current = localStorage.getItem('theme') || 'black';

  const themeColors = {
    black: {
      dark: {
        background: 'hsl(0, 0%, 10%)',
        subcontainer: 'hsl(0, 0%, 15%)'
      },
      light: {
        background: 'hsl(0, 0%, 85%)',
        subcontainer: 'hsl(0, 0%, 80%)'
      }
    },
    brown: {
      dark: {
        background: 'hsl(30, 40%, 20%)',
        subcontainer: 'hsl(30, 40%, 25%)'
      },
      light: {
        background: 'hsl(30, 40%, 85%)',
        subcontainer: 'hsl(30, 40%, 80%)'
      }
    },
    red: {
      dark: {
        background: 'hsl(0, 70%, 20%)',
        subcontainer: 'hsl(0, 70%, 25%)'
      },
      light: {
        background: 'hsl(0, 70%, 80%)',
        subcontainer: 'hsl(0, 70%, 75%)'
      }
    },
    orange: {
      dark: {
        background: 'hsl(30, 80%, 20%)',
        subcontainer: 'hsl(30, 80%, 25%)'
      },
      light: {
        background: 'hsl(30, 80%, 80%)',
        subcontainer: 'hsl(30, 80%, 75%)'
      }
    },
    green: {
      dark: {
        background: 'hsl(140, 60%, 20%)',
        subcontainer: 'hsl(140, 60%, 25%)'
      },
      light: {
        background: 'hsl(140, 60%, 80%)',
        subcontainer: 'hsl(140, 60%, 70%)'
      }
    },
    blue: {
      dark: {
        background: 'hsl(210, 70%, 20%)',
        subcontainer: 'hsl(210, 70%, 25%)'
      },
      light: {
        background: 'hsl(210, 70%, 80%)',
        subcontainer: 'hsl(210, 70%, 75%)'
      }
    },
    purple: {
      dark: {
        background: 'hsl(270, 60%, 20%)',
        subcontainer: 'hsl(270, 60%, 25%)'
      },
      light: {
        background: 'hsl(270, 60%, 80%)',
        subcontainer: 'hsl(270, 60%, 75%)'
      }
    },
    pink: {
      dark: {
        background: 'hsl(330, 70%, 20%)',
        subcontainer: 'hsl(330, 70%, 25%)'
      },
      light: {
        background: 'hsl(330, 70%, 80%)',
        subcontainer: 'hsl(330, 70%, 75%)'
      }
    }
  };

  function updateThemePickerRadios(lightMode) {
    radios.forEach(radio => {
      const key = radio.value;
      const colors = themeColors[key][lightMode ? 'light' : 'dark'];
      radio.style.background = `linear-gradient(-45deg, ${colors.background} 50%, ${colors.subcontainer} 50%)`;
    });
  }

  function getBaseTheme(theme) {
    return theme.replace(/^dark-/, '').replace(/^light-/, '');
  }

  function isLight(theme) {
    return theme === 'white' || theme.startsWith('light-');
  }

  function setTheme(theme, lightMode) {
    const baseTheme = getBaseTheme(theme);

    let themeName;
    if (baseTheme === 'black' || baseTheme === 'white') {
      themeName = lightMode ? 'white' : 'black';
    } else {
      themeName = lightMode ? `light-${baseTheme}` : `dark-${baseTheme}`;
    }

    html.dataset.theme = themeName;
    localStorage.setItem('theme', themeName);

    radios.forEach(radio => {
      if (baseTheme === 'black' || baseTheme === 'white') {
        radio.checked = radio.value === 'black';
      } else {
        radio.checked = radio.value === baseTheme;
      }
    });

    updateThemePickerRadios(lightMode);
    setTimeout(updateThemeColorMeta, 0);
  }

  let basetTheme = getBaseTheme(current);
  let lightMode = isLight(current);
  updateThemePickerRadios(isLight(current));
  setTheme(basetTheme, lightMode);

  setTimeout(() => {
    html.classList.remove("no-transitions");
  }, 100);

  const icon = document.querySelector(".theme-switch-icon");
  if (icon) {
    icon.classList.remove("fa-moon", "fa-sun-bright");
    icon.classList.add(lightMode ? "fa-sun-bright" : "fa-moon");
  }

  document.querySelector(".theme-switch").addEventListener("click", () => {
    lightMode = !lightMode;
    const baseTheme = getBaseTheme(current);
    let nextTheme;

    if (baseTheme === "black" || baseTheme === "white") {
      nextTheme = lightMode ? "white" : "black";
      icon.classList.replace(
        lightMode ? "fa-moon" : "fa-sun-bright",
        lightMode ? "fa-sun-bright" : "fa-moon"
      );
    } else {
      nextTheme = lightMode ? `light-${baseTheme}` : `dark-${baseTheme}`;
      icon.classList.replace(
        lightMode ? "fa-moon" : "fa-sun-bright",
        lightMode ? "fa-sun-bright" : "fa-moon"
      );
    }
    setTheme(nextTheme, lightMode);
    current = nextTheme;
  });

  radios.forEach(radio => {
    radio.addEventListener('click', e => {
      const baseTheme = radio.value;
      let nextTheme;
      if (baseTheme === 'black') {
        nextTheme = lightMode ? 'white' : 'black';
      } else {
        nextTheme = lightMode ? `light-${baseTheme}` : `dark-${baseTheme}`;
      }
      setTheme(baseTheme, lightMode);
      current = nextTheme;
    });
  });

  // meta theme-color
  function updateThemeColorMeta() {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--border").trim();
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', themeColor);
  }

  updateThemeColorMeta();
});