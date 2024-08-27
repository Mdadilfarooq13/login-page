import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "input-data",
    label: "Input Data",
  },
  {
    key: "editable-table",
    label: "Editable Table",
  },
  {
    key: "charts",
    label: "Charts",
  },
];

function Sidebar() {
  const navigate = useNavigate();

  function handleClick(e) {
    switch (e.key) {
      case "input-data":
        navigate("/input_data");
        break;
      case "editable-table":
        navigate("/editable_table");
        break;
      case "charts":
        navigate("/charts");
        break;
      default:
        break;
    }
  }

  return (
    <Menu
      mode="inline"
      items={items}
      onClick={handleClick}
    />
  );
}

export default Sidebar;
