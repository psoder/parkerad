import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Icon, Menu } from "semantic-ui-react";

const Header = () => {
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
        <Menu.Item header>
          <h2>Parkerad</h2>
        </Menu.Item>
      </Link>

      <Menu.Menu position="right">
        <Link href={"/"}>
          <Menu.Item>
            <Icon name="home" size="large" />
            Home
          </Menu.Item>
        </Link>

        <Link href={"/#locations"}>
          <Menu.Item>
            <Icon name="tree" size="large" />
            Locations
          </Menu.Item>
        </Link>

        <Menu.Item href="https://github.com/fipplarna/parkerad" target="_blank">
          <Icon name="github" size="large" />
          Github
        </Menu.Item>

        {status !== "authenticated" && (
          <Menu.Item onClick={() => signIn()}>
            <Icon name="sign in" size="large" />
            Sign in
          </Menu.Item>
        )}

        {status === "authenticated" && (
          <>
            <Link href={"/account"}>
              <Menu.Item>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item onClick={() => signOut()}>
              <Icon name="sign out" size="large" />
              Sign out
            </Menu.Item>
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
