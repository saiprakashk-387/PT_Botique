import React from "react";
import PropTypes from "prop-types";
import { theme } from "../../theme/default";
import Header from "../Navigation/Header";

export default function DrawerLayout({ children }) {
  return (
    <div style={{ flexGrow: 1, display: "flex" }}>
      <Header />
      <div
        style={{
          width: "100%",
          padding: theme.spacing(3),
          marginTop: theme.spacing(8),
          backgroundColor:"white"
        }}
      >
        {children}
      </div>
    </div>
  );
}

DrawerLayout.propTypes = {
  children: PropTypes.element,
};
