import React, { ReactNode, useContext, useState } from "react";

type MercoSistemaContext = {
  isSyncToastOpen: boolean;
  setSyncToastOpen: (value: boolean) => void;
};

type Props = {
  children: ReactNode | ReactNode[];
};

const MercoSistemaContext = React.createContext<MercoSistemaContext | null>(
  null
);

export function useSyncToastState() {
  const mercoContext = useContext(MercoSistemaContext);
  if (!mercoContext) {
    throw new Error(
      "useSyncToastState must be used within a MercoSistemaProvider"
    );
  }
  return {
    isSyncToastOpen: mercoContext.isSyncToastOpen,
    setSyncToastOpen: mercoContext.setSyncToastOpen,
  };
}

export default function MercoSistemaProvider({ children }: Props) {
  const [isSyncToastOpen, setSyncToastOpen] = useState<boolean>(true);

  return (
    <MercoSistemaContext.Provider
      value={{
        isSyncToastOpen,
        setSyncToastOpen,
      }}
    >
      {children}
    </MercoSistemaContext.Provider>
  );
}
