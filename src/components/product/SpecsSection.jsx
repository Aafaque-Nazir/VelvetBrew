export default function SpecsSection({ specs }) {
  return (
    <div className="border-t border-white/10 py-12">
      <h3 className="text-2xl font-bold text-white mb-8">
        Technical Specifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {Object.entries(specs).map(([label, value], idx) => (
          <div
            key={idx}
            className="flex justify-between py-4 border-b border-white/5"
          >
            <span className="text-white/50 font-medium">{label}</span>
            <span className="text-white font-bold text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
