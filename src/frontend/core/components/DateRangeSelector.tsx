import { CalendarIcon } from "@chakra-ui/icons";
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { es } from "date-fns/locale";
import React, { useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { formatDate } from "../utils/formatDate";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type DateRange = {
  startDate: Date;
  endDate: Date;
};

interface Props {
  onChange?: (startDate: Date, endDate: Date) => void
}

export default function DateRangeSelector({ onChange }: Props) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  function handleChange(rangesByKey: RangeKeyDict) {
    const startDate = new Date(rangesByKey.selection.startDate as Date);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    const endDate = new Date(rangesByKey.selection.endDate as Date);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(999);

    if (startDate !== undefined && endDate !== undefined) {
      setDateRange({
        startDate,
        endDate,
      });
      onChange && onChange(startDate, endDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Flex>
          <Input
            value={formatDate(dateRange.startDate)}
            type="text"
            background={"white"}
            maxWidth={"220px"}
            readOnly
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
          />
          <InputGroup>
            <Input
              type="text"
              value={formatDate(dateRange.endDate)}
              background={"white"}
              maxWidth={"220px"}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              readOnly
            />
            <InputRightElement>
              <CalendarIcon />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </PopoverTrigger>
      <PopoverContent width={"600px"}>
        <PopoverCloseButton />
        <PopoverHeader>Selecciona un rango de fechas</PopoverHeader>
        <PopoverBody>
          <DateRangePicker
            ranges={[
              {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                key: "selection",
              },
            ]}
            onChange={handleChange}
            locale={es}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
