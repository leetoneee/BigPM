import { ReactNode } from "react";

export type SidebarItemProps = {
  label: string;
  icon: ReactNode | null;
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