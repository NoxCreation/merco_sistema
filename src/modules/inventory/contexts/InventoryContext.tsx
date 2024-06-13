import { ReactElement, ReactNode, createContext, useContext, useState } from "react";

export type InventoryContextType = {
  isOpenTransferMerchandiseModal: boolean;
  setOpenTransferMerchandiseModal: (open: boolean) => void;
};

type Props = {
  children: ReactNode | ReactNode[];
};

export const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export default function InventoryContextProvider({ children }: Props) {
  const [isOpenTransferMerchandiseModal, setOpenTransferMerchandiseModal] =
    useState<boolean>(false);

  const value = {
    isOpenTransferMerchandiseModal,
    setOpenTransferMerchandiseModal,
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}
