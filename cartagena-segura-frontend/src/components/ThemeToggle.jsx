import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="themeSwitch"
        onChange={() => setDarkMode(prev => !prev)}
        checked={darkMode}
      />
      <label className="form-check-label" htmlFor="themeSwitch">
        {darkMode ? 'Modo oscuro' : 'Modo claro'}
      </label>
    </div>
  );
}
