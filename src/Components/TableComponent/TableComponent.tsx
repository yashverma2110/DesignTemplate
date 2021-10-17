import { useState, useEffect, useCallback, ChangeEvent } from "react";
import {
  Box,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  TableSortLabel,
  InputAdornment,
  Input,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { client } from "../../utils/api.config";
import { getAuthToken } from "../../utils/methods";
import { columnsType, tableMetadata } from "./columnTypes";
import classnames from "classnames";
import Search from "@material-ui/icons/Search";

interface TableComponentProps {
  metadata: tableMetadata;
  dashboardType: string;
  onRowClick?: any;
  refresh?: any;
}

const TableComponent = ({
  metadata,
  dashboardType,
  onRowClick,
  refresh,
}: TableComponentProps) => {
  const [data, setData] = useState<any[]>([]);
  const [order, setOrder] = useState<any>("asc");
  const [orderBy, setOrderBy] = useState<string>();

  const getData = useCallback(() => {
    client
      .get(`/${dashboardType}/getAll`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((res) => {
        setData(res.data[dashboardType]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dashboardType]);

  useEffect(() => {
    getData();
  }, [refresh, getData]);

  useEffect(() => {
    if (orderBy) {
      var dataToBeSorted = data;
      const factor = order === "asc" ? -1 : 1;

      dataToBeSorted.sort((a, b) =>
        a[orderBy] < b[orderBy] ? factor : 0 - factor
      );

      setData(() => dataToBeSorted);
    }
  }, [orderBy, order, data]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchString = e.target.value;

    if (!searchString) getData();

    if (searchString.length < 2) return;

    var dataCopy = data.filter((item: any, index: number) => {
      const values = Object.values(item);
      var str = "";
      values.forEach((val: any) => {
        if (val) str += val.toString();
      });

      return str.indexOf(searchString) > -1;
    });

    setData(dataCopy);
  };

  return (
    <Box className="table-parent">
      <Box className="search-bar">
        <FormControl>
          <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
          <Input
            onChange={handleSearch}
            endAdornment={
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {metadata.columns.map((column: columnsType, index: number) => (
                <TableCell
                  key={index}
                  align="center"
                  sortDirection={orderBy === column.key ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.key}
                    direction={orderBy === column.key ? order : "asc"}
                    onClick={(e) => handleRequestSort(column.key)}
                  >
                    <Typography style={{ textTransform: "uppercase" }}>
                      <b>{column.header}</b>
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((element: any, index: number) => (
              <TableRow
                key={index}
                className={classnames({
                  "table-click-row": Boolean(onRowClick),
                })}
                onClick={() => onRowClick(element)}
              >
                {metadata.columns.map((column: columnsType, key: number) => (
                  <TableCell align="center" key={key}>
                    {column.columnActions?.call ? (
                      <a
                        href={`tel:${element[column.key]}`}
                        className="call-phone"
                      >
                        {element[column.key]}
                      </a>
                    ) : (
                      element[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
