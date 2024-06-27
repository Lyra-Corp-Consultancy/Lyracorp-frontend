/* eslint-disable @typescript-eslint/no-explicit-any */
export class CSV {
  convertCSV(titles: string[], data: string| number[][]) {
    let title: string = "";
    titles.map((x) => {
      title += '"' + x + '",';
    });
    title += "\n";

    let values: string = "";
    let largeLength: number = 0;
    for (let i = 0; i < data.length; i++) {
      if (largeLength <= data[i].length) {
        largeLength = data[i].length;
      }
    }
    for (let i = 0; i < largeLength; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j][i]) {
          values += '"' + data[j][i] + '",';
        } else {
          values += '"",';
        }
      }
      values += "\n";
    }

    // console.log( val,title,val);
    const blob = new Blob([title + values], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "export-" + new Date().toLocaleDateString());
    // a.setAttribute("download", "export-" + new Date().toLocaleString().replace(/[:]/g, '-') + ".txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
