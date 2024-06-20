import { Checkbox } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import GenericTable from "@/frontend/core/components/GenericTable";

const mockData: SMSTableItem[] = [
  {
    id: "1",
    action: "Send SMS",
    sms: "Hello, this is a test message.",
  },
  {
    id: "2",
    action: "Receive SMS",
    sms: "Received a new message from John Doe.",
  },
  {
    id: "3",
    action: "Failed SMS Delivery",
    sms: "Delivery failed for the message sent to +1234567890.",
  },
  {
    id: "4",
    action: "SMS Sent Successfully",
    sms: "Message successfully sent to +9876543210.",
  },
];

type SMSTableItem = {
  id: string;
  action: string;
  sms: string;
};

export default function SMSTable() {
  const page = 1;
  const pageSize = 10;

  const columns: ColumnDef<SMSTableItem>[] = React.useMemo(
    () => [
      {
        header: ({ table }) => (
          <Checkbox
            size={"sm"}
            colorScheme="cyan"
            isChecked={table.getIsAllRowsSelected()}
            isIndeterminate={table.getIsSomeRowsSelected()}
            onChange={(event) => {
              table.toggleAllRowsSelected(event.target.checked);
            }}
          >
            Id
          </Checkbox>
        ),
        accessorKey: "id",
        cell: ({ row, getValue }) => (
          <Checkbox
            size={"sm"}
            colorScheme="cyan"
            type="checkbox"
            isChecked={row.getIsSelected()}
            onChange={(event) => row.toggleSelected(event.target.checked)}
          >
            {getValue<string>()}
          </Checkbox>
        ),
      },
      {
        header: "Accion",
        accessorKey: "action",
      },
      {
        header: "SMS",
        accessorKey: "sms",
      },
    ],
    []
  );

  return (
    <GenericTable
      noExportable
      columns={columns}
      data={mockData}
      title="Inventario"
      pagination={{
        count: 10,
        page,
        pageSize,
      }}
    />
  );
}
