
import { getServerSession } from "next-auth";
import Sidebar from "../../../components/Sidebar";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import StatCard from "@/components/StatCard";
import LineChart from "@/components/LineChart";
import { BoxIcon, Eye, Landmark, ShoppingCart, User2 } from "lucide-react";


export default async function HomePage() {
  const session = await getServerSession(nextAuthOptions)
  return (
    <>
      <Sidebar />
      <div className="p-5 sm:ml-72 mt-8 bg-gray-50 dark:bg-gray-900">

        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <StatCard
              icon={<Landmark size={30} />}
              value="R$ 45.2K"
              label="Receita total"
            />

            <StatCard
              icon={<ShoppingCart size={30} />}
              value="3.456"
              label="Vendas totais"
            />

            <StatCard
              icon={<BoxIcon size={30} />}
              value="2.450"
              label="Total de itens vendidos"
            />

          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md ">
            <LineChart />
            <div >
            </div>
          </div>

        </div>
      </div>
    </>
  )
}