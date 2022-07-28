import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CSSProperties } from "react";
import { Icon, Menu } from "semantic-ui-react";

const Header = ({ style }: { style?: CSSProperties }) => {
  const { status } = useSession();

  return (
    <Menu
      as={"header"}
      style={{
        position: "sticky",
        zIndex: 1,
        top: 0,
        margin: 0,
        borderRadius: 0,
      }}
    >
      <Link href={"/"}>
        <Menu.Item header position="left">
          <h2>Parkerad</h2>
        </Menu.Item>
      </Link>

      <Link href={"/"}>
        <Menu.Item position="right">
          <Icon name="home" size="large" />
          Home
        </Menu.Item>
      </Link>

      <Link href={"/#locations"}>
        <Menu.Item position="right">
          <Icon name="tree" size="large" />
          Locations
        </Menu.Item>
      </Link>

      <Menu.Item
        href="https://github.com/fipplarna/parkerad"
        target="_blank"
        position="right"
      >
        <Icon name="github" size="large" />
        Github
      </Menu.Item>

      {status !== "authenticated" && (
        <Menu.Item onClick={() => signIn()} position="right">
          <Icon name="sign in" size="large" />
          Sign in
        </Menu.Item>
      )}

      {status === "authenticated" && (
        <>
          <Link href={"/account"}>
            <Menu.Item position="right">
              <Icon name="user" size="large" />
              Account
            </Menu.Item>
          </Link>

          <Menu.Item onClick={() => signOut()} position="right">
            <Icon name="sign out" size="large" />
            Sign out
          </Menu.Item>
        </>
      )}

      <style>{`
        .ui.menu:not(.vertical) .right.item, .ui.menu:not(.vertical) .right.menu {
          margin-left: 0 !important
        }
      `}</style>
    </Menu>
  );
};

export default Header;
