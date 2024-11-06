import { ReactNode } from "react";

export type SidebarItemProps = {
  label: string;
  icon: ReactNode;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}

export type ButtonProps = {
  content?: string;
  className?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  iconLeft?: ReactNode | null;
  iconRight?: ReactNode | null;
  onClick?: () => void;
};

export type TabButtonProps = {
  name: string;
  icon: ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};