import { Tabs, TabList, Tab, TabIndicator } from "@chakra-ui/react";
import React from "react";

type Props = {
  tabs: string[];
  onChange?: (index: number) => void
};

export default function TabGroup({ tabs, onChange }: Props) {
  return (
    <Tabs position="relative" variant="unstyled" defaultIndex={0} onChange={onChange}>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index} fontSize={'13px'}>{tab}</Tab>
        ))}
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="blue.500"
        borderRadius="1px"
        backgroundColor={"cyan.400"}
      />
    </Tabs>
  );
}
