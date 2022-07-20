import { borders, colors, shadows, stdPx } from "theme/Styles";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header>
      Parkerad {session?.user?.name}
      <nav>
        <ul>
          <li>
            <Link href={"/"}>
              <a>Home</a>
            </Link>
          </li>

          {status === "authenticated" ? (
            <>
              <li>
                <Link href={"/account"}>
                  <a>
                    <Image
                      src={`${session.user?.image}`}
                      height={stdPx(2)}
                      width={stdPx(2)}
                      style={{ borderRadius: "50%" }}
                    />
                    Account
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
                </a>
              </li>
              {/* <style jsx>{``}</style> */}
            </>
          ) : (
            <li>
              <Link href={"/api/auth/signin"}>
                <a>Sign in</a>
              </Link>
            </li>
          )}

          <li>
            <Link href={"/#locations"}>
              <a>Locaitons</a>
            </Link>
          </li>
          <li>
            <Link href="https://github.com/fipplarna/parkerad">
              <a target={"_blank"}>
                <Image
                  className="image"
                  src={"/icons/github.svg"}
                  width={stdPx(2)}
                  height={stdPx(2)}
                />
                Github
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          height: ${stdPx(4)};
          align-items: center;
          padding: 0 5% 0 5%;
          border-bottom: ${borders.solidBorder} ${colors.dark};
          background-color: ${colors.highlight};
          font-size: large;
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
        }
      `}</style>
    </header>
  );
};

export default Header;
