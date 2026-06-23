const categories = [
    "",
    "electronics",
    "fashion",
    "home",
    "books",
    "sports",
    "beauty",
    "toys",
    "grocery",
    "automotive",
    "stationery",
  ];
  
  export default function Filters({
    category,
    setCategory,
  }) {
    return (
      <div className="filters">
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((cat) => (
            <option
              key={cat || "all"}
              value={cat}
            >
              {cat || "All Categories"}
            </option>
          ))}
        </select>
      </div>
    );
  }