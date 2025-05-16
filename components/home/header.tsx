"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "../toogle-theme";

function Header() {
  return (
    <section className="flex content-center justify-between p-4 sticky top-0 z-50 bg-background border-b">
      <div className="font-semibold text-2xl">
        Leet<span className="text-primary">Coach</span>{" "}
      </div>
      <div className="flex content-center justify-end gap-4 ">
        <ModeToggle />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}

export default Header;
