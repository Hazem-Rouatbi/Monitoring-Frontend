import axios from "./axios";
import Swal from "sweetalert2";

import * as localstorage from "./LocalStorage";
export async function getAllRanges(
  page,
  size,
  kioskid,
  status,
  startdate,
  enddate
) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = "";
    if (kioskid && kioskid !== "all") {
      filtre += "&kioskid=" + kioskid;
    }
    if (status && status !== "all") {
      filtre += "&status=" + status;
    }
    if (
      startdate &&
      startdate !== "all" &&
      startdate !== null &&
      startdate !== undefined
    ) {
      filtre += "&startdate=" + startdate;
    }
    if (
      enddate &&
      enddate !== "all" &&
      enddate !== null &&
      enddate !== undefined
    ) {
      filtre += "&enddate=" + enddate;
    }

    let res = await axios
      .get(`/printer/get-ranges?page=` + page + `&size=` + size + filtre)
      .catch((err) => {
        console.log(
          "*/*/*/*/*/*/*/*/*/*/" + err + "/*/*/*/*/*/*/*/*/*/*/*/*/*/"
        );
        return undefined;
      });

    return res;
  }
}


export async function getAllPapers(
  page,
  size,
  kioskid,
  status,
  startdate,
  enddate
) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = "";
    if (kioskid && kioskid !== "all") {
      filtre += "&kioskid=" + kioskid;
    }
    if (status && status !== "all") {
      filtre += "&status=" + status;
    }
    if (
      startdate &&
      startdate !== "all" &&
      startdate !== null &&
      startdate !== undefined
    ) {
      filtre += "&startdate=" + startdate;
    }
    if (
      enddate &&
      enddate !== "all" &&
      enddate !== null &&
      enddate !== undefined
    ) {
      filtre += "&enddate=" + enddate;
    }

    let res = await axios
      .get(`/printer/get-papers?page=` + page + `&size=` + 40 + filtre)
      .catch((err) => {
        console.log(
          "*/*/*/*/*/*/*/*/*/*/" + err + "/*/*/*/*/*/*/*/*/*/*/*/*/*/"
        );
        return undefined;
      });

    return res;
  }
}
export async function addRange(state) {
  const range = {
    start: state.startRange,
    end: state.endRange,
    numPages: state.numPages,
    kioskId: state.kioskId,
    pagesLeft: state.numPages,
  };

  const instance = axios.create({
    timeout: 100000,
    headers: { Authorization: "Bearer " + localstorage.loadAccess() },
  });
  console.log(range);

  let res = await instance.post(`/printer/add-range`, range).catch((err) => {
    return undefined;
  });
  return res;
}
