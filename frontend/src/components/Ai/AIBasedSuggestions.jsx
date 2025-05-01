import React, { useState } from "react";

const AIBasedSuggestions = ({ items }) => {
  // Sample suggestions (for now) - you can replace these with dynamic suggestions later.
  const sampleSuggestions = [
    {
      title: "Fresh Fruits",
      description:
        "Based on your items, consider buying seasonal fruits for a healthy diet.",
    },
    {
      title: "Bakery Items",
      description:
        "Try our freshly baked bread and pastries available this week.",
    },
    {
      title: "Dairy Products",
      description:
        "Our latest dairy products come with special offers, check them out!",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You can add your search logic here; for now, we log the search query.
    console.log("Search Query:", searchQuery);
  };

  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">AI-Based Suggestions</h3>
      <div className="row">
        {sampleSuggestions.map((suggestion, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{suggestion.title}</h5>
                <p className="card-text">{suggestion.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Centered Search Bar */}
      <div className="d-flex justify-content-center mt-4">
        <form onSubmit={handleSearchSubmit} className="w-50">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search suggestions..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIBasedSuggestions;
