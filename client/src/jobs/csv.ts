import fs from "fs";
import Papa from "papaparse";

type CsvToJsonProps = {
  path: string;
};

export const csvToJson = (props: CsvToJsonProps) => {
  const data = fs.readFileSync(props.path, "utf8");
  const results = Papa.parse(data, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  console.log(results.data);

  return results.data;
};

// csvToJson({ path: "./public/test.csv" });
