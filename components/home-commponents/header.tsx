"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "../toogle-theme";
import { Button } from "../ui/button";
import Modal from "../modal";
import SignIn from "../authentication-ui/auth";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <Button onClick={() => setIsModalOpen(true)}>Sign in</Button>

        <Modal
          title="Sign in to your leetCoach Account"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <SignIn />
        </Modal>
      </div>
    </section>
  );
}

export default Header;
