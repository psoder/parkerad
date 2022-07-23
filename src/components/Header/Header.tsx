import { borders, colors, shadows, stdPx } from "theme/Styles";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  const iconScaling = 2;

  return (
    <header>
      <h1>
        <Link href={"/"}>
          <a>Parkerad</a>
        </Link>
      </h1>

      <nav>
        <ul>
          <li>
            <Link href={"/"}>
              <a>
                Home
                <Image
                  src={"/icons/home-white.svg"}
                  width={stdPx(iconScaling)}
                  height={stdPx(iconScaling)}
                />
              </a>
            </Link>
          </li>

          <li>
            <Link href={"/#locations"}>
              <a>
                Locaitons
                <Image
                  src={"/icons/trees-white.svg"}
                  width={stdPx(iconScaling)}
                  height={stdPx(iconScaling)}
                />
              </a>
            </Link>
          </li>

          <li>
            <a target={"_blank"} href="https://github.com/fipplarna/parkerad">
              Github
              <Image
                src={"/icons/github-logo-white.svg"}
                width={stdPx(iconScaling)}
                height={stdPx(iconScaling)}
              />
            </a>
          </li>

          {status === "authenticated" ? (
            <>
              <li>
                <Link href={"/account"}>
                  <a>
                    Account
                    <Image
                      src={`${session.user?.image}`}
                      height={stdPx(iconScaling)}
                      width={stdPx(iconScaling)}
                      style={{ borderRadius: "50%" }}
                    />
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="/api/auth/signout"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                  <Image
                    src={"/icons/logout-white.svg"}
                    width={stdPx(iconScaling)}
                    height={stdPx(iconScaling)}
                  />
                </a>
              </li>
              {/* <style jsx>{``}</style> */}
            </>
          ) : (
            <li>
              <Link href={"/api/auth/signin"}>
                <a>
                  Sign in
                  <Image
                    src={"/icons/user-circle-white.svg"}
                    width={stdPx(iconScaling)}
                    height={stdPx(iconScaling)}
                  />
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          height: ${stdPx(3.5)};
          align-items: center;
          padding: 0 2.5% 0 2.5%;
          border-bottom: ${borders.solidBorder} ${colors.dark};
          background-color: ${colors.secondary};
          font-size: large;
        }

        h1 {
          font-size: xx-large;
          color: ${colors.highlight};
        }

        h1 > a {
          text-decoration: none;
        }

        nav {
          display: flex;
          justify-content: end;
        }

        ul {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          gap: ${stdPx()};
          list-style: none;
        }

        li a {
          display: flex;
          align-items: center;
          gap: ${stdPx(0.33)};
        }
      `}</style>
    </header>
  );
};

export default Header;
