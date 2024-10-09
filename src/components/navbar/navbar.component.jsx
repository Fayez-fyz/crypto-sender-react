const NavbarComponent = () => {
  return (
    <nav className="max-w-screen-lg mx-auto py-2  ">
      <div className="flex justify-between items-center">
        <a
          href="/"
          className="text-3xl font-bold bg-gradient-to-r from-slate-500 mb-3 via-slate-300 to-slate-400 inline-block text-transparent bg-clip-text "
        >
          Crypto
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#transaction-history"
            className="text-zinc-300 hover:underline underline-offset-4 font-bold text-lg hover:text-primary-foreground"
          >
            Transaction History
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
