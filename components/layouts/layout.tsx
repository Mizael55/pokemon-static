import Head from "next/head";
import { Navbar } from "../ui";
type Props = {
  children: React.ReactNode;
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Mizael Soler" />
        <meta name="description" content="Informacion sobre el pokemon xxxx" />
        <meta name="keywords" content="xxxx, pokemon, pokedex" />
      </Head>
      <Navbar />

      <main style={{
        padding: '0px 20px'
      }}
      >{children}</main>
    </>
  );
};
