"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const user = {};

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="navbar">
      <nav>
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            alt="Logo"
            width={32}
            height={32}
          />
          <h1>SnapCast</h1>
        </Link>

        {user && (
          <figure>
            <button onClick={() => router.push("/profile/123456")}>
              <Image
                src={"/assets/images/dummy.jpg"}
                width={36}
                height={36}
                alt="User profile photo"
              />
            </button>
            <button className="cursor-pointer">
              <Image
                src={"/assets/icons/logout.svg"}
                className="rotate-180"
                width={24}
                height={24}
                alt="logout"
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
