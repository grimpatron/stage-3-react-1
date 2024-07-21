interface Props {
  theme: string,
  toggleTheme: () => void
}

const ThemeSwitcher = ({theme, toggleTheme}: Props) => {
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Dark' : 'Light'} mode
    </button>
  )
}

export default ThemeSwitcher