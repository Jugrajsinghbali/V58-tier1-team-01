export const ChinguFields = [
  "id",
  "timestamp",
  "gender",
  "country",
  "roleType",
  "role",
  "soloProjectTier",
  "voyageTier",
  "voyage",
];

export const TeamMember = {
  id: "",
  name: "",
  role: "",
  description: "",
  imageUrl: "",
};

export const Status = {
  ACTIVE: "Active",
  OFFLINE: "Offline",
  WAIT: "Wait",
};

export const ListMember = {
  id: "",
  name: "",
  handle: "",
  status: Status.ACTIVE,
  email: "",
  date: "",
  imageUrl: "",
  selected: false,
};

export const ChinguMember = {
  id: "",
  timestamp: "",
  gender: "",
  country: "",
  roleType: "",
  role: "",
  soloProjectTier: "",
  voyageTier: "",
  voyage: "",
};

export const NavLink = {
  label: "",
  href: "",
};

export const RawChinguData = {
  Timestamp: "",
  Gender: "",
  "Country Code": "",
  Timezone: "",
  Goal: "",
  "Goal-Other": "",
  Source: "",
  "Source-Other": "",
  "Country name (from Country)": "",
  "Solo Project Tier": "",
  "Role Type": "",
  "Voyage Role": "",
  "Voyage (from Voyage Signups)": "",
  "Voyage Tier": "",
};

export const CountryGroup = {
  countryCode: "",
  countryName: "",
  coordinates: [0, 0],
  members: [],
};
