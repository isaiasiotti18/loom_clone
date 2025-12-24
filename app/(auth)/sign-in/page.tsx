import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            alt="logo"
            width={32}
            height={32}
          />
          <h1>SnapCast</h1>
        </Link>

        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src={"/assets/icons/star.svg"}
                  alt="star"
                  width={20}
                  height={20}
                />
              ))}
            </figure>
            <p>
              SnapCast makes screen recording easy. From quick walkthroughs to
              full presentations, {"it's"} fast, smooth, and shareable in
              seconds
            </p>
            <article>
              <Image
                src="/assets/images/isaiasiotti.jpg"
                height={64}
                width={64}
                alt="jason"
                className="rounded-full"
              />
              <div>
                <h2>Isaias Iotti</h2>
                <p>CEO, Grupo IOTTI</p>
              </div>
            </article>
          </section>
        </div>
        <p>© Snapcast {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href={"/"}>
            <Image
              src={"/assets/icons/logo.svg"}
              alt="logo"
              width={42}
              height={42}
            />
            <h1>SnapCast</h1>
          </Link>
          <p>
            Create and share your very first <span>SnapCast video</span> in no
            time!
          </p>
          <button>
            <Image
              src={"/assets/icons/google.svg"}
              alt="google sign-in"
              height={22}
              width={22}
            />
            <span>Sign in with Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay" />
    </main>
  );
};

export default Page;
