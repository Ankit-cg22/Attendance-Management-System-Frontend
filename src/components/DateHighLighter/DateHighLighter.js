import React from 'react';
import {LocalizationProvider, StaticDatePicker} from '@mui/x-date-pickers';
import {DateFnsUtils} from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import dayjs from 'dayjs';
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";
import { isMuiElement } from '@mui/material';
function DateHighlighter({ highlightedDates }) {
  const today = dayjs();
  const HighlightedDay = styled(PickersDay)(({ theme }) => ({
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }));
  const formatDate =(date) =>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const ServerDay = (props) => {
    const { highlightedDates = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = highlightedDates.includes(formatDate(day["$d"]));
  
    return (
      <HighlightedDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        selected={isSelected}
      />
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            defaultValue={today}
            
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDates,
              },
            }}
          />
    </LocalizationProvider>
  );
}

export default DateHighlighter;
