import MinMaxAvgCustomerStatistic from "./statistics/MinMaxAvgCustomerStatistic";
import MinMaxAvgStatistic from "./statistics/MinMaxAvgStatistic";
import TopCustomersStatistic from "./statistics/TopCustomersStatistic";
import TopProductsStatistic from "./statistics/TopProductsStatistic";
import TopSuppliersStatistic from "./statistics/TopSuppliersStatistic";

function Statistics() {


  return (
    <div className="max-h-dvh max-w-full flex flex-col overflow-y-auto">
    <div className="container mx-auto p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Módulo de Estadísticas</h1>

      {/* STATISCIC 1 */}
      <h2> 1. montos más altos, bajos y compra promedio que se le hace a los proveedores </h2>
      <MinMaxAvgStatistic/>
      <hr className='m-6 border-2 border-sky-400 rounded-sm'/>
      <h2> 2. montos más altos, bajos y ventas promedio que hacen los clientes </h2>
      <MinMaxAvgCustomerStatistic/>
      <hr className='m-6 border-2 border-sky-400 rounded-sm'/>
      <h2> 3. top 5 productos con más ganancia por año</h2>
      <TopProductsStatistic/>
      <hr className='m-6 border-2 border-sky-400 rounded-sm'/>
      <h2> 4. top 5 clientes con más facturas por año</h2>
      <TopCustomersStatistic/>
      <hr className='m-6 border-2 border-sky-400 rounded-sm'/>
      <h2> 5. top 5 proveedores con más ordenes por año</h2>
      <TopSuppliersStatistic/>
    </div>
    </div>
  );
}

export default Statistics;