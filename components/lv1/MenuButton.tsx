import React, { ReactNode } from "react";

export const MenuButton = (
  props: {
    onClick: () => void;
    children: ReactNode;
  }
) => {
  return (
    <button
      className={
        `flippable h-[2.4em] py-1 whitespace-nowrap break-keep`
      }
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
};

export const MenuToggleButton = (
  props: {
    isToggled: boolean;
    onClick: (isToggled: boolean) => void;
    children: ReactNode;
  }
) => {
  return (
    <button
      className={`menu-toggle-button h-[2.4em] py-1 whitespace-nowrap break-keep ${ props.isToggled ? "is-toggled" : "is-not-toggled"}`}
      onClick={() => props.onClick(!props.isToggled)}
    >
      {props.children}
    </button>
  );
}
