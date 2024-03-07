import { useState } from "react";
// import { csvToJson } from "../jobs/csv";
import axios from "axios";
import Papa from "papaparse";

// import fs from "fs";
// import Papa from "papaparse";

// type CsvToJsonProps = {
//   path: string;
// };

// export const csvToJson = (props: CsvToJsonProps) => {
//   const data = fs.readFileSync(props.path, "utf8");
//   const results = Papa.parse(data, {
//     header: true,
//     dynamicTyping: true,
//     skipEmptyLines: true,
//   });
//   console.log(results.data);

//   return results.data;
// };

const Account = () => {
  const [file, setFile] = useState();
  // csvToJson({ path: "./public/test.csv" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      console.log(files);
      if (files) {
        console.log(files[0]);
        Papa.parse(files[0], {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: function (results) {
            setFile(results);
          },
        });
      }
    }
  };
  console.log(file);

  const handleClick = async () => {
    try {
      console.log(file);
      const res = await axios.post("http://localhost:8800/test/csv", file, {
        withCredentials: true,
      });
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // const data = csvToJson({ path: `/public/${file.name}` });
    // console.log(data);
  };

  return (
    <div>
      <h1>Account</h1>
      <div>
        <input type="file" onChange={handleChange} accept="text/csv" />
      </div>
      <div>
        <button
          className="py-[5px] px-[10px] bg-slate-500 text-white rounded-md"
          onClick={handleClick}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Account;
