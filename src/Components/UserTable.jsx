import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Chance from "chance";

const chance = new Chance(42);

const roles = ["Admin", "User"];

function createData(id) {
  return {
    id,
    firstName: chance.first(),
    username: chance.word({ length: 8 }),
    role: roles[Math.floor(Math.random() * roles.length)],
    actions: "actions",
  };
}

const columns = [
  {
    width: 150,
    label: "First Name",
    dataKey: "firstName",
  },
  {
    width: 150,
    label: "Username",
    dataKey: "username",
  },
  {
    width: 120,
    label: "Role",
    dataKey: "role",
  },
  {
    width: 150,
    label: "Actions",
    dataKey: "actions",
  },
];

const rows = Array.from({ length: 200 }, (_, index) => createData(index));

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {column.dataKey === "actions" ? (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  cursor: "pointer",
                  color: "#1976d2",
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => console.log("Edit", row.id)}
              >
                Edit
              </button>
              <button
                style={{
                  cursor: "pointer",
                  color: "#d32f2f",
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => console.log("Delete", row.id)}
              >
                Delete
              </button>
            </div>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
