"use client";
import { Avatar, Dropdown, Navbar } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import React, { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  const { data } = useSession({ required: true });
  return (
    <>
      <Navbar variant="sticky">
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="warning"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="warning"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="settings" withDivider>
                {data?.user?.name}
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                <div onClick={() => signOut({ callbackUrl: "/" })}>Log Out</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
      {children}
    </>
  );
}
