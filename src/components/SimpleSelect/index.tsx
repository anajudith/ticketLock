// import * as React from "react";
// import Select, { selectClasses } from "@mui/joy/Select";
// import Option from "@mui/joy/Option";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// interface IProps {
//   options: string[];
//   placeholder: string;
//   value: string;
//   //   onChange:  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
// }

// export default function SimpleSelect({ options, placeholder, value }: IProps) {
//   return (
//     <Select
//       value={value}
//       // onChange={onChange}
//       placeholder={placeholder}
//       indicator={<KeyboardArrowDown />}
//       sx={{
//         width: 240,
//         [`& .${selectClasses.indicator}`]: {
//           transition: "0.2s",
//           [`&.${selectClasses.expanded}`]: {
//             transform: "rotate(-180deg)",
//           },
//         },
//       }}
//     >
//       {/* <Option value="dog">Dog</Option>
//       <Option value="cat">Cat</Option>
//       <Option value="fish">Fish</Option>
//       <Option value="bird">Bird</Option> */}
//       {options.map((option) => (
//         <Option key={option} value={option}>
//           {option}
//         </Option>
//       ))}
//     </Select>
//   );
// }

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
interface IProps {
  options: string[];
  placeholder: string;
  value: string;
  //   onChange:  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function SimpleSelect({ options, placeholder, value }: IProps) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      value={value}
      renderInput={(params) => <TextField {...params} label={placeholder} />}
    />
  );
}
