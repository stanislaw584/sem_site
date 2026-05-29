import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SearchBoxProps = {
  initialValue?: string;
  placeholder?: string;
  searchButton?: string;
};

export function SearchBox({
  initialValue = "",
  placeholder = "Например: расписание, сессия, виза, общежитие",
  searchButton = "Поиск",
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  function submit(event: FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form className="search-box" onSubmit={submit} role="search">
      <label className="visually-hidden" htmlFor="site-search">
        {placeholder}
      </label>
      <Search aria-hidden="true" size={22} />
      <input
        id="site-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        inputMode="search"
        autoComplete="off"
      />
      <button type="submit">{searchButton}</button>
    </form>
  );
}
