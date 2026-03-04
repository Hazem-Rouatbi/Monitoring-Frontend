import React, { useState } from "react";
import { useLayoutEffect, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "react-bootstrap/Table";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";

import { Badge } from "reactstrap";
import TextField from "@mui/material/TextField";
import * as kioskservice from "../../services/KioskService";
import * as cahboxservice from "../../services/CahboxService";
import * as accessmanager from "../../services/AccessManager";
import "./../../assets/css/table.css";
import Feedingdetails from "./feedingdetails";
const Feeding = () => {
  const [active, setActive] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [fkioskid, setFkioskid] = useState("");
  const [ftype, setFtype] = useState("");
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [fstatus, setFstatus] = useState("");
  const [dataksk, setDataksk] = useState([]);
  const [data, setData] = useState([]);
  const [datafeedingdetails, setDatafeedingdetails] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (
      accessmanager.isAdmin() ||
      accessmanager.isFinancial() ||
      (accessmanager.isResponsible() && fkioskid && fkioskid !== "all")
    ) {
      initdata();
    }
  }, [page, fkioskid, ftype, startdate, enddate, fstatus]);

  useLayoutEffect(() => {
    if (accessmanager.isAdmin() || accessmanager.isFinancial()) {
      getinfksk();
    } else if (accessmanager.isResponsible()) {
      getinfkskbyrsp();
    }
  }, []);
  const getfeedingdetails = async (idfeeding) => {
    const res0 = await cahboxservice.getfeedingdetails(idfeeding, fkioskid);
    if (res0 !== undefined && res0 !== null) {
      console.log(res0.data);
      setDatafeedingdetails(res0.data.data);
    }
  };
  const initdata = async () => {
    // page,  size,  kioskid,  type,  status,  startdate,  enddate
    const res = await cahboxservice.getfeeding(
      page - 1,
      size,
      fkioskid,
      "feeding",
      fstatus,
      startdate,
      enddate
    );
    if (res !== undefined && res !== null) {
      var data0 = [];
      console.log(res.data);
      data0 = res?.data?.data?.feedings;
      if (!data0) return;
      console.log(data0);
      
      for (let i = 0; i < data0.length; i++) {
        const res3 = await kioskservice.getkiosk(data0[i].kioskId);
        var nameksk2 = "";
        if (res3 !== undefined && res3 !== null) {
          nameksk2 = res3.label + " " + res3.address;
        }
        data0[i].kioskId = nameksk2;
      }
      setData(data0);

      setTotalItems(res?.data?.data?.totalItems);
      setTotalPages(res?.data?.data?.totalPages);
    }
  };
  const getpagination = () => {
    let pagbt = [];
    if (page != 1) {
      pagbt.push(
        <li className="page-item" key="previous" onClick={() => previous()}>
          <button
            className="btn btn-outline-primary"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
      );
    } else {
      pagbt.push(
        <li className="page-item" key="previous">
          <button
            className="btn btn-outline-secondary"
            href="#"
            aria-label="Previous"
            disabled
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
      );
    }
    for (let index = 0; index < totalPages; index++) {
      if (page == index + 1) {
        pagbt.push(
          <li
            className="page-item"
            key={index}
            onClick={() => updatepage(index)}
          >
            <button className="btn btn-primary">{index + 1} </button>
          </li>
        );
      } else {
        pagbt.push(
          <li
            className="page-item"
            key={index}
            onClick={() => updatepage(index)}
          >
            <button className="btn btn-outline-primary">{index + 1} </button>
          </li>
        );
      }
    }
    if (page != totalPages) {
      pagbt.push(
        <li className="page-item" key="next" onClick={() => next()}>
          <button
            className="btn btn-outline-primary"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      );
    } else {
      pagbt.push(
        <li className="page-item" key="next" onClick={() => next()}>
          <button
            className="btn btn-outline-secondary"
            href="#"
            aria-label="Next"
            disabled
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      );
    }
    return pagbt;
  };
  const updatepage = async (index) => {
    setPage(index + 1);
  };
  const previous = () => {
    if (page != 1) {
      setPage(page - 1);
      initdata();
    }
  };
  const next = () => {
    if (page != totalPages) {
      setPage(page + 1);
      initdata();
    }
  };
  //kioskId ftype amount status createdAt
  const createTable = () => {
    let table = [];
    for (let i = 0; i < data.length; i++) {
      table.push(
        <tr key={i} id={data[i].id}>
          <td> {data[i].kioskId} </td>
          <td>{data[i].stockn}</td>
          <td>{data[i].stockh}</td>
          <td>{data[i].stockm}</td>
          <td>
            <Moment format="DD-MM-YYYY hh:mm:ss">{data[i].createdAt}</Moment>
          </td>
        </tr>
      );
    }
    return table;
  };
  const getinfksk = async () => {
    var res = await kioskservice.getallkiosksmall(1, "all");
    if (res) {
      setDataksk(res);
    }
  };
  const getinfkskbyrsp = async () => {
    var res = await kioskservice.getinfkskbyrsp();
    console.info(res);
    if (res) {
      setFkioskid(res);
    }
  };
  return (
    <div>
      <div className="row justify-content-md-center">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3>Alimentations</h3>
              <form className="form-sample">
                <div className="container">
                  <div className="row mt-4">
                    {(accessmanager.isAdmin() ||
                      accessmanager.isFinancial()) && (
                      <div className="col-md-6">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Borne
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={fkioskid}
                            onChange={(e) => setFkioskid(e.target.value)}
                          >
                            <MenuItem value="all">{"Tous "}</MenuItem>
                            {dataksk.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.label} {option.address}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    )}
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <FormControl fullWidth>
                        <TextField
                          className="input"
                          id="startdate"
                          label="Date de début"
                          type="date"
                          /* sx={{ width: 220 }} */
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={startdate}
                          onChange={(e) => setStartdate(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="col-md-6">
                      <FormControl fullWidth>
                        <TextField
                          className="input"
                          id="enddate"
                          label="Date de fin"
                          type="date"
                          /* sx={{ width: 220 }} */
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={enddate}
                          onChange={(e) => setEnddate(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </form>

              <div className="mt-4 table-responsive">
                <br />
                <div className="mt-4 table-responsive">
                  <Table
                    responsive
                    className="table table-striped table-hover "
                  >
                    <thead>
                      <tr>
                        {/* kioskId ftype amount status createdAt  */}
                        <th> Borne </th>
                        <th> Stock Monnaie </th>
                        <th> Stock Billets </th>
                        <th> Total </th>
                        <th> Date </th>
                      </tr>
                    </thead>
                    <tbody>{createTable()}</tbody>
                  </Table>
                </div>
                <br />
                <br />
                <br />
                <nav aria-label="Page navigation example">
                  <ul className="pagination">{getpagination()}</ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Feedingdetails
        datafeedingdetails={datafeedingdetails}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Feeding;
