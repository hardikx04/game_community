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

function createData(id, rank) {
  return {
    id,
    firstName: chance.first(),
    lastName: chance.last(),
    age: chance.age(),
    email: chance.email(),
    rank: rank, // Rank from 1 to 200
  };
}

const columns = [
  {
    width: 100,
    label: "First Name",
    dataKey: "firstName",
  },
  {
    width: 100,
    label: "Last Name",
    dataKey: "lastName",
  },
  {
    width: 50,
    label: "Age",
    dataKey: "age",
    numeric: true,
  },
  {
    width: 50,
    label: "Rank",
    dataKey: "rank",
    numeric: true,
  },
  {
    width: 200,
    label: "Email",
    dataKey: "email",
  },
];

// Create 200 rows with descending ranks
const rows = Array.from({ length: 200 }, (_, index) =>
  createData(index, index + 1)
);

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

// Add display names for better debugging
VirtuosoTableComponents.Scroller.displayName = "VirtuosoScroller";
VirtuosoTableComponents.Table.displayName = "VirtuosoTable";
VirtuosoTableComponents.TableHead.displayName = "VirtuosoTableHead";
VirtuosoTableComponents.TableBody.displayName = "VirtuosoTableBody";

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
          {row[column.dataKey]}
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
