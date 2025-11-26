const Siderbar = () => {
  return (
    <div className="w-64 bg-white">
      <div className="p-5">
        <h1 className="px-8 py-6 font-bold text-2xl">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <button className="px-6 py-3">Dashboard</button>
        <button className="px-6 py-3">Produtos</button>
        <button className="px-6 py-3">Vendas</button>
      </div>
    </div>
  );
};

export default Siderbar;
