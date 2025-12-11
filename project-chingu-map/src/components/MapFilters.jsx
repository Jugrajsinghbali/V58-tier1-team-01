import { Filter } from "lucide-react";

const MapFilters = ({ filters, onChange, options }) => {
  const renderSelect = (label, fieldKey, values, customLabels) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <select
        value={filters[fieldKey]}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-brand-dark font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all appearance-none"
        style={{ color: "#191A23" }}
      >
        <option value="">All</option>
        {values.map((v) => (
          <option key={v} value={v}>
            {customLabels ? customLabels[v] : v || "Unspecified"}
          </option>
        ))}
      </select>
    </div>
  );

  const genderOptions = ["MALE", "FEMALE", "PREFER NOT TO SAY"];
  const genderLabels = {
    MALE: "Male",
    FEMALE: "Female",
    "PREFER NOT TO SAY": "Prefer not to say",
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-6 h-fit w-full lg:w-80">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <Filter className="w-5 h-5 text-brand-purple" />
        <h3 className="font-bold text-lg text-brand-dark">Filter Map</h3>
      </div>

      <div className="flex flex-col gap-5">
        {renderSelect("Gender", "gender", genderOptions, genderLabels)}
        {renderSelect("Role Type", "roleType", options.roleTypes)}
        {renderSelect("Voyage Role", "voyageRole", options.voyageRoles)}
        {renderSelect("Goal", "goal", options.goals)}
      </div>

      <div className="pt-4 mt-2 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Adjusting filters updates marker counts automatically.
        </p>
      </div>
    </div>
  );
};

export default MapFilters;
