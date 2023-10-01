import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Card,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Entries = () => {
  const { monthlyData } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [sortedData, setSortedData] = useState({});

  useEffect(() => {
    //Sort data to latest month at top
    // Convert the object into an array of key-value pairs
    const dataArray = Object.entries(monthlyData);
    // Sort the array based on the month names in descending order
    dataArray.sort((a, b) => {
      const monthsOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthsOrder.indexOf(b[0]) - monthsOrder.indexOf(a[0]);
    });

    // Reconstruct the sorted array back into an object
    const sortedDataObject = {};
    dataArray.forEach(([month, data]) => {
      sortedDataObject[month] = data;
    });
    // Resulting object with data sorted in descending order by month
    setSortedData(sortedDataObject);
    // console.log(sortedDataObject);
  }, [monthlyData]);

  const handleChange = (month) => (event, isExpanded) => {
    setExpanded(isExpanded ? month : false);
  };

  return monthlyData ? (
    Object.keys(sortedData).map((header, index) => {
      return (
        <Accordion
          sx={{
            "&.MuiAccordion-root": {
              borderRadius: "20px",
              "&:not(:last-child)": {
                borderBottom: "none", // Remove bottom border for all but the last one
              },
              padding: 0,
            },

            "&.MuiAccordion-root:before": {
              backgroundColor: "background.paper",
            },
            my: 1,
          }}
          key={index}
          expanded={expanded === header}
          onChange={handleChange(header)}
        >
          <AccordionSummary expandIcon={<ExpandMore />} id={`${header}-header`}>
            <Typography variant="h6">{header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DataGrid
              sx={{
                borderRadius: "20px",
                backgroundColor: "background.default",
                px: 2,
              }}
              rows={sortedData[header]}
              columns={[
                // { field: 'entry_id', headerName: 'Entry ID', width: 150},
                { field: "amount", headerName: "Amount", width: 150 },
                { field: "category", headerName: "Category", width: 150 },
                {
                  field: "sub_category",
                  headerName: "Sub-Category",
                  width: 150,
                },
                { field: "comment", headerName: "Comment", width: 250 },
                { field: "createdAt", headerName: "Created At", width: 250 },
                // Add more columns as needed
              ]}
              getRowId={(row) => row.entry_id}
              //Display entries latest at top, sort by field createdAt
              sortModel={[
                {
                  field: "createdAt",
                  sort: "desc",
                },
              ]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
            />
          </AccordionDetails>
        </Accordion>
      );
    })
  ) : (
    <Card sx={{ my: 3, p: 5, borderRadius: "20px" }}>
      <Typography variant="h6" color="text.primary">
        No data available for the current month's expenses.
      </Typography>
    </Card>
  );
};

export default Entries;
