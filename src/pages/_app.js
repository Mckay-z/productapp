import "@/styles/globals.scss";
import { SuggestionsCtx } from "@/context";
import React from "react";

export default function App({ Component, pageProps }) {
  const [suggestions, setSuggestions] = React.useState([]);

  return (
    <SuggestionsCtx.Provider
      value={{
        suggestions,
        setSuggestions,
      }}
    >
      <Component {...pageProps} />
    </SuggestionsCtx.Provider>
  );
}
