

function KPICard({ stat }) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <p className="text-sm text-gray-500">{stat.label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-800">{stat.value}</p>
    </div>
  )
}

export default KPICard;