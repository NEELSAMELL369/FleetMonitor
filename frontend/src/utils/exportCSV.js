// src/utils/exportCSV.js
export const exportToCSV = (data, filename = "data.csv") => {
  if (!data || !data.length) return;

  const csvRows = [];

  // headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  // rows
  for (const row of data) {
    const values = headers.map(header => {
      let val = row[header];

      if (val === null || val === undefined) val = "";
      else if (typeof val === "object") val = JSON.stringify(val);

      // Escape double quotes by doubling them
      val = val.toString().replace(/"/g, '""');

      return `"${val}"`;
    });

    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // release memory
};
